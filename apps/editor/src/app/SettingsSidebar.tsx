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



        </div>
    );
}
