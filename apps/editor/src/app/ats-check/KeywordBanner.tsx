"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";

const keywordMessages: Record<string, { title: string; description: string }> = {
    'free-ats-checker': {
        title: '100% Free ATS Checker - No Sign Up Required',
        description: 'Test your resume instantly with our completely free ATS compatibility checker. No registration, no credit card, no hidden fees.'
    },
    'ats-resume-test': {
        title: 'Test Your Resume Against Real ATS Systems',
        description: 'See exactly how Applicant Tracking Systems will read your resume. Get actionable insights to improve your pass rate.'
    },
    'resume-scanner': {
        title: 'AI-Powered Resume Scanner',
        description: 'Advanced AI technology scans your resume just like real ATS systems. Get instant, detailed feedback in seconds.'
    },
    'ats-score': {
        title: 'Get Your ATS Compatibility Score',
        description: 'Receive a detailed ATS score (0-100) plus comprehensive feedback on what to improve for better results.'
    }
};

export function KeywordBanner() {
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState<string | null>(null);

    useEffect(() => {
        const utm_content = searchParams.get('utm_content');
        const source = searchParams.get('source');
        const ref = searchParams.get('ref');
        const keyword_param = searchParams.get('keyword');

        const detectedKeyword = utm_content || source || ref || keyword_param;
        if (detectedKeyword) {
            setKeyword(detectedKeyword.toLowerCase());
        }
    }, [searchParams]);

    const currentKeywordMessage = keyword ? keywordMessages[keyword] : null;

    if (!currentKeywordMessage) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-xl border-2 border-blue-700">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {currentKeywordMessage.title}
                        </h2>
                        <p className="text-blue-100 text-lg">
                            {currentKeywordMessage.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
