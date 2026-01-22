import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';
import { optionalAuth, verifyToken, requireSubscription } from '../middleware/auth.middleware';
import { FeatureName } from '../models';

const router = Router();
const pdfController = new PdfController();

// PDF generation endpoint - Protected by dynamic subscription check
router.post('/convert-html-to-pdf', optionalAuth, requireSubscription(FeatureName.PDF_EXPORT, true), pdfController.generatePdf);
router.get('/resumes', verifyToken, pdfController.getResumes);

// Health check - Public
router.get('/health', pdfController.healthCheck);

export default router;
