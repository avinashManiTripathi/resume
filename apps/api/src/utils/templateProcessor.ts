/**
 * Template Processor Utility
 * Processes cover letter templates with user data
 */

import { CoverLetterTemplate } from '../constants/coverLetterTemplates';
import { CoverLetterUserData } from '../types/cover-letter.types';
import { replacePlaceholders } from './placeholderReplacer';

/**
 * Process template with user data
 * Generates the final cover letter content
 * 
 * @param template - Selected template
 * @param userData - User provided data
 * @returns Processed content with all placeholders replaced
 */
export function processTemplate(
    template: CoverLetterTemplate,
    userData: CoverLetterUserData
): string {
    // Get template body
    const templateBody = template.templateBody;

    // Replace placeholders with user data
    const processedContent = replacePlaceholders(templateBody, userData);

    return processedContent;
}

/**
 * Validate template structure
 * Ensures template has all required properties
 * 
 * @param template - Template to validate
 * @returns True if valid
 */
export function validateTemplate(template: CoverLetterTemplate): boolean {
    return !!(
        template.id &&
        template.name &&
        template.description &&
        template.templateBody &&
        template.supportedFields &&
        Array.isArray(template.supportedFields) &&
        template.supportedFields.length > 0
    );
}

/**
 * Get template metadata (excluding template body)
 * Used for listing templates
 * 
 * @param template - Full template
 * @returns Template metadata
 */
export function getTemplateMetadata(template: CoverLetterTemplate) {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
        previewText: template.previewText,
        supportedFields: template.supportedFields
    };
}

/**
 * Format content for HTML display
 * Converts newlines to <br> tags and preserves formatting
 * 
 * @param content - Plain text content
 * @returns HTML formatted content
 */
export function formatContentToHTML(content: string): string {
    if (!content) {
        return '';
    }

    // Replace newlines with <br> tags
    let html = content.replace(/\n/g, '<br>');

    // Wrap in basic HTML structure
    html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
        }
        .cover-letter {
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="cover-letter">
        ${html}
    </div>
</body>
</html>
    `.trim();

    return html;
}
