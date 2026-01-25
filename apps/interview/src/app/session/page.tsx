"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import {
    Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, MoreVertical,
    PhoneOff, ChevronLeft, Circle, Square, Sparkles, Clock, Tag, Users,
    CheckCircle2, Loader2, Mic2, User
} from 'lucide-react';
import { sessionConfig, aiSettings, type SidebarConfig } from '../../config/session.constants';
import { getInterviewTypeById } from '../../config/interview-types.constants';
import InterviewChat from '../../components/InterviewChat';

import { useAuth } from '../../hooks/useAuth';
import { useAppNetwork, API_ENDPOINTS } from '../../hooks/useAppNetwork';
import { CodeEditor } from '../../components/CodeEditor';
import { useProctoring } from '../../hooks/useProctoring';
import { ENV } from '../env';

const API_URL = ENV.API_URL
console.log('🌐 API_URL configured as:', API_URL);

// Animated Avatar Component (Keep existing or import if moved. Assuming it stays for now as it wasn't extracted)
function AnimatedAvatar({ isSpeaking, size = 'large' }: { isSpeaking: boolean; size?: 'small' | 'large' }) {
    // ... (keep existing implementation)
    const dimensions = size === 'large' ? 'w-64 h-64' : 'w-8 h-8';
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        if (size !== 'large') return;
        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        };
        const scheduleNextBlink = () => {
            const delay = 2000 + Math.random() * 4000;
            return setTimeout(() => {
                blink();
                scheduleNextBlink();
            }, delay);
        };
        const timer = scheduleNextBlink();
        return () => clearTimeout(timer);
    }, [size]);

    return (
        <div className={`${dimensions} rounded-full mx-auto overflow-hidden ${size === 'large' ? 'shadow-2xl border-4 border-white' : 'border-2 border-blue-400'} relative`}>
            <div className={`w-full h-full relative ${isSpeaking && size === 'large' ? 'animate-hair-flow' : ''}`}>
                <img src="/ai-interviewer.png" alt="AI Interviewer" className="w-full h-full object-cover" />
            </div>
            {size === 'large' && isBlinking && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[38%] left-[35%] w-8 h-1 bg-gradient-to-b from-transparent via-black/60 to-transparent rounded-full" />
                    <div className="absolute top-[38%] right-[35%] w-8 h-1 bg-gradient-to-b from-transparent via-black/60 to-transparent rounded-full" />
                </div>
            )}
            {size === 'large' && isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute top-[57%] left-1/2 -translate-x-1/2">
                        <div className="relative">
                            <div className="w-12 h-3 rounded-full bg-gradient-to-b from-rose-300/30 to-transparent blur-[1px] animate-lip-upper" />
                            <div className="absolute top-2 left-0 w-12 h-4 rounded-full bg-gradient-to-t from-rose-300/40 to-transparent blur-[1px] animate-lip-lower" />
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-rose-900/20 animate-mouth-open" />
                        </div>
                    </div>
                </div>
            )}
            {isSpeaking && size === 'large' && (
                <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 animate-face-glow" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer" />
                </>
            )}
        </div>
    );
}



// ... imports remain the same, just adding useAppNetwork ...

function SessionContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('id');
    const router = useRouter();
    const { user } = useAuth(); // Get user details
    const network = useAppNetwork();

    // Proctoring Hook
    const { stats: proctorStats, requestFullscreen, hasViolations } = useProctoring(true);

    // ... state ...
    const [session, setSession] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);

    // Code Editor State
    const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n    return true;\n}');

    // Media State
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Interaction State
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // System State
    const recognitionRef = useRef<any>(null);
    const socketRef = useRef<Socket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(3600);
    const [timerStarted, setTimerStarted] = useState(false);

    // ... helpers ...

    const speak = (text: string) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);

        // Try to select a good voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    // Initialize Camera
    useEffect(() => {
        let mediaStream: MediaStream | null = null;

        const initCamera = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Camera init failed:", err);
                setIsCameraOn(false);
                setIsMicOn(false);
            }
        };

        if (isCameraOn) {
            initCamera();
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []); // Run once on mount to easier manage stream lifecycle relative to toggle

    // Toggle Media Helpers
    const toggleMic = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMicOn(audioTrack.enabled);
            }
        }
    };

    const toggleCamera = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsCameraOn(videoTrack.enabled);
            }
        }
    };

    // Socket Connection
    useEffect(() => {
        if (!sessionId) return;

        const socket = io(API_URL, {
            query: { sessionId },
            transports: ['websocket']
        });

        socket.on('connect', () => {
            setIsSocketConnected(true);
            console.log('Socket connected');

            // Fetch session details
            network.get<{ success: boolean, data: any }>(API_ENDPOINTS.INTERVIEW.SESSION(sessionId))
                .then(data => {
                    if (data.success && data.data) {
                        const iType = getInterviewTypeById(data.data.interviewDetails?.typeId || 'react-junior');
                        setSession({
                            ...data.data,
                            interviewTypeData: iType
                        });

                        if (iType && code.includes('function solution()')) {
                            setCode(iType.defaultCode);
                        }

                        // EMIT START INTERVIEW
                        socket.emit('start-interview', {
                            name: user?.name || 'Candidate',
                            role: data.data.jdInfo?.role || 'Developer',
                            sessionId
                        });
                    }
                })
                .catch(err => console.error("Failed to fetch session details", err));
        });

        socket.on('disconnect', () => {
            setIsSocketConnected(false);
        });

        socket.on('message', (data: any) => {
            // Backend sends { content, timestamp }
            const text = data.content || data.message;
            if (text) {
                setMessages(prev => [...prev, { role: 'assistant', content: text }]);
                speak(text);
            }
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [sessionId, user]); // Added user dependency

    // Submit Answer
    const submitAnswer = async () => {
        if (!answer.trim() && !code.trim()) return;

        const content = answer.trim();
        setMessages(prev => [...prev, { role: 'user', content }]);
        setAnswer('');
        setIsLoading(true);

        try {
            if (socketRef.current?.connected) {
                // Backend listens for 'send-message'
                socketRef.current.emit('send-message', {
                    content
                });
            } else {
                // Fallback
                setTimeout(() => {
                    const mockResponse = "Connection lost. Please refresh.";
                    setMessages(prev => [...prev, { role: 'assistant', content: mockResponse }]);
                    setIsLoading(false);
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen bg-[#0F172A] text-slate-200 font-sans overflow-hidden flex flex-col">
            {/* Proctoring Alert */}
            {hasViolations && (
                <div className="bg-red-500/10 border-b border-red-500/50 px-4 py-1 text-center text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                    ⚠️ Proctoring Violation Detected: Focus Lost or Fullscreen Exited ({proctorStats.violationCount})
                </div>
            )}

            {/* Header */}
            <header className="h-14 bg-[#1E293B] border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-sm font-bold text-white">{session?.jdInfo?.role || 'Technical Interview'}</h1>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                            </span>
                            <span>•</span>
                            <span className={isSocketConnected ? 'text-green-400' : 'text-red-400'}>
                                {isSocketConnected ? 'Live' : 'Connecting...'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
                        <div className={`w-2 h-2 rounded-full ${proctorStats.isTabActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-xs font-mono text-slate-400">PROCTOR_ACTIVE</span>
                    </div>
                    <button onClick={() => requestFullscreen()} className="p-2 hover:bg-slate-700 rounded-lg" title="Fullscreen">
                        <Monitor className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors">
                        End Interview
                    </button>
                </div>
            </header>

            {/* Main Split Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT PANEL: AI & Chat (40%) */}
                <div className="w-[40%] flex flex-col border-r border-slate-700 bg-[#0F172A]">
                    {/* AI Avatar Area */}
                    <div className="h-[40%] min-h-[300px] flex items-center justify-center relative p-6 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
                        <AnimatedAvatar isSpeaking={isSpeaking} size="large" />

                        {/* User Camera PIP */}
                        <div className="absolute bottom-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden border border-slate-600 shadow-xl">
                            {stream ? (
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                    <User className="w-8 h-8 text-slate-500" />
                                </div>
                            )}
                            <div className="absolute bottom-1 left-1 flex gap-1">
                                {!isMicOn && <div className="p-1 bg-red-500 rounded"><MicOff className="w-3 h-3 text-white" /></div>}
                            </div>
                        </div>
                    </div>

                    {/* Chat / Transcription Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0F172A]">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-[#1E293B] text-slate-200 border border-slate-700 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="p-4 border-t border-slate-700 bg-[#1E293B]">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-800 text-white border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-sm"
                            />
                            <button
                                onClick={toggleMic}
                                className={`p-3 rounded-xl transition-all ${isMicOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'}`}
                                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                            >
                                {isMicOn ? <Mic className="w-5 h-5 text-slate-400" /> : <MicOff className="w-5 h-5 text-white" />}
                            </button>
                            <button
                                onClick={toggleCamera}
                                className={`p-3 rounded-xl transition-all ${isCameraOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'}`}
                                title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
                            >
                                {isCameraOn ? <Video className="w-5 h-5 text-slate-400" /> : <VideoOff className="w-5 h-5 text-white" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: Code Editor (60%) */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e]">

                    <div className="flex-1 relative">
                        {/* We use the custom CodeEditor here */}
                        <CodeEditor
                            code={code}
                            onChange={setCode}
                            // Pass dynamic language from session data
                            language={session?.interviewTypeData?.language || 'javascript'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InterviewSessionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        }>
            <SessionContent />
        </Suspense>
    );
}
