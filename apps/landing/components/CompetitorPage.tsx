import React from 'react';
import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { IntroSection } from "@/components/IntroSection";
import { SuccessMetrics } from "@/components/SuccessMetrics";
import { TableOfContents } from "@/components/TableOfContents";
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { GlobalSchema } from '@/components/SchemaMarkup';
import { CheckCircle, XCircle, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export interface CompetitorData {
    name: string;
    description: string;
    logo?: string;
    rating: string;
    price: string;
    pros: string[];
    cons: string[];
}

export interface ComparisonFeature {
    name: string;
    hirecta: string | boolean;
    competitor: string | boolean;
    hirectaHighlight?: boolean;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface CompetitorPageProps {
    competitor: CompetitorData;
    features: ComparisonFeature[];
    faqs: FAQItem[];
    metadataTitle: string;
    metadataDescription: string;
    slug: string;
    heroTitle: React.ReactNode;
    heroSubtitle: string;
    verdictTitle: string;
    verdictText: React.ReactNode;
    articleContent?: React.ReactNode;
}

export function CompetitorPage({
    competitor,
    features,
    faqs,
    metadataTitle,
    metadataDescription,
    slug,
    heroTitle,
    heroSubtitle,
    verdictTitle,
    verdictText,
    articleContent
}: CompetitorPageProps) {
    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Compare", url: `${ENV.BASE_URL}/vs` },
        { name: `Hirecta vs ${competitor.name}`, url: `${ENV.BASE_URL}/vs/${slug}` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GlobalSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title={metadataTitle}
                description={metadataDescription}
                url={`${ENV.BASE_URL}/vs/${slug}`}
                datePublished="2025-02-11"
                author="Hirecta Career Experts"
            />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 text-blue-800 rounded-full text-sm font-bold mb-8">
                        <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
                        2026 Resume Builder Comparison
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {heroTitle}
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        {heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={`${ENV.EDITOR_URL}/editor`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Try Hirecta Free <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Metrics */}
            <SuccessMetrics
                metrics={[
                    { value: '100%', label: 'Free to Download PDF', sublabel: 'No paywalls', color: 'green' },
                    { value: '20+', label: 'ATS-Friendly Templates', sublabel: 'Expert designed', color: 'blue' },
                    { value: '50k+', label: 'Monthly Users', sublabel: 'Growing fast', color: 'purple' },
                    { value: '4.9/5', label: 'Average Rating', sublabel: 'From real users', color: 'orange' }
                ]}
            />

            {/* Table of Contents */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <TableOfContents
                        sections={[
                            { id: 'comparison', title: `Hirecta vs ${competitor.name}` },
                            { id: 'features', title: 'Feature Breakdown' },
                            { id: 'verdict', title: 'The Verdict' },
                            { id: 'faq', title: 'Frequently Asked Questions' }
                        ]}
                    />
                </div>
            </section>

            {/* Head to Head Comparison */}
            <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
                        Head-to-Head Comparison
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Hirecta Card */}
                        <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl p-8 border-2 border-blue-200 shadow-xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold py-1 px-4 rounded-bl-xl rounded-tr-xl shadow-md">
                                RECOMMENDED
                            </div>
                            <h3 className="text-3xl font-black text-blue-900 mb-2">Hirecta</h3>
                            <p className="text-blue-700 font-semibold mb-6">The modern, automated choice</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-medium w-20">Price:</span>
                                    <span className="font-bold text-green-600 text-lg">Free (No hidden fees)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-medium w-20">Rating:</span>
                                    <span className="font-bold text-gray-900 flex items-center gap-1">
                                        4.9/5 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Why users love it:</h4>
                                {[
                                    "100% Free PDF downloads",
                                    "Advanced AI writing assistant",
                                    "Unique Voice-to-Resume feature",
                                    "Guaranteed ATS compatibility",
                                    "Clean, modern interface"
                                ].map((pro, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 font-medium">{pro}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Competitor Card */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
                            <h3 className="text-3xl font-bold text-gray-700 mb-2">{competitor.name}</h3>
                            <p className="text-gray-500 font-semibold mb-6">{competitor.description}</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-medium w-20">Price:</span>
                                    <span className="font-bold text-red-600 text-lg">{competitor.price}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-medium w-20">Rating:</span>
                                    <span className="font-bold text-gray-700 flex items-center gap-1">
                                        {competitor.rating} <Star className="w-4 h-4 fill-gray-400 text-gray-400" />
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Common complaints:</h4>
                                {competitor.cons.map((con, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{con}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Feature Matrix */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
                        Detailed Feature Comparison
                    </h2>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 bg-gray-100/50 border-b border-gray-200 p-6 md:p-8">
                            <div className="font-bold text-gray-500 uppercase tracking-wider text-sm md:text-base">Feature</div>
                            <div className="font-black text-blue-700 text-center text-lg md:text-xl">Hirecta</div>
                            <div className="font-bold text-gray-600 text-center text-lg md:text-xl">{competitor.name}</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100">
                            {features.map((feature, i) => (
                                <div key={i} className={`grid grid-cols-3 p-6 md:p-8 transition-colors ${feature.hirectaHighlight ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                                    <div className="font-semibold text-gray-900 flex items-center">{feature.name}</div>

                                    <div className="flex items-center justify-center text-center font-bold">
                                        {typeof feature.hirecta === 'boolean' ? (
                                            feature.hirecta ?
                                                <div className="bg-green-100 text-green-700 p-1.5 rounded-full"><CheckCircle className="w-6 h-6" /></div> :
                                                <div className="bg-red-100 text-red-700 p-1.5 rounded-full"><XCircle className="w-6 h-6" /></div>
                                        ) : (
                                            <span className="text-blue-700 text-sm md:text-base">{feature.hirecta}</span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-center text-center font-medium text-gray-600">
                                        {typeof feature.competitor === 'boolean' ? (
                                            feature.competitor ?
                                                <div className="text-gray-400"><CheckCircle className="w-6 h-6" /></div> :
                                                <div className="text-red-400"><XCircle className="w-6 h-6" /></div>
                                        ) : (
                                            <span className="text-sm md:text-base">{feature.competitor}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Verdict Section */}
            <section id="verdict" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold text-blue-200 mb-6 border border-white/20">
                                <Shield className="w-4 h-4" /> The Final Verdict
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
                                {verdictTitle}
                            </h2>
                            <div className="text-lg text-blue-100 leading-relaxed mb-10 space-y-4">
                                {verdictText}
                            </div>

                            <Link
                                href={`${ENV.EDITOR_URL}/editor`}
                                className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-white text-blue-900 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl group w-full sm:w-auto"
                            >
                                <span className="flex items-center gap-2">
                                    Start Building with Hirecta <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="text-sm font-medium text-blue-600 border-t sm:border-t-0 sm:border-l border-blue-200 pt-2 sm:pt-0 sm:pl-3">- It's 100% Free</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Long Form Article Content (if provided) */}
            {articleContent && (
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto">
                        <article className="prose prose-lg prose-blue text-gray-600 max-w-none">
                            {articleContent}
                        </article>
                    </div>
                </section>
            )}

            {/* Visual FAQs */}
            <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
