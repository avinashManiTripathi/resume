import { Request, Response } from 'express';
import { PdfService } from '../services/pdf.service';
import { ResumeData } from '../types/resume.types';

export class PdfController {
    private pdfService: PdfService;

    constructor() {
        this.pdfService = new PdfService();
    }

    /**
     * Handle PDF generation request
     */
    public generatePdf = async (req: Request, res: Response): Promise<void> => {
        try {
            const resumeData: ResumeData = req.body;


            // Generate PDF
            const pdfBuffer = await this.pdfService.generatePdf(resumeData, {
                inline: true,
            });

            // Get metadata
            const metadata = this.pdfService.getPdfMetadata(resumeData);

            // Set response headers
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Length': pdfBuffer.length,
                'Content-Disposition': `inline; filename="${metadata.filename}"`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            });

            // Send PDF
            res.send(pdfBuffer);
        } catch (error) {
            console.error('PDF generation error:', error);

            const errorMessage = error instanceof Error ? error.message : 'PDF generation failed';
            const statusCode = errorMessage.includes('required') || errorMessage.includes('must be') ? 400 : 500;

            res.status(statusCode).json({
                error: errorMessage,
                timestamp: new Date().toISOString(),
            });
        }
    };


    /**
     * Health check endpoint
     */
    public healthCheck = (_req: Request, res: Response): void => {
        res.json({
            status: 'ok',
            service: 'Resume PDF API',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        });
    };
}
