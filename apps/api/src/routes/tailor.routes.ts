import { Router, Request, Response } from 'express';
import multer from 'multer';
import { TailorService } from '../services/tailor.service';
import { parseResumeWithAI } from '../services/ai-analysis.service';
import { extractTextFromPDF } from '../utils/file-parser';
import { optionalAuth, verifyToken, requireSubscription } from '../middleware/auth.middleware';
import { FeatureName } from '../models';
import { checkUsageLimit } from '../middleware/usage.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const tailorService = new TailorService();


/**
 * POST /api/tailor/analyze
 * Analyze resume against job description
 */
router.post('/analyze', optionalAuth, requireSubscription(FeatureName.TAILOR), checkUsageLimit('tailor'), upload.single('resume'), async (req: Request, res: Response) => {
    try {

        const { jobDescription, jobTitle, company } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }

        // Check for file upload first, then structured data, then fallback
        let resumeInput: string | any;

        if (req.file) {
            resumeInput = await extractTextFromPDF(req.file.buffer);
        } else if (req.body.resumeData) {
            resumeInput = req.body.resumeData;
        } else {
            resumeInput = getMockResumeText();
        }

        const analysis = await tailorService.analyzeResume(resumeInput, jobDescription, {
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
router.post('/apply-suggestions', optionalAuth, requireSubscription(FeatureName.TAILOR), async (req: Request, res: Response) => {
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
router.post('/parse', optionalAuth, requireSubscription(FeatureName.TAILOR), upload.single('resume'), async (req: Request, res: Response) => {
    try {
        const { jobDescription, jobTitle, company } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Resume file is required' });
        }

        // Extract text from PDF using shared utility
        const resumeText = await extractTextFromPDF(req.file.buffer);

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
