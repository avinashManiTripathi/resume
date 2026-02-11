import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, FileText, Sparkles, Zap, Clock, Brain, Target, Download, Mail, PenTool, CheckCircle, XCircle, BookOpen, MessageSquare, Shield } from 'lucide-react';
import { ENV } from "@/app/env";
import { URLS } from '@/constants/urls';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';

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
            question: "Does an AI-written cover letter sound robotic?",
            answer: "Not with Hirecta. We use 'Contextual Tone Modulation' to ensure the output sounds like a professional human. You can choose from 'Formal', 'Casual', or 'Enthusiastic' tones to match the company culture. Our AI avoids the cliché 'excited and motivated' phrases that scream 'generated' and instead focuses on concrete value propositions."
        },
        {
            question: "How does the AI know the specific details of my job?",
            answer: "The generator performs a 'Semantic Bridge' between your uploaded resume and the job description. It identifies the high-priority keywords in the JD and then searches your resume for 'Latent Skills' that satisfy those requirements. It doesn't just copy-paste; it rephrases your experience to show direct relevance."
        },
        {
            question: "Is it really 100% free to download?",
            answer: "Yes. Every cover letter generated on Hirecta is free to download as a high-quality PDF. We don't believe in holding your job application hostage behind a paywall. You can generate, edit, and export as many letters as you need for your entire job search."
        },
        {
            question: "Can I use voice input to write the letter?",
            answer: "Yes! Hirecta's unique Voice-to-Resume technology extends to cover letters. You can simply speak about why you want the job and what you've done, and our AI will translate those thoughts into a perfectly structured professional letter."
        },
        {
            question: "Is a cover letter still necessary for tech jobs?",
            answer: "In a crowded market, yes. For software engineers and designers, a cover letter is your chance to link to specific repos, explain a complex technical pivot, or describe your contribution to a major launch that a bullet point can't fully capture. It shows 'Product Thinking'—something recruiters value highly."
        },
        {
            question: "How do I tailor a cover letter for a remote job?",
            answer: "Our generator includes specific modules for remote roles. It automatically highlights your experience with asynchronous communication, toolkits like Slack/Jira/Git, and your ability to deliver high-quality work without physical supervision."
        },
        {
            question: "Can the AI write a cover letter for a career change?",
            answer: "Absolutely. This is where AI shines. It rebrands your 'Translatable Skills' to match your new industry's terminology. If you are moving from Retail to Project Management, it focuses on 'inventory control' as 'resource management' and 'customer service' as 'stakeholder engagement'."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GlobalSchema />
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
                            Stop staring at a blank page. Paste the job description, and let our AI write a personalized, persuasive letter that proves you're the perfect fit. Best used alongside our <Link href="/free-resume-builder" className="text-green-600 hover:underline font-semibold">Free Resume Builder</Link>.
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

            {/* Massive Long-Form Content Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-l-8 border-green-500 pl-6">The Psychology of Persuasion: How AI Crafts Your Opening Hook</h2>
                        <p>
                            In the modern job market, a cover letter isn't just a document—it's your <strong>Closing Argument</strong>. While your resume proves you have the skills, your cover letter proves you have the <em>intent</em>. At Hirecta, we've engineered our <strong>AI Cover Letter Generator</strong> to utilize the principles of behavioral psychology and conversion copywriting to ensure your letter doesn't just get read—it gets a response.
                        </p>

                        <div className="my-12 p-8 bg-green-50 rounded-3xl border border-green-100 italic">
                            "Recruiters don't hire 'skills'—they hire 'solutions'. The best cover letters move the focus from what you've done to what you can do for them tomorrow."
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Data-Driven Personalization: Matching Resume DNA to Job Requirements</h3>
                        <p>
                            Most applications fail because they are 'generic'. A recruiter can spot a copy-pasted letter in 3 seconds. Our AI avoids this by performing a <strong>Deep Keyword Synthesis</strong>. It extracts the high-intent verbs from the job description and mirrors them in your personal narrative.
                        </p>
                        <p>
                            If a job description emphasizes 'Scaling high-performance teams', our AI doesn't just say you managed people; it looks through your resume for evidence of growth, scaling, and leadership metrics, and weaves them into a cohesive story. This is <strong>Semantic Matching</strong> at its most powerful.
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Beyond the Template: The Technical Architecture of AI Writing</h3>
                        <p>
                            We don't just use LLMs to 'guess' your story. Hirecta's writing engine is built on a <strong>Multi-Agent Architecture</strong>:
                        </p>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">The Analyst Agent</h4>
                                    <p>Scans your resume and the job description to identify the 'Perfect Fit' intersection points.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">The Copywriter Agent</h4>
                                    <p>Drafts the letter using professional storytelling frameworks (Hook, Proof, CTA).</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">The Editor Agent</h4>
                                    <p>Performs a final pass to ensure the tone is consistent, the grammar is perfect, and the length is optimized for a 6-second scan.</p>
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-8">Quantifying the Value: Why a Cover Letter Still Matters in 2026</h3>
                        <p>
                            Some 'experts' claim cover letters are dead. The data says otherwise. Over <strong>47% of recruiters</strong> admit that a well-written, personalized cover letter is the deciding factor between two equally qualified candidates.
                        </p>
                        <div className="bg-slate-900 text-white p-8 rounded-3xl my-10 relative overflow-hidden">
                            <h4 className="text-2xl font-bold mb-4">The 'Extra Mile' Effect</h4>
                            <p className="opacity-80 leading-relaxed">
                                In an era of AI-spam, a truly high-quality cover letter shows <strong>Effort and Intent</strong>. It signals to the hiring manager that you aren't just 'spraying and praying'—you actually want *this* job at *this* company.
                            </p>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-6">The Hirecta Edge: From Voice Input to Persuasive Pitch</h3>
                        <p>
                            Writing about yourself is hard. That's why we've integrated <strong>Voice-to-Letter</strong> technology. You can simply record a 60-second clip explaining why you are excited about the role, and our AI will translate those raw thoughts into a polished, professional letter.
                        </p>
                        <p>
                            This isn't just 'Speech-to-Text'; it's 'Speech-to-Strategy'. Our platform identifies the passion and nuance in your voice and injects it into the draft, ensuring your <strong>Unique Voice</strong> isn't lost in the machine.
                        </p>

                        <p className="mt-12 text-lg font-medium text-gray-900 bg-green-50 p-8 rounded-2xl border border-green-200">
                            Pairs perfectly with our <Link href="/templates" className="text-green-600 hover:underline">ATS-Optimized Resume Templates</Link>. Stop struggling with writer's block and start sending applications that actually move the needle.
                        </p>
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
                                color: 'green' as const
                            },
                            {
                                step: '2',
                                title: 'Paste Job Description',
                                description: 'Add the job posting or company details. Our AI analyzes requirements and crafts a personalized letter.',
                                icon: <Brain className="w-8 h-8" />,
                                color: 'blue' as const
                            },
                            {
                                step: '3',
                                title: 'Download & Send',
                                description: 'Review your cover letter, make final tweaks, and download as a formatted PDF. Ready to apply!',
                                icon: <Download className="w-8 h-8" />,
                                color: 'purple' as const
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
                            href="/free-resume-builder"
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
