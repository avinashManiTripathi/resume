"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "./button";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    type?: "info" | "success" | "warning" | "error" | "confirm";
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
    icon?: React.ReactNode;
    checkboxLabel?: string;
    checkboxChecked?: boolean;
    onCheckboxChange?: (checked: boolean) => void;
}

export function Dialog({
    isOpen,
    onClose,
    title,
    description,
    type = "info",
    primaryActionLabel = "Close",
    onPrimaryAction,
    secondaryActionLabel,
    onSecondaryAction,
    icon,
    checkboxLabel,
    checkboxChecked,
    onCheckboxChange
}: DialogProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsMounted(false), 300);
            document.body.style.overflow = "auto";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isMounted) return null;

    const getIcon = () => {
        if (icon) return icon;
        switch (type) {
            case "success": return <CheckCircle2 className="w-10 h-10 text-green-500" />;
            case "warning": return <AlertTriangle className="w-10 h-10 text-amber-500" />;
            case "error": return <AlertCircle className="w-10 h-10 text-red-500" />;
            case "confirm": return <HelpCircle className="w-10 h-10 text-blue-500" />;
            default: return <Info className="w-10 h-10 text-blue-500" />;
        }
    };

    const handlePrimaryClick = () => {
        if (onPrimaryAction) onPrimaryAction();
        onClose();
    };

    const handleSecondaryClick = () => {
        if (onSecondaryAction) onSecondaryAction();
        onClose();
    };

    if (!isMounted) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full max-w-[460px] overflow-hidden transform transition-all duration-500 ease-out border border-gray-100 ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all z-10"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-10">
                    {/* Icon Section */}
                    <div className="flex justify-center mb-8">
                        <div className={`w-20 h-20 rounded-[1.75rem] flex items-center justify-center transition-transform duration-500 ${isOpen ? 'scale-100' : 'scale-50'} ${type === 'success' ? 'bg-green-50 shadow-inner' :
                            type === 'warning' ? 'bg-amber-50 shadow-inner' :
                                type === 'error' ? 'bg-red-50 shadow-inner' :
                                    icon ? 'bg-red-50 shadow-inner' : // Use red background if generic confirm icon is replaced (likely Delete)
                                        'bg-blue-50 shadow-inner'
                            }`}>
                            <div className="transform scale-125">
                                {getIcon()}
                            </div>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">{title}</h3>
                        <p className="text-gray-500 leading-relaxed font-medium px-2">{description}</p>
                    </div>

                    {/* Actions Section */}
                    <div className="flex flex-col gap-4">
                        {checkboxLabel && onCheckboxChange && (
                            <div className="flex items-center justify-center gap-2">
                                <input
                                    type="checkbox"
                                    id="dialog-checkbox"
                                    checked={checkboxChecked}
                                    onChange={(e) => onCheckboxChange(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="dialog-checkbox" className="text-sm text-gray-600 select-none cursor-pointer">
                                    {checkboxLabel}
                                </label>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button
                                onClick={handlePrimaryClick}
                                variant={type === 'error' || type === 'warning' || (icon && type === 'confirm') ? 'danger' : 'primary'}
                                className="flex-1 justify-center py-4 rounded-2xl text-base font-bold shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all"
                            >
                                {primaryActionLabel}
                            </Button>

                            {secondaryActionLabel && (
                                <Button
                                    onClick={handleSecondaryClick}
                                    variant="outline"
                                    className="flex-1 justify-center py-4 rounded-2xl border-gray-100 text-gray-400 hover:text-gray-600 font-bold active:scale-[0.98] transition-all"
                                >
                                    {secondaryActionLabel}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
