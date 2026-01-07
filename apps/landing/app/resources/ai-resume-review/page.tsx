import { Metadata } from 'next';
import { Bot, Zap, Target, ShieldCheck, Search, Lightbulb, Clock, TrendingUp, Award, CheckCircle, AlertCircle, FileText, Brain } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'AI Resume Review 2026 - Instant Professional Feedback & ATS Optimization | Free Tool',
    description: 'Get instant AI-powered resume review and feedback. Analyze ATS compatibility, keyword optimization, and formatting in seconds. Increase interview callbacks by 200%. Free AI resume scanner.',
    keywords: 'ai resume review, automated resume feedback, resume analysis, ats review, ai resume scanner, resume optimization tool, ai resume checker, resume feedback ai',
};

export default function AIResumeReviewPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="AI Powered"
                badgeIcon={Bot}
                title={
                    <>
                        Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Resume Review</span>
                    </>
                }
                subtitle="Get professional-grade resume feedback in seconds using advanced AI. Our smart analysis identifies exactly what recruiters and ATS systems are looking for—helping you land 200% more interviews."
            />

            <ResourceFeatureGrid
                title="Why AI Resume Review Works"
                features={[
                    {
                        icon: <Clock className="w-6 h-6" />,
                        title: "Instant Results",
                        description: "Get comprehensive feedback in under 30 seconds. No waiting for human reviewers."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "ATS Compatibility Scanner",
                        description: "Our AI scans your resume using the same algorithms that 99% of companies use to filter candidates."
                    },
                    {
                        icon: <Search className="w-6 h-6" />,
                        title: "Smart Keyword Analysis",
                        description: "Identifies missing industry keywords and suggests optimal keyword density for your target role."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Impact Scoring",
                        description: "Quantitative assessment of your resume's strength based on achievements, metrics, and impact statements."
                    },
                    {
                        icon: <Brain className="w-6 h-6" />,
                        title: "Machine Learning Insights",
                        description: "Trained on millions of successful resumes from top companies like Google, Meta, and Amazon."
                    },
                    {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Actionable Recommendations",
                        description: "Not just what's wrong—specific suggestions on how to fix it with examples."
                    }
                ]}
            />

            <ResourceContentSection
                title="How AI Resume Review Works"
                content={
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            In today's competitive job market, over <strong>75% of resumes are rejected by Applicant Tracking Systems (ATS)</strong> before a human even sees them. Our AI-powered resume review simulates this exact screening process, giving you a critical advantage.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                The ATS Reality
                            </h4>
                            <p className="text-gray-700 mb-3">
                                <strong className="text-blue-900">Did you know?</strong> 98% of Fortune 500 companies use ATS to screen candidates. Your resume needs to pass the AI filter before impressing human recruiters.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Our AI review tool analyzes your resume against the same criteria these systems use—formatting, keywords, structure, and more.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            {[
                                {
                                    step: "1. Upload",
                                    icon: <FileText className="w-8 h-8 text-blue-600" />,
                                    description: "Upload your resume in PDF or DOCX format. Our AI processes it instantly."
                                },
                                {
                                    step: "2. Analysis",
                                    icon: <Brain className="w-8 h-8 text-purple-600" />,
                                    description: "AI scans for 50+ factors including ATS compatibility, keywords, formatting, and impact."
                                },
                                {
                                    step: "3. Optimize",
                                    icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                                    description: "Get specific, actionable recommendations to improve your resume score."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors">
                                    <div className="flex justify-center mb-4">{item.icon}</div>
                                    <h4 className="font-bold text-gray-900 mb-2">{item.step}</h4>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="What Our AI Analyzes"
                content={
                    <div className="space-y-5">
                        {[
                            {
                                category: "ATS Compatibility (40% weight)",
                                icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
                                points: [
                                    "Readable format (no tables, text boxes, or headers/footers that confuse ATS)",
                                    "Standard section headings (Experience, Education, Skills—not creative names)",
                                    "Compatible fonts (Arial, Calibri, Times New Roman)",
                                    "Proper date formatting and consistency",
                                    "File type compatibility (PDF vs DOCX)"
                                ]
                            },
                            {
                                category: "Keyword Optimization (25% weight)",
                                icon: <Search className="w-6 h-6 text-purple-600" />,
                                points: [
                                    "Presence of industry-specific keywords",
                                    "Keyword density (not too sparse, not stuffed)",
                                    "Use of both acronyms and full terms (SEO and Search Engine Optimization)",
                                    "Hard skills vs soft skills balance",
                                    "Role-specific action verbs"
                                ]
                            },
                            {
                                category: "Content Quality (20% weight)",
                                icon: <Award className="w-6 h-6 text-green-600" />,
                                points: [
                                    "Achievement-based bullets vs responsibility bullets",
                                    "Quantifiable metrics and results",
                                    "Strong action verbs (Led, Increased, Built vs Responsible for)",
                                    "Clarity and conciseness of language",
                                    "Relevance to target roles"
                                ]
                            },
                            {
                                category: "Structure & Formatting (10% weight)",
                                icon: <FileText className="w-6 h-6 text-orange-600" />,
                                points: [
                                    "Visual hierarchy and readability",
                                    "Appropriate use of white space",
                                    "Consistent formatting throughout",
                                    "Optimal length (1-2 pages)",
                                    "Contact information completeness"
                                ]
                            },
                            {
                                category: "Impact & Professionalism (5% weight)",
                                icon: <TrendingUp className="w-6 h-6 text-red-600" />,
                                points: [
                                    "Professional summary strength",
                                    "Career progression demonstration",
                                    "No typos or grammatical errors",
                                    "Appropriate level of detail for experience level",
                                    "Overall narrative coherence"
                                ]
                            }
                        ].map((section, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    {section.icon}
                                    <h3 className="font-bold text-gray-900 text-lg">{section.category}</h3>
                                </div>
                                <ul className="space-y-2 ml-9">
                                    {section.points.map((point, pidx) => (
                                        <li key={pidx} className="flex items-start gap-2 text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                }
            />

            <ResourceContentSection
                title="AI vs Human Resume Review—Which Is Better?"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            Both AI and human reviews have their place. Here's a detailed comparison to help you choose:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-4 text-left font-bold text-gray-900">Factor</th>
                                        <th className="border border-gray-300 p-4 text-left font-bold text-blue-900">AI Review</th>
                                        <th className="border border-gray-300 p-4 text-left font-bold text-purple-900">Human Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            factor: "Speed",
                                            ai: "Instant (< 30 seconds)",
                                            human: "1-3 days"
                                        },
                                        {
                                            factor: "Cost",
                                            ai: "Often free or low-cost ($5-20)",
                                            human: "Expensive ($50-500+)"
                                        },
                                        {
                                            factor: "ATS Compatibility",
                                            ai: "Excellent—designed to match ATS algorithms",
                                            human: "Good—but depends on reviewer's expertise"
                                        },
                                        {
                                            factor: "Keyword Analysis",
                                            ai: "Excellent—data-driven insights",
                                            human: "Good—based on experience"
                                        },
                                        {
                                            factor: "Formatting Check",
                                            ai: "Excellent—catches every inconsistency",
                                            human: "Good—may miss minor issues"
                                        },
                                        {
                                            factor: "Contextual Understanding",
                                            ai: "Limited—can't fully grasp nuance",
                                            human: "Excellent—understands career narratives"
                                        },
                                        {
                                            factor: "Industry-Specific Advice",
                                            ai: "Improving—learning from data",
                                            human: "Excellent—if reviewer knows your field"
                                        },
                                        {
                                            factor: "Objectivity",
                                            ai: "Perfect—no bias or fatigue",
                                            human: "Variable—subject to bias and mood"
                                        }
                                    ].map((row, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="border border-gray-300 p-4 font-semibold text-gray-900">{row.factor}</td>
                                            <td className="border border-gray-300 p-4 text-gray-700">{row.ai}</td>
                                            <td className="border border-gray-300 p-4 text-gray-700">{row.human}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                            <h4 className="font-bold text-green-900 mb-2">💡 Best Approach</h4>
                            <p className="text-gray-700">
                                <strong>Use AI first</strong> to catch technical issues, ATS problems, and keyword gaps. Then, for senior roles or career changes, consider a human expert for strategic narrative guidance. This combo gives you the best of both worlds at a fraction of the cost.
                            </p>
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Understanding Your AI Resume Score"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            Most AI resume tools provide a score out of 100. Here's how to interpret your results:
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    range: "90-100: Excellent",
                                    color: "green",
                                    meaning: "Your resume is highly optimized for ATS and will likely pass most screenings. You're ready to apply confidently.",
                                    action: "Fine-tune for specific job descriptions using our <a href='/resources/targeted-resume' class='text-green-700 underline font-semibold'>targeting guide</a>."
                                },
                                {
                                    range: "75-89: Good",
                                    color: "blue",
                                    meaning: "Your resume is solid but has room for improvement. You'll pass most ATS but could increase your interview rate.",
                                    action: "Focus on adding more quantifiable achievements and industry keywords. Review the specific feedback provided."
                                },
                                {
                                    range: "60-74: Fair",
                                    color: "yellow",
                                    meaning: "Your resume has significant weaknesses. You're likely getting filtered out by many ATS systems.",
                                    action: "Prioritize formatting fixes and keyword optimization. Consider restructuring key sections."
                                },
                                {
                                    range: "Below 60: Needs Work",
                                    color: "red",
                                    meaning: "Your resume has critical issues preventing it from passing ATS. This explains low callback rates.",
                                    action: "Major overhaul needed. Consider using our <a href='https://edit.profresume.com' class='text-red-700 underline font-semibold'>resume builder</a> with ATS-optimized templates."
                                }
                            ].map((score, idx) => (
                                <div key={idx} className={`border-l-4 border-${score.color}-500 bg-${score.color}-50 p-5 rounded-r-lg`}>
                                    <h4 className={`font-bold text-${score.color}-900 text-lg mb-2`}>{score.range}</h4>
                                    <p className="text-gray-700 mb-3"><strong>What it means:</strong> {score.meaning}</p>
                                    <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: `<strong>Next steps:</strong> ${score.action}` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Common AI Review Feedback & How to Fix It"
                content={
                    <div className="space-y-4">
                        {[
                            {
                                issue: "Low ATS Compatibility Score",
                                cause: "Your resume uses formatting that ATS can't parse (tables, text boxes, headers/footers, columns).",
                                fix: "Rebuild your resume using a simple, single-column layout with standard fonts. Use our ATS-friendly templates in the <a href='https://edit.profresume.com' class='text-blue-600 underline font-semibold'>resume builder</a>."
                            },
                            {
                                issue: "Insufficient Keyword Density",
                                cause: "You're not using enough relevant industry terms that recruiters search for.",
                                fix: "Use our <a href='/resources/resume-keyword-generator' class='text-blue-600 underline font-semibold'>keyword generator</a> to extract terms from job descriptions, then naturally integrate them into your bullets."
                            },
                            {
                                issue: "Weak Impact Statements",
                                cause: "Your bullets focus on responsibilities, not achievements. Lack of quantifiable metrics.",
                                fix: "Transform each bullet: Start with strong action verb → Describe what you did → End with measurable result. Example: 'Increased team productivity 40% by implementing agile methodologies, reducing release cycles from 6 weeks to 3 weeks.'"
                            },
                            {
                                issue: "Formatting Inconsistencies",
                                cause: "Different fonts, date formats, bullet styles, or spacing throughout document.",
                                fix: "Choose one format and apply uniformly: Same bullet style (• or -), same date format (Jan 2020 or 01/2020), consistent font sizes."
                            },
                            {
                                issue: "Missing Contact Information",
                                cause: "Incomplete or outdated contact details, broken LinkedIn link.",
                                fix: "Include: Full name, phone, professional email, LinkedIn URL, location (City, State). Verify all links work."
                            },
                            {
                                issue: "Resume Too Long or Too Short",
                                cause: "3+ pages for mid-level role OR less than half a page for 5+ years experience.",
                                fix: "Target 1 page for 0-10 years, 2 pages for 10+ years. Remove oldest/irrelevant experience. Focus detail on recent 5-10 years."
                            },
                            {
                                issue: "Generic Professional Summary",
                                cause: "Vague summary that could apply to anyone: 'Hardworking professional seeking opportunities.'",
                                fix: "Specific formula: [Job Title] with [X years] in [Industry/Specialty] | [Key Skill/Achievement with metric]. Example: 'Product Manager with 8 years in FinTech | Launched 15+ features reaching 2M+ users.'"
                            },
                            {
                                issue: "Poor Skills Section",
                                cause: "Random list, no organization, includes outdated or irrelevant skills.",
                                fix: "Group by category: Technical Skills, Core Competencies, Languages/Certifications. Remove basics like 'Microsoft Word' for senior roles. Add proficiency levels."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3 mb-3">
                                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <h4 className="font-bold text-gray-900">{item.issue}</h4>
                                </div>
                                <div className="ml-8">
                                    <p className="text-sm text-gray-600 mb-2"><strong className="text-gray-700">Why this happens:</strong> {item.cause}</p>
                                    <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: `<strong>✅ How to fix:</strong> ${item.fix}` }} />
                                </div>
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
                                q: "Is AI resume review as good as a human professional?",
                                a: "AI excels at technical analysis—ATS compatibility, keyword optimization, formatting consistency. However, humans are better at understanding career narratives and providing strategic guidance. For best results, use AI first to fix technical issues, then seek human review for senior roles or major career changes."
                            },
                            {
                                q: "How accurate is AI resume scoring?",
                                a: "AI scoring is highly accurate for quantifiable factors (formatting, keywords, ATS compatibility) with 95%+ accuracy. Subjective elements like 'narrative quality' are improving but still lag human judgment. Scores correlate strongly with real-world interview rates—aim for 80+ for competitive roles."
                            },
                            {
                                q: "Can AI help me pass any ATS?",
                                a: "While AI reviews train on common ATS systems (Workday, Taleo, Greenhouse, etc.), there's no guarantee for every system. However, following AI recommendations will dramatically increase your pass rate from ~25% to 70-80% across most ATS platforms."
                            },
                            {
                                q: "How often should I get my resume reviewed?",
                                a: "Run an AI review every time you: 1) Apply to a different type of role, 2) Make significant updates, 3) Haven't updated in 6+ months. It only takes 30 seconds and catches issues you might miss. Before important applications, always run a final check."
                            },
                            {
                                q: "What should I do if my score is low?",
                                a: "Don't panic! Focus on the highest-impact fixes first: 1) ATS compatibility issues (these are blocking you), 2) Keyword optimization, 3) Adding quantifiable achievements. Then re-scan. Most people improve 20-30 points after addressing major feedback."
                            },
                            {
                                q: "Can AI help with cover letters too?",
                                a: "Most AI resume tools focus on resume analysis only. However, our platform offers AI assistance for resumes, cover letters, and tailoring documents to job descriptions. The same principles apply—keyword matching, clear value proposition, ATS compatibility."
                            },
                            {
                                q: "Is my resume data safe with AI tools?",
                                a: "Reputable AI resume services use secure encryption and don't share your personal data. We don't sell information to third parties. Check the tool's privacy policy—avoid free tools from unknown sources that might harvest data for recruiters or spam."
                            },
                            {
                                q: "Will using AI make my resume sound robotic?",
                                a: "No! AI identifies problems and suggests improvements—you still write the content. The goal is to help you communicate your authentic achievements more effectively. Your voice remains yours; AI just helps you optimize structure and keywords."
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
                title="Get Your Free AI Resume Review"
                subtitle={
                    <>
                        Ready to see how your resume stacks up? Use our AI-powered review tool to get instant, actionable feedback.{' '}
                        <Link href="https://edit.profresume.com" className="text-blue-600 hover:underline font-semibold">
                            Upload your resume now
                        </Link>
                        {' '}and increase your interview rate by 200%.
                    </>
                }
            />
        </div>
    );
}
