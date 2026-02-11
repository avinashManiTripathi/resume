import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Target, Sparkles, Zap, Brain, TrendingUp, Shield, XCircle, CheckCircle, Search, Briefcase } from 'lucide-react';
import { ENV } from "@/app/env";
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Free AI Resume Tailor | Customize Your CV for Any Job (2025)',
    description: 'Target your resume to specific job descriptions in 30 seconds. Our AI keyword scanner ensures you pass ATS filters and get more interviews. Try it free.',
    keywords: [
        'Resume Tailor',
        'Job Description Matcher',
        'ATS Keyword Scanner',
        'Targeted Resume Builder',
        'Custom Resume Generator',
        'Optimize Resume for Job',
        'tailor resume to job description free',
        'ai resume optimizer'
    ],
    alternates: {
        canonical: `${ENV.BASE_URL}/tailor`,
    },
    openGraph: {
        title: 'Customize Your Resume for Any Job Instantly',
        description: 'Don\'t use a generic resume. Tailor your CV to the specific job description to triple your interview chances.',
        url: '/tailor',
        type: 'website',
        images: [{
            url: '/og-tailor.jpg',
            width: 1200,
            height: 630,
            alt: 'Hirecta AI Resume Tailor',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free AI Resume Tailor | Match Any Job Description',
        description: 'Tailor your resume to any job with AI. Increase interview chances by 3x.',
        images: ['/og-tailor.jpg'],
    },
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta AI Tailor",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1540"
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
                "name": "David Miller"
            },
            "reviewBody": "My callback rate tripled after using this tool to tailor my resume keywords. Found a job in 2 weeks."
        },
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Emily Zhang"
            },
            "reviewBody": "Simple, fast, and effectively bypasses ATS filters. A game changer for job hunting in 2025."
        }
    ]
};

export default function TailorPage() {
    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "AI Resume Tailor", url: `${ENV.BASE_URL}/tailor` }
    ];

    const faqs = [
        {
            question: "How does AI resume tailoring actually work?",
            answer: "Our AI utilizes Large Language Models (LLMs) to perform a multi-stage analysis. First, it extracts core requirements from the job description. Second, it identifies the 'semantic gaps' in your current resume. Finally, it rephrases your professional achievements to highlight the exact skills the recruiter is looking for, without changing the underlying truth of your experience."
        },
        {
            question: "Is tailoring really worth the effort for every application?",
            answer: "In the 2026 job market, yes. Most companies use Applicant Tracking Systems (ATS) that assign a numerical 'Relevancy Score' to your application. A generic resume rarely scores above 50%, while a tailored resume consistently hits 85-95%. This difference is often what determines whether a human recruiter ever sees your file."
        },
        {
            question: "Will the AI invent experiences I don't have?",
            answer: "Absolutely not. Hirecta's AI is programmed with 'Strict Integrity' guards. It focuses on remapping your existing accomplishments to the job's terminology. If the JD asks for 'Agile Leadership' and you wrote 'Scrum Management', the AI bridges that gap. It will never add a degree or a job title that isn't in your source document."
        },
        {
            question: "Does the Hirecta Tailor tool work for international jobs?",
            answer: "Yes. Our AI understands regional variations in professional terminology (e.g., 'CV' vs 'Resume', 'Chartered' vs 'Certified'). It can optimize your resume for markets in the UK, USA, EU, and Asia-Pacific by adjusting language nuances and formatting expectations."
        },
        {
            question: "How long does the average tailoring session take?",
            answer: "With our automation, it takes less than 45 seconds. Traditional manual tailoring—reading the JD, highlighting keywords, and rewriting bullet points—usually takes a human 45-60 minutes per job. We save you hours of work every week."
        },
        {
            question: "Can I use the tailored resume as a LinkedIn summary?",
            answer: "While the tailored resume is specific to one job, the 'Professional Summary' generated by our AI is often perfect for a LinkedIn 'About' section if you are targeting a specific niche or industry. It ensures your profile is discoverable by recruiters searching for those specific high-intent keywords."
        },
        {
            question: "Is my data private when using the AI Tailor?",
            answer: "Privacy is a core pillar of Hirecta. Your resume data is encrypted end-to-end. We do not use your personal information to train public AI models, and we never share your data with external recruiters without your explicit permission. You are in full control of your professional identity."
        },
        {
            question: "What is a 'LSI Keyword' and why does Hirecta use them?",
            answer: "Latent Semantic Indexing (LSI) keywords are terms that are contextually related to your main skill. For example, if you list 'Python', LSI keywords include 'Pandas', 'NumPy', and 'Scripting'. Modern ATS use LSI to verify expertise. Our tailor tool ensures these supporting terms are present, proving to the bot that you aren't just 'keyword stuffing'."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Free AI Resume Tailor (2025)"
                description="Target your resume to specific job descriptions in 30 seconds using AI keyword optimization."
                url={`${ENV.BASE_URL}/tailor`}
                datePublished="2024-12-01"
                dateModified={new Date().toISOString()}
                author="Hirecta AI Team"
            />
            <FAQSchema faqs={faqs} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />

            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                            <Target className="w-4 h-4" />
                            AI-Powered Customization
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Tailor Your Resume to{' '}
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Any Job in 30 Seconds
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Stop sending generic resumes. Our AI analyzes the job description and acts as a <strong>Keyword Scanner</strong>, optimizing your CV to pass ATS filters and stand out to recruiters. You can verify your results with our <Link href="/ats-checker" className="text-purple-600 hover:underline font-semibold">Free ATS Checker</Link>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={ENV.EDITOR_URL}
                                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-purple-700 shadow-xl hover:shadow-purple-500/20 transition-all hover:-translate-y-1"
                            >
                                Tailor My Resume Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all inline-flex items-center justify-center"
                            >
                                See How It Works
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 divide-x divide-slate-200">
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-purple-600">3x</div>
                            <div className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">More Interviews</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-purple-600">30s</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">To Optimize</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-purple-600">95%</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">ATS Match Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Strategy Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">The Deep Logic of Semantic Resume Tailoring</h2>
                        <p>
                            In the modern job market, a resume is no longer just a document—it's a dataset. When you apply for a role, the <strong>Applicant Tracking System (ATS)</strong> doesn't just look for words; it looks for <em>relationships</em>. This is where <strong>AI Resume Tailoring</strong> moves beyond simple keyword matching and into the realm of <strong>Predictive Analytics</strong>.
                        </p>

                        <div className="my-12 p-8 bg-purple-50 rounded-3xl border border-purple-100 italic">
                            "The difference between a 'good enough' resume and a 'perfect' resume is often a matter of 2-3 specific semantic clusters that the recruiter hasn't even consciously realized they are looking for."
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How to Beat the ATS 'Relevancy' Score</h3>
                        <p>
                            Most enterprise-level ATS software (like Workday or Oracle Taleo) works on a scoring system. They extract text, normalize it, and compare it to the 'Ideal Candidate Profile' derived from the job description. Our <strong>AI Tailor</strong> helps you hack this score using three core techniques:
                        </p>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Terminology Alignment</h4>
                                    <p>If the job description uses 'Cross-functional Collaboration' but your resume says 'Teamwork', the machine might assign a lower confidence score. Our AI maps these synonyms instantly.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Skill Hierarchy Mapping</h4>
                                    <p>Recruiters weigh skills differently. The AI identifies which skills are 'Must-Haves' vs 'Nice-to-Haves' based on their placement and frequency in the JD, ensuring your resume prioritizes the right data.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Gap Analysis</h4>
                                    <p>We don't just rewrite your resume; we tell you what's missing. If a role requires 'AWS Certification' and you don't have it, our tool flags this as a critical gap to address before applying.</p>
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-8">Role-Specific Tailoring Strategies</h3>
                        <p>Tailoring isn't a monolith. Different industries require different AI-driven approaches:</p>

                        <div className="space-y-8 my-10 not-prose">
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Zap className="text-yellow-500 w-5 h-5" /> Tech & Software Engineering
                                </h4>
                                <p className="text-gray-600 mb-4">Focus on <strong>Stack Specificity</strong>. The AI ensures your specific frameworks (e.g., 'React 18', 'Next.js 14') are highlighted over generic 'Web Development' terms. It also checks for 'Tooling Keywords' like Docker, CI/CD, and Jira.</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Briefcase className="text-blue-500 w-5 h-5" /> Executive & Management
                                </h4>
                                <p className="text-gray-600 mb-4">Focus on <strong>Action & ROI</strong>. For leadership roles, tailoring isn't about skills; it's about scale. The AI rephrases bullet points to lead with outcomes (e.g., 'Scaled revenue', 'Optimized budget', 'Led transformation').</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Search className="text-emerald-500 w-5 h-5" /> Marketing & Sales
                                </h4>
                                <p className="text-gray-600 mb-4">Focus on <strong>Channels & Conversions</strong>. The tailor tool identifies the specific platforms mentioned (TikTok, Google Ads, HubSpot) and ensures your experience with those exact tools is front and center.</p>
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-6">The Future of AI Recruitment: Staying Ahead of the Curve</h3>
                        <p>
                            By 2027, it is estimated that 90% of mid-to-large size companies will use AI to perform the initial candidate screening. This isn't 'cheating'; it's 'communicating.' When you use a <strong>Tailored Resume Builder</strong>, you are simply speaking the same language as the recruiter. You are making it easier for them to hire you by removing the friction of manual data interpretation.
                        </p>
                        <p>
                            Combined with a high-impact <Link href="/templates" className="text-purple-600 hover:underline">ATS-Friendly Template</Link>, tailoring becomes your 'unfair advantage' in an overcrowded job market. Don't let your dream job go to someone less qualified simply because they understood the algorithm better than you did.
                        </p>

                        <div className="mt-16 bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/20 to-transparent"></div>
                            <h4 className="text-2xl font-bold mb-4 relative z-10">Data Integrity & Privacy</h4>
                            <p className="text-gray-400 mb-6 relative z-10">
                                We believe in <strong>Human-Centric AI</strong>. Your data is your property. Hirecta's AI is a tool to empower your voice, not replace it. Every edit we suggest is reversible, and every version you create is protected by our enterprise-grade security protocols.
                            </p>
                            <Link href={ENV.EDITOR_URL} className="inline-flex items-center gap-2 text-white font-bold bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-500 transition-colors relative z-10">
                                Start Secure Tailoring <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Three simple steps to a perfectly tailored resume
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Paste Job Description',
                                description: 'Copy and paste the job posting. Our AI instantly analyzes requirements, skills, and important keywords.',
                                icon: <Search className="w-8 h-8" />,
                                color: 'purple'
                            },
                            {
                                step: '2',
                                title: 'AI Analyzes & Optimizes',
                                description: 'Our AI matches your experience to job requirements, highlights relevant skills, and optimizes for ATS compatibility.',
                                icon: <Brain className="w-8 h-8" />,
                                color: 'blue'
                            },
                            {
                                step: '3',
                                title: 'Download & Apply',
                                description: 'Get your tailored resume instantly. Download as PDF and apply with confidence knowing it\'s optimized for that specific job.',
                                icon: <Zap className="w-8 h-8" />,
                                color: 'green'
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

            {/* Benefits */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Why Tailor Your Resume?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Stand out from hundreds of applicants with a resume built for each specific role
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: 'Pass ATS Filters',
                                description: 'Beat applicant tracking systems with optimized keywords and formatting that gets past automated screening.'
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6" />,
                                title: '3x More Interviews',
                                description: 'Tailored resumes get significantly more responses. Match job requirements and stand out from generic applications.'
                            },
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: 'Highlight Relevant Skills',
                                description: 'Automatically emphasize the experience and skills most relevant to each specific job opportunity.'
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: 'Save Hours of Time',
                                description: 'No more manual editing for each application. Get a perfectly tailored resume in 30 seconds.'
                            },
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: 'Match Job Requirements',
                                description: 'Our AI ensures your resume addresses all key requirements mentioned in the job posting.'
                            },
                            {
                                icon: <Brain className="w-6 h-6" />,
                                title: 'Smart Keyword Optimization',
                                description: 'Automatically includes industry-specific keywords and phrases that recruiters are looking for.'
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 border-2 border-white hover:border-purple-300 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visible FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600">Everything you need to know about AI Resume Tailoring.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group border-b border-gray-200 pb-6 pt-6 first:pt-0">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 text-lg list-none hover:text-purple-600 transition-colors">
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
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to Get More Interviews?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Start tailoring your resume today and see the difference it makes
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={ENV.EDITOR_URL}
                            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all group"
                        >
                            Tailor Your Resume Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/ats-checker"
                            className="bg-purple-800/50 backdrop-blur-sm border border-purple-500/50 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center hover:bg-purple-800 transition-all"
                        >
                            Check ATS Score First
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
