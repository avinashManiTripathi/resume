"use client";

import { SubscriptionView } from "../../components/SubscriptionView";
import { Suspense } from "react";

export default function SubscriptionPage() {
    return (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
            <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-white">
                    <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 font-medium">Loading Plans...</p>
                </div>
            }>
                <SubscriptionView hideBack />
            </Suspense>
        </div>
    );
}
