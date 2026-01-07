import { ResourceHero } from '@/components/ResourcePage'
import { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { ArticleSchema } from '@/components/ArticleSchema'
import { FAQSchema } from '@/components/FAQSchema'
import { BREADCRUMBS } from '@/constants/breadcrumbs'
import KeywordGeneratorClient from "./KeywordGeneratorClient";

export const metadata: Metadata = {
    title: "Free Resume Keyword Generator 2026 - Extract ATS Keywords from Job Descriptions",
    description: "Free AI-powered resume keyword generator. Extract critical skills and keywords from any job description in seconds. Optimize your resume for ATS and beat the 75% rejection rate. Instant results.",
    keywords: "resume keyword generator, ats optimization, job description analyzer, resume keywords, resume skills extraction, ats keywords, keyword optimization tool, resume scanner, ats checker",
    openGraph: {
        title: "Free Resume Keyword Generator | Beat ATS Systems",
        description: "Extract the most important keywords from job descriptions to optimize your resume for ATS. Free tool with instant results.",
        type: "website",
    }
};

export default function ResumeKeywordGeneratorPage() {
    const faqs = [
        { question: "How do I find the right keywords?", answer: "Analyze the job description for frequently mentioned skills, tools, and qualifications. Our tool automatically extracts relevant keywords." },
        { question: "How many keywords should I include?", answer: "Include 10-15 highly relevant keywords naturally throughout your resume, avoiding keyword stuffing." },
        { question: "Where should keywords be placed?", answer: "Skills section, job titles, bullet points, and summary. Place most important keywords near the top of your resume." },
        { question: "Do keywords really matter for ATS?", answer: "Yes, 75% of resumes are filtered by ATS based on keyword matching. Proper keywords are essential for getting past initial screening." },
        { question: "Can I use synonyms?", answer: "Yes, include both industry-standard terms and common synonyms to match various ATS configurations and recruiter searches." }
    ];

    return (
        <div>
            <BreadcrumbSchema items={BREADCRUMBS['resume-keyword-generator']} />
            <ArticleSchema
                title="Resume Keyword Generator - ATS Optimization Tool"
                description="Generate optimized keywords for your resume based on job descriptions. Improve ATS compatibility and recruiter visibility."
                url="https://profresume.com/resources/resume-keyword-generator"
            />
            <FAQSchema faqs={faqs} />
            <KeywordGeneratorClient />
        </div>
    );
}
