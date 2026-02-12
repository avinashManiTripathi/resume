import { Briefcase, TrendingUp, GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface IndustryTip {
    icon: React.ReactNode;
    title: string;
    tips: string[];
    link?: { text: string; url: string };
}

interface IndustryTipsProps {
    tips: IndustryTip[];
}

export function IndustryTips({ tips }: IndustryTipsProps) {
    return (
        <section id="industry-tips" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                    Resume Tips by Industry (2026)
                </h2>
                <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Expert advice tailored to your career field
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                {tip.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {tip.title}
                            </h3>
                            <ul className="space-y-2 text-gray-700 text-sm mb-4">
                                {tip.tips.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {tip.link && (
                                <Link
                                    href={tip.link.url}
                                    className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
                                >
                                    {tip.link.text} →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
