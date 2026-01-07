import { Metadata } from 'next';
import { Search, Eye, MessageSquare, AlertTriangle, CheckCircle, Lightbulb, Star, TrendingUp, FileText, Award, XCircle, Users } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Professional Resume Critique Service 2026 - Expert Resume Review & Feedback',
    description: 'Get comprehensive professional resume critique and feedback. Expert analysis of your resume structure, content, formatting, and ATS compatibility. Improve your interview rate by 250%.',
    keywords: 'resume critique, resume feedback, professional resume analysis, resume review guide, resume evaluation, expert resume review, resume assessment',
};

export default function ResumeCritiquePage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Expert Analysis"
                badgeIcon={Search}
                title={
                    <>
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Resume Critique</span>
                    </>
                }
                subtitle="Get objective, actionable feedback on your resume. Our comprehensive critique framework identifies hidden weaknesses and untapped opportunities to maximize your interview rate."
            />

            <ResourceFeatureGrid
                title="What Makes Our Critique Effective"
                features={[
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "250% More Interviews",
                        description: "Candidates who apply critique feedback see dramatic improvements in callback rates."
                    },
                    {
                        icon: <Eye className="w-6 h-6" />,
                        title: "Recruiter Perspective",
                        description: "We analyze your resume exactly how hiring managers and recruiters review it—in 6 seconds or less."
                    },
                    {
                        icon: <MessageSquare className="w-6 h-6" />,
                        title: "Actionable Feedback",
                        description: "Not just what's wrong, but specifically how to fix it with examples and templates."
                    },
                    {
                        icon: <AlertTriangle className="w-6 h-6" />,
                        title: "Red Flag Detection",
                        description: "Identify employment gaps, formatting issues, and content problems before recruiters do."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "ATS Compatibility",
                        description: "Ensure your resume passes Applicant Tracking Systems that filter 75% of applications."
                    },
                    {
                        icon: <Lightbulb className="w-6 h-6" />,
                        title: "Industry Insights",
                        description: "Get best practices specific to your industry and career level."
                    }
                ]}
            />

            <ResourceContentSection
                title="The 10-Point Professional Critique Framework"
                content={
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Every professional resume critique should evaluate these 10 critical elements. Use this framework to perform your own self-assessment:
                        </p>
                        {[
                            {
                                title: "1. First Impression (The 6-Second Test)",
                                icon: <Eye className="w-6 h-6 text-purple-600" />,
                                description: "Can someone determine your target role and top 3 qualifications in 6 seconds?",
                                checkpoints: [
                                    "Clear professional title at the top",
                                    "Most impressive achievement visible without scrolling",
                                    "Clean, professional formatting that guides the eye",
                                    "Appropriate use of white space and visual hierarchy"
                                ],
                                badExample: "No clear title, wall of text, inconsistent formatting",
                                goodExample: "'Senior Product Manager | 8 Years | Increased Revenue $50M' with clean layout"
                            },
                            {
                                title: "2. Professional Summary",
                                icon: <FileText className="w-6 h-6 text-purple-600" />,
                                description: "Does your summary immediately communicate value?",
                                checkpoints: [
                                    "Includes years of experience and specialty",
                                    "Contains quantifiable achievement (numbers, percentages)",
                                    "Uses keywords relevant to target positions",
                                    "2-4 sentences maximum—concise but powerful"
                                ],
                                badExample: "'Hardworking professional seeking new opportunities'",
                                goodExample: "'Data Scientist with 6 years building ML models that increased prediction accuracy 35% and reduced costs $2M annually'"
                            },
                            {
                                title: "3. Achievement vs. Responsibility",
                                icon: <Star className="w-6 h-6 text-purple-600" />,
                                description: "Are you showing what you accomplished or just what you were supposed to do?",
                                checkpoints: [
                                    "70% of bullets should be achievement-focused",
                                    "Each bullet answers 'So what?' with a measurable outcome",
                                    "Uses strong action verbs (Led, Increased, Reduced, Built)",
                                    "Includes specific metrics, percentages, or dollar amounts"
                                ],
                                badExample: "'Responsible for managing social media accounts'",
                                goodExample: "'Grew Instagram following from 5K to 250K in 8 months, increasing engagement rate from 2.1% to 6.8%'"
                            },
                            {
                                title: "4. Keywords & ATS Optimization",
                                icon: <Search className="w-6 h-6 text-purple-600" />,
                                description: "Will your resume pass automated applicant tracking systems?",
                                checkpoints: [
                                    "Includes industry-standard job titles (not internal company jargon)",
                                    "Uses both acronyms and full terms (SEO and Search Engine Optimization)",
                                    "Avoids tables, text boxes, headers/footers that confuse ATS",
                                    "Standard section headings (Experience, Education, Skills)"
                                ],
                                badExample: "Creative section names like 'My Journey' or 'Cool Stuff I Did'",
                                goodExample: "Standard 'Professional Experience' with consistent formatting"
                            },
                            {
                                title: "5. Formatting & Readability",
                                icon: <Eye className="w-6 h-6 text-purple-600" />,
                                description: "Is your resume easy to scan and pleasant to read?",
                                checkpoints: [
                                    "Consistent fonts (maximum 2 font families)",
                                    "Appropriate font size (10-12pt for body, 14-16pt for name)",
                                    "Adequate margins (0.5-1 inch)",
                                    "Strategic use of bold, italics (not overdone)"
                                ],
                                badExample: "5 different fonts, tiny margins, decorative graphics",
                                goodExample: "Clean Arial or Calibri, clear hierarchy, professional spacing"
                            },
                            {
                                title: "6. Quantification & Metrics",
                                icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
                                description: "Have you quantified your impact?",
                                checkpoints: [
                                    "Each role has at least 2-3 quantified achievements",
                                    "Uses specific numbers, not vague terms ('many', 'several')",
                                    "Provides context (increased sales 40% = $2M in new revenue)",
                                    "Compares before and after when possible"
                                ],
                                badExample: "'Improved team productivity significantly'",
                                goodExample: "'Reduced project delivery time from 8 weeks to 5 weeks (38% improvement), saving $50K annually'"
                            },
                            {
                                title: "7. Brevity & Relevance",
                                icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
                                description: "Is every word earning its place on the page?",
                                checkpoints: [
                                    "1 page for 0-10 years experience, 2 pages for 10+ years",
                                    "No pronouns (I, me, my) needed",
                                    "Removed jobs from 15+ years ago (unless highly relevant)",
                                    "No generic skills like 'Microsoft Office' for senior roles"
                                ],
                                badExample: "3-page resume for mid-level role, including high school jobs",
                                goodExample: "Focused 1-2 pages highlighting last 10-15 years of relevant experience"
                            },
                            {
                                title: "8. Employment Timeline",
                                icon: <FileText className="w-6 h-6 text-purple-600" />,
                                description: "Is your career progression clear and logical?",
                                checkpoints: [
                                    "No unexplained gaps longer than 3 months",
                                    "Dates are consistent and complete (Month Year format)",
                                    "Shows progression and increased responsibility over time",
                                    "Handles career changes/pivots with context"
                                ],
                                badExample: "Missing dates, 2-year unexplained gap, job-hopping every 6 months",
                                goodExample: "Clear progression: Analyst → Senior Analyst → Manager over 8 years"
                            },
                            {
                                title: "9. Skills Section",
                                icon: <Award className="w-6 h-6 text-purple-600" />,
                                description: "Are your skills strategically presented?",
                                checkpoints: [
                                    "Grouped by category (Technical, Leadership, Language)",
                                    "Lists proficiency levels when relevant",
                                    "Includes both hard and soft skills",
                                    "Prioritizes skills mentioned in target job descriptions"
                                ],
                                badExample: "Random list: 'Excel, Leadership, Spanish, Python'",
                                goodExample: "Technical: Python (Expert), SQL (Advanced), Tableau (Intermediate)"
                            },
                            {
                                title: "10. Overall Narrative",
                                icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
                                description: "Does your resume tell a compelling career story?",
                                checkpoints: [
                                    "Clear theme/specialization emerges",
                                    "Shows consistent skill development",
                                    "Demonstrates increasing impact over time",
                                    "Positions you for the next logical step in your career"
                                ],
                                badExample: "Scattered experiences with no clear direction",
                                goodExample: "Clear evolution from developer → team lead → engineering manager"
                            }
                        ].map((point, index) => (
                            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">{point.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                                        <p className="text-gray-600 mb-4">{point.description}</p>
                                    </div>
                                </div>
                                <div className="ml-10">
                                    <h4 className="font-semibold text-gray-900 mb-2">✓ Checkpoints:</h4>
                                    <ul className="space-y-1 mb-4">
                                        {point.checkpoints.map((checkpoint, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>{checkpoint}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="font-semibold text-red-900 mb-1">❌ Bad Example:</p>
                                            <p className="text-red-700">{point.badExample}</p>
                                        </div>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <p className="font-semibold text-green-900 mb-1">✅ Good Example:</p>
                                            <p className="text-green-700">{point.goodExample}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="Common Resume Mistakes (And How to Fix Them)"
                content={
                    <div className="space-y-4">
                        {[
                            {
                                mistake: "Using an Objective Statement",
                                why: "Objectives are outdated and focus on what YOU want, not what you offer the employer.",
                                fix: "Replace with a powerful professional summary highlighting your value proposition and key achievements. Example: 'Digital Marketing Manager with 7 years driving 200%+ ROI through data-driven campaigns.'"
                            },
                            {
                                mistake: "Job Description Copy-Paste",
                                why: "Listing responsibilities shows what you were supposed to do, not what you actually accomplished.",
                                fix: "Transform every bullet into an achievement with a measurable outcome. Add the result: 'what changed because of your work?'"
                            },
                            {
                                mistake: "Missing Contact Information",
                                why: "Surprisingly common! LinkedIn profiles, phone numbers with typos, outdated email addresses.",
                                fix: "Include: Full name, phone, professional email, LinkedIn URL, location (city/state). Double-check everything works."
                            },
                            {
                                mistake: "Inconsistent Formatting",
                                why: "Different fonts, alignment, or date formats make you look careless and unprofessional.",
                                fix: "Choose one format for dates (e.g., 'Jan 2020 – Present') and stick to it throughout. Same with bullet styles, spacing, and indentation."
                            },
                            {
                                mistake: "Vague or Generic Language",
                                why: "'Responsible for', 'helped with', 'assisted in'—these phrases add zero value.",
                                fix: "Use strong action verbs: Led, Built, Increased, Reduced, Launched, Optimized. Be specific: 'Led team of 12' not 'led a team.'"
                            },
                            {
                                mistake: "Irrelevant Information",
                                why: "High school info, hobbies, headshots, age, marital status—none belong on a modern resume.",
                                fix: "Focus exclusively on professional qualifications relevant to your target role. Use the space for more achievements instead."
                            },
                            {
                                mistake: "Typos and Grammatical Errors",
                                why: "76% of resumes are rejected immediately for typos. It signals lack of attention to detail.",
                                fix: "Proofread 3 times. Use Grammarly. Have someone else review it. Read it backwards. Check company names and dates are correct."
                            },
                            {
                                mistake: "Lying or Exaggerating",
                                why: "Claims like 'increased revenue 500%' that can't be backed up will backfire in interviews.",
                                fix: "Be honest. If you don't have metrics, describe your scope and process: 'Managed budget of $500K, overseeing vendor relationships for 15 retail locations.'"
                            },
                            {
                                mistake: "One-Size-Fits-All Resume",
                                why: "Sending the same resume to every job means you'll never be the perfect match for any of them.",
                                fix: "Create targeted versions for different types of roles. Customize your summary and reorder bullets to emphasize relevant experience. See our <Link href='/resources/targeted-resume' className='text-purple-600 hover:underline font-semibold'>targeted resume guide</Link>."
                            },
                            {
                                mistake: "References Available Upon Request",
                                why: "This outdated phrase wastes valuable space and is assumed anyway.",
                                fix: "Remove it entirely. Use the space for another achievement or skill. Have a separate reference list ready when asked."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-5 border-l-4 border-red-500">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                    {item.mistake}
                                </h4>
                                <p className="text-gray-600 text-sm mb-2"><strong>Why it's wrong:</strong> {item.why}</p>
                                <p className="text-gray-700 text-sm"><strong>✅ Fix:</strong> {item.fix}</p>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="Self-Critique Checklist"
                content={
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4 font-semibold">
                            Before sending your resume, ask yourself these critical questions:
                        </p>
                        <div className="space-y-3">
                            {[
                                "Can someone tell what role I'm targeting in 6 seconds?",
                                "Are 70% or more of my bullets achievement-based (not just responsibilities)?",
                                "Have I quantified impact with specific numbers/percentages wherever possible?",
                                "Is my most impressive achievement visible in the top third of page 1?",
                                "Did I use the exact keywords from the job description I'm applying to?",
                                "Is there consistent formatting (fonts, dates, bullet style, spacing)?",
                                "Have I removed all personal pronouns (I, me, my, we)?",
                                "Are all dates complete and formatted consistently?",
                                "Did someone else proofread it for typos and clarity?",
                                "Is it saved as FirstName_LastName_Resume.pdf (not 'Resume.pdf')?",
                                "Will it pass ATS (no tables, headers, or graphics)?",
                                "Is every line adding value or could it be cut?"
                            ].map((question, idx) => (
                                <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                                    <input type="checkbox" className="mt-1 w-5 h-5 text-purple-600" />
                                    <label className="text-gray-700 cursor-pointer">{question}</label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 bg-purple-100 border border-purple-300 rounded-lg p-4">
                            <p className="text-sm text-purple-900">
                                <strong>Scoring:</strong> If you checked fewer than 10 boxes, your resume needs significant work. 10-11 is good but could be better. All 12? You're ready to apply!
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
                                q: "How long should my resume be?",
                                a: "1 page for 0-10 years of experience. 2 pages for 10+ years or executive/academic positions. Never 3+ pages unless you're in academia with extensive publications. Quality over quantity—every line should add value."
                            },
                            {
                                q: "Should I include a photo on my resume?",
                                a: "In the US, no. Photos can introduce bias and many ATS systems can't process them. In some European and Asian countries, photos are expected—research norms for your target region."
                            },
                            {
                                q: "How far back should employment history go?",
                                a: "Generally 10-15 years is sufficient. For roles beyond that, you can create a 'Prior Experience' section with just company, title, and dates (no bullets). Focus detail on recent, relevant positions."
                            },
                            {
                                q: "What if I have employment gaps?",
                                a: "Be honest but strategic. If the gap is under 6 months, use years only (2020-2021 instead of Jan 2020 - Apr 2021). For longer gaps, briefly explain in your cover letter: education, caregiving, freelance work, or career transition."
                            },
                            {
                                q: "Should I list skills I'm still learning?",
                                a: "Only list skills you can discuss confidently in an interview. If you just started learning Python, don't list it yet. Consider adding proficiency levels: Python (beginner), SQL (advanced), Excel (expert)."
                            },
                            {
                                q: "How often should I update my resume?",
                                a: "Update immediately after major achievements, promotions, or new certifications. At minimum, review quarterly to add recent accomplishments while they're fresh. Keep a running 'achievement log' document to pull from."
                            },
                            {
                                q: "Do I need different resumes for different industries?",
                                a: "Absolutely! A resume for a creative role should look different from one for finance. Tailor not just content but also formatting, language style, and emphasis. See our <Link href='/resources/targeted-resume' className='text-purple-600 hover:underline font-semibold'>targeted resume guide</Link> for details."
                            },
                            {
                                q: "Should I include volunteer work?",
                                a: "Yes, especially if: 1) You have limited professional experience, 2) The volunteer work is relevant to your target role, 3) It demonstrates leadership or skills. Treat it like a job—include achievements and metrics."
                            },
                            {
                                q: "What file format should I use?",
                                a: "PDF is standard for most applications (preserves formatting). Some ATS systems prefer Word (.docx). When in doubt, the job posting will specify. Never send .pages, .txt, or .jpg files."
                            },
                            {
                                q: "Is it okay to use a resume template?",
                                a: "Yes! Templates ensure professional formatting and structure. However, customize the content completely—never leave placeholder text. Choose ATS-friendly templates (avoid heavy graphics, tables, text boxes). Our <Link href='https://edit.profresume.com' className='text-purple-600 hover:underline font-semibold'>resume builder</Link> offers vetted, ATS-optimized templates."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                                <h4 className="font-semibold text-gray-900 text-lg mb-3">{faq.q}</h4>
                                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceCTA
                title="Get Your Resume Professionally Critiqued"
                subtitle={
                    <>
                        Ready to transform your resume? Use our AI-powered resume builder for instant feedback and optimization.{' '}
                        <Link href="/resources/ai-resume-review" className="text-purple-600 hover:underline font-semibold">
                            Learn about AI resume review
                        </Link>
                        {' '}or{' '}
                        <Link href="https://edit.profresume.com" className="text-purple-600 hover:underline font-semibold">
                            build your resume now
                        </Link>
                        .
                    </>
                }
            />
        </div>
    );
}
