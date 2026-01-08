/**
 * Cover Letter Service
 * Business logic for cover letter generation
 */

import {
    COVER_LETTER_TEMPLATES,
    getTemplateById,
    isValidTemplateId
} from '../constants/coverLetterTemplates';
import { CoverLetterUserData, GenerateCoverLetterRequest, TemplateMetadata } from '../types/cover-letter.types';
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

        return getTemplateMetadata(template);
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

        // Sanitize user data
        const sanitizedData = sanitizeUserData(request.userData);

        // Validate user data against template
        const validation = validateUserData(sanitizedData, template);
        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        // Process template
        const content = processTemplate(template, sanitizedData);

        // Generate file based on format
        let buffer: Buffer;
        const templateName = template.id;
        const timestamp = Date.now();

        if (request.format === 'pdf') {
            // Convert to HTML for PDF
            const htmlContent = formatContentToHTML(content);
            buffer = await generatePDF(htmlContent);
        } else {
            // Generate DOCX directly from plain text
            buffer = await generateDOCX(content, `cover-letter-${templateName}`);
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
    previewCoverLetter(templateId: string, userData: CoverLetterUserData): string {
        // Get template
        const template = getTemplateById(templateId);
        if (!template) {
            throw new Error('Template not found');
        }

        // Sanitize user data
        const sanitizedData = sanitizeUserData(userData);

        // Validate
        const validation = validateUserData(sanitizedData, template);
        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        // Process and return content
        return processTemplate(template, sanitizedData);
    }
}

// Export singleton instance
export const coverLetterService = new CoverLetterService();
