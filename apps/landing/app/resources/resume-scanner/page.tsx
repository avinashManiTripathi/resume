import { Metadata } from 'next';
import { Scan, ShieldCheck, Search, Zap, Cpu, SearchCode, TrendingUp, AlertCircle, CheckCircle2, FileText, Target, Award } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Resume Scanner 2026 - See Your Resume Through ATS Eyes | Instant Parse Test',
    description: 'Free resume scanner simulates how Applicant Tracking Systems parse your resume. Identify hidden issues, test ATS compatibility, and optimize for automated hiring software. Instant results.',
    keywords: 'resume scanner, ats scanner, resume parser online, check resume for system compatibility, ats simulation, resume parsing test, ats readability test',
};

export default function ResumeScannerPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="System Simulation"
                badgeIcon={Scan}
                title={
                    <>
                        The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Resume Scanner</span>
                    </>
                }
                subtitle="Understand exactly how hiring software parses your professional history. See what ATS systems see—and fix invisible issues before they cost you the job."
            />

            <ResourceFeatureGrid
                title="Advanced Scanning Capabilities"
                features={[
                    {
                        icon: <Cpu className="w-6 h-6" />,
                        title: "ATS Parser Simulation",
                        description: "We simulate parsing logic from major platforms: Workday, Taleo, Greenhouse, Lever, iCIMS, and more."
                    },
                    {
                        icon: <SearchCode className="w-6 h-6" />,
                        title: "Section Detection Test",
                        description: "Verify the scanner correctly identifies your Experience, Education, Skills, and Contact sections."
                    },
                    {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "Safe Format Check",
                        description: "Ensure your PDF doesn't contain hidden text, graphics, or elements that confuse parsing algorithms."
                    },
                    {
                        icon: <FileText className="w-6 h-6" />,
                        title: "Data Extraction Preview",
                        description: "See exactly how your information appears to recruiting software—names, dates, companies, skills."
                    },
                    {
                        icon: <Target className="w-6 h-6" />,
                        title: "Keyword Recognition",
                        description: "Test whether the scanner detects your important skills and qualifications."
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6" />,
                        title: "Compatibility Score",
                        description: "Get a readability score (0-100) indicating how well ATS systems can process your resume."
                    }
                ]}
            />

            <ResourceContentSection
                title="Why You Need to Scan Your Resume"
                content={
                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Modern recruitment relies on speed and scale—<strong>99% of Fortune 500 companies use Applicant Tracking Systems (ATS)</strong> to filter candidates before human review. A <strong>resume scanner</strong> simulates this first critical filter, showing you exactly what the machine sees.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                The ATS Reality
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>75% of resumes are rejected by ATS</strong> before reaching human eyes—often due to parsing errors, not lack of qualifications</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>ATS systems parse resumes into structured data (XML/JSON format)—if parsing fails, your resume appears blank or garbled</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>Most job seekers never know their resume failed parsing until they've applied to 50+ jobs with zero callbacks</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="How ATS Resume Scanning Works"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            Understanding the technical process helps you optimize your resume for maximum compatibility:
                        </p>
                        <div className="space-y-5">
                            {[
                                {
                                    step: "1. Document Upload & Conversion",
                                    description: "ATS receives your resume (PDF or DOCX) and converts it to machine-readable text",
                                    whatCanGoWrong: [
                                        "Complex PDFs with embedded fonts fail to convert properly",
                                        "Scanned image PDFs (not searchable text) are completely unreadable",
                                        "Password-protected or corrupted files are rejected immediately"
                                    ],
                                    optimization: "Use standard fonts (Arial, Calibri, Times New Roman). Always save as searchable PDF, never scanned image."
                                },
                                {
                                    step: "2. Text Extraction & Parsing",
                                    description: "System extracts text and attempts to identify sections (Contact, Experience, Education, Skills)",
                                    whatCanGoWrong: [
                                        "Tables, columns, and text boxes confuse the parsing algorithm",
                                        "Creative section names ('My Journey' vs 'Experience') aren't recognized",
                                        "Headers/footers with important info are often ignored",
                                        "Two-column layouts parse left-to-right, creating jumbled text"
                                    ],
                                    optimization: "Use single-column layout. Standard section headings. No tables or text boxes. Linear top-to-bottom structure."
                                },
                                {
                                    step: "3. Data Field Mapping",
                                    description: "ATS maps extracted text to database fields: Name, Phone, Email, Job Titles, Companies, Dates, Skills, etc.",
                                    whatCanGoWrong: [
                                        "Contact info in graphics/headers isn't detected",
                                        "Inconsistent date formats confuse the parser",
                                        "Job titles with special characters break field mapping",
                                        "Skills embedded in paragraph text (not listed) are missed"
                                    ],
                                    optimization: "Contact info in body (not header). Consistent date format (Month Year). Clear job titles. Dedicated Skills section with listed items."
                                },
                                {
                                    step: "4. Keyword Extraction & Scoring",
                                    description: "System searches for keywords from job description and scores your relevance",
                                    whatCanGoWrong: [
                                        "Using different terminology than job posting (e.g., 'customer success' vs 'client support')",
                                        "Keywords buried in dense paragraphs instead of clear bullets",
                                        "Missing both acronym and full term (SEO without 'Search Engine Optimization')",
                                        "Outdated or irrelevant skills dilute your relevance score"
                                    ],
                                    optimization: "Use EXACT keywords from job description. Include acronyms AND full terms. List skills clearly. Remove outdated technologies."
                                },
                                {
                                    step: "5. Ranking & Filtering",
                                    description: "ATS ranks all candidates by match score. Typically only top 20-25% advance to human review",
                                    whatCanGoWrong: [
                                        "Missing required keywords = automatic rejection",
                                        "Poor section detection = incomplete profile = low score",
                                        "Generic resume (not targeted) scores lower than customized versions"
                                    ],
                                    optimization: "Use our <a href='/resources/resume-keyword-generator' class='text-blue-600 underline font-semibold'>keyword generator</a> to extract job-specific terms. Create targeted versions for different roles."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <h3 className="font-bold text-gray-900 text-lg mb-3">{item.step}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>

                                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg mb-4">
                                        <p className="font-semibold text-red-900 mb-2">❌ What Can Go Wrong:</p>
                                        <ul className="space-y-1">
                                            {item.whatCanGoWrong.map((issue, iidx) => (
                                                <li key={iidx} className="text-sm text-gray-700 ml-4">• {issue}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                                        <p className="font-semibold text-green-900 mb-2">✅ Optimization:</p>
                                        <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: item.optimization }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="The Rule of 3 for ATS-Friendly Resumes"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            To ensure maximum scan scores and parsing accuracy, follow the "Rule of 3" principle:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    rule: "1. Standard Headings",
                                    icon: <FileText className="w-8 h-8 text-blue-600" />,
                                    explanation: "Use recognizable section titles that ATS systems are trained to detect",
                                    examples: [
                                        "✅ Experience / Work Experience / Professional Experience",
                                        "✅ Education / Academic Background",
                                        "✅ Skills / Technical Skills / Core Competencies",
                                        "❌ My Career Journey",
                                        "❌ Places I've Worked",
                                        "❌ What I Know"
                                    ]
                                },
                                {
                                    rule: "2. Linear Layout",
                                    icon: <Target className="w-8 h-8 text-purple-600" />,
                                    explanation: "Stick to single-column or very simple two-column layout that parses top-left to bottom-right",
                                    examples: [
                                        "✅ Single column, top to bottom",
                                        "✅ Simple two-column (sidebar for skills only)",
                                        "❌ Three+ columns",
                                        "❌ Text wrapping around images",
                                        "❌ Side-by-side comparison sections",
                                        "❌ Tables for layout structure"
                                    ]
                                },
                                {
                                    rule: "3. Clean Text",
                                    icon: <Search className="w-8 h-8 text-green-600" />,
                                    explanation: "Avoid charts, icons, or graphics to convey critical information—use plain text",
                                    examples: [
                                        "✅ 'Python, SQL, JavaScript' (list format)",
                                        "✅ 'Phone: 555-1234' (text)",
                                        "❌ Star ratings for skill levels",
                                        "❌ Progress bars for proficiency",
                                        "❌ Icons instead of text labels",
                                        "❌ Contact info in image/logo"
                                    ]
                                }
                            ].map((rule, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6">
                                    <div className="flex justify-center mb-4">{rule.icon}</div>
                                    <h4 className="font-bold text-gray-900 text-center mb-3">{rule.rule}</h4>
                                    <p className="text-sm text-gray-600 text-center mb-4">{rule.explanation}</p>
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                        <p className="text-xs font-semibold text-gray-700 mb-2">Examples:</p>
                                        <div className="space-y-1">
                                            {rule.examples.map((ex, eidx) => (
                                                <p key={eidx} className={`text-xs ${ex.startsWith('✅') ? 'text-green-700' : 'text-red-700'}`}>
                                                    {ex}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            <ResourceContentSection
                title="Understanding Your Scanner Results"
                content={
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            Most resume scanners provide a readability score (0-100). Here's how to interpret and act on your results:
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    score: "90-100: Excellent",
                                    color: "green",
                                    meaning: "Your resume is perfectly optimized for ATS. High chance of passing automated filters.",
                                    action: "You're ready to apply! Focus on targeting keywords for specific jobs. Very minor tweaks if any."
                                },
                                {
                                    score: "75-89: Good",
                                    color: "blue",
                                    meaning: "Your resume is mostly ATS-friendly with a few minor issues that could be optimized.",
                                    action: "Make recommended formatting fixes. Add missing keywords. Ensure all sections are properly labeled. Expected improvement: ~10-15 points."
                                },
                                {
                                    score: "60-74: Fair (Needs Work)",
                                    color: "yellow",
                                    meaning: "Your resume has significant parsing issues. You're likely being filtered out more often than not.",
                                    action: "Priority fixes: Remove tables/columns, standardize section names, add contact info to body (not header). Expected improvement: ~20-30 points."
                                },
                                {
                                    score: "Below 60: Poor (Critical Issues)",
                                    color: "red",
                                    meaning: "Your resume is probably unreadable to most ATS systems. This explains zero callback rates despite qualifications.",
                                    action: "Complete formatting overhaul required. Use our <a href='https://edit.profresume.com' class='text-blue-600 underline font-semibold'>ATS-friendly resume builder</a> templates. Don't try to fix current version—rebuild from scratch."
                                }
                            ].map((result, idx) => (
                                <div key={idx} className={`border-l-4 border-${result.color}-500 bg-${result.color}-50 p-5 rounded-r-lg`}>
                                    <h4 className={`font-bold text-${result.color}-900 text-lg mb-2`}>{result.score}</h4>
                                    <p className="text-gray-700 mb-3"><strong>What it means:</strong> {result.meaning}</p>
                                    <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: `<strong>Action steps:</strong> ${result.action}` }} />
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
                                q: "What's the difference between a resume scanner and resume checker?",
                                a: "A <strong><Link href='/resources/resume-checker' className='text-blue-600 underline font-semibold'>resume checker</Link></strong> finds errors and problems (typos, formatting issues, weak content). A <strong>resume scanner</strong> simulates how ATS systems parse and extract your data. Use both: checker first to fix problems, scanner to verify ATS can read your resume correctly."
                            },
                            {
                                q: "Can I pass 100% of ATS systems?",
                                a: "No single approach works for all ATS platforms (there are 100+ different systems), but following scanning best practices gets your pass rate from ~25% to 70-80%. The key is optimizing for common parsing methods used by major platforms like Workday, Taleo, Greenhouse, and Lever."
                            },
                            {
                                q: "Why does my resume look fine but scan poorly?",
                                a: "Visual appearance ≠ machine readability. Your resume might look beautiful to humans but be completely unreadable to software. Common culprits: tables for layout, graphics with text, fancy fonts, multi-column designs, headers/footers with contact info. ATS sees code, not design."
                            },
                            {
                                q: "Should I test my resume with multiple scanners?",
                                a: "Yes! Different scanners simulate different ATS systems. If your resume scores well across 2-3 scanners, you can be confident it'll work with most real-world ATS platforms. Free scanners often simulate the most common systems (Workday, Taleo)."
                            },
                            {
                                q: "How often should I scan my resume?",
                                a: "Scan your resume: 1) After ANY formatting changes (even minor), 2) Before applying to large companies (they all use ATS), 3) If you're getting zero callbacks despite qualifications, 4) When switching resume templates. Scanning takes 30 seconds—there's no excuse not to."
                            },
                            {
                                q: "What if my industry requires creative resumes?",
                                a: "Even creative industries use ATS for initial screening. Solution: Create TWO versions. 1) ATS-friendly plain version for online applications, 2) Creative version for networking, portfolio, or when requested. Use the ATS version first to get past automated filters, then wow them with creativity in person."
                            },
                            {
                                q: "Can AI improve how well my resume scans?",
                                a: "Yes! Our <Link href='/resources/ai-resume-review' className='text-blue-600 underline font-semibold'>AI resume review</Link> includes ATS compatibility analysis and suggests specific fixes. AI can identify parsing issues humans miss and recommend optimal formatting. However, you still need to implement the changes."
                            },
                            {
                                q: "Is a lower ATS score why I'm not getting interviews?",
                                a: "If your scan score is below 70, yes—ATS is likely blocking you. If your score is 80+, other factors matter more: keyword matching (use our <Link href='/resources/resume-keyword-generator' className='text-blue-600 underline font-semibold'>keyword generator</Link>), content quality, job fit, timing, or network connections. Fix ATS first, then optimize content."
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
                title="Scan Your Resume for Free"
                subtitle={
                    <>
                        Ensure your resume is 100% machine-readable before you apply. Use our <Link href="https://edit.profresume.com" className="text-blue-600 hover:underline font-semibold">ATS-optimized resume builder</Link> with built-in scanning, or get comprehensive analysis with our <Link href="/resources/ai-resume-review" className="text-blue-600 hover:underline font-semibold">AI resume review</Link>.
                    </>
                }
            />
        </div>
    );
}
