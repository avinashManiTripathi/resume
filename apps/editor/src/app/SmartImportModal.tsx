"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Mic, MicOff, FileText, Loader2, Send, Target, Briefcase, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { ENV } from './env';

interface SmartImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: any) => void;
    mode?: 'voice' | 'text'
}

export default function SmartImportModal({ mode = 'voice', isOpen, onClose, onApply }: SmartImportModalProps) {
    const [inputMode, setInputMode] = useState<'voice' | 'text'>(mode);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const maxTime = 300; // 5 minutes max

    useEffect(() => {
        setInputMode(mode);
        // Initialize Web Speech API
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;

                recognitionRef.current.onresult = (event: any) => {
                    let finalTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript + ' ';
                        }
                    }

                    if (finalTranscript) {
                        setTranscript(prev => prev + finalTranscript);
                    }
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error:', event.error);
                    if (event.error === 'not-allowed') {
                        setError('Microphone access denied. Please allow microphone access.');
                    } else if (event.error === 'no-speech') {
                        // Ignore no-speech errors, just stay recording
                    } else {
                        setError(`Speech recognition error: ${event.error}`);
                        stopRecording();
                    }
                };
            } else {
                setError('Speech recognition is not supported in this browser.');
            }
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    // Ignore errors during cleanup
                }
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            setError(null);

            // Check if recognition is initialized
            if (!recognitionRef.current) {
                // Try to initialize again if valid browser
                const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                if (!SpeechRecognition) {
                    setError('Voice input is not supported in this browser. Please try Chrome, Edge, or Safari.');
                    return;
                }
            }

            setIsRecording(true);
            setRecordingTime(0);
            setTranscript('');

            // Start speech recognition
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                } catch (e: any) {
                    // unexpected error starting
                    console.error("Failed to start recognition:", e);
                    setError("Could not start microphone. Please refresh and try again.");
                    setIsRecording(false);
                    return;
                }
            }

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= maxTime) {
                        stopRecording();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } catch (error) {
            console.error('Error starting recording:', error);
            setIsRecording(false);
            setError("Failed to start recording.");
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        setIsPaused(false);

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                // Ignore errors if recognition already stopped
            }
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const pauseRecording = () => {
        setIsPaused(true);

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                // Ignore errors
            }
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const resumeRecording = () => {
        setIsPaused(false);

        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error('Error resuming recording:', e);
            }
        }

        // Resume timer
        timerRef.current = setInterval(() => {
            setRecordingTime(prev => {
                if (prev >= maxTime) {
                    stopRecording();
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const handleExtract = async () => {
        const content = inputMode === 'voice' ? transcript : textInput;
        if (!content.trim()) return;

        setIsProcessing(true);
        setError(null);
        try {
            const response = await fetch(`${ENV.API_URL}/api/resume/extract`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: content })
            });

            const result = await response.json();

            if (result.success) {
                onApply(result.data);
                handleClose();
            } else {
                console.error('Extraction failed:', result.message);
                setError(result.message || "Failed to analyze content. Please try again.");
            }
        } catch (error) {
            console.error('Error processing input:', error);
            setError("Network error. Please check your connection.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        stopRecording();
        setTextInput('');
        setTranscript('');
        setRecordingTime(0);
        onClose();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-none md:rounded-3xl shadow-2xl w-full max-w-5xl h-full md:h-[650px] max-h-[100dvh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
                {/* Left Sidebar - Guidance & Errors */}
                <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between hidden md:flex relative overflow-hidden">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                    <div className="relative z-10">
                        {/* Sidebar Header */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="p-2 bg-blue-100/50 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm font-bold text-slate-900 tracking-tight">AI Resume Assistant</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                                Let's build your professional story
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Our AI analyzes your input to create structured, professional resume points.
                            </p>
                        </div>

                        {/* Modern Guidance Cards */}
                        <div className="space-y-3">
                            <div className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Target className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Be Specific</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                                            Mention specific numbers & tools (e.g. "Increased sales by 20% using Salesforce").
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-200">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <MessageCircle className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Speak Naturally</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                                            Just tell your story like you're talking to a colleague. We'll handle the formatting.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-200">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Briefcase className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Cover Basics</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                                            Include roles, dates, company names, and your key responsibilities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Display Area (Bottom of Sidebar) */}
                    <div className="mt-auto pt-6 relative z-10">
                        {error && (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 animate-in slide-in-from-bottom-2 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm flex-shrink-0 border border-red-100">
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-red-900 mb-0.5">Import Failed</h5>
                                        <p className="text-xs text-red-700 leading-relaxed">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Main Content */}
                <div className="flex-1 flex flex-col h-full bg-white relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="px-6 pt-6 pb-2 md:px-10 md:pt-10 md:pb-2 flex-shrink-0">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Import Content
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Choose how you want to provide your details.
                        </p>
                    </div>

                    {/* Input Mode Toggle */}
                    <div className="px-6 py-4 md:px-10 md:py-6 flex-shrink-0">
                        <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl w-fit">
                            <button
                                onClick={() => {
                                    setInputMode('voice');
                                    setTextInput('');
                                }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${inputMode === 'voice'
                                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                <Mic className="w-4 h-4" />
                                Voice Input
                            </button>
                            <button
                                onClick={() => {
                                    setInputMode('text');
                                    stopRecording();
                                }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${inputMode === 'text'
                                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                <FileText className="w-4 h-4" />
                                Text Input
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-10 md:pb-6">
                        {/* Mobile Error Display */}
                        {error && (
                            <div className="md:hidden mb-4 bg-red-50 border border-red-100 rounded-2xl p-4 animate-in slide-in-from-bottom-2 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm flex-shrink-0 border border-red-100">
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-red-900 mb-0.5">Import Failed</h5>
                                        <p className="text-xs text-red-700 leading-relaxed">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {inputMode === 'voice' ? (
                            <div className="h-full flex flex-col relative group">
                                <div className="relative flex-1">
                                    <textarea
                                        value={transcript}
                                        onChange={(e) => setTranscript(e.target.value)}
                                        placeholder={"Speak naturally about your career. Mention your roles, specific projects you've led, technologies you've used, and the impact you made.\n\nExample: \"I've been working as a Product Designer at Apple for the last 4 years. I led the redesign of the Maps app which increased user engagement by 15%...\""}
                                        className="w-full h-full min-h-[300px] p-6 pb-24 bg-slate-50 border border-slate-200 rounded-3xl resize-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 leading-relaxed custom-scrollbar"
                                    />

                                    {/* Floating Mic Button & Status */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                                        {/* Timer/Status Label */}
                                        {isRecording && (
                                            <div className="bg-slate-900/90 text-white text-xs font-mono py-1 px-3 rounded-full backdrop-blur-md animate-in slide-in-from-bottom-2 fade-in">
                                                {formatTime(recordingTime)} • {isPaused ? 'PAUSED' : 'RECORDING'}
                                            </div>
                                        )}

                                        <button
                                            onClick={isRecording ? stopRecording : startRecording}
                                            className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${isRecording
                                                ? 'bg-red-500 hover:bg-red-600 text-white scale-110'
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105'
                                                }`}
                                        >
                                            {/* Pulsing Rings when recording */}
                                            {isRecording && !isPaused && (
                                                <>
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-20 animate-pulse delay-75 scale-125" />
                                                </>
                                            )}

                                            {isRecording ? (
                                                <div className="w-6 h-6 rounded-md bg-white shadow-sm" />
                                            ) : (
                                                <Mic className="w-8 h-8" />
                                            )}
                                        </button>

                                        {!isRecording && !transcript && (
                                            <span className="text-xs font-medium text-slate-400 bg-white/50 px-2 py-1 rounded-md mt-1 backdrop-blur-sm">
                                                Tap to Speak
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col">
                                <div className="relative flex-1">
                                    <textarea
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        placeholder={"Paste your existing resume content or describe your professional background.\n\nInclude details like:\n• Job titles and companies\n• Key achievements and metrics (e.g., 'Increased sales by 20%')\n• Technical skills and tools used\n• Education and certifications"}
                                        className="w-full h-full min-h-[300px] p-6 bg-slate-50 border border-slate-200 rounded-3xl resize-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 leading-relaxed custom-scrollbar"
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs font-semibold text-slate-400 bg-slate-100/50 backdrop-blur px-2 py-1 rounded-lg border border-slate-200/50">
                                        {textInput.length} chars
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer - Main Action */}
                    <div className="px-6 py-4 md:px-10 md:py-6 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-none md:rounded-br-3xl">
                        <Button
                            onClick={handleClose}
                            variant='outline'
                            className="border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleExtract}
                            disabled={isProcessing || (inputMode === 'voice' ? !transcript.trim() : !textInput.trim())}
                            variant='primary'
                            className={`min-w-[160px] ${isProcessing ? 'opacity-90' : ''}`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </div>

                    <style jsx global>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background-color: #cbd5e1;
                            border-radius: 20px;
                        }
                        @keyframes sound-wave {
                            0%, 100% { height: 20%; }
                            50% { height: 100%; }
                        }
                        .animate-sound-wave {
                            animation: sound-wave 1s ease-in-out infinite;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}
