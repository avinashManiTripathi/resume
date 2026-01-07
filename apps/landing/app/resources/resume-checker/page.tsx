import { Metadata } from 'next';
import { CheckCircle2, Layout, Smartphone, FileCheck, ShieldCheck, Zap } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Resume Checker - Free Online Resume Scanner',
    description: 'Check your resume for common mistakes, formatting issues, and ATS compatibility with our free online resume checker.',
    keywords: 'resume checker, free resume scanner, online resume review, resume builder checker',
};

export default function ResumeCheckerPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Professional Tool"
                badgeIcon={CheckCircle2}
                title={
                    <>
                        Free Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Resume Checker</span>
                    </>
                }
                subtitle="Instantly catch formatting errors, typos, and ATS issues. Ensure your resume is flawless before you hit send."
            />

            <ResourceFeatureGrid
                title="Why Use a Resume Checker?"
                features={[
                    {
                        icon: <Layout className="w-6 h-6" />,
                        title: "Format Validation",
                        description: "Ensure your layout is machine-readable and standard across all PDF viewers."
                    },
                    {
                        icon: <Smartphone className="w-6 h-6" />,
                        title: "Readability Check",
                        description: "We analyze font sizes, margins, and whitespace to guarantee maximum impact."
                    },
                    {
                        icon: <FileCheck className="w-6 h-6" />,
                        title: "Error Detection",
                        description: "Our tool catches subtle errors that spellcheck might miss, like inconsistent date formats."
                    }
                ]}
            />

            <ResourceContentSection
                title="Don't Let Simple Mistakes Cost You the Job"
                content={
                    <div className="space-y-6">
                        <p>
                            Recruiters spend an average of only 6 seconds looking at a resume. If they spot a typo or a formatting glitch, your application is likely headed for the trash. A <strong>Free Resume Checker</strong> helps you eliminate these risks.
                        </p>
                        <p>
                            A professional resume check covers three main areas:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-white rounded-lg border border-gray-200">
                                <h4 className="font-bold mb-2">Technical Health</h4>
                                <p className="text-sm">Checks for broken links, font compatibility, and PDF structure.</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-gray-200">
                                <h4 className="font-bold mb-2">Content Quality</h4>
                                <p className="text-sm">Analyzes the strength of your summary and work descriptions.</p>
                            </div>
                        </div>
                    </div>
                }
            />

            <ResourceCTA
                title="Is Your Resume Ready?"
                subtitle="Check your resume today and start applying with 100% confidence."
            />
        </div>
    );
}
