import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Target, Sparkles, Zap, Brain, TrendingUp, Shield } from 'lucide-react';
import { ENV } from "@/app/env";

export const metadata: Metadata = {
    title: 'AI Resume Tailoring - Customize Your Resume for Any Job | ProfResume',
    description: 'Tailor your resume to any job in 30 seconds with AI. Paste a job description and get an optimized resume that matches requirements and passes ATS. Increase your interview chances by 3x.',
    keywords: 'AI resume tailoring, job-specific resume, ATS optimization, resume customization, job description matching, AI resume optimizer',
    alternates: {
        canonical: '/tailor',
    },
    openGraph: {
        title: 'AI Resume Tailoring - Match Any Job in 30 Seconds',
        description: 'Use AI to tailor your resume for any job. Automatic keyword optimization, ATS-friendly formatting, and skill highlighting.',
        url: '/tailor',
        type: 'website',
        images: [{
            url: '/og-tailor.jpg',
            width: 1200,
            height: 630,
            alt: 'AI Resume Tailoring',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Resume Tailoring - Match Any Job in 30 Seconds',
        description: 'Tailor your resume to any job with AI. Increase interview chances by 3x.',
        images: ['/og-tailor.jpg'],
    },
};

export default function TailorPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                            <Target className="w-4 h-4" />
                            AI-Powered Tailoring
                        </div>
                        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Tailor Your Resume to{' '}
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Any Job in 30 Seconds
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Stop sending the same resume to every job. Our AI analyzes job descriptions and automatically
                            optimizes your resume to match requirements, highlight relevant skills, and pass ATS filters.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={ENV.EDITOR_URL}
                                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-3 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all group"
                            >
                                Start Tailoring Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all inline-flex items-center justify-center"
                            >
                                See How It Works
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600">3x</div>
                            <div className="text-sm text-gray-600 mt-1">More Interviews</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600">30s</div>
                            <div className="text-sm text-gray-600 mt-1">Tailoring Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600">95%</div>
                            <div className="text-sm text-gray-600 mt-1">Match Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
                                description: 'Copy and paste the job posting or LinkedIn job URL. Our AI instantly analyzes requirements, skills, and keywords.',
                                icon: <Target className="w-8 h-8" />,
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
                            <div key={index} className="relative">
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all h-full">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                        {item.step}
                                    </div>
                                    <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-6`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
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
                            <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all">
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

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to Get More Interviews?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Start tailoring your resume today and see the difference it makes
                    </p>
                    <Link
                        href={ENV.EDITOR_URL}
                        className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
                    >
                        Tailor Your Resume Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                question: 'How does AI resume tailoring work?',
                                answer: 'Our AI analyzes the job description to identify key requirements, skills, and keywords. It then automatically adjusts your resume to highlight relevant experience, optimize keyword density, and ensure ATS compatibility.'
                            },
                            {
                                question: 'Is tailoring really necessary for every job?',
                                answer: 'Yes! Studies show that tailored resumes get 3x more interview callbacks. Generic resumes often get filtered out by ATS systems or overlooked by recruiters who see hundreds of applications.'
                            },
                            {
                                question: 'How long does it take to tailor a resume?',
                                answer: 'Just 30 seconds! Simply paste the job description, and our AI instantly generates a tailored version of your resume optimized for that specific position.'
                            },
                            {
                                question: 'Will my original resume be changed?',
                                answer: 'No, your original resume is never modified. Each tailored version is saved separately, so you can create unlimited customized resumes for different jobs.'
                            },
                            {
                                question: 'Does it work for all industries?',
                                answer: 'Yes! Our AI is trained on millions of job postings across all industries. Whether you\'re in tech, healthcare, finance, or any other field, it understands industry-specific requirements.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
