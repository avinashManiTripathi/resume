export interface PersonalInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    city?: string;
    state?: string;
    pincode?: string
    country?: string;
    summary: string;
    profileImage?: string; // Base64 encoded image or URL
    linkedin?: string;
    github?: string;
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

export interface Achievement {
    title?: string;
    description?: string;
    date?: string;
}

export interface Certification {
    name?: string;
    issuer?: string;
    date?: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
}

export interface Award {
    title?: string;
    issuer?: string;
    date?: string;
    description?: string;
}

export interface Publication {
    title?: string;
    publisher?: string;
    date?: string;
    url?: string;
    description?: string;
}

export interface VolunteerExperience {
    role?: string;
    organization?: string;
    startDate?: string;
    endDate?: string;
    currentlyVolunteering?: boolean;
    description?: string;
}

export interface Interest {
    name?: string;
    description?: string;
}

export interface Reference {
    name?: string;
    jobTitle?: string;
    company?: string;
    email?: string;
    phone?: string;
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

export interface TypographySettings {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    sectionGap: number;
    itemGap: number;
    headingSize: number;
    nameSize: number;
    pageMargin: number;
}

export interface ResumeData {
    templateId?: string;
    fontFamily?: string;
    typography?: TypographySettings;
    order?: string[];
    personalInfo?: PersonalInfo;
    experience?: Experience[];
    education?: Education[];
    skills?: Skill[];
    languages?: Language[];
    achievements?: Achievement[];
    projects?: any[];
    certifications?: Certification[];
    awards?: Award[];
    publications?: Publication[];
    volunteer?: VolunteerExperience[];
    interests?: Interest[];
    references?: Reference[];
    customSections?: CustomSection[];
}

export interface PdfGenerationOptions {
    filename?: string;
    inline?: boolean;
}
