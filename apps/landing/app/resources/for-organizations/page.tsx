import { Metadata } from 'next';
import { Users, Building2, Shield, Zap, Globe, BarChart3, Clock, CheckCircle, ArrowRight, Mail, Rocket, Award, TrendingUp, Target, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';
import { ENV } from "@/app/env";
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Resume Solutions for Organizations 2026 - Enterprise Resume Tools for Teams & Universities',
    description: 'Enterprise resume builder solutions for HR teams, universities, and career services. Bulk licensing, white-label options, and analytics dashboard. Empower 100s-1000s of users with professional resume tools.',
    keywords: 'resume tools for organizations, b2b resume builder, employee outplacement tools, university career services software, enterprise resume solution, bulk resume licensing, white-label resume builder',
    alternates: {
        canonical: '/resources/for-organizations',
    },
    openGraph: {
        title: 'Resume Solutions for Organizations - Enterprise Resume Tools',
        description: 'Enterprise resume builder solutions for HR teams, universities, and career services.',
        url: '/resources/for-organizations',
        type: 'website',
    },
};

export default function ForOrganizationsPage() {
    const faqs = [
        { question: "What types of organizations do you serve?", answer: "We serve universities, career centers, HR departments, outplacement firms, corporate training programs, and workforce development agencies." },
        { question: "Do you offer volume discounts?", answer: "Yes, we provide tiered pricing based on user count with significant discounts for educational institutions and non-profits." },
        { question: "Can we white-label the platform?", answer: "Yes, enterprise plans include white-labeling options with custom branding, logos, and domain configuration." },
        { question: "What kind of support is included?", answer: "Dedicated account manager, priority technical support, onboarding training sessions, and ongoing implementation assistance." },
        { question: "Is there a trial period for organizations?", answer: "Yes, we offer 30-day trials for qualified organizations to test all features and evaluate integration capabilities." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: ENV.BASE_URL },
                    { name: "Resources", url: `${ENV.BASE_URL}/resources` },
                    { name: "For Organizations", url: `${ENV.BASE_URL}/resources/for-organizations` }
                ]}
            />
            <ArticleSchema
                title="Resume Tools for Organizations - Enterprise Solutions"
                description="Professional resume tools for universities, career centers, and HR departments. Bulk licensing, white-label options, and dedicated support."
                url={`${ENV.BASE_URL}/resources/for-organizations`}
            />
            <FAQSchema faqs={faqs} />
            <ResourceHero
                badge="Enterprise Solutions"
                badgeIcon={Building2}
                title={
                    <>
                        Advanced Resume Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">for Organizations</span>
                    </>
                }
                subtitle="Empower your employees, students, or members with professional resume building tools. Scalable solutions for universities, HR departments, outplacement firms, and professional associations."
            />

            <ResourceFeatureGrid
                title="Enterprise Features & Benefits"
                features={[
                    {
                        icon: <Users className="w-6 h-6" />,
                        title: "Unlimited Team Access",
                        description: "Provide professional resume tools to 10, 100, or 10,000+ users with simple seat-based licensing."
                    },
                    {
                        icon: <BarChart3 className="w-6 h-6" />,
                        title: "Analytics Dashboard",
                        description: "Track engagement, completion rates, and success metrics through dedicated organizational reporting."
                    },
                    {
                        icon: <Globe className="w-6 h-6" />,
                        title: "White-Label Branding",
                        description: "Custom branding, domains, and seamless integration to match your organization's identity."
                    },
                    {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "Enterprise Security",
                        description: "SSO integration, GDPR compliance, data encryption, and dedicated support SLAs."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Custom Templates",
                        description: "Industry-specific or branded resume templates tailored to your organization's needs."
                    },
                    {
                        icon: <Rocket className="w-6 h-6" />,
                        title: "Dedicated Support",
                        description: "Priority customer support, onboarding assistance, and training resources for administrators."
                    }
                ]}
            />

            <ResourceContentSection
                title="Who Benefits from Organizational Solutions"
                content={
                    <div className="space-y-8">
                        {[
                            {
                                industry: "Universities & Career Services",
                                icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
                                description: "Give your graduates a competitive edge with professional resume tools.",
                                useCases: [
                                    "Career center resource for all students and alumni",
                                    "Integration with career fairs and recruiting events",
                                    "Track student engagement and resume completion rates",
                                    "Customizable templates for different majors and industries"
                                ],
                                results: "Universities report 40% increase in student career services engagement and better placement rates when providing modern resume tools."
                            },
                            {
                                industry: "Corporate HR & Talent Development",
                                icon: <Briefcase className="w-8 h-8 text-purple-600" />,
                                description: "Offer career development tools as part of your employee benefits package.",
                                useCases: [
                                    "Internal mobility programs—help employees explore new roles",
                                    "Leadership development and career pathing",
                                    "Employee retention through professional development",
                                    "Part of comprehensive L&D (Learning & Development) offerings"
                                ],
                                results: "Companies offering career tools see 25% improvement in employee retention and higher engagement scores."
                            },
                            {
                                industry: "Outplacement & Career Transition Services",
                                icon: <Users className="w-8 h-8 text-green-600" />,
                                description: "Support transitioning employees with best-in-class resume building technology.",
                                useCases: [
                                    "Complete career transition toolkit for laid-off employees",
                                    "Track progress and provide personalized coaching",
                                    "Integration with job search and interview prep resources",
                                    "Demonstrate ROI to corporate clients through analytics"
                                ],
                                results: "Outplacement firms using modern tools place candidates 30% faster on average."
                            },
                            {
                                industry: "Professional Associations & Membership Organizations",
                                icon: <Award className="w-8 h-8 text-orange-600" />,
                                description: "Add value to membership with exclusive career development resources.",
                                useCases: [
                                    "Member-only benefit that drives renewals",
                                    "Industry-specific resume templates and best practices",
                                    "Continuing education credit opportunities",
                                    "Career resource library for members at all levels"
                                ],
                                results: "Associations offering career tools report 15-20% higher member satisfaction and retention rates."
                            }
                        ].map((sector, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-300 transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">{sector.icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{sector.industry}</h3>
                                        <p className="text-gray-600 text-lg">{sector.description}</p>
                                    </div>
                                </div>
                                <div className="ml-12">
                                    <h3 className="font-semibold text-gray-900 mb-3">Common Use Cases:</h3>
                                    <ul className="space-y-2 mb-4">
                                        {sector.useCases.map((useCase, uidx) => (
                                            <li key={uidx} className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>{useCase}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                                        <p className="text-sm text-blue-900"><strong>📊 Results:</strong> {sector.results}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="Pricing & Plans"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            Our organizational pricing scales with your needs. All plans include core features with flexible add-ons.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    tier: "Starter",
                                    range: "10-50 seats",
                                    price: "Contact for pricing",
                                    features: [
                                        "Unlimited resume builds",
                                        "All premium templates",
                                        "Basic analytics dashboard",
                                        "Email support",
                                        "Monthly billing"
                                    ],
                                    ideal: "Small teams, departments, or pilot programs"
                                },
                                {
                                    tier: "Professional",
                                    range: "51-500 seats",
                                    price: "Volume discounts available",
                                    features: [
                                        "Everything in Starter",
                                        "Advanced analytics & reporting",
                                        "Custom branding options",
                                        "Priority support",
                                        "Annual billing options",
                                        "SSO integration"
                                    ],
                                    ideal: "Universities, mid-size companies, associations",
                                    popular: true
                                },
                                {
                                    tier: "Enterprise",
                                    range: "500+ seats",
                                    price: "Custom pricing",
                                    features: [
                                        "Everything in Professional",
                                        "White-label platform",
                                        "Custom template development",
                                        "Dedicated account manager",
                                        "SLA guarantees",
                                        "API access",
                                        "Custom integrations"
                                    ],
                                    ideal: "Large universities, corporations, outplacement firms"
                                }
                            ].map((plan, idx) => (
                                <div key={idx} className={`rounded-xl p-6 ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-4 border-blue-700 transform scale-105' : 'bg-white border-2 border-gray-200'}`}>
                                    {plan.popular && (
                                        <div className="text-center mb-3">
                                            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
                                        </div>
                                    )}
                                    <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.tier}</h3>
                                    <p className={`text-sm mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>{plan.range}</p>
                                    <p className={`text-3xl font-bold mb-6 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, fidx) => (
                                            <li key={fidx} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                                                <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-yellow-300' : 'text-green-600'}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={`text-xs ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                                        <strong>Ideal for:</strong> {plan.ideal}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Implementation & Support"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            We make deployment easy with comprehensive onboarding and 24/7 support:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    phase: "1. Discovery & Setup (Week 1)",
                                    items: [
                                        "Kickoff call to understand your specific needs",
                                        "Account configuration and branding setup",
                                        "SSO integration (if applicable)",
                                        "Custom template development starts"
                                    ]
                                },
                                {
                                    phase: "2. Training & Launch (Week 2)",
                                    items: [
                                        "Administrator training sessions",
                                        "User guides and documentation delivery",
                                        "Soft launch with pilot group",
                                        "Q&A and feedback incorporation"
                                    ]
                                },
                                {
                                    phase: "3. Full Deployment (Week 3)",
                                    items: [
                                        "Organization-wide rollout",
                                        "Communication templates for announcement",
                                        "Analytics dashboard access",
                                        "Ongoing support channel established"
                                    ]
                                },
                                {
                                    phase: "4. Optimization (Ongoing)",
                                    items: [
                                        "Monthly usage reports and insights",
                                        "Quarterly business reviews",
                                        "Feature requests and custom development",
                                        "Success stories and case study development"
                                    ]
                                }
                            ].map((phase, idx) => (
                                <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                                    <h3 className="font-bold text-gray-900 mb-4">{phase.phase}</h3>
                                    <ul className="space-y-2">
                                        {phase.items.map((item, iidx) => (
                                            <li key={iidx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Frequently Asked Questions"
                content={
                    <div className="space-y-6">
                        {[
                            {
                                q: "What's the minimum number of seats required?",
                                a: "Our organizational plans start at 10 seats. For smaller teams (1-9 users), we recommend our individual premium plans."
                            },
                            {
                                q: "Can we try before committing to a full license?",
                                a: "Absolutely! We offer 30-day pilot programs for organizations. Test with a small group before rolling out organization-wide."
                            },
                            {
                                q: "How does white-labeling work?",
                                a: "White-labeling is available on Enterprise plans. You can customize the platform with your logo, colors, domain (resume.yourcompany.com), and even remove our branding entirely."
                            },
                            {
                                q: "What kind of analytics do you provide?",
                                a: "Analytics include: user engagement rates, resume completions, template preferences, feature usage, download statistics, and success metrics. Enterprise clients get custom reporting."
                            },
                            {
                                q: "Do you integrate with existing HR systems or LMS platforms?",
                                a: "Yes! We offer SSO integration (SAML, OAuth) and can integrate with popular platforms like Workday, SuccessFactors, Canvas, Blackboard, and more. Custom integrations available on Enterprise plans."
                            },
                            {
                                q: "What ongoing support do organizations receive?",
                                a: "Professional plans include priority email support with 24-hour response times. Enterprise clients get dedicated account managers, phone support, and SLA guarantees."
                            },
                            {
                                q: "Can we create custom resume templates for our organization?",
                                a: "Yes! Enterprise plans include custom template development. We'll work with you to create templates that match your industry standards, company branding, or specific program needs."
                            },
                            {
                                q: "How quickly can we get set up?",
                                a: "Most organizations are fully deployed within 2-3 weeks. Simple setups (no custom branding/SSO) can be live in days."
                            },
                            {
                                q: "What happens to user data if we cancel?",
                                a: "Users retain access to their resume data. We provide export tools and grace periods to ensure no data is lost during transitions."
                            },
                            {
                                q: "Do you offer any discounts for nonprofits or educational institutions?",
                                a: "Yes! We offer special pricing for accredited educational institutions and registered nonprofits. Contact our sales team for details."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="font-semibold text-gray-900 text-lg mb-3">{faq.q}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceCTA
                title="Ready to Empower Your Organization?"
                subtitle={
                    <>
                        Schedule a demo to see how our enterprise resume solutions can benefit your team. Contact our sales team at{' '}
                        <a href={`mailto:${ENV.ENTERPRISE_EMAIL}`} className="text-blue-600 hover:underline font-semibold">{ENV.ENTERPRISE_EMAIL}</a>
                        {' '}or fill out our{' '}
                        <Link href="/contact" className="text-blue-600 hover:underline font-semibold">contact form</Link>
                        {' '}to get started.
                    </>
                }
            />
        </div>
    );
}
