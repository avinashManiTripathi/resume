"use client";

import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2Icon, ChevronDown, ChevronUp } from "lucide-react";

interface SortableItemProps {
    id: string;
    index: number;
    label: string;
    onRemove: () => void;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function SortableItem({ id, index, label, onRemove, children, defaultOpen = false }: SortableItemProps) {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [overflow, setOverflow] = useState(isOpen ? 'visible' : 'hidden');

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

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove();
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setOverflow('visible'), 300); // Wait for transition
            return () => clearTimeout(timer);
        } else {
            setOverflow('hidden');
        }
    }, [isOpen]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => setIsOpen(true)}
            className={'p-4 bg-white rounded-lg border border-slate-200 shadow-sm transition-all duration-300 cursor-pointer ' + (!isOpen ? ' hover:bg-gray-50 transition-colors cursor-pointer group' : '')}
        >
            <div className={`flex items-center justify-between ${isOpen ? 'mb-4' : 'mb-0'} transition-all duration-300`}>
                <div className="flex items-center gap-2">
                    {mounted ? (
                        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 -m-2">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                    ) : (
                        <div className="p-2 -m-2">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                    )}
                    <span className="text-sm font-semibold text-gray-700">
                        {index + 1}. {label}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <Trash2Icon className="w-3.5 h-3.5" />
                        <span>Delete</span>
                    </button>
                    <button
                        className="p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors"
                        title={isOpen ? "Collapse" : "Expand"}
                    >
                        {isOpen ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ overflow }}
            >
                <div className="flex flex-wrap gap-2 pt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
