import { Metadata } from 'next';
import { Wrench, ShieldAlert, CheckCircle2, Zap, FileWarning, Lightbulb } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Resume Fixer - Resolve Common Resume Issues Instantly',
    description: 'Fix your resume with our professional resume fixer. Resolve formatting errors, gaps in employment, and weak descriptions effectively.',
    keywords: 'resume fixer, repair resume, fix resume formatting, resume gap solutions',
};

export default function ResumeFixerPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Repair Tool"
                badgeIcon={Wrench}
                title={
                    <>
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Resume Fixer</span>
                    </>
                }
                subtitle="Don't let a broken resume hold you back. Identify and repair structural, stylistic, and content issues that are sabotaging your job search."
            />

            <ResourceFeatureGrid
                title="Common Issues We Fix"
                features={[
                    {
                        icon: <ShieldAlert className="w-6 h-6" />,
                        title: "Formatting Glitches",
                        description: "We fix overlapping text, inconsistent margins, and fonts that break when saved as PDF."
                    },
                    {
                        icon: <FileWarning className="w-6 h-6" />,
                        title: "Content Red Flags",
                        description: "Expert advice on how to address employment gaps and career pivots professionally."
                    },
                    {
                        icon: <CheckCircle2 className="w-6 h-6" />,
                        title: "Grammar & Style",
                        description: "Standardize your professional voice and eliminate passive phrasing that weakens your impact."
                    }
                ]}
            />

            <ResourceContentSection
                title="Is Your Resume Broken?"
                content={
                    <div className="space-y-6">
                        <p>
                            A "broken" resume is any document that fails to pass through an ATS or fails to engage a recruiter within 6 seconds. Our <strong>Resume Fixer</strong> approach focuses on the two most common failure points:
                        </p>
                        <h4 className="font-bold text-gray-900">1. Technical Breakdowns</h4>
                        <p className="text-sm">
                            Complex layouts, tables, and unusual fonts can cause an ATS to see your resume as empty or full of gibberish. We recommend clean, linear structures that are 100% machine-readable.
                        </p>
                        <h4 className="font-bold text-gray-900">2. Narrative Breakdowns</h4>
                        <p className="text-sm">
                            If your resume reads like a list of chores rather than a list of wins, it's broken. We help you shift from a "responsibilities-based" document to an "achievements-based" career tool.
                        </p>
                    </div>
                }
            />

            <ResourceCTA
                title="Let's Fix Your Resume Together"
                subtitle="Upload your current resume and use our professional templates to fix all your formatting issues at once."
            />
        </div>
    );
}
