import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { DollarSign, CheckCircle, Zap, Award, Target, Star, BarChart, TrendingUp } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Financial Analyst Resume Builder 2026 — Free Finance Resume Templates | Hirecta',
    description: 'Build a professional finance resume in 2026. Free ATS-optimized templates for financial analysts, investment bankers, FP&A analysts, and finance managers. Highlight financial modeling, AUM, deal values, and Excel/Bloomberg skills. Free PDF download.',
    keywords: 'financial analyst resume builder, finance resume template, investment banking resume, FP&A resume, finance manager resume, financial analyst resume, CFA resume, Wall Street resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/finance' },
    openGraph: {
        title: 'Financial Analyst Resume Builder 2026 — Free Finance Templates | Hirecta',
        description: 'Free finance resume builder for financial analysts, investment bankers, and FP&A professionals. Lead with deal values, AUM, and financial modeling skills.',
        url: 'https://hirecta.com/resume-builder/finance',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Financial Analyst Resume Builder — Hirecta' }],
    },
    twitter: { card: 'summary_large_image', title: 'Finance Resume Builder 2026 | Hirecta', description: 'Build a financial analyst resume with deal values and modeling skills. Free PDF.', images: ['/og-image.png'], creator: '@hirecta' },
};

const schema = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Hirecta Finance Resume Builder",
    "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3240", "bestRating": "5" },
};

export default function FinanceResumePage() {
    const faqs = [
        { question: "What should a financial analyst resume include?", answer: "Financial modeling skills (DCF, LBO, merger models, comps), deal size/AUM managed, Excel proficiency (advanced: VBA, Power Query, Power Pivot), Bloomberg terminal, FactSet, Python/SQL for data analysis, CFA progress, GPA (if finance-adjacent school and 3.5+), and any awards or rankings in your firm." },
        { question: "How do I quantify finance resume bullets?", answer: "Deal values: '$250M M&A advisory mandate for mid-market PE-backed SaaS company'. FP&A: 'Built 3-statement financial model supporting $45M capital allocation decision'. Portfolio: '$800M AUM managed across 12 institutional client accounts'. Forecasting: 'Improved forecast accuracy from 78% to 94% through bottom-up driver-based model rebuild'." },
        { question: "Is the CFA designation important on a finance resume?", answer: "Critical for buy-side, asset management, and portfolio management roles. Moderately important for investment banking and corporate finance. Always list your progress: 'CFA Level II Candidate (June 2026 exam)' — even passing Level I demonstrates commitment and quantitative rigor." },
        { question: "What finance-specific software should I list?", answer: "Excel (advanced — be specific about VBA, pivot tables, Power Query), Bloomberg Terminal, FactSet, Capital IQ, PitchBook, Morningstar, Refinitiv Eikon, Python (pandas, NumPy), SQL, Tableau, Power BI, and any deal management platforms (DealCloud, iLeverage)." },
        { question: "Should investment banking resumes be different from corporate finance resumes?", answer: "Yes. IB resumes (for bulge bracket, boutique, PE) are 1 page strictly, ranked by deal size (largest first), and emphasize speed/accuracy under pressure. Corporate finance/FP&A resumes can be 1–2 pages, emphasize cross-functional business partnerships, modeling for business decisions, and CFO support work." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Finance Resume", url: `${ENV.BASE_URL}/resume-builder/finance` },
    ];

    const bullets = [
        "Built integrated 3-statement LBO model for $340M acquisition of regional healthcare services company; analysis supported $75M equity check from PE sponsor, deal closed Q3 2025",
        "Led FP&A redesign for $1.2B revenue SaaS business unit: rebuilt bottom-up ARR forecast model, improving accuracy from 76% to 93% and reducing CFO reporting cycle from 5 days to 2 days",
        "Managed $820M AUM across 14 institutional clients; generated 11.4% net return (vs. benchmark 8.6%) through tactical overweight in technology and healthcare sectors for FY2025",
        "Executed $2.1B cross-border refinancing deal for European corporate client — coordinated legal, tax, and treasury workstreams across 4 jurisdictions and closed 3 weeks ahead of debt maturity",
        "Built Python/SQL-based financial reporting automation reducing manual Excel work by 18 hours/week; dashboard adopted by 3 additional business units within 6 months of deployment",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema title="Financial Analyst Resume Builder 2026 — Free Finance Templates" description="Build a professional finance resume with deal values, modeling skills, and financial certifications." url={`${ENV.BASE_URL}/resume-builder/finance`} datePublished="2026-02-23" author="Hirecta Career Experts" />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Finance & Investment Careers"
                badgeIcon={DollarSign}
                title={<>Finance <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-blue-700">Resume Builder</span></>}
                subtitle="Model your career with the same precision you apply to your deals. Free ATS-optimized templates for financial analysts, investment bankers, FP&A professionals, and portfolio managers. Lead with deal values, AUM, and modeling expertise. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Finance Professionals"
                features={[
                    { icon: <BarChart className="w-6 h-6" />, title: "Deal & AUM Metrics First", description: "Templates designed to lead with transaction values, AUM managed, and return performance — the numbers that open doors on the Street." },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "CFA & Certification Focus", description: "Prominently feature CFA level (including candidate status), FRM, CAIA, and other finance designations that signal analytical rigor." },
                    { icon: <DollarSign className="w-6 h-6" />, title: "Modeling Skills Showcase", description: "Structured section for DCF, LBO, merger models, comps, and Python/SQL — the technical skills every finance hiring manager screens for." },
                    { icon: <Target className="w-6 h-6" />, title: "IB vs. Corp Finance Formats", description: "Distinct templates for investment banking (1-page, deal-ranked) and corporate finance/FP&A (2-page, business-impact focused)." },
                    { icon: <Award className="w-6 h-6" />, title: "Bloomberg & Platform Skills", description: "Dedicated section for Bloomberg, FactSet, Capital IQ, PitchBook, Refinitiv, and Python/SQL analytical platforms." },
                    { icon: <Star className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass ATS at bulge bracket banks, buy-side firms, PE funds, hedge funds, and corporate treasury/FP&A teams." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Finance Resume That Gets Wall Street and Corp Finance Interviews"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Finance Resume by Career Path</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Investment Banking", items: ["1 page — non-negotiable", "Deal table: transaction name, value, sector, your role", "Ranked by deal size (largest first)", "GPA + school rank (if target school)", "Technical: DCF, LBO, merger models, comps"] },
                                    { title: "FP&A / Corporate Finance", items: ["Revenue/budget supported ($)", "Forecast accuracy improvement (%)", "Reporting cycle time reduction (days)", "Stakeholder: C-suite / board support", "Tools: Excel, Adaptive, Anaplan, Pigment, Power BI"] },
                                    { title: "Asset Management / Buy-Side", items: ["AUM managed ($M/$B)", "Performance vs. benchmark (%)", "Portfolio sectors and strategies", "CFA designation (or candidate level)", "Coverage universe size (# companies)"] },
                                    { title: "Private Equity / VC", items: ["Portfolio company names (if public)", "Entry/exit multiples (MOIC, IRR)", "Due diligence coverage area", "Value creation initiatives post-close", "Deal sourcing and proprietary pipeline"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-700" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Finance Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Always include deal/AUM values — "$250M acquisition" is 10x more powerful than "worked on M&A transactions"</li>
                                <li>• List Python, SQL, and advanced Excel separately from financial software — ATS treats them as distinct filters</li>
                                <li>• CFA Level I passing: always list it. It signals you passed a top-5% difficulty finance exam</li>
                                <li>• For IB recruiting: 1 page only — two-page resumes are automatically filtered out at most bulge-bracket banks</li>
                                <li>• For FP&A: frame every model in terms of the business decision it supported — CFOs hire analysts, not spreadsheet builders</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">High-Impact Finance Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-emerald-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Finance Compensation (US, 2026)</h3>
                            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-emerald-100">
                                    <tr>
                                        <th className="text-left p-3 font-bold">Role</th>
                                        <th className="text-left p-3 font-bold">Base Salary</th>
                                        <th className="text-left p-3 font-bold">Total Comp (incl. bonus)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["IB Analyst (Year 1, BB)", "$110,000", "$180,000 – $250,000"],
                                        ["IB Associate (MBA)", "$175,000", "$300,000 – $450,000"],
                                        ["IB Vice President", "$250,000", "$500,000 – $900,000"],
                                        ["Private Equity Associate", "$150,000 – $175,000", "$300,000 – $600,000"],
                                        ["Buy-Side Analyst (AM)", "$100,000 – $150,000", "$200,000 – $500,000"],
                                        ["FP&A Analyst (Corp.)", "$70,000 – $100,000", "$80,000 – $130,000"],
                                        ["Finance Manager / Sr. Analyst", "$100,000 – $150,000", "$130,000 – $200,000"],
                                        ["VP Corporate Finance / CFO Director", "$180,000 – $280,000", "$250,000 – $500,000"],
                                    ].map((row, i) => (
                                        <tr key={i} className="even:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                            <td className="p-3 text-emerald-700 font-semibold">{row[1]}</td>
                                            <td className="p-3 text-gray-500">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-xs text-gray-400 mt-2">Source: Levels.fyi, Wall Street Oasis, Mercer finance data 2025–2026.</p>
                        </div>

                        <div className="bg-emerald-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Finance ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Financial Modeling", "DCF", "LBO", "Merger Model", "Precedent Transactions", "Comparable Companies", "Bloomberg Terminal", "FactSet", "Capital IQ", "PitchBook", "Refinitiv", "Python", "SQL", "VBA", "Advanced Excel", "Power BI", "Tableau", "CFA", "FRM", "CAIA", "AUM", "IRR", "MOIC", "EBITDA", "Net Revenue Retention", "M&A", "Due Diligence", "Valuation", "FP&A", "Budgeting", "Forecasting", "Variance Analysis", "Treasury", "Working Capital", "Capital Markets", "Equity Research", "Fixed Income", "Portfolio Management"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finance Resume FAQs</h2>
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

            <div className="bg-emerald-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/accountant" className="text-blue-600 hover:underline font-semibold">Accountant Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/resume-builder/executive" className="text-blue-600 hover:underline font-semibold">Executive Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA title="Build Your Finance Resume Now — Free" subtitle="Join thousands of finance professionals who've landed IB, PE, and FP&A roles with Hirecta. ATS-optimized, instant PDF — no credit card required." />
        </div>
    );
}
