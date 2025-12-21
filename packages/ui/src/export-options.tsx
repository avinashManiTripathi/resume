"use client";

import { FileText, File } from "lucide-react";

interface ExportOptionsProps {
    onExport: (format: "pdf" | "doc") => void;
    pdfSize?: string;
    docSize?: string;
}

export function ExportOptions({
    onExport,
    pdfSize = "1.25 Mb",
    docSize = "1.33 Mb",
}: ExportOptionsProps) {
    return (
        <div className="space-y-2">
            <button
                onClick={() => onExport("pdf")}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-gray-900">PDF</span>
                </div>
                <span className="text-sm text-gray-500">{pdfSize}</span>
            </button>
            <button
                onClick={() => onExport("doc")}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">DOC</span>
                </div>
                <span className="text-sm text-gray-500">{docSize}</span>
            </button>
        </div>
    );
}
