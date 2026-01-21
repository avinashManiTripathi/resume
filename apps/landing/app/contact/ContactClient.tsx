"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, Check } from "lucide-react";

export default function ContactClient() {
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
        <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-inter)] text-slate-900">

            {/* Simple Navbar Placeholder (if not global) - Assuming visual continuity */}

            <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left Column: Info */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6 font-display">
                                Get in touch
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                Have questions about our AI resume builder? Need help tailoring your application? We're here to help you succeed.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-1">Email Us</h3>
                                    <p className="text-slate-600 mb-2">For general inquiries and support.</p>
                                    <a href="mailto:it@hirecta.com" className="text-indigo-600 font-semibold hover:underline">it@hirecta.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-1">Call Us</h3>
                                    <p className="text-slate-600 mb-2">Mon-Fri from 9am to 6pm EST.</p>
                                    <a href="tel:+916393177038" className="text-indigo-600 font-semibold hover:underline">+91 6393177038</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-1">Visit Us</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Gorakhpur, Uttar Pradesh<br />
                                        Mahrajganj 273303
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4">Why reach out?</h4>
                            <ul className="space-y-3">
                                {[
                                    "Enterprise & Partnership inquiries",
                                    "Technical support for the editor",
                                    "Billing and subscription questions",
                                    "Feature requests and feedback"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-600/5 blur-3xl rounded-[3rem] -z-10 transform rotate-3"></div>

                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                            {submitted ? (
                                <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                                        <Check size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">
                                        Thanks for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-8 text-indigo-600 font-semibold hover:underline text-sm"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a message</h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-600"
                                        >
                                            <option value="">Select a topic...</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="support">Technical Support</option>
                                            <option value="billing">Billing & Subscription</option>
                                            <option value="partnership">Partnership</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600">Quick answers to common questions about our support.</p>
                    </div>

                    <div className="grid gap-6">
                        {[
                            {
                                question: "How long does it take to get a response?",
                                answer: "We aim to respond to all inquiries within 24 hours during business days (Mon-Fri)."
                            },
                            {
                                question: "Can I get a refund?",
                                answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our premium features."
                            },
                            {
                                question: "Do you offer enterprise plans?",
                                answer: "Yes! Please select 'Partnership' in the contact form to discuss enterprise solutions."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 transition-colors">
                                <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                        <MessageSquare size={16} />
                                    </div>
                                    {faq.question}
                                </h3>
                                <p className="text-slate-600 ml-11">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
