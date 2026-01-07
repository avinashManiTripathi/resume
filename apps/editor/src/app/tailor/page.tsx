"use client";

import { useState } from 'react';
import { Upload, FileText, Sparkles, ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';

export default function TailorResume() {
    const router = useRouter();
    const [resumeSource, setResumeSource] = useState<'current' | 'upload'>('current');
    const [jobDescription, setJobDescription] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Progress tracking
    const [currentStage, setCurrentStage] = useState(0);
    const stages = [
        { id: 1, name: 'Uploading', icon: Upload, description: 'Uploading your resume...' },
        { id: 2, name: 'Extracting', icon: FileText, description: 'Extracting text from PDF...' },
        { id: 3, name: 'Analyzing', icon: Sparkles, description: 'AI analyzing and tailoring...' },
        { id: 4, name: 'Preparing', icon: ArrowRight, description: 'Preparing your editor...' }
    ];

    const handleFileUpload = (file: File) => {
        if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setUploadedFile(file);
        } else {
            alert('Please upload a PDF or DOCX file');
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            alert('Please enter a job description');
            return;
        }

        if (resumeSource === 'upload' && !uploadedFile) {
            alert('Please upload a resume file');
            return;
        }

        setIsAnalyzing(true);
        setCurrentStage(1); // Uploading

        try {
            // Stage 1: Uploading
            await new Promise(resolve => setTimeout(resolve, 800));

            // Call the new parse API endpoint
            const formData = new FormData();

            if (resumeSource === 'upload' && uploadedFile) {
                formData.append('resume', uploadedFile);
            } else {
                // For 'current' resume, we'd need to get the current resume data
                // For now, show an error
                alert('Please upload a resume file. Using current resume is coming soon!');
                setIsAnalyzing(false);
                setCurrentStage(0);
                return;
            }

            formData.append('jobDescription', jobDescription);
            if (jobTitle) formData.append('jobTitle', jobTitle);
            if (company) formData.append('company', company);

            // Stage 2: Extracting
            setCurrentStage(2);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/tailor/parse`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to parse resume');
            }

            // Stage 3: Analyzing
            setCurrentStage(3);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = await response.json();

            if (result.success && result.data) {
                // Stage 4: Preparing
                setCurrentStage(4);
                await new Promise(resolve => setTimeout(resolve, 500));

                // Store the resume data in sessionStorage to avoid URL encoding issues
                const resumeData = result.data;
                sessionStorage.setItem('parsedResumeData', JSON.stringify(resumeData));

                // Redirect to editor with a flag
                router.push('/editor?fromTailor=true');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            console.error('Analysis failed:', error);
            alert(`Failed to parse resume: ${error.message}`);
            setCurrentStage(0);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const charCount = jobDescription.length;
    const maxChars = 10000;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Professional Progress Modal */}
            {isAnalyzing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                        {/* Header */}
                        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Processing Resume
                            </h2>
                            <p className="text-sm text-gray-600">
                                {stages[currentStage - 1]?.description || 'Initializing...'}
                            </p>
                        </div>

                        {/* Progress Steps */}
                        <div className="px-8 py-6">
                            <div className="space-y-3">
                                {stages.map((stage) => {
                                    const isActive = currentStage === stage.id;
                                    const isCompleted = currentStage > stage.id;
                                    const Icon = stage.icon;

                                    return (
                                        <div
                                            key={stage.id}
                                            className="flex items-center gap-3 transition-opacity duration-300"
                                            style={{ opacity: isActive || isCompleted ? 1 : 0.4 }}
                                        >
                                            {/* Icon */}
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isCompleted
                                                    ? 'bg-green-500'
                                                    : isActive
                                                        ? 'bg-blue-500'
                                                        : 'bg-gray-200'
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                                )}
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <p
                                                    className={`text-sm font-medium ${isCompleted
                                                        ? 'text-green-700'
                                                        : isActive
                                                            ? 'text-blue-700'
                                                            : 'text-gray-500'
                                                        }`}
                                                >
                                                    {stage.name}
                                                </p>
                                            </div>

                                            {/* Status */}
                                            {isActive && (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                </div>
                                            )}
                                            {isCompleted && (
                                                <span className="text-xs text-green-600 font-medium">Done</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-700">
                                        Step {currentStage} of {stages.length}
                                    </span>
                                    <span className="text-xs font-medium text-gray-700">
                                        {Math.round((currentStage / stages.length) * 100)}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${(currentStage / stages.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                            <p className="text-xs text-gray-600 text-center">
                                Please wait while we optimize your resume...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">Tailor My Resume</h1>
                            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">AI-powered resume optimization</p>
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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    {/* Left Column - Resume Upload */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Your Resume</h2>
                        </div>

                        {/* Resume Source Selection */}
                        <div className="space-y-4 mb-6">
                            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                <input
                                    type="radio"
                                    name="resumeSource"
                                    value="current"
                                    checked={resumeSource === 'current'}
                                    onChange={(e) => setResumeSource(e.target.value as 'current')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">Use Current Resume</div>
                                    <div className="text-sm text-gray-500">Use the resume you're currently editing</div>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                <input
                                    type="radio"
                                    name="resumeSource"
                                    value="upload"
                                    checked={resumeSource === 'upload'}
                                    onChange={(e) => setResumeSource(e.target.value as 'upload')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">Upload New Resume</div>
                                    <div className="text-sm text-gray-500">Upload a PDF or DOCX file</div>
                                </div>
                            </label>
                        </div>

                        {/* File Upload Area */}
                        {resumeSource === 'upload' && (
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Upload className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                                <p className="text-sm md:text-base text-gray-700 font-medium mb-2">
                                    {uploadedFile ? (
                                        <span className="text-green-600">{uploadedFile.name}</span>
                                    ) : (
                                        <>
                                            <span className="hidden md:inline">Drag & drop your resume here</span>
                                            <span className="md:hidden">Upload your resume</span>
                                        </>
                                    )}
                                </p>
                                {!uploadedFile && <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">or</p>}
                                <label className="inline-block w-full md:w-auto px-6 py-2.5 md:py-2 bg-blue-600 text-white text-sm md:text-base rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-400 mt-3 md:mt-4">Supports PDF and DOCX (Max 10MB)</p>
                            </div>
                        )}

                        {/* Current Resume Info */}
                        {resumeSource === 'current' && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-green-900">Current Resume Selected</div>
                                        <div className="text-sm text-green-700 mt-1">
                                            Your resume from the editor will be analyzed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Job Description */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-purple-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="e.g., Senior Product Designer"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g., Google"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description *
                                </label>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the complete job description here..."
                                    rows={12}
                                    maxLength={maxChars}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-500">* Required field</span>
                                    <span className={`text-xs ${charCount > maxChars * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
                                        {charCount.toLocaleString()} / {maxChars.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analyze Button */}
                <div className="mt-6 md:mt-8 flex justify-center px-4 md:px-0">
                    <Button
                        variant='primary'
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !jobDescription.trim()}
                        className="w-full md:w-auto"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Parsing Resume with AI...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Parse & Edit Resume
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 px-4 md:px-0">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                        <p className="text-sm text-gray-600">
                            Our AI analyzes your resume against the job description to find optimization opportunities
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">ATS Optimization</h3>
                        <p className="text-sm text-gray-600">
                            Get insights on how to make your resume more ATS-friendly and increase visibility
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <ArrowRight className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Edit & Customize</h3>
                        <p className="text-sm text-gray-600">
                            Review AI-parsed data in the editor, select templates, and customize before downloading
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
