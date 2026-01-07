import { Metadata } from 'next';
import { Target, Crosshair, Search, Zap, CheckCircle, ArrowRight, TrendingUp, Award, Clock, FileText, AlertCircle, CheckSquare } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Targeted Resume Guide 2026 - Tailor Your Resume for Every Job | 300% More Interviews',
    description: 'Master the art of creating targeted resumes that beat ATS systems and impress recruiters. Proven strategies to increase interview callbacks by 300%. Free tools & examples included.',
    keywords: 'targeted resume, tailored resume, customize resume, resume customization, matching job description, resume targeting, personalized resume, job-specific resume, ATS optimization',
};

export default function TargetedResumePage() {
    const faqs = [
        { question: "How long should it take to tailor my resume?", answer: "Plan 20-30 minutes per application for quality targeting. Use our AI tools to reduce this to 5-10 minutes." },
        { question: "Should I have multiple versions of my resume?", answer: "Yes! Create 2-3 base templates for different roles/industries, then customize each further for specific applications." },
        { question: "What percentage of my resume should match the job description?", answer: "Aim for 60-80% keyword alignment while maintaining authenticity. Our Resume Scanner helps you find the optimal balance." },
        { question: "Can I get caught using keywords I don't have experience with?", answer: "Never add false skills. Instead, reframe your existing experience using the job's language and emphasize transferable skills." },
        { question: "How do I target my resume without lying?", answer: "Focus on relevant achievements, use industry keywords you actually possess, and emphasize applicable experience. It's about presentation, not fabrication." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={BREADCRUMBS['targeted-resume']} />
            <ArticleSchema
                title="Targeted Resume Guide 2026 - Tailor Your Resume for Every Job"
                description="Master the art of creating targeted resumes that beat ATS systems and impress recruiters. Proven strategies to increase interview callbacks by 300%."
                url="https://profresume.com/resources/targeted-resume"
            />
            <FAQSchema faqs={faqs} />
            <ResourceHero
                badge="Strategy Guide"
                badgeIcon={Target}
                title={
                    <>
                        Land More Interviews with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Targeted Resume</span>
                    </>
                }
                subtitle="Stop sending the same resume to every job. Learn the art of strategic tailoring to match every employer's unique requirements and increase your interview rate by 300%."
            />

            <ResourceFeatureGrid
                title="Why Targeted Resumes Win"
                features={[
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "300% More Interviews",
                        description: "Studies show targeted resumes receive 3x more interview requests than generic ones."
                    },
                    {
                        icon: <Crosshair className="w-6 h-6" />,
                        title: "Precision Matching",
                        description: "Align your skills directly with the top requirements listed in the job description."
                    },
                    {
                        icon: <Search className="w-6 h-6" />,
                        title: "Higher Relevance Score",
                        description: "Recruiters see exactly what they're looking for within the first 6 seconds of reading."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "Better ATS Score",
                        description: "Targeted resumes naturally include the keywords that automated systems are programmed to find."
                    },
                    {
                        icon: <Award className="w-6 h-6" />,
                        title: "Stand Out Instantly",
                        description: "Your resume speaks directly to the hiring manager's needs and pain points."
                    },
                    {
                        icon: <Clock className="w-6 h-6" />,
                        title: "Faster Hiring Process",
                        description: "When you clearly match requirements, decisions are made faster."
                    }
                ]}
            />

            <ResourceContentSection
                title="What is a Targeted Resume?"
                content={
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            A <strong>targeted resume</strong> is a customized version of your resume specifically tailored to match a particular job opening. Rather than using a one-size-fits-all approach, you strategically highlight the most relevant skills, experiences, and achievements that align with the employer's specific requirements.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                The Reality Check
                            </h4>
                            <p className="text-gray-700">
                                The average recruiter spends just <strong>6-8 seconds</strong> reviewing your resume. If they don't immediately see relevant keywords and experience matching their job description, your resume goes to the rejection pile—no matter how qualified you are.
                            </p>
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="The 5-Step Targeting Framework"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700 mb-6">
                            Follow this proven framework to create a targeted resume that gets results:
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    step: 1,
                                    title: "Analyze the Job Description",
                                    description: "Read the job posting 3 times. Highlight these key elements:",
                                    details: [
                                        "Required skills and qualifications (these are must-haves)",
                                        "Preferred skills (nice-to-haves that make you stand out)",
                                        "Key responsibilities and daily tasks",
                                        "Industry-specific terminology and buzzwords",
                                        "Company values and culture indicators"
                                    ]
                                },
                                {
                                    step: 2,
                                    title: "Map Your Experience",
                                    description: "Create a matching matrix between job requirements and your background:",
                                    details: [
                                        "List the top 10 keywords from the job description",
                                        "Find instances in your career where you used those skills",
                                        "Identify quantifiable achievements related to each requirement",
                                        "Note any gaps you need to address or downplay"
                                    ]
                                },
                                {
                                    step: 3,
                                    title: "Customize Your Summary",
                                    description: "Rewrite your professional summary to mirror the job requirements:",
                                    details: [
                                        "Lead with your most relevant title/role",
                                        "Include years of experience in their specific industry/domain",
                                        "Mention the exact skills they're looking for",
                                        "Add a measurable achievement that addresses their pain points"
                                    ]
                                },
                                {
                                    step: 4,
                                    title: "Refine Your Experience Bullets",
                                    description: "Reorder and rewrite your bullet points for maximum impact:",
                                    details: [
                                        "Put most relevant achievements first in each role",
                                        "Use the exact terminology from the job posting",
                                        "Add metrics that matter to this specific employer",
                                        "Remove or minimize less relevant experience"
                                    ]
                                },
                                {
                                    step: 5,
                                    title: "Optimize Your Skills Section",
                                    description: "Strategic skill placement makes all the difference:",
                                    details: [
                                        "List their top 3 required skills first",
                                        "Group skills by category (Technical, Soft, Industry-specific)",
                                        "Include skill proficiency levels when relevant",
                                        "Remove skills that aren't mentioned in the job description"
                                    ]
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                                {item.step}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                                            <p className="text-gray-600 mb-3">{item.description}</p>
                                            <ul className="space-y-2">
                                                {item.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Before & After Example"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            See how targeting transforms a resume for a Digital Marketing Manager position:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <h4 className="font-bold text-red-900">Generic Resume ❌</h4>
                                </div>
                                <div className="bg-white p-4 rounded-lg space-y-3 text-sm">
                                    <p className="font-semibold text-gray-900">Marketing Professional</p>
                                    <p className="text-gray-600">
                                        Experienced marketing professional with background in various digital channels. Worked on campaigns and social media.
                                    </p>
                                    <div className="space-y-1 text-gray-600">
                                        <p>• Managed social media accounts</p>
                                        <p>• Created marketing content</p>
                                        <p>• Worked with team members</p>
                                    </div>
                                </div>
                                <div className="mt-4 bg-red-100 p-3 rounded-lg">
                                    <p className="text-xs text-red-800"><strong>Why it fails:</strong> Vague, no keywords, no metrics, doesn't match job requirements</p>
                                </div>
                            </div>
                            <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <h4 className="font-bold text-green-900">Targeted Resume ✅</h4>
                                </div>
                                <div className="bg-white p-4 rounded-lg space-y-3 text-sm">
                                    <p className="font-semibold text-gray-900">Digital Marketing Manager | SEO & PPC Specialist</p>
                                    <p className="text-gray-600">
                                        Results-driven Digital Marketing Manager with 5+ years driving ROI through data-driven SEO, PPC, and content marketing strategies. Increased organic traffic by 250% and reduced CAC by 40%.
                                    </p>
                                    <div className="space-y-1 text-gray-600">
                                        <p>• Managed $500K annual PPC budget across Google Ads and Meta, achieving 180% ROAS</p>
                                        <p>• Led SEO optimization increasing organic search traffic 250% (500K→1.25M monthly visits)</p>
                                        <p>• Implemented marketing automation reducing lead nurturing time by 60%</p>
                                    </div>
                                </div>
                                <div className="mt-4 bg-green-100 p-3 rounded-lg">
                                    <p className="text-xs text-green-800"><strong>Why it works:</strong> Specific keywords, quantifiable results, matches job requirements perfectly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Common Targeting Mistakes to Avoid"
                content={
                    <div className="space-y-4">
                        {[
                            {
                                mistake: "Keyword Stuffing",
                                explanation: "Don't just copy and paste keywords. Integrate them naturally into achievement-based bullet points.",
                                fix: "Instead of listing 'JavaScript, React, Node.js,' write 'Built scalable web applications using React and Node.js, serving 100K+ users.'"
                            },
                            {
                                mistake: "Lying or Exaggerating",
                                explanation: "Never claim skills you don't have. ATS might get you in, but interviews will expose gaps.",
                                fix: "Focus on honestly presenting your actual skills in the language the employer uses."
                            },
                            {
                                mistake: "Over-Targeting",
                                explanation: "Don't remove ALL your other experience. Maintain a balanced, credible work history.",
                                fix: "Emphasize relevant experience while still showing career progression and breadth."
                            },
                            {
                                mistake: "Forgetting Soft Skills",
                                explanation: "Technical skills aren't everything. Job descriptions often mention teamwork, leadership, communication.",
                                fix: "Demonstrate soft skills through concrete examples: 'Led cross-functional team of 12 to deliver project 2 weeks ahead of schedule.'"
                            },
                            {
                                mistake: "Ignoring Company Culture",
                                explanation: "Not addressing culture fit indicators mentioned in the job posting.",
                                fix: "If they mention 'fast-paced startup environment,' highlight your agility and entrepreneurial achievements."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 border-l-4 border-orange-500 p-5 rounded-r-lg">
                                <h4 className="font-bold text-gray-900 mb-2">❌ {item.mistake}</h4>
                                <p className="text-gray-600 text-sm mb-2"><strong>Why it's wrong:</strong> {item.explanation}</p>
                                <p className="text-gray-700 text-sm"><strong>✅ Fix:</strong> {item.fix}</p>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="Frequently Asked Questions"
                content={
                    <div className="space-y-6">
                        {[
                            {
                                q: "Should I create a different resume for every job application?",
                                a: "Ideally, yes—at least for jobs you're seriously interested in. For roles that are very similar, you can create 2-3 targeted versions and reuse them. The key is ensuring each version strongly aligns with the specific job requirements."
                            },
                            {
                                q: "How long should a targeted resume be?",
                                a: "Generally 1-2 pages. One page for early-career professionals (0-5 years), two pages for mid-senior level (5+ years). Quality over quantity—every line should add value and relate to the target job."
                            },
                            {
                                q: "Can I use AI tools to help target my resume?",
                                a: "Absolutely! Our AI-powered resume tailor can analyze job descriptions and suggest optimizations. However, always review and personalize AI suggestions to ensure accuracy and authenticity."
                            },
                            {
                                q: "What if I don't have experience with something they require?",
                                a: "Focus on transferable skills and relevant projects. If they need 'Python' and you know 'JavaScript,' emphasize your general programming ability and quick learning. Consider taking a quick course to fill critical gaps."
                            },
                            {
                                q: "How do I know if my targeted resume is working?",
                                a: "Track your application-to-interview ratio. Generic resumes typically get 2-5% interview rates. Well-targeted resumes should achieve 15-30% or higher. If you're not getting interviews after 10 applications, revisit your targeting strategy."
                            },
                            {
                                q: "Should I target for ATS or human readers?",
                                a: "Both! Modern targeting strategies optimize for ATS (keywords, formatting, structure) AND human appeal (compelling narratives, metrics, readability). You need to pass the ATS filter first, then impress the human reviewer."
                            },
                            {
                                q: "How much customization is actually necessary?",
                                a: "At minimum: customize your summary, reorder bullet points to highlight relevant experience, and adjust your skills section. For best results: also tailor 3-5 key achievement bullets and your job titles (if appropriate: 'Marketing Specialist (Digital Focus)' vs 'Marketing Specialist (Content Focus)')."
                            },
                            {
                                q: "Can I use a targeted resume for LinkedIn?",
                                a: "LinkedIn should be more comprehensive than a targeted resume. However, you can optimize your headline and summary for your target role. Use the 'Featured' section to highlight relevant projects."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                                <h4 className="font-semibold text-gray-900 text-lg mb-3">{faq.q}</h4>
                                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="Quick Targeting Checklist"
                content={
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">Before submitting your targeted resume, verify you've completed these steps:</p>
                        <div className="space-y-2">
                            {[
                                "Matched your professional summary to their job title and top 3 requirements",
                                "Incorporated at least 10 keywords from the job description naturally",
                                "Quantified achievements with metrics relevant to the role",
                                "Reordered experience bullets with most relevant items first",
                                "Adjusted your skills section to prioritize their required skills",
                                "Used their exact terminology (if they say 'customer success,' don't say 'client support')",
                                "Removed irrelevant experience that doesn't support your candidacy",
                                "Formatted resume to be ATS-friendly (standard fonts, clear headers, no tables/graphics)",
                                "Proofread for errors—typos are magnified when applying to specific roles",
                                "Saved file as 'FirstName_LastName_TargetedRole.pdf'"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceCTA
                title="Start Creating Your Targeted Resume"
                subtitle={
                    <>
                        Use our AI-powered resume builder to easily create targeted versions for each job application. Our smart tools help you identify key requirements and optimize your resume automatically.{' '}
                        <Link href="/resources/resume-keyword-generator" className="text-blue-600 hover:underline font-semibold">
                            Try our free keyword generator
                        </Link>{' '}
                        to analyze any job description in seconds.
                    </>
                }
            />
        </div>
    );
}
