"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Play, Save, RotateCcw, ChevronRight, Terminal,
    Code, Info, CheckCircle, Clock, Send, Zap, Activity,
    Layout, Maximize2, Settings
} from 'lucide-react';

export default function CodingRoundPage() {
    const [code, setCode] = useState(`function solve(arr) {\n  // Implement your algorithm here\n  return 0;\n}`);
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const router = useRouter();

    const runCode = () => {
        setIsRunning(true);
        setTimeout(() => {
            setOutput('> Initializing test runner...\n> Running Test 1: Passed\n> Running Test 2: Passed\n> All test cases verified successfully.\n> Ready for submission.');
            setIsRunning(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-500/20">
            {/* Header */}
            <header className="h-14 px-6 border-b border-slate-200 flex items-center justify-between bg-white z-10 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/10">
                            <Code className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-sm uppercase">Technical Lab <span className="text-slate-400 font-medium">/ Challenge_02</span></span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] tracking-wider mr-4">
                        <Clock className="w-4 h-4 text-blue-500" /> 18:45
                    </div>
                    <button onClick={runCode} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-xs">
                        {isRunning ? 'Executing...' : 'Run Code'} <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                    <button
                        onClick={() => router.push('/report/1')}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold transition-all border border-slate-200 text-xs"
                    >
                        Submit Response <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </header>

            <main className="flex-1 grid lg:grid-cols-[450px,1fr] overflow-hidden">
                {/* Problem Sidebar */}
                <aside className="border-r border-slate-200 bg-white flex flex-col overflow-hidden">
                    <div className="p-8 overflow-y-auto h-full custom-scrollbar">
                        <div className="flex items-center gap-2 text-blue-600 mb-6 font-bold text-[10px] uppercase tracking-widest bg-blue-50 w-fit px-3 py-1 rounded-md border border-blue-100 italic">
                            <Info className="w-3.5 h-3.5" /> problem_specification.md
                        </div>

                        <h1 className="text-2xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            Implement LRU Cache
                        </h1>

                        <div className="space-y-6">
                            <p className="text-sm leading-relaxed text-slate-600 font-medium">
                                Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. It should support <span className="text-blue-600 font-bold">get</span> and <span className="text-blue-600 font-bold">put</span> operations in constant time.
                            </p>

                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                                <h4 className="font-bold text-[10px] text-slate-400 mb-4 uppercase tracking-widest">Example Logic</h4>
                                <pre className="text-xs text-slate-600 font-mono leading-loose">
                                    LRUCache cache = new LRUCache(2);
                                    cache.put(1, 1);
                                    cache.put(2, 2);
                                    cache.get(1); // returns 1
                                </pre>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">System Constraints</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {['Capacity: 1 ≤ cap ≤ 3000', 'Complexity: O(1) Time', 'Language: Standalone'].map((c, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm italic">
                                            <CheckCircle className="w-3.5 h-3.5 text-blue-600/50" /> {c}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Editor Area */}
                <div className="flex flex-col bg-slate-100">
                    <div className="flex items-center justify-between px-6 h-12 border-b border-slate-200 bg-white shadow-sm">
                        <div className="flex gap-4 h-full pt-2">
                            <div className="px-6 bg-slate-50 border border-b-0 border-slate-200 flex items-center gap-3 rounded-t-xl transition-all">
                                <Code className="w-4 h-4 text-blue-600" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">solution.js</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-xl text-[10px] font-bold focus:outline-none focus:border-blue-500/50 uppercase text-slate-500"
                            >
                                <option value="javascript">JAVASCRIPT</option>
                                <option value="python">PYTHON</option>
                                <option value="typescript">TYPESCRIPT</option>
                            </select>
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                <Settings className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 relative bg-white">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="absolute inset-0 w-full h-full p-10 text-base leading-relaxed focus:outline-none resize-none font-mono text-slate-700 font-medium selection:bg-blue-500/10"
                            spellCheck={false}
                        />
                    </div>

                    {/* Console View */}
                    <div className="h-64 border-t border-slate-200 bg-white flex flex-col shadow-2xl">
                        <div className="h-12 px-8 border-b border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-blue-600" /> Execution Terminal
                            </span>
                            <div className="flex gap-3">
                                <button onClick={() => setOutput('')} className="text-slate-300 hover:text-blue-500 p-1">
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button className="text-slate-300 hover:text-slate-500 p-1">
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 p-8 font-mono text-sm overflow-y-auto custom-scrollbar bg-slate-50/50">
                            {output ? (
                                <pre className="text-blue-900 leading-relaxed font-medium italic">{output}</pre>
                            ) : (
                                <span className="text-slate-300 font-medium opacity-60"># Ready for execution sequence. Press 'Run Code' to verify logic.</span>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
