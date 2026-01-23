"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    LayoutGrid,
    Wand2,
    FileText,
    LogOut,
    ScanSearch,
    CreditCard,
    Trophy
} from "lucide-react";
import { Tooltip } from "@repo/ui/tooltip";
import { usePersistence } from "../app/hooks/usePersistence";

interface EditorSidebarProps {
    onTabChange?: (tab: string) => void;
    activeTab?: string;
}

export function EditorSidebar({ onTabChange, activeTab: propActiveTab }: EditorSidebarProps) {
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
            href: "https://editor.hirecta.com",
            onClick: () => window.location.href = "https://editor.hirecta.com"
        },
        {
            label: "ATS Check",
            id: "ats-check",
            icon: ScanSearch,
            href: "/ats-check",
            onClick: () => router.push("/ats-check")
        },
        {
            label: "Tailor",
            id: "tailor",
            icon: Trophy,
            href: "/tailor",
            onClick: () => router.push("/tailor")
        },
        {
            label: "Cover Letter",
            id: "cover-letter",
            icon: FileText,
            href: "/cover-letter",
            onClick: () => router.push("/cover-letter")
        },
        {
            label: "Subscription",
            id: "subscription",
            icon: CreditCard,
            href: "/",
            onClick: () => window.location.href = "/?tab=subscription"
        }
    ];

    const isActive = (item: typeof menuItems[0]) => {
        if (item.id === 'subscription' && activeTab === 'subscription') return true;
        if (item.id === 'dashboard' && activeTab === 'editor') return true;
        return pathname?.startsWith(item.href || '');
    };

    const getItemStyles = (item: typeof menuItems[0]) => {
        const active = isActive(item);
        const baseClass = "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl transition-all duration-300 border shadow-sm hover:scale-105 active:scale-95";

        if (item.label === "Tailor") {
            return `${baseClass} ${active
                ? "bg-amber-100 text-amber-700 border-amber-300 shadow-amber-100"
                : "bg-amber-50/40 text-amber-600 border-amber-100/50 hover:bg-amber-100 hover:text-amber-700 hover:border-amber-300 hover:shadow-amber-100"}`;
        }

        if (item.label === "ATS Check") {
            return `${baseClass} ${active
                ? "bg-emerald-100 text-emerald-700 border-emerald-300 shadow-emerald-100"
                : "bg-emerald-50/40 text-emerald-600 border-emerald-100/50 hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-100"}`;
        }

        if (item.label === "Cover Letter") {
            return `${baseClass} ${active
                ? "bg-purple-100 text-purple-700 border-purple-300 shadow-purple-100"
                : "bg-purple-50/40 text-purple-600 border-purple-100/50 hover:bg-purple-100 hover:text-purple-700 hover:border-purple-300 hover:shadow-purple-100"}`;
        }

        if (item.label === "Subscription") {
            return `${baseClass} ${active
                ? "bg-blue-100 text-blue-700 border-blue-300 shadow-blue-100"
                : "bg-blue-50/40 text-blue-600 border-blue-100/50 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 hover:shadow-blue-100"}`;
        }

        // Default / Dashboard / Editor
        return `${baseClass} ${active
            ? "bg-indigo-100 text-indigo-700 border-indigo-300 shadow-indigo-100"
            : "bg-indigo-50/40 text-indigo-600 border-indigo-100/50 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-300 hover:shadow-indigo-100"}`;
    };

    return (
        <div className="w-16 md:w-20 h-screen bg-white border-r border-slate-200 flex flex-col items-center py-2 md:py-5 shrink-0 z-50">
            {/* Logo area */}
            <div className="mb-6 pb-2 md:pb-5 border-b border-slate-100 w-full flex justify-center">
                <button
                    onClick={() => onTabChange ? onTabChange('editor') : router.push('/editor')}
                    className="w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <img src="/apple-touch-icon.png" alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col gap-4 w-full px-3">
                {menuItems.map((item, index) => (
                    <div key={index} className="relative group flex justify-center">
                        <Tooltip content={item.label} position="right">
                            <button
                                onClick={item.onClick}
                                className={getItemStyles(item)}
                            >
                                <item.icon size={20} strokeWidth={2} />
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
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl transition-all duration-300 border bg-rose-50/40 text-rose-500 border-rose-100/50 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700 hover:shadow-md hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <LogOut size={20} strokeWidth={2} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
