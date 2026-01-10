"use client";

import { IntroSection } from "@/components/IntroSection";

export default function ComparisonPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <IntroSection
                sectionClassName="text-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-8 pb-16"
                title="Why Choose ProfResume?"
                description="See how we compare to other resume builders"
            />

            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Comparison Table */}
                    <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden mb-12">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-gray-50 font-bold text-gray-900 border-b-2 border-gray-200">
                            <div className="px-6 py-5">Feature</div>
                            <div className="px-6 py-5 text-center">ProfResume</div>
                            <div className="px-6 py-5 text-center">Others</div>
                        </div>

                        {[
                            { feature: "ATS Optimization", ProfResume: true, competitor: "Limited" },
                            { feature: "Free Plan", ProfResume: true, competitor: false },
                            { feature: "Unlimited Resumes (Pro)", ProfResume: true, competitor: "Limited" },
                            { feature: "PDF Export", ProfResume: true, competitor: true },
                            { feature: "DOCX Export", ProfResume: true, competitor: "Paid only" },
                            { feature: "Cover Letter Builder", ProfResume: true, competitor: "Extra cost" },
                            { feature: "Real-time Preview", ProfResume: true, competitor: true },
                            { feature: "Mobile Friendly", ProfResume: true, competitor: "Limited" },
                            { feature: "Customer Support", ProfResume: "24/7", competitor: "Business hours" },
                            { feature: "Price (Pro)", ProfResume: "$9/mo", competitor: "$15–30/mo" },
                        ].map((row, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-3 border-b last:border-b-0 border-gray-100"
                            >
                                <div className="px-6 py-5 font-medium text-gray-900">
                                    {row.feature}
                                </div>

                                <div className="px-6 py-5 bg-indigo-50 text-center font-semibold">
                                    {typeof row.ProfResume === "boolean" ? (
                                        row.ProfResume ? (
                                            <span className="text-emerald-500 text-xl font-bold">✓</span>
                                        ) : (
                                            <span className="text-red-500 text-xl font-bold">✗</span>
                                        )
                                    ) : (
                                        <span>{row.ProfResume}</span>
                                    )}
                                </div>

                                <div className="px-6 py-5 text-center font-semibold text-gray-800">
                                    {typeof row.competitor === "boolean" ? (
                                        row.competitor ? (
                                            <span className="text-emerald-500 text-xl font-bold">✓</span>
                                        ) : (
                                            <span className="text-red-500 text-xl font-bold">✗</span>
                                        )
                                    ) : (
                                        <span>{row.competitor}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-gradient-to-br from-blue-500 to-violet-600 rounded-[2rem] px-8 py-16 text-white">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
                            Ready to Experience the Difference?
                        </h2>
                        <a
                            href="https://edit.profresume.com/editor"
                            className="inline-block bg-white text-blue-600 font-semibold text-lg px-10 py-5 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all"
                        >
                            Try ProfResume Free →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
