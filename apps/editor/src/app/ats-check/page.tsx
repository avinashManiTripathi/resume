"use client";

import { useState, Suspense, useCallback } from "react";
import { Upload, File, FileText, CheckCircle, XCircle, AlertCircle, Loader, TrendingUp, Award, RefreshCw, Sparkles, Download, Target, Shield, ArrowRight, BarChart3, Zap, X, Clock, Brain, Bell, Star } from 'lucide-react';
import { Button } from "@repo/ui/button";
import { StepLoader } from "@repo/ui/step-loader";
import { KeywordBanner } from "./KeywordBanner";
import { useRouter } from 'next/navigation';
import Image from "next/image";


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
    fixedData?: any
}

type Step = 'upload' | 'analyzing' | 'results';

const baseUrl = "https://profresume.com";

// Structured Data Schemas
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "ATS Checker",
            "item": `${baseUrl}/ats-checker`
        }
    ]
};

const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free ATS Resume Checker",
    "description": "Upload your resume and get instant AI-powered feedback on ATS compatibility, formatting, keywords, and optimization suggestions.",
    "url": `${baseUrl}/ats-checker`,
    "inLanguage": "en-US",
    "isPartOf": {
        "@type": "WebSite",
        "name": "ProfResume",
        "url": baseUrl
    }
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProfResume ATS Checker",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
    },
    "description": "Free AI-powered ATS resume checker that analyzes your resume for compatibility with Applicant Tracking Systems. Get instant feedback on formatting, keywords, and optimization suggestions.",
    "featureList": [
        "ATS Compatibility Score",
        "Keyword Analysis",
        "Format Check",
        "AI-Powered Suggestions",
        "Detailed Feedback"
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is an ATS resume checker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "An ATS resume checker is a tool that analyzes your resume to determine how well it will perform in Applicant Tracking Systems (ATS). It checks for formatting issues, keyword optimization, and overall compatibility with ATS software used by employers."
            }
        },
        {
            "@type": "Question",
            "name": "How does the ATS checker work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your resume (PDF or DOCX) and our AI-powered tool analyzes it for ATS compatibility. You'll get an instant score, detailed feedback on strengths and weaknesses, keyword analysis, and actionable suggestions to improve your resume."
            }
        },
        {
            "@type": "Question",
            "name": "Is the ATS checker really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our ATS resume checker is completely free to use. Upload your resume and get comprehensive analysis with no hidden costs or credit card required."
            }
        },
        {
            "@type": "Question",
            "name": "What file formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support PDF (.pdf) and Microsoft Word (.docx) file formats. These are the most common resume formats and are widely accepted by ATS systems."
            }
        }
    ]
};

export default function ATSCheckerPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [analysisStage, setAnalysisStage] = useState('');
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
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
                    setCurrentStageIndex(stageIndex);
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

    const handleFixResume = () => {
        const dataToStore = (result && result.fixedData) ? result.fixedData : null;
        if (dataToStore) {
            // Store extracted/fixed data in sessionStorage for the editor
            sessionStorage.setItem('parsedResumeData', JSON.stringify(dataToStore));
            // Redirect to editor with fromTailor flag to trigger import
            router.push('/editor?fromAtsCheck=true');
        }
    };

    const resetAnalysis = () => {
        setCurrentStep('upload');
        setFile(null);
        setResult(null);
        setProgress(0);
        setAnalysisStage('');
        setCurrentStageIndex(0);
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
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 tracking-tight">ATS Checker</h1>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">AI Optimization</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/editor')}
                            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            Back to Editor
                        </button>
                        <button
                            onClick={() => router.push('/editor')}
                            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </header>

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <main className="flex-1 bg-white pt-20">
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-blue-600" /></div>}>
                    {currentStep !== 'results' ? (
                        <div className="w-full relative">
                            {/* Upload Screen - Background when analyzing */}
                            <div className={`transition-all duration-700 ${currentStep === 'analyzing' ? "blur-md opacity-30 pointer-events-none scale-[0.98]" : ""}`}>
                                <div className="min-h-[calc(100vh-80px)] w-full border-b border-gray-100">
                                    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                                        {/* Left Column - Interaction */}
                                        <div className="relative z-10 p-8 md:p-12 lg:p-20 flex flex-col justify-center max-w-4xl mx-auto lg:mx-0 lg:max-w-none">
                                            <div className="space-y-4 mb-10">
                                                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-widest uppercase">
                                                    <div className="w-8 h-[2px] bg-blue-600" />
                                                    ATS Optimization
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                                                    Beat the <span className="text-blue-600">ATS Robots</span>
                                                </h2>
                                                <p className="text-gray-600 font-medium leading-relaxed max-w-md text-lg">
                                                    Upload your resume to receive an instant AI-powered compatibility score, keyword analysis, and actionable suggestions to beat the Applicant Tracking Systems.
                                                </p>
                                            </div>

                                            <div className="space-y-8">
                                                {/* Selection Choice */}
                                                <div className="flex items-center gap-8">
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                                        </div>
                                                        <span className="font-bold text-blue-600">Upload Resume</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                                        <span className="font-bold text-gray-400">Choose Save CV</span>
                                                    </label>
                                                </div>

                                                {/* Upload Zone */}
                                                <div
                                                    className={`relative group bg-white border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${isDragging ? "border-blue-600 bg-blue-50/50 scale-[1.02]" : "border-gray-100 hover:border-blue-200"
                                                        }`}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDrop}
                                                >
                                                    {!file ? (
                                                        <div className="text-center space-y-4">
                                                            <input
                                                                type="file"
                                                                id="resume-upload"
                                                                accept=".pdf,.docx"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                            />
                                                            <label
                                                                htmlFor="resume-upload"
                                                                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 cursor-pointer hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 group"
                                                            >
                                                                <div className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform">
                                                                    <Upload className="w-5 h-5" />
                                                                </div>
                                                                <span>Upload Resume</span>
                                                            </label>
                                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-4">PDF or DOCX (Max 10MB)</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between gap-4 p-2">
                                                            <div className="flex items-center gap-3 truncate">
                                                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                                                                    <FileText size={20} />
                                                                </div>
                                                                <div className="truncate text-left">
                                                                    <div className="font-bold text-gray-900 text-sm truncate">{file.name}</div>
                                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => setFile(null)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <div className="space-y-4">
                                                    <Button
                                                        onClick={analyzeResume}
                                                        disabled={!file}
                                                        className="w-full relative overflow-hidden group py-4 md:py-8 rounded-2xl text-xl font-black bg-blue-600 hover:bg-blue-700 text-white shadow-[0_20px_40px_-5px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:shadow-none transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 border border-blue-400/30"
                                                    >
                                                        {/* Shimmer Effect */}
                                                        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[45deg] animate-shimmer pointer-events-none mb-0 pb-0" />

                                                        <div className="relative z-10 flex items-center gap-3">
                                                            <span>Analyze Resume Now</span>
                                                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
                                                                <ArrowRight className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                    </Button>

                                                    <div className="flex items-center gap-4">
                                                        <label className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                                                            <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                                                                <div className="w-2.5 h-2.5 rounded-sm bg-blue-600 scale-0 group-hover:scale-100 transition-transform" />
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-700">Add a cover letter</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {error && (
                                                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold text-sm flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
                                                    <XCircle size={18} />
                                                    {error}
                                                </div>
                                            )}

                                            {/* Features Section - Inline for Upload Step */}
                                            <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-gray-50">
                                                {[
                                                    { icon: <Target className="text-blue-600" size={28} />, title: "Keyword Match", desc: "AI comparison with top job descriptions." },
                                                    { icon: <BarChart3 className="text-blue-600" size={28} />, title: "Impact Score", desc: "Quantifiable metrics analysis." },
                                                    { icon: <Award className="text-blue-600" size={28} />, title: "Format Check", desc: "100% ATS-ready layout verify." }
                                                ].map((f, i) => (
                                                    <div key={i} className="space-y-3">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                                            {f.icon}
                                                        </div>
                                                        <h4 className="text-base font-bold text-gray-900">{f.title}</h4>
                                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column - Neural Scanner Hub */}
                                        <div className="hidden lg:flex sticky top-20 self-start bg-slate-50 items-start justify-center pt-32 p-12 overflow-hidden border-l border-gray-100 min-h-[calc(100vh-80px)]">
                                            {/* Advanced Background Decorations */}
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#EFF6FF_0%,transparent_50%)]" />
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#F5F3FF_0%,transparent_50%)]" />

                                            {/* Geometric Grid Pattern */}
                                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                                            <div className="relative w-full max-w-lg aspect-square">
                                                {/* Main Scanner Container */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {/* Central Document Card */}
                                                    <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative overflow-hidden animate-float-slow">
                                                        {/* Scanning Laser Line */}
                                                        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20 animate-scan shadow-[0_0_15px_rgba(37,99,235,0.5)]" />

                                                        {/* Abstract Resume Content */}
                                                        <div className="space-y-6 opacity-40">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-lg bg-gray-100" />
                                                                <div className="flex-1 space-y-2">
                                                                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                                                                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div className="h-2 bg-gray-100 rounded w-full" />
                                                                <div className="h-2 bg-gray-100 rounded w-full" />
                                                                <div className="h-2 bg-gray-100 rounded w-5/6" />
                                                            </div>
                                                            <div className="pt-4 space-y-4">
                                                                <div className="h-4 bg-gray-100 rounded w-1/3" />
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="h-8 bg-gray-50 rounded-lg" />
                                                                    <div className="h-8 bg-gray-50 rounded-lg" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* AI Highlights during scan */}
                                                        <div className="absolute inset-0 p-6 flex flex-col justify-around pointer-events-none">
                                                            <div className="w-fit px-3 py-1 bg-green-500/10 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-500/20 translate-x-20 animate-pulse">✓ Perfect Header</div>
                                                            <div className="w-fit px-3 py-1 bg-blue-500/10 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20 -translate-x-4 animate-pulse delay-700">🔍 Skills Detected</div>
                                                            <div className="w-fit px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-500/20 translate-x-12 animate-pulse delay-1000">⚡ Impact Missing</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Floating Metric Chips */}
                                                <div className="absolute top-10 right-0 animate-float-medium delay-300">
                                                    <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                                            <BarChart3 size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</p>
                                                            <p className="text-lg font-black text-gray-900">+340%</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-16 left-0 animate-float-medium">
                                                    <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 space-y-3 w-48">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Match</span>
                                                            <CheckCircle size={14} className="text-green-500" />
                                                        </div>
                                                        <div className="flex -space-x-2">
                                                            {[1, 2, 3, 4].map(i => (
                                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center shadow-sm overflow-hidden">
                                                                    <img src={`https://logo.clearbit.com/${['google.com', 'amazon.com', 'meta.com', 'netflix.com'][i - 1]}`} alt="" className="w-4 h-4 grayscale opacity-70" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-[11px] font-bold text-gray-600">Perfect for FAANG roles</p>
                                                    </div>
                                                </div>

                                                {/* Success Indicator */}
                                                <div className="absolute bottom-0 right-10 animate-bounce">
                                                    <div className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-green-200 text-xs font-black flex items-center gap-2">
                                                        <Shield size={14} />
                                                        <span>ATS Approved v2.0</span>
                                                    </div>
                                                </div>

                                                {/* Orbiting Decorates */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-blue-100 rounded-full opacity-50 animate-[spin_60s_linear_infinite]" />
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full blur-sm animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Overlay for Analyzing */}
                            {currentStep === 'analyzing' && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm animate-in fade-in duration-300">
                                    <div className="max-w-xl w-full bg-white border border-gray-100 rounded-[3rem] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] space-y-10 animate-in zoom-in slide-in-from-bottom-4 duration-300">
                                        <div className="space-y-4 text-center">
                                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-200 animate-bounce">
                                                <Brain size={32} />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-3xl font-black text-gray-900 leading-tight">AI Analysis in Progress</h3>
                                                <p className="text-gray-500 font-medium">Scanning your resume for maximum compatibility</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100/50">
                                            <StepLoader
                                                steps={[
                                                    'Extracting text from resume...',
                                                    'Analyzing content quality...',
                                                    'Checking ATS compatibility...',
                                                    'Evaluating keywords...',
                                                    'Generating insights...'
                                                ]}
                                                currentStep={currentStageIndex}
                                                size="md"
                                                className="max-w-md mx-auto font-bold"
                                            />
                                        </div>

                                        <div className="text-center">
                                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100/50 animate-pulse">
                                                <Loader className="w-3.5 h-3.5 animate-spin" />
                                                {progress}% Complete
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
                            {/* Results Header - Premium Dashboard Style */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl shadow-blue-900/20">
                                {/* Background Decorations */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                                    <div className="flex flex-col md:flex-row items-center gap-10">
                                        {/* Score Gauge */}
                                        <div className="relative w-44 h-44">
                                            <svg className="w-full h-full -rotate-90">
                                                <circle cx="88" cy="88" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                                                <circle
                                                    cx="88" cy="88" r="80"
                                                    stroke={result?.score && result.score >= 80 ? "#22c55e" : result?.score && result.score >= 60 ? "#f59e0b" : "#ef4444"}
                                                    strokeWidth="12"
                                                    fill="none"
                                                    strokeDasharray={`${2 * Math.PI * 80}`}
                                                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - (result?.score || 0) / 100)}`}
                                                    className="transition-all duration-1000 ease-out"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black">{result?.score}</span>
                                                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest mt-1 text-center leading-tight">ATS<br />Score</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-center md:text-left">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                                                <Sparkles size={12} /> Optimization Report
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black leading-tight">
                                                CV Analysis <span className="text-blue-500">Result</span>
                                            </h2>
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                                {result?.score && result.score >= 80 ? (
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-xl text-sm font-bold border border-green-500/20">
                                                        <CheckCircle size={18} /> High Compatibility
                                                    </div>
                                                ) : result?.score && result.score >= 60 ? (
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-xl text-sm font-bold border border-amber-500/20">
                                                        <AlertCircle size={18} /> Moderate Match
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm font-bold border border-red-500/20">
                                                        <XCircle size={18} /> Critical Fixes Needed
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-xl text-sm font-bold border border-white/10">
                                                    <Clock size={16} /> Analysis took 2.4s
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                        <button
                                            onClick={resetAnalysis}
                                            className="h-16 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-gray-200 flex items-center justify-center gap-3 shrink-0 group"
                                        >
                                            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                                            <span className="font-bold">New Scan</span>
                                        </button>
                                        <Button
                                            onClick={handleFixResume}
                                            className="h-16 flex-1 lg:flex-none px-10 rounded-2xl font-black text-xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-900/40"
                                        >
                                            <Zap size={22} className="fill-white" />
                                            Fix with AI
                                            <ArrowRight size={22} />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Breakdown Grid */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Insights Panel */}
                                    <div className="space-y-8">
                                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-50/50 space-y-6">
                                            <div className="flex items-center gap-3 text-green-600">
                                                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                                    <CheckCircle size={20} />
                                                </div>
                                                <h3 className="text-xl font-bold">Key Strengths</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {result?.feedback.strengths.map((s, i) => (
                                                    <li key={i} className="text-[13px] font-bold text-gray-800 flex gap-3 leading-relaxed">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-50/50 space-y-6 flex flex-col">
                                            <div className="flex items-center gap-3 text-red-600 mb-2">
                                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                                    <XCircle size={20} />
                                                </div>
                                                <h3 className="text-xl font-bold">Weaknesses</h3>
                                            </div>
                                            <div className="grid gap-3 flex-1">
                                                {result?.feedback.weaknesses.map((w, i) => (
                                                    <div key={i} className="p-4 bg-red-50/30 rounded-2xl border border-red-100/50 flex items-start gap-3 group hover:border-red-200 transition-all">
                                                        <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                                                            !
                                                        </div>
                                                        <p className="text-gray-800 text-[13px] font-bold leading-relaxed">{w}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Optimization Strategy */}
                                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-50/50 p-10 space-y-8 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                                            <Brain size={120} />
                                        </div>
                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                                <TrendingUp size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900">Optimization Roadmap</h3>
                                                <p className="text-sm text-gray-400 font-medium">Actionable steps generated by AI</p>
                                            </div>
                                        </div>
                                        <div className="grid gap-4 relative z-10">
                                            {result?.feedback.suggestions.map((s, i) => (
                                                <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4 group hover:border-blue-200 transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                                                        0{i + 1}
                                                    </div>
                                                    <p className="text-gray-700 font-medium leading-relaxed">{s}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar - Technical Checks */}
                                <div className="space-y-8 sticky top-24 self-start">
                                    {/* Keyword Analysis */}
                                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-50/50 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-gray-900">Keywords</h3>
                                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                                <Target size={18} />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Found</div>
                                                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">{result?.keywords.found.length}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {result?.keywords.found.map((k, i) => (
                                                        <span key={i} className="px-3 py-1 bg-white border border-gray-100 text-gray-600 text-[11px] font-bold rounded-lg shadow-sm">
                                                            {k}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Missing</div>
                                                    <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{result?.keywords.missing.length}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {result?.keywords.missing.map((k, i) => (
                                                        <span key={i} className="px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-lg">
                                                            {k}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ATS Formatting */}
                                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-50/50 space-y-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                                        <div className="flex items-center justify-between relative z-10">
                                            <h3 className="text-xl font-bold text-gray-900">Formatting</h3>
                                            <div className="text-2xl font-black text-blue-600">{result?.formatting.score}%</div>
                                        </div>
                                        {result?.formatting.issues.length ? (
                                            <ul className="space-y-3 relative z-10">
                                                {result.formatting.issues.map((issue, i) => (
                                                    <li key={i} className="text-xs font-bold text-gray-700 flex gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                                        {issue}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="relative z-10 flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                                                <CheckCircle size={18} className="text-green-500" />
                                                <p className="text-[11px] text-green-700 font-bold leading-tight">
                                                    Perfect formatting compatibility with modern ATS.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pro Tip */}
                                    <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white space-y-3 shadow-xl shadow-blue-200">
                                        <Award size={24} className="text-blue-200" />
                                        <h4 className="font-bold text-lg">Pro Insight</h4>
                                        <p className="text-xs text-blue-100 font-medium leading-relaxed">
                                            Resumes with a score over 85% are 3x more likely to clear the initial screening phase.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Suspense>
            </main>
        </div>
    );
}
