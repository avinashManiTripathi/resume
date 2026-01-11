"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, CheckCircle, AlertTriangle, Lightbulb,
    TrendingUp, FileText, Sparkles, Check, X, ChevronDown, ChevronUp
} from 'lucide-react';

interface Suggestion {
    id: string;
    type: 'keyword' | 'content' | 'format';
    section: string;
    current: string;
    suggested: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
}

interface AnalysisResults {
    matchScore: number;
    atsScore: number;
    keywords: {
        present: string[];
        missing: string[];
    };
    suggestions: Suggestion[];
    strengths: string[];
    weaknesses: string[];
}

export default function TailorResults() {
    const router = useRouter();
    const [analysis, setAnalysis] = useState<AnalysisResults | null>(null);
    const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
    const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

    useEffect(() => {
        // Load results from sessionStorage
        const resultsData = sessionStorage.getItem('tailorResults');
        if (resultsData) {
            setAnalysis(JSON.parse(resultsData));
        } else {
            // No results, redirect back
            router.push('/tailor');
        }
    }, [router]);

    const applySuggestion = (suggestionId: string) => {
        setAppliedSuggestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(suggestionId)) {
                newSet.delete(suggestionId);
            } else {
                newSet.add(suggestionId);
            }
            return newSet;
        });
    };

    const applyAllSuggestions = () => {
        if (!analysis) return;
        const allIds = new Set(analysis.suggestions.map(s => s.id));
        setAppliedSuggestions(allIds);

        // TODO: Actually apply to resume
        alert('All suggestions applied! Redirecting to editor...');
        setTimeout(() => router.push('/editor'), 1500);
    };

    if (!analysis) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading results...</p>
                </div>
            </div>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score: number) => {
        if (score >= 80) return 'bg-green-100';
        if (score >= 60) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'low': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <button
                        onClick={() => router.push('/tailor')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                    <button
                        onClick={applyAllSuggestions}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        Apply All Suggestions
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Scores */}
                    <div className="space-y-6">
                        {/* Match Score */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Score</h3>
                            <div className="flex flex-col items-center">
                                <div className={`text-5xl font-bold ${getScoreColor(analysis.matchScore)} mb-2`}>
                                    {analysis.matchScore}%
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                    <div
                                        className={`h-3 rounded-full transition-all ${analysis.matchScore >= 80 ? 'bg-green-500' :
                                            analysis.matchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${analysis.matchScore}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 text-center">
                                    {analysis.matchScore >= 80 ? 'Excellent match!' :
                                        analysis.matchScore >= 60 ? 'Good match with room for improvement' :
                                            'Needs significant optimization'}
                                </p>
                            </div>
                        </div>

                        {/* ATS Score */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">ATS Compatibility</h3>
                            <div className="flex flex-col items-center">
                                <div className={`text-5xl font-bold ${getScoreColor(analysis.atsScore)} mb-2`}>
                                    {analysis.atsScore}%
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                    <div
                                        className={`h-3 rounded-full transition-all ${analysis.atsScore >= 80 ? 'bg-green-500' :
                                            analysis.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${analysis.atsScore}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 text-center">
                                    {analysis.atsScore >= 80 ? 'ATS-friendly format' :
                                        analysis.atsScore >= 60 ? 'Some formatting issues' :
                                            'Needs formatting improvements'}
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Suggestions</span>
                                    <span className="font-semibold text-gray-900">{analysis.suggestions.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Missing Keywords</span>
                                    <span className="font-semibold text-red-600">{analysis.keywords.missing.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Matched Keywords</span>
                                    <span className="font-semibold text-green-600">{analysis.keywords.present.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Applied</span>
                                    <span className="font-semibold text-blue-600">{appliedSuggestions.size}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Analysis Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Strengths */}
                        {analysis.strengths.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
                                </div>
                                <ul className="space-y-2">
                                    {analysis.strengths.map((strength, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Missing Keywords */}
                        {analysis.keywords.missing.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Missing Keywords ({analysis.keywords.missing.length})
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.keywords.missing.map((keyword, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggestions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Lightbulb className="w-5 h-5 text-yellow-600" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Suggestions ({analysis.suggestions.length})
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {analysis.suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.id}
                                        className={`border-2 rounded-xl p-4 transition-all ${appliedSuggestions.has(suggestion.id)
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                                                        {suggestion.priority}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-600">{suggestion.section}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">{suggestion.reason}</p>

                                                <button
                                                    onClick={() => setExpandedSuggestion(
                                                        expandedSuggestion === suggestion.id ? null : suggestion.id
                                                    )}
                                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    {expandedSuggestion === suggestion.id ? (
                                                        <>
                                                            <ChevronUp className="w-4 h-4" />
                                                            Hide details
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="w-4 h-4" />
                                                            View details
                                                        </>
                                                    )}
                                                </button>

                                                {expandedSuggestion === suggestion.id && (
                                                    <div className="mt-4 space-y-3">
                                                        <div>
                                                            <div className="text-xs font-medium text-gray-500 mb-1">Current:</div>
                                                            <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                                                                {suggestion.current || 'Not present'}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-medium text-gray-500 mb-1">Suggested:</div>
                                                            <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-900">
                                                                {suggestion.suggested}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => applySuggestion(suggestion.id)}
                                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex-shrink-0 ${appliedSuggestions.has(suggestion.id)
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                {appliedSuggestions.has(suggestion.id) ? 'Applied' : 'Apply'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
