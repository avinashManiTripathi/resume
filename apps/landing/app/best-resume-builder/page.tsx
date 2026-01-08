import { Metadata } from 'next';
import { Star, Award, CheckCircle, Zap, Target, Brain, FileText, ArrowRight, Sparkles, TrendingUp, Shield, Mic, Clock } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Best Resume Builder 2026 - AI-Powered Professional Resume Maker',
    description: 'Create winning resumes with the best AI-powered resume builder. 20+ ATS-friendly templates, voice input, job-specific tailoring, and unlimited free access. Trusted by 50,000+ job seekers.',
    keywords: 'best resume builder, resume builder, AI resume builder, professional resume maker, ATS resume builder, resume creator',
    alternates: {
        canonical: 'https://profresume.com/best-resume-builder',
    },
    openGraph: {
        title: 'Best Resume Builder 2026 - AI-Powered & ATS-Friendly',
        description: 'The most advanced resume builder with AI writing, voice input, and job-specific optimization. Get hired faster.',
        url: 'https://profresume.com/best-resume-builder',
        type: 'article',
    },
};

export default function BestResumeBuilderPage() {
    const faqs = [
        { question: "What makes a resume builder the best?", answer: "The best resume builder combines ease of use, ATS compatibility, professional templates, AI-powered content suggestions, and flexible customization options. It should save you time while producing results that get you more interviews." },
        { question: "How does AI improve resume building?", answer: "AI analyzes your role, industry, and experience to suggest impactful bullet points, optimize keywords for ATS, and ensure your achievements are quantified and compelling. It's like having a professional resume writer guide you." },
        { question: "Are AI-generated resumes as good as professionally written ones?", answer: "Modern AI-powered resume builders offer 90% of professional quality at a fraction of the cost. They provide industry-specific suggestions, ATS optimization, and proven templates used by thousands of successful job seekers." },
        { question: "What is ATS and why does it matter?", answer: "ATS (Applicant Tracking System) software scans resumes before human eyes see them. 99% of Fortune 500 companies use ATS. A good resume builder ensures clean formatting, proper structure, and keyword optimization to pass ATS filters." },
        { question: "How long should it take to build a professional resume?", answer: "With the right resume builder, you can create a professional resume in 10-15 minutes. Advanced features like AI suggestions and voice input can cut this time even further." },
        { question: "Can I use the same resume for different jobs?", answer: "While possible, it's better to tailor your resume for each application. The best resume builders make this easy with job-specific keyword matching and quick customization features." },
        { question: "What resume format do employers prefer?", answer: "Reverse-chronological format is preferred by 90% of employers and ATS systems. It lists your most recent experience first and is the easiest to scan quickly." },
        { question: "Do I need a cover letter with my resume?", answer: "While not always required, cover letters increase interview chances by 40%. The best resume builders include matching cover letter templates for a professional, cohesive application." }
    ];

    const breadcrumbs = [
        { name: "Home", url: "https://profresume.com" },
        { name: "Best Resume Builder", url: "https://profresume.com/best-resume-builder" }
    ];

    const keyFeatures = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Writing",
            desc: "Smart suggestions for bullet points, achievements, and skills based on your role and industry. Never stare at a blank page again.",
            benefit: "Saves 60% of writing time"
        },
        {
            icon: <Mic className="w-8 h-8" />,
            title: "Voice Input Technology",
            desc: "Speak your work experience naturally and watch it transform into professional resume content. Revolutionary time-saver.",
            benefit: "Unique to ProfResume"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Job-Specific Tailoring",
            desc: "Paste any job description and get instant keyword matching and content recommendations optimized for that specific role.",
            benefit: "3x more interviews"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "ATS Optimization",
            desc: "All templates are guaranteed to pass Applicant Tracking Systems used by Fortune 500 companies. Clean formatting built-in.",
            benefit: "99% ATS pass rate"
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "20+ Professional Templates",
            desc: "Modern, classic, and creative designs for every industry. All mobile-responsive and print-ready.",
            benefit: "Every style covered"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Real-Time Preview",
            desc: "See your resume update instantly as you type. What you see is exactly what you'll download.",
            benefit: "No surprises"
        }
    ];

    const useCases = [
        {
            title: "Software Engineers & Developers",
            icon: <FileText className="w-6 h-6" />,
            features: ["GitHub integration", "Technical skills showcase", "Project portfolio sections", "FAANG-optimized templates"],
            link: "/resume-builder/software-engineer"
        },
        {
            title: "Fresh Graduates & Entry-Level",
            icon: <Star className="w-6 h-6" />,
            features: ["Education-first layouts", "Project highlights", "Internship emphasis", "Skills-based templates"],
            link: "/resume-builder/fresher"
        },
        {
            title: "IT Professionals & DevOps",
            icon: <Shield className="w-6 h-6" />,
            features: ["Certification sections", "Infrastructure experience", "Cloud & security focus", "Technical achievements"],
            link: "/resume-builder/it-professional"
        },
        {
            title: "Managers & Executives",
            icon: <TrendingUp className="w-6 h-6" />,
            features: ["Leadership focus", "Strategic impact", "Team metrics", "Executive templates"],
            link: "/resume-builder/manager"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Best Resume Builder 2026 - Professional Resume Maker"
                description="Discover the most advanced resume builder with AI-powered features, voice input, and ATS optimization to help you land your dream job."
                url="https://profresume.com/best-resume-builder"
                datePublished="2026-01-01"
                dateModified="2026-01-08"
                author="ProfResume"
            />

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 text-blue-800 rounded-full text-sm font-semibold mb-6">
                            <Award className="w-4 h-4 fill-blue-600" />
                            AI-Powered • ATS-Optimized • Trusted by 50,000+
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                            Best Resume Builder 2026
                        </h1>
                        <p className="text-2xl text-gray-600 mb-4">
                            AI-Powered Professional Resume Maker
                        </p>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
                            Create winning resumes with advanced AI writing, voice input, and job-specific optimization. Get hired faster with resumes that actually pass ATS and impress hiring managers.
                        </p>
                    </div>

                    {/* Value Props */}
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: <Clock className="w-6 h-6" />, text: "10-minute resume creation" },
                            { icon: <Shield className="w-6 h-6" />, text: "99% ATS pass rate" },
                            { icon: <TrendingUp className="w-6 h-6" />, text: "3x more interviews" }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-center gap-3 bg-white rounded-xl p-4 border-2 border-blue-100">
                                <div className="text-blue-600">{item.icon}</div>
                                <span className="font-semibold text-gray-900">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mb-8">
                        <Link
                            href="https://edit.profresume.com/editor"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl"
                        >
                            Start Building Your Resume <ArrowRight className="w-6 h-6" />
                        </Link>
                        <p className="mt-4 text-gray-600">
                            100% free • No credit card required • Instant access
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-4 text-center">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-700">
                            <span className="font-bold">4.8/5</span> from 2,450+ users
                        </p>
                    </div>
                </div>
            </section>

            {/* Why This Is The Best */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        What Makes This The Best Resume Builder?
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Advanced features that help you stand out and get hired faster
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {keyFeatures.map((feature, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-700 mb-3">{feature.desc}</p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                            <CheckCircle className="w-4 h-4" />
                                            {feature.benefit}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resume Builder by Role */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        Best Resume Builder for Your Career
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Specialized features and templates for every industry and experience level
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {useCases.map((useCase, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all group">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center">
                                        {useCase.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {useCase.title}
                                    </h3>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {useCase.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={useCase.link}
                                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                >
                                    Build {useCase.title.split('&')[0].trim()} Resume <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Real Results from Real Users
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { stat: "50,000+", label: "Resumes Created", desc: "Professionals trust our builder" },
                            { stat: "73%", label: "More Interviews", desc: "Users report increased callbacks" },
                            { stat: "4.8/5", label: "User Rating", desc: "From 2,450+ verified reviews" },
                        ].map((item, index) => (
                            <div key={index} className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
                                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                                    {item.stat}
                                </div>
                                <div className="text-xl font-bold text-gray-900 mb-2">{item.label}</div>
                                <div className="text-gray-600">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Choose Features */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                        What to Look For in a Resume Builder
                    </h2>

                    <div className="space-y-6">
                        {[
                            { title: "ATS Compatibility", desc: "Must pass Applicant Tracking Systems used by 99% of Fortune 500 companies. Clean formatting, standard fonts, proper structure." },
                            { title: "Professional Templates", desc: "Multiple design options for different industries and roles. Modern yet professional aesthetics that hiring managers prefer." },
                            { title: "AI-Powered Content", desc: "Smart suggestions for bullet points, achievements, and skills. Saves time and ensures impactful language that gets results." },
                            { title: "Customization Flexibility", desc: "Easy to tailor for different jobs without starting from scratch. Job-specific keyword matching is a huge plus." },
                            { title: "Export Options", desc: "PDF and DOCX downloads without watermarks. Ability to print professionally without formatting issues." },
                            { title: "Speed & Ease of Use", desc: "Create a professional resume in under 15 minutes. Intuitive interface that doesn't require design skills." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 ml-7">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-4">ProfResume Checks All Boxes ✓</h3>
                        <p className="text-lg opacity-90 mb-6">
                            Plus unique features like voice input and job description matching that no other builder offers.
                        </p>
                        <Link
                            href="https://edit.profresume.com/editor"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                        >
                            Try It Free Now <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Ready to Build Your Best Resume?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join 50,000+ professionals who've landed their dream jobs using our AI-powered resume builder
                    </p>
                    <Link
                        href="https://edit.profresume.com/editor"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl"
                    >
                        Start Building Free <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-sm opacity-80">
                        No credit card required • 100% free • Instant access
                    </p>
                </div>
            </section>
        </div>
    );
}
