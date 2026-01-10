import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { GraduationCap, Sparkles, TrendingUp, Target, Award, CheckCircle, Lightbulb, Users, FileText, Rocket } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Fresher Resume Builder 2026 - Entry Level Resume Templates | First Job Ready',
    description: 'Build your first professional resume with our fresher-focused builder. Highlight internships, projects, coursework, and skills even without work experience. Land your first job faster.',
    keywords: 'fresher resume, entry level resume, first job resume, graduate resume, student resume builder, resume for beginners, no experience resume',
    alternates: {
        canonical: '/resume-builder/fresher',
    },
};

export default function FresherResumePage() {
    const faqs = [
        { question: "What should I put on my resume if I have no work experience?", answer: "Focus on education, relevant coursework, academic projects, internships, volunteer work, extracurricular activities, and transferable skills. Emphasize achievements and leadership roles." },
        { question: "How do I make my resume stand out as a fresher?", answer: "Highlight specific achievements with metrics, showcase relevant projects, include certifications, demonstrate technical or soft skills through examples, and tailor your resume to each job application." },
        { question: "Should I include my GPA on my resume?", answer: "Include GPA if it's 3.0 or above. If below 3.0, consider including major GPA if it's stronger, or omit entirely and focus on other achievements." },
        { question: "What's the ideal resume length for freshers?", answer: "Keep it to one page. Recruiters spend 6-8 seconds on initial review, so make every word count. Focus on quality, not quantity." },
        { question: "How important are internships for freshers?", answer: "Very important! Internships show real-world experience and make you 60% more likely to get interviews. Include internship projects, responsibilities, and measurable outcomes." }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Fresher", url: `${ENV.BASE_URL}/resume-builder/fresher` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Fresher Resume Builder 2026 - Land Your First Job"
                description="Build a professional entry-level resume that gets interviews even without work experience. Perfect for recent graduates and career starters."
                url={`${ENV.BASE_URL}/resume-builder/fresher`}
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="Entry Level"
                badgeIcon={GraduationCap}
                title={
                    <>
                        Fresher <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Resume Builder</span>
                    </>
                }
                subtitle="Create your first professional resume with confidence. Our fresher-focused builder helps you showcase skills, projects, and potential—even without work experience. Start your career strong."
            />

            <ResourceFeatureGrid
                title="Perfect for Fresh Graduates"
                features={[
                    {
                        icon: <Sparkles className="w-6 h-6" />,
                        title: "Emphasize Strengths",
                        description: "Highlight education, projects, coursework, and skills when work experience is limited."
                    },
                    {
                        icon: <FileText className="w-6 h-6" />,
                        title: "Pre-Written Content",
                        description: "Access 500+ fresher-specific bullet points and achievement examples."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Skill Showcasing",
                        description: "Dedicated sections for technical skills, soft skills, and certifications."
                    },
                    {
                        icon: <Rocket className="w-6 h-6" />,
                        title: "Project Highlights",
                        description: "Feature academic and personal projects with impact metrics and technologies used."
                    },
                    {
                        icon: <Award className="w-6 h-6" />,
                        title: "Achievement Focus",
                        description: "Turn coursework, competitions, and activities into compelling achievements."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "Entry-Level Templates",
                        description: "Clean, professional designs that work for candidates with 0-2 years experience."
                    }
                ]}
            />

            <ResourceContentSection
                title="What to Include in Your Fresher Resume"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Resume Sections</h3>
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Education (Most Important for Freshers)
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Degree, Major, University name, Graduation date</li>
                                        <li>• GPA (if 3.0 or above), academic honors, scholarships</li>
                                        <li>• Relevant coursework (3-5 courses related to target job)</li>
                                        <li>• Academic achievements, Dean's List, awards</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Projects (Show Practical Skills)
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Academic projects from major courses</li>
                                        <li>• Personal projects (apps, websites, research)</li>
                                        <li>• Technologies and tools used</li>
                                        <li>• Results and impact (downloads, users, grades)</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Skills & Certifications
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Technical skills (programming languages, software)</li>
                                        <li>• Soft skills (leadership, teamwork, communication)</li>
                                        <li>• Online certifications (Coursera, LinkedIn Learning)</li>
                                        <li>• Languages spoken</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Internships & Extracurriculars
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Summer internships (even if short)</li>
                                        <li>• Volunteer work and community service</li>
                                        <li>• Leadership roles in clubs/organizations</li>
                                        <li>• Competitions and hackathons</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" />
                                Common Mistakes to Avoid
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>❌ Using a generic objective statement instead of a strong summary</li>
                                <li>❌ Listing job duties instead of achievements and impact</li>
                                <li>❌ Including irrelevant information (high school, hobbies unrelated to job)</li>
                                <li>❌ Poor formatting that's hard to read or not ATS-friendly</li>
                                <li>❌ Typos and grammatical errors (proofread 3+ times!)</li>
                                <li>❌ Using "I", "me", "my" (use action verbs instead)</li>
                            </ul>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Sample Achievement Bullets for Freshers
                    </h2>
                    <div className="space-y-4">
                        {[
                            "Led team of 4 students in capstone project developing mobile app, achieving 4.0 grade and 500+ downloads within first month",
                            "Completed 3-month summer internship at [Company], assisting in development of customer portal that reduced support tickets by 25%",
                            "Achieved Dean's List for 6 consecutive semesters with 3.8 GPA while working part-time 20 hours/week",
                            "Built personal portfolio website using React and Node.js, demonstrating proficiency in full-stack development",
                            "Volunteered as coding tutor for 50+ underprivileged students, improving their programming fundamentals by 40% on average",
                            "Won 2nd place in university hackathon (80 participants) by developing AI-powered study assistant in 24 hours"
                        ].map((bullet, index) => (
                            <div key={index} className="bg-white rounded-lg border-2 border-green-200 p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">{bullet}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ResourceCTA
                title="Build Your First Professional Resume"
                subtitle="Join 25,000+ fresh graduates who landed their first job using our resume builder"
            />
        </div>
    );
}
