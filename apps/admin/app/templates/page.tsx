"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit3, Trash2, X, Save, FileText, Upload, Filter, Star } from "lucide-react";
import { ENV } from "../env";
import { useAppNetwork, API_ENDPOINTS } from "@/hooks/useAppNetwork";

interface Template {
  _id?: string;
  id?: string;
  name: string;
  type: string;
  category: string;
  description?: string;
  htmlContent?: string;
  html?: string;
  cssContent?: string;
  thumbnail?: string;
  isPremium: boolean;
  isActive: boolean;
  sortOrder: number;
  tags: string[];
}

const TEMPLATE_TYPES = ['modern', 'classic', 'professional', 'creative', 'minimal', 'ats-friendly'];
const TEMPLATE_CATEGORIES = ['general', 'tech', 'business', 'creative', 'academic', 'executive'];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  const [formData, setFormData] = useState<Template>({
    name: "", type: "modern", category: "general", description: "", htmlContent: "",
    cssContent: "", thumbnail: "", isPremium: false, isActive: true, sortOrder: 0, tags: [],
  });

  useEffect(() => { fetchTemplates(); }, []);

  const network = useAppNetwork();

  // Keep apiUrl for images and uploads
  const apiUrl = ENV.API_URL

  useEffect(() => { fetchTemplates(); }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const data = await network.get<{ templates: Template[] }>(API_ENDPOINTS.ADMIN.TEMPLATES);
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
      // Store the file for later upload
      setUploadedFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setImagePreview("");
    setUploadedFile(null);
    setFormData({
      name: "", type: "modern", category: "general", description: "", htmlContent: "",
      cssContent: "", thumbnail: "", isPremium: false, isActive: true, sortOrder: templates.length, tags: []
    });
    setShowModal(true);
  };

  const handleEdit = (template: Template) => {
    setIsEditing(true);
    setUploadedFile(null);
    // Set preview from existing thumbnail (could be path or base64)
    const thumbnailUrl = template.thumbnail?.startsWith('data:')
      ? template.thumbnail
      : template.thumbnail
        ? `${apiUrl}${template.thumbnail}`
        : "";
    setImagePreview(thumbnailUrl);
    setFormData({ ...template, htmlContent: template.htmlContent || template.html || "" });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.name.trim()) {
        alert("Template name is required");
        return;
      }

      if (!formData.htmlContent || !formData.htmlContent.trim()) {
        alert("HTML Content is required");
        return;
      }

      // Clean up the data - remove thumbnail from main save (will be uploaded separately)
      const cleanData = {
        ...formData,
        thumbnail: undefined, // Don't send thumbnail in main request
        description: formData.description?.trim() || undefined,
        cssContent: formData.cssContent?.trim() || undefined,
        tags: formData.tags.filter(tag => tag.trim()),
      };

      let result;
      if (isEditing) {
        const url = `${API_ENDPOINTS.ADMIN.TEMPLATES}/${formData._id || formData.id}`;
        result = await network.put<any>(url, cleanData);
      } else {
        result = await network.post<any>(API_ENDPOINTS.ADMIN.TEMPLATES, cleanData);
      }

      const templateId = result.template._id || result.template.id;

      // Upload image if file was selected
      if (uploadedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', uploadedFile);

        await network.post(`${API_ENDPOINTS.ADMIN.TEMPLATES}/upload/${templateId}`, imageFormData);
      }

      await fetchTemplates();
      setShowModal(false);
      setUploadedFile(null);
      setImagePreview("");
      alert(`Template ${isEditing ? "updated" : "added"} successfully!`);
    } catch (error: any) {
      console.error("Error saving template:", error);
      alert(`Failed to save template: ${error.message || "Unknown error"}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      await network.del(`${API_ENDPOINTS.ADMIN.TEMPLATES}/${id}`);
      await fetchTemplates();
      alert("Template deleted successfully!");
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your resume templates</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: templates.length, color: "blue" },
          { label: "Active", value: templates.filter(t => t.isActive).length, color: "green" },
          { label: "Premium", value: templates.filter(t => t.isPremium).length, color: "yellow" },
          { label: "Inactive", value: templates.filter(t => !t.isActive).length, color: "gray" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {TEMPLATE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
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
        <div className="grid grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <div key={template._id || template.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
              {/* Thumbnail */}
              <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden rounded-t-lg">
                {template.thumbnail ? (
                  <img
                    src={template.thumbnail.startsWith('data:') ? template.thumbnail : apiUrl + `${template.thumbnail}`}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {template.isPremium && (
                    <span className="px-2 py-0.5 bg-yellow-500 text-white rounded text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />Pro
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${template.isActive ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                    {template.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{template.name}</h3>
                <div className="flex gap-1 mb-3">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{template.type}</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">{template.category}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{template.description || "No description"}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSelectedTemplate(template); setShowPreview(true); }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />View
                  </button>
                  <button onClick={() => handleEdit(template)} className="p-1.5 bg-gray-100 hover:bg-blue-100 text-blue-600 rounded transition-colors" title="Edit">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(template._id || template.id || "")} className="p-1.5 bg-gray-100 hover:bg-red-100 text-red-600 rounded transition-colors" title="Delete">
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
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{isEditing ? "Edit Template" : "Add Template"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Image Upload */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Template Thumbnail</label>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-32 h-40 object-cover rounded border-2 border-white shadow" />
                        <button onClick={() => { setImagePreview(""); setFormData({ ...formData, thumbnail: "" }); }}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-40 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input type="file" accept="image/*" onChange={handleImageUpload}
                      className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                    <div className="text-xs text-gray-500">
                      <p>• Size: 1020x1320px • JPG/PNG • Max 5MB</p>
                    </div>
                    <input type="text" value={formData.thumbnail} onChange={(e) => { setFormData({ ...formData, thumbnail: e.target.value }); setImagePreview(e.target.value); }}
                      className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder="Or paste image URL" />
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder="Modern Resume" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500">
                    {TEMPLATE_TYPES.map((type) => (
                      <option key={type} value={type}>{type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500">
                    {TEMPLATE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Sort Order</label>
                  <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder="Template description..." />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
                <input type="text" value={formData.tags.join(", ")} onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder="modern, tech, ats" />
              </div>

              <div className="flex gap-4 p-3 bg-gray-50 rounded">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isPremium} onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                    className="w-4 h-4 text-yellow-500 rounded border-gray-300" />
                  <span className="text-xs font-medium text-gray-700">Premium</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-green-500 rounded border-gray-300" />
                  <span className="text-xs font-medium text-gray-700">Active</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">HTML Content *</label>
                <textarea value={formData.htmlContent} onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })} rows={6}
                  className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder="<div>...</div>" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">CSS Content</label>
                <textarea value={formData.cssContent} onChange={(e) => setFormData({ ...formData, cssContent: e.target.value })} rows={4}
                  className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder=".resume { ... }" />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-gray-200 text-gray-700 rounded hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />{isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">{selectedTemplate.name}</h2>
              <button onClick={() => setShowPreview(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 rounded p-6 bg-white" dangerouslySetInnerHTML={{ __html: selectedTemplate.htmlContent || selectedTemplate.html || "" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
