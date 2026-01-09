import { Check, X, Shield, Star, Users, Award } from "lucide-react";

export function WhyChooseUs() {
    const features = [
        { name: "Truly Free", profresume: true, competitors: false },
        { name: "No Watermarks", profresume: true, competitors: false },
        { name: "Unlimited Downloads", profresume: true, competitors: false },
        { name: "AI-Powered Writing", profresume: true, competitors: false },
        { name: "ATS Checker Built-in", profresume: true, competitors: false },
        { name: "Cover Letter Generator", profresume: true, competitors: false },
        { name: "Job Description Tailoring", profresume: true, competitors: false },
        { name: "50+ Premium Templates", profresume: true, competitors: "10-20" },
        { name: "No Sign-up Required", profresume: true, competitors: false },
        { name: "Export to Word & PDF", profresume: true, competitors: "PDF only" },
    ];

    const trustSignals = [
        {
            icon: <Users className="w-6 h-6" />,
            stat: "500,000+",
            label: "Professionals Trust Us",
            color: "blue"
        },
        {
            icon: <Star className="w-6 h-6" />,
            stat: "4.9/5",
            label: "Average Rating",
            color: "yellow"
        },
        {
            icon: <Award className="w-6 h-6" />,
            stat: "95%",
            label: "Success Rate",
            color: "green"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            stat: "SOC 2",
            label: "Security Certified",
            color: "purple"
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                        <Award className="w-4 h-4" />
                        Why We're Different
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Why Choose ProfResume Over Other{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Resume Builders?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Most "free" resume builders have hidden limitations. We're different. Here's an honest comparison of what you actually get.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                    <th className="text-left py-6 px-6 font-bold text-lg">Feature</th>
                                    <th className="text-center py-6 px-6 font-bold text-lg">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-2xl">🌟</span>
                                            <span>ProfResume</span>
                                        </div>
                                    </th>
                                    <th className="text-center py-6 px-6 font-bold text-lg">Other Builders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            } hover:bg-blue-50 transition-colors`}
                                    >
                                        <td className="py-5 px-6 font-semibold text-gray-900">
                                            {feature.name}
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            {feature.profresume === true ? (
                                                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                                    <Check className="w-6 h-6 text-green-600" />
                                                </div>
                                            ) : (
                                                <span className="text-gray-700 font-semibold">{feature.profresume}</span>
                                            )}
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            {feature.competitors === false ? (
                                                <div className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                                                    <X className="w-6 h-6 text-red-600" />
                                                </div>
                                            ) : feature.competitors === true ? (
                                                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                                    <Check className="w-6 h-6 text-green-600" />
                                                </div>
                                            ) : (
                                                <span className="text-gray-600 text-sm">{feature.competitors}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {trustSignals.map((signal, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-500"
                        >
                            <div className={`w-14 h-14 bg-${signal.color}-100 rounded-full flex items-center justify-center text-${signal.color}-600 mx-auto mb-4`}>
                                {signal.icon}
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900 mb-2">
                                {signal.stat}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                {signal.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Security & Compliance Badges */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Your Data is Safe & Secure
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-8 text-gray-700">
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-green-600" />
                            <span className="font-semibold">SOC 2 Type II Certified</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-green-600" />
                            <span className="font-semibold">GDPR Compliant</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-green-600" />
                            <span className="font-semibold">256-bit SSL Encryption</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-green-600" />
                            <span className="font-semibold">No Data Selling</span>
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-lg mb-4">
                        Trusted by professionals at leading companies worldwide
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                        <span className="text-2xl font-bold text-gray-700">Google</span>
                        <span className="text-2xl font-bold text-gray-700">Amazon</span>
                        <span className="text-2xl font-bold text-gray-700">Microsoft</span>
                        <span className="text-2xl font-bold text-gray-700">Meta</span>
                        <span className="text-2xl font-bold text-gray-700">Apple</span>
                        <span className="text-2xl font-bold text-gray-700">Netflix</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
