import { Metadata } from 'next';
import { FileText, Zap, CheckCircle, Award, Target, TrendingUp, Download, Users, Clock, Shield } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Resume Builder 2026 - Create Professional Resumes in Minutes | ATS-Friendly',
    description: 'Build your professional resume for free with our AI-powered resume builder. Choose from 20+ ATS-friendly templates, get real-time feedback, and download as PDF. Trusted by 50,000+ professionals.',
    keywords: 'resume builder, free resume builder, professional resume, ATS resume builder, online resume maker, CV builder, resume creator, resume template',
    alternates: {
        canonical: 'https://profresume.com/resume-builder',
    },
    openGraph: {
        title: 'Free Resume Builder - Create Professional Resumes in Minutes',
        description: 'Build ATS-friendly resumes with AI assistance. 20+ templates, instant PDF download, completely free.',
        url: 'https://profresume.com/resume-builder',
        type: 'website',
    },
};

export default function ResumeBuilderPage() {
    const faqs = [
        { question: "Is the resume builder really free?", answer: "Yes! Our resume builder is 100% free with no hidden charges. Create unlimited resumes, access all templates, and download as PDF without any cost." },
        { question: "How long does it take to build a resume?", answer: "Most users create a professional resume in 10-15 minutes. Our AI-powered tools and pre-written suggestions make the process quick and easy." },
        { question: "Are the resumes ATS-friendly?", answer: "Absolutely! All our templates are designed to pass Applicant Tracking Systems (ATS). We use clean formatting, standard fonts, and proper structure." },
        { question: "Can I edit my resume later?", answer: "Yes, you can save your resume and edit it anytime. Your data is securely stored and accessible whenever you need to make updates." },
        { question: "What file formats can I download?", answer: "You can download your resume as PDF (recommended for applications) or DOCX for further editing. Both formats are ATS-compatible." }
    ];

    const breadcrumbs = [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resume Builder", url: "https://profresume.com/resume-builder" }
    ];

    const resumeTypes = [
        {
            title: "Resume Builder for Software Engineers",
            description: "Specialized templates and content for tech professionals",
            href: "/resume-builder/software-engineer",
            icon: <FileText className="w-6 h-6" />
        },
        {
            title: "Resume Builder for Freshers",
            description: "Perfect for entry-level candidates and recent graduates",
            href: "/resume-builder/fresher",
            icon: <Users className="w-6 h-6" />
        },
        {
            title: "Resume Builder for IT Professionals",
            description: "Optimized for IT, DevOps, and technical roles",
            href: "/resume-builder/it-professional",
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: "Resume Builder for Managers",
            description: "Leadership-focused templates and achievement frameworks",
            href: "/resume-builder/manager",
            icon: <Award className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Free Resume Builder 2026 - Create Professional Resumes in Minutes"
                description="Build your professional resume for free with our AI-powered resume builder. Choose from 20+ ATS-friendly templates and download as PDF."
                url="https://profresume.com/resume-builder"
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="Free Tool"
                badgeIcon={FileText}
                title={
                    <>
                        Build Your Perfect Resume with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Free Resume Builder</span>
                    </>
                }
                subtitle="Create a professional, ATS-friendly resume in minutes. Choose from 20+ templates, get AI-powered suggestions, and download instantly. No credit card required."
            />

            <ResourceFeatureGrid
                title="Why Choose Our Resume Builder"
                features={[
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "AI-Powered Suggestions",
                        description: "Get smart content recommendations and real-time optimization tips as you build."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "ATS-Friendly Templates",
                        description: "All templates pass Applicant Tracking Systems used by 99% of Fortune 500 companies."
                    },
                    {
                        icon: <Download className="w-6 h-6" />,
                        title: "Instant PDF Download",
                        description: "Download your resume as PDF or DOCX instantly. No waiting, no watermarks."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Industry-Specific Content",
                        description: "Pre-written bullet points and achievements tailored to your industry and role."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Real-Time Feedback",
                        description: "Get instant analysis on strength, keywords, formatting, and ATS compatibility."
                    },
                    {
                        icon: <Shield className="w-6 h-6" />,
                        title: "100% Free Forever",
                        description: "No hidden fees, no premium upsells. Complete resume builder absolutely free."
                    }
                ]}
            />

            {/* Resume Types Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                            Specialized Resume Builders
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose a resume builder tailored to your career level and industry for the best results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {resumeTypes.map((type, index) => (
                            <Link
                                key={index}
                                href={type.href}
                                className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-blue-500 hover:shadow-xl transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {type.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {type.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {type.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <ResourceContentSection
                title="How to Build a Professional Resume"
                content={
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 rounded-xl p-6">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    1
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Choose a Template</h3>
                                <p className="text-gray-600">
                                    Select from 20+ professional templates designed for your industry and career level.
                                </p>
                            </div>

                            <div className="bg-purple-50 rounded-xl p-6">
                                <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    2
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Add Your Information</h3>
                                <p className="text-gray-600">
                                    Fill in your details with AI-powered suggestions and pre-written content for each section.
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6">
                                <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    3
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Download & Apply</h3>
                                <p className="text-gray-600">
                                    Get instant feedback, make final tweaks, and download your ATS-friendly resume as PDF.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mt-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                What Makes a Great Resume?
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">
                                        <strong>Clear formatting</strong> that's easy for both humans and ATS to read
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">
                                        <strong>Quantified achievements</strong> with metrics and specific results
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">
                                        <strong>Relevant keywords</strong> from the job description naturally incorporated
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">
                                        <strong>Tailored content</strong> highlighting skills and experience for the target role
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">
                                        <strong>Professional design</strong> that stands out without being distracting
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            />

            <ResourceCTA
                title="Ready to Build Your Resume?"
                description="Join 50,000+ professionals who've landed their dream jobs with our free resume builder"
                ctaText="Create My Resume Now"
                ctaLink="/editor"
            />
        </div>
    );
}
