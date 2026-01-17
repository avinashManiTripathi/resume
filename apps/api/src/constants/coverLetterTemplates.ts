import { coverLetterTemplates } from '../templates/cover-letter';

export interface CoverLetterTemplate {
    id: string;
    name: string;
    category?: string;
    description: string;
    previewText: string;
    templateBody: string | string[];
    supportedFields: string[];
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = coverLetterTemplates as CoverLetterTemplate[];

export function getTemplateById(id: string): CoverLetterTemplate | undefined {
    return COVER_LETTER_TEMPLATES.find(template => template.id === id);
}

export function isValidTemplateId(id: string): boolean {
    return COVER_LETTER_TEMPLATES.some(template => template.id === id);
}
