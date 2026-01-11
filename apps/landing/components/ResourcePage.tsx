import React from 'react';
import { LucideIcon, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { ENV } from "@/app/env";

interface Topic {
    title: string;
    description: string;
}

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface ResourceHeroProps {
    title: string | React.ReactNode;
    subtitle: string;
    badge: string;
    badgeIcon: LucideIcon;
}

export const ResourceHero = ({ title, subtitle, badge, badgeIcon: BadgeIcon }: ResourceHeroProps) => (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <BadgeIcon className="w-4 h-4" />
                {badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                {title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
            </p>
        </div>
    </section>
);

export const ResourceFeatureGrid = ({ title, features }: { title: string; features: Feature[] }) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export const ResourceCTA = ({ title, subtitle }: { title: string; subtitle: string | React.ReactNode }) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                {title}
            </h2>
            <p className="text-xl text-blue-50 mb-8 opacity-90">
                {subtitle}
            </p>
            <Link
                href={ENV.EDITOR_URL}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
                <FileText className="w-5 h-5" />
                Build My Resume Now
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    </section>
);

export const ResourceContentSection = ({ title, content }: { title: string; content: React.ReactNode }) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
                {content}
            </div>
        </div>
    </section>
);
