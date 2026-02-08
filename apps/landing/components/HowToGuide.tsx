'use client';

import { FileText, UserCircle, PenTool, Briefcase, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function HowToGuide() {
    const steps = [
        {
            id: '01',
            title: "Choose a Professional Template",
            description: "Start strong with a field-tested template designed to beat ATS bots. Our Reverse-Chronological layouts are preferred by 95% of recruiters.",
            icon: <FileText className="w-6 h-6" />,
            color: "text-blue-700",
            bg: "bg-blue-50",
            border: "border-blue-100",
            link: "/templates",
            linkText: "Explore Templates"
        },
        {
            id: '02',
            title: "Enter Your Details",
            description: "Focus on what matters. Add your contact info and LinkedIn profile. Our smart forms guide you through exactly what to include (and what to skip).",
            icon: <UserCircle className="w-6 h-6" />,
            color: "text-indigo-700",
            bg: "bg-indigo-50",
            border: "border-indigo-100",
        },
        {
            id: '03',
            title: "Write a Magnetic Summary",
            description: "Hook hiring managers in seconds. Use our AI Writer to craft a compelling 2-3 sentence summary that highlights your unique value proposition.",
            icon: <PenTool className="w-6 h-6" />,
            color: "text-violet-700",
            bg: "bg-violet-50",
            border: "border-violet-100",
            link: "/resume-builder",
            linkText: "Try AI Writer"
        },
        {
            id: '04',
            title: "Add Experience & Impact",
            description: "Don't just list duties. Our builder helps you phrase achievements with action verbs and metrics to prove your impact and ROI.",
            icon: <Briefcase className="w-6 h-6" />,
            color: "text-fuchsia-700",
            bg: "bg-fuchsia-50",
            border: "border-fuchsia-100",
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Decorations - Optimized for performance (static) */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute left-0 top-1/4 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10" />
            <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-violet-50/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Simple 4-Step Process
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                        Build a Job-Winning Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">in Minutes</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Stop struggling with formatting. Follow our proven workflow to create a polished, professional CV that stands out to recruiters.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-100 via-violet-100 to-fuchsia-100 rounded-full -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative group">
                                <div className="flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                                    {/* Step Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center ring-4 ring-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            {step.icon}
                                        </div>
                                        <span className="text-4xl font-black text-gray-500 select-none group-hover:text-gray-600 transition-colors" aria-hidden="true">
                                            {step.id}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Action Link (if present) */}
                                    {step.link ? (
                                        <div className="mt-auto pt-4 border-t border-gray-50">
                                            <Link
                                                href={step.link}
                                                className={`inline-flex items-center gap-1.5 text-sm font-bold ${step.color} hover:opacity-80 transition-opacity`}
                                                aria-label={`${step.linkText} for ${step.title}`}
                                            >
                                                {step.linkText}
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="mt-auto pt-4 border-t border-gray-50 opacity-0">
                                            {/* Spacer to align cards */}
                                            <div className="h-5"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Pro Tip Section */}
                <div className="mt-20">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 md:p-12 shadow-2xl ring-1 ring-white/10 isolate">
                        {/* Ambient Background Glow */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] pointer-events-none"></div>

                        {/* Grid Pattern Overlay */}
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-blue-100 shadow-sm mb-6">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Insider Secret
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                    The #1 Reason Resumes Get Rejected?
                                </h3>
                                <p className="text-blue-100/80 text-lg leading-relaxed max-w-2xl font-medium">
                                    They're generic. Recruiters want to see how you match <span className="text-white font-bold underline decoration-blue-400 decoration-2 underline-offset-4">their specific job</span>.
                                    Our AI Tailor analyzes job descriptions and optimizes your resume keywords automatically.
                                </p>

                                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 justify-center md:justify-start">
                                    <div className="flex items-center gap-2 text-white/90 text-sm font-bold">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        Pass ATS Filters
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-sm font-bold">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        Match Keywords
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-sm font-bold">
                                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        Triple Interviews
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 relative">
                                <Link
                                    href="/tailor"
                                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl font-black text-lg hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/50"
                                >
                                    Try AI Tailor Free
                                    <ChevronRight className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-x-1" />
                                </Link>
                                {/* Button Decoration */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}