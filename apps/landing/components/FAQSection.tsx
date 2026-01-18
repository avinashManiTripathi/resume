'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function FAQSection() {
    const faqs = [
        {
            question: "Is this resume builder truly free?",
            answer: "Yes, absolutely. You can build, customize, and download your resume without paying a cent. We believe in democratizing career success. We support our platform through optional premium features for power users, but the core building and downloading functionality is 100% free."
        },
        {
            question: "Can I download my resume as a PDF?",
            answer: "Yes! PDF is the industry standard for resumes because it preserves your formatting across all devices and applicant tracking systems (ATS). Our builder exports high-quality, ATS-readable PDFs instantly."
        },
        {
            question: "Is my data safe?",
            answer: "Security is our top priority. We use bank-level 256-bit encryption to protect your personal information. Unlike other 'free' platforms, we do not sell your data to recruiters or third parties. You have full control over your privacy."
        },
        {
            question: "Do you have templates for students/freshers?",
            answer: "Yes, we have a dedicated collection of templates designed specifically for students, interns, and recent graduates. These templates focus on education, projects, and skills rather than work experience to help you land your first job."
        },
        {
            question: "How does the AI writing assistant work?",
            answer: "Our AI is powered by advanced language models like GPT-4. It analyzes your job title and suggests professional, impact-driven bullet points. It helps you rewrite weak descriptions into powerful achievements with action verbs and metrics."
        },
        {
            question: "Will my resume pass ATS scanners?",
            answer: "Yes. All our templates are rigorously tested against popular Applicant Tracking Systems (ATS) like Taleo, Greenhouse, and Lever. We ensure proper heading structure, readable fonts, and correct metadata so your resume never gets auto-rejected."
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                        <HelpCircle className="w-4 h-4" />
                        Common Questions
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Frequently Asked <span className="text-purple-600">Questions</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about building your perfect resume with ProfResume.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>

                <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-purple-600">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Still have questions?</h3>
                            <p className="text-gray-600 mb-4">We're here to help you get hired.</p>
                            <Link href="/contact" className="text-purple-600 font-bold hover:underline">
                                Contact Support &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`border rounded-xl transition-all duration-300 ${isOpen ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200 hover:border-purple-200'}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-purple-900' : 'text-gray-900'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-purple-100 text-purple-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}
