"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Sparkles, TrendingUp, Award, Zap, ArrowRight, RefreshCw, Target, BarChart3, File } from "lucide-react";

import { Button } from "@repo/ui/button";


interface ATSResult {
    score: number;
    feedback: {
        strengths: string[];
        weaknesses: string[];
        suggestions: string[];
    };
    keywords: {
        found: string[];
        missing: string[];
    };
    formatting: {
        score: number;
        issues: string[];
    };
    detailedAnalysis?: {
        contactInfo: {
            score: number;
            issues: string[];
        };
        sectionStructure: {
            score: number;
            issues: string[];
        };
        achievements: {
            score: number;
            quantifiableCount: number;
            issues: string[];
        };
        atsCompatibility: {
            score: number;
            criticalIssues: string[];
            warnings: string[];
        };
    };
}

type Step = 'upload' | 'analyzing' | 'results';

export default function ATSCheckerPage() {
    const [currentStep, setCurrentStep] = useState<Step>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [analysisStage, setAnalysisStage] = useState('');
    const [result, setResult] = useState<ATSResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFile(droppedFile);
            setError(null);
        } else {
            setError("Please upload a PDF or DOCX file");
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        }
    };

    const analyzeResume = async () => {
        if (!file) return;

        setCurrentStep('analyzing');
        setProgress(0);
        setError(null);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("resume", file);

            const stages = [
                { progress: 20, message: 'Extracting text from resume...' },
                { progress: 40, message: 'Analyzing content quality...' },
                { progress: 60, message: 'Checking ATS compatibility...' },
                { progress: 80, message: 'Evaluating keywords...' },
                { progress: 95, message: 'Generating insights...' }
            ];

            let stageIndex = 0;
            const stageInterval = setInterval(() => {
                if (stageIndex < stages.length) {
                    setProgress(stages[stageIndex].progress);
                    setAnalysisStage(stages[stageIndex].message);
                    stageIndex++;
                } else {
                    clearInterval(stageInterval);
                }
            }, 800);

            const response = await fetch("https://api.profresume.com/api/ats/check", {
                method: "POST",
                body: formData,
            });

            clearInterval(stageInterval);
            setProgress(100);
            setAnalysisStage('Analysis complete!');

            if (!response.ok) {
                throw new Error("Failed to analyze resume");
            }

            const data = await response.json();
            await new Promise(resolve => setTimeout(resolve, 500));

            setResult(data);
            setCurrentStep('results');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setCurrentStep('upload');
        }
    };

    const resetAnalysis = () => {
        setCurrentStep('upload');
        setFile(null);
        setResult(null);
        setProgress(0);
        setAnalysisStage('');
        setError(null);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-orange-600";
        return "text-red-600";
    };

    const getScoreGradient = (score: number) => {
        if (score >= 80) return "from-green-500 to-emerald-500";
        if (score >= 60) return "from-orange-500 to-amber-500";
        return "from-red-500 to-rose-500";
    };

    const steps = [
        { id: 1, name: 'Upload Resume', status: currentStep === 'upload' ? 'current' : currentStep === 'analyzing' || currentStep === 'results' ? 'complete' : 'upcoming' },
        { id: 2, name: 'AI Analysis', status: currentStep === 'analyzing' ? 'current' : currentStep === 'results' ? 'complete' : 'upcoming' },
        { id: 3, name: 'View Results', status: currentStep === 'results' ? 'current' : 'upcoming' }
    ];

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 border border-indigo-200 rounded-full text-sm font-semibold mb-4 text-indigo-700">
                        <Sparkles size={16} />
                        AI-Powered ATS Analysis
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 mb-3">
                        Resume ATS Checker
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get instant AI feedback on your resume's compatibility with Applicant Tracking Systems
                    </p>
                </div>

                {/* Two Section Layout */}
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
                    {/* Left Section - Main Content */}
                    <div>
                        {/* Upload Step */}
                        {currentStep === 'upload' && (
                            <div
                                className={`bg-white border-2 rounded-2xl p-12 shadow-lg transition-all ${isDragging ? "border-indigo-500 scale-105 shadow-indigo-200" : "border-gray-200"
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {!file ? (
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-indigo-600 from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                            <Upload size={48} className="font-bold  text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Your Resume</h3>
                                        <p className="text-gray-600 mb-6">Drag & drop your resume here, or click to browse</p>
                                        <input
                                            type="file"
                                            id="resume-upload"
                                            accept=".pdf,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="resume-upload"
                                            className="flex text-white items-center justify-center mx-auto w-fit border border-blue-500 items-center gap-2 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-grey-200 px-8 py-3 rounded-xl font-semibold cursor-pointer text-blue-600 transition-all"
                                        >
                                            <File size={20} />
                                            Choose File
                                        </label>
                                        <p className="text-sm text-gray-500 mt-4">Supports PDF and DOCX (Max 10MB)</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <FileText size={40} className="text-indigo-600" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">{file.name}</h4>
                                                <p className="text-gray-600 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button onClick={() => setFile(null)} className="text-red-600 hover:text-red-700 font-semibold">
                                                Remove
                                            </button>
                                        </div>


                                        <Button onClick={analyzeResume}>
                                            <Sparkles size={20} />
                                            Analyze with AI
                                            <ArrowRight size={20} />
                                        </Button>
                                        {error && (
                                            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                                                <XCircle size={20} />
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Analyzing Step */}
                        {currentStep === 'analyzing' && (
                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-lg">
                                <div className="relative w-48 h-48 mx-auto mb-8">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                                        <circle
                                            cx="96" cy="96" r="88"
                                            stroke="url(#grad)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 88}`}
                                            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                                            className="transition-all duration-500"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="grad">
                                                <stop offset="0%" stopColor="#6366f1" />
                                                <stop offset="100%" stopColor="#a855f7" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-5xl font-black text-gray-900">{progress}%</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Resume</h3>
                                    <p className="text-indigo-600 font-medium">{analysisStage}</p>
                                </div>
                            </div>
                        )}

                        {/* Results Step */}
                        {currentStep === 'results' && result && (
                            <div className="space-y-6">
                                {/* Score Card */}
                                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-6">
                                            <div className={`text-7xl font-black ${getScoreColor(result.score)}`}>
                                                {result.score}
                                                <span className="text-3xl text-gray-400">/100</span>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900 mb-1">ATS Score</h2>
                                                <p className="text-gray-600">
                                                    {result.score >= 80 && "🎉 Excellent!"}
                                                    {result.score >= 60 && result.score < 80 && "👍 Good!"}
                                                    {result.score < 60 && "⚠️ Needs work"}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={resetAnalysis}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all"
                                        >
                                            <RefreshCw size={20} />
                                            New
                                        </button>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${getScoreGradient(result.score)} transition-all duration-1000`}
                                            style={{ width: `${result.score}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Detailed Analysis Cards - NEW */}
                                {result.detailedAnalysis && (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Contact Info */}
                                        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <FileText size={16} className="text-blue-600" />
                                                    </div>
                                                    <h4 className="font-bold text-gray-900 text-sm">Contact Info</h4>
                                                </div>
                                                <span className={`text-xl font-bold ${getScoreColor(result.detailedAnalysis.contactInfo.score)}`}>
                                                    {result.detailedAnalysis.contactInfo.score}
                                                </span>
                                            </div>
                                            {result.detailedAnalysis.contactInfo.issues.length > 0 && (
                                                <ul className="space-y-1">
                                                    {result.detailedAnalysis.contactInfo.issues.slice(0, 2).map((issue, idx) => (
                                                        <li key={idx} className="text-xs text-gray-600 flex gap-1">
                                                            <span className="text-orange-500">•</span>
                                                            <span>{issue}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Section Structure */}
                                        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <BarChart3 size={16} className="text-purple-600" />
                                                    </div>
                                                    <h4 className="font-bold text-gray-900 text-sm">Section Structure</h4>
                                                </div>
                                                <span className={`text-xl font-bold ${getScoreColor(result.detailedAnalysis.sectionStructure.score)}`}>
                                                    {result.detailedAnalysis.sectionStructure.score}
                                                </span>
                                            </div>
                                            {result.detailedAnalysis.sectionStructure.issues.length > 0 && (
                                                <ul className="space-y-1">
                                                    {result.detailedAnalysis.sectionStructure.issues.slice(0, 2).map((issue, idx) => (
                                                        <li key={idx} className="text-xs text-gray-600 flex gap-1">
                                                            <span className="text-orange-500">•</span>
                                                            <span>{issue}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Achievements */}
                                        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <Award size={16} className="text-green-600" />
                                                    </div>
                                                    <h4 className="font-bold text-gray-900 text-sm">Achievements</h4>
                                                </div>
                                                <span className={`text-xl font-bold ${getScoreColor(result.detailedAnalysis.achievements.score)}`}>
                                                    {result.detailedAnalysis.achievements.score}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2">
                                                <span className="font-semibold">{result.detailedAnalysis.achievements.quantifiableCount}</span> quantifiable achievements found
                                            </p>
                                            {result.detailedAnalysis.achievements.issues.length > 0 && (
                                                <ul className="space-y-1">
                                                    {result.detailedAnalysis.achievements.issues.slice(0, 1).map((issue, idx) => (
                                                        <li key={idx} className="text-xs text-gray-600 flex gap-1">
                                                            <span className="text-orange-500">•</span>
                                                            <span>{issue}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* ATS Compatibility */}
                                        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                        <Target size={16} className="text-indigo-600" />
                                                    </div>
                                                    <h4 className="font-bold text-gray-900 text-sm">ATS Compatibility</h4>
                                                </div>
                                                <span className={`text-xl font-bold ${getScoreColor(result.detailedAnalysis.atsCompatibility.score)}`}>
                                                    {result.detailedAnalysis.atsCompatibility.score}
                                                </span>
                                            </div>
                                            {result.detailedAnalysis.atsCompatibility.criticalIssues.length > 0 && (
                                                <div className="space-y-1">
                                                    {result.detailedAnalysis.atsCompatibility.criticalIssues.slice(0, 2).map((issue, idx) => (
                                                        <div key={idx} className="flex gap-1 items-start">
                                                            <XCircle size={12} className="text-red-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-xs text-red-700">{issue}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Feedback Cards */}
                                <div className="grid gap-6">
                                    {/* Strengths */}
                                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                                <CheckCircle size={20} className="text-green-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {result.feedback.strengths.map((item, idx) => (
                                                <li key={idx} className="flex gap-2 text-sm text-gray-700">
                                                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Weaknesses */}
                                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                                <XCircle size={20} className="text-red-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Areas to Improve</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {result.feedback.weaknesses.map((item, idx) => (
                                                <li key={idx} className="flex gap-2 text-sm text-gray-700">
                                                    <XCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Suggestions */}
                                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                                <TrendingUp size={20} className="text-indigo-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Suggestions</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {result.feedback.suggestions.map((item, idx) => (
                                                <div key={idx} className="flex gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                                                    <Zap size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 text-xs">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section - Stepper & Info */}
                    <div className="space-y-6">
                        {/* Stepper */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Progress</h3>
                            <div className="space-y-6">
                                {steps.map((step, idx) => (
                                    <div key={step.id} className="flex items-start gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${step.status === 'complete' ? 'bg-green-500 text-white' :
                                                step.status === 'current' ? 'bg-indigo-600 text-white' :
                                                    'bg-gray-200 text-gray-500'
                                                }`}>
                                                {step.status === 'complete' ? <CheckCircle size={24} /> : step.id}
                                            </div>
                                            {idx < steps.length - 1 && (
                                                <div className={`w-0.5 h-16 mt-2 ${step.status === 'complete' ? 'bg-green-500' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <h4 className={`font-bold ${step.status === 'current' ? 'text-indigo-600' :
                                                step.status === 'complete' ? 'text-green-600' :
                                                    'text-gray-500'
                                                }`}>
                                                {step.name}
                                            </h4>
                                            {step.status === 'current' && currentStep === 'analyzing' && (
                                                <p className="text-sm text-gray-600 mt-1">{analysisStage}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Keywords & Formatting (Only show in results) */}
                        {currentStep === 'results' && result && (
                            <>
                                {/* Critical ATS Issues Warning - NEW */}
                                {result.detailedAnalysis && result.detailedAnalysis.atsCompatibility.criticalIssues.length > 0 && (
                                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                                <AlertCircle size={20} className="text-red-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-red-900">Critical ATS Issues</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {result.detailedAnalysis.atsCompatibility.criticalIssues.map((issue, idx) => (
                                                <div key={idx} className="flex gap-2 p-3 bg-red-100 border border-red-200 rounded-lg">
                                                    <XCircle size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
                                                    <span className="text-red-900 text-xs font-medium">{issue}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* ATS Warnings - NEW */}
                                {result.detailedAnalysis && result.detailedAnalysis.atsCompatibility.warnings.length > 0 && (
                                    <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <AlertCircle size={20} className="text-orange-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-orange-900">ATS Warnings</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {result.detailedAnalysis.atsCompatibility.warnings.map((warning, idx) => (
                                                <div key={idx} className="flex gap-2 p-2 bg-orange-100 border border-orange-200 rounded-lg">
                                                    <AlertCircle size={14} className="text-orange-700 flex-shrink-0 mt-0.5" />
                                                    <span className="text-orange-900 text-xs">{warning}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Target size={20} className="text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Keywords Found</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {result.keywords.found.map((kw, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-lg text-xs font-medium">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                            <AlertCircle size={20} className="text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Missing Keywords</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {result.keywords.missing.map((kw, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                                <BarChart3 size={20} className="text-purple-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Formatting</h3>
                                        </div>
                                        <span className={`text-3xl font-bold ${getScoreColor(result.formatting.score)}`}>
                                            {result.formatting.score}
                                        </span>
                                    </div>
                                    {result.formatting.issues.length > 0 && (
                                        <div className="space-y-2">
                                            {result.formatting.issues.map((issue, idx) => (
                                                <div key={idx} className="flex gap-2 p-2 bg-orange-50 border border-orange-100 rounded-lg">
                                                    <AlertCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 text-xs">{issue}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Info Card (Show when not in results) */}
                        {currentStep !== 'results' && (
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-2xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Comprehensive ATS Analysis</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Format Compatibility</p>
                                            <p className="text-sm text-gray-600">Tables, columns, special formatting</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Section Structure</p>
                                            <p className="text-sm text-gray-600">Standard headers and organization</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Contact Information</p>
                                            <p className="text-sm text-gray-600">Email, phone, LinkedIn profile</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Keywords & Action Verbs</p>
                                            <p className="text-sm text-gray-600">Industry-specific terms</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Quantifiable Achievements</p>
                                            <p className="text-sm text-gray-600">Numbers, metrics, impact</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Content Quality</p>
                                            <p className="text-sm text-gray-600">Clarity, grammar, professionalism</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}
