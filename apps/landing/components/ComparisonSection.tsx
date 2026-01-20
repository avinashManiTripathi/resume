'use client';

import { Check, X, Sparkles, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

export function ComparisonSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
            {/* Ambient Background - Reduced blur complexity for performance */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Crown className="w-4 h-4" />
                        Unbeatable Value
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        Why We Are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">Best Choice</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        Stop settling for generic templates. Experience the power of AI-driven resume building designed for the modern job market.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {/* Competitor 1 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Word / Docs</h3>
                            <p className="text-sm text-gray-600 font-medium">Manual Formatting</p>
                        </div>
                        <div className="space-y-4">
                            <FeatureRow text="ATS Compatibility" status={false} negativeText="Broken Parsing" />
                            <FeatureRow text="AI Writing" status={false} negativeText="None" />
                            <FeatureRow text="Design" status={true} positiveText="Basic" />
                            <FeatureRow text="Cost" status={false} negativeText="License Fees" />
                        </div>
                    </div>

                    {/* Main Product - Hirecta */}
                    <div className="relative transform md:-translate-y-6 scale-105 z-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20" />
                        <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-2xl relative overflow-hidden">
                            {/* Badge */}
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-700 to-purple-700 px-4 py-1 rounded-bl-xl text-xs font-bold text-white shadow-md">
                                RECOMMENDED
                            </div>

                            <div className="text-center mb-10 mt-2">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 border border-blue-100">
                                    <Sparkles className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">Hirecta</h3>
                                <p className="text-sm text-blue-700 font-bold">The Intelligent Choice</p>
                            </div>

                            <div className="space-y-6">
                                <FeatureRow text="ATS Compatibility" status={true} positiveText="100% Guaranteed" highlight />
                                <FeatureRow text="AI Writing Assistant" status={true} positiveText="GPT-4 Powered" highlight />
                                <FeatureRow text="Design Quality" status={true} positiveText="Premium & Modern" highlight />
                                <FeatureRow text="Cost" status={true} positiveText="100% Free Forever" highlight />
                                <FeatureRow text="Real-time Previews" status={true} positiveText="Instant" highlight />
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <Link href="/resume-builder" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                                    <Zap className="w-4 h-4" />
                                    Build My Resume Free
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Competitor 2 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Paid Builders</h3>
                            <p className="text-sm text-gray-600 font-medium">Competitors</p>
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
        <div className={`flex items-center justify-between py-2 ${highlight ? 'border-b border-gray-100 pb-3 last:border-0' : ''}`}>
            <span className={`text-sm font-medium ${highlight ? 'text-gray-900' : 'text-gray-600'}`}>{text}</span>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${status
                    ? (highlight ? 'text-blue-700' : 'text-gray-700')
                    : 'text-red-700'
                    }`}>
                    {status ? positiveText : negativeText}
                </span>
                {status ? (
                    <div className={`p-1 rounded-full ${highlight ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        <Check className="w-3 h-3" />
                    </div>
                ) : (
                    <div className="p-1 rounded-full bg-red-100 text-red-700">
                        <X className="w-3 h-3" />
                    </div>
                )}
            </div>
        </div>
    );
}
