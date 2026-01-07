import { Metadata } from 'next';
import { Wrench, ShieldAlert, CheckCircle2, Zap, FileWarning, Lightbulb, TrendingUp, Target, AlertCircle, XCircle, Award, Clock } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Resume Fixer 2026 - Fix Resume Formatting, Gaps & Weak Content | Instant Solutions',
    description: 'Professional resume fixer tool to resolve formatting errors, employment gaps, weak descriptions, and ATS issues. Fix your resume mistakes instantly with expert solutions and examples.',
    keywords: 'resume fixer, repair resume, fix resume formatting, resume gap solutions, fix resume errors, resume repair tool, resume problem solver, fix ats issues',
};

export default function ResumeFixerPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Repair Tool"
                badgeIcon={Wrench}
                title={
                    <>
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Resume Fixer</span>
                    </>
                }
                subtitle="Don't let a broken resume hold you back. Identify and repair structural, stylistic, and content issues that are quietly sabotaging your job search—usually in under 15 minutes."
            />

            <ResourceFeatureGrid
                title="What Can We Fix?"
                features={[
                    {
                        icon: <ShieldAlert className="w-6 h-6" />,
                        title: "ATS-Breaking Formatting",
                        description: "Fix tables, columns, text boxes, and graphics that cause ATS systems to reject your resume."
                    },
                    {
                        icon: <FileWarning className="w-6 h-6" />,
                        title: "Employment Gaps",
                        description: "Strategic solutions for addressing career gaps without lying or drawing unnecessary attention."
                    },
                    {
                        icon: <CheckCircle2 className="w-6 h-6" />,
                        title: "Weak Content",
                        description: "Transform responsibility lists into achievement-based bullets with measurable impact."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Quick Wins",
                        description: "Fix critical issues in 15 minutes—no need to rebuild your entire resume from scratch."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Immediate Results",
                        description: "See improvement in your application response rate starting with your very next submission."
                    },
                    {
                        icon: <Lightbulb className="w-6 h-6" />,
                        title: "Expert Guidance",
                        description: "Step-by-step fixes based on what actually works—not generic advice."
                    }
                ]}
            />

            <ResourceContentSection
                title="Is Your Resume Broken?"
                content={
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            A "broken" resume is any document that fails to pass through ATS systems or fails to engage a recruiter within 6 seconds—regardless of how qualified you are. Our <strong>Resume Fixer</strong> approach focuses on the most common failure points that cost job seekers thousands of missed opportunities.
                        </p>
                        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                            <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                The Hidden Cost of Resume Problems
                            </h4>
                            <p className="text-gray-700 mb-2">
                                If you're applying to 50+ jobs with less than 10% callback rate, your resume likely has fixable issues. <strong>Most people don't realize their resume is broken until they've wasted months of job searching.</strong>
                            </p>
                            <p className="text-gray-600 text-sm">
                                The good news? Most resume problems can be fixed in 15-30 minutes once you know what to look for.
                            </p>
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="The 10 Most Common Resume Problems (And How to Fix Them)"
                content={
                    <div className="space-y-6">
                        {[
                            {
                                number: 1,
                                problem: "ATS-Breaking Format (Tables, Columns, Text Boxes)",
                                severity: "Critical",
                                symptoms: "Zero callbacks despite being qualified. ATS literally can't read your resume.",
                                diagnosis: "You're using Word tables for layout, fancy columns, or design templates with text boxes.",
                                fix: "Immediately convert to simple, single-column format. Copy all content to plain text, then rebuild using our ATS-friendly templates. Yes, this means sacrificing 'creative' designs.",
                                timeToFix: "30-45 min"
                            },
                            {
                                number: 2,
                                problem: "Unexplained Employment Gaps",
                                severity: "High",
                                symptoms: "Recruiters skip over you or ask pointed questions about gaps in screening calls.",
                                diagnosis: "You have 3+ month gaps between jobs with no explanation.",
                                fix: "Three strategies: 1) Use years only (2020-2021 vs Jan-Apr 2020), 2) Add context in a brief note ('Career break for family care' or 'Professional development/freelance work'), 3) Show what you did during gap (courses, volunteer work, freelance projects).",
                                timeToFix: "10-15 min"
                            },
                            {
                                number: 3,
                                problem: "Responsibility Lists Instead of Achievements",
                                severity: "High",
                                symptoms: "You get interviews but not offers. Your resume doesn't compel=action.",
                                diagnosis: "Your bullets read like job descriptions: 'Responsible for managing...', 'Tasked with...'",
                                fix: "Use the XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z].' Example: Before: 'Managed social media accounts.' After: 'Grew Instagram from 5K to 250K followers in 8 months (5000% growth) by implementing data-driven content strategy and influencer partnerships.'",
                                timeToFix: "20-30 min"
                            },
                            {
                                number: 4,
                                problem: "Missing or Weak Quantification",
                                severity: "High",
                                symptoms: "Recruiters can't gauge your actual impact. Generic-looking accomplishments.",
                                diagnosis: "Few or no numbers, percentages, or dollar amounts in your experience bullets.",
                                fix: "Go through each bullet and add metrics. If you don't have exact numbers, use: team size ('Led team of 12'), timeframe ('Reduced processing time from 4 hours to 30 minutes'), scope ('Managed $500K budget'), or growth ('Increased efficiency 40%').",
                                timeToFix: "15-20 min"
                            },
                            {
                                number: 5,
                                problem: "Generic or Missing Professional Summary",
                                severity: "Medium",
                                symptoms: "Recruiters can't quickly tell what role you're targeting or why you're qualified.",
                                diagnosis: "Your summary says things like 'Hardworking professional seeking opportunities' or you have no summary.",
                                fix: "Write a targeted 2-3 sentence summary: '[Job Title] with [X years] in [Industry/Specialty] | [Top achievement with metric] | Expert in [Key Skills]'. Example: 'Senior Product Manager with 8 years in SaaS | Led 15+ product launches reaching 5M users | Expert in agile methodologies, user research, and data-driven decision making.'",
                                timeToFix: "10 min"
                            },
                            {
                                number: 6,
                                problem: "Inconsistent Formatting",
                                severity: "Medium",
                                symptoms: "Resume looks unprofessional and careless.",
                                diagnosis: "Mixed date formats, different fonts, inconsistent bullet styles, varying spacing.",
                                fix: "Pick ONE format for everything and apply uniformly: Dates (Jan 2020 - Present), Bullets (all • or all -), Fonts (one font family maximum), Spacing (consistent between sections).",
                                timeToFix: "15-20 min"
                            },
                            {
                                number: 7,
                                problem: "Too Long (3+ Pages) or Too Short",
                                severity: "Medium",
                                symptoms: "Recruiters lose interest (too long) or don't take you seriously (too short).",
                                diagnosis: "You're including irrelevant old experience OR you're not providing enough detail on recent roles.",
                                fix: "Target: 1 page (0-10 years experience), 2 pages (10+ years). Cut: jobs from 15+ years ago (unless highly relevant), irrelevant early career roles, generic skills. Add: more detail on last 5-10 years, quantified achievements, relevant projects.",
                                timeToFix: "20-30 min"
                            },
                            {
                                number: 8,
                                problem: "Weak Action Verbs",
                                severity: "Medium",
                                symptoms: "Resume sounds passive and unimpressive despite good experience.",
                                diagnosis: "You start bullets with: 'Responsible for', 'Was tasked with', 'Helped with', 'Assisted in'.",
                                fix: "Replace with strong action verbs: Led, Spearheaded, Increased, Reduced, Built, Launched, Optimized, Transformed, Generated, Achieved. Go through EVERY bullet and strengthen the opening verb.",
                                timeToFix: "10-15 min"
                            },
                            {
                                number: 9,
                                problem: "Missing Keywords for Target Role",
                                severity: "High",
                                symptoms: "ATS filters you out even though you're qualified.",
                                diagnosis: "Your resume doesn't include industry-specific terms from job descriptions.",
                                fix: "Use our <a href='/resources/resume-keyword-generator' class='text-red-600 underline font-semibold'>keyword generator</a> to extract terms from your target job descriptions. Naturally integrate top 10-15 keywords into your summary, bullets, and skills section. Use both acronyms and full terms (SEO and Search Engine Optimization).",
                                timeToFix: "15-20 min"
                            },
                            {
                                number: 10,
                                problem: "Typos and Grammar Errors",
                                severity: "Critical",
                                symptoms: "Instant rejection. Signals carelessness.",
                                diagnosis: "Misspelled words, especially in company names, your own job title, or common industry terms.",
                                fix: "1) Run spell-check, 2) Read resume backwards (catches more errors), 3) Use Grammarly or similar tool, 4) Have someone else proofread, 5) Read aloud slowly. Pay special attention to: company names, your job titles, technical terms, dates.",
                                timeToFix: "15-20 min"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-300 transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        {item.number}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg">{item.problem}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                                                    item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {item.severity}
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <p className="font-semibold text-gray-700">🎯 Symptoms:</p>
                                                <p className="text-gray-600">{item.symptoms}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-700">🔍 Diagnosis:</p>
                                                <p className="text-gray-600">{item.diagnosis}</p>
                                            </div>
                                            <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded-r">
                                                <p className="font-semibold text-green-900 mb-1">✅ Fix:</p>
                                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.fix }} />
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span><strong>Time to fix:</strong> {item.timeToFix}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="The 15-Minute Resume Emergency Fix"
                content={
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">🚨 Need to apply TODAY? Quick priority fixes:</h3>
                        <p className="text-gray-700 mb-6">
                            If you have a deadline and can't do a full resume overhaul, tackle these 5 fixes in order of impact. You'll dramatically improve your chances in just 15 minutes.
                        </p>
                        <div className="space-y-3">
                            {[
                                {
                                    priority: 1,
                                    fix: "Remove ALL tables, text boxes, and columns",
                                    why: "Critical - ATS can't read these. This alone could be blocking 100% of your applications.",
                                    time: "5 min"
                                },
                                {
                                    priority: 2,
                                    fix: "Triple-check for typos in company names and your job titles",
                                    why: "Instant rejection if recruiter spots careless errors.",
                                    time: "2 min"
                                },
                                {
                                    priority: 3,
                                    fix: "Add 3-5 quantified metrics to your top achievements",
                                    why: "Numbers make your accomplishments credible and impressive.",
                                    time: "5 min"
                                },
                                {
                                    priority: 4,
                                    fix: "Rewrite your professional summary with specific job title + top metric",
                                    why: "First thing recruiters read—make it count.",
                                    time: "2 min"
                                },
                                {
                                    priority: 5,
                                    fix: "Ensure date formatting is consistent throughout",
                                    why: "Inconsistency signals lack of attention to detail.",
                                    time: "1 min"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white border-l-4 border-red-600 rounded-r-lg p-4 flex gap-4">
                                    <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                        {item.priority}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 mb-1">{item.fix}</h4>
                                        <p className="text-sm text-gray-600 mb-1"><strong>Why:</strong> {item.why}</p>
                                        <p className="text-xs text-gray-500"><strong>Time:</strong> {item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 bg-red-100 border border-red-300 rounded-lg p-4">
                            <p className="text-sm text-red-900">
                                <strong>Total time: ~15 minutes.</strong> These fixes alone can increase your callback rate from 5% to 20%+. For deeper optimization, tackle the full top 10 list above.
                            </p>
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
                                q: "How do I know if my resume is broken?",
                                a: "Three red flags: 1) Less than 10% callback rate after 20+ applications to jobs you're qualified for, 2) You're using tables/columns/graphics in your layout, 3) Your bullets list responsibilities instead of achievements. If any apply, your resume needs fixing."
                            },
                            {
                                q: "Can I fix my resume without starting from scratch?",
                                a: "Absolutely! Most resume problems don't require a complete rebuild. Use the 15-minute emergency fix above for immediate improvement, then gradually tackle the top 10 issues. Only 'unfixable' resumes are those with corrupt files or heavy design elements that must be stripped completely."
                            },
                            {
                                q: "What's the #1 most damaging resume mistake?",
                                a: "ATS-incompatible formatting (tables, columns, text boxes). This alone causes 75%+ rejection before human eyes ever see your resume. Fix this first—it's non-negotiable."
                            },
                            {
                                q: "How do I address employment gaps honestly?",
                                a: "Three approaches: 1) Use year-only dates (2020-2022 vs Jan 2020 - Mar 2022) to minimize visibility of short gaps, 2) Add brief context ('Career break: Family care' or 'Professional development'), 3) Include what you did (courses, freelance, volunteer work). Never lie, but you don't need to draw attention to gaps either."
                            },
                            {
                                q: "Should I hire a professional resume writer to fix my resume?",
                                a: "Depends on complexity. For technical fixes (formatting, ATS, grammar), use our free tools and guides—saves $100-300. For career pivots, senior roles, or complete career repositioning, a professional writer provides strategic value. Start with DIY fixes; upgrade if needed."
                            },
                            {
                                q: "How longdoes it take to properly fix a broken resume?",
                                a: "Emergency fixes: 15 minutes. Thorough overhaul addressing all top 10 issues: 2-4 hours spread over a few days. Complete rebuild with strategic repositioning: 1-2 weeks. Most people see dramatic improvement after just 1-2 hours of focused work."
                            },
                            {
                                q: "Can AI tools fix my resume automatically?",
                                a: "AI tools can identify problems and suggest fixes, but you still need to implement them. Use our <Link href='/resources/ai-resume-review' className='text-red-600 underline font-semibold'>AI resume review</Link> to diagnose issues, then follow our fixing guides to resolve them. Think of AI as the diagnostic tool, you're the mechanic."
                            },
                            {
                                q: "What if I fix everything and still get no callbacks?",
                                a: "If you've confirmed your resume is technically sound (ATS-friendly, no typos, achievement-based), the issue may be: 1) Applying to wrong-fit roles, 2) Poor keyword matching (use our <Link href='/resources/resume-keyword-generator' className='text-red-600 underline font-semibold'>keyword generator</Link>), 3) Weak network/referrals (80% of jobs filled through connections), or 4) Market timing/location mismatch."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                                <h4 className="font-semibold text-gray-900 text-lg mb-3">{faq.q}</h4>
                                <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceCTA
                title="Ready to Fix Your Resume?"
                subtitle={
                    <>
                        Use our <Link href="https://edit.profresume.com" className="text-red-600 hover:underline font-semibold">ATS-friendly resume builder</Link> with automatic formatting fixes, or get instant feedback with our <Link href="/resources/resume-checker" className="text-red-600 hover:underline font-semibold">free resume checker</Link>.
                    </>
                }
            />
        </div>
    );
}
