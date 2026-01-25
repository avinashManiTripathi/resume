"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Plus } from "lucide-react";
import { Button } from "@repo/ui/button";
import { BaseField } from "./FieldRenderer";

interface CustomSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (sectionName: string, sectionType: string) => void;
    existingSections: string[];
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

export function CustomSectionModal({ isOpen, onClose, onAdd, existingSections = [] }: CustomSectionModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

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

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full max-w-xl overflow-hidden transform border border-gray-100 flex flex-col max-h-[85vh] animate-in zoom-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Add Custom Section</h2>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">Enhance your resume with specialized content</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all border border-transparent hover:border-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-8 pb-2 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3">
                        {SECTION_TEMPLATES.map((template) => {
                            const isAdded = existingSections.includes(template.id);
                            return (
                                <button
                                    key={template.id}
                                    onClick={() => !isAdded && setSelectedTemplate(template.id)}
                                    disabled={isAdded}
                                    className={`p-4 border-2 rounded-2xl text-left transition-all group relative overflow-hidden ${selectedTemplate === template.id
                                        ? "border-blue-600 bg-blue-50/50 shadow-inner"
                                        : isAdded
                                            ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                                            : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50/50"
                                        }`}
                                >
                                    {selectedTemplate === template.id && (
                                        <div className="absolute top-3 right-3 text-blue-600">
                                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                                <Plus className="w-3 h-3 text-white rotate-45" />
                                            </div>
                                        </div>
                                    )}
                                    {isAdded && (
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200">
                                                Added
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform duration-300 ${!isAdded ? 'group-hover:scale-110' : ''} ${selectedTemplate === template.id ? 'bg-white shadow-md' : 'bg-slate-50'}`}>
                                            {template.icon}
                                        </div>
                                        <div>
                                            <span className={`block font-bold text-gray-900 text-sm ${selectedTemplate === template.id ? 'text-blue-700' : ''}`}>
                                                {template.label}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Template</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="px-6 py-2.5 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 font-bold text-sm active:scale-[0.98] transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        disabled={!selectedTemplate}
                        variant="primary"
                        className="px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center gap-2 group"
                    >
                        <Plus className={`w-4 h-4 transition-transform duration-300 ${!selectedTemplate ? 'opacity-50' : 'group-hover:rotate-90'}`} />
                        <span>Add Section</span>
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export { SECTION_TEMPLATES };
