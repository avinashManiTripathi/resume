// Mock data for interview service when Gemini API is unavailable
// Replace the actual API calls with these mock responses

export const MOCK_JD_ANALYSIS = {
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "NoSQL", "Docker", "AWS"],
    techStack: ["Next.js", "React.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "Kubernetes"],
    experienceLevel: "Senior (5+ years)",
    coreTopics: ["Full Stack Development", "Microservices", "Cloud Architecture", "Database Design", "DevOps"],
    role: "Senior Full Stack Developer",
    isDeveloper: true
};

export const MOCK_QUESTIONS = {
    intro: [
        {
            question: "Tell me about yourself and your background in software development.",
            context: "Introduction - Getting to know the candidate",
            expectedPoints: [
                "Years of experience and key technologies",
                "Current role and responsibilities",
                "Career goals and motivation"
            ]
        }
    ],
    technical: [
        {
            question: "Can you explain the difference between SQL and NoSQL databases? When would you choose one over the other?",
            context: "Database knowledge - Understanding of data storage solutions",
            expectedPoints: [
                "Clear explanation of SQL vs NoSQL",
                "Use cases for each type",
                "Real-world experience with both"
            ]
        },
        {
            question: "What is the event loop in Node.js and how does it work?",
            context: "Node.js core concepts - Understanding asynchronous programming",
            expectedPoints: [
                "Explanation of event loop phases",
                "Non-blocking I/O concept",
                "Practical implications for performance"
            ]
        },
        {
            question: "How would you optimize the performance of a React application?",
            context: "Frontend optimization - Performance best practices",
            expectedPoints: [
                "Code splitting and lazy loading",
                "Memoization techniques",
                "Performance measurement tools"
            ]
        },
        {
            question: "Explain the difference between authentication and authorization. How would you implement both in a web application?",
            context: "Security fundamentals - Access control",
            expectedPoints: [
                "Clear distinction between concepts",
                "Implementation strategies (JWT, OAuth, etc.)",
                "Security best practices"
            ]
        }
    ],
    coding: [
        {
            question: "Write a function to find the longest substring without repeating characters. Explain your approach and analyze the time complexity.",
            context: "Algorithm design - String manipulation and optimization",
            expectedPoints: [
                "Sliding window approach explanation",
                "Correct implementation",
                "Time and space complexity analysis"
            ]
        },
        {
            question: "Implement a debounce function that delays execution until after a specified wait time. How would you use this in a real application?",
            context: "JavaScript utilities - Performance optimization",
            expectedPoints: [
                "Correct debounce implementation",
                "Understanding of closure",
                "Real-world use cases (search, scroll events)"
            ]
        }
    ],
    behavioral: [
        {
            question: "Tell me about a time when you had to debug a complex production issue. How did you approach it?",
            context: "Problem-solving - Production incident handling",
            expectedPoints: [
                "Systematic debugging approach",
                "Use of monitoring/logging tools",
                "Resolution and lessons learned"
            ]
        },
        {
            question: "Describe a situation where you had to work with a difficult team member. How did you handle it?",
            context: "Teamwork - Conflict resolution",
            expectedPoints: [
                "Empathy and understanding",
                "Communication strategies",
                "Positive outcome"
            ]
        },
        {
            question: "Tell me about a time when you had to learn a new technology quickly for a project. What was your approach?",
            context: "Adaptability - Learning agility",
            expectedPoints: [
                "Learning strategy",
                "Application to the project",
                "Results achieved"
            ]
        }
    ]
};

export const MOCK_EVALUATION = {
    score: 8,
    feedback: "Good answer! You demonstrated",
    strengths: [
        "Clear and structured explanation",
        "Used relevant technical terminology",
        "Provided practical examples"
    ],
    improvements: [
        "Could dive deeper into implementation details",
        "Consider mentioning more edge cases"
    ]
};

export const MOCK_FINAL_REPORT = {
    overallScore: 85,
    breakdown: {
        technical: 87,
        coding: 82,
        behavioral: 88,
        communication: 85
    },
    strengths: [
        "Strong understanding of full-stack technologies",
        "Good problem-solving approach with coding challenges",
        "Excellent communication and articulation",
        "Relevant real-world experience"
    ],
    improvements: [
        "Could provide more detailed implementation examples",
        "Consider discussing error handling in more depth",
        "Expand on scalability considerations"
    ],
    recommendation: "Strong Hire - Candidate demonstrates solid technical skills and good cultural fit",
    detailedFeedback: "The candidate showed comprehensive knowledge of the required tech stack, particularly in React, Node.js, and database design. Their coding approach was methodical and well-explained. Behavioral responses indicated strong teamwork and problem-solving abilities. Overall, a well-rounded candidate suitable for a Senior Full Stack Developer role."
};

// Helper function to get mock question based on phase and count
export const getMockQuestion = (phase: string, questionCount: number) => {
    const questions = MOCK_QUESTIONS[phase as keyof typeof MOCK_QUESTIONS] || MOCK_QUESTIONS.technical;
    const index = questionCount % questions.length;
    return questions[index];
};

// Mock phase transitions
export const getNextPhase = (currentPhase: string, questionCount: number) => {
    if (currentPhase === 'intro' && questionCount >= 1) return 'technical';
    if (currentPhase === 'technical' && questionCount >= 4) return 'coding';
    if (currentPhase === 'coding' && questionCount >= 2) return 'behavioral';
    if (currentPhase === 'behavioral' && questionCount >= 3) return 'feedback';
    return currentPhase;
};
