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
  Trash2
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getSubscription } from "@repo/utils-client";
import Image from "next/image";
import { usePersistence, SavedDocument } from "./hooks/usePersistence";
import { Dialog } from "@repo/ui/dialog";

export default function DashboardPage() {
  const subscription = getSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const { getDocuments, isLoggedIn, user, logout, deleteDocument } = usePersistence();

  const [resumes, setResumes] = useState<SavedDocument[]>([]);
  const [coverLetters, setCoverLetters] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);

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

    // Convert backend backendDocs (which are raw API responses) to SavedDocument if needed
    // usePersistence.getDocuments already returns merged lists in some forms, 
    // but here we need to filter by type.

    const allDocs = [...backendDocs, ...localDocs];
    setResumes(allDocs.filter(d => d.type === 'resume'));
    setCoverLetters(allDocs.filter(d => d.type === 'cover-letter'));
    setLoading(false);
  }, [getDocuments]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const formatDateTime = (date: string | Date | undefined) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

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

  return (
    <div className="h-screen bg-[#F0F4F8] flex text-gray-900 overflow-hidden text-sm">
      {/* Sidebar - Fixed height, smaller font */}
      <aside className="w-64 bg-[#F0F4F8] hidden lg:flex flex-col h-full py-6 px-5 flex-shrink-0">
        <div className="mb-8 flex items-center gap-2 px-2">
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <Image
              src="/logo.png"
              alt="ProfResume Logo"
              width={158}   // w-15 → 60px
              height={36}  // h-9 → 36px
              className="transition-transform group-hover:scale-105"
              priority
            />
          </Link>        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 bg-white shadow-sm border border-blue-50 text-blue-600 rounded-xl font-bold transition-all text-xs">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link href="/editor" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all font-semibold text-xs">
            <FileText size={16} />
            Resumes
          </Link>
          <Link href="/cover-letter" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all font-semibold text-xs">
            <Mail size={16} />
            Letters
          </Link>
          <Link href="/subscription" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all font-semibold text-xs">
            <CreditCard size={16} />
            Billing
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200 px-2">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all font-bold text-xs w-full text-left"
          >
            <LogOut size={16} />
            Sign Out
          </button>
          <div className="mt-5 p-4 bg-blue-600 rounded-2xl text-white relative overflow-hidden group cursor-pointer shadow-md shadow-blue-100">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles size={32} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-blue-100 mb-1">PRO PLAN</p>
            <p className="font-bold text-xs">Professional</p>
            <p className="text-[10px] text-blue-100 mt-2 font-medium opacity-80">Manage Plan →</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pr-4 md:pr-6 h-full py-4 md:py-6 overflow-hidden">
        <div className="bg-white lg:rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 h-full overflow-hidden flex flex-col">
          <header className="px-6 h-16 flex items-center justify-between border-b border-gray-50 flex-shrink-0">
            <div className="relative flex-1 max-w-xs hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Find document..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-gray-900">{isLoggedIn ? (user?.name || user?.email) : "Guest User"}</span>
                <span className="text-[9px] text-blue-500 font-extrabold uppercase tracking-widest">{isLoggedIn ? "PRO MEMBER" : "FREE PLAN"}</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer group">
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                )}
              </div>
            </div>
          </header>

          {/* Scrollable grid area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-1">Workspace</h1>
                <p className="text-gray-600 font-semibold text-xs">Manage your professional documents.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/editor" className="group flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-50 active:scale-95 text-xs">
                  <Plus size={16} className="group-hover:rotate-90 transition-transform" strokeWidth={3} />
                  New Resume
                </Link>
                <Link href="/cover-letter" className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold hover:border-blue-300 hover:text-blue-600 transition-all active:scale-95 text-xs">
                  <Mail size={16} />
                  New Letter
                </Link>
              </div>
            </div>

            {/* Bento Grid Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl text-white flex flex-col justify-between h-40 shadow-xl shadow-blue-50 relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Sparkles size={80} />
                </div>
                <div className="relative z-10">
                  <p className="text-[8px] font-black uppercase tracking-widest text-blue-100/60 mb-0.5">MEMBERSHIP</p>
                  <h3 className="text-xl font-bold">Pro Plan Active</h3>
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-blue-100/80">Next bill: Feb 12</p>
                  <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-bold hover:bg-white/20 transition-colors">
                    Billing
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl flex flex-col justify-between h-40 border border-transparent group hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 hover:border-gray-100 transition-all cursor-pointer">
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-0.5">DOCUMENTS</p>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 leading-none">{loading ? "..." : resumes.length}</h3>
                  <p className="text-[10px] font-bold text-gray-400 mt-1">Total Resumes</p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl flex flex-col justify-between h-40 border border-transparent group hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 hover:border-gray-100 transition-all cursor-pointer">
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-0.5">APPLIED</p>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 leading-none">{loading ? "..." : coverLetters.length}</h3>
                  <p className="text-[10px] font-bold text-gray-400 mt-1">Total Letters</p>
                </div>
              </div>
            </div>

            {/* Recent Items Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-md font-black text-gray-900 tracking-tight">Recent Resumes</h2>
                  <Link href="/editor" className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                    <ChevronRight size={18} className="text-gray-300" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {resumes.map((resume: SavedDocument) => (
                    <div key={resume.id || resume._id} className="group flex items-center gap-3 p-3 hover:bg-gray-50/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100">
                      <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 truncate text-xs">{resume.title || "Untitled Resume"}</h4>
                          {(resume._id || resume.id)?.startsWith('doc_') ? (
                            <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md font-black italic">LOCAL</span>
                          ) : (
                            <span className="text-[8px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded-md font-black italic">CLOUD</span>
                          )}
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5" title={formatDateTime(resume.lastModified)}>
                          {getTimeAgo(resume.lastModified)}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/editor?id=${resume._id || resume.id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all" title="Open Editor">
                          <ExternalLink size={16} />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(resume._id || resume.id, 'resume', resume.title);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                          title="Delete Resume"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <Link href="/editor" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-300 hover:text-blue-500 hover:bg-gray-50 transition-all font-bold text-xs group">
                    <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                    Create Document
                  </Link>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-md font-black text-gray-900 tracking-tight">Recent Letters</h2>
                  <Link href="/cover-letter" className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                    <ChevronRight size={18} className="text-gray-300" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {coverLetters.map((letter: SavedDocument) => (
                    <div key={letter.id} className="group flex items-center gap-3 p-3 hover:bg-gray-50/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100">
                      <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 truncate text-xs">{letter.title || "Untitled Letter"}</h4>
                          {letter.id?.startsWith('doc_') ? (
                            <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md font-black italic">LOCAL</span>
                          ) : (
                            <span className="text-[8px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded-md font-black italic">CLOUD</span>
                          )}
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5" title={formatDateTime(letter.lastModified)}>
                          {getTimeAgo(letter.lastModified)}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/cover-letter/create?id=${letter._id || letter.id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all" title="Open Editor">
                          <ExternalLink size={16} />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(letter._id || letter.id, 'cover-letter', letter.title);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                          title="Delete Letter"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <Link href="/cover-letter" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-300 hover:text-blue-500 hover:bg-gray-50 transition-all font-bold text-xs group">
                    <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                    Generate Letter
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Deletion Confirmation Dialog */}
      <Dialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog(prev => ({ ...prev, isOpen: false }))}
        title="Delete Document"
        description={`Are you sure you want to delete "${deleteDialog.title || 'this document'}"? This action cannot be undone.`}
        type="confirm"
        primaryActionLabel="Delete"
        onPrimaryAction={confirmDelete}
        secondaryActionLabel="Cancel"
      />
    </div>
  );
}
