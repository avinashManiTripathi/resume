interface AnalysisOptions {
    jobTitle?: string;
    company?: string;
}

interface Suggestion {
    id: string;
    type: 'keyword' | 'content' | 'format';
    section: string;
    current: string;
    suggested: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
}

interface AnalysisResult {
    matchScore: number;
    atsScore: number;
    keywords: {
        present: string[];
        missing: string[];
    };
    suggestions: Suggestion[];
    strengths: string[];
    weaknesses: string[];
}

export class TailorService {
    /**
     * Analyze resume against job description
     */
    async analyzeResume(
        resume: string | any,
        jobDescription: string,
        options: AnalysisOptions = {}
    ): Promise<AnalysisResult> {
        let resumeText = '';

        if (typeof resume === 'string') {
            resumeText = resume;
        } else {
            resumeText = this.convertResumeJsonToText(resume);
        }

        // Extract keywords from job description
        const jdKeywords = this.extractKeywords(jobDescription);
        const resumeKeywords = this.extractKeywords(resumeText);

        // Find missing and present keywords
        const missingKeywords = jdKeywords.filter(kw =>
            !resumeKeywords.some(rk => rk.toLowerCase() === kw.toLowerCase())
        );
        const presentKeywords = jdKeywords.filter(kw =>
            resumeKeywords.some(rk => rk.toLowerCase() === kw.toLowerCase())
        );

        // Calculate match score
        const matchScore = this.calculateMatchScore(presentKeywords.length, jdKeywords.length);

        // Check ATS compatibility
        const atsScore = this.checkATSCompatibility(resumeText);

        // Generate suggestions
        const suggestions = this.generateSuggestions(
            resumeText,
            jobDescription,
            missingKeywords,
            options
        );

        // Identify strengths and weaknesses
        const strengths = this.identifyStrengths(resumeText, presentKeywords);
        const weaknesses = this.identifyWeaknesses(resumeText, missingKeywords);

        return {
            matchScore,
            atsScore,
            keywords: {
                present: presentKeywords,
                missing: missingKeywords
            },
            suggestions,
            strengths,
            weaknesses
        };
    }

    /**
     * Convert Resume JSON to text for analysis
     */
    private convertResumeJsonToText(resume: any): string {
        const parts: string[] = [];

        // Basics
        if (resume.personalInfo) {
            const { firstName, lastName, jobTitle, summary } = resume.personalInfo;
            if (firstName) parts.push(firstName);
            if (lastName) parts.push(lastName);
            if (jobTitle) parts.push(jobTitle);
            if (summary) parts.push(summary);
        }

        if (resume.basics) { // Handle standard JSON Resume format too
            const { name, label, summary } = resume.basics;
            if (name) parts.push(name);
            if (label) parts.push(label);
            if (summary) parts.push(summary);
        }

        // Experience
        if (Array.isArray(resume.experience)) {
            parts.push('EXPERIENCE');
            resume.experience.forEach((exp: any) => {
                if (exp.jobTitle || exp.position) parts.push(exp.jobTitle || exp.position);
                if (exp.company || exp.name) parts.push(exp.company || exp.name);
                if (exp.description || exp.summary) parts.push(exp.description || exp.summary);
            });
        }

        if (Array.isArray(resume.work)) { // Standard JSON Resume
            parts.push('EXPERIENCE');
            resume.work.forEach((exp: any) => {
                if (exp.position) parts.push(exp.position);
                if (exp.name) parts.push(exp.name);
                if (exp.summary) parts.push(exp.summary);
                if (Array.isArray(exp.highlights)) parts.push(...exp.highlights);
            });
        }

        // Education
        if (Array.isArray(resume.education)) {
            parts.push('EDUCATION');
            resume.education.forEach((edu: any) => {
                if (edu.institution || edu.school) parts.push(edu.institution || edu.school);
                if (edu.degree || edu.area) parts.push(edu.degree || edu.area);
            });
        }

        // Skills
        if (Array.isArray(resume.skills)) {
            parts.push('SKILLS');
            resume.skills.forEach((skill: any) => {
                if (typeof skill === 'string') parts.push(skill);
                else if (skill.name) parts.push(skill.name);

                if (Array.isArray(skill.keywords)) {
                    parts.push(...skill.keywords);
                }
            });
        }

        return parts.join('\n');
    }


    /**
     * Extract keywords from text
     */
    private extractKeywords(text: string): string[] {
        // Common technical skills and keywords
        const techKeywords = [
            'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
            'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'Scrum',
            'Leadership', 'Mentoring', 'Team Management', 'Product Design',
            'UI/UX', 'Figma', 'Sketch', 'Adobe XD', 'HTML', 'CSS',
            'SQL', 'MongoDB', 'PostgreSQL', 'Git', 'REST API', 'GraphQL'
        ];

        const foundKeywords: string[] = [];
        const lowerText = text.toLowerCase();

        techKeywords.forEach(keyword => {
            if (lowerText.includes(keyword.toLowerCase())) {
                foundKeywords.push(keyword);
            }
        });

        // Extract action verbs
        const actionVerbs = [
            'led', 'managed', 'developed', 'designed', 'implemented',
            'created', 'built', 'launched', 'improved', 'optimized',
            'collaborated', 'coordinated', 'achieved', 'delivered'
        ];

        actionVerbs.forEach(verb => {
            if (lowerText.includes(verb)) {
                foundKeywords.push(verb);
            }
        });

        return [...new Set(foundKeywords)];
    }

    /**
     * Calculate match score
     */
    private calculateMatchScore(matchedCount: number, totalCount: number): number {
        if (totalCount === 0) return 0;
        const score = (matchedCount / totalCount) * 100;
        return Math.round(score);
    }

    /**
     * Check ATS compatibility
     */
    private checkATSCompatibility(resumeText: string): number {
        let score = 100;

        // Check for common ATS issues
        if (resumeText.includes('|') || resumeText.includes('─')) {
            score -= 10; // Tables or special characters
        }

        if (resumeText.length < 200) {
            score -= 20; // Too short
        }

        if (!/experience|work history/i.test(resumeText)) {
            score -= 15; // Missing standard sections
        }

        if (!/education/i.test(resumeText)) {
            score -= 10;
        }

        if (!/skills/i.test(resumeText)) {
            score -= 10;
        }

        return Math.max(0, score);
    }

    /**
     * Generate suggestions
     */
    private generateSuggestions(
        resumeText: string,
        jobDescription: string,
        missingKeywords: string[],
        options: AnalysisOptions
    ): Suggestion[] {
        const suggestions: Suggestion[] = [];

        // Keyword suggestions
        if (missingKeywords.length > 0) {
            const topMissing = missingKeywords.slice(0, 5);
            suggestions.push({
                id: 'kw-1',
                type: 'keyword',
                section: 'Skills',
                current: '',
                suggested: `Add these keywords: ${topMissing.join(', ')}`,
                reason: 'These keywords appear in the job description but are missing from your resume',
                priority: 'high'
            });
        }

        // Summary suggestion
        if (!/summary|objective/i.test(resumeText)) {
            suggestions.push({
                id: 'content-1',
                type: 'content',
                section: 'Professional Summary',
                current: 'Not present',
                suggested: `${options.jobTitle || 'Professional'} with expertise in ${missingKeywords.slice(0, 3).join(', ')}. Proven track record of delivering results in fast-paced environments.`,
                reason: 'Adding a professional summary helps ATS and recruiters quickly understand your value',
                priority: 'high'
            });
        }

        // Quantification suggestion
        if (!/\d+%|\d+ years|\$\d+/i.test(resumeText)) {
            suggestions.push({
                id: 'content-2',
                type: 'content',
                section: 'Experience',
                current: 'Generic descriptions',
                suggested: 'Add quantifiable achievements (e.g., "Increased user engagement by 40%", "Led team of 5 developers")',
                reason: 'Quantified achievements make your impact more tangible and impressive',
                priority: 'medium'
            });
        }

        // Action verbs suggestion
        suggestions.push({
            id: 'content-3',
            type: 'content',
            section: 'Experience',
            current: 'Passive language',
            suggested: 'Start bullet points with strong action verbs: Led, Developed, Implemented, Optimized, Achieved',
            reason: 'Action verbs make your contributions more impactful and easier to scan',
            priority: 'medium'
        });

        // Format suggestion
        if (resumeText.length > 2000) {
            suggestions.push({
                id: 'format-1',
                type: 'format',
                section: 'Overall',
                current: 'Long resume',
                suggested: 'Consider condensing to 1-2 pages by focusing on most relevant experience',
                reason: 'Recruiters typically spend 6-7 seconds on initial resume scan',
                priority: 'low'
            });
        }

        return suggestions;
    }

    /**
     * Identify strengths
     */
    private identifyStrengths(resumeText: string, presentKeywords: string[]): string[] {
        const strengths: string[] = [];

        if (presentKeywords.length > 5) {
            strengths.push(`Strong keyword match with ${presentKeywords.length} relevant skills`);
        }

        if (/\d+%|\d+ years/i.test(resumeText)) {
            strengths.push('Includes quantifiable achievements');
        }

        if (/led|managed|directed/i.test(resumeText)) {
            strengths.push('Demonstrates leadership experience');
        }

        if (resumeText.length > 500 && resumeText.length < 2000) {
            strengths.push('Appropriate resume length');
        }

        return strengths;
    }

    /**
     * Identify weaknesses
     */
    private identifyWeaknesses(resumeText: string, missingKeywords: string[]): string[] {
        const weaknesses: string[] = [];

        if (missingKeywords.length > 10) {
            weaknesses.push(`Missing ${missingKeywords.length} important keywords from job description`);
        }

        if (!/summary|objective/i.test(resumeText)) {
            weaknesses.push('No professional summary or objective statement');
        }

        if (resumeText.length < 300) {
            weaknesses.push('Resume appears too brief');
        }

        return weaknesses;
    }

    /**
     * Apply suggestions to resume
     */
    async applySuggestions(resumeData: any, suggestions: Suggestion[]): Promise<any> {
        const updatedResume = JSON.parse(JSON.stringify(resumeData)); // Deep clone

        for (const suggestion of suggestions) {
            // keywords suggestion
            if (suggestion.id.startsWith('kw-')) {
                const keywordsToAdd = suggestion.suggested
                    .replace('Add these keywords: ', '')
                    .split(', ')
                    .map(k => k.trim());

                // Initialize skills array if missing
                if (!updatedResume.skills) {
                    updatedResume.skills = [];
                }

                // Identify if 'Skills' section exists in structured format or it's a simple list
                // Assuming standard JSON Resume schema or internal format
                // Case 1: Simple array of strings (legacy/simple) - unlikely for this app but covering bases
                if (Array.isArray(updatedResume.skills) && typeof updatedResume.skills[0] === 'string') {
                    const existing = new Set(updatedResume.skills.map((s: string) => s.toLowerCase()));
                    keywordsToAdd.forEach(kw => {
                        if (!existing.has(kw.toLowerCase())) {
                            updatedResume.skills.push(kw);
                        }
                    });
                }
                // Case 2: Array of objects { name, keywords[] } (JSON Resume standard)
                else if (Array.isArray(updatedResume.skills)) {
                    // Find or create a "Technical Skills" or generic category
                    let skillGroup = updatedResume.skills.find((s: any) =>
                        /technical|skills|technologies/i.test(s.name || '')
                    );

                    if (!skillGroup) {
                        skillGroup = { name: 'Technical Skills', keywords: [] };
                        updatedResume.skills.push(skillGroup);
                    }

                    if (!skillGroup.keywords) skillGroup.keywords = [];

                    const existing = new Set(skillGroup.keywords.map((k: string) => k.toLowerCase()));
                    keywordsToAdd.forEach(kw => {
                        if (!existing.has(kw.toLowerCase())) {
                            skillGroup.keywords.push(kw);
                        }
                    });
                }
            }

            // Summary suggestion
            if (suggestion.id.startsWith('content-1')) {
                if (!updatedResume.basics) updatedResume.basics = {};

                // Only update if current is empty or user explicitly requested (which they did by clicking apply)
                // We overwrite the summary with the optimized one
                updatedResume.basics.summary = suggestion.suggested;
            }
        }

        return updatedResume;
    }
}
