"use client";

import { useState } from 'react';
import { useTemplates } from '@repo/hooks/useTemplate';
import { Sparkles, Search, Crown } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function TemplatesPage() {
    const { templates, loading, error, isCached } = useTemplates();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Extract unique categories
    const categories = templates
        ? ['all', ...Array.from(new Set(templates.map(t => t.category).filter(Boolean)))]
        : ['all'];

    // Filter templates
    const filteredTemplates = templates?.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }) || [];



    console.log({ templates })
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            {isCached ? 'Cached Templates' : 'Fresh from API'}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Professional Resume Templates
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our collection of ATS-friendly resume templates designed by experts
                        </p>
                        {templates && (
                            <p className="text-sm text-gray-500 mt-2">
                                {templates.length} templates available
                            </p>
                        )}
                    </div>

                    {/* Search and Filter */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="md:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {categories.map((cat: string = '') => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat?.charAt(0).toUpperCase() + cat?.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading templates...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-600 font-medium mb-2">Failed to load templates</p>
                        <p className="text-gray-600 text-sm">Please try again later</p>
                    </div>
                )}

                {!loading && !error && filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium mb-2">No templates found</p>
                        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                    </div>
                )}

                {!loading && !error && filteredTemplates.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredTemplates.map((template) => (
                            <Link
                                key={template._id}
                                href={`https://edit.profresume.com/editor?templateId=${template._id}`}
                                className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
                            >
                                {/* Template Preview */}
                                <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden">
                                    {template.thumbnail ? (
                                        <img
                                            src={"https://api.profresume.com" + template.thumbnail}
                                            alt={template.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {template.isPremium && (
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                            <Crown className="w-3 h-3" />
                                            PREMIUM
                                        </div>
                                    )}
                                </div>

                                {/* Template Info */}
                                <div className="p-4 md:p-6">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {template.name}
                                    </h3>
                                    {template.description && (
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {template.description}
                                        </p>
                                    )}
                                    {template.category && (
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                            {template.category}
                                        </span>
                                    )}
                                    <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                                        Use Template
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
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
                        "url": "https://profresume.com/templates",
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
                                    "url": `https://profresume.com/editor?templateId=${template._id}`
                                }
                            }))
                        }
                    })
                }}
            />
        </div>
    );
}
