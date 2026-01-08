"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Cover Letter Landing Page
 * Redirects to template selection
 */
export default function CoverLetterPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/cover-letter/templates");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Cover Letter Builder</h1>
                <p className="text-gray-600">Redirecting to template selection...</p>
            </div>
        </div>
    );
}
