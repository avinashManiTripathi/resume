import React from 'react';
import Image from 'next/image';

// Simple utility to merge class names
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface StepLoaderProps {
    loading: boolean;
    message?: string; // Main main message e.g "Please wait a moment"
    subMessage?: string; // Smaller detail text
    logoSrc?: string;
    fullScreen?: boolean;
    className?: string;
}

export function StepLoader({
    loading,
    message = "Please wait a moment",
    subMessage = "Processing and analyzing your data...",
    logoSrc = "/logo.png",
    fullScreen = false,
    className
}: StepLoaderProps) {
    if (!loading) return null;

    // Container positioning
    const containerClass = cn(
        "flex flex-col items-center justify-center z-[100] bg-white",
        fullScreen ? "fixed inset-0" : "absolute inset-0",
        className
    );

    return (
        <div className={containerClass}>
            <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
                {/* Loader Circle Container */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Rotating Ring */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-blue-50"></div>
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600 animate-spin"></div>

                    {/* Faint Outer Ring for depth */}
                    <div className="absolute -inset-4 rounded-full border border-blue-50 opacity-50"></div>

                    {/* Central Logo Bubble */}
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 relative z-10 overflow-hidden">
                        {logoSrc ? (
                            <div className="relative w-8 h-8">
                                <Image
                                    src={logoSrc}
                                    alt="Logo"
                                    fill
                                    className="object-contain invert brightness-0 filter"
                                />
                            </div>
                        ) : (
                            <div className="w-8 h-8 bg-white/20 rounded-md animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-3 max-w-sm px-4">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {message}
                    </h2>
                    {subMessage && (
                        <p className="text-slate-500 font-medium">
                            {subMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
