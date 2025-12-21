"use client";

import { Minus, Plus } from "lucide-react";

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
}

export function NumberInput({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
}: NumberInputProps) {
    const handleDecrement = () => {
        const newValue = Math.max(min, value - step);
        onChange(newValue);
    };

    const handleIncrement = () => {
        const newValue = Math.min(max, value + step);
        onChange(newValue);
    };

    return (
        <div className="flex items-center gap-2">
            {label && <span className="text-sm text-gray-700">{label}</span>}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                    onClick={handleDecrement}
                    className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                    disabled={value <= min}
                >
                    <Minus className="w-4 h-4" />
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => {
                        const newValue = parseInt(e.target.value) || min;
                        onChange(Math.max(min, Math.min(max, newValue)));
                    }}
                    className="w-16 text-center border-x border-gray-200 py-2 text-sm focus:outline-none"
                    min={min}
                    max={max}
                />
                <button
                    onClick={handleIncrement}
                    className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                    disabled={value >= max}
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
