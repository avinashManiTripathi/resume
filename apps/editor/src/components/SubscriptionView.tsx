"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    getTierDisplayName,
    type SubscriptionTier
} from "@repo/utils-client";
import {
    Check,
    Sparkles,
    Shield,
    Zap,
    Crown,
    CreditCard,
    User as UserIcon,
    Calendar,
    Mail,
    CheckCircle2,
    XCircle,
    Info,
    Rocket,
    ChevronRight,
    Loader2
} from "lucide-react";
import { usePersistence } from "../app/hooks/usePersistence";
import { ENV } from "../app/env";

const pricingTiers = [
    {
        id: 'free' as SubscriptionTier,
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for getting started',
        features: ['1 Resume', '3 Basic Templates', 'Auto-save', 'Real-time Preview'],
        color: 'slate'
    },
    {
        id: 'pro' as SubscriptionTier,
        name: 'Pro',
        price: 9,
        period: 'month',
        description: 'Best for job seekers',
        popular: true,
        features: ['Unlimited Resumes', '10+ Premium Templates', 'PDF Downloads', 'Word Export', 'Email Support'],
        color: 'blue'
    },
    {
        id: 'premium' as SubscriptionTier,
        name: 'Premium',
        price: 19,
        period: 'month',
        description: 'For professionals',
        features: ['Everything in Pro', 'All Templates', 'Priority Support', 'AI Features', 'Analytics', 'Cover Letters'],
        color: 'indigo'
    },
];

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

    const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [view, setView] = useState<'plans' | 'dashboard'>('dashboard');
    const [showMockForm, setShowMockForm] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

    const handleMockPayment = async () => {
        if (!selectedTier) return;
        if (cardDetails.number.replace(/\s/g, '').length < 16) {
            alert('Please enter a valid 16-digit card number (e.g., 4242...)');
            return;
        }
        setIsProcessing(true);

        try {
            const res = await fetch(`${API_BASE}/api/subscription/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    tier: selectedTier,
                    paymentMethod: 'manual_mock',
                    paymentId: `mock_${Date.now()}`
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSubscription(data.subscription);
                setShowSuccess(true);
                setShowMockForm(false);
                setTimeout(() => {
                    setShowSuccess(false);
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        const returnTo = searchParams.get('returnTo');
                        if (returnTo === 'editor') {
                            router.push('/editor?fromSubscription=true');
                        } else {
                            setView('dashboard');
                        }
                    }
                }, 2500);
            }
        } catch (error) {
            console.error('Failed to save subscription:', error);
            alert('Failed to update subscription. Please contact support.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleTierSelect = (tier: SubscriptionTier) => {
        if (tier === 'free') return;
        setSelectedTier(tier);
        setShowMockForm(true);
    };

    const handleCancelSubscription = async () => {
        if (!confirm('Are you sure you want to cancel your subscription? This will take effect at the end of your billing period.')) return;

        try {
            const res = await fetch(`${API_BASE}/api/subscription/cancel`, {
                method: 'POST',
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setSubscription(data.subscription);
                alert('Your subscription has been set to cancel at the end of the period.');
            }
        } catch (error) {
            console.error('Failed to cancel subscription:', error);
        }
    };

    if (showSuccess) {
        return (
            <div className="h-full bg-white flex items-center justify-center p-4">
                <div className="bg-white border border-slate-100 rounded-[40px] p-12 max-w-lg w-full text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-emerald-50">
                        <CheckCircle2 size={48} className="text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        Subscription Activated!
                    </h2>
                    <p className="text-slate-500 text-lg mb-8 font-medium">
                        Welcome to the <span className="text-blue-600 font-black">{selectedTier && getTierDisplayName(selectedTier)}</span> tier.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-blue-600 font-bold bg-blue-50 py-4 rounded-2xl border border-blue-100 uppercase tracking-widest text-sm">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Updating account...
                    </div>
                </div>
            </div>
        );
    }

    const currentPlanId = subscription?.plan || 'free';
    const currentPlan = pricingTiers.find(t => t.id === currentPlanId);

    return (
        <div className="h-full bg-slate-50/50 text-slate-900 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Subscription</h1>
                        <p className="text-slate-500 font-medium">Manage your professional workspace</p>
                    </div>

                    <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-md">
                        <button
                            onClick={() => setView('dashboard')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'dashboard' ? 'bg-white text-blue-600 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setView('plans')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'plans' ? 'bg-white text-blue-600 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            Plans
                        </button>
                    </div>
                </div>

                {view === 'dashboard' ? (
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Account Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white border border-slate-100 rounded-[40px] p-8 lg:p-12 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-[80px] -mr-32 -mt-32 rounded-full transition-all duration-700 group-hover:scale-110" />

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-blue-600 to-indigo-700 p-1 flex items-center justify-center shadow-xl shadow-blue-100 ring-4 ring-white">
                                            {user?.picture ? (
                                                <img src={user.picture} alt={user.name} className="w-full h-full object-cover rounded-[24px]" />
                                            ) : (
                                                <UserIcon size={32} className="text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{user?.name}</h2>
                                            <div className="flex items-center gap-3 text-slate-500 bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-100 w-fit font-bold text-xs">
                                                <Mail size={14} />
                                                <span>{user?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-center min-w-[120px]">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Status</span>
                                        <span className={`text-xs font-black uppercase tracking-widest ${subscription?.status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            {subscription?.status === 'active' ? 'Verified' : 'Limited'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                    <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-7 group/card">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Membership</p>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                                <Crown size={24} />
                                            </div>
                                            <p className="text-xl font-black text-slate-900 capitalize tracking-tight">{currentPlan?.name}</p>
                                        </div>
                                        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl w-fit border border-blue-100">
                                            Current Tier
                                        </div>
                                    </div>

                                    <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-7 group/card">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Billing Period</p>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                                <Calendar size={24} />
                                            </div>
                                            <p className="text-xl font-black text-slate-900 tracking-tight">
                                                {subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Lifetime'}
                                            </p>
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold flex items-center gap-2">
                                            <Info size={14} className="text-slate-300" />
                                            Renews automatically (Mock)
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upgrade Banner */}
                            {currentPlanId === 'free' && (
                                <div className="bg-slate-900 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer group shadow-xl shadow-slate-200" onClick={() => setView('plans')}>
                                    <div className="flex items-center gap-6 text-white text-left">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            <Rocket size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black tracking-tight">Unlock Premium Features</h3>
                                            <p className="text-slate-400 font-medium text-sm">Get unlimited downloads and AI assistance.</p>
                                        </div>
                                    </div>
                                    <button className="bg-white text-slate-900 px-6 py-3.5 rounded-2xl font-black transition-colors hover:bg-slate-100 flex items-center gap-2 whitespace-nowrap">
                                        Level Up
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}

                            {currentPlanId !== 'free' && (
                                <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-between">
                                    <div>
                                        <h4 className="font-black text-slate-900">Manage Billing</h4>
                                        <p className="text-sm text-slate-500 font-medium">Update your preferences or cancel access.</p>
                                    </div>
                                    <button
                                        onClick={handleCancelSubscription}
                                        className="text-red-500 font-bold text-xs bg-red-50 hover:bg-red-100 px-6 py-3 rounded-2xl transition-colors"
                                    >
                                        Cancel Tier
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Benefits Panel */}
                        <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Active Benefits</h3>
                            <div className="space-y-6">
                                {(currentPlan?.features || pricingTiers[0].features).map((feature, i) => (
                                    <div key={i} className="flex items-start gap-4 font-bold text-sm text-slate-600">
                                        <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5 border border-blue-100 shrink-0">
                                            <Check size={14} />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Elevate Your Presence</h2>
                            <p className="text-slate-500 font-medium max-w-xl mx-auto">
                                Join thousands of professionals using our premium tools to land their dream roles.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {pricingTiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className={`relative group bg-white border-2 rounded-[48px] p-10 transition-all duration-300 flex flex-col h-full ${tier.popular ? "border-blue-600 shadow-2xl shadow-blue-100 scale-[1.03]" : "border-slate-100 hover:border-slate-200"
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200">
                                            Top Recommended
                                        </div>
                                    )}

                                    <div className="mb-10 text-left">
                                        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{tier.name}</h3>
                                        <div className="flex items-baseline gap-1 mt-6">
                                            <span className="text-4xl font-black text-slate-900 tracking-tighter">${tier.price}</span>
                                            <span className="text-slate-400 font-bold text-sm">/{tier.period}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-5 mb-10 flex-grow">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4 font-bold text-sm text-slate-600 text-left">
                                                <div className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mt-0.5 border border-slate-100 shrink-0">
                                                    <Check size={12} />
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleTierSelect(tier.id)}
                                        disabled={currentPlanId === tier.id}
                                        className={`w-full py-4.5 rounded-[28px] font-black transition-all ${currentPlanId === tier.id
                                            ? "bg-slate-50 text-slate-400 cursor-not-allowed uppercase text-[10px] tracking-widest"
                                            : tier.popular
                                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200"
                                                : "bg-slate-900 text-white hover:bg-black"
                                            }`}
                                    >
                                        {currentPlanId === tier.id ? "Current Plan" : `Start with ${tier.name}`}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mock Payment Form Modal */}
            {showMockForm && selectedTier && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white rounded-[48px] p-10 md:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-700" />

                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Simulate Payment</h2>
                                <p className="text-slate-500 font-medium text-sm mt-2">Enter credentials to unlock {getTierDisplayName(selectedTier)}</p>
                            </div>
                            <button onClick={() => setShowMockForm(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Card Information (Mock)</label>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <CreditCard size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            value={cardDetails.number}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                                                setCardDetails({ ...cardDetails, number: formatted });
                                            }}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4.5 pl-14 pr-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="12 / 28"
                                            value={cardDetails.expiry}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                                                setCardDetails({ ...cardDetails, expiry: val });
                                            }}
                                            className="bg-slate-50 border-2 border-slate-100 rounded-2xl py-4.5 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="424"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                            className="bg-slate-50 border-2 border-slate-100 rounded-2xl py-4.5 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleMockPayment}
                                disabled={isProcessing}
                                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-base shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} className="fill-white" />}
                                {isProcessing ? 'Verifying...' : 'Unlock Membership Now'}
                            </button>

                            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                Use any future date and 4242 pattern. No real charges.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
