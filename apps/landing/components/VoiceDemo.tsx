"use client";

import { Mic, ArrowRight, Sparkles, Activity, Wand2, Command, Play } from "lucide-react";
import Link from "next/link";
import { URLS } from "@/constants/urls";

export function VoiceDemo() {
    return (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 md:p-16 shadow-2xl ring-1 ring-white/10 isolate">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left: Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-blue-100 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                        </span>
                        Voice-to-Resume Technology
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
                        Don't Type.
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-white">
                            Just Speak.
                        </span>
                    </h2>

                    <p className="text-lg text-blue-100/80 leading-relaxed max-w-lg font-medium">
                        Build your entire resume by talking to our AI. It processes your voice, structures your career history, and writes professional bullet points instantly.
                    </p>

                    <div className="flex flex-col gap-4">
                        {[
                            {
                                icon: <Wand2 className="w-5 h-5 text-purple-300" />,
                                title: "Instant Conversion",
                                desc: "Voice turned into professional text",
                                bg: "bg-purple-500/20",
                                border: "border-purple-500/30"
                            },
                            {
                                icon: <Command className="w-5 h-5 text-blue-300" />,
                                title: "Smart Formatting",
                                desc: "Auto-structured into resume sections",
                                bg: "bg-blue-500/20",
                                border: "border-blue-500/30"
                            }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl ${item.bg} backdrop-blur-sm border ${item.border} hover:bg-white/10 transition-colors group`}>
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                                    <p className="text-sm text-blue-100/70">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <Link
                            href={`${URLS.EDITOR}?voice=true`}
                            className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/50 ring-4 ring-blue-600/20"
                        >
                            <Mic className="w-5 h-5" />
                            Start Speaking
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>

                {/* Right: Modern Abstract Visual */}
                <div className="relative mx-auto w-full max-w-[500px] h-[500px] perspective-1000">
                    {/* Central Architecture */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Orbit Circles */}
                        <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

                        {/* Central Pulse */}
                        <div className="relative z-20 group cursor-pointer">
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse group-hover:bg-blue-500/40 transition-all"></div>
                            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110 border border-white/20">
                                <Mic className="w-10 h-10 text-white animate-pulse" />
                            </div>
                        </div>

                        {/* Floating Cards (Orbiting) */}
                        <div className="absolute top-16 right-12 animate-float-slow z-30">
                            <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/10 max-w-[180px] hover:border-white/30 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Analysis</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[90%] bg-green-400 rounded-full animate-dash"></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-blue-100/60 font-mono">
                                        <span>Clarity</span>
                                        <span>98%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-24 -left-4 animate-float-slow delay-1000 z-30">
                            <div className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 hover:border-white/30 transition-colors w-64">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex gap-1 items-end h-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="w-1 bg-blue-400 rounded-full" style={{
                                                height: `${Math.random() * 100}%`,
                                                animation: `wave 1s ease-in-out infinite ${i * 0.1}s`
                                            }}></div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-blue-200">Processing Voice...</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-white/90 italic">"Led a team of 15 senior designers..."</p>
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                    <p className="text-[10px] text-blue-200/60 uppercase tracking-widest font-bold">Transcribing & Formatting</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 animate-float delay-500 z-20 opacity-80 lg:opacity-100">
                            <div className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg text-purple-300">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">AI Polishing</div>
                                    <div className="text-[10px] text-blue-200/70">Optimizing keywords</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% { height: 20%; }
                    50% { height: 100%; }
                }
                @keyframes dash {
                    0% { width: 0%; }
                    100% { width: 80%; }
                }
            `}</style>
        </div>
    );
}
