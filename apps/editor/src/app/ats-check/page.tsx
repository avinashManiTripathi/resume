"use client";

import { useState, Suspense, useCallback } from "react";
import { Upload, File, FileText, CheckCircle, XCircle, AlertCircle, Loader, TrendingUp, Award, RefreshCw, Sparkles, Download, Target, Shield, ArrowRight, BarChart3, Zap, X } from 'lucide-react';
import { Button } from "@repo/ui/button";
import { KeywordBanner } from "./KeywordBanner";
import { useRouter } from 'next/navigation';


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


            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Target className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">ATS Resume Checker</h1>
                            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">Check your resume's ATS compatibility</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/editor')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 min-w-[40px] min-h-[40px]"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

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
            {/* Two Column Layout - Upload Always Visible */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8 p-4 md:p-8">
                {/* Left Column - SEO Content & Features (2/5 width) */}
                <div className="lg:col-span-2">
                    <div className="lg:sticky lg:top-8 space-y-6 mb-[16px]">
                        {/* Upload Card - Always Visible */}
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
                                            className="flex text-white items-center justify-center mx-auto w-fit gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all"
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

                        {/* Critical ATS Issues Warning - NEW */}
                        {result && result.detailedAnalysis && result.detailedAnalysis.atsCompatibility.criticalIssues.length > 0 && (
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
                        </div>


                    </div>
                </div>











                {/* Right Column - Upload Section (3/5 width, sticky) */}
                <div className="lg:col-span-3 space-y-8">




                    {/* Quick Stats */}
                    {currentStep !== 'results' && <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center shadow-lg">
                            <div className="text-3xl font-bold mb-1">95%</div>
                            <div className="text-sm opacity-90">Fortune 500 Use ATS</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center shadow-lg">
                            <div className="text-3xl font-bold mb-1">75%</div>
                            <div className="text-sm opacity-90">Resumes Rejected</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center shadow-lg">
                            <div className="text-3xl font-bold mb-1">30s</div>
                            <div className="text-sm opacity-90">Analysis Time</div>
                        </div>
                    </div>}

                    {/* Visual Feature Cards */}
                    {currentStep !== 'results' && <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-indigo-300 transition-all shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Target size={32} className="text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 AI-Powered Analysis</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Our advanced AI simulates how real ATS systems scan your resume. Get instant feedback on keyword optimization, formatting issues, and ATS compatibility scores.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 transition-all shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">✅ Detailed Recommendations</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Receive specific, actionable suggestions to improve your resume. Fix formatting errors, add missing keywords, and optimize section structure for maximum ATS compatibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Shield size={32} className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">🔒 100% Private & Secure</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Your resume is never stored on our servers. All analysis happens in real-time and your data is immediately deleted after providing results. Complete privacy guaranteed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {/* How It Works - Visual Steps */}
                    {currentStep !== 'results' && <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
                        <div className="space-y-4">
                            {[
                                { icon: '📤', title: 'Upload Resume', desc: 'Drag & drop your PDF or Word resume' },
                                { icon: '🤖', title: 'AI Analysis', desc: 'Our AI scans for ATS compatibility issues' },
                                { icon: '📊', title: 'Get Score', desc: 'Receive detailed feedback and score (0-100)' },
                                { icon: '✨', title: 'Improve', desc: 'Apply recommendations and re-check for free' }
                            ].map((step, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 flex items-center gap-3">
                                        <span className="text-3xl">{step.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{step.title}</h4>
                                            <p className="text-sm text-gray-600">{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}

                    {/* Trust Indicators */}
                    {currentStep !== 'results' && <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">Trusted by Job Seekers Worldwide</h3>
                            <p className="opacity-90">Over 50,000 resumes checked this month</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-4xl mb-2">⭐</div>
                                <div className="font-bold text-2xl">4.9/5</div>
                                <div className="text-sm opacity-80">User Rating</div>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">💼</div>
                                <div className="font-bold text-2xl">85%</div>
                                <div className="text-sm opacity-80">Interview Rate</div>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">🚀</div>
                                <div className="font-bold text-2xl">Free</div>
                                <div className="text-sm opacity-80">Forever</div>
                            </div>
                        </div>
                    </div>}


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

                                {result.fixedData && (
                                    <div className="mt-8">
                                        <button
                                            onClick={handleFixResume}
                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 group"
                                        >
                                            <Sparkles size={22} className="group-hover:animate-pulse" />
                                            <span className="text-lg">Fix Your Resume Now</span>
                                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <p className="text-center text-xs text-gray-500 mt-2">
                                            AI has pre-filled the editor with your resume details
                                        </p>
                                    </div>
                                )}
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


                    {/* Right Section - Stepper & Info */}
                    <div className="space-y-6">
                        {/* Keywords & Formatting (Only show in results) */}
                        {currentStep === 'results' && result && (
                            <>

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
