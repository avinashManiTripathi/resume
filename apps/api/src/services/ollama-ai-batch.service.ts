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
    const experienceYears = jdInfo.experienceYears || 3;
    const isExperienced = experienceYears >= 4;
    const isDeveloper = jdInfo.isDeveloper || false;

    const prompt = `You are conducting a comprehensive technical interview for: ${jdInfo.role}
Experience Required: ${jdInfo.experienceLevel} (${experienceYears}+ years)

CRITICAL RULES - EXPERIENCE-APPROPRIATE QUESTIONS:
${isExperienced ? `
🔴 FOR ${experienceYears}+ YEARS EXPERIENCE - ASK DEEP QUESTIONS:
- System architecture and design decisions
- Performance optimization and scalability
- Real-world debugging and problem-solving scenarios
- Trade-offs and design patterns
- Production challenges and solutions
- Code review and mentoring approaches

❌ NEVER ASK THESE FOR EXPERIENCED CANDIDATES:
- "What is [basic concept]?" (e.g., "What is React?")
- Basic definition questions
- Textbook theory without application
- Simple "how to" questions
- Generic HR questions in technical phase
` : `
🟡 FOR ENTRY/JUNIOR LEVEL:
- Fundamental concepts with examples
- Best practices and common patterns
- Basic problem-solving
- Learning approach and growth mindset
`}

TECHNICAL STACK TO COVER: ${techStack.join(', ')}
Additional Skills: ${skills.join(', ')}
Core Topics: ${coreTopics.join(', ')}

QUESTION DISTRIBUTION (Total: 20-25 questions):

1. Introduction Phase (2-3 questions):
   - Background and relevant experience
   - Career motivation and goals
   - Why this specific role
   ${isExperienced ? '- Most challenging project or technical leadership experience' : ''}

2. Technical Phase - DEEP DIVE (12-15 questions):
   ${isExperienced ? `
   For ${experienceYears}+ years experience, ask:
   
   GOOD Examples:
   ✅ "Describe a situation where you had to optimize a React application's performance. What tools did you use to identify bottlenecks, and what specific optimizations did you implement?"
   ✅ "How would you architect a microservices system for [domain]? Discuss service boundaries, data consistency, and communication patterns."
   ✅ "Walk me through how you would debug a memory leak in a Node.js production application."
   
   BAD Examples (NEVER use these):
   ❌ "What is Docker?" 
   ❌ "Explain what REST API is"
   ❌ "What are the features of React?"
   
   For EACH technology in: ${techStack.slice(0, 8).join(', ')}
   - Real-world scenarios and challenges
   - Architecture and scalability considerations  
   - Performance optimization strategies
   - Debugging complex issues
   - Design patterns and trade-offs
   ` : `
   For each technology, focus on:
   - Core concepts with practical examples
   - Common use cases and best practices
   - Basic troubleshooting
   `}

3. ${jdInfo.isDeveloper ? `System Design & Problem-Solving (3-4 questions):
   ${isExperienced ? `
   - Design scalable systems (mention specific scale: millions of users, high throughput)
   - Database design and optimization
   - Caching strategies and trade-offs
   - API design best practices
   ` : `
   - Basic algorithm problems
   - Code organization
   - Simple system design
   `}` : 'Domain Expertise (3-4 questions)'}

4. Behavioral Phase (3-4 questions):
   - ${isExperienced ? 'Technical leadership and mentoring' : 'Teamwork and collaboration'}
   - Handling conflicts or difficult situations
   - Learning from failures
   - ${isExperienced ? 'Cross-team collaboration and stakeholder management' : 'Initiative and learning approach'}

MANDATORY REQUIREMENTS:
1. Generate EXACTLY 20-25 questions
2. Match question difficulty to ${experienceYears}+ years experience
3. NO basic definition questions for experienced candidates
4. Focus on SCENARIOS, TRADE-OFFS, and REAL-WORLD PROBLEMS
5. Every major technology MUST be covered with depth

FORMAT each question as:
Question: [Your question text]
Type: [intro/technical/coding/behavioral]
Evaluation Points:
- [Point 1]
- [Point 2]
- [Point 3]

Generate the complete interview question set NOW.`;


    console.log({ prompt })

    try {
        // Instead of complex parsing, use multiple simpler prompts
        const questions: any[] = [];

        // Generate questions in batches by category for better control
        const categories = [
            {
                name: 'intro',
                count: 3,
                prompt: isExperienced
                    ? `Generate 3 introduction questions for a ${jdInfo.role} with ${experienceYears}+ years experience. Focus on: technical leadership, challenging projects, and career progression.`
                    : `Generate 3 introduction questions for a ${jdInfo.role}. Focus on: background, motivation, and recent work.`
            },
            {
                name: 'technical',
                count: isExperienced ? 12 : 10,
                prompt: isExperienced
                    ? `Generate ${12} DEEP technical questions for a senior ${jdInfo.role} with ${experienceYears}+ years experience in: ${techStack.slice(0, 6).join(', ')}.

CRITICAL - Ask ONLY scenario-based, advanced questions:
- "How would you optimize React rendering performance in a large application?"
- "Explain your approach to state management in a complex React application"
- "Describe debugging a production memory leak in a React/Node.js app"
- "How would you architect a scalable microservices system?"
- "Walk through your strategy for migrating from REST to GraphQL"

NEVER ask basic questions like "What is React?" or "Explain hooks"

Focus on: Architecture, Performance, Debugging, Trade-offs, Real-world scenarios`
                    : `Generate ${10} technical questions about: ${techStack.join(', ')}. Mix fundamental concepts with practical applications.`
            },
            {
                name: 'coding',
                count: isDeveloper ? 4 : 0,
                prompt: isExperienced
                    ? `Generate 4 advanced system design and problem-solving questions for ${experienceYears}+ years experience. Focus on: scalability, distributed systems, architecture decisions, production debugging.`
                    : `Generate 4 coding and algorithm questions. Focus on: problem-solving approach, code quality, basic algorithms.`
            },
            {
                name: 'behavioral',
                count: 4,
                prompt: isExperienced
                    ? `Generate 4 behavioral questions for a senior developer. Focus on: technical leadership, mentoring, cross-team collaboration, handling complex technical debt.`
                    : `Generate 4 behavioral questions. Focus on: teamwork, learning, handling challenges, time management.`
            }
        ];

        for (const category of categories) {
            if (category.count === 0) continue;

            const categoryPrompt = `${category.prompt}

IMPORTANT: Return your response as a valid JSON array with this exact structure:
[
  {
    "question": "Your question text here",
    "answer": "Brief guidance on what to evaluate: point 1, point 2, point 3"
  }
]

Generate exactly ${category.count} questions in this JSON format.`;

            try {
                const qaResult = await generateQA(categoryPrompt, category.count);
                // qaResult is already an array of {question, answer} pairs
                for (const pair of qaResult) {
                    // Extract evaluation points from the answer if it contains list items
                    const expectedPoints = extractEvaluationPoints(pair.answer);

                    questions.push({
                        question: pair.question,
                        type: category.name,
                        expectedPoints
                    });
                }
            } catch (error) {
                console.log(`⚠️ Failed to generate ${category.name} questions, using fallback`);
            }
        }

        // If we got enough questions, use them
        if (questions.length >= 15) {
            console.log(`📊 Successfully generated ${questions.length} questions from AI`);
            return questions.slice(0, 25);
        }

        // Otherwise fall back to enhanced fallback
        console.log(`⚠️ Only ${questions.length} questions generated, using fallback`);
        return generateEnhancedFallbackQuestions(jdInfo);

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


// Helper function to extract evaluation points from answer text
function extractEvaluationPoints(answer: string): string[] {
    const points: string[] = [];

    // Try to extract bullet points or numbered lists
    const lines = answer.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^\d+\./)) {
            const point = trimmed.replace(/^[-•\d.]\s*/, '').trim();
            if (point.length > 5 && point.length < 100) {
                points.push(point);
            }
        }
    }

    // If no bullet points found, try to split by commas or semicolons
    if (points.length === 0) {
        const parts = answer.split(/[,;]/).map(p => p.trim()).filter(p => p.length > 5 && p.length < 100);
        if (parts.length >= 2) {
            points.push(...parts.slice(0, 3));
        }
    }

    // Default fallback
    if (points.length === 0) {
        return ['Clear explanation', 'Relevant examples', 'Best practices'];
    }

    return points.slice(0, 3);
}

// Simpler parser for line-by-line question format
function parseQuestions(text: string, type: string): any[] {
    const questions: any[] = [];
    const lines = text.split('\n');

    let currentQuestion: string | null = null;
    let expectedPoints: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();

        // Check for question line
        if (trimmed.startsWith('Q:') || (trimmed.match(/^\d+\./) && trimmed.includes('?'))) {
            // Save previous question if exists
            if (currentQuestion) {
                questions.push({
                    question: currentQuestion,
                    type,
                    expectedPoints: expectedPoints.length > 0 ? expectedPoints : ['Clear explanation', 'Relevant examples', 'Best practices']
                });
            }

            // Start new question
            currentQuestion = trimmed.replace(/^(Q:|Question \d+:|^\d+\.)\s*/i, '').trim();
            expectedPoints = [];
        }
        // Check for evaluation points
        else if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
            const point = trimmed.replace(/^[-•]\s*/, '').trim();
            if (point.length > 3 && point.length < 100) {
                expectedPoints.push(point);
            }
        }
    }

    // Save last question
    if (currentQuestion) {
        questions.push({
            question: currentQuestion,
            type,
            expectedPoints: expectedPoints.length > 0 ? expectedPoints : ['Clear explanation', 'Relevant examples', 'Best practices']
        });
    }

    return questions;
}

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
    const experienceYears = jdInfo?.experienceYears || 3;
    const isExperienced = experienceYears >= 4;

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
            question: isExperienced
                ? `Describe your most challenging technical project and the leadership role you played in it.`
                : "Walk me through your most recent project or responsibility.",
            type: "intro",
            expectedPoints: isExperienced
                ? ["Technical complexity", "Leadership approach", "Impact and outcomes"]
                : ["Project scope", "Your role", "Impact achieved"]
        }
    );

    // 2. Technical Questions (12-15 questions) - Depth based on experience
    if (isExperienced) {
        // Senior-level deep technical questions
        techStack.slice(0, 6).forEach((tech: string) => {
            questions.push(
                {
                    question: `Describe a production issue you encountered with ${tech}. How did you identify the root cause and what was your solution?`,
                    type: "technical",
                    expectedPoints: ["Problem diagnosis", "Solution approach", "Prevention strategies"]
                },
                {
                    question: `How would you architect a scalable system using ${tech}? Discuss your design decisions and trade-offs.`,
                    type: "technical",
                    expectedPoints: ["Architecture patterns", "Scalability strategies", "Trade-off analysis"]
                }
            );
        });

        questions.push(
            {
                question: "Explain your approach to optimizing application performance. What tools and techniques do you use?",
                type: "technical",
                expectedPoints: ["Profiling tools", "Optimization strategies", "Measurement and validation"]
            },
            {
                question: "Walk me through how you would conduct a code review for a critical pull request. What are your key criteria?",
                type: "technical",
                expectedPoints: ["Code quality factors", "Security considerations", "Team collaboration"]
            }
        );
    } else {
        // Junior-level fundamental questions
        techStack.slice(0, 8).forEach((tech: string) => {
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

        questions.push(
            {
                question: "How do you approach debugging when encountering an error you haven't seen before?",
                type: "technical",
                expectedPoints: ["Systematic approach", "Research methods", "Problem-solving"]
            },
            {
                question: "Explain your approach to writing clean and maintainable code.",
                type: "technical",
                expectedPoints: ["Code organization", "Naming conventions", "Documentation"]
            }
        );
    }

    // 3. Coding/Algorithm Questions (3-4 questions) if developer
    if (isDeveloper) {
        if (isExperienced) {
            questions.push(
                {
                    question: "Design a distributed caching system that can serve millions of requests per second. What considerations would you make?",
                    type: "coding",
                    expectedPoints: ["Cache strategy", "Consistency models", "Scalability approach"]
                },
                {
                    question: "How would you debug and fix a memory leak in a production application without taking it offline?",
                    type: "coding",
                    expectedPoints: ["Diagnostic approach", "Tools and monitoring", "Safe deployment strategy"]
                },
                {
                    question: "Describe your process for migrating a monolithic application to microservices. What challenges would you anticipate?",
                    type: "coding",
                    expectedPoints: ["Migration strategy", "Service boundaries", "Risk mitigation"]
                }
            );
        } else {
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
                    question: "How would you design a simple REST API for a todo application?",
                    type: "coding",
                    expectedPoints: ["API design", "HTTP methods", "Data modeling"]
                }
            );
        }
    }

    // 4. Behavioral Questions (3-4 questions)
    questions.push(
        {
            question: isExperienced
                ? "Tell me about a time when you had to mentor a junior developer or lead a technical initiative. What was your approach?"
                : "Tell me about a time when you had to learn a new technology quickly for a project.",
            type: "behavioral",
            expectedPoints: isExperienced
                ? ["Mentoring approach", "Communication strategy", "Outcome"]
                : ["Learning approach", "Challenges faced", "Outcome"]
        },
        {
            question: "Describe a situation where you disagreed with a teammate about a technical decision. How did you handle it?",
            type: "behavioral",
            expectedPoints: ["Situation description", "Resolution approach", "Result"]
        },
        {
            question: "Tell me about a project that failed or didn't meet expectations. What did you learn?",
            type: "behavioral",
            expectedPoints: ["Situation", "Response", "Lessons learned"]
        },
        {
            question: isExperienced
                ? "How do you balance technical debt with feature delivery when managing multiple stakeholders?"
                : "How do you prioritize tasks when working on multiple projects with tight deadlines?",
            type: "behavioral",
            expectedPoints: isExperienced
                ? ["Stakeholder management", "Technical vs business trade-offs", "Communication"]
                : ["Prioritization method", "Communication", "Time management"]
        }
    );

    return questions.slice(0, 25);
}

// Keep simple fallback for backward compatibility
function generateFallbackQuestions(isDeveloper: boolean): any[] {
    return generateEnhancedFallbackQuestions({ isDeveloper });
}
