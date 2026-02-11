import { Metadata } from 'next';
import { DollarSign, Clock, Users, Zap, CheckCircle, X, ArrowRight, FileText, Edit, Award, TrendingUp } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import Link from 'next/link';
import { ENV } from "@/app/env";
import { GlobalSchema } from '@/components/SchemaMarkup';

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
        {
            question: "Is it really cheaper to use a resume builder over a professional service?",
            answer: "Mathematically, yes. A professional service costs between $200 and $800 for a single version. In contrast, Hirecta is free to use, and even our most advanced AI features cost less than a single business lunch. Over a 5-year career span, switching from human services to an AI builder can save you over $2,000 in update fees and new versions."
        },
        {
            question: "How do I know if I'm 'Executive enough' to need a $600 service?",
            answer: "Generally, if you are applying for C-Suite roles (CEO, CTO, CFO) in Fortune 500 companies where human networking is 90% of the game, a high-end service might offer niche positioning. However, for 99% of roles—including Senior Management and Principal Engineering—Hirecta's AI is more than capable of generating the 'Strategic Achievement' blocks that recruiters look for."
        },
        {
            question: "Why do professional services take so long (5-10 days)?",
            answer: "Human writers are limited by their own schedules and the need for back-and-forth communication. Resume builders use instant processing. What takes a human writer 10 hours of research can be performed by Hirecta's AI in 30 seconds by scanning job descriptions and your work history simultaneously."
        },
        {
            question: "Do resume builders work for career gaps or long-term unemployment?",
            answer: "Yes. Our AI recognizes patterns in your work history. If you have a gap, the builder suggests 'Skills-Focused' sections that highlight your expertise and freelance/consulting projects rather than just a chronological list of dates. This is a strategy often used by professional writers that we've automated."
        },
        {
            question: "Can I get a refund if I don't get an interview with a builder?",
            answer: "Most professional services 'guarantee' interviews but often just offer a rewrite if you fail. Hirecta focus on empowerment—we provide the tools for you to iterate. Because we are free-to-use, there is no financial risk to you in trying our platform first before committing hundreds of dollars to a writer."
        },
        {
            question: "Are 'Certified Professional Resume Writers' (CPRW) better than AI?",
            answer: "CPRWs follow specific industry standards. We have integrated those exact standards—including the F-pattern layout and 'XYZ' achievement formula—directly into Hirecta's codebase. You are essentially getting the collective wisdom of thousands of certified writers through our AI suggestions."
        }
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
            <GlobalSchema />
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

            {/* Massive Long-Form Content Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-l-8 border-purple-500 pl-6">The Hidden Economics of Professional Resume Writing</h2>
                        <p>
                            When you pay $500 for a <strong>Professional Resume Service</strong>, what are you actually buying? You are paying for a writer's time, their agency's overhead, and their marketing costs. While human writers bring empathy to the table, the <strong>hiring process</strong> they are writing for has become primarily digital and algorithmic.
                        </p>

                        <div className="my-12 p-8 bg-purple-50 rounded-3xl border border-purple-100 italic">
                            "The dirty secret of the resume writing industry is that most 'expert' writers use the same ATS templates and AI-assistant tools that you can now access directly through Hirecta."
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Is the $500 Price Tag Justified? An Insider's Look</h3>
                        <p>
                            Resume services are a high-touch, low-volume business. A single writer can only produce 4-5 high-quality resumes a week. This scarcity drives the price up. However, the <strong>Technical Quality</strong> of a resume—its ability to pass a Workday or Greenhouse filter—is fixed. A $800 resume uses the same standard fonts (Arial, Calibri, Roboto) and the same reverse-chronological layout that our free builder provides.
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why AI Builders are Disrupting the Resume Industry</h3>
                        <p>
                            In 2026, the gap between a human writer and an AI builder has effectively closed. Hirecta's AI has been trained on over <strong>10 million successful job applications</strong>. It knows which keywords lead to callbacks and which 'filler words' (like "passionate", "motivated", or "hardworking") lead to immediate rejection by ATS algorithms.
                        </p>
                        <p>
                            The disruption isn't just about price; it's about <strong>Iteration Speed</strong>. In a modern job search, you need a different resume for every role. Paying a service $100 for every 'tweak' or 'tailoring' session is economically impossible for most people. An AI builder allows you to tailor your resume for 50 different jobs in the time it takes a human service to send you a first draft.
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-8 underline decoration-purple-300 decoration-4 underline-offset-4">The Hybrid Approach: Getting Service-Level Quality for Free</h3>
                        <p>
                            Smart job seekers are moving toward a 'Hybrid' model. You use an <strong>AI Resume Builder</strong> to handle the heavy lifting of keyword optimization and achievement formatting, and then you spend 30 minutes 'humanizing' the edges.
                        </p>
                        <ul className="space-y-6 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">The 80/20 Rule</h4>
                                    <p>Let Hirecta's AI generate 80% of your content—the technical skills, the professional summary, and the achievement bullet points based on your raw data.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Tactical Human Review</h4>
                                    <p>Spend your time on the 20% that requires deep context—the specific names of high-profile projects or cultural nuances of your target company.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Real-time Validation</h4>
                                    <p>Use our <Link href="/ats-checker" className="text-purple-600 hover:underline">Free ATS Checker</Link> to prove that your 'humanized' version is still technically perfect.</p>
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Final Verdict: When to Pay and When to Build</h3>
                        <p>
                            If you are a high-level executive (VP or above) with a $200k+ salary and very little time, hiring a specialized executive writer as a 'concierge' service makes sense. For everyone else—from fresh graduates to middle managers and senior engineers—the <strong>Best Resume Builder of 2026</strong> is not a person, but an intelligent platform.
                        </p>
                        <p>
                            Ready to start building a million-dollar resume for free? Choose one of our <Link href="/templates" className="text-purple-600 hover:underline font-semibold">ATS-Optimized Templates</Link> and see for yourself why 50,000+ people have stopped paying for expensive services.
                        </p>
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
