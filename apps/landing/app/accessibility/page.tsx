import { Metadata } from "next";
import { Eye, Keyboard, MousePointer, Volume2, Accessibility, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Accessibility - Resume Builder",
    description: "Learn about our commitment to accessibility and the features we provide to ensure everyone can use our resume builder.",
};

export default function AccessibilityPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Accessibility className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Accessibility</h1>
                    <p className="text-lg text-gray-600">
                        Building resumes should be accessible to everyone.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We are committed to ensuring that our resume builder is accessible to all users, including those with disabilities. We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                            <p className="text-sm text-gray-700">
                                <strong className="text-blue-900">Our Goal:</strong> We believe everyone deserves equal access to create professional resumes, regardless of their abilities or the technologies they use.
                            </p>
                        </div>
                    </section>

                    {/* WCAG Compliance */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">WCAG 2.1 Level AA Compliance</h2>
                        <p className="text-gray-700 mb-4">We follow the four principles of accessibility:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                {
                                    principle: "Perceivable",
                                    description: "Information and UI components are presentable to users in ways they can perceive.",
                                    examples: ["Text alternatives for images", "Sufficient color contrast", "Resizable text"],
                                },
                                {
                                    principle: "Operable",
                                    description: "UI components and navigation are operable by all users.",
                                    examples: ["Keyboard accessible", "Enough time to read content", "No seizure-inducing content"],
                                },
                                {
                                    principle: "Understandable",
                                    description: "Information and UI operation are understandable.",
                                    examples: ["Readable text", "Predictable behavior", "Input assistance"],
                                },
                                {
                                    principle: "Robust",
                                    description: "Content can be interpreted by a wide variety of user agents, including assistive technologies.",
                                    examples: ["Valid HTML", "Semantic markup", "ARIA attributes"],
                                },
                            ].map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.principle}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                    <ul className="space-y-1">
                                        {item.examples.map((example, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                                                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>{example}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Accessibility Features */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: Keyboard,
                                    title: "Keyboard Navigation",
                                    description: "All interactive elements can be accessed and operated using only a keyboard. Use Tab to navigate forward, Shift+Tab to navigate backward, and Enter or Space to activate elements.",
                                },
                                {
                                    icon: Eye,
                                    title: "Screen Reader Support",
                                    description: "Our interface is compatible with popular screen readers like JAWS, NVDA, and VoiceOver. We use semantic HTML and ARIA labels to provide meaningful descriptions of all UI elements.",
                                },
                                {
                                    icon: MousePointer,
                                    title: "Focus Indicators",
                                    description: "Clear visual focus indicators help keyboard users understand which element currently has focus. Focus states are visible and meet WCAG contrast requirements.",
                                },
                                {
                                    icon: Volume2,
                                    title: "Voice Command Support",
                                    description: "Our innovative voice command feature allows users to create resumes by speaking, making the process more accessible for users with motor disabilities or visual impairments.",
                                },
                            ].map((feature, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <feature.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Additional Features */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Accessibility Features</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                "Color contrast ratios exceeding WCAG AA standards (4.5:1 for normal text)",
                                "Resizable text up to 200% without loss of functionality",
                                "Skip navigation links to jump to main content",
                                "Descriptive link text and button labels",
                                "Error messages with clear instructions for correction",
                                "Form labels properly associated with input fields",
                                "Consistent and predictable navigation",
                                "Reduced motion options for users sensitive to animations",
                            ].map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-700 text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Ongoing Efforts */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Improvements</h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <p className="text-gray-700 mb-4">
                                Accessibility is an ongoing commitment. We continuously work to improve our platform through:
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Regular accessibility audits and testing with assistive technologies",
                                    "User feedback from people with disabilities",
                                    "Training our development team on accessibility best practices",
                                    "Monitoring updates to WCAG guidelines and web standards",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Feedback */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback & Support</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We welcome feedback on the accessibility of our platform. If you encounter any barriers or have suggestions for improvement, please contact us at{" "}
                            <a href="mailto:accessibility@profresume.com" className="text-blue-600 hover:underline">
                                accessibility@profresume.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-600 mb-6">
                            We aim to respond to accessibility-related inquiries within 2 business days.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Contact Support
                            </Link>
                            <a
                                href="https://www.w3.org/WAI/WCAG21/quickref/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium inline-flex items-center gap-2"
                            >
                                WCAG Guidelines
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
