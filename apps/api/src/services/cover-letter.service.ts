/**
 * Cover Letter Service
 * Business logic for cover letter generation
 */

import { CoverLetterTemplate, ICoverLetterTemplate } from '../models/CoverLetterTemplates';
import { CoverLetterTemplate as ICoverLetterTemplateLocal } from '../constants/coverLetterTemplates';
import { CoverLetterUserData, GenerateCoverLetterRequest, TemplateMetadata } from '../types/cover-letter.types';
import { processTemplate, getTemplateMetadata, formatContentToHTML } from '../utils/templateProcessor';
import { sanitizeUserData, isValidFormat } from '../utils/validation';
import { generatePDF, generateDOCX, getMimeType, getFileExtension } from '../utils/fileGenerator';

class CoverLetterService {
    /**
     * Map DB Document to Interface
     */
    private mapDocumentToTemplate(doc: ICoverLetterTemplate): ICoverLetterTemplateLocal {
        return {
            _id: doc.type,
            name: doc.name,
            category: doc.category,
            image: doc.image,
            description: doc.description,
            previewText: doc.previewText,
            templateBody: doc.templateBody,
            supportedFields: doc.supportedFields
        };
    }

    /**
     * Get all available templates (metadata only)
     */
    async getAllTemplates(): Promise<TemplateMetadata[]> {
        const templates = await CoverLetterTemplate.find().select('-templateBody').sort({ createdAt: 1 });
        return templates.map(t => getTemplateMetadata(this.mapDocumentToTemplate(t)));
    }

    /**
     * Get template by ID
     */
    async getTemplate(templateId: string): Promise<ICoverLetterTemplateLocal> {
        const template = await CoverLetterTemplate.findOne({ type: templateId });

        if (!template) {
            throw new Error('Template not found');
        }

        return this.mapDocumentToTemplate(template);
    }

    /**
     * Map flat user data to structured format
     */
    private mapToStructuredData(flatData: any): CoverLetterUserData {
        // Split body text into paragraphs based on newlines
        const bodyText = (flatData.experience || '') + (flatData.customParagraph ? '\n\n' + flatData.customParagraph : '');
        const paragraphs = bodyText.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0);

        // Generate HTML for the body
        const bodyHTML = paragraphs.map((p: string) => `<p style="margin-bottom: 1em;">${p}</p>`).join('\n');

        return {
            personalInfo: {
                fullName: flatData.fullName || '',
                email: flatData.email || '',
                phone: flatData.phone || '',
                jobTitle: flatData.jobTitle || '',
            },
            recipientInfo: {
                companyName: flatData.companyName || 'Hiring Manager',
                managerName: 'Hiring Manager',
            },
            content: {
                greeting: `Dear ${flatData.companyName ? flatData.companyName + ' Team' : 'Hiring Manager'},`,
                body: paragraphs,
                bodyHTML: bodyHTML,
                closing: 'Sincerely,',
                signOff: flatData.fullName || 'Candidate',
            },
            meta: {
                themeColor: '#000000',
                fontFamily: flatData.fontFamily || 'Arial, sans-serif'
            }
        };
    }

    /**
     * Generate cover letter
     * 
     * @param request - Generation request with template ID, user data, and format
     * @returns File buffer and metadata
     */
    async generateCoverLetter(request: GenerateCoverLetterRequest): Promise<{
        buffer: Buffer;
        mimeType: string;
        fileName: string;
    }> {
        // Validate format
        if (!isValidFormat(request.format)) {
            throw new Error('Invalid format. Must be "pdf" or "docx"');
        }

        // Get template
        const template = await this.getTemplate(request.templateId);

        // Sanitize user data (Flat)
        const sanitizedData = sanitizeUserData(request.userData);

        // Transform to Structured Data
        const structuredData = this.mapToStructuredData(sanitizedData);

        // Process template
        const content = processTemplate(template, structuredData);

        // Generate file based on format
        let buffer: Buffer;
        const templateName = template._id;
        const timestamp = Date.now();

        if (request.format === 'pdf') {
            // Convert to HTML for PDF
            const htmlContent = formatContentToHTML(content);
            buffer = await generatePDF(htmlContent);
        } else {
            // Generate DOCX
            const plainTextContent = content
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n\n')
                .replace(/<\/div>/gi, '\n')
                .replace(/<[^>]*>/g, '') // Strip remaining tags
                .replace(/&nbsp;/g, ' ')
                .replace(/\n\s*\n\s*\n/g, '\n\n') // Normalize multiple newlines
                .trim();

            buffer = await generateDOCX(plainTextContent, `cover-letter-${templateName}`);
        }

        return {
            buffer,
            mimeType: getMimeType(request.format),
            fileName: `cover-letter-${templateName}-${timestamp}${getFileExtension(request.format)}`
        };
    }

    /**
     * Preview cover letter content (without generating file)
     * Useful for showing preview before download
     */
    async previewCoverLetter(templateId: string, userData: any): Promise<string> {
        // Get template
        const template = await this.getTemplate(templateId);

        // Sanitize user data
        const sanitizedData = sanitizeUserData(userData);

        // Transform
        const structuredData = this.mapToStructuredData(sanitizedData);

        // Process and return content
        return processTemplate(template, structuredData);
    }
}

// Export singleton instance
export const coverLetterService = new CoverLetterService();
