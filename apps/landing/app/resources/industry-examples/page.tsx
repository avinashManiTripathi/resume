import { Navigation } from "@/components/Navigation";
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { Briefcase, Code, Palette, TrendingUp, Heart, Wrench, GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import { ENV } from "@/app/env";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Resume Examples by Industry 2026 - Professional Templates | Hirecta',
    description: 'Browse industry-specific resume examples and templates. Tailored formats for tech, healthcare, finance, design, and more to land your dream job.',
    alternates: {
        canonical: '/resources/industry-examples',
    },
    openGraph: {
        title: 'Resume Examples by Industry - Professional Templates',
        description: 'Browse industry-specific resume examples and templates for all major fields.',
        url: '/resources/industry-examples',
    },
};

export default function IndustryExamplesPage() {
    const industries = [
        {
            name: "Technology & Software",
            icon: <Code className="w-6 h-6" />,
            color: "blue",
            description: "Resume examples for software engineers, developers, and IT professionals",
            roles: ["Software Engineer", "Full Stack Developer", "DevOps Engineer", "Data Scientist", "Product Manager", "UI/UX Designer"]
        },
        {
            name: "Business & Finance",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "green",
            description: "Examples for finance, accounting, and business professionals",
            roles: ["Financial Analyst", "Accountant", "Business Analyst", "Investment Banker", "Management Consultant", "Operations Manager"]
        },
        {
            name: "Creative & Design",
            icon: <Palette className="w-6 h-6" />,
            color: "purple",
            description: "Portfolio-focused resumes for creative professionals",
            roles: ["Graphic Designer", "Art Director", "Content Writer", "Video Editor", "Photographer", "Marketing Designer"]
        },
        {
            name: "Healthcare",
            icon: <Heart className="w-6 h-6" />,
            color: "red",
            description: "Medical and healthcare professional resume examples",
            roles: ["Registered Nurse", "Medical Doctor", "Physical Therapist", "Medical Assistant", "Healthcare Administrator", "Pharmacist"]
        },
        {
            name: "Engineering",
            icon: <Wrench className="w-6 h-6" />,
            color: "orange",
            description: "Technical resumes for various engineering disciplines",
            roles: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Chemical Engineer", "Project Engineer", "Quality Engineer"]
        },
        {
            name: "Education",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "indigo",
            description: "Resume examples for teachers and education professionals",
            roles: ["Elementary Teacher", "High School Teacher", "Professor", "School Administrator", "Curriculum Developer", "Education Coordinator"]
        },
        {
            name: "Sales & Marketing",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "pink",
            description: "Results-driven resumes for sales and marketing roles",
            roles: ["Sales Manager", "Account Executive", "Marketing Manager", "Digital Marketer", "Brand Manager", "Business Development"]
        },
        {
            name: "Human Resources",
            icon: <Users className="w-6 h-6" />,
            color: "teal",
            description: "HR professional resume examples and templates",
            roles: ["HR Manager", "Recruiter", "HR Generalist", "Talent Acquisition", "Compensation Analyst", "Training Specialist"]
        }
    ];

    const colorClasses = {
        blue: "bg-blue-100 text-blue-600 border-blue-200",
        green: "bg-green-100 text-green-600 border-green-200",
        purple: "bg-purple-100 text-purple-600 border-purple-200",
        red: "bg-red-100 text-red-600 border-red-200",
        orange: "bg-orange-100 text-orange-600 border-orange-200",
        indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
        pink: "bg-pink-100 text-pink-600 border-pink-200",
        teal: "bg-teal-100 text-teal-600 border-teal-200"
    };

    const faqs = [
        { question: "Should my resume format differ by industry?", answer: "Yes, creative fields allow more design freedom while traditional industries (finance, law) prefer conservative, text-focused formats." },
        { question: "How do I switch industries with my resume?", answer: "Emphasize transferable skills, reframe your experience to match the new industry's language, and highlight relevant projects or certifications." },
        { question: "Do I need different resumes for different industries?", answer: "If targeting multiple industries, yes. Create industry-specific versions that emphasize relevant  experience and use appropriate terminology." },
        { question: "What makes a tech resume different?", answer: "Tech resumes emphasize technical skills, projects, GitHub/portfolio links, and specific programming languages/frameworks prominently." },
        { question: "Can I use templates for industry-specific resumes?", answer: "Yes, but choose templates designed for your industry. Creative fields need portfolios, while corporate roles need traditional formats." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <ArticleSchema
                title="Resume Examples by Industry - Professional Templates"
                description="Browse industry-specific resume examples and templates. Tailored formats for tech, healthcare, finance, and more."
                url={`${ENV.BASE_URL}/resources/industry-examples`}
            />
            <FAQSchema faqs={faqs} />
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Briefcase className="w-4 h-4" />
                        Industry Examples
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        Resume Examples by Industry
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore industry-specific resume examples and learn what hiring managers look for in your field.
                    </p>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {industries.map((industry, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl border-2 p-8 hover:shadow-xl transition-all ${colorClasses[industry.color as keyof typeof colorClasses]}`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[industry.color as keyof typeof colorClasses]}`}>
                                        {industry.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{industry.name}</h2>
                                </div>
                                <p className="text-gray-600 mb-6">{industry.description}</p>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Roles:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {industry.roles.map((role, roleIndex) => (
                                            <span
                                                key={roleIndex}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href={`${ENV.EDITOR_URL}/editor`}
                                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                >
                                    View Examples
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tips Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Industry-Specific Resume Tips
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                title: "Research Industry Standards",
                                description: "Different industries have different expectations. Research what's common in your field before creating your resume."
                            },
                            {
                                title: "Use Industry Keywords",
                                description: "Include terminology and skills specific to your industry to pass ATS and show your expertise."
                            },
                            {
                                title: "Highlight Relevant Experience",
                                description: "Emphasize experience and skills that are most valued in your target industry."
                            },
                            {
                                title: "Showcase Industry Certifications",
                                description: "Include relevant certifications, licenses, and professional memberships for your field."
                            },
                            {
                                title: "Tailor Your Format",
                                description: "Creative fields may allow more design freedom, while traditional industries prefer conservative formats."
                            }
                        ].map((tip, index) => (
                            <div key={index} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                                <p className="text-gray-600">{tip.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-6">
                        Create Your Industry-Specific Resume
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Choose from our professionally designed templates tailored for your industry.
                    </p>
                    <Link
                        href={`${ENV.EDITOR_URL}/editor`}
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                    >
                        <Briefcase className="w-5 h-5" />
                        Start Building Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
