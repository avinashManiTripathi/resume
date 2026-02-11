import type { Metadata } from "next";

import { ArrowRight, Check, Star, Sparkles, Zap, Shield, Users, FileText, Download, Edit3, Brain, Target, TrendingUp, Clock, Mic, MicOff, Send, Award, Bell, X, HelpCircle, Rocket, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TemplatesSection } from "@/components/TemplatesSection";
import { VoiceDemo } from "@/components/VoiceDemo";
import { ProductSchema } from "@/components/ProductSchema";
import { HowItWorks } from "@/components/HowItWorks";
import { ComparisonSection } from "@/components/ComparisonSection";
import { HowToGuide } from "@/components/HowToGuide";
import { FAQSection } from "@/components/FAQSection";
import { Suspense } from "react";
import { TemplatesSkeleton } from "@/components/TemplatesSkeleton";
import { URLS } from "@/constants/urls";


export const metadata: Metadata = {
  title: 'Free Resume Builder 2026 | Create a Professional Resume with AI',
  description: 'Build a job-winning resume in minutes with our 100% free AI resume builder. 20+ ATS-friendly templates, expert writing tips, and instant PDF download. No sign-up required.',
  keywords: [
    'Free Resume Builder',
    'AI Resume Writer',
    'CV Maker Online',
    'Resume Templates Free',
    'Professional Resume Creator',
    'Make a Resume for Free'
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: 'Free Resume Builder 2026 | Create a Professional Resume with AI',
    description: 'Build a job-winning resume in minutes with our 100% free AI resume builder. 20+ ATS-friendly templates, expert writing tips, and instant PDF download.',
    url: '/',
    type: 'website',
  },
};

export default async function LandingPage() {



  return (
    <div className="min-h-screen bg-white">
      {/* Product Schema for SEO - Star Ratings in Google */}
      <ProductSchema />
      {/* Hero Section */}
      <section className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Column */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-1.5 bg-blue-50/80 text-blue-600 rounded-lg text-sm font-bold mb-4 border border-blue-100/50">
                #1 Platform for AI Resume Automation
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-4 tracking-tight">
                Work smarter with{" "}
                <span className="text-blue-600">AI resume</span> automation software
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl font-medium tracking-tight">
                Automate your resume writing and job matching to boost your hireability and save time with our AI-powered resume optimization and tracking tool.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href={URLS.EDITOR}
                  target="_blank"
                  className="bg-blue-600 text-white font-bold px-7 py-3.5 rounded-lg hover:bg-blue-700 transition-all text-center"
                >
                  Try Hirecta — Free
                </Link>
                <Link
                  href={URLS.EDITOR_ATS_CHECKER}
                  target="_blank"
                  className="flex items-center justify-center gap-3 bg-white border border-gray-300 px-7 py-3.5 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                        <img src={`https://i.pravatar.cc/64?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">Check ATS Score</span>
                </Link>
              </div>

              {/* Bottom Features */}
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { icon: <Check className="w-4 h-4 text-gray-600" />, text: "Free forever" },
                  { icon: <Check className="w-4 h-4 text-gray-600" />, text: "No credit card required" },
                  { icon: <Check className="w-4 h-4 text-gray-600" />, text: "Cancel anytime" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-medium text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Premium Floating UI */}
            <div className="relative h-[480px] lg:h-[540px] flex items-center justify-center">
              {/* Animated Background Orbs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-[80px] animate-pulse delay-700" />

              {/* Central Card - Advanced Resume Dashboard */}
              <div className="absolute z-20 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] p-8 border border-gray-100 w-full max-w-[360px] lg:max-w-[420px] overflow-hidden group hover:scale-[1.02] transition-all duration-700">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-50/30 to-transparent -skew-x-[45deg] animate-shimmer pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-base">AI Analysis</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Processing Optimization</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-600">92%</div>
                      <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Match Score</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: "Technical Keyword Sync", width: "94%", color: "from-blue-500 to-indigo-600", icon: <Target className="w-3.5 h-3.5" /> },
                      { label: "Experience Impact", width: "88%", color: "from-green-500 to-emerald-600", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                      { label: "Role Alignment", width: "91%", color: "from-purple-500 to-violet-600", icon: <Users className="w-3.5 h-3.5" /> }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center group/item">
                          <div className="flex items-center gap-2">
                            <div className="text-gray-400 group-hover/item:text-blue-500 transition-colors">{item.icon}</div>
                            <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{item.width}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: item.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden ring-4 ring-gray-50/50">
                            <img width={28} height={28} src={`https://i.pravatar.cc/64?img=${i + 20}`} alt="User" />
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                        Used by <span className="text-gray-900">10k+ creators</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element - Sarah (Top Left) */}
              <div className="absolute z-30 top-12 -left-8 lg:-left-16 animate-float-slow">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-3 border border-white/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner ring-2 ring-white">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&auto=format&fit=crop" alt="Sarah" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none mb-1">Sarah Mitchell</div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-full border border-green-100/50">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-black text-green-700 uppercase tracking-tighter">Hired at Google</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element - Job Alert (Top Right) */}
              <div className="absolute z-30 top-20 -right-4 lg:-right-12 animate-float delay-500">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-4 text-white w-44 hover:rotate-3 transition-transform duration-500">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                      <Bell className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-100">Smart Alert</span>
                  </div>
                  <div className="text-[13px] font-black leading-tight mb-2">Senior Product Designer at Meta</div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-blue-200">
                    <span>98% Match</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Floating Element - Success Metrics (Bottom Right) */}
              <div className="absolute z-30 bottom-16 -right-8 lg:-right-16 animate-float-slow delay-1000">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white/50 w-[200px]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Success Growth</div>
                    <div className="p-1 bg-green-50 rounded-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    </div>
                  </div>
                  <div className="h-16 flex items-end gap-1.5">
                    {[30, 45, 35, 60, 50, 85, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-50 rounded-full relative group h-full overflow-hidden">
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out group-hover:from-indigo-600 group-hover:to-indigo-400"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-[11px] font-black text-blue-600">+127% Increase</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">30 Days</div>
                  </div>
                </div>
              </div>

              {/* Decorative Sparkles */}
              <div className="absolute top-[20%] left-[10%] z-40 w-10 h-10 bg-white rounded-2xl border border-gray-100 shadow-xl flex items-center justify-center animate-bounce-slow">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <div className="absolute bottom-[20%] left-[15%] z-40 w-8 h-8 bg-white rounded-xl border border-gray-100 shadow-lg flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
            </div>

            {/* Decorative Icons (Highest Layer) */}
            <div className="absolute top-[25%] right-[15%] z-40 w-9 h-9 bg-blue-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - SEO Section */}
      <HowItWorks />

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
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
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
                href={URLS.EDITOR_TAILOR}
                target="_blank"
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
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
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
                href={URLS.EDITOR + "?text=true"}
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
                      <div className="flex-1 bg-green-700 text-white text-center py-2 rounded-lg text-sm font-semibold">
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
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
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
                href={URLS.EDITOR_COVER_LETTER}
                target="_blank"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
              >
                Create Cover Letter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section >


      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <VoiceDemo />
        </div>
      </section>



      {/* Resume Builder Section - Compact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Specialized Resume Builders
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Build Your Resume for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Any Career</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a specialized resume builder tailored to your role and industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/resume-builder/software-engineer"
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Software Engineer
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Tech-focused templates with project portfolios and FAANG-optimized content
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                Build Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/resume-builder/fresher"
              className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Fresher / Entry-Level
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Perfect for recent graduates emphasizing education and projects
              </p>
              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">
                Build Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/resume-builder/it-professional"
              className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-cyan-700 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                IT Professional
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                DevOps, cloud engineer, and cybersecurity with certifications
              </p>
              <div className="flex items-center gap-2 text-cyan-800 font-semibold text-sm">
                Build Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/resume-builder/manager"
              className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Manager / Executive
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Leadership-focused showcasing team management and strategy
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                Build Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/resume-builder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Explore All Resume Builders <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pillar Pages Section - Compact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Professional Resume Tools & Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master your job search with our AI-powered suite of resume tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Free Resume Builder */}
            <Link
              href="/free-resume-builder"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Free Resume Builder
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Create professional resumes 100% free. No credit card, no watermarks, unlimited downloads.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                Start Building Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* AI Resume Builder */}
            <Link
              href="/ai-resume-builder"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                AI Resume Builder
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Let AI write your resume in minutes. Smart content suggestions and keyword optimization built-in.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                Try AI Builder <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ATS Resume Builder */}
            <Link
              href="/ats-resume-builder"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                ATS Resume Builder
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tested templates guaranteed to pass Applicant Tracking Systems. Beat the filters and get hired.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                Check ATS Templates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ATS Checker */}
            <Link
              href="/ats-checker"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                Free ATS Checker
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Scan your existing resume for ATS compatibility. Get scores, missing keywords, and fixes.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                Scan My Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Resume Tailor */}
            <Link
              href="/tailor"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-pink-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-pink-500 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                AI Resume Tailor
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Target your resume to specific job descriptions instantly. Triple your interview callbacks.
              </p>
              <div className="flex items-center gap-2 text-pink-600 font-semibold text-sm">
                Tailor My Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Resume Templates */}
            <Link
              href="/templates"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                Resume Templates
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose from 50+ professional, modern, and creative templates designed by hiring experts.
              </p>
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                Browse Templates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tested Templates Section */}
      <Suspense fallback={<TemplatesSkeleton />}>
        <TemplatesSection />
      </Suspense>

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
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
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
                href={URLS.EDITOR_ATS_CHECKER}
                target="_blank"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-8 py-4 rounded-lg inline-flex items-center gap-3 hover:shadow-2xl transition-all group"
              >
                Check Free ATS Score
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right - Professional Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                  alt="Professional team discussing resume optimization and ATS compliance"
                  fill
                  className="object-cover"
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

      {/* Why Us Comparison Section */}
      <ComparisonSection />

      {/* How to Guide Section */}
      <HowToGuide />

      {/* FAQ Section */}
      <FAQSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hirecta",
            "url": "https://hirecta.com",
            "logo": "https://hirecta.com/logo.png",
            "sameAs": [
              "https://twitter.com/hirecta",
              "https://linkedin.com/company/hirecta"
            ]
          })
        }}
      />

      {/* Success Stories Section with Real Image */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              Real Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Join thousands who landed their dream jobs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our users get hired at top companies worldwide
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Success Story 1 */}
            <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-all">
              <div className="grid md:grid-cols-2">
                <div className="h-48 md:h-auto relative">
                  <Image
                    src={"/images/prateek.png"}
                    alt="Prateek - Product Designer success story using Hirecta"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">

                  <div className="font-bold text-gray-900">Prateek Singh</div>
                  <div className="text-sm text-gray-600 mb-3">Product Designer | Design Engineer  at Compliance Innovation</div>
                  <div className="flex items-center mb-3 gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full inline-flex">
                    <Check className="w-3.5 h-3.5" />
                    <span>Hired in 14 days</span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm italic leading-relaxed">
                    "Got my dream role at Compliance Innovation! The AI suggestions were game-changing. Had 5 interviews in 2 weeks."
                  </p>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-all">
              <div className="grid md:grid-cols-2">
                <div className="h-48 md:h-auto relative">
                  <Image
                    src="/images/abhishek.jpeg"
                    alt="Abhishek - Product Manager success story using AI resume tailoring"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">

                  <div className="font-bold text-gray-900">Abhishek Mahra</div>
                  <div className="text-sm text-gray-600 mb-3">Head of Engineering  at Compliance Innovation</div>
                  <div className="flex mb-3 items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full inline-flex">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>40% salary increase</span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm italic leading-relaxed">
                    "Landed 3 offers and negotiated 40% higher salary. The tailoring feature is incredible!"
                  </p>
                  <div className="flex gap-1 mb-3 ">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all"
            >
              Read more success stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
