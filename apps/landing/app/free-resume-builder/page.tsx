import { Metadata } from 'next';
import { Sparkles, CheckCircle, Download, Zap, Brain, Target, Users, Shield, FileText, ArrowRight, Star, Award, Mic, Clock } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';
import { ENV } from "@/app/env";

export const metadata: Metadata = {
    title: 'Free Resume Builder - Create Professional Resumes Online (No Credit Card)',
    description: 'Build professional, ATS-friendly resumes with our 100% free resume builder. 20+ templates, AI-powered suggestions, unlimited PDF downloads. No credit card required, no watermarks.',
    keywords: 'free resume builder, free resume maker, resume builder no credit card, free resume templates, ATS resume builder free, online resume builder free, free professional resume builder',
    alternates: {
        canonical: '/free-resume-builder',
    },
    openGraph: {
        title: 'Free Resume Builder - No Credit Card Required',
        description: '100% free resume builder with 20+ templates. Create ATS-friendly resumes in minutes. No watermarks, unlimited downloads.',
        url: '/free-resume-builder',
        type: 'website',
    },
};

// Product Schema for SEO
const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProfResume Free Resume Builder",
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

export default function FreeResumeBuilderPage() {
    const faqs = [
        { question: "Is this really free?", answer: "Yes, 100% free. No credit card required, no hidden charges, no watermarks. Create unlimited resumes and download as many times as you need." },
        { question: "What file formats can I download?", answer: "You can download your resume as PDF (recommended for job applications) or DOCX (for further editing). Both formats are completely free." },
        { question: "How many resumes can I create?", answer: "Unlimited! Create as many resume versions as you need for different jobs. Save them all and edit anytime." },
        { question: "Do you add watermarks to free resumes?", answer: "No, absolutely not. All downloads are completely watermark-free, even on the free plan." },
        { question: "Is my data safe?", answer: "Yes, we use bank-level encryption to protect your data. We never sell your information to third parties. Read our privacy policy for details." },
        { question: "How long does it take to create a resume?", answer: "Most users complete their professional resume in 10-15 minutes using our AI-powered suggestions and pre-written content." },
        { question: "Are the resumes ATS-friendly?", answer: "Yes! All our templates are designed to pass Applicant Tracking Systems (ATS) used by 99% of companies. Clean formatting, proper structure, standard fonts." },
        { question: "Can I edit my resume later?", answer: "Absolutely. Save your resume and come back anytime to make updates. Your resumes are stored securely in your account." },
        { question: "Do I need to sign up?", answer: "Yes, a free account is required to save your work and access your resumes later. Sign up takes less than 30 seconds." },
        { question: "What makes this different from other free resume builders?", answer: "We offer unique features like voice input (speak your experience), job description pasting for auto-tailoring, and true unlimited free access with no tricks or upsells." }
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
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />

            {/* Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
                        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Free Resume Builder
                        </h1>
                        <p className="text-2xl text-gray-600 mb-4">
                            Create Professional, ATS-Friendly Resumes in Minutes
                        </p>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
                            Build beautiful resumes with 20+ templates. 100% free forever. No credit card required. No watermarks. Unlimited downloads. AI-powered suggestions included.
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

            {/* What's Included Free */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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
                            { icon: <Shield className="w-6 h-6" />, title: "ATS-Friendly Formatting", desc: "Passes all major applicant tracking systems" },
                            { icon: <Sparkles className="w-6 h-6" />, title: "Real-Time Preview", desc: "See changes instantly as you edit" },
                            { icon: <Target className="w-6 h-6" />, title: "Job Matching Keywords", desc: "Paste job descriptions for optimization" },
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
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
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Ready to Create Your Free Resume?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join 50,000+ job seekers who've created professional resumes with our free builder
                    </p>
                    <Link
                        href={`${ENV.EDITOR_URL}/editor`}
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl"
                    >
                        Start Building Now - It's Free <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-sm opacity-80">
                        No credit card required • No watermarks • 100% free forever
                    </p>
                </div>
            </section>
        </div>
    );
}
