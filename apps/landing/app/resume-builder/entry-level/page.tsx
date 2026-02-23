import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Briefcase, Target, Star, CheckCircle, Zap, TrendingUp, Users, Award } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Entry-Level Resume Builder 2026 — Free Templates for New Graduates | Hirecta',
    description: 'Build a professional entry-level resume that gets interviews in 2026. Free ATS-optimized templates for recent graduates, career starters, and junior professionals. Showcase your skills, education, and early experience. Free PDF download.',
    keywords: 'entry level resume builder, entry level resume template, junior resume, new graduate resume, recent grad resume, entry level resume no experience, first job resume, junior professional resume, career starter resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/entry-level' },
    openGraph: {
        title: 'Entry-Level Resume Builder 2026 — Free New Graduate Templates | Hirecta',
        description: 'Free entry-level resume builder for new graduates and career starters. ATS-friendly templates that highlight skills, education, and early experience.',
        url: 'https://hirecta.com/resume-builder/entry-level',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Entry-Level Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Entry-Level Resume Builder 2026 | Hirecta',
        description: 'Build a winning entry-level resume. ATS-optimized, free PDF, no credit card.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Entry-Level Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "6230", "bestRating": "5" },
};

export default function EntryLevelResumePage() {
    const faqs = [
        { question: "What should I put on an entry-level resume with no experience?", answer: "Lead with a strong skills-based summary. Then list: relevant internships or part-time work, academic projects, volunteer experience, certifications and online courses, technical skills, and extracurricular leadership. Employers hiring entry-level candidates expect limited experience — what they're really evaluating is potential, attitude, and skills fit." },
        { question: "Should I use a functional or chronological resume format for entry-level?", answer: "Use a reverse-chronological format. Despite being new to the workforce, this format is preferred by 95% of recruiters and ATS systems. Functional resumes that hide your timeline are a red flag. Instead, use a strong skills summary at the top while keeping the chronological structure." },
        { question: "How do I write a professional summary with no experience?", answer: "Focus on your strongest transferable skills and enthusiasm for the role. Example: 'Detail-oriented Marketing graduate (GPA 3.7) with hands-on experience in social media management and content creation through 2 internships and university projects. Proficient in Google Analytics, HubSpot, and Canva. Eager to drive measurable brand growth at a fast-growing company.'" },
        { question: "How many jobs should I apply to at the entry level?", answer: "Aim for 15–20 targeted applications per week rather than blasting 100+ generic applications. A tailored resume with matched keywords converts at 3x the rate of a generic one. Hirecta's AI tailoring tool helps you customize quickly for each role." },
        { question: "What's the most important section of an entry-level resume?", answer: "The Skills section is critical at entry-level because it's what ATS systems scan first. Then your Projects or Experience sections showing real-world application of those skills. Your GPA matters less than demonstrated ability." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Entry-Level Resume", url: `${ENV.BASE_URL}/resume-builder/entry-level` },
    ];

    const bullets = [
        "Supported senior marketing team of 6 in executing 3 product launch campaigns reaching 250,000+ target customers, contributing to 18% quarter-over-quarter sales increase",
        "Built and maintained 3 client websites using WordPress and Elementor; improved average page load speed by 40% through image optimization and caching plugins",
        "Analyzed 12 months of customer survey data (n=1,400) using Excel pivot tables and VLOOKUP; identified top 5 service issues that drove a new support workflow adopted company-wide",
        "Coordinated logistics for 8 regional company events (50–300 attendees each) as Events Assistant, managing vendor relations, catering, AV setup, and attendee check-in within budget",
        "Completed Google Data Analytics Certificate and applied skills immediately by building a sales performance dashboard for supervisor using Google Looker Studio",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Entry-Level Resume Builder 2026 — Free Templates for New Graduates"
                description="Build a professional entry-level resume that gets interviews. Free ATS-optimized templates for recent graduates and career starters."
                url={`${ENV.BASE_URL}/resume-builder/entry-level`}
                datePublished="2026-02-23"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="New Graduates & Career Starters"
                badgeIcon={Briefcase}
                title={<>Entry-Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Resume Builder</span></>}
                subtitle="Start your career with a resume that stands out. Free ATS-optimized templates designed specifically for new graduates, career starters, and junior professionals — even with limited experience. 100% free, instant PDF."
            />

            <ResourceFeatureGrid
                title="Built for Career Starters"
                features={[
                    { icon: <Target className="w-6 h-6" />, title: "Skills-First Templates", description: "Layouts that lead with transferable skills and competencies, not years of experience." },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass automated screening at LinkedIn, Indeed, Workday, and Greenhouse where 75% of resumes are rejected before human review." },
                    { icon: <Award className="w-6 h-6" />, title: "Certifications Showcase", description: "Dedicated section for online certifications, bootcamps, and professional development courses — critical for entry-level differentiation." },
                    { icon: <Briefcase className="w-6 h-6" />, title: "Internship Highlighting", description: "Template sections designed to make short internships, part-time roles, and volunteer work look professional and impactful." },
                    { icon: <Users className="w-6 h-6" />, title: "Industry Variations", description: "Pre-configured versions for tech, finance, marketing, operations, HR, and customer service entry-level roles." },
                    { icon: <Star className="w-6 h-6" />, title: "AI Summary Writer", description: "Generate a compelling professional summary that sells your potential even without years of experience." },
                ]}
            />

            <ResourceContentSection
                title="How to Write an Entry-Level Resume That Gets Interviews"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Entry-Level Resume Format</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Professional Summary (3–4 lines)", items: ["Degree + relevant skills", "1–2 key accomplishments", "Career goal tied to employer's needs", "Avoid vague phrases like 'hard worker'"] },
                                    { title: "Skills (Critical for ATS)", items: ["Technical skills matched to job description", "Software and tools (be specific)", "Languages and certifications", "Soft skills sparingly — show don't tell"] },
                                    { title: "Experience (Reverse Chronological)", items: ["Internships, part-time, and volunteer work all count", "2–4 bullet points per role", "Start each bullet with an action verb", "Quantify impact wherever possible"] },
                                    { title: "Education + Extras", items: ["Degree, major, university, graduation year", "Relevant coursework (3–5 subjects)", "Certifications and online courses", "Leadership roles and honors"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-indigo-600" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Entry-Level Resume Pro Tips
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Tailor your resume for every application — swap in keywords from the job description</li>
                                <li>• Mirror the language in the job posting to pass ATS keyword matching</li>
                                <li>• Use numbers: "managed 3 social media accounts" beats "managed social media"</li>
                                <li>• Remove your high school after your first internship or 2 years of college</li>
                                <li>• Add a LinkedIn URL — profiles with photos get 21x more views</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Strong Entry-Level Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-indigo-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-indigo-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Entry-Level ATS Keywords by Field (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Microsoft Office", "Excel", "Google Workspace", "Slack", "Asana", "Trello", "Salesforce", "HubSpot", "Google Analytics", "Python", "SQL", "Tableau", "Power BI", "Adobe Creative Suite", "Canva", "WordPress", "Data Analysis", "Project Management", "Customer Service", "Communication", "Teamwork", "Problem-Solving", "Critical Thinking", "Time Management", "Adaptability", "Attention to Detail", "Research", "Presentation", "Multi-tasking", "Organization"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Entry-Level Resume FAQs</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-indigo-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/student" className="text-blue-600 hover:underline font-semibold">Student Resume</Link>
                        <Link href="/resume-builder/fresher" className="text-blue-600 hover:underline font-semibold">Fresher Resume</Link>
                        <Link href="/resume-builder/software-engineer" className="text-blue-600 hover:underline font-semibold">Software Engineer Resume</Link>
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Entry-Level Resume Now — Free"
                subtitle="Join thousands of new graduates who've landed their first roles with Hirecta. ATS-optimized, 1-page format, instant PDF — no credit card required."
            />
        </div>
    );
}
