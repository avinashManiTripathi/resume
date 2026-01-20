import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, FileText, Sparkles, Zap, Clock, Brain, Target, Download, Mail, PenTool, CheckCircle, XCircle, BookOpen, MessageSquare, Shield } from 'lucide-react';
import { ENV } from "@/app/env";
import { URLS } from '@/constants/urls';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';

export const metadata: Metadata = {
    title: 'Free AI Cover Letter Generator 2026 | Write a Letter in 2 Minutes',
    description: 'Struggling to write a cover letter? Use our free AI generator to write a personalized, persuasive application letter that matches your resume and job description.',
    keywords: [
        'AI Cover Letter Writer',
        'Free Cover Letter Generator',
        'Application Letter Builder',
        'Cover Letter for Resume',
        'Job Application Email Writer',
        'GPT Cover Letter',
        'cover letter builder free',
        'write my cover letter ai'
    ],
    alternates: {
        canonical: `${ENV.BASE_URL}/cover-letter`,
    },
    openGraph: {
        title: 'Write a Perfect Cover Letter in Seconds with AI',
        description: 'No more writer\'s block. Paste the job description and let AI write your winning pitch tailored to your resume.',
        url: '/cover-letter',
        type: 'website',
        images: [{
            url: '/og-cover-letter.jpg',
            width: 1200,
            height: 630,
            alt: 'Hirecta AI Cover Letter Generator',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free AI Cover Letter Generator 2026',
        description: 'Generate tailored cover letters with AI. Instant, professional, free.',
        images: ['/og-cover-letter.jpg'],
    },
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta AI Cover Letter",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1850"
    },
    "review": [
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Sarah Jenkins"
            },
            "reviewBody": "This AI tool wrote a better cover letter in 2 minutes than I could in 2 hours. Got the interview!"
        },
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Michael Chen"
            },
            "reviewBody": "Perfectly matched my resume skills to the job description. Highly recommend for anyone struggling with writing."
        }
    ]
};

export default function CoverLetterPage() {
    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Cover Letter Generator", url: `${ENV.BASE_URL}/cover-letter` }
    ];

    const faqs = [
        {
            question: "Is a cover letter mandatory in 2026?",
            answer: "While many listings say 'optional', 47% of recruiters say they will reject applications without one. Even if optional, it is the best way to explain gaps in employment, career changes, or passion for the company that a resume cannot convey."
        },
        {
            question: "Is the cover letter generator really free?",
            answer: "Yes! Create unlimited cover letters completely free with no hidden costs, watermarks, or credit card required. You can download as many PDF versions as you need."
        },
        {
            question: "How does the AI generate cover letters?",
            answer: "Our AI analyzes the keywords in the job description and matches them with the skills in your resume. It then constructs a persuasive narrative using the 'Hook-Pitch-Close' structure used by professional copywriters."
        },
        {
            question: "Can I edit the generated cover letter?",
            answer: "Absolutely! The AI provides a strong first draft (about 90% done). You can review, edit, and personalize every sentence before downloading the final PDF."
        },
        {
            question: "Should I send my cover letter as a PDF or in the email body?",
            answer: "If applying through an official portal (like Workday or Greenhouse), attach it as a PDF. If you are emailing a hiring manager or recruiter directly, paste the text into the body of the email for better readability."
        },
        {
            question: "How long should a cover letter be?",
            answer: "Keep it under 300 words or about half a page. Recruiters do not have time to read a full-page essay. Our generator automatically optimizes for this ideal length."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Free AI Cover Letter Generator 2026"
                description="Generate perfectly tailored cover letters instantly with AI. Match any job, professionally written, instant PDF download."
                url={`${ENV.BASE_URL}/cover-letter`}
                datePublished="2024-11-25"
                dateModified={new Date().toISOString()}
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />

            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-teal-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Writing Assistant
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Generate Perfect Cover Letters{' '}
                            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                in 2 Minutes
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Stop staring at a blank page. Paste the job description, and let our AI write a personalized, persuasive letter that proves you're the perfect fit.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={URLS.EDITOR_COVER_LETTER}
                                target="_blank"
                                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-green-700 shadow-xl hover:shadow-green-500/20 transition-all hover:-translate-y-1"
                            >
                                Write My Cover Letter
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#templates"
                                className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all inline-flex items-center justify-center"
                            >
                                View Examples
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 divide-x divide-slate-200">
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-green-600">2min</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">Average Time</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-green-600">100%</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">Free to Use</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-green-600">40%</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">Higher Response Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Definition Section / SEO Content */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-green-50/50 p-10 rounded-3xl border border-green-100 mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">What is an AI Cover Letter Generator?</h2>
                        <p className="text-lg text-gray-700 leading-relaxed relative z-10">
                            An <strong>AI Cover Letter Generator</strong> is an advanced writing tool that uses Large Language Models (LLMs) to draft a personalized job application letter in seconds. By analyzing your resume and the specific job description, it creates a unique narrative that connects your past skills to the company's future needs, eliminating hours of writer's block.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600">
                        <h2 className="text-3xl font-bold text-gray-900">The Anatomy of a Winning Cover Letter</h2>
                        <p>
                            A generic "To Whom It May Concern" letter gets ignored. Our generator follows the proven 3-paragraph structure used by top career coaches:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-green-100 rounded text-center text-sm leading-6">1</div> The "Hook"
                                </h3>
                                <p className="text-sm text-gray-600">Don't start boring. We help you open with a strong achievement or a reason why you admire the company.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-green-100 rounded text-center text-sm leading-6">2</div> The "Pitch"
                                </h3>
                                <p className="text-sm text-gray-600">This is the meat. We connect your top 3 Resume Skills directly to the 3 main requirements in the Job Description.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-green-100 rounded text-center text-sm leading-6">3</div> The "Close"
                                </h3>
                                <p className="text-sm text-gray-600">Confidently request an interview. We provide polite but firm closing statements that get responses.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12">Cover Letter vs. Resume: What's the Difference?</h2>
                        <p>Many candidates simply repeat their resume in paragraph form. This is a mistake.</p>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-6 not-prose">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                                    <div>
                                        <strong className="text-gray-900 block">Resume (Past Tense)</strong>
                                        <span className="text-gray-600">A factual history of <em>what</em> you did. "Managed a team of 10."</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                    <div>
                                        <strong className="text-gray-900 block">Cover Letter (Future Tense)</strong>
                                        <span className="text-gray-600">A persuasive pitch of <em>how</em> you will help the company. "I will use my management experience to scale your operations."</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Steps */}
            <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Three simple steps to your perfect cover letter
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Choose a Template',
                                description: 'Select from professional, creative, or technical cover letter templates designed to match our resumes.',
                                icon: <FileText className="w-8 h-8" />,
                                color: 'green'
                            },
                            {
                                step: '2',
                                title: 'Paste Job Description',
                                description: 'Add the job posting or company details. Our AI analyzes requirements and crafts a personalized letter.',
                                icon: <Brain className="w-8 h-8" />,
                                color: 'blue'
                            },
                            {
                                step: '3',
                                title: 'Download & Send',
                                description: 'Review your cover letter, make final tweaks, and download as a formatted PDF. Ready to apply!',
                                icon: <Download className="w-8 h-8" />,
                                color: 'purple'
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className={`w-16 h-16 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Common Mistakes */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">5 Cover Letter Mistakes to Avoid</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-6 bg-rose-50 rounded-xl border border-rose-100">
                            <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                            <div>
                                <h4 className="font-bold text-rose-900">Repeating your resume</h4>
                                <p className="text-sm text-rose-800 mt-1">Don't just list facts. Tell a story about a specific win.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-rose-50 rounded-xl border border-rose-100">
                            <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                            <div>
                                <h4 className="font-bold text-rose-900">"To Whom It May Concern"</h4>
                                <p className="text-sm text-rose-800 mt-1">Lazy. Find the manager's name or use "Dear [Department] Team".</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-rose-50 rounded-xl border border-rose-100">
                            <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                            <div>
                                <h4 className="font-bold text-rose-900">Making it too long</h4>
                                <p className="text-sm text-rose-800 mt-1">Recruiters scan. Keep it under 300 words or 3 short paragraphs.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-rose-50 rounded-xl border border-rose-100">
                            <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                            <div>
                                <h4 className="font-bold text-rose-900">Focusing on yourself</h4>
                                <p className="text-sm text-rose-800 mt-1">Don't say "I want this job because...". Say "I can help you by...".</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visible FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600">Everything you need to know about cover letters.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group border-b border-gray-200 pb-6 pt-6 first:pt-0">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 text-lg list-none hover:text-green-600 transition-colors">
                                    {faq.question}
                                    <span className="transition duration-300 group-open:rotate-180">
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed pr-8">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Ready to Land the Interview?
                    </h2>
                    <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                        Don't let a generic application hold you back. Create a tailored cover letter in minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={URLS.EDITOR_COVER_LETTER}
                            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105 transition-all group"
                        >
                            <PenTool className="w-5 h-5" />
                            Generate Cover Letter Free
                        </Link>
                        <Link
                            href="/resume-builder"
                            className="bg-green-800/50 backdrop-blur-sm border border-green-500/50 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center hover:bg-green-800 transition-all"
                        >
                            Need a Resume First?
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
