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
    LayoutTemplate
} from "lucide-react";
import { Tooltip } from "@repo/ui/tooltip";
import { usePersistence } from "../app/hooks/usePersistence";
import { ENV } from "@/app/env";

interface EditorSidebarProps {
    onTabChange?: (tab: string) => void;
    activeTab?: string;
    onBuildWithAI?: () => void;
    onTemplate?: () => void;
    onTypography?: () => void;
    onDownload?: () => void;
}

export function EditorSidebar({
    onTabChange,
    activeTab: propActiveTab,
    onBuildWithAI,
    onTemplate,
    onTypography,
    onDownload
}: EditorSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { logout } = usePersistence();

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
            label: "Template",
            id: "template",
            icon: LayoutTemplate,
            onClick: onTemplate
        },
        {
            label: "Check ATS",
            id: "check-ats",
            icon: ScanSearch,
            onClick: () => router.push(`/ats-check${window.location.search}`)
        },
        {
            label: "Cover Letter",
            id: "cover-letter",
            icon: FileText,
            onClick: () => router.push(`/cover-letter${window.location.search}`)
        },
        {
            label: "Typography",
            id: "typography",
            icon: Settings2,
            onClick: onTypography
        },
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
        <div className="w-20 md:w-24 h-screen bg-white border-r border-slate-200 flex flex-col items-center py-2 md:py-5 shrink-0 z-50">
            {/* Logo area */}
            <div className="mb-6 pb-2 md:pb-5 border-b border-slate-100 w-full flex justify-center">
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
                                className={getItemStyles(item).replace('w-10 h-10 md:w-12 md:h-12', 'w-full aspect-square md:aspect-auto md:py-3').replace('rounded-2xl', 'rounded-xl') + " flex-col gap-1.5 p-2 h-auto"}
                            >
                                <item.icon size={22} strokeWidth={2} className="shrink-0" />
                                <span className="text-[10px] font-medium leading-none text-center">{item.label}</span>
                            </button>
                        </Tooltip>
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
