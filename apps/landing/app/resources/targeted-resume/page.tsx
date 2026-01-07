import { Metadata } from 'next';
import { Target, Crosshair, Search, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Targeted Resume - Tailor Your Resume for Every Job',
    description: 'Learn how to create a targeted resume that matches the job description perfectly. Increase your interview rate with a customized professional profile.',
    keywords: 'targeted resume, tailored resume, resume customization, matching job description',
};

export default function TargetedResumePage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Strategy Guide"
                badgeIcon={Target}
                title={
                    <>
                        Land More Interviews with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Targeted Resume</span>
                    </>
                }
                subtitle="Stop sending the same resume to every job. Learn the art of strategic tailoring to match every employer's unique requirements."
            />

            <ResourceFeatureGrid
                title="The Benefits of Targeting"
                features={[
                    {
                        icon: <Crosshair className="w-6 h-6" />,
                        title: "Precision Matching",
                        description: "Align your skills directly with the top requirements listed in the job description."
                    },
                    {
                        icon: <Search className="w-6 h-6" />,
                        title: "Higher Relevance",
                        description: "Recruiters see exactly what they're looking for within the first few seconds of reading."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "Better ATS Score",
                        description: "Targeted resumes naturally include the keywords that automated systems are programmed to find."
                    }
                ]}
            />

            <ResourceContentSection
                title="How to Target Your Resume Effortlessly"
                content={
                    <div className="space-y-6">
                        <p>
                            A <strong>Targeted Resume</strong> is custom-built for one specific job application. While it takes more time, the results are exponentially better.
                        </p>
                        <p>
                            Follow these three steps for effective targeting:
                        </p>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                                    Analyze the Job Description
                                </h4>
                                <p className="text-sm">Highlight the top 5 skills and requirements the employer emphasizes.</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                                    Map Your Experience
                                </h4>
                                <p className="text-sm">Find where your previous accomplishments overlap with those 5 key areas.</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
                                    Refine Your Language
                                </h4>
                                <p className="text-sm">Use the employer's own terminology to describe your relevant wins.</p>
                            </div>
                        </div>
                    </div>
                }
            />

            <ResourceCTA
                title="Start Targeting Your Resume"
                subtitle="Use our editor to create multiple versions of your resume tailored to your dream jobs."
            />
        </div>
    );
}
