"use client";


import { useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback, Suspense } from "react";
import { useDebounce, exportToDoc, canDownload, type SubscriptionTier, API_ENDPOINTS } from "@repo/utils-client";
import { useTemplates } from "@repo/hooks/useTemplate";
import { useSearchParams, useRouter } from "next/navigation";
import { ProfileHeader } from "@repo/ui/profile-header";
import { FormSchema } from "../FieldRenderer";
import GenericForm from "../GenericForm";
import TemplateSelector from "../TemplateSelector";
import { saveBlobAsPdf } from "@repo/utils-client";
import { useAppNetwork } from "../../hooks/useAppNetwork";
import SmartImportModal from "../SmartImportModal";
import { Dialog } from "@repo/ui/dialog";
import { CloudCheck, FileText, Brain, Sparkles, Target, Zap, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyData, ResumeFormSchema } from "../constants";
import { usePostArrayBuffer } from "@repo/hooks/network";
import { usePersistence } from "../hooks/usePersistence";
import { ENV } from "../env";
import { StepLoader } from '@repo/ui/step-loader';
import { EditorSidebar } from "../../components/EditorSidebar";


function ResumeEditor() {
  const API_BASE = ENV.API_URL;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get template ID from URL or use default
  const urlTemplateId = searchParams.get('templateId');

  // Clean default template ID - will be set from fetched templates
  const [defaultTemplateId, setDefaultTemplateId] = useState<string>("696e14fce15299e55244d1ce");



  // Persistence
  const { saveDocument, getDocument, isLoggedIn, subscription, setSubscription, refreshSubscription } = usePersistence();
  const [docId, setDocId] = useState<string | null>(searchParams.get('id'));
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // State
  const [resume, setResume] = useState(dummyData);
  const debouncedResume = useDebounce(resume, 500);

  // Auto-save hook
  const network = useAppNetwork();
  // Initialize PDF generation hook with auto-cancellation
  const { execute: generatePDF, loading: isPdfGenerating } = usePostArrayBuffer(`${API_BASE}${API_ENDPOINTS.PDF.CONVERT}`);

  // Profile image
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D");

  // Note: Using isPdfGenerating from usePostArrayBuffer hook instead of separate state

  const [schema, setSchema] = useState<FormSchema>(ResumeFormSchema);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSmartImport, setShowSmartImport] = useState(false);
  const [mode, setMode] = useState<'voice' | 'text'>('voice');
  const [templateId, setTemplateId] = useState(urlTemplateId);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [downloadingStep, setDownloadingStep] = useState(0);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [saveDialog, setSaveDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: 'success' | 'info';
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: 'info'
  });

  const loadingSteps = [
    "Initializing Editor...",
    "Loading Templates...",
    "Preparing Workspace..."
  ];

  const downloadingSteps = [
    "Processing Data...",
    "Generating PDF...",
    "Finalizing Download..."
  ];

  // Fetch templates
  const { templates, loading: templatesLoading } = useTemplates({
    apiUrl: API_BASE,
  });

  // Set default template ID when templates are loaded
  useEffect(() => {
    const fromSub = searchParams.get('fromSubscription');

    // Only set default if NOT returning from subscription
    if (!templatesLoading && templates && templates.length > 0 && fromSub !== 'true') {
      if (templates[0]._id) {
        setDefaultTemplateId(templates[0]._id);

        // If no template ID in URL, set it to the first template
        // But only if we haven't already set a template ID (state)
        if (!urlTemplateId && !templateId) {
          setTemplateId(templates[0]._id);
          // Update URL as well
          const url = new URL(window.location.href);
          url.searchParams.set('templateId', templates[0]._id);
          window.history.replaceState({}, '', url.toString());
        }
      }
    }
  }, [templates, templatesLoading, urlTemplateId, templateId, searchParams]);

  // Auto-progress loading steps
  useEffect(() => {
    if (isLoading && loadingStep < loadingSteps.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingStep, loadingSteps.length]);

  // Auto-progress downloading steps
  useEffect(() => {
    if (isDownloadingPdf && downloadingStep < downloadingSteps.length - 1) {
      const timer = setTimeout(() => {
        setDownloadingStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDownloadingPdf, downloadingStep, downloadingSteps.length]);

  // Handle voice/text import from URL
  useEffect(() => {
    const voice = searchParams.get('voice');
    const text = searchParams.get('text');
    if (voice === 'true' || text == 'true') {
      setShowSmartImport(true);
      setMode(text === 'true' ? 'text' : 'voice');
    }
  }, [searchParams]);

  // Handle return from subscription page with auto-download
  useEffect(() => {
    const subscribed = searchParams.get('subscribed');

    if (subscribed === 'true') {
      console.log('[Editor] Returned from subscription page');

      // Restore data from sessionStorage if available
      try {
        const storedData = sessionStorage.getItem('redirect_resume_data');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          if (parsed.resume) setResume(parsed.resume);
          if (parsed.docId) setDocId(parsed.docId);
          if (parsed.templateId) setTemplateId(parsed.templateId);
          if (parsed.fontFamily) setFontFamily(parsed.fontFamily);
          if (parsed.sectionOrder) setSectionOrder(parsed.sectionOrder);

          console.log('[Editor] Resume state restored');
          sessionStorage.removeItem('redirect_resume_data');

          // Update URL to match restored state but KEEP subscribed param
          // The download useEffect needs to see it
          const url = new URL(window.location.href);
          if (parsed.docId) url.searchParams.set('id', parsed.docId);
          if (parsed.templateId) url.searchParams.set('templateId', parsed.templateId);
          window.history.replaceState({}, '', url.toString());
        }
      } catch (e) {
        console.error("Failed to restore resume data", e);
      }

      // Check for pending download action
      const pendingDownload = sessionStorage.getItem('pending_download');
      if (pendingDownload) {
        console.log('[Editor] Pending download found:', pendingDownload);
        // Don't trigger here - let the download happen via the existing useEffect that watches isLoggedIn
        // Just log for debugging
      }
    }
  }, [searchParams]);


  // Load existing document if ID is provided
  const urlDocId = searchParams.get('id');
  useEffect(() => {
    if (urlDocId) {
      const loadDoc = async () => {
        const doc = await getDocument(urlDocId, 'resume');
        if (doc) {
          setResume(doc.data);
          if (doc.data?.personalInfo?.profileImage) {
            setProfileImage(doc.data.personalInfo.profileImage);
          }
          if (doc.data?.fontFamily) {
            setFontFamily(doc.data.fontFamily);
          }
          setTemplateId(doc.templateId);
          setDocId(doc.id);
        }
      };
      loadDoc();
    }
  }, [urlDocId, getDocument]);

  // Check for resume data from tailor page
  useEffect(() => {
    const fromTailor = searchParams.get('fromTailor');
    const fromAtsCheck = searchParams.get("fromAtsCheck");
    if (fromTailor === 'true' || fromAtsCheck === 'true') {
      try {
        // Get data from sessionStorage
        const storedData = sessionStorage.getItem('parsedResumeData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          console.log('🔄 Merging imported resume data...');

          // Deep Merge Logic to preserve existing user data (like images and custom sections)
          setResume(prev => {
            const merged = { ...parsedData };

            // 1. Preserve Personal Info (especially Profile Image)
            if (prev.personalInfo) {
              merged.personalInfo = {
                ...parsedData.personalInfo,
                // Keep existing profile image if the new one doesn't have it (likely)
                profileImage: (parsedData.personalInfo as any)?.profileImage || prev.personalInfo.profileImage,
                // Keep other fields if missing in new data but present in old
                firstName: parsedData.personalInfo?.firstName || prev.personalInfo.firstName,
                lastName: parsedData.personalInfo?.lastName || prev.personalInfo.lastName,
                email: parsedData.personalInfo?.email || prev.personalInfo.email,
              };
            }

            // 2. Preserve Custom Sections (AI usually doesn't return these)
            if (prev.customSections && prev.customSections.length > 0) {
              merged.customSections = prev.customSections;
            }

            // 3. Preserve any other top-level keys that might be missing in AI result but exist in local state
            // (Optional, depending on schema strictness)

            return merged;
          });

          // Clean up sessionStorage and URL parameter
          sessionStorage.removeItem('parsedResumeData');
          const url = new URL(window.location.href);
          url.searchParams.delete('fromTailor');
          url.searchParams.delete('fromAtsCheck');
          window.history.replaceState({}, '', url.toString());

          console.log('✅ Resume data merged successfully');

          // Trigger an initial save with the merged data
          // Note: We use the *parsedData* here directly for the check, but handleAutoSave uses state. 
          // Since setState is async, we should wait or pass the merged object.
          // Better approach: Let the useEffect debounce handle the save after state update.
          // But to be safe, we can trigger it explicitly if we construct the object here.
        }
      } catch (error) {
        console.error('Failed to load resume data from sessionStorage:', error);
      }
    }
  }, [searchParams]);

  // Auto-save logic
  const handleAutoSave = useCallback(async (dataToSave: any) => {
    if (!dataToSave) return;
    setIsSaving(true);
    const title = `${dataToSave.personalInfo?.firstName || 'Untitled'} ${dataToSave.personalInfo?.lastName || 'Resume'}`.trim();

    const result = await saveDocument({
      id: docId || undefined,
      title,
      type: 'resume',
      templateId: templateId || defaultTemplateId,
      data: { ...dataToSave, fontFamily: fontFamily || 'Inter' }
    });

    if (result.success && result.id) {
      if (!docId || docId !== result.id) {
        setDocId(result.id);
        const url = new URL(window.location.href);
        url.searchParams.set('id', result.id);
        window.history.replaceState({}, '', url.toString());

        if (result.storage === 'local' && !sessionStorage.getItem('persistence_popup_shown')) {
          sessionStorage.setItem('persistence_popup_shown', 'true');
        } else if (result.storage === 'cloud' && !sessionStorage.getItem('persistence_popup_shown')) {
          sessionStorage.setItem('persistence_popup_shown', 'true');
        }
      }
      setLastSaved(new Date());
    }
    setIsSaving(false);
  }, [docId, templateId, saveDocument, defaultTemplateId, fontFamily]);

  // Debounced auto-save
  useEffect(() => {
    // Save when content changes (debounced) OR when metadata changes (immediately via handleAutoSave recreation)
    if (debouncedResume !== dummyData || fontFamily !== 'Inter' || templateId !== urlTemplateId) {
      handleAutoSave(debouncedResume);
    }
  }, [debouncedResume, fontFamily, templateId, handleAutoSave]);

  // Memoize section labels computation - used in multiple places
  const sectionLabels = useMemo(() => {
    return Object.entries(schema).reduce((acc, [key, config]) => {
      acc[key] = config.label;
      return acc;
    }, {} as Record<string, string>);
  }, [schema]);

  // Initialize section order based on schema keys
  const initialSectionOrder = useMemo(() => Object.keys(schema), []);
  const [sectionOrder, setSectionOrder] = useState<string[]>(initialSectionOrder);
  const debouncedSectionOrder = useDebounce(sectionOrder, 500);

  // Page navigation
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const requestIdRef = useRef(0);

  const apiUrl = `${API_BASE}/convert-html-to-pdf`;


  // Calculate dynamic progress based on resume completion - Memoized to prevent recalculation on every render
  const progress = useMemo(() => {
    let totalFields = 0;
    let filledFields = 0;

    // Personal Info (6 fields)
    if (resume?.personalInfo) {
      const personalFields = ['firstName', 'lastName', 'email', 'phone', 'jobTitle', 'summary'] as const;
      personalFields.forEach(field => {
        totalFields++;
        const value = resume.personalInfo?.[field as keyof typeof resume.personalInfo];
        if (value && typeof value === 'string' && value.trim()) {
          filledFields++;
        }
      });
    }

    // Experience (at least 1 entry with key fields)
    if (resume?.experience && resume.experience.length > 0) {
      totalFields += 3; // jobTitle, company, startDate
      const exp = resume.experience[0] as any;
      if (exp.jobTitle && exp.jobTitle.trim()) filledFields++;
      if (exp.company && exp.company.trim()) filledFields++;
      if (exp.startDate) filledFields++;
    } else {
      totalFields += 3;
    }

    // Education (at least 1 entry with key fields)
    if (resume?.education && resume.education.length > 0) {
      totalFields += 4; // degree, institution, startDate, endDate
      const edu = resume.education[0];
      if (edu.degree && edu.degree.trim()) filledFields++;
      if (edu.institution && edu.institution.trim()) filledFields++;
      if (edu.startDate) filledFields++;
      if (edu.endDate) filledFields++;
    } else {
      totalFields += 4;
    }

    // Skills (at least 2 skills)
    if (resume?.skills && resume.skills.length >= 2) {
      totalFields += 2;
      filledFields += Math.min(resume.skills.length, 2);
    } else {
      totalFields += 2;
      if (resume?.skills) {
        filledFields += resume.skills.length;
      }
    }

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  }, [resume]);


  // Handle section name changes - Memoized to prevent child re-renders
  const handleSectionNameChange = useCallback((sectionKey: string, newLabel: string) => {
    setSchema(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        label: newLabel
      }
    }));
  }, []);

  // Handle resume changes - Memoized to prevent GenericForm re-renders
  const handleResumeChange = useCallback((newResume: any) => {
    setResume(newResume);
  }, []);

  // Page navigation - Memoized for ProfileHeader
  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
  }, []);

  // Handle profile image change - Memoized for ProfileHeader
  const handleProfileImageChange = useCallback((imageUrl: string) => {
    setProfileImage(imageUrl);
    // Save to resume data so it's sent to backend
    setResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        profileImage: imageUrl
      }
    }));
  }, []);

  // Handle export
  const handleExport = useCallback(async (format: "pdf" | "doc") => {
    const userName = resume?.personalInfo?.firstName + "_" + resume?.personalInfo?.lastName + "_" + resume?.personalInfo?.jobTitle;
    const fileName = userName.trim().replace(/\s+/g, "_");

    // Check if user is logged in
    if (!isLoggedIn) {
      sessionStorage.setItem('pending_download', format);
      const authUrl = ENV.AUTH_URL;
      window.location.href = `${authUrl}/signin?returnTo=${encodeURIComponent(window.location.href)}`;
      return;
    }
    // Check subscription before allowing download
    console.log('[Download] Checking subscription:', {
      subscription,
      canDownload: canDownload(subscription),
      bypassEnabled: ENV.BY_PASS_SUBSCRIPTION
    });

    if (!canDownload(subscription) && ENV.BY_PASS_SUBSCRIPTION === 'false') {
      // Save download intent so we can auto-download after subscription
      sessionStorage.setItem('pending_download', format);
      console.log('[Download] Saved pending download:', format);

      // Save current state to sessionStorage before redirecting
      const stateToSave = {
        resume,
        templateId,
        fontFamily,
        sectionOrder,
        docId
      };
      sessionStorage.setItem('redirect_resume_data', JSON.stringify(stateToSave));

      // Redirect to subscription page instead of showing modal
      const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/subscription?returnTo=${currentUrl}`);
      return;
    }

    if (format === "pdf") {
      const resumeData = {
        templateId,
        sectionLabels,
        ...resume,
        fontFamily,
        order: sectionOrder,
        intent: 'download'
      };
      setIsDownloadingPdf(true);
      setDownloadingStep(0);
      try {
        const blob = await network.post<Blob>(API_ENDPOINTS.PDF.CONVERT, resumeData, {
          responseType: 'blob'
        });
        saveBlobAsPdf(blob, fileName);

      } catch (error: any) {
        console.error("PDF download error:", error);

        // Handle 403/401 errors
        // Check typically error.status or error.response.status depending on the network client implementation
        const status = error?.status || error?.response?.status;

        if (status === 403) {
          // Save state for return
          const stateToSave = {
            resume,
            templateId,
            fontFamily,
            sectionOrder,
            docId
          };
          sessionStorage.setItem('redirect_resume_data', JSON.stringify(stateToSave));
          const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
          router.push(`/subscription?returnTo=${currentUrl}`);
        } else if (status === 401) {
          const authUrl = ENV.AUTH_URL;
          window.location.href = `${authUrl}/signin?returnTo=${encodeURIComponent(window.location.href)}`;
        }
      } finally {
        // Small delay before closing to show completion
        setTimeout(() => {
          setIsDownloadingPdf(false);
        }, 500);
      }
    } else {
      const content = mainRef.current?.innerHTML || "";
      exportToDoc(content, `${fileName}.doc`);
    }
  }, [isLoggedIn, router, templateId, sectionLabels, fontFamily, resume, sectionOrder, apiUrl]);

  // Handle pending download on return from login or subscription
  useEffect(() => {
    const handlePendingDownload = async () => {
      if (isLoggedIn === true) {
        const subscribed = searchParams.get('subscribed');
        const pendingFormat = sessionStorage.getItem('pending_download');

        console.log('[Editor] Download check:', {
          isLoggedIn,
          subscribed,
          pendingFormat,
          subscription: subscription?.plan,
          subscriptionStatus: subscription?.status,
          subscriptionLoaded: subscription !== undefined
        });

        // CRITICAL: Don't process pending download until subscription data has loaded
        // subscription === null means loaded but no subscription
        // subscription === undefined means not loaded yet
        if (subscription === undefined) {
          console.log('[Editor] Waiting for subscription to load...');
          return; // Exit early, will retry when subscription loads
        }

        if (pendingFormat) {
          console.log('[Editor] Processing pending download:', pendingFormat);

          // If user just subscribed, refresh subscription first
          if (subscribed === 'true' && refreshSubscription) {
            console.log('[Editor] Refreshing subscription before download...');
            await refreshSubscription();
            // Small delay to ensure state update propagates
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log('[Editor] Subscription refreshed, subscription is now:', subscription);
          }

          sessionStorage.removeItem('pending_download');
          console.log('[Editor] Triggering download for format:', pendingFormat);
          handleExport(pendingFormat as "pdf" | "doc");

          // Clean up URL after processing download
          if (subscribed === 'true') {
            const url = new URL(window.location.href);
            url.searchParams.delete('subscribed');
            window.history.replaceState({}, '', url.toString());
            console.log('[Editor] Cleaned up subscribed parameter from URL');
          }
        } else if (subscribed === 'true') {
          // If we have subscribed param but no pending download, just clean up URL
          console.log('[Editor] No pending download, cleaning up URL');
          const url = new URL(window.location.href);
          url.searchParams.delete('subscribed');
          window.history.replaceState({}, '', url.toString());
        }
      }
    };

    handlePendingDownload();
  }, [isLoggedIn, searchParams, handleExport, refreshSubscription, subscription]);



  // Auto-populate form schema with custom sections when data exists
  useEffect(() => {
    if (!resume) return;

    // Type guard for customSections
    const resumeWithCustom = resume as any;
    if (!resumeWithCustom.customSections) return;

    const currentSections = Object.keys(schema);
    const sectionsToAdd: any = {};

    resumeWithCustom.customSections.forEach((section: any) => {
      if (section.items && section.items.length > 0) {
        // Check if section already exists in schema
        if (!currentSections.includes(section.id)) {
          // Convert fieldDefinitions to the schema format
          const itemFields: any = {};

          if (section.fieldDefinitions) {
            Object.entries(section.fieldDefinitions).forEach(([key, def]: [string, any]) => {
              itemFields[key] = {
                label: def.label || key,
                type: def.type || 'text',
                options: def.options || undefined,
                className: def.className || (def.type === 'richtext' || key === 'description' ? 'w-full' : 'w-[calc(50%-4px)]')
              };
            });
          }

          // Add section to schema with correct structure
          sectionsToAdd[section.id] = {
            label: section.label || section.id,
            type: 'array',
            isCollapsible: true,
            item: itemFields  // Use 'item' (singular) not 'items'
          };
        }
      }
    });

    // Update schema if there are new sections
    if (Object.keys(sectionsToAdd).length > 0) {
      setSchema(prev => ({
        ...prev,
        ...sectionsToAdd
      }));
    }
  }, [resume]);

  const scaleRef = useRef<number | null>(null);

  const renderPDFPage = useCallback(async (pdfData: ArrayBuffer, page: number) => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement;
    if (!container) return;

    const containerWidth = Math.floor(container.clientWidth);
    if (containerWidth === 0) return;

    const requestId = ++requestIdRef.current;
    const pdfjsLib = (window as any).pdfjsLib;

    //need to move this in constants
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    setTotalPages(pdf.numPages);

    const pdfPage = await pdf.getPage(
      Math.min(Math.max(page, 1), pdf.numPages)
    );

    const dpr = window.devicePixelRatio || 1;
    const baseViewport = pdfPage.getViewport({ scale: 1 });

    const padding = 20;

    if (!scaleRef.current) {
      scaleRef.current =
        (containerWidth - padding) / baseViewport.width;
    }

    const viewport = pdfPage.getViewport({
      scale: scaleRef.current,
    });

    const offscreen =
      offscreenRef.current ?? document.createElement("canvas");
    offscreenRef.current = offscreen;

    const targetWidth = Math.floor(viewport.width * dpr);
    const targetHeight = Math.floor(viewport.height * dpr);

    if (
      offscreen.width !== targetWidth ||
      offscreen.height !== targetHeight
    ) {
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

    if (
      canvas.width !== targetWidth ||
      canvas.height !== targetHeight
    ) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(offscreen, 0, 0);
  }, []);

  useEffect(() => {
    scaleRef.current = null;
  }, [templateId, showMobilePreview]);


  // Keyboard shortcuts - Empty since Undo/Redo removed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Refs to hold latest data for PDF generation without triggering re-renders of the callback
  const latestDataRef = useRef({
    resume: debouncedResume,
    sectionLabels,
    templateId,
    fontFamily,
    order: debouncedSectionOrder
  });

  // Update refs on every render
  useEffect(() => {
    latestDataRef.current = {
      resume: debouncedResume,
      sectionLabels,
      templateId,
      fontFamily,
      order: debouncedSectionOrder
    };
  }, [debouncedResume, sectionLabels, templateId, fontFamily, debouncedSectionOrder]);

  // Render PDF with loading state and auto-cancellation - Memoized
  // Now depends only on stable things + currentPage
  const renderPdf = useCallback(async (page = currentPage) => {
    if (!canvasRef.current || !mainRef.current) return;

    try {
      const { resume, sectionLabels, templateId, fontFamily, order } = latestDataRef.current;

      const resumeData = {
        sectionLabels,
        ...resume as any,
        templateId,
        fontFamily,
        order,
        intent: 'preview'
      };

      // Use hook for automatic request cancellation
      // If a new request comes in, the previous one is auto-cancelled
      const pdfData = await generatePDF(resumeData);

      if (pdfData) {
        await renderPDFPage(pdfData, page);
      }
    } catch (error: any) {
      console.error("Error rendering PDF:", error);
      // Handle 403/401 during preview if they happen despite being 'public'
      if (error?.message?.includes('403')) {
        // router.push('/subscription?returnTo=editor');
      }
    }
  }, [currentPage, generatePDF, renderPDFPage]);

  // Auto-render PDF when data changes
  // Explicitly trigger on data changes, NOT on renderPdf function change
  useEffect(() => {
    // We only want to auto-render when content changes, not when loading states change
    renderPdf();
  }, [debouncedResume, templateId, fontFamily, debouncedSectionOrder, renderPdf]); // Including renderPdf is safe now as it's stable

  // Re-render PDF when switching to mobile preview
  useEffect(() => {
    if (showMobilePreview) {
      // Small delay to ensure container is visible and has dimensions
      setTimeout(() => {
        renderPdf(currentPage);
      }, 100);
    }
  }, [showMobilePreview, currentPage, renderPdf]);

  // Re-render on window resize - renderPdf is memoized
  useLayoutEffect(() => {
    const onResize = () => renderPdf();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [renderPdf]);


  useEffect(() => {
    if (!urlTemplateId) {
      const url = new URL(window.location.href);
      url.searchParams.set('templateId', defaultTemplateId);
      window.history.replaceState({}, '', url.toString());
    }
    // Reset to first page when template changes
    setCurrentPage(1);

    // Re-render PDF with new template
    renderPdf();
  }, [urlTemplateId, defaultTemplateId]);

  const userName = useMemo(() => {
    const name = `${resume?.personalInfo?.firstName || ""} ${resume?.personalInfo?.lastName || ""}`
    return name.trim();
  }, [resume.personalInfo.firstName, resume.personalInfo.lastName]);

  // Memoized handlers for ProfileHeader - prevents re-renders
  const handleDownload = useCallback(async () => {
    handleExport("pdf");
  }, [handleExport]);

  // Hide loading when editor is fully initialized
  useEffect(() => {
    // Check if initial loading is complete
    // Added templatesLoading check
    if (isLoading && !isPdfGenerating && resume && loadingStep >= loadingSteps.length - 1 && !templatesLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Small delay to ensure smooth transition
      return () => clearTimeout(timer);
    }
  }, [isPdfGenerating, resume, loadingStep, loadingSteps.length, isLoading, templatesLoading]);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden gap-2">
      <div className="hidden lg:block">
        <EditorSidebar />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Hirecta Analysis Modal (Initial Loading) */}
        {isLoading && (
          <StepLoader
            loading={isLoading}
            message="Hirecta Editor"
            subMessage={loadingSteps[loadingStep]}
            logoSrc="/logo.png"
            fullScreen={true}
          />
        )}

        {/* Download Loader - similar style to loading screen */}
        {isDownloadingPdf && (
          <StepLoader
            loading={isDownloadingPdf}
            message="Generating Resume"
            subMessage={downloadingSteps[downloadingStep]}
            logoSrc="/logo.png"
            fullScreen={true}
          />
        )}
        {/* Header */}
        <ProfileHeader
          name={userName + "'s Resume"}
          title={resume?.personalInfo?.jobTitle || "Senior Product Designer"}
          progress={progress}
          profileImage={profileImage}
          onProfileImageChange={handleProfileImageChange}
          onDownload={handleDownload}
          onSmartImport={() => setShowSmartImport(true)}
          onTemplateChange={() => setShowTemplates(true)}
          fontFamily={fontFamily}
          onFontChange={setFontFamily}
          onTailor={() => router.push(`/tailor?id=${docId}`)}
        />

        {/* Main Content - Split Glass Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Background Atmosphere */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          {/* Left Section - Form (45%) */}
          <div className={`w-full md:w-[45%] flex flex-col rounded-none md:rounded-lg relative bg-white/50 backdrop-blur-xl border-r border-slate-200/60 overflow-hidden transition-all duration-500 ${showMobilePreview ? 'hidden md:flex' : 'flex'}`}>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
              {showTemplates ? (
                <TemplateSelector
                  apiBase={API_BASE}
                  selectedTemplateId={templateId || ''}
                  onBack={() => setShowTemplates(false)}
                  onSelectTemplate={(template) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('templateId', template._id);
                    router.replace(`?${params.toString()}`, { scroll: false });
                    setTemplateId(template._id);
                  }}
                />
              ) : (
                <GenericForm
                  schema={schema}
                  data={resume}
                  sectionOrder={sectionOrder}
                  setSectionOrder={setSectionOrder}
                  onChange={handleResumeChange}
                  onSchemaChange={setSchema}
                  onSectionNameChange={handleSectionNameChange}
                />
              )}
            </div>
          </div>

          {/* Right Section - Canvas (55%) */}
          <main ref={mainRef} className={`flex-1 relative flex flex-col items-center bg-transparent transition-all duration-500 ${showMobilePreview ? 'flex' : 'hidden md:flex'}`}>

            <div className="flex-1 w-full overflow-y-auto custom-scrollbar flex flex-col items-center bg-slate-100/30 px-4">
              <div className="relative w-full flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={794}
                  height={1123}
                  className="bg-white border-r border-slate-200/60 max-w-full object-contain"
                />
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-3 bg-white p-2 px-4 rounded-full shadow-md border border-slate-200/60 sticky bottom-4 z-10 transition-all duration-300 hover:shadow-lg">
                  <button
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                    className="p-1.5 hover:bg-slate-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-sm text-slate-700 tabular-nums">
                      {currentPage} <span className="text-slate-400 font-normal text-sm mx-1">/</span> {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages}
                    className="p-1.5 hover:bg-slate-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                  </button>
                </div>
              )}
              {/* Overlay when loading */}
              {/* Small loader on canvas (top-right) */}
              {isPdfGenerating && (
                <div className="absolute top-4 right-8 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-slate-200">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-xs font-medium text-slate-600">
                    Saving...
                  </span>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Floating Preview Button - Only visible on mobile */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="md:hidden fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 min-w-[56px] min-h-[56px]"
          aria-label={showMobilePreview ? "Show Form" : "Show Preview"}
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

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden fixed bottom-4 left-4 z-50 bg-white text-slate-700 p-3 md:p-4 rounded-full shadow-lg hover:bg-slate-50 transition-all border-2 border-slate-200 min-w-[56px] min-h-[56px]"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu Panel - Slides up from bottom */}
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowMobileMenu(false)}
            />

            {/* Menu Panel */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Actions</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Tailor My Resume */}
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      router.push('/tailor');
                    }}
                    className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all"
                  >
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />

                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Tailor My Resume</div>
                      <div className="text-xs text-gray-600">AI-powered customization</div>
                    </div>
                  </button>

                  {/* Smart Import */}
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowSmartImport(true);
                    }}
                    className="w-full flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-400 transition-all"
                  >
                    <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Build with AI</div>
                      <div className="text-xs text-gray-600">AI-powered data extraction</div>
                    </div>
                  </button>

                  {/* Change Template */}
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowTemplates(true);
                    }}
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

                  {/* Font Selection */}
                  <div className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M9 3v18m-6-6h18" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900">Font Family</div>
                        <div className="text-xs text-gray-600">Choose your font</div>
                      </div>
                    </div>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}


        {/* Smart Import Modal */}
        <SmartImportModal
          isOpen={showSmartImport}
          mode={mode}
          onClose={() => setShowSmartImport(false)}
          onApply={(data) => {
            // Apply extracted data to resume
            setResume(data);
          }}
        />

        {/* Persistence Notification Dialog */}
        <Dialog
          isOpen={saveDialog.isOpen}
          onClose={() => setSaveDialog(prev => ({ ...prev, isOpen: false }))}
          title={saveDialog.title}
          description={saveDialog.description}
          type={saveDialog.type}
          primaryActionLabel="Got it"
        />
      </div>
    </div>
  );
}

export default function ResumeLayout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-gray-600"></div>
        <StepLoader
          loading={true}
          message="Loading editor..."
          subMessage={'Loading Editor Workspaces...'}
          logoSrc="/logo.png"
          fullScreen={true}
        />
      </div>
    }>
      <ResumeEditor />
    </Suspense>
  );
}
