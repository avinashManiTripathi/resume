"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Mic, Play, Shield, Video, Cpu, MessageSquare, Award, Sparkles, Binary, ChevronRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function InterviewLandingPage() {
    const [jd, setJd] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const startInterview = async () => {
        if (!jd.trim()) return alert('Please paste a Job Description first.');
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/interview/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ jobDescription: jd }),
            });

            const result = await response.json();
            if (result.success) {
                router.push(`/session?id=${result.data._id}`);
            } else {
                if (response.status === 401) {
                    alert('Session expired or not logged in. Redirecting to sign in...');
                    window.location.href = 'http://localhost:3001/signin';
                } else {
                    alert(result.message || 'Failed to start interview. Please try again.');
                    setIsLoading(false);
                }
            }
        } catch (err) {
            console.error('Start Interview Error:', err);
            alert('Failed to connect to the server. Please ensure the backend is running.');
            setIsLoading(false);
        }
    };

    const toggleCamera = async () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        } else {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(s);
            } catch (err) {
                alert('Camera/Mic permission denied.');
            }
        }
    };

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/20">
            {/* Background Grid - Landing Style */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[130px] rounded-full" />
            </div>

            <nav className="relative max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
                <Image
                    src="/logo.png"
                    alt="ProfResume Logo"
                    width={158}   // w-15 → 60px
                    height={36}  // h-9 → 36px
                    className="transition-transform group-hover:scale-105"
                    priority
                />
                <div className="hidden md:flex items-center gap-6">
                    <div className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        AI Neural Engine v2.0
                    </div>
                </div>
            </nav>

            <main className="relative max-w-7xl mx-auto px-6 pt-12 pb-24 z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left side: Content */}
                    <div className="animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-lg mb-8">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">AI Powered Career Tools</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.1] mb-8 tracking-tight">
                            Master Your Next <br />
                            <span className="text-blue-600">Big Interview.</span>
                        </h1>

                        <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-lg">
                            Practice with an AI that mimics top-tier technical interviewers. Get real-time feedback, coding challenges, and a detailed performance score.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Job Description / Requirements</label>
                                <textarea
                                    className="w-full h-64 bg-slate-50 border border-slate-100 rounded-xl p-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all resize-none text-sm leading-relaxed"
                                    placeholder="Paste the job requirements here... We'll tailor the technical questions specifically for this role."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={startInterview}
                                disabled={isLoading || !jd.trim()}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 text-lg active:scale-[0.98]"
                            >
                                {isLoading ? 'Initializing AI...' : 'Start Session Now'}
                                {!isLoading && <ChevronRight className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="mt-10 flex items-center gap-8 opacity-60">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${i * 100 + 100}`} />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trusted by 5,000+ candidates</p>
                        </div>
                    </div>

                    {/* Right side: Hardware check */}
                    <div className="lg:sticky lg:top-12 animate-in fade-in slide-in-from-right duration-1000 delay-200">
                        <div className="bg-white border border-slate-200 p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />

                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold flex items-center gap-3 text-slate-900">
                                    <Video className="w-5 h-5 text-blue-600" />
                                    Setup Interface
                                </h3>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div className="w-2 h-2 rounded-full bg-slate-100" />
                                </div>
                            </div>

                            <div className="aspect-video bg-slate-50 rounded-2xl overflow-hidden mb-8 border border-slate-100 relative group/cam">
                                {!stream ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-slate-50">
                                            <Camera className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest leading-loose opacity-60">
                                            Test your camera and microphone <br /> for the best experience.
                                        </p>
                                    </div>
                                ) : (
                                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                                )}

                                <button
                                    onClick={toggleCamera}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl hover:bg-slate-50 border border-slate-200 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all text-blue-600"
                                >
                                    {stream ? 'Turn Off Sensors' : 'Sync Cam & Mic'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center">
                                        <Mic className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-tight">Audio Clarity</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Optimized for transcription</p>
                                    </div>
                                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-tight">Data Privacy</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Encrypted local session</p>
                                    </div>
                                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
                            <Award className="w-4 h-4 text-slate-400" />
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                                Recruiter Recommended Platform
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
