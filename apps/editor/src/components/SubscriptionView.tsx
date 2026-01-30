"use client";

import { useCallback, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTierDisplayName } from "@repo/utils-client";
import {
    Check,
    CreditCard,
    Building2,
    Smartphone,
    CheckCircle2,
    XCircle,
    Loader2,
    ArrowLeft,
    Shield,
    Lock,
    Sparkles
} from "lucide-react";
import { usePersistence } from "../app/hooks/usePersistence";
import { ENV } from "../app/env";
import { useAppNetwork, API_ENDPOINTS } from "../app/hooks/useAppNetwork";
import Image from "next/image";
import { Input } from "@repo/ui/input";
import { useEffect } from "react";

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


type PaymentMethod = 'card' | 'upi' | 'bank';
type BillingCycle = 'monthly' | 'annual';

interface SubscriptionViewProps {
    onBack?: () => void;
    hideBack?: boolean;
    onSuccess?: () => void;
}

export function SubscriptionView({ onBack, hideBack, onSuccess }: SubscriptionViewProps) {
    const { user, subscription, setSubscription } = usePersistence();
    const searchParams = useSearchParams();
    const router = useRouter();
    const API_BASE = ENV.API_URL;

    const [selectedTier, setSelectedTier] = useState<string>('pro');
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const network = useAppNetwork();

    const fetchPlans = useCallback(async () => {
        try {
            const data = await network.get<{ success: boolean, plans: Plan[] }>('/api/plans');
            if (data.success) {
                setPlans(data.plans);
                // Select first non-free plan by default if available
                const firstPremium = data.plans.find((p: Plan) => p.planId !== 'free');
                if (firstPremium) setSelectedTier(firstPremium.planId);
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoadingPlans(false);
        }
    }, [])

    useEffect(() => {
        fetchPlans();
    }, []);

    const currentPlanId = subscription?.plan || 'free';
    const selectedPlan = plans.find(t => t.planId === selectedTier);
    const isAnnual = billingCycle === 'annual';
    const price = selectedPlan ? (isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice) : 0;
    const savings = selectedPlan && isAnnual ? (selectedPlan.monthlyPrice * 12 - selectedPlan.annualPrice) : 0;

    // Helper to load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!selectedTier || selectedTier === 'free') return;

        setIsProcessing(true);

        try {
            // 1. Create Order on Backend
            const orderData = await network.post<{ amount: number, currency: string, orderId: string, key: string }>(API_ENDPOINTS.SUBSCRIPTION.CREATE_ORDER, {
                plan: selectedTier,
                billingCycle
            });

            // 2. Load Razorpay Script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Razorpay SDK failed to load. Are you online?");
                setIsProcessing(false);
                return;
            }

            // 3. Open Razorpay Checkout
            const options = {
                key: ENV.RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Hirecta",
                description: `Upgrade to ${selectedTier.toUpperCase()} (${billingCycle})`,
                image: "/logo.png",
                order_id: orderData.orderId,
                handler: async (response: any) => {
                    // 4. Verify Payment on Backend
                    setIsProcessing(true);
                    try {
                        const data = await network.post<{ subscription: any }>(API_ENDPOINTS.SUBSCRIPTION.VERIFY, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            plan: selectedTier,
                            billingCycle
                        });

                        setSubscription(data.subscription);
                        setShowSuccess(true);
                        setTimeout(() => {
                            setShowSuccess(false);
                            if (onSuccess) {
                                onSuccess();
                            } else {
                                const returnTo = searchParams.get('returnTo');
                                if (returnTo) {
                                    try {
                                        const decodedUrl = decodeURIComponent(returnTo);
                                        const safeUrl = decodedUrl.startsWith('/') ? decodedUrl : '/';
                                        router.push(`${safeUrl}${safeUrl.includes('?') ? '&' : '?'}fromSubscription=true`);
                                    } catch {
                                        router.push('/editor?fromSubscription=true');
                                    }
                                } else {
                                    setShowPaymentForm(false);
                                }
                            }
                        }, 2500);
                    } catch (err) {
                        console.error('Verification error:', err);
                        alert('Payment verification failed. Please contact support.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: "#4F46E5",
                },
                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment initialization failed:', error);
            alert('Failed to initiate payment. Please try again.');
            setIsProcessing(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-12 max-w-lg w-full text-center animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        Payment Successful!
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 font-medium">
                        Welcome to <span className="text-blue-600 font-black">{selectedPlan?.name}</span> plan.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-blue-600 font-bold bg-blue-50 py-4 rounded-xl border border-blue-100 uppercase tracking-widest text-sm">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Activating your account...
                    </div>
                </div>
            </div>
        );
    }

    if (showPaymentForm) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-stretch">
                <div className="w-full bg-white overflow-hidden flex">
                    <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
                        {/* Left Side - Payment Form */}
                        <div className="p-6 lg:p-12 xl:p-16 space-y-6 overflow-y-auto max-h-screen">
                            {/* Header with Logo */}
                            <div className="space-y-6">
                                <button
                                    onClick={() => setShowPaymentForm(false)}
                                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                                >
                                    <ArrowLeft size={20} />
                                    <span>Back</span>
                                </button>

                                <div className="space-y-3">
                                    <Image
                                        src="/logo.png"
                                        alt="Hirecta"
                                        width={140}
                                        height={40}
                                        className="h-10 w-auto object-contain"
                                    />
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Upgrade to {selectedPlan?.name}</h1>
                                    <p className="text-slate-500 font-medium">Get unlimited access to premium features</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setShowPaymentForm(false)}
                                    className="flex-1 py-4 rounded-xl font-black text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="flex-1 py-4 rounded-xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay ₹${price.toLocaleString('en-IN')}`
                                    )}
                                </button>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 space-y-3">
                                <div className="flex items-center gap-3 text-indigo-600 font-black uppercase tracking-widest text-xs">
                                    <Sparkles size={16} />
                                    <span>Razorpay Secure</span>
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    Safe & Secure payments powered by Razorpay. Supports Credit/Debit Cards, UPI (Google Pay, PhonePe), Net Banking, and Wallets.
                                </p>
                            </div>

                            {/* Security Note */}
                            <div className="flex items-start gap-3 text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <Lock size={16} className="mt-0.5 shrink-0" />
                                <p className="font-medium">
                                    Your payment information is encrypted and secure. We never store your card details.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Plan Summary */}
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 lg:p-12 xl:p-16 flex flex-col overflow-y-auto max-h-screen">
                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedPlan?.name} Plan</h3>

                                    {/* Billing Cycle Toggle */}
                                    <div className="bg-white rounded-xl p-2 flex gap-2 border border-slate-200">
                                        <button
                                            onClick={() => setBillingCycle('monthly')}
                                            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${!isAnnual
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            Pay Monthly
                                            <div className="text-xs mt-1 opacity-80">₹{selectedPlan?.monthlyPrice}/mo</div>
                                        </button>
                                        <button
                                            onClick={() => setBillingCycle('annual')}
                                            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all relative ${isAnnual
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {isAnnual && savings > 0 && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full whitespace-nowrap">
                                                    Save ₹{savings.toLocaleString('en-IN')}
                                                </div>
                                            )}
                                            Pay Annual
                                            <div className="text-xs mt-1 opacity-80">₹{Math.round((selectedPlan?.annualPrice || 0) / 12)}/mo</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="space-y-4">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-2xl font-black text-slate-900">Total</span>
                                        <span className="text-4xl font-black text-slate-900">
                                            ₹{price.toLocaleString('en-IN')}
                                            <span className="text-lg text-slate-500 font-bold">/{billingCycle === 'annual' ? 'year' : 'mo'}</span>
                                        </span>
                                    </div>

                                    {/* Security Badge */}
                                    <div className="flex items-start gap-2 text-xs text-slate-500 font-medium bg-white/50 p-4 rounded-xl border border-slate-200">
                                        <Shield size={16} className="mt-0.5 text-green-600 shrink-0" />
                                        <p>Guaranteed to be safe & secure, ensuring that all transactions are protected with the highest level of security.</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">What you'll get:</h4>
                                    <div className="space-y-3">
                                        {selectedPlan?.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                                <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check size={14} className="text-blue-600" />
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="mt-8 h-48 relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-24 h-24 text-blue-600/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Plan Selection View
    return (
        <div className="w-full h-full bg-white flex flex-col items-center py-12 lg:py-20 overflow-y-auto">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="Hirecta"
                            width={160}
                            height={45}
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {!hideBack && onBack && (
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span>Back to Dashboard</span>
                        </button>
                    )}
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">Simple, transparent pricing</h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Choose the perfect plan for your career journey. No hidden fees.
                        </p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {loadingPlans ? (
                        <div className="col-span-3 flex justify-center py-12">
                            <Loader2 className="animate-spin text-blue-600" size={48} />
                        </div>
                    ) : plans.length === 0 ? (
                        <div className="col-span-3 text-center py-12 text-slate-500 font-medium">
                            No subscription plans available at the moment.
                        </div>
                    ) : plans.map((tier) => (
                        <div
                            key={tier.planId}
                            className={`group relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${tier.popular
                                ? 'border-blue-600 bg-blue-600 text-white shadow-xl'
                                : 'border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:shadow-lg'
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <h3 className={`text-xl font-bold ${tier.popular ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-4xl font-bold ${tier.popular ? 'text-white' : 'text-slate-900'}`}>
                                            {tier.planId === 'free' ? '₹0' : `₹${tier.monthlyPrice}`}
                                        </span>
                                        {tier.planId !== 'free' && (
                                            <span className={`text-sm font-medium ${tier.popular ? 'text-blue-100' : 'text-slate-500'}`}>/month</span>
                                        )}
                                    </div>
                                    <p className={`text-sm font-medium leading-relaxed ${tier.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {tier.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <Check size={16} className={`shrink-0 mt-0.5 ${tier.popular ? 'text-white' : 'text-blue-600'}`} />
                                            <span className={`text-sm font-medium ${tier.popular ? 'text-blue-50' : 'text-slate-600'}`}>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-dashed border-opacity-20" style={{ borderColor: tier.popular ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                                <button
                                    onClick={() => {
                                        if (tier.planId !== 'free') {
                                            setSelectedTier(tier.planId);
                                            setShowPaymentForm(true);
                                        }
                                    }}
                                    disabled={currentPlanId === tier.planId || tier.planId === 'free'}
                                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${tier.popular
                                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                                        : tier.planId === 'free' || currentPlanId === tier.planId
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {currentPlanId === tier.planId
                                        ? 'Current Plan'
                                        : tier.planId === 'free'
                                            ? 'Get Started'
                                            : `Get ${tier.name}`}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secure Badge */}
                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest opacity-60">
                    <Lock size={12} />
                    <span>Secure Payment · Cancel Anytime</span>
                </div>
            </div>
        </div>
    );
}
