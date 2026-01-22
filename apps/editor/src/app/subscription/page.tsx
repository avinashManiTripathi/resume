"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirection to main dashboard where subscription is now integrated
        router.replace('/');
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-400 uppercase tracking-[0.3em]">
            Redirecting to dashboard...
        </div>
    );
}
