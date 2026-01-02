"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check, Star, Sparkles, Zap, Shield, Users, FileText, Download, Edit3, Brain, Target, TrendingUp, Clock } from "lucide-react";
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

  // Services for animated banner
  const services = [
    "Resume Builder",
    "AI Writer",
    "Cover Letters",
    "ATS Checker",
    "Interview Prep",
    "Job Board",
    "Career Coaching"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Animated Services Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-3 overflow-hidden">
        <div className="inline-flex animate-scroll">
          {[...services, ...services, ...services].map((service, index) => (
            <div key={index} className="flex items-center mx-8 whitespace-nowrap">
              <span className="text-white font-semibold text-sm">{service}</span>
              <span className="text-white/50 mx-4">•</span>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            will-change: transform;
          }
        `}</style>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <Link href="/editor" className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-8 py-4 rounded-lg  transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
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

      {/* Way Beyond Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Way beyond a resume builder...
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to land your dream job, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI writes for you",
                description: "Stuck? AI suggests professional phrases. Speak into mic and AI fixes mistakes automatically.",
                color: "blue"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Step-by-step guidance",
                description: "No need to think much. We guide you through every step. Clear and simple.",
                color: "purple"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Instant cover letters",
                description: "Just paste a job link. We create a matching cover letter using your resume in 2 mins.",
                color: "green"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Paste any job link",
                description: "Simple and effective. Just paste the job description and we pre-build your resume to match.",
                color: "orange"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Recruiter Match",
                description: "We match your resume with up to 50 recruiters a week. When there's a match, they contact you.",
                color: "pink"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "ATS Optimized",
                description: "Beat applicant tracking systems with templates designed by recruiters.",
                color: "teal"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Resume Tailoring Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-200">
                  {/* Mockup of Tailor Feature */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">AI Resume Tailoring</div>
                        <div className="text-sm text-gray-600">Match any job in seconds</div>
                      </div>
                    </div>

                    {/* Job Description Input */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">Paste Job Description</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="flex items-center gap-2 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">AI analyzing...</span>
                    </div>

                    {/* Optimized Resume Preview */}
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-green-900">Optimized for job match!</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-green-600 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="bg-purple-100 text-purple-700 absolute -top-4 -right-4 px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
                  95% Match Rate
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                Smart Tailoring
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Tailor your resume to any job in{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  30 seconds
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Just paste the job description. Our AI analyzes requirements and automatically optimizes your resume to match. Increase your chances of getting interviews by 3x.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Analyzes job requirements instantly",
                  "Highlights relevant skills & experience",
                  "Optimizes keywords for ATS",
                  "Suggests improvements for better match"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/tailor"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
              >
                Try Resume Tailoring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Content Generation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <Brain className="w-4 h-4" />
                AI-Powered Writing
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                AI writes your resume from{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  just a few details
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stuck on what to write? Our AI generates professional content for you. Just provide basic info, and get perfectly written resume sections in seconds.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Professional, recruiter-approved language",
                  "Action verbs & achievement metrics",
                  "Industry-specific keywords",
                  "Instant suggestions as you type"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/editor"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
              >
                Start Writing with AI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right - Visual */}
            <div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-200">
                  {/* AI Writing Demo */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">AI Content Generator</div>
                        <div className="text-sm text-gray-600">Professional writing, instantly</div>
                      </div>
                    </div>

                    {/* Input */}
                    <div>
                      <div className="text-xs text-gray-500 mb-2">Your input:</div>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-700">Managed team, increased sales</p>
                      </div>
                    </div>

                    {/* AI Magic */}
                    <div className="flex items-center justify-center">
                      <div className="flex gap-1">
                        <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                        <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>

                    {/* AI Output */}
                    <div>
                      <div className="text-xs text-gray-500 mb-2">AI-enhanced result:</div>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
                        <p className="text-sm text-gray-900 leading-relaxed">
                          • Led cross-functional team of 12 members, implementing strategic initiatives that drove a 35% increase in quarterly sales revenue
                          <br />
                          • Optimized sales processes and team workflows, resulting in 20% improvement in conversion rates
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="bg-purple-100 text-purple-700 px-8 py-4 rounded-lg font-semibold absolute -bottom-4 -right-4">
                  10x Better Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Letter Generator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-200">
                  {/* Cover Letter Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Cover Letter</div>
                          <div className="text-sm text-gray-600">Auto-generated</div>
                        </div>
                      </div>
                      <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        Ready in 2 mins
                      </div>
                    </div>

                    {/* Letter Preview */}
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>

                      <div className="pt-3 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>

                      <div className="pt-3">
                        <div className="h-3 bg-gray-800 rounded w-1/3"></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex gap-3">
                      <div className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg text-sm font-semibold">
                        Download PDF
                      </div>
                      <div className="flex-1 border-2 border-gray-300 text-gray-700 text-center py-2 rounded-lg text-sm font-semibold">
                        Edit
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="bg-purple-100 text-purple-700 absolute -top-4 -left-4  px-4 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  2 Min Generation
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                <FileText className="w-4 h-4" />
                Instant Cover Letters
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Generate matching cover letters{" "}
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  instantly
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Don't waste hours writing cover letters. Just paste the job link, and our AI creates a perfectly tailored cover letter using your resume in 2 minutes.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Auto-matches your resume to job requirements",
                  "Professionally written by AI",
                  "Customized for each application",
                  "Download as PDF instantly"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/editor"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
              >
                Create Cover Letter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tested Templates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-full text-sm font-semibold mb-6">
              <Check className="w-4 h-4" />
              Tested with top employers
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Professional resume templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with recruiters. Tested with top employers. Proven to get interviews.
            </p>
          </div>

          {/* Templates Slider */}
          <div className="relative">
            <div
              id="templates-slider"
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isLoading ? (
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
                    className="flex-shrink-0 w-80 group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-2xl"
                  >
                    <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {template.image ? (
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3/4 h-5/6 bg-white rounded-lg shadow-lg p-4">
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                              <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                              <div className="mt-4 space-y-1">
                                <div className="h-2 bg-gray-300 rounded"></div>
                                <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                        <div className="text-white font-bold text-lg">Use Template</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600">ATS-friendly • Professional</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </section>

      {/* ATS Score Checker Section with Image */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" />
                ATS Optimization
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Beat the robots.{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Get hired faster
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                95% of Fortune 500 companies use ATS to filter resumes. Our built-in ATS checker ensures your resume gets past the robots and into human hands.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time ATS compatibility score",
                  "Keyword optimization suggestions",
                  "Format and structure analysis",
                  "Instant improvement recommendations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/ats-checker"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-8 py-4 rounded-lg inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
              >
                Check ATS Score Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right - Professional Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Score Card Overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Your ATS Score</div>
                      <div className="text-4xl font-bold text-green-600">95/100</div>
                    </div>
                    <div className="w-20 h-20">
                      <svg className="transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#10B981" strokeWidth="3"
                          strokeDasharray="95 5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    <Check className="w-4 h-4" />
                    <span className="font-semibold">Excellent! Ready to apply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section with Real Image */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Real Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Join thousands who landed their dream jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our users get hired at top companies worldwide
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Success Story 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                    alt="Professional woman"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Got my dream role at Google! The AI suggestions were game-changing. Had 5 interviews in 2 weeks."
                  </p>
                  <div className="font-bold text-gray-900">Sarah Martinez</div>
                  <div className="text-sm text-gray-600">Software Engineer at Google</div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full inline-flex">
                    <Check className="w-4 h-4" />
                    <span>Hired in 14 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                    alt="Professional man"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Landed 3 offers and negotiated 40% higher salary. The tailoring feature is incredible!"
                  </p>
                  <div className="font-bold text-gray-900">James Chen</div>
                  <div className="text-sm text-gray-600">Product Manager at Meta</div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-flex">
                    <TrendingUp className="w-4 h-4" />
                    <span>40% salary increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Read more success stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Examples Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Resume examples for every profession
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse hundreds of professional resume examples tailored to your industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                industry: "Technology",
                roles: "Software Engineer, Data Scientist, DevOps",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
                color: "blue"
              },
              {
                industry: "Healthcare",
                roles: "Nurse, Doctor, Medical Assistant",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80",
                color: "green"
              },
              {
                industry: "Business",
                roles: "Manager, Consultant, Analyst",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=80",
                color: "purple"
              },
              {
                industry: "Creative",
                roles: "Designer, Writer, Photographer",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=80",
                color: "pink"
              }
            ].map((item, index) => (
              <Link
                key={index}
                href="/resume-examples"
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.industry}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{item.industry}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">{item.roles}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    <span>View examples</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/resume-examples"
              className="bg-blue-600 text-white font-semibold hover:bg-blue-700 inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all group"
            >
              Browse All Examples
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Process with Images */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Your resume ready in 3 simple steps
            </h2>
            <p className="text-xl text-gray-600">
              From start to download in under 10 minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose your template",
                description: "Select from our ATS-friendly templates designed by recruiters",
                image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80"
              },
              {
                step: "02",
                title: "Fill in your details",
                description: "Our AI helps you write professional content as you type",
                image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=600&auto=format&fit=crop&q=80"
              },
              {
                step: "03",
                title: "Download & apply",
                description: "Get your polished resume as PDF and start applying to jobs",
                image: "https://images.unsplash.com/photo-1586281380614-94b1e8f28804?w=600&auto=format&fit=crop&q=80"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 group-hover:border-blue-500 group-hover:shadow-2xl transition-all">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {item.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/editor"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
            >
              Get Started Now - It's Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Resumes created" },
              { number: "95%", label: "Interview success" },
              { number: "5 mins", label: "Average completion" },
              { number: "4.9★", label: "User rating" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Join thousands who landed their dream jobs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer at Google",
                text: "Got my dream job at Google! The AI suggestions made my resume stand out. I had 5 interview calls in the first week.",
                avatar: "SC",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "Product Manager at Meta",
                text: "The templates are absolutely professional. Landed 3 offers and negotiated 20% higher salary than expected!",
                avatar: "MR",
                rating: 5
              },
              {
                name: "Emily Johnson",
                role: "UX Designer at Apple",
                text: "As a designer, I'm picky about aesthetics. These templates are clean, modern, and actually helped me get hired at Apple.",
                avatar: "EJ",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
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

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Join 50,000+ professionals who transformed their careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/editor"
              className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center gap-3 group"
            >
              Create Your Resume Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="text-white/80 mt-6 text-sm">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
