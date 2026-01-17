export interface FlatFormData {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
    experience: string;
    customParagraph?: string;
}

export interface StructuredUserData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        jobTitle: string;
    };
    recipientInfo: {
        companyName: string;
        managerName: string;
    };
    content: {
        greeting: string;
        bodyHTML: string;
        closing: string;
        signOff: string;
    };
}

export function mapFormDataToStructured(formData: FlatFormData): StructuredUserData {
    // Split body text into paragraphs based on newlines
    const bodyText = (formData.experience || '') + (formData.customParagraph ? '\n\n' + formData.customParagraph : '');
    const paragraphs = bodyText.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0);

    // Generate HTML for the body
    const bodyHTML = paragraphs.map((p: string) => `<p style="margin-bottom: 1em;">${p}</p>`).join('\n');

    return {
        personalInfo: {
            fullName: formData.fullName || 'Your Name',
            email: formData.email || 'email@example.com',
            phone: formData.phone || 'Phone Number',
            jobTitle: formData.jobTitle || 'Job Title',
        },
        recipientInfo: {
            companyName: formData.companyName || 'Company Name',
            managerName: 'Hiring Manager',
        },
        content: {
            greeting: `Dear Hiring Manager,`,
            bodyHTML: bodyHTML || '<p>Your professional experience will appear here...</p>',
            closing: `Thank you for your time and consideration. I look forward to the possibility of discussing how my experience and skills can contribute to your team.`,
            signOff: `Sincerely,\n${formData.fullName || 'Your Name'}`
        }
    };
}
