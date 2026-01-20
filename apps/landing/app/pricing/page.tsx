import { Check, Sparkles, Zap, Crown, Shield, Star } from "lucide-react";
import { Metadata } from "next";

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

                {/* SEO Content Section - 1,000+ words */}
                <section className="py-16 px-6 bg-white">
                    <div className="max-w-6xl mx-auto prose prose-lg max-w-none">
                        {/* Introduction */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Transparent Resume Builder Pricing - Free Forever, Upgrade When Ready
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                At Hirecta, we believe everyone deserves access to professional resume building tools - regardless of budget. That's why our <strong>Free plan is truly free forever</strong>, with no hidden fees, no watermarks, and no credit card required. Unlike other "free" resume builders that lock essential features behind paywalls, we give you everything you need to create a professional, ATS-friendly resume from day one.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Whether you're a job seeker on a tight budget or a professional looking for advanced features, we have a pricing plan that fits your needs. Start free, and upgrade only when you're ready to unlock premium templates, advanced AI features, and priority support. Over <strong>500,000 professionals</strong> trust Hirecta to help them land their dream jobs.
                            </p>
                        </div>

                        {/* Why Our Pricing */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Why Choose Hirecta's Pricing Model?
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">✓ No Surprise Charges</h3>
                                    <p className="text-gray-700">
                                        What you see is what you get. Our pricing is straightforward with no hidden fees, setup costs, or mysterious charges. The price listed is the price you pay - period.
                                    </p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">✓ Cancel Anytime</h3>
                                    <p className="text-gray-700">
                                        No long-term commitments or contracts. All paid plans are month-to-month, and you can cancel anytime with one click. Downgrade back to Free whenever you want.
                                    </p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">✓ Try Before You Buy</h3>
                                    <p className="text-gray-700">
                                        Start completely free to test our platform. Upgrade to Pro or Premium only when you're convinced it's worth it. Many users stick with Free and never pay a dime.
                                    </p>
                                </div>
                                <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">✓ Pay Only for What You Need</h3>
                                    <p className="text-gray-700">
                                        Don't need advanced features? Stick with Free. Need unlimited downloads? Pro is perfect. Want everything? Premium has you covered. You're in control.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ROI Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Return on Investment: Premium Features That Pay for Themselves
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Our Pro and Premium plans aren't just expenses - they're investments in your career. Here's how the features pay for themselves:
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-6 border-2 border-blue-200">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    💰 The Math That Makes Sense
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p className="flex items-start gap-3">
                                        <span className="text-blue-600 font-bold">$9/month Pro Plan:</span>
                                        <span>Less than the cost of 2 coffee shop drinks. If our AI tailoring feature helps you land even ONE interview faster, you've saved <strong>dozens of hours</strong> of manual resume customization (worth $100s in time value).</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="text-purple-600 font-bold">$19/month Premium Plan:</span>
                                        <span>Cheaper than ONE professional resume review service ($150-300). You get <strong>unlimited AI-powered optimizations</strong>, 50+ premium templates, and priority support - features most resume writing services charge hundreds for as one-time fees.</span>
                                    </p>
                                    <p className="mt-6 bg-white rounded-lg p-4 border-2 border-blue-300">
                                        <strong className="text-blue-900">Real ROI Example:</strong> The average job search takes 3-6 months. At $19/month for Premium, that's $57-114 total investment. A single salary increase of even <strong>$5,000/year</strong> from landing a better job pays back this investment <strong>50x over</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Plan Comparison Details */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Detailed Plan Comparison: Which Is Right for You?
                            </h2>
                            <div className="space-y-6">
                                <div className="border-l-4 border-blue-600 pl-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                        Free Plan - Perfect for Getting Started
                                    </h3>
                                    <p className="text-gray-700 mb-3">
                                        <strong>Best for:</strong> Students, first-time job seekers, anyone testing the platform, or those applying to 1-2 jobs at a time.
                                    </p>
                                    <p className="text-gray-700 mb-3">
                                        Our Free plan includes everything essential to create a professional resume. You get access to 10 modern templates, real-time editing, and PDF downloads (with small limitations). This is genuinely enough for many users to successfully land jobs. The catch? You can export only 3 resumes per month as PDF, and some premium design templates are locked.
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>When to upgrade:</strong> If you're applying to 10+ jobs per month, need Word format exports, or want access to premium ATS-optimized templates.
                                    </p>
                                </div>

                                <div className="border-l-4 border-purple-600 pl-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                        Pro Plan ($9/month) - Most Popular Choice
                                    </h3>
                                    <p className="text-gray-700 mb-3">
                                        <strong>Best for:</strong> Active job seekers, career changers, professionals applying to 5+ positions monthly, anyone who values their time.
                                    </p>
                                    <p className="text-gray-700 mb-3">
                                        Pro removes all download limits and unlocks premium features that save hours of work. The AI cover letter generator alone is worth the price - it can create a customized cover letter in 2 minutes instead of the 30-60 minutes it typically takes manually. Word format exports mean you can make last-minute edits without our builder. Remove watermarks to look 100% professional.
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>ROI calculation:</strong> Save 5+ hours per month on resume/cover letter creation. At even a conservative $20/hour value for your time, that's $100/month in time savings for a $9 investment. <strong>11x ROI</strong>.
                                    </p>
                                </div>

                                <div className="border-l-4 border-yellow-600 pl-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                        Premium Plan ($19/month) - Complete Job Search Arsenal
                                    </h3>
                                    <p className="text-gray-700 mb-3">
                                        <strong>Best for:</strong> Executives, senior professionals, anyone targeting competitive roles, career coaches, people serious about maximizing interview success.
                                    </p>
                                    <p className="text-gray-700 mb-3">
                                        Premium is our all-inclusive plan with every feature we offer. You get 50+ premium templates (including executive, creative, and industry-specific formats), priority support with response times under 2 hours, LinkedIn profile optimization tools, resume analytics showing how recruiters view your resume, and interview preparation guides. Think of it as having a personal career advisor for <strong>less than $1 per day</strong>.
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Who uses Premium:</strong> 73% of Premium users land interviews within 2 weeks. Common among senior software engineers ($150K+ salaries), marketing directors, product managers, and anyone where the stakes are high enough that every advantage matters.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Pricing FAQs - Your Questions Answered
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Is the Free plan really free forever?</h3>
                                    <p className="text-gray-700">
                                        Yes, absolutely! The Free plan is not a trial - it's free forever with no expiration date. You can create, edit, and download resumes indefinitely without ever paying. We keep it free because we believe everyone deserves access to professional resume tools.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Can I downgrade from Pro/Premium back to Free?</h3>
                                    <p className="text-gray-700">
                                        Yes! You can downgrade anytime with one click. Your resumes and data are never deleted - you just lose access to premium features until you upgrade again. Everything you created stays saved.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer refunds?</h3>
                                    <p className="text-gray-700">
                                        We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied for any reason within 7 days of purchase, contact our support team for a full refund, no questions asked.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer student or nonprofit discounts?</h3>
                                    <p className="text-gray-700">
                                        Yes! Students with valid .edu email addresses get 50% off Pro and Premium plans. Nonprofit organizations with 501(c)(3) status also qualify for nonprofit pricing. Contact our support team to verify eligibility and receive your discount code.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final CTA */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">
                                Start Free, Upgrade When Ready
                            </h2>
                            <p className="text-xl mb-6 opacity-95">
                                Join 500,000+ professionals who trust Hirecta. No credit card required to start.
                            </p>
                            <p className="text-lg opacity-90">
                                <strong>Risk-Free Promise:</strong> 7-day money-back guarantee on all paid plans
                            </p>
                        </div>
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
