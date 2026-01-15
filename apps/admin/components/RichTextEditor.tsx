"use client";

import { useRef, useState, useEffect } from "react";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Image as ImageIcon,
    Code,
    Quote,
    Eye,
    EyeOff,
    BoxSelect,
} from "lucide-react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Start writing your content here...",
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (editorRef.current && !editorRef.current.innerHTML && value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const executeCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateContent();
        updateFormatState();
    };

    const updateContent = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const updateFormatState = () => {
        const formats = new Set<string>();
        if (document.queryCommandState("bold")) formats.add("bold");
        if (document.queryCommandState("italic")) formats.add("italic");
        if (document.queryCommandState("underline")) formats.add("underline");
        setSelectedFormat(formats);
    };

    const insertImage = () => {
        const url = prompt("Enter image URL:");
        if (url) {
            executeCommand("insertImage", url);
        }
    };

    const insertLink = () => {
        const url = prompt("Enter link URL:");
        if (url) {
            executeCommand("createLink", url);
        }
    };

    const wrapInSection = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            alert("Please select content to wrap in a section");
            return;
        }

        const sectionId = prompt("Enter section ID (e.g., introduction, features):");
        if (!sectionId) {
            return;
        }

        // Validate ID (alphanumeric and hyphens only)
        const validId = sectionId.replace(/[^a-z0-9-]/gi, '-').toLowerCase();

        const range = selection.getRangeAt(0);
        const selectedContent = range.extractContents();

        // Create section element
        const section = document.createElement('section');
        section.id = validId;
        section.className = 'blog-section';
        section.appendChild(selectedContent);

        // Insert the section
        range.insertNode(section);

        // Clear selection
        selection.removeAllRanges();

        updateContent();
        editorRef.current?.focus();
    };

    const convertToHeading = (tag: string) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        // Get the parent element
        let element = range.commonAncestorContainer as HTMLElement;
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement as HTMLElement;
        }

        // Find the block-level element to convert
        while (element && element !== editorRef.current &&
            !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE'].includes(element.tagName)) {
            element = element.parentElement as HTMLElement;
        }

        if (element && element !== editorRef.current) {
            // Create new heading element
            const newHeading = document.createElement(tag);
            newHeading.innerHTML = element.innerHTML;

            // Copy any attributes except style
            Array.from(element.attributes).forEach(attr => {
                if (attr.name !== 'style') {
                    newHeading.setAttribute(attr.name, attr.value);
                }
            });

            // Replace the element
            element.replaceWith(newHeading);

            // Restore selection
            const newRange = document.createRange();
            newRange.selectNodeContents(newHeading);
            selection.removeAllRanges();
            selection.addRange(newRange);

            updateContent();
        } else {
            // Fallback to standard formatBlock
            executeCommand('formatBlock', `<${tag}>`);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();

        const html = e.clipboardData.getData("text/html");
        const text = e.clipboardData.getData("text/plain");

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();

        let fragment = document.createDocumentFragment();

        if (html) {
            // Normal websites
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            doc.querySelectorAll("meta, script, style").forEach(el => el.remove());

            Array.from(doc.body.childNodes).forEach(node => {
                fragment.appendChild(node);
            });
        } else {
            // ChatGPT fallback formatting
            const formattedHtml = text
                .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/gim, "<em>$1</em>")
                .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
                .replace(/`(.*?)`/gim, "<code>$1</code>")
                .replace(/\n{2,}/g, "</p><p>")
                .replace(/\n/g, "<br/>");

            const container = document.createElement("div");
            container.innerHTML = `<p>${formattedHtml}</p>`;
            Array.from(container.childNodes).forEach(n => fragment.appendChild(n));
        }

        range.insertNode(fragment);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

        updateContent();
    };


    const toolbarButtons = [
        {
            icon: Bold,
            command: "bold",
            title: "Bold",
            isActive: selectedFormat.has("bold"),
        },
        {
            icon: Italic,
            command: "italic",
            title: "Italic",
            isActive: selectedFormat.has("italic"),
        },
        {
            icon: Underline,
            command: "underline",
            title: "Underline",
            isActive: selectedFormat.has("underline"),
        },
        {
            icon: Heading1,
            command: "heading",
            value: "h1",
            title: "Heading H1 (Large)",
        },
        {
            icon: Heading2,
            command: "heading",
            value: "h2",
            title: "Heading H2 (Medium)",
        },
        { icon: List, command: "insertUnorderedList", title: "Bullet List" },
        { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
        { icon: Quote, command: "formatBlock", value: "<blockquote>", title: "Quote" },
        { icon: Code, command: "formatBlock", value: "<pre>", title: "Code Block" },
    ];

    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-3 border-b border-gray-200 bg-gray-50 flex-wrap">
                {toolbarButtons.map((btn, idx) => {
                    const Icon = btn.icon;
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => {
                                if (btn.command === 'heading' && btn.value) {
                                    convertToHeading(btn.value);
                                } else {
                                    executeCommand(btn.command, btn.value);
                                }
                            }}
                            className={`p-2 rounded-lg transition-colors ${btn.isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-600 hover:bg-gray-200"
                                }`}
                            title={btn.title}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    );
                })}

                <div className="w-[1px] h-6 bg-gray-300 mx-1" />

                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                    title="Insert Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={insertImage}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                    title="Insert Image"
                >
                    <ImageIcon className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-6 bg-gray-300 mx-1" />

                <button
                    type="button"
                    onClick={wrapInSection}
                    className="p-2 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors"
                    title="Wrap in Section (for TOC)"
                >
                    <BoxSelect className="w-4 h-4" />
                </button>

                <div className="ml-auto flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${showPreview
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        {showPreview ? (
                            <>
                                <EyeOff className="w-4 h-4" />
                                <span className="text-sm font-medium">Edit</span>
                            </>
                        ) : (
                            <>
                                <Eye className="w-4 h-4" />
                                <span className="text-sm font-medium">Preview</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor / Preview */}
            {showPreview ? (
                <div className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: value || "<p>No content yet...</p>" }} />
                </div>
            ) : (
                <div
                    ref={editorRef}
                    contentEditable
                    className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto focus:outline-none prose prose-sm max-w-none"
                    onInput={updateContent}
                    onKeyUp={updateFormatState}
                    onMouseUp={updateFormatState}
                    onPaste={handlePaste}
                    data-placeholder={placeholder}
                    style={{
                        whiteSpace: "pre-wrap",
                    }}
                />
            )}

            <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }
        
        /* Formatting styles */
        [contenteditable] strong,
        [contenteditable] b {
          font-weight: 700;
        }

        [contenteditable] em,
        [contenteditable] i {
          font-style: italic;
        }

        [contenteditable] u {
          text-decoration: underline;
        }

        [contenteditable] s,
        [contenteditable] strike {
          text-decoration: line-through;
        }

        /* Image styles */
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 16px 0;
        }

        /* Heading styles */
        [contenteditable] h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem;
          color: #111827;
        }

        [contenteditable] h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem;
          color: #1f2937;
        }

        [contenteditable] h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem;
          color: #374151;
        }

        [contenteditable] h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: #374151;
        }

        /* Blockquote styles */
        [contenteditable] blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }

        /* Code block styles */
        [contenteditable] pre {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        [contenteditable] code {
          background: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        /* List styles */
        [contenteditable] ul,
        [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        [contenteditable] li {
          margin: 0.5rem 0;
        }

        /* Link styles */
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }

        /* Paragraph spacing */
        [contenteditable] p {
          margin: 0.75rem 0;
        }

        /* Div spacing */
        [contenteditable] div {
          margin: 0.5rem 0;
        }

        /* Section styles */
        [contenteditable] section {
          margin: 2rem 0;
          padding: 1.5rem;
          border-left: 3px solid #8b5cf6;
          background: #faf5ff;
          border-radius: 0.5rem;
          position: relative;
        }

        [contenteditable] section::before {
          content: "Section: " attr(id);
          display: block;
          font-size: 0.75rem;
          color: #8b5cf6;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        /* Ensure headings inside sections maintain their styles */
        [contenteditable] section h1,
        [contenteditable] section h2,
        [contenteditable] section h3,
        [contenteditable] section h4 {
          all: revert;
          font-size: inherit;
          font-weight: inherit;
          margin: inherit;
          color: inherit;
        }

        [contenteditable] section h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem;
          color: #111827;
        }

        [contenteditable] section h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem;
          color: #1f2937;
        }

        [contenteditable] section h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem;
          color: #374151;
        }

        [contenteditable] section h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: #374151;
        }

        [contenteditable]:focus {
          outline: none;
        }
      `}</style>
        </div>
    );
}
