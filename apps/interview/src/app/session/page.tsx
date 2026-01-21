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
import InterviewChat from '../../components/InterviewChat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

// Simple Code Editor Component
function CodeEditor({ code, onChange, language = 'javascript' }: { code: string; onChange: (code: string) => void; language?: string }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Basic syntax highlighting (very simple regex based)
    const highlightCode = (code: string) => {
        return code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"(.*?)"/g, '<span class="text-green-400">"$1"</span>')
            .replace(/'(.*?)'/g, "<span class='text-green-400'>'$1'</span>")
            .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|default|class|extends|=>)\b/g, '<span class="text-purple-400">$1</span>')
            .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-blue-400">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>');
    };

    return (
        <div className="relative w-full h-full bg-[#1e1e1e] font-mono text-sm group">
            {/* Line Numbers (fake) */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#1e1e1e] border-r border-gray-700 text-gray-500 text-right pr-2 pt-4 select-none">
                {code.split('\n').map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                ))}
            </div>

            {/* Syntax Highlight Overlay */}
            <pre
                className="absolute left-10 top-0 right-0 bottom-0 p-4 pointer-events-none leading-6 whitespace-pre-wrap break-all text-white overflow-hidden"
                dangerouslySetInnerHTML={{ __html: highlightCode(code) + '<br/>' }}
                aria-hidden="true"
            />

            {/* Editing Layer */}
            <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="absolute left-10 top-0 right-0 bottom-0 w-[calc(100%-2.5rem)] h-full bg-transparent text-transparent caret-white outline-none resize-none p-4 leading-6 whitespace-pre-wrap break-all z-10"
                spellCheck={false}
                onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const target = e.target as HTMLTextAreaElement;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const newCode = code.substring(0, start) + '  ' + code.substring(end);
                        onChange(newCode);
                        // Cursor position needs to be updated after render (async) - simplified here
                        setTimeout(() => {
                            target.selectionStart = target.selectionEnd = start + 2;
                        }, 0);
                    }
                }}
            />
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

    // Socket state
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    // Interview timer state (1 hour = 3600 seconds)
    const [timeRemaining, setTimeRemaining] = useState(3600);
    const [timerStarted, setTimerStarted] = useState(false);
    const [showTimeWarning, setShowTimeWarning] = useState(false);

    // Interview timer countdown
    useEffect(() => {
        if (!timerStarted || session?.status === 'completed') return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleEndInterview(true); // Auto-end
                    return 0;
                }

                // Show warning at 5 minutes
                if (prev === 300 && !showTimeWarning) {
                    setShowTimeWarning(true);
                    alert('⏰ 5 minutes remaining in your interview!');
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerStarted, session?.status, showTimeWarning]);

    // Initialize WebSocket connection
    useEffect(() => {
        const socket = io(API_URL, {
            withCredentials: true,
            transports: ['websocket']
        });

        socket.on('connect', () => {
            console.log('✅ Connected to WebSocket backend');
        });

        // Handle restored history
        socket.on('history', (historyMessages: any[]) => {
            console.log('📜 History restored:', historyMessages.length);
            setMessages(historyMessages);

            // Speak the last message if it was from the AI
            const lastMessage = historyMessages[historyMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
                // Small delay to ensure voices are loaded/ready
                setTimeout(() => {
                    speak(lastMessage.content);
                }, 500);
            }
        });

        socket.on('message', (data: any) => {
            setIsLoading(false);

            // Add to chat messages
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.content,
                timestamp: data.timestamp || new Date().toISOString()
            }]);

            // Speak the response
            if (data.content) {
                speak(data.content);
            }
        });

        socketRef.current = socket;

        // Start interview if session loaded
        if (session) {
            socket.emit('start-interview', {
                name: 'Avinash', // TODO: Get from session/user
                role: session.jdInfo?.role || 'Developer',
                sessionId: session._id
            });

            // Start timer if session is active
            if (session.status === 'active' && !timerStarted) {
                setTimerStarted(true);
            }
        }

        return () => {
            socket.disconnect();
        };
    }, [session]);

    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Initialize voice
    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            const loadVoices = () => {
                const voices = window.speechSynthesis.getVoices();
                setAvailableVoices(voices);

                // Auto-select best voice if not already set
                if (!voice) {
                    const preferredVoice = voices.find(v =>
                        v.name.includes('Natural') || // Edge/Chrome Neural voices
                        v.name.includes('Samantha') || // macOS Siri-like
                        v.name.includes('Google US English') || // Chrome
                        v.name.includes('Microsoft Zira') || // Windows
                        (v.lang === 'en-US' && v.name.includes('Female'))
                    );
                    if (preferredVoice) setVoice(preferredVoice);
                }
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;

            return () => {
                window.speechSynthesis.onvoiceschanged = null;
            };
        }
    }, [voice]);

    // Text-to-speech function with auto voice control (using constants)
    const speak = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            // Try to set a "Siri-like" voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice =>
                voice.name.includes('Samantha') || // macOS Siri-like
                voice.name.includes('Google US English') || // Chrome
                voice.name.includes('Microsoft Zira') || // Windows
                (voice.lang === 'en-US' && voice.name.includes('Female'))
            );

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

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
                    // Socket will handle the start interview event when session is set
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

    /* 
    const handleQuestionClick = (index: number) => {
        // Legacy: questions no longer locally managed
    }; 
    */

    const handleEndInterview = (autoEnd: boolean = false) => {
        const confirmMessage = autoEnd
            ? 'Interview time has ended. Redirecting to your report...'
            : 'Are you sure you want to end this interview?';

        if (autoEnd || confirm(confirmMessage)) {
            // Stop speech synthesis
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
            if (autoEnd) {
                setTimeout(() => router.push(`/report/${sessionId}`), 2000);
            } else {
                router.push(`/report/${sessionId}`);
            }
        }
    };

    // Format timer for display
    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const submitAnswer = async () => {
        if (!answer.trim() || isLoading) return;

        // Add user message to chat immediately
        setMessages(prev => [...prev, {
            role: 'user',
            content: answer,
            timestamp: new Date().toISOString()
        }]);

        setIsLoading(true);

        // Stop any ongoing speech
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }

        if (socketRef.current) {
            socketRef.current.emit('send-message', { content: answer });
        }

        setAnswer('');
    };

    // Simplified for socket-only flow
    const currentQuestion = messages.length > 0 && messages[messages.length - 1].role === 'assistant'
        ? { text: messages[messages.length - 1].content }
        : { text: "Waiting for interviewer..." };
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
                        {/* Interview Timer - Color coded by time remaining */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-mono ${timeRemaining <= 300
                            ? 'bg-red-50 border-red-300 text-red-700 animate-pulse'
                            : timeRemaining <= 600
                                ? 'bg-amber-50 border-amber-300 text-amber-700'
                                : 'bg-blue-50 border-blue-300 text-blue-600'
                            }`}>
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-bold">{formatTime(timeRemaining)}</span>
                        </div>

                        {/* Voice Selector */}
                        <div className="relative group">
                            <select
                                className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48 truncate"
                                value={voice?.name || ''}
                                onChange={(e) => {
                                    const selected = availableVoices.find(v => v.name === e.target.value);
                                    if (selected) {
                                        setVoice(selected);
                                        // Test the voice
                                        const utterance = new SpeechSynthesisUtterance("Hello, I am your AI interviewer.");
                                        utterance.voice = selected;
                                        window.speechSynthesis.cancel();
                                        window.speechSynthesis.speak(utterance);
                                    }
                                }}
                            >
                                <option value="" disabled>Select Voice</option>
                                {availableVoices
                                    .filter(v => v.lang.startsWith('en')) // Filter for English voices
                                    .map((v) => (
                                        <option key={v.name} value={v.name}>
                                            {v.name.replace('Microsoft ', '').replace('Google ', '')}
                                        </option>
                                    ))}
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <Mic2 className="w-3 h-3" />
                            </div>
                        </div>

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
                                onClick={() => handleEndInterview()}
                                className="control-btn p-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all"
                                title="End interview"
                            >
                                <PhoneOff className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* AI Meeting Notes */}
                    {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
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
                    </div> */}

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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                    <InterviewChat
                        messages={messages}
                        isTyping={isLoading}
                        inputValue={answer}
                        setInputValue={setAnswer}
                        onSendMessage={submitAnswer}
                    />
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
