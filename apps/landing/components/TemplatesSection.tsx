"use client";

import { useTemplates } from "@repo/hooks/useTemplate";
import { TemplatesSlider } from "./TemplatesSlider";
import { Check } from "lucide-react";

export function TemplatesSection() {
    const { templates, loading, error } = useTemplates();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-full text-sm font-semibold mb-6">
                        <Check className="w-4 h-4" />
                        Tested with top employers
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Professional resume templates
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Built with recruiters. Tested with top employers. Proven to get interviews.
                    </p>
                </div>

                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-600">Failed to load templates. Please try again later.</p>
                    </div>
                )}

                <TemplatesSlider templates={(loading ? [] : templates || []) as any} />
            </div>
        </section>
    );
}
