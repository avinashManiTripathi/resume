import { Router, Request, Response } from 'express';
import multer from 'multer';
import mammoth from 'mammoth';
import { analyzeResumeWithAI } from '../utils-server/ai-analysis';
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
