"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Mic, Play, Shield, Video, Cpu, MessageSquare, Award, Sparkles, Binary, ChevronRight, CheckCircle, User, Settings, LogOut, ChevronDown, Clock } from 'lucide-react';
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

    // Session management state
    const [previousSessions, setPreviousSessions] = useState<any[]>([]);
    const [canStartNewInterview, setCanStartNewInterview] = useState(true);
    const [showSessions, setShowSessions] = useState(false);

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

    // Fetch previous sessions and check daily limit
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch previous sessions
                const sessionsRes = await fetch('https://api.hirecta.com/api/interview/sessions', {
                    credentials: 'include'
                });
                const sessionsData = await sessionsRes.json();
                if (sessionsData.success) {
                    setPreviousSessions(sessionsData.data || []);
                }

                // Check if user can start new interview today
                const canStartRes = await fetch('https://api.hirecta.com/api/interview/can-start', {
                    credentials: 'include'
                });
                const canStartData = await canStartRes.json();
                if (canStartData.success) {
                    setCanStartNewInterview(canStartData.canStart);
                }
            } catch (err) {
                console.error('Error fetching sessions:', err);
            }
        };

        if (isLoggedIn || user) {
            fetchData();
        }
    }, [isLoggedIn, user]);

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
        <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-blue-500/30">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 animate-in zoom-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

                        <StepLoader
                            message={loadingSteps[loadingStep]}
                            subMessage="Please wait while we set up your environment..."
                            theme="dark"
                            size="md"
                            variant="transparent"
                            className="bg-transparent"
                            embedded={true}
                        />
                    </div>
                </div>
            )}

            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[130px] rounded-full mix-blend-screen" />
            </div>

            <nav className="relative max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-[100]">
                <div className="flex items-center gap-8">
                    {/* Logo Placeholder (or use standard text if image fails in dark mode) */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Hirecta<span className="text-blue-500">.AI</span></span>
                    </div>

                    {isLoggedIn && user && (
                        <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
                            <span className="opacity-60">Terminal active for</span>
                            <span className="font-medium text-blue-400">{user.name || user.email?.split('@')[0] || 'User'}</span>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <div className="px-4 py-1.5 bg-blue-900/20 border border-blue-500/20 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        System Online v2.1
                    </div>

                    {/* User Avatar with Dropdown */}
                    {isLoggedIn && user && (
                        <div className="relative" style={{ zIndex: 9999 }}>
                            <div
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                                className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 ring-2 ring-slate-700 hover:ring-blue-500 cursor-pointer transition-all flex items-center justify-center text-white font-bold text-xs"
                            >
                                {user?.picture ? (
                                    <img src={user.picture} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    (user?.name?.[0] || 'G')
                                )}
                            </div>

                            {/* Dropdown Menu - Dark Mode */}
                            {showUserDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-[#1E293B] rounded-xl shadow-2xl border border-slate-700 py-2 overflow-hidden" style={{ zIndex: 9999 }}>
                                    <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/50">
                                        <p className="text-sm font-bold text-white">{user.name || 'User'}</p>
                                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                    </div>

                                    <div className="py-1">
                                        <a href="https://editor.hirecta.com" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </a>
                                        <a href="https://editor.hirecta.com" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </a>
                                    </div>

                                    <div className="border-t border-slate-700 py-1">
                                        <button
                                            onClick={() => { setShowUserDropdown(false); logout(); }}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-900/20 transition-colors w-full"
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
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN (Content) - Span 7 */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-8">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider shadow-sm">AI Interview Protocol</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                            Prove Your Skills. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Get Hired.</span>
                        </h1>

                        <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl border-l-2 border-slate-700 pl-6">
                            Experience a realistic technical interview environment tailored to your stack.
                            AI-driven coding challenges, real-time feedback, and system design capability.
                        </p>

                        <div className="space-y-6">
                            {/* Interview Type Dropdown Container */}
                            <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl shadow-xl shadow-black/20">
                                <InterviewTypeDropdown
                                    options={INTERVIEW_TYPES}
                                    selectedType={selectedInterviewType}
                                    onSelect={setSelectedInterviewType}
                                />
                            </div>

                            {/* Previous Sessions (If Any) */}
                            {previousSessions.length > 0 && (
                                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-300 text-sm uppercase tracking-wide">Recent Sessions</h3>
                                        <button
                                            onClick={() => setShowSessions(!showSessions)}
                                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            {showSessions ? 'Collapse' : `Expand (${previousSessions.length})`}
                                        </button>
                                    </div>
                                    {showSessions && (
                                        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                            {previousSessions.map((session) => (
                                                <div
                                                    key={session._id}
                                                    onClick={() => router.push(`/session?id=${session._id}`)}
                                                    className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 rounded-lg p-3 cursor-pointer transition-all flex items-center justify-between group"
                                                >
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                                                            {session.jdInfo?.role || 'Technical Interview'}
                                                        </div>
                                                        <div className="text-[10px] text-slate-500">
                                                            {new Date(session.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Job Description Logic */}
                            {selectedInterviewType.requiresJD ? (
                                <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 shadow-xl">
                                    <label className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Role / JD</span>
                                        <span className="text-[10px] text-blue-400 py-0.5 px-2 bg-blue-900/20 rounded border border-blue-500/20">AI Parsing Active</span>
                                    </label>
                                    <textarea
                                        className="w-full h-48 bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none text-sm font-mono leading-relaxed"
                                        placeholder="// Paste job description or requirements here..."
                                        value={jd}
                                        onChange={(e) => setJd(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 border-dashed rounded-2xl p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mb-3">
                                        <CheckCircle className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-slate-200 mb-1">Configuration Locked</h4>
                                    <p className="text-xs text-slate-500">
                                        Ready to launch <span className="text-blue-400">{selectedInterviewType.label}</span> protocol.
                                    </p>
                                </div>
                            )}

                            {/* Start Button */}
                            <button
                                onClick={startInterview}
                                disabled={isLoading || (selectedInterviewType.requiresJD && !jd.trim()) || !canStartNewInterview}
                                className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-blue-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <div className="flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Initializing Sequence...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-lg tracking-wide">Initialize Session</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* Daily Limit Warning */}
                            {!canStartNewInterview && (
                                <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 text-center mt-4">
                                    <p className="text-xs font-bold text-amber-500 uppercase tracking-wide flex items-center justify-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        Daily Quota Exceeded
                                    </p>
                                    <p className="text-[10px] text-amber-400/70 mt-1">Please return tomorrow for new credits.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Hardware Check) - Span 5 */}
                    <div className="lg:col-span-5 lg:sticky lg:top-8 animate-in fade-in slide-in-from-right duration-700 delay-200">
                        <div className="bg-[#1E293B] border border-slate-700 p-1 rounded-[32px] shadow-2xl relative">
                            {/* Inner Container */}
                            <div className="bg-[#0F172A] rounded-[28px] p-6 border border-slate-800 h-full relative overflow-hidden">

                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-800 rounded-lg">
                                            <Video className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white leading-tight">System Check</h3>
                                            <p className="text-[10px] text-slate-500 font-mono">SENSOR_STATUS_ACTIVE</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${stream ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'} animate-pulse`} />
                                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                                    </div>
                                </div>

                                {/* Video Preview */}
                                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 border border-slate-800 relative group/video shadow-inner">
                                    {!stream ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 p-8 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
                                            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-3 border border-slate-800 group-hover/video:border-blue-500/50 transition-colors">
                                                <Camera className="w-5 h-5 text-slate-500 group-hover/video:text-blue-400 transition-colors" />
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Camera Feed Offline</p>
                                        </div>
                                    ) : (
                                        <>
                                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                                            {/* Tech Overlay */}
                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur text-[8px] font-mono text-green-400 rounded border border-green-500/20">
                                                REC ● LIVE
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                                        </>
                                    )}

                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                        <button
                                            onClick={toggleCamera}
                                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95"
                                        >
                                            {stream ? 'Disengage Sensors' : 'Activate Sensors'}
                                        </button>
                                    </div>
                                </div>

                                {/* Status Items */}
                                <div className="space-y-3">
                                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-4 group hover:border-blue-500/30 transition-colors">
                                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                                            <Mic className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs text-slate-300">Audio Input</h4>
                                            <p className="text-[10px] text-slate-600 font-mono">48kHz STEREO</p>
                                        </div>
                                        <div className="ml-auto flex gap-0.5 items-end h-3">
                                            <div className="w-1 bg-green-500/50 h-[40%]" />
                                            <div className="w-1 bg-green-500/50 h-[70%]" />
                                            <div className="w-1 bg-green-500/50 h-[30%]" />
                                            <div className="w-1 bg-green-500/50 h-[90%]" />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-4 group hover:border-emerald-500/30 transition-colors">
                                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                                            <Shield className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs text-slate-300">Environment</h4>
                                            <p className="text-[10px] text-slate-600 font-mono">SECURE CONTEXT</p>
                                        </div>
                                        <CheckCircle className="w-4 h-4 text-emerald-500/50 ml-auto" />
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-2 opacity-40">
                                    <Award className="w-3 h-3 text-slate-400" />
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                                        Hirecta Systems Corp
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
