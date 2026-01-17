"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Loader2, Eye, CloudCheck, Sparkles, Brain, Wand2, Type, UserCircle, Briefcase, GraduationCap, ArrowRight, Zap, Target } from "lucide-react";
import { usePersistence } from "../../hooks/usePersistence";
import { useDebounce } from "@repo/utils-client";
import { Dialog } from "@repo/ui/dialog";
import { StepLoader } from "@repo/ui/step-loader";
import { Button } from "@repo/ui/button";

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
    const templateIdParam = searchParams.get("templateId");

    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [format, setFormat] = useState<"pdf" | "docx">("pdf");
    const [progress, setProgress] = useState(0);

    // Persistence
    const { saveDocument, getDocument, isLoggedIn } = usePersistence();
    const [docId, setDocId] = useState<string | null>(searchParams.get('id'));
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [dialog, setDialog] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        type: "info" | "success" | "warning" | "error";
    }>({
        isOpen: false,
        title: "",
        description: "",
        type: "info"
    });

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

    const debouncedFormData = useDebounce(formData, 1000);
    const [skillInput, setSkillInput] = useState("");

    // Fetch Template Info
    const fetchTemplate = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.profresume.com/api/cover-letter/templates/${id}`
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
    }, []);

    // Load existing document or initial template
    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            const loadDoc = async () => {
                const doc = await getDocument(id, 'cover-letter');
                if (doc) {
                    setFormData(doc.data);
                    setDocId(doc.id);
                    if (doc.templateId) {
                        fetchTemplate(doc.templateId);
                    }
                }
            };
            loadDoc();
        } else if (templateIdParam) {
            fetchTemplate(templateIdParam);
        } else {
            router.push("/cover-letter/templates");
        }
    }, [searchParams, getDocument, templateIdParam, router, fetchTemplate]);

    // Auto-save logic
    const handleAutoSave = useCallback(async (dataToSave = formData) => {
        if (!dataToSave.fullName && !dataToSave.jobTitle) return;

        setIsSaving(true);
        const title = `${dataToSave.fullName || 'Untitled'} Cover Letter`.trim();

        const result = await saveDocument({
            id: docId || undefined,
            title,
            type: 'cover-letter',
            templateId: template?.id || templateIdParam || "modern",
            data: dataToSave
        });

        if (result.success && result.id) {
            if (!docId || docId !== result.id) {
                setDocId(result.id);
                const url = new URL(window.location.href);
                url.searchParams.set('id', result.id);
                window.history.replaceState({}, '', url.toString());

                if (!sessionStorage.getItem('cl_persistence_popup_shown')) {
                    setDialog({
                        isOpen: true,
                        title: result.storage === 'local' ? "Saved Locally" : "Saved to Account",
                        description: result.storage === 'local'
                            ? "Your cover letter is being saved to Local Storage. Sign in to access it anywhere."
                            : "Your cover letter is being saved to your professional account.",
                        type: result.storage === 'local' ? "info" : "success"
                    });
                    sessionStorage.setItem('cl_persistence_popup_shown', 'true');
                }
            }
            setLastSaved(new Date());
        }
        setIsSaving(false);
    }, [formData, docId, template, templateIdParam, saveDocument]);

    // Auto-save effect
    useEffect(() => {
        if (debouncedFormData.fullName || debouncedFormData.jobTitle) {
            handleAutoSave(debouncedFormData);
        }
    }, [debouncedFormData, handleAutoSave]);

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
            setProgress(0);
            setError(null);

            // Simulation of AI steps for visual feedback
            const interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 5, 95));
            }, 200);

            const response = await fetch("https://api.profresume.com/api/cover-letter/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    templateId: template?.id || templateIdParam,
                    userData: formData,
                    format,
                }),
            });

            clearInterval(interval);
            setProgress(100);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to generate cover letter");
            }

            const contentDisposition = response.headers.get("Content-Disposition");
            let fileName = `cover-letter-${template?.id}-${Date.now()}.${format}`;
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) fileName = match[1];
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            setDialog({
                isOpen: true,
                title: "Download Success",
                description: "Your cover letter has been generated using AI and downloaded successfully!",
                type: "success"
            });
        } catch (err: any) {
            console.error("Error generating cover letter:", err);
            setError(err.message || "Failed to generate cover letter");
        } finally {
            setGenerating(false);
            // Keep progress at 100 for a moment or reset
            setTimeout(() => setProgress(0), 1000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading AI Model...</p>
                </div>
            </div>
        );
    }

    if (!template) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md mx-auto text-center py-20 px-8 bg-red-50 rounded-3xl border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                        ⚠️
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Template Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || "The selected template could not be loaded."}</p>
                    <button
                        onClick={() => router.push("/cover-letter/templates")}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200"
                    >
                        Choose Another Template
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => router.push("/cover-letter/templates")}
                            className="w-9 h-9 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors border border-gray-200"
                            title="Back to Templates"
                        >
                            <ArrowLeft size={16} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 tracking-tight">{template.name}</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">AI Generator</span>
                                {isSaving && (
                                    <span className="flex items-center gap-1 text-[10px] text-gray-400 animate-pulse">
                                        <Loader2 size={8} className="animate-spin" /> Saving
                                    </span>
                                )}
                                {!isSaving && lastSaved && (
                                    <span className="text-[10px] text-gray-400">Saved</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Format Selection */}
                        <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-100 h-10">
                            <button
                                onClick={() => setFormat("pdf")}
                                className={`px-3 md:px-4 rounded-lg text-xs font-bold transition-all ${format === 'pdf' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                PDF
                            </button>
                            <button
                                onClick={() => setFormat("docx")}
                                className={`px-3 md:px-4 rounded-lg text-xs font-bold transition-all ${format === 'docx' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                DOCX
                            </button>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="h-10 px-4 md:px-6 rounded-xl text-xs md:text-sm font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                            {generating ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Download size={16} />
                            )}
                            <span className="hidden md:inline">Generate & Download</span>
                            <span className="md:hidden">Download</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Split Layout */}
            <div className="pt-24 md:pt-20 min-h-screen flex flex-col lg:flex-row">
                {/* Left: AI Form Input */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
                                <Sparkles size={12} />
                                <span>Context Injection</span>
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Provide Context</h2>
                            <p className="text-gray-500 font-medium">Our AI needs a few details to craft the perfect cover letter for you.</p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">⚠️</div>
                                {error}
                            </div>
                        )}

                        <div className="space-y-8">
                            {/* Section: Personal Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <UserCircle size={20} className="text-blue-500" />
                                    <h3>About You</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Job Title</label>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                                            placeholder="Software Enginner"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                                            placeholder="+1 555 000 0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Target Job */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Target size={20} className="text-blue-500" />
                                    <h3>Target Role</h3>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Target Company</label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                                        placeholder="Google, Microsoft, Stripe..."
                                    />
                                </div>
                            </div>

                            {/* Section: Experience & Skills */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Brain size={20} className="text-blue-500" />
                                    <h3>Experience & Skills</h3>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Professional Summary</label>
                                    <textarea
                                        value={formData.experience}
                                        onChange={(e) => handleInputChange("experience", e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium resize-none"
                                        placeholder="I have 5 years of experience in..."
                                    />
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right">Min 50 chars</p>
                                </div>

                                {template.supportedFields.includes("skills") && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Top Skills (Optional)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                                                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="Add a skill..."
                                            />
                                            <button
                                                onClick={handleAddSkill}
                                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 transition"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {formData.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                                                    {skill}
                                                    <button onClick={() => handleRemoveSkill(index)} className="hover:text-red-500 transition-colors">×</button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom padding to allow scrolling past sticky bottom if needed (though now we moved it up) */}
                            <div className="h-12" />
                        </div>
                    </div>
                </div>

                {/* Right: AI Visual / Preview Placeholder */}
                <div className="w-full lg:w-1/2 bg-gray-50 border-l border-gray-200 lg:h-[calc(100vh-80px)] overflow-hidden relative hidden lg:flex items-center justify-center">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                    <div className="relative z-10 text-center space-y-6 max-w-sm">
                        <div className="w-64 h-[350px] bg-white rounded-xl shadow-2xl mx-auto border border-gray-100 relative overflow-hidden group">
                            {/* Abstract Document visual */}
                            <div className="absolute top-0 w-full h-1 bg-blue-600/50" />
                            <div className="p-6 space-y-4 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto" />
                                <div className="space-y-2 pt-4">
                                    <div className="h-2 bg-gray-100 rounded w-full" />
                                    <div className="h-2 bg-gray-100 rounded w-full" />
                                    <div className="h-2 bg-gray-100 rounded w-3/4" />
                                </div>
                                <div className="space-y-2 pt-8">
                                    <div className="h-2 bg-gray-100 rounded w-full" />
                                    <div className="h-2 bg-gray-100 rounded w-full" />
                                    <div className="h-2 bg-gray-100 rounded w-full" />
                                    <div className="h-2 bg-gray-100 rounded w-5/6" />
                                </div>
                            </div>

                            {/* Overlay AI Badge */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                                    <Sparkles className="text-blue-600" size={32} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-gray-900">AI Preview Mode</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">Fill out the details on the left, and our AI will continuously optimize your structure.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulating Generation Overlay */}
            {generating && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md">
                    <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 text-center space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center relative">
                            <Wand2 size={32} className="text-blue-600 relative z-10" />
                            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-50" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Crafting your Letter</h3>
                            <p className="text-gray-500 font-medium">Using AI to align your experience with the job...</p>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Dialog
                isOpen={dialog.isOpen}
                onClose={() => setDialog(prev => ({ ...prev, isOpen: false }))}
                title={dialog.title}
                description={dialog.description}
                type={dialog.type}
                primaryActionLabel="Got it"
            />
        </div>
    );
}

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
