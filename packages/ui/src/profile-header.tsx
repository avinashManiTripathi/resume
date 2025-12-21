"use client";

import { Share2, Download, Undo, Redo, RotateCcw, RotateCw, ZoomIn, ZoomOut, CircleArrowUp, CircleArrowDown, MousePointer, Hand, Undo2, Redo2 } from "lucide-react";
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
}: ProfileHeaderProps) {
    return (
        <div className="m-[10px]">
            <div className="flex items-stretch justify-between gap-2">
                {/* Left: Profile Info */}
                <div className="w-[40%] bg-white justify-between rounded-lg px-4 py-3 flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden">
                                {profileImage ? (
                                    <img src={profileImage} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    name.split(" ").map(n => n[0]).join("").toUpperCase()
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-gray-900">{name}</h1>
                            <p className="text-sm text-gray-500">{title}</p>
                        </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                        <svg className="w-8 h-8" viewBox="0 0 36 36">
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
                                stroke="#3B82F6"
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
                                className="text-xs font-semibold fill-gray-700"
                            >
                                {progress}%
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Right: Toolbar */}
                <div className="flex bg-white rounded-lg px-4 py-3 flex-grow items-center gap-1 justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onUndo}
                            className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900"
                            title="Undo"
                        >
                            <CircleArrowUp className="color-[#5C5C5C]" size={20} />
                        </button>
                        <button
                            onClick={onRedo}
                            className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900"
                            title="Redo"
                        >
                            <CircleArrowDown className="color-[#5C5C5C]" size={20} />
                        </button>
                        <span className="px-2 text-sm text-gray-600 bg-[#F5F5F5] rounded p-2">1/1</span>
                        <button className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900" title="Rotate Left">
                            <MousePointer className="color-[#5C5C5C]" size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900" title="Rotate Right">
                            <Hand className="color-[#5C5C5C]" size={20} />
                        </button>

                        <button className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900" title="Rotate Left">
                            <Undo2 className="color-[#5C5C5C]" size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900" title="Rotate Right">
                            <Redo2 className="color-[#5C5C5C]" size={20} />
                        </button>

                        <button className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900" title="Zoom Out">
                            <ZoomOut className="color-[#5C5C5C]" size={20} />
                        </button>
                        <span className="px-2 text-sm font-medium text-gray-700">50%</span>
                        <button className="p-2 hover:bg-gray-50 rounded transition-colors text-gray-600 hover:text-gray-900" title="Zoom In">
                            <ZoomIn className="color-[#5C5C5C]" size={20} />
                        </button>

                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={onShare} variant="outline">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                        <Button onClick={onDownload} variant="primary">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
