"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (error) {
            console.error("OAuth error:", error);
            router.push(`/signin?error=${error}`);
            return;
        }

        if (success === "true") {
            // Authentication successful!
            // The backend has set an HttpOnly cookie with the JWT token
            // This cookie is automatically sent with all API requests to *.profresume.com

            // Determine editor URL based on environment
            const isProd = window.location.hostname.endsWith('profresume.com');
            const editorBaseUrl = isProd
                ? 'https://edit.profresume.com'
                : 'http://localhost:3002';

            // Redirect to editor - the cookie will be available there
            // User info can be fetched via /api/auth/user endpoint
            window.location.href = editorBaseUrl;
        } else {
            // No success parameter, redirect back to signin
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
