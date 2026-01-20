import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { FileText, Zap, CheckCircle, Award, Target, TrendingUp, Download, Users, Clock, Shield, XCircle, ArrowRight, BookOpen, Star, AlertTriangle } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Resume Builder 2026 | Create an ATS-Friendly CV in 5 Minutes',
    description: 'Make a professional resume for free. Our AI Resume Builder offers 20+ ATS-approved templates, expert writing suggestions, and instant PDF download. No credit card required.',
    keywords: [
        'Free Resume Builder',
        'Online Resume Maker',
        'CV Creator',
        'Biodata Maker',
        'Resume Templates 2026',
        'AI Resume Writer',
        'Make a Resume for Free',
        'resume builder free download',
        'best free resume builder',
        'online cv builder'
    ],
    alternates: {
        canonical: '/resume-builder',
    },
    openGraph: {
        title: 'Build Your Perfect Resume for Free | Hirecta',
        description: 'Stop struggling with Word. Create a job-winning, ATS-friendly resume in minutes with our intelligent builder tools.',
        url: '/resume-builder',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: "Hirecta Free Resume Builder",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Resume Builder 2026 | Hirecta",
        description: "Create a professional resume in minutes. No hidden fees. Download PDF instantly.",
        images: ['/og-image.png'],
    },
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Build a Resume Online",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Choose a Template",
            "text": "Select a professional, ATS-friendly design from our library of 20+ templates."
        },
        {
            "@type": "HowToStep",
            "name": "Import or Enter Data",
            "text": "Fill in your experience, education, and skills manually or import from LinkedIn."
        },
        {
            "@type": "HowToStep",
            "name": "Optimize Content",
            "text": "Use AI suggestions to improve your bullet points and keywords."
        },
        {
            "@type": "HowToStep",
            "name": "Download PDF",
            "text": "Export your document in high-quality PDF or DOCX format."
        }
    ]
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Builder",
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
        "ratingCount": "2100"
    }
};

export default function ResumeBuilderPage() {
    const faqs = [
        {
            question: "Is the resume builder really free?",
            answer: "Yes! Our resume builder is 100% free with no hidden charges. You can create unlimited resumes, use all premium templates, and download standard PDF files without paying a cent. We believe professional career tools should be accessible to everyone."
        },
        {
            question: "Do I need a cover letter with my resume?",
            answer: "Yes. While not always mandatory, a cover letter increases your chances of getting an interview by 40%. It's your chance to tell your story. Use our Free Cover Letter Generator to create one that matches your resume design perfectly."
        },
        {
            question: "Are the resumes ATS-friendly?",
            answer: "Absolutely. Formatting is the #1 reason resumes get rejected. All our templates are designed with clean code, standard fonts, and proper hierarchy to ensure 100% parsability by Applicant Tracking Systems (ATS) like Taleo and Greenhouse."
        },
        {
            question: "How many pages should my resume be?",
            answer: "For 90% of candidates, one page is ideal. Recruiters spend only 6-7 seconds scanning a resume. If you have 10+ years of relevant experience, two pages are acceptable. Never go beyond two pages."
        },
        {
            question: "Can I download my resume as a Word document?",
            answer: "Yes. You can download your resume as a PDF (recommended for applications to preserve formatting) or DOCX (Word) file if you need to make manual edits later."
        },
        {
            question: "How does the AI writing assistant work?",
            answer: "Our AI analyzes your job title and suggests impactful, action-oriented bullet points used by top performers in your field. It helps you replace weak phrases like 'Tasks included' with strong ones like 'Spearheaded' or 'Optimized'."
        }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` }
    ];

    const resumeTypes = [
        {
            title: "Resume Builder for Software Engineers",
            description: "Specialized templates for tech stacks, GitHub projects, and hackathons.",
            href: "/resume-builder/software-engineer",
            icon: <FileText className="w-6 h-6" />
        },
        {
            title: "Resume Builder for Freshers",
            description: "Focus on education, internships, and capstone projects.",
            href: "/resume-builder/fresher",
            icon: <Users className="w-6 h-6" />
        },
        {
            title: "Resume Builder for IT Professionals",
            description: " optimized for IT, DevOps, and technical roles.",
            href: "/resume-builder/it-professional",
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: "Resume Builder for Managers",
            description: "Leadership-focused layouts emphasizing ROI and team growth.",
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
                url={`${ENV.BASE_URL}/resume-builder`}
            />
            <FAQSchema faqs={faqs} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />

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

            <ResourceContentSection
                title="The Ultimate Guide to Building a Job-Winning Resume"
                content={
                    <article className="prose prose-lg max-w-none text-gray-700">

                        {/* Featured Snippet Candidate */}
                        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mb-12 not-prose">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <BookOpen className="text-blue-600" /> What is an Online Resume Builder?
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                An <strong>Online Resume Builder</strong> is a cloud-based software that automates the design, formatting, and structuring of your professional curriculum vitae (CV). Unlike standard word processors (like MS Word), a resume builder uses pre-coded <strong>ATS-friendly templates</strong> to ensure your document parses correctly by hiring algorithms, allowing you to focus purely on content rather than margin alignment.
                            </p>
                        </section>

                        <h2 className="text-3xl font-bold text-gray-900">Why Use a Resume Builder Instead of Word?</h2>
                        <p>
                            Writing a resume in a standard text editor often leads to "formatting nightmares"—text jumping to the next page, broken bullet points, and invisible tables that confuse ATS scanners.
                        </p>

                        <div className="overflow-x-auto my-8 not-prose">
                            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-bold text-gray-900">Feature</th>
                                        <th className="py-4 px-6 text-left font-bold text-emerald-700 bg-emerald-50">Our Resume Builder</th>
                                        <th className="py-4 px-6 text-left font-bold text-red-700 bg-red-50">MS Word / Google Docs</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-4 px-6 font-medium text-gray-900">ATS Readability</td>
                                        <td className="py-4 px-6 text-emerald-600 font-bold bg-emerald-50/30">100% Guaranteed</td>
                                        <td className="py-4 px-6 text-red-600 bg-red-50/30">Unpredictable</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-medium text-gray-900">Formatting</td>
                                        <td className="py-4 px-6 text-emerald-600 font-bold bg-emerald-50/30">Automated & Locked</td>
                                        <td className="py-4 px-6 text-red-600 bg-red-50/30">Manual & Fragile</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-medium text-gray-900">Content Suggestions</td>
                                        <td className="py-4 px-6 text-emerald-600 font-bold bg-emerald-50/30">AI-Powered Bullet Points</td>
                                        <td className="py-4 px-6 text-red-600 bg-red-50/30">None (Writer's Block)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-medium text-gray-900">Layout Changes</td>
                                        <td className="py-4 px-6 text-emerald-600 font-bold bg-emerald-50/30">1-Click Switch</td>
                                        <td className="py-4 px-6 text-red-600 bg-red-50/30">Hours of Re-formatting</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12">How to Create a Resume in 3 Simple Steps</h2>
                        <p>Building a job-winning resume doesn't need to take hours. Follow this streamlined process:</p>

                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Choose a Template</h3>
                                <p className="text-gray-600 text-sm">Select from our library of <Link href="/templates" className="text-blue-600 hover:underline">20+ ATS-verified templates</Link>. From Creative to Traditional, we have you covered.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Enter Your Details</h3>
                                <p className="text-gray-600 text-sm">Use our <strong>Smart Import</strong> to pull data from LinkedIn. Our AI writer will suggest strong action verbs for your experience.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Optimize & Download</h3>
                                <p className="text-gray-600 text-sm">Scan with our <Link href="/ats-checker" className="text-blue-600 hover:underline">ATS Checker</Link> for a score of 80%+, then download as PDF instantly.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12">5 Resume Mistakes That Kill Applications</h2>
                        <p>Even with a builder, content matters. Avoid these common pitfalls:</p>

                        <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-red-900 flex items-center gap-2"><XCircle size={18} /> Generic Objectives</h4>
                                <p className="text-sm mt-2 text-red-800">Stop saying "Looking for a challenging role." Use a "Professional Summary" that highlights your years of experience and top skills.</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-red-900 flex items-center gap-2"><XCircle size={18} /> Ignoring Keywords</h4>
                                <p className="text-sm mt-2 text-red-800">If the job description asks for "Python" and you write "Coding", you fail the ATS. Be specific.</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-red-900 flex items-center gap-2"><XCircle size={18} /> Photo & Icons</h4>
                                <p className="text-sm mt-2 text-red-800">Unless you are a model or actor, avoid headshots. They confuse parsers and can introduce unconscious bias.</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-red-900 flex items-center gap-2"><XCircle size={18} /> Typographical Errors</h4>
                                <p className="text-sm mt-2 text-red-800">59% of recruiters reject a resume with a single typo. Our builder has built-in spell check to save you.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12">Resume Tips by Career Level</h2>
                        <div className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-200 not-prose">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm uppercase tracking-wide">Entry-Level / Fresher</span>
                                </h3>
                                <p className="text-gray-700">
                                    Focus on <strong>Education</strong> and <strong>Projects</strong>. If you lack work experience, highlight internships, volunteer work, or comprehensive capstone projects. Use a "functional" format if necessary.
                                </p>
                            </div>
                            <div className="w-full h-px bg-gray-200"></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm uppercase tracking-wide">Senior / Executive</span>
                                </h3>
                                <p className="text-gray-700">
                                    Don't list every task you've ever done. Focus on <strong>Results and ROI</strong>. Use metrics like "Increased revenue by 40%" or "Reduced churn by 15%". Keep it to 2 pages maximum.
                                </p>
                            </div>
                            <div className="w-full h-px bg-gray-200"></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm uppercase tracking-wide">Career Changer</span>
                                </h3>
                                <p className="text-gray-700">
                                    Use a "Hybrid" format that emphasizes <strong>Transferable Skills</strong>. Connect your past experience to the new role using keywords relevant to the <em>target</em> industry, not just your old one.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 not-prose">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Specialized Builders</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {resumeTypes.map((type, index) => (
                                    <Link
                                        key={index}
                                        href={type.href}
                                        className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md transition-all group flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {type.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {type.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {type.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </article>
                }
            />

            < ResourceCTA
                title="Ready to Build Your Resume?"
                subtitle="Join 50,000+ professionals who've landed their dream jobs with our free resume builder. No credit card required."
            />
        </div >
    );
}
