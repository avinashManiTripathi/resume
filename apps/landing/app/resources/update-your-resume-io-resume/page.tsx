import { Metadata } from 'next';
import { RefreshCw, FileText, ArrowRightLeft, Zap, ShieldCheck, Target } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Update Your Resume.io Resume - Professional Resume Overhaul',
    description: 'Looking to update your resume.io resume? Transition to our professional resume builder for more customization, ATS optimization, and better templates.',
    keywords: 'update resume.io resume, resume.io alternative, export resume.io, professional resume update',
};

export default function UpdateResumeIoPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Platform Transition"
                badgeIcon={RefreshCw}
                title={
                    <>
                        Easily Upgrade & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Update Your Resume</span>
                    </>
                }
                subtitle="Transition from basic platforms like resume.io to a professional, high-performance resume builder. Get more features, better AI, and premium designs."
            />

            <ResourceFeatureGrid
                title="Why Transition to Professional Tools?"
                features={[
                    {
                        icon: <ArrowRightLeft className="w-6 h-6" />,
                        title: "Seamless Transition",
                        description: "Our platform makes it easy to bring your existing data and upgrade it with professional layouts."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Advanced Customization",
                        description: "Go beyond the standard templates. Control every detail of your document's design and structure."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Superior ATS Tech",
                        description: "Our templates are engineered specifically to beat the latest 2026 AI-driven filtering systems."
                    }
                ]}
            />

            <ResourceContentSection
                title="Refreshing Your Professional Image"
                content={
                    <div className="space-y-6">
                        <p>
                            Many users who start with basic tools like <strong>Resume.io</strong> eventually find they need more professional control. Whether you're targeting a senior role or a competitive industry, the standard templates can sometimes blend in too much.
                        </p>
                        <p>
                            When updating your resume from other platforms, consider these three upgrades:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Typography:</strong> Replace standard system fonts with professional, high-readability typefaces.</li>
                            <li><strong>Achievement Focus:</strong> Use our AI tools to rewrite generic duty lists into powerful results.</li>
                            <li><strong>Modern Design:</strong> Switch to layouts that use modern visual hierarchies for better recruiter engagement.</li>
                        </ul>
                    </div>
                }
            />

            <ResourceCTA
                title="Ready for a Professional Upgrade?"
                subtitle="Start your new resume today and see why 50,000+ professionals switched to our builder this month."
            />
        </div>
    );
}
