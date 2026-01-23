"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTierDisplayName, type SubscriptionTier } from "@repo/utils-client";
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
import Image from "next/image";

const pricingTiers = [
    {
        id: 'free' as SubscriptionTier,
        name: 'Free',
        price: 0,
        annualPrice: 0,
        period: 'forever',
        description: 'Perfect for getting started',
        features: ['1 Resume', '3 Basic Templates', 'Auto-save', 'Real-time Preview'],
    },
    {
        id: 'pro' as SubscriptionTier,
        name: 'Pro',
        price: 499,
        annualPrice: 4990,
        period: 'month',
        description: 'Best for job seekers',
        popular: true,
        features: ['Unlimited Resumes', '10+ Premium Templates', 'PDF Downloads', 'Word Export', 'Email Support'],
    },
    {
        id: 'premium' as SubscriptionTier,
        name: 'Premium',
        price: 999,
        annualPrice: 9990,
        period: 'month',
        description: 'For professionals',
        features: ['Everything in Pro', 'All Templates', 'Priority Support', 'AI Features', 'Analytics', 'Cover Letters'],
    },
];

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

    const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('pro');
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // Form states
    const [billingName, setBillingName] = useState(user?.name || '');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    const currentPlanId = subscription?.plan || 'free';
    const selectedPlan = pricingTiers.find(t => t.id === selectedTier);
    const isAnnual = billingCycle === 'annual';
    const price = selectedPlan ? (isAnnual ? selectedPlan.annualPrice : selectedPlan.price) : 0;
    const savings = selectedPlan && isAnnual ? (selectedPlan.price * 12 - selectedPlan.annualPrice) : 0;

    useEffect(() => {
        if (currentPlanId !== 'free') {
            setShowPaymentForm(false);
        }
    }, [currentPlanId]);

    const handlePayment = async () => {
        if (!selectedTier || selectedTier === 'free') return;

        // Validate based on payment method
        if (paymentMethod === 'card') {
            if (cardNumber.replace(/\s/g, '').length < 16) {
                alert('Please enter a valid card number');
                return;
            }
            if (!expiry || !cvv) {
                alert('Please fill in all card details');
                return;
            }
        } else if (paymentMethod === 'upi') {
            if (!upiId || !upiId.includes('@')) {
                alert('Please enter a valid UPI ID (e.g., name@upi)');
                return;
            }
        } else if (paymentMethod === 'bank') {
            if (!accountNumber || !ifscCode) {
                alert('Please fill in all bank details');
                return;
            }
        }

        setIsProcessing(true);

        try {
            const res = await fetch(`${API_BASE}/api/subscription/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    tier: selectedTier,
                    billingCycle,
                    paymentMethod,
                    paymentId: `${paymentMethod}_${Date.now()}`,
                    amount: price
                })
            });

            if (res.ok) {
                const data = await res.json();
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
            }
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-200">
                        <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        Payment Successful!
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 font-medium">
                        Welcome to <span className="text-blue-600 font-black">{selectedPlan?.name}</span> plan.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-blue-600 font-bold bg-blue-50 py-4 rounded-2xl border border-blue-100 uppercase tracking-widest text-sm">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Activating your account...
                    </div>
                </div>
            </div>
        );
    }

    if (showPaymentForm) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-12 flex items-center justify-center">
                <div className="max-w-7xl w-full bg-white rounded-[48px] shadow-2xl border border-slate-200 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Left Side - Payment Form */}
                        <div className="p-8 lg:p-12 space-y-8">
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

                            {/* Billing Information */}
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Billed To</label>
                                <input
                                    type="text"
                                    value={billingName}
                                    onChange={(e) => setBillingName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                />
                            </div>

                            {/* Payment Method Selection */}
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Payment Method</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm flex flex-col items-center gap-2 ${paymentMethod === 'card'
                                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        <CreditCard size={24} />
                                        <span>Card</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm flex flex-col items-center gap-2 ${paymentMethod === 'upi'
                                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        <Smartphone size={24} />
                                        <span>UPI</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('bank')}
                                        className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm flex flex-col items-center gap-2 ${paymentMethod === 'bank'
                                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        <Building2 size={24} />
                                        <span>Bank</span>
                                    </button>
                                </div>
                            </div>

                            {/* Payment Details */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                            <CreditCard size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            value={cardNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                                                setCardNumber(formatted);
                                            }}
                                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            value={expiry}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                if (val.length >= 2) val = val.slice(0, 2) + ' / ' + val.slice(2);
                                                setExpiry(val);
                                            }}
                                            className="bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                            className="bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Smartphone size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="UPI ID (e.g., yourname@upi)"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-600 font-medium">
                                        <p>Supported: Google Pay, PhonePe, Paytm, BHIM UPI</p>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'bank' && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Account Number"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="IFSC Code"
                                        value={ifscCode}
                                        onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setShowPaymentForm(false)}
                                    className="flex-1 py-4 rounded-2xl font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="flex-1 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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

                            {/* Security Note */}
                            <div className="flex items-start gap-3 text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <Lock size={16} className="mt-0.5 shrink-0" />
                                <p className="font-medium">
                                    Your payment information is encrypted and secure. We never store your card details.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Plan Summary */}
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 lg:p-12 flex flex-col">
                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-slate-900">{selectedPlan?.name} Plan</h3>

                                    {/* Billing Cycle Toggle */}
                                    <div className="bg-white rounded-2xl p-2 flex gap-2 border border-slate-200">
                                        <button
                                            onClick={() => setBillingCycle('monthly')}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${!isAnnual
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            Pay Monthly
                                            <div className="text-xs mt-1 opacity-80">₹{selectedPlan?.price}/mo</div>
                                        </button>
                                        <button
                                            onClick={() => setBillingCycle('annual')}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all relative ${isAnnual
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
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
                                    <div className="flex items-start gap-2 text-xs text-slate-500 font-medium bg-white/50 p-4 rounded-2xl border border-slate-200">
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
                            <div className="mt-8 h-48 relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    {!hideBack && onBack && (
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors mb-6"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Dashboard</span>
                        </button>
                    )}
                    <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">Choose Your Plan</h1>
                    <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                        Unlock premium features and take your career to the next level
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative bg-white rounded-[40px] p-8 lg:p-10 transition-all duration-300 flex flex-col border-2 ${tier.popular
                                ? 'border-blue-600 shadow-2xl shadow-blue-100 scale-105'
                                : tier.id === 'free'
                                    ? 'border-slate-200 shadow-sm'
                                    : 'border-slate-200 shadow-lg hover:shadow-xl hover:scale-105'
                                } ${currentPlanId === tier.id ? 'ring-4 ring-green-500 ring-opacity-50' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            {currentPlanId === tier.id && (
                                <div className="absolute -top-5 right-8 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                                    <CheckCircle2 size={14} />
                                    Current Plan
                                </div>
                            )}

                            <div className="flex-1 space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-2">{tier.name}</h3>
                                    <p className="text-slate-500 font-medium">{tier.description}</p>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-900">
                                        {tier.id === 'free' ? '₹0' : `₹${tier.price}`}
                                    </span>
                                    {tier.id !== 'free' && (
                                        <span className="text-slate-500 font-bold">/month</span>
                                    )}
                                </div>

                                <div className="space-y-4 py-6">
                                    {tier.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={14} className="text-blue-600" />
                                            </div>
                                            <span className="text-slate-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (tier.id !== 'free') {
                                        setSelectedTier(tier.id);
                                        setShowPaymentForm(true);
                                    }
                                }}
                                disabled={currentPlanId === tier.id || tier.id === 'free'}
                                className={`w-full py-4 rounded-2xl font-black transition-all shadow-lg ${currentPlanId === tier.id || tier.id === 'free'
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : tier.popular
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-blue-200'
                                        : 'bg-slate-900 text-white hover:bg-black shadow-slate-300'
                                    }`}
                            >
                                {currentPlanId === tier.id
                                    ? 'Current Plan'
                                    : tier.id === 'free'
                                        ? 'Free Forever'
                                        : `Get ${tier.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
