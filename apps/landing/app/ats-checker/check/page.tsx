import type { Metadata } from "next";
import { ATSCheckerCheckContent } from "./ATSCheckerCheckContent";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { ArticleSchema } from "@/components/ArticleSchema";
import { GlobalSchema } from "@/components/SchemaMarkup";
import { ENV } from "@/app/env";
import { Suspense } from "react";


const baseUrl = ENV.BASE_URL;

export const metadata: Metadata = {
    title: "Free ATS Resume Checker | Test Your Resume for ATS Compatibility | Hirecta",
    description: "Upload your resume and get instant AI-powered feedback on ATS compatibility, formatting, keywords, and optimization suggestions. Improve your chances of getting past Applicant Tracking Systems.",
    alternates: {
        canonical: "/ats-checker/check",
    },
    openGraph: {
        title: "Free ATS Resume Checker - Test Your Resume Instantly",
        description: "Upload your resume and get instant AI-powered feedback on ATS compatibility. Free AI analysis to help you pass Applicant Tracking Systems.",
        url: "/ats-checker/check",
        images: ["/og-image.png"],
    },
};

export default function ATSCheckerCheckPage() {
    const breadcrumbs = [
        { name: "Home", url: "/" },
        { name: "ATS Checker", url: "/ats-checker" },
        { name: "Check", url: "/ats-checker/check" }
    ];

    const faqs = [
        {
            question: "What is an ATS resume checker?",
            answer: "An ATS resume checker is a tool that analyzes your resume to determine how well it will perform in Applicant Tracking Systems (ATS). It checks for formatting issues, keyword optimization, and overall compatibility with ATS software used by employers."
        },
        {
            question: "How does the ATS checker work?",
            answer: "Upload your resume (PDF or DOCX) and our AI-powered tool analyzes it for ATS compatibility. You'll get an instant score, detailed feedback on strengths and weaknesses, keyword analysis, and actionable suggestions to improve your resume."
        },
        {
            question: "Is the ATS checker really free?",
            answer: "Yes! Our ATS resume checker is completely free to use. Upload your resume and get comprehensive analysis with no hidden costs or credit card required."
        },
        {
            question: "What file formats are supported?",
            answer: "We support PDF (.pdf) and Microsoft Word (.docx) file formats. These are the most common resume formats and are widely accepted by ATS systems."
        }
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Free ATS Resume Checker"
                description="Upload your resume and get instant AI-powered feedback on ATS compatibility, formatting, keywords, and optimization suggestions."
                url={`${baseUrl}/ats-checker/check`}
            />
            <GlobalSchema />
            <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
                <ATSCheckerCheckContent />
            </Suspense>
        </>
    );
}
