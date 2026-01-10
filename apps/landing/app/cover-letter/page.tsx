import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, FileText, Sparkles, Zap, Clock, Brain, Target, Download } from 'lucide-react';
import { ENV } from "@/app/env";

export const metadata: Metadata = {
    title: 'AI Cover Letter Generator - Create Professional Cover Letters in 2 Minutes | ProfResume',
    description: 'Generate perfectly tailored cover letters instantly with AI. Just paste a job description and get a professional, customized cover letter that matches your resume. Free to use, instant PDF download.',
    keywords: 'AI cover letter generator, cover letter builder, job application letter, professional cover letter, AI writing assistant, cover letter template',
    alternates: {
        canonical: '/cover-letter',
    },
    openGraph: {
        title: 'AI Cover Letter Generator - Professional Letters in 2 Minutes',
        description: 'Create tailored cover letters instantly with AI. Match any job, professionally written, instant PDF download.',
        url: '/cover-letter',
        type: 'website',
        images: [{
            url: '/og-cover-letter.jpg',
            width: 1200,
            height: 630,
            alt: 'AI Cover Letter Generator',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Cover Letter Generator - Professional Letters in 2 Minutes',
        description: 'Generate tailored cover letters with AI. Instant, professional, free.',
        images: ['/og-cover-letter.jpg'],
    },
};

export default function CoverLetterPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                            <FileText className="w-4 h-4" />
                            AI-Powered Writing
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                            Generate Perfect Cover Letters{' '}
                            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                in 2 Minutes
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Stop spending hours writing cover letters. Our AI creates perfectly tailored, professional
                            cover letters that match your resume and the job requirements. Just paste the job link.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`${ENV.EDITOR_URL}/cover-letter`}
                                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-3 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all group"
                            >
                                Create Cover Letter Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#templates"
                                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all inline-flex items-center justify-center"
                            >
                                View Templates
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600">2min</div>
                            <div className="text-sm text-gray-600 mt-1">Generation Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600">100%</div>
                            <div className="text-sm text-gray-600 mt-1">Free to Use</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600">3</div>
                            <div className="text-sm text-gray-600 mt-1">Pro Templates</div>
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
                            Three simple steps to your perfect cover letter
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Choose a Template',
                                description: 'Select from professional, creative, or technical cover letter templates designed by experts.',
                                icon: <FileText className="w-8 h-8" />,
                                color: 'green'
                            },
                            {
                                step: '2',
                                title: 'Paste Job Description',
                                description: 'Add the job posting or company details. Our AI analyzes requirements and crafts a personalized letter.',
                                icon: <Brain className="w-8 h-8" />,
                                color: 'blue'
                            },
                            {
                                step: '3',
                                title: 'Download & Send',
                                description: 'Review your cover letter, make any tweaks, and download as PDF. Ready to send with your resume!',
                                icon: <Download className="w-8 h-8" />,
                                color: 'purple'
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all h-full">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

            {/* Templates Section */}
            <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Professional Cover Letter Templates
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from expertly designed templates for different industries and roles
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Professional Standard',
                                description: 'Clean and corporate format ideal for traditional industries like finance, consulting, and law.',
                                features: ['Traditional layout', 'Conservative tone', 'ATS-friendly'],
                                color: 'blue'
                            },
                            {
                                name: 'Modern Creative',
                                description: 'Contemporary and engaging format perfect for startups, marketing, and creative roles.',
                                features: ['Modern design', 'Personable tone', 'Startup-friendly'],
                                color: 'purple'
                            },
                            {
                                name: 'Technical Expert',
                                description: 'Tech-focused language for software engineers, data scientists, and IT professionals.',
                                features: ['Technical emphasis', 'Skills-focused', 'Engineering-optimized'],
                                color: 'green'
                            }
                        ].map((template, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{template.name}</h3>
                                <p className="text-gray-600 mb-6">{template.description}</p>
                                <ul className="space-y-3 mb-6">
                                    {template.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={`${ENV.EDITOR_URL}/cover-letter?template=${template.name.toLowerCase().replace(' ', '-')}`}
                                    className={`block text-center bg-${template.color}-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-${template.color}-700 transition-all`}
                                >
                                    Use This Template
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Why Use Our Cover Letter Generator?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Save time and create better cover letters with AI assistance
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Clock className="w-6 h-6" />,
                                title: 'Save Hours of Time',
                                description: 'No more staring at a blank page. Generate a complete, professional cover letter in 2 minutes instead of hours.'
                            },
                            {
                                icon: <Brain className="w-6 h-6" />,
                                title: 'AI-Powered Writing',
                                description: 'Our AI writes professionally, using industry-specific language and addressing job requirements naturally.'
                            },
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: 'Job-Specific Content',
                                description: 'Each letter is tailored to the specific job and company, highlighting your most relevant experience.'
                            },
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: 'Professional Quality',
                                description: 'Get recruiter-approved content with proper formatting, structure, and tone for your industry.'
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: 'Instant PDF Download',
                                description: 'Download your cover letter as a professional PDF immediately, ready to attach to your application.'
                            },
                            {
                                icon: <FileText className="w-6 h-6" />,
                                title: '100% Free',
                                description: 'Create unlimited cover letters for free. No hidden fees, no watermarks, no credit card required.'
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
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
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to Create Your Cover Letter?
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join thousands who've landed interviews with AI-generated cover letters
                    </p>
                    <Link
                        href={`${ENV.EDITOR_URL}/cover-letter`}
                        className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
                    >
                        Generate Cover Letter Free
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
                                question: 'Is the cover letter generator really free?',
                                answer: 'Yes! Create unlimited cover letters completely free with no hidden costs, watermarks, or credit card required. Download as PDF instantly.'
                            },
                            {
                                question: 'How does the AI generate cover letters?',
                                answer: 'Our AI analyzes the job description and your resume to create a personalized cover letter. It matches your experience to job requirements and writes in a professional, industry-appropriate tone.'
                            },
                            {
                                question: 'Can I edit the generated cover letter?',
                                answer: 'Absolutely! You can review and edit every part of the cover letter before downloading. Make it truly yours with any personal touches or specific details you want to add.'
                            },
                            {
                                question: 'Which template should I choose?',
                                answer: 'Choose Professional Standard for traditional industries (finance, law, corporate), Modern Creative for startups and creative roles, or Technical Expert for engineering and IT positions.'
                            },
                            {
                                question: 'How long does it take to generate a cover letter?',
                                answer: 'Just 2 minutes! Choose a template, paste the job description, add your details, and download your professionally written cover letter as PDF.'
                            },
                            {
                                question: 'Do I need to create an account?',
                                answer: 'No account needed to generate a cover letter! You only need to sign up if you want to save your cover letters for future use or access premium features.'
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
