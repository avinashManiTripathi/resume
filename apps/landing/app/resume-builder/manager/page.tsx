import { Metadata } from 'next';
import { Users, Target, TrendingUp, Award, Shield, CheckCircle, Zap, BarChart, Briefcase, Crown } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Manager Resume Builder 2026 - Leadership Resume Templates | Executive Level',
    description: 'Build a powerful manager resume for team lead, director, and executive roles. Showcase leadership achievements, team management, and strategic impact with ATS-friendly executive templates.',
    keywords: 'manager resume, executive resume, leadership resume, director resume, team lead resume, senior manager resume, management resume builder',
    alternates: {
        canonical: 'https://profresume.com/resume-builder/manager',
    },
};

export default function ManagerResumePage() {
    const faqs = [
        { question: "How do I showcase management experience on my resume?", answer: "Focus on team size, budget responsibility, strategic initiatives, and measurable business impact. Use metrics like '% revenue growth', 'team size managed', 'projects delivered', and 'cost savings achieved'." },
        { question: "What's the difference between manager and individual contributor resumes?", answer: "Manager resumes emphasize leadership, team building, strategy, and business outcomes rather than individual technical tasks. Highlight how you achieved results through your team." },
        { question: "Should I include team management metrics?", answer: "Absolutely! Include team size, retention rate, performance improvements, promotion rates, and team satisfaction scores. These demonstrate your leadership effectiveness." },
        { question: "How long should a manager resume be?", answer: "2 pages for experienced managers (10+ years), focusing on recent 10-15 years. Senior executives may go to 3 pages if truly necessary, but aim for concise, high-impact content." },
        { question: "What are the most important skills for manager resumes?", answer: "Leadership, strategic planning, team development, budget management, stakeholder communication, change management, and business acumen. Back each with specific achievements." }
    ];

    const breadcrumbs = [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resume Builder", url: "https://profresume.com/resume-builder" },
        { name: "Manager", url: "https://profresume.com/resume-builder/manager" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Manager Resume Builder 2026 - Executive Leadership Resumes"
                description="Build a powerful manager resume that showcases leadership, strategic impact, and team achievements. Perfect for directors, VPs, and senior management roles."
                url="https://profresume.com/resume-builder/manager"
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="Leadership"
                badgeIcon={Crown}
                title={
                    <>
                        Manager & Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Resume Builder</span>
                    </>
                }
                subtitle="Create a leadership resume that demonstrates strategic thinking, team management, and business impact. Perfect for managers, directors, VPs, and C-level executives seeking their next big opportunity."
            />

            <ResourceFeatureGrid
                title="Built for Leaders"
                features={[
                    {
                        icon: <Users className="w-6 h-6" />,
                        title: "Leadership Achievements",
                        description: "Showcase team building, talent development, and organizational transformation."
                    },
                    {
                        icon: <BarChart className="w-6 h-6" />,
                        title: "Business Impact Metrics",
                        description: "Highlight revenue growth, cost savings, efficiency gains, and strategic wins."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Strategic Initiatives",
                        description: "Feature cross-functional projects, change management, and vision execution."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Executive Presence",
                        description: "Professional templates that convey authority, competence, and strategic thinking."
                    },
                    {
                        icon: <Briefcase className="w-6 h-6" />,
                        title: "Stakeholder Management",
                        description: "Demonstrate C-suite communication, client relations, and board presentations."
                    },
                    {
                        icon: <Award className="w-6 h-6" />,
                        title: "Career Progression",
                        description: "Show clear advancement from individual contributor to leadership roles."
                    }
                ]}
            />

            <ResourceContentSection
                title="What Makes a Great Manager Resume?"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Critical Resume Sections for Managers</h3>
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        Executive Summary
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• 3-4 sentences highlighting leadership experience</li>
                                        <li>• Key achievements with quantifiable metrics</li>
                                        <li>• Management philosophy and leadership style</li>
                                        <li>• Areas of expertise and industry focus</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        Leadership Experience
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Team size, budget, and scope of responsibility</li>
                                        <li>• Strategic initiatives and transformational projects</li>
                                        <li>• Business outcomes (revenue, growth, efficiency)</li>
                                        <li>• People development and team achievements</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        Core Competencies
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3 text-gray-700 ml-7">
                                        <ul className="space-y-1">
                                            <li>• Strategic Planning</li>
                                            <li>• Team Leadership</li>
                                            <li>• Budget Management</li>
                                            <li>• Change Management</li>
                                        </ul>
                                        <ul className="space-y-1">
                                            <li>• Stakeholder Relations</li>
                                            <li>• Performance Management</li>
                                            <li>• Business Development</li>
                                            <li>• Process Optimization</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        Key Metrics for Managers
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Team size managed (# of direct/indirect reports)</li>
                                        <li>• Budget responsibility ($X million P&L)</li>
                                        <li>• Revenue generated or grown (% or $)</li>
                                        <li>• Cost savings achieved</li>
                                        <li>• Team retention rate</li>
                                        <li>• Projects delivered on-time/budget</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Power Words for Leadership Resumes
                            </h4>
                            <div className="grid md:grid-cols-4 gap-4 text-gray-800">
                                <ul className="space-y-1">
                                    <li>• Directed</li>
                                    <li>• Spearheaded</li>
                                    <li>• Orchestrated</li>
                                    <li>• Championed</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li>• Transformed</li>
                                    <li>• Restructured</li>
                                    <li>• Pioneered</li>
                                    <li>• Mentored</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li>• Strategized</li>
                                    <li>• Accelerated</li>
                                    <li>• Cultivated</li>
                                    <li>• Delivered</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li>• Drove</li>
                                    <li>• Maximized</li>
                                    <li>• Influenced</li>
                                    <li>• Built</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Sample Achievement Bullets for Managers
                    </h2>
                    <div className="space-y-4">
                        {[
                            "Led cross-functional team of 45+ members across engineering, product, and design to deliver $15M revenue-generating platform, achieving 98% on-time delivery rate",
                            "Transformed underperforming sales division into top-performing region, growing revenue 180% ($8M to $22M) in 2 years while reducing team attrition by 40%",
                            "Spearheaded company-wide digital transformation initiative affecting 500+ employees, resulting in 35% operational efficiency gains and $2M annual cost savings",
                            "Built and scaled customer success organization from 3 to 25 members, improving customer retention from 78% to 94% and NPS from 32 to 68",
                            "Directed $50M P&L for business unit, achieving 25% YoY revenue growth while reducing operating costs by 15% through strategic resource optimization",
                            "Mentored and developed 12 direct reports with 100% promotion rate to senior roles within 18 months, while maintaining 95% team retention"
                        ].map((bullet, index) => (
                            <div key={index} className="bg-white rounded-lg border-2 border-purple-200 p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">{bullet}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ResourceCTA
                title="Build Your Executive Resume"
                description="Join 8,000+ managers and executives who advanced their leadership careers"
                ctaText="Create Manager Resume"
                ctaLink="/editor"
            />
        </div>
    );
}
