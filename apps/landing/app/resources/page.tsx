import { IntroSection } from "@/components/IntroSection";
import {
    Sparkles,
    FileText,
    Search,
    BookOpen,
    TrendingUp,
    Briefcase,
    CheckCircle,
    RefreshCw,
    Zap,
    Target,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ENV } from "../env";

export const metadata: Metadata = {
    title: 'Resume Resources & Career Guides | ProfResume',
    description: 'Explore our comprehensive collection of resume guides, career tips, and tools. From ATS optimization to cover letter writing, find everything you need to land your dream job.',
    alternates: {
        canonical: '/resources',
    },
    openGraph: {
        title: 'Resume Resources & Career Guides | ProfResume',
        description: 'Expert advice, tools, and guides to help you build the perfect resume and advance your career.',
        url: '/resources',
        type: 'website',
    },
};

// Using Lucide icons for the resources
const resources = [
    {
        title: "AI Resume Review",
        description: "Get instant, AI-powered feedback on your resume to improve your chances.",
        href: "/resources/ai-resume-review",
        icon: <Sparkles size={80} strokeWidth={1} />,
        badge: "TOOL"
    },
    {
        title: "ATS Guide",
        description: "Everything you need to know about Applicant Tracking Systems.",
        href: "/resources/ats-guide",
        icon: <Search size={80} strokeWidth={1} />,
        badge: "GUIDE"
    },
    {
        title: "Career Tips",
        description: "Expert advice to help you navigate your career path and land your dream job.",
        href: "/resources/career-tips",
        icon: <TrendingUp size={80} strokeWidth={1} />,
        badge: "ADVICE"
    },
    {
        title: "Cover Letter Guide",
        description: "Learn how to write compelling cover letters that get read.",
        href: "/resources/cover-letter-guide",
        icon: <FileText size={80} strokeWidth={1} />,
        badge: "GUIDE"
    },
    {
        title: "For Organizations",
        description: "Solutions for companies and educational institutions.",
        href: "/resources/for-organizations",
        icon: <Briefcase size={80} strokeWidth={1} />,
        badge: "BUSINESS"
    },
    {
        title: "Industry Examples",
        description: "Real resume examples from top industries to inspire your own.",
        href: "/resources/industry-examples",
        icon: <BookOpen size={80} strokeWidth={1} />,
        badge: "EXAMPLES"
    },
    {
        title: "Resume Booster",
        description: "Quick tips and tricks to give your resume an immediate boost.",
        href: "/resources/resume-booster",
        icon: <Zap size={80} strokeWidth={1} />,
        badge: "TIPS"
    },
    {
        title: "Resume Checker",
        description: "Check your resume against job descriptions for a perfect match.",
        href: "/resources/resume-checker",
        icon: <CheckCircle size={80} strokeWidth={1} />,
        badge: "TOOL"
    },
    {
        title: "Resume Critique",
        description: "Detailed critique and actionable feedback for your resume.",
        href: "/resources/resume-critique",
        icon: <FileText size={80} strokeWidth={1} />,
        badge: "SERVICE"
    },
    {
        title: "Resume Fixer",
        description: "Fix common resume mistakes that might be holding you back.",
        href: "/resources/resume-fixer",
        icon: <RefreshCw size={80} strokeWidth={1} />,
        badge: "GUIDE"
    },
    {
        title: "Resume Guide",
        description: "Comprehensive guide to writing a professional resume from scratch.",
        href: "/resources/resume-guide",
        icon: <BookOpen size={80} strokeWidth={1} />,
        badge: "GUIDE"
    },
    {
        title: "Keyword Generator",
        description: "Find the best keywords to include in your resume for your target role.",
        href: "/resources/resume-keyword-generator",
        icon: <Search size={80} strokeWidth={1} />,
        badge: "TOOL"
    },
    {
        title: "Resume Scanner",
        description: "Scan your resume to see how an ATS reads it.",
        href: "/resources/resume-scanner",
        icon: <Search size={80} strokeWidth={1} />,
        badge: "TOOL"
    },
    {
        title: "Targeted Resume",
        description: "How to tailor your resume for specific job applications.",
        href: "/resources/targeted-resume",
        icon: <Target size={80} strokeWidth={1} />,
        badge: "GUIDE"
    },
    {
        title: "Update Resume",
        description: "Step-by-step guide to updating your old resume effectively.",
        href: "/resources/update-your-resume-io-resume",
        icon: <RefreshCw size={80} strokeWidth={1} />,
        badge: "GUIDE"
    },
];

export default function ResourcesPage() {
    const collectionLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Resume Resources & Career Guides",
        "description": "Explore our comprehensive collection of resume guides, career tips, and tools.",
        "url": `${ENV.BASE_URL}/resources`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": resources.map((resource, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${ENV.BASE_URL}${resource.href}`,
                "name": resource.title
            }))
        }
    };

    return (
        <div className="pb-20 bg-slate-50/50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: ENV.BASE_URL },
                    { name: "Resources", url: `${ENV.BASE_URL}/resources` },
                ]}
            />

            {/* Hero Section */}
            <IntroSection
                label={"Resources"}
                title={"Career Resources & Guides"}
                description={"Everything you need to build a perfect resume and advance your career. Expert guides, tools, and tips at your fingertips."}
            />

            {/* Resources Grid */}
            <section className="container mx-auto px-4 mt-12 max-w-7xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((resource, idx) => (
                        <Link
                            key={idx}
                            href={resource.href}
                            className="group flex flex-col p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 p-6 text-slate-50 group-hover:text-blue-50 transition-colors duration-300 -z-0">
                                {resource.icon}
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6 w-fit">
                                    {resource.badge}
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                    {resource.title}
                                </h2>

                                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {resource.description}
                                </p>

                                <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm">
                                    <span className="group-hover:mr-2 transition-all duration-300">Read More</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Explore More Section / CTA */}
            <div className="container mx-auto px-4 mt-24">
                <div className="bg-blue-50 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Need a professional resume?</h2>
                    <p className="text-slate-600 mb-10 text-lg">
                        Our AI-powered builder helps you create a high-quality resume that matches these standards.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`${ENV.EDITOR_URL}`}
                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200"
                        >
                            Start Building for Free
                        </a>
                        <Link
                            href="/templates"
                            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Browse Templates
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
