import { Metadata } from 'next';
import { DollarSign, Clock, Users, Zap, CheckCircle, X, ArrowRight, FileText, Edit, Award, TrendingUp } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import Link from 'next/link';
import { ENV } from "@/app/env";

export const metadata: Metadata = {
    title: 'Professional Resume Service vs Resume Builder - Which is Right for You?',
    description: 'Compare professional resume writing services ($200-$800) vs resume builders (free-$30/mo). See which option gets you hired faster. Expert analysis and cost breakdown included.',
    keywords: 'professional resume service, resume writing service, resume builder vs service, professional resume writer, resume service cost',
    alternates: {
        canonical: '/professional-resume-service',
    },
    openGraph: {
        title: 'Professional Resume Service vs Resume Builder',
        description: 'Compare professional resume writing services with resume builders. Expert analysis and cost breakdown included.',
        url: '/professional-resume-service',
        type: 'article',
    },
};

export default function ProfessionalResumeServicePage() {
    const faqs = [
        { question: "How much does a professional resume service cost?", answer: "Professional resume writing services typically cost $200-$800 depending on experience level. Entry-level resumes: $200-$400. Mid-career: $400-$600. Executive resumes: $600-$800+. In contrast, resume builders cost $0-$30/month." },
        { question: "Are professional resume services worth it?", answer: "It depends on your budget and needs. Resume builders offer 90% of the value at 5% of the cost. Services make sense if you have a complex career history, executive-level position, or major career gap requiring professional explanation." },
        { question: "How long does a professional resume service take?", answer: "Professional services take 5-10 business days for delivery. Resume builders let you create and download immediately, making them ideal for urgent job applications." },
        { question: "Can a resume builder match professional quality?", answer: "Yes, modern AI-powered resume builders like Hirecta offer professional-quality content suggestions, ATS optimization, and templates used by thousands of successful job seekers. The key difference is you write it vs. someone writes it for you." },
        { question: "What do professional resume writers do that builders don't?", answer: "Professional writers provide personalized consultations, strategic career positioning, and custom writing for unique situations. Builders provide templates, AI suggestions, and optimization tools for self-directed creation." },
        { question: "Should I hire a resume writer or use a builder?", answer: "Use a builder if: you're on a budget, need resume quickly, have straightforward experience, or want to iterate yourself. Hire a writer if: $500+ budget, executive-level role, career gaps/changes requiring strategic positioning, or you prefer hands-off approach." }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Professional Resume Service", url: `${ENV.BASE_URL}/professional-resume-service` }
    ];

    const comparisonData = [
        { feature: "Cost", service: "$200-$800 one-time", builder: "Free - $30/month", winner: "builder" },
        { feature: "Turnaround Time", service: "5-10 business days", builder: "Instant (same day)", winner: "builder" },
        { feature: "Revisions", service: "1-2 included, then extra fee", builder: "Unlimited", winner: "builder" },
        { feature: "Personalization", service: "1-on-1 consultation", builder: "Self-directed with AI", winner: "service" },
        { feature: "ATS Optimization", service: "Manual expert review", builder: "Automated + templates", winner: "tie" },
        { feature: "Ongoing Updates", service: "Pay again for updates", builder: "Update anytime free", winner: "builder" },
        { feature: "Career Gaps", service: "Strategic positioning", builder: "DIY with guidance", winner: "service" },
        { feature: "Executive Level", service: "Specialized expertise", builder: "Executive templates", winner: "service" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={faqs} />
            <ArticleSchema
                title="Professional Resume Service vs Resume Builder"
                description="Compare professional resume writing services with resume builders. Expert analysis helps you choose the right option for your career."
                url={`${ENV.BASE_URL}/professional-resume-service`}
                datePublished="2026-01-01"
                dateModified="2026-01-08"
            />

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 text-purple-800 rounded-full text-sm font-semibold mb-6">
                            <Award className="w-4 h-4" />
                            Honest Comparison • Expert Analysis
                        </div>

                        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Professional Resume Service vs Resume Builder
                        </h1>
                        <p className="text-2xl text-gray-600 mb-4">
                            Which Option Gets You Hired Faster?
                        </p>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                            Comparing professional resume writing services ($200-$800) with AI-powered resume builders (free-$30/mo). See cost breakdown, quality comparison, and which is right for your situation.
                        </p>
                    </div>

                    {/* Quick Verdict */}
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Our Recommendation</h2>
                        <p className="text-lg mb-4 opacity-90">
                            For 90% of job seekers, a modern resume builder like Hirecta offers the best value: professional quality at a fraction of the cost, instant delivery, and unlimited revisions.
                        </p>
                        <p className="text-base mb-6 opacity-80">
                            Resume services make sense for: executives ($150K+ roles), major career changers, or those with $500+ budgets who prefer hands-off approach.
                        </p>
                        <Link
                            href="/free-resume-builder"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                        >
                            Try Free Resume Builder <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Detailed Comparison */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Head-to-Head Comparison
                    </h2>

                    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border-2 border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-purple-100 to-blue-100 border-b-2 border-gray-300">
                                    <th className="text-left py-4 px-6 font-bold text-gray-900">Feature</th>
                                    <th className="text-center py-4 px-6 font-bold text-purple-700">Professional Service</th>
                                    <th className="text-center py-4 px-6 font-bold text-blue-700">Resume Builder</th>
                                    <th className="text-center py-4 px-6 font-bold text-gray-700">Winner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, index) => (
                                    <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="py-4 px-6 font-semibold text-gray-900">{row.feature}</td>
                                        <td className="text-center py-4 px-6 text-gray-700">{row.service}</td>
                                        <td className="text-center py-4 px-6 text-gray-700">{row.builder}</td>
                                        <td className="text-center py-4 px-6">
                                            {row.winner === 'builder' && <span className="text-blue-600 font-bold">Builder</span>}
                                            {row.winner === 'service' && <span className="text-purple-600 font-bold">Service</span>}
                                            {row.winner === 'tie' && <span className="text-gray-600 font-bold">Tie</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-purple-600" />
                                Professional Resume Service
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="font-bold text-green-700 mb-2">✅ Pros:</div>
                                    <ul className="space-y-1 ml-4 text-gray-700">
                                        <li>• 1-on-1 expert consultation</li>
                                        <li>• Strategic career positioning</li>
                                        <li>• Professional writer expertise</li>
                                        <li>• Hands-off approach</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-bold text-red-700 mb-2">❌ Cons:</div>
                                    <ul className="space-y-1 ml-4 text-gray-700">
                                        <li>• $200-$800 cost</li>
                                        <li>• 5-10 day turnaround</li>
                                        <li>• Limited revisions</li>
                                        <li>• Pay again for updates</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-purple-100 rounded-lg p-4">
                                <div className="font-bold text-gray-900 mb-2">Average Cost Breakdown:</div>
                                <ul className="space-y-1 text-gray-700">
                                    <li>Entry-level: $200-$400</li>
                                    <li>Mid-career: $400-$600</li>
                                    <li>Executive: $600-$800+</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-blue-600" />
                                Resume Builder
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="font-bold text-green-700 mb-2">✅ Pros:</div>
                                    <ul className="space-y-1 ml-4 text-gray-700">
                                        <li>• Free to $30/month</li>
                                        <li>• Instant results (same day)</li>
                                        <li>• Unlimited revisions</li>
                                        <li>• AI-powered suggestions</li>
                                        <li>• Update anytime free</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-bold text-red-700 mb-2">❌ Cons:</div>
                                    <ul className="space-y-1 ml-4 text-gray-700">
                                        <li>• DIY approach (you write it)</li>
                                        <li>• No personal consultation</li>
                                        <li>• Requires your time investment</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-4">
                                <div className="font-bold text-gray-900 mb-2">Typical Costs:</div>
                                <ul className="space-y-1 text-gray-700">
                                    <li>Free tier: $0 (full access)</li>
                                    <li>Premium: $9-$30/month</li>
                                    <li>Annual: $60-$200/year</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* When to Choose What */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Which Should You Choose?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose a Resume Builder If:</h3>
                            <ul className="space-y-3">
                                {[
                                    "You're on a budget (<$200 to spend)",
                                    "You need your resume quickly (today/this week)",
                                    "You have straightforward work history",
                                    "You're comfortable writing about yourself",
                                    "You want to iterate and update frequently",
                                    "You're entry to mid-level professional",
                                    "You want AI-powered optimization",
                                    "You need multiple resume versions"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/free-resume-builder"
                                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                            >
                                Try Free Builder <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-200">
                            <div className="w-16 h-16 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Professional Service If:</h3>
                            <ul className="space-y-3">
                                {[
                                    "You have $500+ budget for resume",
                                    "You're targeting executive roles ($150K+)",
                                    "You have complex career gaps to explain",
                                    "You're making major career change",
                                    "You prefer completely hands-off approach",
                                    "You have unique/complicated background",
                                    "You want 1-on-1 strategy consultation",
                                    "English is not your first language"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 bg-purple-50 rounded-lg p-4">
                                <p className="text-sm text-gray-700">
                                    <strong>Popular services:</strong> TopResume, ZipJob, ResumeSpice, Find My Profession
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cost Savings Calculator */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                        Cost Comparison Over Time
                    </h2>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-sm text-gray-600 mb-2">One-Time Resume</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">Service: $400</div>
                                <div className="text-3xl font-bold text-blue-600">Builder: $0</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-600 mb-2">3 Updates (1 Year)</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">Service: $800+</div>
                                <div className="text-3xl font-bold text-blue-600">Builder: $0-$108</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-600 mb-2">5 Years of Updates</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">Service: $2,000+</div>
                                <div className="text-3xl font-bold text-blue-600">Builder: $0-$540</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">
                                💰 Potential Savings: $1,500-$1,900 over 5 years
                            </div>
                            <p className="text-gray-700">
                                Using a resume builder instead of professional service for career-long resume needs
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Get Professional Results, Save $700+
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Our AI-powered resume builder offers 90% of professional service quality at 5% of the cost. Try it free today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/free-resume-builder"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
                        >
                            Start Free Resume Builder <ArrowRight className="w-6 h-6" />
                        </Link>
                        <Link
                            href="/best-resume-builder"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition-all"
                        >
                            Compare Top Builders
                        </Link>
                    </div>
                    <p className="mt-6 text-sm opacity-80">
                        100% free • No credit card required • Instant access
                    </p>
                </div>
            </section>
        </div>
    );
}
