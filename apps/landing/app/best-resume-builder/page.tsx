import { Metadata } from 'next';
import { Star, Award, CheckCircle, Zap, Target, Brain, FileText, ArrowRight, Sparkles, TrendingUp, Shield, Mic, Clock } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import Link from 'next/link';
import { ENV } from "@/app/env";
import { GlobalSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Best Resume Builder 2026 - AI-Powered Professional Resume Maker',
    description: 'Create winning resumes with the best AI-powered resume builder. 20+ ATS-friendly templates, voice input, job-specific tailoring, and unlimited free access. Trusted by 50,000+ job seekers.',
    keywords: 'best resume builder, resume builder, AI resume builder, professional resume maker, ATS resume builder, resume creator',
    alternates: {
        canonical: '/best-resume-builder',
    },
    openGraph: {
        title: 'Best Resume Builder 2026 - AI-Powered & ATS-Friendly',
        description: 'The most advanced resume builder with AI writing, voice input, and job-specific optimization. Get hired faster.',
        url: '/best-resume-builder',
        type: 'article',
    },
};

export default function BestResumeBuilderPage() {
    const faqs = [
        {
            question: "What makes Hirecta the best resume builder of 2026?",
            answer: "Hirecta stands out as the best resume builder due to its unique integration of Voice-to-Resume technology, LLM-driven job tailoring, and real-time ATS scoring. Unlike traditional drag-and-drop tools, Hirecta focuses on content strategy first, ensuring your resume isn't just a pretty document, but a high-conversion sales tool for your career."
        },
        {
            question: "Is it really free? Are there hidden costs to download?",
            answer: "Hirecta offers a genuinely 'Free-to-Start' model. You can build, edit, and download your resume in PDF and TXT formats without a credit card. We believe in providing value upfront. While we offer a 'Premium tier' for advanced AI features and niche templates, the core functionality required to land a job is 100% free."
        },
        {
            question: "How does the AI writing assistant compare to ChatGPT?",
            answer: "While general AI like ChatGPT is powerful, Hirecta's AI is specifically fine-tuned on HR datasets, recruitment psychology, and ATS parsing patterns. Our AI understands the 'Context' of a resume—it knows that 'Managed a team' is weaker than 'Orchestrated a cross-functional squad of 15 to reduce churn by 20%'. It guides you to quantify every achievement."
        },
        {
            question: "Will my resume work with old ATS systems?",
            answer: "Yes. Our templates are backward-compatible. We use a 'Safe-Layer' formatting approach that strips away potential roadblocks like text boxes or complex image overlays while maintaining a modern visual aesthetic for human readers."
        },
        {
            question: "How does the Voice Input feature work?",
            answer: "Our proprietary Voice-to-Resume engine allows you to simply talk about your previous roles. It uses Natural Language Processing to extract dates, job titles, and achievements, automatically formatting them into professional bullet points. It's the fastest way to build a resume for those who find writing difficult."
        },
        {
            question: "Can I import my existing LinkedIn profile?",
            answer: "Yes! Hirecta allows for direct profile ingestion. You can upload your old PDF or sync your LinkedIn data, and our AI will instantly map that information into one of our high-conversion templates, saving you from tedious copy-pasting."
        },
        {
            question: "Is my personal data secure?",
            answer: "Data sovereignty is a priority. We use AES-256 encryption for all user data. Unlike other builders, we do not sell your data to headhunters or recruitment agencies. You have full control over your data—you can delete your account and all associated resumes with a single click."
        },
        {
            question: "Does Hirecta help with cover letters too?",
            answer: "Yes. For every resume you create, Hirecta can generate a matching cover letter that uses the same visual branding and tone of voice. This creates a cohesive professional package that recruiters love."
        }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Best Resume Builder", url: `${ENV.BASE_URL}/best-resume-builder` }
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
            benefit: "Unique to Hirecta"
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
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Best Resume Builder 2026 - Professional Resume Maker"
                description="Discover the most advanced resume builder with AI-powered features, voice input, and ATS optimization to help you land your dream job."
                url={`${ENV.BASE_URL}/best-resume-builder`}
                datePublished="2026-01-01"
                dateModified="2026-01-08"
                author="Hirecta"
            />

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 text-blue-800 rounded-full text-sm font-semibold mb-6">
                            <Award className="w-4 h-4 fill-blue-600" />
                            AI-Powered • ATS-Optimized • Trusted by 50,000+
                        </div>

                        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Best Resume Builder 2026
                        </h1>
                        <p className="text-2xl text-gray-600 mb-4">
                            AI-Powered Professional Resume Maker
                        </p>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
                            Create winning resumes with advanced AI writing, voice input, and job-specific optimization. Get hired faster with resumes that actually pass ATS and impress hiring managers. Start with one of our <Link href="/templates" className="text-blue-600 hover:underline font-semibold">ATS-friendly templates</Link>.
                        </p>
                    </div>

                    {/* Value Props */}
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: <Clock className="w-6 h-6" />, text: "10-minute resume creation" },
                            { icon: <Shield className="w-6 h-6" />, text: "99% ATS pass rate. Try our Free ATS Checker", link: "/ats-checker" },
                            { icon: <TrendingUp className="w-6 h-6" />, text: "3x more interviews with AI Tailoring", link: "/tailor" }
                        ].map((item, index) => (
                            <Link key={index} href={item.link || "#"} className="flex items-center justify-center gap-3 bg-white rounded-xl p-4 border-2 border-blue-100 hover:border-blue-400 transition-all">
                                <div className="text-blue-600">{item.icon}</div>
                                <span className="font-semibold text-gray-900">{item.text}</span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mb-8">
                        <Link
                            href={ENV.EDITOR_URL}
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

            {/* Massive Long-Form Content Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 underline decoration-blue-500 decoration-4 underline-offset-8">The Anatomy of a High-Conversion Resume Builder</h2>
                        <p>
                            In the competitive landscape of 2026, a resume builder is no longer just a word processor—it's a <strong>Strategic Career Asset</strong>. The transition from legacy builders to AI-driven platforms like Hirecta marks a fundamental shift in how professionals communicate their value. When we built the <strong>Best Resume Builder</strong>, we didn't just look at design; we looked at the entire hiring ecosystem.
                        </p>

                        <div className="my-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 italic">
                            "The goal of a resume isn't to tell your life story. It's to prove that you can solve a specific set of problems for a specific company."
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why AI is the New Industry Standard for Job Seeking</h3>
                        <p>
                            Recruiters today receive an average of 250 applications per role. To manage this volume, they rely on <strong>Applicant Tracking Systems (ATS)</strong> that act as gatekeepers. The <strong>Hirecta Resume Builder</strong> is designed to bypass these bots while simultaneously captivating human readers.
                        </p>
                        <p>
                            Our AI writing assistant doesn't just 'write'—it 'engineers' content. By analyzing millions of successful job applications, our models identify the <strong>Semantic Clusters</strong> that high-performing resumes share. Whether it's the specific action verbs preferred in Finance or the technical hierarchy required for DevOps, our builder ensures your content is perfectly aligned with industry expectations.
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Quantifying Impact: The Science of Achievement Extraction</h3>
                        <p>
                            One of the biggest mistakes job seekers make is listing 'Responsibilities' instead of 'Achievements'. A responsibilities-based resume is a list of things you were supposed to do. An achievements-based resume is a list of things you actually <em>delivered</em>.
                        </p>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Outcome-Focus Rewriting</h4>
                                    <p>Our AI analyzes your input and prompts you for metrics. If you say 'Improved sales', the AI asks 'By what percentage? In what timeframe?' This creates the 'Data-First' resume that modern leaders demand.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Action-Verb Optimization</h4>
                                    <p>We replace passive language with active, high-impact verbs. Instead of 'Was responsible for', we use 'Orchestrated', 'Spearheaded', or 'Masterminded'. This changes the psychological weight of your experience.</p>
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-8">Enterprise-Grade Security and Data Sovereignty</h3>
                        <p>
                            We understand that your professional history is sensitive. Unlike other 'free' resume builders that sell candidate data to third-party aggregators, Hirecta operates on a <strong>Privacy-First Mandate</strong>.
                        </p>
                        <div className="bg-slate-900 text-white p-8 rounded-3xl my-10 relative overflow-hidden">
                            <h4 className="text-2xl font-bold mb-4">Your Data, Your Control</h4>
                            <p className="opacity-80 leading-relaxed">
                                Every resume you build is encrypted at rest and in transit. We do not store your data for 'training' public LLMs, and we never share your profile with recruiters without your explicit participation in our Talent Network. You are the customer, not the product.
                            </p>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-6">The Hirecta Advantage: A Comparison of Modern Tools</h3>
                        <p>
                            Why choose Hirecta over LinkedIn Resume Builder, Canva, or MS Word? The answer lies in the <strong>Job-specific context</strong>.
                        </p>
                        <div className="overflow-x-auto my-8">
                            <table className="min-w-full border-collapse border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 text-left font-bold text-gray-700 border-b">Feature</th>
                                        <th className="p-4 text-left font-bold text-gray-700 border-b">Hirecta</th>
                                        <th className="p-4 text-left font-bold text-gray-700 border-b">Canva/Design Tools</th>
                                        <th className="p-4 text-left font-bold text-gray-700 border-b">Word/Docs</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-4 font-medium">ATS Scoring</td>
                                        <td className="p-4 text-green-600 font-bold">Real-time</td>
                                        <td className="p-4 text-red-500">None (Often Breaks)</td>
                                        <td className="p-4 text-gray-400">Manual Check Only</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium">AI Writing</td>
                                        <td className="p-4 text-green-600 font-bold">Industry-Tuned LLM</td>
                                        <td className="p-4 text-gray-400">Generic AI</td>
                                        <td className="p-4 text-red-500">None</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium">Job Tailoring</td>
                                        <td className="p-4 text-green-600 font-bold">Auto-Keyword Match</td>
                                        <td className="p-4 text-red-500">Manual Only</td>
                                        <td className="p-4 text-red-500">Manual Only</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Start Your Journey with the Right Foundation</h3>
                        <p>
                            Whether you are a student looking for your first internship or a CEO preparing for a board-level transition, your resume is the key that opens the door. Don't settle for a 2010-era builder. Use the <strong>Best Resume Builder of 2026</strong> and leverage the power of AI to supercharge your career.
                        </p>
                        <p>
                            Ready to see the difference? Choose one of our <Link href="/templates" className="text-blue-600 hover:underline">ATS-Friendly Templates</Link> and experience the Hirecta advantage today.
                        </p>
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
                        <h3 className="text-2xl font-bold mb-4">Hirecta Checks All Boxes ✓</h3>
                        <p className="text-lg opacity-90 mb-6">
                            Plus unique features like voice input and job description matching that no other builder offers.
                        </p>
                        <Link
                            href={ENV.EDITOR_URL}
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
                        href={ENV.EDITOR_URL}
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
