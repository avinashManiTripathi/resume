/**
 * Placeholder Replacer Utility
 * Safely replaces placeholders in templates with user data
 */

/**
 * Replace placeholders in content with provided data
 * Handles both simple strings and arrays (like skills)
 * 
 * @param content - Template content with placeholders like {{fieldName}}
 * @param data - Object containing field values
 * @returns Content with placeholders replaced
 */
// Helper to access nested properties safely
function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined;
    }, obj);
}

/**
 * Replace placeholders in content with provided data
 * Handles nested keys like {{personalInfo.fullName}}
 * 
 * @param content - Template content with placeholders like {{fieldName}} or {{nested.field}}
 * @param data - Object containing field values
 * @returns Content with placeholders replaced
 */
export function replacePlaceholders(
    content: string,
    data: Record<string, any>
): string {
    if (!content) return '';

    // Regex to find all {{key}} patterns
    return content.replace(/\{\{([\w\.]+)\}\}/g, (match, key) => {
        const value = getNestedValue(data, key);

        // Handle different value types
        if (Array.isArray(value)) {
            return formatArray(value);
        } else if (value === null || value === undefined) {
            return '';
        } else {
            return escapeContent(String(value));
        }
    });
}

/**
 * Format array values for display
 * 
 * @param arr - Array of values
 * @returns Formatted string
 */
export function formatArray(arr: any[]): string {
    if (!arr || arr.length === 0) {
        return '';
    }

    // Filter out empty values
    const filtered = arr.filter(item => item && String(item).trim());

    if (filtered.length === 0) {
        return '';
    }

    // Join with commas and "and" for the last item
    if (filtered.length === 1) {
        return String(filtered[0]);
    }

    if (filtered.length === 2) {
        return `${filtered[0]} and ${filtered[1]}`;
    }

    const lastItem = filtered[filtered.length - 1];
    const otherItems = filtered.slice(0, -1);
    return `${otherItems.join(', ')}, and ${lastItem}`;
}

/**
 * Escape special characters to prevent injection
 * 
 * @param content - Raw content
 * @returns Escaped content
 */
export function escapeContent(content: string): string {
    if (!content) {
        return '';
    }

    // Basic escaping for safety
    return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Unescape content for display
 * (Used when generating plain text versions)
 * 
 * @param content - Escaped content
 * @returns Unescaped content
 */
export function unescapeContent(content: string): string {
    if (!content) {
        return '';
    }

    return content
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

/**
 * Sanitize user input
 * Removes potentially harmful content while preserving formatting
 * 
 * @param input - User input
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
    if (!input) {
        return '';
    }

    // Remove script tags and other potentially harmful content
    let sanitized = input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');

    // Trim excessive whitespace
    sanitized = sanitized.trim();

    return sanitized;
}
