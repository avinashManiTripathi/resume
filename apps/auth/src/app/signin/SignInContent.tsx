"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Award, Briefcase } from "lucide-react";
import Image from "next/image";

export default function SignInContent() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        window.location.href = `https://api.profresume.com/api/auth/google`;
    };

    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            console.error("Authentication error:", error);
            setIsLoading(false);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
            {/* Navbar Header - Fixed at Top */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="ProfResume"
                            height={40}
                            width={140}
                            priority
                            className="cursor-pointer"
                            onClick={() => window.location.href = '/'}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 hidden sm:block">
                            New to ProfResume?
                        </span>
                    </div>
                </div>
            </header>

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>

            {/* Main Content - Padding for fixed navbar */}
            <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto">
                    {/* Two Column Layout: Headline Left, Form Right */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Headline & Info */}
                        <div className="space-y-8">
                            {/* Headline Section */}
                            <div>
                                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
                                    <span className="text-sm font-bold text-purple-700">✨ Your Future Starts Here</span>
                                </div>
                                <h1 className="text-2xl sm:text-5xl lg:text-2xl font-black text-gray-900 mb-6 leading-tight">
                                    Transform Your Career <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Land Your Dream Job</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                    Join thousands who've revolutionized their careers with AI-powered resumes that get noticed by top companies.
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: TrendingUp,
                                        title: "3x More Interview Calls",
                                        desc: "Stand out with ATS-optimized resumes",
                                        color: "from-blue-500 to-cyan-500"
                                    },
                                    {
                                        icon: Award,
                                        title: "Professional Excellence",
                                        desc: "AI-powered content that impresses recruiters",
                                        color: "from-purple-500 to-pink-500"
                                    },
                                    {
                                        icon: Briefcase,
                                        title: "Your Next Opportunity",
                                        desc: "Get hired by Fortune 500 companies",
                                        color: "from-green-500 to-emerald-500"
                                    }
                                ].map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} p-0.5 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                                                <benefit.icon className="w-6 h-6 text-gray-700" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                                            <p className="text-sm text-gray-600">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Sign In Form */}
                        <div>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

                                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-4">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Secure Login</span>
                                        </div>

                                        <h2 className="text-3xl font-black text-gray-900 mb-2">
                                            Start Your Journey
                                        </h2>
                                        <p className="text-gray-600 font-medium">
                                            Sign in to begin transforming your career
                                        </p>
                                    </div>

                                    {/* Error Message */}
                                    {searchParams.get("error") && (
                                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                                            <p className="text-sm font-semibold text-red-700 text-center">
                                                ⚠️ Authentication failed. Please try again.
                                            </p>
                                        </div>
                                    )}

                                    {/* Google Sign In Button */}
                                    <button
                                        onClick={handleGoogleSignIn}
                                        disabled={isLoading}
                                        className="group/btn relative w-full overflow-hidden rounded-2xl bg-white border-2 border-gray-200 p-5 font-bold text-gray-900 transition-all duration-300 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-6"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                                        <div className="relative flex items-center justify-center gap-4">
                                            <svg className="h-6 w-6 flex-shrink-0" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>

                                            <span className="text-lg">
                                                {isLoading ? (
                                                    <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Connecting...
                                                    </span>
                                                ) : "Continue with Google"}
                                            </span>

                                            <Sparkles className="w-5 h-5 text-purple-600" />
                                        </div>
                                    </button>

                                    {/* Divider */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-3 bg-white text-gray-500 font-semibold">
                                                Trusted by 10,000+ professionals
                                            </span>
                                        </div>
                                    </div>

                                    {/* Success Stats */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {[
                                            { number: "10K+", label: "Users" },
                                            { number: "95%", label: "Success" },
                                            { number: "4.9★", label: "Rating" }
                                        ].map((stat, idx) => (
                                            <div key={idx} className="text-center p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-purple-200 transition-all">
                                                <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                    {stat.number}
                                                </div>
                                                <div className="text-[10px] text-gray-600 font-semibold mt-1">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <p className="text-center text-xs text-gray-500">
                                        By continuing, you agree to our{" "}
                                        <a href="/terms" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
                                            Terms
                                        </a>
                                        {" & "}
                                        <a href="/privacy" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
                                            Privacy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Testimonial */}
                <div className="mt-16 text-center max-w-3xl mx-auto">
                    <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <div className="flex items-center justify-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-700 italic mb-4 text-lg">
                            "I landed my dream job at Google within 2 weeks of using ProfResume. The AI-powered suggestions made my resume stand out from hundreds of applicants!"
                        </p>
                        <p className="text-sm font-bold text-gray-900">— Sarah Chen, Software Engineer at Google</p>
                    </div>
                </div>
            </div >
        </div >
    );
}
