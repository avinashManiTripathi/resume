"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ENV } from "@/app/env";

interface Template {
    _id: string;
    name: string;
    thumbnail: string | null;
}

interface TemplatesSliderProps {
    templates: Template[];
}

export function TemplatesSlider({ templates }: TemplatesSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

    // Always render the container with min-height to prevent layout shift
    const isLoading = !templates || templates.length === 0;

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 400; // Adjust scroll distance as needed
            const currentScroll = sliderRef.current.scrollLeft;
            sliderRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ minHeight: '500px' }}>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden border-2 border-gray-200 animate-pulse">
                        <div className="aspect-[8.5/11] bg-gray-200"></div>
                        <div className="p-6">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="relative group/slider">
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-blue-600 rounded-full p-3 shadow-lg transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-0"
                aria-label="Scroll left"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-blue-600 rounded-full p-3 shadow-lg transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-0"
                aria-label="Scroll right"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <div
                ref={sliderRef}
                id="templates-slider"
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: '500px' }}
            >
                {templates.map((template) => (
                    <Link
                        key={template._id}
                        href={`${ENV.EDITOR_URL}/editor?template=${template._id}`}
                        className="flex-shrink-0 w-80 group bg-white overflow-hidden border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-2xl relative"
                    >
                        <div className="relative pt-6 px-3 pb-3">
                            <div className="bg-white aspect-[8.5/11] relative overflow-hidden">
                                {template.thumbnail ? (
                                    <Image
                                        src={ENV.API_URL + template.thumbnail}
                                        alt={template.name}
                                        width={320}
                                        height={415}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-3/4 h-5/6 bg-white rounded-lg shadow-lg p-4">
                                            <div className="space-y-2">
                                                <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                                                <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                                                <div className="mt-4 space-y-1">
                                                    <div className="h-2 bg-gray-300 rounded"></div>
                                                    <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <div className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Use Template
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                            <p className="text-sm text-gray-600">ATS-friendly • Professional</p>
                        </div>
                    </Link>
                ))}
            </div>
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
