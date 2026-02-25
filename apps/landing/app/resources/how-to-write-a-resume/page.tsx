import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { PlayCircle, Type, Layout, ScanIcon, PenTool, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { ResourceHero, ResourceCTA } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { TableOfContents } from '@/components/TableOfContents';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Write a Resume in 2026: The Definitive Guide | Hirecta',
    description: 'Learn step-by-step how to write a job-winning resume for 2026. Discover the best formats, how to beat Applicant Tracking Systems (ATS), and examples of perfect bullet points.',
    keywords: 'how to write a resume, resume writing guide, resume tips 2026, writing a CV, resume format guide, beat ATS',
    alternates: {
        canonical: '/resources/how-to-write-a-resume',
    },
};

export default function HowToWriteResumePage() {
    const faqs = [
        { question: "How long should my resume be?", answer: "For 90% of job seekers, a one-page resume is ideal. It forces you to be concise and highlight only your best achievements. Two pages are acceptable if you have 10+ years of highly relevant experience. Never go beyond two pages." },
        { question: "What is the best resume format for 2026?", answer: "The Reverse-Chronological format is the undisputed champion. It lists your most recent job first and works backwards. Recruiters prefer this because it immediately shows your current trajectory, and Applicant Tracking Systems (ATS) parse it flawlessly." },
        { question: "Do I need to include my full address?", answer: "No. In 2026, including your full street address is a privacy risk and unnecessary. Only include your City, State, and Zip Code (e.g., 'Austin, TX 78701')." },
        { question: "Should I include a photo on my resume?", answer: "If you are applying in the US, UK, or Canada: Absolutely NOT. Including a photo can trigger anti-discrimination compliance issues, causing recruiters to automatically delete your resume. If applying in certain parts of Europe or Asia, a photo may be expected." }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resources", url: `${ENV.BASE_URL}/resources` },
        { name: "How to Write a Resume", url: `${ENV.BASE_URL}/resources/how-to-write-a-resume` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="How to Write a Resume in 2026: The Definitive Guide"
                description="The ultimate step-by-step guide to writing a resume that lands interviews. Learn the hidden rules of ATS, the exact structure recruiters want, and how to write perfect bullet points."
                url={`${ENV.BASE_URL}/resources/how-to-write-a-resume`}
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="Master Class"
                badgeIcon={PlayCircle}
                title={
                    <>
                        How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Write a Resume</span> in 2026
                    </>
                }
                subtitle="Resume writing has fundamentally changed. What worked 5 years ago will get you auto-rejected today. Read the definitive guide to beating the robots and impressing the recruiters."
            />

            {/* Table of Contents */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <TableOfContents
                        sections={[
                            { id: 'format', title: '1. Choosing the Right Format' },
                            { id: 'contact', title: '2. The Contact Header' },
                            { id: 'summary', title: '3. Professional Summary' },
                            { id: 'experience', title: '4. Work Experience (The Core)' },
                            { id: 'skills', title: '5. Skills & ATS Keywords' },
                            { id: 'education', title: '6. Education & Certifications' }
                        ]}
                    />
                </div>
            </section>

            {/* Guide Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto space-y-20">

                    {/* Section 1 */}
                    <div id="format" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                                <Layout className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">1. Choosing the Right Format: The Foundation of Success</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>Before you type a single word, you need to understand the playing field. In 2026, <strong>99% of Fortune 500 companies use an Applicant Tracking System (ATS)</strong>. This means a robot reads your resume before a human ever sees it. The formatting decisions you make in the first five minutes of your resume built will dictate whether you get an interview or an automated rejection email.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Undisputed Champion: Reverse-Chronological</h3>
                            <p>There are technically three resume formats taught in university career centers: Functional, Hybrid, and Reverse-Chronological. Let us be absolutely clear: in the modern corporate landscape, the <strong>Reverse-Chronological format is the only acceptable choice for 95% of professionals.</strong></p>
                            <p>This format lists your current or most recent job first, and works backwards in time. Why is this so critical?</p>
                            <ul className="space-y-4 ml-4 mb-8">
                                <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>Recruiter Psychology:</strong> A recruiter spends an average of 6.5 seconds on the initial scan. They want to know your <em>current</em> level of responsibility immediately. If your most impressive, highest-level job is buried at the bottom of page two, they will never see it.</span></li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>Algorithmic Parsing:</strong> ATS parsing engines (like Workday, Taleo, and Greenhouse) are specifically programmed to ingest data chronologically. When they scan a PDF, they look for a Company Name, followed immediately by a Date sequence (e.g., 2022 - Present). If you use a "Functional" resume that groups skills together but obscures the dates you utilized those skills, the ATS will calculate your experience as "0 years" and automatically reject you.</span></li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Multi-Column Trap and Graphic Design</h3>
                            <div className="bg-red-50 p-8 rounded-2xl border border-red-100 my-8 shadow-sm">
                                <strong className="text-red-900 flex items-center gap-2 text-xl mb-3"><Layout className="w-6 h-6" /> Why Beautiful Resumes Fail</strong>
                                <p className="text-red-800 leading-relaxed mb-4">In recent years, graphic design tools like Canva have popularized highly visual, two-column resume templates adorned with icons, headshots, and "skill bars" (e.g., giving yourself 4 out of 5 stars in Photoshop). This is a catastrophic mistake for online applications.</p>
                                <p className="text-red-800 leading-relaxed">ATS bots read standard Western text: left-to-right, top-to-bottom. When a bot encounters a strict vertical column divider created by a graphic design tool, it often ignores it. It will read line one of the left column, instantly bleed horizontally into line one of the right column, and catalog the resulting gibberish as a single sentence. Furthermore, a bot cannot "read" a star graphic. It only reads text. Stick to clean, top-to-bottom HTML/PDF structures like those generated by <strong>Hirecta</strong>.</p>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Length: The 1-Page vs 2-Page Debate</h3>
                            <p>For decades, the golden rule of resume writing was "never exceed one page." This rule is officially dead for senior professionals. Here is the modern reality:</p>
                            <ul className="list-disc ml-8 space-y-2 mb-8">
                                <li><strong>Less than 5 years experience:</strong> 1 Page. (Recent grads, entry-level, junior associates).</li>
                                <li><strong>5 to 10 years experience:</strong> 1 or 2 Pages. (Depending on the depth of your technical skills and project metrics).</li>
                                <li><strong>10+ years experience:</strong> 2 Pages. (Senior Managers, Directors, Executives). If you have managed million-dollar budgets and cross-functional teams, cramming that data into a single page forces you to delete vital ATS keywords. Give your experience the space it deserves.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div id="contact" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
                                <ScanIcon className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">2. The Contact Header: Modern Privacy Standards</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>Your header needs to be immaculately clean, professional, and entirely free of unnecessary privacy risks. The days of treating your resume like a demographic census form are over.</p>

                            <div className="grid md:grid-cols-2 gap-8 my-8">
                                <div className="bg-green-50 p-8 rounded-2xl border border-green-200 shadow-sm">
                                    <h4 className="font-extrabold text-green-900 text-xl mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Mandatory Inclusions:</h4>
                                    <ul className="space-y-3 text-green-900 ml-2">
                                        <li className="flex items-start"><span className="mr-2 font-bold">•</span> <strong>First and Last Name:</strong> This should be the largest text on the page (typically 18pt - 24pt font).</li>
                                        <li className="flex items-start"><span className="mr-2 font-bold">•</span> <strong>Professional Email:</strong> <code>firstname.lastname@gmail.com</code>. Drop the Hotmail or Yahoo addresses; they subtly age you.</li>
                                        <li className="flex items-start"><span className="mr-2 font-bold">•</span> <strong>Phone Number:</strong> Include the area code.</li>
                                        <li className="flex items-start"><span className="mr-2 font-bold">•</span> <strong>Location (City, State):</strong> Simply write "Austin, TX 78701".</li>
                                        <li className="flex items-start"><span className="mr-2 font-bold">•</span> <strong>LinkedIn URL:</strong> Ensure you have customized your public URL to remove the random numbers at the end.</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                                    <h4 className="font-extrabold text-gray-900 text-xl mb-4 flex items-center gap-2 text-red-600">Immediate Rejections:</h4>
                                    <ul className="space-y-3 text-gray-700 ml-2">
                                        <li className="line-through flex items-start"><span className="mr-2 font-bold text-red-400">✗</span> <strong>Full Street Addresses:</strong> Massive privacy risk. Recruiters only need to know your metropolitan commuting area.</li>
                                        <li className="line-through flex items-start"><span className="mr-2 font-bold text-red-400">✗</span> <strong>Photographs (US/UK/CAN):</strong> Including a photo triggers strict Equal Employment Opportunity (EEO) compliance issues regarding racial and age discrimination. Many Fortune 500 HR departments will instantly delete a resume with a photo to avoid liability.</li>
                                        <li className="line-through flex items-start"><span className="mr-2 font-bold text-red-400">✗</span> <strong>Age, Marital Status, Religion:</strong> Irrelevant and illegal to use in hiring decisions in most Western countries.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div id="summary" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                                <Type className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">3. The Professional Summary: Your Elevator Pitch</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>One of the most persistent, damaging myths in career advising is the "Resume Objective." An objective statement traditionally reads like: <em>"A hardworking graduate seeking a challenging role in marketing to grow my skills and help a company succeed."</em></p>
                            <p><strong>Recruiters vehemently despise objective statements.</strong> It is entirely focused on what the company can do for <em>you</em>. In a capitalist hiring market, the employer is purchasing your labor. They exclusively care about the ROI (Return on Investment) you can provide to <em>them</em>.</p>
                            <p>You must replace the Objective with a <strong>Professional Summary</strong>. This is a 3-to-4 sentence high-level executive overview of your career trajectory, your most valuable technical skills, and a crowning, quantifiable achievement. It acts as the "trailer" for the movie of your career.</p>

                            <div className="bg-white p-8 rounded-2xl border-l-8 border-indigo-500 shadow-lg my-8">
                                <span className="text-sm font-black text-indigo-500 uppercase tracking-widest block mb-4">The Formula for a Perfect Summary</span>
                                <p className="text-gray-900 font-medium leading-relaxed mb-4">
                                    [Adjective] [Job Title] with [Number] years of experience in [Core Skill 1] and [Core Skill 2]. Proven track record of [High Level Achievement]. Expert in utilizing [Tech Stack / Methodology] to drive [Specific Business Outcome].
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-4">
                                    <span className="text-xs font-bold text-gray-500 uppercase mb-1 block">Real World Example:</span>
                                    <p className="text-gray-800 italic">"Data-driven Digital Marketing Manager with 6+ years of experience scaling B2B SaaS platforms. Orchestrated a comprehensive technical SEO overhaul that increased organic traffic by 210% and generated $1.2M in pipeline revenue over 12 months. Expert in managing 6-figure ad budgets, executing A/B multivariate testing, and leading cross-functional creative teams."</p>
                                </div>
                            </div>
                            <Link href="/resources/resume-summary-examples" className="text-indigo-600 font-bold hover:underline flex items-center gap-2 mt-6 text-lg">
                                View 50+ Industry-Specific Resume Summary Examples <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div id="experience" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                                <PenTool className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">4. Work Experience: The Meat of the Document</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>This section will dictate the outcome of your job search. The most catastrophic mistake job seekers make is writing bullet points that sound exactly like the job description they originally applied for. (e.g., "Responsible for answering phones," "Handled customer complaints," "Managed the database.")</p>
                            <p>A list of duties tells the recruiter what you were <em>supposed</em> to do. It does not tell them if you were actually <em>good</em> at doing it. You must fundamentally shift your mindset from listing <strong>Duties</strong> to quantifying <strong>Achievements</strong>.</p>

                            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl text-white my-10 text-center shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-3xl font-black mb-6 text-white relative z-10">Google's Famous XYZ Formula</h3>
                                <p className="text-2xl font-medium text-amber-200 mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                    "Accomplished <strong className="text-white bg-amber-600/30 px-2 py-1 rounded">[X]</strong> as measured by <strong className="text-white bg-amber-600/30 px-2 py-1 rounded">[Y]</strong>, by doing <strong className="text-white bg-amber-600/30 px-2 py-1 rounded">[Z]</strong>."
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">The 3 Immutable Rules of Bullet Points</h3>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2"><span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> Never Use Pronouns</h4>
                                    <p className="mt-2 ml-10">Professional resumes are written in the "implied first person." You must drop all instances of "I," "Me," and "My." Start every single bullet point with a powerful, past-tense Action Verb.</p>
                                    <div className="ml-10 mt-3 bg-gray-50 border-l-4 border-red-400 p-4 mb-2">
                                        <span className="text-red-600 font-bold block text-sm">Weak:</span> "I helped the sales team get new leads."
                                    </div>
                                    <div className="ml-10 bg-gray-50 border-l-4 border-green-500 p-4">
                                        <span className="text-green-600 font-bold block text-sm">Strong:</span> "<strong>Spearheaded</strong> lead generation initiatives..."
                                    </div>
                                    <Link href="/resources/resume-action-verbs" className="ml-10 text-blue-600 font-bold hover:underline inline-block mt-3">Access our list of 500+ Power Action Verbs &rarr;</Link>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2"><span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> Quantify Everything with Hard Numbers</h4>
                                    <p className="mt-2 ml-10">Numbers disrupt the wall of text and act as magnets for the human eye. If you don't know the exact number, use a conservative estimate. Did you manage a team? How many people? Did you handle a budget? How big was it? Did you increase efficiency? By what percentage?</p>
                                    <div className="ml-10 mt-3 p-4 bg-blue-50 rounded-lg text-blue-900 border border-blue-100">
                                        <em>"Trained a team of <strong>14</strong> junior associates on new CRM software, reducing onboarding time by <strong>30%</strong> and saving <strong>40</strong> hours of management overhead per month."</em>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2"><span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> The 3-to-5 Rule</h4>
                                    <p className="mt-2 ml-10">Do not write a novel. A recruiter will not read 12 bullet points for a single job span. Identify your absolute top 3 to 5 highest-impact achievements. Group them logically. If you have older jobs (5+ years ago), reduce them to 1 or 2 bullets, or simply list the title and company to save space.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div id="skills" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                                <ScanIcon className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">5. Skills & ATS Keywords: The Algorithm Hack</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>This section is explicitly designed to manipulate the Applicant Tracking System. When an employer uploads a job description into Workday or Greenhouse, the software assigns weight to specific technical terms. If the job description asks for "Agile Software Development" and you only wrote "Scrum Master," the bot might score you lower.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Hard Skills vs. Soft Skills</h3>
                            <p><strong>Do not list "Soft Skills" in your skills matrix.</strong> Words like <em>Leadership, Team-player, Hardworking,</em> and <em>Communication</em> take up valuable real estate but carry zero weight because they are entirely subjective. Anyone can type "Leadership" on a page. You prove leadership in your bullet points (e.g., "Led a team of 10...").</p>
                            <p>The Skills section should be reserved exclusively for <strong>Hard, Technical, or Proprietary Skills</strong>. These are objective nouns that an ATS scans for:</p>
                            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-0 pl-0 list-none mt-6 mb-8 font-mono text-sm bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-800">
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> Salesforce CRM</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> Python / React.js</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> Google Analytics 4</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> P&L Management</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> AWS Cloud Infrastructure</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> Agile / Scrum Methodology</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> B2B Enterprise Sales</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> AutoCAD / Revit</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">▹</span> Supply Chain Logistics</li>
                            </ul>
                            <p><strong>Pro Tip:</strong> Tailor this section for every single application. Look at the target job description, highlight the required technologies or frameworks, and ensure those exact words appear verbatim in your Skills section.</p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div id="education" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-100 text-red-700 rounded-xl">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">6. Education & Certifications: Keep it Brief</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>For the vast majority of professionals, the Education section should be the shortest section on the resume and located at the very bottom of the document. The exception is if you are a current student or recent graduate (less than 12 months out of school), in which case Education can sit at the top underneath the Summary.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The Rules of Education Formatting:</h3>
                            <ul className="space-y-4 ml-4">
                                <li><strong>Drop the High School:</strong> If you have a university degree, remove your high school entirely. It is implied and wastes space.</li>
                                <li><strong>Drop the GPA (usually):</strong> If you graduated more than 3 years ago, your GPA is irrelevant; your professional track record matters infinitely more. Only include a GPA if it is exceptionally high (3.8+) and you are a recent graduate applying to highly traditional fields (Law, Investment Banking).</li>
                                <li><strong>Focus on Formatting:</strong> Simply state: <em>Degree Name, Major. University Name. City, State. Graduation Year.</em></li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Certifications Matter More Than You Think</h3>
                            <p>In fields like IT, Project Management, and Healthcare, a modern certification often carries more weight than an aging degree. Create a dedicated "Certifications" sub-section and list active, relevant accreditations proudly: <em>PMP (Project Management Professional), AWS Certified Solutions Architect, Cisco CCNA, Certified ScrumMaster (CSM).</em></p>
                        </div>
                    </div>

                    {/* Section 7 - AI Context */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-8 md:p-12 rounded-3xl mt-12 shadow-inner">
                        <h2 className="text-3xl font-black text-gray-900 mb-6">The Future: AI-Assisted Resume Writing</h2>
                        <div className="prose prose-lg text-gray-700 max-w-none">
                            <p>Executing all of these rules manually—formatting the columns without breaking the ATS code, rewriting every bullet point into the XYZ format, and injecting the exact right keywords for every new application—can take dozens of hours. Job searching is exhausting enough without the immense friction of document engineering.</p>
                            <p>This is precisely why we built <strong>Hirecta</strong>. Hirecta is not a static graphic design tool; it is a dynamic, LLM-powered career platform. Our system automatically enforces the "ATS-First" coding hierarchies, meaning your downloaded PDF is mathematically guaranteed to pass Workday, Taleo, and Greenhouse filters.</p>
                            <p>More importantly, our contextual AI engine acts as your personal executive writer. You can simply paste the URL of the job you want into Hirecta, and our AI will dynamically write and restructure your bullet points to align with the employer's specific semantic requirements. You can even use your microphone to dictate your raw experience, and Hirecta will instantly transform your speech into professional, metric-driven achievements.</p>
                            <p>Stop risking your livelihood on outdated formatting and weak verbs. Leverage the power of modern automation to craft a resume that practically guarantees human review.</p>
                        </div>
                    </div>

                </div>
            </section>

            <ResourceCTA
                title="Stop Typing. Start Building."
                subtitle="Why format everything in Word manually? Hirecta uses advanced AI to guide you through this exact process, guaranteeing perfect formatting and powerful bullet points."
            />
        </div>
    );
}
