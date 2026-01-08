/**
 * Cover Letter Types
 * TypeScript interfaces and types for cover letter generation
 */

/**
 * User data for cover letter generation
 */
export interface CoverLetterUserData {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
    experience: string;
    skills?: string[];
    customParagraph?: string;
}

/**
 * Cover letter generation request
 */
export interface GenerateCoverLetterRequest {
    templateId: string;
    userData: CoverLetterUserData;
    format: 'pdf' | 'docx';
}

/**
 * Validation result
 */
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * Template metadata (for list endpoint)
 */
export interface TemplateMetadata {
    id: string;
    name: string;
    description: string;
    previewText: string;
    supportedFields: string[];
}
