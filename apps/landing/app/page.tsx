"use client";

import { Navigation } from "@/components/Navigation";
import { ArrowRight, Check, Star, Sparkles, Zap, Shield, Users, TrendingUp, FileText, Download, Edit3 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Template {
  id: string;
  name: string;
  html: string;
  image?: string;
}

export default function LandingPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:4000/resumes');
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Mega Menu Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-blue-700" />
                Trusted by 50,000+ professionals
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Create Your Perfect Resume in{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Minutes
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Build professional, ATS-friendly resumes that get you hired. No design skills required. Just fill in your details and download.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/editor" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Create Resume Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#how-it-works" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all flex items-center justify-center gap-2">
                  See How It Works
                </Link>
              </div>

              {/* ATS Checker Button */}
              <div className="mb-12">
                <Link
                  href="/ats-checker"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Check Your Resume's ATS Score
                    </div>
                    <div className="text-sm text-gray-600">
                      Free • Instant Results • No Sign-up Required
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 ml-auto" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Resumes Created</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Resume Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-gray-900 text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">John Doe</div>
                    <div className="text-gray-600">Senior Software Engineer</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>

                  <div className="pt-4">
                    <div className="h-4 bg-blue-100 rounded-full w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-100 rounded-full w-full mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                ATS Optimized
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Instant PDF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "ATS-Friendly Templates",
                description: "Beat applicant tracking systems with optimized templates that get past the robots"
              },
              {
                icon: <Edit3 className="w-6 h-6" />,
                title: "Easy Editor",
                description: "Intuitive drag-and-drop editor makes creating your resume a breeze"
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Instant Download",
                description: "Export to PDF or Word format with a single click"
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "AI-Powered",
                description: "Get smart suggestions to improve your resume content"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure & Private",
                description: "Your data is encrypted and never shared with third parties"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Fast",
                description: "Create a professional resume in under 10 minutes"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Professional Resume Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of ATS-friendly, professionally designed templates
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const container = document.getElementById('templates-slider');
                if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all -ml-4 hidden md:block"
              aria-label="Previous templates"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => {
                const container = document.getElementById('templates-slider');
                if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all -mr-4 hidden md:block"
              aria-label="Next templates"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider */}
            <div
              id="templates-slider"
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isLoading ? (
                // Loading skeleton
                [...Array(6)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden border-2 border-gray-200 animate-pulse">
                    <div className="aspect-[8.5/11] bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))
              ) : (
                templates.map((template) => (
                  <Link
                    key={template.id}
                    href={`/editor?template=${template.id}`}
                    className="flex-shrink-0 w-80 group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-xl"
                  >
                    {/* Template Preview */}
                    <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {template.image ? (
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3/4 h-5/6 bg-white rounded-lg shadow-lg p-4 transform group-hover:scale-105 transition-transform">
                            {/* Simulated resume preview */}
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                              <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                              <div className="mt-4 space-y-1">
                                <div className="h-2 bg-gray-300 rounded"></div>
                                <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                                <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                              </div>
                              <div className="mt-4 space-y-1">
                                <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-lg font-bold mb-2">Use This Template</div>
                          <ArrowRight className="w-6 h-6 mx-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                          Template
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Professional ATS-friendly design</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Hide scrollbar CSS */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="text-center mt-12">
            <Link href="/editor" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg">
              Start Creating Your Resume
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to your perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Template",
                description: "Select from our collection of professional, ATS-friendly templates"
              },
              {
                step: "02",
                title: "Fill Details",
                description: "Add your experience, skills, and education with our easy editor"
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Export your resume and start applying to your dream jobs"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                    <span className="relative z-10">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer",
                avatar: "SC",
                text: "Got 3 interviews in the first week! The templates are clean and professional."
              },
              {
                name: "Michael Johnson",
                role: "Product Manager",
                avatar: "MJ",
                text: "Finally landed my dream job! This tool made my resume stand out from hundreds."
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer",
                avatar: "ER",
                text: "As a designer, I'm picky. These templates are actually good. Clean and effective."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["1 Resume", "Basic Templates", "PDF Export", "Email Support"],
                cta: "Start Free",
                popular: false
              },
              {
                name: "Pro",
                price: "$9",
                period: "month",
                features: ["Unlimited Resumes", "All Premium Templates", "PDF & Word Export", "Priority Support", "AI Features"],
                cta: "Get Pro",
                popular: true
              },
              {
                name: "Lifetime",
                price: "$49",
                period: "one-time",
                features: ["Everything in Pro", "Lifetime Access", "Future Updates", "Premium Support"],
                cta: "Buy Lifetime",
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 border-2 ${plan.popular ? 'border-blue-600 shadow-xl relative' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/editor" className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join 50,000+ professionals who've transformed their careers with ResumePro
          </p>
          <Link href="/editor" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
            Create Your Resume Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ResumePro</span>
              </div>
              <p className="text-sm">Create professional resumes that get you hired.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
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
