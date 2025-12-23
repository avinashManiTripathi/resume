"use client";

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { useDebounce, exportToDoc } from "@repo/utils-client";
import { useSearchParams } from "next/navigation";
import { ProfileHeader } from "@repo/ui/profile-header";
import { FormSchema } from "../FieldRenderer";
import GenericForm from "../GenericForm";
import SettingsSidebar from "../SettingsSidebar";
import TemplateSelector from "../TemplateSelector";
import { downloadPdf } from "@repo/utils-client";
import ShareModal from "../ShareModal";

const initialResume = {

  "personalInfo": {
    "firstName": "Avinash Mani",
    "lastName": "Tripathi",
    "jobTitle": "Senior Product Designer",
    "summary": "Product designer with 3+ years of experience in tech industry",
    "email": "olivia@untitledui.com",
    "phone": "+91-7823232322"
  },
  "experience": [
    {
      "jobTitle": "Product Designer",
      "company": "Agworks",
      "startDate": "2021-01",
      "endDate": ""
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Technology",
      "institution": "University of California",
      "startDate": "2015-08",
      "endDate": "2019-05"
    }
  ],
  "skills": [
    { "name": "JavaScript", "level": "Expert" },
    { "name": "React", "level": "Advanced" }
  ]
};

export default function ResumeLayout() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const searchParams = useSearchParams();

  // Get template ID from URL or use default
  const urlTemplateId = searchParams.get('templateId');
  const defaultTemplateId = "692bcfd239561eef09d89aa9";

  // Undo/Redo history
  const [history, setHistory] = useState<any[]>([initialResume]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [resume, setResume] = useState(initialResume);

  // Profile image
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D");

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

  const [schema, setSchema] = useState<FormSchema>({
    personalInfo: {
      label: "Personal Info",
      type: "object",
      isCollapsible: false,
      fields: {
        jobTitle: { label: "Job Title", type: "text", className: "w-full" },
        firstName: { label: "First Name", type: "text", className: "w-[calc(50%-4px)]" },
        lastName: { label: "Last Name", type: "text", className: "w-[calc(50%-4px)]" },
        email: { label: "Email", type: "email", className: "w-[calc(50%-4px)]" },
        phone: { label: "Phone", type: "text", className: "w-[calc(50%-4px)]" },
        summary: { label: "Short Bio", type: "richtext", className: "w-full", description: "Be concise.Write 2-4 shorts and energetic sentences to intreset the recruiter! Mention role,experience and most importantly your biigest achievements best qualities and skills. See Examples for help " }
      }
    },
    experience: {
      label: "Employment History",
      type: "array",
      isCollapsible: true,
      item: {
        jobTitle: { label: "Job Title", type: "text", className: "w-[calc(50%-4px)]" },
        company: { label: "Employer", type: "text", className: "w-[calc(50%-4px)]" },
        startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
        endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" },
        description: { label: "Description", type: "richtext", className: "w-full" }
      }
    },
    education: {
      label: "Education",
      type: "array",
      isCollapsible: true,
      item: {
        degree: { label: "Degree", type: "text", className: "w-[calc(50%-4px)]" },
        institution: { label: "Institution", type: "text", className: "w-[calc(50%-4px)]" },
        startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
        endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" },
        description: { label: "Description", type: "richtext", className: "w-full" }
      }
    },
    projects: {
      label: "Projects",
      type: "array",
      isCollapsible: true,
      item: {
        name: { label: "Project Name", type: "text", className: "w-[calc(50%-4px)]" },
        companyName: { label: "Company Name", type: "text", className: "w-[calc(50%-4px)]" },
        startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
        endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" },
        description: { label: "Description", type: "richtext", className: "w-full" }
      }
    },
    skills: {
      label: "Skills",
      type: "array",
      isCollapsible: true,
      item: {
        name: { label: "Skill Name", type: "text", className: "w-[calc(50%-4px)]" },
        level: {
          label: "Level",
          type: "select",
          options: ["Beginner", "Intermediate", "Advanced", "Expert"],
          className: "w-[calc(50%-4px)]"
        }
      }
    }
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [templateId, setTemplateId] = useState(urlTemplateId || defaultTemplateId);

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

  const apiUrl = `${API_BASE}/convert-html-to-pdf`;

  // Undo/Redo functions
  const addToHistory = (newState: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newState)));
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

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

  // Handle resume changes with history
  const handleResumeChange = (newResume: any) => {
    setResume(newResume);
    addToHistory(newResume);
  };

  // Handle profile image change
  const handleProfileImageChange = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  const handleExport = (format: "pdf" | "doc") => {
    if (format === "pdf") {
      const resumeData = {
        templateId,
        ...resume,
        order: sectionOrder
      };

      downloadPdf(apiUrl, "resume", resumeData);
    } else {
      const content = mainRef.current?.innerHTML || "";
      exportToDoc(content, `${resume?.personalInfo?.firstName}_Resume.doc`);
    }
  };

  const renderPdf = async (page = currentPage) => {
    if (!mainRef.current) return;

    const requestId = ++requestIdRef.current;
    const resumeData = {
      templateId,
      ...resume,
      order: debouncedSectionOrder
    };

    const res = await fetch(`${API_BASE}/convert-html-to-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resumeData),
    });

    if (requestId !== requestIdRef.current) return;

    const pdfData = await res.arrayBuffer();
    const pdfjsLib = (window as any).pdfjsLib;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    setTotalPages(pdf.numPages);

    const safePage = Math.min(Math.max(page, 1), pdf.numPages);
    const pdfPage = await pdf.getPage(safePage);

    const containerWidth = mainRef.current.clientWidth;
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

    await renderTaskRef.current.promise;
    if (requestId !== requestIdRef.current) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = offscreen.width;
    canvas.height = offscreen.height;

    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(offscreen, 0, 0);
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
      // Page navigation
      else if (e.key === 'ArrowUp' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'ArrowDown' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        nextPage();
      }
      // Zoom
      else if ((e.metaKey || e.ctrlKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        zoomIn();
      } else if ((e.metaKey || e.ctrlKey) && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        zoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, currentPage, totalPages, zoomLevel]);

  useEffect(() => {
    renderPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedResume, currentPage, debouncedSectionOrder, templateId, zoomLevel]);

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
  }, [templateId]);





  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <ProfileHeader
        name={`${resume?.personalInfo?.firstName || "Avinash Mani"} ${resume?.personalInfo?.lastName || "Tripathi"}'s Resume`}
        title={resume?.personalInfo?.jobTitle || "Senior Product Designer"}
        progress={50}
        profileImage={profileImage}
        onProfileImageChange={handleProfileImageChange}
        onShare={() => setShowShareModal(true)}
        onDownload={() => {
          const resumeData = {
            templateId,
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
      <div className="flex flex-1 overflow-hidden gap-2 mr-[10px] ml-[10px]">
        {/* Left Sidebar - Form or Template Selector (40%) */}
        <aside className="w-[40%] rounded-lg bg-white border-r border-gray-200 overflow-y-auto">
          {showTemplates ? (
            <TemplateSelector
              apiBase={API_BASE || 'http://localhost:4000'}
              selectedTemplateId={templateId}
              onBack={() => setShowTemplates(false)}
              onSelectTemplate={(template) => {
                console.log('Selected template:', template);
                setTemplateId(template.id);
                // Don't close template selector - user must click back button
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
            />
          )}
        </aside>

        {/* Center Canvas - Preview (60% minus right sidebar) */}
        <main ref={mainRef} className="flex-1 rounded-lg overflow-y-auto bg-gray-100 flex justify-center py-8 px-4">
          <div className="bg-white shadow-lg">
            <canvas ref={canvasRef} />
          </div>
        </main>

        {/* Right Sidebar - Settings */}
        <SettingsSidebar
          onExport={handleExport}
          onTemplateChange={() => setShowTemplates(true)}
        />
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        resumeUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  );
}
