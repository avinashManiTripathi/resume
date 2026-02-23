import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { TrendingUp, CheckCircle, Zap, Award, Users, BarChart, Target, Star } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Executive Resume Builder 2026 — Free C-Suite & Director Templates | Hirecta',
    description: 'Build a powerful executive resume in 2026. Free ATS-optimized templates for CEO, CFO, COO, VP, and Director roles. Showcase P&L, board experience, and strategic impact. Free PDF download.',
    keywords: 'executive resume builder, CEO resume, CFO resume, VP resume, director resume, C-suite resume, senior executive resume, executive CV, leadership resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/executive' },
    openGraph: {
        title: 'Executive Resume Builder 2026 — C-Suite & Director Templates | Hirecta',
        description: 'Free executive resume builder for CEO, CFO, VP, and Director roles. P&L impact, board experience, strategic leadership focus.',
        url: 'https://hirecta.com/resume-builder/executive',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Executive Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Resume Builder 2026 | Hirecta',
        description: 'Create an executive resume for C-suite and senior leadership. ATS-optimized, free PDF.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Executive Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2140", "bestRating": "5" },
};

export default function ExecutiveResumePage() {
    const faqs = [
        { question: "How long should an executive resume be?", answer: "2 pages is the standard for executives with 15+ years of experience. Never exceed 3 pages. Focus on the last 15 years; earlier roles can be listed without bullets." },
        { question: "What metrics should executives include on a resume?", answer: "P&L size, revenue growth (%), cost reduction ($M), team size, market share gains, M&A transactions, fundraising amounts, and board relationships are the metrics that impress hiring committees." },
        { question: "Do executives need to worry about ATS?", answer: "Yes — even executive roles are screened by ATS at Fortune 500 companies and large PE firms. Use a clean, parseable format and include industry-specific keywords from the job description." },
        { question: "Should I include a photo on my executive resume?", answer: "In North America: no photo. In Europe and Asia: photo is acceptable and often expected. For international roles, follow the local standard for the target market." },
        { question: "How do I handle a career gap on an executive resume?", answer: "Be proactive. Frame gaps as board work, consulting, or strategic planning. 'Independent Consultant — advising 3 portfolio companies on go-to-market strategy' is far stronger than leaving a visible gap." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Executive Resume", url: `${ENV.BASE_URL}/resume-builder/executive` },
    ];

    const bullets = [
        "Led full-cycle digital transformation across 8 global business units, consolidating 14 legacy systems into unified cloud infrastructure (AWS), reducing operating costs by $42M annually",
        "Scaled company ARR from $28M to $187M over 5 years through 3 strategic acquisitions ($65M combined) and APAC market expansion",
        "Built and led 340-person engineering org across 4 countries; OKR framework raised employee engagement from 58% to 84%",
        "Closed $120M Series C (Sequoia Capital) and structured $85M competitor acquisition, immediately accretive at 22% EBITDA",
        "Championed DEI initiative yielding 38% increase in VP+ leadership diversity; recognized on Fortune 'Best Workplaces for Diversity'",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Executive Resume Builder 2026 — Free C-Suite & Director Templates"
                description="Build a powerful executive resume for CEO, CFO, VP, and Director roles with ATS-optimized templates."
                url={`${ENV.BASE_URL}/resume-builder/executive`}
                datePublished="2026-02-23"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="C-Suite & Senior Leadership"
                badgeIcon={TrendingUp}
                title={<>Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-700">Resume Builder</span></>}
                subtitle="Command the room before you walk in. Free executive resume builder with board-ready templates for CEO, CFO, COO, VP, and Director roles. Showcase P&L impact, strategic vision, and organizational scale. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Senior Leadership"
                features={[
                    { icon: <BarChart className="w-6 h-6" />, title: "P&L Impact Sections", description: "Templates designed to lead with revenue, cost, and organizational scale — the metrics boards and CEOs care about." },
                    { icon: <Award className="w-6 h-6" />, title: "Board & Advisory Section", description: "Dedicated block for board memberships, advisory roles, and investor relationships that define executive brand." },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "2-Page Executive Format", description: "Clean, sophisticated 2-page layout with premium typography — the industry standard for VP+ candidates." },
                    { icon: <Target className="w-6 h-6" />, title: "Personal Brand Statement", description: "AI-powered leadership thesis that replaces generic objectives with a compelling 3-line executive brand." },
                    { icon: <Users className="w-6 h-6" />, title: "Org Scale Showcase", description: "Highlight org size, global footprint, and cross-functional scope — the context that commands executive salary." },
                    { icon: <Star className="w-6 h-6" />, title: "Search Firm Ready", description: "Optimized for Korn Ferry, Spencer Stuart, and Heidrick & Struggles executive search processes." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a C-Suite Resume That Opens Doors"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Executive Resume Structure</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Personal Brand Statement", items: ["3–4 lines defining your leadership thesis", "Industry verticals and market expertise", "2–3 career-defining metrics upfront", "Avoid: passionate, dynamic, results-driven"] },
                                    { title: "Core Competencies", items: ["P&L Management | Digital Transformation", "M&A Integration | Organizational Design", "Strategic Planning | Board Relations", "12–18 keywords — quality over quantity"] },
                                    { title: "Career Experience", items: ["Last 15 years covered in detail", "Company context: revenue, employees, industry", "3–5 bullets per role — strategic wins only", "Earlier roles: title + company + dates only"] },
                                    { title: "Board, Education & Affiliations", items: ["Board memberships and advisory roles", "MBA/advanced degree", "Industry associations and speaking engagements", "Publications and thought leadership"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-blue-700" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Executive Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Lead with strategic impact — boards want outcomes, not responsibilities</li>
                                <li>• Include company context: "$500M PE-backed SaaS" signals credibility instantly</li>
                                <li>• Quantify at scale: "$42M cost reduction" and "340-person org" command executive respect</li>
                                <li>• Never use first person (I, my) — write in implied first person</li>
                                <li>• Use a professional personal email, never your current company email</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-slate-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Compensation Benchmarks (2026)</h3>
                            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="text-left p-3 font-bold">Title</th>
                                        <th className="text-left p-3 font-bold">Base Salary</th>
                                        <th className="text-left p-3 font-bold">Total Comp (with equity)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["CEO", "$300K – $600K", "$1M – $5M+"],
                                        ["CFO", "$250K – $500K", "$700K – $3M"],
                                        ["CTO / CIO", "$250K – $450K", "$600K – $2.5M"],
                                        ["COO", "$230K – $450K", "$600K – $2M"],
                                        ["VP Sales / Engineering", "$200K – $380K", "$350K – $1.2M"],
                                        ["Senior Director", "$150K – $250K", "$200K – $600K"],
                                    ].map((row, i) => (
                                        <tr key={i} className="even:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                            <td className="p-3 text-blue-700 font-semibold">{row[1]}</td>
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Executive Resume FAQs</h2>
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

            <div className="bg-slate-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/manager" className="text-blue-600 hover:underline font-semibold">Manager Resume</Link>
                        <Link href="/resume-builder/finance" className="text-blue-600 hover:underline font-semibold">Finance Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Executive Resume Now — Free"
                subtitle="Join thousands of senior leaders who've landed C-suite roles with Hirecta. Board-ready format, ATS-optimized, instant PDF."
            />
        </div>
    );
}
