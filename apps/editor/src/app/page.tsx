"use client";

import Link from "next/link";
import {
  Search,
  Settings,
  Bell,
  Mail,
  MoreHorizontal,
  Plus,
  ArrowRight,
  FileText,
  Clock,
  Trash2,
  ChevronRight,
  MapPin,
  Phone,
  Layout,
  Briefcase
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { StepLoader } from '@repo/ui/step-loader';
import { getSubscription } from "@repo/utils-client";
import Image from "next/image";
import { usePersistence, SavedDocument } from "./hooks/usePersistence";
import { Dialog } from "@repo/ui/dialog";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter()
  const subscription = getSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const { getDocuments, isLoggedIn, user, logout, deleteDocument } = usePersistence();

  const [resumes, setResumes] = useState<SavedDocument[]>([]);
  const [coverLetters, setCoverLetters] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  // Deletion Dialog State
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string;
    type: 'resume' | 'cover-letter';
    title: string;
  }>({
    isOpen: false,
    id: "",
    type: 'resume',
    title: ""
  });

  const loadingSteps = [
    "Loading Hirecta...",
    "Syncing profile...",
    "Fetching documents..."
  ];

  // Auto-progress loading steps
  useEffect(() => {
    if (loading && loadingStep < loadingSteps.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, loadingStep, loadingSteps.length]);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    const { backendDocs, localDocs } = await getDocuments();
    const allDocs = [...backendDocs, ...localDocs];
    setResumes(allDocs.filter(d => d.type === 'resume'));
    setCoverLetters(allDocs.filter(d => d.type === 'cover-letter'));

    const waitForSteps = () => {
      return new Promise<void>((resolve) => {
        const checkSteps = () => {
          if (loadingStep >= loadingSteps.length - 1) {
            setTimeout(() => resolve(), 500);
          } else {
            setTimeout(checkSteps, 100);
          }
        };
        checkSteps();
      });
    };

    await waitForSteps();
    setLoading(false);
  }, [getDocuments, loadingStep, loadingSteps.length]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const getTimeAgo = (date: string | Date | undefined) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDelete = async (id: string, type: 'resume' | 'cover-letter', title: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      type,
      title
    });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteDialog;
    const success = await deleteDocument(id, type);
    if (success) {
      fetchDocs();
      setDeleteDialog(prev => ({ ...prev, isOpen: false }));
    } else {
      alert("Failed to delete document. Please try again.");
    }
  };

  // 🟢 DUMMY DATA FOR VISUAL REPLICA
  const dummyAbout = "Attentive and detail-oriented professional with experience in building high-quality documents. Dedicated to creating ATS-optimized resumes and persuasive cover letters to help land the dream job.";
  const dummyContact = { phone: "(123) 456-7890", email: user?.email || "user@example.com" };
  const dummySkills = [
    "Microsoft Office Suite", "Database Management", "ICD-9 & CPT Designations",
    "HIPAA Guidelines", "First Aid and CPR", "Team Leadership"
  ];

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-[family-name:var(--font-inter)] text-slate-900">

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="max-w-md w-full mx-4 text-center">
            <StepLoader steps={loadingSteps} currentStep={loadingStep} size="md" />
          </div>
        </div>
      )}

      {/* 🟢 LEFT SIDEBAR (Fixed Width) */}
      <aside className="w-[260px] fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50 flex flex-col py-8 px-6 overflow-y-auto hidden lg:flex">
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Hirecta"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nav Groups */}
        <div className="space-y-8 flex-1">
          <div>
            {/* Project Links (Replica) */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">Project 01</div>
              <div className="px-3 py-2 text-sm font-bold text-indigo-700 bg-indigo-50/80 rounded-lg cursor-pointer flex justify-between items-center group">
                Dashboard
              </div>
            </div>
            {/* Add Project */}
            <button className="flex items-center gap-2 mt-4 px-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              <Plus size={14} /> Add project
            </button>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Process</h3>
            <div className="space-y-1 relative pl-3">
              {/* Vertical Line for Process */}
              <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-slate-100"></div>

              <div className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-800 rounded-lg cursor-pointer bg-white relative z-10">
                <div className="w-2.5 h-0.5 bg-indigo-600 rounded-full"></div>
                Active candidates
              </div>
              {/* Sub items */}
              <div className="pl-6 space-y-1 mt-1">
                <div className="py-1.5 text-sm text-indigo-600 font-medium cursor-pointer">Stats & Overview</div> {/* Replaced 'Screening' */}
                <Link href="/templates" className="block py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Templates</Link>
                <Link href="/tailor" className="block py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">AI Tailor</Link>
                <Link href="https://interview.hirecta.com" className="block py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Mock Interview</Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">People</h3>
            <div className="space-y-1">
              {/* Candidates / Employees */}
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">Candidates</div>
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">Employees</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 🟡 MAIN CONTENT WRAPPER */}
      <div className="flex-1 lg:ml-[260px] min-w-0">

        {/* HEADER */}
        <header className="h-20 bg-[#F3F4F6] flex items-center justify-between px-8 lg:px-12 sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent pl-8 pr-4 py-2 border-none focus:outline-none focus:ring-0 placeholder:text-slate-400 text-sm text-slate-700 font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Settings size={20} /></button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Mail size={20} /></button>
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-[#F3F4F6]"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer" onClick={logout}>
              {user?.picture ? (
                <img src={user.picture} alt="" className="w-9 h-9 rounded-xl object-cover shadow-sm bg-white" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  {user?.name?.[0] || 'G'}
                </div>
              )}
              <span className="text-sm font-bold text-slate-800 hidden md:block">{user?.name || "Dannielle S."}</span>
            </div>
          </div>
        </header>

        <main className="px-8 lg:px-12 pb-20">
          {/* Breadcrumbs */}
          <div className="text-xs font-medium text-slate-400 mb-6 flex items-center gap-2">
            <span>Active candidates</span> <ChevronRight size={12} /> <span>Applied for a role</span> <ChevronRight size={12} /> <span className="text-slate-900">{user?.name}</span>
          </div>

          {/* Profile Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                {user?.picture ? (
                  <img src={user.picture} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-indigo-400">
                    {user?.name?.[0]}
                  </div>
                )}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{user?.name || "Mahamed Hendrix"}</h1>
                <p className="text-slate-500 font-medium">Job Seeker &middot; Product Designer</p>
              </div>
            </div>
            <Link href="/editor" className="px-6 py-2.5 bg-[#6366F1] hover:bg-[#5558DD] text-white font-bold text-sm rounded-lg shadow-sm shadow-indigo-200 transition-all flex items-center gap-2">
              Create New
            </Link>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 mb-8">
            <div className="flex items-center gap-8">
              <button className="pb-3 border-b-2 border-[#6366F1] font-bold text-slate-900 text-sm">Job Application</button>
              <button className="pb-3 border-b-2 border-transparent font-medium text-slate-400 hover:text-slate-600 text-sm transition-colors">Comments (12)</button>
            </div>
          </div>

          {/* 🟢 TWO COLUMN GRID (The Replica Content) */}
          <div className="grid grid-cols-12 gap-10">

            {/* LEFT COLUMN: Dummy Profile Data */}
            <div className="col-span-12 lg:col-span-4 space-y-10">
              {/* About */}
              <section>
                <h3 className="font-bold text-lg text-slate-900 mb-5">About</h3>

                <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-sm mb-6">
                  <div>
                    <p className="text-slate-400 font-medium mb-1">Applying for</p>
                    <p className="text-slate-900 font-semibold">Medical Assistant</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium mb-1">Resume</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700">
                      <FileText size={12} /> resume.pdf
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium mb-1">Location</p>
                    <p className="text-slate-900 font-semibold">New York, USA</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Summary</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {dummyAbout}
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h3 className="font-bold text-lg text-slate-900 mb-5">Contact</h3>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-slate-400 font-medium mb-1">Phone number</p>
                    <p className="text-slate-900 font-semibold">{dummyContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium mb-1">Email</p>
                    <p className="text-slate-900 font-semibold truncate" title={dummyContact.email}>{dummyContact.email}</p>
                  </div>
                </div>
              </section>

              {/* Key Skills */}
              <section>
                <h3 className="font-bold text-lg text-slate-900 mb-5">Key Skills</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {dummySkills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <span className="text-slate-400 font-light">&mdash;</span> {skill}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Real Documents (Mapped to "Education" & "Exp") */}
            <div className="col-span-12 lg:col-span-8 space-y-8">

              {/* "Education" Style Card -> Resumes */}
              <div className="relative">
                {/* The blue selection border effect from image */}
                <div className="absolute -inset-0.5 rounded-2xl border-2 border-[#6366F1] bg-transparent opacity-0 pointer-events-none"></div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-6">Resumes</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resumes.length === 0 ? (
                      <div className="col-span-2 text-center py-4 text-slate-400 text-sm font-medium">No resumes created yet.</div>
                    ) : (
                      resumes.slice(0, 4).map(doc => (
                        <Link href={`/editor?id=${doc.id || doc._id}`} key={doc.id || doc._id} className="group cursor-pointer">
                          <p className="font-bold text-xs text-slate-900 uppercase tracking-tight mb-2 group-hover:text-[#6366F1] transition-colors">
                            {doc.title || "UNTITLED RESUME"}
                          </p>
                          <p className="text-sm text-slate-500 font-medium">Hirecta Editor, {new Date(doc.lastModified).getFullYear()}</p>
                        </Link>
                      ))
                    )}

                    {/* Add New Button (Simulating the + Box) */}
                    <Link href="/editor" className="min-h-[60px] flex flex-col justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-[#6366F1] hover:bg-slate-50 transition-all group text-center">
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#6366F1] transition-colors uppercase">+ Add Resume</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* "Professional Experience" Style -> Cover Letters */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-lg text-slate-900">Cover Letters</h3>
                  <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={20} /></button>
                </div>

                <div className="space-y-8">
                  {coverLetters.length === 0 ? (
                    <div className="text-center py-4 text-slate-400 text-sm">No cover letters found.</div>
                  ) : (
                    coverLetters.map(doc => (
                      <div key={doc.id || doc._id} className="group relative pl-8 border-l-2 border-transparent hover:border-[#6366F1] transition-colors">
                        {/* Bullet line */}
                        <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-[#6366F1] transition-colors"></div>

                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight group-hover:text-[#6366F1] transition-colors">
                            {doc.title || "UNTITLED LETTER"} / {new Date(doc.lastModified).toLocaleDateString()}
                          </h4>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => {
                              e.preventDefault();
                              handleDelete(doc.id || doc._id || "", 'cover-letter', doc.title || "Untitled");
                            }} className="text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 font-medium mb-3">AI Generated Draft</p>

                        <div className="space-y-3">
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            &mdash; Tailored application document created with Hirecta AI.
                          </p>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            &mdash; Last edited {getTimeAgo(doc.lastModified)}.
                          </p>
                        </div>
                        <Link href={`/cover-letter?id=${doc.id || doc._id}`} className="absolute inset-0 z-10" />
                      </div>
                    ))
                  )}

                  <Link href="/cover-letter" className="flex items-center gap-2 text-sm font-bold text-[#6366F1] hover:text-[#5558DD] transition-colors mt-4">
                    See all or Create New <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      <Dialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog(prev => ({ ...prev, isOpen: false }))}
        title="Delete Document"
        description={`Are you sure you want to delete "${deleteDialog.title}"? This action cannot be undone.`}
        type="confirm"
        primaryActionLabel="Delete Forever"
        onPrimaryAction={confirmDelete}
        secondaryActionLabel="Cancel"
      />
    </div>
  );
}
