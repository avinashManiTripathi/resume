import { GoogleGenAI } from '@google/genai';
import { config } from '../config';

interface PersonalInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    summary: string;
}

interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    description?: string;
}

interface Project {
    name: string;
    companyName?: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Skill {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface Certification {
    name: string;
    issuer: string;
    date: string;
}

interface Language {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

interface Award {
    title: string;
    organization: string;
    date: string;
    description: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: Skill[];
    certifications: Certification[];
    languages: Language[];
    awards: Award[];
}

export class ResumeExtractionService {
    private ai: any;

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
    }

    /**
     * Extract structured resume data from free-text input
     */
    async extractFromText(text: string): Promise<ResumeData> {
        if (!text || text.trim().length < 50) {
            throw new Error('Please provide more detailed information (minimum 50 characters)');
        }

        const prompt = this.buildExtractionPrompt(text);

        try {
            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            const responseText = response.text || '';
            // Extract JSON from response (handle markdown code blocks)
            const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) ||
                responseText.match(/```\n?([\s\S]*?)\n?```/) ||
                [null, responseText];

            const jsonText = jsonMatch[1] || responseText;
            const extractedData = JSON.parse(jsonText.trim());

            // Validate and clean the data
            return this.validateAndCleanData(extractedData);
        } catch (error: any) {
            console.error('AI extraction error:', error);
            throw new Error(error.toString());
        }
    }

    /**
     * Combine text and PDF content for extraction
     */
    async combineAndExtract(textContent: string, pdfContent: string): Promise<ResumeData> {
        const combinedContent = `
=== User-Provided Information ===
${textContent}

=== Content from Uploaded Resume ===
${pdfContent}
        `.trim();

        return this.extractFromText(combinedContent);
    }

    /**
     * Build AI prompt for resume extraction
     */
    private buildExtractionPrompt(content: string): string {
        return `You are an expert resume parser and career advisor. Your task is to extract career information from the provided text and return it in a structured JSON format.

**CRITICAL RULES:**
1. **Translation**: If the content is in any language other than English, translate ALL fields to professional, native-level English
2. **ATS Optimization**: Rewrite all content to be ATS-friendly:
   - Use standard industry keywords and job titles
   - **CRITICAL: Focus on QUANTIFIABLE achievements with specific numbers, percentages, and metrics**
   - Use action verbs (Led, Developed, Managed, Implemented, Achieved, Increased, Reduced, etc.)
   - Include specific tools, technologies, and methodologies
   - Make descriptions clear, concise, and professional
   - Avoid tables, icons, emojis, or complex formatting in text
3. **Quantifiable Achievements Requirements**:
   - **MUST include numbers, percentages, or metrics in EVERY experience description**
   - Examples: "Increased revenue by 30%", "Managed team of 5 developers", "Reduced load time by 40%", "Processed 1000+ transactions daily"
   - If exact numbers aren't provided, use reasonable estimates based on role and industry standards
   - Always show IMPACT with before/after metrics where possible
4. **Word Variety and Uniqueness**:
   - **CRITICAL: Use DIVERSE vocabulary throughout the resume**
   - **DO NOT repeat the same action verbs or descriptive words**
   - Vary sentence structures and phrasing across different bullet points
   - Use synonyms to avoid redundancy (e.g., instead of repeating "Developed", use "Built", "Created", "Engineered", "Designed", "Implemented")
   - Each experience description should feel unique and fresh, not formulaic
5. **Data Integrity**: 
   - Do NOT invent job titles or companies
   - If a field is not mentioned, use null or empty array
   - Dates should be from provided information only
   - Extract ONLY factual information from the input
   - **Achievement metrics can be estimated reasonably if not explicitly stated**
6. **Date Format**: Use YYYY-MM format for all dates (e.g., "2023-01" for January 2023)
7. **Professional Tone**: Ensure all text is professional, clear, and impactful

**INPUT:**
${content}

**REQUIRED OUTPUT FORMAT:**
Return ONLY a valid JSON object matching this exact schema (no additional text, explanations, or markdown):

{
  "personalInfo": {
    "firstName": "string (required)",
    "lastName": "string (required)",
   "jobTitle": "string (professional title, ATS-optimized)",
    "email": "string (valid email or null)",
    "phone": "string (formatted phone number or null)",
    "summary": "string (2-3 sentences highlighting key strengths, years of experience, core expertise, and value proposition with quantifiable achievements - ATS-optimized with keywords)"
  },
  "experience": [
    {
      "jobTitle": "string (clear, standard job title)",
      "company": "string (company name)",
      "startDate": "string (YYYY-MM format)",
      "endDate": "string (YYYY-MM format or empty string if current)",
      "description": "string (3-5 bullet points in HTML format using <ul><li> tags. EACH bullet point MUST start with action verb and include QUANTIFIABLE achievements with specific numbers, percentages, or metrics. Examples: 'Increased user engagement by 45% through redesign', 'Led team of 8 developers', 'Reduced API response time from 500ms to 150ms', 'Managed budget of $200K+', 'Delivered 15+ projects on time')"
    }
  ],
  
  **IMPORTANT**: Order ALL experience entries by date, with MOST RECENT position FIRST (descending order by startDate).
  
  "education": [
    {
      "degree": "string (full degree name, e.g., Bachelor of Science in Computer Science)",
      "institution": "string (university/school name)",
      "startDate": "string (YYYY-MM)",
      "endDate": "string (YYYY-MM)",
      "description": "string (optional: GPA, honors, relevant coursework, or null)"
    }
  ],
  "projects": [
    {
      "name": "string (project name)",
      "companyName": "string (company/organization or null)",
      "startDate": "string (YYYY-MM)",
      "endDate": "string (YYYY-MM)",
      "description": "string (project description with technologies used, quantifiable outcomes with metrics - e.g., 'Improved performance by 60%', 'Reduced costs by $50K', 'Served 10K+ users')"
    }
  ],
  "skills": [
    {
      "name": "string (skill name, e.g., JavaScript, Project Management)",
      "level": "Beginner|Intermediate|Advanced|Expert (estimate based on context)"
    }
  ],
  "certifications": [
    {
      "name": "string (certification name)",
      "issuer": "string (issuing organization)",
      "date": "string (YYYY-MM)"
    }
  ],
  "languages": [
    {
      "name": "string (language name)",
      "proficiency": "Native|Fluent|Intermediate|Basic"
    }
  ],
  "awards": [
    {
      "title": "string (award title)",
      "organization": "string (awarding organization)",
      "date": "string (YYYY-MM)",
      "description": "string (brief description of achievement)"
    }
  ]
}

**IMPORTANT:**
- Return ONLY the JSON object, no additional text
- Ensure all strings are properly escaped
- Use empty arrays [] if no data exists for a section
- Use null for missing individual fields within objects
- Prioritize quality over quantity - only include relevant, verified information
- Make all content ATS-optimized and professional

Now extract and structure the resume data:`;
    }

    /**
     * Validate and clean extracted data
     */
    private validateAndCleanData(data: any): ResumeData {
        // Ensure required fields exist
        if (!data.personalInfo?.firstName || !data.personalInfo?.lastName) {
            throw new Error('Name information is required. Please provide at least first and last name.');
        }

        // Initialize default structure
        const cleanData: ResumeData = {
            personalInfo: {
                firstName: data.personalInfo.firstName || '',
                lastName: data.personalInfo.lastName || '',
                jobTitle: data.personalInfo.jobTitle || '',
                email: this.validateEmail(data.personalInfo.email),
                phone: data.personalInfo.phone || '',
                summary: data.personalInfo.summary || ''
            },
            experience: this.cleanExperience(data.experience || []),
            education: this.cleanEducation(data.education || []),
            projects: this.cleanProjects(data.projects || []),
            skills: this.cleanSkills(data.skills || []),
            certifications: data.certifications || [],
            languages: data.languages || [],
            awards: data.awards || []
        };

        return cleanData;
    }

    /**
     * Validate email format
     */
    private validateEmail(email: string): string {
        if (!email) return '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? email : '';
    }

    /**
     * Clean and validate experience data
     */
    private cleanExperience(experience: any[]): Experience[] {
        return experience
            .filter(exp => exp.jobTitle && exp.company)
            .map(exp => ({
                jobTitle: exp.jobTitle,
                company: exp.company,
                startDate: this.validateDate(exp.startDate),
                endDate: exp.endDate || '',
                description: exp.description || ''
            }))
            .sort((a, b) => {
                // Sort by startDate descending (most recent first)
                // Handle empty dates (current positions) - they should be first
                if (!a.startDate && !b.startDate) return 0;
                if (!a.startDate) return -1;
                if (!b.startDate) return 1;
                return b.startDate.localeCompare(a.startDate);
            });
    }

    /**
     * Clean and validate education data
     */
    private cleanEducation(education: any[]): Education[] {
        return education
            .filter(edu => edu.degree && edu.institution)
            .map(edu => ({
                degree: edu.degree,
                institution: edu.institution,
                startDate: this.validateDate(edu.startDate),
                endDate: this.validateDate(edu.endDate),
                description: edu.description || ''
            }));
    }

    /**
     * Clean and validate projects data
     */
    private cleanProjects(projects: any[]): Project[] {
        return projects
            .filter(proj => proj.name)
            .map(proj => ({
                name: proj.name,
                companyName: proj.companyName || '',
                startDate: this.validateDate(proj.startDate),
                endDate: this.validateDate(proj.endDate),
                description: proj.description || ''
            }));
    }

    /**
     * Clean and validate skills data
     */
    private cleanSkills(skills: any[]): Skill[] {
        const validLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        return skills
            .filter(skill => skill.name)
            .map(skill => ({
                name: skill.name,
                level: validLevels.includes(skill.level) ? skill.level : 'Intermediate'
            }));
    }

    /**
     * Validate date format (YYYY-MM)
     */
    private validateDate(date: string): string {
        if (!date) return '';
        const dateRegex = /^\d{4}-\d{2}$/;
        return dateRegex.test(date) ? date : '';
    }
}

export const resumeExtractionService = new ResumeExtractionService();
