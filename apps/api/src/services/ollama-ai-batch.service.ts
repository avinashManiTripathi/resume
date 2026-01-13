import axios from 'axios';

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:8000';

// ============= Local Helper Functions =============

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

// ============= Ollama API Functions =============

/**
 * Generate questions and answers using Ollama AI (internal helper)
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
                timeout: 90000, // 90 seconds for batch generation
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


export const generateAllQuestionsWithOllama = async (
    jdInfo: any
): Promise<any[]> => {
    const techStack = jdInfo.techStack || [];
    const skills = jdInfo.skills || [];
    const coreTopics = jdInfo.coreTopics || [];

    const prompt = `You are conducting a comprehensive technical interview for the role: ${jdInfo.role}

CRITICAL REQUIREMENTS - READ CAREFULLY:
Required Technical Skills: ${techStack.join(', ')}
Additional Skills: ${skills.join(', ')}
Core Topics: ${coreTopics.join(', ')}
Experience Level: ${jdInfo.experienceLevel}

QUESTION DISTRIBUTION (Total: 20-25 questions):
1. Introduction Phase (2-3 questions):
   - Background and experience
   - Career motivation
   - Why this role

2. Technical Phase - FOCUS ON JD REQUIREMENTS (12-15 questions):
   IMPORTANT: Ask specific questions about EACH technology in the tech stack!
   For EACH of these technologies: ${techStack.slice(0, 8).join(', ')}
   - Ask about concepts, best practices, and real-world usage
   - Cover at least 2-3 questions per major technology
   - Example topics: architecture, optimization, debugging, testing
   
3. ${jdInfo.isDeveloper ? 'Coding/Algorithm Phase (3-4 questions):\n   - Algorithm design\n   - Code implementation\n   - Problem-solving approach\n   - System design' : 'Domain Expertise (3-4 questions):\n   - Role-specific scenarios\n   - Decision-making\n   - Problem-solving'}

4. Behavioral Phase (3-4 questions):
   - Teamwork and collaboration
   - Handling conflicts
   - Learning from failures
   - Leadership or initiative

STRICT RULES:
1. Generate EXACTLY 20-25 questions
2. EVERY major technology from the tech stack MUST be covered
3. Questions must be specific to the JD requirements
4. Vary difficulty from basic to advanced
5. Include practical scenario-based questions

FORMAT each question as:
- Clear, specific question text
- Question type (intro/technical/coding/behavioral)
- 3 key evaluation points

Example good technical question:
"Explain how React's Virtual DOM works and why it improves performance. How would you optimize a React component that's re-rendering too frequently?"

Generate the complete interview question set now.`;

    try {
        const qaResult = await generateQA(prompt, 1);
        const response = qaResult[0]?.answer || '';

        // Parse the questions from the response
        const questions = parseAllQuestions(response, jdInfo.isDeveloper);

        console.log(`📊 Parsed ${questions.length} questions from AI response`);
        console.log(`📊 Parsed ${JSON.stringify(questions)} questions from AI response`);

        // Ensure we have at least 20 questions
        if (questions.length < 20) {
            console.log(`⚠️ Only ${questions} questions generated, adding fallback questions`);
            const fallbackQuestions = generateFallbackQuestions(jdInfo.isDeveloper);
            questions.push(...fallbackQuestions.slice(questions.length));
        }

        return questions.slice(0, 25); // Cap at 25 questions
    } catch (error) {
        throw new Error(`Failed to generate batch questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * Batch evaluate all answers at once
 */
export const batchEvaluateAnswersWithOllama = async (
    questionAnswerPairs: { question: string; answer: string; expectedPoints: string[] }[]
): Promise<any[]> => {
    const qaText = questionAnswerPairs.map((pair, idx) =>
        `Q${idx + 1}: ${pair.question.slice(0, 150)}
A${idx + 1}: ${pair.answer.slice(0, 400)}
Expected: ${pair.expectedPoints.join(', ')}`
    ).join('\n\n');

    const prompt = `As an interview evaluator, assess ALL of these candidate answers in one comprehensive evaluation:

${qaText}

For EACH question-answer pair, provide:
1. Technical score (0-10)
2. Communication score (0-10)  
3. Sentiment (Confident/Nervous/Expert/Uncertain)
4. Brief feedback (1-2 sentences)
5. Correctness (Correct/Partially Correct/Incorrect)

Provide the evaluation as structured information for all ${questionAnswerPairs.length} answers.`;

    try {
        const qaResult = await generateQA(prompt, 1);
        const evaluation = qaResult[0]?.answer || '';

        // Parse evaluations for each answer
        const evaluations = parseAllEvaluations(evaluation, questionAnswerPairs.length);

        return evaluations;
    } catch (error) {
        throw new Error(`Failed to batch evaluate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

// ============= Helper Parsing Functions =============

function parseAllQuestions(text: string, isDeveloper: boolean): any[] {
    const questions: any[] = [];
    const lines = text.split('\n');

    let currentQuestion: any = null;
    let expectedPoints: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();

        // Detect question patterns
        if (trimmed.match(/^(Q\d+|Question \d+|\d+\.):/i) ||
            (trimmed.length > 20 && trimmed.endsWith('?'))) {

            // Save previous question
            if (currentQuestion) {
                currentQuestion.expectedPoints = expectedPoints.length > 0 ? expectedPoints : [
                    'Clear explanation',
                    'Relevant examples',
                    'Best practices'
                ];
                questions.push(currentQuestion);
            }

            // Start new question
            const questionText = trimmed.replace(/^(Q\d+|Question \d+|\d+\.):\s*/i, '');
            const type = detectQuestionType(questionText, questions.length);

            currentQuestion = {
                question: questionText,
                type,
                expectedPoints: []
            };
            expectedPoints = [];
        }
        // Collect evaluation points
        else if (trimmed.match(/^[-•*]\s+/)) {
            const point = trimmed.replace(/^[-•*]\s+/, '').trim();
            if (point.length > 5 && point.length < 100) {
                expectedPoints.push(point);
            }
        }
    }

    // Save last question
    if (currentQuestion) {
        currentQuestion.expectedPoints = expectedPoints.length > 0 ? expectedPoints : [
            'Clear explanation',
            'Relevant examples',
            'Best practices'
        ];
        questions.push(currentQuestion);
    }

    // If parsing failed, generate fallback questions (require more than 15 for the new 20-25 quota)
    if (questions.length < 15) {
        console.log(`⚠️ Parsing produced too few questions (${questions.length}), using enhanced fallback`);
        return generateEnhancedFallbackQuestions({ isDeveloper });
    }

    return questions;
}

function detectQuestionType(question: string, index: number): string {
    const lowerQ = question.toLowerCase();

    if (index === 0 || lowerQ.includes('yourself') || lowerQ.includes('background') || lowerQ.includes('experience')) {
        return 'intro';
    }
    if (lowerQ.includes('code') || lowerQ.includes('algorithm') || lowerQ.includes('implement') || lowerQ.includes('write')) {
        return 'coding';
    }
    if (lowerQ.includes('team') || lowerQ.includes('challenge') || lowerQ.includes('conflict') || lowerQ.includes('time when')) {
        return 'behavioral';
    }
    return 'technical';
}

function parseAllEvaluations(text: string, count: number): any[] {
    const evaluations: any[] = [];

    // Try to extract scores and feedback for each answer
    for (let i = 1; i <= count; i++) {
        const answerPattern = new RegExp(`(Q${i}|A${i}|Answer ${i})[^]*?(?=Q${i + 1}|A${i + 1}|Answer ${i + 1}|$)`, 'i');
        const match = text.match(answerPattern);
        const sectionText = match ? match[0] : text;

        evaluations.push({
            score: extractScore(sectionText, 'technical') || extractScore(sectionText, 'score') || 7,
            communicationScore: extractScore(sectionText, 'communication') || 7,
            sentiment: extractSentiment(sectionText),
            feedback: extractFeedback(sectionText, i),
            correctness: extractCorrectness(sectionText)
        });
    }

    return evaluations;
}

function extractFeedback(text: string, answerNum: number): string {
    const sentences = text.split(/[.!]/).filter(s => s.trim().length > 20);
    const feedback = sentences.slice(0, 2).join('. ');
    return feedback.slice(0, 200) || `Answer ${answerNum} demonstrates understanding of the topic.`;
}

/**
 * Generate enhanced fallback questions (20-25 questions)
 */
function generateEnhancedFallbackQuestions(jdInfo: any): any[] {
    const isDeveloper = jdInfo?.isDeveloper || false;
    const techStack = jdInfo?.techStack || ['JavaScript', 'React', 'Node.js'];
    const role = jdInfo?.role || 'Software Developer';

    const questions: any[] = [];

    // 1. Introduction (3 questions)
    questions.push(
        {
            question: `Tell me about yourself and your background relevant to the ${role} position.`,
            type: "intro",
            expectedPoints: ["Professional experience", "Key skills", "Career motivation"]
        },
        {
            question: "What interests you about this role and why do you think you're a good fit?",
            type: "intro",
            expectedPoints: ["Role alignment", "Skills match", "Career goals"]
        },
        {
            question: "Walk me through your most recent project or responsibility.",
            type: "intro",
            expectedPoints: ["Project scope", "Your role", "Impact achieved"]
        }
    );

    // 2. Technical Questions (12-15 questions) - Cover each tech in stack
    techStack.slice(0, 8).forEach((tech: string, idx: number) => {
        questions.push(
            {
                question: `Explain your experience with ${tech}. What projects have you used it in?`,
                type: "technical",
                expectedPoints: [`${tech} fundamentals`, "Practical experience", "Project examples"]
            },
            {
                question: `What are some best practices or common pitfalls when working with ${tech}?`,
                type: "technical",
                expectedPoints: ["Best practices", "Common issues", "Solutions"]
            }
        );
    });

    // Add general technical questions
    questions.push(
        {
            question: "How do you approach performance optimization in web applications?",
            type: "technical",
            expectedPoints: ["Profiling methods", "Optimization techniques", "Measurement"]
        },
        {
            question: "Explain your approach to writing testable and maintainable code.",
            type: "technical",
            expectedPoints: ["Code organization", "Testing strategy", "Documentation"]
        },
        {
            question: "How do you stay current with new technologies and best practices?",
            type: "technical",
            expectedPoints: ["Learning methods", "Resources", "Application to work"]
        }
    );

    // 3. Coding/Algorithm Questions (3-4 questions) if developer
    if (isDeveloper) {
        questions.push(
            {
                question: "Describe how you would debug a production issue that only occurs intermittently.",
                type: "coding",
                expectedPoints: ["Systematic approach", "Tools and logging", "Root cause analysis"]
            },
            {
                question: "Explain your process for code review. What do you look for?",
                type: "coding",
                expectedPoints: ["Code quality factors", "Best practices", "Team collaboration"]
            },
            {
                question: "How would you design a system to handle high traffic and ensure scalability?",
                type: "coding",
                expectedPoints: ["Architecture decisions", "Scaling strategies", "Trade-offs"]
            }
        );
    }

    // 4. Behavioral Questions (3-4 questions)
    questions.push(
        {
            question: "Tell me about a time when you had to learn a new technology quickly for a project.",
            type: "behavioral",
            expectedPoints: ["Learning approach", "Challenges faced", "Outcome"]
        },
        {
            question: "Describe a situation where you disagreed with a teammate. How did you handle it?",
            type: "behavioral",
            expectedPoints: ["Conflict description", "Resolution approach", "Result"]
        },
        {
            question: "Tell me about a project that failed or didn't meet expectations. What did you learn?",
            type: "behavioral",
            expectedPoints: ["Situation", "Response", "Lessons learned"]
        },
        {
            question: "How do you prioritize tasks when working on multiple projects with tight deadlines?",
            type: "behavioral",
            expectedPoints: ["Prioritization method", "Communication", "Time management"]
        }
    );

    return questions.slice(0, 25);
}

// Keep simple fallback for backward compatibility
function generateFallbackQuestions(isDeveloper: boolean): any[] {
    return generateEnhancedFallbackQuestions({ isDeveloper });
}
