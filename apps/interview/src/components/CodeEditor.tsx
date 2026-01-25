import React, { useRef } from 'react';

interface CodeEditorProps {
    code: string;
    onChange: (code: string) => void;
    language?: string;
    readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language = 'javascript', readOnly = false }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Basic syntax highlighting (improved regex)
    const highlightCode = (code: string) => {
        let highlighted = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        if (language === 'python') {
            highlighted = highlighted
                .replace(/"(.*?)"/g, '<span class="text-[#ce9178]">$1</span>')
                .replace(/'(.*?)'/g, "<span class='text-[#ce9178]'>'$1'</span>")
                .replace(/\b(def|class|if|else|elif|return|for|while|try|except|finally|import|from|as|with|pass|continue|break|True|False|None)\b/g, '<span class="text-[#c586c0] font-bold">$1</span>') // Python keywords (Purple/Pinkish)
                .replace(/\b(print|len|range|str|int|float|list|dict|set|tuple|enumerate|zip)\b/g, '<span class="text-[#dcdcaa]">$1</span>')
                .replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>')
                .replace(/(#.*)/g, '<span class="text-[#6a9955]">$1</span>'); // Python comments
        } else {
            // Default to JS/TS
            highlighted = highlighted
                .replace(/"(.*?)"/g, '<span class="text-[#ce9178]">$1</span>')
                .replace(/'(.*?)'/g, "<span class='text-[#ce9178]'>'$1'</span>")
                .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|default|class|extends|=>|async|await|try|catch)\b/g, '<span class="text-[#569cd6] font-bold">$1</span>')
                .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#569cd6]">$1</span>')
                .replace(/\b(console|log|parseInt|map|filter|reduce|push|pop)\b/g, '<span class="text-[#dcdcaa]">$1</span>')
                .replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>')
                .replace(/(\/\/.*)/g, '<span class="text-[#6a9955]">$1</span>');
        }

        return highlighted;
    };

    const getFileExtension = () => {
        if (language === 'python') return 'main.py';
        if (language === 'java') return 'Main.java';
        return 'script.js';
    };

    const getLanguageLabel = () => {
        if (language === 'python') return 'Python 3.9';
        if (language === 'java') return 'Java SE 11';
        return 'JavaScript';
    };

    const getLangColor = () => {
        if (language === 'python') return 'bg-blue-400';
        if (language === 'java') return 'bg-red-400';
        return 'bg-yellow-500';
    }

    return (
        <div className="relative w-full h-full bg-[#1e1e1e] font-mono text-sm group overflow-hidden border border-[#333] rounded-lg shadow-inner flex flex-col">
            {/* Header / Tabs simulation */}
            <div className="flex items-center bg-[#252526] px-4 py-2 text-xs text-[#969696] border-b border-[#333] shrink-0">
                <span className="mr-4 hover:text-white cursor-pointer bg-[#1e1e1e] px-3 py-1 rounded-t border-t border-blue-500 text-white flex items-center gap-1">
                    {getFileExtension()}
                </span>
                <span className="hover:text-white cursor-pointer hidden sm:block">CONSOLE</span>
                <span className="ml-auto flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getLangColor()}`}></span>
                    {getLanguageLabel()}
                </span>
            </div>

            <div className="relative flex-1 overflow-y-auto custom-scrollbar">
                {/* Line Numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-[#333] text-[#858585] text-right pr-3 pt-4 select-none font-mono text-[13px] leading-6 h-full min-h-screen">
                    {code.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Syntax Highlight Overlay */}
                <pre
                    className="absolute left-12 top-0 right-0 p-4 pl-4 pointer-events-none font-mono text-[13px] leading-6 whitespace-pre-wrap break-all text-[#d4d4d4] overflow-hidden tab-4"
                    dangerouslySetInnerHTML={{ __html: highlightCode(code) + '<br/>' }}
                    aria-hidden="true"
                    style={{ tabSize: 4 }}
                />

                {/* Editing Layer */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    readOnly={readOnly}
                    className="absolute left-12 top-0 right-0 min-h-full w-[calc(100%-3rem)] bg-transparent text-transparent caret-white outline-none resize-none p-4 pl-4 font-mono text-[13px] leading-6 whitespace-pre-wrap break-all z-10 custom-textarea overflow-hidden"
                    spellCheck={false}
                    style={{ tabSize: 4 }}
                    onKeyDown={(e) => {
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            const target = e.target as HTMLTextAreaElement;
                            const start = target.selectionStart;
                            const end = target.selectionEnd;
                            const newCode = code.substring(0, start) + '    ' + code.substring(end);
                            onChange(newCode);
                            setTimeout(() => {
                                target.selectionStart = target.selectionEnd = start + 4;
                            }, 0);
                        }
                    }}
                />
            </div>
        </div>
    );
};
