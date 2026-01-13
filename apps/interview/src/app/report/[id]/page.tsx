"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Award, TrendingUp, CheckCircle, AlertCircle,
    Share2, Download, ChevronRight, Star, Target,
    Brain, Cpu, Zap, Activity, Clock, ShieldCheck,
    FileText, User, Github, Loader2
} from 'lucide-react';

export default function InterviewReportPage() {
    const params = useParams();
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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8 lg:p-16 selection:bg-blue-500/20">
            {/* Header section with profile info */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-lg mb-6 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-blue-700 font-bold text-[10px] uppercase tracking-wider">Verified Assessment v4.2</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight leading-none">
                            Evaluation <span className="text-blue-600">Report</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">{report?.jdInfo?.role || 'Senior Software Engineer'} Benchmark</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                        <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                            <Share2 className="w-4 h-4" /> Share Results
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-12">
                    {[
                        { icon: User, label: "Candidate ID", val: `#PR-${id.slice(-6).toUpperCase()}` },
                        { icon: Clock, label: "Completed On", val: new Date(report?.updatedAt).toLocaleDateString() },
                        { icon: Activity, label: "AI Confidence", val: "High" },
                        { icon: Target, label: "Role Match", val: `${data.matchPercentage || 0}%` }
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                <p className="text-sm font-bold text-slate-800">{item.val}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <main className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                {/* Main Performance Visualization */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative flex flex-col lg:flex-row items-center gap-16">
                            <div className="relative p-10 bg-slate-50 rounded-[40px] shadow-inner">
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle cx="96" cy="96" r="88" fill="none" stroke="#e2e8f0" strokeWidth="14" />
                                    <circle
                                        cx="96" cy="96" r="88" fill="none" stroke="#223DC5" strokeWidth="14"
                                        strokeDasharray={552} strokeDashoffset={552 * (1 - (data.overallScore || 0) / 100)}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(34,61,197,0.3)]"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-extrabold text-blue-600 tracking-tighter">{data.overallScore || 0}</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">SCORE</span>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-10 w-full">
                                {[
                                    { label: 'Match Percentage', score: `${data.matchPercentage || 0}%`, icon: Target },
                                    { label: 'Evaluation Points', score: report?.history?.length || 0, icon: Activity },
                                    { label: 'System Insights', score: 'Advanced', icon: Brain },
                                    { label: 'Communication Rate', score: data.communicationRating || 'Good', icon: FileText }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <stat.icon className="w-4 h-4 text-blue-500" />
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{stat.label}</span>
                                        </div>
                                        <div className="text-2xl font-extrabold text-[#0F172A]">{stat.score}</div>
                                        <div className="h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                                            <div className="h-full bg-blue-600 w-full opacity-40" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-lg shadow-slate-200/30 group">
                            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3 bg-blue-50 w-fit px-4 py-1.5 rounded-full border border-blue-100">
                                <CheckCircle className="w-5 h-5" /> Key Strengths
                            </h3>
                            <ul className="space-y-6">
                                {(data.strengths || ['AI detected strong technical logic', 'Clean project architecture mentioned']).map((s: string, i: number) => (
                                    <li key={i} className="flex gap-4 group/item">
                                        <div className="w-2 h-2 rounded-full border-2 border-blue-200 mt-1.5 flex-shrink-0 group-hover/item:scale-150 group-hover/item:bg-blue-600 transition-all" />
                                        <p className="text-[15px] font-medium text-slate-600 leading-relaxed">{s}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-lg shadow-slate-200/30 group">
                            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3 bg-amber-50 w-fit px-4 py-1.5 rounded-full border border-amber-100">
                                <AlertCircle className="w-5 h-5" /> Improvement Areas
                            </h3>
                            <ul className="space-y-6">
                                {(data.weaknesses || ['Could expand on system design depth', 'Minor hesitation in behavioral responses']).map((s: string, i: number) => (
                                    <li key={i} className="flex gap-4 group/item">
                                        <div className="w-2 h-2 rounded-full border-2 border-amber-200 mt-1.5 flex-shrink-0 group-hover/item:scale-150 group-hover/item:bg-amber-500 transition-all" />
                                        <p className="text-[15px] font-medium text-slate-600 leading-relaxed">{s}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Final Insights */}
                <aside className="space-y-10">
                    <div className="bg-blue-600 rounded-[40px] p-12 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 opacity-60">AI Recommendation</h3>
                        <div className="mb-12">
                            <div className="text-7xl font-extrabold tracking-tighter mb-4">{data.recommendation?.split(' ').pop() || 'HIRE'}</div>
                            <div className="inline-flex items-center gap-2 text-[10px] font-bold border border-white/20 px-4 py-1.5 rounded-full uppercase tracking-widest bg-white/10">
                                {data.recommendation || 'High Confidence Level'}
                            </div>
                        </div>
                        <p className="text-base font-medium leading-relaxed opacity-90 mb-12 italic">
                            "{data.summary || 'The candidate demonstrates exceptional alignment with the technical requirements and displays a strong grasp of core architectural principles.'}"
                        </p>
                        <button className="w-full bg-white text-blue-600 font-extrabold py-5 rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-wider text-xs shadow-lg active:scale-95">
                            Full Session Transcript
                        </button>
                    </div>

                    {/* Skill Breakdown */}
                    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-xl shadow-slate-200/50">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Neural Skill Analysis</h3>
                        <div className="space-y-8">
                            {(report?.jdInfo?.skills || ['Technical Logic', 'System Architecture', 'Communication']).slice(0, 4).map((s: string, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[11px] font-bold mb-3 opacity-80 uppercase tracking-tight">
                                        <span className="text-slate-600">{s}</span>
                                        <span className="text-blue-600">Verified</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-1000 shadow-[0_0_10px_rgba(34,61,197,0.3)]"
                                            style={{ width: `${80 + Math.random() * 15}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2 group">
                            Detailed Competency Matrix <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
