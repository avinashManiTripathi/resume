/**
 * Validation Utility
 * Validates user data and requests for cover letter generation
 */

import { CoverLetterUserData, ValidationResult } from '../types/cover-letter.types';
import { CoverLetterTemplate } from '../constants/coverLetterTemplates';
import { sanitizeInput } from './placeholderReplacer';

/**
 * Validate user data against template requirements
 * 
 * @param userData - User provided data
 * @param template - Selected template
 * @returns Validation result with errors if any
 */
export function validateUserData(
    userData: CoverLetterUserData,
    template: CoverLetterTemplate
): ValidationResult {
    const errors: string[] = [];

    // Check required fields
    const requiredFields = template.supportedFields.filter(field =>
        !['customParagraph', 'skills'].includes(field) // These are optional
    );

    requiredFields.forEach(field => {
        const value = (userData as any)[field];
        if (!value || (typeof value === 'string' && !value.trim())) {
            errors.push(`${field} is required`);
        }
    });

    // Validate email format
    if (userData.email && !isValidEmail(userData.email)) {
        errors.push('Invalid email format');
    }

    // Validate phone format (basic validation)
    if (userData.phone && !isValidPhone(userData.phone)) {
        errors.push('Invalid phone format');
    }

    // Validate skills array if provided
    if (userData.skills && !Array.isArray(userData.skills)) {
        errors.push('Skills must be an array');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Validate email format
 * 
 * @param email - Email address
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 * Accepts various international formats
 * 
 * @param phone - Phone number
 * @returns True if valid
 */
export function isValidPhone(phone: string): boolean {
    // Remove common separators
    const cleaned = phone.replace(/[\s\-().]/g, '');

    // Check if it's a valid length and contains only digits and +
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(cleaned);
}

/**
 * Sanitize all user data inputs
 * 
 * @param userData - Raw user data
 * @returns Sanitized user data
 */
export function sanitizeUserData(userData: CoverLetterUserData): CoverLetterUserData {
    return {
        fullName: sanitizeInput(userData.fullName || ''),
        email: sanitizeInput(userData.email || ''),
        phone: sanitizeInput(userData.phone || ''),
        jobTitle: sanitizeInput(userData.jobTitle || ''),
        companyName: sanitizeInput(userData.companyName || ''),
        experience: sanitizeInput(userData.experience || ''),
        skills: userData.skills?.map(skill => sanitizeInput(skill)) || [],
        customParagraph: userData.customParagraph ? sanitizeInput(userData.customParagraph) : undefined
    };
}

/**
 * Validate format parameter
 * 
 * @param format - Requested format
 * @returns True if valid
 */
export function isValidFormat(format: string): format is 'pdf' | 'docx' {
    return format === 'pdf' || format === 'docx';
}
