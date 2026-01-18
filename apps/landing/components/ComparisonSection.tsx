'use client';

import { Check, X, Sparkles, Zap, Shield, Crown } from 'lucide-react';

export function ComparisonSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm font-semibold mb-6">
                        <Crown className="w-4 h-4" />
                        Unbeatable Value
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Why We Are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Best Choice</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Stop settling for generic templates. Experience the power of AI-driven resume building designed for the modern job market.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {/* Competitor 1 */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-slate-300 mb-2">Word / Docs</h3>
                            <p className="text-sm text-slate-500">Manual Formatting</p>
                        </div>
                        <div className="space-y-4">
                            <FeatureRow text="ATS Compatibility" status={false} negativeText="Broken Parsing" />
                            <FeatureRow text="AI Writing" status={false} negativeText="None" />
                            <FeatureRow text="Design" status={true} positiveText="Basic" />
                            <FeatureRow text="Cost" status={false} negativeText="License Fees" />
                        </div>
                    </div>

                    {/* Main Product - ProfResume */}
                    <div className="relative transform md:-translate-y-6 scale-105 z-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 animate-pulse-slow" />
                        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden">
                            {/* Badge */}
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-purple-600 px-4 py-1 rounded-bl-xl text-xs font-bold text-white">
                                RECOMMENDED
                            </div>

                            <div className="text-center mb-10 mt-2">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 border border-blue-500/30">
                                    <Sparkles className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">ProfResume</h3>
                                <p className="text-sm text-blue-400 font-medium">The Intelligent Choice</p>
                            </div>

                            <div className="space-y-6">
                                <FeatureRow text="ATS Compatibility" status={true} positiveText="100% Guaranteed" highlight />
                                <FeatureRow text="AI Writing Assistant" status={true} positiveText="GPT-4 Powered" highlight />
                                <FeatureRow text="Design Quality" status={true} positiveText="Premium & Modern" highlight />
                                <FeatureRow text="Cost" status={true} positiveText="100% Free Forever" highlight />
                                <FeatureRow text="Real-time Previews" status={true} positiveText="Instant" highlight />
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-800">
                                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    Build My Resume Free
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Competitor 2 */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-slate-300 mb-2">Paid Builders</h3>
                            <p className="text-sm text-slate-500">Competitors</p>
                        </div>
                        <div className="space-y-4">
                            <FeatureRow text="ATS Compatibility" status={true} positiveText="Good" />
                            <FeatureRow text="AI Writing" status={true} positiveText="Limited" />
                            <FeatureRow text="Design" status={true} positiveText="Good" />
                            <FeatureRow text="Cost" status={false} negativeText="$15-40/month" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureRow({ text, status, positiveText, negativeText, highlight = false }: {
    text: string;
    status: boolean;
    positiveText?: string;
    negativeText?: string;
    highlight?: boolean;
}) {
    return (
        <div className={`flex items-center justify-between py-2 ${highlight ? 'border-b border-white/5 pb-3 last:border-0' : ''}`}>
            <span className={`text-sm font-medium ${highlight ? 'text-white' : 'text-slate-400'}`}>{text}</span>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${status
                        ? (highlight ? 'text-blue-400' : 'text-slate-300')
                        : 'text-red-400'
                    }`}>
                    {status ? positiveText : negativeText}
                </span>
                {status ? (
                    <div className={`p-1 rounded-full ${highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-300'}`}>
                        <Check className="w-3 h-3" />
                    </div>
                ) : (
                    <div className="p-1 rounded-full bg-red-500/10 text-red-500">
                        <X className="w-3 h-3" />
                    </div>
                )}
            </div>
        </div>
    );
}
