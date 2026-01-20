"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Mic, Play, Shield, Video, Cpu, MessageSquare, Award, Sparkles, Binary, ChevronRight, CheckCircle, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import InterviewTypeDropdown from '../components/InterviewTypeDropdown';
import { INTERVIEW_TYPES, DEFAULT_INTERVIEW_TYPE, InterviewType } from '../config/interview-types.constants';
import { useAuth } from '../hooks/useAuth';
import { StepLoader } from '@repo/ui/step-loader';

export default function InterviewLandingPage() {
    const [jd, setJd] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [selectedInterviewType, setSelectedInterviewType] = useState<InterviewType>(DEFAULT_INTERVIEW_TYPE);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const { user, isLoggedIn, logout } = useAuth();

    const loadingSteps = [
        "Initializing AI Engine...",
        "Loading your profile...",
        "Preparing interview session..."
    ];

    // Auto-progress loading steps
    useEffect(() => {
        if (isLoading && loadingStep < loadingSteps.length - 1) {
            const timer = setTimeout(() => {
                setLoadingStep(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isLoading, loadingStep, loadingSteps.length]);

    const startInterview = async () => {
        // Validate based on interview type
        if (selectedInterviewType.requiresJD && !jd.trim()) {
            return alert('Please paste a Job Description first.');
        }
        let modifiedJd = ''

        if (!jd) {

            modifiedJd = `Act as a professional technical recruiter. Generate a clear, concise, and industry-ready job description for a Junior React Developer role.

Interview Type: ${selectedInterviewType.id}
Interview Level: ${selectedInterviewType.level}
Technology: ${selectedInterviewType.technology}

The job description should include:

A short role summary

Key responsibilities

Required skills and basic qualifications

Nice-to-have skills

Ideal candidate traits

Keep the language simple, beginner-friendly, and suitable for candidates with 0–2 years of experience.
Output the JD in a well-structured, professional format.`

        }

        setIsLoading(true);
        setLoadingStep(0);
        try {
            const response = await fetch('https://api.hirecta.com/api/interview/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    jobDescription: modifiedJd ? modifiedJd : jd,
                    interviewType: selectedInterviewType.id,
                    interviewLevel: selectedInterviewType.level,
                    technology: selectedInterviewType.technology
                }),
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
                    setLoadingStep(0);
                }
            }
        } catch (err) {
            console.error('Start Interview Error:', err);
            alert('Failed to connect to the server. Please ensure the backend is running.');
            setIsLoading(false);
            setLoadingStep(0);
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
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 animate-in zoom-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                                <Binary className="w-8 h-8 text-blue-600 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Starting Interview</h2>
                            <p className="text-sm text-slate-500">Please wait while we prepare everything</p>
                        </div>
                        <StepLoader
                            steps={loadingSteps}
                            currentStep={loadingStep}
                            size="md"
                        />
                    </div>
                </div>
            )}
            {/* Background Grid - Landing Style */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[130px] rounded-full" />
            </div>

            <nav className="relative max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-[100]">
                <div className="flex items-center gap-8">
                    <Image
                        src="/logo.png"
                        alt="Hirecta Logo"
                        width={158}   // w-15 → 60px
                        height={36}  // h-9 → 36px
                        className="transition-transform group-hover:scale-105"
                        priority
                    />
                    {isLoggedIn && user && (
                        <div className="hidden md:flex items-center gap-2 text-slate-600">
                            <span className="text-sm font-semibold">Welcome back,</span>
                            <span className="text-sm font-bold text-blue-600">{user.name || user.email?.split('@')[0] || 'User'}</span>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <div className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        AI Neural Engine v2.0
                    </div>

                    {/* User Avatar with Dropdown */}
                    {isLoggedIn && user && (
                        <div className="relative" style={{
                            zIndex: 9999
                        }}>
                            <div
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                                className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-white shadow-md flex items-center justify-center text-white font-bold text-xs">
                                {user?.picture ? (
                                    <img src={user.picture} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    (user?.name?.[0] || 'G')
                                )}
                            </div>



                            {/* Dropdown Menu */}
                            {showUserDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 " style={{ zIndex: 9999 }}>
                                    <div className="px-4 py-3 border-b border-slate-100">
                                        <p className="text-sm font-bold text-slate-900">{user.name || 'User'}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>

                                    <div className="py-1">
                                        <a
                                            href="https://edit.hirecta.com"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </a>
                                        <a
                                            href="https://edit.hirecta.com"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </a>
                                    </div>

                                    <div className="border-t border-slate-100 py-1">
                                        <button
                                            onClick={() => {
                                                setShowUserDropdown(false);
                                                logout();
                                            }}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors w-full"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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
                            {/* Interview Type Dropdown */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
                                <InterviewTypeDropdown
                                    options={INTERVIEW_TYPES}
                                    selectedType={selectedInterviewType}
                                    onSelect={setSelectedInterviewType}
                                />
                            </div>

                            {/* Job Description Textarea - Conditionally shown */}
                            {selectedInterviewType.requiresJD ? (
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Job Description / Requirements</label>
                                    <textarea
                                        className="w-full h-64 bg-slate-50 border border-slate-100 rounded-xl p-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all resize-none text-sm leading-relaxed"
                                        placeholder="Paste the job requirements here... We'll tailor the technical questions specifically for this role."
                                        value={jd}
                                        onChange={(e) => setJd(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 border-dashed rounded-2xl p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mb-3">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-2">Interview Type Selected</h4>
                                    <p className="text-sm text-slate-600">
                                        You've chosen <span className="font-semibold text-blue-600">{selectedInterviewType.label}</span>.
                                        <br />Click below to start your AI-powered interview session!
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={startInterview}
                                disabled={isLoading || (selectedInterviewType.requiresJD && !jd.trim())}
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
