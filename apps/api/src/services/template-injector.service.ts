import { ResumeData, PersonalInfo, Experience, Education, Skill } from '../types/resume.types';
import { RESUMES } from '../constant';
import { JSDOM } from 'jsdom';

export class TemplateInjectorService {
    /**
     * Get template HTML by ID
     */
    private getTemplateById(templateId: string): string {
        const template = RESUMES.find(r => r.id === templateId);
        if (!template) {
            throw new Error(`Template with ID "${templateId}" not found`);
        }
        if (!template.html || template.html.trim() === '') {
            throw new Error(`Template with ID "${templateId}" has no HTML content`);
        }
        return template.html;
    }

    /**
     * Replace simple placeholders like {{firstName}}
     */
    private replacePlaceholders(html: string, data: Record<string, any>): string {
        let result = html;

        Object.keys(data).forEach(key => {
            const value = data[key] || '';
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(placeholder, String(value));
        });

        return result;
    }

    /**
     * Inject personal information
     */
    private injectPersonalInfo(dom: JSDOM, personalInfo?: PersonalInfo): void {
        if (!personalInfo) return;

        const document = dom.window.document;

        // Replace text content in elements
        const fullName = document.getElementById('full-name');
        if (fullName) fullName.textContent = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim();

        const jobTitle = document.getElementById('job-title');
        if (jobTitle) jobTitle.textContent = personalInfo.jobTitle || '';

        const email = document.getElementById('email');
        if (email) email.textContent = personalInfo.email || '';

        const phone = document.getElementById('phone');
        if (phone) phone.textContent = personalInfo.phone || '';

        // Handle summary
        if (personalInfo.summary && personalInfo.summary.trim()) {
            const summaryText = document.getElementById('summary-text');
            if (summaryText) summaryText.innerHTML = personalInfo.summary;

            const summarySection = document.getElementById('section-summary');
            if (summarySection) summarySection.style.display = 'block';
        }
    }

    /**
     * Inject experience items by cloning template
     */
    private injectExperience(dom: JSDOM, experiences?: Experience[]): void {
        if (!experiences || experiences.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="experience"]') as HTMLElement;
        const container = document.getElementById('experience-list');

        if (!template || !container) return;

        experiences.forEach(exp => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            // Replace values in cloned template
            const jobTitleEl = clone.querySelector('.exp-job-title');
            if (jobTitleEl) jobTitleEl.textContent = exp.jobTitle || '';

            const companyEl = clone.querySelector('.exp-company');
            if (companyEl) companyEl.textContent = exp.company || '';

            const startDateEl = clone.querySelector('.exp-start-date');
            if (startDateEl) startDateEl.textContent = exp.startDate || '';

            const endDateEl = clone.querySelector('.exp-end-date');
            if (endDateEl) endDateEl.textContent = exp.endDate || 'Present';

            const descriptionEl = clone.querySelector('.exp-description');
            if (descriptionEl) descriptionEl.innerHTML = exp.description || '';

            container.appendChild(clone);
        });

        // Show section
        const section = document.getElementById('section-experience');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject education items by cloning template
     */
    private injectEducation(dom: JSDOM, education?: Education[]): void {
        if (!education || education.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="education"]') as HTMLElement;
        const container = document.getElementById('education-list');

        if (!template || !container) return;

        education.forEach(edu => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            // Replace values in cloned template
            const degreeEl = clone.querySelector('.edu-degree');
            if (degreeEl) degreeEl.textContent = edu.degree || '';

            const institutionEl = clone.querySelector('.edu-institution');
            if (institutionEl) institutionEl.textContent = edu.institution || '';

            const startDateEl = clone.querySelector('.edu-start-date');
            if (startDateEl) startDateEl.textContent = edu.startDate || '';

            const endDateEl = clone.querySelector('.edu-end-date');
            if (endDateEl) endDateEl.textContent = edu.endDate || '';

            const descriptionEl = clone.querySelector('.edu-description');
            if (descriptionEl) descriptionEl.innerHTML = edu.description || '';

            container.appendChild(clone);
        });

        // Show section
        const section = document.getElementById('section-education');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject projects items by cloning template
     */
    private injectProjects(dom: JSDOM, projects?: any[]): void {
        if (!projects || projects.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="projects"]') as HTMLElement;
        const container = document.getElementById('projects-list');

        if (!template || !container) return;

        projects.forEach(proj => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            // Replace values in cloned template
            const nameEl = clone.querySelector('.proj-name');
            if (nameEl) nameEl.textContent = proj.name || '';

            const companyEl = clone.querySelector('.proj-company');
            if (companyEl) companyEl.textContent = proj.companyName || '';

            const startDateEl = clone.querySelector('.proj-start-date');
            if (startDateEl) startDateEl.textContent = proj.startDate || '';

            const endDateEl = clone.querySelector('.proj-end-date');
            if (endDateEl) endDateEl.textContent = proj.endDate || 'Present';

            const descriptionEl = clone.querySelector('.proj-description');
            if (descriptionEl) descriptionEl.innerHTML = proj.description || '';

            container.appendChild(clone);
        });

        // Show section
        const section = document.getElementById('section-projects');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject skills items by cloning template
     */
    private injectSkills(dom: JSDOM, skills?: Skill[]): void {
        if (!skills || skills.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="skills"]') as HTMLElement;
        const container = document.getElementById('skills-list');

        if (!template || !container) return;

        skills.forEach(skill => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'flex';

            // Replace values in cloned template
            const nameEl = clone.querySelector('.skill-name');
            if (nameEl) nameEl.textContent = skill.name || '';

            const levelEl = clone.querySelector('.skill-level');
            if (levelEl) levelEl.textContent = skill.level || '';

            container.appendChild(clone);
        });

        // Show section
        const section = document.getElementById('section-skills');
        if (section) section.style.display = 'block';
    }

    /**
     * Main method to generate HTML from template and data
     */
    public generateHTML(data: ResumeData): string {
        // Get template ID, default to first template if not provided
        const templateId = data.templateId || RESUMES[0].id;

        // Get base template
        let html = this.getTemplateById(templateId);

        // Create JSDOM instance for DOM manipulation
        const dom = new JSDOM(html);

        // Inject personal information
        this.injectPersonalInfo(dom, data.personalInfo);

        // Inject array-based sections by cloning templates
        this.injectExperience(dom, data.experience);
        this.injectEducation(dom, data.education);
        this.injectProjects(dom, data.projects);
        this.injectSkills(dom, data.skills);

        // Return the modified HTML
        return dom.serialize();
    }
}
