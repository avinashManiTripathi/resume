import { Metadata } from "next";
import { Cookie, Shield, Settings, Check, X } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cookie Policy - Resume Builder",
    description: "Learn about how we use cookies to improve your experience on our resume builder platform.",
};

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Cookie className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Cookie Policy</h1>
                    <p className="text-lg text-gray-600">
                        Last updated: January 7, 2026
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our service, and improving our platform's functionality.
                        </p>
                    </section>

                    {/* Types of Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "Essential Cookies",
                                    icon: Shield,
                                    required: true,
                                    description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and session management.",
                                    examples: ["Session tokens", "Authentication state", "Security preferences"],
                                },
                                {
                                    name: "Functional Cookies",
                                    icon: Settings,
                                    required: false,
                                    description: "These cookies allow us to remember your choices (such as language preferences, font selections) and provide enhanced, personalized features.",
                                    examples: ["Language preferences", "Theme settings", "Resume templates chosen"],
                                },
                                {
                                    name: "Analytics Cookies",
                                    icon: Cookie,
                                    required: false,
                                    description: "These cookies help us understand how visitors interact with our website by collecting information anonymously to improve our services.",
                                    examples: ["Page views", "Time spent on site", "Navigation patterns"],
                                },
                            ].map((cookie, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <cookie.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{cookie.name}</h3>
                                                {cookie.required ? (
                                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">Required</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Optional</span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-3">{cookie.description}</p>
                                            <div className="text-sm text-gray-500">
                                                <span className="font-medium">Examples:</span> {cookie.examples.join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Cookie Management */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookies</h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                            <p className="text-gray-700">
                                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Adjusting your browser settings to refuse all or some browser cookies",
                                    "Using our cookie consent banner when you first visit our website",
                                    "Deleting cookies that have already been placed on your device",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-600 mt-4">
                                <strong>Note:</strong> Disabling essential cookies may affect the functionality of our website and prevent you from using certain features.
                            </p>
                        </div>
                    </section>

                    {/* Third-Party Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may use third-party services that set their own cookies to provide specific functionality:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { service: "Google Analytics", purpose: "Website analytics and performance monitoring" },
                                { service: "Stripe", purpose: "Payment processing and billing management" },
                            ].map((service, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">{service.service}</h3>
                                    <p className="text-sm text-gray-600">{service.purpose}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have any questions about our use of cookies, please contact us at{" "}
                            <a href="mailto:privacy@profresume.com" className="text-blue-600 hover:underline">
                                privacy@profresume.com
                            </a>
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/privacy"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                View Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                View Terms of Service
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
