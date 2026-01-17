"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, FileText, CheckCircle, Star, Palette, Zap, LayoutGrid, Shield } from "lucide-react";

interface Template {
    id: string;
    name: string;
    description: string;
    previewText: string;
    supportedFields: string[];
}

/**
 * Template Selection Page
 * Step 1: User selects a cover letter template
 */
export default function TemplatesPage() {
    const router = useRouter();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://api.profresume.com/api/cover-letter/templates");
            const data = await response.json();

            if (data.success) {
                setTemplates(data.templates);
            } else {
                setError("Failed to load templates");
            }
        } catch (err) {
            console.error("Error fetching templates:", err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTemplate = (templateId: string) => {
        router.push(`/cover-letter/create?templateId=${templateId}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Cover Letter</h1>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Intelligent Generator</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/editor')}
                            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            Back to Editor
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-4 md:px-8">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto mb-16 relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48 z-0" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -ml-32 -mb-32 z-0" />

                    <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600">
                            <Zap size={12} />
                            <span>Select Your Style</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                            Choose an <span className="text-blue-600">AI-Optimized</span> Template
                        </h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            Select a professional template designed to pass ATS filters and impress recruiters. Our AI will tailor the content to match your selected style.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Templates...</p>
                    </div>
                ) : error ? (
                    <div className="max-w-md mx-auto text-center py-20 px-8 bg-red-50 rounded-3xl border border-red-100">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                            ⚠️
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load templates</h3>
                        <p className="text-red-600 mb-6">{error}</p>
                        <button
                            onClick={fetchTemplates}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => handleSelectTemplate(template.id)}
                                className="group bg-white rounded-[2rem] border border-gray-100 p-4 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full"
                            >
                                {/* Selection Indicator */}
                                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                                        <CheckCircle size={20} />
                                    </div>
                                </div>

                                {/* Preview Area */}
                                <div className="relative aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden mb-6 border border-gray-100 group-hover:border-blue-100 transition-colors">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 p-6 md:p-8">
                                        {/* Abstract Template Representation */}
                                        <div className="w-full h-full bg-white shadow-sm border border-gray-100 p-4 space-y-3 opacity-60 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-500">
                                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
                                            <div className="space-y-2">
                                                <div className="h-2 bg-gray-100 rounded w-full" />
                                                <div className="h-2 bg-gray-100 rounded w-full" />
                                                <div className="h-2 bg-gray-100 rounded w-5/6" />
                                            </div>
                                            <div className="space-y-2 pt-4">
                                                <div className="h-2 bg-gray-100 rounded w-full" />
                                                <div className="h-2 bg-gray-100 rounded w-11/12" />
                                                <div className="h-2 bg-gray-100 rounded w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="px-2 pb-4 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{template.name}</h3>
                                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                            <Star size={10} className="fill-amber-500" />
                                            Popular
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{template.description}</p>

                                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                            <Palette size={14} />
                                            <span>Visual</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                            <Shield size={14} />
                                            <span>ATS-Ready</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 ml-auto">
                                            <LayoutGrid size={14} />
                                            <span>{template.supportedFields.length} Fields</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
