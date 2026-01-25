"use client";

import { useState } from 'react';
import { Upload, FileText, Sparkles, ArrowRight, X, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import { Dialog } from '@repo/ui/dialog';
import { StepLoader } from '@repo/ui/step-loader';
import { usePersistence } from '../hooks/usePersistence';
import { ENV } from '../env';

export default function TailorResume() {
    const router = useRouter();
    const [resumeSource, setResumeSource] = useState<'current' | 'upload'>('upload');
    const [jobDescription, setJobDescription] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [dialog, setDialog] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        type: "info" | "success" | "warning" | "error";
    }>({
        isOpen: false,
        title: "",
        description: "",
        type: "info"
    });
    const { saveDocument, getDocument } = usePersistence();

    const tailoringStages = [
        'Uploading resume...',
        'Extracting document data...',
        'Analyzing job requirements...',
        'Matching skills & experience...',
        'Generating tailored content...'
    ];

    const handleFileUpload = (file: File) => {
        if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setUploadedFile(file);
        } else {
            setDialog({
                isOpen: true,
                title: "Invalid File Type",
                description: "Please upload a PDF or DOCX file.",
                type: "warning"
            });
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
            setDialog({
                isOpen: true,
                title: "Description Required",
                description: "Please enter a job description to tailor your resume.",
                type: "warning"
            });
            return;
        }

        if (resumeSource === 'upload' && !uploadedFile) {
            setDialog({
                isOpen: true,
                title: "Resume Required",
                description: "Please upload a resume file to continue.",
                type: "warning"
            });
            return;
        }

        setIsAnalyzing(true);
        setProgress(0);
        setCurrentStageIndex(0);

        // Start progress simulation
        const stageInterval = setInterval(() => {
            setCurrentStageIndex(prev => {
                if (prev < tailoringStages.length - 1) {
                    setProgress(Math.min((prev + 1) * 20, 95));
                    return prev + 1;
                }
                clearInterval(stageInterval);
                return prev;
            });
        }, 1000);

        try {

            if (resumeSource === 'current') {
                // Check if we have a document ID
                const docId = new URLSearchParams(window.location.search).get('id');
                if (!docId) {
                    setDialog({
                        isOpen: true,
                        title: "No Resume Selected",
                        description: "Please open a resume in the editor first, or upload one here.",
                        type: "warning"
                    });
                    setIsAnalyzing(false);
                    return;
                }

                // Fetch document data
                try {
                    const doc = await getDocument(docId, 'resume');
                    if (!doc || !doc.data) {
                        throw new Error("Could not load resume data");
                    }

                    // Use structured data for analysis
                    const payload = {
                        resumeData: doc.data,
                        jobDescription,
                        jobTitle: jobTitle || undefined,
                        company: company || undefined
                    };

                    const response = await fetch(`${ENV.API_URL}/api/tailor/analyze`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload),
                        credentials: 'include',
                    });

                    clearInterval(stageInterval);
                    setProgress(100);

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message || 'Analysis failed');
                    }

                    const result = await response.json();

                    // Save data for the results page
                    sessionStorage.setItem('tailorResults', JSON.stringify(result));
                    sessionStorage.setItem('tailorOriginalResume', JSON.stringify(doc.data));
                    sessionStorage.setItem('tailorDocId', doc.id); // Save ID to update same doc later if needed

                    router.push('/tailor/results');
                    return;

                } catch (err: any) {
                    console.error("Analysis Error", err);
                    setDialog({
                        isOpen: true,
                        title: "Analysis Failed",
                        description: err.message || "Failed to analyze current resume.",
                        type: "error"
                    });
                    setIsAnalyzing(false);
                    return;
                }
            }

            // Standard parse flow for Uploads
            const formData = new FormData();
            if (resumeSource === 'upload' && uploadedFile) {
                formData.append('resume', uploadedFile);
            } else {
                // This block should be unreachable now given the logic above, but keeping safety
                setIsAnalyzing(false);
                return;
            }

            formData.append('jobDescription', jobDescription);
            if (jobTitle) formData.append('jobTitle', jobTitle);
            if (company) formData.append('company', company);

            // Progress simulation is already running from top of function

            const response = await fetch(`${ENV.API_URL}/api/tailor/parse`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            clearInterval(stageInterval);
            setProgress(100);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to parse resume');
            }

            const result = await response.json();
            if (result.success && result.data) {
                // Save Tailor History
                const historyDoc = {
                    id: `tailor_${Date.now()}`,
                    title: `Tailor - ${jobTitle || 'Job Role'} @ ${company || 'Company'}`,
                    type: 'tailor-history' as const,
                    templateId: 'tailor-report',
                    data: {
                        jobTitle,
                        company,
                        jobDescription: jobDescription.substring(0, 200) + '...', // Save snippet
                        createdAt: new Date().toISOString()
                    }
                };
                saveDocument(historyDoc).catch(console.error);

                sessionStorage.setItem('parsedResumeData', JSON.stringify(result.data));
                router.push('/editor?fromTailor=true');
            }
        } catch (error: any) {
            setDialog({
                isOpen: true,
                title: "Analysis Failed",
                description: `Analysis failed: ${error.message}. Please try again.`,
                type: "error"
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Resume Tailor</h1>
                            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Job Alignment AI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/editor')}
                            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
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

            <main className="flex-1 bg-white pt-20">
                <div className="w-full relative">
                    {/* Interaction Screen */}
                    <div className={`transition-all duration-700 ${isAnalyzing ? "blur-md opacity-30 pointer-events-none scale-[0.98]" : ""}`}>
                        <div className="min-h-[calc(100vh-80px)] w-full border-b border-gray-100">
                            <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                                {/* Left Column - Inputs */}
                                <div className="relative z-10 p-8 md:p-12 lg:p-20 flex flex-col justify-start pt-16 max-w-4xl mx-auto lg:mx-0 lg:max-w-none">
                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-widest uppercase">
                                            <div className="w-8 h-[2px] bg-indigo-600" />
                                            AI Personalization
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                                            Tailor Your Story to the <span className="text-indigo-600">Perfect Role</span>
                                        </h2>
                                        <p className="text-gray-600 font-medium leading-relaxed max-w-md text-lg">
                                            Paste a job description and our AI will align your experience, keywords, and tone to double your interview chances.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Resume Selection */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setResumeSource('current')}
                                                className={`p-4 rounded-2xl border-2 transition-all text-left group ${resumeSource === 'current' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-indigo-200'}`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`p-2 rounded-lg ${resumeSource === 'current' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100'}`}>
                                                        <FileText size={18} />
                                                    </div>
                                                    <span className={`font-black text-sm uppercase tracking-wider ${resumeSource === 'current' ? 'text-indigo-600' : 'text-gray-400'}`}>Current CV</span>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">Use the resume you're currently editing in our platform.</p>
                                            </button>

                                            <button
                                                onClick={() => setResumeSource('upload')}
                                                className={`p-4 rounded-2xl border-2 transition-all text-left group ${resumeSource === 'upload' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-indigo-200'}`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`p-2 rounded-lg ${resumeSource === 'upload' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100'}`}>
                                                        <Upload size={18} />
                                                    </div>
                                                    <span className={`font-black text-sm uppercase tracking-wider ${resumeSource === 'upload' ? 'text-indigo-600' : 'text-gray-400'}`}>Upload New</span>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">Upload a fresh PDF/DOCX to start tailored analysis.</p>
                                            </button>
                                        </div>

                                        {/* Upload Zone (if upload selected) */}
                                        {resumeSource === 'upload' && (
                                            <div
                                                className={`relative bg-blue-50/30 border-2 border-dashed rounded-2xl p-6 transition-all ${dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            >
                                                {!uploadedFile ? (
                                                    <div className="text-center">
                                                        <input type="file" id="resume-upload" accept=".pdf,.docx" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} className="hidden" />
                                                        <label htmlFor="resume-upload" className="cursor-pointer text-indigo-600 font-black text-sm hover:underline">Click to upload</label>
                                                        <span className="text-gray-400 text-sm ml-2 font-medium">or drag & drop your resume</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
                                                                <FileText size={16} />
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{uploadedFile.name}</span>
                                                        </div>
                                                        <button onClick={() => setUploadedFile(null)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Job Details */}
                                        <div className="space-y-5">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Title</label>
                                                    <input
                                                        type="text"
                                                        value={jobTitle}
                                                        onChange={(e) => setJobTitle(e.target.value)}
                                                        placeholder="e.g. Senior Frontend Engineer"
                                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company</label>
                                                    <input
                                                        type="text"
                                                        value={company}
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        placeholder="e.g. Google"
                                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Description *</label>
                                                <textarea
                                                    value={jobDescription}
                                                    onChange={(e) => setJobDescription(e.target.value)}
                                                    placeholder="Paste the complete job requirements here..."
                                                    rows={8}
                                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 resize-none text-sm"
                                                />
                                            </div>

                                            <Button
                                                onClick={handleAnalyze}
                                                disabled={isAnalyzing || !jobDescription.trim()}
                                                className="w-full py-8 md:py-10 rounded-3xl text-xl font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_20px_40px_-5px_rgba(79,70,229,0.3)] transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 border border-indigo-400/30 overflow-hidden relative group disabled:opacity-70 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:border-gray-200 disabled:hover:bg-gray-300 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                            >
                                                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[45deg] animate-shimmer pointer-events-none" />
                                                <Sparkles className="w-6 h-6" />
                                                <span>Tailor My Resume</span>
                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Hirecta Visual */}
                                <div className="hidden lg:flex sticky top-20 self-start bg-slate-50 items-start justify-center pt-32 p-12 overflow-hidden border-l border-gray-100 min-h-[calc(100vh-80px)]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#EEF2FF_0%,transparent_50%)]" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#F5F3FF_0%,transparent_50%)]" />
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                                    <div className="relative w-full max-w-lg aspect-square">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Stylized Comparison Visual */}
                                            <div className="relative w-[340px] h-[440px] flex items-center justify-center">
                                                {/* Job Requirement Card */}
                                                <div className="absolute w-[240px] h-[340px] bg-slate-100 rounded-2xl border border-gray-200 rotate-[-12deg] -translate-x-12 opacity-40 shadow-sm" />

                                                {/* Resume Main Card */}
                                                <div className="w-[280px] h-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative overflow-hidden animate-float-slow z-10">
                                                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-20 animate-scan shadow-[0_0_15px_rgba(79,70,229,0.5)]" />

                                                    {/* AI Match Overlay */}
                                                    <div className="absolute inset-0 p-6 flex flex-col gap-8 opacity-40">
                                                        <div className="flex gap-3"><div className="w-8 h-8 rounded bg-gray-100" /><div className="flex-1 space-y-2"><div className="h-3 bg-gray-200 rounded w-3/4" /><div className="h-2 bg-gray-100 rounded w-1/2" /></div></div>
                                                        <div className="space-y-3"><div className="h-2 bg-gray-100 rounded w-full" /><div className="h-2 bg-gray-100 rounded w-full" /><div className="h-2 bg-gray-100 rounded w-5/6" /></div>
                                                        <div className="grid grid-cols-2 gap-2 pt-4"><div className="h-10 bg-gray-50 rounded-xl border border-gray-100" /><div className="h-10 bg-gray-50 rounded-xl border border-gray-100" /></div>
                                                    </div>

                                                    <div className="absolute inset-0 p-6 flex flex-col justify-around pointer-events-none font-black text-[9px] uppercase tracking-widest">
                                                        <div className="w-fit px-3 py-1 bg-green-500/10 text-green-600 rounded-lg border border-green-500/20 translate-x-16 animate-pulse">✓ Skill Match Found</div>
                                                        <div className="w-fit px-3 py-1 bg-indigo-500/10 text-indigo-600 rounded-lg border border-indigo-500/20 -translate-x-2 animate-pulse delay-500">✨ Tone Adjusted</div>
                                                        <div className="w-fit px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg border border-amber-500/20 translate-x-8 animate-pulse delay-1000">📎 Keywords Inserted</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Metrics */}
                                        <div className="absolute top-0 right-4 animate-float-medium delay-200">
                                            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white"><CheckCircle size={20} /></div>
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Confidence</p>
                                                    <p className="text-lg font-black text-gray-900">98.4%</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-16 -left-8 animate-float-medium">
                                            <div className="bg-indigo-600 p-4 rounded-2x shadow-2xl text-white w-44 rotate-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200">AI Recommendation</span>
                                                    <Zap size={14} className="fill-white" />
                                                </div>
                                                <p className="text-xs font-bold leading-relaxed">Adjusted technical stack order to match HR priorities.</p>
                                            </div>
                                        </div>

                                        {/* Orbiting Elements */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] border border-indigo-100 rounded-full opacity-40 animate-[spin_80s_linear_infinite]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analyzing Modal Overlay */}
                    {isAnalyzing && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                            <div className="max-w-xl w-full bg-white border border-slate-100 rounded-[3rem] p-10 md:p-14 shadow-2xl space-y-10 animate-in zoom-in slide-in-from-bottom-4 duration-300">
                                <StepLoader
                                    loading={true}
                                    message="Tailoring Your Story"
                                    subMessage={tailoringStages[currentStageIndex] || "Matching your skills..."}
                                    logoSrc="/logo.png"
                                    fullScreen={false}
                                    variant="transparent"
                                    embedded={true}
                                    className="min-h-[250px]"
                                />

                                <div className="text-center">
                                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100/50 animate-pulse">
                                        <Loader className="w-3.5 h-3.5 animate-spin" />
                                        {progress}% Complete
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Dialog
                isOpen={dialog.isOpen}
                onClose={() => setDialog(prev => ({ ...prev, isOpen: false }))}
                title={dialog.title}
                description={dialog.description}
                type={dialog.type}
            />
        </div>
    );
}

// Re-using Lucide components not in common scope
function Loader({ className, size = 18 }: { className?: string; size?: number }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
        </svg>
    );
}

function CheckCircle({ className, size = 18 }: { className?: string; size?: number }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
        </svg>
    );
}

function Zap({ className, size = 18, fill }: { className?: string; size?: number; fill?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={fill || "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 14.5l10-10.5h1l-4 8h6l-10 10.5h-1l4-8h-6z" />
        </svg>
    );
}
