"use client";

import Link from "next/link";
import {
  Search,
  Settings,
  Bell,
  Mail,
  Plus,
  ArrowRight,
  FileText,
  Clock,
  Trash2,
  ChevronRight,
  Layout,
  Target,
  Sparkles,
  BarChart3,
  CheckCircle,
  LogOut,
  Video,
  Headphones,
  ChevronDown,
  PenTool,
  X,
  Eye,
  Download,
  CreditCard
} from "lucide-react";
import { SubscriptionView } from "../components/SubscriptionView";
import { useState, useEffect, useCallback, Suspense } from "react";
import { StepLoader } from '@repo/ui/step-loader';
import Image from "next/image";
import { usePersistence, SavedDocument } from "./hooks/usePersistence";
import { Dialog } from "@repo/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { ENV } from "./env";


interface UserProfile {
  name?: string;
  email?: string;
  picture?: string;
}

function DashboardContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const { getDocuments, isLoggedIn, user: rawUser, logout, deleteDocument, subscription } = usePersistence();
  const user = rawUser as UserProfile;

  const [resumes, setResumes] = useState<SavedDocument[]>([]);
  const [coverLetters, setCoverLetters] = useState<SavedDocument[]>([]);
  const [atsScans, setAtsScans] = useState<SavedDocument[]>([]);
  const [tailorHistory, setTailorHistory] = useState<SavedDocument[]>([]);
  const [interviewSessions, setInterviewSessions] = useState<SavedDocument[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeToolView, setActiveToolView] = useState<'ats-checker' | 'ai-tailor' | 'templates' | 'cover-letters' | 'mock-interview' | 'subscription' | null>(null);
  const [headerImgError, setHeaderImgError] = useState(false);
  const [profileImgError, setProfileImgError] = useState(false);



  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  // Helper for initials
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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

    const query = searchQuery.toLowerCase().trim();

    const filteredDocs = allDocs.filter(d => {
      if (!query) return true;
      const title = d.title?.toLowerCase() || "";
      const fileName = d.data?.fileName?.toLowerCase() || "";
      const jobTitle = d.data?.jobTitle?.toLowerCase() || "";
      const company = d.data?.company?.toLowerCase() || "";
      return title.includes(query) || fileName.includes(query) || jobTitle.includes(query) || company.includes(query);
    });

    setResumes(filteredDocs.filter(d => d.type === 'resume'));
    setCoverLetters(filteredDocs.filter(d => d.type === 'cover-letter'));
    setAtsScans(filteredDocs.filter(d => d.type === 'ats-scan'));
    setTailorHistory(filteredDocs.filter(d => d.type === 'tailor-history'));
    setInterviewSessions(filteredDocs.filter(d => d.type === 'interview-session'));

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
  }, [getDocuments, loadingStep, loadingSteps.length, searchQuery]);

  const searchParams = useSearchParams();

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'subscription' && activeToolView !== 'subscription') {
      setActiveToolView('subscription');
    }
  }, [searchParams, activeToolView]);

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
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="relative max-w-md w-full mx-4">
            <div className="relative bg-white border border-slate-100 p-12 rounded-[40px] shadow-2xl overflow-hidden">
              {/* Animated Icon */}
              <div className="flex justify-center mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full animate-pulse" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-xl animate-bounce">
                    <Layout className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Hirecta Workspace</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{loadingSteps[loadingStep]}</span>
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                <StepLoader
                  steps={loadingSteps}
                  currentStep={loadingStep}
                  size="md"
                />
              </div>
            </div>
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
                <div
                  onClick={() => setActiveToolView('ats-checker')}
                  className={`block py-1.5 text-sm transition-colors cursor-pointer font-medium rounded-md px-2 -mx-2 ${activeToolView === 'ats-checker'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  ATS Checker
                </div>
                <div
                  onClick={() => setActiveToolView('ai-tailor')}
                  className={`block py-1.5 text-sm transition-colors cursor-pointer font-medium rounded-md px-2 -mx-2 ${activeToolView === 'ai-tailor'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                    }`}
                >
                  AI Tailor
                </div>
                <div
                  onClick={() => setActiveToolView('templates')}
                  className={`block py-1.5 text-sm transition-colors cursor-pointer font-medium rounded-md px-2 -mx-2 ${activeToolView === 'templates'
                    ? 'bg-slate-100 text-slate-800'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                >
                  Templates
                </div>
                <div
                  onClick={() => setActiveToolView('cover-letters')}
                  className={`block py-1.5 text-sm transition-colors cursor-pointer font-medium rounded-md px-2 -mx-2 ${activeToolView === 'cover-letters'
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-slate-500 hover:text-purple-600 hover:bg-slate-50'
                    }`}
                >
                  Cover Letters
                </div>
                <div
                  onClick={() => setActiveToolView('mock-interview')}
                  className={`block py-1.5 text-sm transition-colors cursor-pointer font-medium rounded-md px-2 -mx-2 ${activeToolView === 'mock-interview'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
                    }`}
                >
                  Mock Interview
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Account</h3>
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">Settings</div>
              <div
                onClick={() => setActiveToolView('subscription')}
                className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${activeToolView === 'subscription' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Subscription
              </div>
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

                {user?.picture && !headerImgError ? (
                  <Image
                    src={user?.picture || ""}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-xl object-cover shadow-sm bg-white"
                    onError={() => setHeaderImgError(true)}
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white shadow-sm">
                    {getInitials(user?.name)}
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
            <span>My Workspace</span> <ChevronRight size={12} />
            <span className="text-slate-900">
              {activeToolView === 'ats-checker' ? 'ATS Checker' :
                activeToolView === 'ai-tailor' ? 'AI Tailor' :
                  activeToolView === 'templates' ? 'Templates' :
                    activeToolView === 'cover-letters' ? 'Cover Letters' :
                      activeToolView === 'mock-interview' ? 'Mock Interview' :
                        activeToolView === 'subscription' ? 'Subscription' :
                          'Dashboard'}
            </span>
          </div>

          {/* INLINE TOOL VIEWS */}
          {activeToolView ? (
            <div className="space-y-6">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveToolView(null)}
                    className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all"
                  >
                    <X size={18} />
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                      {activeToolView === 'ats-checker' && <><Target className="text-blue-600" size={32} /> ATS Checker</>}
                      {activeToolView === 'ai-tailor' && <><Sparkles className="text-indigo-600" size={32} /> AI Tailor</>}
                      {activeToolView === 'templates' && <><Layout className="text-slate-700" size={32} /> Templates</>}
                      {activeToolView === 'cover-letters' && <><PenTool className="text-purple-600" size={32} /> Cover Letters</>}
                      {activeToolView === 'mock-interview' && <><Video className="text-emerald-600" size={32} /> Mock Interview</>}
                      {activeToolView === 'subscription' && <><CreditCard className="text-blue-600" size={32} /> Subscription</>}
                    </h1>
                    <p className="text-slate-500 mt-1">
                      {activeToolView === 'ats-checker' && 'View all your ATS scan results and optimize your resume'}
                      {activeToolView === 'ai-tailor' && 'Manage your tailored resumes for different job applications'}
                      {activeToolView === 'templates' && 'Browse and select from professional resume templates'}
                      {activeToolView === 'cover-letters' && 'Manage all your cover letters in one place'}
                      {activeToolView === 'mock-interview' && 'Review your practice interview sessions'}
                      {activeToolView === 'subscription' && 'Manage your account and subscription plans'}
                    </p>
                  </div>
                </div>
                <div>
                  {activeToolView === 'ats-checker' && (
                    <Link href="/ats-check" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2">
                      <Plus size={18} /> Run New ATS Check
                    </Link>
                  )}
                  {activeToolView === 'ai-tailor' && (
                    <Link href="/tailor" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2">
                      <Plus size={18} /> Tailor New Resume
                    </Link>
                  )}
                  {activeToolView === 'templates' && (
                    <Link href="/templates" className="px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2">
                      <Layout size={18} /> Browse All Templates
                    </Link>
                  )}
                  {activeToolView === 'cover-letters' && (
                    <Link href="/cover-letter" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2">
                      <Plus size={18} /> Create New Letter
                    </Link>
                  )}
                  {activeToolView === 'mock-interview' && (
                    <a href={ENV.INTERVIEW_URL} target="_blank" rel="noreferrer" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2">
                      <Plus size={18} /> Start New Interview
                    </a>
                  )}
                </div>
              </div>

              {/* ATS Checker View */}
              {activeToolView === 'ats-checker' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900 mb-6">All ATS Scan Results</h3>

                  {atsScans.length === 0 ? (
                    <div className="py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                        <Target size={40} />
                      </div>
                      <p className="text-slate-900 font-bold text-lg mb-2">No ATS Scans Yet</p>
                      <p className="text-slate-500 text-sm mb-6">Upload your resume to check its ATS compatibility and get actionable feedback.</p>
                      <Link href="/ats-check" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-all">
                        Run Your First ATS Check <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {atsScans.map((scan: SavedDocument) => (
                        <div key={scan.id} className="flex items-start justify-between p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                          <div className="flex items-start gap-5 flex-1">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-sm ${scan.data.score >= 80 ? 'bg-emerald-500' : scan.data.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}>
                              {scan.data.score}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-slate-900 text-lg mb-1">{scan.data.fileName || "Resume Scan"}</p>
                              <p className="text-sm text-slate-500 mb-3">
                                Scanned on {new Date(scan.data.scannedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="bg-white px-4 py-2 rounded-lg border border-slate-100">
                                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Strengths</p>
                                  <p className="font-bold text-emerald-600">{scan.data.feedback?.strengths?.length || 0}</p>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-lg border border-slate-100">
                                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Improvements</p>
                                  <p className="font-bold text-amber-600">{scan.data.feedback?.improvements?.length || 0}</p>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-lg border border-slate-100">
                                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Critical</p>
                                  <p className="font-bold text-rose-600">{scan.data.feedback?.critical?.length || 0}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-sm rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2">
                              <Eye size={16} /> View Details
                            </button>
                            <button
                              onClick={() => handleDelete(scan.id, 'ats-scan', scan.title)}
                              className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* AI Tailor View */}
              {activeToolView === 'ai-tailor' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900 mb-6">Tailored Resumes</h3>

                  {tailorHistory.length === 0 ? (
                    <div className="py-16 bg-indigo-50/30 rounded-xl border border-dashed border-indigo-200 text-center">
                      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-4">
                        <Sparkles size={40} />
                      </div>
                      <p className="text-slate-900 font-bold text-lg mb-2">No Tailored Resumes Yet</p>
                      <p className="text-slate-500 text-sm mb-6">Use AI to customize your resume for specific job descriptions and increase your chances.</p>
                      <Link href="/tailor" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-all">
                        Tailor Your First Resume <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {tailorHistory.map((tailor: SavedDocument) => (
                        <div key={tailor.id} className="flex items-start justify-between p-6 bg-indigo-50/30 border border-indigo-100 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group">
                          <div className="flex items-start gap-5 flex-1">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                              <Sparkles size={28} />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-slate-900 text-lg mb-1">
                                {tailor.data.jobTitle || "Custom Role"} {tailor.data.company && `@ ${tailor.data.company}`}
                              </p>
                              <p className="text-sm text-slate-500 mb-3">
                                Tailored on {new Date(tailor.data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                              {tailor.data.jobDescription && (
                                <div className="bg-white px-4 py-3 rounded-lg border border-indigo-100 text-sm text-slate-600">
                                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Job Description Preview</p>
                                  <p className="line-clamp-2">{tailor.data.jobDescription}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-sm rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2">
                              <Download size={16} /> Download
                            </button>
                            <button
                              onClick={() => handleDelete(tailor.id, 'tailor-history', tailor.title)}
                              className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Templates View */}
              {activeToolView === 'templates' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900 mb-6">Resume Templates</h3>

                  <div className="py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                      <Layout size={40} />
                    </div>
                    <p className="text-slate-900 font-bold text-lg mb-2">Templates Gallery</p>
                    <p className="text-slate-500 text-sm mb-6">Browse our collection of professional resume templates optimized for ATS.</p>
                    <Link href="/templates" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-all">
                      Browse All Templates <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Cover Letters View */}
              {activeToolView === 'cover-letters' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900 mb-6">All Cover Letters</h3>

                  {coverLetters.length === 0 ? (
                    <div className="py-16 bg-purple-50/30 rounded-xl border border-dashed border-purple-200 text-center">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mx-auto mb-4">
                        <PenTool size={40} />
                      </div>
                      <p className="text-slate-900 font-bold text-lg mb-2">No Cover Letters Yet</p>
                      <p className="text-slate-500 text-sm mb-6">Create professional cover letters using our templates to complement your resume.</p>
                      <Link href="/cover-letter" className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-lg transition-all">
                        Create Your First Letter <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {coverLetters.map(doc => (
                        <div key={doc.id || doc._id} className="group relative bg-white border-2 border-slate-200 hover:border-purple-400 rounded-xl p-6 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                              <PenTool size={24} />
                            </div>
                            <button
                              onClick={() => handleDelete(doc.id || doc._id || "", 'cover-letter', doc.title || "Untitled")}
                              className="text-slate-300 hover:text-rose-500 transition-colors p-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <h4 className="font-bold text-slate-900 text-lg mb-2 truncate">
                            {doc.title || "UNTITLED LETTER"}
                          </h4>
                          <p className="text-sm text-slate-500 mb-4">
                            Last edited {getTimeAgo(doc.lastModified)}
                          </p>
                          <Link
                            href={`/cover-letter?id=${doc.id || doc._id}`}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-purple-50 text-purple-600 hover:bg-purple-100 font-bold text-sm rounded-lg transition-all group-hover:bg-purple-600 group-hover:text-white"
                          >
                            <Eye size={16} /> Edit Letter
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Mock Interview View */}
              {activeToolView === 'mock-interview' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900 mb-6">Interview Sessions</h3>

                  {interviewSessions.length === 0 ? (
                    <div className="py-16 bg-emerald-50/30 rounded-xl border border-dashed border-emerald-200 text-center">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4">
                        <Video size={40} />
                      </div>
                      <p className="text-slate-900 font-bold text-lg mb-2">No Practice Sessions Yet</p>
                      <p className="text-slate-500 text-sm mb-6">Practice your interview skills with our AI-powered mock interviewer.</p>
                      <a href={ENV.INTERVIEW_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-all">
                        Start Your First Interview <ArrowRight size={16} />
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {interviewSessions.map((session: SavedDocument) => (
                        <div key={session.id} className="flex items-start justify-between p-6 bg-emerald-50/30 border border-emerald-100 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all group">
                          <div className="flex items-start gap-5 flex-1">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-sm ${session.data.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                              {session.data.status === 'completed' ? <CheckCircle size={28} /> : <Clock size={28} />}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-slate-900 text-lg mb-1">{session.title}</p>
                              <p className="text-sm text-slate-500 mb-3">
                                {new Date(session.lastModified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                <span className="mx-2">•</span>
                                <span className={`capitalize font-medium ${session.data.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  {session.data.status}
                                </span>
                              </p>
                              {session.data.questions && (
                                <div className="bg-white px-4 py-3 rounded-lg border border-emerald-100 text-sm">
                                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Questions Answered</p>
                                  <p className="font-bold text-emerald-600">{session.data.questions} questions</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <a
                              href={ENV.INTERVIEW_URL + `/session/${session.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-sm rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
                            >
                              <Eye size={16} /> View Session
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Subscription View */}
              {activeToolView === 'subscription' && (
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
                  <SubscriptionView
                    onBack={() => setActiveToolView(null)}
                    onSuccess={() => setActiveToolView(null)}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              {/* ORIGINAL DASHBOARD CONTENT */}
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {user?.picture && !profileImgError ? (
                      <Image
                        src={user?.picture || ""}
                        alt=""
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
                        onError={() => setProfileImgError(true)}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-indigo-500">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-3xl font-bold text-slate-900">{user?.name || "Welcome Back"}</h1>
                      {subscription && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${subscription.plan === 'free'
                          ? 'bg-slate-50 text-slate-400 border-slate-200'
                          : 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm shadow-blue-50'
                          }`}>
                          {subscription.plan === 'free' ? 'Free' : subscription.plan}
                        </span>
                      )}
                    </div>
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

                  {/* Subscription Quick View */}
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200 group cursor-pointer hover:border-blue-300 transition-all" onClick={() => setActiveToolView('subscription')}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Active Plan</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subscription?.plan === 'free' ? 'Limited Access' : 'Pro Access'}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${subscription?.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                        {subscription?.status || 'Active'}
                      </div>
                    </div>
                    <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Valid until</span>
                        <span className="text-slate-900 font-bold">
                          {subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Interview Quick Link */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group cursor-pointer hover:border-emerald-300 transition-all" onClick={() => window.open(ENV.INTERVIEW_URL, '_blank')}>
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
                              <Link href={`/editor?templateId=${doc.templateId || '696e14fce15299e55244d1ce'}&id=${doc.id || doc._id}`} className="absolute inset-0 z-0" />
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
                              {atsScans.slice(0, 3).map((scan: SavedDocument) => (
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
                              {tailorHistory.slice(0, 3).map((tailor: SavedDocument) => (
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
                        href={ENV.INTERVIEW_URL}
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
                        <a href={ENV.INTERVIEW_URL} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-600 hover:underline">
                          Start Your First Session
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-3 relative z-10">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Recent Sessions</h4>
                        {interviewSessions.slice(0, 3).map((session: SavedDocument) => (
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
                              href={`${ENV.INTERVIEW_URL}/session/${session.id}`}
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

            </>
          )}
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
    </div >
  );
}

function WorkspaceLoader() {
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    "Loading Hirecta...",
    "Syncing profile...",
    "Fetching documents..."
  ];

  useEffect(() => {
    if (loadingStep < loadingSteps.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadingStep, loadingSteps.length]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative max-w-md w-full mx-4">
        <div className="relative bg-white border border-slate-100 p-12 rounded-[40px] shadow-2xl overflow-hidden">
          {/* Animated Icon */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-xl animate-bounce">
                <Layout className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Hirecta Workspace</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{loadingSteps[loadingStep]}</span>
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
            <StepLoader
              steps={loadingSteps}
              currentStep={loadingStep}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<WorkspaceLoader />}>
      <DashboardContent />
    </Suspense>
  );
}
