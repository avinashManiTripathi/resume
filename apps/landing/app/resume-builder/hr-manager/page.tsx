import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Users, CheckCircle, Zap, Award, Target, Star, Heart, BarChart } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'HR Manager Resume Builder 2026 — Free Human Resources Resume Templates | Hirecta',
    description: 'Build a professional HR manager resume in 2026. Free ATS-optimized templates for HR managers, HRBP, talent acquisition specialists, and HR directors. Highlight headcount managed, retention metrics, and HRIS software. Free PDF download.',
    keywords: 'HR manager resume builder, human resources resume, HRBP resume, talent acquisition resume, HR director resume, people operations resume, recruiting resume, HR resume template 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/hr-manager' },
    openGraph: {
        title: 'HR Manager Resume Builder 2026 — Free Human Resources Templates | Hirecta',
        description: 'Free HR manager and HRBP resume builder. Highlight headcount, retention, HRIS, and talent metrics.',
        url: 'https://hirecta.com/resume-builder/hr-manager',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HR Manager Resume Builder — Hirecta' }],
    },
    twitter: { card: 'summary_large_image', title: 'HR Manager Resume Builder 2026 | Hirecta', description: 'Build an HR manager resume with retention and talent metrics. Free PDF.', images: ['/og-image.png'], creator: '@hirecta' },
};

const schema = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Hirecta HR Manager Resume Builder",
    "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2950", "bestRating": "5" },
};

export default function HrManagerResumePage() {
    const faqs = [
        { question: "What metrics should an HR manager include on their resume?", answer: "Employee retention rate (and improvement), time-to-fill (recruitment), headcount managed or supported, training completion rates, eNPS (employee NPS), turnover reduction (%), cost-per-hire, number of roles filled, org size supported, and any compensation benchmarking work." },
        { question: "What HRIS systems should an HR manager list?", answer: "Workday, SAP SuccessFactors, ADP, BambooHR, UKG (Ultimate Kronos), Ceridian Dayforce, Oracle HCM, Greenhouse, Lever, and iCIMS are the most in-demand. Always list the specific system names — generic 'HRIS experience' fails ATS filters." },
        { question: "What's the difference between HR Manager and HRBP on a resume?", answer: "An HR Manager typically runs HR operations (payroll, compliance, benefits, policies). An HRBP (HR Business Partner) is a strategic partner — embedded in a business unit, advising on org design, talent strategy, and workforce planning. If you've done both, your resume should call out the HRBP responsibilities explicitly as they command higher comp." },
        { question: "How do I quantify HR work on a resume?", answer: "'Reduced voluntary turnover from 28% to 16% over 12 months through structured stay interviews and career pathing program', 'Recruited and onboarded 120 employees in 6 months for new warehouse opening', 'Designed performance management framework adopted by 1,200-person global organization'." },
        { question: "What certifications help HR managers most?", answer: "SHRM-CP and SHRM-SCP are the US gold standard. PHR/SPHR (HRCI) are also well-recognized. For payroll: Certified Payroll Professional (CPP). For talent acquisition: LinkedIn Recruiter certification. For international roles: CIPD (UK/global) is highly valued." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "HR Manager Resume", url: `${ENV.BASE_URL}/resume-builder/hr-manager` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema title="HR Manager Resume Builder 2026 — Free Human Resources Templates" description="Build a professional HR manager resume with retention, headcount, and HRIS metrics." url={`${ENV.BASE_URL}/resume-builder/hr-manager`} datePublished="2026-02-23" author="Hirecta Career Experts" />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Human Resources & People Ops"
                badgeIcon={Users}
                title={<>HR Manager <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Resume Builder</span></>}
                subtitle="People are your business — now make your resume prove it. Free ATS-optimized templates for HR managers, HRBPs, talent acquisition specialists, and people operations leaders. Highlight retention, headcount, HRIS systems, and organizational impact. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for HR Professionals"
                features={[
                    { icon: <BarChart className="w-6 h-6" />, title: "People Metrics Focus", description: "Templates highlighting retention rates, time-to-fill, turnover reduction, headcount, and eNPS — the numbers CEOs and CHROs care about." },
                    { icon: <Award className="w-6 h-6" />, title: "SHRM & HR Certifications", description: "Prominently feature SHRM-CP, SHRM-SCP, PHR, SPHR, and CIPD credentials that differentiate senior HR candidates." },
                    { icon: <Heart className="w-6 h-6" />, title: "HRIS Software Section", description: "Showcase Workday, SuccessFactors, ADP, BambooHR, Greenhouse, Lever, and iCIMS — the tools every ATS scans for." },
                    { icon: <Users className="w-6 h-6" />, title: "Org Scale & Scope", description: "Display headcount supported, global coverage, and business unit partnership scope clearly." },
                    { icon: <Target className="w-6 h-6" />, title: "Strategic HRBP Framing", description: "Translate operational HR work into business impact language that positions you for strategic HRBP and director roles." },
                    { icon: <Star className="w-6 h-6" />, title: "All HR Specializations", description: "Templates for generalist, HRBP, talent acquisition, L&D, compensation & benefits, payroll, and CHRO tracks." },
                ]}
            />

            <ResourceContentSection
                title="How to Write an HR Manager Resume"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">HR Resume By Function</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "HR Generalist / Manager", items: ["Headcount supported", "Policies developed or updated", "Benefits programs managed (# enrolled)", "Compliance: FMLA, ADA, FLSA, EEO", "Employee relations cases managed"] },
                                    { title: "HR Business Partner (HRBP)", items: ["Business unit / org size supported", "Org design initiatives led", "Succession planning programs", "Performance management cadence owned", "Leadership development programs"] },
                                    { title: "Talent Acquisition", items: ["Roles filled (annual volume)", "Time-to-fill (days)", "Offer acceptance rate (%)", "Source-of-hire breakdown", "Candidate pipeline metrics, diversity hiring %"] },
                                    { title: "People Ops / L&D / Total Rewards", items: ["eNPS score and trend", "Training programs: completion %, ROI", "Compensation benchmarking coverage", "Benefits cost savings ($M)", "Engagement survey scores and improvement"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-rose-600" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> HR Manager Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Lead with people metrics: "Reduced voluntary turnover 12 points" is worth more than any job description</li>
                                <li>• Name your HRIS explicitly: "Workday (5 years, admin-level)" passes ATS where "HRIS experience" fails</li>
                                <li>• Quantify org scope: "Supported 800-person R&D business unit across 3 countries"</li>
                                <li>• For HRBP roles: frame work as business advisory — link HR interventions to business outcomes (retention → cost savings, L&D → productivity)</li>
                                <li>• SHRM-SCP or SPHR in the header immediately signals senior-level competency to CHROs</li>
                            </ul>
                        </div>

                        <div className="bg-rose-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">HR ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["SHRM-CP", "SHRM-SCP", "PHR", "SPHR", "CIPD", "Workday", "SAP SuccessFactors", "ADP", "BambooHR", "UKG", "Greenhouse", "Lever", "iCIMS", "LinkedIn Recruiter", "Employee Relations", "HRBP", "Talent Acquisition", "Succession Planning", "Performance Management", "Compensation & Benefits", "FMLA", "ADA", "FLSA", "EEO Compliance", "HRIS", "Onboarding", "Offboarding", "Employee Engagement", "eNPS", "L&D", "Organizational Development", "Workforce Planning", "Headcount Planning", "Job Architecture", "Total Rewards", "Payroll"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">HR Manager Resume FAQs</h2>
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

            <div className="bg-rose-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/manager" className="text-blue-600 hover:underline font-semibold">Manager Resume</Link>
                        <Link href="/resume-builder/executive" className="text-blue-600 hover:underline font-semibold">Executive Resume</Link>
                        <Link href="/resume-builder/customer-service" className="text-blue-600 hover:underline font-semibold">Customer Service Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA title="Build Your HR Resume Now — Free" subtitle="Join thousands of HR professionals who've landed manager, HRBP, and director roles with Hirecta. ATS-optimized, instant PDF." />
        </div>
    );
}
