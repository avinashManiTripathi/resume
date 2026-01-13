import { GoogleGenAI } from "@google/genai";

let ai: any;

export const initAI = (apikey: string) => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: apikey });
    }
    return ai;
};

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
    return retryWithBackoff(async () => {
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
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('JD Analysis Error:', error.message);
            throw error;
        }
    });
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
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('Question Error:', error.message);
            throw error;
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
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('Evaluation Error:', error.message);
            throw error;
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
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error('Report Error:', error.message);
            throw error;
        }
    });
};
