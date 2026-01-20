"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useTemplates, type Template } from "@repo/hooks/useTemplate";

interface TemplateSelectorProps {
    onBack: () => void;
    onSelectTemplate: (template: Template) => void;
    apiBase: string;
    selectedTemplateId?: string;
    endpoint?: string;
}

export default function TemplateSelector({ onBack, onSelectTemplate, apiBase, selectedTemplateId, endpoint }: TemplateSelectorProps) {
    // Use the templates hook with caching
    const { templates, loading, error, refetch } = useTemplates({
        apiUrl: apiBase,
        endpoint,
    });

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
                        <p className="text-red-600 text-sm mt-1">{error.message}</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (!templates || templates.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No templates available</p>
                    </div>
                )}

                {!loading && !error && templates && templates.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {templates.map((template) => {
                            const templateId = template.type || template.id || template._id || '';
                            const isSelected = selectedTemplateId === template._id || selectedTemplateId === template.id || selectedTemplateId === template.type;
                            const templateImage = template.thumbnail || template.image || '';

                            return (
                                <div
                                    key={templateId}
                                    className="bg-white p-4 relative rounded-xl transition-all duration-300 cursor-pointer ring-2 ring-gray-200 hover:ring-blue-400 shadow-md"
                                    onClick={() => onSelectTemplate({ ...template, id: templateId, _id: template._id || templateId })}
                                >
                                    {/* Selected Badge - Blue Tick at 16px from top-right */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}

                                    {/* Template Preview Image - No hover effects */}
                                    <div className="relative aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={apiBase + templateImage}
                                            alt={template.name || 'Resume Template'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Template Name (if available) */}
                                    {template.name && (
                                        <div className="pt-4">
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
