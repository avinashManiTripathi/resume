import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { DollarSign, CheckCircle, Zap, Award, BarChart, Target, Star, Users } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Accountant Resume Builder 2026 — Free CPA & Finance Resume Templates | Hirecta',
    description: 'Build a professional accountant resume in 2026. Free ATS-optimized templates for CPAs, auditors, tax accountants, and financial analysts. Highlight certifications, software skills, and cost savings. Free PDF download.',
    keywords: 'accountant resume builder, CPA resume, accounting resume template, auditor resume, tax accountant resume, financial accountant resume, bookkeeper resume, accounting resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/accountant' },
    openGraph: {
        title: 'Accountant Resume Builder 2026 — Free CPA & Accounting Templates | Hirecta',
        description: 'Free accountant resume builder for CPAs, auditors, tax, and financial accounting roles. ATS-optimized with certifications and software skills.',
        url: 'https://hirecta.com/resume-builder/accountant',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Accountant Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Accountant Resume Builder 2026 | Hirecta',
        description: 'Build a professional accountant / CPA resume. ATS-optimized, free PDF.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Accountant Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "3120", "bestRating": "5" },
};

export default function AccountantResumePage() {
    const faqs = [
        { question: "What should an accountant include on their resume?", answer: "CPA/CMA license number, accounting software proficiency (QuickBooks, SAP, Oracle, NetSuite), types of financial statements prepared, audit and compliance experience, cost savings achieved, team size if managed, and industry verticals (public, private, non-profit, government)." },
        { question: "Should I list my CPA license number on my resume?", answer: "Yes — include your CPA license number and issuing state. This immediately signals you're fully credentialed and saves HR a verification step. List it prominently in a 'Certifications & Licenses' section near the top." },
        { question: "What accounting software should I list?", answer: "The most valuable: SAP, Oracle Financials, NetSuite, QuickBooks Enterprise, Microsoft Dynamics 365, Sage Intacct, Workday Financials, BlackLine, and Concur. Excel (advanced: pivot tables, VLOOKUP, SUMIFS, Power Query) is essential. Power BI and Tableau are increasingly valued." },
        { question: "How do I quantify accounting achievements on a resume?", answer: "Examples: 'Reduced month-end close from 12 to 4 business days', 'Identified $2.3M in tax savings through depreciation strategy', 'Managed $85M general ledger with 100% audit compliance over 4 years', 'Automated accounts payable workflow reducing processing time 65%'." },
        { question: "Is a CPA required to get accounting jobs?", answer: "Depends on the role. Public accounting (Big 4, mid-market firms) strongly prefers or requires CPA. Corporate accounting roles often accept CPA candidates or those actively pursuing it. CMA (Certified Management Accountant) is highly valued for cost and managerial accounting." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Accountant Resume", url: `${ENV.BASE_URL}/resume-builder/accountant` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Accountant Resume Builder 2026 — Free CPA & Finance Resume Templates"
                description="Build a professional accountant resume for CPA, auditor, and financial accounting roles. ATS-optimized templates with certifications and software focus."
                url={`${ENV.BASE_URL}/resume-builder/accountant`}
                datePublished="2026-02-23"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Accounting & Finance Careers"
                badgeIcon={DollarSign}
                title={<>Accountant <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-700">Resume Builder</span></>}
                subtitle="Build a professional accounting resume that passes every ATS and impresses every CFO. Free templates for CPAs, auditors, tax accountants, bookkeepers, and financial analysts. Highlight your certifications, software expertise, and cost impact. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Accounting Professionals"
                features={[
                    { icon: <Award className="w-6 h-6" />, title: "CPA & Certifications Section", description: "Prominently display your CPA, CMA, CFA, or CIA credentials with license numbers — the #1 filter in accounting ATS." },
                    { icon: <DollarSign className="w-6 h-6" />, title: "Financial Impact Metrics", description: "Templates designed to showcase cost savings, accuracy rates, audit findings, and balance sheet values managed." },
                    { icon: <BarChart className="w-6 h-6" />, title: "Software Skills Showcase", description: "Dedicated section for accounting software: SAP, Oracle, NetSuite, QuickBooks, Sage, Workday, and advanced Excel." },
                    { icon: <Target className="w-6 h-6" />, title: "Industry Specialization", description: "Templates optimized for public accounting, corporate finance, non-profit, government, and healthcare accounting." },
                    { icon: <Users className="w-6 h-6" />, title: "Audit & Compliance Focus", description: "Highlight SOX compliance, internal controls, audit trail management, and regulatory filings." },
                    { icon: <Star className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass ATS at Big 4, mid-market CPA firms, Fortune 500 finance teams, and government agencies." },
                ]}
            />

            <ResourceContentSection
                title="How to Write an Accountant Resume"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Accountant Resume Must-Haves</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Certifications & Licenses", items: ["CPA license number + issuing state", "CMA, CIA, CFA (if applicable)", "EA (Enrolled Agent) for tax specialists", "CISA for IT audit", "Expiry/renewal dates"] },
                                    { title: "Technical Skills", items: ["ERP: SAP, Oracle, NetSuite, Dynamics 365", "Accounting: QuickBooks, Sage, Xero, FreshBooks", "Reporting: Tableau, Power BI, SSRS", "Advanced Excel: pivot tables, VBA, Power Query", "Close management: BlackLine, FloQast, Trintech"] },
                                    { title: "Experience Bullets", items: ["$ values managed (GL, AR, AP, payroll)", "Close timeline improvements (days reduced)", "Audit findings count / severity", "Cost savings identified ($M)", "Headcount managed"] },
                                    { title: "Compliance & Controls", items: ["SOX 302 / 404 compliance", "GAAP / IFRS expertise", "Internal controls design and testing", "Regulatory filings: 10-K, 10-Q, tax returns", "Audit readiness and clean audit outcomes"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Accountant Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Always lead with your CPA or CMA credential — it's the #1 hiring filter</li>
                                <li>• Quantify every achievement: "reconciled $120M GL" beats "reconciled general ledger"</li>
                                <li>• List the specific ERP/accounting software — ATS matches exact software names</li>
                                <li>• Highlight close cycle improvements — CFOs love speed-to-close metrics</li>
                                <li>• Show industry depth: healthcare, financial services, and manufacturing accountants command premiums</li>
                            </ul>
                        </div>

                        <div className="overflow-x-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Accountant Salary Guide (US, 2026)</h3>
                            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-green-100">
                                    <tr>
                                        <th className="text-left p-3 font-bold">Role</th>
                                        <th className="text-left p-3 font-bold">Avg Salary</th>
                                        <th className="text-left p-3 font-bold">Top Markets</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["Staff Accountant", "$52,000 – $72,000", "NY, CA, TX, IL, FL"],
                                        ["Senior Accountant", "$72,000 – $95,000", "NY, CA, WA, MA, NJ"],
                                        ["Accounting Manager", "$95,000 – $130,000", "NY, CA, IL, TX, MA"],
                                        ["Controller", "$130,000 – $200,000", "NY, CA, WA, MA, CO"],
                                        ["CFO (small–mid company)", "$200,000 – $400,000", "NY, CA, TX, WA, IL"],
                                        ["Public Accounting (Big 4) Associate", "$65,000 – $85,000", "NY, CA, IL, TX, FL"],
                                        ["Tax Manager (public)", "$110,000 – $160,000", "NY, CA, MA, IL, WA"],
                                    ].map((row, i) => (
                                        <tr key={i} className="even:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                            <td className="p-3 text-green-700 font-semibold">{row[1]}</td>
                                            <td className="p-3 text-gray-500">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Accountant ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["CPA", "CMA", "GAAP", "IFRS", "SOX Compliance", "Internal Controls", "General Ledger", "Accounts Payable", "Accounts Receivable", "Fixed Assets", "Payroll", "Month-End Close", "Year-End Close", "Financial Reporting", "Budget Forecasting", "Variance Analysis", "Audit", "Tax Preparation", "Tax Planning", "Transfer Pricing", "QuickBooks", "SAP", "Oracle", "NetSuite", "Sage Intacct", "Microsoft Dynamics", "Workday", "BlackLine", "Advanced Excel", "Power BI", "Tableau", "ERP", "Reconciliation", "Cost Accounting", "Revenue Recognition", "Consolidations", "SEC Reporting", "10-K", "10-Q"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Accountant Resume FAQs</h2>
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

            <div className="bg-green-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/finance" className="text-blue-600 hover:underline font-semibold">Finance Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/resume-builder/manager" className="text-blue-600 hover:underline font-semibold">Manager Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Accountant Resume Now — Free"
                subtitle="Join thousands of accounting professionals who've landed CPA, audit, and controller roles with Hirecta. ATS-optimized, instant PDF — no credit card required."
            />
        </div>
    );
}
