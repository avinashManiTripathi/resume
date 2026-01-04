"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface Template {
    _id: string;
    id?: string;
    name?: string;
    thumbnail?: string;
    image?: string;
    htmlContent?: string;
    html?: string;
    type?: string;
    category?: string;
    isPremium?: boolean;
    isActive?: boolean;
}

interface TemplateSelectorProps {
    onBack: () => void;
    onSelectTemplate: (template: Template) => void;
    apiBase: string;
    selectedTemplateId?: string;
}

export default function TemplateSelector({ onBack, onSelectTemplate, apiBase, selectedTemplateId }: TemplateSelectorProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiBase}/api/templates`);

            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }

            const data = await response.json();
            setTemplates(data.templates || []);
        } catch (err) {
            console.error('Error fetching templates:', err);
            setError(err instanceof Error ? err.message : 'Failed to load templates');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="p-6 pb-4 bg-white border-b border-gray-200">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back to Editor</span>
                </button>
                <h2 className="text-xl font-bold text-gray-900">Choose Your Template</h2>
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
                        {templates.map((template) => {
                            const templateId = template._id || template.id || '';
                            const isSelected = selectedTemplateId === templateId;
                            const isHovered = hoveredId === templateId;
                            const templateImage = template.thumbnail || template.image || '';

                            return (
                                <div
                                    key={templateId}
                                    className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${isSelected
                                        ? 'ring-4 ring-blue-500 shadow-2xl'
                                        : 'ring-2 ring-gray-200 hover:ring-blue-400 shadow-md hover:shadow-2xl'
                                        } ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
                                    onClick={() => onSelectTemplate(template)}
                                    onMouseEnter={() => setHoveredId(templateId)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Selected Badge */}
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}

                                    {/* Template Preview Image */}
                                    <div className="relative aspect-[8.5/11] bg-gray-100">
                                        <img
                                            src={apiBase + templateImage}
                                            alt={template.name || 'Resume Template'}
                                            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'
                                                }`}
                                        />

                                        {/* Gradient Overlay on Hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                                            }`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <button className={`px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold shadow-xl transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                                    }`}>
                                                    {isSelected ? 'Selected' : 'Use This Template'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Name (if available) */}
                                    {template.name && (
                                        <div className="p-4 bg-white border-t border-gray-200">
                                            <p className="font-semibold text-gray-900 text-center">{template.name}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
