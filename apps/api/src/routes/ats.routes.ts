import { Router, Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

import mammoth from 'mammoth';
const { PDFParse } = require("pdf-parse");
const pdfParse = PDFParse;


const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed'));
        }
    }
});

// Initialize Gemini AI with the same approach as ai-analysis.ts
const ai = new GoogleGenAI({ apiKey: 'AIzaSyDkDm9CcAvoxwZeym5VhL9zE92ZXBQPNF0' });

/**
 * Extract text from PDF
 */
/**
 * Helper function to extract text from uploaded file
 */
async function extractTextFromFile(file: Buffer): Promise<string> {
    try {
        // pdf-parse v2 API: create parser instance with buffer
        const parser = new pdfParse({ data: file });

        // Extract text using getText() method
        const result = await parser.getText();

        if (!result || !result.text) {
            throw new Error('No text extracted from PDF');
        }

        console.log('PDF parsed successfully, text length:', result.text.length);
        return result.text;
    } catch (error: any) {
        console.error('PDF parsing error:', error);
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
}


/**
 * Extract text from DOCX
 */
async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
}

/**
 * Analyze resume with Gemini AI
 */
async function analyzeResumeWithAI(resumeText: string): Promise<any> {
    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer and career coach. Analyze the following resume and provide a detailed assessment.

Resume Content:
${resumeText}

Please provide your analysis in the following JSON format:
{
  "score": <number between 0-100>,
  "feedback": {
    "strengths": [<array of 3-5 strength points>],
    "weaknesses": [<array of 3-5 weakness points>],
    "suggestions": [<array of 4-6 specific improvement suggestions>]
  },
  "keywords": {
    "found": [<array of important keywords found in the resume>],
    "missing": [<array of commonly expected keywords that are missing>]
  },
  "formatting": {
    "score": <number between 0-100>,
    "issues": [<array of formatting issues if any>]
  }
}

Scoring Criteria:
- Content Quality (40%): Relevant experience, achievements, skills
- Keywords (30%): Industry-specific keywords, action verbs
- Formatting (20%): ATS-friendly structure, readability
- Completeness (10%): All necessary sections present

Be specific and actionable in your feedback. Focus on ATS compatibility and professional standards.

Return ONLY the JSON object, nothing else.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    const responseText = response.text;

    if (!responseText) {
        throw new Error('AI returned empty response');
    }

    // Clean the response - remove markdown code blocks if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // Extract JSON from response
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse AI response');
}

/**
 * Check ATS score
 * POST /api/ats/check
 */
router.post('/check', upload.single('resume'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract text from file
        let resumeText: string;
        if (req.file.mimetype === 'application/pdf') {
            resumeText = await extractTextFromFile(req.file.buffer);
        } else {
            resumeText = await extractTextFromDOCX(req.file.buffer);
        }

        if (!resumeText || resumeText.trim().length < 100) {
            return res.status(400).json({
                error: 'Could not extract enough text from the resume. Please ensure the file is not corrupted.'
            });
        }

        // Analyze with Gemini AI
        const analysis = await analyzeResumeWithAI(resumeText);

        res.json(analysis);
    } catch (error) {
        console.error('Error checking ATS score:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to analyze resume'
        });
    }
});

/**
 * Get sample analysis (for testing)
 * GET /api/ats/sample
 */
router.get('/sample', async (req: Request, res: Response) => {
    const sampleResult = {
        score: 78,
        feedback: {
            strengths: [
                "Strong use of action verbs throughout the resume",
                "Quantifiable achievements with specific metrics",
                "Clear and concise professional summary",
                "Relevant technical skills section",
                "Well-structured work experience"
            ],
            weaknesses: [
                "Missing keywords for your target industry",
                "Education section could be more detailed",
                "No certifications or professional development listed",
                "Limited use of industry-specific terminology"
            ],
            suggestions: [
                "Add more industry-specific keywords (e.g., 'Agile', 'Scrum', 'CI/CD')",
                "Include relevant certifications or online courses",
                "Expand on your most recent role with more achievements",
                "Add a skills section with both technical and soft skills",
                "Consider adding a projects or portfolio section",
                "Use more specific metrics and numbers to quantify impact"
            ]
        },
        keywords: {
            found: [
                "JavaScript",
                "React",
                "Node.js",
                "Team Leadership",
                "Project Management",
                "Problem Solving"
            ],
            missing: [
                "TypeScript",
                "AWS",
                "Docker",
                "Kubernetes",
                "Microservices",
                "Agile/Scrum"
            ]
        },
        formatting: {
            score: 85,
            issues: [
                "Consider using bullet points instead of paragraphs",
                "Ensure consistent date formatting throughout"
            ]
        }
    };

    res.json(sampleResult);
});

export default router;
