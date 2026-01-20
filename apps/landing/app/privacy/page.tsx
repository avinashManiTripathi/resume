import { Metadata } from "next";
import { Shield, Eye, Lock, Gavel, Bell, Globe, Mail, UserCheck } from "lucide-react";
import { ENV } from "../env";

export const metadata: Metadata = {
    title: "Privacy Policy - Hirecta",
    description: "Learn how we protect your personal information and resume data.",
    alternates: {
        canonical: "/privacy",
    },
    openGraph: {
        title: "Privacy Policy - Hirecta",
        description: "Learn how we protect your personal information and resume data.",
        url: "/privacy",
        type: "website",
    },
};

export default function PrivacyPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <section className="pt-24 px-8 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-black text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-500">Last updated: December 8, 2025</p>
                </div>
            </section>

            <section className="py-16 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-12 rounded-3xl max-w-3xl mx-auto shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">1. Information We Collect</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">We collect information you provide directly to us when you create an account, build a resume, or contact us for support.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">We use the information we collect to provide, maintain, and improve our services, including to create and store your resumes.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">We do not sell, trade, or rent your personal information to third parties. Your resume data is yours and yours alone.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">You have the right to access, update, or delete your personal information at any time through your account settings.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">We use cookies to improve your experience on our website. You can control cookie settings through your browser.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            If you have questions about this Privacy Policy, please contact us at{" "}
                            <a href={`mailto:${ENV.PRIVACY_EMAIL}`} className="text-blue-600 hover:underline">
                                {ENV.PRIVACY_EMAIL}
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
