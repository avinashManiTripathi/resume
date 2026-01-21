"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StepLoader } from "@repo/ui/step-loader";
import { Sparkles } from "lucide-react";

/**
 * Cover Letter Landing Page
 * Shows StepLoader animation while redirecting to template selection
 */
export default function CoverLetterPage() {
    const router = useRouter();
    const [loadingStep, setLoadingStep] = useState(0);

    const loadingSteps = [
        "Initializing Cover Letter Builder...",
        "Loading Templates...",
        "Redirecting..."
    ];

    // Auto-progress through steps
    useEffect(() => {
        if (loadingStep < loadingSteps.length - 1) {
            const timer = setTimeout(() => {
                setLoadingStep(prev => prev + 1);
            }, 600);
            return () => clearTimeout(timer);
        } else if (loadingStep === loadingSteps.length - 1) {
            // Final step - redirect after brief delay
            const timer = setTimeout(() => {
                router.push("/cover-letter/templates");
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [loadingStep, loadingSteps.length, router]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm animate-in fade-in duration-500">
            <div className="relative max-w-md w-full mx-4">
                <div className="relative bg-white border border-slate-100 p-12 rounded-[40px] shadow-2xl overflow-hidden">
                    <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center relative mb-8">
                        <Sparkles size={32} className="text-blue-600 relative z-10" />
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-50" />
                    </div>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Cover Letter Builder</h2>
                        <p className="text-slate-500">Preparing your workspace...</p>
                    </div>
                    <div className="flex justify-center">
                        <StepLoader steps={loadingSteps} currentStep={loadingStep} />
                    </div>
                </div>
            </div>
        </div>
    );
}
