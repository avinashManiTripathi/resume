"use client";

import { useState } from "react";
import { ChevronDown, Search, HelpCircle, Book, Video, MessageCircle } from "lucide-react";

const faqs = [
    {
        category: "Getting Started",
        questions: [
            {
                q: "How do I create my first resume?",
                a: "Click 'Get Started' on the homepage, choose a template, and fill in your information. Our intuitive editor guides you through each section."
            },
            {
                q: "Is the resume builder really free?",
                a: "Yes! Our basic plan is completely free and includes access to professional templates and the resume editor. Premium features are available with paid plans."
            },
            {
                q: "Do I need to create an account?",
                a: "You can start building without an account, but creating one allows you to save your progress and access your resumes from any device."
            }
        ]
    },
    {
        category: "Templates & Customization",
        questions: [
            {
                q: "How many templates are available?",
                a: "We offer 50+ professional templates designed by experts. Free users get access to 10 templates, while Pro and Premium users get unlimited access."
            },
            {
                q: "Can I customize the template colors and fonts?",
                a: "Absolutely! All templates are fully customizable. You can change colors, fonts, spacing, and layout to match your personal brand."
            },
            {
                q: "Are the templates ATS-friendly?",
                a: "Yes! All our templates are optimized for Applicant Tracking Systems (ATS) to ensure your resume gets past automated screening."
            }
        ]
    },
    {
        category: "Downloading & Exporting",
        questions: [
            {
                q: "What file formats can I download?",
                a: "You can download your resume as PDF or Word (.docx) format. PDF is recommended for applications, while Word is great for further editing."
            },
            {
                q: "How do I download my resume?",
                a: "Click the 'Download' button in the editor. Pro and Premium users can download unlimited times, while free users have limited downloads."
            },
            {
                q: "Can I share my resume online?",
                a: "Yes! You can generate a shareable link to your resume or download it to share via email or job application portals."
            }
        ]
    },
    {
        category: "Subscription & Billing",
        questions: [
            {
                q: "What's included in the Pro plan?",
                a: "Pro includes unlimited PDF downloads, access to 5+ premium templates, Word export, and basic customer support for $9/month."
            },
            {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel anytime from your account settings. You'll retain access until the end of your billing period."
            },
            {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund."
            }
        ]
    },
    {
        category: "Technical Support",
        questions: [
            {
                q: "My resume isn't saving. What should I do?",
                a: "First, check your internet connection. If the problem persists, try clearing your browser cache or contact our support team."
            },
            {
                q: "Which browsers are supported?",
                a: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For best experience, we recommend Chrome."
            },
            {
                q: "Can I use the resume builder on mobile?",
                a: "Yes! Our platform is fully responsive and works on all devices, though we recommend desktop for the best editing experience."
            }
        ]
    }
];

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === key ? null : key);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <HelpCircle size={16} />
                            Help Center
                        </div>
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                            How Can We
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Help You?</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Find answers to common questions or get in touch with our support team.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search for help..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-14 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>
                </section>

                {/* Quick Links */}
                <section className="pb-16 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Book size={32} />,
                                title: "Documentation",
                                description: "Detailed guides and tutorials",
                                color: "blue"
                            },
                            {
                                icon: <Video size={32} />,
                                title: "Video Tutorials",
                                description: "Step-by-step video guides",
                                color: "purple"
                            },
                            {
                                icon: <MessageCircle size={32} />,
                                title: "Contact Support",
                                description: "Get help from our team",
                                color: "green"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                                <div className={`text-${item.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Sections */}
                <section className="pb-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-8">
                            {faqs.map((category, catIdx) => (
                                <div key={catIdx}>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {category.category}
                                    </h3>
                                    <div className="space-y-3">
                                        {category.questions.map((faq, qIdx) => {
                                            const key = `${catIdx}-${qIdx}`;
                                            const isOpen = openIndex === key;

                                            return (
                                                <div
                                                    key={qIdx}
                                                    className="bg-white rounded-xl shadow-md overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => toggleFAQ(catIdx, qIdx)}
                                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <span className="font-semibold text-gray-900 pr-4">
                                                            {faq.q}
                                                        </span>
                                                        <ChevronDown
                                                            size={20}
                                                            className={`text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                                                                }`}
                                                        />
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                                                            {faq.a}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Still Need Help */}
                <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Still Need Help?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Our support team is here to assist you with any questions.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                                Contact Support
                            </button>
                            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                                Live Chat
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
