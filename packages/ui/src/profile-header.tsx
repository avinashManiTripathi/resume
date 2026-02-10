"use client";

import { Share2, Download, RotateCcw, RotateCw, CircleArrowUp, CircleArrowDown, MousePointer, Hand, PencilLine, Loader2, Sparkles, LayoutGrid, Type, Trophy, ChevronDown, Check, Settings2 } from "lucide-react";
import { Button } from "./button";
import { useState, useMemo, useRef, useEffect } from "react";

const sliderStyles = `
  /* Custom slider styling */
  input[type="range"].custom-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: transparent;
    cursor: pointer;
    outline: none;
  }

  /* Track - WebKit (Chrome, Safari, Edge) */
  input[type="range"].custom-slider::-webkit-slider-track {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 12px;
    transition: background 0.1s ease;
  }

  input[type="range"].custom-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: linear-gradient(to right, #6366f1 var(--value-percent, 0%), #e5e7eb var(--value-percent, 0%));
    border-radius: 12px;
    transition: background 0.1s ease;
  }

  /* Track - Firefox */
  input[type="range"].custom-slider::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 12px;
    border: none;
  }

  input[type="range"].custom-slider::-moz-range-progress {
    height: 8px;
    background: #6366f1;
    border-radius: 12px 0 0 12px;
  }

  /* Thumb - WebKit */
  input[type="range"].custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #6366f1;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1);
    cursor: pointer;
    margin-top: -8px;
    position: relative;
    background-image: radial-gradient(circle, white 1.5px, transparent 1.5px);
    background-size: 6px 6px;
    background-position: 3px 3px;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  /* Thumb - Firefox */
  input[type="range"].custom-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #6366f1;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1);
    cursor: pointer;
    background-image: radial-gradient(circle, white 1.5px, transparent 1.5px);
    background-size: 6px 6px;
    background-position: 3px 3px;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  /* Hover effects */
  input[type="range"].custom-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 12px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.2);
  }

  input[type="range"].custom-slider::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 12px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.2);
  }

  /* Active state */
  input[type="range"].custom-slider:active::-webkit-slider-thumb {
    transform: scale(1.05);
  }

  input[type="range"].custom-slider:active::-moz-range-thumb {
    transform: scale(1.05);
  }
`;



const FONTS = [
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
    { name: 'Calibri', label: 'Calibri' },
    { name: 'Arial', label: 'Arial' },
    { name: 'Helvetica', label: 'Helvetica' },
    { name: 'Cambria', label: 'Cambria' },
];

export interface TypographySettings {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    sectionGap: number;
    itemGap: number;
    headingSize: number;
    nameSize: number;
    pageMargin: number;
}

interface ProfileHeaderProps {
    name: string;
    title: string;
    profileImage?: string;
    progress?: number;
    onDownload?: () => Promise<void>;
    // Profile image upload
    onProfileImageChange?: (imageUrl: string) => void;
    // Redesign - Sidebar actions in header
    onSmartImport?: () => void;
    onTemplateChange?: () => void;
    typographySettings?: TypographySettings;
    onTypographyChange?: (settings: TypographySettings) => void;
    classNameLeft?: string;
}

export function ProfileHeader({
    name,
    title,
    profileImage,
    progress = 20,
    onDownload,
    onProfileImageChange,
    onSmartImport,
    onTemplateChange,
    typographySettings = {
        fontFamily: "Inter",
        fontSize: 13,
        lineHeight: 1.15,
        sectionGap: 12,
        itemGap: 4,
        headingSize: 16,
        nameSize: 28,
        pageMargin: 48
    },
    onTypographyChange,
    classNameLeft = "md:w-[45%]",
}: ProfileHeaderProps) {

    const [isDownloading, setIsDownloading] = useState(false);
    const [showTypographyPanel, setShowTypographyPanel] = useState(false);
    const typographyPanelRef = useRef<HTMLDivElement>(null);

    // Inject slider styles
    useEffect(() => {
        const styleId = 'custom-slider-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = sliderStyles;
            document.head.appendChild(style);
        }
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (typographyPanelRef.current && !typographyPanelRef.current.contains(event.target as Node)) {
                setShowTypographyPanel(false);
            }
        };

        if (showTypographyPanel) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showTypographyPanel]);



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
                <div className={`w-full ${classNameLeft} shrink-0 bg-white justify-between rounded-none md:rounded-l-lg px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-4 border-r border-slate-200`}>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="relative group">
                            <label
                                htmlFor="profile-image-upload"
                                className="cursor-pointer block relative"
                            >
                                <div className="w-10 md:w-14 border-[3px] md:border-[5px] border-[#F0F0F0] shadow-[0_4px_12px_#F4EBFF] h-10 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden text-xs md:text-base relative group-hover:after:absolute group-hover:after:inset-0 group-hover:after:bg-black/10 group-hover:after:transition-colors">
                                    {profileImage ? (
                                        <img src={profileImage} alt={name} className="w-full h-full object-cover" />
                                    ) : (
                                        name.split(" ").map(n => n[0]).join("").toUpperCase()
                                    )}
                                </div>
                            </label>
                            <label
                                htmlFor="profile-image-upload"
                                className="hidden md:flex items-center justify-center absolute -bottom-1 -right-1 w-6 h-6 bg-[#E1E5FA] rounded-full border-2 border-white cursor-pointer hover:bg-[#d1d5ea] transition-colors z-10"
                                title="Change profile picture"
                            >
                                <PencilLine size={12} />
                            </label>
                            <input
                                id="profile-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-sm md:text-lg font-semibold text-gray-900 truncate">{name}</h1>
                            <p className="text-xs md:text-sm text-gray-500 truncate">{title}</p>
                        </div>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <Button variant="outline" onClick={handleDownload}>
                            <Download size={18} />
                        </Button>
                    </div>
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
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onSmartImport}
                                className="px-3 h-10 flex items-center gap-2 justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100/50"
                                title="Build with AI (AI)"
                            >
                                <Sparkles size={18} />
                                <span className="text-sm font-semibold hidden lg:inline">Build with AI</span>
                            </button>
                            <button
                                onClick={onTemplateChange}
                                className="px-3 h-10 flex items-center gap-2 justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-xl transition-all border border-transparent hover:border-gray-200"
                                title="Change Template"
                            >
                                <LayoutGrid size={18} />
                                <span className="text-sm font-medium hidden lg:inline">Template</span>
                            </button>

                            {/* Typography Settings Panel */}
                            <div className="relative" ref={typographyPanelRef}>
                                <button
                                    onClick={() => setShowTypographyPanel(!showTypographyPanel)}
                                    className={`flex items-center gap-2 px-3 h-10 hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-xl transition-all border ${showTypographyPanel ? 'bg-gray-50 border-gray-200' : 'border-transparent hover:border-gray-200'}`}
                                    title="Typography Settings"
                                >
                                    <Settings2 size={16} />
                                    <span className="text-xs font-semibold hidden lg:inline">Typography</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${showTypographyPanel ? 'rotate-180' : ''}`} />
                                </button>

                                {showTypographyPanel && (
                                    <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-80 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-1 py-2 border-b border-gray-50 mb-3">
                                            <span className="text-sm font-bold text-gray-900">Typography Settings</span>
                                            <p className="text-xs text-gray-500 mt-0.5">Customize spacing and fonts</p>
                                        </div>
                                        <TypographyPanelContent settings={typographySettings} onChange={onTypographyChange} />
                                    </div>
                                )}
                            </div>

                            {/* {onTailor && <button
                                onClick={onTailor}
                                className="hidden lg:flex items-center gap-2 px-4 h-10 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition-all border border-amber-200/50"
                            >
                                <Trophy size={16} className="fill-amber-700/20" />
                                <span className="text-xs font-black uppercase tracking-widest">Tailor</span>
                            </button>} */}
                        </div>

                        <div className="w-px h-6 bg-gray-100 mx-1"></div>


                    </div>
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
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

export interface TypographyPanelContentProps {
    settings: TypographySettings;
    onChange: ((settings: TypographySettings) => void) | undefined;
}

export function TypographyPanelContent({ settings, onChange }: TypographyPanelContentProps) {
    return (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {/* Font Family */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Font Family</label>
                <select
                    value={settings.fontFamily}
                    onChange={(e) => onChange?.({ ...settings, fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {FONTS.map((font) => (
                        <option key={font.name} value={font.name}>{font.label}</option>
                    ))}
                </select>
            </div>

            {/* Font Size */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Font Size</span>
                    <span className="text-indigo-600">{settings.fontSize}pt</span>
                </label>
                <input
                    type="range"
                    min="10"
                    max="16"
                    step="0.5"
                    value={settings.fontSize}
                    onChange={(e) => onChange?.({ ...settings, fontSize: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.fontSize - 10) / (16 - 10)) * 100}%` } as React.CSSProperties}
                />
            </div>

            {/* Line Height */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Line Height</span>
                    <span className="text-indigo-600">{settings.lineHeight}</span>
                </label>
                <input
                    type="range"
                    min="1.0"
                    max="1.5"
                    step="0.01"
                    value={settings.lineHeight}
                    onChange={(e) => onChange?.({ ...settings, lineHeight: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.lineHeight - 1.0) / (1.5 - 1.0)) * 100}%` } as React.CSSProperties}
                />
            </div>

            {/* Section Gap */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Section Gap</span>
                    <span className="text-indigo-600">{settings.sectionGap}px</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={settings.sectionGap}
                    onChange={(e) => onChange?.({ ...settings, sectionGap: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.sectionGap - 1) / (24 - 1)) * 100}%` } as React.CSSProperties}
                />
            </div>

            {/* Item Gap */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Item Gap</span>
                    <span className="text-indigo-600">{settings.itemGap}px</span>
                </label>
                <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.5"
                    value={settings.itemGap}
                    onChange={(e) => onChange?.({ ...settings, itemGap: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.itemGap - 0) / (8 - 0)) * 100}%` } as React.CSSProperties}
                />
            </div>

            {/* Heading Size */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Heading Size</span>
                    <span className="text-indigo-600">{settings.headingSize}pt</span>
                </label>
                <input
                    type="range"
                    min="14"
                    max="20"
                    step="0.5"
                    value={settings.headingSize}
                    onChange={(e) => onChange?.({ ...settings, headingSize: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.headingSize - 14) / (20 - 14)) * 100}%` } as React.CSSProperties}
                />
            </div>

            {/* Name Size */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Name Size</span>
                    <span className="text-indigo-600">{settings.nameSize}pt</span>
                </label>
                <input
                    type="range"
                    min="24"
                    max="32"
                    step="0.5"
                    value={settings.nameSize}
                    onChange={(e) => onChange?.({ ...settings, nameSize: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.nameSize - 24) / (32 - 24)) * 100}%` } as React.CSSProperties}
                />
            </div>

            {/* Page Margin */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block flex justify-between">
                    <span>Page Margin</span>
                    <span className="text-indigo-600">{settings.pageMargin}px</span>
                </label>
                <input
                    type="range"
                    min="32"
                    max="64"
                    step="2"
                    value={settings.pageMargin}
                    onChange={(e) => onChange?.({ ...settings, pageMargin: Number(e.target.value) })}
                    className="custom-slider w-full"
                    style={{ '--value-percent': `${((settings.pageMargin - 32) / (64 - 32)) * 100}%` } as React.CSSProperties}
                />
            </div>
        </div>
    );
}


