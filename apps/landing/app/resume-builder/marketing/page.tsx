import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { TrendingUp, BarChart2, Target, Award, CheckCircle, Zap, Users, Megaphone, Brain } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Marketing Resume Builder 2026 — Free Digital Marketing Resume Templates | Hirecta',
    description: 'Build a standout marketing resume with our free marketing resume builder. ATS-optimized templates for digital marketing, SEO, content marketing, social media, growth hacking, and marketing manager roles. Showcase ROI, campaign metrics & KPIs. Free PDF download.',
    keywords: 'marketing resume builder, digital marketing resume, marketing manager resume template, SEO resume, content marketing resume, social media manager resume, growth marketing resume, marketing specialist resume, CMO resume, marketing cv 2026',
    alternates: { canonical: '/resume-builder/marketing' },
    openGraph: {
        title: 'Marketing Resume Builder 2026 — Free Digital Marketing Templates | Hirecta',
        description: 'Free marketing resume builder for digital marketers, SEO specialists, content managers & growth marketers. Showcase campaign ROI and KPIs. ATS-optimized.',
        url: '/resume-builder/marketing',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Marketing Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Marketing Resume Builder 2026 | Free Digital Marketing Templates | Hirecta',
        description: 'Build a data-driven marketing resume. Showcase ROI, KPIs & campaign results. ATS-friendly, free PDF.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const marketingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Marketing Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1620", "bestRating": "5" },
};

export default function MarketingResumePage() {
    const faqs = [
        { question: "What should a digital marketing resume include?", answer: "A digital marketing resume should include: specific marketing channels (SEO, PPC, email, social media, content), hard metrics (ROAS, CAC, CTR, conversion rates, revenue attributed), tools proficiency (Google Ads, HubSpot, Salesforce, Meta Ads Manager, Semrush), campaign achievements with before/after numbers, and any budget managed." },
        { question: "How do I quantify marketing achievements on my resume?", answer: "Always include: campaign name or objective + metric before + action you took + result after. Example: 'Redesigned email nurture sequence (8 emails) → increased open rate 42% → 67% → drove $180K in pipeline in Q3 2025.' Show ROI, revenue attributed, leads generated, CAC reduced, or conversion rate improved." },
        { question: "What marketing tools should I list on my resume?", answer: "Technical stack that recruiters scan for: Google Analytics 4, Google Ads, Meta Ads Manager, HubSpot, Salesforce, Mailchimp/Klaviyo, Semrush/Ahrefs, Hootsuite/Buffer, Canva/Adobe Creative Suite, SQL for data pulls, and Looker/Tableau for reporting. List tools by proficiency level." },
        { question: "Do I need a portfolio link on my marketing resume?", answer: "Yes, especially for content, social media, and creative roles. Include a portfolio URL (personal site, Contently, Behance, or Notion page) with campaign examples, writing samples, or ad creative. Place it next to your LinkedIn in the header section." },
        { question: "How long should a marketing manager resume be?", answer: "1 page for 0-3 years of experience, 2 pages for senior marketers (5+ years) or managers overseeing multiple channels and teams. Directors and VPs can use 2 pages. Focus on depth of impact over breadth of activities." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Marketing Resume", url: `${ENV.BASE_URL}/resume-builder/marketing` },
    ];

    const bullets = [
        "Managed $2.4M annual Google Ads budget across 8 product lines, achieving 340% ROAS and reducing CPA by 28% through audience segmentation and bid strategy optimization",
        "Launched and scaled email marketing program from 0 to 85K subscribers, achieving 38% open rate (Industry avg: 21%) and generating $420K in attributed revenue annually",
        "Led SEO overhaul: conducted 500-keyword audit, fixed 200+ technical issues, built 45 editorial links — organic traffic grew 185% in 12 months to 180K monthly sessions",
        "Built and managed 4-person content team, scaling blog from 2 to 8 posts/week, increasing organic leads by 73% and brand authority (DA 35 → 58) in 8 months",
        "Designed A/B testing framework for landing pages: ran 24 tests in 6 months, achieving cumulative conversion rate improvement of 41% (2.1% → 3.0%) for freemium signup flow",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Marketing Resume Builder 2026 — Free Digital Marketing Resume Templates"
                description="Create a data-driven marketing resume with ATS-friendly templates. Showcase campaign ROI, KPIs, and marketing tech stack."
                url={`${ENV.BASE_URL}/resume-builder/marketing`}
                datePublished="2026-02-21"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(marketingSchema) }} />

            <ResourceHero
                badge="Marketing Careers"
                badgeIcon={TrendingUp}
                title={
                    <>
                        Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Resume Builder</span>
                    </>
                }
                subtitle="Create a data-driven marketing resume that showcases your campaign ROI, channel expertise, and growth metrics. ATS-friendly templates for digital marketing, SEO, content, social media, and growth roles. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Data-Driven Marketers"
                features={[
                    { icon: <BarChart2 className="w-6 h-6" />, title: "Metrics-First Layout", description: "Templates designed to highlight ROAS, CAC, CTR, conversions, and revenue attributed — the numbers that matter to CMOs." },
                    { icon: <Megaphone className="w-6 h-6" />, title: "Channel Expertise Section", description: "Dedicated section for SEO, PPC, email, social media, content, and other channels with proficiency levels." },
                    { icon: <Brain className="w-6 h-6" />, title: "AI Marketing Bullets", description: "AI-powered bullet point suggestions using marketing-specific terminology aligned with growth, demand gen, or brand roles." },
                    { icon: <Target className="w-6 h-6" />, title: "Role-Specific Templates", description: "Tailored for Digital Marketing Manager, SEO Specialist, Content Strategist, Growth Marketer, and CMO positions." },
                    { icon: <Users className="w-6 h-6" />, title: "Team & Budget Signals", description: "Sections to highlight team size managed and budget overseen — top signals for senior marketing roles." },
                    { icon: <Award className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass Greenhouse, Workday, and Lever ATS with the right marketing keywords for your specific specialization." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a High-Impact Marketing Resume"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Marketing Resume Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Core Competencies
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Marketing channels by proficiency</li>
                                        <li>• Marketing tech stack (tools list)</li>
                                        <li>• Specialization areas (B2B, B2C, SaaS)</li>
                                        <li>• Skills: SEO, PPC, CRO, ABM, email</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Campaign Achievements
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Channel, budget, ROAS / ROI</li>
                                        <li>• Before / after metric comparisons</li>
                                        <li>• Revenue or pipeline attributed</li>
                                        <li>• Leads generated / conversion rates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Pro Tips for Marketing Resumes
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Every bullet should have a before number, an action, and an after number</li>
                                <li>• Specify the budget you managed (CMOs want to see fiscal responsibility)</li>
                                <li>• List certifications: Google Ads, HubSpot, Meta Blueprint, Google Analytics</li>
                                <li>• Tailor channels to the role: SEO-heavy for organic roles, ROAS for paid roles</li>
                                <li>• Include a portfolio/case study link for content and creative roles</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">High-Impact Marketing Resume Bullets</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-orange-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Role-specific guides */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Resume Guide by Specialization</h3>
                            <p className="text-gray-600 mb-6">Marketing is broad. Here is what to emphasize depending on your specialization — each one has different ATS keyword requirements and what hiring managers prioritize.</p>
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { role: "SEO / Organic Growth Specialist", skills: ["Keyword research & mapping (Semrush, Ahrefs, Moz)", "Technical SEO audits (Core Web Vitals, crawlability, indexing)", "On-page optimization (title tags, schema, internal linking)", "Link building (outreach, guest posting, digital PR)", "Content strategy aligned to search intent", "Analytics: GA4, Google Search Console, Looker Studio", "Organic traffic growth % and ranking improvements", "Site architecture and URL structure"] },
                                    { role: "Paid Media / PPC Manager", skills: ["Google Ads (Search, Display, Shopping, Performance Max)", "Meta Ads Manager (Facebook, Instagram, Reels)", "LinkedIn Ads (B2B lead generation)", "Programmatic advertising (DV360, The Trade Desk)", "ROAS, CPA, CTR, Quality Score optimization", "Audience segmentation & lookalike modeling", "Budget management (monthly/annual spend)", "Attribution modeling (GA4, Triple Whale, Northbeam)"] },
                                    { role: "Content Marketing Manager", skills: ["Editorial calendar planning and management", "SEO-driven content creation and optimization", "Blog, long-form, and pillar page strategy", "Content distribution and syndication", "Thought leadership and byline placements", "Content performance analytics (time-on-page, conversions)", "Team management (writers, editors, freelancers)", "Content ops: CMS (WordPress, Webflow), workflow tools"] },
                                    { role: "Email / CRM Marketing", skills: ["Email strategy: drip campaigns, nurture sequences, broadcast", "List hygiene: segmentation, deliverability, suppression", "A/B testing: subject lines, CTAs, send time optimization", "ESPs: Klaviyo, HubSpot, Mailchimp, Marketo, Iterable", "Lifecycle marketing: onboarding, retention, win-back", "Open rate, click rate, unsubscribe rate benchmarks", "Revenue attribution from email channel", "SMS marketing and cross-channel campaigns"] },
                                    { role: "Social Media Manager", skills: ["Platform strategy: Instagram, LinkedIn, TikTok, X, Pinterest", "Content creation: copy, graphics (Canva/Adobe), video (CapCut, Premiere)", "Community management and brand voice consistency", "Influencer identification, outreach, and campaign tracking", "Social media analytics: reach, engagement, sentiment", "Paid social amplification and boosting strategy", "Social listening tools (Brandwatch, Sprout Social, Hootsuite)", "Crisis management and real-time engagement"] },
                                    { role: "Growth / Demand Gen Marketer", skills: ["Full-funnel campaign strategy (Awareness → Revenue)", "Account-Based Marketing (ABM) execution: Demandbase, 6sense", "Lead scoring and MQL/SQL handoff processes", "Marketing qualified pipeline and revenue attribution", "Landing page optimization and CRO (Unbounce, VWO)", "Webinar, event, and virtual summit execution", "Partner and referral program development", "Revenue operations and Salesforce CRM alignment"] },
                                ].map((item, i) => (
                                    <div key={i} className="bg-orange-50 rounded-xl p-5 border border-orange-100">
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
                        <div className="bg-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary Examples by Level</h3>
                            <div className="space-y-5">
                                {[
                                    { label: "Junior / Coordinator (0–2 years)", summary: "Ambitious digital marketing coordinator with 2 years of hands-on experience supporting SEO, email, and paid social campaigns for a D2C e-commerce brand. Managed HubSpot CRM data, built email segments, and contributed to A/B tests that improved landing page CVR by 18%. Google Analytics 4 certified. Eager to grow into a specialist role focused on organic growth and content strategy." },
                                    { label: "Marketing Manager (3–7 years)", summary: "Data-driven Senior Marketing Manager with 6 years of B2B SaaS experience owning demand generation and content programs. Generated $3.2M in pipeline in FY2025 through integrated paid search, ABM, and content initiatives. Expert in Salesforce + HubSpot marketing stack, full-funnel attribution, and cross-functional collaboration with sales and product. Led a 5-person team and managed $1.8M annual marketing budget." },
                                    { label: "Director / VP of Marketing", summary: "Results-oriented VP of Marketing with 12+ years scaling B2B/SaaS marketing programs from seed stage to Series C. Architected the go-to-market strategy that drove 4x logo growth at [Company] — from 200 to 900 enterprise accounts in 18 months. Expert in brand positioning, performance marketing, analyst relations, and building high-performance marketing teams (grew team from 3 to 22 across 4 disciplines). Consistent track record of delivering 3:1+ marketing-sourced pipeline-to-revenue ratios." },
                                ].map((ex, i) => (
                                    <div key={i} className="bg-white rounded-lg p-5 border border-blue-100">
                                        <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">{ex.label}</p>
                                        <p className="text-gray-700 leading-relaxed text-sm italic">"{ex.summary}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mistakes */}
                        <div className="bg-red-50 rounded-xl p-8 border border-red-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-5">6 Marketing Resume Mistakes That Cost You Interviews</h3>
                            <div className="space-y-4">
                                {[
                                    { mistake: "Describing activities instead of outcomes", fix: "'Ran Google Ads campaigns' → 'Managed $1.2M Google Ads budget, achieving 4.2x ROAS and reducing CPA from $180 to $122 over 6 months.'" },
                                    { mistake: "Listing tools without context", fix: "'HubSpot, Salesforce, Marketo' means nothing alone. Add: 'Built automated lead scoring model in HubSpot + Salesforce, improving sales follow-up rate by 35% and reducing MQL-to-SQL cycle by 4 days.'" },
                                    { mistake: "No portfolio or case study link", fix: "For content, social, and creative roles especially, a portfolio is expected. Include a link to a Notion page, website, or Google Drive with 2–3 campaign case studies." },
                                    { mistake: "Using jargon without substance", fix: "'Growth hacker' and 'full-stack marketer' are red flags without evidence. Back up every label with a specific initiative and result." },
                                    { mistake: "Ignoring ATS keyword optimization", fix: "Job descriptions for 'Digital Marketing Manager' roles differ from 'Demand Generation Manager.' Mirror the exact language of each job posting using Hirecta's Tailor tool." },
                                    { mistake: "Not showing budget ownership", fix: "Marketing leaders want to hire people who've managed real budgets responsibly. Always state the budget you managed: '$450K annual paid media budget' signals seniority and fiscal accountability." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-red-100">
                                        <p className="font-semibold text-red-700 mb-1">✗ {item.mistake}</p>
                                        <p className="text-gray-600 text-sm"><strong className="text-green-700">Fix: </strong>{item.fix}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Salary Table */}
                        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Salary Data by Role (US, 2026)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-orange-100">
                                        <tr>
                                            <th className="text-left p-3 font-bold text-gray-900">Marketing Role</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Avg US Salary</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Top Cities</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            ["Marketing Coordinator", "$52,000 – $68,000", "NYC, LA, Chicago"],
                                            ["SEO / Content Specialist", "$62,000 – $88,000", "Remote-friendly"],
                                            ["Paid Media Manager", "$75,000 – $105,000", "NYC, SF, Austin"],
                                            ["Email / CRM Manager", "$72,000 – $98,000", "Remote-friendly"],
                                            ["Social Media Manager", "$60,000 – $85,000", "LA, NYC, Chicago"],
                                            ["Marketing Manager", "$88,000 – $120,000", "SF, NYC, Boston"],
                                            ["Director of Marketing", "$130,000 – $180,000", "SF, NYC, Seattle"],
                                            ["VP / CMO", "$180,000 – $280,000+", "SF, NYC, LA"],
                                        ].map((row, i) => (
                                            <tr key={i} className="even:bg-gray-50">
                                                <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                                <td className="p-3 text-orange-700 font-semibold">{row[1]}</td>
                                                <td className="p-3 text-gray-500">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-400 mt-2">Source: Glassdoor + Levels.fyi + LinkedIn Salary 2025–2026.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Marketing ATS Keyword List (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["SEO", "SEM", "PPC", "Google Ads", "Meta Ads Manager", "LinkedIn Ads", "TikTok Ads", "Programmatic Advertising", "Email Marketing", "Marketing Automation", "HubSpot", "Salesforce", "Marketo", "Pardot", "Klaviyo", "Mailchimp", "Iterable", "Google Analytics 4", "Looker Studio", "Semrush", "Ahrefs", "Moz", "Screaming Frog", "Content Strategy", "Conversion Rate Optimization (CRO)", "A/B Testing", "Multivariate Testing", "ROAS", "CAC", "LTV", "MQL", "SQL", "Pipeline", "Revenue Attribution", "Demand Generation", "Account-Based Marketing (ABM)", "Inbound Marketing", "Lead Nurturing", "Lead Scoring", "Growth Hacking", "Funnel Optimization", "Landing Page Optimization", "Webflow", "WordPress", "Canva", "Adobe Creative Suite", "Social Media Strategy", "Community Management", "Influencer Marketing", "Brand Strategy", "Copywriting", "Brand Voice"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Marketing Resume FAQs</h2>
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
                        <Link href="/resume-builder/nurse" className="text-blue-600 hover:underline font-semibold">Nurse Resume</Link>
                        <Link href="/resume-builder/teacher" className="text-blue-600 hover:underline font-semibold">Teacher Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/resume-builder/product-manager" className="text-blue-600 hover:underline font-semibold">Product Manager Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Marketing Resume Now — Free"
                subtitle="Join thousands of marketers who've landed roles at top brands with Hirecta. ATS-optimized, no watermarks, instant PDF."
            />
        </div>
    );
}
