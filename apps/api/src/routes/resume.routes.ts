import { Router, Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { resumeExtractionService } from '../services/resume-extraction.service';
import { enhanceTextWithAI } from '../services/ai-analysis.service';
import { verifyToken, AuthRequest, optionalAuth, requireSubscription } from '../middleware/auth.middleware';
import { FeatureName } from '../models';
import { checkUsageLimit } from '../middleware/usage.middleware';
import { Resume } from '../models';
import mongoose from 'mongoose';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and DOC/DOCX files are allowed.'));
        }
    }
});

/**
 * Extract text from uploaded file (PDF  or DOC)
 */
async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
    try {
        if (file.mimetype === 'application/pdf') {
            // Parse PDF
            const pdfData = await pdfParse(file.buffer);
            return pdfData.text;
        } else if (file.mimetype.includes('word') || file.mimetype.includes('document')) {
            // Parse Word document
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            return result.value;
        }

        throw new Error('Unsupported file type');
    } catch (error) {
        console.error('File parsing error:', error);
        throw new Error('Failed to read uploaded file. Please ensure the file is not corrupted.');
    }
}

/**
 * POST /api/resume/extract
 * Extract structured resume data from text and/or file
 */
router.post('/extract', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const file = req.file;

        // Validate input
        if (!text && !file) {
            return res.status(400).json({
                success: false,
                message: 'Please provide either text input or upload a file'
            });
        }

        let textContent = text || '';
        let fileContent = '';

        // Extract content from uploaded file
        if (file) {
            try {
                fileContent = await extractTextFromFile(file);
            } catch (error: any) {
                return res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to process uploaded file'
                });
            }
        }

        // Combine and extract structured data
        let extractedData;
        if (textContent && fileContent) {
            // Both provided - combine them
            extractedData = await resumeExtractionService.combineAndExtract(textContent, fileContent);
        } else if (fileContent) {
            // Only file provided
            extractedData = await resumeExtractionService.extractFromText(fileContent);
        } else {
            // Only text provided
            extractedData = await resumeExtractionService.extractFromText(textContent);
        }

        // Return structured data
        res.json({
            success: true,
            data: extractedData,
            message: 'Resume data extracted successfully'
        });

    } catch (error: any) {
        console.error('Resume extraction API error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to extract resume data. Please try again.'
        });
    }
});

/**
 * GET /api/resume/
 * Get all resumes for the authenticated user
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        const resumes = await Resume.find({ userId })
            .select('title template updatedAt createdAt')
            .sort({ updatedAt: -1 });

        res.json({
            success: true,
            data: resumes
        });
    } catch (error: any) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resumes'
        });
    }
});

/**
 * GET /api/resume/by-template/:templateId
 * Get resume for a specific template
 */
router.get('/by-template/:templateId', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { templateId } = req.params;

        const resume = await Resume.findOne({ userId, template: templateId });

        if (!resume) {
            // Return null instead of 404 - frontend will handle empty state
            return res.json({
                success: true,
                data: null,
                message: 'No data for this template yet'
            });
        }

        res.json({
            success: true,
            data: resume
        });
    } catch (error: any) {
        console.error('Error fetching resume by template:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resume'
        });
    }
});

/**
 * GET /api/resume/:id
 * Get a specific resume by ID (kept for backward compatibility)
 */
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid resume ID' });
        }

        const resume = await Resume.findOne({ _id: id, userId });

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        res.json({
            success: true,
            data: resume
        });
    } catch (error: any) {
        console.error('Error fetching resume:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resume'
        });
    }
});

/**
 * POST /api/resume/
 * Save or update a resume (upsert by template)
 */
router.post('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { title, template, data } = req.body;

        if (!template || !data) {
            return res.status(400).json({
                success: false,
                message: 'Template and data are required'
            });
        }

        // Upsert by userId + template (one resume per template)
        const resume = await Resume.findOneAndUpdate(
            { userId, template }, // Find by userId + template
            {
                userId,
                template,
                data,
                title: title || 'My Resume' // Optional title
            },
            {
                new: true, // Return updated document
                upsert: true, // Create if doesn't exist
                setDefaultsOnInsert: true
            }
        );

        res.json({
            success: true,
            data: resume,
            message: 'Resume saved successfully'
        });
    } catch (error: any) {
        console.error('Error saving resume:', error);

        // Handle unique constraint violation (shouldn't happen with upsert, but just in case)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Resume for this template already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to save resume'
        });
    }
});

/**
 * DELETE /api/resume/:id
 * Delete a resume
 */
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid resume ID' });
        }

        const result = await Resume.deleteOne({ _id: id, userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Resume not found or unauthorized' });
        }

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error: any) {
        console.error('Error deleting resume:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete resume'
        });
    }
});

/**
 * GET /api/resume/extraction-info
 * Get information about the extraction feature
 */
router.get('/extraction-info', (req: Request, res: Response) => {
    res.json({
        success: true,
        info: {
            supportedFormats: ['PDF', 'DOC', 'DOCX', 'Plain Text'],
            maxFileSize: '10MB',
            features: [
                'Multi-language support with auto-translation to English',
                'ATS-optimized content rewriting',
                'Automatic data structuring',
                'No fake data invention - only real extraction',
                'Professional formatting and keyword optimization'
            ],
            rateLimit: {
                free: '10 extractions per day',
                pro: 'Unlimited extractions'
            }
        }
    });
});

/**
 * POST /api/resume/enhance
 * Fix grammar or improve selected text via AI
 */
router.post('/enhance', async (req: Request, res: Response) => {
    try {
        const { text, action } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required for enhancement'
            });
        }

        if (!['fix_grammar', 'improve'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid action. Must be fix_grammar or improve'
            });
        }

        const enhancedText = await enhanceTextWithAI(text, action);

        res.json({
            success: true,
            data: { enhancedText },
            message: `Text successfully ${action === 'fix_grammar' ? 'corrected' : 'improved'}`
        });

    } catch (error: any) {
        console.error('AI Text enhancement API error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to enhance text. Please try again later.'
        });
    }
});

export default router;
