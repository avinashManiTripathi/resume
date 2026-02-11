import { Check, Sparkles, Zap, Crown, Shield, Star } from "lucide-react";
import { Metadata } from "next";
import { ENV } from "../env";

export const metadata: Metadata = {
    title: 'Pricing - Choose Your Plan | Hirecta',
    description: 'Affordable pricing for every job seeker. Start free and upgrade to Pro or Premium for advanced AI features and unlimited downloads.',
    alternates: {
        canonical: '/pricing',
    },
    openGraph: {
        title: 'Simple and Transparent Pricing | Hirecta',
        description: 'Choose the right plan for your career. Free, Pro, and Premium options available.',
        url: '/pricing',
        type: 'website',
    },
};

interface Plan {
    planId: string;
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    currency: string;
    features: string[];
    popular: boolean;
}

async function getPlans(): Promise<Plan[]> {
    try {
        const res = await fetch(`${ENV.API_URL}/api/plans`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error('Failed to fetch plans');
        const data = await res.json();
        return data.plans || [];
    } catch (error) {
        console.error('Error fetching plans:', error);
        return [];
    }
}

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

export default async function PricingPage() {
    const plans = await getPlans();

    const getIcon = (planId: string) => {
        switch (planId) {
            case 'free': return <Sparkles size={40} />;
            case 'pro': return <Zap size={40} />;
            case 'premium': return <Crown size={40} />;
            default: return <Sparkles size={40} />;
        }
    };

    const getCTA = (planId: string) => {
        switch (planId) {
            case 'free': return "Get Started Free";
            case 'pro': return "Start Pro Trial";
            case 'premium': return "Go Premium";
            default: return "Get Started";
        }
    };

    const pricingTiers = plans.length > 0 ? plans.map(plan => ({
        name: plan.name,
        price: plan.monthlyPrice,
        currency: plan.currency === 'INR' ? '₹' : '$',
        period: plan.planId === 'free' ? 'forever' : 'month',
        description: plan.description,
        icon: getIcon(plan.planId),
        features: plan.features,
        cta: getCTA(plan.planId),
        popular: plan.popular
    })) : [
        {
            name: "Free",
            price: 0,
            currency: "₹",
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
            price: 799,
            currency: "₹",
            period: "month",
            description: "Best for job seekers",
            icon: <Zap size={40} />,
            features: [
                "Everything in Free",
                "Unlimited PDF downloads",
                "Access to 15+ premium templates",
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
            price: 1599,
            currency: "₹",
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        Simple, Transparent Pricing
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
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
                                <span className="text-5xl font-extrabold text-gray-900">
                                    {tier.currency}{tier.price}
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

            {/* SEO Content Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto prose prose-lg max-w-none">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Transparent Resume Builder Pricing - Free Forever, Upgrade When Ready
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            At Hirecta, we believe everyone deserves access to professional resume building tools - regardless of budget. That's why our <strong>Free plan is truly free forever</strong>, with no hidden fees, no watermarks, and no credit card required. Unlike other "free" resume builders that lock essential features behind paywalls, we give you everything you need to create a professional, ATS-friendly resume from day one.
                        </p>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Why Choose Hirecta's Pricing Model?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">✓ No Surprise Charges</h3>
                                <p className="text-gray-700">
                                    What you see is what you get. Our pricing is straightforward with no hidden fees, setup costs, or mysterious charges.
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">✓ Cancel Anytime</h3>
                                <p className="text-gray-700">
                                    No long-term commitments or contracts. All paid plans are month-to-month, and you can cancel anytime with one click.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl my-16 px-8">
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
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "Can I cancel my subscription anytime?",
                                    a: "Yes! You can cancel your subscription at any time from your account settings."
                                },
                                {
                                    q: "Do you offer a money-back guarantee?",
                                    a: "Absolutely! We offer a 30-day money-back guarantee on all paid plans."
                                }
                            ].map((faq, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
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
    );
}
