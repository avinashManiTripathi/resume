import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Type, Tags, GripVertical, ChevronDown, Check, Sparkles } from 'lucide-react';
import { RichTextEditor } from '@repo/ui/rich-text-editor';
import { Button } from '@repo/ui/button';
import { COMMON_SKILLS } from './common-skills';

interface SkillsInputProps {
    value: any;
    onChange: (value: any) => void;
    variant?: "skills" | "interests";
    label?: string;
}

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export const SkillsInput: React.FC<SkillsInputProps> = ({ value, onChange, variant = "skills" }) => {
    // Determine mode based on value type (string -> rich text, array -> builder)
    const [mode, setMode] = useState<'builder' | 'richtext'>(
        typeof value === 'string' ? 'richtext' : 'builder'
    );

    // Autofill & Input State
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const items = Array.isArray(value) ? value : [];

    useEffect(() => {
        if (inputValue.length > 0) {
            const filtered = COMMON_SKILLS.filter(skill =>
                skill.toLowerCase().includes(inputValue.toLowerCase()) &&
                !items.some((item: any) => item.name === skill)
            ).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
            setActiveSuggestionIndex(-1);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [inputValue, items]);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddItem = (name: string) => {
        if (!name.trim()) return;

        const newItem = variant === "skills"
            ? { name: name.trim(), level: "Intermediate" } // Default level
            : { name: name.trim() };

        onChange([...items, newItem]);
        setInputValue("");
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    const handleUpdateLevel = (index: number, newLevel: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], level: newLevel };
        onChange(newItems);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
                handleAddItem(suggestions[activeSuggestionIndex]);
            } else if (inputValue.trim()) {
                handleAddItem(inputValue.trim());
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex(prev => prev > -1 ? prev - 1 : prev);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const toggleMode = () => {
        if (mode === 'builder') {
            // Convert tags to HTML list
            const listItems = items.map((item: any) =>
                `<li>${item.name}${item.level ? ` - ${item.level}` : ''}</li>`
            ).join('');
            onChange(`<ul>${listItems}</ul>`);
            setMode('richtext');
        } else {
            // Warning about data loss when going back to tags
            if (confirm("Switching back to Tag mode will clear your current text. Are you sure?")) {
                onChange([]);
                setMode('builder');
            }
        }
    };

    if (mode === 'richtext') {
        return (
            <div className="space-y-3">
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        onClick={toggleMode}
                        className="text-xs text-indigo-600 border-none shadow-none hover:text-indigo-700 hover:bg-indigo-50"
                    >
                        <Tags className="w-3.5 h-3.5 mr-1.5" />
                        Switch to Builder
                    </Button>
                </div>
                <RichTextEditor
                    value={typeof value === 'string' ? value : ''}
                    onChange={onChange}
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {variant === 'skills' ? 'Add Skills' : 'Add Interests'}
                </label>
                <div className="flex items-center gap-2">
                    {variant === 'skills' && items.length === 0 && (
                        <button
                            onClick={() => {
                                // Quick add suggestions
                                const popular = ["Communication", "Leadership", "Problem Solving"];
                                const newItems = popular.map(name => ({ name, level: "Intermediate" }));
                                onChange([...items, ...newItems]);
                            }}
                            className="text-[10px] flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                            <Sparkles className="w-3 h-3" />
                            Auto-fill Common
                        </button>
                    )}
                    <Button
                        variant="outline"
                        onClick={toggleMode}
                        className="text-xs text-gray-500 border-none shadow-none hover:text-gray-700 hover:bg-gray-100"
                    >
                        <Type className="w-3.5 h-3.5 mr-1.5" />
                        Free Text
                    </Button>
                </div>
            </div>

            {/* Modern Autocomplete Input */}
            <div className="relative group z-20">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Plus className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (inputValue) setShowSuggestions(true);
                    }}
                    placeholder={variant === 'skills' ? "e.g. Project Management, React, Python..." : "e.g. Photography, Hiking, Chess..."}
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm group-hover:border-gray-300"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div
                        ref={suggestionsRef}
                        className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={suggestion}
                                onClick={() => handleAddItem(suggestion)}
                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors
                                    ${index === activeSuggestionIndex ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}
                                `}
                            >
                                <span className="font-medium">{suggestion}</span>
                                {index === activeSuggestionIndex && <Plus className="w-3.5 h-3.5" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Tags List */}
            <div className="flex flex-wrap gap-2">
                {items.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="group flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 overflow-hidden"
                    >
                        {/* Drag Handle (Visual only for now since simple list) */}

                        {/* Name */}
                        <div className="flex items-center px-3 py-2 bg-gray-50/50 border-b sm:border-b-0 sm:border-r border-gray-100">
                            <GripVertical className="w-3 h-3 text-gray-300 mr-2 cursor-move" />
                            <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                        </div>

                        {/* Proficiency (Skills Only) */}
                        {variant === 'skills' && (
                            <div className="relative px-2 py-1">
                                <Dropdown
                                    value={item.level}
                                    onChange={(val) => handleUpdateLevel(index, val)}
                                    options={PROFICIENCY_LEVELS}
                                />
                            </div>
                        )}

                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors sm:border-l border-gray-100"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="w-full text-center py-8 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                        <p className="text-sm text-gray-400">No {variant} added yet. Start typing above!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Internal Modern Dropdown Component
const Dropdown = ({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 rounded-md transition-colors"
                title="Change Level"
            >
                {value}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-gray-50 transition-colors
                                    ${option === value ? 'text-indigo-600 font-semibold bg-indigo-50/30' : 'text-gray-600'}
                                `}
                            >
                                {option}
                                {option === value && <Check className="w-3 h-3" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
