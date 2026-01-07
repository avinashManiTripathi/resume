"use client";

import { Mic, MicOff, Send, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";

export function VoiceDemo() {
    return (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 mb-6">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600">AI-Powered Innovation</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
                    Create Your Resume
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Just by Speaking</span>
                </h2>

                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                    Say goodbye to typing! Our revolutionary voice command technology lets you build your entire resume hands-free. Just speak naturally about your career, and watch as AI transforms your words into a professional resume.
                </p>

                <div className="space-y-3 sm:space-y-4 mb-8">
                    {[
                        {
                            icon: "🎙️",
                            title: "Natural Speech Recognition",
                            description: "Speak in any language, AI understands and formats perfectly"
                        },
                        {
                            icon: "✨",
                            title: "Real-time Transcription",
                            description: "See your words appear instantly with smart corrections"
                        },
                        {
                            icon: "✏️",
                            title: "Edit Before Submission",
                            description: "Review and refine the transcript before AI processes it"
                        },
                        {
                            icon: "⚡",
                            title: "Lightning Fast",
                            description: "Create a complete resume in under 5 minutes"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-blue-100 hover:border-blue-300 transition-colors">
                            <div className="text-2xl sm:text-3xl flex-shrink-0">{feature.icon}</div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-900">{feature.title}</h4>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    href="/editor"
                    className="inline-flex items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto px-6 py-4 sm:p-5 border-2 font-semibold rounded-xl border-blue-600 text-blue-700 hover:bg-blue-50 transition-all group"
                >
                    <Mic className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 text-blue-700 stroke-2" strokeWidth={2.5} />
                    <span className="font-bold">Try Voice Command Now</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-blue-700 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
            </div>

            {/* Right: Visual Demo */}
            <div className="relative order-1 lg:order-2">
                <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10 border-2 border-gray-100">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
                                    style={{
                                        background: 'linear-gradient(to bottom right, rgb(37, 99, 235), rgb(147, 51, 234))'
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        className="w-7 h-7"
                                    >
                                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2a1 1 0 0 1 2 0v2a5 5 0 0 0 10 0v-2a1 1 0 0 1 2 0z" />
                                        <path d="M12 19a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Voice Recording</div>
                                    <div className="text-xs text-gray-500">00:45 / 05:00</div>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1 animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                Recording
                            </div>
                        </div>

                        <div className="flex items-end justify-center gap-1.5 mb-4 rounded-lg p-3" style={{ height: '96px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                            <div className="w-2 rounded-full h-[48px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0s]"></div>
                            <div className="w-2 rounded-full h-[64px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.1s]"></div>
                            <div className="w-2 rounded-full h-[80px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.2s]"></div>
                            <div className="w-2 rounded-full h-[56px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.3s]"></div>
                            <div className="w-2 rounded-full h-[72px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.4s]"></div>
                            <div className="w-2 rounded-full h-[60px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.5s]"></div>
                            <div className="w-2 rounded-full h-[76px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.6s]"></div>
                            <div className="w-2 rounded-full h-[52px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.7s]"></div>
                            <div className="w-2 rounded-full h-[68px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.8s]"></div>
                            <div className="w-2 rounded-full h-[80px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_0.9s]"></div>
                            <div className="w-2 rounded-full h-[64px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_1.0s]"></div>
                            <div className="w-2 rounded-full h-[56px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_1.1s]"></div>
                            <div className="w-2 rounded-full h-[72px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_1.2s]"></div>
                            <div className="w-2 rounded-full h-[80px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_1.3s]"></div>
                            <div className="w-2 rounded-full h-[64px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_1.4s]"></div>
                            <div className="w-2 rounded-full h-[60px] bg-gradient-to-t from-blue-600 to-purple-500 animate-[wave_1.2s_ease-in-out_infinite_1.5s]"></div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                            <div className="text-xs font-semibold text-blue-600 mb-2">Live Transcript:</div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                "I'm a senior product designer with 5 years of experience. I specialize in UX/UI design and have led projects for major tech companies..."
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button variant="primary">
                            <Send className="w-5 h-5" strokeWidth={2} />
                            Generate with AI
                        </Button>
                        <Button variant="outline" name="micoff">
                            <MicOff name="micoff" className="w-5 h-5" strokeWidth={2} />
                        </Button>
                    </div>
                </div>

                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl rotate-12 animate-bounce opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% { height: 20%; }
                    50% { height: 100%; }
                }
            `}</style>
        </div>
    );
}
