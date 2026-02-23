import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { GraduationCap, BookOpen, Star, Target, CheckCircle, Zap, Briefcase, Award, Users } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Student Resume Builder 2026 — Free College & Internship Resume Templates | Hirecta',
    description: 'Build a professional student resume with no work experience. Free ATS-optimized templates for college students, internship applications, part-time jobs, and entry-level roles. Highlight academics, projects, clubs, and skills. Free PDF download.',
    keywords: 'student resume builder, college student resume, no experience resume, internship resume, student resume template, high school student resume, university student resume, resume for first job, student CV, resume with no work experience 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/student' },
    openGraph: {
        title: 'Student Resume Builder 2026 — Free College & Internship Templates | Hirecta',
        description: 'Free student resume builder for college students, internship seekers, and first-time job applicants. No experience needed — highlight academics, projects, and skills.',
        url: 'https://hirecta.com/resume-builder/student',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Student Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Student Resume Builder 2026 — Free Templates | Hirecta',
        description: 'Create a professional student resume with no experience. ATS-friendly, free PDF, no credit card.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Student Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "8420", "bestRating": "5" },
};

export default function StudentResumePage() {
    const faqs = [
        { question: "How do I write a resume as a student with no work experience?", answer: "Focus on academics (GPA if 3.5+), relevant coursework, capstone projects, internships, volunteer work, campus clubs, and technical skills. Use strong action verbs and quantify where possible — 'Led a 4-person team to build a mobile app downloaded 500+ times' is powerful even as a student." },
        { question: "Should I include my GPA on my student resume?", answer: "Include your GPA if it's 3.5 or above. If it's below 3.5, omit it and lead with relevant coursework, projects, and skills instead. For STEM roles, a strong project section often matters more than GPA anyway." },
        { question: "What sections should a college student resume have?", answer: "Education (first), Relevant Coursework, Projects or Research, Work/Internship Experience (even part-time), Technical Skills, Leadership & Activities, and Awards or Honors. Keep it to 1 page." },
        { question: "How long should a student resume be?", answer: "One page only. Recruiters spend an average of 7 seconds scanning a resume. As a student, you rarely have enough content to justify two pages, and trying forces you to include irrelevant filler." },
        { question: "Can I put class projects on my resume?", answer: "Absolutely yes. Class projects are legitimate experience, especially for technical roles. Describe the project, your specific contribution, technologies used, and measurable outcome. Link to a GitHub repo or portfolio when possible." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Student Resume", url: `${ENV.BASE_URL}/resume-builder/student` },
    ];

    const bullets = [
        "Developed a full-stack inventory management web application using React, Node.js, and PostgreSQL as a 4-person team capstone project; deployed on AWS and used by 3 local small businesses",
        "Led University Entrepreneurship Club (120+ members) as President, organizing 12 speaker events per semester and increasing membership 40% year-over-year",
        "Completed 10-week summer internship at XYZ Corp as a Data Analyst intern; built automated reporting dashboard reducing manual reporting time by 6 hours/week",
        "Maintained 3.87 GPA in Computer Science (Dean's List 4 consecutive semesters) while working 20 hours/week as a campus IT help desk technician",
        "Published undergraduate research paper on machine learning bias in hiring algorithms, presented at 2025 Regional Computer Science Symposium",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Student Resume Builder 2026 — Free College & Internship Resume Templates"
                description="Build a professional student resume with no work experience. Free ATS-optimized templates for college students and internship applications."
                url={`${ENV.BASE_URL}/resume-builder/student`}
                datePublished="2026-02-23"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Students & New Grads"
                badgeIcon={GraduationCap}
                title={<>Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Resume Builder</span></>}
                subtitle="Land your first internship or job with a professional resume — even if you have zero work experience. Free ATS-optimized templates built for college students, new graduates, and first-time job seekers. 100% free, instant PDF."
            />

            <ResourceFeatureGrid
                title="Built for Students & New Grads"
                features={[
                    { icon: <GraduationCap className="w-6 h-6" />, title: "No Experience? No Problem", description: "Templates designed to showcase academics, projects, clubs, and volunteer work as compelling experience." },
                    { icon: <BookOpen className="w-6 h-6" />, title: "Project Portfolio Section", description: "Dedicated section for academic and personal projects — the #1 differentiator for student resumes." },
                    { icon: <Target className="w-6 h-6" />, title: "Internship-Ready Templates", description: "ATS-optimized for Handshake, LinkedIn, and company career portals used by 90% of campus recruiters." },
                    { icon: <Briefcase className="w-6 h-6" />, title: "Industry-Specific Versions", description: "One-click customization for tech, finance, marketing, healthcare, and consulting student resumes." },
                    { icon: <Award className="w-6 h-6" />, title: "Honors & Awards Section", description: "Prominently feature Dean's List, scholarships, competitions, and academic achievements." },
                    { icon: <Star className="w-6 h-6" />, title: "AI Bullet Generator", description: "AI rewrites vague duties into achievement-driven bullets: 'Tutored students' → 'Tutored 12 students improving average grade from C+ to B+.'" },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Student Resume That Gets Internships"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ideal Student Resume Structure</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "1. Education (Top)", items: ["University name, degree, major", "Expected graduation date", "GPA if 3.5+ (optional otherwise)", "Relevant coursework (3–5 courses)", "Thesis or capstone project title"] },
                                    { title: "2. Projects & Research", items: ["Project name + 1-line description", "Technologies / tools used", "Your specific role and contribution", "Measurable outcome (users, downloads, grade)", "GitHub / portfolio link"] },
                                    { title: "3. Experience", items: ["Internships (any duration counts)", "Part-time / campus jobs", "Research assistant positions", "Freelance work", "Volunteer work with responsibilities"] },
                                    { title: "4. Skills & Activities", items: ["Technical skills (languages, tools)", "Languages spoken", "Clubs and leadership roles", "Certifications and online courses", "Sports, arts, community service"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-blue-600" /> {section.title}
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
                                <Zap className="w-5 h-5" /> Pro Tips for Student Resumes
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Put Education FIRST — it's your strongest asset as a student</li>
                                <li>• Include your GitHub profile URL, LinkedIn, and portfolio if you have them</li>
                                <li>• Quantify everything: "organized events" → "organized 12 events for 200+ attendees"</li>
                                <li>• Tailor your resume for each application — swap relevant coursework to match the job description</li>
                                <li>• Don't list high school experience after your sophomore year of college</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Strong Student Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-blue-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Resume by Field</h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { field: "Computer Science / Engineering", focus: ["GitHub portfolio with 3–5 projects", "Programming languages and frameworks", "Hackathon participation and awards", "Open source contributions", "Relevant certifications (AWS, Google)"] },
                                    { field: "Business / Finance", focus: ["Excel, SQL, Tableau, Power BI skills", "Stock pitch competitions, case competitions", "Finance club leadership", "CFA Level 1 (if applicable)", "Relevant coursework: valuation, accounting"] },
                                    { field: "Marketing / Communications", focus: ["Portfolio of campaigns or written work", "Social media metrics managed", "Google Analytics / HubSpot certifications", "Blog, journalism, or content work", "Brand partnerships or event marketing"] },
                                    { field: "Healthcare / Pre-Med", focus: ["Clinical volunteering hours", "Research lab experience", "Medical scribing", "EMT certification", "MCAT score (if strong)"] },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-xl p-5 border border-blue-100">
                                        <h4 className="font-bold text-gray-900 mb-3">{item.field}</h4>
                                        <ul className="space-y-1.5">
                                            {item.focus.map((f, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Student Resume ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Dean's List", "GPA 3.X/4.0", "Relevant Coursework", "Academic Projects", "Capstone Project", "Research Assistant", "Lab Experience", "Thesis", "Study Abroad", "Internship", "Part-time", "GitHub", "Portfolio", "Certifications", "Google Analytics", "Python", "Java", "SQL", "Excel", "Microsoft Office", "Tableau", "Leadership", "Teamwork", "Communication", "Problem-Solving", "Time Management", "Adaptability", "Critical Thinking", "Attention to Detail"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Resume FAQs</h2>
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

            <div className="bg-blue-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/entry-level" className="text-blue-600 hover:underline font-semibold">Entry-Level Resume</Link>
                        <Link href="/resume-builder/fresher" className="text-blue-600 hover:underline font-semibold">Fresher Resume</Link>
                        <Link href="/resume-builder/software-engineer" className="text-blue-600 hover:underline font-semibold">Software Engineer Resume</Link>
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Student Resume Now — Free"
                subtitle="Join thousands of students who've landed internships and first jobs with Hirecta. ATS-optimized, 1-page format, instant PDF — no credit card required."
            />
        </div>
    );
}
