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
  Briefcase,
  Target,
  Sparkles,
  BarChart3,
  CheckCircle,
  AlertCircle,
  LogOut,
  User,
  Video,
  Headphones,
  ChevronDown,
  PenTool
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
  const [atsScans, setAtsScans] = useState<SavedDocument[]>([]);
  const [tailorHistory, setTailorHistory] = useState<SavedDocument[]>([]);
  const [interviewSessions, setInterviewSessions] = useState<SavedDocument[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  // Deletion Dialog State
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string;
    type: 'resume' | 'cover-letter' | 'ats-scan' | 'tailor-history';
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

    // Sort by lastModified descending
    allDocs.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    setResumes(allDocs.filter(d => d.type === 'resume'));
    setCoverLetters(allDocs.filter(d => d.type === 'cover-letter'));
    setAtsScans(allDocs.filter(d => d.type === 'ats-scan'));
    setTailorHistory(allDocs.filter(d => d.type === 'tailor-history'));
    setInterviewSessions(allDocs.filter(d => d.type === 'interview-session'));

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

  const handleDelete = async (id: string, type: 'resume' | 'cover-letter' | 'ats-scan' | 'tailor-history', title: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      type,
      title
    });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteDialog;
    // @ts-ignore - types are compatible enough for this purpose
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
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">My Workspace</div>
              <div className="px-3 py-2 text-sm font-bold text-indigo-700 bg-indigo-50/80 rounded-lg cursor-pointer flex justify-between items-center group">
                Dashboard
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Tools & Analysis</h3>
            <div className="space-y-1 relative pl-3">
              {/* Vertical Line for Process */}
              <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-slate-100"></div>

              <div className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-800 rounded-lg cursor-pointer bg-white relative z-10 transition-colors">
                <div className="w-2.5 h-0.5 bg-indigo-600 rounded-full"></div>
                Optimization
              </div>
              {/* Sub items */}
              <div className="pl-6 space-y-1 mt-1">
                <Link href="/ats-check" className="block py-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer font-medium hover:bg-slate-50 rounded-md px-2 -mx-2">
                  ATS Checker
                </Link>
                <Link href="/tailor" className="block py-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer font-medium hover:bg-slate-50 rounded-md px-2 -mx-2">
                  AI Tailor
                </Link>
                <Link href="/templates" className="block py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors cursor-pointer font-medium hover:bg-slate-50 rounded-md px-2 -mx-2">
                  Templates
                </Link>
                <Link href="/cover-letter" className="block py-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors cursor-pointer font-medium hover:bg-slate-50 rounded-md px-2 -mx-2">
                  Cover Letters
                </Link>
                <Link href="https://interview.hirecta.com" className="block py-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer font-medium hover:bg-slate-50 rounded-md px-2 -mx-2">
                  Mock Interview
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Account</h3>
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">Settings</div>
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">Support</div>
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
            <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={20} />
              <span className="text-sm font-medium hidden sm:inline">Settings</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Mail size={20} />
              <span className="text-sm font-medium hidden sm:inline">Messages</span>
            </button>
            <button className="relative flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <div className="relative">
                <Bell size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-[#F3F4F6]"></span>
              </div>
              <span className="text-sm font-medium hidden sm:inline">BroadCast</span>
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
                onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
              >
                {user?.picture ? (
                  <img src={user.picture} alt="" className="w-9 h-9 rounded-xl object-cover shadow-sm bg-white" />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {user?.name?.[0] || 'G'}
                  </div>
                )}
                <span className="text-sm font-bold text-slate-800 hidden md:block">{user?.name || "User"}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-slate-50 mb-1">
                    <p className="text-sm font-bold text-slate-900">{user?.name || "User"}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || "user@example.com"}</p>
                  </div>
                  <div className="space-y-0.5">
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <Settings size={16} /> Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <Headphones size={16} /> Support
                    </button>
                    <div className="my-1 border-t border-slate-50"></div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="px-8 lg:px-12 pb-20">
          {/* Breadcrumbs */}
          <div className="text-xs font-medium text-slate-400 mb-6 flex items-center gap-2">
            <span>My Workspace</span> <ChevronRight size={12} /> <span className="text-slate-900">Dashboard</span>
          </div>

          {/* Profile Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                {user?.picture ? (
                  <img src={user.picture} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-indigo-400">
                    {user?.name?.[0] || 'U'}
                  </div>
                )}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{user?.name || "Welcome Back"}</h1>
                <p className="text-slate-500 font-medium">{user?.email || "Job Seeker"}</p>
              </div>
            </div>
            <Link href="/editor" className="px-6 py-2.5 bg-[#6366F1] hover:bg-[#5558DD] text-white font-bold text-sm rounded-lg shadow-sm shadow-indigo-200 transition-all flex items-center gap-2">
              Create New Resume
            </Link>
          </div>

          {/* 🟢 GRID LAYOUT */}
          <div className="grid grid-cols-12 gap-10">

            {/* LEFT COLUMN: Profile & Quick Links */}
            <div className="col-span-12 lg:col-span-4 space-y-10">
              {/* ATS Quick Check */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-900/10 relative overflow-hidden group cursor-pointer hover:shadow-blue-900/20 transition-all" onClick={() => router.push('/ats-check')}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Target size={100} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Target className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Check ATS Score</h3>
                    <p className="text-sm text-blue-100 mt-1">Is your resume robot-ready? Get an instant score now.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider bg-black/20 w-fit px-3 py-1.5 rounded-lg border border-white/10 group-hover:bg-black/30 transition-colors">
                    Start Scan <ArrowRight size={12} />
                  </div>
                </div>
              </div>

              {/* Tailor Quick Link */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group cursor-pointer hover:border-indigo-300 transition-all" onClick={() => router.push('/tailor')}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Tailor with AI</h3>
                    <p className="text-sm text-slate-500 mt-1">Customize your resume for a specific job description in seconds.</p>
                  </div>
                </div>
              </div>

              {/* Cover Letter Quick Link */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group cursor-pointer hover:border-purple-300 transition-all" onClick={() => router.push('/cover-letter')}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                    <PenTool size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Cover Letter</h3>
                    <p className="text-sm text-slate-500 mt-1">Write a persuasive cover letter using our professional templates.</p>
                  </div>
                </div>
              </div>

              {/* Mock Interview Quick Link */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group cursor-pointer hover:border-emerald-300 transition-all" onClick={() => window.open('https://interview.hirecta.com', '_blank')}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                    <Video size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Mock Interview</h3>
                    <p className="text-sm text-slate-500 mt-1">Practice your interview skills with our AI interviewer.</p>
                  </div>
                </div>
              </div>

              {/* About (Dummy for now) */}
              <section>
                <h3 className="font-bold text-lg text-slate-900 mb-5">Profile Summary</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "{dummyAbout}"
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Email</p>
                      <p className="text-sm font-medium text-slate-900 truncate" title={dummyContact.email}>{dummyContact.email}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Phone</p>
                      <p className="text-sm font-medium text-slate-900">{dummyContact.phone}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Documents & History */}
            <div className="col-span-12 lg:col-span-8 space-y-8">

              {/* SECTION: Recent Documents (Resumes) */}
              <div className="relative">
                {/* Selection Border Effect */}
                <div className="absolute -inset-0.5 rounded-2xl border-2 border-[#6366F1] bg-transparent opacity-0 pointer-events-none"></div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-indigo-600" /> Resumes
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resumes.length === 0 ? (
                      <div className="col-span-2 py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                        <p className="text-slate-400 text-sm font-medium">No resumes created yet.</p>
                      </div>
                    ) : (
                      resumes.slice(0, 4).map(doc => (
                        <div key={doc.id || doc._id} className="group relative bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer">
                          <Link href={`/editor?id=${doc.id || doc._id}`} className="absolute inset-0 z-0" />
                          <div className="flex justify-between items-start mb-2 relative z-10">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                              <FileText size={18} />
                            </div>
                            <button onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDelete(doc.id || doc._id || "", 'resume', doc.title || "Untitled");
                            }} className="text-slate-300 hover:text-rose-500 transition-colors p-1">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm truncate pr-2 group-hover:text-indigo-600 transition-colors">{doc.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">Edited {getTimeAgo(doc.lastModified)}</p>
                        </div>
                      ))
                    )}

                    {/* Add New Button */}
                    <Link href="/editor" className="min-h-[120px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-400 transition-all group">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors mb-2">
                        <Plus size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase">Create New Resume</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* SECTION: Optimization History Tabs */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-emerald-600" /> Optimization History
                </h3>

                {atsScans.length === 0 && tailorHistory.length === 0 ? (
                  <div className="py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                      <Target size={32} />
                    </div>
                    <p className="text-slate-900 font-bold mb-1">No Analysis History</p>
                    <p className="text-slate-500 text-sm mb-4">Run an ATS scan or Tailor operation to see results here.</p>
                    <div className="flex justify-center gap-4">
                      <Link href="/ats-check" className="text-xs font-bold text-blue-600 hover:underline">Run ATS Check</Link>
                      <Link href="/tailor" className="text-xs font-bold text-indigo-600 hover:underline">Try Tailor AI</Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* ATS Scans List */}
                    {atsScans.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">ATS Check Results</h4>
                        <div className="space-y-3">
                          {atsScans.slice(0, 3).map((scan: any) => (
                            <div key={scan.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg ${scan.data.score >= 80 ? 'bg-emerald-500' : scan.data.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}>
                                  {scan.data.score}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 text-sm">{scan.data.fileName || "Resume Scan"}</p>
                                  <p className="text-xs text-slate-500">{new Date(scan.data.scannedAt).toLocaleDateString()} &middot; {scan.data.feedback?.strengths?.length || 0} Strengths found</p>
                                </div>
                              </div>
                              <button onClick={() => handleDelete(scan.id, 'ats-scan', scan.title)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tailor History List */}
                    {tailorHistory.length > 0 && (
                      <div className={atsScans.length > 0 ? "pt-6 border-t border-slate-100" : ""}>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tailored Resumes</h4>
                        <div className="space-y-3">
                          {tailorHistory.slice(0, 3).map((tailor: any) => (
                            <div key={tailor.id} className="flex items-center justify-between p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-xl hover:border-indigo-300 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                                  <Sparkles size={20} />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 text-sm">{tailor.data.jobTitle || "Custom Role"} @ {tailor.data.company || "Company"}</p>
                                  <p className="text-xs text-slate-500">{new Date(tailor.data.createdAt).toLocaleDateString()} &middot; Tailored Context</p>
                                </div>
                              </div>
                              <button onClick={() => handleDelete(tailor.id, 'tailor-history', tailor.title)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION: Mock Interview Sessions */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Video size={20} className="text-indigo-600" /> Mock Interview Sessions
                  </h3>
                  <a
                    href="https://interview.hirecta.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-indigo-200"
                  >
                    Start Interview <ArrowRight size={14} />
                  </a>
                </div>

                {interviewSessions.length === 0 ? (
                  <div className="py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center relative z-10">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-3">
                      <Video size={24} />
                    </div>
                    <p className="text-slate-900 font-bold mb-1">No Practice Sessions Yet</p>
                    <p className="text-slate-500 text-xs mb-4">Practice your interview skills with our AI interviewer.</p>
                    <a href="https://interview.hirecta.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-600 hover:underline">
                      Start Your First Session
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3 relative z-10">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Recent Sessions</h4>
                    {interviewSessions.slice(0, 3).map((session: any) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${session.data.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                            {session.data.status === 'completed' ? <CheckCircle size={18} /> : <Clock size={18} />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{session.title}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <span>{new Date(session.lastModified).toLocaleDateString()}</span>
                              <span>&middot;</span>
                              <span className={`capitalize ${session.data.status === 'completed' ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}`}>
                                {session.data.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <a
                          href={`https://interview.hirecta.com/session/${session.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-100"
                        >
                          View Details
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION: Cover Letters (Enhanced) */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <PenTool size={20} className="text-purple-600" /> Cover Letters
                  </h3>
                  <Link href="/cover-letter" className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs rounded-lg transition-colors">
                    <Plus size={14} /> Create New
                  </Link>
                </div>

                <div className="space-y-4">
                  {coverLetters.length === 0 ? (
                    <div className="text-center py-4 text-slate-400 text-sm">No cover letters found.</div>
                  ) : (
                    coverLetters.slice(0, 3).map(doc => (
                      <div key={doc.id || doc._id} className="group flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-slate-200 rounded-full group-hover:bg-indigo-500 transition-colors"></div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {doc.title || "UNTITLED LETTER"}
                            </h4>
                            <p className="text-xs text-slate-400">Last edited {getTimeAgo(doc.lastModified)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/cover-letter?id=${doc.id || doc._id}`} className="text-xs font-bold text-indigo-600 hover:underline px-3 py-1 bg-indigo-50 rounded-md">
                            Edit
                          </Link>
                          <button onClick={() => handleDelete(doc.id || doc._id || "", 'cover-letter', doc.title || "Untitled")} className="text-slate-300 hover:text-rose-500 p-2">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}

                  <Link href="/cover-letter" className="block text-center text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors mt-4 py-2 border-t border-slate-100">
                    View All Cover Letters
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
