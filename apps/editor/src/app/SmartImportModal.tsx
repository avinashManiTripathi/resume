"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Mic, Loader2, Send, Target, Briefcase, MessageCircle, AlertCircle, StopCircle } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { ENV } from './env';

import { API_ENDPOINTS } from '@repo/utils-client';
import { useAppNetwork } from '../hooks/useAppNetwork';

interface SmartImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: any) => void;
    mode?: 'voice' | 'text' // Kept for backward compatibility but ignored logic-wise
}

export default function SmartImportModal({ isOpen, onClose, onApply }: SmartImportModalProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const network = useAppNetwork();

    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const maxTime = 300; // 5 minutes max

    useEffect(() => {
        // Initialize Web Speech API
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;

                recognitionRef.current.onresult = (event: any) => {
                    let interimTranscript = '';
                    let finalTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript + ' ';
                        } else {
                            interimTranscript += transcript;
                        }
                    }

                    if (finalTranscript) {
                        setTextInput(prev => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + finalTranscript);
                    }
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error:', event.error);
                    if (event.error === 'not-allowed') {
                        setError('Microphone access denied. Please allow microphone access.');
                        stopRecording();
                    } else if (event.error === 'no-speech') {
                        // Ignore no-speech errors, just stay recording
                    } else {
                        setError(`Speech recognition error: ${event.error}`);
                        stopRecording();
                    }
                };
            } else {
                // Don't show error immediately, only if they try to record
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
                if (SpeechRecognition) {
                    recognitionRef.current = new SpeechRecognition();
                    // Re-attach listeners if needed, but simpler to rely on initial useEffect or re-init logic if complex.
                    // For now, assuming basic support check:
                } else {
                    setError('Voice input is not supported in this browser. Please try Chrome, Edge, or Safari.');
                    return;
                }
            }

            if (!recognitionRef.current) {
                setError('Voice input is not supported in this browser.');
                return;
            }

            setIsRecording(true);

            // Don't clear textInput, we append to it

            // Start speech recognition
            try {
                recognitionRef.current.start();
            } catch (e: any) {
                // unexpected error starting
                console.error("Failed to start recognition:", e);
                setError("Could not start microphone. Please refresh and try again.");
                setIsRecording(false);
                return;
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
        setRecordingTime(0);
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleExtract = async () => {
        const content = textInput;
        if (!content.trim()) return;

        setIsProcessing(true);
        setError(null);
        try {
            const result: any = await network.post(API_ENDPOINTS.RESUME.EXTRACT, { text: content });

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
                                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Speak Automatically</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                                            Use the microphone to dictate your experience. We'll capture it as text.
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
                            Build with AI
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Type or speak your professional details below.
                        </p>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-10 md:pb-6 mt-4">
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

                        <div className="h-full flex flex-col relative">
                            <div className="relative flex-1">
                                <textarea
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    placeholder={"Paste your existing resume content or describe your professional background.\n\nInclude details like:\n• Job titles and companies\n• Key achievements and metrics (e.g., 'Increased sales by 20%')\n• Technical skills and tools used\n• Education and certifications\n\nYou can also use the microphone button below to dictate."}
                                    className="w-full h-full min-h-[300px] p-6 pb-20 bg-slate-50 border border-slate-200 rounded-3xl resize-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 leading-relaxed custom-scrollbar"
                                />

                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <div className="text-xs font-semibold text-slate-400 bg-slate-100/50 backdrop-blur px-2 py-1 rounded-lg border border-slate-200/50">
                                        {textInput.length} chars
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={toggleRecording}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${isRecording
                                                ? 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 animate-pulse'
                                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            {isRecording ? (
                                                <>
                                                    <StopCircle className="w-4 h-4" />
                                                    Stop ({formatTime(recordingTime)})
                                                </>
                                            ) : (
                                                <>
                                                    <Mic className="w-4 h-4" />
                                                    Start Voice Input
                                                </>
                                            )}
                                        </button>
                                        {isRecording && (
                                            <span className="text-xs font-medium text-blue-600 animate-pulse">Recording...</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            disabled={isProcessing || !textInput.trim()}
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
                    `}</style>
                </div>
            </div>
        </div>
    );
}
