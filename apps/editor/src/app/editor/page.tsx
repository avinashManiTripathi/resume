"use client";

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { useDebounce, exportToDoc, canDownload, setSubscription, getSubscription, type SubscriptionTier } from "@repo/utils-client";
import { useSearchParams, useRouter } from "next/navigation";
import { ProfileHeader } from "@repo/ui/profile-header";
import { FormSchema } from "../FieldRenderer";
import GenericForm from "../GenericForm";
import SettingsSidebar from "../SettingsSidebar";
import TemplateSelector from "../TemplateSelector";
import { downloadPdf } from "@repo/utils-client";
import ShareModal from "../ShareModal";
import { CloudCheck } from "lucide-react";

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

const dummyData = {
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Senior Software Engineer",
    "summary": "Experienced software engineer with 8+ years of expertise in building scalable web applications, leading cross-functional teams, and delivering high-quality products using modern technologies. Passionate about clean code, system architecture, and mentoring junior developers.",
    "email": "john.doe@email.com",
    "phone": "+1 (555) 123-4567"
  },
  "experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Solutions Inc.",
      "startDate": "2021-01",
      "endDate": "",
      "description": "Led development of enterprise web applications using React and Node.js. Optimized system performance by 30%, mentored 5 junior developers, and collaborated with product teams to deliver new features. Implemented CI/CD pipelines and improved code quality through testing."
    },
    {
      "jobTitle": "Software Engineer",
      "company": "Digital Labs",
      "startDate": "2018-06",
      "endDate": "2020-12",
      "description": "Developed REST APIs and microservices, implemented responsive UI components using React, and improved code quality through unit testing and peer reviews. Reduced API response time by 40% through optimization."
    }
  ],
  "education": [
    {
      "degree": "Master of Science in Computer Science",
      "institution": "Stanford University",
      "startDate": "2016-09",
      "endDate": "2018-05"
    },
    {
      "degree": "Bachelor of Technology in Computer Engineering",
      "institution": "University of California, Berkeley",
      "startDate": "2012-08",
      "endDate": "2016-05"
    }
  ],
  "projects": [
    {
      "name": "Resume Builder Platform",
      "startDate": "2023-03",
      "endDate": "2023-08",
      "description": "Built a dynamic resume builder with multiple templates, real-time preview, and PDF export using React, Next.js, and Tailwind CSS. Implemented drag-and-drop functionality and template customization features."
    },
    {
      "name": "E-Commerce Dashboard",
      "startDate": "2022-01",
      "endDate": "2022-05",
      "description": "Designed and developed an admin dashboard with analytics, order management, and role-based access control using React, TypeScript, and Chart.js. Integrated with REST APIs and implemented real-time updates."
    }
  ],
  "skills": [
    { "name": "JavaScript", "level": "Expert" },
    { "name": "TypeScript", "level": "Advanced" },
    { "name": "React", "level": "Expert" },
    { "name": "Node.js", "level": "Advanced" },
    { "name": "Next.js", "level": "Advanced" },
    { "name": "Tailwind CSS", "level": "Advanced" },
    { "name": "MongoDB", "level": "Intermediate" },
    { "name": "PostgreSQL", "level": "Intermediate" },
    { "name": "Docker", "level": "Intermediate" },
    { "name": "AWS", "level": "Intermediate" }
  ],
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "date": "2022-06"
    },
    {
      "name": "Google Cloud Professional Developer",
      "issuer": "Google Cloud",
      "date": "2021-09"
    }
  ],
  "languages": [
    { "name": "English", "proficiency": "Native" },
    { "name": "Spanish", "proficiency": "Intermediate" },
    { "name": "French", "proficiency": "Basic" }
  ],
  "awards": [
    {
      "title": "Employee of the Year",
      "organization": "Tech Solutions Inc.",
      "date": "2023-12",
      "description": "Recognized for outstanding contributions to product development and team leadership."
    },
    {
      "title": "Innovation Award",
      "organization": "Digital Labs",
      "date": "2020-06",
      "description": "Awarded for developing innovative solutions that improved system performance."
    }
  ]
};

export default function ResumeLayout() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get template ID from URL or use default
  const urlTemplateId = searchParams.get('templateId');
  const defaultTemplateId = "692bcfd239561eef09d89aa9";

  // Undo/Redo history
  const [history, setHistory] = useState<any[]>([initialResume]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [resume, setResume] = useState(initialResume);

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
    // Check subscription before allowing download
    if (!canDownload()) {
      // Redirect to subscription page instead of showing modal
      router.push('/subscription?returnTo=editor');
      return;
    }

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


  const fillDummyData = () => {
    const newData = JSON.parse(JSON.stringify(dummyData));
    setResume(newData);
    addToHistory(newData);
  };

  const renderPDFPage = async (pdfData: ArrayBuffer, page: number) => {
    if (!mainRef.current || !canvasRef.current) return;

    const requestId = ++requestIdRef.current;
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history]);

  // Render PDF with loading state
  const renderPdf = async (page = currentPage) => {
    if (!canvasRef.current || !mainRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const resumeData = {
        templateId,
        ...resume,
        order: debouncedSectionOrder
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      const pdfData = await response.arrayBuffer();
      await renderPDFPage(pdfData, page);
    } catch (error) {
      console.error("Error rendering PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

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
      <div className="flex flex-1 overflow-hidden gap-1">
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
            <div className="h-full flex flex-col">
              {/* Fill Dummy Data Button */}
              {/* <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <button
                  onClick={fillDummyData}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Fill with Dummy Data</span>
                </button>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Instantly populate all fields with sample data for testing
                </p>
              </div> */}

              {/* Form */}
              <div className="flex-1 overflow-y-auto">
                <GenericForm
                  schema={schema}
                  data={resume}
                  sectionOrder={sectionOrder}
                  setSectionOrder={setSectionOrder}
                  onChange={handleResumeChange}
                  onSchemaChange={setSchema}
                />
              </div>
            </div>
          )}
        </aside>

        {/* Center Canvas - Preview (60% minus right sidebar) */}
        <main ref={mainRef} className="flex-1 relative rounded-lg overflow-y-auto bg-gray-100 py-8">
          {/* Save Progress Indicator */}
          <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none z-10">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200 pointer-events-auto">
              {isGeneratingPDF ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-gray-600 leading-none">Saving...</span>
                </>
              ) : (
                <>
                  <CloudCheck size={14} className="text-green-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600 leading-none">Saved</span>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white shadow-lg">
              <canvas
                ref={canvasRef}
                width={794}
                height={1123}
                className="max-w-full h-auto"
              />
            </div>
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
