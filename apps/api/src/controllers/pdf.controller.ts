import { Request, Response } from 'express';
import { PdfService } from '../services/pdf.service';
import { ResumeData } from '../types/resume.types';
import { RESUMES } from '../constant';
import {
    generatePdfCacheKey,
    getCachedPdf,
    cachePdfStream
} from '../services/pdf-cache.service';
import { Readable } from 'stream';

export class PdfController {
    private pdfService: PdfService;

    constructor() {
        this.pdfService = new PdfService();
    }

    /**
     * Handle PDF generation request with caching
     */
    public generatePdf = async (req: Request, res: Response): Promise<void> => {
        try {
            const resumeData: ResumeData = req.body;

            // Generate cache key
            const cacheKey = generatePdfCacheKey(resumeData);


            // Check cache
            const cachedPdf = await getCachedPdf(cacheKey);

            if (cachedPdf) {
                // Cache HIT - serve immediately
                const filename = `${resumeData.personalInfo?.firstName}_${resumeData.personalInfo?.lastName} _Resume.pdf`
                    .replace(/\s+/g, '_');

                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Length': cachedPdf.length.toString(),
                    'Content-Disposition': `inline; filename = "${filename}"`,
                    'X-Cache': 'HIT',
                    'Cache-Control': 'public, max-age=3600',
                });

                res.send(cachedPdf);
                return;
            }

            // 4. Cache MISS - generate PDF
            const { stream, filename } = await this.pdfService.generatePdfStream(resumeData, {
                inline: true,
            });

            // 5. Cache the PDF while streaming to client
            const pdfBuffer = await cachePdfStream(cacheKey, stream as Readable, 3600);

            // 6. Send to client
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Length': pdfBuffer.length.toString(),
                'Content-Disposition': `inline; filename = "${filename}"`,
                'X-Cache': 'MISS',
                'Cache-Control': 'public, max-age=3600',
            });

            res.send(pdfBuffer);

        } catch (error) {
            console.error('PDF generation error:', error);

            const errorMessage = error instanceof Error ? error.message : 'PDF generation failed';
            const statusCode = errorMessage.includes('required') || errorMessage.includes('must be') ? 400
                : errorMessage.includes('overloaded') || errorMessage.includes('Queue full') ? 503
                    : 500;

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
