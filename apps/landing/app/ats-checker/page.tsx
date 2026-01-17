import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Target, Shield, TrendingUp, Zap, AlertCircle, FileText, Award, BarChart3, XCircle, HelpCircle, BookOpen } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';
import { ENV } from '@/app/env';

export const metadata: Metadata = {
    title: 'Free ATS Resume Checker (2025) | Score Your CV Instantly',
    description: 'Is your resume readable by robots? Use our Free ATS Checker to calculate your compatibility score, identify missing keywords, and beat the Applicant Tracking System.',
    keywords: [
        'ATS Checker',
        'Resume Scanner',
        'Free CV Analysis',
        'Applicant Tracking System Test',
        'Resume Optimizer',
        'Beat the ATS',
        'Automated Resume Screening',
        'ATS resume checker free',
        'resume score calculator',
        'check my resume for ats'
    ],
    alternates: {
        canonical: '/ats-checker',
    },
    openGraph: {
        title: 'Free ATS Resume Checker (2025) | Test Your Resume Score',
        description: 'Check if your resume passes ATS systems. Get instant AI-powered analysis, compatibility score, and detailed recommendations. 100% free.',
        url: '/ats-checker',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: "ProfResume ATS Checker",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free ATS Resume Checker | ProfResume",
        description: "Don't let a robot reject your application. Check your resume's ATS score instantly for free.",
        images: ['/og-image.png'],
    },
};

const baseUrl = ENV.EDITOR_URL;

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "ATS Checker", url: "/ats-checker" }
];

const faqs = [
    {
        question: "What is an ATS resume checker?",
        answer: "An ATS resume checker is a specialized tool that scans your resume using the same algorithms as corporate hiring software (like Taleo, Greenhouse, or Workday). It evaluates readability, keyword matching, and formatting compatibility to predict your chances of passing the initial digital screening."
    },
    {
        question: "Is PDF or Word better for ATS?",
        answer: "We recommend Microsoft Word (.docx) for the highest safety, as some older ATS systems struggle with parsing PDFs. However, most modern systems handle text-based PDFs well. Always avoid 'Image PDFs' (scanned documents) as they are unreadable by most parsers."
    },
    {
        question: "How does the ATS checker work?",
        answer: "Our ATS checker uses advanced AI to simulate real Applicant Tracking Systems. It parses your uploaded document (PDF or DOCX), identifies entities like skills and dates, checks against standard job description keywords, and flags formatting issues that could cause rejection."
    },
    {
        question: "Is the ATS checker really free?",
        answer: "Yes! Our ATS resume checker is completely free to use. There are no hidden costs, no credit cards required, and no watermarks on your results. You can scan and optimize your resume as many times as needed."
    },
    {
        question: "Can I use ChatGPT to write my resume for ATS?",
        answer: "Yes, but be careful. While AI can help with phrasing, you need to ensure the specific keywords from the job description are included naturally. Our AI Resume Tailor tool helps you do this automatically while maintaining a human tone."
    },
    {
        question: "What is a good ATS score?",
        answer: "Generally, a score of 80% or higher is considered excellent and ready for application. A score between 60-79% is competitive but needs optimization (usually more keywords). Anything below 60% indicates a high risk of rejection due to formatting errors or missing core skills."
    },
    {
        question: "Why do I need an ATS-friendly resume?",
        answer: "95% of Fortune 500 companies and 75% of large employers use ATS to filter applicants. Nearly 75% of qualified resumes are rejected by these systems before a human ever sees them. Optimizing for ATS is the only way to ensure your application gets read."
    },
    {
        question: "What file formats are supported?",
        answer: "We support PDF (.pdf) and Microsoft Word (.docx) formats. These are the industry standards. Avoid using .txt, .pages, or graphic formats like .jpg or .png for your professional resume."
    },
    {
        question: "How do I know which keywords to add?",
        answer: "Read the job description carefully. Look for 'Hard Skills' (e.g., Python, SEO, Project Management) and specific tools that are mentioned multiple times. Our tool will also suggest missing keywords based on common industry standards for your role."
    },
    {
        question: "What is the best font for ATS?",
        answer: "Stick to standard, clean sans-serif fonts like Arial, Calibri, Helvetica, or Roboto. Serif fonts like Times New Roman are safe but can look dated. Avoid custom, decorative, or script fonts as parsers may not recognize the characters."
    }
];

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
        "ratingValue": "4.8",
        "ratingCount": "1250"
    }
};

export default function ATSCheckerMarketingPage() {
    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Free ATS Resume Checker (2025)"
                description="Is your resume readable by robots? Use our Free ATS Checker to calculate your compatibility score and beat the Applicant Tracking System."
                url={`${ENV.BASE_URL}/ats-checker`}
                datePublished="2024-11-20"
                dateModified={new Date().toISOString()}
                author="ProfResume Career Experts"
            />
            <GlobalSchema />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />

            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                            <Target className="w-4 h-4" />
                            Free AI-Powered ATS Analysis (2025 Updated)
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Is Your Resume{' '}
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ATS-Proof?
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            <strong>75% of resumes are rejected by robots</strong> before a human ever reads them.
                            Get your free compatibility score, keyword gap analysis, and fix your resume in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={ENV.EDITOR_URL + "/ats-check"}
                                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl hover:shadow-indigo-500/20 transition-all hover:-translate-y-1"
                            >
                                Check My Resume Score
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#what-is-ats"
                                className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all inline-flex items-center justify-center"
                            >
                                Learn How it Works
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 divide-x divide-gray-200">
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-indigo-600">99%</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">Fortune 500 Use ATS</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-indigo-600">75%</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">Rejection Rate</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-4xl font-extrabold text-indigo-600">30s</div>
                            <div className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">To Get Scored</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Snippet Definition Box */}
            <section id="what-is-ats" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-indigo-50/50 p-10 rounded-3xl border border-indigo-100 mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">What is an ATS Resume Checker?</h2>
                        <p className="text-lg text-gray-700 leading-relaxed relative z-10">
                            An <strong>ATS Resume Checker</strong> (Applicant Tracking System Checker) is a specialized software tool that scans your resume using the same algorithms as corporate hiring platforms. It parses your document to evaluate <strong>readability</strong>, <strong>keyword matching</strong>, and <strong>formatting compatibility</strong>, generating a predicted "match score" that estimates your probability of passing the automated screening used by modern employers.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600">
                        <h2 className="text-3xl font-bold text-gray-900">Why ATS Compatibility Matters for Job Seekers</h2>
                        <p>
                            In the modern hiring landscape, the human recruiter is typically the <em>second</em> person to see your resume. The first "reader" is a robot. If you don't pass this digital gatekeeper, your application is effectively invisible.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">The Harsh Reality of Modern Hiring:</h3>
                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                                <span><strong>The 75% Rule:</strong> Studies confirm that nearly 75% of qualified resumes are rejected by ATS algorithms simply because they can't be read correctly due to parsing errors.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <BarChart3 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                                <span><strong>Volume Management:</strong> A standard corporate job opening receives 250+ resumes. ATS is mandatory for efficiency, not optional.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Target className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                                <span><strong>Keyword Matching:</strong> If your resume doesn't contain the specific hard skills listed in the JD (e.g., "Python", "Project Management"), you are automatically discarded.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How It Works (Visual) */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            How Our ATS Scanner Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We simulate the backend process of systems like Taleo, Greenhouse, and Workday.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3">1. Parsing (OCR)</h3>
                            <p className="text-slate-600 leading-relaxed">
                                The system strips away your design, finding raw text. We identify if complex columns, tables, or graphics are breaking this step.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                <Target className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3">2. Semantic Analysis</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Our AI looks for "entities" like Job Titles, Dates, and Skills. It tries to understand the <em>context</em> of your experience, not just keywords.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                                <BarChart3 className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3">3. Scoring & Ranking</h3>
                            <p className="text-slate-600 leading-relaxed">
                                We compare your entity list against the specialized job standards to calculate a percentage match (e.g., 85%) and gap analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Score Guide */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">What is a Good ATS Score?</h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        While every system is slightly different, here is a general breakdown of what your results mean:
                    </p>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                        <table className="min-w-full bg-white">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="py-5 px-6 text-left font-bold text-slate-700">Score Range</th>
                                    <th className="py-5 px-6 text-left font-bold text-slate-700">Interpretation</th>
                                    <th className="py-5 px-6 text-left font-bold text-slate-700">Action Required</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 px-6 font-black text-emerald-600 text-lg">80% - 100%</td>
                                    <td className="py-5 px-6 font-medium text-slate-900">Top 10% Candidate</td>
                                    <td className="py-5 px-6 text-slate-600">Ready to apply. Minor tweaks only.</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 px-6 font-black text-amber-500 text-lg">60% - 79%</td>
                                    <td className="py-5 px-6 font-medium text-slate-900">Average / Competitive</td>
                                    <td className="py-5 px-6 text-slate-600">Needs keyword optimization. Add hard skills.</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 px-6 font-black text-rose-500 text-lg">0% - 59%</td>
                                    <td className="py-5 px-6 font-medium text-slate-900">High Risk of Rejection</td>
                                    <td className="py-5 px-6 text-slate-600">Severe formatting or content issues. Reformat immediately.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Common Mistakes */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">
                            5 Fatal Mistakes Avoiding the Trash Folder
                        </h2>
                        <p className="text-slate-400 text-lg">Avoid these deal-breakers to improve your chances</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                mistake: 'Creative Graphics',
                                desc: 'Adding a photo, skill bars (graphs), or icons might look good to a human, but they are invisible confusing noise to a robot.',
                                fix: 'Use a text-only, clean structure.'
                            },
                            {
                                mistake: 'Headers & Footers',
                                desc: 'Many older ATS parsers explicitly ignore the Header/Footer sections of a Word doc to avoid repetitive data.',
                                fix: 'Put contact info in the main body.'
                            },
                            {
                                mistake: 'Keyword Stuffing',
                                desc: 'Don\'t copy-paste the job description in white text. Modern algorithms detect this "black hat" tactic and flag as spam.',
                                fix: 'Weave keywords naturally into bullets.'
                            },
                            {
                                mistake: 'Fancy Fonts',
                                desc: 'Script or custom fonts can turn your resume into unreadable gibberish characters.',
                                fix: 'Use Arial, Calibri, or Roboto.'
                            },
                            {
                                mistake: 'Tables & Columns',
                                desc: 'Multi-column layouts often get parsed in the wrong order (reading across instead of down), mixing up your work history.',
                                fix: 'Stick to a single-column layout.'
                            },
                            {
                                mistake: 'File Format',
                                desc: 'Image-based PDFs or .pages files are often unreadable. Sending an incompatible file is an instant rejection.',
                                fix: 'Use standard .docx or text-based .pdf.'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all group">
                                <div className="flex items-center gap-3 mb-4">
                                    <XCircle className="text-rose-500 w-6 h-6" />
                                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{item.mistake}</h3>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[60px]">
                                    {item.desc}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                    <CheckCircle className="w-4 h-4" />
                                    {item.fix}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 mb-4">Need a safe template?</p>
                        <Link href="/templates" className="text-white font-bold underline decoration-2 decoration-indigo-500 hover:text-indigo-400 transition-colors">
                            Browse our ATS-Optimized Template Gallery &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Industry Examples */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">ATS Optimization by Industry</h2>
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm uppercase tracking-wide">Software Engineer</span>
                            </h3>
                            <p className="mb-2 text-slate-700 font-medium">Focus: Tech Stack & Methodologies</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Ensure you list specific versions (e.g., "React 18" vs just "React") and tools. Don't just say "Coding".
                                <br />
                                <span className="text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded mt-2 inline-block">Keywords: Java, System Design, CI/CD, AWS, Agile, Microservices, REST API.</span>
                            </p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm uppercase tracking-wide">Marketing Specialist</span>
                            </h3>
                            <p className="mb-2 text-slate-700 font-medium">Focus: Tools & Metrics</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Marketing creates ROI. The ATS looks for specific campaign tools and verifiable numbers.
                                <br />
                                <span className="text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded mt-2 inline-block">Keywords: SEO, Google Analytics 4, ROI, CAC, Lead Gen, Hubspot, CRM, Content Strategy.</span>
                            </p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm uppercase tracking-wide">Data Analyst</span>
                            </h3>
                            <p className="mb-2 text-slate-700 font-medium">Focus: Visualization & Quantifiable Data</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Highlight specific libraries, analytical techniques, and database technologies.
                                <br />
                                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">Keywords: SQL, Tableau, Python (Pandas/NumPy), Regression Analysis, ETL, PowerBI.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                            Why Use Our Free ATS Checker?
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
                                title: 'Enterprise-Grade AI',
                                description: 'Advanced matching engine trained on millions of job comparisons.'
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: 'Instant Feedback',
                                description: 'Get your compatibility score and actionable recommendations in 30 seconds.'
                            },
                            {
                                icon: <CheckCircle className="w-6 h-6" />,
                                title: 'Privacy First',
                                description: 'Your resume is processed securely. We don\'t sell your data to recruiters.'
                            },
                            {
                                icon: <Award className="w-6 h-6" />,
                                title: 'No Sign-up Required',
                                description: 'Start checking immediately. No account creation needed for basic scans.'
                            },
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: 'Job-Specific Targeting',
                                description: 'Paste the exact job description for a tailored gap analysis.'
                            }
                        ].map((benefit, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-8 border border-white hover:border-indigo-200 shadow-sm hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
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
                        <p className="text-slate-600">Everything you need to know about ATS systems and our tool.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group border-b border-gray-200 pb-6 pt-6 first:pt-0">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 text-lg list-none hover:text-indigo-600 transition-colors">
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
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Don't Let a Robot Reject You
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        It takes less than 30 seconds to score your resume. Optimization is the difference between silence and an interview.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={ENV.EDITOR_URL}
                            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105 transition-all group"
                        >
                            <Target className="w-5 h-5" />
                            Test My Resume Now - Free
                        </Link>
                        <Link
                            href="/resume-builder"
                            className="bg-indigo-800/50 backdrop-blur-sm border border-indigo-500/50 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center hover:bg-indigo-800 transition-all"
                        >
                            Build ATS Resume
                        </Link>
                    </div>
                    <p className="text-indigo-200 mt-6 text-sm font-medium tracking-wide opacity-80">
                        ✓ No sign-up required &nbsp;•&nbsp; ✓ Results in 30 seconds &nbsp;•&nbsp; ✓ 100% free
                    </p>
                </div>
            </section>
        </div>
    );
}
