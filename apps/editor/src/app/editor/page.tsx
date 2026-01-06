"use client";


import { useEffect, useLayoutEffect, useRef, useState, useMemo, Suspense } from "react";
import { useDebounce, exportToDoc, canDownload, setSubscription, getSubscription, type SubscriptionTier } from "@repo/utils-client";
import { useSearchParams, useRouter } from "next/navigation";
import { ProfileHeader } from "@repo/ui/profile-header";
import { FormSchema } from "../FieldRenderer";
import GenericForm from "../GenericForm";
import SettingsSidebar from "../SettingsSidebar";
import TemplateSelector from "../TemplateSelector";
import { downloadPdf } from "@repo/utils-client";
import ShareModal from "../ShareModal";
import SmartImportModal from "../SmartImportModal";
import { CloudCheck } from "lucide-react";
import { dummyData, ResumeFormSchema } from "../constants";


function ResumeEditor() {
  const API_BASE = "http://localhost:4000"
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get template ID from URL or use default
  const urlTemplateId = searchParams.get('templateId');
  const defaultTemplateId = "6959f1c2de127e0f17295492";

  // Undo/Redo history
  const [history, setHistory] = useState<any[]>([dummyData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [resume, setResume] = useState(dummyData);

  // Profile image
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D");

  // Loading state for PDF generation
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Check subscription on mount - redirect if no active subscription
  useEffect(() => {
    const subscription = getSubscription();
    const fromSubscription = searchParams.get('fromSubscription');

    // Skip check if user just came from subscription page
    if (fromSubscription === 'true') {
      // Clean up URL parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('fromSubscription');
      window.history.replaceState({}, '', url.toString());
      return;
    }

    // Redirect to subscription page if no subscription exists
    // if (!subscription) {
    //   router.push('/subscription?returnTo=editor');
    // }
  }, [router, searchParams]);

  // Check for resume data from tailor page
  useEffect(() => {
    const fromTailor = searchParams.get('fromTailor');
    if (fromTailor === 'true') {
      try {
        // Get data from sessionStorage
        const storedData = sessionStorage.getItem('parsedResumeData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          console.log('Loading resume data from sessionStorage:', parsedData);

          // Update resume state with parsed data
          setResume(parsedData);

          // Reset history with new data
          setHistory([parsedData]);
          setHistoryIndex(0);

          // Clean up sessionStorage and URL parameter
          sessionStorage.removeItem('parsedResumeData');
          const url = new URL(window.location.href);
          url.searchParams.delete('fromTailor');
          window.history.replaceState({}, '', url.toString());

          console.log('Resume data loaded successfully');
        }
      } catch (error) {
        console.error('Failed to load resume data from sessionStorage:', error);
      }
    }
  }, [searchParams]);

  const [schema, setSchema] = useState<FormSchema>(ResumeFormSchema);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSmartImport, setShowSmartImport] = useState(false);
  const [templateId, setTemplateId] = useState(urlTemplateId || defaultTemplateId);
  const [fontFamily, setFontFamily] = useState('Inter');

  const debouncedResume = useDebounce(resume, 500);

  // Initialize section order based on schema keys
  const initialSectionOrder = useMemo(() => Object.keys(schema), []);
  const [sectionOrder, setSectionOrder] = useState<string[]>(initialSectionOrder);
  const debouncedSectionOrder = useDebounce(sectionOrder, 500);

  // Page navigation
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Zoom control
  const [zoomLevel, setZoomLevel] = useState(100);
  const zoomLevels = [50, 75, 100, 125, 150, 200];

  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null); // For cancelling PDF requests

  const apiUrl = `${API_BASE}/convert-html-to-pdf`;


  // Calculate dynamic progress based on resume completion
  const calculateProgress = () => {
    let totalFields = 0;
    let filledFields = 0;

    // Personal Info (6 fields)
    if (resume?.personalInfo) {
      const personalFields = ['firstName', 'lastName', 'email', 'phone', 'jobTitle', 'summary'] as const;
      personalFields.forEach(field => {
        totalFields++;
        const value = resume.personalInfo?.[field];
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
  };

  const progress = calculateProgress();


  // Add to history
  const addToHistory = (newData: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newData);
    if (newHistory.length > 50) newHistory.shift(); // Keep original history limit
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Handle section name changes
  const handleSectionNameChange = (sectionKey: string, newLabel: string) => {
    const updatedSchema = {
      ...schema,
      [sectionKey]: {
        ...schema[sectionKey],
        label: newLabel
      }
    };
    setSchema(updatedSchema);
  };

  // Handle resume changes with history
  const handleResumeChange = (newResume: any) => {
    setResume(newResume);
    addToHistory(newResume);
  };

  // Undo/Redo functions
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setResume(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setResume(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  // Page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Zoom controls
  const zoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex < zoomLevels.length - 1) {
      setZoomLevel(zoomLevels[currentIndex + 1]);
    }
  };

  const zoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex > 0) {
      setZoomLevel(zoomLevels[currentIndex - 1]);
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (imageUrl: string) => {
    setProfileImage(imageUrl);
    // Save to resume data so it's sent to backend
    setResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        profileImage: imageUrl
      }
    }));
  };

  const handleExport = (format: "pdf" | "doc") => {
    // Check subscription before allowing download
    if (!canDownload()) {
      // Redirect to subscription page instead of showing modal
      router.push('/subscription?returnTo=editor');
      return;
    }

    if (format === "pdf") {
      // Extract section labels from schema
      const sectionLabels = Object.entries(schema).reduce((acc, [key, config]) => {
        acc[key] = config.label;
        return acc;
      }, {} as Record<string, string>);

      const resumeData = {
        templateId,
        sectionLabels,
        ...resume,
        order: sectionOrder
      };

      downloadPdf(apiUrl, "resume", resumeData);
    } else {
      const content = mainRef.current?.innerHTML || "";
      exportToDoc(content, `${resume?.personalInfo?.firstName}_Resume.doc`);
    }
  };

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
                className: 'w-[calc(50%-4px)]'
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

  const renderPDFPage = async (pdfData: ArrayBuffer, page: number) => {
    if (!mainRef.current || !canvasRef.current) return;

    // Skip rendering if container is not visible (e.g., hidden on mobile)
    const containerWidth = mainRef.current.clientWidth;
    if (containerWidth === 0) {
      console.log('Container not visible, skipping PDF render');
      return;
    }

    const requestId = ++requestIdRef.current;
    const pdfjsLib = (window as any).pdfjsLib;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    setTotalPages(pdf.numPages);

    const safePage = Math.min(Math.max(page, 1), pdf.numPages);
    const pdfPage = await pdf.getPage(safePage);

    const dpr = window.devicePixelRatio || 1;
    const baseViewport = pdfPage.getViewport({ scale: 1 });

    // Apply zoom level
    const scale = (containerWidth / baseViewport.width) * (zoomLevel / 100);
    const viewport = pdfPage.getViewport({ scale });

    const offscreen = offscreenRef.current ?? document.createElement("canvas");
    offscreenRef.current = offscreen;

    offscreen.width = viewport.width * dpr;
    offscreen.height = viewport.height * dpr;

    const offCtx = offscreen.getContext("2d")!;
    offCtx.setTransform(1, 0, 0, 1, 0, 0);
    offCtx.scale(dpr, dpr);

    if (renderTaskRef.current) renderTaskRef.current.cancel();

    renderTaskRef.current = pdfPage.render({
      canvasContext: offCtx,
      viewport,
    });

    try {
      await renderTaskRef.current.promise;
    } catch (error: any) {
      // Ignore cancellation errors - they're expected when we cancel old renders
      if (error.name === 'RenderingCancelledException') {
        return;
      }
      throw error; // Re-throw other errors
    }

    if (requestId !== requestIdRef.current) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = offscreen.width;
    canvas.height = offscreen.height;

    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Guard against 0-dimension canvas on mobile
    if (offscreen.width > 0 && offscreen.height > 0) {
      ctx.drawImage(offscreen, 0, 0);
    } else {
      console.warn('Skipping drawImage: offscreen canvas has invalid dimensions');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history]);

  // Render PDF with loading state
  const renderPdf = async (page = currentPage) => {
    if (!canvasRef.current || !mainRef.current) return;

    // Abort previous pending request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsGeneratingPDF(true);
    try {
      const apiUrl = `${API_BASE}/convert-html-to-pdf`;

      // Extract section labels from schema
      const sectionLabels = Object.entries(schema).reduce((acc, [key, config]) => {
        acc[key] = config.label;
        return acc;
      }, {} as Record<string, string>);

      const resumeData = {
        templateId,
        sectionLabels, // Include custom section labels
        fontFamily, // Include font family
        ...debouncedResume as any,
        order: debouncedSectionOrder
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
        signal: abortController.signal // Attach abort signal
      });

      const pdfData = await response.arrayBuffer();
      await renderPDFPage(pdfData, page);
    } catch (error: any) {
      // Ignore abort errors - they're expected when we cancel requests
      if (error.name === 'AbortError') {
        console.log('PDF request cancelled');
        return;
      }
      console.error("Error rendering PDF:", error);
    } finally {
      // Only clear loading if this is still the current request
      if (abortControllerRef.current === abortController) {
        setIsGeneratingPDF(false);
        abortControllerRef.current = null;
      }
    }
  };

  useEffect(() => {
    renderPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedResume, currentPage, debouncedSectionOrder, templateId, zoomLevel, schema, fontFamily]);

  // Re-render PDF when switching to mobile preview
  useEffect(() => {
    if (showMobilePreview) {
      // Small delay to ensure container is visible and has dimensions
      setTimeout(() => {
        renderPdf(currentPage);
      }, 100);
    }
  }, [showMobilePreview]);

  useLayoutEffect(() => {
    const onResize = () => renderPdf();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Update URL when template changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('templateId', templateId);
    window.history.replaceState({}, '', url.toString());
    // Re-render PDF with new template
    renderPdf();
  }, [templateId]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <ProfileHeader
        name={`${resume?.personalInfo?.firstName || "Avinash Mani"} ${resume?.personalInfo?.lastName || "Tripathi"}'s Resume`}
        title={resume?.personalInfo?.jobTitle || "Senior Product Designer"}
        progress={progress}
        profileImage={profileImage}
        onProfileImageChange={handleProfileImageChange}
        onShare={() => setShowShareModal(true)}
        onDownload={() => {
          // Check subscription before allowing download
          if (!canDownload()) {
            // Redirect to subscription page instead of showing modal
            router.push('/subscription?returnTo=editor');
            return;
          }

          // Extract section labels from schema
          const sectionLabels = Object.entries(schema).reduce((acc, [key, config]) => {
            acc[key] = config.label;
            return acc;
          }, {} as Record<string, string>);

          const resumeData = {
            templateId,
            sectionLabels,
            fontFamily,
            ...resume,
            order: sectionOrder
          };
          downloadPdf(apiUrl, "resume", resumeData);
        }}
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        zoomLevel={zoomLevel}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />

      {/* Main Content - 3 Column Layout */}
      <div className="flex flex-1 overflow-hidden gap-2 md:mx-[10px] mx-0">
        {/* Left Sidebar - Form or Template Selector (40%) - Hidden on mobile when preview is shown */}
        <aside className={`w-full md:w-[40%] relative md:rounded-lg bg-white md:border-r border-gray-200 overflow-y-auto ${showMobilePreview ? 'hidden md:block' : 'block'}`}>

          {/* Save Progress Indicator */}
          <div className="absolute top-4 md:top-6 right-2 md:right-4 flex justify-center pointer-events-none z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              {isGeneratingPDF ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-semibold text-blue-700 leading-none">Saving...</span>
                </>
              ) : (
                <>
                  <CloudCheck size={14} className="text-blue-700 flex-shrink-0" />
                  <span className="text-xs font-semibold text-blue-700 leading-none">Saved</span>
                </>
              )}
            </div>
          </div>


          {showTemplates ? (
            <TemplateSelector
              apiBase={API_BASE || 'http://localhost:4000'}
              selectedTemplateId={templateId}
              onBack={() => setShowTemplates(false)}
              onSelectTemplate={(template) => {
                console.log('Selected template:', template);
                setTemplateId(template._id);
                // Don't close template selector - user must click back button
              }}
            />
          ) : (
            <div className="h-full flex flex-col">

              {/* Form */}
              <div className="flex-1 overflow-y-auto">
                <GenericForm
                  schema={schema}
                  data={resume}
                  sectionOrder={sectionOrder}
                  setSectionOrder={setSectionOrder}
                  onChange={handleResumeChange}
                  onSchemaChange={setSchema}
                  onSectionNameChange={handleSectionNameChange}
                />
              </div>
            </div>
          )}
        </aside>

        {/* Center Canvas - Preview (60% minus right sidebar) - Hidden on mobile unless preview is shown */}
        <main ref={mainRef} className={`flex-1 relative md:rounded-lg overflow-y-auto bg-gray-100 ${showMobilePreview ? 'block' : 'md:block'} ${!showMobilePreview ? 'opacity-0 pointer-events-none absolute md:relative md:opacity-100 md:pointer-events-auto' : ''}`}>


          <div className="flex justify-center py-4 md:py-0">
            <div className="bg-white shadow-lg w-full md:w-auto">
              <canvas
                ref={canvasRef}
                width={794}
                height={1123}
                className="w-full md:max-w-full h-auto"
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Settings - Hidden on mobile */}
        <aside className="hidden lg:block">
          <SettingsSidebar
            onExport={handleExport}
            onTemplateChange={() => setShowTemplates(true)}
            onSmartImport={() => setShowSmartImport(true)}
            fontFamily={fontFamily}
            onFontChange={setFontFamily}
          />
        </aside>
      </div>

      {/* Floating Preview Button - Only visible on mobile */}
      <button
        onClick={() => setShowMobilePreview(!showMobilePreview)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
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
        className="md:hidden fixed bottom-6 left-6 z-50 bg-white text-gray-700 p-4 rounded-full shadow-lg hover:bg-gray-50 transition-all border-2 border-gray-200"
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
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Tailor My Resume</div>
                    <div className="text-xs text-gray-600">AI-powered customization</div>
                  </div>
                </button>

                {/* Change Template */}
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowSmartImport(true);
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Smart Import</div>
                    <div className="text-xs text-gray-600">AI-powered data extraction</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowTemplates(true);
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Change Template</div>
                    <div className="text-xs text-gray-600">Choose a new design</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        resumeUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />

      {/* Smart Import Modal */}
      <SmartImportModal
        isOpen={showSmartImport}
        onClose={() => setShowSmartImport(false)}
        onApply={(data) => {
          // Apply extracted data to resume
          setResume(data);
          // Add to history
          addToHistory(data);
        }}
      />
    </div>
  );
}

export default function ResumeLayout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading editor...</div>
      </div>
    }>
      <ResumeEditor />
    </Suspense>
  );
}
