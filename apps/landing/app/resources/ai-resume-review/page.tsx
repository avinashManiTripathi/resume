import { Metadata } from 'next';
import { Bot, Zap, Target, ShieldCheck, Search, Lightbulb } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'AI Resume Review - Instant Professional Feedback',
    description: 'Get an instant AI resume review. Our AI-powered tool analyzes your resume for ATS compatibility, keyword density, and professional impact.',
    keywords: 'ai resume review, automated resume feedback, resume analysis, ats review',
};

export default function AIResumeReviewPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="AI Powered"
                badgeIcon={Bot}
                title={
                    <>
                        Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Resume Review</span>
                    </>
                }
                subtitle="Get professional feedback on your resume in seconds using our advanced AI analysis tool. Land more interviews with data-backed improvements."
            />

            <ResourceFeatureGrid
                title="How Our AI Reviews Your Resume"
                features={[
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "ATS Compatibility",
                        description: "We scan your resume using the same algorithms companies use to ensure you don't get filtered out."
                    },
                    {
                        icon: <Search className="w-6 h-6" />,
                        title: "Keyword Analysis",
                        description: "Our AI identifies missing industry keywords that recruiters are searching for in your niche."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Impact Scoring",
                        description: "Get a quantitative score on your resume's strength based on action verbs and quantifiable results."
                    }
                ]}
            />

            <ResourceContentSection
                title="The Power of AI in Modern Hiring"
                content={
                    <div className="space-y-6">
                        <p>
                            In today's competitive job market, over 75% of resumes are filtered out by Applicant Tracking Systems (ATS) before they ever reach a human recruiter. An <strong>AI Resume Review</strong> is no longer just a luxury—it's a critical step in your job search strategy.
                        </p>
                        <p>
                            Our AI-powered review tool simulates the hiring process, giving you an "unfair advantage." It looks for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Formatting issues that confuse scanners</li>
                            <li>Optimal keyword density for your target role</li>
                            <li>The balance between hard skills and soft skills</li>
                            <li>Quantifiable achievements that prove your value</li>
                        </ul>
                    </div>
                }
            />

            <ResourceCTA
                title="Ready for a Better Resume?"
                subtitle="Join thousands of professionals who used our AI tools to land interviews at top companies."
            />
        </div>
    );
}
