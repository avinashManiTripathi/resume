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
    Gift
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

    useEffect(() => {
        if (isLoggedIn === false) {
            const isProd = window.location.hostname.endsWith('hirecta.com');
            const authUrl = isProd ? 'https://auth.hirecta.com' : 'http://localhost:3001';
            window.location.href = `${authUrl}/signin?returnTo=${encodeURIComponent(window.location.href)}`;
        }
    }, [isLoggedIn]);

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handleRazorpayPayment = async (tier: SubscriptionTier) => {
        setIsProcessing(true);

        const tierData = pricingTiers.find(t => t.id === tier);
        if (!tierData) return;

        const options = {
            key: "rzp_test_dummykey", // Replace with real key in production
            amount: tierData.price * 100,
            currency: "USD",
            name: "Hirecta",
            description: `${tier.toUpperCase()} Subscription`,
            handler: async function (response: any) {
                try {
                    const res = await fetch(`${API_BASE}/api/subscription/create`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({
                            tier,
                            paymentMethod: 'razorpay',
                            paymentId: response.razorpay_payment_id
                        })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setSubscription(data.subscription);
                        setShowSuccess(true);
                        setTimeout(() => {
                            const redirectPath = returnTo ? `/${returnTo}` : '/editor';
                            router.push(redirectPath);
                        }, 2500);
                    }
                } catch (error) {
                    console.error('Failed to save subscription:', error);
                    alert('Payment successful but failed to update subscription. Please contact support.');
                } finally {
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: user?.name,
                email: user?.email,
            },
            theme: {
                color: "#2563eb"
            },
            modal: {
                ondismiss: () => setIsProcessing(false)
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    const handleTierSelect = async (tier: SubscriptionTier) => {
        if (tier === 'free') return;

        setSelectedTier(tier);
        handleRazorpayPayment(tier);
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
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-lg w-full text-center border border-white/20 shadow-2xl animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-emerald-500/10">
                        <CheckCircle2 size={48} className="text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Payment Successful!
                    </h2>
                    <p className="text-slate-300 text-lg mb-8">
                        Welcome to the <span className="text-blue-400 font-bold">{selectedTier && getTierDisplayName(selectedTier)}</span> plan. Your professional journey just got a major boost!
                    </p>
                    <div className="flex items-center justify-center gap-3 text-emerald-400 font-medium bg-emerald-400/10 py-3 rounded-2xl border border-emerald-400/20">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-400 border-t-transparent"></div>
                        Redirecting to workspace...
                    </div>
                </div>
            </div>
        );
    }

    const currentPlan = pricingTiers.find(t => t.id === (subscription?.plan || 'free'));

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-16">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => router.push(returnTo ? `/${returnTo}` : '/editor')}
                        className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Return to Editor</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => setView('dashboard')}
                                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                My Account
                            </button>
                            <button
                                onClick={() => setView('plans')}
                                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'plans' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                Plans & Upgrade
                            </button>
                        </div>
                    </div>
                </div>

                {view === 'dashboard' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Account Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all duration-500"></div>

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                                    <div className="flex items-center gap-5">
                                        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-4 ring-white/5 overflow-hidden">
                                            {user?.picture ? (
                                                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserIcon size={32} className="text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-white mb-1">{user?.name}</h2>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Mail size={14} />
                                                <span className="text-sm font-medium">{user?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">User ID</span>
                                        <span className="text-sm font-mono text-slate-300">#{user?._id?.slice(-8) || 'GUEST'}</span>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group/card">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover/card:scale-110 transition-transform">
                                                <Crown size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Plan</p>
                                                <p className="text-lg font-bold text-white capitalize">{currentPlan?.name || 'Free'}</p>
                                            </div>
                                        </div>
                                        {subscription?.status === 'active' ? (
                                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl w-fit text-sm font-semibold">
                                                <CheckCircle2 size={16} />
                                                Active
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl w-fit text-sm font-medium">
                                                <Info size={16} />
                                                Trial / Inactive
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group/card">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover/card:scale-110 transition-transform">
                                                <Calendar size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Renews On</p>
                                                <p className="text-lg font-bold text-white">
                                                    {subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400 font-medium">
                                            Next billing amount: <span className="text-white font-bold">${currentPlan?.price || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {subscription?.plan && subscription.plan !== 'free' && (
                                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <Shield className="text-emerald-400" size={20} />
                                            <p className="text-sm font-medium">Your account is secured with 256-bit encryption</p>
                                        </div>
                                        <button
                                            onClick={handleCancelSubscription}
                                            className="text-sm font-bold text-rose-400 hover:text-rose-300 px-4 py-2 hover:bg-rose-500/10 rounded-xl transition-all flex items-center gap-2"
                                        >
                                            <XCircle size={16} />
                                            Cancel Subscription
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Features Preview */}
                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Zap className="text-amber-400" size={20} />
                                    Included Benefits
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {currentPlan?.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-300">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Tips / Upsell */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-blue-500/20 rounded-[32px] p-8 shadow-xl relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/20">
                                        <Rocket size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Maximize Your Potential</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                                        Unlock AI-powered tailoring and professional templates to stand out from the crowd.
                                    </p>
                                    {subscription?.plan !== 'premium' && (
                                        <button
                                            onClick={() => setView('plans')}
                                            className="w-full py-4 bg-white text-blue-900 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-white/10 hover:-translate-y-1"
                                        >
                                            Upgrade Now
                                            <Sparkles size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Gift size={20} className="text-purple-400" />
                                    <h4 className="font-bold text-white">Referral Reward</h4>
                                </div>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Invite 3 friends and get <span className="text-white font-bold">1 month of Premium</span> for free.
                                </p>
                                <button className="w-full py-3 bg-white/5 text-white border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                                    Invite Friends
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-16">
                            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                                Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Transparent</span> Pricing
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                                Choose the plan that works best for your career goals. No hidden fees.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {pricingTiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-10 transition-all hover:scale-[1.02] hover:bg-white/[0.08] flex flex-col ${tier.popular ? 'lg:-translate-y-4 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/10' : ''}`}
                                >
                                    {tier.popular && (
                                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-sm font-bold text-white shadow-xl">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                        <p className="text-slate-400 text-sm font-medium">{tier.description}</p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-white">${tier.price}</span>
                                            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">/{tier.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-1">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-4">
                                                <div className="p-1 bg-white/10 rounded-lg text-emerald-400 mt-1">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                <span className="text-slate-300 text-sm font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        disabled={isProcessing || subscription?.plan === tier.id}
                                        onClick={() => handleTierSelect(tier.id)}
                                        className={`w-full py-5 rounded-[24px] font-bold text-lg transition-all flex items-center justify-center gap-3 ${tier.id === 'free'
                                            ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                                            : tier.popular
                                                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30'
                                                : 'bg-white text-blue-900 hover:bg-slate-100 shadow-lg'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isProcessing && tier.id === selectedTier ? (
                                            <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                {subscription?.plan === tier.id ? 'Active Plan' : tier.id === 'free' ? 'Default Plan' : 'Get Started'}
                                                {tier.id !== 'free' && <ArrowRight size={20} />}
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Trust Section */}
            <div className="max-w-7xl mx-auto px-4 py-8 mb-16">
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-wrap items-center justify-center gap-12 backdrop-blur-sm grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <span className="text-lg font-bold">Trusted by hiring managers at</span>
                    <div className="flex flex-wrap items-center justify-center gap-10">
                        <span className="text-xl font-black italic tracking-tighter">Google</span>
                        <span className="text-xl font-black tracking-tighter">amazon</span>
                        <span className="text-xl font-black tracking-tighter">Meta</span>
                        <span className="text-xl font-black tracking-tighter lowercase">S<span className="text-blue-500">ales</span>force</span>
                        <span className="text-xl font-black italic">Microsoft</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SubscriptionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="text-slate-400 font-bold animate-pulse">Initializing Security...</div>
                </div>
            </div>
        }>
            <SubscriptionContent />
        </Suspense>
    );
}

const ArrowRight = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
);
