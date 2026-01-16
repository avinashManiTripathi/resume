import { ArrowRight, Check, Star, Sparkles, Zap, Shield, Users, FileText, Download, Edit3, Brain, Target, TrendingUp, Clock, Mic, MicOff, Send, Award, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ENV } from "./env";
import { TemplatesSection } from "@/components/TemplatesSection";
import { VoiceDemo } from "@/components/VoiceDemo";
import { ProductSchema } from "@/components/ProductSchema";
import { HowItWorks } from "@/components/HowItWorks";
import { URLS } from "@/constants/urls";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function LandingPage() {



  return (
    <div className="min-h-screen bg-white">
      {/* Product Schema for SEO - Star Ratings in Google */}
      <ProductSchema />
      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100/50 via-white to-indigo-100/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Column */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold mb-6">
                #1 Platform for AI Resume Automation
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                Work smarter with{" "}
                <span className="text-blue-600">AI resume</span> automation software
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Automate your resume writing and job matching to boost your hireability and save time with our AI-powered resume optimization and tracking tool.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href={URLS.EDITOR}
                  target="_blank"
                  className="bg-blue-600 text-white font-bold px-7 py-3.5 rounded-lg hover:bg-blue-700 transition-all text-center"
                >
                  Try ProfResume — Free
                </Link>
                <Link
                  href={URLS.EDITOR_ATS_CHECKER}
                  target="_blank"
                  className="flex items-center justify-center gap-3 bg-white border border-gray-300 px-7 py-3.5 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
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

            {/* Right Column - Enhanced Floating UI */}
            <div className="relative h-[450px] lg:h-[500px] flex items-center justify-center">
              {/* Circular Path - Smaller and tighter */}
              <div className="absolute w-[400px] h-[400px] lg:w-[450px] lg:h-[450px] border-2 border-dashed border-blue-50 rounded-full animate-[spin_120s_linear_infinite]" />

              {/* Central Card - Detailed Resume Dashboard (Bottom Layer) */}
              <div className="absolute z-10 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 border border-gray-100 w-full max-w-[340px] lg:max-w-[380px]">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <FileText className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Resume Analysis</div>
                      <div className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider">AI Powered</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-blue-600">92%</div>
                    <div className="text-[9px] text-gray-400 font-bold">MATCH SCORE</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Technical Skills", width: "90%", color: "bg-blue-500" },
                    { label: "Experience Match", width: "85%", color: "bg-green-500" },
                    { label: "Education Sync", width: "70%", color: "bg-purple-500" }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-gray-700">{item.label}</span>
                        <span className="text-[10px] font-bold text-gray-400">{item.width}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sarah Case - Floating Top Left (Highest Layer) */}
              <div className="absolute z-30 top-10 -left-4 md:-left-8 lg:-left-12 animate-bounce transition-all duration-300">
                <div className="bg-white rounded-xl shadow-lg p-2.5 border border-gray-100 flex items-center gap-2.5 rotate-[-4deg]">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shadow-inner uppercase">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop" alt="Sarah" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-gray-900">Sarah M.</div>
                    <div className="text-[9px] font-bold text-green-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full" /> Hired at Google
                    </div>
                  </div>
                </div>
              </div>

              {/* James Case - Floating Bottom Left */}
              <div className="absolute z-30 bottom-10 -left-6 md:-left-10 lg:-left-14 animate-pulse">
                <div className="bg-white rounded-xl shadow-lg p-2.5 border border-gray-100 flex items-center gap-2.5 rotate-[6deg]">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shadow-inner uppercase">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop" alt="James" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-gray-900">James L.</div>
                    <div className="text-[9px] font-bold text-blue-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-blue-500 rounded-full" /> Hired at Amazon
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Card - Floating Top Right */}
              <div className="absolute z-30 top-10 -right-4 md:-right-6 lg:-right-8 bg-blue-600 rounded-xl shadow-xl p-3 text-white w-40 rotate-4 animate-[bounce_4s_infinite]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 bg-white/20 rounded-md">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-100">Job Match</span>
                </div>
                <div className="text-[12px] font-bold leading-tight">Senior UI/UX Designer at Meta</div>
                <div className="mt-2 h-1 w-10 bg-white/40 rounded-full" />
              </div>

              {/* Graph Card - Floating Bottom Right */}
              <div className="absolute z-20 bottom-8 -right-4 md:-right-8 lg:-right-12 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 w-[180px] md:w-[200px]">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[10px] font-black text-gray-900 uppercase">Hireability growth</div>
                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                </div>
                <div className="h-12 flex items-end gap-1">
                  {[20, 35, 30, 50, 45, 75, 90].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-50 rounded-t-sm relative group h-full">
                      <div
                        className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm transition-all duration-700"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Icons (Highest Layer) */}
              <div className="absolute top-[25%] right-[15%] z-40 w-9 h-9 bg-blue-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
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
      </section>


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
              Everything You Need to Know About Resume Building
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides to help you create the perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Resume Builder */}
            <Link
              href="/free-resume-builder"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-400 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Free Resume Builder
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Create professional resumes 100% free. No credit card, no watermarks. 20+ templates and unlimited downloads.
              </p>
              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">
                Start Building Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Best Resume Builder */}
            <Link
              href="/best-resume-builder"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Best Resume Builder
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover what makes a great resume builder. Learn about AI features, ATS optimization, and tools that work.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Professional Resume Service */}
            <Link
              href="/professional-resume-service"
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Service vs Builder
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Compare professional resume services with builders. Find the right option for your situation and budget.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                Compare Options <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tested Templates Section */}
      <TemplatesSection />

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
                    alt="Prateek - Product Designer success story using ProfResume"
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
      </section >
    </div >
  );
}
