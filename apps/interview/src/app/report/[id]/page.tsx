"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    Award, TrendingUp, CheckCircle, AlertCircle,
    Share2, Download, ChevronRight, Star, Target,
    Brain, Cpu, Zap, Activity, Clock, ShieldCheck,
    FileText, User, Github, Loader2
} from 'lucide-react';

export default function InterviewReportPage() {
    const params = useParams();
    const router = useRouter();
    const id = (Array.isArray(params.id) ? params.id[0] : params.id) as string;
    const [report, setReport] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/interview/${id}`, {
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.success) {
                    setReport(result.data);
                }
            } catch (err) {
                console.error('Fetch Report Error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Generating Your Report...</p>
                </div>
            </div>
        );
    }

    const data = report?.finalReport || {};

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/20">
            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[130px] rounded-full" />
            </div>

            {/* Header Navigation */}
            <nav className="relative max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
                <button onClick={() => router.push('/')} className="transition-transform hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="ProfResume Logo"
                        width={158}
                        height={36}
                        priority
                    />
                </button>
                <div className="hidden md:flex items-center gap-6">
                    <div className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        AI Performance Report
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto px-6 pt-8 pb-24 z-10">
                {/* Header section with profile info */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-lg mb-6">
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                                <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Verified Assessment</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] mb-4 tracking-tight leading-[1.1]">
                                Interview <span className="text-blue-600">Report</span>
                            </h1>
                            <p className="text-slate-600 text-lg leading-relaxed">{report?.jdInfo?.role || 'Senior Software Engineer'} Position</p>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95">
                                <Download className="w-4 h-4" /> Export
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mt-10">
                        {[
                            { icon: User, label: "Session ID", val: `#${id.slice(-6).toUpperCase()}` },
                            { icon: Clock, label: "Completed", val: new Date(report?.updatedAt).toLocaleDateString() },
                            { icon: Activity, label: "Confidence", val: "High" },
                            { icon: Target, label: "Match", val: `${data.matchPercentage || 0}%` }
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                                    <item.icon className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                    <p className="text-sm font-bold text-slate-800">{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Performance Visualization */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                            <div className="relative flex flex-col lg:flex-row items-center gap-12">
                                <div className="relative p-8 bg-slate-50 rounded-2xl shadow-inner">
                                    <svg className="w-40 h-40 transform -rotate-90">
                                        <circle cx="80" cy="80" r="72" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                                        <circle
                                            cx="80" cy="80" r="72" fill="none" stroke="#223DC5" strokeWidth="12"
                                            strokeDasharray={452} strokeDashoffset={452 * (1 - (data.overallScore || 0) / 100)}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(34,61,197,0.3)]"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-extrabold text-blue-600 tracking-tighter">{data.overallScore || 0}</span>
                                        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">SCORE</span>
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-2 gap-8 w-full">
                                    {[
                                        { label: 'Match %', score: `${data.matchPercentage || 0}%`, icon: Target },
                                        { label: 'Questions', score: report?.history?.length || 0, icon: Activity },
                                        { label: 'Analysis', score: 'Advanced', icon: Brain },
                                        { label: 'Communication', score: data.communicationRating || 'Good', icon: FileText }
                                    ].map((stat, i) => (
                                        <div key={i}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <stat.icon className="w-4 h-4 text-blue-500" />
                                                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{stat.label}</span>
                                            </div>
                                            <div className="text-xl font-extrabold text-[#0F172A]">{stat.score}</div>
                                            <div className="h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-blue-600 w-full opacity-40" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg shadow-slate-200/30">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-6 flex items-center gap-2 bg-blue-50 w-fit px-3 py-1.5 rounded-lg border border-blue-100">
                                    <CheckCircle className="w-4 h-4" /> Strengths
                                </h3>
                                <ul className="space-y-4">
                                    {(data.strengths || ['Strong technical knowledge', 'Good communication', 'Problem-solving skills']).map((s: string, i: number) => (
                                        <li key={i} className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                            <p className="text-sm font-medium text-slate-600 leading-relaxed">{s}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg shadow-slate-200/30">
                                <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-6 flex items-center gap-2 bg-amber-50 w-fit px-3 py-1.5 rounded-lg border border-amber-100">
                                    <AlertCircle className="w-4 h-4" /> Areas to Improve
                                </h3>
                                <ul className="space-y-4">
                                    {(data.weaknesses || ['System design depth', 'More examples needed']).map((s: string, i: number) => (
                                        <li key={i} className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                            <p className="text-sm font-medium text-slate-600 leading-relaxed">{s}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI Final Insights */}
                    <aside className="space-y-6">
                        <div className="bg-blue-600 rounded-2xl p-10 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-xs font-bold uppercase tracking-wider mb-8 opacity-70">AI Recommendation</h3>
                            <div className="mb-10">
                                <div className="text-6xl font-extrabold tracking-tight mb-3">{data.recommendation?.split(' ').pop() || 'HIRE'}</div>
                                <div className="inline-flex items-center gap-2 text-[10px] font-bold border border-white/20 px-3 py-1 rounded-lg uppercase tracking-wider bg-white/10">
                                    {data.recommendation || 'Strong Fit'}
                                </div>
                            </div>
                            <p className="text-sm font-medium leading-relaxed opacity-90 mb-8">
                                {data.summary || 'Candidate shows strong technical skills and good cultural alignment with the role requirements.'}
                            </p>
                            <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wide text-xs shadow-lg active:scale-95">
                                View Transcript
                            </button>
                        </div>

                        {/* Skill Breakdown */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">Skill Analysis</h3>
                            <div className="space-y-6">
                                {(report?.jdInfo?.skills || ['Technical', 'Architecture', 'Communication']).slice(0, 4).map((s: string, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-tight">
                                            <span className="text-slate-600">{s}</span>
                                            <span className="text-blue-600">✓</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 transition-all duration-1000"
                                                style={{ width: `${75 + Math.random() * 20}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center justify-center gap-2 hover:gap-3 transition-all">
                                View Details <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </aside>
                </div>
            </main >
        </div >
    );
}
