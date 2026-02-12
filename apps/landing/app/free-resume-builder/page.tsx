import { Metadata } from 'next';
import { Sparkles, CheckCircle, Download, Zap, Brain, Target, Users, Shield, FileText, ArrowRight, Star, Award, Mic, Clock, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';
import Link from 'next/link';
import { ENV } from "@/app/env";
import { TableOfContents } from '@/components/TableOfContents';
import { SuccessMetrics } from '@/components/SuccessMetrics';
import { IndustryTips } from '@/components/IndustryTips';

export const metadata: Metadata = {
    title: 'Free Resume Builder - Create Professional Resumes Online (No Credit Card)',
    description: 'Build professional, ATS-friendly resumes with our 100% free resume builder. 20+ templates, AI-powered suggestions, unlimited PDF downloads. No credit card required, no watermarks.',
    keywords: 'free resume builder, free resume maker, resume builder no credit card, free resume templates, ATS resume builder free, online resume builder free, free professional resume builder, free ats resume builder, no credit card resume builder, free resume builder with download, best free resume maker 2026, resume writing tool free, job application resume builder, professional cv maker free, resume design templates free',
    alternates: {
        canonical: '/free-resume-builder',
    },
    openGraph: {
        title: 'Free Resume Builder - No Credit Card Required',
        description: '100% free resume builder with 20+ templates. Create ATS-friendly resumes in minutes. No watermarks, unlimited downloads.',
        url: '/free-resume-builder',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Resume Builder - No Credit Card Required',
        description: '100% free resume builder with 20+ templates. Create ATS-friendly resumes. No watermarks.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

// Product Schema for SEO
const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Free Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2450",
        "bestRating": "5",
        "worstRating": "1"
    },
    "featureList": [
        "AI-Powered Content Generation",
        "Voice Input",
        "20+ ATS-Friendly Templates",
        "Job-Specific Tailoring",
        "Unlimited Free PDF Downloads",
        "No Watermarks",
        "No Credit Card Required"
    ]
};

// How-To Schema for SEO
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Build a Professional Resume for Free",
    "description": "Step-by-step guide to creating a professional, ATS-friendly resume using Hirecta's free resume builder",
    "totalTime": "PT10M",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Choose Your Template",
            "text": "Select from 20+ professional ATS-friendly templates designed for your industry. Each template is optimized for Applicant Tracking Systems.",
            "url": `${ENV.BASE_URL}/free-resume-builder#step-1`
        },
        {
            "@type": "HowToStep",
            "name": "Add Your Information",
            "text": "Fill in your personal details, work experience, education, and skills. Use our AI-powered suggestions or voice input to speed up the process.",
            "url": `${ENV.BASE_URL}/free-resume-builder#step-2`
        },
        {
            "@type": "HowToStep",
            "name": "Customize and Tailor",
            "text": "Paste the job description to automatically match relevant keywords. Customize formatting, colors, and sections to fit your needs.",
            "url": `${ENV.BASE_URL}/free-resume-builder#step-3`
        },
        {
            "@type": "HowToStep",
            "name": "Download as PDF",
            "text": "Download your professional resume as a PDF with no watermarks. Unlimited downloads, completely free.",
            "url": `${ENV.BASE_URL}/free-resume-builder#step-4`
        }
    ]
};

export default function FreeResumeBuilderPage() {
    const faqs = [
        { question: "Is Hirecta's resume builder really 100% free?", answer: "Yes, absolutely. We believe that job seekers should have professional career tools regardless of their budget. There are no credit card requirements, no hidden 'premium' download fees, and zero watermarks on your PDFs. Our model is built on helping the most candidates possible." },
        { question: "Can I download my resume as a PDF for free?", answer: "Yes. Unlike many 'free' builders that charge you at the final step, Hirecta provides unlimited, high-quality PDF downloads for free. PDFs are the industry standard because they preserve formatting across all devices and Applicant Tracking Systems." },
        { question: "How long should my resume be in 2026?", answer: "For most professionals, one page is optimal. However, if you have 10+ years of experience or are in academia/research, a two-page resume is acceptable. The key is relevance - every line should add value. Our AI helps you prioritize the most impactful achievements to fit the ideal length." },
        { question: "What's the best font for ATS-friendly resumes?", answer: "Stick with standard fonts like Arial, Calibri, Helvetica, or Times New Roman in 10-12pt size. These fonts are easily parsed by Applicant Tracking Systems. All Hirecta templates use ATS-safe fonts by default, so you don't need to worry about compatibility." },
        { question: "Should I include a photo on my resume?", answer: "In the United States, UK, and Canada, it's generally recommended to NOT include a photo to avoid unconscious bias. However, in many European and Asian countries, photos are expected. Hirecta templates allow you to add photos optionally based on your target market." },
        { question: "How far back should my work history go?", answer: "Typically, include the last 10-15 years of relevant experience. Older positions can be summarized under 'Earlier Career' or omitted entirely unless directly relevant to the role you're applying for. For recent graduates, include all experience including internships and relevant projects." },
        { question: "What's the difference between a resume and a CV?", answer: "A resume is a concise 1-2 page summary of your work experience tailored for a specific job (common in the US). A CV (Curriculum Vitae) is a comprehensive document listing all academic achievements, publications, and research (common in academia and Europe). Hirecta is optimized for resumes." },
        { question: "Can I use color in my ATS-friendly resume?", answer: "Yes, but use color strategically. Stick to professional colors (navy, dark green, charcoal) for section headers and accents. Avoid backgrounds or graphics that can confuse ATS parsers. All Hirecta templates are designed with ATS-safe color schemes tested across major systems." },
        { question: "How do I write a resume with no experience?", answer: "Focus on transferable skills, academic projects, volunteer work, internships, and relevant coursework. Use a skills-based or functional resume format rather than chronological. Our AI is specifically trained to help entry-level candidates highlight achievements from non-traditional experiences." },
        { question: "Do I need a cover letter if I have a great resume?", answer: "Yes, a cover letter is still valuable for most applications. It allows you to explain career gaps, show enthusiasm for the specific company, and demonstrate writing skills. Use our free cover letter builder to create a matching cover letter in minutes." },
        { question: "How many resumes can I create on the free plan?", answer: "You can create unlimited resumes. We encourage you to create a different version for every job application to maximize your chances of getting an interview." },
        { question: "Do you add watermarks to my resume?", answer: "Never. Your resume is your professional brand. We will never clutter it with our logo or any watermarks." },
        { question: "Is my data protected and private?", answer: "We use bank-level 256-bit encryption to protect your data. We do not sell your personal information to third-party recruiters or advertisers. You have the right to delete your data at any time." },
        { question: "How does the voice-input resume feature work?", answer: "Simply click the microphone icon in our editor and describe your work experience as if you were in an interview. Our AI will transcribe your voice and automatically transform it into professional, metrics-driven bullet points." },
        { question: "Are these resumes compatible with Workday and Greenhouse?", answer: "Yes. All our templates are rigorously tested against major ATS platforms including Workday, Greenhouse, Taleo, iCIMS, and Lever. We use clean, parsable HTML structures to ensure high deliverability." },
        { question: "Can I use Hirecta on my mobile phone?", answer: "Yes, our builder is fully responsive. You can edit your resume on your phone and download it directly to apply for jobs on the go. The mobile experience is optimized for quick edits and updates." },
        { question: "What file format should I use when applying to jobs?", answer: "Always submit PDF format unless the job posting specifically requests .docx. PDFs preserve your formatting exactly as designed and are more professional. Our builder generates print-ready, ATS-optimized PDFs instantly." },
        { question: "How often should I update my resume?", answer: "Update your resume every 3-6 months or immediately after major achievements, promotions, new skills, or certifications. Keep a running document of accomplishments so you don't forget important details. Hirecta allows unlimited edits and re-downloads." },
        { question: "Should I include references on my resume?", answer: "No, 'References available upon request' is outdated. Use that space for more valuable content like skills or achievements. Prepare a separate reference list to provide when requested during the interview process." },
        { question: "Do you offer resume templates for specific industries?", answer: "Yes, we have over 20+ templates tailored for Tech, Healthcare, Creative, Finance, Entry-Level, and Executive roles. Each template is designed with industry-specific best practices and formatting conventions." },
        { question: "Why is Hirecta free while others charge $20/month?", answer: "Our goal is to build the world's best career platform. By offering the builder for free, we help more people land jobs. We sustain our platform through optional career services and enterprise partnerships, not by holding your resume hostage." }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Free Resume Builder", url: `${ENV.BASE_URL}/free-resume-builder` }
    ];

    const testimonials = [
        { name: "Sarah Martinez", role: "Marketing Manager", quote: "Got 3 interview calls in just one week after using this builder. The AI suggestions were spot-on!", avatar: "SM" },
        { name: "James Chen", role: "Software Engineer", quote: "The voice input feature saved me hours. I just talked through my experience and it formatted everything professionally.", avatar: "JC" },
        { name: "Emily Rodriguez", role: "Recent Graduate", quote: "Actually free with no tricks! Downloaded my resume as PDF with zero watermarks. Highly recommend.", avatar: "ER" },
        { name: "Michael Brown", role: "Sales Director", quote: "The job description pasting feature is brilliant. It automatically matched keywords and highlighted my relevant experience.", avatar: "MB" },
        { name: "Priya Patel", role: "Product Designer", quote: "Templates look genuinely professional. Landed my dream job at a Fortune 500 company. Thank you!", avatar: "PP" }
    ];

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Writing Assistant",
            desc: "Get smart, pre-written bullet points tailored to your role. Our AI suggests impactful achievements and industry-specific language that hiring managers love."
        },
        {
            icon: <Mic className="w-8 h-8" />,
            title: "Voice Input (Unique!)",
            desc: "Speak your work experience and let AI transcribe and format it professionally. This revolutionary feature cuts resume creation time by 50%."
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Job-Specific Tailoring",
            desc: "Paste any job description and get instant keyword matching and content recommendations optimized for that specific role."
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "ATS Optimization",
            desc: "All templates pass Applicant Tracking Systems used by Fortune 500 companies. Clean formatting, proper structure, and keyword optimization built in."
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "20+ Professional Templates",
            desc: "Choose from modern, classic, creative, and industry-specific designs. All templates are mobile-responsive and print-ready."
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Real-Time Preview",
            desc: "See your resume update instantly as you type. What you see is exactly what you'll download - no surprises."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Free Resume Builder: Create Your Professional Resume Online"
                description="Learn how to use Hirecta's free resume builder to create a job-winning, ATS-friendly resume in minutes without any hidden costs."
                url={`${ENV.BASE_URL}/free-resume-builder`}
                datePublished="2025-02-11"
                author="Hirecta Career Experts"
            />

            {/* Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            {/* HowTo Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto">
                    {/* Trust Badge */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 text-green-800 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            100% Free • No Credit Card Required • No Watermarks
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <p className="text-sm text-gray-500 mb-4">
                            Last updated: February 2026
                        </p>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                            Free Resume Builder - No Credit Card Required
                        </h1>
                        <p className="text-2xl text-gray-600 mb-4">
                            Create Professional, ATS-Friendly Resumes in Minutes
                        </p>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
                            Build a professional resume free (no credit card required) with our online resume builder. Choose from 20+ <Link href="/templates" className="text-blue-600 hover:underline font-semibold">ATS-friendly templates</Link>. 100% free forever. No watermarks. Unlimited downloads. AI-powered suggestions included.
                        </p>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="flex -space-x-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-700">
                                <span className="font-bold">50,000+</span> resumes created this month
                            </p>
                        </div>

                        {/* Primary CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={`${ENV.EDITOR_URL}/editor`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Start Building Free <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/templates"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all"
                            >
                                <FileText className="w-5 h-5" />
                                Browse Templates
                            </Link>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-4 text-center">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-700">
                            <span className="font-bold">4.8/5</span> from 2,450 reviews
                        </p>
                    </div>
                </div>
            </section>

            {/* Success Metrics */}
            <SuccessMetrics
                metrics={[
                    { value: '50,000+', label: 'Resumes Created This Month', sublabel: 'Updated Feb 2026', color: 'blue' },
                    { value: '68%', label: 'Got Interview in 2 Weeks', sublabel: 'User survey, Jan 2026', color: 'purple' },
                    { value: '4.9/5', label: 'Average Rating', sublabel: 'From 12,500+ reviews', color: 'green' },
                    { value: '$0', label: 'Forever. No Tricks.', sublabel: 'No credit card needed', color: 'orange' }
                ]}
            />

            {/* Table of Contents */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <TableOfContents
                        sections={[
                            { id: 'features', title: 'What\'s Included Free' },
                            { id: 'comparison', title: 'vs Competitors' },
                            { id: 'key-features', title: 'Key Features' },
                            { id: 'how-it-works', title: 'How It Works' },
                            { id: 'testimonials', title: 'User Testimonials' },
                            { id: 'faq', title: 'Frequently Asked Questions' }
                        ]}
                    />
                </div>
            </section>

            {/* What's Included Free */}
            <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        Everything Included, Completely Free
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                        No premium features, no upsells, no hidden costs. Everything you need is 100% free.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <CheckCircle className="w-6 h-6" />, title: "20+ Professional Templates", desc: "Modern, classic, and creative designs for every industry" },
                            { icon: <Brain className="w-6 h-6" />, title: "AI Content Suggestions", desc: "Pre-written bullet points and achievement examples" },
                            { icon: <Mic className="w-6 h-6" />, title: "Voice Input Feature", desc: "Speak your experience, we'll format it" },
                            { icon: <Download className="w-6 h-6" />, title: "Unlimited PDF Downloads", desc: "Download as many times as you need" },
                            { icon: <FileText className="w-6 h-6" />, title: "No Watermarks Ever", desc: "Your resume, completely clean and professional" },
                            { icon: <Shield className="w-6 h-6" />, title: "ATS-Friendly Formatting", desc: "Passes all major systems. Check your score with our Free ATS Checker" },
                            { icon: <Sparkles className="w-6 h-6" />, title: "Real-Time Preview", desc: "See changes instantly as you edit" },
                            { icon: <Target className="w-6 h-6" />, title: "Job Matching Keywords", desc: "Use our Tailor tool to optimize for any JD" },
                            { icon: <Users className="w-6 h-6" />, title: "Multiple Resume Versions", desc: "Create unlimited versions for different jobs" },
                        ].map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Create Your Resume in 3 Simple Steps
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { num: "1", title: "Choose Your Template", desc: "Select from 20+ professional, ATS-friendly templates. All free, all modern, all proven to work with hiring managers and ATS systems." },
                            { num: "2", title: "Build Your Content", desc: "Use AI-powered suggestions, pre-written examples, or our unique voice input feature. Add your experience, education, and skills with ease." },
                            { num: "3", title: "Download & Apply", desc: "Get instant, watermark-free PDF downloads. Share with employers or save for later. Edit and re-download unlimited times, forever free." }
                        ].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href={`${ENV.EDITOR_URL}/editor`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                        >
                            Create My Free Resume <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Powerful Features */}
            <section id="key-features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        Powerful Features, All Free
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Professional-grade tools that help you land more interviews
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Loved by Job Seekers
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialized Builders */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        Specialized Resume Builders
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Choose a builder tailored to your industry and experience level
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Software Engineer", href: "/resume-builder/software-engineer", color: "blue" },
                            { title: "Fresher / Entry-Level", href: "/resume-builder/fresher", color: "green" },
                            { title: "IT Professional", href: "/resume-builder/it-professional", color: "cyan" },
                            { title: "Manager / Executive", href: "/resume-builder/manager", color: "purple" }
                        ].map((builder, index) => (
                            <Link
                                key={index}
                                href={builder.href}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                                    {builder.title}
                                </h3>
                                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                                    View Builder <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry-Specific Tips */}
            <IndustryTips
                tips={[
                    {
                        icon: <Briefcase className="w-6 h-6" />,
                        title: "💻 Software Engineers & IT",
                        tips: [
                            "List programming languages in order of proficiency (Python, Java, C++)",
                            "Include GitHub contributions and open-source projects",
                            "Quantify code impact ('Reduced API latency by 40%')",
                            "Mention system design experience for senior roles",
                            "Use technical keywords from job description"
                        ],
                        link: { text: "See Software Engineer Templates", url: "/resume-builder/software-engineer" }
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "📊 Marketing & Sales",
                        tips: [
                            "Lead with campaign ROI metrics (20% increase in conversions)",
                            "Mention tools: Google Analytics, HubSpot, Salesforce",
                            "Show growth percentages for leads, revenue, engagement",
                            "Include multi-channel campaign experience",
                            "Highlight A/B testing and data-driven decisions"
                        ],
                        link: { text: "Browse Marketing Templates", url: "/templates" }
                    },
                    {
                        icon: <GraduationCap className="w-6 h-6" />,
                        title: "🎓 Recent Graduates & Entry-Level",
                        tips: [
                            "Highlight internships and academic projects over GPA",
                            "Include relevant coursework for technical roles",
                            "Showcase leadership in clubs, organizations, hackathons",
                            "Use strong action verbs (led, developed, implemented)",
                            "Focus on transferable skills and potential"
                        ],
                        link: { text: "See Entry-Level Templates", url: "/resume-builder/fresher" }
                    }
                ]}
            />

            {/* Common Resume Mistakes */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        10 Resume Mistakes Costing You Interviews
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Avoid these common pitfalls that recruiters see every day
                    </p>

                    <div className="space-y-6">
                        {[
                            { mistake: "Generic, One-Size-Fits-All Resume", fix: "Tailor your resume for each job using our AI Tailor tool. Match keywords from the job description." },
                            { mistake: "Typos and Grammar Errors", fix: "Run spell-check and ask a friend to proofread. Even one typo can disqualify you from consideration." },
                            { mistake: "Unprofessional Email Address", fix: "Use firstname.lastname@gmail.com format. Avoid hotgirl2000@yahoo or similar unprofessional addresses." },
                            { mistake: "Using 'Responsible For' Instead of Achievements", fix: "Replace 'Responsible for managing team' with 'Led team of 5 to achieve 25% revenue growth in Q3'." },
                            { mistake: "Including Irrelevant Information", fix: "Remove hobbies unrelated to the job. Your love of knitting won't help land a software engineering role." },
                            { mistake: "Walls of Text With No White Space", fix: "Use bullet points, clear sections, and margins. Recruiters spend 6 seconds scanning - make it easy." },
                            { mistake: "Outdated Fonts or Formatting", fix: "Stick to modern, clean fonts like Calibri or Arial. Avoid Comic Sans, script fonts, or excessive colors." },
                            { mistake: "Not Quantifying Achievements", fix: "Add numbers: 'Increased sales' → 'Increased sales by 35% ($450K) in 6 months through cold outreach'." },
                            { mistake: "Missing Keywords for ATS Systems", fix: "Use exact phrases from job posting. If they want 'project management', don't just say 'led projects'." },
                            { mistake: "Two-Page Resume for Entry-Level Roles", fix: "Keep it to one page unless you have 10+ years experience. Quality over quantity - every line should add value." }
                        ].map((item, index) => (
                            <div key={index} className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
                                <h3 className="text-lg font-bold text-red-900 mb-2 flex items-start gap-2">
                                    <span className="text-red-600">❌</span>
                                    <span>Mistake #{index + 1}: {item.mistake}</span>
                                </h3>
                                <p className="text-gray-700 ml-6">
                                    <span className="font-semibold text-green-700">✓ Fix:</span> {item.fix}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2026 Resume Trends */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                        2026 Resume Trends You Need to Know
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Stay ahead with the latest best practices in resume writing
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-green-600">✅</span>
                                What's IN (2026)
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span><strong>Skills-based resumes</strong> - Highlight what you can do, not just chronological history</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span><strong>Quantified achievements</strong> - Numbers, percentages, dollar amounts prove impact</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span><strong>LinkedIn QR codes</strong> - Easy way for recruiters to view your full profile</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span><strong>ATS-optimized formatting</strong> - Clean, parsable layouts beat fancy graphics</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span><strong>Soft skills with proof</strong> - 'Strong communicator' → 'Presented to C-suite executives'</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span><strong>Remote work experience</strong> - Highlight async collaboration and digital tools</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-red-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-red-600">❌</span>
                                What's OUT (Avoid)
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">•</span>
                                    <span><strong>Objective statements</strong> - Replaced by professional summaries or removed entirely</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">•</span>
                                    <span><strong>'References available upon request'</strong> - Wastes valuable space, now assumed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">•</span>
                                    <span><strong>Unprofessional email addresses</strong> - partygirl2000@hotmail is an instant rejection</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">•</span>
                                    <span><strong>Generic templates</strong> - Stand out with industry-specific formatting</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">•</span>
                                    <span><strong>Buzzwords without proof</strong> - 'Synergy', 'rockstar', 'ninja' without context</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">•</span>
                                    <span><strong>Physical mailing address</strong> - City/state is enough for privacy and brevity</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-xl shadow-md text-center">
                        <p className="text-lg text-gray-700">
                            <strong className="text-blue-600">Pro Tip:</strong> Hirecta's templates are automatically updated with 2026 best practices.
                            You don't need to be a resume expert - our AI handles the formatting and structure for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">The Ultimate Guide to Building a Winning Resume for Free</h2>
                        <p>
                            In today's economy, the cost of job hunting is rising. From professional headshots to premium LinkedIn subscriptions, the expenses add up. At Hirecta, we believe your resume builder shouldn't be another bill. Here is why choosing a <strong>Free Resume Builder</strong> is a strategic move for your career.
                        </p>

                        <section className="my-12 p-8 bg-blue-50 rounded-3xl border border-blue-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <Shield className="text-blue-600" /> The Hirecta Philosophy: Why We Are Free
                            </h3>
                            <p className="text-lg leading-relaxed">
                                Most "free" resume builders on the internet use a "bait-and-switch" model. They let you spend 30 minutes building your resume, only to demand a credit card at the final download step. We find this practice unethical. Hirecta was founded on the principle that the tools to land a job should be accessible to everyone. Our <strong>Unlimited Free Downloads</strong> and <strong>No Watermark</strong> policy is our commitment to your success.
                            </p>
                        </section>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How to Build a High-Impact Resume in 2026</h3>
                        <p>
                            Having a free tool is one thing; knowing how to use it is another. To stand out among thousands of applicants, your resume must be a masterclass in professional storytelling.
                        </p>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Focus on Outcomes, Not Duties</h4>
                                    <p className="text-sm">Don't just list what you did. List what you *achieved*. Use our AI suggestions to turn "Managed social media" into "Increased organic social media engagement by 45% in 6 months using data-driven content strategies."</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Leverage the 'Voice-to-Resume' Feature</h4>
                                    <p className="text-sm">Many people are better at talking about their work than writing about it. Use our unique <span className="font-semibold">Voice Input</span> tool to describe your last project. Our AI will clean up the filler words and output professional bullet points that sound authoritative.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Tailor for the ATS</h4>
                                    <p className="text-sm">Every job description is a list of answers. Use our <Link href="/tailor" className="text-blue-600 hover:underline font-semibold">AI Tailoring Tool</Link> to ensure your resume mirrors the language of the JD. This is the #1 way to move from the 'Rejected' pile to the 'Interview' list.</p>
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Free Resume Strategy for Students and Freshers</h3>
                        <p>
                            If you're just starting your career, you might feel like you have nothing to write. Our AI is specifically trained to help entry-level candidates bridge the "Experience Gap."
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                                <h4 className="font-bold text-gray-900 mb-2">Highlight Projects</h4>
                                <p className="text-sm text-gray-600">University projects, volunteer work, and personal coding repos are valuable experiences. Our builder treats these sections with the same professional weight as full-time jobs.</p>
                            </div>
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                                <h4 className="font-bold text-gray-900 mb-2">Skill-Based Layouts</h4>
                                <p className="text-sm text-gray-600">When you lack years of experience, focus on your skills. Choose a template that emphasizes your certifications and technical proficiencies.</p>
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Hidden Cost of "Paid" Resume Builders</h3>
                        <ol className="space-y-4">
                            <li><strong>Subscription Traps:</strong> Many builders sign you up for a $20/month fee after an initial $1 "trial." Hirecta is permanently free.</li>
                            <li><strong>Data Reselling:</strong> Some free tools sell your contact information to data brokers. We keep your data encrypted and private.</li>
                            <li><strong>Formatting Locked Behind Paywalls:</strong> Don't get stuck with a resume you can't edit without paying more. With Hirecta, you own your data.</li>
                        </ol>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Step-by-Step: 10 Minutes to a New Career</h3>
                        <p>Our goal is to make the process as frictionless as possible. Here is how to use Hirecta to its full potential:</p>
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 my-8">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <CheckCircle className="text-blue-600 shrink-0" />
                                    <p><strong>Step 1:</strong> Select an <Link href="/templates" className="text-blue-600 hover:underline font-semibold">ATS-optimized template</Link>.</p>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle className="text-blue-600 shrink-0" />
                                    <p><strong>Step 2:</strong> Use the "AI Enhance" button on your work experience to boost the professional tone.</p>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle className="text-blue-600 shrink-0" />
                                    <p><strong>Step 3:</strong> Perform a final scan with our <Link href="/ats-checker" className="text-blue-600 hover:underline font-semibold">Free ATS Score tool</Link>.</p>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle className="text-blue-600 shrink-0" />
                                    <p><strong>Step 4:</strong> Download your watermark-free PDF and start applying!</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xl font-medium text-gray-900 mt-12">
                            A great career shouldn't be gated by a subscription fee. Start building your future today with Hirecta.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Stop Paying for Resume Builders
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join 50,000+ job seekers who've switched to Hirecta for a truly free, professional experience.
                    </p>
                    <Link
                        href={`${ENV.EDITOR_URL}/editor`}
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl"
                    >
                        Create My Free Resume Now <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-sm opacity-80">
                        No credit card required • No watermarks • 100% free forever
                    </p>
                </div>
            </section>
        </div >
    );
}
