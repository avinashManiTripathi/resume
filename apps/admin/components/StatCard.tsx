"use client";

import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
    label: string;
    value: string | number;
    change?: string;
    icon: LucideIcon;
    color?: "blue" | "purple" | "green" | "orange" | "red" | "yellow";
    trend?: "up" | "down" | "neutral";
}

const colorClasses = {
    blue: {
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        gradient: "from-blue-50 to-blue-100",
    },
    purple: {
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        gradient: "from-purple-50 to-purple-100",
    },
    green: {
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        gradient: "from-green-50 to-green-100",
    },
    orange: {
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        gradient: "from-orange-50 to-orange-100",
    },
    red: {
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        gradient: "from-red-50 to-red-100",
    },
    yellow: {
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        gradient: "from-yellow-50 to-yellow-100",
    },
};

export function StatCard({
    label,
    value,
    change,
    icon: Icon,
    color = "blue",
    trend = "neutral",
}: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const colors = colorClasses[color];

    // Animate number counting
    useEffect(() => {
        if (typeof value === "number") {
            const duration = 1000;
            const steps = 30;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [value]);

    const trendColor =
        trend === "up"
            ? "text-green-600"
            : trend === "down"
                ? "text-red-600"
                : "text-gray-600";

    return (
        <div className="card hover-lift p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg}`}
                >
                    <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                {change && (
                    <span className={`text-sm font-semibold ${trendColor}`}>
                        {trend === "up" && "↑ "}
                        {trend === "down" && "↓ "}
                        {change}
                    </span>
                )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
                {typeof value === "number" ? displayValue.toLocaleString() : value}
            </div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
}
