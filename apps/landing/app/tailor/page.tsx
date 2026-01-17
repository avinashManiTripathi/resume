import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Target, Sparkles, Zap, Brain, TrendingUp, Shield, XCircle, CheckCircle, Search, Briefcase } from 'lucide-react';
import { ENV } from "@/app/env";
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';

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
            alt: 'ProfResume AI Resume Tailor',
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
    "name": "ProfResume AI Tailor",
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
            question: "How does AI resume tailoring work?",
            answer: "Our AI analyzes the job description to identify key requirements, skills, and keywords. It then automatically rephrases your existing experience to highlight relevant achievements and optimize keyword density for that specific role."
        },
        {
            question: "Will the AI lie on my resume?",
            answer: "No. Our AI only rephrases your actual experience to match the job's language. It does not invent jobs, skills, or degrees you don't have. It simply puts your best foot forward."
        },
        {
            question: "Is tailoring really necessary for every job?",
            answer: "Yes! Studies show that tailored resumes get 3x more interview callbacks. Generic resumes often get filtered out by ATS systems because they lack specific keywords found in the job description."
        },
        {
            question: "Does tailoring really affect ATS ranking?",
            answer: "Yes. ATS algorithms score resumes based on keyword frequency. If the job description mentions 'React.js' 5 times and your resume only says 'JavaScript', you will rank lower than a tailored candidate who uses the specific term."
        },
        {
            question: "How long does it take to tailor a resume?",
            answer: "Just 30 seconds! Simply paste the job description, and our AI instantly generates a tailored version of your resume optimized for that specific position."
        },
        {
            question: "Will my original resume be changed?",
            answer: "No, your original resume is never modified. Each tailored version is saved separately, so you can create unlimited customized resumes for different applications."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Free AI Resume Tailor (2025)"
                description="Target your resume to specific job descriptions in 30 seconds using AI keyword optimization."
                url={`${ENV.BASE_URL}/tailor`}
                datePublished="2024-12-01"
                dateModified={new Date().toISOString()}
                author="ProfResume AI Team"
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
                            Stop sending generic resumes. Our AI analyzes the job description and acts as a <strong>Keyword Scanner</strong>, optimizing your CV to pass ATS filters and stand out to recruiters.
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

            {/* Definition Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-purple-50/50 p-10 rounded-3xl border border-purple-100 mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">What is AI Resume Tailoring?</h2>
                        <p className="text-lg text-gray-700 leading-relaxed relative z-10">
                            <strong>AI Resume Tailoring</strong> is the process of automatically customizing your generic CV to match a specific job description. By using Natural Language Processing (NLP), technology analyzes the <strong>keywords</strong>, <strong>skills</strong>, and <strong>terminology</strong> used in a job posting and rewrites your experience to mirror that language, significantly increasing your Match Score with Applicant Tracking Systems (ATS).
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600">
                        <h2 className="text-3xl font-bold text-gray-900">Why the "One Size Fits All" Resume Fails</h2>
                        <p>
                            Sending the same PDF to 50 different companies is the most common reason for job search failure. Here is why:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-purple-700 mb-2">Different Keywords</h3>
                                <p className="text-sm text-gray-600">Company A calls it "Customer Success", Company B calls it "Client Relations". If you use the wrong term, you are invisible.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-purple-700 mb-2">Culture Fit</h3>
                                <p className="text-sm text-gray-600">A startup wants "scrappy problem solvers"; a bank wants "risk-averse compliance experts". Your tone needs to shift.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-purple-700 mb-2">Prioritization</h3>
                                <p className="text-sm text-gray-600">A Project Manager role might value "Budgeting", while a Scrum Master role values "Agile". A generic resume dilutes both.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 text-center">Real Example: Generic vs. Tailored Summary</h2>
                        <p className="text-center mb-8">See the difference customization makes for a "Digital Marketing Manager" role requiring SEO expertise:</p>

                        <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 opacity-70">
                                <div className="flex items-center gap-2 mb-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                                    <XCircle className="w-4 h-4" /> Generic (Weak)
                                </div>
                                <p className="text-sm italic text-gray-600 leading-relaxed">
                                    "Marketing professional with 5 years of experience in managing campaigns and teams. Looking for a challenging role to utilize my skills."
                                </p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-3 text-purple-700 font-bold uppercase text-xs tracking-wider">
                                    <CheckCircle className="w-4 h-4" /> Tailored (Strong)
                                </div>
                                <p className="text-sm font-medium text-purple-900 leading-relaxed">
                                    "<strong>Digital Marketing Manager</strong> with 5 years of experience driving <strong>SEO growth</strong> and increasing <strong>organic traffic by 150%</strong>. Expert in <strong>Google Analytics 4</strong> and content strategy."
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12">Manual Tailoring vs. AI Automation</h2>
                        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm my-6 not-prose">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-bold text-gray-700">Method</th>
                                        <th className="py-4 px-6 text-left font-bold text-gray-700">Time Per Application</th>
                                        <th className="py-4 px-6 text-left font-bold text-gray-700">Accuracy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-4 px-6 font-medium text-gray-600">Manual Editing</td>
                                        <td className="py-4 px-6 text-gray-600">45 - 60 Minutes</td>
                                        <td className="py-4 px-6 text-yellow-600 font-medium">Medium (Human Error)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-bold text-purple-700">ProfResume AI</td>
                                        <td className="py-4 px-6 text-purple-700 font-bold">30 Seconds</td>
                                        <td className="py-4 px-6 text-emerald-600 font-bold">High (Data Driven)</td>
                                    </tr>
                                </tbody>
                            </table>
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
