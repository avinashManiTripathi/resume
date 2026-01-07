import { Metadata } from 'next';
import { CheckCircle2, Layout, Smartphone, FileCheck, ShieldCheck, Zap, AlertCircle, Clock, TrendingUp, Target, Search, Award, XCircle } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Resume Checker 2026 - ATS Compatibility Scanner & Error Detector | Instant Results',
    description: 'Free online resume checker that scans for formatting errors, typos, ATS compatibility issues, and weak content. Get instant feedback and fix issues before applying. Check your resume in 30 seconds.',
    keywords: 'resume checker, free resume scanner, online resume review, resume builder checker, ats compatibility checker, resume error detector, resume formatting check, resume quality checker',
};

export default function ResumeCheckerPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Professional Tool"
                badgeIcon={CheckCircle2}
                title={
                    <>
                        Free Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Resume Checker</span>
                    </>
                }
                subtitle="Instantly catch formatting errors, typos, and ATS compatibility issues. Scan your resume in 30 seconds and get actionable feedback to ensure it's flawless before you hit send."
            />

            <ResourceFeatureGrid
                title="Why Use a Resume Checker?"
                features={[
                    {
                        icon: <Clock className="w-6 h-6" />,
                        title: "30-Second Scan",
                        description: "Instant analysis with detailed feedback on what needs fixing. No waiting for manual reviews."
                    },
                    {
                        icon: <Layout className="w-6 h-6" />,
                        title: "Format Validation",
                        description: "Ensure your layout is machine-readable and displays correctly across all PDF viewers and ATS systems."
                    },
                    {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "ATS Compatibility",
                        description: "Test how your resume performs against Applicant Tracking Systems that filter 75% of applications."
                    },
                    {
                        icon: <FileCheck className="w-6 h-6" />,
                        title: "Error Detection",
                        description: "Catch typos, inconsistent formatting, missing sections, and broken links that spell-check misses."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Impact Score",
                        description: "Get a quantitative score based on content strength, keywords, and achievement-focus."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Actionable Feedback",
                        description: "Not just what's wrong—specific suggestions on exactly how to fix every issue."
                    }
                ]}
            />

            <ResourceContentSection
                title="Don't Let Simple Mistakes Cost You the Job"
                content={
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Recruiters spend an average of only <strong>6 seconds</strong> looking at a resume. If they spot a typo, formatting glitch, or ATS issue, your application is likely headed for the rejection pile—no matter how qualified you are. A <strong>free resume checker</strong> helps you eliminate these risks before it's too late.
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                            <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                The Harsh Reality
                            </h4>
                            <p className="text-gray-700 mb-3">
                                <strong>76% of resumes are rejected immediately for typos or formatting errors.</strong> Most job seekers don't even know their resume has issues until they've applied to 50+ jobs with zero callbacks.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Using a resume checker before each application ensures you're always putting your best foot forward.
                            </p>
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="What Our Resume Checker Analyzes"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            A professional resume check covers multiple critical areas. Here's what our checker evaluates:
                        </p>
                        <div className="space-y-5">
                            {[
                                {
                                    category: "1. Technical Health & Formatting",
                                    icon: <Layout className="w-6 h-6 text-green-600" />,
                                    checks: [
                                        {
                                            item: "File format compatibility",
                                            details: "PDF vs DOCX compatibility, ensuring no corruption"
                                        },
                                        {
                                            item: "Font consistency",
                                            details: "Same font family throughout, readable sizes (10-12pt body text)"
                                        },
                                        {
                                            item: "Margin alignment",
                                            details: "Proper spacing (0.5-1 inch margins), no text cut-off"
                                        },
                                        {
                                            item: "Date formatting",
                                            details: "Consistent format throughout (e.g., 'Jan 2020' or '01/2020'—never mixed)"
                                        },
                                        {
                                            item: "Bullet point consistency",
                                            details: "Same bullet style (•, -, or ◦) across entire document"
                                        },
                                        {
                                            item: "Page length",
                                            details: "1 page for 0-10 years experience, 2 pages for 10+ years"
                                        }
                                    ]
                                },
                                {
                                    category: "2. ATS Compatibility",
                                    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
                                    checks: [
                                        {
                                            item: "Parseable structure",
                                            details: "No tables, text boxes, headers/footers, or columns that confuse ATS"
                                        },
                                        {
                                            item: "Standard section headings",
                                            details: "'Experience', 'Education', 'Skills'—not creative names like 'My Journey'"
                                        },
                                        {
                                            item: "Hidden text detection",
                                            details: "No white text, watermarks, or graphics with embedded text"
                                        },
                                        {
                                            item: "Contact information placement",
                                            details: "Phone, email, LinkedIn in standard top location"
                                        },
                                        {
                                            item: "Keyword density",
                                            details: "Sufficient industry keywords without stuffing"
                                        }
                                    ]
                                },
                                {
                                    category: "3. Content Quality",
                                    icon: <FileCheck className="w-6 h-6 text-purple-600" />,
                                    checks: [
                                        {
                                            item: "Achievement vs. responsibility ratio",
                                            details: "At least 70% achievement-focused bullets with measurable outcomes"
                                        },
                                        {
                                            item: "Action verb strength",
                                            details: "Strong verbs (Led, Increased, Built) vs weak passive phrases"
                                        },
                                        {
                                            item: "Quantification",
                                            details: "Numbers, percentages, dollar amounts throughout"
                                        },
                                        {
                                            item: "Professional summary",
                                            details: "Compelling 2-4 sentence summary with metrics"
                                        },
                                        {
                                            item: "Keywords for target role",
                                            details: "Industry-specific terms and required skills present"
                                        }
                                    ]
                                },
                                {
                                    category: "4. Grammar & Spelling",
                                    icon: <Search className="w-6 h-6 text-orange-600" />,
                                    checks: [
                                        {
                                            item: "Typos and misspellings",
                                            details: "Including commonly confused words (e.g., 'lead' vs 'led')"
                                        },
                                        {
                                            item: "Grammar errors",
                                            details: "Subject-verb agreement, tense consistency"
                                        },
                                        {
                                            item: "Punctuation",
                                            details: "Consistent use of periods at end of bullets (all or none)"
                                        },
                                        {
                                            item: "Capitalization",
                                            details: "Job titles, company names, proper nouns"
                                        },
                                        {
                                            item: "Pronoun usage",
                                            details: "No first-person pronouns (I, me, my, we)"
                                        }
                                    ]
                                },
                                {
                                    category: "5. Completeness Check",
                                    icon: <CheckCircle2 className="w-6 h-6 text-teal-600" />,
                                    checks: [
                                        {
                                            item: "Contact information",
                                            details: "Name, phone, email, location, LinkedIn (all working)"
                                        },
                                        {
                                            item: "Experience section",
                                            details: "All former roles have: company, title, dates, 3-5 bullets"
                                        },
                                        {
                                            item: "Education section",
                                            details: "Degree, institution, graduation date (or expected)"
                                        },
                                        {
                                            item: "Skills section",
                                            details: "Relevant technical and soft skills listed"
                                        },
                                        {
                                            item: "Date ranges",
                                            details: "No unexplained employment gaps over 3 months"
                                        }
                                    ]
                                }
                            ].map((section, idx) => (
                                <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        {section.icon}
                                        <h3 className="font-bold text-gray-900 text-lg">{section.category}</h3>
                                    </div>
                                    <div className="ml-9 space-y-3">
                                        {section.checks.map((check, cidx) => (
                                            <div key={cidx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{check.item}</p>
                                                    <p className="text-xs text-gray-600">{check.details}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Common Issues Found by Resume Checkers"
                content={
                    <div className="space-y-4">
                        {[
                            {
                                issue: "Inconsistent Date Formatting",
                                severity: "High",
                                example: "Jan 2020 - Present mixed with 03/2018 - 12/2019",
                                fix: "Choose ONE format and apply throughout. Recommended: 'Month Year' (e.g., 'Jan 2020')"
                            },
                            {
                                issue: "Tables and Text Boxes",
                                severity: "Critical",
                                example: "Using Word tables to create columns or text boxes for sections",
                                fix: "Remove all tables and text boxes. Use simple, single-column layout with standard text formatting."
                            },
                            {
                                issue: "Missing Metrics",
                                severity: "High",
                                example: "'Improved team productivity' without numbers",
                                fix: "Add quantification: 'Improved team productivity 40%, reducing project delivery time from 8 to 5 weeks'"
                            },
                            {
                                issue: "Generic Professional Summary",
                                severity: "Medium",
                                example: "'Hardworking professional seeking new opportunities'",
                                fix: "Specific: 'Data Scientist with 6 years building ML models that increased prediction accuracy 35% and reduced costs $2M annually'"
                            },
                            {
                                issue: "Typos in Company Names or Titles",
                                severity: "Critical",
                                example: "'Gogle' instead of 'Google' or 'Manger' instead of 'Manager'",
                                fix: "Triple-check every company name and job title. Have someone else proofread."
                            },
                            {
                                issue: "Broken or Missing Contact Information",
                                severity: "Critical",
                                example: "LinkedIn link doesn't work, email has typo, missing phone number",
                                fix: "Verify ALL links open correctly. Test your email by sending yourself a message."
                            },
                            {
                                issue: "Non-Standard Section Names",
                                severity: "High",
                                example: "'My Career Journey' instead of 'Experience'",
                                fix: "Use standard headings ATS systems recognize: Experience, Education, Skills, Certifications"
                            },
                            {
                                issue: "Inconsistent Bullet Points",
                                severity: "Medium",
                                example: "Some bullets end with periods, others don't",
                                fix: "Choose: ALL bullets have periods OR NONE have periods. Be 100% consistent."
                            },
                            {
                                issue: "Weak Action Verbs",
                                severity: "Medium",
                                example: "'Was responsible for managing' or 'Helped with'",
                                fix: "Use strong verbs: 'Managed', 'Led', 'Spearheaded', 'Increased', 'Reduced', 'Built'"
                            },
                            {
                                issue: "Too Long or Too Short",
                                severity: "Medium",
                                example: "3 pages for mid-level role OR half a page for 10 years experience",
                                fix: "Target: 1 page (0-10 years), 2 pages (10+ years). Every line should add value."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-50 border-l-4 border-orange-500 rounded-r-lg p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-red-600" />
                                        {item.issue}
                                    </h4>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                                            item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {item.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong> {item.example}</p>
                                <p className="text-sm text-gray-700"><strong>✅ Fix:</strong> {item.fix}</p>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="How to Use a Resume Checker Effectively"
                content={
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Best Practices for Resume Checking</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    step: "1. Check BEFORE every application",
                                    tip: "Don't assume your resume is still perfect from last time. Jobs evolve, and so should your resume."
                                },
                                {
                                    step: "2. Run multiple checker tools",
                                    tip: "Different tools catch different issues. Use 2-3 checkers for comprehensive coverage."
                                },
                                {
                                    step: "3. Fix issues in order of severity",
                                    tip: "Critical issues first (broken ATS, typos), then high (missing metrics), then medium (weak verbs)."
                                },
                                {
                                    step: "4. Recheck after every edit",
                                    tip: "Sometimes fixing one issue creates another. Always run a final check before saving your PDF."
                                },
                                {
                                    step: "5. Get a human second opinion",
                                    tip: "After automated checking, have someone else read it. Humans catch context issues machines miss."
                                },
                                {
                                    step: "6. Save a checklist-approved version",
                                    tip: "Name your file: 'FirstName_LastName_Resume_Checked_Jan2026.pdf' so you know it's been vetted."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-blue-200">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.step.replace(/^\d+\.\s/, '')}</p>
                                        <p className="text-sm text-gray-600 mt-1">{item.tip}</p>
                                    </div>
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
                                q: "How accurate are resume checkers?",
                                a: "Automated resume checkers are highly accurate (95%+) for technical issues like formatting, ATS compatibility, and grammar. However, they're less effective at evaluating subjective elements like narrative quality or career positioning. Use checkers for technical validation, then get human feedback for strategic advice."
                            },
                            {
                                q: "Are free resume checkers as good as paid ones?",
                                a: "Free checkers are excellent for basic scans—grammar, formatting, ATS issues. Paid checkers often add deeper analysis (keyword optimization, industry benchmarking, custom feedback). For most job seekers, free checkers provide sufficient value. Upgrade if you're in a competitive field or senior role."
                            },
                            {
                                q: "How often should I check my resume?",
                                a: "Check your resume in three scenarios: 1) Before EVERY application (catch any accidental changes), 2) After significant updates (new job, certification, skills), 3) Quarterly maintenance (even if not actively job searching). Takes 30 seconds and prevents embarrassing errors."
                            },
                            {
                                q: "Will checking my resume guarantee I pass ATS?",
                                a: "While no tool can guarantee 100% ATS success (systems vary), a good resume checker dramatically increases your odds from ~25% pass rate to 70-80%. The key is following ALL recommendations, especially around formatting and standard section names."
                            },
                            {
                                q: "What's the difference between a resume checker and resume scanner?",
                                a: "A <strong>resume checker</strong> finds errors and issues to fix. A <strong><Link href='/resources/resume-scanner' className='text-green-600 underline font-semibold'>resume scanner</Link></strong> simulates how ATS systems parse your data. Use both: checker first to fix problems, then scanner to verify ATS can read it correctly."
                            },
                            {
                                q: "Can I trust automated grammar checking?",
                                a: "Automated grammar tools catch 85-90% of errors but aren't perfect. They miss context-specific mistakes (e.g., 'led' vs 'lead') and industry jargon. Always do a manual proofread AND have someone else review—humans catch what machines miss."
                            },
                            {
                                q: "Do resume checkers work for all industries?",
                                a: "Yes, core checks (formatting, ATS, grammar) apply universally. However, keyword and content recommendations may be generic. For specialized fields (academia, creative industries, tech), supplement automated checking with industry-specific resources or human experts."
                            },
                            {
                                q: "What if my checker finds 20+ issues?",
                                a: "Don't panic! Most resumes have 15-30 improvable items on first check. Tackle systematically: 1) Critical issues first (ATS blockers, typos), 2) High priority (missing metrics, weak verbs), 3) Medium (minor formatting tweaks). You'll see dramatic improvement after addressing just the top 10."
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
                title="Is Your Resume Ready? Check It Now"
                subtitle={
                    <>
                        Get instant feedback on your resume in 30 seconds. Use our free <Link href="https://edit.profresume.com" className="text-green-600 hover:underline font-semibold">resume builder</Link> with built-in checking, or try our <Link href="/resources/ai-resume-review" className="text-green-600 hover:underline font-semibold">AI resume review</Link> for comprehensive analysis.
                    </>
                }
            />
        </div>
    );
}
