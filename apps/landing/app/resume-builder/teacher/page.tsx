import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { GraduationCap, BookOpen, Users, Award, Target, CheckCircle, Zap, Brain, Star } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Teacher Resume Builder 2026 — Free Education Resume Templates | Hirecta',
    description: 'Build a professional teacher resume with our free educator resume builder. ATS-optimized templates for K-12, higher education, special education, ESL, and instructional design roles. Highlight teaching philosophy, classroom achievements, and certifications. Free PDF download.',
    keywords: 'teacher resume builder, teacher resume template, educator resume, teaching resume, K-12 teacher resume, elementary teacher resume, high school teacher resume, special education resume, ESL teacher resume, substitute teacher resume, teacher CV, education resume 2026',
    alternates: {
        canonical: '/resume-builder/teacher',
    },
    openGraph: {
        title: 'Teacher Resume Builder 2026 — Free Education Resume Templates | Hirecta',
        description: 'Free teacher resume builder with ATS-friendly templates for K-12, higher education, special ed & ESL roles. Highlight achievements, certifications & teaching philosophy.',
        url: '/resume-builder/teacher',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Teacher Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Teacher Resume Builder 2026 — Free Education Templates | Hirecta',
        description: 'Create a professional teacher resume for K-12, higher ed, ESL roles. ATS-optimized, free PDF, no credit card.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const teacherSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Teacher Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1850", "bestRating": "5" },
};

export default function TeacherResumePage() {
    const faqs = [
        { question: "What should a teacher resume include in 2026?", answer: "A teacher resume must include: teaching credentials/licensure, grade levels and subjects taught, classroom management strategies, differentiation techniques, student achievement data (test scores improved, literacy rates), technology tools used (Google Classroom, Canvas, Schoology), and professional development completed." },
        { question: "How do I show I'm an effective teacher on my resume?", answer: "Quantify your impact: student test score improvements (e.g., 'Increased class average from 68% to 84%'), student engagement rates, differentiation strategies implemented, number of students managed, and any awards or recognition received. Avoid vague phrases like 'passionate about education'." },
        { question: "Should I include my teaching philosophy on my resume?", answer: "Keep your teaching philosophy in your cover letter, not your resume. Your resume should focus on measurable outcomes and specific achievements. Use your professional summary to convey your approach in 2-3 lines focused on results." },
        { question: "How do I list teacher certifications?", answer: "Include state teaching license/certificate number, subject area endorsements, grade level authorization, and any specialty certifications (TESOL, Special Education, Gifted Education). List them prominently in a 'Credentials' section near the top of your resume." },
        { question: "What technology skills should teachers list?", answer: "Modern teacher resumes should include: LMS platforms (Canvas, Schoology, Google Classroom, Seesaw), EdTech tools (Kahoot, Nearpod, Padlet, Flipgrid), assessment platforms (Renaissance, STAR, iReady), and productivity tools (Google Workspace, Microsoft Teams). These are key ATS keywords." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Teacher Resume", url: `${ENV.BASE_URL}/resume-builder/teacher` },
    ];

    const bullets = [
        "Differentiated instruction for 28-student diverse classroom (3 ELL students, 4 IEP students), improving SBAC proficiency rates by 22% year-over-year",
        "Implemented project-based learning curriculum for 8th-grade science, increasing student engagement scores from 71% to 93% per district survey",
        "Mentored 3 first-year teachers as part of district induction program, all achieving 'Effective' or 'Highly Effective' year-end evaluations",
        "Designed and delivered professional development workshop on Google Classroom integration for 45 faculty members, rated 4.9/5 by participants",
        "Collaborated with special education team to modify curriculum for 6 students with IEPs, achieving 100% IEP goal attainment rate",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Teacher Resume Builder 2026 — Free Education Resume Templates"
                description="Create a professional teacher resume with ATS-friendly templates for K-12, higher education, and special education roles."
                url={`${ENV.BASE_URL}/resume-builder/teacher`}
                datePublished="2026-02-21"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teacherSchema) }} />

            <ResourceHero
                badge="Education Careers"
                badgeIcon={GraduationCap}
                title={
                    <>
                        Teacher <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Resume Builder</span>
                    </>
                }
                subtitle="Create a professional teaching resume that showcases your classroom impact, certifications, and student achievement data. ATS-friendly templates for K-12, higher education, ESL, and special education roles. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Educators"
                features={[
                    { icon: <GraduationCap className="w-6 h-6" />, title: "Credentials Section", description: "Prominently display your state teaching license, subject endorsements, and grade level authorization." },
                    { icon: <BookOpen className="w-6 h-6" />, title: "Achievement Data Section", description: "Dedicated section to showcase student test score improvements, engagement rates, and academic outcomes." },
                    { icon: <Brain className="w-6 h-6" />, title: "AI Education Bullets", description: "AI-powered suggestions using education-specific terminology: differentiation, scaffolding, formative assessment." },
                    { icon: <Target className="w-6 h-6" />, title: "Grade-Level Tailoring", description: "Customize for elementary, middle school, high school, or higher education positions in one click." },
                    { icon: <Users className="w-6 h-6" />, title: "All Education Roles", description: "Templates for classroom teachers, instructional coaches, curriculum designers, and special education teachers." },
                    { icon: <Star className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass district and school system ATS with proper educational terminology and certification keywords." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Teacher Resume That Gets Interviews"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Teacher Resume Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Teaching Credentials
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• State teaching credential/license number</li>
                                        <li>• Subject area and grade level endorsements</li>
                                        <li>• TESOL/CLAD/Special Ed certifications</li>
                                        <li>• Credential expiry dates</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Classroom Achievement
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Test score improvements (%, percentile)</li>
                                        <li>• Student engagement data</li>
                                        <li>• Differentiation outcomes for diverse learners</li>
                                        <li>• IEP / ELL student progress</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Technology & EdTech
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• LMS: Canvas, Google Classroom, Schoology</li>
                                        <li>• Assessment: iReady, STAR, Khan Academy</li>
                                        <li>• Engagement: Kahoot, Nearpod, Padlet</li>
                                        <li>• Google Workspace / Microsoft 365</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Professional Development
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Professional learning communities (PLCs)</li>
                                        <li>• Training on curriculum frameworks (NGSS, CCSS)</li>
                                        <li>• Leadership roles: department chair, mentor</li>
                                        <li>• Relevant workshops and conferences</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Pro Tips for Teacher Resumes
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Lead every bullet with action verbs: "Implemented", "Designed", "Differentiated", "Improved"</li>
                                <li>• Always include grade level range and number of students managed</li>
                                <li>• Quantify: "Raised class average 15 points" beats "Improved student performance"</li>
                                <li>• Mention any national certifications (NBCT) — these are huge differentiators</li>
                                <li>• For admin roles, emphasize PLCs, coaching, and curriculum development</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Strong Teacher Resume Bullet Examples</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-green-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* By Role / Level */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher Resume Guide by Level and Role</h3>
                            <p className="text-gray-600 mb-6">Each teaching role requires different keyword emphasis. Here is exactly what to highlight for each education sector:</p>
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { role: "Elementary School Teacher (K–5)", focus: ["Literacy and reading instruction (Fountas & Pinnell, Lexile levels)", "Math fluency and numeracy strategies", "Social-emotional learning (SEL) integration", "Positive behavior support (PBIS)", "Parent communication and engagement", "Whole-group, small-group, and 1:1 differentiation", "Hands-on, play-based learning activities", "Sight word and phonics instruction"] },
                                    { role: "Middle School Teacher (6–8)", focus: ["Content area literacy across disciplines", "Adolescent development strategies", "Project-based learning (PBL) implementation", "Collaborative group work structures", "Cross-curricular unit design", "Advisory and homeroom program leadership", "AVID or similar college-readiness strategies", "Formative and summative assessment design"] },
                                    { role: "High School Teacher (9–12)", focus: ["AP / IB course instruction and exam preparation", "College and career readiness outcomes", "Dual enrollment partnerships", "Socratic seminar and debate facilitation", "Research paper and writing instruction", "Departmental leadership or collaboration", "Scholarship and internship mentoring", "State standardized test (SAT/ACT/state exam) improvement data"] },
                                    { role: "Special Education Teacher", focus: ["IEP development, implementation, and progress monitoring", "Accommodations and modifications for diverse learners", "Paraprofessional supervision and training", "Transition planning for post-secondary life", "Assistive technology (AAC devices, text-to-speech)", "Behavioral intervention plans (BIPs)", "Collaboration with general education teachers", "Due process: eligibility, triennial reviews, IEP meetings"] },
                                    { role: "ESL / ELD Teacher", focus: ["WIDA/ELD standards and language proficiency levels", "SIOP model instruction", "Sheltered content instruction strategies", "L1/L2 language transfer knowledge", "Newcomer support and cultural integration", "ACCESS for ELLs / ELPA21 assessment preparation", "Family liaison and interpreter coordination", "Collaboration with classroom teachers on co-teaching"] },
                                    { role: "Higher Education / Adjunct", focus: ["Syllabus and curriculum design", "Learning Management Systems (Canvas, Blackboard, Moodle)", "Student retention and persistence strategies", "Rubric development and grading standards", "Office hours and academic advising", "Research integration into teaching", "Peer review and scholarly publication (if applicable)", "Online/hybrid course development and facilitation"] },
                                ].map((item, i) => (
                                    <div key={i} className="bg-green-50 rounded-xl p-5 border border-green-100">
                                        <h4 className="font-bold text-gray-900 mb-3">{item.role}</h4>
                                        <ul className="space-y-1.5">
                                            {item.focus.map((f, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Professional Summary Examples */}
                        <div className="bg-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary Examples by Experience Level</h3>
                            <div className="space-y-5">
                                {[
                                    { label: "Student Teacher / New Educator", summary: "Enthusiastic and dedicated new educator (B.Ed., Elementary Education) with 480 hours of student teaching across Grades 2 and 4. Skilled in differentiated instruction, guided reading groups, and data-driven lesson planning aligned to CCSS. Proficient in Google Classroom, Seesaw, and iReady assessment platforms. Committed to building inclusive, equitable learning environments where every student thrives." },
                                    { label: "Experienced Classroom Teacher (4–10 years)", summary: "Results-driven 8th-grade ELA teacher with 7 years of demonstrated success improving student literacy at Title I middle school. Increased school-wide SBAC ELA proficiency from 42% to 61% over 3 years through targeted intervention, data-driven instruction, and collaborative PLC work. National Board Certified Teacher (NBCT) with expertise in project-based learning, formative assessment, and differentiation for diverse learners including ELL and IEP students." },
                                    { label: "Department Chair / Instructional Coach", summary: "Strategic instructional leader with 15 years of classroom teaching and 5 years of coaching experience supporting K–12 educators across 3 school districts. Expert in facilitating PLCs, analyzing student achievement data, and designing professional development aligned to district goals. Track record of improving teacher effectiveness ratings from 71% Effective/Highly Effective to 94% over 2-year coaching cycle. Certified instructional coach with expertise in observation, feedback, and instructional rounds." },
                                ].map((ex, i) => (
                                    <div key={i} className="bg-white rounded-lg p-5 border border-blue-100">
                                        <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">{ex.label}</p>
                                        <p className="text-gray-700 leading-relaxed text-sm italic">"{ex.summary}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Common Mistakes */}
                        <div className="bg-red-50 rounded-xl p-8 border border-red-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">6 Common Teacher Resume Mistakes (and How to Fix Them)</h3>
                            <div className="space-y-4">
                                {[
                                    { mistake: "Using vague, subjective language", fix: "'Passionate educator who loves children' tells hiring committees nothing. Replace every adjective with a data point: 'Increased DIBELS literacy scores 18 percentile points over one academic year.'" },
                                    { mistake: "Forgetting to list credential/license number", fix: "Most district HR software and ATS systems scan for certification numbers. Including it upfront signals that you're fully credentialed and saves HR a verification step." },
                                    { mistake: "Ignoring the ATS by using fancy formatting", fix: "Creative resume templates with text boxes, columns, and graphics fail ATS parsing. School districts and charter management organizations use iCIMS, Workday, and Recruit ATS — use clean, parseable formats." },
                                    { mistake: "Listing duties instead of accomplishments", fix: "'Taught 5th-grade math' is a duty. 'Designed mastery-based math curriculum that brought 85% of students to grade-level proficiency (up from 61%), as measured by NWEA MAP fall-to-spring growth data' is an accomplishment." },
                                    { mistake: "Not adapting for each district", fix: "A Title I urban district values equity, SEL, and intervention experience. An affluent suburban district may prioritize AP/enrichment and parent communication. Tailor your resume for the specific school, district type, and student demographics." },
                                    { mistake: "Omitting EdTech skills", fix: "In 2026, EdTech fluency is table stakes. Omitting your LMS, assessment, and engagement tools signals that you may struggle with the district's digital infrastructure. List every relevant tool explicitly." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-red-100">
                                        <p className="font-semibold text-red-700 mb-1">✗ {item.mistake}</p>
                                        <p className="text-gray-600 text-sm"><strong className="text-green-700">Fix: </strong>{item.fix}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Salary Table */}
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher Salary Data by Role (2026)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-green-100">
                                        <tr>
                                            <th className="text-left p-3 font-bold text-gray-900">Teaching Role</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Avg US Salary</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Top States</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            ["Elementary School Teacher", "$55,000 – $78,000", "NY, CA, WA, MA, CT"],
                                            ["Middle School Teacher", "$57,000 – $80,000", "NY, CA, NJ, MD, CT"],
                                            ["High School Teacher", "$60,000 – $88,000", "NY, CA, IL, WA, MD"],
                                            ["Special Education Teacher", "$60,000 – $90,000", "NY, CA, NJ, WA, CT"],
                                            ["ESL / ELD Teacher", "$58,000 – $82,000", "NY, CA, TX, FL, IL"],
                                            ["Instructional Coach", "$72,000 – $102,000", "CA, NY, WA, NJ, CO"],
                                            ["Adjunct / Higher Ed Instructor", "$45,000 – $65,000*", "NY, CA, MA, IL, TX"],
                                        ].map((row, i) => (
                                            <tr key={i} className="even:bg-gray-50">
                                                <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                                <td className="p-3 text-green-700 font-semibold">{row[1]}</td>
                                                <td className="p-3 text-gray-500">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-400 mt-2">*Adjunct per-course rates vary widely. Source: BLS OEWS + district salary schedules 2025–2026.</p>
                            </div>
                        </div>

                        {/* EdTech Keywords */}
                        <div className="bg-green-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Teacher ATS Keyword List (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Differentiated Instruction", "Formative Assessment", "Summative Assessment", "Common Core State Standards (CCSS)", "Next Generation Science Standards (NGSS)", "IEP Development", "504 Accommodation", "ELL / ELD Instruction", "WIDA Standards", "SIOP Model", "Positive Behavior Intervention Supports (PBIS)", "Social-Emotional Learning (SEL)", "Project-Based Learning (PBL)", "Google Classroom", "Canvas LMS", "Schoology", "Seesaw", "iReady", "STAR Assessment", "NWEA MAP", "Renaissance Learning", "Khan Academy", "Kahoot", "Nearpod", "Padlet", "Flipgrid", "Google Workspace", "Microsoft 365", "Classroom Management", "Co-Teaching", "Professional Learning Community (PLC)", "Data-Driven Instruction", "Curriculum Development", "Lesson Planning", "Student Engagement", "Parent Communication", "NBCT", "Bilingual Education", "Title I Experience", "Trauma-Informed Practices", "Restorative Justice", "Universal Design for Learning (UDL)"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Teacher Resume FAQs</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-green-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/nurse" className="text-blue-600 hover:underline font-semibold">Nurse Resume</Link>
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/resume-builder/product-manager" className="text-blue-600 hover:underline font-semibold">Product Manager Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Teacher Resume Now — Free"
                subtitle="Join thousands of educators who've landed teaching positions with Hirecta. ATS-optimized, no watermarks, instant PDF download."
            />
        </div>
    );
}
