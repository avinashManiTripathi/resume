"use client";


import { useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback, Suspense } from "react";
import { useDebounce, exportToDoc, canDownload, type SubscriptionTier, API_ENDPOINTS } from "@repo/utils-client";
import { useTemplates } from "@repo/hooks/useTemplate";
import { useSearchParams, useRouter } from "next/navigation";
import { ProfileHeader } from "@repo/ui/profile-header";
import { FormSchema, SectionSchema, BaseField } from "../FieldRenderer";
import GenericForm from "../GenericForm";
import TemplateSelector from "../TemplateSelector";
import { saveBlobAsPdf } from "@repo/utils-client";
import { useAppNetwork } from "../../hooks/useAppNetwork";
import SmartImportModal from "../SmartImportModal";
import { Dialog } from "@repo/ui/dialog";
import { CloudCheck, FileText, Brain, Sparkles, Target, Zap, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyData, ResumeFormSchema, ResumeData, PersonalInfo } from "../constants";
import { usePostArrayBuffer } from "@repo/hooks/network";
import { usePersistence } from "../hooks/usePersistence";
import { useResumeDownload } from "../hooks/useResumeDownload";
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
  // Persistence - TemplateId is now the key
  const { saveDocument, getDocument, getResumeByTemplate, isLoggedIn, subscription, setSubscription, refreshSubscription } = usePersistence();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  // Track if data has been loaded from the backend/local storage to prevent overwriting with empty state
  const [isLoaded, setIsLoaded] = useState(false);

  // Track last saved state to prevent auto-saving on load
  const lastSavedDataRef = useRef<string>(JSON.stringify({}));
  const lastSavedFontRef = useRef<string>('Inter');
  // Track last saved template to detect switches
  const lastSavedTemplateIdRef = useRef<string | null>(null);

  // State
  // const [resume, setResume] = useState<ResumeData>(dummyData);
  // State
  const [resume, setResume] = useState<Partial<ResumeData>>({});
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
          if (parsed.templateId) setTemplateId(parsed.templateId);
          if (parsed.fontFamily) setFontFamily(parsed.fontFamily);
          if (parsed.sectionOrder) setSectionOrder(parsed.sectionOrder);

          console.log('[Editor] Resume state restored');
          sessionStorage.removeItem('redirect_resume_data');

          // Update URL to match restored state but KEEP subscribed param
          const url = new URL(window.location.href);
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


  // Load data by templateId (not by docId)
  useEffect(() => {
    const loadData = async () => {
      setIsLoaded(false);

      // Always load by current templateId
      if (templateId) {
        // If we already loaded data and just switched templates, DON'T fetch fresh data.
        // We want to carry over the existing data to the new template.
        if (isLoaded) return;

        try {
          // First check sessionStorage for unsaved drafts (highest priority for recovery)
          const cacheKey = `editor_draft_${templateId}`;
          const cached = sessionStorage.getItem(cacheKey);

          if (cached) {
            const parsed = JSON.parse(cached);
            console.log('[Editor] Recovered draft for template:', templateId);
            if (parsed.resume && Object.keys(parsed.resume).length > 0) {
              setResume(parsed.resume);
              if (parsed.fontFamily) {
                setFontFamily(parsed.fontFamily);
                lastSavedFontRef.current = parsed.fontFamily;
              }
              if (parsed.profileImage) setProfileImage(parsed.profileImage);

              // Set reference to loaded data so we don't auto-save it immediately
              lastSavedDataRef.current = JSON.stringify(parsed.resume);

              setIsLoaded(true);
              return;
            }
          }

          // If no draft, check backend/localStorage via persistence hook
          const savedDoc = await getResumeByTemplate(templateId);

          if (savedDoc) {
            console.log('[Editor] Loaded saved data for template:', templateId);
            setResume(savedDoc.data || {});
            if (savedDoc.data?.personalInfo?.profileImage) {
              setProfileImage(savedDoc.data.personalInfo.profileImage);
            }
            if (savedDoc.data?.fontFamily) {
              setFontFamily(savedDoc.data.fontFamily);
              lastSavedFontRef.current = savedDoc.data.fontFamily;
            }

            // Set reference to loaded data so we don't auto-save it immediately
            lastSavedDataRef.current = JSON.stringify(savedDoc.data || {});
            // Set initial template ref so we know if it changes later
            lastSavedTemplateIdRef.current = templateId;
          } else {
            console.log('[Editor] No data found for template:', templateId, '- starting fresh');
            // Only start fresh if we truly found nothing
            setResume({});
          }
        } catch (error) {
          console.error('Failed to load template data:', error);
          setResume({});
        }
      }

      setIsLoaded(true);
    };

    loadData();
  }, [templateId, isLoggedIn, network]);

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
              const prevPersonal = prev.personalInfo;
              const newPersonal = parsedData.personalInfo || {};
              merged.personalInfo = {
                ...newPersonal,
                // Keep existing profile image if the new one doesn't have it (likely)
                profileImage: newPersonal.profileImage || prevPersonal.profileImage,
                // Keep other fields if missing in new data but present in old
                firstName: newPersonal.firstName || prevPersonal.firstName,
                lastName: newPersonal.lastName || prevPersonal.lastName,
                email: newPersonal.email || prevPersonal.email,
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

  // Auto-save logic - uses templateId as key (not docId)
  const handleAutoSave = useCallback(async (dataToSave: Partial<ResumeData>) => {
    if (!dataToSave || !templateId) return;
    setIsSaving(true);
    const title = `${dataToSave.personalInfo?.firstName || 'Untitled'} ${dataToSave.personalInfo?.lastName || 'Resume'}`.trim();

    const result = await saveDocument({
      title,
      type: 'resume',
      templateId: templateId, // Template is the key
      data: { ...dataToSave, fontFamily: fontFamily || 'Inter' }
    });

    if (result.success) {
      setLastSaved(new Date());
      // No need to update URL or docId anymore

      if (result.storage === 'local' && !sessionStorage.getItem('persistence_popup_shown')) {
        sessionStorage.setItem('persistence_popup_shown', 'true');
      }
    }
    setIsSaving(false);
  }, [templateId, saveDocument, fontFamily]);

  // Debounced auto-save
  useEffect(() => {
    // Prevent saving if we haven't loaded the initial data yet
    if (!isLoaded) return;

    // Check if data has actually changed from what we last loaded/saved
    const currentDataString = JSON.stringify(debouncedResume);
    const hasDataChanged = currentDataString !== lastSavedDataRef.current;
    const hasFontChanged = fontFamily !== lastSavedFontRef.current;
    const hasTemplateChanged = templateId !== lastSavedTemplateIdRef.current;

    // Only save if there's a real change OR template changed (cloning data to new template)
    if (hasDataChanged || hasFontChanged || hasTemplateChanged) {
      console.log('[AutoSave] Changes detected (Data/Font/Template), saving...');
      handleAutoSave(debouncedResume);

      // Update refs to current state
      lastSavedDataRef.current = currentDataString;
      lastSavedFontRef.current = fontFamily;
      lastSavedTemplateIdRef.current = templateId || null;
    }
  }, [debouncedResume, fontFamily, templateId, handleAutoSave, isLoaded]);

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
  const renderTaskRef = useRef<{ cancel: () => void; promise: Promise<void> } | null>(null);
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
      const exp = resume.experience[0];
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
  const handleResumeChange = useCallback((newResume: Partial<ResumeData>) => {
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
    setResume(prev => {
      // Create a new personalInfo object ensuring we don't spread undefined
      const currentPersonalInfo = prev.personalInfo || {} as Partial<PersonalInfo>;

      return {
        ...prev,
        personalInfo: {
          ...currentPersonalInfo,
          profileImage: imageUrl,
        }
      };
    });
  }, []);

  // Handle export
  const handleExport = useCallback(async (format: "pdf" | "doc") => {
    const firstName = resume?.personalInfo?.firstName || "";
    const lastName = resume?.personalInfo?.lastName || "";
    const jobTitle = resume?.personalInfo?.jobTitle || "";
    const userName = `${firstName}_${lastName}_${jobTitle}`;
    const fileName = userName.trim().replace(/\s+/g, "_");

    // Check if user is logged in
    if (!isLoggedIn) {
      sessionStorage.setItem('pending_download', format);
      const authUrl = ENV.AUTH_URL;
      window.location.href = `${authUrl}?redirect=${encodeURIComponent(window.location.href)}`;
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
        sectionOrder
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

      } catch (error: unknown) {
        console.error("PDF download error:", error);

        // Handle 403/401 errors
        // Check typically error.status or error.response.status depending on the network client implementation
        const status = (error as any)?.status || (error as any)?.response?.status;

        if (status === 403) {
          // Save state for return
          const stateToSave = {
            resume,
            templateId,
            fontFamily,
            sectionOrder
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
  }, [isLoggedIn, router, templateId, sectionLabels, fontFamily, resume, sectionOrder, apiUrl, subscription]);


  // Auto-download hook - Encapsulated logic for performance
  useResumeDownload({
    isLoggedIn: isLoggedIn ?? false,
    subscription,
    refreshSubscription,
    handleExport,
    canDownload
  });



  // Auto-populate form schema with custom sections when data exists
  useEffect(() => {
    if (!resume) return;

    // Type guard for customSections
    const resumeWithCustom = resume as ResumeData;
    if (!resumeWithCustom.customSections) return;

    const currentSections = Object.keys(schema);
    const sectionsToAdd: Record<string, SectionSchema> = {};

    resumeWithCustom.customSections.forEach((section) => {
      if (section.items && section.items.length > 0) {
        // Check if section already exists in schema
        if (!currentSections.includes(section.id)) {
          // Convert fieldDefinitions to the schema format
          const itemFields: Record<string, BaseField> = {};

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

    // Use extended Window interface locally to avoid 'any'
    interface PdfWindow extends Window {
      pdfjsLib: any; // External lib without types
    }
    const pdfjsLib = (window as unknown as PdfWindow).pdfjsLib;

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
      if (renderTaskRef.current) {
        await renderTaskRef.current.promise;
      }
    } catch (e: unknown) {
      if ((e as { name?: string })?.name === "RenderingCancelledException") return;
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
  const latestDataRef = useRef<{ resume: Partial<ResumeData>, sectionLabels: Record<string, string>, templateId: string | null, fontFamily: string, order: string[] }>({
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
        ...(resume as ResumeData),
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
    } catch (error: unknown) {
      console.error("Error rendering PDF:", error);
      // Handle 403/401 during preview if they happen despite being 'public'
      if ((error as any)?.message?.includes('403')) {
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
  }, [resume?.personalInfo?.firstName, resume?.personalInfo?.lastName]);

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
          onTailor={() => router.push(`/tailor`)}
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
