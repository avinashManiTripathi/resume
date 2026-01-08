import { Metadata } from 'next';

import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import TemplatesPageClient from './TemplatesClient';

export const metadata: Metadata = {
    title: 'Professional Resume Templates 2026 - Free ATS-Friendly Designs | ProfResume',
    description: 'Browse 50+ professional resume templates designed by experts. All templates are ATS-friendly, customizable, and free to use. Choose from modern, creative, and classic designs.',
    keywords: 'resume templates, CV templates, professional resume, ATS resume templates, free resume templates, modern resume, creative resume, resume design',
    alternates: {
        canonical: 'https://profresume.com/templates',
    },
    openGraph: {
        title: 'Professional Resume Templates - Free ATS-Friendly Designs',
        description: 'Browse 50+ professional resume templates. ATS-friendly, customizable, and free.',
        url: 'https://profresume.com/templates',
        type: 'website',
        images: [{
            url: 'https://profresume.com/og-templates.jpg',
            width: 1200,
            height: 630,
            alt: 'Professional Resume Templates',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Professional Resume Templates - Free ATS-Friendly Designs',
        description: 'Browse 50+ professional resume templates. ATS-friendly and customizable.',
        images: ['https://profresume.com/og-templates.jpg'],
    },
};

export default function TemplatesPage() {
    const breadcrumbs = [
        { name: "Home", url: "https://profresume.com" },
        { name: "Templates", url: "https://profresume.com/templates" }
    ];

    const faqs = [
        {
            question: "Are all resume templates free to use?",
            answer: "Yes! All our resume templates are completely free to use. You can customize any template, download as PDF, and use it for your job applications without any cost."
        },
        {
            question: "Are these templates ATS-friendly?",
            answer: "Absolutely! Every template is designed to pass Applicant Tracking Systems (ATS). We use clean formatting, standard fonts, and proper structure to ensure your resume gets through automated screening."
        },
        {
            question: "Can I customize the templates?",
            answer: "Yes! All templates are fully customizable. You can change colors, fonts, sections, and layout to match your personal brand and job requirements."
        },
        {
            question: "What's the difference between template categories?",
            answer: "Professional templates are clean and traditional, Creative templates use modern design elements, Modern templates balance both styles, and Classic templates follow traditional resume formats preferred by conservative industries."
        },
        {
            question: "How do I use a template?",
            answer: "Simply click on any template to start customizing it. You'll be taken to our editor where you can fill in your information, adjust the design, and download your completed resume as PDF."
        }
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <TemplatesPageClient />
        </>
    );
}
