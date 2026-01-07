import { Metadata } from 'next';
import { Search, Eye, MessageSquare, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Resume Critique - Detailed Resume Analysis & Feedback',
    description: 'Get a comprehensive resume critique today. Understand your resume strengths and weaknesses with our professional analysis framework.',
    keywords: 'resume critique, resume feedback, professional resume analysis, resume review guide',
};

export default function ResumeCritiquePage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Deep Analysis"
                badgeIcon={Search}
                title={
                    <>
                        Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Resume Critique</span>
                    </>
                }
                subtitle="Get a second pair of eyes on your career documents. Our critique framework identifies structural flaws and opportunities for growth."
            />

            <ResourceFeatureGrid
                title="Our Critique Framework"
                features={[
                    {
                        icon: <Eye className="w-6 h-6" />,
                        title: "Visual First Impression",
                        description: "We analyze the white space, hierarchy, and overall aesthetic readability of your document."
                    },
                    {
                        icon: <MessageSquare className="w-6 h-6" />,
                        title: "Narrative Tone",
                        description: "Is your professional voice consistent and authoritative? We critique the messaging."
                    },
                    {
                        icon: <AlertTriangle className="w-6 h-6" />,
                        title: "Red Flag Detection",
                        description: "Identifying employment gaps, irrelevant data, or confusing timelines that worry recruiters."
                    }
                ]}
            />

            <ResourceContentSection
                title="The Importance of Objective Feedback"
                content={
                    <div className="space-y-6">
                        <p>
                            It's hard to be objective about your own career. A <strong>Professional Resume Critique</strong> provides the unbiased perspective you need to spot your own blind spots.
                        </p>
                        <p>
                            What a thorough critique looks for:
                        </p>
                        <blockquote className="border-l-4 border-purple-200 pl-4 py-2 italic text-gray-700">
                            "Is the most important information visible in the top third of the page? Does the reader know exactly what role you are qualified for within 3 seconds?"
                        </blockquote>
                        <p>
                            Effective resume feedback shouldn't just point out mistakes; it should provide actionable solutions. Every critique should lead to a measurable improvement in your interview rate.
                        </p>
                    </div>
                }
            />

            <ResourceCTA
                title="Stop Guessing, Start Improving"
                subtitle="Use our tools to perform your own self-critique or build a professional resume from scratch."
            />
        </div>
    );
}
