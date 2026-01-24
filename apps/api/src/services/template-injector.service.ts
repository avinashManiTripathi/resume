import { ResumeData } from '../types/resume.types';
import { RESUMES } from '../constant';
import { Template } from '../models';

import { LRUCache } from 'lru-cache';

const templateCache = new LRUCache<string, string>({
    max: 100,
    ttl: 1000 * 60 * 5,
});

export class TemplateInjectorService {

    /**
     * Get template HTML by ID (fetch from database)
     */
    private async getTemplateById(templateId: string): Promise<string> {

        const cachedTemplate = templateCache.get(templateId);
        if (cachedTemplate) {
            console.log("Template from cache")
            return cachedTemplate;
        }

        try {
            console.time("Template from database")
            // Try to find template in database by _id or id
            const template = await Template.findById(templateId);
            console.timeEnd("Template from database")

            if (template && template.htmlContent) {
                return template.htmlContent;
            }
        } catch (error) {
            console.warn(`Database lookup for template "${templateId}" failed or not found. Falling back to constants.`);
            // Continue to fallback
        }

        // Fallback to RESUMES constant if database lookup fails
        const template = RESUMES.find(r => r.id === templateId);
        if (template && template.html) {
            templateCache.set(templateId, template.html);
            console.log("Template from fallback constants")
            return template.html;
        }

        throw new Error(`Template with ID "${templateId}" not found in database or fallback constants`);
    }

    /**
     * Generate HTML - Fetch from DB and return raw HTML (CSR)
     * The actual data injection happens in Puppeteer via window.hydrate
     */
    public async generateHTML(resumeData: ResumeData, sectionLabels?: Record<string, string>): Promise<string> {
        const templateId = resumeData.templateId;
        if (!templateId) {
            // If no template ID, use default from constants
            return RESUMES[0].html;
        }
        return this.getTemplateById(templateId);
    }
}
