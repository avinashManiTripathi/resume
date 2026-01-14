import axios from 'axios';

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:8000';

/**
 * Check if Ollama AI API is available
 */
export const checkOllamaHealth = async (): Promise<boolean> => {
    try {
        const response = await axios.get(`${OLLAMA_API_URL}/health`, { timeout: 10000 });
        return response.data.status === 'healthy' && response.data.ollama_connected === true;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Ollama health check failed:', errorMessage);
        return false;
    }
};

/**
 * Generate questions and answers using Ollama AI
 */
const generateQA = async (prompt: string, numQuestions: number = 1): Promise<any> => {
    try {
        const response = await axios.post(
            `${OLLAMA_API_URL}/generate`,
            {
                prompt,
                num_questions: numQuestions
            },
            {
                timeout: 60000, // 60 seconds for AI generation
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (response.data.success && response.data.qa_pairs) {
            return response.data.qa_pairs;
        }

        throw new Error('Invalid response from Ollama API');
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const detail = error.response?.data?.detail || error.message;
            throw new Error(`Ollama API error: ${detail}`);
        }
        throw error;
    }
};

/**
 * Analyze Job Description using Ollama AI
 */
export const analyzeJDWithOllama = async (jobDescription: string): Promise<any> => {
    const prompt = `Analyze this Job Description and extract the following information in a structured format:

EXTRACT:
1. Required technical skills (list all mentioned)
2. Technology stack and tools
3. Experience level required (look for: years of experience, seniority level like Junior/Mid/Senior/Lead)
4. Core technical domains and topics
5. Job role/title
6. Whether this is a developer/coding role
7. Required skill depth (basic knowledge vs expert level)

Job Description:
${jobDescription.slice(0, 1500)}

Provide a comprehensive analysis with specific details about:
- How many years of experience are expected
- The seniority level (Entry/Junior/Mid/Senior/Lead)
- Depth of technical knowledge expected (e.g., "must have deep expertise in React" vs "familiarity with React")`;

    const qaResult = await generateQA(prompt, 1);
    const analysisText = qaResult[0]?.answer || '';

    // Parse the AI response to extract structured data
    const experienceYears = extractExperienceYears(analysisText, jobDescription);
    const experienceLevel = extractExperienceLevel(analysisText);

    const analysis = {
        skills: extractList(analysisText, ['skills', 'required skills', 'must have']),
        techStack: extractList(analysisText, ['technology', 'tech stack', 'technologies', 'tools']),
        experienceLevel,
        experienceYears,
        coreTopics: extractList(analysisText, ['topics', 'domains', 'areas', 'focus']),
        role: extractRole(jobDescription),
        isDeveloper: checkIfDeveloper(analysisText, jobDescription)
    };

    return analysis;
};

/**
 * Generate interview question using Ollama AI
 */
export const generateQuestionWithOllama = async (
    jdInfo: any,
    history: { role: string; content: string }[],
    currentPhase: 'intro' | 'technical' | 'coding' | 'behavioral'
): Promise<any> => {
    const recentHistory = history.slice(-4).map(h => `${h.role}: ${h.content.slice(0, 150)}`).join('\n');

    let phaseDescription = '';
    if (currentPhase === 'intro') {
        phaseDescription = 'an introductory question about their background and experience';
    } else if (currentPhase === 'technical') {
        phaseDescription = `a technical question about ${jdInfo.techStack.slice(0, 3).join(', ')} focusing on concepts and best practices`;
    } else if (currentPhase === 'coding') {
        phaseDescription = 'a coding or algorithmic problem-solving question';
    } else if (currentPhase === 'behavioral') {
        phaseDescription = 'a behavioral question about teamwork, challenges, or past experiences';
    }

    const prompt = `You are conducting a job interview for the role: ${jdInfo.role}

Current Interview Phase: ${currentPhase}
Required Skills: ${jdInfo.techStack.slice(0, 5).join(', ')}

Recent conversation context:
${recentHistory}

Generate ${phaseDescription} that has not been asked before. The question should be:
- Relevant to the role and required skills
- Clear and specific
- Appropriate for the interview phase
- Different from questions already asked

Also provide:
1. Brief context for why this question is important
2. 3 key points that should be evaluated in the answer`;

    const qaResult = await generateQA(prompt, 1);
    const aiResponse = qaResult[0];

    return {
        question: aiResponse?.question || 'Tell me about your experience with the technologies mentioned in the job description.',
        context: `${currentPhase} phase - ${aiResponse?.answer?.slice(0, 100) || 'Assessing candidate fit'}`,
        expectedPoints: extractExpectedPoints(aiResponse?.answer || '')
    };
};

/**
 * Evaluate candidate answer using Ollama AI
 */
export const evaluateAnswerWithOllama = async (
    question: string,
    answer: string,
    expectedPoints: string[]
): Promise<any> => {
    const prompt = `As an interview evaluator, assess this candidate's answer:

Question: ${question.slice(0, 200)}

Candidate's Answer: ${answer.slice(0, 500)}

Expected Key Points: ${expectedPoints.join(', ')}

Provide an evaluation covering:
1. Score out of 10 for technical accuracy/relevance
2. Communication quality score out of 10
3. Overall sentiment (Confident/Nervous/Expert)
4. Brief constructive feedback
5. Correctness level (Correct/Partially Correct/Incorrect)`;

    const qaResult = await generateQA(prompt, 1);
    const evaluation = qaResult[0]?.answer || '';

    return {
        score: extractScore(evaluation, 'technical') || 7,
        communicationScore: extractScore(evaluation, 'communication') || 7,
        sentiment: extractSentiment(evaluation),
        feedback: evaluation.slice(0, 200),
        correctness: extractCorrectness(evaluation)
    };
};

/**
 * Generate final interview report using Ollama AI
 */
export const generateReportWithOllama = async (
    jdInfo: any,
    sessionData: any[]
): Promise<any> => {
    const evaluations = sessionData
        .filter(h => h.role === 'candidate' && h.evaluation)
        .map(h => ({
            score: h.evaluation?.score || 0,
            correctness: h.evaluation?.correctness || 'Partially Correct'
        }))
        .slice(0, 15);

    const avgScore = evaluations.length > 0
        ? evaluations.reduce((sum, e) => sum + e.score, 0) / evaluations.length
        : 0;

    const prompt = `Generate a comprehensive interview assessment report for a ${jdInfo.role} candidate.

Performance Data:
- Number of questions answered: ${evaluations.length}
- Average score: ${avgScore.toFixed(1)}/10
- Answer correctness distribution: ${JSON.stringify(evaluations.map(e => e.correctness))}

Provide:
1. Overall recommendation (Strong Hire/Hire/Leaning No/No)
2. Match percentage (0-100) for the role
3. Top 3 strengths
4. Top 3 areas for improvement
5. Communication rating (Excellent/Good/Fair/Poor)
6. Overall score (0-100)
7. Brief summary (2-3 sentences)`;

    const qaResult = await generateQA(prompt, 1);
    const reportText = qaResult[0]?.answer || '';

    return {
        recommendation: extractRecommendation(reportText),
        matchPercentage: Math.round(avgScore * 10),
        strengths: extractList(reportText, ['strength', 'strong', 'good at']).slice(0, 3),
        weaknesses: extractList(reportText, ['weakness', 'improve', 'area for development']).slice(0, 3),
        communicationRating: extractCommunicationRating(reportText),
        overallScore: Math.round(avgScore * 10),
        summary: reportText.slice(0, 250)
    };
};

// ============= Helper Functions =============

function extractList(text: string, keywords: string[]): string[] {
    const items: string[] = [];
    const lines = text.split('\n');

    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        if (keywords.some(kw => lowerLine.includes(kw))) {
            // Extract items after common list markers
            const match = line.match(/[-•*]\s*(.+)|^\d+\.\s*(.+)|:\s*(.+)/);
            if (match) {
                const item = (match[1] || match[2] || match[3])?.trim();
                if (item && item.length > 3 && item.length < 100) {
                    items.push(item);
                }
            }
        }
    }

    return items.length > 0 ? items : ['JavaScript', 'React', 'Node.js'];
}

function extractExperienceYears(text: string, jd: string): number {
    const combined = text + ' ' + jd;

    // Look for explicit years patterns
    const patterns = [
        /(\d+)\+?\s*years?\s+of\s+experience/i,
        /(\d+)\+?\s*years?\s+experience/i,
        /experience[:\s]+(\d+)\+?\s*years?/i,
        /minimum\s+(\d+)\s+years?/i,
        /at least\s+(\d+)\s+years?/i
    ];

    for (const pattern of patterns) {
        const match = combined.match(pattern);
        if (match) {
            const years = parseInt(match[1]);
            if (years >= 0 && years <= 20) return years;
        }
    }

    return 3; // default to mid-level
}

function extractExperienceLevel(text: string): string {
    const levels = ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Principal'];
    const lowerText = text.toLowerCase();

    for (const level of levels.reverse()) {
        if (lowerText.includes(level.toLowerCase())) {
            return `${level} Level`;
        }
    }

    // Check for years
    const yearsMatch = text.match(/(\d+)\+?\s*years?/i);
    if (yearsMatch) {
        const years = parseInt(yearsMatch[1]);
        if (years >= 7) return 'Senior (7+ years)';
        if (years >= 4) return 'Mid-Level (4-6 years)';
        if (years >= 2) return 'Junior (2-3 years)';
        return 'Entry Level (0-1 years)';
    }

    return 'Mid-Level';
}

function extractRole(jd: string): string {
    const lines = jd.split('\n').slice(0, 5);
    for (const line of lines) {
        if (line.length > 10 && line.length < 100 && !line.includes(':')) {
            return line.trim();
        }
    }
    return 'Software Developer';
}

function checkIfDeveloper(analysisText: string, jd: string): boolean {
    const devKeywords = ['developer', 'engineer', 'programming', 'coding', 'software', 'backend', 'frontend', 'full stack', 'devops'];
    const combined = (analysisText + jd).toLowerCase();
    return devKeywords.some(kw => combined.includes(kw));
}

function extractExpectedPoints(text: string): string[] {
    const points = extractList(text, ['point', 'should', 'evaluate', 'key', 'important']);
    if (points.length >= 2) return points.slice(0, 3);

    return [
        'Clear explanation of concepts',
        'Relevant examples or experience',
        'Understanding of best practices'
    ];
}

function extractScore(text: string, type: string): number | null {
    const patterns = [
        new RegExp(`${type}[^\\d]*(\\d+)\\s*/\\s*10`, 'i'),
        new RegExp(`${type}[^\\d]*(\\d+)\\s*out of\\s*10`, 'i'),
        new RegExp(`${type}[^\\d]*:\\s*(\\d+)`, 'i')
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            const score = parseInt(match[1]);
            if (score >= 0 && score <= 10) return score;
        }
    }

    return null;
}

function extractSentiment(text: string): string {
    const sentiments = ['Expert', 'Confident', 'Nervous', 'Uncertain'];
    const lowerText = text.toLowerCase();

    for (const sentiment of sentiments) {
        if (lowerText.includes(sentiment.toLowerCase())) {
            return sentiment;
        }
    }

    return 'Confident';
}

function extractCorrectness(text: string): string {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('incorrect') || lowerText.includes('wrong')) return 'Incorrect';
    if (lowerText.includes('partially') || lowerText.includes('mostly')) return 'Partially Correct';
    return 'Correct';
}

function extractRecommendation(text: string): string {
    const recommendations = ['Strong Hire', 'Hire', 'Leaning No', 'No'];
    const lowerText = text.toLowerCase();

    for (const rec of recommendations) {
        if (lowerText.includes(rec.toLowerCase())) {
            return rec;
        }
    }

    if (lowerText.includes('recommend') && lowerText.includes('hire')) return 'Hire';
    return 'Leaning No';
}

function extractCommunicationRating(text: string): string {
    const ratings = ['Excellent', 'Good', 'Fair', 'Poor'];
    const lowerText = text.toLowerCase();

    for (const rating of ratings) {
        if (lowerText.includes(rating.toLowerCase())) {
            return rating;
        }
    }

    return 'Good';
}
