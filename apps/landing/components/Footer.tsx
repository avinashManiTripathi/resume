"use client";

import Link from 'next/link';
import { FileText, Mail, Twitter, Linkedin, Github, Facebook, Instagram, MapPin, Phone, Send } from 'lucide-react';
import { useMemo, useState } from 'react';

export function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
        setEmail('');
    };


    const FooterJson = {
        socials: {
            links: [
                {
                    name: "Twitter",
                    url: "https://twitter.com",
                    icon: Twitter
                },
                {
                    name: "Linkedin",
                    url: "https://linkedin.com",
                    icon: Linkedin
                },
                {
                    name: "Github",
                    url: "https://github.com",
                    icon: Github
                },
                {
                    name: "Facebook",
                    url: "https://facebook.com",
                    icon: Facebook
                },
                {
                    name: "Instagram",
                    url: "https://instagram.com",
                    icon: Instagram
                }
            ]
        }
    }

    const { socials } = useMemo(() => FooterJson, []);

    return (
        <footer className="bg-gray-50 text-gray-600">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/logo.png"
                                alt="ProfResume Logo"
                                className="w-15 h-9 transition-transform group-hover:scale-105"
                            />
                        </div>
                        <p className="text-sm mb-6 leading-relaxed max-w-md">
                            Build professional, ATS-friendly resumes that get you hired. Join 50,000+ job seekers who landed their dream jobs with our AI-powered resume builder.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <a href="mailto:avinashmanitripathi97@gmail.com" className="hover:text-blue-600 transition-colors">
                                    avinashmanitripathi97@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span>+91 6393177038</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span>Maharajganj Gorakhpur Uttar Pradesh 273303</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {
                                socials.links.map((el) =>
                                    <a key={el.name} aria-label={el.name} href={el.url} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white border border-gray-200 hover:bg-blue-600 hover:border-blue-600 group rounded-lg flex items-center justify-center transition-colors">
                                        <el.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                    </a>
                                )
                            }
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/resume-builder" className="hover:text-blue-600 transition-colors">Resume Builder</Link></li>
                            <li><Link href="/templates" className="hover:text-blue-600 transition-colors">Resume Templates</Link></li>
                            <li><Link href="/tailor" className="hover:text-blue-600 transition-colors">AI Resume Tailoring</Link></li>
                            <li><Link href="/ats-checker" className="hover:text-blue-600 transition-colors">ATS Checker</Link></li>
                            <li><Link href="/cover-letter" className="hover:text-blue-600 transition-colors">Cover Letter Builder</Link></li>
                            <li><Link href="/resume-examples" className="hover:text-blue-600 transition-colors">Resume Examples</Link></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/resources/resume-guide" className="hover:text-blue-600 transition-colors">Resume Writing Guide</Link></li>
                            <li><Link href="/resources/cover-letter-guide" className="hover:text-blue-600 transition-colors">Cover Letter Guide</Link></li>
                            <li><Link href="/resources/ats-guide" className="hover:text-blue-600 transition-colors">ATS Guide</Link></li>
                            <li><Link href="/resources/career-tips" className="hover:text-blue-600 transition-colors">Career Tips</Link></li>
                            <li><Link href="/resources/industry-examples" className="hover:text-blue-600 transition-colors">Industry Examples</Link></li>
                            <li><Link href="/resources/ai-resume-review" className="hover:text-blue-600 transition-colors">AI Resume Review</Link></li>
                            <li><Link href="/resources/resume-checker" className="hover:text-blue-600 transition-colors">Resume Checker</Link></li>
                            <li><Link href="/resources/resume-keyword-generator" className="hover:text-blue-600 transition-colors">Keyword Generator</Link></li>
                            <li><Link href="/resources/resume-booster" className="hover:text-blue-600 transition-colors">Resume Booster</Link></li>
                            <li><Link href="/resources/resume-fixer" className="hover:text-blue-600 transition-colors">Resume Fixer</Link></li>
                            <li><Link href="/resources/resume-scanner" className="hover:text-blue-600 transition-colors">Resume Scanner</Link></li>
                            <li><Link href="/resources/resume-critique" className="hover:text-blue-600 transition-colors">Resume Critique</Link></li>
                            <li><Link href="/resources/targeted-resume" className="hover:text-blue-600 transition-colors">Targeted Resume</Link></li>
                            <li><Link href="/resources/for-organizations" className="hover:text-blue-600 transition-colors">For Organizations</Link></li>
                            <li><Link href="/resources/update-your-resume-io-resume" className="hover:text-blue-600 transition-colors">Update Resume.io</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-gray-200 pt-8 pb-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-gray-900 font-bold text-xl mb-2">Get Career Tips & Resume Advice</h3>
                        <p className="text-sm mb-6">Join 50,000+ subscribers getting weekly career tips, resume templates, and job search strategies.</p>

                        <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                {subscribed ? (
                                    <>✓ Subscribed</>
                                ) : (
                                    <>
                                        Subscribe
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm">
                            © {new Date().getFullYear()} ProfResume. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <Link href="/sitemap.xml" className="hover:text-blue-600 transition-colors">Sitemap</Link>
                            <Link href="/accessibility" className="hover:text-blue-600 transition-colors">Accessibility</Link>
                            <Link href="/security" className="hover:text-blue-600 transition-colors">Security</Link>
                            <Link href="/cookies" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">✓</span>
                            </div>
                            <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">✓</span>
                            </div>
                            <span>GDPR Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">★</span>
                            </div>
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">50K+</span>
                            </div>
                            <span>Happy Users</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
