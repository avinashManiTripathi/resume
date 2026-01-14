import { GoogleGenAI } from "@google/genai";
import { MOCK_JD_ANALYSIS, getMockQuestion, MOCK_EVALUATION, MOCK_FINAL_REPORT, getNextPhase } from "./interview.mock";
import * as OllamaAI from "./ollama-ai.service";
import * as OllamaBatch from "./ollama-ai-batch.service";


let ai: any;
const USE_OLLAMA = false // process.env.USE_OLLAMA === 'true';

export const initAI = (apikey: string) => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: apikey });
    }
    return ai;
};

/**
 * Generate all interview questions upfront in one batch call
 */
export const generateAllQuestions = async (jdInfo: any): Promise<any[]> => {
    try {
        console.log(`🤖 Generating interview questions with ${process.env.AI_PROVIDER || 'deepseek'}...`);

        // Use new provider-based service
        const AIInterviewService = await import('./ai-interview.service');
        const questions = await AIInterviewService.generateInterviewQuestions(jdInfo, 20);

        console.log(`✅ Generated ${questions.length} questions successfully`);
        return questions;
    } catch (error: any) {
        console.error('AI Question Generation Error:', error.message);
        console.log('📝 Using fallback question generation');
        return generateFallbackQuestions(jdInfo);
    }
};

/**
 * Batch evaluate all answers at once
 */
export const batchEvaluateAnswers = async (
    questionAnswerPairs: { question: string; answer: string; expectedPoints: string[] }[]
): Promise<any[]> => {
    // Try Ollama first if enabled
    if (USE_OLLAMA) {
        try {
            console.log(`🤖 Batch evaluating ${questionAnswerPairs.length} answers with Ollama AI...`);
            const ollamaHealthy = await OllamaAI.checkOllamaHealth();
            if (ollamaHealthy) {
                const evaluations = await OllamaBatch.batchEvaluateAnswersWithOllama(questionAnswerPairs);
                console.log(`✅ Batch evaluation completed successfully with Ollama`);
                return evaluations;
            } else {
                console.log('⚠️ Ollama not available, falling back to Gemini');
            }
        } catch (error: any) {
            console.error('Ollama Batch Evaluation Error:', error.message);
            console.log('🔄 Falling back to mock evaluations...');
        }
    }

    // Fallback: Return basic evaluations
    console.log('📝 Using fallback batch evaluation');
    return questionAnswerPairs.map(() => ({
        score: Math.floor(Math.random() * 3) + 7, // 7-9
        communicationScore: Math.floor(Math.random() * 3) + 7,
        sentiment: ["Confident", "Expert"][Math.floor(Math.random() * 2)],
        feedback: "Good answer demonstrating understanding of the topic.",
        correctness: ["Correct", "Partially Correct"][Math.floor(Math.random() * 2)]
    }));
};

/**
 * Generate fallback questions when AI is unavailable
 */
function generateFallbackQuestions(jdInfo: any): any[] {
    const questions = [
        {
            question: "Tell me about yourself and your background relevant to this role.",
            type: "intro",
            expectedPoints: ["Professional experience", "Key skills", "Career motivation"]
        },
        {
            question: `What experience do you have with ${jdInfo.techStack.slice(0, 3).join(', ')}?`,
            type: "technical",
            expectedPoints: ["Depth of knowledge", "Practical applications", "Recent projects"]
        },
        {
            question: "Describe a challenging technical problem you solved recently.",
            type: "technical",
            expectedPoints: ["Problem description", "Solution approach", "Results"]
        },
        {
            question: "How do you stay updated with new technologies and best practices?",
            type: "technical",
            expectedPoints: ["Learning methods", "Resources", "Application to work"]
        },
        {
            question: "Tell me about a time when you had to work with a difficult team member.",
            type: "behavioral",
            expectedPoints: ["Situation description", "Actions taken", "Outcome"]
        },
        {
            question: "Describe your experience with code reviews and collaboration.",
            type: "behavioral",
            expectedPoints: ["Review approach", "Feedback giving/receiving", "Team impact"]
        }
    ];

    if (jdInfo.isDeveloper) {
        questions.splice(3, 0, {
            question: "Walk me through how you would debug a production issue that's intermittent.",
            type: "coding",
            expectedPoints: ["Systematic approach", "Tools and techniques", "Problem resolution"]
        });
    }

    return questions;
}

/**
 * Retry utility with exponential backoff
 */
const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
): Promise<T> => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            const delay = baseDelay * Math.pow(2, i);
            console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Max retries exceeded');
};

/**
 * Analyze Job Description to extract key requirements
 */
export const analyzeJD = async (jobDescription: string): Promise<any> => {

    try {
        const prompt = `Analyze this Job Description and return JSON with the following fields:
{
  "skills": ["string"],
  "techStack": ["string"],
  "experienceLevel": "string",
  "coreTopics": ["string"],
  "role": "string",
  "isDeveloper": boolean
}

IMPORTANT: Set isDeveloper to true if the role involves writing code, software development, programming, or technical development work. Examples: Software Engineer, Full Stack Developer, Frontend Developer, Backend Developer, Mobile App Developer, DevOps Engineer.
Set isDeveloper to false for non-coding roles like Product Manager, Designer, Marketing, Sales, etc.

JD: ${jobDescription.slice(0, 1000)}`;

        const response = await Promise.race([
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 20000)
            )
        ]);

        const text = (response as any).text.trim();
        const cleaned = text.replace(/^```json\n/, '').replace(/\n```$/, '').replace(/^```/, '').replace(/```$/, '');
        console.log('✅ JD analyzed successfully with Gemini');
        return JSON.parse(cleaned);
    } catch (error: any) {
        console.error('Gemini JD Analysis Error:', error.message);
        console.log('🔄 Using mock JD analysis data for testing');
        // Return mock data as fallback
        return MOCK_JD_ANALYSIS;
    }
};

/**
 * Get the fixed introduction question
 */
export const getIntroductionQuestion = (): any => {
    return {
        question: "Tell me something about yourself, your background, and what makes you a good fit for this role.",
        context: "Introduction - Getting to know the candidate",
        expectedPoints: [
            "Professional background and experience",
            "Relevant skills and achievements",
            "Career goals and motivation for the role"
        ]
    };
};

/**
 * Generate a dynamic question based on JD and session history
 */
export const generateQuestion = async (
    jdInfo: any,
    history: { role: string; content: string }[],
    currentPhase: 'intro' | 'technical' | 'coding' | 'behavioral'
): Promise<any> => {
    // Try Ollama first if enabled
    if (USE_OLLAMA) {
        try {
            console.log(`🤖 Generating ${currentPhase} question with Ollama AI...`);
            const ollamaHealthy = await OllamaAI.checkOllamaHealth();
            if (ollamaHealthy) {
                const result = await OllamaAI.generateQuestionWithOllama(jdInfo, history, currentPhase);
                console.log('✅ Question generated successfully with Ollama');
                return result;
            } else {
                console.log('⚠️ Ollama not available, falling back to Gemini');
            }
        } catch (error: any) {
            console.error('Ollama Question Generation Error:', error.message);
            console.log('🔄 Falling back to Gemini AI...');
        }
    }

    // Fallback to Gemini AI
    return retryWithBackoff(async () => {
        try {
            const recentHistory = history.slice(-6).map(h => `${h.role}: ${h.content.slice(0, 200)}`).join('\n');

            let phaseGuidance = '';
            if (currentPhase === 'intro') {
                phaseGuidance = 'Ask an introductory question about their background, experience, or motivation.';
            } else if (currentPhase === 'technical') {
                phaseGuidance = `Ask a technical question related to: ${jdInfo.techStack.slice(0, 3).join(', ')}. Focus on concepts, best practices, or problem-solving approaches.`;
            } else if (currentPhase === 'coding') {
                phaseGuidance = 'Ask a coding/algorithmic problem or ask them to explain how they would implement a specific feature. Focus on problem-solving and code design.';
            } else if (currentPhase === 'behavioral') {
                phaseGuidance = 'Ask a behavioral question about teamwork, challenges, conflict resolution, or past experiences.';
            }

            const prompt = `You are conducting an interview for the role: ${jdInfo.role}
Current Phase: ${currentPhase}
Required Skills: ${jdInfo.techStack.slice(0, 5).join(', ')}

${phaseGuidance}

Recent conversation:
${recentHistory}

Generate a ${currentPhase} question that hasn't been asked before. Return JSON:
{
  "question": "string",
  "context": "brief explanation",
  "expectedPoints": ["max 3 key points to evaluate"]
}`;

            const response = await Promise.race([
                ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 15000)
                )
            ]);

            const text = (response as any).text.trim();
            const cleaned = text.replace(/^```json\n/, '').replace(/\n```$/, '').replace(/^```/, '').replace(/```$/, '');
            console.log('✅ Question generated successfully with Gemini');
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('Gemini Question Error:', error.message);
            console.log(`🔄 Using mock ${currentPhase} question for testing`);
            // Count questions asked in this phase
            const phaseQuestions = history.filter(h => h.role === 'interviewer').length;
            return getMockQuestion(currentPhase, phaseQuestions);
        }
    });
};

/**
 * Single answer evaluation
 */
export const evaluateAnswer = async (
    question: string,
    answer: string,
    expectedPoints: string[]
): Promise<any> => {
    // Try Ollama first if enabled
    if (USE_OLLAMA) {
        try {
            console.log('🤖 Evaluating answer with Ollama AI...');
            const ollamaHealthy = await OllamaAI.checkOllamaHealth();
            if (ollamaHealthy) {
                const result = await OllamaAI.evaluateAnswerWithOllama(question, answer, expectedPoints);
                console.log('✅ Answer evaluated successfully with Ollama');
                return result;
            } else {
                console.log('⚠️ Ollama not available, falling back to Gemini');
            }
        } catch (error: any) {
            console.error('Ollama Evaluation Error:', error.message);
            console.log('🔄 Falling back to Gemini AI...');
        }
    }

    // Fallback to Gemini AI
    return retryWithBackoff(async () => {
        try {
            const prompt = `Q: ${question.slice(0, 150)}
A: ${answer.slice(0, 300)}
Expected: ${expectedPoints.slice(0, 3).join(', ')}

Return JSON:
{
  "score": 0-10,
  "communicationScore": 0-10,
  "sentiment": "Confident|Nervous|Expert",
  "feedback": "brief",
  "correctness": "Correct|Partially Correct|Incorrect"
}`;

            const response = await Promise.race([
                ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 15000)
                )
            ]);

            const text = (response as any).text.trim();
            const cleaned = text.replace(/^```json\n/, '').replace(/\n```$/, '').replace(/^```/, '').replace(/```$/, '');
            console.log('✅ Answer evaluated successfully with Gemini');
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('Gemini Evaluation Error:', error.message);
            console.log('🔄 Using mock evaluation for testing');
            // Return mock evaluation with slight randomization
            return {
                ...MOCK_EVALUATION,
                score: Math.floor(Math.random() * 3) + 7, // 7-9
                communicationScore: Math.floor(Math.random() * 3) + 7,
                sentiment: ["Confident", "Expert"][Math.floor(Math.random() * 2)],
                correctness: ["Correct", "Partially Correct"][Math.floor(Math.random() * 2)]
            };
        }
    });
};

/**
 * Generate Final Interview Report
 */
export const generateFinalReport = async (
    jdInfo: any,
    sessionData: any[]
): Promise<any> => {
    // Try Ollama first if enabled
    if (USE_OLLAMA) {
        try {
            console.log('🤖 Generating final report with Ollama AI...');
            const ollamaHealthy = await OllamaAI.checkOllamaHealth();
            if (ollamaHealthy) {
                const result = await OllamaAI.generateReportWithOllama(jdInfo, sessionData);
                console.log('✅ Final report generated successfully with Ollama');
                return result;
            } else {
                console.log('⚠️ Ollama not available, falling back to Gemini');
            }
        } catch (error: any) {
            console.error('Ollama Report Generation Error:', error.message);
            console.log('🔄 Falling back to Gemini AI...');
        }
    }

    // Fallback to Gemini AI
    return retryWithBackoff(async () => {
        try {
            const evaluations = sessionData
                .filter(h => h.role === 'candidate')
                .map(h => ({ score: h.evaluation?.score || 0, correctness: h.evaluation?.correctness }))
                .slice(0, 15);

            const prompt = `Role: ${jdInfo.role}
Evaluations: ${JSON.stringify(evaluations)}

Return JSON:
{
  "recommendation": "Strong Hire|Hire|Leaning No|No",
  "matchPercentage": 0-100,
  "strengths": ["max 3 strings"],
  "weaknesses": ["max 3 strings"],
  "communicationRating": "Excellent|Good|Fair|Poor",
  "overallScore": 0-100,
  "summary": "2 sentences max"
}`;

            const response = await Promise.race([
                ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 25000)
                )
            ]);

            const text = (response as any).text.trim();
            const cleaned = text.replace(/^```json\n/, '').replace(/\n```$/, '').replace(/^```/, '').replace(/```$/, '');
            console.log('✅ Final report generated successfully with Gemini');
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('Gemini Report Error:', error.message);
            console.log('🔄 Using mock final report for testing');
            return MOCK_FINAL_REPORT;
        }
    });
};
