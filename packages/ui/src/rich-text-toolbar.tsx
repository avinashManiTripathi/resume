"use client";

import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link } from "lucide-react";

interface RichTextToolbarProps {
    onFormat?: (format: string) => void;
}

export function RichTextToolbar({ onFormat }: RichTextToolbarProps) {
    const buttons = [
        { icon: Bold, action: "bold" },
        { icon: Italic, action: "italic" },
        { icon: Underline, action: "underline" },
        { icon: Strikethrough, action: "strikethrough" },
        { icon: List, action: "unordered-list" },
        { icon: ListOrdered, action: "ordered-list" },
        { icon: Link, action: "link" },
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-50 border border-gray-200 rounded-lg">
            {buttons.map(({ icon: Icon, action }, index) => (
                <button
                    key={action}
                    onClick={() => onFormat?.(action)}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title={action}
                >
                    <Icon className="w-4 h-4" />
                </button>
            ))}
        </div>
    );
}
