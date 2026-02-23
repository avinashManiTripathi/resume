import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Scale, CheckCircle, Zap, Award, Target, Star, BookOpen, Users } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Lawyer Resume Builder 2026 — Free Attorney & Legal Resume Templates | Hirecta',
    description: 'Build a professional lawyer resume in 2026. Free ATS-optimized templates for attorneys, associates, counsel, and legal professionals. Highlight bar admissions, practice areas, deal values, and case outcomes. Free PDF download.',
    keywords: 'lawyer resume builder, attorney resume, legal resume template, associate attorney resume, in-house counsel resume, litigation resume, corporate attorney resume, law school resume, JD resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/lawyer' },
    openGraph: {
        title: 'Lawyer Resume Builder 2026 — Free Attorney & Legal Templates | Hirecta',
        description: 'Free lawyer and attorney resume builder. ATS-optimized with bar admissions, practice area, and case outcome focus.',
        url: 'https://hirecta.com/resume-builder/lawyer',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Lawyer Resume Builder — Hirecta' }],
    },
    twitter: { card: 'summary_large_image', title: 'Lawyer Resume Builder 2026 | Hirecta', description: 'Build a lawyer/attorney resume with bar admissions and case outcomes. Free PDF.', images: ['/og-image.png'], creator: '@hirecta' },
};

const schema = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Hirecta Lawyer Resume Builder",
    "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1680", "bestRating": "5" },
};

export default function LawyerResumePage() {
    const faqs = [
        { question: "What should a lawyer's resume include?", answer: "Bar admissions (state and year), law school (with class rank or GPA if top 20%), law review or moot court membership, clerkship experience, practice areas, deal/case values handled, client industry experience, and any publications or speaking engagements." },
        { question: "How long should an attorney resume be?", answer: "1 page for law students and new associates (0–2 years). 2 pages for mid-level to senior associates (3–8 years). 2–3 pages for partners, general counsel, and senior in-house attorneys. Law offices and firms have strict 1-page preferences for entry-level — never exceed this in BigLaw lateral applications." },
        { question: "Should I include GPA and class rank on my law resume?", answer: "Yes, for up to 5–7 years post-graduation, especially if your GPA is 3.5+, you're in the top third of your class, or you attended a T14 law school. After that, your experience speaks louder. Always include law review or journal membership — it's a prestige signal that law firms still filter on." },
        { question: "How do I quantify legal work on a resume?", answer: "Transaction value: 'Led due diligence on $450M software company acquisition'. Litigation outcome: 'Secured dismissal of $12M breach of contract claim at summary judgment'. Volume: 'Managed docket of 45 active litigation matters'. Client coverage: 'Advised 8 Fortune 500 companies on employment law compliance'." },
        { question: "What's the difference between a law firm resume and an in-house resume?", answer: "Law firm resumes emphasize academic credentials, class rank, deals/cases by dollar value, client names (if disclosed), and billable hour performance. In-house resumes emphasize business alignment, cross-functional collaboration, cost savings vs. outside counsel, risk management, and the ability to give practical legal advice to non-lawyers." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Lawyer Resume", url: `${ENV.BASE_URL}/resume-builder/lawyer` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema title="Lawyer Resume Builder 2026 — Free Attorney & Legal Templates" description="Build a professional attorney resume with bar admissions, practice areas, and case outcome focus." url={`${ENV.BASE_URL}/resume-builder/lawyer`} datePublished="2026-02-23" author="Hirecta Career Experts" />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Legal Careers"
                badgeIcon={Scale}
                title={<>Lawyer <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-800">Resume Builder</span></>}
                subtitle="Present your legal credentials with precision. Free ATS-optimized templates for attorneys, associates, general counsel, and legal professionals. Highlight bar admissions, practice areas, transaction values, and case outcomes. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Legal Professionals"
                features={[
                    { icon: <Scale className="w-6 h-6" />, title: "Bar Admissions Section", description: "Prominently feature state bar admissions with year of admission — the #1 credential filter in every legal job posting." },
                    { icon: <BookOpen className="w-6 h-6" />, title: "Law School Credentials", description: "Highlight class rank, law review/journal membership, moot court honors, and academic awards that law firms filter on." },
                    { icon: <Award className="w-6 h-6" />, title: "Transaction & Case Values", description: "Templates designed to showcase deal values ($M/$B), case outcomes (verdicts, settlements), and client sophistication." },
                    { icon: <Target className="w-6 h-6" />, title: "Practice Area Clarity", description: "Clear practice area sections for M&A, litigation, employment, IP, corporate, real estate, regulatory, and more." },
                    { icon: <Users className="w-6 h-6" />, title: "Law Firm vs. In-House", description: "Distinct template formats for law firm associate/partner tracks and in-house/general counsel positions." },
                    { icon: <Star className="w-6 h-6" />, title: "Clerkship Highlighting", description: "Federal and state judicial clerkships are career gold — dedicated sections ensure maximum prestige impact." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Lawyer Resume That Gets BigLaw and In-House Offers"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Legal Resume Structure by Career Stage</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Law Student / 0–2 Years", items: ["Education first: law school, GPA, rank if top 1/3", "Law review, moot court, journal", "Summer associate / clinic experience", "Bar admission status (including pending)", "1 page — strictly"] },
                                    { title: "Mid-Level Associate (3–7 yrs)", items: ["Practice area summary at top", "Deal/case values and client names", "Secondment or cross-border experience", "Business development / client origination", "2 pages maximum"] },
                                    { title: "Partner / Senior Counsel", items: ["Book of business (annual billing/originations)", "Named partner / equity track", "Client relationship depth (industry verticals)", "Leadership: firm committees, mentoring programs", "Speaking, publishing, Chambers/Legal 500 rankings"] },
                                    { title: "In-House / General Counsel", items: ["Cost savings vs. outside counsel ($M)", "Cross-functional business partnerships", "Risk management frameworks implemented", "M&A, compliance, regulatory expertise", "Board-level advisory and reporting"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-blue-800" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Lawyer Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• List your bar admission state and year — vet hiring coordinators filter on this before reading anything else</li>
                                <li>• Include matter/deal values — "$450M acquisition" signals partner-track readiness at any associate level</li>
                                <li>• Law review and federal clerkships are prestige markers: always list them, regardless of how far post-graduation</li>
                                <li>• For in-house: translate legal work into business outcomes — CFOs and CEOs select GCs on business judgment, not legal theory</li>
                                <li>• Use standard formatting — fancy resume layouts are inappropriate in legal hiring; clean CV format is expected</li>
                            </ul>
                        </div>

                        <div className="overflow-x-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Attorney Salary Guide (US, 2026)</h3>
                            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left p-3 font-bold">Role</th>
                                        <th className="text-left p-3 font-bold">Law Firm (BigLaw)</th>
                                        <th className="text-left p-3 font-bold">In-House / Corp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["1st Year Associate", "$215,000 – $235,000", "$130,000 – $180,000"],
                                        ["3rd Year Associate", "$280,000 – $320,000", "$160,000 – $220,000"],
                                        ["5th Year Associate", "$365,000 – $415,000", "$200,000 – $280,000"],
                                        ["Senior Associate / Counsel", "$450,000 – $550,000", "$250,000 – $380,000"],
                                        ["Non-Equity Partner", "$600,000 – $1.2M", "N/A"],
                                        ["General Counsel (mid-size)", "N/A", "$300,000 – $700,000"],
                                        ["General Counsel (F500)", "N/A", "$700,000 – $2M+"],
                                    ].map((row, i) => (
                                        <tr key={i} className="even:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                            <td className="p-3 text-blue-800 font-semibold">{row[1]}</td>
                                            <td className="p-3 text-gray-600">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-xs text-gray-400 mt-2">Source: NALP, Above the Law, Levels.fyi legal data 2025–2026. BigLaw figures reflect Cravath scale firms.</p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Legal Resume ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Bar Admission", "J.D.", "L.L.M.", "Law Review", "Moot Court", "Federal Clerkship", "Litigation", "Corporate M&A", "Due Diligence", "Contract Drafting", "Contract Negotiation", "Regulatory Compliance", "Employment Law", "Intellectual Property", "Securities Law", "ERISA", "Real Estate", "Bankruptcy", "Antitrust", "Data Privacy", "GDPR", "CCPA", "General Counsel", "In-House Counsel", "Legal Research", "Westlaw", "LexisNexis", "Depositions", "Discovery", "Motion Practice", "Summary Judgment", "Trial Experience", "Arbitration", "Mediation"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lawyer Resume FAQs</h2>
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

            <div className="bg-gray-100 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/executive" className="text-blue-600 hover:underline font-semibold">Executive Resume</Link>
                        <Link href="/resume-builder/finance" className="text-blue-600 hover:underline font-semibold">Finance Resume</Link>
                        <Link href="/resume-builder/manager" className="text-blue-600 hover:underline font-semibold">Manager Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA title="Build Your Legal Resume Now — Free" subtitle="Join thousands of attorneys who've landed law firm and in-house roles with Hirecta. Professional format, ATS-optimized, instant PDF." />
        </div>
    );
}
