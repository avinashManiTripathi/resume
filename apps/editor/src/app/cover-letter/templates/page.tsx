"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading templates...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="text-red-600 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchTemplates}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Go Back </span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a Cover Letter Template</h1>
                    <p className="text-gray-600">Select a professional template to get started</p>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 overflow-hidden group cursor-pointer"
                            onClick={() => handleSelectTemplate(template.id)}
                        >
                            {/* Template Preview */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-48 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-2">📄</div>
                                    <p className="text-sm text-gray-600 italic line-clamp-2">{template.previewText.substring(0, 60)}...</p>
                                </div>
                            </div>

                            {/* Template Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.description}</p>

                                {/* Fields Badge */}
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                    <span className="px-2 py-1 bg-gray-100 rounded">
                                        {template.supportedFields.length} fields
                                    </span>
                                </div>

                                {/* Select Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectTemplate(template.id);
                                    }}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition group-hover:shadow-lg"
                                >
                                    Use This Template
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No templates message */}
                {templates.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No templates available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
