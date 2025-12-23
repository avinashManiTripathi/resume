"use client";

import { useRef, useState, useEffect } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from "lucide-react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something...",
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value, mounted]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value?: string) => {
        // Focus the editor first to ensure selection is active
        editorRef.current?.focus();

        // Execute the command
        document.execCommand(command, false, value);

        // Trigger onChange to save the changes
        setTimeout(() => {
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
            }
        }, 10);
    };

    const insertLink = () => {
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
            alert("Please select some text first to create a link");
            return;
        }

        const url = prompt("Enter URL:");
        if (url) {
            execCommand("createLink", url);
        }
    };

    if (!mounted) {
        return <div className="h-[200px] bg-gray-50 border border-gray-200 rounded-lg animate-pulse" />;
    }

    return (
        <div className="rich-text-editor border border-gray-200 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                <button
                    type="button"
                    onClick={() => execCommand("bold")}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("italic")}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("underline")}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title="Underline"
                >
                    <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    type="button"
                    onClick={() => execCommand("insertUnorderedList")}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("insertOrderedList")}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 hover:bg-white rounded transition-colors text-gray-700 hover:text-gray-900"
                    title="Insert Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="p-4 min-h-[120px] focus:outline-none bg-white text-gray-900"
                data-placeholder={placeholder}
                style={{
                    minHeight: "120px",
                }}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
          .rich-text-editor [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }
          .rich-text-editor [contenteditable]:focus {
            outline: none;
          }
          .rich-text-editor ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }
          .rich-text-editor ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }
          .rich-text-editor li {
            margin: 0.25rem 0;
          }
          .rich-text-editor ul ul {
            list-style-type: circle;
          }
          .rich-text-editor ul ul ul {
            list-style-type: square;
          }
        `
            }} />
        </div>
    );
}
