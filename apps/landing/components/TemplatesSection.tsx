import { Check } from "lucide-react";
import { TemplatesSlider } from "./TemplatesSlider";
import { ENV } from "@/app/env";
import { API_ENDPOINTS } from "@repo/utils-client";
import Link from 'next/link';
import { Button } from '@repo/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { serverNetwork } from '@repo/utils-server';

import Image from 'next/image';

interface Template {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: string;
}

async function getTemplates() {
    try {
        const response = await serverNetwork.get<{ templates: Template[] }>(`${ENV.API_URL}/api/templates?isFeatured=true&limit=4`, {
            next: { revalidate: 300 } // 5 minutes cache
        });
        return response?.templates || [];
    } catch (error) {
        console.error('Failed to fetch templates:', error);
        return [];
    }
}

export async function TemplatesSection() {
    const templates = await getTemplates();

    if (!templates.length) return null;

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl translate-y-1/2"></div>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Premium Quality</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Professional Templates for Every Role
                        </h2>
                        <p className="text-lg text-slate-600">
                            Choose from our collection of ATS-friendly templates designed to help you stand out.
                        </p>
                    </div>
                    <Link href="/templates">
                        <Button variant="outline" className="group h-11 px-8 text-base">
                            View All Templates
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {templates.map((template: Template) => (
                        <Link
                            key={template._id}
                            href={`${ENV.EDITOR_URL}?templateId=${template._id}`}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-slate-200 hover:ring-blue-500 hover:-translate-y-1"
                        >
                            <div className="aspect-[210/297] bg-slate-100 relative overflow-hidden">
                                {template.image ? (
                                    <Image
                                        src={`${ENV.API_URL}${template.image}`}
                                        alt={template.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        No Preview
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <Button className="w-full bg-white text-slate-900 hover:bg-blue-50">
                                        Use This Template
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-1 truncate">{template.name}</h3>
                                <p className="text-sm text-slate-500 capitalize">{template.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
