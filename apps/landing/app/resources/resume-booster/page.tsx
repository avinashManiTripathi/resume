import { Metadata } from 'next';
import { Rocket, FastForward, TrendingUp, Zap, Target, Star, Trophy, Sparkles, CheckCircle, ArrowRight, Lightbulb, Award, Search, Users, Clock } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Resume Booster 2026 - 15 Proven Strategies to Boost Resume Impact | Get Hired Faster',
    description: 'Boost your resume effectiveness with 15 proven strategies. Learn powerful action verbs, quantification techniques, and ATS optimization to increase interview rate by 250%. Free resume booster tips.',
    keywords: 'resume booster, enhance resume impact, increase resume visibility, resume profile boost, resume improvement tips, boost resume score, resume power words, resume optimization',
};

export default function ResumeBoosterPage() {
    const faqs = [
        { question: "How does resume boosting work?", answer: "We analyze your resume and suggest strategic improvements to achievements, keywords, and formatting that increase interview callbacks." },
        { question: "What kind of improvements can I expect?", answer: "Stronger action verbs, quantified achievements, better keyword optimization, and more impactful formatting that catches recruiter attention." },
        { question: "Is this different from regular resume writing?", answer: "Yes, boosting focuses specifically on amplifying existing content rather than rewriting from scratch, maximizing your current resume's impact." },
        { question: "How long does boosting take?", answer: "Instant AI-powered suggestions. You can apply improvements in 10-15 minutes for immediate resume enhancement." },
        { question: "Will it work for my industry?", answer: "Yes, our boosting strategies are customized for different industries and career levels, from entry-level to executive positions." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={BREADCRUMBS['resume-booster']} />
            <ArticleSchema
                title="Resume Booster - Amplify Your Resume Impact"
                description="Boost your resume effectiveness with proven strategies. Enhance achievements, optimize keywords, and stand out to recruiters."
                url="https://profresume.com/resources/resume-booster"
            />
            <FAQSchema faqs={faqs} />
            <ResourceHero
                badge="Impact Tool"
                badgeIcon={Rocket}
                title={
                    <>
                        Supercharge Your Career with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Resume Booster</span>
                    </>
                }
                subtitle="Transform an average resume into an interview magnet. Learn 15 proven strategies that deliver immediate, measurable improvements in callback rates."
            />

            <ResourceFeatureGrid
                title="Why Resume Boosting Works"
                features={[
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "250% More Callbacks",
                        description: "Small, strategic changes can triple your interview request rate within weeks."
                    },
                    {
                        icon: <FastForward className="w-6 h-6" />,
                        title: "Quick Wins",
                        description: "Most boosting strategies take under 30 minutes to implement but deliver lasting impact."
                    },
                    {
                        icon: <Star className="w-6 h-6" />,
                        title: "Higher Rankings",
                        description: "Optimized resumes rank higher in ATS searches and recruiter LinkedIn filters."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Immediate Impact",
                        description: "See results on your very next application—no waiting required."
                    },
                    {
                        icon: <Trophy className="w-6 h-6" />,
                        title: "Competitive Edge",
                        description: "Stand out in applicant pools of 200+ candidates vying for the same role."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Precision Targeting",
                        description: "Align your resume perfectly with what recruiters are actually looking for."
                    }
                ]}
            />

            <ResourceContentSection
                title="15 Proven Resume Boosting Strategies"
                content={
                    <div className="space-y-8">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            These aren't theoretical tips—they're battle-tested strategies that have helped thousands of job seekers dramatically improve their interview rates. Implement even 5 of these, and you'll see measurable results.
                        </p>

                        {[
                            {
                                number: 1,
                                title: "Use the Google XYZ Formula",
                                icon: <Sparkles className="w-6 h-6 text-orange-600" />,
                                description: "Transform weak bullets into impact statements using: 'Accomplished [X] as measured by [Y], by doing [Z].'",
                                before: "Managed social media accounts",
                                after: "Grew Instagram following from 5K to 250K in 8 months (5000% increase) by implementing data-driven content strategy and influencer partnerships",
                                impact: "This formula forces you to quantify results and explain your approach—exactly what recruiters want to see."
                            },
                            {
                                number: 2,
                                title: "Lead Every Bullet with Power Verbs",
                                icon: <Trophy className="w-6 h-6 text-blue-600" />,
                                description: "Replace weak verbs (helped, worked on, responsible for) with strong action verbs that command attention.",
                                powerVerbs: {
                                    "Leadership": ["Spearheaded", "Orchestrated", "Championed", "Directed", "Pioneered"],
                                    "Achievement": ["Increased", "Reduced", "Generated", "Accelerated", "Maximized"],
                                    "Innovation": ["Launched", "Developed", "Designed", "Architected", "Engineered"],
                                    "Improvement": ["Optimized", "Streamlined", "Enhanced", "Transformed", "Revitalized"]
                                },
                                before: "Was responsible for improving team efficiency",
                                after: "Streamlined workflow processes, boosting team productivity 40% and reducing project delivery time from 8 weeks to 5 weeks"
                            },
                            {
                                number: 3,
                                title: "Quantify EVERYTHING",
                                icon: <TrendingUp className="w-6 h-6 text-green-600" />,
                                description: "Numbers catch the eye and prove impact. If you can't measure it directly, estimate scope or scale.",
                                examples: [
                                    {
                                        scenario: "You don't have revenue numbers",
                                        solution: "Describe scope: 'Managed portfolio of 50+ corporate clients with combined annual spend of $5M'"
                                    },
                                    {
                                        scenario: "You improved a process",
                                        solution: "Measure time saved: 'Reduced report generation time from 4 hours to 30 minutes (87.5% reduction)'"
                                    },
                                    {
                                        scenario: "You led a team",
                                        solution: "Quantify team + outcome: 'Led cross-functional team of 12 to deliver project 3 weeks ahead of schedule'"
                                    }
                                ],
                                impact: "Resumes with 5+ metrics get 40% more interview requests than those without."
                            },
                            {
                                number: 4,
                                title: "Front-Load Your Achievements",
                                icon: <FastForward className="w-6 h-6 text-purple-600" />,
                                description: "Put your most impressive, relevant achievements in the top third of page 1. Recruiters spend only 6 seconds scanning.",
                                strategy: "Reorder your experience bullets—most impressive first, not chronological. Consider moving your strongest role higher even if it wasn't your most recent.",
                                before: "Experience section buried on page 2 with weak bullets first",
                                after: "Top achievement visible immediately: 'Generated $2.5M in new revenue by launching B2B sales program' leads the page"
                            },
                            {
                                number: 5,
                                title: "Customize Your Professional Summary",
                                icon: <Target className="w-6 h-6 text-red-600" />,
                                description: "Your summary is prime real estate. Make every word count with this proven formula:",
                                formula: "[Job Title] with [X years] in [Industry/Specialty] | [Top Skill #1] | [Biggest Achievement with Metric] | [Top Skill #2]",
                                example: "Senior Product Manager with 8 years in SaaS | Led 15+ product launches reaching 5M+ users | Increased user retention 35% through data-driven feature optimization | Expert in agile methodologies and cross-functional team leadership",
                                impact: "Strong summaries increase profile views by 200% on LinkedIn and pass ATS filters more effectively."
                            },
                            {
                                number: 6,
                                title: "Eliminate Weak Language",
                                icon: <Zap className="w-6 h-6 text-yellow-600" />,
                                description: "Remove these resume killers immediately:",
                                weakPhrases: [
                                    {
                                        bad: "Helped with...",
                                        why: "Sounds passive and unclear about your actual role",
                                        fix: "Led / Contributed to / Delivered"
                                    },
                                    {
                                        bad: "Responsible for...",
                                        why: "Describes what you were supposed to do, not what you achieved",
                                        fix: "Managed / Oversaw / Achieved"
                                    },
                                    {
                                        bad: "Worked on...",
                                        why: "Vague and doesn't show impact",
                                        fix: "Developed / Built / Executed"
                                    },
                                    {
                                        bad: "Assisted in...",
                                        why: "Minimizes your contribution",
                                        fix: "Supported / Enabled / Facilitated"
                                    }
                                ]
                            },
                            {
                                number: 7,
                                title: "Add Industry Keywords Strategically",
                                icon: <Search className="w-6 h-6 text-indigo-600" />,
                                description: "Use our <a href='/resources/resume-keyword-generator' class='text-orange-600 underline font-semibold'>keyword generator</a> to extract terms from job descriptions, then weave them naturally into your bullets.",
                                keywordPlacement: [
                                    "Professional summary (most important—scanned first)",
                                    "Skills section (use both acronyms and full terms: SEO and Search Engine Optimization)",
                                    "Job titles and company descriptions",
                                    "Achievement bullets (integrate naturally, not stuffed)"
                                ],
                                example: "Instead of 'improved website traffic,' write 'Increased organic search traffic 250% through SEO optimization, content marketing, and technical site improvements (Googlebot indexing, Core Web Vitals)'"
                            },
                            {
                                number: 8,
                                title: "Showcase Progressive Career Growth",
                                icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
                                description: "Demonstrate increasing responsibility and impact over time.",
                                techniques: [
                                    "Show promotions clearly: 'Promoted from Analyst to Senior Analyst to Team Lead within 3 years'",
                                    "Highlight scope expansion: 'Started managing team of 3, now lead department of 25'",
                                    "Compare early vs recent achievements: Show bigger numbers, larger projects, more strategic work over time"
                                ]
                            },
                            {
                                number: 9,
                                title: "Include Industry-Specific Certifications",
                                icon: <Award className="w-6 h-6 text-pink-600" />,
                                description: "Relevant certifications can boost your resume score by 20-30%. Place them strategically.",
                                where: "After your name for critical certs (CPA, PMP, CFA) OR in a dedicated Certifications section before Education",
                                examples: [
                                    "Tech: AWS Certified Solutions Architect, Google Cloud Professional, CISSP",
                                    "Project Management: PMP, CSM, SAFe Agilist",
                                    "Marketing: Google Analytics, HubSpot, Facebook Blueprint",
                                    "Finance: CFA, CPA, FRM"
                                ]
                            },
                            {
                                number: 10,
                                title: "Optimize for ATS Parsing",
                                icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                                description: "75% of resumes are rejected by ATS before human review. Ensure yours passes.",
                                atsChecklist: [
                                    "Use standard section headings: Experience, Education, Skills (not creative names)",
                                    "Avoid tables, text boxes, headers/footers, columns",
                                    "Stick to standard fonts: Arial, Calibri, Times New Roman",
                                    "Save as PDF (unless job posting specifies .docx)",
                                    "Include both acronyms and full terms for keywords"
                                ]
                            },
                            {
                                number: 11,
                                title: "Add Relevant Projects & Side Work",
                                icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
                                description: "Especially useful for career changers or those with employment gaps.",
                                format: "Treat projects like jobs: Project Name | Your Role | Dates | 2-3 achievement bullets",
                                example: "Personal Finance App | Solo Developer | Mar 2023 - Aug 2023<br/>• Built full-stack web app using React and Node.js, reaching 10K users in first 3 months<br/>• Implemented OAuth 2.0 authentication and Plaid API for bank account integration"
                            },
                            {
                                number: 12,
                                title: "Leverage Social Proof",
                                icon: <Star className="w-6 h-6 text-orange-600" />,
                                description: "Include awards, recognition, and third-party validation.",
                                examples: [
                                    "Employee of the Year (2023)",
                                    "President's Club (Top 5% of Sales Team)",
                                    "Featured speaker at [Industry Conference]",
                                    "Published in [Industry Publication]"
                                ],
                                placement: "Either in bullets under relevant jobs OR in a dedicated Awards/Recognition section"
                            },
                            {
                                number: 13,
                                title: "Show Collaboration & Leadership",
                                icon: <Users className="w-6 h-6 text-blue-600" />,
                                description: "Even individual contributors should demonstrate teamwork and initiative.",
                                howTo: [
                                    "Mention cross-functional collaboration: 'Partnered with Design, Engineering, and Marketing teams...'",
                                    "Highlight mentorship: 'Onboarded and mentored 3 junior developers'",
                                    "Show initiative beyond your role: 'Led company-wide initiative to improve...'",
                                    "Quantify your team: 'Managed team of 8' or 'Collaborated with 15-person cross-functional team'"
                                ]
                            },
                            {
                                number: 14,
                                title: "Remove Date Clutter",
                                icon: <Clock className="w-6 h-6 text-gray-600" />,
                                description: "Keep dates clean and consistent to maximize readability.",
                                format: "Use 'Month Year - Month Year' format: 'Jan 2020 - Present' (not 01/2020 or January 2020)",
                                rules: [
                                    "For jobs >15 years ago, use year only or omit entirely",
                                    "If employment gap <6 months, use years only to minimize visibility",
                                    "Align all dates consistently (right-aligned is standard)"
                                ]
                            },
                            {
                                number: 15,
                                title: "End with a Strong Skills Section",
                                icon: <Award className="w-6 h-6 text-purple-600" />,
                                description: "Your skills section is scanned by ATS and recruiters. Organize strategically.",
                                structure: {
                                    "Technical Skills": "Programming languages, software, tools (with proficiency levels when relevant)",
                                    "Core Competencies": "Strategic planning, data analysis, project management",
                                    "Certifications": "Professional credentials and licenses",
                                    "Languages": "English (Native), Spanish (Professional), French (Conversational)"
                                },
                                tip: "Put your strongest, most relevant category first. For tech roles: Technical Skills. For leadership roles: Core Competencies."
                            }
                        ].map((strategy, idx) => (
                            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg">
                                            {strategy.number}
                                        </div>
                                        {strategy.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{strategy.title}</h3>
                                        <p className="text-gray-600">{strategy.description}</p>
                                    </div>
                                </div>

                                {strategy.before && strategy.after && (
                                    <div className="ml-14 mt-4 grid md:grid-cols-2 gap-4">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-xs font-bold text-red-900 mb-2">❌ BEFORE:</p>
                                            <p className="text-sm text-red-700">{strategy.before}</p>
                                        </div>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-xs font-bold text-green-900 mb-2">✅ AFTER:</p>
                                            <p className="text-sm text-green-700">{strategy.after}</p>
                                        </div>
                                    </div>
                                )}

                                {strategy.powerVerbs && (
                                    <div className="ml-14 mt-4 grid md:grid-cols-2 gap-3">
                                        {Object.entries(strategy.powerVerbs).map(([category, verbs], vidx) => (
                                            <div key={vidx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                <p className="font-semibold text-blue-900 text-sm mb-2">{category}:</p>
                                                <p className="text-xs text-blue-700">{verbs.join(", ")}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {strategy.examples && (
                                    <div className="ml-14 mt-4 space-y-3">
                                        {strategy.examples.map((ex, eidx) => (
                                            <div key={eidx} className="bg-gray-50 border-l-4 border-orange-500 p-3 rounded-r">
                                                <p className="text-sm text-gray-700"><strong>{ex.scenario}:</strong></p>
                                                <p className="text-sm text-gray-600 mt-1">→ {ex.solution}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {strategy.impact && (
                                    <div className="ml-14 mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                                        <p className="text-sm text-orange-900"><strong>💡 Impact:</strong> {strategy.impact}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="The 30-Minute Resume Boost Challenge"
                content={
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Can you implement 5 boosters in 30 minutes?</h3>
                        <p className="text-gray-700 mb-6">
                            Pick any 5 strategies from the list above and spend just 30 minutes upgrading your resume. You'll be shocked at the difference.
                        </p>
                        <div className="space-y-3">
                            {[
                                { time: "5 min", task: "Replace 10 weak verbs with power verbs", priority: "High" },
                                { time: "10 min", task: "Add quantifiable metrics to your top 5 achievements", priority: "High" },
                                { time: "5 min", task: "Rewrite your professional summary using the proven formula", priority: "High" },
                                { time: "5 min", task: "Reorder bullets—most impressive first in each role", priority: "Medium" },
                                { time: "5 min", task: "Add 3-5 keywords from target job descriptions", priority: "Medium" }
                            ].map((step, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-orange-600 font-bold">{step.time}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{step.task}</p>
                                            <p className="text-sm text-gray-500">Priority: {step.priority}</p>
                                        </div>
                                    </div>
                                    <CheckCircle className="w-6 h-6 text-gray-300" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                <strong>Result:</strong> A noticeably stronger resume that will perform better in ATS and catch recruiter attention faster.
                            </p>
                        </div>
                    </div>
                }
            />

            <ResourceCTA
                title="Boost Your Resume with AI"
                subtitle={
                    <>
                        Ready to supercharge your resume? Use our AI-powered <Link href="https://edit.profresume.com" className="text-orange-600 hover:underline font-semibold">resume builder</Link> to automatically implement these boosting strategies. Or try our <Link href="/resources/ai-resume-review" className="text-orange-600 hover:underline font-semibold">AI resume review</Link> to see exactly where your resume needs improvement.
                    </>
                }
            />
        </div>
    );
}
