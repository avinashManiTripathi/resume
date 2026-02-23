import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Palette, CheckCircle, Zap, Award, Target, Star, Layers, Monitor } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    metadataBase: new URL('https://hirecta.com'),
    title: 'Graphic Designer Resume Builder 2026 — Free Creative Resume Templates | Hirecta',
    description: 'Build a standout graphic designer resume in 2026. Free ATS-optimized templates for graphic designers, visual designers, and creative professionals. Showcase your portfolio, tools, and visual impact. Free PDF download.',
    keywords: 'graphic designer resume builder, graphic designer resume template, creative resume, visual designer resume, designer CV, Adobe Creative Suite resume, UX designer resume, portfolio resume 2026',
    alternates: { canonical: 'https://hirecta.com/resume-builder/graphic-designer' },
    openGraph: {
        title: 'Graphic Designer Resume Builder 2026 — Free Creative Templates | Hirecta',
        description: 'Free graphic designer resume builder. ATS-friendly templates for creative roles with portfolio, tools, and visual impact focus.',
        url: 'https://hirecta.com/resume-builder/graphic-designer',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Graphic Designer Resume Builder — Hirecta' }],
    },
    twitter: { card: 'summary_large_image', title: 'Graphic Designer Resume Builder 2026 | Hirecta', description: 'Build a graphic designer resume that gets interviews. ATS-optimized, free PDF.', images: ['/og-image.png'], creator: '@hirecta' },
};

const schema = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Hirecta Graphic Designer Resume Builder",
    "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2890", "bestRating": "5" },
};

export default function GraphicDesignerResumePage() {
    const faqs = [
        { question: "Should a graphic designer's resume be creative or traditional?", answer: "Both — but they serve different purposes. Your portfolio showcases creativity. Your resume must be ATS-readable for digital applications (clean, structured, parseable). Use a visually clean resume with subtle design touches — not a heavily graphic-designed PDF that will fail ATS parsing at 75% of studios and agencies." },
        { question: "Do graphic designers need a portfolio link on their resume?", answer: "Absolutely — it's non-negotiable. Include your portfolio URL (Behance, Dribbble, personal site) in your header, right next to your name. No portfolio link = immediate disqualification at most creative agencies, in-house teams, and studios." },
        { question: "What software should graphic designers list?", answer: "Adobe CC is table stakes — be specific: Photoshop, Illustrator, InDesign, XD, After Effects, Premiere, Audition. Also list Figma (critical in 2026), Sketch, Canva Pro, and any print production or web tools (HTML/CSS basics, WordPress)." },
        { question: "How do graphic designers quantify their resume?", answer: "Examples: 'Designed visual identity for 40+ clients over 3 years', 'Brand refresh increased client website traffic 68% post-launch', 'Led production of 200-page annual report for Fortune 100 company within 3-week timeline', 'Designed ad creative achieving 4.2% CTR vs. 1.8% industry benchmark'." },
        { question: "Should I include a photo on my designer resume?", answer: "In the US: no photo. Your portfolio visuals represent your aesthetic — let them speak. Including a photo risks unconscious bias issues. Instead, let your portfolio URL and the clean design of your resume demonstrate your eye." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Graphic Designer Resume", url: `${ENV.BASE_URL}/resume-builder/graphic-designer` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema title="Graphic Designer Resume Builder 2026 — Free Creative Templates" description="Build a standout graphic designer resume. ATS-friendly with portfolio, tools, and visual impact focus." url={`${ENV.BASE_URL}/resume-builder/graphic-designer`} datePublished="2026-02-23" author="Hirecta Career Experts" />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <ResourceHero
                badge="Creative & Design Careers"
                badgeIcon={Palette}
                title={<>Graphic Designer <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Resume Builder</span></>}
                subtitle="Your portfolio shows your work — your resume gets you the interview. Free ATS-optimized templates for graphic designers, visual designers, and creative professionals. Showcase portfolio, design tools, and measurable visual impact. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Creative Professionals"
                features={[
                    { icon: <Palette className="w-6 h-6" />, title: "Portfolio Link Prominence", description: "Templates that feature your Behance, Dribbble, or portfolio URL at the very top — where every hiring manager looks first." },
                    { icon: <Layers className="w-6 h-6" />, title: "Adobe CC & Tools Section", description: "Structured design tools section: Adobe CC suite, Figma, Sketch, Canva, and web tools displayed clearly for ATS." },
                    { icon: <Monitor className="w-6 h-6" />, title: "ATS-Safe Creative Format", description: "Clean, structured layout that passes ATS at studios, agencies, and in-house creative teams — your portfolio handles the visual wow." },
                    { icon: <Target className="w-6 h-6" />, title: "Measurable Impact Bullets", description: "AI-powered suggestions to quantify design work: CTR improvements, brand engagement, production timelines, and project scale." },
                    { icon: <Award className="w-6 h-6" />, title: "Awards & Published Work", description: "Dedicated section for design awards (AIGA, Cannes Lions, Webby), press features, and published campaigns." },
                    { icon: <Star className="w-6 h-6" />, title: "All Design Specializations", description: "Templates optimized for brand identity, editorial, packaging, motion, digital/web, and UI/UX design roles." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Graphic Designer Resume That Gets Creative Director Attention"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Graphic Designer Resume Essentials</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Header Must-Haves", items: ["Portfolio URL (Behance/Dribbble/personal site)", "LinkedIn profile URL", "Location (city/state or remote)", "Phone and professional email"] },
                                    { title: "Design Software (ATS Keywords)", items: ["Adobe: Photoshop, Illustrator, InDesign, XD", "Motion: After Effects, Premiere Pro", "UI/Collab: Figma, Sketch, InVision", "Productivity: Google Workspace, Asana, Trello"] },
                                    { title: "Experience Bullets", items: ["Projects delivered (count, scale)", "Client industry or brand name (if public)", "Timeline/deadline performance", "Measurable business impact (CTR, conversions, reach)"] },
                                    { title: "Specializations to Call Out", items: ["Brand identity and visual systems", "Print production (CMYK, bleeds, press-ready)", "Digital: web graphics, social, display ads", "Motion graphics and video editing"] },
                                ].map((section, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-purple-600" /> {section.title}
                                        </h4>
                                        <ul className="space-y-1.5 ml-7">
                                            {section.items.map((item, j) => <li key={j} className="text-gray-700 text-sm">• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Designer Resume Pro Tips</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Portfolio URL in the header is non-negotiable — no link = automatic rejection</li>
                                <li>• Save your resume as PDF named "FirstName-LastName-Designer-Resume.pdf" — makes you immediately searchable</li>
                                <li>• Mention specific brand names you've designed for (if NDA allows) — "Designed visual identity for Nike retail activation" is powerful</li>
                                <li>• List Figma explicitly — it's now the #1 tool filter for digital design roles in 2026</li>
                                <li>• For print roles: mention CMYK, prepress, vendor management, and production timelines</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Graphic Designer ATS Keywords (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe After Effects", "Adobe Premiere", "Adobe XD", "Figma", "Sketch", "InVision", "Canva", "Procreate", "Brand Identity", "Visual Design", "Typography", "Color Theory", "Grid Systems", "UI Design", "UX Design", "Motion Graphics", "Video Editing", "Print Production", "Prepress", "CMYK", "RGB", "Social Media Graphics", "Digital Advertising", "Campaign Design", "Presentation Design", "Packaging Design", "Web Design", "Responsive Design", "Art Direction"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Graphic Designer Resume FAQs</h2>
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

            <div className="bg-purple-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/resume-builder/software-engineer" className="text-blue-600 hover:underline font-semibold">Software Engineer Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA title="Build Your Designer Resume Now — Free" subtitle="Join thousands of designers who've landed creative roles with Hirecta. ATS-friendly, portfolio-first format, instant PDF." />
        </div>
    );
}
