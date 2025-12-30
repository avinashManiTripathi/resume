"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

interface FooterLink {
    text: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface FooterData {
    brand: {
        icon: string;
        logo: string;
        description: string;
    };
    sections: FooterSection[];
    copyright: string;
}

export function Footer() {
    const [footerData, setFooterData] = useState<FooterData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/landing/footer')
            .then(res => res.json())
            .then(data => {
                setFooterData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load footer:', err);
                setLoading(false);
            });
    }, []);

    if (loading || !footerData) {
        return null;
    }

    return (
        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">{footerData.brand.logo}</span>
                        </div>
                        <p className="text-sm">{footerData.brand.description}</p>
                    </div>

                    {/* Dynamic Sections */}
                    {footerData.sections.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-2 text-sm">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link href={link.href} className="hover:text-white transition-colors">
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm">
                    <p>{footerData.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
