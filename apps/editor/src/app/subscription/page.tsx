"use client";

import { Suspense, useState, useEffect } from "react";
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
    ArrowLeft,
    CreditCard,
    User as UserIcon,
    Calendar,
    Mail,
    CheckCircle2,
    XCircle,
    Info,
    Rocket,
    Gift,
    ChevronRight,
    Loader2
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePersistence } from "../hooks/usePersistence";
import { ENV } from "../env";

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

function SubscriptionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo');
    const { isLoggedIn, user, subscription, setSubscription } = usePersistence();
    const API_BASE = ENV.API_URL;

    const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [view, setView] = useState<'plans' | 'dashboard'>('dashboard');
    const [showMockForm, setShowMockForm] = useState(false);

    useEffect(() => {
        if (isLoggedIn === false) {
            const isProd = window.location.hostname.endsWith('hirecta.com');
            const authUrl = isProd ? 'https://auth.hirecta.com' : 'http://localhost:3001';
            window.location.href = `${authUrl}/signin?returnTo=${encodeURIComponent(window.location.href)}`;
        }
    }, [isLoggedIn]);

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
                    paymentId: `mock_${Date.now()}`,
                    // We don't actually save the card details on the backend for this mock
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSubscription(data.subscription);
                setShowSuccess(true);
                setShowMockForm(false);
                setTimeout(() => {
                    const redirectPath = returnTo ? `/${returnTo}` : '/editor';
                    router.push(redirectPath);
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
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="bg-white border border-slate-100 rounded-[40px] p-12 max-w-lg w-full text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-emerald-50">
                        <CheckCircle2 size={48} className="text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        Subscription Activated!
                    </h2>
                    <p className="text-slate-500 text-lg mb-8 font-medium">
                        Welcome to the <span className="text-blue-600 font-black">{selectedTier && getTierDisplayName(selectedTier)}</span> tier. Your professional tools are now unlocked.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-blue-600 font-bold bg-blue-50 py-4 rounded-2xl border border-blue-100 uppercase tracking-widest text-sm">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Redirecting to workspace...
                    </div>
                </div>
            </div>
        );
    }

    const currentPlanId = subscription?.plan || 'free';
    const currentPlan = pricingTiers.find(t => t.id === currentPlanId);

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Header Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-[400px] bg-white border-b border-slate-100 -z-10" />

            <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
                {/* Top Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.push(returnTo ? `/${returnTo}` : '/editor')}
                            className="bg-white border border-slate-200 p-4 rounded-2xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Subscription</h1>
                            <p className="text-slate-500 font-medium">Manage your professional workspace</p>
                        </div>
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
                            All Plans
                        </button>
                    </div>
                </div>

                {view === 'dashboard' ? (
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Account Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white border border-slate-100 rounded-[40px] p-8 lg:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-[80px] -mr-32 -mt-32 rounded-full transition-all duration-700 group-hover:scale-110" />

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 p-1 flex items-center justify-center shadow-2xl shadow-blue-200 ring-4 ring-white">
                                            {user?.picture ? (
                                                <img src={user.picture} alt={user.name} className="w-full h-full object-cover rounded-[30px]" />
                                            ) : (
                                                <UserIcon size={40} className="text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{user?.name}</h2>
                                            <div className="flex items-center gap-3 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-fit font-bold text-sm">
                                                <Mail size={16} />
                                                <span>{user?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-3xl text-center min-w-[140px]">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">User Reference</span>
                                        <span className="text-base font-black text-slate-900 font-mono tracking-tighter">#{user?._id?.slice(-8).toUpperCase() || 'GUEST'}</span>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                                    <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-8 hover:bg-white transition-all hover:shadow-xl hover:shadow-slate-200/50 group/card ring-1 ring-inset ring-slate-100/50">
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover/card:scale-110 transition-transform">
                                                <Crown size={32} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Membership</p>
                                                <p className="text-2xl font-black text-slate-900 capitalize tracking-tight">{currentPlan?.name || 'Free Tier'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-2xl w-fit text-sm font-black border border-emerald-100">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            {subscription?.status === 'active' ? 'Active' : 'Free Account'}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-8 hover:bg-white transition-all hover:shadow-xl hover:shadow-slate-200/50 group/card ring-1 ring-inset ring-slate-100/50">
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover/card:scale-110 transition-transform">
                                                <Calendar size={32} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Billing Period</p>
                                                <p className="text-2xl font-black text-slate-900 tracking-tight">
                                                    {subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-500 font-bold flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                            Renews via mock billing
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Plans Preview */}
                            {currentPlanId === 'free' && (
                                <div className="bg-black rounded-[32px] p-1 scale-[0.98] hover:scale-100 transition-all cursor-pointer shadow-2xl shadow-slate-200" onClick={() => setView('plans')}>
                                    <div className="bg-white rounded-[28px] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900">
                                                <Rocket size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Unlock Premium Potential</h3>
                                                <p className="text-slate-500 font-medium">Get unlimited downloads, AI features, and all templates.</p>
                                            </div>
                                        </div>
                                        <button className="whitespace-nowrap bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-colors shadow-lg shadow-slate-200 flex items-center gap-2">
                                            Upgrade Now
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Danger Zone (Mock) */}
                            {currentPlanId !== 'free' && (
                                <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                                    <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Account Settings</h3>
                                    <button
                                        onClick={handleCancelSubscription}
                                        className="text-red-500 font-bold text-sm bg-red-50 hover:bg-red-100 px-6 py-3 rounded-2xl transition-colors border border-red-100"
                                    >
                                        Cancel Subscription
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Summary / Stats Card */}
                        <div className="space-y-8">
                            <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)]">
                                <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Tier Benefits</h3>
                                <div className="space-y-6 text-slate-600">
                                    {(currentPlan?.features || pricingTiers[0].features).map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 font-bold text-sm">
                                            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5 border border-blue-100">
                                                <Check size={14} />
                                            </div>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Total Value</p>
                                    <h3 className="text-4xl font-black mb-2 tracking-tighter">$0.00 <span className="text-sm font-medium text-slate-400 line-through tracking-normal">$299/yr</span></h3>
                                    <p className="text-slate-400 text-sm font-medium mb-8">Early access pricing in effect.</p>
                                    <div className="flex items-center gap-3 py-4 border-t border-slate-800">
                                        <Shield size={20} className="text-blue-400" />
                                        <span className="text-xs font-bold text-slate-300">Enterprise grade security</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-20 max-w-6xl mx-auto">
                        {/* Title Section */}
                        <div className="text-center space-y-4">
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight lg:text-6xl">Choose Your Strategy</h2>
                            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                                Accelerate your career growth with professional tools designed for clarity and impact.
                            </p>
                        </div>

                        {/* Pricing Grid */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {pricingTiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className={`relative group bg-white border rounded-[48px] p-10 lg:p-12 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] flex flex-col h-full ${tier.popular ? "border-blue-200 ring-2 ring-blue-100 ring-offset-4 shadow-xl scale-[1.02]" : "border-slate-100"
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200 whitespace-nowrap z-20">
                                            Most Popular Choice
                                        </div>
                                    )}

                                    <div className="mb-10">
                                        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{tier.name}</h3>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{tier.description}</p>
                                    </div>

                                    <div className="mb-10">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-slate-900 tracking-tighter">${tier.price}</span>
                                            <span className="text-slate-400 font-bold text-lg lowercase">/{tier.period}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-5 mb-12 flex-grow">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4 font-bold text-sm text-slate-600">
                                                <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mt-0.5 border border-slate-200/50 group-hover:text-blue-500 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                                    <Check size={14} />
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleTierSelect(tier.id)}
                                        disabled={currentPlanId === tier.id}
                                        className={`w-full py-5 rounded-3xl font-black transition-all group-hover:scale-[1.02] active:scale-[0.98] ${currentPlanId === tier.id
                                            ? "bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed uppercase text-xs tracking-widest"
                                            : tier.popular
                                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200"
                                                : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200"
                                            }`}
                                    >
                                        {currentPlanId === tier.id ? "Already Active" : `Select ${tier.name}`}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* FAQ/Trust section */}
                        <div className="bg-white border border-slate-100 rounded-[56px] p-12 lg:p-20 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Manual Activation Required</h3>
                            <p className="text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
                                We're currently in early-access mode. To activate a premium tier, select a plan above and fill out the activation request. No real payment will be processed.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-12">
                                <div className="flex items-center gap-4 text-slate-400">
                                    <Shield size={24} />
                                    <span className="font-bold text-sm tracking-widest uppercase">SSL Secured</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <CreditCard size={24} />
                                    <span className="font-bold text-sm tracking-widest uppercase">Safe Simulation</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <Zap size={24} />
                                    <span className="font-bold text-sm tracking-widest uppercase">Instant Access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mock Payment Form Modal */}
            {showMockForm && selectedTier && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white rounded-[48px] p-10 md:p-14 max-w-xl w-full shadow-[0_64px_128px_-24px_rgba(0,0,0,0.25)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-700" />

                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100 w-fit">
                                    Activation Required
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Setup {getTierDisplayName(selectedTier)}</h2>
                                <p className="text-slate-500 font-medium mt-2">Activate your membership manually</p>
                            </div>
                            <button onClick={() => setShowMockForm(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                                <XCircle size={28} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-3xl">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Account Reference</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 overflow-hidden">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1 font-mono">Name</p>
                                        <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'N/A'}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 overflow-hidden">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1 font-mono">Email</p>
                                        <p className="text-sm font-bold text-slate-900 truncate">{user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Payment Details (Mock Mode)</label>

                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <CreditCard size={20} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Card Number (Try 4242 4242 4242 4242)"
                                                value={cardDetails.number}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                                                    setCardDetails({ ...cardDetails, number: formatted });
                                                }}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                                                    setCardDetails({ ...cardDetails, expiry: val });
                                                }}
                                                className="bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                                className="bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 px-6 font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-blue-100">
                                        <Info size={20} />
                                    </div>
                                    <p className="text-[11px] text-blue-900/60 font-black leading-relaxed pt-1 uppercase tracking-tight">
                                        Active Testing: You can use "4242 4242 4242 4242" with any future date. No real transaction will be created.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleMockPayment}
                                disabled={isProcessing}
                                className="w-full bg-slate-900 text-white py-6 rounded-[30px] font-black text-lg shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Activating Access...
                                    </>
                                ) : (
                                    <>
                                        Confirm & Activate Tier
                                        <ChevronRight size={24} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function SubscriptionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-400 uppercase tracking-[0.3em]">
                Initializing Premium Workspace...
            </div>
        }>
            <SubscriptionContent />
        </Suspense>
    );
}
