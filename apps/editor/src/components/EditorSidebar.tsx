"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    LayoutGrid,
    ShieldCheck,
    Wand2,
    FileText,
    LogOut,
    ArrowLeft,
    Settings,
    User
} from "lucide-react";
import { Tooltip } from "@repo/ui/tooltip";
import { usePersistence } from "../app/hooks/usePersistence";

export function EditorSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { logout } = usePersistence();

    const menuItems = [
        // {
        //     label: "Go Back",
        //     icon: ArrowLeft,
        //     onClick: () => router.back(),
        //     variant: "secondary"
        // },
        {
            label: "Dashboard",
            icon: LayoutGrid,
            href: "https://editor.hirecta.com", // Assuming dashboard route or external
            onClick: () => window.location.href = "https://editor.hirecta.com" // Adjust to actual dashboard URL
        },
        {
            label: "ATS Check",
            icon: ShieldCheck,
            href: "/ats-check",
            onClick: () => router.push("/ats-check")
        },
        {
            label: "Tailor",
            icon: Wand2,
            href: "/tailor",
            onClick: () => router.push("/tailor")
        },
        {
            label: "Cover Letter",
            icon: FileText,
            href: "/cover-letter",
            onClick: () => router.push("/cover-letter")
        }
    ];

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <div className="w-16 md:w-20 h-screen bg-white border-r border-slate-200 flex flex-col items-center py-6 shrink-0 z-50">
            {/* Logo area */}
            <div className="mb-6 pb-6 border-b border-slate-100 w-full flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center">
                    <img src="/apple-touch-icon.png" alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col gap-4 w-full px-3">
                {menuItems.map((item, index) => (
                    <div key={index} className="relative group flex justify-center">
                        <Tooltip content={item.label} position="right">
                            <button
                                onClick={item.onClick}
                                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-200 border ${(item.href && isActive(item.href))
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm border-indigo-200"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-sm"
                                    }`}
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
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-200 border bg-white text-slate-500 border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
                        >
                            <LogOut size={20} strokeWidth={2} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
