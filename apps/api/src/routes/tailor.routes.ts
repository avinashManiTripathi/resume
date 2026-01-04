import { Router } from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import { TailorService } from '../services/tailor.service';
import { parseResumeWithAI } from '../utils-server/ai-analysis';
const { PDFParse } = require("pdf-parse");
const pdfParse = PDFParse;
const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const tailorService = new TailorService();


/**
 * POST /api/tailor/analyze
 * Analyze resume against job description
 */
router.post('/analyze', upload.single('resume'), async (req: Request, res: Response) => {
    try {

        console.log("typeof ", typeof pdfParse);

        const { jobDescription, jobTitle, company } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }

        // For now, use mock resume data if no file uploaded
        // In production, extract text from uploaded file
        const resumeText = req.file
            ? await extractTextFromFile(req.file.buffer)
            : getMockResumeText();

        const analysis = await tailorService.analyzeResume(resumeText, jobDescription, {
            jobTitle,
            company
        });

        res.json(analysis);
    } catch (error: any) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Failed to analyze resume',
            message: error.message
        });
    }
});

/**
 * POST /api/tailor/apply-suggestions
 * Apply suggestions to resume
 */
router.post('/apply-suggestions', async (req: Request, res: Response) => {
    try {
        const { resumeData, suggestions } = req.body;

        const updatedResume = await tailorService.applySuggestions(resumeData, suggestions);

        res.json({ success: true, resume: updatedResume });
    } catch (error: any) {
        console.error('Apply suggestions error:', error);
        res.status(500).json({
            error: 'Failed to apply suggestions',
            message: error.message
        });
    }
});



/**
 * POST /api/tailor/parse
 * Parse resume PDF and tailor it to job description using AI
 * Returns structured JSON data for the editor
 */
router.post('/parse', upload.single('resume'), async (req: Request, res: Response) => {
    try {
        const { jobDescription, jobTitle, company } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Resume file is required' });
        }

        // Extract text from PDF
        const resumeText = await extractTextFromFile(req.file.buffer);

        // Parse resume with AI
        const parsedData = await parseResumeWithAI(
            resumeText,
            jobDescription,
            jobTitle,
            company
        );

        res.json({
            success: true,
            data: parsedData,
            message: 'Resume parsed and tailored successfully'
        });
    } catch (error: any) {
        console.error('Parse error:', error);
        res.status(500).json({
            error: 'Failed to parse resume',
            message: error.message
        });
    }
});

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
 * Mock resume text for testing
 */
function getMockResumeText(): string {
    return `
John Doe
Product Designer

EXPERIENCE
Product Designer at TechCorp
Jan 2021 - Present
- Designed user interfaces for web applications
- Collaborated with development team
- Created wireframes and prototypes

EDUCATION
Bachelor of Design
University of Arts
2017 - 2021

SKILLS
Figma, Sketch, Adobe XD, HTML, CSS
    `.trim();
}

export default router;
