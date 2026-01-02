"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Mic, MicOff, FileText, Loader2, Send } from 'lucide-react';

interface SmartImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string) => Promise<void>;
    section?: 'highlights' | 'experience' | 'skills' | 'general';
}

export function SmartImportModal({ isOpen, onClose, onSubmit, section = 'general' }: SmartImportModalProps) {
    const [inputMode, setInputMode] = useState<'voice' | 'text'>('text');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const sectionConfig = {
        highlights: {
            title: 'Professional highlights',
            description: 'Achievements, awards, stand-out results — share your past successes!',
            placeholder: 'Tell us about your achievements, awards, certifications, or notable accomplishments...',
            maxTime: 300 // 5 minutes
        },
        experience: {
            title: 'Work experience',
            description: 'Your career journey, roles, responsibilities, and achievements',
            placeholder: 'Describe your work history, job titles, companies, dates, and what you accomplished...',
            maxTime: 600 // 10 minutes
        },
        skills: {
            title: 'Skills & expertise',
            description: 'Technical skills, soft skills, tools, and technologies you master',
            placeholder: 'List your skills, technologies, tools, programming languages, certifications...',
            maxTime: 180 // 3 minutes
        },
        general: {
            title: 'Resume information',
            description: 'Share any information about your career, education, or professional background',
            placeholder: 'Tell us about yourself, your experience, education, skills, achievements...',
            maxTime: 600 // 10 minutes
        }
    };

    const config = sectionConfig[section];

    useEffect(() => {
        // Initialize Web Speech API
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
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

                setTranscript(prev => prev + finalTranscript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                stopRecording();
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
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
                    if (prev >= config.maxTime) {
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

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleSubmit = async () => {
        const content = inputMode === 'voice' ? transcript : textInput;
        if (!content.trim()) return;

        setIsProcessing(true);
        try {
            await onSubmit(content);
            handleClose();
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
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="relative p-8 pb-6">
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
                        {config.title}
                    </h2>
                    <p className="text-gray-600 text-center max-w-md mx-auto">
                        {config.description}
                    </p>
                </div>

                {/* Input Mode Toggle */}
                <div className="px-8 pb-6">
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

                {/* Content Area */}
                <div className="px-8 pb-8">
                    {inputMode === 'voice' ? (
                        <div className="space-y-6">
                            {/* Audio Visualization */}
                            <div className="relative h-48 flex items-center justify-center">
                                {/* Animated Background Blob */}
                                <div className={`absolute inset-0 flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
                                    <div className="w-64 h-64 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full blur-3xl opacity-60"></div>
                                </div>

                                {/* Waveform */}
                                <div className="relative z-10">
                                    {isRecording ? (
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
                                    {formatTime(recordingTime)}/{formatTime(config.maxTime)}
                                </div>
                            </div>

                            {/* Transcript Preview */}
                            {transcript && (
                                <div className="bg-gray-50 rounded-xl p-4 max-h-32 overflow-y-auto">
                                    <p className="text-sm text-gray-700">{transcript}</p>
                                </div>
                            )}

                            {/* Record Button */}
                            <div className="flex justify-center">
                                {!isRecording ? (
                                    <button
                                        onClick={startRecording}
                                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <Mic className="w-5 h-5" />
                                        Start Recording
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopRecording}
                                        className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl animate-pulse"
                                    >
                                        <MicOff className="w-5 h-5" />
                                        Stop Recording
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Text Area */}
                            <textarea
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder={config.placeholder}
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
                <div className="px-8 pb-8 flex gap-3">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isProcessing || (inputMode === 'voice' ? !transcript.trim() : !textInput.trim())}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    </button>
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
