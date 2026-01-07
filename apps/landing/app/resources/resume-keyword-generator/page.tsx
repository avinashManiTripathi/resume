import { Metadata } from "next";
import KeywordGeneratorClient from "./KeywordGeneratorClient";

export const metadata: Metadata = {
    title: "Resume Keyword Generator - Optimize Your Resume for ATS",
    description: "Use our free Resume Keyword Generator to extract critical skills and keywords from any job description. Beat the ATS and land more interviews today.",
    keywords: "resume keyword generator, ats optimization, job description analyzer, resume keywords, resume skills extraction",
    openGraph: {
        title: "Free Resume Keyword Generator | Professional Resume Builder",
        description: "Beat the ATS by identifying the most important keywords in any job description.",
        type: "website",
    }
};

export default function ResumeKeywordGeneratorPage() {
    return <KeywordGeneratorClient />;
}
