"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                            Get in
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Touch</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have a question or need help? We're here for you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="pb-16 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Mail size={32} />,
                                title: "Email Us",
                                content: "avinashmanitripathi97@email.com",
                                subtext: "We'll respond within 24 hours"
                            },
                            {
                                icon: <Phone size={32} />,
                                title: "Call Us",
                                content: "+91 6393177038",
                                subtext: "Mon-Fri, 9am-6pm EST"
                            },
                            {
                                icon: <MapPin size={32} />,
                                title: "Visit Us",
                                content: "Gorakhpur, Uttar Pradesh",
                                subtext: "Mahrarajanj 273303"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                                <div className="text-blue-600 mb-4 flex justify-center">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-900 font-semibold mb-1">{item.content}</p>
                                <p className="text-gray-600 text-sm">{item.subtext}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="pb-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-12">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send size={40} className="text-green-600" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                                    <p className="text-gray-600">
                                        Thank you for contacting us. We'll get back to you soon.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Send Us a Message</h2>
                                        <p className="text-gray-600">
                                            Fill out the form below and we'll get back to you as soon as possible.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="support">Technical Support</option>
                                                <option value="billing">Billing Question</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="partnership">Partnership</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                                                placeholder="Tell us how we can help you..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="pb-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600">
                                Quick answers to common questions
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    question: "How long does it take to get a response?",
                                    answer: "We typically respond to all inquiries within 24 hours during business days."
                                },
                                {
                                    question: "Do you offer phone support?",
                                    answer: "Yes! Our phone support is available Monday through Friday, 9am-6pm EST."
                                },
                                {
                                    question: "Can I schedule a demo?",
                                    answer: "Absolutely! Contact us and we'll arrange a personalized demo of our platform."
                                }
                            ].map((faq, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <MessageSquare size={20} className="text-blue-600" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 ml-7">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Hours */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
                        <Clock size={48} className="mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Business Hours</h2>
                        <p className="text-lg mb-2">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                        <p className="text-lg opacity-90">Saturday - Sunday: Closed</p>
                    </div>
                </section>
            </div>
        </>
    );
}
