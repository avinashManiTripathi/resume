import { Metadata } from 'next';
import { Rocket, FastForward, TrendingUp, Zap, Target, Star } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Resume Booster - Boost Your Resume Impact Instantly',
    description: 'Use our resume booster to enhance your career profile. Improve your resume score and visibility to recruiters with targeted optimizations.',
    keywords: 'resume booster, enhance resume impact, increase resume visibility, resume profile boost',
};

export default function ResumeBoosterPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Impact Tool"
                badgeIcon={Rocket}
                title={
                    <>
                        Supercharge Your Career with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Resume Booster</span>
                    </>
                }
                subtitle="Transform an average resume into an interview-magnet. Our booster identifies high-impact changes that get immediate results."
            />

            <ResourceFeatureGrid
                title="Instant Profile Enhancements"
                features={[
                    {
                        icon: <FastForward className="w-6 h-6" />,
                        title: "Quantifiable Impact",
                        description: "Convert vague responsibilities into hard data that proves your value to employers."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Ranking Optimization",
                        description: "Align your profile with industry standards to rank higher in recruiter searches."
                    },
                    {
                        icon: <Star className="w-6 h-6" />,
                        title: "Visual Polish",
                        description: "Upgrade your layout to a premium design that commands professional respect."
                    }
                ]}
            />

            <ResourceContentSection
                title="What is a Resume Booster?"
                content={
                    <div className="space-y-6">
                        <p>
                            A <strong>Resume Booster</strong> isn't just a basic edit; it's a strategic overhaul of your professional narrative. It focuses on maximizing the "curbing appeal" of your resume within the first few seconds of a recruiter's review.
                        </p>
                        <p>
                            Key boosting strategies include:
                        </p>
                        <ul className="list-decimal pl-6 space-y-2">
                            <li>Implementing the Google XYZ formula for bullet points.</li>
                            <li>Strengthening the summary section with industry-specific power words.</li>
                            <li>Reorganizing sections based on your target role's hierarchy of needs.</li>
                            <li>Eliminating generic "fluff" that weakens your professional stance.</li>
                        </ul>
                    </div>
                }
            />

            <ResourceCTA
                title="Give Your Career a Boost"
                subtitle="Don't settle for average. Boost your resume impact and land the job you deserve."
            />
        </div>
    );
}
