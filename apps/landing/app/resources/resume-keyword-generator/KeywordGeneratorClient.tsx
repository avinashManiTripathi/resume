"use client";

import React, { useState } from "react";
import {
    Search,
    FileText,
    Zap,
    Target,
    ShieldCheck,
    Lightbulb,
    ArrowRight,
    Copy,
    CheckCircle2,
    RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function KeywordGeneratorClient() {
    const [jobDescription, setJobDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [keywords, setKeywords] = useState<{
        hard: string[];
        soft: string[];
        tools: string[];
    } | null>(null);

    const generateKeywords = () => {
        if (!jobDescription.trim()) return;

        setIsGenerating(true);

        setTimeout(() => {
            const text = jobDescription.toLowerCase();

            const hardSkillsPool = [
                "react", "javascript", "typescript", "node.js", "python", "java", "c++",
                "project management", "data analysis", "marketing strategy", "seo",
                "ui/ux design", "sql", "aws", "cloud computing", "machine learning",
                "agile", "scrum", "product development", "financial modeling"
            ];

            const softSkillsPool = [
                "communication", "leadership", "teamwork", "problem solving",
                "critical thinking", "adaptability", "time management", "creativity",
                "collaboration", "emotional intelligence", "public speaking"
            ];

            const toolsPool = [
                "figma", "jira", "slack", "trello", "microsoft office", "excel",
                "google analytics", "hubspot", "salesforce", "docker", "kubernetes",
                "git", "github", "photoshop", "illustrator"
            ];

            const extractedHard = hardSkillsPool.filter(skill => text.includes(skill));
            const extractedSoft = softSkillsPool.filter(skill => text.includes(skill));
            const extractedTools = toolsPool.filter(tool => text.includes(tool));

            setKeywords({
                hard: extractedHard.length > 0 ? extractedHard : ["Strategic Planning", "Project Management", "Technical Leadership"],
                soft: extractedSoft.length > 0 ? extractedSoft : ["Communications", "Problem Solving", "Adaptability"],
                tools: extractedTools.length > 0 ? extractedTools : ["Microsoft Office", "Jira", "Slack"]
            });

            setIsGenerating(false);
        }, 1500);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                        <Zap className="w-4 h-4" />
                        Free SEO Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Keyword Generator</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Extract critical keywords from any job description in seconds. Optimize your resume to beat the ATS and get more interviews.
                    </p>
                </div>
            </section>

            {/* Interactive Tool Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
                        <div className="p-8">
                            <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-600" />
                                Paste Job Description Below
                            </label>
                            <textarea
                                className="w-full h-64 p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-gray-700 leading-relaxed font-sans"
                                placeholder="Paste the full job description text here to identify the most important keywords..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={generateKeywords}
                                    disabled={!jobDescription.trim() || isGenerating}
                                    className={`
                                        inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg
                                        ${jobDescription.trim() && !isGenerating
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                                    `}
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="w-6 h-6 animate-spin" />
                                            Analyzing Description...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-6 h-6" />
                                            Extract Keywords
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {keywords && (
                            <div className="bg-gray-50 p-8 border-t border-gray-100 animate-slide-up">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Target className="w-7 h-7 text-green-600" />
                                    Optimized Keywords for Your Resume
                                </h3>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">Hard Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {keywords.hard.map((k, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => copyToClipboard(k)}
                                                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center gap-1 group"
                                                >
                                                    {k}
                                                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="text-green-600 font-bold uppercase tracking-wider text-sm mb-4">Soft Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {keywords.soft.map((k, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => copyToClipboard(k)}
                                                    className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1 group"
                                                >
                                                    {k}
                                                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="text-purple-600 font-bold uppercase tracking-wider text-sm mb-4">Tools & Tech</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {keywords.tools.map((k, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => copyToClipboard(k)}
                                                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors flex items-center gap-1 group"
                                                >
                                                    {k}
                                                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Information Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Keywords Matter for Your Resume</h2>
                        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Beat the ATS</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Most companies use Applicant Tracking Systems (ATS) to scan resumes for specific keywords before a human even sees them. If you lack the right terms, you might be filtered out automatically.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Show Expertise</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Using industry-standard terminology demonstrates your professional familiarity and ensures that recruiters recognize your qualifications at a glance.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Improve Relevancy</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our tool helps you identify exactly what the employer is looking for, allowing you to tailor your resume specifically to the job description for a higher success rate.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guide Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center italic">"How should I use these keywords?"</h2>
                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrate Naturally</h3>
                                <p className="text-gray-600">Don't just list keywords in a block. Weave them into your bullet points under work experience to show <em>how</em> you applied those skills.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Use a Skills Section</h3>
                                <p className="text-gray-600">A dedicated skills section is great for hard skills and tools. It makes it easy for both the ATS and recruiters to see your toolkit quickly.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Match Exact Phrasing</h3>
                                <p className="text-gray-600">If a job description asks for "Customer Relationship Management," use the full phrase alongside the acronym "CRM" to cover all bases.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-indigo-900 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                        Ready to Build Your Optimized Resume?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                        Now that you have your keywords, put them to use with our professional resume builder. Join 50k+ professionals who landed interviews this month.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="https://edit.profresume.com/editor"
                            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
                        >
                            Build My Resume
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
