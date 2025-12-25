import { Check, Sparkles, Zap, Crown, Shield, Star } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const pricingTiers = [
    {
        name: "Free",
        price: 0,
        period: "forever",
        description: "Perfect for getting started",
        icon: <Sparkles size={40} />,
        features: [
            "Create and edit resume",
            "Real-time preview",
            "10 basic templates",
            "Auto-save functionality",
            "Export to PDF (limited)",
        ],
        cta: "Get Started Free",
        popular: false
    },
    {
        name: "Pro",
        price: 9,
        period: "month",
        description: "Best for job seekers",
        icon: <Zap size={40} />,
        features: [
            "Everything in Free",
            "Unlimited PDF downloads",
            "Access to 5+ premium templates",
            "Export to Word format",
            "Basic customer support",
            "Remove watermarks",
            "Cover letter builder",
        ],
        cta: "Start Pro Trial",
        popular: true
    },
    {
        name: "Premium",
        price: 19,
        period: "month",
        description: "For professionals",
        icon: <Crown size={40} />,
        features: [
            "Everything in Pro",
            "Unlimited premium templates (50+)",
            "Priority customer support",
            "Custom branding options",
            "Advanced formatting tools",
            "Resume analytics",
            "LinkedIn profile optimization",
            "Interview preparation guide",
        ],
        cta: "Go Premium",
        popular: false
    }
];

const testimonials = [
    {
        name: "Avinash Mani Tripathi",
        role: "Software Engineer",
        company: "Google",
        text: "This resume builder helped me land my dream job at Google! The templates are professional and ATS-friendly.",
        rating: 5
    },
    {
        name: "Saurabh Mani Tripathi",
        role: "Marketing Manager",
        company: "Amazon",
        text: "The Pro plan is worth every penny. I've created multiple versions of my resume for different positions.",
        rating: 5
    },
    {
        name: "Devender Mani Tripathi",
        role: "Product Designer",
        company: "Apple",
        text: "Beautiful templates and easy to use. The premium features are game-changing for job seekers.",
        rating: 5
    }
];

export default function PricingPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <Sparkles size={16} />
                            Simple, Transparent Pricing
                        </div>
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                            Choose the Plan That's
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Right for You</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Start free and upgrade anytime. All plans include our core features to help you create a professional resume.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="pb-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier, index) => (
                            <div
                                key={index}
                                className={`relative rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${tier.popular
                                    ? "border-blue-500 shadow-xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50"
                                    : "border-gray-200 bg-white hover:border-blue-300"
                                    }`}
                            >
                                {/* Popular Badge */}
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`mb-6 ${tier.popular ? "text-blue-600" : "text-gray-600"}`}>
                                    {tier.icon}
                                </div>

                                {/* Tier Name */}
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                    {tier.name}
                                </h3>

                                {/* Price */}
                                <div className="mb-4">
                                    <span className="text-6xl font-extrabold text-gray-900">
                                        ${tier.price}
                                    </span>
                                    <span className="text-gray-600 text-xl ml-2">
                                        /{tier.period}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-8 text-lg">
                                    {tier.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${tier.popular ? "bg-blue-500" : "bg-green-500"
                                                }`}>
                                                <Check size={16} className="text-white" />
                                            </div>
                                            <span className="text-gray-700 leading-tight">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${tier.popular
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                                        : "bg-gray-900 text-white hover:bg-gray-800"
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Comparison */}
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                            Compare All Features
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-4 px-6 font-bold text-gray-900">Feature</th>
                                        <th className="text-center py-4 px-6 font-bold text-gray-900">Free</th>
                                        <th className="text-center py-4 px-6 font-bold text-blue-600">Pro</th>
                                        <th className="text-center py-4 px-6 font-bold text-purple-600">Premium</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Resume Templates", "10", "15+", "50+"],
                                        ["PDF Downloads", "Limited", "Unlimited", "Unlimited"],
                                        ["Word Export", "✗", "✓", "✓"],
                                        ["Cover Letter Builder", "✗", "✓", "✓"],
                                        ["Custom Branding", "✗", "✗", "✓"],
                                        ["Priority Support", "✗", "✗", "✓"],
                                        ["Resume Analytics", "✗", "✗", "✓"],
                                    ].map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">{row[0]}</td>
                                            <td className="py-4 px-6 text-center text-gray-600">{row[1]}</td>
                                            <td className="py-4 px-6 text-center text-gray-600">{row[2]}</td>
                                            <td className="py-4 px-6 text-center text-gray-600">{row[3]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                            Trusted by Professionals
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                        <div className="text-blue-600 text-sm font-semibold">{testimonial.company}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "Can I cancel my subscription anytime?",
                                    a: "Yes! You can cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period."
                                },
                                {
                                    q: "Do you offer a money-back guarantee?",
                                    a: "Absolutely! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund."
                                },
                                {
                                    q: "Can I upgrade or downgrade my plan?",
                                    a: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your current billing cycle."
                                },
                                {
                                    q: "What payment methods do you accept?",
                                    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and UPI for Indian customers."
                                }
                            ].map((faq, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                                    <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="py-16 px-6 bg-white">
                    <div className="max-w-6xl mx-auto flex items-center justify-center gap-12 flex-wrap text-gray-600">
                        <div className="flex items-center gap-2">
                            <Shield size={24} className="text-green-600" />
                            <span className="font-semibold">Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check size={24} className="text-green-600" />
                            <span className="font-semibold">30-Day Money Back</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={24} className="text-green-600" />
                            <span className="font-semibold">Cancel Anytime</span>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join over 500,000 job seekers who trust us with their career success.
                        </p>
                        <button className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105">
                            Start Building Your Resume
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}
