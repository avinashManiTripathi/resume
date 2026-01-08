"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Loader2, Eye } from "lucide-react";

interface Template {
    id: string;
    name: string;
    description: string;
    supportedFields: string[];
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
    experience: string;
    skills: string[];
    customParagraph?: string;
}

function CoverLetterCreateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get("templateId");

    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [format, setFormat] = useState<"pdf" | "docx">("pdf");

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        jobTitle: "",
        companyName: "",
        experience: "",
        skills: [],
        customParagraph: "",
    });

    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {
        if (!templateId) {
            router.push("/cover-letter/templates");
            return;
        }
        fetchTemplate();
    }, [templateId]);

    const fetchTemplate = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.profresume.com/api/cover-letter/templates/${templateId}`
            );
            const data = await response.json();

            if (data.success) {
                setTemplate(data.template);
            } else {
                setError("Template not found");
            }
        } catch (err) {
            console.error("Error fetching template:", err);
            setError("Failed to load template");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && formData.skills.length < 10) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    const validateForm = (): boolean => {
        if (!template) return false;

        const requiredFields: (keyof FormData)[] = ["fullName", "email", "phone", "jobTitle", "companyName", "experience"];

        for (const field of requiredFields) {
            const value = formData[field];
            if (!value || (typeof value === "string" && !value.trim())) {
                setError(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
                return false;
            }
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleGenerate = async () => {
        if (!validateForm()) return;

        try {
            setGenerating(true);
            setError(null);

            const response = await fetch("https://api.profresume.com/api/cover-letter/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    templateId,
                    userData: formData,
                    format,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to generate cover letter");
            }

            // Get filename from response headers
            const contentDisposition = response.headers.get("Content-Disposition");
            let fileName = `cover-letter-${template?.id}-${Date.now()}.${format}`;
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) fileName = match[1];
            }

            // Download file
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            // Success message could be shown here
            alert("Cover letter downloaded successfully!");
        } catch (err: any) {
            console.error("Error generating cover letter:", err);
            setError(err.message || "Failed to generate cover letter");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading template...</p>
                </div>
            </div>
        );
    }

    if (!template) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="text-red-600 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Template Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || "The selected template could not be loaded."}</p>
                    <button
                        onClick={() => router.push("/cover-letter/templates")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Choose Another Template
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <button
                        onClick={() => router.push("/cover-letter/templates")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2 transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Change Template</span>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Senior Software Engineer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tech Corp"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Professional Experience <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.experience}
                            onChange={(e) => handleInputChange("experience", e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="5 years of experience in full-stack development, specializing in React and Node.js..."
                        />
                    </div>

                    {/* Skills (Optional) */}
                    {template.supportedFields.includes("skills") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skills (Optional)
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Add a skill and press Enter"
                                />
                                <button
                                    onClick={handleAddSkill}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => handleRemoveSkill(index)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Custom Paragraph (Optional) */}
                    {template.supportedFields.includes("customParagraph") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Paragraph (Optional)
                            </label>
                            <textarea
                                value={formData.customParagraph}
                                onChange={(e) => handleInputChange("customParagraph", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Add any additional information you'd like to include..."
                            />
                        </div>
                    )}

                    {/* Format Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Download Format</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="pdf"
                                    checked={format === "pdf"}
                                    onChange={(e) => setFormat(e.target.value as "pdf" | "docx")}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">PDF</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="docx"
                                    checked={format === "docx"}
                                    onChange={(e) => setFormat(e.target.value as "pdf" | "docx")}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">DOCX</span>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {generating ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Download size={20} />
                                    <span>Generate & Download</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Cover Letter Create Page
 * Step 2: Fill form and generate cover letter
 */
export default function CreatePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <CoverLetterCreateForm />
        </Suspense>
    );
}
