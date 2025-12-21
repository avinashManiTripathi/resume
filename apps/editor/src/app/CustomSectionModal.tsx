"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@repo/ui/button";
import { BaseField } from "./FieldRenderer";

interface CustomSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (sectionName: string, sectionType: string) => void;
}

const SECTION_TEMPLATES: Array<{
    id: string;
    label: string;
    icon: string;
    fields: Record<string, BaseField>;
}> = [
        {
            id: "achievements",
            label: "Achievements",
            icon: "🏆",
            fields: {
                title: { label: "Achievement Title", type: "text" as const, className: "w-full" },
                date: { label: "Date", type: "month" as const, className: "w-[calc(50%-4px)]" },
                organization: { label: "Organization", type: "text" as const, className: "w-[calc(50%-4px)]" },
                description: { label: "Description", type: "richtext" as const, className: "w-full" }
            }
        },
        {
            id: "certifications",
            label: "Certifications",
            icon: "📜",
            fields: {
                name: { label: "Certification Name", type: "text" as const, className: "w-[calc(50%-4px)]" },
                issuer: { label: "Issuing Organization", type: "text" as const, className: "w-[calc(50%-4px)]" },
                date: { label: "Issue Date", type: "month" as const, className: "w-[calc(50%-4px)]" },
                expiryDate: { label: "Expiry Date", type: "month" as const, className: "w-[calc(50%-4px)]" },
                credentialId: { label: "Credential ID", type: "text" as const, className: "w-full" }
            }
        },
        {
            id: "awards",
            label: "Awards & Honors",
            icon: "🥇",
            fields: {
                title: { label: "Award Title", type: "text" as const, className: "w-[calc(50%-4px)]" },
                issuer: { label: "Awarded By", type: "text" as const, className: "w-[calc(50%-4px)]" },
                date: { label: "Date", type: "month" as const, className: "w-full" },
                description: { label: "Description", type: "richtext" as const, className: "w-full" }
            }
        },
        {
            id: "publications",
            label: "Publications",
            icon: "📚",
            fields: {
                title: { label: "Publication Title", type: "text" as const, className: "w-full" },
                publisher: { label: "Publisher", type: "text" as const, className: "w-[calc(50%-4px)]" },
                date: { label: "Publication Date", type: "month" as const, className: "w-[calc(50%-4px)]" },
                url: { label: "URL", type: "text" as const, className: "w-full" },
                description: { label: "Description", type: "richtext" as const, className: "w-full" }
            }
        },
        {
            id: "languages",
            label: "Languages",
            icon: "🌍",
            fields: {
                language: { label: "Language", type: "text" as const, className: "w-[calc(50%-4px)]" },
                proficiency: {
                    label: "Proficiency",
                    type: "select" as const,
                    options: ["Native", "Fluent", "Advanced", "Intermediate", "Basic"],
                    className: "w-[calc(50%-4px)]"
                }
            }
        },
        {
            id: "volunteer",
            label: "Volunteer Experience",
            icon: "🤝",
            fields: {
                role: { label: "Role", type: "text" as const, className: "w-[calc(50%-4px)]" },
                organization: { label: "Organization", type: "text" as const, className: "w-[calc(50%-4px)]" },
                startDate: { label: "Start Date", type: "month" as const, className: "w-[calc(50%-4px)]" },
                endDate: { label: "End Date", type: "month" as const, className: "w-[calc(50%-4px)]" },
                description: { label: "Description", type: "richtext" as const, className: "w-full" }
            }
        },
        {
            id: "interests",
            label: "Interests & Hobbies",
            icon: "🎯",
            fields: {
                name: { label: "Interest/Hobby", type: "text" as const, className: "w-full" }
            }
        },
        {
            id: "references",
            label: "References",
            icon: "👤",
            fields: {
                name: { label: "Name", type: "text" as const, className: "w-[calc(50%-4px)]" },
                title: { label: "Title", type: "text" as const, className: "w-[calc(50%-4px)]" },
                company: { label: "Company", type: "text" as const, className: "w-[calc(50%-4px)]" },
                email: { label: "Email", type: "email" as const, className: "w-[calc(50%-4px)]" },
                phone: { label: "Phone", type: "text" as const, className: "w-full" }
            }
        }
    ];

export function CustomSectionModal({ isOpen, onClose, onAdd }: CustomSectionModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAdd = () => {
        if (selectedTemplate) {
            const template = SECTION_TEMPLATES.find(t => t.id === selectedTemplate);
            if (template) {
                onAdd(template.id, template.label);
                setSelectedTemplate(null);
                onClose();
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Add Custom Section</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    <p className="text-sm text-gray-600 mb-4">
                        Choose a section template to add to your resume:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {SECTION_TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                className={`p-4 border-2 rounded-lg text-left transition-all hover:border-blue-300 ${selectedTemplate === template.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{template.icon}</span>
                                    <span className="font-medium text-gray-900">{template.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                    <Button onClick={onClose} variant="outline">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        disabled={!selectedTemplate}
                        variant="primary"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Section
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { SECTION_TEMPLATES };
