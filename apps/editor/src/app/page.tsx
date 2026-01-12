"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Plus,
  Settings,
  CreditCard,
  Clock,
  ChevronRight,
  Search,
  UserCircle,
  LogOut,
  ExternalLink,
  Sparkles,
  Trash2,
  Briefcase,
  Target,
  Mic2,
  BarChart3,
  Share2,
  GraduationCap,
  Navigation,
  MessageSquare,
  MoreHorizontal,
  ChevronDown,
  HelpCircle,
  Zap,
  Globe,
  Bell,
  Command,
  DockIcon,
  CheckCheck
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getSubscription } from "@repo/utils-client";
import Image from "next/image";
import { usePersistence, SavedDocument } from "./hooks/usePersistence";
import { Dialog } from "@repo/ui/dialog";
import { ComingSoon } from "../components/ComingSoon";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter()
  const subscription = getSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const { getDocuments, isLoggedIn, user, logout, deleteDocument } = usePersistence();

  const [resumes, setResumes] = useState<SavedDocument[]>([]);
  const [coverLetters, setCoverLetters] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGoal, setActiveGoal] = useState("Resume Building");

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

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    const { backendDocs, localDocs } = await getDocuments();
    const allDocs = [...backendDocs, ...localDocs];
    setResumes(allDocs.filter(d => d.type === 'resume'));
    setCoverLetters(allDocs.filter(d => d.type === 'cover-letter'));
    setLoading(false);
  }, [getDocuments]);

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

  const goals = [
    { name: "Resume Building", icon: FileText },
    { name: "Job Search", icon: Briefcase },
    { name: "Interview Prep", icon: Mic2 },
    { name: "Career Path", icon: GraduationCap }
  ];

  const mainNav = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: FileText, label: "My Documents", count: resumes.length + coverLetters.length },
    { icon: Target, label: "Application Tracker" },
  ];

  const toolsNav = [
    { icon: Zap, label: "AI Tailor", isNew: true },
    { icon: CheckCheck, label: "ATS Cheker" },
    { icon: DockIcon, label: "Resume Builder" },
    { icon: BarChart3, label: "Market Insights" },
    { icon: Share2, label: "Outreach" },


  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar - Refined Minimalist */}
      <aside className="w-72 h-full border-r border-slate-200/60 flex flex-col py-8 px-5 flex-shrink-0 bg-white/50 backdrop-blur-3xl">
        <div className="mb-10 px-3">
          <Link href="/" className="inline-block transition-all hover:opacity-80 active:scale-95">
            <Image
              src="/logo.png"
              alt="ProfResume"
              width={120}
              height={26}
              priority
            />
          </Link>
        </div>


        {/* Improved User Profile Section */}
        <div className="group relative p-3 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-white shadow-md flex items-center justify-center text-white font-bold text-xs">
                {user?.picture ? (
                  <img src={user.picture} alt="" className="w-full h-full object-cover" />
                ) : (
                  (user?.name?.[0] || 'G')
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-[13px] text-gray-900 truncate leading-tight tracking-tight">
                {isLoggedIn ? (user?.name || user?.email?.split('@')[0]) : "Guest Explorer"}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Professional Site</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
          <div>
            <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Core</p>
            <div className="space-y-0.5">
              {mainNav.map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all group ${item.active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-bold"
                    : "text-gray-500 hover:bg-gray-50 font-semibold"
                    }`}
                >
                  <item.icon size={16} strokeWidth={item.active ? 2.5 : 2} />
                  <span className="text-[13px] flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && !item.active && (
                    <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">{item.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Power Tools</p>
            <div className="space-y-0.5">
              {toolsNav.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-gray-500 hover:bg-gray-50 font-semibold group"
                >
                  <div className={`p-1 rounded-lg transition-colors ${item.isNew ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"}`}>
                    <item.icon size={14} />
                  </div>
                  <span className="text-[13px] flex-1 text-left">{item.label}</span>
                  {item.isNew && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-4 px-2">

          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all group  bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-bold`}
          >
            <Globe />
            <span className="text-[13px] flex-1 text-left">Go to Main Site</span>

          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-transparent">
        {/* Superior Header */}
        <header className="h-[90px] px-10 flex items-center justify-between flex-shrink-0 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-40">
          <div className="relative group max-w-md w-full mr-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4.5 h-4.5 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search workspaces & documents..."
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 text-gray-400 hover:text-indigo-600 transition-all">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-[#F8FAFC] rounded-full"></span>
            </button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
            <button onClick={() => router.push("/subscription")} className="flex items-center gap-2.5 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-wider shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition-all active:scale-95">
              <Sparkles size={16} fill="white" />
              Go Pro
            </button>
            <button onClick={logout} className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all border border-gray-200 group">
              <LogOut size={20} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </header>

        <main className="px-12 py-6 max-w-[1400px] mx-auto w-full">
          {/* Immersive Welcome Area */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">Welcome Back</span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-100 to-transparent"></div>
            </div>
            <h1 className="text-[32px] font-black text-gray-900 leading-[1.2] tracking-tight">
              Design your future, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">{isLoggedIn ? user?.name : "Explorer"}</span>
            </h1>
          </div>

          {/* New Advanced Goal Navigator */}
          <div className="relative mb-8 p-2 bg-slate-200/50 rounded-[2.25rem] w-fit backdrop-blur-md border border-white">
            <div className="flex items-center">
              {goals.map((goal, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGoal(goal.name)}
                  className={`relative flex items-center gap-3 px-8 py-3.5 rounded-[1.75rem] text-[13px] font-black transition-all z-10 ${activeGoal === goal.name
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <goal.icon size={16} strokeWidth={activeGoal === goal.name ? 2.5 : 2} />
                  {goal.name}
                  {activeGoal === goal.name && (
                    <div className="absolute inset-0 bg-indigo-600 rounded-[1.75rem] -z-10 shadow-lg shadow-indigo-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-20 items-stretch">
            {activeGoal === "Resume Building" ? (
              <>
                {/* Unique Health/Progress Card */}
                <div className="xl:col-span-1 bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                      <h3 className="text-lg font-black text-slate-900">Career Pulse</h3>
                      <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                        <BarChart3 size={20} />
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center flex-1 my-6 relative">
                      {/* Radial Progress Visual */}
                      <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 flex items-center justify-center relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle
                            cx="50%" cy="50%" r="88"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            className="text-indigo-600"
                            strokeDasharray="552"
                            strokeDashoffset="469"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="text-center">
                          <span className="text-4xl font-black text-slate-900">15%</span>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ready</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-indigo-500" />
                          <span className="text-[13px] font-bold">Resume Quality</span>
                        </div>
                        <span className="text-[13px] font-black text-emerald-500">Optimum</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Target size={16} className="text-amber-500" />
                          <span className="text-[13px] font-bold">Market Reach</span>
                        </div>
                        <span className="text-[13px] font-black text-slate-300">Inactive</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Smart Insight Card */}
                <div className="xl:col-span-2 bg-indigo-950 rounded-[2.5rem] p-10 relative overflow-hidden group border border-indigo-900 shadow-2xl">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-6 animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest leading-none">AI Insight Engine</span>
                    </div>

                    <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight mb-4 max-w-lg">
                      Level up your profile <br />
                      to reach <span className="text-indigo-400">95% score</span>
                    </h2>

                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm mb-8">
                      Our algorithm detected missing industry keywords. Adding them could increase your recruiter visibility by 3.4x.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all cursor-pointer">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                          <Plus size={16} />
                        </div>
                        <p className="text-[12px] font-extrabold text-white mb-0.5">Add Accomplishments</p>
                        <span className="text-[10px] font-bold text-indigo-400">+35% Exposure</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-950/40 hover:bg-indigo-500 transition-all cursor-pointer">
                        <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center mb-3">
                          <Zap size={16} fill="white" />
                        </div>
                        <p className="text-[12px] font-extrabold mb-0.5">Boost with AI</p>
                        <span className="text-[10px] font-bold text-indigo-200 tracking-wide">Optimize Metadata</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Document Mesh */}
                  <div className="absolute -right-20 -bottom-10 w-[400px] h-full opacity-10 pointer-events-none skew-x-[-12deg] group-hover:skew-x-[-6deg] transition-all duration-1000">
                    <div className="w-full h-full bg-gradient-to-t from-white to-transparent rounded-t-[4rem]"></div>
                  </div>
                </div>

                {/* Dashboard Launchpad */}
                <div className="col-span-full mt-12 mb-12">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Launchpad</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                      href="/editor"
                      className="group p-6 bg-indigo-600 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-indigo-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                          <Plus size={24} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-white font-black text-sm tracking-tight">Create Resume</p>
                          <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider">Start from scratch</p>
                        </div>
                      </div>
                      <ChevronRight className="text-white/40 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/cover-letter"
                      className="group p-6 bg-white border border-gray-200 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all shadow-sm hover:shadow-xl hover:shadow-gray-200/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-gray-900 font-black text-sm tracking-tight">Cover Letter</p>
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Perfect match</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-200 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/tailor"
                      className="group p-6 bg-white border border-gray-200 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all shadow-sm hover:shadow-xl hover:shadow-gray-200/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                          <Zap size={24} className="fill-amber-500 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-black text-sm tracking-tight">Tailor Resume</p>
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Optimize with AI</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-200 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>

                {/* Recents Area */}
                <div className="col-span-full mt-10 mb-10">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-[20px] font-black tracking-tight">Recent Projects</h3>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-slate-500 font-black text-[11px] uppercase tracking-widest hover:text-slate-900 transition-all">View All</button>
                      <div className="w-[1px] h-4 bg-slate-200"></div>
                      <Link href="/editor" className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-[12px] hover:shadow-lg transition-all active:scale-95">
                        <Plus size={16} /> New Project
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resumes.slice(0, 3).map((resume: SavedDocument) => (
                      <div key={resume.id || resume._id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-200/60 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col h-64 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <FileText size={24} />
                          </div>
                          <div className="flex gap-1">
                            <button className="p-2 text-slate-400 hover:text-rose-500 transition-all" onClick={() => handleDelete(resume._id || resume.id, 'resume', resume.title)}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors truncate">{resume.title || "Untitled Masterpiece"}</h4>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            {getTimeAgo(resume.lastModified)}
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className={resume._id?.startsWith('doc_') ? "" : "text-indigo-500"}>
                              {resume._id?.startsWith('doc_') ? "LOCAL SPACE" : "CLOUD SYNC"}
                            </span>
                          </p>
                        </div>
                        <Link
                          href={`/editor?id=${resume._id || resume.id}`}
                          className="mt-6 py-3 px-6 bg-slate-50 text-slate-900 rounded-2xl font-black text-[12px] uppercase tracking-widest text-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"
                        >
                          Edit Project
                        </Link>
                      </div>
                    ))}

                    {resumes.length === 0 && !loading && (
                      <Link href="/editor" className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 text-slate-300 hover:bg-white hover:border-indigo-500 hover:text-indigo-500 transition-all duration-500 group h-64 bg-slate-50/50">
                        <div className="w-16 h-16 rounded-3xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <Plus size={32} />
                        </div>
                        <span className="font-black text-[12px] uppercase tracking-[0.2em]">Start New Creation</span>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : activeGoal === "Job Search" ? (
              <div className="col-span-full">
                <ComingSoon
                  title="Job Search Engine"
                  icon={Briefcase}
                  description="Automate your job search with our AI-powered tracker. Sync with top job boards, track applications, and get personalized job recommendations based on your resume."
                />
              </div>
            ) : activeGoal === "Interview Prep" ? (
              <div className="col-span-full">
                <ComingSoon
                  title="Interview Coach"
                  icon={Mic2}
                  description="Master your interviews with our AI coach. Practice with real-time feedback on your answers, body language (voice only for now), and industry-specific questions."
                />
              </div>
            ) : (
              <div className="col-span-full">
                <ComingSoon
                  title="Career Path Architect"
                  icon={GraduationCap}
                  description="Visualize your professional growth. Get a step-by-step roadmap for your dream role, including skill gap analysis and recommended certifications."
                />
              </div>
            )}
          </div>
        </main>

        <Dialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog(prev => ({ ...prev, isOpen: false }))}
          title="Destroy Record"
          description={`Warning: Deleting "${deleteDialog.title}" will purge it from our systems. This action cannot be reversed.`}
          type="confirm"
          primaryActionLabel="Confirm Deletion"
          onPrimaryAction={confirmDelete}
          secondaryActionLabel="Preserve Document"
        />
      </div>
    </div>
  );
}
