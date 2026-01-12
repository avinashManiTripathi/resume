/**
 * Cover Letter Routes
 * API endpoints for cover letter functionality
 */

import { Router, Request, Response } from 'express';
import { coverLetterService } from '../services/cover-letter.service';
import { GenerateCoverLetterRequest } from '../types/cover-letter.types';
import { verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { CoverLetter } from '../models';
import mongoose from 'mongoose';

const router = Router();

/**
 * GET /api/cover-letter/templates
 * Get all available cover letter templates
 */
router.get('/templates', async (req: Request, res: Response) => {
    try {
        const templates = coverLetterService.getAllTemplates();

        res.json({
            success: true,
            templates,
            count: templates.length
        });
    } catch (error: any) {
        console.error('Get templates error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch templates'
        });
    }
});

/**
 * GET /api/cover-letter/templates/:id
 * Get specific template by ID
 */
router.get('/templates/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const template = coverLetterService.getTemplate(id);

        res.json({
            success: true,
            template
        });
    } catch (error: any) {
        console.error('Get template error:', error);
        res.status(error.message.includes('not found') ? 404 : 500).json({
            success: false,
            message: error.message || 'Failed to fetch template'
        });
    }
});

/**
 * POST /api/cover-letter/preview
 * Preview cover letter content without generating file
 */
router.post('/preview', async (req: Request, res: Response) => {
    try {
        const { templateId, userData } = req.body;

        if (!templateId || !userData) {
            return res.status(400).json({
                success: false,
                message: 'templateId and userData are required'
            });
        }

        const content = coverLetterService.previewCoverLetter(templateId, userData);

        res.json({
            success: true,
            content
        });
    } catch (error: any) {
        console.error('Preview cover letter error:', error);

        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('Validation') ? 400 : 500;

        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to preview cover letter'
        });
    }
});

/**
 * POST /api/cover-letter/generate
 * Generate and download cover letter
 */
router.post('/generate', async (req: Request, res: Response) => {
    try {
        const request: GenerateCoverLetterRequest = req.body;

        // Validate request body
        if (!request.templateId || !request.userData || !request.format) {
            return res.status(400).json({
                success: false,
                message: 'templateId, userData, and format are required'
            });
        }

        // Generate cover letter
        const result = await coverLetterService.generateCoverLetter(request);

        // Set headers for file download
        res.setHeader('Content-Type', result.mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.fileName}"`);
        res.setHeader('Content-Length', result.buffer.length);

        // Send file
        res.send(result.buffer);
    } catch (error: any) {
        console.error('Generate cover letter error:', error);

        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('Invalid') || error.message.includes('Validation') ? 400 : 500;

        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to generate cover letter'
        });
    }
});

/**
 * GET /api/cover-letter/
 * Get all cover letters for the authenticated user
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        const letters = await CoverLetter.find({ userId })
            .select('title templateId updatedAt createdAt')
            .sort({ updatedAt: -1 });

        res.json({
            success: true,
            data: letters
        });
    } catch (error: any) {
        console.error('Error fetching cover letters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cover letters'
        });
    }
});

/**
 * GET /api/cover-letter/:id
 * Get a specific cover letter
 */
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid cover letter ID' });
        }

        const letter = await CoverLetter.findOne({ _id: id, userId });

        if (!letter) {
            return res.status(404).json({ success: false, message: 'Cover letter not found' });
        }

        res.json({
            success: true,
            data: letter
        });
    } catch (error: any) {
        console.error('Error fetching cover letter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cover letter'
        });
    }
});

/**
 * POST /api/cover-letter/save
 * Save or update a cover letter
 */
router.post('/save', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { id, title, templateId, data } = req.body;

        if (!title || !templateId || !data) {
            return res.status(400).json({
                success: false,
                message: 'Title, templateId, and data are required'
            });
        }

        let letter;

        if (id && mongoose.Types.ObjectId.isValid(id)) {
            // Update existing
            letter = await CoverLetter.findOneAndUpdate(
                { _id: id, userId },
                { title, templateId, data },
                { new: true }
            );

            if (!letter) {
                return res.status(404).json({ success: false, message: 'Cover letter not found or unauthorized' });
            }
        } else {
            // Create new
            letter = new CoverLetter({
                userId,
                title,
                templateId,
                data
            });
            await letter.save();
        }

        res.json({
            success: true,
            data: letter,
            message: 'Cover letter saved successfully'
        });
    } catch (error: any) {
        console.error('Error saving cover letter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save cover letter'
        });
    }
});

/**
 * DELETE /api/cover-letter/:id
 * Delete a cover letter
 */
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid cover letter ID' });
        }

        const result = await CoverLetter.deleteOne({ _id: id, userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Cover letter not found or unauthorized' });
        }

        res.json({
            success: true,
            message: 'Cover letter deleted successfully'
        });
    } catch (error: any) {
        console.error('Error deleting cover letter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete cover letter'
        });
    }
});

/**
 * GET /api/cover-letter/info
 * Get information about the cover letter feature
 */
router.get('/info', (req: Request, res: Response) => {
    res.json({
        success: true,
        info: {
            availableTemplates: 3,
            supportedFormats: ['PDF', 'DOCX'],
            maxFileSize: 'N/A (generated, not uploaded)',
            features: [
                'Multiple professional templates',
                'Customizable content',
                'Instant PDF/DOCX download',
                'No fake data - uses your input',
                'Professional formatting'
            ],
            requiredFields: [
                'Full Name',
                'Email',
                'Phone',
                'Job Title',
                'Company Name',
                'Professional Experience'
            ],
            optionalFields: [
                'Skills',
                'Custom Paragraph'
            ]
        }
    });
});

export default router;
