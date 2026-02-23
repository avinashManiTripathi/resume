import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Headphones, CheckCircle, Zap, Award, Target, Star, Users, MessageSquare } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Customer Service Resume Builder 2026 — Free Support & CX Resume Templates | Hirecta',
    description: 'Build a professional customer service resume in 2026. Free ATS-optimized templates for customer service reps, support specialists, call center agents, and CX managers. Highlight CSAT scores, resolution rates, and CRM skills. Free PDF download.',
    keywords: 'customer service resume builder, customer service representative resume, call center resume, CX resume, support specialist resume, customer success resume, help desk resume template 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/customer-service' },
    openGraph: {
        title: 'Customer Service Resume Builder 2026 — Free CX & Support Templates | Hirecta',
        description: 'Free customer service resume builder for support reps, CX specialists, and call center agents. Highlight CSAT, resolution rate, and CRM skills.',
        url: 'https://hirecta.com/resume-builder/customer-service',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Customer Service Resume Builder — Hirecta' }],
    },
    twitter: { card: 'summary_large_image', title: 'Customer Service Resume Builder 2026 | Hirecta', description: 'Build a customer service resume with CSAT and resolution metrics. Free PDF.', images: ['/og-image.png'], creator: '@hirecta' },
};

const schema = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Hirecta Customer Service Resume Builder",
    "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "5380", "bestRating": "5" },
};

export default function CustomerServiceResumePage() {
    const faqs = [
        { question: "What metrics should a customer service resume include?", answer: "CSAT score (customer satisfaction %), NPS (Net Promoter Score), First Contact Resolution (FCR) rate, Average Handle Time (AHT), ticket/call volume handled per day, customer retention rate, response time SLA adherence, and any upsell/retention revenue generated." },
        { question: "What software skills do customer service jobs require?", answer: "CRM: Salesforce Service Cloud, Zendesk, Freshdesk, HubSpot Service Hub, ServiceNow. Communication: Intercom, Gorgias, Kustomer. Phone: Five9, Genesys, NICE inContact. Also: Microsoft Office, Slack, Confluence, and any industry-specific tools." },
        { question: "How do I write customer service bullets with no specific metrics?", answer: "If your employer didn't track metrics, estimate: 'Handled 60+ inbound tickets daily across phone, email, and chat channels', 'Maintained consistently positive customer feedback during 2-year tenure', 'Resolved complex billing disputes for 15–20 accounts weekly with 95%+ first-call resolution estimated from supervisor ratings.'" },
        { question: "Is a customer service resume the same as a call center resume?", answer: "Similar but not identical. Call center resumes emphasize phone volume, AHT, and script adherence. Customer service resumes can be broader — including email, chat, in-person, and omnichannel support. Tailor your resume to the specific channel mix of the target role." },
        { question: "How do I move from customer service to customer success?", answer: "Customer Success (CSM) is the B2B SaaS evolution of customer service. To bridge: highlight account management experience, renewal/retention metrics, product adoption work, onboarding projects, and any revenue-generating activities (upsells, expansions). Enterprise accounts and technical product knowledge are big differentiators." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Customer Service Resume", url: `${ENV.BASE_URL}/resume-builder/customer-service` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema title="Customer Service Resume Builder 2026 — Free CX & Support Templates" description="Build a professional customer service resume with CSAT, resolution, and CRM metrics." url={`${ENV.BASE_URL}/resume-builder/customer-service`} datePublished="2026-02-23" author="Hirecta Career Experts" />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Customer Service & Support Careers"
                badgeIcon={Headphones}
                title={<>Customer Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Resume Builder</span></>}
                subtitle="Turn customer satisfaction into career success. Free ATS-optimized templates for customer service reps, support specialists, call center agents, and CX managers. Highlight CSAT scores, resolution rates, and CRM expertise. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Customer Service Professionals"
                features={[
                    { icon: <MessageSquare className="w-6 h-6" />, title: "CSAT & NPS Metrics", description: "Templates designed to showcase satisfaction scores, resolution rates, and handle time — the metrics every CX manager prioritizes." },
                    { icon: <Headphones className="w-6 h-6" />, title: "CRM Software Section", description: "Highlight Zendesk, Salesforce Service Cloud, Freshdesk, and Intercom proficiency that's required for 80% of support roles." },
                    { icon: <Target className="w-6 h-6" />, title: "Multi-Channel Experience", description: "Structure templates for phone, email, chat, social media, and in-person support experience." },
                    { icon: <Users className="w-6 h-6" />, title: "Volume & SLA Tracking", description: "Show daily ticket/call volumes and SLA adherence rates that signal readiness for high-velocity support environments." },
                    { icon: <Award className="w-6 h-6" />, title: "Promotions & Recognition", description: "Feature promotions, Agent of the Month awards, peer recognition, and quality assurance scores." },
                    { icon: <Star className="w-6 h-6" />, title: "Path to Customer Success", description: "Templates that bridge customer service to CSM roles — highlight account management, retention, and revenue impact." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Customer Service Resume"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Service Resume Key Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Performance Metrics to Include", items: ["CSAT score (%)", "NPS contribution", "First Contact Resolution (FCR) rate", "Average Handle Time (AHT)", "Daily ticket/call volume", "SLA adherence rate"] },
                                    { title: "CRM & Support Tools", items: ["Zendesk, Freshdesk, Kustomer", "Salesforce Service Cloud", "Intercom, Gorgias, HubSpot", "Five9, Genesys (call center)", "Slack, Confluence, Jira Service Mgmt", "Microsoft Teams, Zoom"] },
                                    { title: "Strong Action Verbs", items: ["Resolved, De-escalated, Retained", "Streamlined, Implemented, Trained", "Managed, Coordinated, Escalated", "Improved, Reduced, Increased", "Onboarded, Supported, Facilitated", "Collaborated, Communicated"] },
                                    { title: "Transferable Skills to Highlight", items: ["Conflict resolution and de-escalation", "Active listening and empathy", "Product knowledge depth", "Cross-functional collaboration", "Time management under pressure", "Written and verbal communication"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-teal-600" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Customer Service Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Always include your CSAT or NPS score if tracked — "4.8/5 average CSAT" is the #1 differentiator</li>
                                <li>• Specify channels: "omnichannel support (phone, email, live chat, social)" signals modern CX readiness</li>
                                <li>• Name the CRM — "Zendesk (5 years)" vs. "CRM software" makes a huge difference in ATS</li>
                                <li>• Include daily/weekly volume: "60+ inbound tickets daily" shows employers you can handle scale</li>
                                <li>• For CSM transitions: highlight any renewal, upsell, or account expansion experience prominently</li>
                            </ul>
                        </div>

                        <div className="bg-teal-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Service ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["CSAT", "NPS", "First Contact Resolution", "Average Handle Time", "SLA", "Zendesk", "Salesforce Service Cloud", "Freshdesk", "Intercom", "HubSpot", "Kustomer", "Five9", "Genesys", "Customer Retention", "Conflict Resolution", "De-escalation", "Onboarding", "Churn Prevention", "Upselling", "Cross-selling", "Knowledge Base", "Ticket Management", "Omnichannel", "Live Chat", "Phone Support", "Email Support", "Customer Satisfaction", "Service Recovery", "Call Center", "Help Desk", "Customer Success", "Account Management"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Customer Service Resume FAQs</h2>
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

            <div className="bg-teal-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/sales" className="text-blue-600 hover:underline font-semibold">Sales Resume</Link>
                        <Link href="/resume-builder/hr-manager" className="text-blue-600 hover:underline font-semibold">HR Manager Resume</Link>
                        <Link href="/resume-builder/entry-level" className="text-blue-600 hover:underline font-semibold">Entry-Level Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA title="Build Your Customer Service Resume Now — Free" subtitle="Join thousands of CX and support professionals who've landed great roles with Hirecta. ATS-optimized, instant PDF." />
        </div>
    );
}
