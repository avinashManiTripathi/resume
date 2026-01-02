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

        // Handle LinkedIn link
        const linkedinLink = document.getElementById('linkedin-link');
        if (linkedinLink) {
            if (personalInfo.linkedin) {
                linkedinLink.setAttribute('href', personalInfo.linkedin);
                linkedinLink.textContent = personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '');
                linkedinLink.style.display = '';
            } else {
                linkedinLink.style.display = 'none';
            }
        }

        // Handle GitHub link
        const githubLink = document.getElementById('github-link');
        if (githubLink) {
            if (personalInfo.github) {
                githubLink.setAttribute('href', personalInfo.github);
                githubLink.textContent = personalInfo.github.replace(/^https?:\/\/(www\.)?/, '');
                githubLink.style.display = '';
            } else {
                githubLink.style.display = 'none';
            }
        }

        // Handle profile image
        if (personalInfo.profileImage) {
            const profileImg = document.getElementById('profile-image');
            if (profileImg && profileImg.tagName === 'IMG') {
                (profileImg as HTMLImageElement).src = personalInfo.profileImage;
            }
        }

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
     * Create a custom section container dynamically
     */
    private createCustomSectionContainer(document: Document, section: any): HTMLElement {
        const sectionEl = document.createElement('section');
        sectionEl.id = `section-${section.id}`;
        sectionEl.className = 'mb-6';
        sectionEl.style.display = 'none';

        // Create title
        const title = document.createElement('h2');
        title.className = 'text-lg font-serif font-bold border-b border-gray-400 pb-1';
        title.textContent = section.label;
        sectionEl.appendChild(title);

        // Create items container
        const itemsList = document.createElement('div');
        itemsList.id = `${section.id}-list`;
        sectionEl.appendChild(itemsList);

        // Create item template
        const itemTemplate = this.createCustomItemTemplate(document, section);
        sectionEl.appendChild(itemTemplate);

        return sectionEl;
    }

    /**
     * Create item template for custom section
     */
    private createCustomItemTemplate(document: Document, section: any): HTMLElement {
        const template = document.createElement('div');
        template.className = `${section.id}-item item-template mt-4`;
        template.setAttribute('data-template', section.id);

        // Create fields based on field definitions
        if (section.fieldDefinitions) {
            Object.entries(section.fieldDefinitions).forEach(([fieldKey, fieldDef]: [string, any]) => {
                const fieldEl = document.createElement(fieldDef.type === 'richtext' ? 'div' : 'p');
                fieldEl.className = `${section.id}-${fieldKey} text-sm`;

                if (fieldDef.type !== 'richtext') {
                    const label = document.createElement('span');
                    label.className = 'font-bold';
                    label.textContent = `${fieldDef.label}: `;
                    fieldEl.appendChild(label);

                    const valueSpan = document.createElement('span');
                    valueSpan.className = `${section.id}-${fieldKey}-value`;
                    fieldEl.appendChild(valueSpan);
                } else {
                    fieldEl.className = `${section.id}-${fieldKey} text-sm text-gray-700 mt-2`;
                }

                template.appendChild(fieldEl);
            });
        }

        return template;
    }

    /**
     * Inject custom sections by cloning template
     */
    private injectCustomSections(dom: JSDOM, customSections?: any[], insertAfter?: HTMLElement | null): void {
        if (!customSections || customSections.length === 0) return;

        const document = dom.window.document;

        customSections.forEach(section => {
            if (!section.items || section.items.length === 0) return;

            // Find or create custom section container
            let sectionContainer = document.getElementById(`section-${section.id}`);

            if (!sectionContainer) {
                // Create new section dynamically
                sectionContainer = this.createCustomSectionContainer(document, section);
                const resumeRoot = document.getElementById('resume-root') ||
                    document.querySelector('main') ||
                    document.body;

                // Insert in proper position based on order
                if (resumeRoot) {
                    if (insertAfter && insertAfter.parentNode === resumeRoot) {
                        // Insert after the reference element
                        if (insertAfter.nextSibling) {
                            resumeRoot.insertBefore(sectionContainer, insertAfter.nextSibling);
                        } else {
                            resumeRoot.appendChild(sectionContainer);
                        }
                    } else {
                        // No valid reference, append to end
                        resumeRoot.appendChild(sectionContainer);
                    }
                }
            }

            if (!sectionContainer) return;

            sectionContainer.style.display = 'block';

            // Update section title
            const titleElement = sectionContainer.querySelector('h2');
            if (titleElement) {
                titleElement.textContent = section.label;
            }

            // Inject items
            const itemsList = sectionContainer.querySelector(`#${section.id}-list`);
            const itemTemplate = sectionContainer.querySelector(`.${section.id}-item.item-template`) as HTMLElement;

            if (itemsList && itemTemplate && section.items) {
                section.items.forEach((item: any) => {
                    const clone = itemTemplate.cloneNode(true) as HTMLElement;
                    clone.classList.remove('item-template');
                    clone.style.display = 'block';

                    // Inject field values
                    if (item.fields) {
                        Object.entries(item.fields).forEach(([fieldKey, field]: [string, any]) => {
                            const fieldElement = clone.querySelector(`.${section.id}-${fieldKey}`);
                            const valueElement = clone.querySelector(`.${section.id}-${fieldKey}-value`);

                            if (field.type === 'richtext' && fieldElement) {
                                fieldElement.innerHTML = field.value || '';
                            } else if (valueElement) {
                                valueElement.textContent = field.value || '';
                            } else if (fieldElement) {
                                // Fallback: set text content directly
                                fieldElement.textContent = field.value || '';
                            }
                        });
                    }

                    itemsList.appendChild(clone);
                });
            }
        });
    }

    /**
     * Update section labels in the template based on custom user labels
     */
    private updateSectionLabels(dom: JSDOM, sectionLabels?: Record<string, string>): void {
        if (!sectionLabels) return;

        const document = dom.window.document;

        // Map of section IDs to their corresponding section keys
        // Only include sections that are actually implemented in templates
        const labelMap: Record<string, string> = {
            'summary': 'section-summary',
            'experience': 'section-experience',
            'education': 'section-education',
            'skills': 'section-skills',
            'projects': 'section-projects'
            // Note: languages, interests, achievements, certifications, awards, 
            // publications, volunteer, and references are not yet implemented in most templates
        };

        // Update each section's heading
        Object.entries(sectionLabels).forEach(([key, label]) => {
            const sectionId = labelMap[key];

            if (sectionId) {
                // Standard section
                const section = document.getElementById(sectionId);
                if (section) {
                    const heading = section.querySelector('h2');
                    if (heading && label) {
                        heading.textContent = label;
                    }
                }
            } else {
                // Could be a custom section - try section-{key}
                const customSection = document.getElementById(`section-${key}`);
                if (customSection) {
                    const heading = customSection.querySelector('h2');
                    if (heading && label) {
                        heading.textContent = label;
                    }
                }
            }
        });
    }


    /**
     * Main method to generate HTML from template and data
     */
    public generateHTML(data: ResumeData, sectionLabels?: Record<string, string>): string {
        // Get template ID, default to first template if not provided
        const templateId = data.templateId || RESUMES[0].id;

        // Get base template
        let html = this.getTemplateById(templateId);

        // Create JSDOM instance for DOM manipulation
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Inject personal information (always first)
        this.injectPersonalInfo(dom, data.personalInfo);

        // Build complete list of sections to process
        let processOrder = data.order || [];

        // If no order specified, build it from sections with data
        if (!processOrder.length) {
            const sectionsWithData: string[] = [];

            if (data.experience?.length) sectionsWithData.push('experience');
            if (data.education?.length) sectionsWithData.push('education');
            if (data.projects?.length) sectionsWithData.push('projects');
            if (data.skills?.length) sectionsWithData.push('skills');

            // Add custom sections that have data
            if (data.customSections) {
                data.customSections.forEach(cs => {
                    if (cs.items?.length) {
                        sectionsWithData.push(cs.id);
                    }
                });
            }

            processOrder = sectionsWithData;
        } else {
            // Order was specified - add any missing sections with data to the end
            const missingWithData: string[] = [];

            if (data.experience?.length && !processOrder.includes('experience')) {
                missingWithData.push('experience');
            }
            if (data.education?.length && !processOrder.includes('education')) {
                missingWithData.push('education');
            }
            if (data.projects?.length && !processOrder.includes('projects')) {
                missingWithData.push('projects');
            }
            if (data.skills?.length && !processOrder.includes('skills')) {
                missingWithData.push('skills');
            }

            // Add missing custom sections with data
            if (data.customSections) {
                data.customSections.forEach(cs => {
                    if (cs.items?.length && !processOrder.includes(cs.id)) {
                        missingWithData.push(cs.id);
                    }
                });
            }

            processOrder = [...processOrder, ...missingWithData];
        }

        // Track last inserted section for proper ordering
        let lastSection: HTMLElement | null = document.getElementById('section-personalInfo');

        // Inject sections in the specified order
        processOrder.forEach(sectionKey => {
            let currentSection: HTMLElement | null = null;

            switch (sectionKey) {
                case 'experience':
                    this.injectExperience(dom, data.experience);
                    currentSection = document.getElementById('section-experience');
                    break;
                case 'education':
                    this.injectEducation(dom, data.education);
                    currentSection = document.getElementById('section-education');
                    break;
                case 'projects':
                    this.injectProjects(dom, data.projects);
                    currentSection = document.getElementById('section-projects');
                    break;
                case 'skills':
                    this.injectSkills(dom, data.skills);
                    currentSection = document.getElementById('section-skills');
                    break;
                default:
                    // Check if this is a custom section
                    if (data.customSections) {
                        const customSection = data.customSections.find(cs => cs.id === sectionKey);
                        if (customSection && customSection.items?.length) {
                            this.injectCustomSections(dom, [customSection], lastSection);
                            currentSection = document.getElementById(`section-${sectionKey}`);
                        }
                    }
                    break;
            }

            // Update last section if current section was successfully injected
            if (currentSection && currentSection.style.display !== 'none') {
                lastSection = currentSection;
            }
        });

        // Update section labels AFTER all sections are created (including custom ones)
        this.updateSectionLabels(dom, sectionLabels);

        // Return the modified HTML
        return dom.serialize();
    }
}
