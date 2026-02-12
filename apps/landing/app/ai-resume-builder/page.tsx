import { Metadata } from 'next';
import { Brain, Sparkles, Zap, Target, Shield, CheckCircle, ArrowRight, Star, Mic, FileText, Bot, Layers, TrendingUp, XCircle } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { ArticleSchema } from '@/components/ArticleSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';
import { ENV } from "@/app/env";
import Link from 'next/link';
import { TableOfContents } from '@/components/TableOfContents';
import { SuccessMetrics } from '@/components/SuccessMetrics';

export const metadata: Metadata = {
    title: 'AI Resume Builder - Create Your Professional Resume Free | Hirecta',
    description: 'Build a job-winning resume in 30 seconds with Hirecta\'s AI Resume Builder. Get AI-powered suggestions, expert formatting, and instant PDF download. Start free!',
    keywords: 'AI Resume Builder, Free AI Resume Builder, AI Resume Maker, AI Resume Writer, Best AI Resume Builder, Generate Resume with AI, AI CV Builder, artificial intelligence resume, machine learning resume builder, chatgpt resume, ai powered cv maker, resume generator ai free, smart resume builder, automated resume writer',
    alternates: {
        canonical: '/ai-resume-builder',
    },
    openGraph: {
        title: 'AI Resume Builder - Create Your Professional Resume Free',
        description: 'Build a job-winning resume in 30 seconds with Hirecta\'s AI Resume Builder. Get AI-powered suggestions, expert formatting, and instant PDF download. Start free!',
        url: '/ai-resume-builder',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Resume Builder - Create Professional Resumes with AI (Free)',
        description: 'Build a job-winning resume in 30 seconds with AI. Get instant suggestions and download as PDF.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta AI Resume Builder",
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
        "ratingCount": "3200"
    }
};

// HowTo Schema for SEO
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use AI to Build Your Resume",
    "description": "Step-by-step guide to creating a professional resume using artificial intelligence technology",
    "totalTime": "PT5M",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Start with AI Suggestions",
            "text": "Enter your job title and let AI generate tailored content suggestions based on industry best practices and successful resumes.",
            "url": `${ENV.BASE_URL}/ai-resume-builder#step-1`
        },
        {
            "@type": "HowToStep",
            "name": "Use Voice Input",
            "text": "Describe your work experience naturally by speaking. AI will transcribe and transform your words into professional, metrics-driven bullet points.",
            "url": `${ENV.BASE_URL}/ai-resume-builder#step-2`
        },
        {
            "@type": "HowToStep",
            "name": "AI-Powered Optimization",
            "text": "Let AI analyze your resume for ATS compatibility, keyword density, and impact. Get instant suggestions for improvement.",
            "url": `${ENV.BASE_URL}/ai-resume-builder#step-3`
        },
        {
            "@type": "HowToStep",
            "name": "Download and Apply",
            "text": "Download your AI-optimized resume as a professional PDF and start applying to jobs with confidence.",
            "url": `${ENV.BASE_URL}/ai-resume-builder#step-4`
        }
    ]
};

export default function AIResumeBuilderPage() {
    const faqs = [
        {
            question: "How does an AI resume builder work?",
            answer: "An AI resume builder uses advanced algorithms and Large Language Models (LLMs) to help you write and format your resume. It analyzes your job title and target industry to suggest professional bullet points, skills, and summaries. Hirecta's AI specifically focuses on keyword optimization and semantic relevance to help you pass modern Applicant Tracking Systems (ATS) that use machine learning to rank candidates."
        },
        {
            question: "Is Hirecta's AI Resume Builder really free?",
            answer: "Yes, our tool is 100% free to use. You can create, edit, and download your AI-generated resume without any hidden costs, monthly subscriptions, or watermarks. We believe that job seekers shouldn't have to pay to prove their value to employers. Our premium features are optional and aimed at power users."
        },
        {
            question: "Will the AI make my resume look generic?",
            answer: "Not at all. While the AI provides suggestions based on industry standards, you have full control over the content. It acts as a highly intelligent writing assistant, helping you find the right words to describe your unique achievements, metrics, and professional milestones. The goal is to produce a resume that sounds like the best version of you, not a robot."
        },
        {
            question: "Is AI-generated content safe for modern ATS?",
            answer: "Yes! Modern ATS platforms like Workday, Greenhouse, and Lever now use AI themselves to scan for semantic meaning, not just exact keyword matches. Our AI is programmed to use industry-standard terminology and contexts that these systems prioritize. All our templates are also designed with clean HTML5 structures that are 100% readable by automated screening software."
        },
        {
            question: "Can I use AI to write my cover letter too?",
            answer: "Absolutely. Once your resume is built, our integrated AI tools can help you generate a matching cover letter tailored to the specific job description you're applying for. This ensures a consistent professional narrative across your entire application package."
        },
        {
            question: "Can AI help me if I'm changing careers?",
            answer: "Yes, this is one of the strongest use cases for an AI resume builder. The AI can identify 'transferable skills' from your current experience and rephrase them in a way that resonates with your target industry, making the transition look natural and strategic."
        },
        {
            question: "Is my data safe with Hirecta?",
            answer: "We take data privacy extremely seriously. Your personal information is encrypted and we do not sell your data to third-party recruiters. You have full control over your data and can delete your account and resumes at any time."
        },
        {
            question: "Does the AI support non-English resumes?",
            answer: "Currently, our AI is optimized for English, but it can assist in generating structure and formatting for various languages. Full multi-lingual AI support for localized industry terminology is a feature we are actively developing."
        },
        {
            question: "How often should I update my AI-generated resume?",
            answer: "You should update your resume for every single job application. Our AI makes this easy with a 1-click tailoring feature that scans the job description and suggests instant adjustments to your bullet points to match the specific requirements of the role."
        }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "AI Resume Builder", url: `${ENV.BASE_URL}/ai-resume-builder` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="AI Resume Builder: How to Create a Professional Resume in Seconds"
                description="Learn why Hirecta is the best AI resume builder for job seekers in 2026. Get expert tips on AI resume writing and ATS optimization."
                url={`${ENV.BASE_URL}/ai-resume-builder`}
                datePublished="2025-02-11"
                author="Hirecta Career Experts"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <ResourceHero
                badge="AI-Powered"
                badgeIcon={Brain}
                title={
                    <>
                        The Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Resume Builder</span> for 2026
                    </>
                }
                subtitle="Stop struggling with writer's block. Our intelligent AI Resume Maker helps you build a perfectly formatted, keyword-optimized resume in minutes. 100% free with no watermarks."
            />

            <ResourceFeatureGrid
                title="Why Choose Hirecta's AI Resume Writer?"
                features={[
                    {
                        icon: <Bot className="w-6 h-6" />,
                        title: "Smart Content Suggestions",
                        description: "Get industry-specific bullet points and summaries tailored to your role. Our AI knows exactly what hiring managers want to see."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "ATS Keyword Injection",
                        description: "Our AI automatically identifies and suggests the most important keywords for your target job, ensuring you pass automated filters."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Instant 30-Second Setup",
                        description: "Simply input your job title, and our AI will draft a complete resume structure for you to customize. Build your CV at lightning speed."
                    },
                    {
                        icon: <Shield className="w-6 h-6" />,
                        title: "Professional Formatting",
                        description: "No more messing with margins. Our AI ensures every section is perfectly aligned and formatted for maximum readability."
                    },
                    {
                        icon: <Mic className="w-6 h-6" />,
                        title: "Voice-to-Resume Feature",
                        description: "Unique to Hirecta! Speak your work experience aloud, and our AI will transcribe and format it into professional professional bullet points."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Career-Specific Guidance",
                        description: "Whether you're a software engineer or a marketing manager, our AI provides guidance tailored to your specific career path."
                    }
                ]}
            />

            {/* Success Metrics */}
            <SuccessMetrics
                metrics={[
                    { value: '30 sec', label: 'Average Resume Creation Time', sublabel: 'With AI assistance', color: 'blue' },
                    { value: '3x', label: 'More Interview Callbacks', sublabel: 'vs generic resumes', color: 'purple' },
                    { value: '95%', label: 'ATS Pass Rate', sublabel: 'Industry leading', color: 'green' }
                ]}
            />

            {/* Table of Contents */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <TableOfContents
                        sections={[
                            { id: 'features', title: 'AI Resume Features' },
                            { id: 'comparison', title: 'vs Competitors' },
                            { id: 'benefits', title: 'Key Benefits' },
                            { id: 'faq', title: 'Frequently Asked Questions' }
                        ]}
                    />
                </div>
            </section>

            <ResourceContentSection
                title="The Ultimate Guide to AI Resume Building in 2026"
                content={
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mb-12 not-prose">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <Sparkles className="text-blue-600" /> Defining the AI Revolution in Recruitment
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                An <strong>AI Resume Builder</strong> is more than just a template; it's a strategic career tool that harnesses the power of Large Language Models (LLMs) and predictive analytics. By processing millions of successful job placements and recruiter feedback loops, these tools understand the "invisible requirements" of a job description—the skills and experiences that recruiters look for but don't always explicitly state.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700 mt-4">
                                In 2026, the landscape of recruitment has shifted. Fortune 500 companies no longer rely on simple keyword matching. They use "Semantic AI" that understands context. Hirecta's AI is built to bridge the gap between your human experience and these machine-learning-driven filters.
                            </p>
                        </section>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why You Need an AI Resume Builder Right Now</h2>
                        <p>
                            Traditional resume writing is dead. In a world where an average job posting receives over 250 applications, standing out requires a data-driven approach. You can't just be "good"—you have to be "optimally visible." verify your current standing with our <Link href="/ats-checker" className="text-blue-600 hover:underline font-semibold">Free ATS Checker</Link>.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-gray-900 mb-2">Semantic Search Mastery</h3>
                                <p className="text-sm">Modern ATS don't just look for 'JavaScript'. They look for 'Full Stack Development', 'Software Architecture', and 'Agile Methodologies' in a way that proves expertise.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-gray-900 mb-2">Quantifiable Impact Focus</h3>
                                <p className="text-sm">Our AI prompts you to include metrics. Instead of 'Managed a team', it suggests 'Managed a cross-functional team of 12, increasing sprint velocity by 25%'.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Role-Specific AI Resume Strategies</h2>
                        <p>Not all resumes are created equal. Different industries have different "Green Flags" for recruiters. Here is how our AI tailors its writing for your specific career path:</p>

                        <div className="space-y-6 my-8 not-prose">
                            <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Layers className="text-blue-600 w-5 h-5" /> Software Engineering & IT
                                </h3>
                                <p className="text-gray-600 mb-4">FAANG and top tech startups use advanced AI loaders. Our AI emphasizes technical stacks, system design contributions, and open-source impact.</p>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-500 font-medium">
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Stack Optimization</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Project Link Analysis</li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <TrendingUp className="text-purple-600 w-5 h-5" /> Marketing & Sales
                                </h3>
                                <p className="text-gray-600 mb-4">Focuses on ROI, conversion metrics, and growth hacking. The AI suggests impactful action verbs like 'Spearheaded', 'Optimized', and 'Scaled'.</p>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-500 font-medium">
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> KPI Integration</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Growth Metrics</li>
                                </ul>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How AI Handles the "Black Hole" of Applicant Tracking Systems</h2>
                        <p>Most resumes die in the "Black Hole"—the period between submission and a human recruiter actually opening the file. This happens because the ATS gives the resume a "Compatibility Score." If you're below 70%, a human might never see your name.</p>
                        <p>Our AI Resume Maker solves this by:</p>
                        <ol className="space-y-4 my-6">
                            <li><strong>Standardizing Vocabulary:</strong> Ensuring you use the exact industry synonyms recruiters search for.</li>
                            <li><strong>Parsing-Proof Layouts:</strong> Avoiding complex tables, images, or columns that confuse older ATS systems. We recommend using our <Link href="/templates" className="text-blue-600 hover:underline font-semibold">tested ATS templates</Link>.</li>
                            <li><strong>Semantic Weighting:</strong> Placing important keywords in "High Weight" sections like the Professional Summary and Core Competencies.</li>
                        </ol>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Step-by-Step: Writing Your First AI Resume</h2>
                        <div className="space-y-8 my-10 not-prose">
                            {[
                                { step: "01", title: "Select Your Industry Base", desc: "Our AI loads a domain-specific knowledge base. Whether you're in Logistics or Cybersecurity, the suggestions will be relevant." },
                                { step: "02", title: "Generate Section Drafts", desc: "Use the 'Magic Write' button to generate professional summaries. Don't like a version? Hit 'Regenerate' for a fresh perspective." },
                                { step: "03", title: "Perform Keyword Matching", desc: "Paste the job description. Our AI highlights missing skills and suggests where to integrate them without 'Keyword Stuffing'." },
                                { step: "04", title: "Final Proof & Export", desc: "The AI performs a 20-point check for grammar, consistency, and impact. Export as a high-quality PDF." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="text-4xl font-black text-blue-100 italic select-none">{item.step}</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Future of AI in Recruitment (2027+)</h2>
                        <p>We are already seeing the next wave of hiring technology. Soon, AI will not just write your resume, it will simulate interviews and verify your skills directly with open-source contributions or portfolio data. By using Hirecta today, you are future-proofing your job search strategy. Our <Link href="/tailor" className="text-blue-600 hover:underline font-semibold">AI Tailoring Tool</Link> is just the beginning of this automated career journey.</p>

                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mt-12">
                            <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5" /> Safety & Ethics in AI Resume Building
                            </h4>
                            <p className="text-sm text-amber-800">
                                Be honest. Use AI to *describe* your work better, not to *invent* work you haven't done. In 2026, background checks are automated and incredibly detailed. AI-driven deception is easily caught. Use AI as a strategic narrator, not a fictional writer.
                            </p>
                        </div>
                    </div>
                }
            />

            {/* Quick Statistics Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        AI Resume Writing: By the Numbers
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Data-driven insights on AI resume tools in 2026
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-600">
                            <div className="text-5xl font-bold text-blue-600 mb-2">78%</div>
                            <p className="text-gray-700 font-semibold mb-2">Faster Resume Creation</p>
                            <p className="text-sm text-gray-600">
                                Job seekers using AI complete their resumes 78% faster than traditional methods (LinkedIn Talent Solutions, 2025)
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-purple-600">
                            <div className="text-5xl font-bold text-purple-600 mb-2">42%</div>
                            <p className="text-gray-700 font-semibold mb-2">Higher Interview Callback Rate</p>
                            <p className="text-sm text-gray-600">
                                Resumes enhanced with AI tools receive 42% more interview requests compared to manually-written resumes (Jobscan Report, 2026)
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-600">
                            <div className="text-5xl font-bold text-green-600 mb-2">89%</div>
                            <p className="text-gray-700 font-semibold mb-2">ATS Pass Rate</p>
                            <p className="text-sm text-gray-600">
                                AI-optimized resumes have an 89% ATS pass rate, compared to 63% for traditional resumes (Harvard Business Review, 2025)
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-orange-600">
                            <div className="text-5xl font-bold text-orange-600 mb-2">15 min</div>
                            <p className="text-gray-700 font-semibold mb-2">Average Time to Complete</p>
                            <p className="text-sm text-gray-600">
                                With AI assistance, the average user completes a professional resume in just 15 minutes (Hirecta User Data, 2026)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2026 AI Resume Trends */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                        AI Resume Writing Trends in 2026
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        How artificial intelligence is revolutionizing job applications
                    </p>

                    <div className="space-y-8">
                        {/* Trend 1 */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-l-4 border-blue-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-blue-600">🤖</span>
                                Semantic ATS Algorithms
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>The Shift:</strong> ATS systems now use AI to understand <em>context</em>, not just keyword matching.
                                For example, if a job requires "project management," the ATS can now recognize "led cross-functional teams" as relevant.
                            </p>
                            <p className="text-gray-700 mt-3">
                                <strong>What This Means:</strong> Focus on describing your real impact with natural language. AI resume tools like Hirecta
                                automatically phrase your achievements in semantically-rich ways that both humans and ATS algorithms understand.
                            </p>
                        </div>

                        {/* Trend 2 */}
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-xl border-l-4 border-green-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-green-600">⚡</span>
                                Real-Time Resume Tailoring
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>The Shift:</strong> Job seekers are no longer using one "master resume" for all applications.
                                AI makes it effortless to instantly tailor your resume for each specific job posting.
                            </p>
                            <p className="text-gray-700 mt-3">
                                <strong>What This Means:</strong> Our AI Tailor feature scans job descriptions and suggests keyword adjustments in seconds.
                                This personalization dramatically improves your chances of landing interviews.
                            </p>
                        </div>

                        {/* Trend 3 */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-l-4 border-orange-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-orange-600">📊</span>
                                Quantification Over Buzzwords
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>The Shift:</strong> Recruiters and AI screening tools prioritize <strong>quantified achievements</strong>
                                over vague buzzwords like "team player" or "detail-oriented."
                            </p>
                            <p className="text-gray-700 mt-3">
                                <strong>What This Means:</strong> AI helps you transform generic statements into measurable results.
                                Instead of "improved sales," the AI suggests "Increased Q4 sales by 28% ($340K) through strategic outbound campaigns."
                            </p>
                        </div>

                        {/* Trend 4 */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border-l-4 border-purple-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-purple-600">🎯</span>
                                Skills-First Resumes
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>The Shift:</strong> Companies are moving toward skills-based hiring rather than purely job-title-based screening.
                                ATS systems now parse resumes for specific competencies.
                            </p>
                            <p className="text-gray-700 mt-3">
                                <strong>What This Means:</strong> AI resume builders can identify your transferable skills and highlight them prominently,
                                even if you're changing industries or roles. This is especially valuable for career changers.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-blue-600 text-white p-8 rounded-xl text-center">
                        <p className="text-lg font-semibold">
                            💡 Bottom Line: AI isn't replacing resume writers - it's democratizing access to professional-quality resume writing for everyone.
                        </p>
                    </div>
                </div>
            </section>

            <ResourceCTA
                title="Create Your AI-Powered Resume Today"
                subtitle={
                    <>
                        Join 50,000+ job seekers who have used Hirecta's AI Resume Builder to land interviews at Tier-1 companies. No credit card required. No watermarks. 100% free.
                    </>
                }
            />
        </div>
    );
}
