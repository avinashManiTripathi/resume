"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface MonthPickerProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function MonthPicker({ value, onChange, placeholder = "Select Date", className }: MonthPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse initial value or default to current date
    const initialDate = value ? new Date(value + "-01") : new Date();
    // Validate date - if invalid, fallback to now
    const safeDate = isNaN(initialDate.getTime()) ? new Date() : initialDate;

    const [viewYear, setViewYear] = useState(safeDate.getFullYear());

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const fullMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleMonthSelect = (monthIndex: number) => {
        // Format: YYYY-MM
        const monthStr = (monthIndex + 1).toString().padStart(2, '0');
        onChange(`${viewYear}-${monthStr}`);
        setIsOpen(false);
    };

    const clearDate = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
    };

    const displayText = value ? (() => {
        const d = new Date(value + "-01");
        if (isNaN(d.getTime())) return value;
        return `${fullMonths[d.getMonth()]} ${d.getFullYear()}`;
    })() : "";

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-full items-center justify-between px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 cursor-pointer placeholder:text-gray-400",
                    !value && "text-gray-400"
                )}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <CalendarIcon className="h-4 w-4 shrink-0 opacity-50" />
                    <span className="truncate">{displayText || placeholder}</span>
                </div>
                {value ? (
                    <div
                        role="button"
                        onClick={clearDate}
                        className="rounded-full p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </div>
                ) : null}
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 z-50 mt-2 w-[280px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl animate-in zoom-in-95 fade-in-0 duration-200">
                    <div className="mb-4 flex items-center justify-between">
                        <button
                            onClick={() => setViewYear(viewYear - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-base font-bold text-slate-900">
                            {viewYear}
                        </span>
                        <button
                            onClick={() => setViewYear(viewYear + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {months.map((month, index) => {
                            const isSelected = value === `${viewYear}-${(index + 1).toString().padStart(2, '0')}`;
                            const isCurrentMonth = new Date().getMonth() === index && new Date().getFullYear() === viewYear;

                            return (
                                <button
                                    key={month}
                                    onClick={() => handleMonthSelect(index)}
                                    className={cn(
                                        "rounded-lg px-2 py-2.5 text-sm font-medium transition-all",
                                        isSelected
                                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                            : isCurrentMonth
                                                ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-100"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    )}
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
