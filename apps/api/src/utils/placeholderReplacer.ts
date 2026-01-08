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
export function replacePlaceholders(
    content: string,
    data: Record<string, any>
): string {
    let result = content;

    // Replace each placeholder
    Object.entries(data).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;

        // Handle different value types
        let replacementValue: string;

        if (Array.isArray(value)) {
            // Format arrays (e.g., skills)
            replacementValue = formatArray(value);
        } else if (value === null || value === undefined) {
            // Handle null/undefined
            replacementValue = '';
        } else {
            // Convert to string and escape
            replacementValue = escapeContent(String(value));
        }

        // Replace all occurrences
        result = result.split(placeholder).join(replacementValue);
    });

    // Remove any remaining placeholders (optional fields that weren't provided)
    result = result.replace(/\{\{[^}]+\}\}/g, '');

    // Clean up excessive whitespace
    result = result.replace(/\n\s*\n\s*\n/g, '\n\n');

    return result.trim();
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
