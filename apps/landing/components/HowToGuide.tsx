'use client';

import { FileText, UserCircle, PenTool, LayoutTemplate, Briefcase, GraduationCap, Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function HowToGuide() {
    const steps = [
        {
            id: 1,
            title: "Choose the Perfect Template",
            description: "Start with a field-tested template. For 95% of candidates, the Reverse-Chronological format is the gold standard.",
            icon: <LayoutTemplate className="w-6 h-6 text-white" />,
            color: "bg-blue-600",
            link: "/templates",
            linkText: "View Templates"
        },
        {
            id: 2,
            title: "Enter Contact Details",
            description: "Keep it professional: Name, Phone, Email, and LinkedIn. Skip full addresses or personal data like marital status.",
            icon: <UserCircle className="w-6 h-6 text-white" />,
            color: "bg-indigo-600",
        },
        {
            id: 3,
            title: "Craft a Powerful Summary",
            description: "Hook recruiters in 3 seconds. Write a 2-3 sentence summary highlighting your top achievements and years of experience.",
            icon: <PenTool className="w-6 h-6 text-white" />,
            color: "bg-purple-600",
            link: "/resume-builder",
            linkText: "Use AI Writer"
        },
        {
            id: 4,
            title: "Add Experience & Education",
            description: "List roles reverse-chronologically. Use bullet points with action verbs and quantifiable metrics (e.g., 'Increased sales by 20%').",
            icon: <Briefcase className="w-6 h-6 text-white" />,
            color: "bg-pink-600",
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        How to Make a Resume <span className="text-blue-600">Step-by-Step</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Creating a professional resume doesn't have to be hard. Follow this proven workflow to build a CV that gets you hired in 2026.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-gray-200 -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative group">
                                {/* Step Number/Icon */}
                                <div className={`w-32 h-32 mx-auto mb-6 rounded-full ${step.color} p-2 shadow-xl group-hover:scale-105 transition-transform duration-300 relative z-10 flex items-center justify-center border-4 border-white`}>
                                    <div className="w-full h-full rounded-full border-2 border-white/20 flex flex-col items-center justify-center text-white">
                                        <div className="mb-1">{step.icon}</div>
                                        <span className="text-2xl font-black">{index + 1}</span>
                                    </div>

                                    {/* Pulse Effect */}
                                    <div className={`absolute inset-0 rounded-full ${step.color} opacity-20 animate-ping`} />
                                </div>

                                {/* Content Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full hover:shadow-xl transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
                                        {step.description}
                                    </p>
                                    {step.link && (
                                        <div className="text-center mt-auto">
                                            <Link href={step.link} className={`inline-flex items-center gap-1 text-sm font-bold ${step.color.replace('bg-', 'text-')} hover:underline`}>
                                                {step.linkText} <ChevronRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pro Tip Box */}
                    <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                                <Trophy className="w-8 h-8 text-yellow-300" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold mb-2">Pro Tip: Tailor Every Resume</h4>
                                <p className="text-blue-100 text-lg">
                                    Generic resumes get rejected. Use our <span className="font-bold text-white">AI Tailor</span> to match keywords from the job description automatically. It triples your interview chances.
                                </p>
                            </div>
                            <Link href="/tailor" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
                                Try AI Tailor
                            </Link>
                        </div>

                        {/* Decoration */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>
                </div>
            </div>
        </section>
    );
}
