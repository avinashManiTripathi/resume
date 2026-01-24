"use client";

import { StepLoader } from "@repo/ui/step-loader";
import { SubscriptionView } from "../../components/SubscriptionView";
import { Suspense } from "react";

export default function SubscriptionPage() {
    return (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
            <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-white">
                    <StepLoader
                        loading={true}
                        message="Loading Plans..."
                        subMessage={'Fetching Plans...'}
                        logoSrc="/logo.png"
                        fullScreen={true}
                    />
                </div>
            }>
                <SubscriptionView hideBack />
            </Suspense>
        </div>
    );
}
