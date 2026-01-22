"use client";

import { SubscriptionView } from "../../components/SubscriptionView";
import { Suspense } from "react";

export default function SubscriptionPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden min-h-[80vh] flex flex-col">
                <Suspense fallback={
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Loading Plans...</p>
                    </div>
                }>
                    <SubscriptionView hideBack />
                </Suspense>
            </div>
        </div>
    );
}
