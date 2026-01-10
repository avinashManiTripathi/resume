import { Sparkles } from "lucide-react";

export function SectionBadge({ icon, label }: { icon?: React.ReactNode, label: string }) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
            {icon}
            {label}
        </div>
    )
}