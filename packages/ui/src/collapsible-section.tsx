"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CircleMinus, CirclePlus } from "lucide-react";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    isCollapsible?: boolean;
}

export function CollapsibleSection({
    title,
    children,
    defaultOpen = true,
    icon,
    isCollapsible = true,
    actions,
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const overrideClass = "bg-white m-3 " + (isCollapsible ? "border rounded-lg border-gray-200" : "");

    return (
        <div className={overrideClass}>
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
                    {isCollapsible && (isOpen ? (
                        <CircleMinus className="w-5 h-5 text-[#223DC5]" />
                    ) : (
                        <CirclePlus className="w-5 h-5 text-[#223DC5]" />
                    ))}
                </div>
            </button>
            {(isOpen || !isCollapsible) && <div className="px-6 pb-6">{children}</div>}
        </div>
    );
}
