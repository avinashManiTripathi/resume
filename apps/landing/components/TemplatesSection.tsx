import { Check } from "lucide-react";
import { TemplatesSlider } from "./TemplatesSlider";
import { ENV } from "@/app/env";

interface Template {
    _id: string;
    name: string;
    thumbnail: string | null;
}

async function getTemplates(): Promise<Template[]> {
    try {
        const apiUrl = ENV.API_URL;
        const res = await fetch(`${apiUrl}/api/templates`, {
            next: { revalidate: 300 }, // 5 minutes cache
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            console.error('[TemplatesSection] API returned status:', res.status);
            return [];
        }

        const data = await res.json();
        return data.templates || [];
    } catch (error) {
        console.error('[TemplatesSection] Error fetching templates:', error);
        return [];
    }
}

export async function TemplatesSection() {
    const templates = await getTemplates();

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="w-full mx-auto">
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

                <TemplatesSlider templates={templates} />
            </div>
        </section>
    );
}
