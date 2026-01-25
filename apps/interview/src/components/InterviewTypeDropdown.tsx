"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Check,
    FileText,
    Code2,
    Layers,
    Zap,
    Database,
    Boxes,
    Search,
    X,
} from "lucide-react";
import { InterviewType } from "../config/interview-types.constants";

interface InterviewTypeDropdownProps {
    options: InterviewType[];
    selectedType: InterviewType;
    onSelect: (type: InterviewType) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
    FileText,
    Code2,
    Layers,
    Zap,
    Database,
    Boxes,
};

export default function InterviewTypeDropdown({
    options,
    selectedType,
    onSelect,
}: InterviewTypeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    /* Debounce search */
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(t);
    }, [searchQuery]);

    /* Close on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* Escape key */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    /* Autofocus search */
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
            setSearchQuery("");
        }
    }, [isOpen]);

    const filteredOptions = debouncedQuery
        ? options.filter(
            (o) =>
                o.label.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                o.technology.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                o.description.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        : options;

    const SelectedIcon = iconMap[selectedType.icon] || FileText;

    return (
        <div ref={dropdownRef} className="relative w-full">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Interview Type
            </label>

            {/* Button */}
            <button
                onClick={() => setIsOpen((p) => !p)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-blue-500/50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-900/20">
                        <SelectedIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-base font-bold text-slate-100">
                            {selectedType.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            {selectedType.description}
                        </p>
                    </div>
                </div>
                <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-3 z-[99999] max-h-[420px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">
                    {/* Search */}
                    <div className="border-b border-slate-800 bg-slate-900/50 p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                ref={searchInputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search interview types..."
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-9 text-sm text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar">
                        {filteredOptions.length ? (
                            filteredOptions.map((type) => {
                                const Icon = iconMap[type.icon] || FileText;
                                const active = type.id === selectedType.id;

                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            onSelect(type);
                                            setIsOpen(false);
                                        }}
                                        className={`group flex w-full items-center gap-3 rounded-xl p-4 text-left transition ${active
                                            ? "border border-blue-500/30 bg-blue-500/10"
                                            : "border border-transparent hover:bg-slate-800"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${active
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                                : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="flex-1">
                                            <p
                                                className={`truncate text-sm font-semibold ${active ? "text-blue-400" : "text-slate-200"
                                                    }`}
                                            >
                                                {type.label}
                                            </p>
                                            <p className="mt-1 line-clamp-1 text-xs text-slate-500 group-hover:text-slate-400">
                                                {type.description}
                                            </p>
                                        </div>

                                        {active && <Check className="h-5 w-5 text-blue-500" />}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="py-12 text-center">
                                <Search className="mx-auto mb-3 h-8 w-8 text-slate-600" />
                                <p className="text-sm font-semibold text-slate-400">
                                    No results found
                                </p>
                                <p className="text-xs text-slate-600">
                                    Try a different keyword
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
