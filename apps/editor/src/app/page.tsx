"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDebounce } from "@repo/utils-client";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button"
import { HtmlEditor } from "@repo/ui/html-editor";
import {
  Download, LayoutGrid, Share2, Undo, Redo, ArrowUp, ArrowDown
} from "lucide-react";



import { FormSchema } from "./FieldRenderer";
import GenericForm from "./GenericForm";

export const resumeSchema: FormSchema = {
  personalInfo: {
    label: "Personal Information",
    type: "object",
    fields: {
      jobTitle: { label: "Job Title", type: "text", className: "w-full" },
      firstName: { label: "First Name", type: "text", className: "w-[calc(50%-4px)]" },
      lastName: { label: "Last Name", type: "text", className: "w-[calc(50%-4px)]" },
      summary: { label: "Summary", type: "textarea", className: "w-full" },
      email: { label: "Email", type: "email", className: "w-[calc(50%-4px)]" },
      phone: { label: "Phone", type: "text", className: "w-[calc(50%-4px)]" }
    }
  },




  experience: {
    label: "Experience",
    type: "array",
    item: {
      jobTitle: { label: "Job Title", type: "text", className: "w-[calc(50%-4px)]" },
      company: { label: "Company", type: "text", className: "w-[calc(50%-4px)]" },
      startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
      endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" }
    }
  },

  projects: {
    label: "Projects",
    type: "array",
    item: {
      title: { label: "Project Title", type: "text", className: "w-full" },
      description: { label: "Description", type: "textarea", className: "w-full" },
      technologies: { label: "Technologies", type: "text", className: "w-full" },
      link: { label: "Link", type: "url", className: "w-full" }
    }
  },

  education: {
    label: "Education",
    type: "array",
    item: {
      degree: { label: "Degree", type: "text", className: "w-[calc(50%-4px)]" },
      institution: { label: "Institution", type: "text", className: "w-[calc(50%-4px)]" },
      startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
      endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" }
    }
  },

  skills: {
    label: "Skills",
    type: "array",
    item: {
      name: { label: "Skill Name", type: "text" },
      level: {
        label: "Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"]
      }
    }
  }
};


const initialResume = {
  "personalInfo": {
    "firstName": "John Bro",
    "lastName": "Doe",
    "jobTitle": "Full Stack Developer",
    "summary": "Experienced Full Stack Developer with 5+ years of experience building scalable web applications and REST APIs.",
    "email": "john.doe@email.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main Street",
    "city": "San Francisco",
    "state": "California",
    "country": "USA",
    "postalCode": "94105",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "portfolio": "https://johndoe.dev"
  },

  "education": [
    {
      "degree": "Bachelor of Technology",
      "fieldOfStudy": "Computer Science",
      "institution": "University of California",
      "location": "Berkeley, CA",
      "startDate": "2015-08",
      "endDate": "2019-05",
      "grade": "3.7 GPA",
      "description": "Focused on software engineering, data structures, and web development."
    }
  ],

  "experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Solutions Inc.",
      "location": "San Francisco, CA",
      "startDate": "2021-01",
      "endDate": "",
      "currentlyWorking": true,
      "responsibilities": [
        "Decccccccccccccveloped REST APIs using Node.js and Express",
        "Built rescccponsive UI using React and Tailwind CSS",
        "Improved accccpplication performance by 30%",
        "Mentored junior developers"
      ]
    },
    {
      "jobTitle": "Software Developer",
      "company": "Innovate Labs",
      "location": "San Jose, CA",
      "startDate": "2019-06",
      "endDate": "2020-12",
      "currentlyWorking": false,
      "responsibilities": [
        "Designed frontend components using Angular",
        "Integrated third-party APIs",
        "Collaborated with cross-functional teams"
      ]
    }
  ],

  "skills": [
    { "name": "JavaScript", "level": "Expert" },
    { "name": "React", "level": "Advanced" },
    { "name": "Node.js", "level": "Advanced" },
    { "name": "MongoDB", "level": "Intermediate" },
    { "name": "Docker", "level": "Intermediate" }
  ],

  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "A full-featured e-commerce web application with payment integration.",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "link": "https://github.com/johndoe/ecommerce-platform"
    },
    {
      "title": "Task Management App",
      "description": "A productivity app to manage daily tasks and deadlines.",
      "technologies": ["Vue.js", "Firebase"],
      "link": "https://taskapp.johndoe.dev"
    }
  ],

  "certifications": [
    {
      "name": "AWS Certified Developer – Associate",
      "organization": "Amazon Web Services",
      "issueDate": "2022-06",
      "expiryDate": "2025-06",
      "credentialUrl": "https://aws.amazon.com/certification/"
    }
  ],

  "languages": [
    { "language": "English", "proficiency": "Native" },
    { "language": "Spanish", "proficiency": "Intermediate" }
  ],

  "achievements": [
    "Employee of the Year – 2022",
    "Winner of Internal Hackathon 2021"
  ],

  "hobbies": [
    "Open-source contribution",
    "Photography",
    "Cycling"
  ],

  "references": [
    {
      "name": "Jane Smith",
      "designation": "Engineering Manager",
      "company": "Tech Solutions Inc.",
      "email": "jane.smith@techsolutions.com",
      "phone": "+1-555-987-6543"
    }
  ],

  "settings": {
    "resumeTemplate": "modern",
    "font": "Roboto",
    "color": "#1a73e8",
    "pageSize": "A4"
  }
}

export const Section = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="flex flex-col gap-[16px] border-b border-[#A4A4A4] pb-[16px]">
      <div className="font-bold text-lg truncate">
        {title}
      </div>
      {children}
    </div>
  )
}


export default function ResumeLayout() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [resume, setResume] = useState(initialResume);

  const [name, setName] = useState("sds");
  const debouncedName = useDebounce(resume, 500);

  const [totalPages, setTotalPages] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  const renderTaskRef = useRef<any>(null);
  const requestIdRef = useRef(0);


  const downloadPdf = async () => {
    try {
      const res = await fetch(`${API_BASE}/convert-html-to-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume?.personalInfo?.firstName || "Resume"}_${resume?.personalInfo?.lastName || ""}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download error:", err);
    }
  };



  const renderPdf = async (page = pageCount) => {
    if (!mainRef.current) return;

    const requestId = ++requestIdRef.current;

    const res = await fetch(`${API_BASE}/convert-html-to-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resume),
    });

    if (requestId !== requestIdRef.current) return;

    const pdfData = await res.arrayBuffer();
    const pdfjsLib = (window as any).pdfjsLib;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

    setTotalPages(pdf.numPages);
    console.log(pdf.numPages);

    // clamp page in case totalPages changed
    const safePage = Math.min(Math.max(page, 1), pdf.numPages);

    const pdfPage = await pdf.getPage(page);

    const containerWidth = mainRef.current.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const scale = containerWidth / baseViewport.width;
    const viewport = pdfPage.getViewport({ scale });

    const offscreen =
      offscreenRef.current ?? document.createElement("canvas");
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
  }, [debouncedName, pageCount]);

  useLayoutEffect(() => {
    const onResize = () => renderPdf();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="flex gap-2 h-24 p-2">
        {/* Left Box */}
        <div className="flex flex-shrink-0 items-center w-full lg:w-[500px] bg-white border border-gray-200 rounded p-3">
          <div className="font-bold text-lg truncate">
            {resume?.personalInfo?.firstName || 'John Doe'} {resume?.personalInfo?.lastName || 'Doe'}’s Resume
          </div>
        </div>

        {/* Right Box */}
        <div className="flex items-center justify-between w-full bg-white border border-gray-200 rounded p-2">
          {/* Undo/Redo Icons */}
          <div className="flex gap-2">
            <ArrowUp onClick={() => setPageCount(pageCount + 1)} size={18} />
            <ArrowDown onClick={() => setPageCount(pageCount - 1)} size={18} />
          </div>

          {/* Share / Download Buttons */}
          <div className="flex gap-2">
            <Button>
              <div className="flex items-center gap-2">
                <Share2 size={18} /> Share
              </div>
            </Button>
            <Button variant="primary" onClick={downloadPdf}>
              <div className="flex items-center gap-2">
                <Download size={18} /> Download
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden gap-2 m-[10px]">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-[500px] bg-white border-r p-4 overflow-y-auto rounded-lg">
          <div className="space-y-4">


            <GenericForm
              schema={resumeSchema}
              data={resume}
              onChange={setResume as any}
            />

          </div>
        </aside>

        {/* Main Canvas */}
        <main ref={mainRef} className="flex-1 overflow-y-auto flex justify-center py-8">
          <canvas ref={canvasRef} />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:flex w-[250px] flex-col bg-white border-l p-4 rounded-lg items-center gap-2">
          <Button>
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} /> Change Template
            </div>
          </Button>
        </aside>
      </div>
    </div>
  );
}
