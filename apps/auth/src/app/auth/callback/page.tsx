"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            // Store token in localStorage
            localStorage.setItem("auth_token", token);

            // Redirect to editor
            window.location.href = "http://localhost:3000/editor";
        } else {
            // No token, redirect to sign in with error
            router.push("/signin?error=no_token");
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Completing sign in...</h2>
                <p className="text-gray-600 mt-2">Please wait while we redirect you</p>
            </div>
        </div>
    );
}
