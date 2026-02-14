'use client';

import { FileText, UserCircle, PenTool, Briefcase, ChevronRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HowToGuide() {
    const steps = [
        {
            id: '01',
            title: "Choose a Template",
            description: "Start strong with field-tested layouts designed to beat ATS bots. 95% of recruiters prefer our clean, professional structures.",
            icon: <FileText className="w-5 h-5 text-white" />,
            color: "from-blue-500 to-blue-600",
            shadow: "shadow-blue-500/20",
            bg: "bg-blue-50",
            link: "/templates",
            linkText: "View Templates"
        },
        {
            id: '02',
            title: "Enter Your Details",
            description: "Focus on what matters. Our smart forms guide you through exactly what to include, ensuring you don't miss critical info.",
            icon: <UserCircle className="w-5 h-5 text-white" />,
            color: "from-indigo-500 to-indigo-600",
            shadow: "shadow-indigo-500/20",
            bg: "bg-indigo-50",
        },
        {
            id: '03',
            title: "AI Writing Assistant",
            description: "Writer's block? Gone. Use our AI to craft compelling summaries and bullet points that highlight your unique value proposition.",
            icon: <PenTool className="w-5 h-5 text-white" />,
            color: "from-violet-500 to-violet-600",
            shadow: "shadow-violet-500/20",
            bg: "bg-violet-50",
            link: "/resume-builder",
            linkText: "Try AI Writer"
        },
        {
            id: '04',
            title: "Download & Apply",
            description: "Export as a polished PDF instantly. Your resume is optimized, formatted, and ready to get you hired 3x faster.",
            icon: <Briefcase className="w-5 h-5 text-white" />,
            color: "from-fuchsia-500 to-fuchsia-600",
            shadow: "shadow-fuchsia-500/20",
            bg: "bg-fuchsia-50",
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
            {/* Background Elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
            <div className="absolute right-0 top-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/2" />
            <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-violet-100/30 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Simple 4-Step Process
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                        Build a Job-Winning Resume
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">in Minutes</span>
                    </h2>

                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        Stop struggling with formatting. Follow our proven workflow to create a polished, professional CV that stands out to recruiters.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-fuchsia-100 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="group relative">
                                <div className="h-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col relative overflow-hidden isolate">

                                    {/* Large Background Number */}
                                    <span className="absolute -right-4 -top-6 text-[120px] font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity select-none leading-none z-0">
                                        {step.id}
                                    </span>

                                    {/* Icon */}
                                    <div className="relative z-10 mb-6 flex justify-between items-start">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {step.icon}
                                        </div>
                                        <span className="text-sm font-bold text-slate-500 group-hover:text-blue-500 transition-colors">
                                            Step {step.id}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Action Link */}
                                    {step.link ? (
                                        <div className="relative z-10 mt-auto pt-4 border-t border-slate-50">
                                            <Link
                                                href={step.link}
                                                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
                                            >
                                                {step.linkText}
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="mt-auto h-9" /> /* Spacer */
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pro Tip Section */}
                <div className="mt-24 relative">
                    <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl isolate">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Insider Secret
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                                    Why do 75% of resumes fail?
                                </h3>
                                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                    Recruiters spend <span className="text-white font-bold">6 seconds</span> scanning a resume. If you don't match the job description keywords, the ATS rejects you before a human even sees it.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { label: "ATS Analysis", color: "text-green-400", bg: "bg-green-400/10" },
                                        { label: "Keyword Matching", color: "text-blue-400", bg: "bg-blue-400/10" },
                                        { label: "Smart Hints", color: "text-purple-400", bg: "bg-purple-400/10" },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${item.bg} ${item.color} text-sm font-bold border border-white/5`}>
                                            <CheckCircle2 className="w-4 h-4" />
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                <h4 className="text-xl font-bold text-white mb-4">Fix it with AI Tailor</h4>
                                <p className="text-slate-400 mb-6 text-sm">
                                    Paste the job description and your resume. Our AI highlights missing keywords and optimizes your content instantly.
                                </p>
                                <Link
                                    href="/tailor"
                                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02]"
                                >
                                    Try AI Tailor Free
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}