import { IntroSection } from "@/components/IntroSection";
import { ENV } from "@/app/env";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - ProfResume",
    description: "Read our terms of service to understand your rights and responsibilities when using our resume builder.",
    alternates: {
        canonical: "/terms",
    },
    openGraph: {
        title: "Terms of Service - ProfResume",
        description: "Read our terms of service to understand your rights and responsibilities.",
        url: "/terms",
        type: "website",
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <IntroSection
                sectionClassName="text-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-8 pb-16"
                title="Terms of Service"
                description="Last updated: December 8, 2025"
            />
            {/* Content */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            By accessing and using ProfResume, you accept and agree to be bound by
                            the terms and provision of this agreement.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            2. Use License
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Permission is granted to use ProfResume for personal, non-commercial
                            purposes to create and download resumes.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            3. User Account
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            You are responsible for maintaining the confidentiality of your account
                            and password. You agree to accept responsibility for all activities that
                            occur under your account.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            4. Content Ownership
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            You retain all rights to the content you create using ProfResume. We do
                            not claim ownership of your resumes or personal information.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            5. Prohibited Uses
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            You may not use ProfResume for any illegal purposes or to violate any
                            laws in your jurisdiction.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            6. Limitation of Liability
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            ProfResume shall not be liable for any indirect, incidental, special,
                            consequential or punitive damages resulting from your use of the
                            service.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            7. Changes to Terms
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We reserve the right to modify these terms at any time. We will notify
                            users of any material changes.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            8. Contact
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at{" "}
                            <a href={`mailto:${ENV.LEGAL_EMAIL}`} className="text-blue-600 hover:underline">
                                {ENV.LEGAL_EMAIL}
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
