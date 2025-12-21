"use client";

interface ThemeSelectorProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const THEME_COLORS = [
    "#000000", // Black
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#FBBF24", // Yellow
    "#A855F7", // Purple
    "#EC4899", // Pink
    "#10B981", // Green
    "#06B6D4", // Cyan
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradient
];

export function ThemeSelector({ selectedColor, onColorSelect }: ThemeSelectorProps) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {THEME_COLORS.map((color, index) => (
                <button
                    key={index}
                    onClick={() => onColorSelect(color.startsWith("linear") ? "#667eea" : color)}
                    className={`w-full h-12 rounded-lg border-2 transition-all ${selectedColor === color || (color.startsWith("linear") && selectedColor === "#667eea")
                            ? "border-gray-900 scale-95"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                    style={{
                        background: color,
                    }}
                />
            ))}
        </div>
    );
}
