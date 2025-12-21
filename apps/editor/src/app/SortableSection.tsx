"use client";

import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { CollapsibleSection } from "@repo/ui/collapsible-section";

interface SortableSectionProps {
    id: string;
    title: string;
    defaultOpen?: boolean;
    isCollapsible?: boolean;
    children: React.ReactNode;
}

export function SortableSection({ id, title, defaultOpen, isCollapsible, children }: SortableSectionProps) {
    const [mounted, setMounted] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    useEffect(() => {
        setMounted(true);
    }, []);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <CollapsibleSection
                title={title}
                icon={
                    mounted ? (
                        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                    ) : (
                        <GripVertical className="w-5 h-5 text-gray-400" />
                    )
                }
                defaultOpen={defaultOpen}
                isCollapsible={isCollapsible}
            >
                {children}
            </CollapsibleSection>
        </div>
    );
}
