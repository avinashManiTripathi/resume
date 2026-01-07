import { Metadata } from 'next';
import { Code, Terminal, Rocket, Award, Target, TrendingUp, CheckCircle, Zap, FileText, Brain } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Software Engineer Resume Builder 2026 - Tech Resume Templates | Get Hired at FAANG',
    description: 'Build a standout software engineer resume with our specialized builder. ATS-friendly tech templates, coding project sections, and GitHub integration. Land interviews at top tech companies.',
    keywords: 'software engineer resume, developer resume builder, tech resume, coding resume, FAANG resume, programmer resume, software developer CV',
    alternates: {
        canonical: 'https://profresume.com/resume-builder/software-engineer',
    },
};

export default function SoftwareEngineerResumePage() {
    const faqs = [
        { question: "What should a software engineer resume include?", answer: "Your resume should highlight technical skills, programming languages, frameworks, notable projects with GitHub links, system design experience, and quantifiable achievements like performance improvements or cost savings." },
        { question: "How do I showcase coding projects on my resume?", answer: "Create a dedicated Projects section with project name, tech stack, brief description, your role, and measurable impact. Include GitHub links and live demos when possible." },
        { question: "Should I list all programming languages I know?", answer: "List languages you're proficient in and have used professionally. Organize them by proficiency level (Expert, Proficient, Familiar) to set clear expectations." },
        { question: "How long should a software engineer resume be?", answer: "1 page for 0-5 years of experience, 2 pages for senior engineers (5+ years). Focus on quality and relevance over quantity." },
        { question: "Do I need a different resume for each tech stack?", answer: "Yes! Tailor your resume to emphasize relevant technologies. A backend Java role needs different emphasis than a React frontend position." }
    ];

    const breadcrumbs = [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resume Builder", url: "https://profresume.com/resume-builder" },
        { name: "Software Engineer", url: "https://profresume.com/resume-builder/software-engineer" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Software Engineer Resume Builder 2026 - Land Your Dream Tech Job"
                description="Build a standout software engineer resume with specialized tech templates, project sections, and ATS optimization for FAANG and top tech companies."
                url="https://profresume.com/resume-builder/software-engineer"
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="Tech Careers"
                badgeIcon={Code}
                title={
                    <>
                        Software Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Resume Builder</span>
                    </>
                }
                subtitle="Create a tech resume that gets you interviews at FAANG, startups, and top tech companies. Optimized for ATS with special sections for projects, technical skills, and GitHub integration."
            />

            <ResourceFeatureGrid
                title="Built for Software Engineers"
                features={[
                    {
                        icon: <Terminal className="w-6 h-6" />,
                        title: "Tech Stack Showcase",
                        description: "Dedicated sections for programming languages, frameworks, tools, and technologies."
                    },
                    {
                        icon: <Code className="w-6 h-6" />,
                        title: "Project Portfolio",
                        description: "Highlight your best coding projects with GitHub links, tech stack, and impact metrics."
                    },
                    {
                        icon: <Rocket className="w-6 h-6" />,
                        title: "FAANG-Optimized",
                        description: "Templates and content proven to work at Google, Meta, Amazon, Apple, and Microsoft."
                    },
                    {
                        icon: <Brain className="w-6 h-6" />,
                        title: "System Design Experience",
                        description: "Showcase architecture decisions, scalability improvements, and technical leadership."
                    },
                    {
                        icon: <Award className="w-6 h-6" />,
                        title: "Achievement Metrics",
                        description: "Quantify your impact with performance improvements, cost savings, and user growth."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "ATS-Optimized",
                        description: "Pass technical recruiter screening with proper keywords and clean formatting."
                    }
                ]}
            />

            <ResourceContentSection
                title="What Makes a Great Software Engineer Resume?"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Technical Skills
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Programming Languages (by proficiency)</li>
                                        <li>• Frameworks & Libraries</li>
                                        <li>• Databases & Cloud Platforms</li>
                                        <li>• Development Tools & CI/CD</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Projects Portfolio
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Project name & description</li>
                                        <li>• Technologies used</li>
                                        <li>• Your specific contributions</li>
                                        <li>• Measurable results/impact</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Work Experience
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Company, role, dates</li>
                                        <li>• Technologies & stack used</li>
                                        <li>• Key technical achievements</li>
                                        <li>• Quantified impact (%, $, users)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Education & Certifications
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Degree, Major, University</li>
                                        <li>• Relevant coursework (if recent grad)</li>
                                        <li>• Technical certifications (AWS, etc.)</li>
                                        <li>• Hackathon wins & achievements</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Pro Tips for Software Engineers
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Use action verbs: "Architected", "Implemented", "Optimized", "Scaled"</li>
                                <li>• Quantify everything: "Reduced load time by 40%", "Handled 1M requests/day"</li>
                                <li>• Include GitHub profile with pinned repositories showcasing best work</li>
                                <li>• Tailor tech stack to job description (full-stack vs backend vs frontend)</li>
                                <li>• Show progression: junior → mid → senior responsibilities</li>
                            </ul>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Sample Achievement Bullets for Software Engineers
                    </h2>
                    <div className="space-y-4">
                        {[
                            "Architected and deployed microservices infrastructure using Docker & Kubernetes, reducing deployment time by 60% and improving system uptime to 99.9%",
                            "Implemented real-time data processing pipeline using Apache Kafka, handling 5M+ events daily with <100ms latency",
                            "Led migration from monolithic architecture to microservices, reducing technical debt by 40% and enabling 10x faster feature deployment",
                            "Optimized database queries and implemented caching strategy (Redis), improving API response time from 2s to 200ms",
                            "Built CI/CD pipeline with GitHub Actions and automated testing, increasing deployment frequency from weekly to daily releases"
                        ].map((bullet, index) => (
                            <div key={index} className="bg-white rounded-lg border-2 border-green-200 p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">{bullet}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ResourceCTA
                title="Build Your Software Engineer Resume Now"
                description="Join 10,000+ developers who've landed jobs at FAANG and top tech companies"
                ctaText="Create Tech Resume"
                ctaLink="/editor"
            />
        </div>
    );
}
