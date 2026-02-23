import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { TrendingUp, CheckCircle, Zap, Award, Target, Star, Users, BarChart } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Sales Resume Builder 2026 — Free Sales Representative & Manager Resume Templates | Hirecta',
    description: 'Build a high-impact sales resume in 2026. Free ATS-optimized templates for sales reps, account executives, BDRs, and sales managers. Highlight quota attainment, revenue generated, and pipeline metrics. Free PDF download.',
    keywords: 'sales resume builder, sales representative resume, account executive resume, sales manager resume, BDR resume, SDR resume, sales resume template, quota attainment resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/sales' },
    openGraph: {
        title: 'Sales Resume Builder 2026 — Free Sales Rep & Manager Templates | Hirecta',
        description: 'Free sales resume builder for AEs, BDRs, sales managers, and reps. Lead with quota attainment, revenue, and pipeline metrics.',
        url: 'https://hirecta.com/resume-builder/sales',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sales Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sales Resume Builder 2026 | Hirecta',
        description: 'Build a sales resume with quota attainment and revenue metrics. ATS-optimized, free PDF.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Sales Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "4560", "bestRating": "5" },
};

export default function SalesResumePage() {
    const faqs = [
        { question: "What metrics should a sales resume include?", answer: "Quota attainment (% of quota achieved), annual revenue generated ($), average deal size, sales cycle length, number of accounts managed, win rate (%), pipeline value managed, and year-over-year growth. These are the only numbers sales hiring managers care about." },
        { question: "How do I show quota attainment on my resume?", answer: "Be specific: '118% of $1.2M annual quota (FY2025)', '3x President's Club winner (2022, 2023, 2024)', or 'Top 5% of 200-person sales org Q3 2025'. Never just write 'exceeded quota' without the percentage." },
        { question: "What CRM skills should I list on a sales resume?", answer: "Salesforce (SFDC) is the most in-demand — specify if you have admin-level proficiency. Other valued CRMs: HubSpot, Outreach, Salesloft, ZoomInfo, LinkedIn Sales Navigator, Gong, Chorus, Clari, and Groove." },
        { question: "Should I list my base salary and OTE on my resume?", answer: "Never include compensation on your resume — this weakens your negotiating position. It's fine to discuss it in screening calls, but keep your resume focused on value delivered, not cost." },
        { question: "How do I write a sales resume when I've missed quota?", answer: "Focus on other metrics: total revenue generated (absolute $), new logos brought in, largest deals closed, certifications earned, or a strong improvement trajectory. If you consistently missed quota at one company, consider leading with wins from another role." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Sales Resume", url: `${ENV.BASE_URL}/resume-builder/sales` },
    ];

    const bullets = [
        "Achieved 127% of $1.4M annual quota in FY2025, ranking #2 out of 48 AEs; earned President's Club recognition for third consecutive year",
        "Closed $3.2M in net-new ARR from enterprise accounts (avg deal size $280K) with 90-day average sales cycle, accelerating from industry average of 145 days",
        "Built and managed a $5.8M pipeline across 34 strategic accounts using Salesforce, maintaining 78% forecast accuracy vs. 62% team average",
        "Expanded 12 existing mid-market accounts from $45K to $95K average ARR through upsell and cross-sell motions, contributing $600K in expansion revenue",
        "Mentored 4 SDRs as quota-carrying AE, resulting in 2 promotions to full AE and team outbounding increasing by 35% year-over-year",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Sales Resume Builder 2026 — Free Sales Rep & Manager Templates"
                description="Build a high-impact sales resume with quota attainment, revenue, and pipeline metrics. ATS-optimized templates for reps, AEs, BDRs, and managers."
                url={`${ENV.BASE_URL}/resume-builder/sales`}
                datePublished="2026-02-23"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Sales & Revenue Careers"
                badgeIcon={TrendingUp}
                title={<>Sales <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Resume Builder</span></>}
                subtitle="Numbers close deals — and they close interviews too. Build a high-impact sales resume that leads with quota attainment, revenue generated, and pipeline metrics. Free ATS-optimized templates for reps, account executives, BDRs, and sales managers. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Sales Professionals"
                features={[
                    { icon: <BarChart className="w-6 h-6" />, title: "Quota & Revenue Focus", description: "Templates that highlight attainment %, revenue $, deal size, and win rate — the metrics that move hiring managers." },
                    { icon: <Award className="w-6 h-6" />, title: "President's Club Section", description: "Dedicated awards section for President's Club, top performer rankings, and sales contests won." },
                    { icon: <Target className="w-6 h-6" />, title: "CRM Skills Display", description: "Showcase Salesforce, HubSpot, Outreach, Gong, and other sales tools that signal modern sales DNA." },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "Pipeline Metrics", description: "Lead with pipeline value managed, forecast accuracy, and sales cycle improvements." },
                    { icon: <Users className="w-6 h-6" />, title: "All Sales Roles", description: "Templates for SDR, BDR, AE, Senior AE, Sales Manager, VP of Sales, and Chief Revenue Officer." },
                    { icon: <Star className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass ATS at SaaS, tech, finance, and enterprise sales orgs — the most ATS-heavy hiring environments." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Sales Resume That Closes"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Sales Resume Must-Have Metrics</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Quota & Attainment", items: ["Annual quota ($) and % attained", "Quarterly attainment trend", "Ranking within team/org", "President's Club qualifications"] },
                                    { title: "Revenue Metrics", items: ["Total ARR / revenue generated ($)", "New logo vs. expansion revenue split", "Average deal size ($)", "Net Revenue Retention (NRR) %"] },
                                    { title: "Pipeline & Activity", items: ["Total pipeline managed ($)", "Forecast accuracy (%)", "Sales cycle length (days)", "Win rate (%) and deals closed count"] },
                                    { title: "Tools & Methodology", items: ["CRM: Salesforce, HubSpot, Dynamics", "Sales tools: Outreach, Gong, SalesLoft, ZoomInfo", "Methodology: MEDDIC, Challenger, SPIN, Value Selling", "Vertical: SMB, Mid-Market, Enterprise, Public Sector"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-orange-600" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Sales Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Lead EVERY bullet with a metric — "118% of $1.4M quota" is your headline, not a footnote</li>
                                <li>• Context matters: "$1M ARR" at a 5-person startup is different from a $10B enterprise — add company context</li>
                                <li>• Name the CRM and tools explicitly — "Salesforce (SFDC)" not just "CRM software"</li>
                                <li>• List your sales methodology: MEDDIC, Challenger, SPIN — it signals sales maturity</li>
                                <li>• Don't hide gaps in attainment — focus on other strong metrics from that period</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">High-Impact Sales Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-orange-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sales Compensation Benchmarks (US, 2026)</h3>
                            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-orange-100">
                                    <tr>
                                        <th className="text-left p-3 font-bold">Role</th>
                                        <th className="text-left p-3 font-bold">Base Salary</th>
                                        <th className="text-left p-3 font-bold">OTE (Base + Commission)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["SDR / BDR", "$45,000 – $65,000", "$70,000 – $95,000"],
                                        ["Account Executive (SMB)", "$60,000 – $90,000", "$100,000 – $150,000"],
                                        ["Account Executive (Mid-Market)", "$90,000 – $130,000", "$160,000 – $250,000"],
                                        ["Account Executive (Enterprise)", "$120,000 – $180,000", "$250,000 – $450,000"],
                                        ["Sales Manager", "$110,000 – $160,000", "$180,000 – $280,000"],
                                        ["VP of Sales", "$180,000 – $280,000", "$300,000 – $600,000"],
                                    ].map((row, i) => (
                                        <tr key={i} className="even:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                            <td className="p-3 text-orange-700 font-semibold">{row[1]}</td>
                                            <td className="p-3 text-gray-500">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sales Resume FAQs</h2>
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

            <div className="bg-orange-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/resume-builder/manager" className="text-blue-600 hover:underline font-semibold">Manager Resume</Link>
                        <Link href="/resume-builder/executive" className="text-blue-600 hover:underline font-semibold">Executive Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Sales Resume Now — Free"
                subtitle="Join thousands of sales professionals who've landed AE, manager, and VP roles with Hirecta. Lead with your numbers, win more interviews."
            />
        </div>
    );
}
