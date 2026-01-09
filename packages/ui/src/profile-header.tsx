"use client";

import { Share2, Download, Undo, Redo, RotateCcw, RotateCw, ZoomIn, ZoomOut, CircleArrowUp, CircleArrowDown, MousePointer, Hand, Undo2, Redo2, PencilLine } from "lucide-react";
import { Button } from "./button";

interface ProfileHeaderProps {
    name: string;
    title: string;
    profileImage?: string;
    progress?: number;
    onShare?: () => void;
    onDownload?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    // Page navigation
    currentPage?: number;
    totalPages?: number;
    onPrevPage?: () => void;
    onNextPage?: () => void;
    // Zoom controls
    zoomLevel?: number;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    // Profile image upload
    onProfileImageChange?: (imageUrl: string) => void;
}

export function ProfileHeader({
    name,
    title,
    profileImage,
    progress = 20,
    onShare,
    onDownload,
    onUndo,
    onRedo,
    canUndo = false,
    canRedo = false,
    currentPage = 1,
    totalPages = 1,
    onPrevPage,
    onNextPage,
    zoomLevel = 100,
    onZoomIn,
    onZoomOut,
    onProfileImageChange,
}: ProfileHeaderProps) {
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

    return (
        <div className="mb-2 mb-0 md:m-[10px]">
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-2">
                {/* Left: Profile Info */}
                <div className="w-full md:w-[40%] bg-white justify-between rounded-none md:rounded-lg px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-4">
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

                    <Button variant="outline" onClick={onShare} className="md:hidden">
                        <Share2 size={18} />
                    </Button>
                    <Button variant="outline" onClick={onDownload} className="md:hidden">
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

                {/* Right: Toolbar - Hidden on mobile except Share/Download */}
                <div className="hidden md:flex  flex bg-white rounded-none md:rounded-lg px-3 md:px-4 py-2 md:py-3 flex-grow items-center gap-1 justify-between">
                    {/* Toolbar controls - Hidden on mobile */}
                    <div className="flex items-center gap-3">

                        {/* Undo/Redo */}
                        <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            className={`p-2 hover:bg-gray-50 rounded transition-colors ${canUndo ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
                                }`}
                            title="Undo (Cmd+Z)"
                        >
                            <Undo2 size={20} />
                        </button>
                        <button
                            onClick={onRedo}
                            disabled={!canRedo}
                            className={`p-2 hover:bg-gray-50 rounded transition-colors ${canRedo ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
                                }`}
                            title="Redo (Cmd+Shift+Z)"
                        >
                            <Redo2 size={20} />
                        </button>

                        <div className="w-px h-6 bg-gray-200 mx-1"></div>

                        {/* Page Navigation */}
                        <button
                            onClick={onPrevPage}
                            disabled={currentPage <= 1}
                            className={`p-2 hover:bg-gray-50 rounded transition-colors ${currentPage > 1 ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
                                }`}
                            title="Previous Page (↑)"
                        >
                            <CircleArrowUp size={20} />
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-700 bg-[#F5F5F5] rounded min-w-[60px] text-center">
                            {currentPage}/{totalPages}
                        </span>
                        <button
                            onClick={onNextPage}
                            disabled={currentPage >= totalPages}
                            className={`p-2 hover:bg-gray-50 rounded transition-colors ${currentPage < totalPages ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
                                }`}
                            title="Next Page (↓)"
                        >
                            <CircleArrowDown size={20} />
                        </button>

                        <div className="w-px h-6 bg-gray-200 mx-1"></div>

                        {/* Zoom Controls */}
                        <button
                            onClick={onZoomOut}
                            disabled={zoomLevel <= 50}
                            className={`p-2 hover:bg-gray-50 rounded transition-colors ${zoomLevel > 50 ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
                                }`}
                            title="Zoom Out (Cmd+-)"
                        >
                            <ZoomOut size={20} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-gray-700 min-w-[50px] text-center">
                            {zoomLevel}%
                        </span>
                        <button
                            onClick={onZoomIn}
                            disabled={zoomLevel >= 200}
                            className={`p-2 hover:bg-gray-50 rounded transition-colors ${zoomLevel < 200 ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
                                }`}
                            title="Zoom In (Cmd++)"
                        >
                            <ZoomIn size={20} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
                        <Button onClick={onShare} variant="outline" className="flex-1 md:flex-initial">
                            <Share2 className="w-4 h-4 md:mr-2" />
                            <span >Share</span>
                        </Button>
                        <Button onClick={onDownload} variant="primary" className="flex-1 md:flex-initial">
                            <Download className="w-4 h-4 md:mr-2" />
                            <span >Download</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


