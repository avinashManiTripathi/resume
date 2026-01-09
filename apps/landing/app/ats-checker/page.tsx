import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Target, Shield, TrendingUp, Zap, AlertCircle, FileText, Award, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free ATS Resume Checker - Test Your Resume Score Instantly | ProfResume',
    description: 'Check if your resume passes Applicant Tracking Systems (ATS). Get instant AI-powered analysis, ATS compatibility score, and detailed recommendations. 100% free, no sign-up required.',
    keywords: 'ATS checker, ATS resume scanner, applicant tracking system, resume ATS test, ATS score, resume compatibility',
    alternates: {
        canonical: 'https://profresume.com/ats-checker',
    },
    openGraph: {
        title: 'Free ATS Resume Checker - Test Your Resume Score',
        description: 'Check if your resume passes ATS systems. Get instant AI-powered analysis and detailed recommendations. 100% free, no sign-up required.',
        url: 'https://profresume.com/ats-checker',
        type: 'website',
    },
};

const baseUrl = "https://profresume.com";

// Breadcrumb Schema
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "ATS Checker",
            "item": `${baseUrl}/ats-checker`
        }
    ]
};

// WebPage Schema
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free ATS Resume Checker",
    "description": "Check if your resume passes Applicant Tracking Systems (ATS). Get instant AI-powered analysis, ATS compatibility score, and detailed recommendations.",
    "url": `${baseUrl}/ats-checker`,
    "inLanguage": "en-US",
    "isPartOf": {
        "@type": "WebSite",
        "name": "ProfResume",
        "url": baseUrl
    }
};

// SoftwareApplication Schema
const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProfResume ATS Checker",
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
        "ratingCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
    },
    "description": "Free AI-powered ATS resume checker that analyzes your resume for compatibility with Applicant Tracking Systems. Get instant feedback on formatting, keywords, and optimization suggestions.",
    "featureList": [
        "ATS Compatibility Score",
        "Keyword Analysis",
        "Format Check",
        "AI-Powered Suggestions",
        "Detailed Feedback",
        "100% Free Forever"
    ]
};

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is an ATS resume checker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "An ATS resume checker is a tool that analyzes your resume to determine how well it will perform in Applicant Tracking Systems (ATS). It checks for formatting issues, keyword optimization, and overall compatibility with ATS software used by employers to screen candidates."
            }
        },
        {
            "@type": "Question",
            "name": "How does the ATS checker work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our ATS checker uses advanced AI to simulate how real Applicant Tracking Systems process resumes. Upload your resume (PDF or DOCX) and get an instant compatibility score, keyword analysis, formatting feedback, and specific recommendations to improve your resume's ATS performance."
            }
        },
        {
            "@type": "Question",
            "name": "Is the ATS checker really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our ATS resume checker is completely free to use with no hidden costs, no credit card required, and no watermarks. Upload your resume and get comprehensive analysis instantly."
            }
        },
        {
            "@type": "Question",
            "name": "Why do I need an ATS-friendly resume?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "95% of Fortune 500 companies and 68% of all employers use ATS to manage hiring. 75% of resumes are rejected by ATS before reaching human recruiters. An ATS-friendly resume significantly increases your chances of getting past the initial screening and landing interviews."
            }
        },
        {
            "@type": "Question",
            "name": "What file formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support PDF (.pdf) and Microsoft Word (.docx) file formats. These are the most common resume formats and are widely accepted by ATS systems."
            }
        },
        {
            "@type": "Question",
            "name": "What does the ATS checker analyze?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our ATS checker analyzes multiple aspects: contact information completeness, section structure and headers, formatting compatibility (tables, columns, fonts), keyword optimization, quantifiable achievements, action verbs, and overall ATS compatibility. You'll receive a detailed score and specific recommendations."
            }
        }
    ]
};

export default function ATSCheckerMarketingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                            <Target className="w-4 h-4" />
                            Free AI-Powered ATS Analysis
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                            Is Your Resume{' '}
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ATS-Friendly?
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            75% of resumes are rejected by Applicant Tracking Systems before reaching human recruiters.
                            Check your resume's ATS compatibility score in 30 seconds - completely free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="https://edit.profresume.com/ats-check"
                                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all group"
                            >
                                Check My Resume Score
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#what-is-ats"
                                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all inline-flex items-center justify-center"
                            >
                                Learn About ATS
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600">95%</div>
                            <div className="text-sm text-gray-600 mt-1">Fortune 500 Use ATS</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600">75%</div>
                            <div className="text-sm text-gray-600 mt-1">Resumes Rejected</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600">30s</div>
                            <div className="text-sm text-gray-600 mt-1">Get Your Score</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is ATS Section */}
            <section id="what-is-ats" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            What is an Applicant Tracking System (ATS)?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Understanding ATS is crucial for modern job seekers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Digital Gatekeeper</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    An <strong>Applicant Tracking System (ATS)</strong> is software used by employers to collect,
                                    sort, scan, and rank job applications. Think of it as a digital gatekeeper that filters resumes
                                    before they ever reach human recruiters.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    The ATS scans your resume for specific keywords, formatting, and structure. Resumes that pass
                                    the screening (typically scoring 70%+ compatibility) get forwarded to recruiters. Those that don't?
                                    They're automatically rejected - often within seconds.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-4">
                                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <AlertCircle className="w-6 h-6 text-red-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">75% Rejection Rate</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Most resumes are rejected by ATS before ever reaching a human recruiter
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <BarChart3 className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">88% Employer Usage</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Companies with 100+ employees use some form of ATS software
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Target className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">6-7 Second Scan</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Average time an ATS takes to scan and score your entire resume
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular ATS Systems */}
                    <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Popular ATS Systems</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {['Greenhouse', 'Lever', 'Workday', 'iCIMS', 'Taleo', 'BambooHR', 'SmartRecruiters', 'JazzHR'].map((ats, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                                    <p className="font-semibold text-gray-900">{ats}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How Our Checker Works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            How Our ATS Checker Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            AI-powered analysis that simulates real ATS systems
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <FileText className="w-8 h-8" />,
                                title: '1. Upload Your Resume',
                                description: 'Simply drag and drop your PDF or Word resume. We support all standard formats and parse them just like a real ATS would.',
                                color: 'indigo'
                            },
                            {
                                icon: <Target className="w-8 h-8" />,
                                title: '2. AI Analysis',
                                description: 'Our AI scans for keywords, checks formatting, analyzes section structure, and identifies ATS deal-breakers that cause rejections.',
                                color: 'purple'
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8" />,
                                title: '3. Get Your Score',
                                description: 'Receive a comprehensive ATS compatibility score (0-100) with detailed breakdowns for contact info, experience, skills, and formatting.',
                                color: 'blue'
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: '4. Apply Recommendations',
                                description: 'Get specific, actionable suggestions to improve your score. Fix issues and re-check as many times as you want - completely free.',
                                color: 'green'
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all">
                                <div className={`w-16 h-16 bg-${step.color}-100 rounded-xl flex items-center justify-center text-${step.color}-600 mb-6`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Common ATS Mistakes */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Common ATS Mistakes That Get Resumes Rejected
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Avoid these deal-breakers to improve your chances
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                mistake: 'Using Tables & Text Boxes',
                                problem: 'Most ATS can\'t read content inside tables or text boxes',
                                solution: 'Use simple, single-column formatting with standard bullet points'
                            },
                            {
                                mistake: 'Creative Section Headers',
                                problem: 'Headers like "My Journey" confuse ATS algorithms',
                                solution: 'Use standard headers: Work Experience, Education, Skills'
                            },
                            {
                                mistake: 'Images & Graphics',
                                problem: 'ATS can\'t read text embedded in images or graphics',
                                solution: 'All content should be actual text, not images'
                            },
                            {
                                mistake: 'Exotic Fonts',
                                problem: 'Fancy fonts turn your resume into gibberish for ATS',
                                solution: 'Stick to Arial, Calibri, Georgia, or Times New Roman'
                            },
                            {
                                mistake: 'Missing Keywords',
                                problem: 'No keywords from job description = no ATS match',
                                solution: 'Mirror language from job posting throughout your resume'
                            },
                            {
                                mistake: 'Complex Formatting',
                                problem: 'Multiple columns and unusual layouts confuse parsing',
                                solution: 'Keep it simple with single-column, chronological layout'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-600">
                                <h3 className="text-lg font-bold text-red-900 mb-2">❌ {item.mistake}</h3>
                                <p className="text-gray-700 mb-3">
                                    <strong>Problem:</strong> {item.problem}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="text-green-700">✓ Solution:</strong> {item.solution}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Why Use Our ATS Resume Checker?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: '100% Free Forever',
                                description: 'No hidden costs, no watermarks, no credit card required. Check unlimited resumes.'
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6" />,
                                title: 'AI-Powered Analysis',
                                description: 'Advanced AI simulates real ATS systems used by Fortune 500 companies.'
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: 'Instant Results',
                                description: 'Get your ATS compatibility score and recommendations in 30 seconds.'
                            },
                            {
                                icon: <CheckCircle className="w-6 h-6" />,
                                title: 'Actionable Suggestions',
                                description: 'Specific recommendations on what to fix and how to fix it.'
                            },
                            {
                                icon: <Award className="w-6 h-6" />,
                                title: 'No Sign-up Required',
                                description: 'Start checking immediately. No account creation needed.'
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: 'Private & Secure',
                                description: 'Your resume is never stored. Complete privacy guaranteed.'
                            }
                        ].map((benefit, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to Check Your ATS Score?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join 50,000+ job seekers who've improved their resumes with our free ATS checker
                    </p>
                    <Link
                        href="https://edit.profresume.com/ats-check"
                        className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
                    >
                        Check My Resume Now - Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-indigo-200 mt-4 text-sm">
                        ✓ No sign-up required  ✓ Results in 30 seconds  ✓ 100% free
                    </p>
                </div>
            </section>
        </div>
    );
}
