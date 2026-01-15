import { ReactNode } from "react";

export type StepLoaderSize = "sm" | "md" | "lg";

export interface StepLoaderProps {
    steps: string[];
    currentStep: number;
    className?: string;
    size?: StepLoaderSize;
}

export const StepLoader = ({
    steps,
    currentStep,
    className = "",
    size = "md",
}: StepLoaderProps) => {
    const sizeConfig = {
        sm: {
            container: "gap-3",
            icon: "w-5 h-5",
            text: "text-sm",
            spinner: "w-4 h-4 border-2",
        },
        md: {
            container: "gap-4",
            icon: "w-6 h-6",
            text: "text-base",
            spinner: "w-5 h-5 border-2",
        },
        lg: {
            container: "gap-5",
            icon: "w-8 h-8",
            text: "text-lg",
            spinner: "w-6 h-6 border-[3px]",
        },
    };

    const config = sizeConfig[size];

    return (
        <div className={`flex flex-col ${config.container} ${className}`}>
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;

                return (
                    <div
                        key={index}
                        className={`flex items-center gap-3 transition-all duration-500 ${isCurrent
                                ? "opacity-100 scale-100"
                                : isCompleted
                                    ? "opacity-60 scale-95"
                                    : "opacity-30 scale-90"
                            }`}
                    >
                        {/* Icon/Status Indicator */}
                        <div className="relative flex-shrink-0">
                            {isCompleted ? (
                                <div
                                    className={`${config.icon} rounded-full bg-green-100 flex items-center justify-center animate-in fade-in zoom-in duration-300`}
                                >
                                    <svg
                                        className="w-3/5 h-3/5 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            ) : isCurrent ? (
                                <div
                                    className={`${config.icon} rounded-full bg-blue-100 flex items-center justify-center`}
                                >
                                    <div
                                        className={`${config.spinner} border-blue-600 border-t-transparent rounded-full animate-spin`}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`${config.icon} rounded-full bg-slate-100 flex items-center justify-center`}
                                >
                                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                                </div>
                            )}
                        </div>

                        {/* Step Text */}
                        <div
                            className={`${config.text} font-medium ${isCurrent
                                    ? "text-slate-900"
                                    : isCompleted
                                        ? "text-slate-600"
                                        : "text-slate-400"
                                }`}
                        >
                            {step}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
