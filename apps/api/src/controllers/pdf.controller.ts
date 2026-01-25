import { Request, Response } from 'express';
import { PdfService } from '../services/pdf.service';
import { ResumeData } from '../types/resume.types';
import { RESUMES } from '../constant';

export class PdfController {
    private pdfService: PdfService;

    constructor() {
        this.pdfService = new PdfService();
    }

    /**
     * Handle PDF generation request
     */
    /**
     * Handle PDF generation request
     */
    public generatePdf = async (req: Request, res: Response): Promise<void> => {
        try {
            const resumeData: ResumeData = req.body;

            // Generate PDF Stream
            const { stream, filename } = await this.pdfService.generatePdfStream(resumeData, {
                inline: true,
            });

            // Set response headers
            res.set({
                'Content-Type': 'application/pdf',
                // 'Content-Length': unknown for stream
                'Content-Disposition': `inline; filename="${filename}"`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            });

            // Pipe stream to response
            stream.pipe(res);

            // Handle client disconnect to prevent zombie processes
            res.on('close', () => {
                const pdfStream = stream as any;
                if (pdfStream && !pdfStream.destroyed) {
                    console.log('Client disconnected, destroying PDF stream');
                    pdfStream.destroy();
                }
            });
        } catch (error) {
            console.error('PDF generation error:', error);

            const errorMessage = error instanceof Error ? error.message : 'PDF generation failed';
            const statusCode = errorMessage.includes('required') || errorMessage.includes('must be') ? 400 : 500;

            if (!res.headersSent) {
                res.status(statusCode).json({
                    error: errorMessage,
                    timestamp: new Date().toISOString(),
                });
            }
        }
    };

    /**
     * Get all resumes
     */
    public getResumes = (_req: Request, res: Response): void => {
        res.json(RESUMES);
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
