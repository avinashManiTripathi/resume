"use client";

import { Share2, Download, RotateCcw, RotateCw, CircleArrowUp, CircleArrowDown, MousePointer, Hand, PencilLine, Loader2, Sparkles, LayoutGrid, Type, Trophy, ChevronDown } from "lucide-react";
import { Button } from "./button";
import { useState, useMemo } from "react";

interface ProfileHeaderProps {
    name: string;
    title: string;
    profileImage?: string;
    progress?: number;
    onDownload?: () => Promise<void>;
    // Page navigation
    currentPage?: number;
    totalPages?: number;
    onPrevPage?: () => void;
    onNextPage?: () => void;
    // Profile image upload
    onProfileImageChange?: (imageUrl: string) => void;
    // Redesign - Sidebar actions in header
    onSmartImport?: () => void;
    onTemplateChange?: () => void;
    fontFamily?: string;
    onFontChange?: (font: string) => void;
    onTailor?: () => void;
    isSaving?: boolean;
    lastSaved?: Date | null;
}

export function ProfileHeader({
    name,
    title,
    profileImage,
    progress = 20,
    onDownload,
    currentPage = 1,
    totalPages = 1,
    onPrevPage,
    onNextPage,
    onProfileImageChange,
    onSmartImport,
    onTemplateChange,
    fontFamily = "Inter",
    onFontChange,
    onTailor,
    isSaving,
    lastSaved,
}: ProfileHeaderProps) {

    const [isDownloading, setIsDownloading] = useState(false);
    const [showFontSelector, setShowFontSelector] = useState(false);

    const fonts = useMemo(() => [
        { name: 'Inter', label: 'Inter' },
        { name: 'Roboto', label: 'Roboto' },
        { name: 'Open Sans', label: 'Open Sans' },
        { name: 'Lato', label: 'Lato' },
        { name: 'Montserrat', label: 'Montserrat' },
        { name: 'Poppins', label: 'Poppins' },
        { name: 'Merriweather', label: 'Merriweather' },
        { name: 'Playfair Display', label: 'Playfair Display' },
        { name: 'Georgia', label: 'Georgia' },
        { name: 'Times New Roman', label: 'Times New Roman' },
    ], []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onProfileImageChange) {
            // Convert to base64 for backend transmission and PDF embedding
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onProfileImageChange(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (onDownload) {
            setIsDownloading(true);
            await onDownload();
            setIsDownloading(false);
        }
    };

    return (
        <div className="mb-2 mb-0">
            <div className="flex flex-col md:flex-row items-stretch justify-between">
                {/* Left: Profile Info */}
                <div className="w-full md:w-[45%] bg-white justify-between rounded-none md:rounded-l-lg px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-4 border-r border-slate-200">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="relative">
                            <div className="w-10 md:w-14 border-[3px] md:border-[5px] border-[#F0F0F0] shadow-[0_4px_12px_#F4EBFF] h-10 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden text-xs md:text-base">
                                {profileImage ? (
                                    <img src={profileImage} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    name.split(" ").map(n => n[0]).join("").toUpperCase()
                                )}
                            </div>
                            <label
                                htmlFor="profile-image-upload"
                                className="hidden md:flex items-center justify-center absolute -bottom-1 -right-1 w-6 h-6 bg-[#E1E5FA] rounded-full border-2 border-white cursor-pointer hover:bg-[#d1d5ea] transition-colors"
                                title="Change profile picture"
                            >
                                <PencilLine size={12} />
                                <input
                                    id="profile-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-sm md:text-lg font-semibold text-gray-900 truncate">{name}</h1>
                            <p className="text-xs md:text-sm text-gray-500 truncate">{title}</p>
                        </div>
                    </div>

                    <Button variant="outline" onClick={handleDownload} className="md:hidden">
                        <Download size={18} />
                    </Button>
                    <div className="hidden md:flex  ml-2 md:ml-4  items-center gap-2">
                        <svg className="w-12 h-12 md:w-12 md:h-12" viewBox="0 0 36 36">
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                            />
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                stroke="#223DC5"
                                strokeWidth="3"
                                strokeDasharray={`${progress} ${100 - progress}`}
                                strokeDashoffset="25"
                                strokeLinecap="round"
                            />
                            <text
                                x="18"
                                y="18"
                                textAnchor="middle"
                                dy=".3em"
                                className="text-[8px] md:text-[10px] font-semibold fill-gray-700"
                            >
                                {progress}%
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Right: Toolbar - Consolidated editing tools */}
                <div className="hidden md:flex flex-1 bg-white rounded-none md:rounded-r-lg px-4 py-2 items-center gap-1 justify-between shadow-sm border border-gray-100 border-l-0">
                    <div className="flex items-center gap-1.5 lg:gap-3">
                        {/* Core Editing Actions */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onSmartImport}
                                className="p-2 h-10 w-10 flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100/50"
                                title="Smart Import (AI)"
                            >
                                <Sparkles size={18} />
                            </button>
                            <button
                                onClick={onTemplateChange}
                                className="p-2 h-10 w-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-xl transition-all border border-transparent hover:border-gray-200"
                                title="Change Template"
                            >
                                <LayoutGrid size={18} />
                            </button>

                            {/* Font Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFontSelector(!showFontSelector)}
                                    className={`flex items-center gap-2 px-3 h-10 hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-xl transition-all border ${showFontSelector ? 'bg-gray-50 border-gray-200' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <Type size={16} />
                                    <span className="text-xs font-bold truncate max-w-[80px]">{fontFamily}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${showFontSelector ? 'rotate-180' : ''}`} />
                                </button>

                                {showFontSelector && (
                                    <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-56 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="space-y-1 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                                            {fonts.map((font) => (
                                                <button
                                                    key={font.name}
                                                    onClick={() => {
                                                        onFontChange?.(font.name);
                                                        setShowFontSelector(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${fontFamily === font.name
                                                        ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                    style={{ fontFamily: font.name }}
                                                >
                                                    {font.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={onTailor}
                                className="hidden lg:flex items-center gap-2 px-4 h-10 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition-all border border-amber-200/50"
                            >
                                <Trophy size={16} className="fill-amber-700/20" />
                                <span className="text-xs font-black uppercase tracking-widest">Tailor AI</span>
                            </button>
                        </div>

                        <div className="w-px h-6 bg-gray-100 mx-1"></div>

                        {/* Viewer Controls */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onPrevPage}
                                disabled={currentPage <= 1}
                                className={`p-2 h-10 w-10 flex items-center justify-center rounded-xl transition-all ${currentPage > 1 ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' : 'text-gray-200 cursor-not-allowed'}`}
                            >
                                <CircleArrowUp size={18} />
                            </button>
                            <div className="px-3 h-8 flex items-center bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-500 min-w-[50px] justify-center">
                                {currentPage}/{totalPages}
                            </div>
                            <button
                                onClick={onNextPage}
                                disabled={currentPage >= totalPages}
                                className={`p-2 h-10 w-10 flex items-center justify-center rounded-xl transition-all ${currentPage < totalPages ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' : 'text-gray-200 cursor-not-allowed'}`}
                            >
                                <CircleArrowDown size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
                        {isSaving ? (
                            <span className="text-xs md:text-sm text-gray-400 font-medium flex items-center gap-1.5 animate-pulse mr-2">
                                <Loader2 className="w-3 h-3 md:w-3.5 md:h-3.5 animate-spin" />
                                Saving...
                            </span>
                        ) : lastSaved ? (
                            <span className="text-xs md:text-sm text-gray-400 font-medium flex items-center gap-1.5 mr-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                Saved
                            </span>
                        ) : null}
                        <Button onClick={handleDownload} variant="primary" className="flex-1 md:flex-initial">
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    <span>Downloading</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 md:mr-2" />
                                    <span>Download</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


