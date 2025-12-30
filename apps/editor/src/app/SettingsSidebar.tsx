import { useState } from "react";
import { Home, FileText, Trophy, Megaphone, Folder, Trash2, Lock, Sparkles, LayoutGrid, Palette, Download, Settings } from "lucide-react";
import { ColorPicker } from "@repo/ui/color-picker";
import { ThemeSelector } from "@repo/ui/theme-selector";
import { ExportOptions } from "@repo/ui/export-options";
import { useRouter } from "next/navigation";

interface SettingsSidebarProps {
    onExport: (format: "pdf" | "doc") => void;
    onTemplateChange?: () => void;
    onSmartImport?: () => void;
}

export default function SettingsSidebar({ onExport, onTemplateChange, onSmartImport }: SettingsSidebarProps) {
    const router = useRouter();
    const [themeColor, setThemeColor] = useState("#000000");
    const [colorOpacity, setColorOpacity] = useState(100);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [showExport, setShowExport] = useState(false);

    const iconButtonClass = "w-12 h-12 rounded-xl bg-gray-100 hover:bg-blue-50 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 border border-gray-200";
    const iconButtonActiveClass = "w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 shadow-md";

    return (
        <div className="w-20 bg-white border-l border-blue-100 rounded-lg flex flex-col items-center py-6 gap-4 overflow-y-auto shadow-sm">
            {/* Top Section - Home */}
            <button
                className={iconButtonActiveClass}
                title="Home"
                onClick={() => router.push('/')}
            >
                <Home size={20} />
            </button>

            {/* AI Smart Import */}
            <button
                className={iconButtonClass}
                title="Smart Import"
                onClick={onSmartImport}
            >
                <Sparkles size={20} />
            </button>

            {/* Change Template */}
            <button
                className={iconButtonClass}
                title="Change Template"
                onClick={onTemplateChange}
            >
                <LayoutGrid size={20} />
            </button>

            {/* Divider */}
            <div className="w-10 h-px bg-blue-200 my-2"></div>

            {/* Tailor Resume */}
            <button
                className={iconButtonClass}
                title="Tailor My Resume"
                onClick={() => router.push('/tailor')}
            >
                <Trophy size={20} />
            </button>

            {/* Color Picker */}
            <div className="relative">
                <button
                    className={showColorPicker ? iconButtonActiveClass : iconButtonClass}
                    title="Color Settings"
                    onClick={() => {
                        setShowColorPicker(!showColorPicker);
                        setShowThemeSelector(false);
                        setShowExport(false);
                    }}
                >
                    <Palette size={20} />
                </button>

                {showColorPicker && (
                    <div className="absolute right-24 top-0 bg-white rounded-lg shadow-2xl p-4 z-50 border border-gray-200 min-w-[280px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Color Settings</h3>
                            <button
                                onClick={() => setShowColorPicker(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                        <ColorPicker
                            value={themeColor}
                            onChange={setThemeColor}
                            opacity={colorOpacity}
                            onOpacityChange={setColorOpacity}
                        />
                    </div>
                )}
            </div>

            {/* Theme Selector */}
            <div className="relative">
                <button
                    className={showThemeSelector ? iconButtonActiveClass : iconButtonClass}
                    title="Theme Change"
                    onClick={() => {
                        setShowThemeSelector(!showThemeSelector);
                        setShowColorPicker(false);
                        setShowExport(false);
                    }}
                >
                    <Settings size={20} />
                </button>

                {showThemeSelector && (
                    <div className="absolute right-24 top-0 bg-white rounded-lg shadow-2xl p-4 z-50 border border-gray-200 min-w-[280px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Theme Change</h3>
                            <button
                                onClick={() => setShowThemeSelector(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                        <ThemeSelector selectedColor={themeColor} onColorSelect={setThemeColor} />
                    </div>
                )}
            </div>

            {/* Export */}
            <div className="relative">
                <button
                    className={showExport ? iconButtonActiveClass : iconButtonClass}
                    title="Export Resume"
                    onClick={() => {
                        setShowExport(!showExport);
                        setShowColorPicker(false);
                        setShowThemeSelector(false);
                    }}
                >
                    <Download size={20} />
                </button>

                {showExport && (
                    <div className="absolute right-24 top-0 bg-white rounded-lg shadow-2xl p-4 z-50 border border-gray-200 min-w-[280px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Export Resume</h3>
                            <button
                                onClick={() => setShowExport(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                        <ExportOptions onExport={(format) => {
                            onExport(format);
                            setShowExport(false);
                        }} />
                    </div>
                )}
            </div>

            {/* Spacer to push bottom items down */}
            <div className="flex-1"></div>

            {/* Divider */}
            <div className="w-10 h-px bg-blue-200 my-2"></div>

            {/* Help/Docs */}
            <button
                className={iconButtonClass}
                title="Help & Documentation"
            >
                <FileText size={20} />
            </button>

            {/* Lock/Security */}
            <button
                className={iconButtonClass}
                title="Privacy & Security"
            >
                <Lock size={20} />
            </button>
        </div>
    );
}
