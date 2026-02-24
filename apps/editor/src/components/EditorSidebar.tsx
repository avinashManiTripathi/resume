"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    LayoutGrid,
    Wand2,
    FileText,
    LogOut,
    ScanSearch,
    CreditCard,
    Trophy,
    Settings2,
    Download,
    LayoutTemplate,
    FileUp,
    X
} from "lucide-react";
import { Tooltip } from "@repo/ui/tooltip";
import { usePersistence } from "../app/hooks/usePersistence";
import { ENV } from "@/app/env";
import { TypographyPanelContent } from "@repo/ui/profile-header";
import { useState, useRef, useEffect } from "react";

interface EditorSidebarProps {
    onTabChange?: (tab: string) => void;
    activeTab?: string;
    onBuildWithAI?: () => void;
    onImportResume?: () => void;
    onTemplate?: () => void;
    onTypography?: () => void;
    onDownload?: () => void;
    page?: "resume" | "cover-letter";
    typographySettings?: any;
    onTypographyChange?: (settings: any) => void;
}

export function EditorSidebar({
    onTabChange,
    activeTab: propActiveTab,
    onBuildWithAI,
    onImportResume,
    onTemplate,
    onTypography,
    onDownload,
    page,
    typographySettings,
    onTypographyChange
}: EditorSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { logout } = usePersistence();
    const [showTypography, setShowTypography] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setShowTypography(false);
            }
        };

        if (showTypography) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showTypography]);

    // Determine active tab from prop, query param, or pathname
    const activeTab = propActiveTab || searchParams.get('tab') || (pathname === '/editor' ? 'editor' : pathname.split('/')[1]);

    const menuItems = [
        {
            label: "Dashboard",
            id: "dashboard",
            icon: LayoutGrid,
            onClick: () => window.location.href = ENV.EDITOR_URL
        },
        {
            label: "Build with AI",
            id: "build-ai",
            icon: Wand2,
            onClick: onBuildWithAI
        },
        {
            label: "Import Resume",
            id: "import-resume",
            icon: FileUp,
            onClick: onImportResume
        },
        {
            label: "Typography",
            id: "typography",
            icon: Settings2,
            onClick: () => {
                setShowTypography(!showTypography);
                if (onTypography) onTypography();
            }
        },
        {
            label: "Template",
            id: "template",
            icon: LayoutTemplate,
            onClick: onTemplate
        },
        // {
        //     label: "Check ATS",
        //     id: "check-ats",
        //     icon: ScanSearch,
        //     onClick: () => router.push(`/ats-check${window.location.search}`)
        // },
        // ...(page !== "cover-letter" ? [{
        //     label: "Cover Letter",
        //     id: "cover-letter",
        //     icon: FileText,
        //     onClick: () => router.push(`/cover-letter`)
        // }] : [{
        //     label: "Resume",
        //     id: "resume",
        //     icon: FileText,
        //     onClick: () => router.push(`/editor`)
        // }]),

        {
            label: "Download PDF",
            id: "download",
            icon: Download,
            onClick: onDownload
        }
    ];

    const isActive = (item: typeof menuItems[0]) => {
        if (item.id === 'dashboard' && activeTab === 'editor' && !onTemplate && !onTypography) return false;
        // Logic for local state 'active' is tricky without passing state back.
        // For now we rely on clicking action.
        // But we can check if 'onTemplate' is active by some prop?
        return false;
    };

    const getItemStyles = (item: typeof menuItems[0]) => {
        const baseClass = "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95";

        if (item.label === "Build with AI") {
            return `${baseClass} bg-pink-50/40 text-pink-600 hover:bg-pink-100 hover:text-pink-700`;
        }

        if (item.label === "Template") {
            return `${baseClass} bg-indigo-50/40 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700`;
        }

        if (item.label === "Import Resume") {
            return `${baseClass} bg-violet-50/40 text-violet-600 hover:bg-violet-100 hover:text-violet-700`;
        }

        if (item.label === "Typography") {
            return `${baseClass} bg-cyan-50/40 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700`;
        }

        if (item.label === "Check ATS") {
            return `${baseClass} bg-amber-50/40 text-amber-600 hover:bg-amber-100 hover:text-amber-700`;
        }

        if (item.label === "Cover Letter") {
            return `${baseClass} bg-blue-50/40 text-blue-600 hover:bg-blue-100 hover:text-blue-700`;
        }

        if (item.label === "Download PDF") {
            return `${baseClass} bg-emerald-50/40 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700`;
        }

        // Default / Dashboard
        return `${baseClass} bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800`;
    };

    return (
        <div ref={sidebarRef} className="w-20 md:w-24 h-screen bg-white border-r border-slate-200 flex flex-col items-center pb-2 md:pb-5 shrink-0 z-50">
            {/* Logo area */}
            <div className="h-[72px] shrink-0 w-full flex items-center justify-center border-b border-slate-200/60 mb-6 bg-white">
                <button
                    onClick={() => window.location.href = ENV.EDITOR_URL}
                    className="w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <img src="/apple-touch-icon.png" alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col gap-2 w-full px-2">
                {menuItems.map((item, index) => (
                    <div key={index} className="relative group flex flex-col items-center">
                        <Tooltip content={item.label} position="right">
                            <button
                                onClick={item.onClick}
                                className={getItemStyles(item).replace('w-10 h-10 md:w-12 md:h-12', 'w-full aspect-square md:aspect-auto md:py-3').replace('rounded-2xl', 'rounded-xl') + " flex-col gap-1.5 p-2 h-auto" + (item.id === 'typography' && showTypography ? " ring-2 ring-indigo-500 ring-offset-2" : "")}
                            >
                                <item.icon size={22} strokeWidth={2} className="shrink-0" />
                                <span className="text-[10px] font-medium leading-none text-center">{item.label}</span>
                            </button>
                        </Tooltip>

                        {/* Typography Popup inside the sidebar item */}
                        {item.id === 'typography' && showTypography && (
                            <div
                                className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 z-[100] w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-sm">
                                    <div className="text-left">
                                        <h2 className="text-base font-bold text-slate-800">Typography</h2>
                                        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-0.5">Global Styles</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowTypography(false); }}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-5 max-h-[65vh] overflow-y-auto custom-scrollbar bg-white text-left">
                                    {typographySettings && (
                                        <TypographyPanelContent
                                            settings={typographySettings}
                                            onChange={onTypographyChange}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 w-full px-3 mt-auto">
                <div className="relative group flex justify-center">
                    <Tooltip content="Logout" position="right">
                        <button
                            onClick={logout}
                            className="w-full aspect-square md:aspect-auto md:py-3 flex flex-col items-center justify-center rounded-xl transition-all duration-300 bg-rose-50/40 text-rose-500 hover:bg-rose-100 hover:text-rose-700 hover:scale-105 active:scale-95 p-2 gap-1.5"
                        >
                            <LogOut size={20} strokeWidth={2} />
                            <span className="text-[10px] font-medium leading-none text-center">Logout</span>
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
