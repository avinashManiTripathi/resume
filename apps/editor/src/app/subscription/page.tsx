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
import { Check, Sparkles, Shield, Zap, Crown, ArrowLeft, CreditCard, Wallet } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const pricingTiers = [
    {
        id: 'free' as SubscriptionTier,
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for getting started',
        features: ['1 Resume', '3 Basic Templates', 'Auto-save', 'Real-time Preview'],
    },
    {
        id: 'pro' as SubscriptionTier,
        name: 'Pro',
        price: 9,
        period: 'month',
        description: 'Best for job seekers',
        popular: true,
        features: ['Unlimited Resumes', '10+ Premium Templates', 'PDF Downloads', 'Word Export', 'Email Support'],
    },
    {
        id: 'premium' as SubscriptionTier,
        name: 'Premium',
        price: 19,
        period: 'month',
        description: 'For professionals',
        features: ['Everything in Pro', 'All Templates', 'Priority Support', 'AI Features', 'Analytics', 'Cover Letters'],
    },
];

export default function SubscriptionPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo');
    const existingSubscription = getSubscription();

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDashboard, setShowDashboard] = useState(!!existingSubscription);

    const steps = [
        { number: 1, title: 'Select Plan', completed: currentStep > 1 },
        { number: 2, title: 'Payment Method', completed: currentStep > 2 },
        { number: 3, title: 'Confirmation', completed: false },
    ];

    const handleTierSelect = (tier: SubscriptionTier) => {
        setSelectedTier(tier);
        if (tier === 'free') {
            setSubscription('free');
            const redirectPath = returnTo ? `/${returnTo}?fromSubscription=true` : '/editor?fromSubscription=true';
            router.push(redirectPath);
        } else {
            setCurrentStep(2);
        }
    };

    const handlePaymentSubmit = async (data: any) => {
        setIsProcessing(true);
        setCurrentStep(3);
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (selectedTier) {
            setSubscription(selectedTier, selectedTier === 'free' ? undefined : 1);
        }

        setIsProcessing(false);
        setShowSuccess(true);

        setTimeout(() => {
            const redirectPath = returnTo ? `/${returnTo}?fromSubscription=true` : '/editor?fromSubscription=true';
            router.push(redirectPath);
        }, 2000);
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg w-full text-center border border-gray-200">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 text-lg mb-2">
                        Welcome to <span className="font-bold text-blue-600">{selectedTier && getTierDisplayName(selectedTier)}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2 mt-4">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                        Redirecting...
                    </p>
                </div>
            </div>
        );
    }

    if (showDashboard) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => router.push('/editor')}
                        className="group mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Editor
                    </button>

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Subscription Management
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage your subscription and billing details
                        </p>
                    </div>

                    <SubscriptionDashboard onUpgrade={() => setShowDashboard(false)} />
                </div>
            </div>
        );
    }

    const selectedTierData = pricingTiers.find(t => t.id === selectedTier);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Stepper */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <button
                        onClick={() => {
                            if (currentStep > 1) {
                                setCurrentStep((currentStep - 1) as 1 | 2 | 3);
                            } else {
                                const redirectPath = returnTo ? `/${returnTo}` : '/editor';
                                router.push(redirectPath);
                            }
                        }}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    {/* Stepper */}
                    <div className="flex items-center justify-center">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step.completed
                                        ? 'bg-blue-600 text-white'
                                        : currentStep === step.number
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {step.completed ? <Check className="w-5 h-5" /> : step.number}
                                    </div>
                                    <span className={`text-sm mt-2 font-medium ${currentStep === step.number ? 'text-blue-600' : 'text-gray-500'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-24 h-0.5 mx-4 mb-6 ${step.completed ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Step 1: Select Plan */}
                {currentStep === 1 && (
                    <div>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Choose Your Plan
                            </h1>
                            <p className="text-xl text-gray-600">
                                Select the perfect plan for your needs
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {pricingTiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className={`bg-white rounded-2xl p-8 border-2 transition-all cursor-pointer hover:shadow-xl ${tier.popular
                                        ? 'border-blue-600 shadow-lg relative'
                                        : 'border-gray-200 hover:border-blue-300'
                                        } ${selectedTier === tier.id ? 'ring-4 ring-blue-200' : ''}`}
                                    onClick={() => handleTierSelect(tier.id)}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                                        <div className="mb-4">
                                            <span className="text-5xl font-bold text-gray-900">${tier.price}</span>
                                            <span className="text-gray-600">/{tier.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-3 rounded-lg font-semibold transition-all ${tier.popular
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tier.id === 'free' ? 'Start Free' : 'Select Plan'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Payment Method */}
                {currentStep === 2 && selectedTierData && (
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Side - Payment Method Selection */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Select Payment Method
                                </h2>

                                <div className="space-y-3 mb-8">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${paymentMethod === 'card'
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                            <span className="font-medium text-gray-900">Credit / Debit Card</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                                            }`}>
                                            {paymentMethod === 'card' && (
                                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                            )}
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${paymentMethod === 'paypal'
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Wallet className="w-5 h-5 text-blue-600" />
                                            <span className="font-medium text-gray-900">PayPal</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-blue-600' : 'border-gray-300'
                                            }`}>
                                            {paymentMethod === 'paypal' && (
                                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                            )}
                                        </div>
                                    </button>
                                </div>

                                {/* Summary Box */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{selectedTierData.name} Plan</span>
                                            <span className="font-medium text-gray-900">${selectedTierData.price}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-blue-600">${selectedTierData.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="flex items-start gap-3">
                                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-blue-900">
                                                <p className="font-semibold mb-1">Secure Payment</p>
                                                <p className="text-blue-700">Your payment information is encrypted and secure</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Payment Form */}
                            <div className="bg-white rounded-xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Payment Details
                                </h2>

                                <BillingForm
                                    paymentMethod={paymentMethod}
                                    onSubmit={handlePaymentSubmit}
                                    isProcessing={isProcessing}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Processing */}
                {currentStep === 3 && (
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-white rounded-2xl p-12 border border-gray-200">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Processing Payment...
                            </h2>
                            <p className="text-gray-600">
                                Please wait while we process your payment
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
