/**
 * Cover Letter Types
 * TypeScript interfaces and types for cover letter generation
 */

/**
 * Structured User Data for JSON storage
 */
export interface CoverLetterUserData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        jobTitle?: string;
        address?: string;
        website?: string;
    };
    recipientInfo: {
        companyName: string;
        managerName?: string;
        address?: string;
    };
    content: {
        greeting?: string;
        body: string[]; // Array of paragraphs
        bodyHTML?: string; // Pre-formatted HTML for templates
        closing?: string;
        signOff?: string;
    };
    meta?: {
        themeColor?: string;
        fontFamily?: string;
    };
}

/**
 * Legacy/Frontend Flat Data Structure
 * Used for incoming requests from the existing frontend form
 */
export interface FlatCoverLetterUserData {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
    experience: string; // Used to generate body
    skills?: string[]; // Used to generate body
    customParagraph?: string;
    fontFamily?: string;
}

/**
 * Cover letter generation request
 */
export interface GenerateCoverLetterRequest {
    templateId: string;
    userData: FlatCoverLetterUserData;
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
