"use client";

import { ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
    value: string;
    onChange: (language: string) => void;
}

const LANGUAGES = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
    const selectedLanguage = LANGUAGES.find((lang) => lang.code === value) || LANGUAGES[0];

    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg appearance-none bg-white text-sm cursor-pointer hover:border-gray-300 transition-colors"
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
    );
}
