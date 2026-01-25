// Interview Types Constants - Configuration for interview type selection
// Modify these constants to add/remove interview types

import { Code2, Layers, FileText, Zap, Database, Boxes } from 'lucide-react';

export interface InterviewType {
    id: string;
    label: string;
    technology: string;
    level: 'junior' | 'mid' | 'senior' | 'custom';
    description: string;
    icon: string;
    requiresJD: boolean; // Whether job description is required
    language: 'javascript' | 'python' | 'java' | 'typescript'; // Language for the code editor
    defaultCode: string; // Starting code template
}

export const INTERVIEW_TYPES: InterviewType[] = [
    {
        id: 'jd-based',
        label: 'Based on Job Description',
        technology: 'Custom',
        level: 'custom',
        description: 'Tailored questions based on your specific JD',
        icon: 'FileText',
        requiresJD: true,
        language: 'javascript',
        defaultCode: '// Write your solution here\nfunction solution() {\n  // Implementation\n}'
    },
    {
        id: 'react-junior',
        label: 'React JS - Junior Level',
        technology: 'React',
        level: 'junior',
        description: 'Fundamentals, hooks, components, props & state',
        icon: 'Code2',
        requiresJD: false,
        language: 'javascript',
        defaultCode: 'import React from "react";\n\nexport default function App() {\n  return (\n    <div>Hello World</div>\n  );\n}'
    },
    {
        id: 'react-mid',
        label: 'React JS - Mid Level',
        technology: 'React',
        level: 'mid',
        description: 'Advanced hooks, performance, state management',
        icon: 'Code2',
        requiresJD: false,
        language: 'javascript',
        defaultCode: 'import React, { useState, useEffect } from "react";\n\nexport const CustomHook = () => {\n  // Implement logic\n};'
    },
    {
        id: 'react-senior',
        label: 'React JS - Senior Level',
        technology: 'React',
        level: 'senior',
        description: 'Architecture, optimization, design patterns',
        icon: 'Code2',
        requiresJD: false,
        language: 'javascript',
        defaultCode: '// Implement a higher-order component or performance optimization\n'
    },
    {
        id: 'python-junior',
        label: 'Python - Junior Level',
        technology: 'Python',
        level: 'junior',
        description: 'Basics, data structures, functions & OOP',
        icon: 'Zap',
        requiresJD: false,
        language: 'python',
        defaultCode: 'def solution():\n    # Write your python code here\n    pass\n\nif __name__ == "__main__":\n    print("Hello Python")'
    },
    {
        id: 'python-mid',
        label: 'Python - Mid Level',
        technology: 'Python',
        level: 'mid',
        description: 'Advanced OOP, decorators, generators, async',
        icon: 'Zap',
        requiresJD: false,
        language: 'python',
        defaultCode: 'class solution:\n    def __init__(self):\n        pass\n\n    def process(self):\n        pass'
    },
    {
        id: 'python-senior',
        label: 'Python - Senior Level',
        technology: 'Python',
        level: 'senior',
        description: 'Design patterns, performance, concurrency',
        icon: 'Zap',
        requiresJD: false,
        language: 'python',
        defaultCode: 'import asyncio\n\nasync def main():\n    # Implement async logic\n    pass'
    },
    {
        id: 'fullstack-mid',
        label: 'Full Stack - Mid Level',
        technology: 'Full Stack',
        level: 'mid',
        description: 'Frontend, backend, databases & deployment',
        icon: 'Layers',
        requiresJD: false,
        language: 'javascript',
        defaultCode: '// Fullstack challenge\n// Can treat this area as backend logic (Node.js)'
    },
    {
        id: 'fullstack-senior',
        label: 'Full Stack - Senior Level',
        technology: 'Full Stack',
        level: 'senior',
        description: 'System design, architecture, scalability',
        icon: 'Layers',
        requiresJD: false,
        language: 'javascript',
        defaultCode: '// Architecture design logic'
    },
    {
        id: 'nodejs-mid',
        label: 'Node.js - Mid Level',
        technology: 'Node.js',
        level: 'mid',
        description: 'Express, APIs, databases & authentication',
        icon: 'Database',
        requiresJD: false,
        language: 'javascript',
        defaultCode: 'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("Hello");\n});'
    },
    {
        id: 'nodejs-senior',
        label: 'Node.js - Senior Level',
        technology: 'Node.js',
        level: 'senior',
        description: 'Microservices, scaling, performance tuning',
        icon: 'Database',
        requiresJD: false,
        language: 'javascript',
        defaultCode: '// Microservice logic\n'
    },
    {
        id: 'dsa-mid',
        label: 'Data Structures & Algorithms',
        technology: 'DSA',
        level: 'mid',
        description: 'Arrays, trees, graphs, dynamic programming',
        icon: 'Boxes',
        requiresJD: false,
        language: 'javascript', // Default to JS for DSA, user can switch conceptually
        defaultCode: 'function solve(input) {\n  // Write algorithm here\n  return input;\n}'
    }
];

// Default interview type (JD-based)
export const DEFAULT_INTERVIEW_TYPE = INTERVIEW_TYPES[0];

// Helper to get interview type by ID
export const getInterviewTypeById = (id: string): InterviewType | undefined => {
    return INTERVIEW_TYPES.find(type => type.id === id);
};

// Helper to get interview types by technology
export const getInterviewTypesByTechnology = (technology: string): InterviewType[] => {
    return INTERVIEW_TYPES.filter(type => type.technology === technology);
};

// Helper to get interview types by level
export const getInterviewTypesByLevel = (level: string): InterviewType[] => {
    return INTERVIEW_TYPES.filter(type => type.level === level);
};

// Get all unique technologies
export const getTechnologies = (): string[] => {
    return Array.from(new Set(INTERVIEW_TYPES.map(type => type.technology)));
};
