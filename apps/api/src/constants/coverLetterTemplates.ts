/**
 * Cover Letter Templates
 * 
 * Each template defines a professional cover letter structure with placeholders
 * that will be dynamically replaced with user data.
 */

export interface CoverLetterTemplate {
    id: string;
    name: string;
    description: string;
    previewText: string;
    templateBody: string;
    supportedFields: string[];
}

/**
 * Template 1: Professional Standard
 * Clean, corporate format suitable for traditional industries
 */
export const PROFESSIONAL_STANDARD: CoverLetterTemplate = {
    id: 'professional-standard',
    name: 'Professional Standard',
    description: 'Clean and professional format ideal for corporate roles, finance, consulting, and traditional industries. Emphasizes experience and qualifications.',
    previewText: 'Dear Hiring Manager, I am writing to express my strong interest in the {{jobTitle}} position at {{companyName}}...',
    supportedFields: ['fullName', 'email', 'phone', 'jobTitle', 'companyName', 'experience', 'customParagraph'],
    templateBody: `
Dear Hiring Manager,

I am writing to express my strong interest in the {{jobTitle}} position at {{companyName}}. With {{experience}}, I am confident that my skills and background make me an excellent candidate for this role.

{{customParagraph}}

Throughout my career, I have consistently demonstrated a commitment to excellence and professional growth. I am particularly drawn to {{companyName}} because of its reputation for innovation and commitment to quality. I believe my experience aligns perfectly with the requirements of this position, and I am excited about the opportunity to contribute to your team's success.

I am eager to bring my expertise and dedication to {{companyName}} and would welcome the opportunity to discuss how my background, skills, and enthusiasm can benefit your organization. Thank you for considering my application. I look forward to the possibility of contributing to your team.

Sincerely,
{{fullName}}
{{email}}
{{phone}}
    `.trim()
};

/**
 * Template 2: Modern Creative
 * Contemporary design with personality, suitable for creative and startup roles
 */
export const MODERN_CREATIVE: CoverLetterTemplate = {
    id: 'modern-creative',
    name: 'Modern Creative',
    description: 'Contemporary and engaging format perfect for creative roles, startups, marketing positions, and modern companies. Shows personality while maintaining professionalism.',
    previewText: 'Hello {{companyName}} Team! I\'m {{fullName}}, and I\'m excited to apply for the {{jobTitle}} role...',
    supportedFields: ['fullName', 'email', 'phone', 'jobTitle', 'companyName', 'experience', 'skills', 'customParagraph'],
    templateBody: `
Hello {{companyName}} Team,

I'm {{fullName}}, and I'm excited to apply for the {{jobTitle}} role. When I discovered this opportunity, I knew I had to reach out – it's the perfect intersection of my passion and expertise.

{{customParagraph}}

With {{experience}}, I've developed a robust skill set that includes {{skills}}. What sets me apart is not just my technical abilities, but my approach to problem-solving and collaboration. I thrive in dynamic environments where innovation is encouraged and creativity is valued.

{{companyName}}'s mission resonates deeply with me, and I'm particularly impressed by your recent achievements and forward-thinking approach. I'm confident that my combination of skills, experience, and enthusiasm would make me a valuable addition to your team.

I'd love the opportunity to discuss how I can contribute to {{companyName}}'s continued success. Let's connect and explore how we can create something amazing together!

Best regards,
{{fullName}}
{{email}}
{{phone}}
    `.trim()
};

/**
 * Template 3: Technical Expert
 * Tech-focused language suitable for engineering and technical roles
 */
export const TECHNICAL_EXPERT: CoverLetterTemplate = {
    id: 'technical-expert',
    name: 'Technical Expert',
    description: 'Technical and detailed format designed for software engineers, data scientists, and technology roles. Highlights technical skills and problem-solving abilities.',
    previewText: 'Dear {{companyName}} Engineering Team, I am applying for the {{jobTitle}} position with a strong background in {{skills}}...',
    supportedFields: ['fullName', 'email', 'phone', 'jobTitle', 'companyName', 'experience', 'skills', 'customParagraph'],
    templateBody: `
Dear {{companyName}} Engineering Team,

I am applying for the {{jobTitle}} position with a strong technical foundation and proven track record in building scalable solutions. With {{experience}}, I have developed deep expertise in {{skills}}, and I am excited about the opportunity to bring this experience to {{companyName}}.

{{customParagraph}}

My approach to software development emphasizes clean code, robust architecture, and continuous improvement. I am passionate about solving complex technical challenges and have consistently delivered high-impact solutions that drive business value. I stay current with emerging technologies and best practices, ensuring that my work leverages the most effective tools and methodologies.

I am particularly drawn to {{companyName}} because of your commitment to technical excellence and innovation. Your tech stack and engineering culture align perfectly with my skills and values. I am confident that I can make immediate contributions to your team while continuing to grow as an engineer.

I would welcome the opportunity to discuss how my technical expertise and problem-solving abilities can contribute to {{companyName}}'s engineering goals. Thank you for your consideration.

Sincerely,
{{fullName}}
{{email}}
{{phone}}

Technical Skills: {{skills}}
    `.trim()
};

/**
 * All available cover letter templates
 */
export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
    PROFESSIONAL_STANDARD,
    MODERN_CREATIVE,
    TECHNICAL_EXPERT
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): CoverLetterTemplate | undefined {
    return COVER_LETTER_TEMPLATES.find(template => template.id === id);
}

/**
 * Validate template ID
 */
export function isValidTemplateId(id: string): boolean {
    return COVER_LETTER_TEMPLATES.some(template => template.id === id);
}
