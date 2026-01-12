"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const name = searchParams.get("name");
        const email = searchParams.get("email");
        const error = searchParams.get("error");

        if (error) {
            console.error("OAuth error:", error);
            router.push(`/signin?error=${error}`);
            return;
        }

        if (token) {
            // Store token in localStorage (of auth domain, though we primarily need it in editor)
            localStorage.setItem("authToken", token);

            // Determine editor URL based on environment
            const isProd = window.location.hostname.endsWith('profresume.com');
            const editorBaseUrl = isProd
                ? 'https://edit.profresume.com'
                : 'http://localhost:3002';

            // Construct redirect URL to editor with user info
            const redirectUrl = new URL(editorBaseUrl);
            redirectUrl.searchParams.set('token', token);
            if (name) redirectUrl.searchParams.set('name', name);
            if (email) redirectUrl.searchParams.set('email', email);

            // Cross-subdomain redirect
            window.location.href = redirectUrl.toString();
        } else {
            // No token or error, redirect back to signin
            router.push("/signin?error=auth_failed");
        }
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-gray-600">Completing sign in...</p>
            </div>
        </div>
    );
}

export default function CallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}
