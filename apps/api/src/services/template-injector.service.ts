import { ResumeData, PersonalInfo, Experience, Education, Skill } from '../types/resume.types';
import { RESUMES } from '../constant';
import { JSDOM } from 'jsdom';

export class TemplateInjectorService {
    /**
     * Get template HTML by ID (fetch from database)
     */
    private async getTemplateById(templateId: string): Promise<string> {
        try {
            // Import Template model
            const { Template } = await import('../models');

            // Try to find template in database by _id or id
            const template = await Template.findById(templateId);

            if (!template) {
                throw new Error(`Template with ID "${templateId}" not found`);
            }

            const htmlContent = template.htmlContent || '';
            if (!htmlContent || htmlContent.trim() === '') {
                throw new Error(`Template with ID "${templateId}" has no HTML content`);
            }

            return htmlContent;
        } catch (error) {
            // Fallback to RESUMES constant if database lookup fails
            console.warn(`Database template lookup failed, falling back to RESUMES constant:`, error);
            const template = RESUMES.find(r => r.id === templateId);
            if (!template) {
                throw new Error(`Template with ID "${templateId}" not found`);
            }
            if (!template.html || template.html.trim() === '') {
                throw new Error(`Template with ID "${templateId}" has no HTML content`);
            }
            return template.html;
        }
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

        const address = document.getElementById("address");
        if (address) address.textContent = `${personalInfo.city || ''}, ${personalInfo.state || ''}, ${personalInfo.pincode || ''}, ${personalInfo.country || ''}`;

        // Handle LinkedIn link
        const linkedinLink = document.getElementById('linkedin-link');
        if (linkedinLink) {
            if (personalInfo.linkedin) {
                linkedinLink.setAttribute('href', personalInfo.linkedin);
                linkedinLink.textContent = "Linkedin"
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
                githubLink.textContent = "Github"
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
        } else {
            const profileImg = document.getElementById('profile-image');
            if (profileImg) profileImg.style.display = 'none';
        }

        // Handle summary
        const summarySection = document.getElementById('section-summary');
        if (personalInfo.summary && personalInfo.summary.trim() && personalInfo.summary.trim() !== '<br>') {
            const summaryText = document.getElementById('summary-text');
            if (summaryText) summaryText.textContent = personalInfo.summary;

            if (summarySection) summarySection.style.display = 'block';
        } else {
            // Explicitly hide summary section if empty
            if (summarySection) summarySection.style.display = 'none';
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
     * Inject languages items by cloning template
     */
    private injectLanguages(dom: JSDOM, languages?: any[]): void {
        if (!languages || languages.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="languages"]') as HTMLElement;
        const container = document.getElementById('languages-list');

        if (!template || !container) return;

        languages.forEach(lang => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const nameEl = clone.querySelector('.lang-name');
            if (nameEl) nameEl.textContent = lang.language || lang.name || '';

            const proficiencyEl = clone.querySelector('.lang-proficiency');
            if (proficiencyEl) proficiencyEl.textContent = lang.proficiency || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-languages');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject certifications items by cloning template
     */
    private injectCertifications(dom: JSDOM, certifications?: any[]): void {
        if (!certifications || certifications.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="certifications"]') as HTMLElement;
        const container = document.getElementById('certifications-list');

        if (!template || !container) return;

        certifications.forEach(cert => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const nameEl = clone.querySelector('.cert-name');
            if (nameEl) nameEl.textContent = cert.name || '';

            const issuerEl = clone.querySelector('.cert-issuer');
            if (issuerEl) issuerEl.textContent = cert.issuer || '';

            const dateEl = clone.querySelector('.cert-date');
            if (dateEl) dateEl.textContent = cert.date || '';

            const credentialEl = clone.querySelector('.cert-credential-id');
            if (credentialEl && cert.credentialId) {
                credentialEl.textContent = `Credential ID: ${cert.credentialId}`;
                (credentialEl as HTMLElement).style.display = 'block';
            }

            container.appendChild(clone);
        });

        const section = document.getElementById('section-certifications');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject awards items by cloning template
     */
    private injectAwards(dom: JSDOM, awards?: any[]): void {
        if (!awards || awards.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="awards"]') as HTMLElement;
        const container = document.getElementById('awards-list');

        if (!template || !container) return;

        awards.forEach(award => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const titleEl = clone.querySelector('.award-title');
            if (titleEl) titleEl.textContent = award.title || '';

            const issuerEl = clone.querySelector('.award-issuer');
            if (issuerEl) issuerEl.textContent = award.issuer || '';

            const dateEl = clone.querySelector('.award-date');
            if (dateEl) dateEl.textContent = award.date || '';

            const descriptionEl = clone.querySelector('.award-description');
            if (descriptionEl) descriptionEl.textContent = award.description || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-awards');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject achievements items by cloning template
     */
    private injectAchievements(dom: JSDOM, achievements?: any[]): void {
        if (!achievements || achievements.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="achievements"]') as HTMLElement;
        const container = document.getElementById('achievements-list');

        if (!template || !container) return;

        achievements.forEach(achievement => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const titleEl = clone.querySelector('.achievement-title');
            if (titleEl) titleEl.textContent = achievement.title || '';

            const dateEl = clone.querySelector('.achievement-date');
            if (dateEl) dateEl.textContent = achievement.date || '';

            const descriptionEl = clone.querySelector('.achievement-description');
            if (descriptionEl) descriptionEl.textContent = achievement.description || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-achievements');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject publications items by cloning template
     */
    private injectPublications(dom: JSDOM, publications?: any[]): void {
        if (!publications || publications.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="publications"]') as HTMLElement;
        const container = document.getElementById('publications-list');

        if (!template || !container) return;

        publications.forEach(pub => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const titleEl = clone.querySelector('.pub-title');
            if (titleEl) titleEl.textContent = pub.title || '';

            const publisherEl = clone.querySelector('.pub-publisher');
            if (publisherEl) publisherEl.textContent = pub.publisher || '';

            const dateEl = clone.querySelector('.pub-date');
            if (dateEl) dateEl.textContent = pub.date || '';

            const descriptionEl = clone.querySelector('.pub-description');
            if (descriptionEl) descriptionEl.textContent = pub.description || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-publications');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject volunteer experience items by cloning template
     */
    private injectVolunteer(dom: JSDOM, volunteer?: any[]): void {
        if (!volunteer || volunteer.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="volunteer"]') as HTMLElement;
        const container = document.getElementById('volunteer-list');

        if (!template || !container) return;

        volunteer.forEach(vol => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const roleEl = clone.querySelector('.vol-role');
            if (roleEl) roleEl.textContent = vol.role || '';

            const organizationEl = clone.querySelector('.vol-organization');
            if (organizationEl) organizationEl.textContent = vol.organization || '';

            const startDateEl = clone.querySelector('.vol-start-date');
            if (startDateEl) startDateEl.textContent = vol.startDate || '';

            const endDateEl = clone.querySelector('.vol-end-date');
            if (endDateEl) endDateEl.textContent = vol.endDate || 'Present';

            const descriptionEl = clone.querySelector('.vol-description');
            if (descriptionEl) descriptionEl.textContent = vol.description || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-volunteer');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject interests items by cloning template
     */
    private injectInterests(dom: JSDOM, interests?: any[]): void {
        if (!interests || interests.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="interests"]') as HTMLElement;
        const container = document.getElementById('interests-list');

        if (!template || !container) return;

        interests.forEach(interest => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'inline-block';

            const nameEl = clone.querySelector('.interest-name');
            if (nameEl) nameEl.textContent = interest.name || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-interests');
        if (section) section.style.display = 'block';
    }

    /**
     * Inject references items by cloning template
     */
    private injectReferences(dom: JSDOM, references?: any[]): void {
        if (!references || references.length === 0) return;

        const document = dom.window.document;
        const template = document.querySelector('[data-template="references"]') as HTMLElement;
        const container = document.getElementById('references-list');

        if (!template || !container) return;

        references.forEach(ref => {
            const clone = template.cloneNode(true) as HTMLElement;
            clone.classList.remove('item-template');
            clone.removeAttribute('data-template');
            clone.style.display = 'block';

            const nameEl = clone.querySelector('.ref-name');
            if (nameEl) nameEl.textContent = ref.name || '';

            const jobTitleEl = clone.querySelector('.ref-job-title');
            if (jobTitleEl) jobTitleEl.textContent = ref.jobTitle || '';

            const companyEl = clone.querySelector('.ref-company');
            if (companyEl) companyEl.textContent = ref.company || '';

            const emailEl = clone.querySelector('.ref-email');
            if (emailEl) emailEl.textContent = ref.email || '';

            const phoneEl = clone.querySelector('.ref-phone');
            if (phoneEl) phoneEl.textContent = ref.phone || '';

            container.appendChild(clone);
        });

        const section = document.getElementById('section-references');
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
    public async generateHTML(data: ResumeData, sectionLabels?: Record<string, string>): Promise<string> {
        // Get template ID, default to first template if not provided
        const templateId = data.templateId || RESUMES[0].id;

        // Get base template from database
        let html = await this.getTemplateById(templateId);

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
                case 'languages':
                    this.injectLanguages(dom, data.languages);
                    currentSection = document.getElementById('section-languages');
                    break;
                case 'certifications':
                    this.injectCertifications(dom, data.certifications);
                    currentSection = document.getElementById('section-certifications');
                    break;
                case 'awards':
                    this.injectAwards(dom, data.awards);
                    currentSection = document.getElementById('section-awards');
                    break;
                case 'achievements':
                    this.injectAchievements(dom, data.achievements);
                    currentSection = document.getElementById('section-achievements');
                    break;
                case 'publications':
                    this.injectPublications(dom, data.publications);
                    currentSection = document.getElementById('section-publications');
                    break;
                case 'volunteer':
                    this.injectVolunteer(dom, data.volunteer);
                    currentSection = document.getElementById('section-volunteer');
                    break;
                case 'interests':
                    this.injectInterests(dom, data.interests);
                    currentSection = document.getElementById('section-interests');
                    break;
                case 'references':
                    this.injectReferences(dom, data.references);
                    currentSection = document.getElementById('section-references');
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
