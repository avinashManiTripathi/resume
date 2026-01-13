"use client";

import { Suspense } from "react";
import { FileText, Sparkles, Shield, Zap } from "lucide-react";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignInContent from "./SignInContent";

function SignInContenst() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam) {
            switch (errorParam) {
                case "auth_failed":
                    setError("Authentication failed. Please try again.");
                    break;
                case "no_user":
                    setError("Unable to retrieve user information.");
                    break;
                case "server_error":
                    setError("Server error occurred. Please try again later.");
                    break;
                default:
                    setError("An error occurred. Please try again.");
            }
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding */}
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-3 animate-slide-in-left">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/logo.png"
                                alt="ProfResume Logo"
                                className="w-15 h-9 transition-transform group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 leading-tight animate-slide-in-left animation-delay-100">
                        Create Your Perfect Resume in Minutes
                    </h2>

                    <p className="text-lg text-gray-600 animate-slide-in-left animation-delay-200">
                        Professional resume templates powered by AI. Get hired faster with our intelligent resume builder.
                    </p>

                    {/* Features */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-3 animate-slide-in-left animation-delay-300 hover:translate-x-2 transition-transform duration-300">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">AI-Powered Optimization</h3>
                                <p className="text-sm text-gray-600">Tailor your resume to any job description automatically</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 animate-slide-in-left animation-delay-400 hover:translate-x-2 transition-transform duration-300">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Zap className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Professional Templates</h3>
                                <p className="text-sm text-gray-600">Choose from multiple ATS-friendly templates</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 animate-slide-in-left animation-delay-500 hover:translate-x-2 transition-transform duration-300">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                                <p className="text-sm text-gray-600">Your data is encrypted and never shared</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-float animate-slide-in-right">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
                        <p className="text-gray-600">Sign in to continue building your resume</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <GoogleSignInButton />

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                            Don't have an account?{" "}
                            <span className="font-semibold text-gray-900">
                                Sign in with Google to get started
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"><div className="text-gray-600">Loading...</div></div>}>
            <SignInContent />
        </Suspense>
    );
}
