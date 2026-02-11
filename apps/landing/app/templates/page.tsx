import { Metadata } from 'next';
import { ENV } from "@/app/env";

import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';
import TemplatesPageClient from './TemplatesClient';

export const metadata: Metadata = {
    title: 'Professional Resume Templates 2026 - Free ATS-Friendly Designs | Hirecta',
    description: 'Browse 50+ professional resume templates designed by experts. All templates are ATS-friendly, customizable, and free to use. Choose from modern, creative, and classic designs.',
    keywords: 'resume templates, CV templates, professional resume, ATS resume templates, free resume templates, modern resume, creative resume, resume design',
    alternates: {
        canonical: "/templates",
    },
    openGraph: {
        title: 'Professional Resume Templates - Free ATS-Friendly Designs',
        description: 'Browse 50+ professional resume templates. ATS-friendly, customizable, and free. Build your resume for free with our <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>.',
        url: "/templates",
        type: 'website',
        images: [{
            url: "/og-templates.jpg",
            width: 1200,
            height: 630,
            alt: 'Professional Resume Templates',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Professional Resume Templates - Free ATS-Friendly Designs',
        description: 'Browse 50+ professional resume templates. ATS-friendly and customizable.',
        images: ["/og-templates.jpg"],
    },
};

export default function TemplatesPage() {
    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Templates", url: `${ENV.BASE_URL}/templates` }
    ];

    const faqs = [
        {
            question: "Are all resume templates free to use?",
            answer: "Yes! All our resume templates are completely free to use. You can customize any template, download as PDF, and use it for your job applications without any cost. We believe that professional career tools should be accessible to everyone, regardless of their budget."
        },
        {
            question: "How do I know if a template is truly ATS-friendly?",
            answer: "A truly ATS-friendly template, like those at Hirecta, avoids complex graphical elements like text boxes, tables, and images for text. We use a flat Unicode-compliant structure that ensures every character is readable by the parsing engines used by Workday, Greenhouse, and Lever. You can verify any of our templates with our <Link href='/ats-checker' className='text-blue-600 hover:underline'>Free ATS Checker</Link>."
        },
        {
            question: "Can I customize the templates for specific industries?",
            answer: "Absolutely! While the base layout is fixed for ATS compatibility, you can fully customize the content, color accents, and section order. We provide specific templates for Tech, Finance, Healthcare, and Creative industries to ensure you meet the 'visual expectations' of human recruiters in your specific niche."
        },
        {
            question: "What's the best template for a career changer?",
            answer: "For career changers, we recommend our 'Modern' or 'Professional' templates that allow for a strong 'Professional Summary' and 'Key Skills' section at the top. This helps you reframe your transferable skills before the recruiter looks at your chronological work history."
        },
        {
            question: "Do these templates work for international job markets?",
            answer: "Yes. Our templates follow international standards. Whether you need a 1-page resume for the US market or a multi-page CV for the UK or EU, our editor allows you to adjust margins and page breaks to suit regional requirements perfectly."
        },
        {
            question: "How often should I update my template choice?",
            answer: "We recommend reviewing your template choice every 1-2 years or when applying for a significantly different level of seniority. As you move from Junior to Senior roles, your resume needs more space for 'Accomplishments' over 'Education', and our templates are designed to scale with your career."
        }
    ];

    return (
        <>
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Professional Resume Templates 2026: The Ultimate Guide"
                description="Discover the best ATS-friendly resume templates for 2026. Browse our library of professional, modern, and creative designs to land your next job."
                url={`${ENV.BASE_URL}/templates`}
                datePublished="2025-02-11"
                author="Hirecta Career Experts"
            />
            <TemplatesPageClient />
        </>
    );
}
