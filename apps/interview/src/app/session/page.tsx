"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Mic, MicOff, Camera, VideoOff, Play, Pause, X,
    Send, ChevronRight, Clock, Info, CheckCircle, AlertCircle,
    Code, MessageSquare, Brain as BrainIcon, Terminal,
    Activity, ShieldCheck, Cpu, Volume2, Loader2
} from 'lucide-react';

function SessionContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('id');
    const [status, setStatus] = useState<'analyzing' | 'active' | 'paused' | 'completed'>('analyzing');
    const [currentQuestion, setCurrentQuestion] = useState('Initializing AI Logic... Syncing requirements...');
    const [answer, setAnswer] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [phase, setPhase] = useState<'intro' | 'technical' | 'coding' | 'behavioral' | 'feedback'>('intro');
    const [progress, setProgress] = useState(0);
    const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeveloper, setIsDeveloper] = useState(true); // Default to true, will be updated from session
    const recognitionRef = useRef<any>(null);
    const router = useRouter();

    const isListeningRef = useRef(isListening);
    const statusRef = useRef(status);
    const isLoadingRef = useRef(isLoading);

    useEffect(() => { isListeningRef.current = isListening; }, [isListening]);
    useEffect(() => { statusRef.current = status; }, [status]);
    useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);

    const speak = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            // CRITICAL: Turn off mic while system is speaking to prevent echo
            const wasListening = isListeningRef.current;
            if (wasListening) {
                setIsListening(false);
            }

            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;

            // Resume listening after speech completes
            utterance.onend = () => {
                if (wasListening && statusRef.current === 'active') {
                    setTimeout(() => setIsListening(true), 500); // Small delay to prevent catching tail end
                }
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            if (!sessionId) return;
            try {
                const response = await fetch(`http://localhost:4000/api/interview/${sessionId}`, {
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.success) {
                    const session = result.data;

                    // Check if interview is completed
                    if (session.status === 'completed') {
                        router.push(`/report/${sessionId}`);
                        return;
                    }

                    // Find the current unanswered question
                    // The last message should be an interviewer question waiting for answer
                    const lastMessage = session.history[session.history.length - 1];

                    if (lastMessage && lastMessage.role === 'interviewer') {
                        // This is the current question waiting for an answer
                        setCurrentQuestion(lastMessage.content);
                        speak(lastMessage.content);
                    } else if (lastMessage && lastMessage.role === 'candidate') {
                        // User just answered but hasn't received next question yet
                        // This shouldn't happen normally, but handle it gracefully
                        setCurrentQuestion("Processing your answer...");
                    }

                    setPhase(session.currentPhase);
                    setStatus('active');

                    // Set isDeveloper flag from session
                    if (session.jdInfo?.isDeveloper !== undefined) {
                        setIsDeveloper(session.jdInfo.isDeveloper);
                    }

                    // Reconstruct history: Pair interviewer statements with following candidate responses
                    const hist: { q: string; a: string }[] = [];
                    for (let i = 0; i < session.history.length; i++) {
                        if (session.history[i].role === 'candidate') {
                            const prevInterviewer = session.history.slice(0, i).reverse().find((h: any) => h.role === 'interviewer');
                            if (prevInterviewer) {
                                hist.push({ q: prevInterviewer.content, a: session.history[i].content });
                            }
                        }
                    }
                    setHistory(hist);
                    setProgress(Math.min((hist.length / 15) * 100, 100));
                }
            } catch (err) {
                console.error('Fetch Session Error:', err);
            }
        };

        fetchSession();

        // Initialize Speech Recognition
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onresult = (event: any) => {
                    if (isLoadingRef.current) return;
                    let finalTranscript = '';
                    for (let i = 0; i < event.results.length; i++) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                    if (finalTranscript) {
                        setAnswer(finalTranscript);
                    }
                };

                recognition.onerror = (event: any) => {
                    console.error('Speech recognition error:', event.error);
                    if (event.error === 'not-allowed') {
                        setIsListening(false);
                        alert('Microphone access denied.');
                    }
                };

                recognition.onend = () => {
                    if (isListeningRef.current && statusRef.current === 'active') {
                        try {
                            recognition.start();
                        } catch (e) { }
                    }
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
        };
    }, [sessionId]);

    useEffect(() => {
        if (!recognitionRef.current) return;
        if (isListening) {
            try { recognitionRef.current.start(); } catch (e) { }
        } else {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    const [error, setError] = useState<string | null>(null);
    const [processingStep, setProcessingStep] = useState<string>('');
    const [retryCount, setRetryCount] = useState(0);

    const submitAnswer = async (retryAttempt = 0) => {
        if (!answer.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        setProcessingStep('Submitting your answer...');

        // Stop recognition to clear native buffer for the next question
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.error('Stop recognition error:', e);
            }
        }

        try {
            setProcessingStep('Analyzing your response...');

            // Add timeout protection
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 30000);

            const response = await fetch('http://localhost:4000/api/interview/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ sessionId, answer }),
                signal: controller.signal
            });

            clearTimeout(timeout);

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            setProcessingStep('Generating next question...');
            const result = await response.json();

            if (result.success) {
                const session = result.data;

                // Show completed or next question
                if (result.finished) {
                    setCurrentQuestion("Interview completed. Processing your results...");
                    speak("Thank you. We have completed the interview. Generating your benchmark report now.");
                    setProcessingStep('Complete!');
                    setTimeout(() => { router.push(`/report/${sessionId}`); }, 3000);
                } else {
                    // CRITICAL FIX: Use last message instead of filter().pop()
                    const lastMessage = session.history[session.history.length - 1];
                    if (lastMessage && lastMessage.role === 'interviewer') {
                        setCurrentQuestion(lastMessage.content);
                        setAnswer(''); // Clear input BEFORE speaking
                        speak(lastMessage.content);
                    }
                    setPhase(session.currentPhase);
                    setRetryCount(0);

                    // Update isDeveloper flag if present
                    if (session.jdInfo?.isDeveloper !== undefined) {
                        setIsDeveloper(session.jdInfo.isDeveloper);
                    }

                    // Improved history reconstruction: Pair interviewer statements with following candidate responses
                    const hist: { q: string; a: string }[] = [];
                    for (let i = 0; i < session.history.length; i++) {
                        if (session.history[i].role === 'candidate') {
                            // Find the prompt that led to this answer (the previous interviewer message)
                            const prevInterviewer = session.history.slice(0, i).reverse().find((h: any) => h.role === 'interviewer');
                            if (prevInterviewer) {
                                hist.push({ q: prevInterviewer.content, a: session.history[i].content });
                            }
                        }
                    }
                    setHistory(hist);
                    setProgress(Math.min((hist.length / 15) * 100, 100));
                    setProcessingStep('');
                }
            } else {
                throw new Error(result.message || 'Failed to process answer');
            }
        } catch (err: any) {
            console.error('Answer Error:', err);

            const isTimeout = err.name === 'AbortError';
            const isNetworkError = err.message?.includes('Failed to fetch');

            // Retry logic for network errors and timeouts
            if ((isTimeout || isNetworkError) && retryAttempt < 2) {
                setRetryCount(retryAttempt + 1);
                setProcessingStep(`Connection issue. Retrying (${retryAttempt + 1}/2)...`);
                setTimeout(() => submitAnswer(retryAttempt + 1), 2000);
                return;
            }

            // Show user-friendly error
            const errorMsg = isTimeout
                ? 'Request timed out. The AI is taking longer than expected. Please try again.'
                : isNetworkError
                    ? 'Network connection failed. Please check your internet and try again.'
                    : err.message || 'An unexpected error occurred. Please try again.';

            setError(errorMsg);
            setProcessingStep('');
            setIsLoading(false);
        } finally {
            if (!error) {
                setIsLoading(false);
                setProcessingStep('');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-hidden flex flex-col font-sans selection:bg-blue-500/20">
            {/* Header */}
            <header className="h-16 px-8 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/10">
                            <Cpu className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-lg">Interview<span className="text-blue-600">AI</span></span>
                    </div>

                    <div className="h-6 w-px bg-slate-100" />

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                            <div className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_10px_rgba(34,61,197,0.2)]" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => router.push('/')} className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-xs transition-all border border-slate-200 active:scale-95">
                        End Interview
                    </button>
                </div>
            </header>

            <main className="flex-1 grid lg:grid-cols-[1fr,400px] overflow-hidden bg-slate-50/30">
                {/* Stage Area */}
                <div className="p-8 flex flex-col gap-8">
                    {/* Navigation Pills */}
                    <div className="flex gap-2">
                        {['intro', 'technical', ...(isDeveloper ? ['coding'] : []), 'behavioral'].map((p) => (
                            <div
                                key={p}
                                className={`px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${phase === p ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border-slate-200 text-slate-400'
                                    }`}
                            >
                                {p}
                            </div>
                        ))}
                    </div>

                    {/* AI Main Interface */}
                    <div className="flex-1 bg-white rounded-[40px] border border-slate-200 overflow-hidden flex flex-col items-center justify-center relative shadow-xl shadow-slate-200/50">
                        {/* Decorative background element */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#223DC5_1px,transparent_1px)] bg-[size:40px_40px]" />

                        <div className="relative flex flex-col items-center">
                            <div className="w-64 h-64 rounded-full border-2 border-dashed border-blue-200/50 flex items-center justify-center relative">
                                <div className={`absolute inset-4 rounded-full bg-blue-50 border border-blue-100 shadow-inner transition-transform duration-1000 ${status === 'active' ? 'scale-105' : 'scale-90'}`} />
                                <div className={`relative z-10 w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/30 transition-all group ${isListening ? 'scale-110' : ''}`}>
                                    <Volume2 className={`w-10 h-10 text-white ${status === 'active' ? 'animate-pulse' : ''}`} />
                                    {isListening && <div className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-ping" />}
                                </div>

                                {/* Orbiting dots */}
                                <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                                    <div className="w-3 h-3 bg-blue-300 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-inner" />
                                </div>
                                <div className="absolute inset-0 animate-[spin_7s_linear_infinite_reverse]">
                                    <div className="w-2 h-2 bg-slate-200 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" />
                                </div>
                            </div>

                            <div className="mt-16 text-center max-w-2xl px-10">
                                <h2 className="text-3xl font-bold text-[#0F172A] leading-relaxed tracking-tight mb-4">
                                    "{currentQuestion}"
                                </h2>
                                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] opacity-80">
                                    <Activity className="w-4 h-4" /> AI Audio Processing Engine
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="space-y-4">
                        {/* Error Banner */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top duration-300">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-red-900">{error}</p>
                                    <button
                                        onClick={() => { setError(null); submitAnswer(); }}
                                        className="mt-2 text-xs font-bold text-red-600 hover:text-red-700 underline"
                                    >
                                        Try Again
                                    </button>
                                </div>
                                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Processing Status */}
                        {processingStep && (
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
                                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                <p className="text-sm font-medium text-blue-900">{processingStep}</p>
                                {retryCount > 0 && (
                                    <span className="ml-auto text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
                                        Retry {retryCount}/2
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="bg-white border border-slate-200 rounded-[32px] p-6 flex items-center gap-6 shadow-xl shadow-slate-200/30">
                            <button
                                onClick={() => setIsListening(!isListening)}
                                className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${isListening ? 'bg-red-500 shadow-xl shadow-red-500/20' : 'bg-slate-50 hover:bg-slate-100 border border-slate-100'
                                    }`}
                            >
                                {isListening ? <Mic className="w-8 h-8 text-white" /> : <MicOff className="w-8 h-8 text-slate-300" />}
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                                    placeholder={isListening ? "Listening to your response..." : "Type your message here..."}
                                    className="w-full bg-slate-50 border border-slate-100 py-7 px-8 rounded-2xl text-lg font-medium focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-slate-300 text-slate-900 pr-32"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {answer && (
                                        <button
                                            onClick={() => setAnswer('')}
                                            className="p-2 text-slate-300 hover:text-slate-500 transition-colors"
                                            title="Clear text"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => submitAnswer()}
                                        disabled={isLoading || !answer.trim()}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl transition-all shadow-lg active:scale-95"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <aside className="border-l border-slate-100 bg-white p-8 flex flex-col gap-10 shadow-2xl">
                    <div>
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-blue-500" /> Interview History
                        </h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                            {history.length === 0 ? (
                                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] text-slate-400 italic">
                                    No responses recorded yet.
                                </div>
                            ) : (
                                history.map((item, i) => (
                                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="w-3 h-3 text-blue-500" />
                                            <span className="text-[9px] font-black uppercase tracking-tight text-slate-400">Q{i + 1} response</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-2">
                                            {item.q}
                                        </p>
                                        <div className="h-px bg-slate-50" />
                                        <p className="text-[11px] text-blue-600 font-medium italic">
                                            "{item.a}"
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex-1" />

                    <div className="space-y-4">
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl group">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Confidence Score</h4>
                                <span className="text-xs font-bold text-blue-600">82%</span>
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[82%] shadow-[0_0_8px_rgba(34,61,197,0.3)]" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[32px] text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-60">AI Interview Tip</h4>
                                <p className="text-sm font-bold leading-relaxed italic">
                                    "Focus on describing the 'Why' behind your technical decisions. The system values rationale over syntax."
                                </p>
                            </div>
                            <Activity className="absolute bottom-[-20px] right-[-20px] w-32 h-32 opacity-10 rotate-12" />
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default function InterviewSessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>}>
            <SessionContent />
        </Suspense>
    );
}
