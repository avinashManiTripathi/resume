import { useState } from "react";
import { ChevronDown, ChevronUp, LayoutGrid, Sparkles } from "lucide-react";
import { ColorPicker } from "@repo/ui/color-picker";
import { ThemeSelector } from "@repo/ui/theme-selector";
import { ExportOptions } from "@repo/ui/export-options";
import { LanguageSelector } from "@repo/ui/language-selector";
import { NumberInput } from "@repo/ui/number-input";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

interface SettingsSidebarProps {
    onExport: (format: "pdf" | "doc") => void;
    onTemplateChange?: () => void;
}

export default function SettingsSidebar({ onExport, onTemplateChange }: SettingsSidebarProps) {
    const router = useRouter();
    const [language, setLanguage] = useState("en");
    const [fontSize, setFontSize] = useState(12);
    const [themeColor, setThemeColor] = useState("#000000");
    const [colorOpacity, setColorOpacity] = useState(100);

    const [openSections, setOpenSections] = useState({
        text: true,
        color: true,
        export: true,
        theme: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-70 rounded-lg  bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6 bg-white border-b border-gray-200 space-y-3">
                <Button onClick={onTemplateChange} variant="outline" className="w-full">
                    <LayoutGrid size={18} /> Change Template
                </Button>
                <Button 
                    onClick={() => router.push('/tailor')} 
                    variant="primary" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                    <Sparkles size={18} /> Tailor My Resume
                </Button>
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
