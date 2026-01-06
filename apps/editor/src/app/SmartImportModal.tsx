"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Mic, MicOff, FileText, Loader2, Send } from 'lucide-react';
import { Button } from '@repo/ui/button';

interface SmartImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: any) => void;
}

export default function SmartImportModal({ isOpen, onClose, onApply }: SmartImportModalProps) {
    const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');

    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const maxTime = 300; // 5 minutes max

    useEffect(() => {
        // Initialize Web Speech API
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
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
                stopRecording();
            };
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
            setIsRecording(true);
            setRecordingTime(0);
            setTranscript('');

            // Start speech recognition
            if (recognitionRef.current) {
                recognitionRef.current.start();
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
        try {
            const response = await fetch(`http://localhost:4000/api/resume/extract`, {
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
            }
        } catch (error) {
            console.error('Error processing input:', error);
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
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="relative p-8 pb-6 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* AI Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-600">AI-powered Resume</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
                        Professional highlights
                    </h2>
                    <p className="text-gray-600 text-center max-w-md mx-auto">
                        Achievements, awards, stand-out results — share your past successes!
                    </p>
                </div>

                {/* Input Mode Toggle */}
                <div className="px-8 pb-6 flex-shrink-0">
                    <div className="flex items-center justify-center gap-2 bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => {
                                setInputMode('voice');
                                setTextInput('');
                            }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${inputMode === 'voice'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Mic className="w-4 h-4" />
                            Voice input
                        </button>
                        <button
                            onClick={() => {
                                setInputMode('text');
                                stopRecording();
                            }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${inputMode === 'text'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Text input
                        </button>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    {inputMode === 'voice' ? (
                        <div className="space-y-6">
                            {/* Audio Visualization */}
                            <div className="relative h-48 flex items-center justify-center">
                                {/* Animated Background Blob */}
                                <div className={`absolute inset-0 flex items-center justify-center ${isRecording && !isPaused ? 'animate-pulse' : ''}`}>
                                    <div className="w-64 h-64 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full blur-3xl opacity-60"></div>
                                </div>

                                {/* Waveform */}
                                <div className="relative z-10">
                                    {isRecording && !isPaused ? (
                                        <div className="flex items-end justify-center gap-1 h-24">
                                            {[...Array(20)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-sound-wave"
                                                    style={{
                                                        animationDelay: `${i * 0.1}s`,
                                                        height: '100%'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1 h-24">
                                            {[...Array(20)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-gray-300 rounded-full"
                                                    style={{
                                                        height: `${Math.random() * 40 + 20}%`
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="text-center">
                                <div className="text-2xl font-mono font-semibold text-gray-900">
                                    {formatTime(recordingTime)}/{formatTime(maxTime)}
                                </div>
                                {isPaused && (
                                    <p className="text-sm text-orange-600 mt-2 font-medium">Paused</p>
                                )}
                            </div>

                            {/* Editable Transcript */}
                            {transcript && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Transcript (editable)
                                    </label>
                                    <textarea
                                        value={transcript}
                                        onChange={(e) => setTranscript(e.target.value)}
                                        className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                        placeholder="Your transcript will appear here..."
                                    />
                                    <p className="text-xs text-gray-500">You can edit the transcript before submitting</p>
                                </div>
                            )}

                            {/* Recording Controls */}
                            <div className="flex justify-center gap-3">
                                {!isRecording ? (

                                    <Button onClick={startRecording} variant='primary'>
                                        <Mic className="w-5 h-5" />
                                        Start Recording
                                    </Button>

                                ) : (
                                    <>
                                        {!isPaused ? (
                                            <Button onClick={pauseRecording}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                                                </svg>
                                                Pause
                                            </Button>
                                        ) : (
                                            <Button onClick={resumeRecording}>
                                                <Mic className="w-5 h-5" />
                                                Resume
                                            </Button>
                                        )}
                                        <Button onClick={stopRecording} variant='danger'>
                                            <MicOff className="w-5 h-5" />
                                            Stop
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Text Area */}
                            <textarea
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder="Tell us about your achievements, awards, certifications, or notable accomplishments..."
                                className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:outline-none transition-colors"
                            />
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{textInput.length} characters</span>
                                <span>Minimum 50 characters recommended</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8  py-6 border-t border-gray-200 flex gap-3 justify-between bg-white">
                    <Button
                        onClick={handleClose}
                        variant='outline'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleExtract}
                        disabled={isProcessing || (inputMode === 'voice' ? !transcript.trim() : !textInput.trim())}
                        variant='primary'
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Generate with AI
                            </>
                        )}
                    </Button>
                </div>

                <style jsx>{`
                    @keyframes sound-wave {
                        0%, 100% {
                            height: 20%;
                        }
                        50% {
                            height: 100%;
                        }
                    }
                    .animate-sound-wave {
                        animation: sound-wave 1s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}
