"use client";

import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { FileText, CheckCircle, AlertCircle, Lightbulb, Target, Award, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function ResumeGuidePage() {
    const sections = [
        {
            title: "Resume Basics",
            icon: <FileText className="w-6 h-6" />,
            color: "blue",
            topics: [
                { title: "What is a Resume?", description: "Understanding the purpose and importance of a well-crafted resume" },
                { title: "Resume vs CV", description: "Key differences and when to use each document" },
                { title: "Resume Length", description: "How long should your resume be for your experience level" },
                { title: "Resume Format Types", description: "Chronological, functional, and combination formats explained" }
            ]
        },
        {
            title: "Essential Sections",
            icon: <CheckCircle className="w-6 h-6" />,
            color: "green",
            topics: [
                { title: "Contact Information", description: "What to include and how to format your contact details" },
                { title: "Professional Summary", description: "Writing a compelling summary that grabs attention" },
                { title: "Work Experience", description: "How to showcase your achievements and responsibilities" },
                { title: "Education Section", description: "Formatting your education and relevant coursework" },
                { title: "Skills Section", description: "Highlighting technical and soft skills effectively" }
            ]
        },
        {
            title: "Writing Tips",
            icon: <Lightbulb className="w-6 h-6" />,
            color: "yellow",
            topics: [
                { title: "Action Verbs", description: "Powerful verbs to make your accomplishments stand out" },
                { title: "Quantifying Achievements", description: "Using numbers and metrics to demonstrate impact" },
                { title: "Tailoring Your Resume", description: "Customizing your resume for each job application" },
                { title: "Keywords Optimization", description: "Using industry-specific keywords to pass ATS" }
            ]
        },
        {
            title: "Common Mistakes",
            icon: <AlertCircle className="w-6 h-6" />,
            color: "red",
            topics: [
                { title: "Typos and Grammar", description: "How to proofread and avoid common errors" },
                { title: "Irrelevant Information", description: "What to leave out of your resume" },
                { title: "Poor Formatting", description: "Design mistakes that hurt readability" },
                { title: "Lying or Exaggerating", description: "Why honesty is crucial and how to be truthful" }
            ]
        }
    ];

    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        yellow: "bg-yellow-100 text-yellow-600",
        red: "bg-red-100 text-red-600"
    };

    const faqs = [
        { question: "How long should my resume be?", answer: "1 page for 0-5 years experience, 2 pages for 5+ years. Quality over quantity - every line should add value." },
        { question: "Should I include a photo on my resume?", answer: "In the US, no - it can lead to discrimination concerns. In some countries (Europe, Asia), it's expected. Check local norms." },
        { question: "What's the best resume format?", answer: "Reverse-chronological is most common and ATS-friendly. Use functional only if changing careers or have employment gaps." },
        { question: "How far back should my work history go?", answer: "10-15 years is standard. Older experience can be summarized briefly or omitted unless highly relevant." },
        { question: "Should I include references?", answer: "No, save space. Have a separate reference list ready and provide when requested. 'References available upon request' is outdated." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <ArticleSchema
                title="Complete Resume Writing Guide 2026"
                description="Comprehensive resume writing guide covering formatting, content, ATS optimization, and modern best practices."
                url="https://profresume.com/resources/resume-guide"
            />
            <FAQSchema faqs={faqs} />
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" />
                        Complete Guide
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        The Ultimate Resume Writing Guide
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to know to create a professional, ATS-friendly resume that gets you interviews.
                    </p>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: <Target className="w-8 h-8 text-blue-600" />, stat: "6 seconds", label: "Average resume review time" },
                            { icon: <TrendingUp className="w-8 h-8 text-green-600" />, stat: "75%", label: "Resumes rejected by ATS" },
                            { icon: <Award className="w-8 h-8 text-purple-600" />, stat: "2-3", label: "Ideal resume pages" },
                            { icon: <Users className="w-8 h-8 text-orange-600" />, stat: "250+", label: "Average applicants per job" }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-3">{item.icon}</div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</div>
                                <div className="text-sm text-gray-600">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-16">
                        {sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[section.color as keyof typeof colorClasses]}`}>
                                        {section.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {section.topics.map((topic, topicIndex) => (
                                        <div
                                            key={topicIndex}
                                            className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                                        >
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
                        Ready to Create Your Professional Resume?
                    </h2>
                    <p className="text-xl text-gray-700 mb-8">
                        Use our resume builder to create an ATS-friendly resume in minutes.
                    </p>
                    <Link
                        href="https://edit.profresume.com/editor"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                    >
                        <FileText className="w-5 h-5" />
                        Start Building Now
                    </Link>
                </div>
            </section>


        </div>
    );
}
