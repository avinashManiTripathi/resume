"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDebounce, exportToPdf, exportToDoc } from "@repo/utils-client";
import { ProfileHeader } from "@repo/ui/profile-header";
import { FormSchema } from "./FieldRenderer";
import GenericForm from "./GenericForm";
import SettingsSidebar from "./SettingsSidebar";
import TemplateSelector from "./TemplateSelector";
import { downloadPdf } from "@repo/utils-client";

export const resumeSchema: FormSchema = {
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
};

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
  ],
};

export default function ResumeLayout() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [resume, setResume] = useState(initialResume);
  const [schema, setSchema] = useState(resumeSchema);
  const [showTemplates, setShowTemplates] = useState(false);
  const debouncedResume = useDebounce(resume, 500);
  const [sectionOrder, setSectionOrder] = useState<string[]>(Object.keys(schema));


  const [totalPages, setTotalPages] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const requestIdRef = useRef(0);

  const apiUrl = `${API_BASE}/convert-html-to-pdf`

  const handleExport = (format: "pdf" | "doc") => {
    if (format === "pdf") {
      const resumeData = {
        ...resume,
        order: sectionOrder
      }

      downloadPdf(apiUrl, "resume", resumeData);
    } else {
      const content = mainRef.current?.innerHTML || "";
      exportToDoc(content, `${resume?.personalInfo?.firstName}_Resume.doc`);
    }
  };

  const renderPdf = async (page = pageCount) => {
    if (!mainRef.current) return;

    const requestId = ++requestIdRef.current;
    const resumeData = {
      ...resume,
      order: sectionOrder
    }

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
    const scale = containerWidth / baseViewport.width;
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

  useEffect(() => {
    renderPdf();
  }, [debouncedResume, pageCount, sectionOrder]);

  useLayoutEffect(() => {
    const onResize = () => renderPdf();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);




  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <ProfileHeader
        name={`${resume?.personalInfo?.firstName || "Avinash Mani"} ${resume?.personalInfo?.lastName || "Tripathi"}'s Resume`}
        title={resume?.personalInfo?.jobTitle || "Senior Product Designer"}
        progress={50}
        onShare={() => console.log("Share")}
        onDownload={() => downloadPdf(apiUrl, "resume", resume)}
        onUndo={() => console.log("Undo")}
        onRedo={() => console.log("Redo")}
      />

      {/* Main Content - 3 Column Layout */}
      <div className="flex flex-1 overflow-hidden gap-2 mr-[10px] ml-[10px]">
        {/* Left Sidebar - Form or Template Selector (40%) */}
        <aside className="w-[40%] rounded-lg bg-white border-r border-gray-200 overflow-y-auto">
          {showTemplates ? (
            <TemplateSelector
              apiBase={API_BASE || 'http://localhost:4000'}
              onBack={() => setShowTemplates(false)}
              onSelectTemplate={(template) => {
                console.log('Selected template:', template);
                // TODO: Apply template to resume
                setShowTemplates(false);
              }}
            />
          ) : (
            <GenericForm
              schema={schema}
              data={resume}
              sectionOrder={sectionOrder}
              setSectionOrder={setSectionOrder}
              onChange={setResume as any}
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
    </div>
  );
}
