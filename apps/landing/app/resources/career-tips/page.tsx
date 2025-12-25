"use client";

import { Navigation } from "@/components/Navigation";
import { Briefcase, TrendingUp, Users, Target, Lightbulb, BookOpen, Award, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CareerTipsPage() {
    const tips = [
        {
            category: "Job Search Strategy",
            icon: <Target className="w-6 h-6" />,
            color: "blue",
            articles: [
                {
                    title: "How to Find Hidden Job Opportunities",
                    description: "Learn strategies to discover unadvertised positions and tap into the hidden job market.",
                    readTime: "5 min read"
                },
                {
                    title: "Networking Tips for Introverts",
                    description: "Effective networking strategies that work even if you're not naturally outgoing.",
                    readTime: "4 min read"
                },
                {
                    title: "Using LinkedIn to Land Your Dream Job",
                    description: "Optimize your LinkedIn profile and use it effectively in your job search.",
                    readTime: "6 min read"
                }
            ]
        },
        {
            category: "Interview Preparation",
            icon: <Users className="w-6 h-6" />,
            color: "purple",
            articles: [
                {
                    title: "Common Interview Questions and How to Answer Them",
                    description: "Master the most frequently asked interview questions with proven answer frameworks.",
                    readTime: "8 min read"
                },
                {
                    title: "The STAR Method for Behavioral Interviews",
                    description: "Use this powerful technique to structure compelling answers to behavioral questions.",
                    readTime: "5 min read"
                },
                {
                    title: "Virtual Interview Best Practices",
                    description: "Stand out in video interviews with these technical and presentation tips.",
                    readTime: "4 min read"
                }
            ]
        },
        {
            category: "Career Development",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "green",
            articles: [
                {
                    title: "How to Ask for a Raise Successfully",
                    description: "Timing, preparation, and negotiation strategies for salary discussions.",
                    readTime: "7 min read"
                },
                {
                    title: "Building Your Personal Brand",
                    description: "Establish yourself as an expert in your field and increase your visibility.",
                    readTime: "6 min read"
                },
                {
                    title: "Transitioning to a New Career Field",
                    description: "Steps to successfully pivot your career into a new industry or role.",
                    readTime: "9 min read"
                }
            ]
        },
        {
            category: "Professional Skills",
            icon: <Award className="w-6 h-6" />,
            color: "orange",
            articles: [
                {
                    title: "Essential Soft Skills Employers Look For",
                    description: "Develop the interpersonal skills that make you stand out in any role.",
                    readTime: "5 min read"
                },
                {
                    title: "Time Management Techniques for Professionals",
                    description: "Boost your productivity with proven time management strategies.",
                    readTime: "6 min read"
                },
                {
                    title: "Effective Communication in the Workplace",
                    description: "Improve your written and verbal communication for better collaboration.",
                    readTime: "5 min read"
                }
            ]
        }
    ];

    const quickTips = [
        "Tailor your resume for each job application",
        "Follow up within 24 hours after an interview",
        "Research the company thoroughly before applying",
        "Keep your LinkedIn profile updated regularly",
        "Build a portfolio of your best work",
        "Practice your elevator pitch",
        "Set up job alerts on multiple platforms",
        "Join professional associations in your field"
    ];

    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-100 text-purple-600",
        green: "bg-green-100 text-green-600",
        orange: "bg-orange-100 text-orange-600"
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Lightbulb className="w-4 h-4" />
                        Expert Career Advice
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        Career Tips & Strategies
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Practical advice and proven strategies to help you advance your career, land your dream job, and achieve professional success.
                    </p>
                </div>
            </section>

            {/* Quick Tips Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                        Quick Career Tips
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickTips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content - Career Tips by Category */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-16">
                        {tips.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                                        {category.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {category.articles.map((article, articleIndex) => (
                                        <Link
                                            key={articleIndex}
                                            href="#"
                                            className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 p-6 transition-all hover:shadow-lg"
                                        >
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">{article.readTime}</span>
                                                <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                                                    Read more →
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-6">
                        Ready to Take Your Career to the Next Level?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Create a professional resume that gets you noticed by recruiters and hiring managers.
                    </p>
                    <Link
                        href="/editor"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                    >
                        <BookOpen className="w-5 h-5" />
                        Create Your Resume Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/resources/resume-guide" className="hover:text-white transition-colors">Resume Guide</Link></li>
                                <li><Link href="/resources/career-tips" className="hover:text-white transition-colors">Career Tips</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>© 2025 ResumePro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
