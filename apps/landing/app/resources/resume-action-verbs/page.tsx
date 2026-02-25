import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Zap, Target, TrendingUp, Users, Award, Shield, CheckCircle, Briefcase, FileText } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '500+ Resume Action Verbs (2026 List) | Boost Your ATS Score | Hirecta',
    description: 'Stop using \'Responsible for\'. Access our definitive list of 500+ powerful resume action verbs categorized by skill (Leadership, Technical, Sales, etc.) to land more interviews.',
    keywords: 'resume action verbs, strong resume words, resume power words, words to use on resume, resume verbs list, ats resume words',
    alternates: {
        canonical: '/resources/resume-action-verbs',
    },
};

export default function ActionVerbsPage() {
    const faqs = [
        { question: "Why should I use action verbs on my resume?", answer: "Action verbs (like 'Spearheaded' or 'Optimized') replace weak, passive phrases (like 'Responsible for' or 'Helped with'). They make your accomplishments sound active, impactful, and professional, which immediately catches a recruiter's eye and improves Applicant Tracking System (ATS) parsing." },
        { question: "Where should I put action verbs on my resume?", answer: "Start every single bullet point in your Experience section with a strong action verb in the past tense (unless it's a current duty). Never start a bullet point with 'I', 'My', or 'Was'." },
        { question: "Can I repeat the same action verb?", answer: "Try to avoid it. Using 'Managed' five times in a row shows a lack of vocabulary. Mix it up using our categorized lists below—switch 'Managed' to 'Directed', 'Orchestrated', 'Supervised', or 'Guided'." },
        { question: "Do action verbs help with ATS?", answer: "Yes. Many Applicant Tracking Systems are programmed to look for specific action-oriented keywords linked to the job description (e.g., 'Developed', 'Analyzed', 'Negotiated'). Using strong verbs increases your semantic match score." }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resources", url: `${ENV.BASE_URL}/resources` },
        { name: "Resume Action Verbs", url: `${ENV.BASE_URL}/resources/resume-action-verbs` }
    ];

    const verbCategories = [
        {
            title: "Leadership & Management",
            icon: <Award className="w-5 h-5 text-purple-600" />,
            description: "Instead of 'Led' or 'Managed'",
            verbs: ["Orchestrated", "Spearheaded", "Directed", "Executed", "Pioneered", "Championed", "Mentored", "Cultivated", "Headed", "Mobilized", "Delegated", "Steered", "Navigated", "Supervised", "Guided", "Fostered", "Governed", "Authorized", "Chaired", "Presided", "Regulated", "Sponsored", "Administered", "Commanded", "Empowered", "Enforced", "Instituted", "Overhauled"]
        },
        {
            title: "Growth & Profitability",
            icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
            description: "Instead of 'Increased' or 'Grew'",
            verbs: ["Accelerated", "Maximized", "Amplified", "Boosted", "Capitalized", "Delivered", "Expanded", "Generated", "Outpaced", "Propelled", "Surged", "Yielded", "Multiplied", "Elevated", "Scaled", "Advanced", "Enhanced", "Sustained", "Bolstered", "Catalyzed", "Invigorated", "Spurred", "Stimulated", "Revitalized", "Pushed", "Raised", "Upscaled"]
        },
        {
            title: "Problem Solving & Engineering",
            icon: <Zap className="w-5 h-5 text-amber-500" />,
            description: "Instead of 'Fixed' or 'Created'",
            verbs: ["Engineered", "Devised", "Formulated", "Remodeled", "Revamped", "Troubleshot", "Conceptualized", "Drafted", "Architected", "Reconstructed", "Resolved", "Innovated", "Synthesized", "Debugged", "Deployed", "Programmed", "Redesigned", "Customized", "Fabricated", "Assembled", "Constructed", "Upgraded", "Hacked", "Provisioned", "Automated"]
        },
        {
            title: "Communication, Sales, & Client Relations",
            icon: <Users className="w-5 h-5 text-blue-500" />,
            description: "Instead of 'Talked to' or 'Persuaded'",
            verbs: ["Negotiated", "Advocated", "Influenced", "Presented", "Pitched", "Articulated", "Clarified", "Conveyed", "Mediated", "Reconciled", "Persuaded", "Secured", "Closed", "Consulted", "Authored", "Briefed", "Corresponded", "Documented", "Edited", "Lobbied", "Promoted", "Publicized", "Translated", "Addressed", "Liaised", "Marketed", "Coached"]
        },
        {
            title: "Analysis, Finance & Research",
            icon: <Target className="w-5 h-5 text-rose-500" />,
            description: "Instead of 'Looked into' or 'Studied'",
            verbs: ["Analyzed", "Assessed", "Evaluated", "Investigated", "Quantified", "Audited", "Calculated", "Discovered", "Examined", "Forecasted", "Mapped", "Measured", "Probed", "Tracked", "Appraised", "Diagnosed", "Extracted", "Interpreted", "Surveyed", "Tested", "Verified", "Modeled", "Projected", "Reconciled", "Tabulated", "Correlated"]
        },
        {
            title: "Efficiency, Operations & Organization",
            icon: <CheckCircle className="w-5 h-5 text-teal-600" />,
            description: "Instead of 'Helped with' or 'Organized'",
            verbs: ["Optimized", "Streamlined", "Standardized", "Centralized", "Consolidated", "Systematized", "Aligned", "Categorized", "Classified", "Coordinated", "Facilitated", "Integrated", "Restructured", "Cataloged", "Compiled", "Dispatched", "Logged", "Merchandised", "Processed", "Routed", "Scheduled", "Simplified", "Tracked", "Updated", "Validated"]
        },
        {
            title: "Creative, Design & Media",
            icon: <Users className="w-5 h-5 text-indigo-500" />,
            description: "Instead of 'Designed' or 'Made'",
            verbs: ["Conceptualized", "Authored", "Brainstormed", "Choreographed", "Composed", "Customized", "Designed", "Directed", "Drafted", "Fashioned", "Illustrated", "Imagined", "Innovated", "Modeled", "Originated", "Painted", "Photographed", "Produced", "Proofread", "Published", "Revised", "Shaped", "Sketched", "Storyboarded", "Visualized"]
        },
        {
            title: "Support, Education & Customer Service",
            icon: <CheckCircle className="w-5 h-5 text-fuchsia-600" />,
            description: "Instead of 'Helped' or 'Taught'",
            verbs: ["Advised", "Assisted", "Clarified", "Coached", "Collaborated", "Contributed", "Cooperated", "Counseled", "Educated", "Enabled", "Encouraged", "Ensured", "Expedited", "Familiarized", "Guided", "Instructed", "Motivated", "Participated", "Rehabilitated", "Represented", "Resolved", "Supported", "Tutored", "Volunteered"]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="500+ Resume Action Verbs for 2026: The Ultimate List"
                description="Ditch 'Responsible for'. Use our definitive list of 500+ powerful resume action verbs categorized by exact skill to get noticed by recruiters and ATS."
                url={`${ENV.BASE_URL}/resources/resume-action-verbs`}
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="Writing Guide"
                badgeIcon={FileText}
                title={
                    <>
                        500+ Power <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Action Verbs</span> for Resumes
                    </>
                }
                subtitle="Stop using weak phrases like 'Responsible for' or 'Helped with'. Transform your resume into an achievement document with our curated list of high-impact action verbs that recruiters actually want to see."
            />

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-lg prose-blue text-gray-600 max-w-none">
                        <h2 className="text-3xl font-black text-gray-900">Why Action Verbs are the Secret to Passing ATS in 2026</h2>
                        <p>
                            The modern job search is governed by algorithms. When you submit your resume online, the first \"reader\" is rarely a human being; it is an Applicant Tracking System (ATS). These sophisticated AI parsers are programmed to scan your document for semantic relevance, instantly discarding applications that fail to match the linguistic density of the original job description.
                        </p>
                        <p>
                            The most critical components of this semantic analysis are <strong>Action Verbs</strong>. An action verb is an aggressive, past-tense word that immediately establishes ownership and impact at the beginning of a bullet point. If your resume is riddled with passive voice—phrases like \"Responsible for,\" \"Duties included,\" \"Helped with,\" or \"Worked on\"—you are signaling to both the ATS and the human recruiter that you are a passive employee, not an active problem solver. You are describing your job description, not your career achievements.
                        </p>

                        <h3>The Psychology of the Recruiter Screen</h3>
                        <p>
                            Human recruiters spend an average of 6 to 7 seconds on their initial resume screen. They do not read your document linearly from top to bottom; they scan vertically down the left margin of your Experience section. Because in Western languages we read left to right, the very first word of every bullet point carries disproportionate psychological weight.
                        </p>
                        <p>
                            Imagine a recruiter scanning two resumes for a Project Manager role.
                            Candidate A's bullets begin with: <em>Managed... Organized... Handled... Looked after...</em>
                            Candidate B's bullets begin with: <em>Spearheaded... Orchestrated... Architected... Mobilized...</em>
                        </p>
                        <p>
                            Before the recruiter has even read the actual metric or accomplishment, Candidate B has already won the psychological battle. They sound authoritative, decisive, and senior. This is the power of a highly curated action verb vocabulary.
                        </p>

                        <h3>The XYZ Bullet Point Formula</h3>
                        <p>
                            An action verb alone is not enough; it must be the catalyst for a structured metric. The industry standard for elite resume writing in 2026 is the \"XYZ Formula,\" popularized by Google's recruiting team: <strong>Accomplished [X] as measured by [Y], by doing [Z].</strong>
                        </p>
                        <ul>
                            <li><strong>Passive (Bad):</strong> \"Responsible for managing the sales team and increasing our revenue.\"</li>
                            <li><strong>Active without Metric (Okay):</strong> \"Directed the sales team to successfully increase quarterly revenue.\"</li>
                            <li><strong>XYZ Formula (Perfect):</strong> \"<strong>Orchestrated</strong> a 12-person enterprise sales team (Z), accelerating Q3 MRR growth by 45% (X) resulting in $2.4M in net-new pipeline (Y).\"</li>
                        </ul>

                        <h3>Contextual Keyword Mapping</h3>
                        <p>
                            Do not blindly copy and paste verbs from the lists below. You must map them contextually to the job you want. If you are applying for an analytical role (Finance, Data Science), lean heavily on verbs like <em>Quantified, Evaluated, and Forecasted.</em> If you are applying for a growth role (Marketing, Sales), deploy verbs like <em>Accelerated, Scaled, and Amplified.</em> The goal is to perfectly mirror the linguistic tone of the employer's industry.
                        </p>
                    </article>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Golden Rule of Bullet Points</h2>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 md:p-8 mb-8 border border-red-200">
                        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                            <Shield className="w-6 h-6" /> Stop doing this:
                        </h3>
                        <p className="text-lg text-red-800 line-through">"Responsible for managing a team of 5 people and helping to increase sales."</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-green-200">
                        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6" /> Start doing this:
                        </h3>
                        <p className="text-xl font-medium text-green-800">"<strong className="text-blue-700">Directed</strong> a 5-person team, <strong className="text-blue-700">orchestrating</strong> a new sales strategy that <strong className="text-blue-700">accelerated</strong> Q3 revenue by 24%."</p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Impact</h2>
                        <p className="text-xl text-gray-600">Categorized by the exact skill you want to highlight.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {verbCategories.map((category, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                                </div>
                                <p className="text-sm font-medium text-gray-500 mb-6 italic">{category.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {category.verbs.map((verb, vIdx) => (
                                        <span key={vIdx} className="px-3 py-1 bg-gray-50 text-gray-700 border border-gray-100 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors cursor-default">
                                            {verb}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ResourceCTA
                title="Let AI Pick the Perfect Verbs for You"
                subtitle="Why memorize lists? Hirecta's advanced AI writer automatically scans the job description you want and rewrites your bullet points using the exact ATS action verbs the employer is looking for."
            />
        </div>
    );
}
