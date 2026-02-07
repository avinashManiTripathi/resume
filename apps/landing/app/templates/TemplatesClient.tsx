"use client";

import { useState } from 'react';
import { useTemplates } from '@repo/hooks/useTemplate';
import { Sparkles, Search, Crown, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ENV } from "@/app/env";
import { motion, AnimatePresence } from "framer-motion";


export default function TemplatesPageClient() {
    const { templates, loading, error, isCached } = useTemplates({ apiUrl: ENV.API_URL });

    console.log('TemplatesClient debug:', { templatesCount: templates?.length, loading, error, apiUrl: ENV.API_URL });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Extract unique categories and ensure specific order/capitalization if needed
    const categories = ['all', 'modern', 'professional', 'creative', 'simple'];

    // Filter templates
    const filteredTemplates = templates?.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || (template.category && template.category.toLowerCase() === selectedCategory);
        return matchesSearch && matchesCategory;
    }) || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                            Job-winning resume templates
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Each template is expertly designed and follows the exact "resume rules" hiring managers look for. Stand out and get hired faster.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                            <a href={`${ENV.EDITOR_URL}`} className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200 text-lg">
                                Create My Resume
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* Filters & Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${selectedCategory === cat
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow hover:shadow-sm"
                        />
                    </div>
                </div>

                {/* Templates Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-slate-200 aspect-[210/297] rounded-lg mb-4"></div>
                                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h3>
                        <p className="text-slate-600">We couldn't load the templates. Please try again later.</p>
                    </div>
                ) : filteredTemplates.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No templates found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                            className="mt-4 text-blue-600 font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                        <AnimatePresence>
                            {filteredTemplates.map((template) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={template._id}
                                    className="group"
                                >
                                    <div className="relative mb-4">
                                        {/* Card Container with Hover Effect */}
                                        <div className="relative aspect-[210/297] rounded-lg overflow-hidden border border-slate-200 shadow-md group-hover:shadow-xl transition-all duration-300 bg-white">
                                            {/* Image */}
                                            {template.thumbnail ? (
                                                <img
                                                    src={ENV.API_URL + template.thumbnail}
                                                    alt={template.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                                    <span className="text-slate-400 text-sm">No Preview</span>
                                                </div>
                                            )}

                                            {/* Premium Badge */}
                                            {template.isPremium && (
                                                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                                    <Crown className="w-3 h-3" />
                                                    Premium
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <Link
                                                    href={`${ENV.EDITOR_URL}/editor?templateId=${template._id}`}
                                                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-blue-700 flex items-center gap-2"
                                                >
                                                    Use This Template
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="px-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                                                {template.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                            {template.description || `A professional ${template.category} resume template.`}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* SEO Content & Features Section */}
            <div className="bg-slate-50 border-t border-slate-200 py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use our templates?</h2>
                        <p className="text-slate-600">Tested by recruiters and optimized for ATS algorithms.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Check className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">ATS-Friendly</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Our templates are built with clean code that Applicant Tracking Systems can read correctly.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">Easy to Customize</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Change colors, fonts, and sections in one click. No design skills needed.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">Expert Approved</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Designed by HR professionals to highlight your skills and experience effectively.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <ArrowRight className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">Free to Download</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Export your resume in PDF or TXT format instantly. No hidden paywalls.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-900 py-24 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to build your resume?
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                        Join thousands of job seekers who have successfully landed interviews using our professional templates.
                    </p>
                    <a
                        href={`${ENV.EDITOR_URL}`}
                        className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-blue-900/50"
                    >
                        Build My Resume Now
                    </a>
                </div>
            </div>

            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Professional Resume Templates",
                        "description": "Browse our collection of ATS-friendly professional resume templates",
                        "url": `${ENV.BASE_URL}/templates`,
                        "mainEntity": {
                            "@type": "ItemList",
                            "numberOfItems": templates?.length || 0,
                            "itemListElement": filteredTemplates.slice(0, 10).map((template, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "item": {
                                    "@type": "CreativeWork",
                                    "name": template.name,
                                    "description": template.description || `Professional ${template.name} resume template`,
                                    "url": `${ENV.EDITOR_URL}/editor?templateId=${template._id}`
                                }
                            }))
                        }
                    })
                }}
            />
        </div>
    );
}
