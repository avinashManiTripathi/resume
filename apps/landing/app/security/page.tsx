import { Metadata } from "next";
import { Shield, Lock, Key, Server, Eye, FileCheck, AlertTriangle, Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Security - Resume Builder",
    description: "Learn about our security measures, data protection practices, and commitment to keeping your information safe.",
};

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Security</h1>
                    <p className="text-lg text-gray-600">
                        Your trust is our priority. Learn how we protect your data.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We take the security of your personal information and resume data seriously. Our platform employs industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction.
                        </p>
                    </section>

                    {/* Security Measures */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Measures</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Lock,
                                    title: "Data Encryption",
                                    description: "All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.3 encryption. Your resume data is encrypted at rest using AES-256 encryption.",
                                },
                                {
                                    icon: Key,
                                    title: "Secure Authentication",
                                    description: "We use OAuth 2.0 with Google for secure user authentication. Passwords are never stored in plain text and are hashed using bcrypt with salt.",
                                },
                                {
                                    icon: Server,
                                    title: "Infrastructure Security",
                                    description: "Our infrastructure is hosted on secure, SOC 2 Type II certified cloud platforms with automated security patches and regular vulnerability assessments.",
                                },
                                {
                                    icon: Eye,
                                    title: "Access Controls",
                                    description: "Strict access controls ensure only authorized personnel can access sensitive systems. All access is logged and monitored for suspicious activity.",
                                },
                                {
                                    icon: FileCheck,
                                    title: "Regular Audits",
                                    description: "We conduct regular security audits and penetration testing to identify and address potential vulnerabilities before they can be exploited.",
                                },
                                {
                                    icon: AlertTriangle,
                                    title: "Incident Response",
                                    description: "We have a dedicated incident response plan and will notify affected users within 72 hours of any confirmed data breach.",
                                },
                            ].map((measure, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <measure.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{measure.title}</h3>
                                            <p className="text-gray-600 text-sm">{measure.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Third-Party Security */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Security</h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <p className="text-gray-700 mb-4">We partner with trusted third-party services that maintain high security standards:</p>
                            <div className="space-y-3">
                                {[
                                    { service: "Stripe", purpose: "PCI DSS Level 1 certified payment processing" },
                                    { service: "Google Cloud Platform", purpose: "SOC 2 Type II certified infrastructure" },
                                    { service: "MongoDB Atlas", purpose: "Encrypted database with automated backups" },
                                ].map((partner, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-gray-900">{partner.service}:</span>{" "}
                                            <span className="text-gray-600">{partner.purpose}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Your Responsibilities */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibilities</h2>
                        <p className="text-gray-700 mb-4">While we implement strong security measures, your cooperation is essential:</p>
                        <div className="space-y-3">
                            {[
                                "Keep your account credentials confidential and never share them",
                                "Use a strong, unique password for your account",
                                "Log out of your account when using shared or public devices",
                                "Report any suspicious activity immediately to our support team",
                                "Keep your device's operating system and browser up to date",
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Compliance */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance & Standards</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {["GDPR", "CCPA", "SOC 2"].map((standard, index) => (
                                <div key={index} className="border-2 border-blue-200 rounded-lg p-4 text-center">
                                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <p className="font-semibold text-gray-900">{standard}</p>
                                    <p className="text-xs text-gray-600 mt-1">Compliant</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Concerns?</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have discovered a security vulnerability or have questions about our security practices, please contact our security team at{" "}
                            <a href="mailto:security@profresume.com" className="text-blue-600 hover:underline">
                                security@profresume.com
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
