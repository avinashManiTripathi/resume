"use client";

import Link from "next/link";
import Image from "next/image";

interface Template {
    _id: string;
    name: string;
    thumbnail: string | null;
}

interface TemplatesSliderProps {
    templates: Template[];
}

export function TemplatesSlider({ templates }: TemplatesSliderProps) {
    // Always render the container with min-height to prevent layout shift
    const isLoading = !templates || templates.length === 0;

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
        <div className="relative">
            <div
                id="templates-slider"
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: '500px' }}
            >
                {templates.map((template) => (
                    <Link
                        key={template._id}
                        href={`https://edit.profresume.com/editor?template=${template._id}`}
                        className="flex-shrink-0 w-80 group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-2xl"
                    >
                        <div className="bg-white p-[16px] aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                            {template.thumbnail ? (
                                <Image
                                    src={"https://api.profresume.com" + template.thumbnail}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                                <div className="text-white font-bold text-lg">Use Template</div>
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
