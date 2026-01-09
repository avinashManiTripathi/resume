import { useState, useMemo, memo } from "react";
import { Home, FileText, Trophy, Megaphone, Folder, Trash2, Lock, Sparkles, LayoutGrid, Palette, Download, Settings, Type } from "lucide-react";
import { ColorPicker } from "@repo/ui/color-picker";
import { ThemeSelector } from "@repo/ui/theme-selector";
import { ExportOptions } from "@repo/ui/export-options";
import { Tooltip } from "@repo/ui/tooltip";
import { useRouter } from "next/navigation";

interface SettingsSidebarProps {
    onExport: (format: "pdf" | "doc") => void;
    onTemplateChange?: () => void;
    onSmartImport?: () => void;
    fontFamily?: string;
    onFontChange?: (font: string) => void;
}

const SettingsSidebar = ({ onExport, onTemplateChange, onSmartImport, fontFamily, onFontChange }: SettingsSidebarProps) => {
    const router = useRouter();
    const [themeColor, setThemeColor] = useState("#000000");
    const [colorOpacity, setColorOpacity] = useState(100);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [showFontSelector, setShowFontSelector] = useState(false);

    const iconButtonClass = "w-12 h-12 rounded-xl bg-gray-100 hover:bg-blue-50 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 border border-gray-200";
    const iconButtonActiveClass = "w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 shadow-md";

    // Memoize fonts array to prevent recreation on every render
    const fonts = useMemo(() => [
        { name: 'Inter', label: 'Inter' },
        { name: 'Roboto', label: 'Roboto' },
        { name: 'Open Sans', label: 'Open Sans' },
        { name: 'Lato', label: 'Lato' },
        { name: 'Montserrat', label: 'Montserrat' },
        { name: 'Poppins', label: 'Poppins' },
        { name: 'Merriweather', label: 'Merriweather' },
        { name: 'Playfair Display', label: 'Playfair Display' },
        { name: 'Georgia', label: 'Georgia' },
        { name: 'Times New Roman', label: 'Times New Roman' },
    ], []);

    return (
        <div className="w-20 bg-white border-l border-blue-100 rounded-lg flex flex-col items-center py-6 gap-4 overflow-visible shadow-sm">


            {/* AI Smart Import */}
            <Tooltip content="Smart Import" position="left">
                <button
                    className={iconButtonClass}
                    onClick={onSmartImport}
                >
                    <Sparkles size={20} />
                </button>
            </Tooltip>

            {/* Change Template */}
            <Tooltip content="Change Template" position="left">
                <button
                    className={iconButtonClass}
                    onClick={onTemplateChange}
                >
                    <LayoutGrid size={20} />
                </button>
            </Tooltip>

            {/* Font Family Selector */}
            <div className="relative">
                <Tooltip content="Change Font" position="left">
                    <button
                        className={showFontSelector ? iconButtonActiveClass : iconButtonClass}
                        onClick={() => setShowFontSelector(!showFontSelector)}
                    >
                        <Type size={20} />
                    </button>
                </Tooltip>

                {showFontSelector && (
                    <div className="absolute right-full mr-2 top-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64 z-[9999]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Font Family</h3>
                            <button
                                onClick={() => setShowFontSelector(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {fonts.map((font) => (
                                <button
                                    key={font.name}
                                    onClick={() => {
                                        onFontChange?.(font.name);
                                        setShowFontSelector(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${fontFamily === font.name
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'hover:bg-gray-100'
                                        }`}
                                    style={{ fontFamily: font.name }}
                                >
                                    {font.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="w-10 h-px bg-blue-200 my-2"></div>

            {/* Tailor Resume */}
            <Tooltip content="Tailor My Resume" position="left">
                <button
                    className={iconButtonClass}
                    onClick={() => router.push('/tailor')}
                >
                    <Trophy size={20} />
                </button>
            </Tooltip>


        </div>
    );
};

// Wrap with React.memo to prevent re-renders when props haven't changed
export default memo(SettingsSidebar);
