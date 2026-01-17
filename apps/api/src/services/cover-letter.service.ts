/**
 * Cover Letter Service
 * Business logic for cover letter generation
 */

import {
    COVER_LETTER_TEMPLATES,
    getTemplateById,
    isValidTemplateId
} from '../constants/coverLetterTemplates';
import { CoverLetterUserData, FlatCoverLetterUserData, GenerateCoverLetterRequest, TemplateMetadata } from '../types/cover-letter.types';
import { processTemplate, getTemplateMetadata, formatContentToHTML } from '../utils/templateProcessor';
import { validateUserData, sanitizeUserData, isValidFormat } from '../utils/validation';
import { generatePDF, generateDOCX, getMimeType, getFileExtension } from '../utils/fileGenerator';

class CoverLetterService {
    /**
     * Get all available templates (metadata only)
     */
    getAllTemplates(): TemplateMetadata[] {
        return COVER_LETTER_TEMPLATES.map(template => getTemplateMetadata(template));
    }

    /**
     * Get template by ID
     */
    getTemplate(templateId: string) {
        if (!isValidTemplateId(templateId)) {
            throw new Error('Invalid template ID');
        }

        const template = getTemplateById(templateId);
        if (!template) {
            throw new Error('Template not found');
        }

        return template;
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
        const template = getTemplateById(request.templateId);
        if (!template) {
            throw new Error('Template not found');
        }

        // Sanitize user data (Flat)
        const sanitizedData = sanitizeUserData(request.userData);

        // Validate user data against template (Flat check)
        // const validation = validateUserData(sanitizedData, template);
        // if (!validation.isValid) {
        //     throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        // }

        // Transform to Structured Data
        const structuredData = this.mapToStructuredData(sanitizedData);

        // Process template
        const content = processTemplate(template, structuredData);

        // Generate file based on format
        let buffer: Buffer;
        const templateName = template.id;
        const timestamp = Date.now();

        if (request.format === 'pdf') {
            // Convert to HTML for PDF
            // Content is already full HTML from the template, so just pass it through or wrap if needed
            // Our formatContentToHTML is still simple wrapper, which is fine
            const htmlContent = formatContentToHTML(content);
            buffer = await generatePDF(htmlContent);
        } else {
            // Generate DOCX
            // improved HTML to text conversion for DOCX
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
    previewCoverLetter(templateId: string, userData: any): string {
        // Get template
        const template = getTemplateById(templateId);
        if (!template) {
            throw new Error('Template not found');
        }

        // Sanitize user data
        const sanitizedData = sanitizeUserData(userData);

        // Validate
        // const validation = validateUserData(sanitizedData, template);
        // if (!validation.isValid) {
        //     throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        // }

        // Transform
        const structuredData = this.mapToStructuredData(sanitizedData);

        // Process and return content
        return processTemplate(template, structuredData);
    }
}

// Export singleton instance
export const coverLetterService = new CoverLetterService();
