"use client";

import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2Icon } from "lucide-react";

interface SortableItemProps {
    id: string;
    index: number;
    label: string;
    onRemove: () => void;
    children: React.ReactNode;
}

export function SortableItem({ id, index, label, onRemove, children }: SortableItemProps) {
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
        <div
            ref={setNodeRef}
            style={style}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {mounted ? (
                        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                    ) : (
                        <GripVertical className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm font-semibold text-gray-700">
                        {index + 1}. {label}
                    </span>
                </div>
                <button
                    onClick={onRemove}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-medium"
                >
                    <Trash2Icon className="w-3 h-3" />
                    <span>Delete</span>
                </button>
            </div>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}
