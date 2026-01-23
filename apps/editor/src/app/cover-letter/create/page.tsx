"use client";

import { useState, useEffect, useCallback, Suspense, useRef, useMemo, useLayoutEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles, Wand2, UserCircle, Brain, Target, CheckCircle2 } from "lucide-react";
import { usePersistence } from "../../hooks/usePersistence";
import { usePostArrayBuffer } from "@repo/hooks/network";
import { useDebounce } from "@repo/utils-client";
import { Dialog } from "@repo/ui/dialog";
import { Button } from "@repo/ui/button";
import { ProfileHeader } from "@repo/ui/profile-header";
import { StepLoader } from "@repo/ui/step-loader";
import { EditorSidebar } from "../../../components/EditorSidebar";
import { mapFormDataToStructured } from "../../../libs/cover-letter-utils";
import TemplateSelector from "../../TemplateSelector";
import SmartImportModal from "../../SmartImportModal";
import { RichTextEditor } from "@repo/ui/rich-text-editor";

interface Template {
    id: string;
    name: string;
    description: string;
    supportedFields: string[];
    templateBody?: string;
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
    const API_BASE = "https://api.hirecta.com";

    const [template, setTemplate] = useState<Template | null>(null);
    const [showTemplates, setShowTemplates] = useState(false);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [format, setFormat] = useState<"pdf" | "docx">("pdf");
    const [fontFamily, setFontFamily] = useState('Inter');
    const [showSmartImport, setShowSmartImport] = useState(false);
    const [smartImportMode, setSmartImportMode] = useState<'voice' | 'text'>('voice');

    // Persistence
    const { saveDocument, getDocument } = usePersistence();
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

    const [generationStep, setGenerationStep] = useState(0);
    const generationSteps = [
        "Analyzing Profile...",
        "Drafting Content...",
        "Formatting Document...",
        "Finalizing PDF...",
        "Download Complete"
    ];

    const debouncedFormData = useDebounce(formData, 500); // Faster debounce for preview
    const [skillInput, setSkillInput] = useState("");


    // Initialize PDF generation hook for preview
    const { execute: generatePDF, loading: isPdfGenerating } = usePostArrayBuffer('https://api.hirecta.com/api/cover-letter/pdf-preview');

    // Canvas refs
    const mainRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<any>(null);
    const requestIdRef = useRef(0);
    const scaleRef = useRef<number | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Rendering state
    const [isCanvasRendering, setIsCanvasRendering] = useState(false);

    // Fetch Template Info

    // Fetch Template Info
    const fetchTemplate = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.hirecta.com/api/cover-letter/templates/${id}`
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

    // Calculate progress based on form completion
    const calculateProgress = () => {
        let filled = 0;
        const total = 6; // fullName, email, jobTitle, companyName, experience, phone
        if (formData.fullName) filled++;
        if (formData.email) filled++;
        if (formData.jobTitle) filled++;
        if (formData.companyName) filled++;
        if (formData.experience) filled++;
        if (formData.phone) filled++;
        return Math.round((filled / total) * 100);
    };

    const progress = calculateProgress();

    // Loading implementation similar to Resume Editor
    const [loadingStep, setLoadingStep] = useState(0);
    const loadingSteps = [
        "Initializing Editor...",
        "Loading Templates...",
        "Preparing Workspace..."
    ];

    useEffect(() => {
        if (loading && loadingStep < loadingSteps.length - 1) {
            const timer = setTimeout(() => {
                setLoadingStep(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [loading, loadingStep, loadingSteps.length]);


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

    // Live Preview Hydration
    // Live Preview Logic - Removed Iframe Hydration
    // Moved to Canvas Rendering logic below


    // Canvas PDF Rendering Logic

    const renderPDFPage = useCallback(async (pdfData: ArrayBuffer, page: number) => {
        if (!canvasRef.current) return;

        const container = canvasRef.current.parentElement;
        if (!container) return;

        const containerWidth = Math.floor(container.clientWidth);
        if (containerWidth === 0) return;

        const requestId = ++requestIdRef.current;
        const pdfjsLib = (window as any).pdfjsLib;

        if (!pdfjsLib) return; // Wait for library to load

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        setTotalPages(pdf.numPages);

        const pdfPage = await pdf.getPage(
            Math.min(Math.max(page, 1), pdf.numPages)
        );

        const dpr = window.devicePixelRatio || 1;
        const baseViewport = pdfPage.getViewport({ scale: 1 });

        const padding = 0; // No padding needed for exact fit

        if (!scaleRef.current) {
            scaleRef.current = (containerWidth - padding) / baseViewport.width;
        }

        const viewport = pdfPage.getViewport({
            scale: scaleRef.current,
        });

        const offscreen = offscreenRef.current ?? document.createElement("canvas");
        offscreenRef.current = offscreen;

        const targetWidth = Math.floor(viewport.width * dpr);
        const targetHeight = Math.floor(viewport.height * dpr);

        if (offscreen.width !== targetWidth || offscreen.height !== targetHeight) {
            offscreen.width = targetWidth;
            offscreen.height = targetHeight;
        }

        const offCtx = offscreen.getContext("2d")!;
        offCtx.setTransform(1, 0, 0, 1, 0, 0);
        offCtx.scale(dpr, dpr);

        if (renderTaskRef.current) {
            renderTaskRef.current.cancel();
        }

        renderTaskRef.current = pdfPage.render({
            canvasContext: offCtx,
            viewport,
        });

        try {
            await renderTaskRef.current.promise;
        } catch (e: any) {
            if (e?.name === "RenderingCancelledException") return;
            throw e;
        }

        if (requestId !== requestIdRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(offscreen, 0, 0);
    }, []);

    // Render PDF with loading state and auto-cancellation
    // Render PDF with loading state and auto-cancellation
    const renderPdf = useCallback(async (page = currentPage) => {
        if (!canvasRef.current || !template || isCanvasRendering) return;

        // requestData must be stable to prevent effect loops, but here we construct it inside
        // the callback which is triggered by debouncedFormData changes

        setIsCanvasRendering(true);
        try {
            const requestData = {
                templateId: template.id,
                userData: { ...debouncedFormData, fontFamily },
                format: 'pdf'
            };

            const pdfData = await generatePDF(requestData);

            if (pdfData) {
                await renderPDFPage(pdfData, page);
            }
        } catch (error) {
            console.error("Error rendering PDF:", error);
        } finally {
            setIsCanvasRendering(false);
        }
    }, [currentPage, template?.id, debouncedFormData, fontFamily, generatePDF, renderPDFPage]); // Removed isCanvasRendering from deps to avoid loop starter

    // Cleanup scale on template change
    useEffect(() => {
        scaleRef.current = null;
    }, [template?.id]);

    // Auto-render PDF when data changes - FIXED DEPENDENCIES
    useEffect(() => {
        if (template?.id) {
            renderPdf();
        }
    }, [renderPdf, template?.id]); // renderPdf now has stable dependencies

    // Re-render on window resize - DEBOUNCED
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const onResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                scaleRef.current = null; // Force recalculation of scale
                renderPdf();
            }, 200);
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(timeoutId);
        };
    }, [renderPdf]);


    // Handle Smart Import Apply
    const handleSmartImportApply = (data: any) => {
        // Map resume data to cover letter fields
        const mappedData: Partial<FormData> = {
            fullName: `${data.personalInfo?.firstName || ''} ${data.personalInfo?.lastName || ''}`.trim(),
            email: data.personalInfo?.email || '',
            phone: data.personalInfo?.phone || '',
            jobTitle: data.personalInfo?.jobTitle || '',
            experience: data.experience?.[0]?.summary || '',
            skills: data.skills || [],
        };

        setFormData(prev => ({ ...prev, ...mappedData }));
    };


    // Auto-save logic - FIXED DEPENDENCIES
    const handleAutoSave = useCallback(async (dataToSave: FormData) => {
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
            }
            setLastSaved(new Date());
        }
        setIsSaving(false);
    }, [docId, template?.id, templateIdParam, saveDocument]); // Removed formData from deps

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

        const requiredFields: (keyof FormData)[] = ["fullName", "email", "jobTitle"];
        // Relaxed validation for preview context, but kept strictly for generation
        // For UI feedback, we can show specific errors

        for (const field of requiredFields) {
            const value = formData[field];
            if (!value || (typeof value === "string" && !value.trim())) {
                setError(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
                return false;
            }
        }
        return true;
    };



    // ... (rest of the file)

    const handleGenerate = async () => {
        if (!validateForm()) return;

        try {
            setGenerating(true);
            setGenerationStep(0);
            setError(null);

            const interval = setInterval(() => {
                setGenerationStep(prev => prev < generationSteps.length - 1 ? prev + 1 : prev);
            }, 800);

            const response = await fetch("https://api.hirecta.com/api/cover-letter/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    templateId: template?.id || templateIdParam,
                    userData: { ...formData, fontFamily }, // Pass fontFamily with userData
                    format,
                }),
            });

            clearInterval(interval);
            setGenerationStep(generationSteps.length - 1); // Set to "Download Complete" (active)

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

            // Mark all as complete (including Download Complete)
            setGenerationStep(generationSteps.length);

            // Wait for user to see the success state
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (err: any) {
            console.error("Error generating cover letter:", err);
            setError(err.message || "Failed to generate cover letter");
        } finally {
            setGenerating(false);
            setTimeout(() => setGenerationStep(0), 1000);
        }
    };

    if (loading) {
        return (
            <StepLoader
                loading={true}
                message="AI Editor"
                subMessage={loadingSteps[loadingStep]}
                logoSrc="/logo.png"
                fullScreen={true}
            />
        );
    }

    if (!template) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md mx-auto text-center py-20 px-8 bg-red-50 rounded-3xl border border-red-100">
                    <button onClick={() => router.push("/cover-letter/templates")} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
                        Choose Another Template
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            <EditorSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <ProfileHeader
                    name={`${formData.fullName || 'Untitled'}'s Cover Letter`}
                    title={formData.jobTitle || "Job Title"}
                    progress={progress}
                    onDownload={async () => { await handleGenerate(); }}
                    onTemplateChange={() => setShowTemplates(true)}
                    fontFamily={fontFamily}
                    onFontChange={setFontFamily}
                    onSmartImport={() => {
                        setSmartImportMode('voice');
                        setShowSmartImport(true);
                    }}
                    // Hide unsupported props
                    classNameLeft="md:w-[45%]"
                />

                {/* Smart Import Modal */}
                <SmartImportModal
                    isOpen={showSmartImport}
                    onClose={() => setShowSmartImport(false)}
                    onApply={handleSmartImportApply}
                    mode={smartImportMode}
                />

                {/* Main Content - Split Glass Content */}
                <div className="flex-1 flex overflow-hidden relative">
                    {/* Background Atmosphere */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    </div>

                    {/* Left: Input Form (45%) */}
                    <div className="w-full md:w-[45%] shrink-0 flex flex-col relative bg-white border-r border-slate-200/60 overflow-hidden">
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                            {showTemplates ? (
                                <TemplateSelector
                                    apiBase={API_BASE}
                                    endpoint="/api/cover-letter-templates"
                                    selectedTemplateId={template?.id || templateIdParam || ''}
                                    onBack={() => setShowTemplates(false)}
                                    onSelectTemplate={(newTemplate: any) => {
                                        if (newTemplate.id) {
                                            const url = new URL(window.location.href);
                                            url.searchParams.set('templateId', newTemplate.id);
                                            window.history.replaceState({}, '', url.toString());
                                            fetchTemplate(newTemplate.id);
                                            setShowTemplates(false);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="p-6 md:p-12">
                                    <div className="max-w-2xl mx-auto space-y-8">
                                        <div className="space-y-2">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
                                                <Sparkles size={12} />
                                                <span>AI Context</span>
                                            </div>
                                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Details</h2>
                                            <p className="text-gray-500 font-medium text-sm">Fill in the details below. The preview on the right updates automatically.</p>
                                        </div>

                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">⚠️</div>
                                                {error}
                                            </div>
                                        )}

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-wide">
                                                    <UserCircle size={18} className="text-blue-500" />
                                                    <h3>About You</h3>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                                        <input type="text" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900" placeholder="John Doe" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Title</label>
                                                        <input type="text" value={formData.jobTitle} onChange={(e) => handleInputChange("jobTitle", e.target.value)} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900" placeholder="Software Engineer" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                                        <input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900" placeholder="john@example.com" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                                                        <input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900" placeholder="+1 555 000 0000" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-wide">
                                                    <Target size={18} className="text-blue-500" />
                                                    <h3>Target Role</h3>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Company</label>
                                                    <input type="text" value={formData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900" placeholder="Google, Microsoft..." />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-wide">
                                                    <Brain size={18} className="text-blue-500" />
                                                    <h3>Experience & Skills</h3>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Professional Summary</label>
                                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                                                        <RichTextEditor
                                                            value={formData.experience}
                                                            onChange={(value: string) => handleInputChange("experience", value)}
                                                            placeholder="I have 5 years of experience..."
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="h-12" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Real-time Preview */}
                    <div className="flex-1 relative flex flex-col items-center bg-transparent">
                        <div className="flex-1 w-full overflow-y-auto custom-scrollbar flex flex-col items-center bg-slate-100/30 px-8">
                            <div className="relative w-full max-w-[794px] flex justify-center">
                                <div className="relative bg-white border-r border-slate-200/60 w-full" style={{ aspectRatio: '210/297' }}>
                                    {/* Live Canvas Preview */}
                                    <main ref={mainRef} className="w-full h-full relative">
                                        <div className="absolute inset-0 flex justify-center bg-white">
                                            <canvas
                                                ref={canvasRef}
                                                className=""
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto'
                                                }}
                                            />
                                        </div>

                                        {/* Overlay when loading */}
                                        {(loading || isPdfGenerating) && (
                                            <div className="absolute top-4 right-8 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-slate-200">
                                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                                <span className="text-xs font-medium text-slate-600">
                                                    Saving...
                                                </span>
                                            </div>
                                        )}
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    generating && (
                        <StepLoader
                            loading={true}
                            message={generationStep === generationSteps.length ? "Download Complete!" : "Generating Cover Letter"}
                            subMessage={generationStep === generationSteps.length ? "Your file is ready." : "Please wait while we create your document..."}
                            logoSrc="/logo.png"
                            fullScreen={true}
                        />
                    )
                }

                <Dialog isOpen={dialog.isOpen} onClose={() => setDialog(prev => ({ ...prev, isOpen: false }))} title={dialog.title} description={dialog.description} type={dialog.type} primaryActionLabel="Got it" />
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>}>
            <CoverLetterCreateForm />
        </Suspense>
    );
}
