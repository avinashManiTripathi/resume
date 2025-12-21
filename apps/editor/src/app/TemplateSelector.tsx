"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface Template {
    id: string;
    name?: string;
    image: string;
    html: string;
}

interface TemplateSelectorProps {
    onBack: () => void;
    onSelectTemplate: (template: Template) => void;
    apiBase: string;
}

export default function TemplateSelector({ onBack, onSelectTemplate, apiBase }: TemplateSelectorProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiBase}/resumes`);

            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }

            const data = await response.json();
            setTemplates(data);
        } catch (err) {
            console.error('Error fetching templates:', err);
            setError(err instanceof Error ? err.message : 'Failed to load templates');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="p-6 pb-0">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium font-bold">Back</span>
                </button>
                <h2 className="text-md font-bold text-gray-900">Choose Template</h2>
                {/* <p className="text-sm text-gray-600 mt-1">Select a template to get started</p> */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {loading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading templates...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-800 font-medium">Error loading templates</p>
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                        <button
                            onClick={fetchTemplates}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && templates.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No templates available</p>
                    </div>
                )}

                {!loading && !error && templates.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="group relative border-2 border-gray-200 rounded-lg overflow-hidden transition-all cursor-pointer bg-white shadow-sm hover:shadow-md"
                                onClick={() => onSelectTemplate(template)}
                            >
                                {/* Template Preview Image */}
                                <div className="relative aspect-[8.5/11] bg-gray-100">
                                    <img
                                        src={template.image}
                                        alt={template.name || 'Resume Template'}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                                            Use Template
                                        </button>
                                    </div>
                                </div>

                                {/* Template Name */}
                                {/* {template.name && (
                                    <div className="p-3 bg-white border-t border-gray-200">
                                        <p className="font-medium text-gray-900 text-center">{template.name}</p>
                                    </div>
                                )} */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
