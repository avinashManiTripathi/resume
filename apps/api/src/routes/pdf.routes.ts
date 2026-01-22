import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';
import { verifyToken, requireSubscription } from '../middleware/auth.middleware';
import { FeatureName } from '../models';

const router = Router();
const pdfController = new PdfController();

// PDF generation endpoint - Protected by authentication and subscription
router.post('/convert-html-to-pdf', verifyToken, requireSubscription(FeatureName.PDF_EXPORT), pdfController.generatePdf);
router.get('/resumes', verifyToken, pdfController.getResumes);

// Health check - Public
router.get('/health', pdfController.healthCheck);

export default router;
