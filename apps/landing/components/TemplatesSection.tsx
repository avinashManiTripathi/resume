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
    thumbnail: string;
}

async function getTemplates() {
    try {
        const response = await serverNetwork.get<{ templates: Template[] }>(`${ENV.API_URL}/api/templates?isFeatured=true&limit=8`, {
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
    console.log({ templates })

    if (!templates.length) return null;

    return (

        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl translate-y-1/2"></div>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center justify-center mb-12 gap-6 text-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Premium Quality</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Build Your Resume for Any Career
                        </h2>
                        <p className="text-lg text-slate-600">
                            Choose from our collection of ATS-friendly templates designed to help you stand out.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full">
                <TemplatesSlider templates={templates} />
            </div>

            <div className="container px-4 mx-auto relative z-10 mt-12 flex justify-center">
                <Link href="/templates">
                    <Button variant="outline" className="group h-11 px-8 text-base">
                        View All Templates
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </section>
    );

}
