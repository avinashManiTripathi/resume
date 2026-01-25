"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit3, Trash2, X, Save, FileText, Upload, Filter, Code } from "lucide-react";
import { ENV } from "../env";
import { useAppNetwork, API_ENDPOINTS } from "@/hooks/useAppNetwork";

interface CoverLetterTemplate {
    _id?: string;
    type: string;
    name: string;
    category: string;
    image: string;
    description: string;
    previewText: string;
    supportedFields: string[];
    templateBody: string;
}

const TEMPLATE_CATEGORIES = ['professional', 'creative', 'modern', 'simple'];
const SUPPORTED_FIELDS = [
    "fullName", "email", "phone", "jobTitle", "companyName", "experience", "customParagraph", "skills", "date", "address"
];

export default function CoverLetterTemplatesPage() {
    const [templates, setTemplates] = useState<CoverLetterTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<CoverLetterTemplate>({
        type: "",
        name: "",
        category: "professional",
        image: "",
        description: "",
        previewText: "",
        supportedFields: ["fullName", "email", "phone", "jobTitle", "companyName"],
        templateBody: "",
    });

    const network = useAppNetwork();

    // ENV.API_URL is still needed for image preview and upload fetch
    const API_BASE = ENV.API_URL;

    useEffect(() => { fetchTemplates(); }, []);

    const fetchTemplates = async () => {
        try {
            setIsLoading(true);
            const data = await network.get<{ templates: CoverLetterTemplate[] }>(API_ENDPOINTS.COVER_LETTER.TEMPLATES);
            setTemplates(data.templates || []);
        } catch (error) {
            console.error("Error fetching templates:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleAdd = () => {
        setIsEditing(false);
        setImagePreview("");
        setUploadedFile(null);
        setFormData({
            type: "",
            name: "",
            category: "professional",
            image: "",
            description: "",
            previewText: "",
            supportedFields: ["fullName", "email", "phone", "jobTitle", "companyName"],
            templateBody: "",
        });
        setShowModal(true);
    };

    const handleEdit = (template: CoverLetterTemplate) => {
        setIsEditing(true);
        // Prioritize full URL if available, otherwise assume relative path
        const imageUrl = template.image?.startsWith('http') || template.image?.startsWith('data:')
            ? template.image
            : template.image
                ? `${API_BASE}${template.image}`
                : "";
        setImagePreview(imageUrl);
        setUploadedFile(null);
        setFormData({ ...template });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            // Validate required fields
            if (!formData.type || !formData.name || !formData.templateBody) {
                alert("Type, Name, and Template Body are required");
                return;
            }

            const url = isEditing
                ? `${API_ENDPOINTS.COVER_LETTER.TEMPLATES}/${formData._id || formData.type}`
                : API_ENDPOINTS.COVER_LETTER.TEMPLATES;

            let result;
            if (isEditing) {
                // PUT
                result = await network.put<any>(url, formData);
            } else {
                // POST
                result = await network.post<any>(url, formData);
            }

            // Use the _id from the result (for new templates) or the existing _id (for updates)
            // Note: Our upload route can look up by 'type' as well, so formData.type is safe if unique
            const idForUpload = result.template?._id || result.template?.type || formData.type;

            // Upload image if file was selected
            if (uploadedFile && idForUpload) {
                const imageFormData = new FormData();
                imageFormData.append('image', uploadedFile);

                await network.post(`${API_ENDPOINTS.COVER_LETTER.TEMPLATES}/upload/${idForUpload}`, imageFormData);
            }

            await fetchTemplates();
            setShowModal(false);
            setImagePreview("");
            setUploadedFile(null);
            alert(`Template ${isEditing ? "updated" : "added"} successfully!`);
        } catch (error: any) {
            console.error("Error saving template:", error);
            alert(`Failed to save template: ${error.message || "Unknown error"}`);
        }
    };

    const handleDelete = async (type: string) => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        try {
            await network.del(`${API_ENDPOINTS.COVER_LETTER.TEMPLATES}/${type}`);
            await fetchTemplates();
            alert("Template deleted successfully!");
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    const filteredTemplates = templates.filter((template) => {
        return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.type.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const toggleField = (field: string) => {
        setFormData(prev => {
            const exists = prev.supportedFields.includes(field);
            if (exists) {
                return { ...prev, supportedFields: prev.supportedFields.filter(f => f !== field) };
            } else {
                return { ...prev, supportedFields: [...prev.supportedFields, field] };
            }
        });
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cover Letter Templates</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage templates for cover letter generator</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Template
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Templates Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filteredTemplates.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No templates found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <div key={template._id || template.type} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col h-full">
                            {/* Thumbnail */}
                            <div className="aspect-[210/297] bg-gray-100 relative overflow-hidden rounded-t-lg border-b border-gray-100">
                                {template.image ? (
                                    <img
                                        src={template.image.startsWith('data:') || template.image.startsWith('http') ? template.image : `${API_BASE}${template.image}`}
                                        alt={template.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FileText className="w-12 h-12 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-gray-700 rounded text-xs font-bold shadow-sm border border-gray-200">
                                        {template.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-base font-bold text-gray-900">{template.name}</h3>
                                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{template.type}</code>
                                </div>

                                <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{template.description}</p>

                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-700 mb-1">Supported Fields:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {template.supportedFields.slice(0, 5).map(field => (
                                            <span key={field} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px]">
                                                {field}
                                            </span>
                                        ))}
                                        {template.supportedFields.length > 5 && (
                                            <span className="px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded text-[10px]">+{template.supportedFields.length - 5}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => { setSelectedTemplate(template); setShowPreview(true); }}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Eye className="w-3 h-3" /> Preview
                                    </button>
                                    <button onClick={() => handleEdit(template)} className="p-2 bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Edit">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(template._id || template.type)} className="p-2 bg-gray-100 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl max-w-4xl w-full my-8 flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-xl z-10">
                            <h2 className="text-lg font-bold text-gray-900">{isEditing ? "Edit Template" : "Add Template"}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Template Type *</label>
                                    <input
                                        type="text"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                                        placeholder="e.g. professional-standard"
                                        disabled={isEditing}
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Unique identifier, used for selection</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="e.g. Professional Standard"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                                    >
                                        {TEMPLATE_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Image</label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            {imagePreview ? (
                                                <div className="relative w-16 h-20 border border-gray-200 rounded overflow-hidden">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => { setImagePreview(""); setUploadedFile(null); setFormData({ ...formData, image: "" }); }}
                                                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl hover:bg-red-600"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-16 h-20 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
                                                    <Upload className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
                                                />
                                                <input
                                                    type="text"
                                                    value={formData.image}
                                                    onChange={(e) => { setFormData({ ...formData, image: e.target.value }); setImagePreview(e.target.value); }}
                                                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                    placeholder="Or paste image URL"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="Brief description of the template style and use case..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Preview Text</label>
                                <textarea
                                    value={formData.previewText}
                                    onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                                    rows={2}
                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="Opening sentence preview..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Supported Fields</label>
                                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    {SUPPORTED_FIELDS.map((field) => (
                                        <button
                                            key={field}
                                            onClick={() => toggleField(field)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${formData.supportedFields.includes(field)
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {field}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">HTML Body Template *</label>
                                    <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Handlebars-style HTML</span>
                                </div>
                                <div className="relative flex-1">
                                    <textarea
                                        value={formData.templateBody}
                                        onChange={(e) => setFormData({ ...formData, templateBody: e.target.value })}
                                        rows={12}
                                        className="w-full px-4 py-3 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 text-slate-700 leading-relaxed"
                                        placeholder="<!DOCTYPE html>..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-xl z-10">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {isEditing ? "Update Template" : "Create Template"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreview && selectedTemplate && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={() => setShowPreview(false)}>
                    <div className="bg-white rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{selectedTemplate.name}</h2>
                                <p className="text-xs text-gray-500">HTML Preview</p>
                            </div>
                            <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100 p-8 overflow-auto flex justify-center">
                            <div className="bg-white shadow-xl min-h-[1123px] w-[794px] origin-top scale-descale">
                                <iframe
                                    title="preview"
                                    srcDoc={selectedTemplate.templateBody}
                                    className="w-full h-full border-0"
                                    style={{ height: '1123px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
