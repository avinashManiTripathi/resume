import { useRef } from "react";

interface HtmlEditorProps {
    value: string;
    onChange?: (value: string) => void;
    name: string;
    placeholder?: string;
    className?: string;
}

export const HtmlEditor = ({ value, onChange, name, placeholder, className }: HtmlEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const format = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (onChange && editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (onChange && editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div className={className}>
            {/* Toolbar */}
            <div className="mb-2 flex flex-wrap gap-1">
                <button type="button" onClick={() => format("bold")} className="px-2 py-1 bg-gray-200 rounded">B</button>
                <button type="button" onClick={() => format("italic")} className="px-2 py-1 bg-gray-200 rounded">I</button>
                <button type="button" onClick={() => format("underline")} className="px-2 py-1 bg-gray-200 rounded">U</button>
                <button type="button" onClick={() => format("insertOrderedList")} className="px-2 py-1 bg-gray-200 rounded">OL</button>
                <button type="button" onClick={() => format("insertUnorderedList")} className="px-2 py-1 bg-gray-200 rounded">UL</button>
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt("Enter URL");
                        if (url) format("createLink", url);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded"
                >
                    Link
                </button>
            </div>

            {/* Editable div */}
            <div
                ref={editorRef}
                className="w-full h-48 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 overflow-auto"
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                data-placeholder={placeholder}
                dangerouslySetInnerHTML={{ __html: value }}
            ></div>
        </div>
    );
};
