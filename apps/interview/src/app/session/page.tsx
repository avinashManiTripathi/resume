"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, MoreVertical,
    PhoneOff, ChevronLeft, Circle, Square, Sparkles, Clock, Tag, Users,
    CheckCircle2, Loader2, Mic2
} from 'lucide-react';
import { sessionConfig, aiSettings, type SidebarConfig } from '../../config/session.constants';

// Animated Avatar Component with realistic facial animations
function AnimatedAvatar({ isSpeaking, size = 'large' }: { isSpeaking: boolean; size?: 'small' | 'large' }) {
    const dimensions = size === 'large' ? 'w-64 h-64' : 'w-8 h-8';
    const [isBlinking, setIsBlinking] = useState(false);

    // Realistic eye blinking effect
    useEffect(() => {
        if (size !== 'large') return;

        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        };

        // Random blinking intervals (2-6 seconds)
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
            {/* Main Avatar Image with Hair Animation */}
            <div className={`w-full h-full relative ${isSpeaking && size === 'large' ? 'animate-hair-flow' : ''}`}>
                <img
                    src="/ai-interviewer.png"
                    alt="AI Interviewer"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Eye Blinking Overlay - Only for large avatar */}
            {size === 'large' && isBlinking && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* Left eye blink */}
                    <div className="absolute top-[38%] left-[35%] w-8 h-1 bg-gradient-to-b from-transparent via-black/60 to-transparent rounded-full" />
                    {/* Right eye blink */}
                    <div className="absolute top-[38%] right-[35%] w-8 h-1 bg-gradient-to-b from-transparent via-black/60 to-transparent rounded-full" />
                </div>
            )}

            {/* Enhanced Lip Sync Animation - Only for large avatar */}
            {size === 'large' && isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute top-[57%] left-1/2 -translate-x-1/2">
                        {/* Multi-layer mouth animation for realistic effect */}
                        <div className="relative">
                            {/* Upper lip */}
                            <div className="w-12 h-3 rounded-full bg-gradient-to-b from-rose-300/30 to-transparent blur-[1px] animate-lip-upper" />
                            {/* Lower lip */}
                            <div className="absolute top-2 left-0 w-12 h-4 rounded-full bg-gradient-to-t from-rose-300/40 to-transparent blur-[1px] animate-lip-lower" />
                            {/* Mouth opening */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-rose-900/20 animate-mouth-open" />
                        </div>
                    </div>
                </div>
            )}

            {/* Gentle face glow when speaking */}
            {isSpeaking && size === 'large' && (
                <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 animate-face-glow" />
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer" />
                </>
            )}
        </div>
    );
}

function SessionContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('id');
    const router = useRouter();

    // Session state
    const [session, setSession] = useState<any>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [activeTab, setActiveTab] = useState<'questions' | 'timeline' | 'highlights'>('questions');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Sidebar configuration from constants
    const [sidebarConfig, setSidebarConfig] = useState<SidebarConfig>(sessionConfig.sidebar);

    // Media state
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Speech state
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Voice recognition state
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    // Mock questions - will be replaced by real session data
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: "How would you optimize a React app for performance?",
            context: "Use code splitting, lazy loading, memoization (React.memo, useMemo), and avoid unnecessary re-renders with proper dependency handling in hooks.",
            completed: false
        },
        {
            id: 2,
            text: "Describe your experience with Tailwind CSS.",
            context: "I've used Tailwind in three client projects. I love how it speeds up prototyping and encourages consistent design tokens.",
            completed: false
        },
        {
            id: 3,
            text: "Can you explain how you structure components to keep your code clean and maintainable?",
            context: "Aim for single responsibility, extract reusable logic into custom hooks, use composition over prop drilling, and maintain a clear folder structure.",
            completed: false
        },
        {
            id: 4,
            text: "How do you handle API errors on the frontend?",
            context: "Implement proper error boundaries, show user-friendly error messages, log errors for debugging, and provide retry mechanisms where appropriate.",
            completed: false
        }
    ]);

    // Text-to-speech function with auto voice control (using constants)
    const speak = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = aiSettings.speechRate;
            utterance.pitch = aiSettings.speechPitch;
            utterance.volume = aiSettings.speechVolume;

            // Set speaking state and AUTO-PAUSE voice input when starting
            utterance.onstart = () => {
                setIsSpeaking(true);

                // Auto-pause voice input to avoid feedback
                if (isListening && recognitionRef.current) {
                    try {
                        recognitionRef.current.stop();
                        console.log('🎤 Voice input auto-paused (system speaking)');
                    } catch (err) {
                        console.error('Failed to auto-pause voice input:', err);
                    }
                }
            };

            // Clear speaking state and AUTO-RESUME voice input when done
            utterance.onend = () => {
                setIsSpeaking(false);

                // Auto-resume voice input after configured delay
                if (recognitionRef.current && !isListening) {
                    setTimeout(() => {
                        try {
                            recognitionRef.current.start();
                            setIsListening(true);
                            console.log('🎤 Voice input auto-resumed (system finished speaking)');
                        } catch (err) {
                            console.log('Voice input already active');
                        }
                    }, aiSettings.voiceResumeDelay);
                }
            };

            utterance.onerror = () => {
                setIsSpeaking(false);
                // Also try to resume on error
                if (recognitionRef.current && !isListening) {
                    setTimeout(() => {
                        try {
                            recognitionRef.current.start();
                            setIsListening(true);
                        } catch (err) {
                            console.log('Could not auto-resume after error');
                        }
                    }, aiSettings.voiceResumeDelay);
                }
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onresult = (event: any) => {
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

                    // Update answer with final transcript, append to existing text
                    if (finalTranscript) {
                        setAnswer(prev => (prev + ' ' + finalTranscript).trim());
                    }
                };

                recognition.onerror = (event: any) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                };

                recognition.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    // Toggle voice recognition
    const toggleVoiceRecognition = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (err) {
                console.error('Failed to start recognition:', err);
            }
        }
    };

    // Fetch session data
    useEffect(() => {
        const fetchSession = async () => {
            if (!sessionId) return;
            try {
                const response = await fetch(`http://localhost:4000/api/interview/${sessionId}`, {
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.success) {
                    setSession(result.data);

                    // If session has questions, use them
                    if (result.data.allQuestions && result.data.allQuestions.length > 0) {
                        const mappedQuestions = result.data.allQuestions.map((q: any, idx: number) => ({
                            id: idx + 1,
                            text: q.question,
                            context: q.expectedPoints?.join(', ') || '',
                            completed: idx < (result.data.currentQuestionIndex || 0)
                        }));
                        setQuestions(mappedQuestions);
                        setCurrentQuestionIndex(result.data.currentQuestionIndex || 0);

                        // Speak the current question
                        const currentQ = mappedQuestions[result.data.currentQuestionIndex || 0];
                        if (currentQ) {
                            speak(currentQ.text);
                        }
                    }
                }
            } catch (err) {
                console.error('Fetch Session Error:', err);
            }
        };

        fetchSession();
    }, [sessionId]);

    // Initialize camera
    useEffect(() => {
        const initCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    },
                    audio: true
                });
                setStream(mediaStream);
            } catch (err) {
                console.error('Camera error:', err);
                alert('Unable to access camera/microphone. Please grant permissions and refresh the page.');
            }
        };

        initCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Update video element when stream changes
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const toggleMic = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !isMicOn;
            });
            setIsMicOn(!isMicOn);
        }
    };

    const toggleCamera = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !isCameraOn;
            });
            setIsCameraOn(!isCameraOn);
        }
    };

    const handleQuestionClick = (index: number) => {
        setCurrentQuestionIndex(index);
        // Speak the selected question
        speak(questions[index].text);
    };

    const handleEndInterview = () => {
        if (confirm('Are you sure you want to end this interview?')) {
            // Stop speech synthesis
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
            router.push(`/report/${sessionId}`);
        }
    };

    const submitAnswer = async () => {
        if (!answer.trim() || isLoading) return;
        setIsLoading(true);

        // Stop any ongoing speech
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }

        try {
            const response = await fetch('http://localhost:4000/api/interview/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ sessionId, answer }),
            });

            const result = await response.json();

            if (result.success) {
                // Mark current question as completed
                const updatedQuestions = [...questions];
                if (updatedQuestions[currentQuestionIndex]) {
                    updatedQuestions[currentQuestionIndex].completed = true;
                }
                setQuestions(updatedQuestions);

                // Move to next question
                if (currentQuestionIndex < questions.length - 1) {
                    const nextIndex = currentQuestionIndex + 1;
                    setCurrentQuestionIndex(nextIndex);
                    // Speak the next question
                    speak(updatedQuestions[nextIndex].text);
                } else if (result.finished) {
                    speak("Thank you. Interview completed. Generating your report now.");
                    setTimeout(() => router.push(`/report/${sessionId}`), 3000);
                }

                setAnswer('');
            }
        } catch (err) {
            console.error('Submit error:', err);
            alert('Failed to submit answer. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const jobTitle = session?.jdInfo?.role || 'Software Developer';
    const meetingDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 text-slate-900 font-sans">
            {/* Custom Styles for Realistic Animations */}
            <style jsx global>{`
                @keyframes hair-flow {
                    0%, 100% { 
                        transform: translateX(0) translateY(0) rotate(0deg);
                    }
                    15% { 
                        transform: translateX(-0.5px) translateY(0.3px) rotate(-0.3deg);
                    }
                    30% { 
                        transform: translateX(0.8px) translateY(-0.2px) rotate(0.4deg);
                    }
                    45% { 
                        transform: translateX(-0.6px) translateY(0.4px) rotate(-0.2deg);
                    }
                    60% { 
                        transform: translateX(0.4px) translateY(-0.3px) rotate(0.3deg);
                    }
                    75% { 
                        transform: translateX(-0.3px) translateY(0.2px) rotate(-0.1deg);
                    }
                    90% { 
                        transform: translateX(0.2px) translateY(-0.1px) rotate(0.2deg);
                    }
                }
                
                @keyframes lip-upper {
                    0%, 100% { 
                        transform: translateY(0) scaleY(0.9);
                        opacity: 0.3;
                    }
                    25% { 
                        transform: translateY(-1px) scaleY(0.7);
                        opacity: 0.4;
                    }
                    50% { 
                        transform: translateY(1px) scaleY(1.1);
                        opacity: 0.5;
                    }
                    75% { 
                        transform: translateY(-0.5px) scaleY(0.8);
                        opacity: 0.4;
                    }
                }
                
                @keyframes lip-lower {
                    0%, 100% { 
                        transform: translateY(0) scaleY(1);
                        opacity: 0.4;
                    }
                    20% { 
                        transform: translateY(1px) scaleY(1.2);
                        opacity: 0.5;
                    }
                    60% { 
                        transform: translateY(-1px) scaleY(0.8);
                        opacity: 0.35;
                    }
                    80% { 
                        transform: translateY(0.5px) scaleY(1.1);
                        opacity: 0.45;
                    }
                }
                
                @keyframes mouth-open {
                    0%, 100% { 
                        transform: translateX(-50%) scaleX(0.6) scaleY(0.5);
                        opacity: 0.2;
                    }
                    30% { 
                        transform: translateX(-50%) scaleX(1.1) scaleY(1.3);
                        opacity: 0.4;
                    }
                    70% { 
                        transform: translateX(-50%) scaleX(0.8) scaleY(0.7);
                        opacity: 0.3;
                    }
                }
                
                @keyframes face-glow {
                    0%, 100% { 
                        opacity: 0.2;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.4;
                        transform: scale(1.02);
                    }
                }
                
                @keyframes shimmer {
                    0% { 
                        transform: translateX(-100%) translateY(-100%) rotate(45deg);
                        opacity: 0;
                    }
                    50% { 
                        opacity: 0.15;
                    }
                    100% { 
                        transform: translateX(100%) translateY(100%) rotate(45deg);
                        opacity: 0;
                    }
                }
                
                .animate-hair-flow {
                    animation: hair-flow 4s ease-in-out infinite;
                }
                
                .animate-lip-upper {
                    animation: lip-upper 0.35s ease-in-out infinite;
                }
                
                .animate-lip-lower {
                    animation: lip-lower 0.4s ease-in-out infinite;
                    animation-delay: 0.08s;
                }
                
                .animate-mouth-open {
                    animation: mouth-open 0.3s ease-in-out infinite;
                    animation-delay: 0.05s;
                }
                
                .animate-face-glow {
                    animation: face-glow 2.5s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 3s ease-in-out infinite;
                }
            `}</style>

            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900">Hiring - {jobTitle}</h1>
                            <p className="text-xs text-slate-500">Summary of employees, income, and payment status metrics.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isRecording ? (
                            <button
                                onClick={() => setIsRecording(false)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <Square className="w-4 h-4 text-slate-700" />
                                <span className="text-sm font-medium text-slate-700">Stop Recording</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsRecording(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <Circle className="w-4 h-4 text-white fill-white animate-pulse" />
                                <span className="text-sm font-medium text-white">Live Recording</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="max-w-[1800px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* Video Grid */}
                    <div className="bg-slate-100 rounded-3xl overflow-hidden relative" style={{ height: '600px' }}>
                        {/* Main Video (Interviewer) */}
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <AnimatedAvatar isSpeaking={isSpeaking} size="large" />
                                    <p className="text-slate-700 font-semibold text-lg mt-4">AI Interviewer</p>
                                    {isSpeaking && (
                                        <div className="flex items-center justify-center gap-1 mt-2">
                                            <div className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Badge */}
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                <AnimatedAvatar isSpeaking={isSpeaking} size="small" />
                                <span className="text-sm font-medium text-slate-700">AI Interviewer</span>
                                {isSpeaking && (
                                    <div className="ml-1 flex items-center gap-0.5">
                                        <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Secondary Video (Candidate) - Picture in Picture */}
                        <div className="absolute top-6 right-6 w-72 h-52 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-white">
                            {isCameraOn && stream ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-700">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-xl font-bold text-white">You</span>
                                        </div>
                                        <p className="text-white text-sm">Camera Off</p>
                                    </div>
                                </div>
                            )}

                            {/* Audio Indicator */}
                            {isMicOn && (
                                <div className="absolute top-3 right-3 bg-green-500/80 backdrop-blur-sm rounded-full p-2">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                            )}

                            {/* Profile Badge for PiP */}
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-xs font-medium text-slate-700">You</span>
                            </div>
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                            <button
                                onClick={toggleMic}
                                className={`control-btn p-4 rounded-xl transition-all ${isMicOn
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                                title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
                            >
                                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={toggleCamera}
                                className={`control-btn p-4 rounded-xl transition-all ${isCameraOn
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                                title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                            >
                                {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                            </button>

                            <button className="control-btn p-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all" title="Share screen">
                                <Monitor className="w-5 h-5" />
                            </button>

                            <button className="control-btn p-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all" title="Chat">
                                <MessageSquare className="w-5 h-5" />
                            </button>

                            <button className="control-btn p-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all" title="More options">
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            <div className="w-px h-8 bg-slate-200 mx-2"></div>

                            <button
                                onClick={handleEndInterview}
                                className="control-btn p-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all"
                                title="End interview"
                            >
                                <PhoneOff className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Current Question Display */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Current Question</h3>
                                <p className="text-lg font-semibold text-slate-900">{currentQuestion?.text}</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Meeting Notes */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Sparkles className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">AI Summary of Meeting</h3>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                            <p className="text-sm text-slate-700 leading-relaxed">
                                This AI-powered interview session is evaluating the candidate for the {jobTitle} position. The discussion covers technical skills, problem-solving abilities, and experience with relevant technologies. Questions are dynamically generated based on the job requirements to ensure a comprehensive assessment.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{meetingDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span>Interview</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>AI Interviewer, Candidate</span>
                            </div>
                        </div>
                    </div>

                    {/* Answer Input */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-semibold text-slate-700">Your Answer</label>
                            <button
                                onClick={toggleVoiceRecognition}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isListening
                                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                                    }`}
                                title={isListening ? 'Stop voice input' : 'Start voice input'}
                            >
                                <Mic2 className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                                {isListening ? 'Listening...' : 'Voice Input'}
                            </button>
                        </div>
                        <div className="relative">
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.ctrlKey) {
                                        submitAnswer();
                                    }
                                }}
                                placeholder={isListening ? "Listening to your voice... speak now" : "Type your response here... (Ctrl+Enter to submit)"}
                                className={`w-full h-32 bg-slate-50 border rounded-xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 resize-none ${isListening
                                    ? 'border-red-300 ring-2 ring-red-200 bg-red-50/30'
                                    : 'border-slate-200 focus:ring-blue-500'
                                    }`}
                            />
                            {isListening && (
                                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                                    <div className="flex items-center gap-0.5">
                                        <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
                                        <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span>Recording</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={submitAnswer}
                                disabled={isLoading || !answer.trim()}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Answer'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'questions'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Question List
                        </button>
                        <button
                            onClick={() => setActiveTab('timeline')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'timeline'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Timeline
                        </button>
                        <button
                            onClick={() => setActiveTab('highlights')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'highlights'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Highlight Clips
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 max-h-[800px] overflow-y-auto custom-scrollbar">
                        {activeTab === 'questions' && (
                            <div className="space-y-3">
                                {questions.map((question, index) => (
                                    <button
                                        key={question.id}
                                        onClick={() => handleQuestionClick(index)}
                                        className={`question-card w-full text-left p-4 rounded-xl transition-all border ${currentQuestionIndex === index
                                            ? 'bg-blue-50 border-blue-200'
                                            : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${question.completed
                                                ? 'bg-green-500 text-white'
                                                : currentQuestionIndex === index
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {question.completed ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : (
                                                    `0${question.id}`
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                                                    {question.text}
                                                </h4>
                                                <p className="text-xs text-slate-500 line-clamp-2">
                                                    {question.context}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {activeTab === 'timeline' && (
                            <div className="text-center py-12 text-slate-500">
                                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">Timeline view coming soon</p>
                            </div>
                        )}

                        {activeTab === 'highlights' && (
                            <div className="text-center py-12 text-slate-500">
                                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">Highlight clips coming soon</p>
                            </div>
                        )}
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
