"use client";

import { Button } from "@repo/ui/button";
import { LucideIcon, Sparkles } from "lucide-react";

interface ComingSoonProps {
    title: string;
    icon: LucideIcon;
    description: string;
}

export function ComingSoon({ title, icon: Icon, description }: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in duration-700">
            <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Icon size={28} strokeWidth={2.5} />
                </div>
            </div>

            <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">
                {title}
            </h2>

            <p className="max-w-xs text-xs text-gray-500 font-bold leading-relaxed mb-6">
                {description}
            </p>

            <Button variant="primary">
                Get Notified
            </Button>

        </div>
    );
}
