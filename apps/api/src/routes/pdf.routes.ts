import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';
import { optionalAuth, verifyToken, requireSubscription } from '../middleware/auth.middleware';
import { FeatureName } from '../models';

const router = Router();
const pdfController = new PdfController();

// PDF generation endpoint - Protected by dynamic subscription check
// Custom middleware to allow 'lower' plan for PDF export
const requirePaidSubscription = async (req: any, res: any, next: any) => {
    try {
        if (req.user?.userId) {
            const { Subscription } = await import('../models');
            const subscription = await Subscription.findOne({
                userId: req.user.userId,
                status: 'active',
                // Allow lower, pro, and premium plans
                plan: { $in: ['lower', 'pro', 'premium'] }
            });

            if (subscription) {
                return next();
            }
        }

        // Fallback to standard check if custom check fails (or just to return standard error)
        // This will handle the error response
        return requireSubscription(FeatureName.PDF_EXPORT, true)(req, res, next);
    } catch (error) {
        console.error('Custom subscription check error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

router.post('/convert-html-to-pdf', optionalAuth, requirePaidSubscription, pdfController.generatePdf);
router.get('/resumes', verifyToken, pdfController.getResumes);

// Health check - Public
router.get('/health', pdfController.healthCheck);

export default router;
