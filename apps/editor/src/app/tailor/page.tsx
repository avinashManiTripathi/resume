"use client";

import { useState } from 'react';
import { Upload, FileText, Sparkles, ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TailorResume() {
    const router = useRouter();
    const [resumeSource, setResumeSource] = useState<'current' | 'upload'>('current');
    const [jobDescription, setJobDescription] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dragActive, setDragActive] = useState(false);

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

        setIsAnalyzing(true);

        try {
            // Store data in sessionStorage for results page
            sessionStorage.setItem('tailorData', JSON.stringify({
                resumeSource,
                jobDescription,
                jobTitle,
                company,
                fileName: uploadedFile?.name
            }));

            // Call API
            const formData = new FormData();
            if (resumeSource === 'upload' && uploadedFile) {
                formData.append('resume', uploadedFile);
            }
            formData.append('jobDescription', jobDescription);
            formData.append('jobTitle', jobTitle);
            formData.append('company', company);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/tailor/analyze`, {
                method: 'POST',
                body: formData,
            });

            const results = await response.json();

            // Store results
            sessionStorage.setItem('tailorResults', JSON.stringify(results));

            // Navigate to results
            router.push('/tailor/results');
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Failed to analyze resume. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const charCount = jobDescription.length;
    const maxChars = 10000;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tailor My Resume</h1>
                            <p className="text-sm text-gray-500">AI-powered resume optimization</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/editor')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Resume Upload */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
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
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-700 font-medium mb-2">
                                    {uploadedFile ? uploadedFile.name : 'Drag & drop your resume here'}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">or</p>
                                <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-400 mt-4">Supports PDF and DOCX (Max 10MB)</p>
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
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
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
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !jobDescription.trim()}
                        className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Analyzing Resume...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Analyze Resume
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>

                {/* Info Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <h3 className="font-semibold text-gray-900 mb-2">One-Click Apply</h3>
                        <p className="text-sm text-gray-600">
                            Apply suggested improvements to your resume with a single click
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
