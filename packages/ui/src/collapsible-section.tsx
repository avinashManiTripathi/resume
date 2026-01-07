"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CircleMinus, CirclePlus } from "lucide-react";

interface CollapsibleSectionProps {
    title: string;
    customTitleRender?: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    isCollapsible?: boolean;
}

export function CollapsibleSection({
    title,
    customTitleRender,
    children,
    defaultOpen = true,
    icon,
    isCollapsible = true,
    actions,
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const className = 'bg-white m-0 md:m-3'

    const overrideClass = className + " " + (isCollapsible ? "border rounded-lg border-gray-200" : "");

    return (
        <div className={overrideClass}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    {icon}
                    {customTitleRender || <span className="font-medium text-gray-900 ">{title}</span>}
                </div>
                <div className="flex items-center gap-2">
                    {actions}
                    {isCollapsible && (isOpen ? (
                        <CircleMinus className="w-5 h-5 text-[#223DC5]" />
                    ) : (
                        <CirclePlus className="w-5 h-5 text-[#223DC5]" />
                    ))}
                </div>
            </div>
            {(isOpen || !isCollapsible) && <div className="px-6 pb-6">{children}</div>}
        </div>
    );
}
