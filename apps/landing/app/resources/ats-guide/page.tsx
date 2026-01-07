"use client";

import { Navigation } from "@/components/Navigation";
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { Bot, CheckCircle, XCircle, Lightbulb, Target, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ATSGuidePage() {
    const faqs = [
        { question: "What is an ATS?", answer: "ATS (Applicant Tracking System) is software that screens and ranks resumes before human recruiters see them. Over 90% of large companies use ATS." },
        { question: "How do I know if my resume is ATS-friendly?", answer: "Use our ATS scanner to check compatibility. Key factors: simple formatting, standard fonts, clear section headers, and relevant keywords." },
        { question: "What formatting should I avoid?", answer: "Avoid tables, text boxes, headers/footers, images, graphics, and unusual fonts. Stick to standard one-column layouts with clear headings." },
        { question: "Do all companies use ATS?", answer: "About 99% of Fortune 500 and 70% of all companies use ATS. Even small companies increasingly adopt ATS for efficiency." },
        { question: "Can I beat the ATS?", answer: "Yes, by using proper formatting, relevant keywords, standard section names, and ensuring your PDF/DOCX is text-readable, not image-based." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <ArticleSchema
                title="Complete ATS Guide - Beat Applicant Tracking Systems"
                description="Master ATS optimization with our complete guide. Learn how ATS works, formatting best practices, and keyword strategies."
                url="https://profresume.com/resources/ats-guide"
            />
            <FAQSchema faqs={faqs} />

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                        <Bot className="w-4 h-4" />
                        ATS Guide
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        Beat Applicant Tracking Systems
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn how to optimize your resume to pass ATS screening and land more interviews.
                    </p>
                </div>
            </section>

            {/* What is ATS */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">What is an ATS?</h2>
                    </div>
                    <div className="prose prose-lg max-w-none mb-8">
                        <p className="text-gray-600 leading-relaxed mb-4">
                            An Applicant Tracking System (ATS) is software used by employers to collect, scan, and rank job applications. Over 75% of resumes are rejected by ATS before they ever reach a human recruiter.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            ATS software scans your resume for specific keywords, proper formatting, and relevant experience. Understanding how ATS works is crucial to getting your resume past this initial screening.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            { stat: "75%", label: "Resumes rejected by ATS", icon: <XCircle className="w-6 h-6 text-red-600" /> },
                            { stat: "98%", label: "Fortune 500 use ATS", icon: <TrendingUp className="w-6 h-6 text-blue-600" /> },
                            { stat: "6 sec", label: "Average resume scan time", icon: <Target className="w-6 h-6 text-purple-600" /> }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                                <div className="flex justify-center mb-3">{item.icon}</div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</div>
                                <div className="text-sm text-gray-600">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ATS-Friendly Tips */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">How to Make Your Resume ATS-Friendly</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                title: "Use Standard Section Headings",
                                description: "Stick to conventional headings like 'Work Experience,' 'Education,' and 'Skills.' Avoid creative titles that ATS might not recognize.",
                                dos: ["Work Experience", "Professional Experience", "Education", "Skills"],
                                donts: ["Where I've Been", "My Journey", "What I Know"]
                            },
                            {
                                title: "Include Relevant Keywords",
                                description: "Mirror the language used in the job description. Include both acronyms and full terms (e.g., 'SEO' and 'Search Engine Optimization').",
                                dos: ["Match job description keywords", "Include industry terms", "Use both acronyms and full terms"],
                                donts: ["Keyword stuffing", "Irrelevant buzzwords", "Only using acronyms"]
                            },
                            {
                                title: "Use a Simple Format",
                                description: "Stick to standard fonts, avoid tables, text boxes, headers/footers, and graphics that ATS can't read.",
                                dos: ["Arial, Calibri, or Times New Roman", "Standard bullet points", "Clear section breaks"],
                                donts: ["Tables or columns", "Text boxes", "Headers/footers", "Images or graphics"]
                            },
                            {
                                title: "Save in the Right Format",
                                description: "Unless specified otherwise, submit your resume as a .docx or PDF file. Some older ATS struggle with PDFs.",
                                dos: [".docx format", "PDF (if specified)", "Plain text (.txt) as backup"],
                                donts: [".pages format", "Image files", "Compressed files"]
                            },
                            {
                                title: "Spell Out Acronyms",
                                description: "Include both the acronym and spelled-out version of important terms to ensure ATS catches them.",
                                dos: ["Bachelor of Science (BS)", "Search Engine Optimization (SEO)"],
                                donts: ["Only BS", "Only SEO"]
                            }
                        ].map((tip, index) => (
                            <div key={index} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                                <p className="text-gray-600 mb-4">{tip.description}</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-700">Do:</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {tip.dos.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-600 pl-7">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <XCircle className="w-5 h-5 text-red-600" />
                                            <span className="font-semibold text-red-700">Don't:</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {tip.donts.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-600 pl-7">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Checklist */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">ATS Optimization Checklist</h2>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "Use standard section headings",
                                "Include keywords from job description",
                                "Use simple, clean formatting",
                                "Avoid tables and text boxes",
                                "Save as .docx or PDF",
                                "Spell out acronyms",
                                "Use standard fonts",
                                "Include contact information",
                                "List skills clearly",
                                "Quantify achievements",
                                "Proofread for errors",
                                "Tailor for each application"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-6">
                        Create an ATS-Optimized Resume
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Our templates are designed to pass ATS screening and get you more interviews.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/editor"
                            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                        >
                            <Award className="w-5 h-5" />
                            Build ATS Resume
                        </Link>
                        <Link
                            href="/ats-checker"
                            className="inline-flex items-center gap-2 bg-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-800 transition-all border-2 border-white"
                        >
                            <Bot className="w-5 h-5" />
                            Check ATS Score
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
