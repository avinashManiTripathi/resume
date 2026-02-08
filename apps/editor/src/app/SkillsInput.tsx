import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Type, Tags, GripVertical, ChevronDown, Check, Sparkles } from 'lucide-react';
import { RichTextEditor } from '@repo/ui/rich-text-editor';
import { Button } from '@repo/ui/button';
import { COMMON_SKILLS, COMMON_LANGUAGES } from './common-skills';

interface SkillsInputProps {
    value: any;
    onChange: (value: any) => void;
    variant?: "skills" | "interests" | "languages";
    label?: string;
}

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LANGUAGE_LEVELS = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"];

export const SkillsInput: React.FC<SkillsInputProps> = ({ value, onChange, variant = "skills" }) => {
    // Determine keys and options based on variant
    const nameKey = variant === "languages" ? "language" : "name";
    const levelKey = variant === "languages" ? "proficiency" : "level";
    const hasLevel = variant !== "interests";
    const levelOptions = variant === "languages" ? LANGUAGE_LEVELS : SKILL_LEVELS;
    const suggestionsSource = variant === "languages" ? COMMON_LANGUAGES : COMMON_SKILLS;
    const defaultLevel = variant === "languages" ? "Intermediate" : "Intermediate";

    // Determine mode based on value type (string -> rich text, array -> builder)
    const [mode, setMode] = useState<'builder' | 'richtext'>(
        typeof value === 'string' ? 'richtext' : 'builder'
    );

    // Autofill & Input State
    const [inputValue, setInputValue] = useState("");
    // const [suggestions, setSuggestions] = useState<string[]>([]); // Removed to fix infinite loop
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const items = Array.isArray(value) ? value : [];

    // Edit State
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editName, setEditName] = useState("");

    const handleEditStart = (index: number, name: string) => {
        setEditingIndex(index);
        setEditName(name);
    };

    const handleEditSave = () => {
        if (editingIndex > -1) {
            if (editName.trim()) {
                const newItems = [...items];
                newItems[editingIndex] = { ...newItems[editingIndex], [nameKey]: editName.trim() };
                onChange(newItems);
            }
            setEditingIndex(-1);
        }
    };

    const suggestions = React.useMemo(() => {
        if (inputValue.length > 0) {
            return suggestionsSource.filter(item =>
                item.toLowerCase().includes(inputValue.toLowerCase()) &&
                !items.some((existing: any) => existing[nameKey] === item)
            ).slice(0, 5);
        }
        return [];
    }, [inputValue, items, suggestionsSource, nameKey]);

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

        const newItem = hasLevel
            ? { [nameKey]: name.trim(), [levelKey]: defaultLevel }
            : { [nameKey]: name.trim() };

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
        newItems[index] = { ...newItems[index], [levelKey]: newLevel };
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
                `<li>${item[nameKey]}${item[levelKey] ? ` - ${item[levelKey]}` : ''}</li>`
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
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <button
                            onClick={toggleMode}
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${mode === 'builder' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Tags className="w-3 h-3" />
                            Builder
                        </button>
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${mode === 'richtext' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Type className="w-3 h-3" />
                            Text
                        </button>
                    </div>
                </div>
                <RichTextEditor
                    value={typeof value === 'string' ? value : ''}
                    onChange={onChange}
                />
            </div>
        );
    }

    // Labels configuration
    let labelText = "Add Skills";
    let placeholderText = "e.g. Project Management, React...";

    if (variant === 'interests') {
        labelText = "Add Interests";
        placeholderText = "e.g. Photography, Hiking, Chess...";
    } else if (variant === 'languages') {
        labelText = "Add Languages";
        placeholderText = "e.g. English, French, Spanish...";
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {labelText}
                </label>
                <div className="flex items-center gap-2">
                    {variant === 'skills' && items.length === 0 && (
                        <button
                            onClick={() => {
                                // Quick add suggestions
                                const popular = ["Communication", "Leadership", "Problem Solving"];
                                const newItems = popular.map(name => ({ [nameKey]: name, [levelKey]: defaultLevel }));
                                onChange([...items, ...newItems]);
                            }}
                            className="text-[10px] flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors mr-auto"
                        >
                            <Sparkles className="w-3 h-3" />
                            Auto-fill Common
                        </button>
                    )}

                    {variant === 'languages' && items.length === 0 && (
                        <button
                            onClick={() => {
                                // Quick add suggestions for languages
                                const popular = ["English", "Spanish", "French"];
                                const newItems = popular.map(name => ({ [nameKey]: name, [levelKey]: defaultLevel }));
                                onChange([...items, ...newItems]);
                            }}
                            className="text-[10px] flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors mr-auto"
                        >
                            <Sparkles className="w-3 h-3" />
                            Auto-fill Common
                        </button>
                    )}

                    {/* Mode Toggle */}
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${mode === 'builder' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Tags className="w-3 h-3" />
                            Builder
                        </button>
                        <button
                            onClick={toggleMode}
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${mode === 'richtext' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Type className="w-3 h-3" />
                            Text
                        </button>
                    </div>
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
                    onChange={(e) => {
                        const val = e.target.value;
                        setInputValue(val);
                        if (val.length > 0) {
                            setShowSuggestions(true);
                            setActiveSuggestionIndex(-1);
                        } else {
                            setShowSuggestions(false);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (inputValue) setShowSuggestions(true);
                    }}
                    placeholder={placeholderText}
                    className="w-full px-5 py-3 pl-10 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
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
                        className="group flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200"
                    >
                        {/* Drag Handle (Visual only for now since simple list) */}

                        {/* Name */}
                        <div className="flex items-center px-3 py-2 bg-gray-50/50 border-b sm:border-b-0 sm:border-r border-gray-100 flex-1 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none text-left">
                            <GripVertical className="w-3 h-3 text-gray-300 mr-2 cursor-move" />
                            {editingIndex === index ? (
                                <input
                                    autoFocus
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onBlur={handleEditSave}
                                    onKeyDown={(e) => e.key === 'Enter' && handleEditSave()}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                    onClick={(e) => e.stopPropagation()}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <span
                                    className="text-sm font-semibold text-gray-700 cursor-text hover:text-indigo-600 transition-colors"
                                    onDoubleClick={() => handleEditStart(index, item[nameKey])}
                                    title="Double-click to edit"
                                >
                                    {item[nameKey]}
                                </span>
                            )}
                        </div>

                        {/* Proficiency (Skills & Languages Only) */}
                        {hasLevel && (
                            <div className="relative px-2 py-1">
                                <Dropdown
                                    value={item[levelKey]}
                                    onChange={(val) => handleUpdateLevel(index, val)}
                                    options={levelOptions}
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
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop parent drag
        if (!isOpen && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close if clicking outside the dropdown trigger AND the menu (handled by not bubbling or check)
            // Since menu is in portal, ref.current check handles trigger. 
            // We need a ref for the menu too or just close.
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // We also need to check if click is inside the portal content, but identifying that is tricky without a ref to it.
                // Simplified: Close on any click outside trigger. The Portal click will bubble? 
                // Portals bubble to React tree ancestors, so clicking menu items will bubble to here.
                // DOM event listener is on document.
                // We need to stop propagation inside the menu to prevent this document listener from closing it immediately?
                // Actually, standard pattern:
                // If target is not in trigger ref... check if target is in menu.
                // I'll make the menu IDs match or use a specific class.
                // Or simpler: The menu items interaction closes it anyway.
                // So if I click menu -> item onClick runs -> setIsOpen(false).
                // If I click empty space in menu -> it might close. 
                // Let's rely on menu Ref if possible.
            }
        };

        // Better approach for Portal outside click: Use a global transparent backdrop? No.
        // I will use a ref for the trigger. The menu items close it.
        // If user clicks AWAY, it should close.
        // I will add a click listener to window.

        const handleGlobalClick = (e: MouseEvent) => {
            // Check if click is inside the trigger button
            if (ref.current && ref.current.contains(e.target as Node)) {
                return; // Let the button toggle handle it
            }
            // Since we can't easily ref the portal content from here without state/callback ref,
            // and React Portals bubble events up to the component, 
            // we can handle "click inside menu" by stopping propagation on the menu div.
            setIsOpen(false);
        };

        if (isOpen) {
            window.addEventListener('click', handleGlobalClick);
        }
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [isOpen]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={toggle}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 rounded-md transition-colors"
                title="Change Level"
            >
                {value}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && createPortal(
                <div
                    className="fixed inset-0 z-[9999] cursor-default" // Invisible backdrop to handle clicks outside? No, that blocks page interaction.
                    // Just render the menu absolutely.
                    // To handle clicks inside menu not closing it instantly via global listener, we stop propagation on the menu container.
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '0px' }} // Dummy container to avoiding generic styles
                >
                    <div
                        className="absolute bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto"
                        style={{
                            top: coords.top,
                            left: coords.left,
                            minWidth: '140px',
                            zIndex: 9999
                        }}
                        onClick={(e) => e.stopPropagation()} // Stop click from reaching window listener
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="py-1">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent double firing
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
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
                </div>,
                document.body
            )}
        </div>
    );
};
