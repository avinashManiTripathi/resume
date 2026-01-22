"use client";

import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2Icon } from "lucide-react";
import { CollapsibleSection } from "@repo/ui/collapsible-section";

interface SortableSectionProps {
    id: string;
    title: string;
    defaultOpen?: boolean;
    isCollapsible?: boolean;
    onTitleChange?: (newTitle: string) => void;
    onDelete?: () => void;
    canEdit?: boolean;
    children: React.ReactNode;
}

export function SortableSection({ id, title, defaultOpen, isCollapsible, onTitleChange, onDelete, canEdit = true, children }: SortableSectionProps) {
    const [mounted, setMounted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);

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

    useEffect(() => {
        setEditValue(title);
    }, [title]);

    const handleSave = () => {
        if (editValue.trim() && editValue !== title && onTitleChange) {
            onTitleChange(editValue.trim());
        } else {
            setEditValue(title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditValue(title);
            setIsEditing(false);
        }
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <CollapsibleSection
                title={title}
                customTitleRender={canEdit && onTitleChange ? (
                    isEditing ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={handleKeyDown}
                            className="text-md font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 outline-none px-1 -ml-1"
                            autoFocus
                            maxLength={50}
                        />
                    ) : (
                        <div className="flex items-center gap-2 group">
                            <span className="text-md font-semibold text-gray-900">{title}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditing(true);
                                }}
                                className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                title="Edit section name"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    )
                ) : undefined}
                actionsEnd={
                    onDelete ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                            title="Delete section"
                        >
                            <Trash2Icon className="w-4 h-4" />
                        </button>
                    ) : undefined
                }
                icon={
                    mounted ? (
                        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-3 -m-3">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                    ) : (
                        <div className="p-3 -m-3">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
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
