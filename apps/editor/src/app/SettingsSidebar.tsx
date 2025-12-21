"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ColorPicker } from "@repo/ui/color-picker";
import { ThemeSelector } from "@repo/ui/theme-selector";
import { ExportOptions } from "@repo/ui/export-options";
import { LanguageSelector } from "@repo/ui/language-selector";
import { NumberInput } from "@repo/ui/number-input";
import { Button } from "@repo/ui/button";

interface SettingsSidebarProps {
    onExport: (format: "pdf" | "doc") => void;
    onTemplateChange?: () => void;
}

export default function SettingsSidebar({ onExport, onTemplateChange }: SettingsSidebarProps) {
    const [language, setLanguage] = useState("en");
    const [fontSize, setFontSize] = useState(12);
    const [themeColor, setThemeColor] = useState("#000000");
    const [colorOpacity, setColorOpacity] = useState(100);

    const [openSections, setOpenSections] = useState({
        text: true,
        color: false,
        export: false,
        theme: false,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-80 rounded-lg  bg-gray-50 border-l border-gray-200 overflow-y-auto">
            {/* Language & Template */}
            <div className="p-6 bg-white border-b border-gray-200">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <LanguageSelector value={language} onChange={setLanguage} />
                </div>
                <Button onClick={onTemplateChange} variant="outline" className="w-full">
                    🎨 Change Template
                </Button>
            </div>

            {/* Saved Progress Badge */}
            <div className="px-6 py-3 bg-green-50 border-b border-green-100">
                <div className="flex items-center gap-2 text-sm text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Saved Progress
                </div>
            </div>

            {/* Text Settings */}
            <div className="border-b border-gray-200">
                <button
                    onClick={() => toggleSection("text")}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="font-medium text-gray-900">Text</span>
                    {openSections.text ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>
                {openSections.text && (
                    <div className="px-6 pb-6 bg-white space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                                <option>Inter</option>
                                <option>Roboto</option>
                                <option>Open Sans</option>
                                <option>Lato</option>
                                <option>Montserrat</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Semibold</span>
                                <NumberInput value={fontSize} onChange={setFontSize} min={8} max={24} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Color Settings */}
            <div className="border-b border-gray-200">
                <button
                    onClick={() => toggleSection("color")}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="font-medium text-gray-900">Color</span>
                    {openSections.color ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>
                {openSections.color && (
                    <div className="px-6 pb-6 bg-white">
                        <ColorPicker
                            value={themeColor}
                            onChange={setThemeColor}
                            opacity={colorOpacity}
                            onOpacityChange={setColorOpacity}
                        />
                    </div>
                )}
            </div>

            {/* Export Settings */}
            <div className="border-b border-gray-200">
                <button
                    onClick={() => toggleSection("export")}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="font-medium text-gray-900">Export</span>
                    {openSections.export ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>
                {openSections.export && (
                    <div className="px-6 pb-6 bg-white">
                        <ExportOptions onExport={onExport} />
                    </div>
                )}
            </div>

            {/* Theme Change */}
            <div className="border-b border-gray-200">
                <button
                    onClick={() => toggleSection("theme")}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="font-medium text-gray-900">Theme Change</span>
                    {openSections.theme ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>
                {openSections.theme && (
                    <div className="px-6 pb-6 bg-white">
                        <ThemeSelector selectedColor={themeColor} onColorSelect={setThemeColor} />
                    </div>
                )}
            </div>
        </div>
    );
}
