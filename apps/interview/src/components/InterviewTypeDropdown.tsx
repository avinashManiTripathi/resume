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
                className="flex w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-white p-5 transition hover:border-blue-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                        <SelectedIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-base font-bold text-slate-900">
                            {selectedType.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
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
                <div className="  absolute
      left-0
      right-0
      top-full
      mt-3
      z-[99999]
      max-h-[420px]
      overflow-hidden
      rounded-2xl
      border-2
      border-slate-200
      bg-white
      shadow-2xl">
                    {/* Search */}
                    <div className="border-b border-slate-100 bg-slate-50 p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                ref={searchInputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search interview types..."
                                className="w-full rounded-xl border-2 border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
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
                                            ? "border-2 border-blue-300 bg-blue-50"
                                            : "border-2 border-transparent hover:border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${active
                                                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                                                : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="flex-1">
                                            <p
                                                className={`truncate text-sm font-semibold ${active ? "text-blue-900" : "text-slate-900"
                                                    }`}
                                            >
                                                {type.label}
                                            </p>
                                            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                                {type.description}
                                            </p>
                                        </div>

                                        {active && <Check className="h-5 w-5 text-blue-600" />}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="py-12 text-center">
                                <Search className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                                <p className="text-sm font-semibold text-slate-700">
                                    No results found
                                </p>
                                <p className="text-xs text-slate-500">
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
