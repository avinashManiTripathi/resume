"use client";

import { useState, useEffect, useCallback, Suspense, useRef, useMemo, useLayoutEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles, UserCircle, Brain, Target, Pencil, Download } from "lucide-react";
import { usePersistence } from "../../hooks/usePersistence";
import { usePostArrayBuffer } from "@repo/hooks/network";
import { useDebounce } from "@repo/utils-client";
import { Dialog } from "@repo/ui/dialog";
import { StepLoader } from "@repo/ui/step-loader";
import { EditorSidebar } from "../../../components/EditorSidebar";
import TemplateSelector from "../../TemplateSelector";
import SmartImportModal from "../../SmartImportModal";
import { RichTextEditor } from "@repo/ui/rich-text-editor";
import { ENV } from "@/app/env";

import { useAppNetwork } from "../../../hooks/useAppNetwork";
import { API_ENDPOINTS } from "@repo/utils-client";

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
    const network = useAppNetwork();

    // Kept for direct fetch calls (blobs) and image URL construction
    const API_BASE = ENV.API_URL

    const [template, setTemplate] = useState<Template | null>(null);
    const [showTemplates, setShowTemplates] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isTemplateChanging, setIsTemplateChanging] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [format, setFormat] = useState<"pdf" | "docx">("pdf");
    const [fontFamily, setFontFamily] = useState('Inter');
    const [showSmartImport, setShowSmartImport] = useState(false);
    const [smartImportMode, setSmartImportMode] = useState<'voice' | 'text'>('voice');
    const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&auto=format&fit=crop&q=60");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { alert("File size should be less than 5MB"); return; }
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const apiUrl = ENV.API_URL

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
    const { execute: generatePDF, loading: isPdfGenerating } = usePostArrayBuffer(apiUrl + API_ENDPOINTS.COVER_LETTER.PDF_PREVIEW);

    // Canvas refs
    const mainRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<any>(null);
    const requestIdRef = useRef(0);
    const scaleRef = useRef<number | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Track if initial load has been completed to prevent re-initialization
    const hasInitialized = useRef(false);

    // Rendering state
    const [isCanvasRendering, setIsCanvasRendering] = useState(false);

    // Always-fresh form data ref — updated synchronously inside handleInputChange
    // so renderPdf always sends the latest typed values without needing React deps.
    const latestFormDataRef = useRef<FormData>({
        fullName: "", email: "", phone: "", jobTitle: "",
        companyName: "", experience: "", skills: [], customParagraph: "",
    });
    // Debounce timer ref — plain setTimeout, no React hooks chain
    const renderTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch Template Info
    const fetchTemplate = useCallback(async (id: string, isInitial = false) => {
        try {
            // Use different loading states for initial vs template change
            if (isInitial) {
                setIsInitialLoading(true);
            } else {
                setIsTemplateChanging(true);
            }

            const data: any = await network.get(`${API_ENDPOINTS.COVER_LETTER.TEMPLATES}/${id}`);

            if (data.template) {
                setTemplate(data.template);
            } else {
                setError("Template not found");
            }
        } catch (err) {
            console.error("Error fetching template:", err);
            setError("Failed to load template");
        } finally {
            if (isInitial) {
                setIsInitialLoading(false);
            } else {
                setIsTemplateChanging(false);
            }
        }
    }, [network]);

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
        if (isInitialLoading && loadingStep < loadingSteps.length - 1) {
            const timer = setTimeout(() => {
                setLoadingStep(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isInitialLoading, loadingStep, loadingSteps.length]);


    // Load existing document or initial template
    useEffect(() => {
        // Only run initial load once
        if (hasInitialized.current) return;

        const id = searchParams.get('id');
        if (id) {
            const loadDoc = async () => {
                const doc = await getDocument(id, 'cover-letter');
                if (doc) {
                    setFormData(doc.data);
                    setDocId(doc.id);
                    if (doc.templateId) {
                        await fetchTemplate(doc.templateId, true);
                        hasInitialized.current = true;
                    }
                }
            };
            loadDoc();
        } else if (templateIdParam) {
            fetchTemplate(templateIdParam, true).then(() => {
                hasInitialized.current = true;
            });
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

    // Render PDF — reads from latestFormDataRef (always fresh, avoids stale closures).
    // renderPdf itself is stable (only recreates when template/page/url change).
    const renderPdf = useCallback(async (page = currentPage) => {
        if (!canvasRef.current || !template) return;

        const resolvedTemplateId = (template as any).id || templateIdParam;
        if (!resolvedTemplateId) return;

        setIsCanvasRendering(true);
        try {
            const requestData = {
                templateId: resolvedTemplateId,
                userData: { ...latestFormDataRef.current, fontFamily },
                format: 'pdf'
            };

            console.log('[CoverLetter] pdf-preview →', resolvedTemplateId, latestFormDataRef.current.fullName);
            const pdfData = await generatePDF(requestData);

            if (pdfData) {
                await renderPDFPage(pdfData, page);
            }
        } catch (error) {
            console.error('Error rendering PDF:', error);
        } finally {
            setIsCanvasRendering(false);
        }
    }, [currentPage, template, templateIdParam, fontFamily, generatePDF, renderPDFPage]);
    // Note: debouncedFormData intentionally NOT in deps — data read via latestFormDataRef

    // Cleanup scale on template change
    useEffect(() => {
        scaleRef.current = null;
    }, [template?.id, isTemplateChanging]);

    // Fire once when template first loads (initial preview)
    useEffect(() => {
        if (template?.id) {
            renderPdf();
        }
    }, [template?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const handleInputChange = (field: keyof FormData, value: string | string[]) => {
        // 1. Sync-update the ref immediately so renderPdf always sends fresh data
        latestFormDataRef.current = { ...latestFormDataRef.current, [field]: value };
        // 2. Update React state (for controlled inputs / UI)
        setFormData((prev) => ({ ...prev, [field]: value }));
        // 3. Direct debounce — schedule renderPdf after 600ms of inactivity
        //    This bypasses the useCallback dep chain and stale closure problems entirely.
        if (renderTimerRef.current) clearTimeout(renderTimerRef.current);
        renderTimerRef.current = setTimeout(() => {
            renderPdf();
        }, 600);
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

            const blob = await network.post<Blob>(API_ENDPOINTS.COVER_LETTER.GENERATE, {
                templateId: template?.id || templateIdParam,
                userData: { ...formData, fontFamily }, // Pass fontFamily with userData
                format,
            }, {
                responseType: 'blob'
            });

            clearInterval(interval);
            setGenerationStep(generationSteps.length - 1); // Set to "Download Complete" (active)

            const fileName = `cover-letter-${template?.id}-${Date.now()}.${format}`;
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

    const handleTemplateChange = () => {
        setShowTemplates(prev => !prev);
    };

    if (isInitialLoading) {
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
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden gap-2">
            <div className="hidden lg:block">
                <EditorSidebar page="cover-letter" onDownload={handleGenerate} onTemplate={handleTemplateChange} />
            </div>
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

                {/* Main Content - Split Glass Content */}
                <div className="flex-1 flex overflow-hidden relative">
                    {/* Background Atmosphere */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    </div>

                    {/* Left: Input Form (45%) */}
                    <div className={`w-full md:w-[45%] shrink-0 flex flex-col relative bg-white border-r border-slate-200/60 overflow-hidden ${showMobilePreview ? 'hidden md:flex' : 'flex'}`}>
                        {/* Editor-style inline sticky header — inside left panel only */}
                        <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-slate-200/60 bg-white/80 backdrop-blur-md z-10 sticky top-0 h-[72px]">
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <div
                                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm cursor-pointer hover:border-indigo-100 transition-all"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center border border-white shadow-sm hover:bg-white hover:scale-105 transition-all text-slate-600"
                                    >
                                        <Pencil size={10} />
                                    </button>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-base font-bold text-slate-800 leading-tight">
                                        {formData.fullName ? `${formData.fullName}'s Cover Letter` : 'Your Cover Letter'}
                                    </h2>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {formData.jobTitle || 'Cover Letter'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Progress Circle */}
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
                                        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent"
                                            strokeDasharray={2 * Math.PI * 16}
                                            strokeDashoffset={2 * Math.PI * 16 * (1 - progress / 100)}
                                            className="text-blue-600 transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[9px] font-bold text-slate-700">{progress}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Smart Import Modal */}
                        <SmartImportModal
                            isOpen={showSmartImport}
                            onClose={() => setShowSmartImport(false)}
                            onApply={handleSmartImportApply}
                            mode={smartImportMode}
                        />

                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                            {showTemplates ? (
                                <TemplateSelector
                                    apiBase={API_BASE}
                                    endpoint={API_ENDPOINTS.COVER_LETTER.TEMPLATES}
                                    selectedTemplateId={template?.id || templateIdParam || ''}
                                    onBack={() => setShowTemplates(false)}
                                    onSelectTemplate={(newTemplate: any) => {
                                        if (newTemplate.id) {
                                            const url = new URL(window.location.href);
                                            url.searchParams.set('templateId', newTemplate.id);
                                            window.history.replaceState({}, '', url.toString());
                                            fetchTemplate(newTemplate.id, false); // Not initial load
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
                                                            apiUrl={apiUrl}
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

                        {/* Sticky action footer */}
                        <div className="shrink-0 flex items-center gap-3 px-5 py-4 border-t border-slate-100 bg-white">
                            <button
                                onClick={() => setShowTemplates(true)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                </svg>
                                Change Template
                            </button>
                            <button
                                onClick={handleGenerate}
                                disabled={generating}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 rounded-xl shadow-sm transition-all active:scale-95"
                            >
                                {generating
                                    ? <><Loader2 size={15} className="animate-spin" /> Generating…</>
                                    : <><Download size={15} /> Download</>}
                            </button>
                        </div>
                    </div>

                    {/* Right: Real-time Preview */}
                    <div className={`flex-1 relative flex flex-col items-center bg-transparent ${showMobilePreview ? 'flex' : 'hidden md:flex'}`}>
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

                                        {/* Overlay when loading - matches editor behavior */}
                                        {(isTemplateChanging || isPdfGenerating) && (
                                            <div className="absolute top-4 right-8 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-slate-200">
                                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                                <span className="text-xs font-medium text-slate-600">
                                                    {isTemplateChanging ? 'Loading template...' : 'Saving...'}
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

            {/* Floating Preview/Edit FAB - mobile only */}
            <button
                onClick={() => setShowMobilePreview(!showMobilePreview)}
                className="md:hidden fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 min-w-[56px] min-h-[56px]"
                aria-label={showMobilePreview ? 'Show Form' : 'Show Preview'}
            >
                {showMobilePreview ? (
                    <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-sm font-semibold">Edit</span>
                    </>
                ) : (
                    <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm font-semibold">Preview</span>
                    </>
                )}
            </button>

            {/* Hamburger Menu FAB - mobile only */}
            <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden fixed bottom-4 left-4 z-50 bg-white text-slate-700 p-3 rounded-full shadow-lg hover:bg-slate-50 transition-all border-2 border-slate-200 min-w-[56px] min-h-[56px]"
                aria-label="Menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Slide-up Menu */}
            {showMobileMenu && (
                <>
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileMenu(false)} />
                    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Actions</h3>
                                <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-3">
                                {/* Build with AI */}
                                <button
                                    onClick={() => { setShowMobileMenu(false); setShowSmartImport(true); }}
                                    className="w-full flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-400 transition-all"
                                >
                                    <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-gray-900">Build with AI</div>
                                        <div className="text-xs text-gray-600">Import from voice or file</div>
                                    </div>
                                </button>

                                {/* Change Template */}
                                <button
                                    onClick={() => { setShowMobileMenu(false); setShowTemplates(true); }}
                                    className="w-full flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-400 transition-all"
                                >
                                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-gray-900">Change Template</div>
                                        <div className="text-xs text-gray-600">Choose a new design</div>
                                    </div>
                                </button>

                                {/* Download */}
                                <button
                                    onClick={() => { setShowMobileMenu(false); handleGenerate(); }}
                                    className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all"
                                >
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Download className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-gray-900">Download</div>
                                        <div className="text-xs text-gray-600">Save as PDF or DOCX</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
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
