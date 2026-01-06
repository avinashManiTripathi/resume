import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';

const router = Router();
const pdfController = new PdfController();

// PDF generation endpoint
router.post('/convert-html-to-pdf', pdfController.generatePdf);


// Health check
router.get('/health', pdfController.healthCheck);

export default router;
