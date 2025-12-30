"use client";

import { useState } from 'react';
import { X, Upload, FileText, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@repo/ui/button';

interface SmartImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: any) => void;
}

export default function SmartImportModal({ isOpen, onClose, onApply }: SmartImportModalProps) {
    const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
    const [textInput, setTextInput] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedData, setExtractedData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    if (!isOpen) return null;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
            if (!allowedTypes.includes(file.type)) {
                setError('Invalid file type. Please upload a PDF or DOC/DOCX file.');
                return;
            }

            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size exceeds 10MB. Please upload a smaller file.');
                return;
            }

            setSelectedFile(file);
            setError(null);
        }
    };

    const handleExtract = async () => {
        setError(null);
        setIsExtracting(true);

        try {
            const formData = new FormData();

            if (textInput.trim()) {
                formData.append('text', textInput.trim());
            }

            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            if (!textInput.trim() && !selectedFile) {
                setError('Please provide text input or upload a file');
                setIsExtracting(false);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/resume/extract`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setExtractedData(result.data);
                setShowPreview(true);
            } else {
                setError(result.message || 'Failed to extract resume data');
            }
        } catch (err: any) {
            console.error('Extraction error:', err);
            setError('Failed to connect to server. Please try again.');
        } finally {
            setIsExtracting(false);
        }
    };

    const handleApply = () => {
        if (extractedData) {
            onApply(extractedData);
            handleClose();
        }
    };

    const handleClose = () => {
        setTextInput('');
        setSelectedFile(null);
        setExtractedData(null);
        setError(null);
        setShowPreview(false);
        setActiveTab('text');
        onClose();
    };

    const charCount = textInput.length;
    const minChars = 50;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Smart Import</h2>
                                <p className="text-sm text-gray-600">AI-powered resume data extraction</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 rounded-full hover:bg-white/80 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {!showPreview ? (
                        <>
                            {/* Tabs */}
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setActiveTab('text')}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${activeTab === 'text'
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <FileText className="w-5 h-5 inline-block mr-2" />
                                    Paste Text
                                </button>
                                <button
                                    onClick={() => setActiveTab('file')}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${activeTab === 'file'
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Upload className="w-5 h-5 inline-block mr-2" />
                                    Upload File
                                </button>
                            </div>

                            {/* Text Input Tab */}
                            {activeTab === 'text' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-3">
                                            Paste your career information
                                        </label>
                                        <textarea
                                            value={textInput}
                                            onChange={(e) => setTextInput(e.target.value)}
                                            placeholder="Paste your career information here... Include your name, job titles, companies, education, skills, and achievements. Can be in any language - AI will translate to English."
                                            rows={12}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-900 leading-relaxed"
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-500">
                                                Minimum {minChars} characters
                                            </span>
                                            <span className={`text-sm font-medium ${charCount < minChars ? 'text-orange-600' : 'text-green-600'}`}>
                                                {charCount.toLocaleString()} characters
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                        <p className="text-sm text-blue-900 font-medium mb-2">💡 Tips for better results:</p>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• Include specific job titles, companies, and dates</li>
                                            <li>• Mention technologies, tools, and skills used</li>
                                            <li>• Add measurable achievements and responsibilities</li>
                                            <li>• Include education details (degree, university, dates)</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* File Upload Tab */}
                            {activeTab === 'file' && (
                                <div className="space-y-4">
                                    <label className="block">
                                        <div className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${selectedFile
                                            ? 'border-green-400 bg-green-50'
                                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                            }`}>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            {selectedFile ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <CheckCircle className="w-16 h-16 text-green-500" />
                                                    <div>
                                                        <p className="text-lg font-semibold text-green-900">
                                                            {selectedFile.name}
                                                        </p>
                                                        <p className="text-sm text-green-700">
                                                            {(selectedFile.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setSelectedFile(null)}
                                                    >
                                                        Choose Different File
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3">
                                                    <Upload className="w-16 h-16 text-gray-400" />
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-900 mb-1">
                                                            Click to upload or drag and drop
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            PDF, DOC, or DOCX (max 10MB)
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                                        <p className="text-sm text-purple-900 font-medium mb-2">📄 Supported formats:</p>
                                        <ul className="text-sm text-purple-800 space-y-1">
                                            <li>• PDF files (.pdf)</li>
                                            <li>• Microsoft Word (.doc, .docx)</li>
                                            <li>• Maximum file size: 10MB</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mt-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-red-800 font-medium">{error}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Preview Section */
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Data Extracted Successfully!</h3>
                                    <p className="text-sm text-gray-600">Review the extracted information below</p>
                                </div>
                            </div>

                            {extractedData && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                                        <p className="text-sm text-blue-700 font-medium">Name</p>
                                        <p className="text-lg font-bold text-blue-900">
                                            {extractedData.personalInfo?.firstName} {extractedData.personalInfo?.lastName}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                                        <p className="text-sm text-purple-700 font-medium">Job Title</p>
                                        <p className="text-lg font-bold text-purple-900">
                                            {extractedData.personalInfo?.jobTitle || 'Not specified'}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                                        <p className="text-sm text-green-700 font-medium">Experience</p>
                                        <p className="text-lg font-bold text-green-900">
                                            {extractedData.experience?.length || 0} positions
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                                        <p className="text-sm text-orange-700 font-medium">Education</p>
                                        <p className="text-lg font-bold text-orange-900">
                                            {extractedData.education?.length || 0} degrees
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                                        <p className="text-sm text-pink-700 font-medium">Skills</p>
                                        <p className="text-lg font-bold text-pink-900">
                                            {extractedData.skills?.length || 0} skills
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                                        <p className="text-sm text-indigo-700 font-medium">Projects</p>
                                        <p className="text-lg font-bold text-indigo-900">
                                            {extractedData.projects?.length || 0} projects
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                                <p className="text-sm text-yellow-900">
                                    <strong>Note:</strong> This data has been automatically extracted and optimized for ATS.
                                    You can edit it after applying to your resume.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex justify-between">
                    {!showPreview ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                disabled={isExtracting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleExtract}
                                disabled={isExtracting || (!textInput.trim() && !selectedFile)}
                                className="min-w-[200px]"
                            >
                                {isExtracting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Extracting Data...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Extract Data
                                    </>
                                )}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setShowPreview(false)}
                            >
                                Back to Edit
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleApply}
                                className="min-w-[200px]"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Apply to Resume
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
