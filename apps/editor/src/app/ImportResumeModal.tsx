"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Upload, FileText, Loader2, AlertCircle, FileUp } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { useAppNetwork } from '../hooks/useAppNetwork';
import { API_ENDPOINTS } from '@repo/utils-client';

interface ImportResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: any) => void;
}

export default function ImportResumeModal({ isOpen, onClose, onApply }: ImportResumeModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const network = useAppNetwork();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const validateFile = (selectedFile: File) => {
        setError(null);
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword'
        ];
        if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.doc')) {
            setError('Please upload a valid PDF or DOCX file.');
            return false;
        }
        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File size should be less than 10MB.');
            return false;
        }
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            setFile(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleExtract = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const result: any = await network.post(API_ENDPOINTS.RESUME.EXTRACT, formData);

            if (result.success || result.data) {
                onApply(result.data);
                handleClose();
            } else {
                console.error('Extraction failed:', result.message);
                setError(result.message || "Failed to analyze document. Please try again.");
            }
        } catch (error: any) {
            console.error('Error processing file:', error);
            setError(error.message || "Network error. Please check your connection or file size.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        setFile(null);
        setError(null);
        setIsProcessing(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-none md:rounded-3xl shadow-2xl w-full max-w-5xl h-full md:h-[650px] max-h-[100dvh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
                {/* Left Sidebar - Guidance & Errors */}
                <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between hidden md:flex relative overflow-hidden">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                    <div className="relative z-10">
                        {/* Sidebar Header */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="p-2 bg-indigo-100/50 rounded-xl">
                                    <FileUp className="w-5 h-5 text-indigo-600" />
                                </div>
                                <span className="text-sm font-bold text-slate-900 tracking-tight">Import Resume</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                                Upload your existing resume
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                We'll parse your PDF or DOCX file using AI and populate the editor automatically.
                            </p>
                        </div>

                        {/* Modern Guidance Cards */}
                        <div className="space-y-3">
                            <div className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <FileText className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Supported Formats</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                                            Please upload PDF, DOC, or DOCX files up to 10MB in size.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-200">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Sparkles className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">AI Powered</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                                            Our smart parser extracts your details seamlessly so you don't have to type.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Display Area (Bottom of Sidebar) */}
                    <div className="mt-auto pt-6 relative z-10">
                        {error && (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 animate-in slide-in-from-bottom-2 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm flex-shrink-0 border border-red-100">
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-red-900 mb-0.5">Import Failed</h5>
                                        <p className="text-xs text-red-700 leading-relaxed">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Main Content */}
                <div className="flex-1 flex flex-col h-full bg-white relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="px-6 pt-6 pb-2 md:px-10 md:pt-10 md:pb-2 flex-shrink-0">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Upload File
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Drag and drop your file or click to browse.
                        </p>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-10 md:pb-6 mt-4 flex flex-col items-center justify-center">
                        {/* Mobile Error Display */}
                        {error && (
                            <div className="md:hidden w-full mb-4 bg-red-50 border border-red-100 rounded-2xl p-4 animate-in slide-in-from-bottom-2 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm flex-shrink-0 border border-red-100">
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-red-900 mb-0.5">Import Failed</h5>
                                        <p className="text-xs text-red-700 leading-relaxed">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div
                            className={`w-full max-w-lg p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging
                                ? 'border-indigo-500 bg-indigo-50/50'
                                : file
                                    ? 'border-emerald-500 bg-emerald-50/30'
                                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className="hidden"
                            />

                            {file ? (
                                <>
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-slate-900 text-lg text-center mb-1">
                                        {file.name}
                                    </p>
                                    <p className="text-slate-500 text-sm">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-slate-900 text-lg mb-2">
                                        Drop your resume here
                                    </p>
                                    <p className="text-slate-500 text-sm text-center">
                                        or click to browse from your computer <br />
                                        <span className="text-xs opacity-75 mt-1 block">(PDF, DOCX up to 10MB)</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Footer - Main Action */}
                    <div className="px-6 py-4 md:px-10 md:py-6 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-none md:rounded-br-3xl">
                        <Button
                            onClick={handleClose}
                            variant='outline'
                            className="border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleExtract}
                            disabled={isProcessing || !file}
                            variant='primary'
                            className={`min-w-[160px] ${isProcessing ? 'opacity-90' : ''}`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <FileUp className="w-5 h-5 mr-2" />
                                    Import Now
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
