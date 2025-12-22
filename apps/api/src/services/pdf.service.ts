import { htmlToPdf } from '@repo/utils-server';
import { ResumeData, PdfGenerationOptions } from '../types/resume.types';
import { TemplateInjectorService } from './template-injector.service';

export class PdfService {
    private templateInjectorService: TemplateInjectorService;

    constructor() {
        this.templateInjectorService = new TemplateInjectorService();
    }

    /**
     * Validate resume data
     */
    private validateResumeData(data: any): void {
        if (!data) {
            throw new Error('Resume data is required');
        }

        if (typeof data !== 'object') {
            throw new Error('Resume data must be an object');
        }

        // Validate template ID if provided
        if (data.templateId && typeof data.templateId !== 'string') {
            throw new Error('Template ID must be a string');
        }

        // Add more validation as needed
        if (data.personalInfo && !data.personalInfo.firstName && !data.personalInfo.lastName) {
            throw new Error('At least first name or last name is required');
        }
    }

    /**
     * Generate PDF from resume data
     */
    public async generatePdf(
        resumeData: ResumeData,
        options: PdfGenerationOptions = {}
    ): Promise<Uint8Array> {
        try {
            // Validate input
            this.validateResumeData(resumeData);

            // Generate HTML using template injector
            const html = this.templateInjectorService.generateHTML(resumeData);

            // Generate filename
            const filename = options.filename || this.generateFilename(resumeData);

            // Convert to PDF
            const pdfBuffer = await htmlToPdf(html, filename, resumeData);

            return pdfBuffer;
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Generate filename from resume data
     */
    private generateFilename(resumeData: ResumeData): string {
        const { personalInfo } = resumeData;
        const firstName = personalInfo?.firstName || 'Resume';
        const lastName = personalInfo?.lastName || '';
        const timestamp = new Date().toISOString().split('T')[0];

        return `${firstName}_${lastName}_${timestamp}.pdf`.replace(/\s+/g, '_');
    }

    /**
     * Get PDF metadata
     */
    public getPdfMetadata(resumeData: ResumeData): {
        filename: string;
        title: string;
        author: string;
    } {
        const { personalInfo } = resumeData;

        return {
            filename: this.generateFilename(resumeData),
            title: `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''} - Resume`.trim(),
            author: `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim(),
        };
    }
}
