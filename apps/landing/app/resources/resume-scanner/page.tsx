import { Metadata } from 'next';
import { Scan, ShieldCheck, Search, Zap, Cpu, SearchCode } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Resume Scanner - See Your Resume Through an ATS',
    description: 'Use our resume scanner to see how Applicant Tracking Systems (ATS) read your resume. Identify hidden issues and optimize for automated hiring software.',
    keywords: 'resume scanner, ats scanner, resume parser online, check resume for system compatibility',
};

export default function ResumeScannerPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="System Simulation"
                badgeIcon={Scan}
                title={
                    <>
                        The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Resume Scanner</span>
                    </>
                }
                subtitle="Understand exactly how hiring software parses your professional history. Stop wondering why your resume isn't getting through."
            />

            <ResourceFeatureGrid
                title="Machine-Readability Features"
                features={[
                    {
                        icon: <Cpu className="w-6 h-6" />,
                        title: "Parser Simulation",
                        description: "We simulate the parsing logic used by major platforms like Workday, Taleo, and Greenhouse."
                    },
                    {
                        icon: <SearchCode className="w-6 h-6" />,
                        title: "Section Detection",
                        description: "Ensure the scanner correctly identifies your Experience, Education, and Skills sections."
                    },
                    {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "Safe Format Check",
                        description: "Verify that your PDF doesn't contain hidden text or graphical elements that confuse scanners."
                    }
                ]}
            />

            <ResourceContentSection
                title="Think Like a Machine"
                content={
                    <div className="space-y-6">
                        <p>
                            Modern recruitment relies on speed, which means a <strong>Resume Scanner</strong> is often the first "person" to read your application. Most scanners look for a specific structure (typically XML or JSON-based parsing).
                        </p>
                        <p>
                            To ensure high scan scores, follow the "Rule of 3":
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Standard Headings:</strong> Use recognizable section titles like "Experience" instead of "My Career Story."</li>
                            <li><strong>Linear Layout:</strong> Stick to a single-column or very simple two-column layout that parses from top-left to bottom-right.</li>
                            <li><strong>Clean Text:</strong> Avoid charts or icons to convey critical information; use plain text for skills and data.</li>
                        </ul>
                    </div>
                }
            />

            <ResourceCTA
                title="Scan Your Resume for Free"
                subtitle="Ensure your professional profile is 100% machine-readable before you apply to your next job."
            />
        </div>
    );
}
