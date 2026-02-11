import { Metadata } from 'next';
import { Target, Shield, CheckCircle, ArrowRight, FileText, Zap, Brain, TrendingUp, AlertCircle, XCircle, Search, Layers } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { ArticleSchema } from '@/components/ArticleSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';
import { ENV } from "@/app/env";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'ATS Resume Builder - Create an ATS-Friendly Resume Free | Hirecta',
    description: 'Build a resume that passes every Applicant Tracking System (ATS). Use Hirecta\'s ATS Resume Builder with 20+ tested templates and expert suggestions. Start free!',
    keywords: 'ATS Resume Builder, ATS Friendly Resume Builder, Best ATS Resume Builder, ATS Compliant Resume, Create ATS Resume, Free ATS Resume Maker, ATS Resume Checker',
    alternates: {
        canonical: '/ats-resume-builder',
    },
    openGraph: {
        title: 'ATS Resume Builder - Create an ATS-Friendly Resume Free',
        description: 'Build a resume that passes every Applicant Tracking System (ATS). Use Hirecta\'s ATS Resume Builder with 20+ tested templates and expert suggestions. Start free!',
        url: '/ats-resume-builder',
        type: 'website',
    },
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta ATS Resume Builder",
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
        "ratingCount": "2950"
    }
};

export default function ATSResumeBuilderPage() {
    const faqs = [
        {
            question: "What is an ATS (Applicant Tracking System)?",
            answer: "An Applicant Tracking System (ATS) is an enterprise-grade software application designed to handle recruitment and hiring needs. It acts as a central repository for job applications, allowing companies to collect, scan, and rank candidates based on specific criteria. In the modern job market, over 99% of Fortune 500 companies use an ATS to manage their talent pipelines."
        },
        {
            question: "How exactly does this builder make my resume ATS-friendly?",
            answer: "Our builder utilizes a 'parsing-first' architecture. We have extensively tested our output against the major ATS engines (like Workday's parsing logic and Greenhouse's keyword matching). We ensure that every PDF exported from Hirecta has a clean, selectable text layer and a logical document structure that bots can navigate without confusion."
        },
        {
            question: "Is it better to use PDF or DOCX for ATS in 2026?",
            answer: "While older systems struggled with PDFs, modern ATS platforms prefer text-based PDFs because they preserve all layout details for the human recruiter while providing a perfectly readable text layer for the bot. Hirecta's PDFs are specifically optimized to be 'parsable-native'."
        },
        {
            question: "Do I need a separate resume for different companies?",
            answer: "Ideally, yes. Different companies use different ATS configurations. Our ATS Resume Builder allows you to create multiple versions of your resume, each tailored to specific job descriptions with different keyword densities and skills priority."
        },
        {
            question: "Can an ATS read images or icons?",
            answer: "Most Applicant Tracking Systems cannot read text embedded inside images or icons. This is why Hirecta avoids graphical skill bars or image-based headings. We focus on real text that the ATS can index and rank, ensuring you get credit for all your skills."
        },
        {
            question: "What is a 'Good' ATS score?",
            answer: "While '100%' is ideal, any score above 80% generally puts you in the top tier of candidates. Our live scanner helps you identify the high-weight keywords you're missing to push your score into that elite category."
        },
        {
            question: "How do I know which ATS a company is using?",
            answer: "Often, you can check the URL of the job application page. If it contains 'workday', 'lever', or 'greenhouse', you know exactly which system you're dealing with. Our builder provides specific tips for each of these major platforms."
        }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "ATS Resume Builder", url: `${ENV.BASE_URL}/ats-resume-builder` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="ATS Resume Builder: Everything You Need to Know to Bypass the Filters"
                description="Master the art of ATS-friendly resume creation with Hirecta. Learn how to beat the bots and get your resume into human hands."
                url={`${ENV.BASE_URL}/ats-resume-builder`}
                datePublished="2025-02-11"
                author="Hirecta Career Experts"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />

            <ResourceHero
                badge="ATS Optimized"
                badgeIcon={Shield}
                title={
                    <>
                        The Most Reliable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">ATS Resume Builder</span>
                    </>
                }
                subtitle="Don't let a robot reject your application. Our ATS-friendly builder ensures your resume is 100% readable by every major tracking system, from Greenhouse to Taleo."
            />

            <ResourceFeatureGrid
                title="Built to Beat the Bots"
                features={[
                    {
                        icon: <Shield className="w-6 h-6" />,
                        title: "100% Parsable Templates",
                        description: "Every template in our library is tested against the world's most popular ATS platforms to ensure zero parsing errors."
                    },
                    {
                        icon: <Search className="w-6 h-6" />,
                        title: "Live Keyword Scanner",
                        description: "Our real-time analyzer compares your resume against target job descriptions and highlights exactly what's missing."
                    },
                    {
                        icon: <Layers className="w-6 h-6" />,
                        title: "Clean Formatting",
                        description: "No tables, no text boxes, and no hidden characters. We use a flat structure that robots love and humans can easily read."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "Standard Font Selection",
                        description: "We only use web-safe, professional fonts that are guaranteed to render correctly in any screening software."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Instant ATS Score",
                        description: "Get a live compatibility score as you build. Aim for 80%+ to ensure you're in the top-tier of applicants."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Sector-Specific Keywords",
                        description: "Access a library of thousands of industry-approved terms to help you rank higher for specialized roles."
                    }
                ]}
            />

            <ResourceContentSection
                title="The Definitive Guide to Bypassing the ATS Filters"
                content={
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 mb-12 not-prose">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <AlertCircle className="text-emerald-600" /> The Myth of the 'Random' Rejection
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Many job seekers believe their rejection was a result of a recruiter's whim. The reality is far more clinical. <strong>75% of applications are never seen by a human</strong> because they fail a technical checklist. If your resume uses a non-standard font, carries text in a header, or uses a table for layout, the ATS parser creates a 'corrupted' profile. To the recruiter, you simply don't exist.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700 mt-4">
                                Our <strong>ATS Resume Builder</strong> is designed to be the antidote to this technical 'Black Hole.' Want to see how you rank right now? Try our <Link href="/ats-checker" className="text-blue-600 hover:underline font-semibold">Free ATS Checker</Link>.
                            </p>
                        </section>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Technical Architecture: How ATS Parsers Actually Work</h2>
                        <p>
                            To beat the system, you must understand its logic. Most modern Applicant Tracking Systems (Workday, Greenhouse, Taleo) use a four-stage process to evaluate your resume:
                        </p>
                        <div className="space-y-6 my-8 not-prose">
                            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">1. The Sanitization Layer</h3>
                                <p className="text-sm text-gray-600 uppercase tracking-widest font-bold mb-3 text-emerald-600">Step One</p>
                                <p className="text-gray-600 italic">The system strips all CSS, styling, and formatting. It looks for raw UTF-8 text strings. If you used a 'Skill Bar' graphic, the information inside it is deleted here.</p>
                            </div>
                            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Entity Recognition & Tagging</h3>
                                <p className="text-sm text-gray-600 uppercase tracking-widest font-bold mb-3 text-emerald-600">Step Two</p>
                                <p className="text-gray-600 italic">The AI attempts to categorize text. It looks for date ranges (MM/YYYY) adjacent to Company Names. If your layout is non-linear, the parser might attribute your 'Junior' role dates to your 'Senior' role.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Modern ATS Giants: A Guide to Enterprise Systems</h2>
                        <p>Every ATS has its own quirks. Hirecta's builder is optimized for the 'Big Three' that dominate 80% of the market:</p>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <Search className="text-blue-600 shrink-0 w-8 h-8" />
                                <div>
                                    <h4 className="font-bold text-xl text-gray-900 mb-2">Workday (Enterprise Leader)</h4>
                                    <p className="text-gray-600">Used by IBM, Amazon, and Walmart. It is notoriously strict with formatting. Workday's parser often struggles with multi-column layouts, which is why we offer single-column <Link href="/templates" className="text-blue-600 hover:underline font-semibold">professional templates</Link> specifically for these applications.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <Zap className="text-yellow-600 shrink-0 w-8 h-8" />
                                <div>
                                    <h4 className="font-bold text-xl text-gray-900 mb-2">Greenhouse & Lever (Tech Favorites)</h4>
                                    <p className="text-gray-600">Dominant in Silicon Valley. These systems are more modern and focus heavily on **Keyword Density** and **Semantic Relevance**. Our AI writer ensures your skills are mentioned multiple times in varied contexts.</p>
                                </div>
                            </li>
                        </ul>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Advanced Formatting: The 'Golden Rules' of ATS Success</h2>
                        <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
                            <div className="bg-white p-6 rounded-xl border-2 border-emerald-50 relative">
                                <CheckCircle className="text-emerald-500 absolute -top-3 -right-3 bg-white rounded-full" />
                                <h3 className="font-bold text-gray-900 mb-3">DO: Use Standard Sections</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Stick to 'Work Experience', 'Skills', and 'Education'. Custom headings like 'My Journey' or 'Toolbox' confuse the AI classifiers.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border-2 border-red-50 relative">
                                <XCircle className="text-red-500 absolute -top-3 -right-3 bg-white rounded-full" />
                                <h3 className="font-bold text-gray-900 mb-3">DON'T: Use Text Boxes</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Text boxes often appear as 'floating objects' to a parser. The system may read the content of a sidebar at the very end of the document, breaking context.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Semantic Keywords: The Shift from Matching to Relevance</h2>
                        <p>In 2026, simply 'stuffing' your resume with keywords is a losing strategy. Modern ATS use **Latent Semantic Indexing (LSI)**. This means the system knows that if you mention 'Docker', you should also likely mention 'Kubernetes', 'CI/CD', and 'Cloud Infrastructure'.</p>
                        <p>Our <strong>ATS Resume Builder</strong> uses a proprietary AI model that suggests these 'Cluster Keywords.' Instead of just helping you match the job description, we help you prove to the AI that you actually understand the domain. Learn more about how to optimize your content with our <Link href="/tailor" className="text-blue-600 hover:underline font-semibold">AI Tailoring Tool</Link>.</p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">A 10-Point Technical Checklist for 2026</h2>
                        <div className="bg-gray-900 text-white p-10 rounded-3xl my-10 not-prose shadow-2xl">
                            <h4 className="text-2xl font-bold mb-6 text-emerald-400">Before You Hit 'Submit':</h4>
                            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 list-none pl-0">
                                {[
                                    "Is it a text-based PDF (not an image)?",
                                    "No columns, tables, or text boxes?",
                                    "Contact info is in the main body?",
                                    "Dates follow YYYY or MM/YYYY format?",
                                    "Standard system fonts (Arial, Roboto)?",
                                    "Keyword density is realistic (no stuffing)?",
                                    "No charts, skill bars, or graphics?",
                                    "File name is 'Name-JobTitle-Resume'?",
                                    "Education includes degree and school?",
                                    "Experience listed in reverse-chronological order?"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Human Design vs. Robot Parsing</h2>
                        <p>You might worry that an ATS-friendly resume looks 'boring' to a human. At Hirecta, we've solved this. Our layouts use high-contrast typography, strategic white space, and professional grid systems that satisfy the recruiter's eye while remaining perfectly transparent to the ATS parser. You get the best of both worlds: a resume that ranks #1 and a resume that gets the interview.</p>

                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mt-12 flex flex-col md:flex-row gap-8 items-center">
                            <div className="shrink-0">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">?</div>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Still Unsure if Your Resume Passes?</h4>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">Upload your current file to our scanner. We'll show you exactly what an ATS sees—and where it's failing to read your data.</p>
                                <Link href="/ats-checker" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                                    Check Your ATS Score Now <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            />

            <ResourceCTA
                title="Build Your ATS-Proof Resume Now"
                subtitle={
                    <>
                        Experience the difference of a professional ATS Resume Builder. Get more callbacks, land more interviews, and finally beat the robots. 100% free, no credit card required.
                    </>
                }
            />
        </div>
    );
}
