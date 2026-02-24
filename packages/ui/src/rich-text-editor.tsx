"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Mic, MicOff, Wand2, Sparkles, Loader2 } from "lucide-react";

// Add declaration for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    apiUrl?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something...",
    apiUrl,
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const recognitionRef = useRef<any>(null);

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

    // Speech to Text
    const startDictation = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript && editorRef.current) {
                // Focus editor
                editorRef.current.focus();

                // If there's a selection, insert text at cursor, else append
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    // Only insert if selection is within the editor
                    if (editorRef.current.contains(range.commonAncestorContainer)) {
                        range.deleteContents();
                        // Insert Space before transcription if needed
                        const lastChar = range.startContainer.textContent?.slice(-1);
                        if (lastChar && lastChar !== ' ' && lastChar !== '\n') {
                            finalTranscript = ' ' + finalTranscript;
                        }
                        range.insertNode(document.createTextNode(finalTranscript));

                        // Move cursor to end of inserted text
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    } else {
                        // Fallback append
                        editorRef.current.innerHTML += (editorRef.current.innerHTML.endsWith(' ') ? '' : ' ') + finalTranscript;
                    }
                } else {
                    // Fallback append
                    editorRef.current.innerHTML += (editorRef.current.innerHTML.endsWith(' ') ? '' : ' ') + finalTranscript;
                }

                onChange(editorRef.current.innerHTML);
            }
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    // Clean up recognition
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const enhanceText = async (action: 'fix_grammar' | 'improve') => {
        const selection = window.getSelection();
        let textToOptimize = selection?.toString();
        const wholeTextProcessing = !textToOptimize || textToOptimize.trim() === '';

        if (wholeTextProcessing && editorRef.current) {
            textToOptimize = editorRef.current.innerText; // Use innerText instead of HTML to send plain text to AI
        }

        if (!textToOptimize || textToOptimize.trim() === '') {
            return;
        }

        setIsEnhancing(true);

        try {
            const token = localStorage.getItem('token');
            // Using a relative /api path or standard fallback for proxy
            const apiBase = apiUrl || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            const response = await fetch(`${apiBase}/api/resume/enhance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    text: textToOptimize,
                    action
                })
            });

            if (!response.ok) {
                throw new Error('Failed to enhance text');
            }

            const result = await response.json();

            if (result.success && result.data?.enhancedText) {
                editorRef.current?.focus();
                // If specific text was selected, replace just that selection
                if (!wholeTextProcessing) {
                    document.execCommand('insertText', false, result.data.enhancedText);
                } else if (editorRef.current) {
                    // If entire text was analyzed, replace all innerHTML. (Ideally we convert AI plain text response back to formatted HTML or insertText over selectAll)
                    // For simplicity, using execCommand over entire selection preserves some undo stack
                    document.execCommand('selectAll');
                    document.execCommand('insertText', false, result.data.enhancedText);
                }

                if (editorRef.current) {
                    onChange(editorRef.current.innerHTML);
                }
            }

        } catch (error) {
            console.error('Enhance AI Error:', error);
            alert("Failed to process text with AI.");
        } finally {
            setIsEnhancing(false);
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

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* AI & Voice Tools */}

                <button
                    type="button"
                    onClick={() => enhanceText('fix_grammar')}
                    disabled={isEnhancing}
                    className="p-2 hover:bg-purple-50 rounded transition-colors text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed group relative"
                    title="Fix Grammar"
                >
                    {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                </button>

                <button
                    type="button"
                    onClick={() => enhanceText('improve')}
                    disabled={isEnhancing}
                    className="p-2 hover:bg-indigo-50 rounded transition-colors text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    title="Write with AI"
                >
                    {isEnhancing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[11px] font-semibold hidden sm:inline-block">AI Rewrite</span>
                        </>
                    )}
                </button>
            </div>

            {/* Editor */}
            <div className="relative group/editor">
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="p-4 min-h-[120px] focus:outline-none bg-white text-gray-900 pb-10 custom-scrollbar overflow-y-auto max-h-[400px]"
                    data-placeholder={placeholder}
                    style={{
                        minHeight: "120px",
                    }}
                />

                {/* Floating Dictation Tool */}
                <button
                    type="button"
                    onClick={startDictation}
                    className={`absolute bottom-3 right-3 p-2 rounded-full shadow-sm border transition-all flex items-center justify-center
                        ${isListening
                            ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 shadow-red-100 animate-pulse'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 hover:shadow-md opacity-60 group-hover/editor:opacity-100'
                        }`}
                    title={isListening ? "Stop Dictation" : "Start Dictation"}
                >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
            </div>

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
