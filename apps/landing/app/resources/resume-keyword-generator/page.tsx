import { Metadata } from "next";
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
    return <KeywordGeneratorClient />;
}
