"use client";

import { X, Check, Sparkles } from "lucide-react";
import { useState } from "react";

export type SubscriptionTier = 'free' | 'pro' | 'premium';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubscribe: (tier: SubscriptionTier) => void;
}

interface PricingTier {
    id: SubscriptionTier;
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    popular?: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for getting started',
        features: [
            'Create and edit resume',
            'Real-time preview',
            'Basic templates',
            'Auto-save functionality',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 9,
        period: 'month',
        description: 'Best for job seekers',
        popular: true,
        highlighted: true,
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
        id: 'premium',
        name: 'Premium',
        price: 19,
        period: 'month',
        description: 'For professionals',
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

export const PricingModal = ({ isOpen, onClose, onSubscribe }: PricingModalProps) => {
    const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);

    if (!isOpen) return null;

    const handleSubscribe = (tier: SubscriptionTier) => {
        setSelectedTier(tier);
        setTimeout(() => {
            onSubscribe(tier);
            setSelectedTier(null);
        }, 300);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl animate-slideUp max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={20} className="text-gray-600" />
                </button>

                {/* Header */}
                <div className="text-center pt-12 pb-8 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                        <Sparkles size={16} />
                        Unlock Premium Features
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upgrade to download your professional resume and access premium features
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 p-8 bg-white">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={tier.id}
                            className={`relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${tier.highlighted
                                ? 'border-blue-500 shadow-lg scale-105 bg-gradient-to-br from-blue-50 to-purple-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-md">
                                    Most Popular
                                </div>
                            )}

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
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${tier.highlighted ? 'bg-blue-500' : 'bg-green-500'
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
                                onClick={() => handleSubscribe(tier.id)}
                                disabled={selectedTier === tier.id}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${tier.highlighted
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {selectedTier === tier.id ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : tier.id === 'free' ? (
                                    'Continue with Free'
                                ) : (
                                    'Get Started'
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-8 pb-8 text-center">
                    <p className="text-sm text-gray-500">
                        All plans include a 30-day money-back guarantee. Cancel anytime.
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}} />
        </div>
    );
};
