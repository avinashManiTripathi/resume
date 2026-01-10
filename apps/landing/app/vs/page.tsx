import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { IntroSection } from "@/components/IntroSection";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Why Choose ProfResume? Compare with Other Resume Builders',
    description: 'See how ProfResume compares to other resume builders. ATS optimization, voice input, unlimited free features, and more.',
    alternates: {
        canonical: '/vs',
    },
    openGraph: {
        title: 'ProfResume vs Others - The Comparison',
        description: 'Compare features, pricing, and results. See why ProfResume is the preferred choice for over 50,000 job seekers.',
        url: '/vs',
        type: 'website',
    },
};

export default function ComparisonPage() {
    const rows = [
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
    ];

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
                    <div className="bg-white border-2 border-gray-200 rounded-[2.5rem] overflow-hidden mb-12 shadow-sm">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-gray-50 font-bold text-gray-900 border-b-2 border-gray-200">
                            <div className="px-8 py-6">Feature</div>
                            <div className="px-8 py-6 text-center text-blue-600">ProfResume</div>
                            <div className="px-8 py-6 text-center">Others</div>
                        </div>

                        {rows.map((row, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-3 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <div className="px-8 py-6 font-bold text-gray-900">
                                    {row.feature}
                                </div>

                                <div className="px-8 py-6 bg-blue-50/50 text-center font-bold">
                                    {typeof row.ProfResume === "boolean" ? (
                                        row.ProfResume ? (
                                            <span className="text-emerald-500 text-2xl font-bold">✓</span>
                                        ) : (
                                            <span className="text-red-500 text-2xl font-bold">✗</span>
                                        )
                                    ) : (
                                        <span className="text-blue-600">{row.ProfResume}</span>
                                    )}
                                </div>

                                <div className="px-8 py-6 text-center font-semibold text-gray-500">
                                    {typeof row.competitor === "boolean" ? (
                                        row.competitor ? (
                                            <span className="text-emerald-500 text-2xl font-bold">✓</span>
                                        ) : (
                                            <span className="text-red-500 text-2xl font-bold">✗</span>
                                        )
                                    ) : (
                                        <span>{row.competitor}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] px-8 py-16 text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
                            Ready to Experience the Difference?
                        </h2>
                        <Link
                            href={ENV.EDITOR_URL}
                            className="inline-block bg-white text-blue-600 font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
                        >
                            Try ProfResume Free →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
