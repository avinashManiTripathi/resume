import { FileText, Sparkles, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

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
        "image": "https://profresume.com/how-to-create-resume.png",
        "totalTime": "PT5M",
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "name": step.title,
            "text": step.description,
            "url": `https://profresume.com#step-${index + 1}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            Simple 3-Step Process
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            How Our Free Resume Builder Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Create a professional, ATS-optimized resume in under 5 minutes. No design skills required, no sign-up needed.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                id={`step-${step.number}`}
                                className="relative group"
                            >
                                {/* Connector Line (hidden on mobile, shown between cards on desktop) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -ml-4" />
                                )}

                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all h-full">
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center text-${step.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link
                            href="https://edit.profresume.com"
                            target="_blank"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl group"
                        >
                            Create Your Free Resume Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-sm text-gray-600 mt-4">
                            No credit card required • No watermarks • Free forever
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
