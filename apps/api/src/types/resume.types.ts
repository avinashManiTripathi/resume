export interface PersonalInfo {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    summary?: string;
}

export interface Experience {
    jobTitle?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking?: boolean;
    description?: string;
    responsibilities?: string[];
}

export interface Education {
    degree?: string;
    fieldOfStudy?: string;
    institution?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface Skill {
    name?: string;
    level?: string;
}

export interface Language {
    language?: string;
    proficiency?: string;
}

export interface CustomSectionField {
    label: string;
    value: string;
    type: 'text' | 'richtext' | 'date' | 'month' | 'email' | 'select';
}

export interface CustomSectionItem {
    id: string;
    fields: Record<string, CustomSectionField>;
}

export interface CustomSection {
    id: string;
    label: string;
    icon?: string;
    items: CustomSectionItem[];
    fieldDefinitions: Record<string, {
        label: string;
        type: 'text' | 'richtext' | 'date' | 'month' | 'email' | 'select';
        options?: string[];
    }>;
}

export interface ResumeData {
    templateId?: string;
    order?: string[];
    personalInfo?: PersonalInfo;
    experience?: Experience[];
    education?: Education[];
    skills?: Skill[];
    languages?: Language[];
    achievements?: string[];
    projects?: any[];
    certifications?: any[];
    awards?: any[];
    publications?: any[];
    volunteer?: any[];
    interests?: any[];
    references?: any[];
    customSections?: CustomSection[];
}

export interface PdfGenerationOptions {
    filename?: string;
    inline?: boolean;
}
