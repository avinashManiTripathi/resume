"use client";

import { useState } from "react";

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    showOpacity?: boolean;
    opacity?: number;
    onOpacityChange?: (opacity: number) => void;
}

export function ColorPicker({
    value,
    onChange,
    showOpacity = true,
    opacity = 100,
    onOpacityChange,
}: ColorPickerProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                    style={{ backgroundColor: value }}
                    onClick={() => {
                        const input = document.createElement("input");
                        input.type = "color";
                        input.value = value;
                        input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
                        input.click();
                    }}
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                    placeholder="#000000"
                />
            </div>
            {showOpacity && (
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={opacity}
                        onChange={(e) => onOpacityChange?.(parseInt(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-12">{opacity}%</span>
                </div>
            )}
        </div>
    );
}
