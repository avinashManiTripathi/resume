import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Layers, Target, Users, Award, CheckCircle, Zap, TrendingUp, BarChart2, Lightbulb } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Product Manager Resume Builder 2026 — Free PM Resume Templates | Hirecta',
    description: 'Build a professional product manager resume with our free PM resume builder. ATS-optimized templates for PM, Senior PM, Director of Product, and Chief Product Officer roles. Showcase product launches, business impact, and cross-functional leadership. Free PDF download.',
    keywords: 'product manager resume builder, PM resume template, product manager cv, senior product manager resume, director of product resume, product manager resume 2026, product owner resume, technical product manager resume, CPO resume, APM resume',
    alternates: { canonical: '/resume-builder/product-manager' },
    openGraph: {
        title: 'Product Manager Resume Builder 2026 — Free PM Templates | Hirecta',
        description: 'Free product manager resume builder. ATS-friendly templates for PM, Senior PM & Director of Product. Showcase product launches, OKRs & cross-functional leadership.',
        url: '/resume-builder/product-manager',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Product Manager Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Product Manager Resume Builder 2026 | Free PM Templates | Hirecta',
        description: 'Build an impact-driven PM resume. Showcase product launches, OKRs & cross-functional wins. ATS-optimized, free PDF.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const pmSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Product Manager Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1490", "bestRating": "5" },
};

export default function ProductManagerResumePage() {
    const faqs = [
        { question: "What should a product manager resume include?", answer: "A PM resume should include: product launches with business impact (DAU, revenue, retention), cross-functional leadership (engineers, designers, data teams managed), OKR/KPI achievements, product strategy contributions, discovery methodology, technical depth (SQL, data analysis), and key tools (Jira, Figma, Amplitude, Mixpanel, Productboard)." },
        { question: "How do I quantify product impact on a PM resume?", answer: "Connect every product decision to a metric: 'Launched X feature → resulted in Y% improvement in Z metric.' Examples: 'Shipped onboarding redesign → 23% improvement in D7 retention → $1.2M ARR uplift', 'Led search algorithm overhaul → CTR improved 18% → 2.4M more daily searches'. Always include the 'so what' of every launch." },
        { question: "Do I need a technical background to be a PM?", answer: "Not necessarily, but technical credibility matters. Demonstrate technical depth on your resume through: technical product areas owned (APIs, data infrastructure, ML features), collaboration with engineering during architecture reviews, SQL/data analysis skills, understanding of system constraints. Technical PMs (TPMs) command 20-30% higher salaries." },
        { question: "How do I show cross-functional leadership on a PM resume?", answer: "List the teams you coordinated: 'Led cross-functional team of 8 (3 engineers, 2 designers, 1 data scientist, 2 marketers)'. Mention stakeholder management: C-suite alignment, executive presentations, customer advisory board. Show you're a multiplier: 'Defined Q3 product roadmap for 4 engineering squads (22 engineers)'." },
        { question: "What tools should a PM list on their resume?", answer: "Core PM tools by category: Roadmapping (Jira, Linear, Productboard, Aha!), Analytics (Amplitude, Mixpanel, Google Analytics, Looker), Design (Figma, InVision), User Research (UserTesting, Dovetail, Hotjar, FullStory), Communication (Slack, Confluence, Notion), Data (SQL, Python basics, Tableau). List tools specific to the company's stack when tailoring." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Product Manager Resume", url: `${ENV.BASE_URL}/resume-builder/product-manager` },
    ];

    const bullets = [
        "Led 0-to-1 launch of mobile checkout flow for 3M+ user e-commerce platform: shipped in 14 weeks across 3 engineering squads, achieving $8.2M incremental annual revenue and 31% reduction in cart abandonment",
        "Defined and executed Q4 product roadmap aligning 4 teams (18 engineers, 3 designers) to company OKR of 20% DAU growth — delivered 22% DAU growth vs. target",
        "Drove A/B test strategy for notification system: ran 12 experiments in 6 months, identifying optimum send-time algorithm that increased D30 retention by 9 points (41% → 50%)",
        "Conducted 40+ user discovery interviews and 3 usability tests to define search feature MVP, reducing time-to-implementation by 3 weeks and saving $120K in engineering rework",
        "Partnered with data science team to integrate ML-powered recommendations into product feed, increasing items-per-session from 3.2 to 5.8 and average order value by 14%",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Product Manager Resume Builder 2026 — Free PM Resume Templates"
                description="Build a professional product manager resume with ATS-friendly templates. Showcase product launches, OKRs, and cross-functional leadership."
                url={`${ENV.BASE_URL}/resume-builder/product-manager`}
                datePublished="2026-02-21"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pmSchema) }} />

            <ResourceHero
                badge="Product Management"
                badgeIcon={Layers}
                title={
                    <>
                        Product Manager <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resume Builder</span>
                    </>
                }
                subtitle="Create an impact-driven product manager resume that showcases product launches, OKR achievements, and cross-functional leadership. ATS-friendly templates for APM, PM, Senior PM, and Director of Product roles. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Product Leaders"
                features={[
                    { icon: <Lightbulb className="w-6 h-6" />, title: "Impact-First Layout", description: "Templates designed to lead with product outcomes: DAU growth, revenue uplift, retention improvements, and OKR delivery." },
                    { icon: <Layers className="w-6 h-6" />, title: "Product Strategy Section", description: "Dedicated area for roadmap ownership, discovery methodology, and product vision contributions." },
                    { icon: <Users className="w-6 h-6" />, title: "Cross-Functional Leadership", description: "Highlight team size coordinated, engineering squads led, and executive stakeholder management." },
                    { icon: <BarChart2 className="w-6 h-6" />, title: "Metrics Dashboard", description: "Showcase key product metrics: DAU/MAU, NPS, ARPU, churn, conversion, and funnel KPIs." },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "AI PM Bullet Points", description: "AI-powered bullet suggestions using product management terminology: OKRs, discovery, sprint, roadmap, A/B tests." },
                    { icon: <Award className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass ATS for PM roles at FAANG, startups, and growth-stage companies with proper product keywords." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Product Manager Resume That Stands Out"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential PM Resume Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Product Impact
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Products shipped with business outcomes</li>
                                        <li>• OKRs achieved + percentage vs target</li>
                                        <li>• Retention, engagement, revenue metrics</li>
                                        <li>• User base scale (DAU, MAU)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Cross-Functional Leadership
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Number of engineering squads / team size</li>
                                        <li>• Stakeholders: engineering, design, data, legal</li>
                                        <li>• Executive presentations / board updates</li>
                                        <li>• Roadmap ownership scope</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Core Competencies
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Product strategy & vision</li>
                                        <li>• User research & discovery</li>
                                        <li>• Roadmap prioritization (RICE, MoSCoW)</li>
                                        <li>• Data analysis & A/B testing</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Tools & Tech
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Jira, Linear, Productboard, Aha!</li>
                                        <li>• Amplitude, Mixpanel, Looker</li>
                                        <li>• Figma, Miro, InVision</li>
                                        <li>• SQL, Python (for data PMs)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Pro Tips for PM Resumes
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Every launch bullet: Feature → Action → Metric → Business outcome</li>
                                <li>• State team size and roles coordinated for every project</li>
                                <li>• Mention product area scale: "30M MAU platform" or "$400M revenue product"</li>
                                <li>• Show discovery skills: user interviews conducted, usability tests run</li>
                                <li>• For APM applications: highlight relevant internships, side products, and courses (Reforge, PM School)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">High-Impact PM Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-indigo-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PM type guides */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Manager Resume Guide by Level and Type</h3>
                            <p className="text-gray-600 mb-6">The PM role differs significantly by seniority level, company stage, and product type. Here is what to emphasize for each track.</p>
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { role: "Associate PM / APM (0–2 years)", skills: ["Side projects or hackathon products shipped (include metrics)", "Internship product work with measurable outcomes", "Reforge, PM School, or other structured PM education", "Involvement in user research, A/B tests, or sprint planning", "Technical background (engineering, data) if applicable", "Coursera / Udemy PM certifications as signal of commitment", "SQL or data analysis skills (huge differentiator at APM level)", "Case study prep and articulation skills"] },
                                    { role: "Product Manager (2–5 years)", skills: ["Full product lifecycle ownership: discovery to launch to iteration", "Specific features shipped with before/after metric deltas", "Cross-functional team size coordinated (engineers, designers, data)", "A/B test velocity: experiments run per quarter", "User research cadence: interviews, usability tests, surveys", "Technical depth: API definitions, data model discussions", "Roadmap prioritization methodology (RICE, ICE, MoSCoW)", "Stakeholder management: cross-team alignment and executive updates"] },
                                    { role: "Senior Product Manager (5–8 years)", skills: ["Product area P&L or revenue ownership", "Multiple simultaneous product lines managed", "OKR definition and cascading to engineering squads", "0-to-1 product launches with revenue achievement", "Influencing without authority: cross-org alignment", "Competitor analysis and market positioning decisions", "Partnership or platform strategy work", "Junior PM mentoring and career development"] },
                                    { role: "Staff / Principal PM", skills: ["Company-wide product strategy contributions", "Incubation of new product bets and business lines", "Organizational design input: team topology and headcount planning", "Multi-year product vision articulation and evangelism", "Executive team and board-level product presentations", "M&A or partnership evaluation (technical due diligence)", "Influencing product philosophy and engineering culture", "Cross-functional thought leadership published internally or externally"] },
                                    { role: "Director of Product", skills: ["PM team management (2–8 direct reports) and career development", "Hiring: interviewing, scorecards, PM team building", "Department-level OKR definition and resource allocation", "Multi-squad product roadmap governance", "Product org design: squad structure, PM:eng ratios", "C-suite partnership: aligning product with business strategy", "Cross-functional VP and Director-level stakeholder management", "Budget ownership and investment prioritization"] },
                                    { role: "CPO / VP of Product", skills: ["Company-wide product strategy and 3-year vision", "Full product portfolio P&L ownership", "Product-led growth strategy design and execution", "Board and investor product reporting", "Competitive positioning and differentiation strategy", "Executive team as peer: partnership with CEO, CTO, CMO", "Hiring and developing Directors and Staff PMs", "M&A evaluation, partnership strategy, and platform ecosystem"] },
                                ].map((item, i) => (
                                    <div key={i} className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                                        <h4 className="font-bold text-gray-900 mb-3">{item.role}</h4>
                                        <ul className="space-y-1.5">
                                            {item.skills.map((s, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Examples */}
                        <div className="bg-indigo-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary Examples by Level</h3>
                            <div className="space-y-5">
                                {[
                                    { label: "Associate PM / New Graduate", summary: "Analytical and user-centric aspiring product manager with 1 year of PM internship experience at a Series B SaaS company. Owned user onboarding feature from discovery to launch: reduced time-to-first-value by 28%, directly contributing to 11% improvement in trial-to-paid conversion. Proficient in Amplitude, Jira, Figma, and SQL. Reforge Product Strategy graduate. Passionate about building products that solve real user pain at scale." },
                                    { label: "Product Manager (3–6 years)", summary: "Impact-driven Product Manager with 5 years of experience building B2C mobile products at scale (10M+ MAU). Led 4 product launches in 18 months — highest-impact was an AI-personalized content feed that increased DAU by 19% and average session duration by 2.4 minutes, driving $3.8M in incremental ad revenue annually. Expert at 0-to-1 product thinking, data-driven discovery, and leading cross-functional teams of 8–12 (engineers, designers, data scientists). Deep Amplitude, Mixpanel, and SQL proficiency." },
                                    { label: "Senior PM / Director of Product", summary: "Strategic product leader with 10+ years driving category-defining products at Shopify and pre-IPO fintech (Series D). Built and scaled Shopify Payments to $28B GMV as Group PM overseeing 40-engineer organization. Led 3 M&A evaluations resulting in 2 acquisitions ($85M combined). Hired and developed 8 PMs. Known for setting long-range vision, operating rigorously on OKRs, and collaborating effectively with CEO and board on product strategy. Reforge mentor and regular speaker at ProductCon and Mind the Product." },
                                ].map((ex, i) => (
                                    <div key={i} className="bg-white rounded-lg p-5 border border-indigo-100">
                                        <p className="text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">{ex.label}</p>
                                        <p className="text-gray-700 leading-relaxed text-sm italic">"{ex.summary}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mistakes */}
                        <div className="bg-red-50 rounded-xl p-8 border border-red-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-5">6 Product Manager Resume Mistakes (and How to Fix Them)</h3>
                            <div className="space-y-4">
                                {[
                                    { mistake: "Listing product features without business impact", fix: "'Shipped dark mode' is a feature. 'Launched dark mode for 8M users → 14% reduction in churn among power users → $2.1M ARR retained' is an impact statement. Every launch needs a business outcome." },
                                    { mistake: "Vague cross-functional leadership claims", fix: "'Worked with engineering and design' is meaningless. 'Led cross-functional team of 11 (5 FE/BE engineers, 2 designers, 1 data scientist, 3 marketing stakeholders) to launch X in 10 weeks, under budget and ahead of schedule' is compelling." },
                                    { mistake: "Not showing discovery rigor", fix: "PMs who ship without discovery scare hiring managers. Include: '45 user interviews over 6 weeks, 3 usability tests with 15 participants, analysis of 2,400 support tickets' to demonstrate research-driven decision making." },
                                    { mistake: "Omitting product scale context", fix: "Context matters enormously. 'Improved retention by 5%' on a 100-user product is very different from a 20M MAU platform. Always include scale: 'across our 18M MAU iOS app' or 'for our $200M ARR enterprise product.'" },
                                    { mistake: "No tools listed (or generic ones)", fix: "Companies match candidates to their stacks. A Mixpanel-heavy company wants Mixpanel experience. List every tool explicitly: analytics, roadmapping, design, data, communication. Tool familiarity shortens ramp time and is heavily weighted." },
                                    { mistake: "Confusing responsibilities with achievements", fix: "'Owned the checkout product area' is a responsibility. 'Reduced checkout abandonment from 74% to 61% by redesigning the payment flow, adding 3 new payment methods, and eliminating a required account creation step' is an achievement." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-red-100">
                                        <p className="font-semibold text-red-700 mb-1">✗ {item.mistake}</p>
                                        <p className="text-gray-600 text-sm"><strong className="text-green-700">Fix: </strong>{item.fix}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Salary Table */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Manager Salary Data (US, 2026)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-indigo-100">
                                        <tr>
                                            <th className="text-left p-3 font-bold text-gray-900">PM Level</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Base Salary</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Total Comp (TC)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            ["Associate PM (APM)", "$100,000 – $130,000", "$130K – $200K"],
                                            ["Product Manager", "$130,000 – $170,000", "$180K – $280K"],
                                            ["Senior Product Manager", "$160,000 – $210,000", "$250K – $400K"],
                                            ["Staff / Principal PM", "$200,000 – $260,000", "$350K – $600K"],
                                            ["Director of Product", "$220,000 – $290,000", "$400K – $700K+"],
                                            ["VP of Product", "$260,000 – $350,000", "$500K – $900K+"],
                                            ["Chief Product Officer (CPO)", "$300,000 – $450,000+", "$700K – $2M+*"],
                                        ].map((row, i) => (
                                            <tr key={i} className="even:bg-gray-50">
                                                <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                                <td className="p-3 text-indigo-700 font-semibold">{row[1]}</td>
                                                <td className="p-3 text-gray-600">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-400 mt-2">*CPO TC includes significant equity (options/RSUs). Source: Levels.fyi + Glassdoor 2025–2026. FAANG/top-tier startup salaries.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Product Manager ATS Keyword List (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Product Roadmap", "OKRs", "KPIs", "User Research", "Customer Discovery", "Jobs-to-be-Done (JTBD)", "User Interviews", "Usability Testing", "A/B Testing", "Multivariate Testing", "Agile", "Scrum", "Sprint Planning", "Kanban", "SAFe", "Jira", "Linear", "Productboard", "Aha!", "Amplitude", "Mixpanel", "Google Analytics 4", "Looker", "Figma", "Miro", "InVision", "UserTesting", "Dovetail", "FullStory", "Hotjar", "SQL", "Tableau", "Go-to-Market Strategy", "Product-Led Growth (PLG)", "DAU", "MAU", "ARPU", "LTV", "NPS", "Churn", "Retention", "Conversion Rate", "Funnel Optimization", "RICE Prioritization", "MoSCoW", "PRD", "BRD", "Spec Writing", "MVP", "North Star Metric", "P&L Ownership", "Roadmap Prioritization", "Stakeholder Management", "Cross-Functional Leadership", "API Integration", "Platform Strategy", "0-to-1 Product Development", "Product-Market Fit", "CAC", "Revenue Attribution", "Customer Journey Mapping"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Product Manager Resume FAQs</h2>
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
                        <Link href="/resume-builder/software-engineer" className="text-blue-600 hover:underline font-semibold">Software Engineer Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/ai-resume-builder" className="text-blue-600 hover:underline font-semibold">AI Resume Builder</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Product Manager Resume Now — Free"
                subtitle="Join thousands of PMs who've landed roles at FAANG, unicorn startups, and growth companies with Hirecta."
            />
        </div>
    );
}
