'use client';

import React, { useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

interface InterviewChatProps {
    messages: Message[];
    isTyping: boolean;
    inputValue: string;
    setInputValue: (val: string) => void;
    onSendMessage: () => void;
}

const InterviewChat: React.FC<InterviewChatProps> = ({
    messages,
    isTyping,
    inputValue,
    setInputValue,
    onSendMessage
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse shadow-sm shadow-emerald-500/50" />
                </div>
                <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Neural link</h3>
                    <p className="text-[10px] text-purple-600 font-black uppercase tracking-widest opacity-80">Connected & active</p>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full opacity-20 py-20">
                        <Bot className="w-16 h-16 mb-6 text-slate-400" />
                        <p className="text-[10px] font-black text-center uppercase tracking-[0.3em] text-slate-500">Establishing Link...</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'user'
                            ? 'bg-purple-600 border-purple-400 shadow-purple-600/20'
                            : 'bg-slate-50 border-slate-200'
                            }`}>
                            {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-purple-600" />}
                        </div>
                        <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                            <div className={`px-5 py-4 rounded-2xl text-[13px] leading-relaxed shadow-sm transition-all ${msg.role === 'user'
                                ? 'bg-purple-600 text-white rounded-tr-none'
                                : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                            <span className="text-[9px] text-slate-400 mt-2 px-1 font-black uppercase tracking-widest opacity-60">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-purple-600 animate-pulse" />
                        </div>
                        <div className="bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex gap-1.5">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-8 border-t border-slate-100 bg-slate-50/30">
                <div className="relative group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                        placeholder="Type your response..."
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pr-16 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500/30 transition-all placeholder:text-slate-400"
                    />
                    <button
                        onClick={onSendMessage}
                        disabled={!inputValue.trim()}
                        className="absolute right-3 top-2.5 w-10 h-10 bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:grayscale rounded-xl text-white transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-purple-600/20"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[9px] text-center text-slate-400 mt-4 font-black uppercase tracking-[0.3em] opacity-60">
                    Interview assessment in progress
                </p>
            </div>
        </div>
    );
};

export default InterviewChat;
