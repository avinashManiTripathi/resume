import { FileText, Sparkles, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ENV } from "@/app/env";

export function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Choose from 50+ Professional Templates",
            description: "Select an ATS-friendly resume template designed by career experts. All templates are completely free, modern, and customizable to match your personal brand. From creative designs to traditional formats, we have templates for every industry and career level.",
            icon: <FileText className="w-12 h-12" />,
            color: "blue"
        },
        {
            number: "2",
            title: "Let AI Write Your Resume",
            description: "Our advanced AI resume writer analyzes your job title and suggests professional, recruiter-approved phrases. Simply fill in your basic details and watch as our AI generates achievement-focused bullet points with action verbs and quantifiable metrics. No more writer's block!",
            icon: <Sparkles className="w-12 h-12" />,
            color: "purple"
        },
        {
            number: "3",
            title: "Download Instantly - No Strings Attached",
            description: "Download your professional resume as PDF or Word document in seconds. No watermarks, no hidden fees, no credit card required. Edit and download unlimited times - it's free forever. Your resume, your way, completely free.",
            icon: <Download className="w-12 h-12" />,
            color: "green"
        }
    ];

    // HowTo Schema for SEO
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Create a Professional Resume with ProfResume",
        "description": "Step-by-step guide to creating an ATS-friendly resume using our free resume builder in under 5 minutes",
        "image": `${ENV.BASE_URL}/how-to-create-resume.png`,
        "totalTime": "PT5M",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "0"
        },
        "supply": [
            {
                "@type": "HowToSupply",
                "name": "Professional Information"
            },
            {
                "@type": "HowToSupply",
                "name": "Work Experience Details"
            }
        ],
        "tool": [
            {
                "@type": "HowToTool",
                "name": "ProfResume Online Builder"
            },
            {
                "@type": "HowToTool",
                "name": "Web Browser"
            }
        ],
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "name": step.title,
            "text": step.description,
            "url": `${ENV.BASE_URL}#step-${index + 1}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" />
                            Simple 3-Step Process
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                            How Our Free Resume Builder Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Create a professional, ATS-optimized resume in under 5 minutes
                        </p>
                    </div>

                    {/* Horizontal Timeline Steps */}
                    <div className="relative mb-12">
                        {/* Connection Line */}
                        <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 mx-auto" style={{ width: 'calc(100% - 200px)', left: '100px' }} />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    id={`step-${step.number}`}
                                    className="relative"
                                >
                                    {/* Step Number Circle */}
                                    <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-2xl font-extrabold text-white">{step.number}</span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all">
                                        <div className={`w-12 h-12 p-2 bg-${step.color}-100 rounded-lg flex items-center justify-center text-${step.color}-600 mb-4 mx-auto`}>
                                            {step.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed text-center">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link
                            href={ENV.EDITOR_URL + "/editor"}
                            target="_blank"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl group"
                        >
                            Create Your Free Resume Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-sm text-gray-600 mt-3">
                            No credit card required • No watermarks • Free forever
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
