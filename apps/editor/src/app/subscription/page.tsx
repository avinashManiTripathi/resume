"use client";

import { useState } from "react";
import { PaymentMethodSelector, type PaymentMethod } from "@repo/ui/payment-method-selector";
import { BillingForm } from "@repo/ui/billing-form";
import { SubscriptionDashboard } from "@repo/ui/subscription-dashboard";
import {
    setSubscription,
    getSubscription,
    getTierDisplayName,
    type SubscriptionTier
} from "@repo/utils-client";
import { Check, Sparkles, Shield, Zap, Crown } from "lucide-react";
import { useRouter } from "next/navigation";

const pricingTiers = [
    {
        id: 'free' as SubscriptionTier,
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for getting started',
        icon: <Sparkles size={32} />,
        features: [
            'Create and edit resume',
            'Real-time preview',
            'Basic templates',
            'Auto-save functionality',
        ],
    },
    {
        id: 'pro' as SubscriptionTier,
        name: 'Pro',
        price: 9,
        period: 'month',
        description: 'Best for job seekers',
        icon: <Zap size={32} />,
        popular: true,
        features: [
            'Everything in Free',
            'Unlimited PDF downloads',
            'Access to 5+ premium templates',
            'Export to Word format',
            'Basic customer support',
            'Remove watermarks',
        ],
    },
    {
        id: 'premium' as SubscriptionTier,
        name: 'Premium',
        price: 19,
        period: 'month',
        description: 'For professionals',
        icon: <Crown size={32} />,
        features: [
            'Everything in Pro',
            'Unlimited premium templates',
            'Priority customer support',
            'Custom branding options',
            'Advanced formatting tools',
            'Resume analytics',
            'Cover letter builder',
        ],
    },
];

export default function SubscriptionPage() {
    const router = useRouter();
    const existingSubscription = getSubscription();

    const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDashboard, setShowDashboard] = useState(!!existingSubscription);

    const handleTierSelect = (tier: SubscriptionTier) => {
        setSelectedTier(tier);
        // Scroll to payment section
        setTimeout(() => {
            document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handlePaymentSubmit = async (data: any) => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save subscription
        if (selectedTier) {
            setSubscription(selectedTier, selectedTier === 'free' ? undefined : 1);
        }

        setIsProcessing(false);
        setShowSuccess(true);

        // Redirect to editor after success
        setTimeout(() => {
            router.push('/editor?fromSubscription=true');
        }, 3000);
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center animate-slideUp">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={48} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
                    <p className="text-gray-600 mb-2">
                        Welcome to {selectedTier && getTierDisplayName(selectedTier)} plan
                    </p>
                    <p className="text-sm text-gray-500">
                        Redirecting to editor...
                    </p>
                </div>
            </div>
        );
    }

    if (showDashboard) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.push('/editor')}
                            className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2"
                        >
                            ← Back to Editor
                        </button>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Subscription Management
                        </h1>
                        <p className="text-gray-600">
                            Manage your subscription and billing details
                        </p>
                    </div>

                    {/* Dashboard */}
                    <SubscriptionDashboard onUpgrade={() => setShowDashboard(false)} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        Simple, Transparent Pricing
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Choose Your Perfect Plan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Unlock premium features and take your resume to the next level
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={tier.id}
                            className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${tier.popular
                                ? 'border-blue-500 shadow-xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                                } ${selectedTier === tier.id ? 'ring-4 ring-blue-300' : ''}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-md">
                                    Most Popular
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`mb-4 ${tier.popular ? 'text-blue-600' : 'text-gray-600'}`}>
                                {tier.icon}
                            </div>

                            {/* Tier Name */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {tier.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-4">
                                <span className="text-5xl font-extrabold text-gray-900">
                                    ${tier.price}
                                </span>
                                <span className="text-gray-600 ml-2">
                                    /{tier.period}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-6">
                                {tier.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${tier.popular ? 'bg-blue-500' : 'bg-green-500'
                                            }`}>
                                            <Check size={14} className="text-white" />
                                        </div>
                                        <span className="text-gray-700 text-sm leading-tight">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                onClick={() => handleTierSelect(tier.id)}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${tier.popular
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                    } ${selectedTier === tier.id ? 'ring-4 ring-blue-300' : ''}`}
                            >
                                {selectedTier === tier.id ? 'Selected' : tier.id === 'free' ? 'Continue with Free' : 'Get Started'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Payment Section */}
                {selectedTier && selectedTier !== 'free' && (
                    <div id="payment-section" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-slideUp">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Complete Your Purchase
                            </h2>
                            <p className="text-gray-600">
                                You've selected the <span className="font-semibold text-blue-600">{getTierDisplayName(selectedTier)}</span> plan
                            </p>
                        </div>

                        {/* Payment Method Selector */}
                        <div className="mb-8">
                            <PaymentMethodSelector
                                selected={paymentMethod}
                                onSelect={setPaymentMethod}
                            />
                        </div>

                        {/* Billing Form */}
                        <BillingForm
                            paymentMethod={paymentMethod}
                            onSubmit={handlePaymentSubmit}
                            isProcessing={isProcessing}
                        />
                    </div>
                )}

                {/* Free Tier Confirmation */}
                {selectedTier === 'free' && (
                    <div id="payment-section" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center animate-slideUp">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            You're All Set!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Start creating your professional resume with our free plan
                        </p>
                        <button
                            onClick={() => {
                                setSubscription('free');
                                router.push('/editor?fromSubscription=true');
                            }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Go to Editor
                        </button>
                    </div>
                )}

                {/* Trust Badges */}
                <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Shield size={20} className="text-green-600" />
                        <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check size={20} className="text-green-600" />
                        <span>30-Day Money Back</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles size={20} className="text-green-600" />
                        <span>Cancel Anytime</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
        </div>
    );
}
