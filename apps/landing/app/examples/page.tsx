import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Resume Examples - Real Resumes That Landed Interviews | Hirecta',
    description: 'Explore real resume examples from professionals in tech, marketing, design, and finance that helped them land dream jobs using Hirecta.',
    alternates: {
        canonical: '/examples',
    },
    openGraph: {
        title: 'Professional Resume Examples - Success Showcases',
        description: 'See real resumes created with Hirecta that landed positions at top companies. Use them as inspiration for your own.',
        url: '/examples',
        type: 'website',
    },
};

export default function ExamplesPage() {
    const examples = [
        {
            badge: "Software Engineer",
            title: "Senior Software Engineer",
            desc: "Landed position at FAANG company with 40% salary increase",
            stats: ["⏱️ Created in 15 min", "📧 12 interviews"],
            color: "blue"
        },
        {
            badge: "Marketing",
            title: "Marketing Manager",
            desc: "Transitioned from coordinator to manager role",
            stats: ["⏱️ Created in 20 min", "📧 8 interviews"],
            color: "purple"
        },
        {
            badge: "Design",
            title: "UX Designer",
            desc: "Career change from graphic design to UX",
            stats: ["⏱️ Created in 18 min", "📧 10 interviews"],
            color: "indigo"
        },
        {
            badge: "Finance",
            title: "Financial Analyst",
            desc: "Recent graduate landed first job at top firm",
            stats: ["⏱️ Created in 12 min", "📧 6 interviews"],
            color: "emerald"
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Resume Examples That Get Results</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real resumes created with Hirecta that helped professionals land their dream jobs.</p>
                </div>
            </section>

            {/* Examples Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {examples.map((example, i) => (
                            <div key={i} className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all group flex flex-col h-full">
                                <div className="bg-blue-600 text-white py-2 px-4 text-sm font-bold text-center">
                                    {example.badge}
                                </div>
                                <div className="h-64 bg-gray-100 flex items-center justify-center p-8">
                                    <div className="w-full h-full bg-white shadow-sm border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-medium italic text-sm">
                                        Resume Preview
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{example.title}</h2>
                                    <p className="text-gray-600 text-sm mb-6 flex-1">{example.desc}</p>
                                    <div className="flex gap-4 pt-4 border-t border-gray-100 text-[13px] text-gray-500 font-medium">
                                        {example.stats.map((stat, idx) => (
                                            <span key={idx}>{stat}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Box */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Ready to Create Your Success Story?</h2>
                        <Link
                            href={ENV.EDITOR_URL}
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Start Building Your Resume <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
