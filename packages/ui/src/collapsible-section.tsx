"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
}

export function CollapsibleSection({
    title,
    children,
    defaultOpen = true,
    icon,
    actions,
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200 bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-medium text-gray-900">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    {actions}
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </div>
            </button>
            {isOpen && <div className="px-6 pb-6">{children}</div>}
        </div>
    );
}
