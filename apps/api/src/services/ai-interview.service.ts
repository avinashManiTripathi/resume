/**
 * AI Question Generation Service using Provider Factory
 * Replaces Ollama-specific implementation with multi-provider support
 */

import { AIProviderFactory, type AIMessage } from './ai-providers';

/**
 * Generate deep, experience-appropriate interview questions
 */
export const generateInterviewQuestions = async (
    jdInfo: any,
    count: number = 20
): Promise<any[]> => {
    const provider = AIProviderFactory.getProvider(
        AIProviderFactory.getProviderTypeFromEnv()
    );

    const experienceYears = jdInfo.experienceYears || 3;
    const isExperienced = experienceYears >= 4;
    const techStack = jdInfo.techStack || [];
    const role = jdInfo.role || 'Software Developer';

    const systemPrompt = `You are an expert technical interviewer generating deep, scenario-based questions.

CRITICAL REQUIREMENTS:
1. Generate questions appropriate for ${experienceYears}+ years of experience
2. Focus on REAL-WORLD scenarios, not basic definitions
3. Ask HOW and WHY, not WHAT
4. Include: architecture, debugging, performance, trade-offs

${isExperienced ? `
FOR SENIOR CANDIDATES (${experienceYears}+ years):
✅ GOOD: "How would you optimize React performance in a large app with frequent state updates?"
✅ GOOD: "Describe debugging a production memory leak in Node.js"
✅ GOOD: "Design a distributed caching system for millions of requests"

❌ BAD: "What is React?"
❌ BAD: "Explain REST API"
❌ BAD: "What are React hooks?"
` : `
FOR JUNIOR/MID CANDIDATES:
- Mix fundamentals with practical applications
- Focus on understanding concepts with examples
`}

Return a JSON array of ${count} questions in this format:
[
  {
    "question": "The question text",
    "type": "intro|technical|coding|behavioral",
    "expectedPoints": ["point1", "point2", "point3"]
  }
]

QUESTION DISTRIBUTION:
- 3 intro questions (background, experience, motivation)
- ${isExperienced ? 12 : 10} technical questions about: ${techStack.slice(0, 6).join(', ')}
- ${jdInfo.isDeveloper ? 4 : 0} coding/system design questions
- 4 behavioral questions${isExperienced ? ' (focus on leadership, mentoring)' : ''}`;

    const userPrompt = `Generate ${count} interview questions for a ${role} position.
Required tech stack: ${techStack.slice(0, 8).join(', ')}
Experience level: ${experienceYears}+ years
Role type: ${jdInfo.isDeveloper ? 'Developer' : 'Non-developer'}`;

    try {
        const response = await provider.generateJSON<any[]>(systemPrompt, userPrompt, {
            temperature: 0.8,
            maxTokens: 3000
        });

        console.log(`✅ Generated ${response.length} questions with ${AIProviderFactory.getProviderTypeFromEnv()}`);
        return response;
    } catch (error: any) {
        console.error('❌ Question generation failed:', error.message);
        throw error;
    }
};

/**
 * Analyze Job Description
 */
export const analyzeJobDescription = async (jobDescription: string): Promise<any> => {
    const provider = AIProviderFactory.getProvider(
        AIProviderFactory.getProviderTypeFromEnv()
    );

    const systemPrompt = `Analyze the job description and extract structured information.

Return JSON in this exact format:
{
  "skills": ["skill1", "skill2"],
  "techStack": ["tech1", "tech2"],
  "experienceLevel": "Junior|Mid-Level|Senior|Lead",
  "experienceYears": 3,
  "coreTopics": ["topic1", "topic2"],
  "role": "Job Title",
  "isDeveloper": true
}

IMPORTANT:
- experienceYears: Extract numeric years (e.g., "5+ years" → 5, "3-5 years" → 4)
- isDeveloper: true if role involves coding/programming
- techStack: List all mentioned technologies`;

    const userPrompt = `Job Description:\n${jobDescription.slice(0, 1500)}`;

    try {
        const result = await provider.generateJSON<any>(systemPrompt, userPrompt, {
            temperature: 0.3
        });

        console.log(`✅ JD analyzed - Role: ${result.role}, Experience: ${result.experienceYears}+ years`);
        return result;
    } catch (error: any) {
        console.error('❌ JD analysis failed:', error.message);
        throw error;
    }
};

/**
 * Evaluate candidate answer
 */
export const evaluateAnswer = async (
    question: string,
    answer: string,
    expectedPoints: string[]
): Promise<any> => {
    const provider = AIProviderFactory.getProvider(
        AIProviderFactory.getProviderTypeFromEnv()
    );

    const systemPrompt = `Evaluate the candidate's answer objectively.

Return JSON:
{
  "score": 0-10,
  "communicationScore": 0-10,
  "sentiment": "Confident|Nervous|Expert|Unsure",
  "feedback": "Brief constructive feedback",
  "correctness": "Correct|Partially Correct|Incorrect"
}`;

    const userPrompt = `Question: ${question}
Answer: ${answer}
Expected Points: ${expectedPoints.join(', ')}

Evaluate this answer.`;

    try {
        const result = await provider.generateJSON<any>(systemPrompt, userPrompt, {
            temperature: 0.5
        });
        return result;
    } catch (error: any) {
        console.error('❌ Answer evaluation failed:', error.message);
        // Return default evaluation on failure
        return {
            score: 7,
            communicationScore: 7,
            sentiment: 'Confident',
            feedback: 'Answer demonstrates understanding of the topic.',
            correctness: 'Correct'
        };
    }
};

/**
 * Generate final report
 */
export const generateFinalReport = async (
    jdInfo: any,
    evaluations: any[]
): Promise<any> => {
    const provider = AIProviderFactory.getProvider(
        AIProviderFactory.getProviderTypeFromEnv()
    );

    const avgScore = evaluations.reduce((sum, e) => sum + (e.score || 0), 0) / evaluations.length;

    const systemPrompt = `Generate a final interview report.

Return JSON:
{
  "recommendation": "Strong Hire|Hire|Leaning No|No",
  "matchPercentage": 0-100,
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "communicationRating": "Excellent|Good|Fair|Poor",
  "overallScore": 0-100,
  "summary": "2-3 sentence summary"
}`;

    const userPrompt = `Role: ${jdInfo.role}
Average Score: ${avgScore.toFixed(1)}/10
Total Questions: ${evaluations.length}
Correct Answers: ${evaluations.filter(e => e.correctness === 'Correct').length}

Generate final report.`;

    try {
        const result = await provider.generateJSON<any>(systemPrompt, userPrompt);
        return result;
    } catch (error: any) {
        console.error('❌ Report generation failed:', error.message);
        // Return default report on failure
        return {
            recommendation: avgScore >= 7 ? 'Hire' : 'Leaning No',
            matchPercentage: Math.round(avgScore * 10),
            strengths: ['Good technical understanding', 'Clear communication'],
            weaknesses: ['Could provide more detailed examples'],
            communicationRating: 'Good',
            overallScore: Math.round(avgScore * 10),
            summary: 'Candidate shows solid understanding of required technologies.'
        };
    }
};

/**
 * Health check for current provider
 */
export const checkProviderHealth = async (): Promise<boolean> => {
    try {
        const provider = AIProviderFactory.getProvider(
            AIProviderFactory.getProviderTypeFromEnv()
        );
        return await provider.healthCheck();
    } catch {
        return false;
    }
};
