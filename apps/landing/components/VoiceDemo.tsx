"use client";

import { Mic, MicOff, Send, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { ENV } from "@/app/env";
import { URLS } from "@/constants/urls";
import { useRouter } from "next/navigation";

export function VoiceDemo() {
    const router = useRouter();
    return (
        <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Content */}
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-Powered Innovation
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight text-gray-900">
                    Create Your Resume{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Just by Speaking
                    </span>
                </h2>

                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    Say goodbye to typing! Our revolutionary voice command technology lets you build your entire resume hands-free. Just speak naturally about your career.
                </p>

                {/* Feature List */}
                <div className="space-y-3 mb-6">
                    {[
                        {
                            icon: <Mic className="w-5 h-5" />,
                            title: "Natural Speech Recognition",
                            description: "AI understands and formats perfectly",
                            color: "blue"
                        },
                        {
                            icon: <Sparkles className="w-5 h-5" />,
                            title: "Real-time Transcription",
                            description: "See your words appear instantly",
                            color: "purple"
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 group">
                            <div className={`w-10 h-10 bg-${feature.color}-100 rounded-lg flex items-center justify-center text-${feature.color}-600 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{feature.title}</h3>
                                <p className="text-xs text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href={`${URLS.EDITOR}?voice=true`}
                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all group text-sm"
                >
                    <Mic className="w-4 h-4" />
                    Try Voice Command Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Right: Image with Voice Demo Overlay */}
            <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl relative h-[420px]">
                    {/* Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80"
                        alt="Minimalist Professional Workspace"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Voice Recording Card Overlay */}
                    <div className="absolute top-6 left-6 right-6 bg-white rounded-xl p-4 shadow-xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                                    <Mic className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">Voice Recording</div>
                                    <div className="text-[10px] text-gray-500">00:45 / 05:00</div>
                                </div>
                            </div>
                            <div className="px-2.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 animate-pulse">
                                Live
                            </div>
                        </div>

                        {/* Waveform Animation */}
                        <div className="flex items-end justify-center gap-1 h-10 bg-blue-50/50 rounded-lg p-2 mb-1">
                            {[30, 64, 80, 56, 72, 60, 76, 52, 68, 80].map((height, i) => (
                                <div
                                    key={i}
                                    className="w-1 rounded-full bg-blue-600"
                                    style={{
                                        height: `${height}%`,
                                        animation: `wave 1.2s ease-in-out infinite ${i * 0.1}s`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Live Transcript Card */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <div className="text-[10px] font-bold text-blue-600 mb-1">Live Transcript:</div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            "I'm a senior product designer with 5 years of experience. I specialize in UX/UI design..."
                        </p>
                    </div>
                </div>

                {/* Decorative Badge */}
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Voice Tech
                </div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% { height: 30%; }
                    50% { height: 100%; }
                }
            `}</style>
        </div>
    );
}
