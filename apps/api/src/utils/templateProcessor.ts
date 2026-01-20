/**
 * Template Processor Utility
 * Processes cover letter templates with user data
 */

import { CoverLetterTemplate } from '../constants/coverLetterTemplates';
import { CoverLetterUserData } from '../types/cover-letter.types';

/**
 * Process template with user data
 * Generates the final cover letter content by injecting data for runtime hydration
 * 
 * @param template - Selected template
 * @param userData - User provided data
 * @returns HTML content with injected data script
 */
export function processTemplate(
    template: CoverLetterTemplate,
    userData: CoverLetterUserData
): string {
    const templateBody = Array.isArray(template.templateBody)
        ? template.templateBody.join('\n')
        : template.templateBody;

    // Inject data for client-side hydration
    // We check if </body> exists to inject before it, otherwise append
    const injectionScript = `
    <script>
        (function() {
            try {
                const userData = ${JSON.stringify(userData)};
                if (window.hydrate) {
                    window.hydrate(userData);
                }
            } catch (e) {
                console.error("Hydration failed", e);
            }
        })();
    </script>
    `;

    // Inject font family if present
    let fontInjection = '';
    if (userData.meta?.fontFamily) {
        const fontFamily = userData.meta.fontFamily;
        const fontImport = fontFamily.includes(' ')
            ? `@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap');`
            : `@import url('https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap');`;

        fontInjection = `
        <style id="custom-font-style">
            ${fontImport}
            body, * {
                font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }
        </style>
        `;
    }

    if (templateBody.includes('</body>')) {
        return templateBody.replace('</body>', `${fontInjection}${injectionScript}</body>`);
    }

    return templateBody + fontInjection + injectionScript;
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
        template._id &&
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
        id: template._id,
        name: template.name,
        description: template.description,
        previewText: template.previewText,
        supportedFields: template.supportedFields
    };
}

/**
 * Format content for HTML display
 * If content is already a full HTML doc, return as is.
 * Otherwise, wrap in basic structure (fallback).
 * 
 * @param content - Content string
 * @returns HTML formatted content
 */
export function formatContentToHTML(content: string): string {
    if (!content) return '';

    // If it looks like a full HTML doc, return it
    if (content.trim().startsWith('<!DOCTYPE html>') || content.includes('<html')) {
        return content;
    }

    // Fallback for legacy plain text content
    let html = content.replace(/\n/g, '<br>');

    return `
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
    </style>
</head>
<body>
    <div>${html}</div>
</body>
</html>`.trim();
}
