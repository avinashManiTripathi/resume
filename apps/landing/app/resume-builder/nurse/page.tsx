import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Heart, ShieldCheck, Award, Target, CheckCircle, Zap, FileText, Brain, Users } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Nurse Resume Builder 2026 — RN, BSN & Healthcare Resume Templates | Hirecta',
    description: 'Build a professional nursing resume with our free nurse resume builder. ATS-friendly templates for RN, BSN, LPN, CNA, and all healthcare roles. Highlight certifications, clinical skills, and patient care experience. No credit card required.',
    keywords: 'nurse resume builder, RN resume, nursing resume template, BSN resume, LPN resume, CNA resume, healthcare resume builder, registered nurse resume, travel nurse resume, nurse CV, clinical resume, nursing job resume 2026',
    alternates: {
        canonical: '/resume-builder/nurse',
    },
    openGraph: {
        title: 'Nurse Resume Builder 2026 — Free RN & Healthcare Templates | Hirecta',
        description: 'Free nurse resume builder with ATS-friendly templates for RN, BSN, LPN, CNA. Highlight certifications, clinical skills & patient care. Download PDF free.',
        url: '/resume-builder/nurse',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Nurse Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nurse Resume Builder — Free RN Templates | Hirecta',
        description: 'Create a professional nursing resume for RN, BSN, LPN roles. ATS-friendly, free PDF download, no credit card.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const nurseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Nurse Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2100", "bestRating": "5" },
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Write a Nursing Resume in 2026",
    "description": "Step-by-step guide to creating a professional nursing resume for RN, BSN, and LPN positions",
    "totalTime": "PT10M",
    "step": [
        { "@type": "HowToStep", "name": "Choose a Healthcare Template", "text": "Select from our nursing-optimized templates designed for clinical environments and ATS systems." },
        { "@type": "HowToStep", "name": "Add Your Credentials", "text": "List your RN/BSN/LPN licensure, state licenses, BLS/ACLS/PALS certifications prominently." },
        { "@type": "HowToStep", "name": "Detail Clinical Experience", "text": "Describe patient-to-nurse ratios, specialties managed, procedures performed, and patient outcomes." },
        { "@type": "HowToStep", "name": "Download & Apply", "text": "Export as ATS-friendly PDF and start applying to hospitals and healthcare systems." },
    ]
};

export default function NurseResumePage() {
    const faqs = [
        { question: "What should a nursing resume include?", answer: "A nursing resume should include: RN/BSN/LPN license number and state, certifications (BLS, ACLS, PALS, TNCC), clinical specialties, patient care ratios, EHR/EMR systems proficiency (Epic, Cerner), and specific procedures performed. Lead with credentials in the header." },
        { question: "How do I list nursing certifications on my resume?", answer: "Create a dedicated 'Licenses & Certifications' section immediately after your contact information. Include: certification name, issuing body, certification number (optional), and expiration date. Example: 'RN License — California Board of Nursing, #RN123456, Exp. 2027'." },
        { question: "Should a nurse resume be 1 or 2 pages?", answer: "New graduate nurses should target 1 page. Experienced nurses with 3+ years of experience can use 2 pages to fully detail specialties, certifications, and achievements. Travel nurses often use 2 pages due to multiple assignments." },
        { question: "How do I write a nursing resume with no experience?", answer: "For new graduate nurses: lead with your BSN/ADN degree, list your clinical rotations as experience (include specialty area, facility, and skills demonstrated), highlight nursing school achievements, any CNA or MA experience, and volunteer work in healthcare settings." },
        { question: "What EMR/EHR systems should I list on a nursing resume?", answer: "List all EHR systems you've used: Epic, Cerner, Meditech, Allscripts, NextGen, PointClickCare. Healthcare employers specifically look for Epic and Cerner proficiency. Note your proficiency level (basic, intermediate, advanced)." },
        { question: "How do I tailor my nursing resume for different specialties?", answer: "ICU nurses emphasize critical care skills, ventilator management, and hemodynamic monitoring. ED nurses highlight triage, trauma experience, and fast-paced decision making. OR nurses focus on surgical specialties and sterile technique. Use Hirecta's Tailor tool to customize for each job posting." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Nurse Resume", url: `${ENV.BASE_URL}/resume-builder/nurse` },
    ];

    const bullets = [
        "Provided compassionate care to 6-patient caseload in busy 32-bed ICU, maintaining 97% patient satisfaction scores",
        "Administered medications, monitored vitals, and performed wound care for post-surgical patients, achieving zero medication errors over 18 months",
        "Mentored 4 new graduate nurses through hospital orientation program, reducing onboarding time by 25%",
        "Collaborated with multidisciplinary team to develop individualized care plans, contributing to 12% reduction in average length of stay",
        "Responded to 10+ rapid response calls monthly, applying ACLS protocols and supporting Code Blue situations",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Nurse Resume Builder 2026 — RN, BSN & Healthcare Resume Templates"
                description="Create a professional nursing resume with ATS-friendly templates for RN, BSN, LPN, CNA roles. Highlight certifications and clinical expertise."
                url={`${ENV.BASE_URL}/resume-builder/nurse`}
                datePublished="2026-02-21"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nurseSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            <ResourceHero
                badge="Healthcare Careers"
                badgeIcon={Heart}
                title={
                    <>
                        Nurse <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Resume Builder</span>
                    </>
                }
                subtitle="Create a professional nursing resume that showcases your clinical expertise, certifications, and patient care achievements. ATS-friendly templates for RN, BSN, LPN, CNA, and all healthcare roles. 100% free, no credit card required."
            />

            <ResourceFeatureGrid
                title="Built for Healthcare Professionals"
                features={[
                    { icon: <ShieldCheck className="w-6 h-6" />, title: "Credentials First Layout", description: "Templates designed to highlight RN/BSN licensure, BLS/ACLS/PALS certifications, and state licenses prominently." },
                    { icon: <Heart className="w-6 h-6" />, title: "Clinical Skills Section", description: "Dedicated section for patient-to-nurse ratios, specialties, procedures, and EHR systems (Epic, Cerner)." },
                    { icon: <Brain className="w-6 h-6" />, title: "AI Nursing Bullet Points", description: "AI-powered suggestions for clinical bullet points using proper medical terminology and quantified outcomes." },
                    { icon: <Target className="w-6 h-6" />, title: "Specialty Tailoring", description: "Tailor your resume for ICU, ED, OR, Pediatrics, Oncology, or any nursing specialty in one click." },
                    { icon: <Award className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass hospital and healthcare system ATS screening with proper keywords for your specialty." },
                    { icon: <Users className="w-6 h-6" />, title: "All Nursing Levels", description: "Templates for new graduate RNs, experienced nurses, travel nurses, nurse practitioners, and nursing directors." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Nursing Resume in 2026"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Nursing Resume Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Licenses & Certifications
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• RN/LPN/BSN/ADN license + state + number</li>
                                        <li>• BLS, ACLS, PALS, TNCC, CCRN</li>
                                        <li>• Specialty certifications (CEN, CCRN, etc.)</li>
                                        <li>• Expiration dates for all certifications</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Clinical Experience
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Nursing specialty and unit type</li>
                                        <li>• Patient-to-nurse ratio</li>
                                        <li>• Specific procedures and interventions</li>
                                        <li>• Quantified patient outcomes</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Technical Skills
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• EHR/EMR systems (Epic, Cerner, Meditech)</li>
                                        <li>• Medical equipment proficiency</li>
                                        <li>• IV insertion, phlebotomy, wound care</li>
                                        <li>• Telemetry monitoring</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Education
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• BSN/ADN degree + school + graduation year</li>
                                        <li>• Clinical rotations (for new grads)</li>
                                        <li>• Continuing education (CEUs)</li>
                                        <li>• Honors / Dean's list if recent grad</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Pro Tips for Nursing Resumes
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Always list license number — ATS systems scan for it</li>
                                <li>• Quantify patient loads: "Managed 6-patient ICU caseload" not "Cared for patients"</li>
                                <li>• Use specialty abbreviations ATS knows: "ICU RN", "PACU RN", "ED RN"</li>
                                <li>• Include agency/travel nurse assignments as separate entries with location and dates</li>
                                <li>• Highlight charge nurse or preceptor experience — shows leadership</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Sample Nursing Resume Bullet Points</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-green-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resume by Specialty */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nursing Resume Guide by Specialty</h3>
                            <p className="text-gray-600 mb-6">Different nursing specialties require different keyword emphasis and section ordering. Here is what top recruiters look for in each specialty.</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { name: "ICU / Critical Care RN", color: "blue", skills: ["Ventilator management (modes, settings, weaning)", "Hemodynamic monitoring (A-line, PA catheter)", "Vasopressor titration (norepinephrine, vasopressin)", "CRRT / CVVHD dialysis management", "ECMO (if applicable)", "Post-cardiac surgery care", "IABP / Impella device management", "Rapid deterioration response"] },
                                    { name: "Emergency Department RN", color: "red", skills: ["Triage (ESI Level 1–5 classification)", "Trauma resuscitation (ATLS protocols)", "Rapid Sequence Intubation assist", "Stroke protocol (tPA administration)", "STEMI team activation & care", "Sepsis bundle implementation", "Pediatric emergency management", "Psychiatric emergency care"] },
                                    { name: "Medical-Surgical RN", color: "green", skills: ["Post-operative care & monitoring", "Wound assessment & dressing changes", "Wound VAC (negative pressure wound therapy)", "NG tube management & tube feeding", "Foley catheter insertion & care", "Telemetry / cardiac monitoring", "Pain management (PCA pump)", "Patient & family discharge education"] },
                                    { name: "Labor & Delivery RN", color: "purple", skills: ["Electronic fetal monitoring (EFM)", "Epidural management & monitoring", "Shoulder dystocia emergency protocols", "C-section scrub & circulating roles", "Postpartum hemorrhage management", "Neonatal resuscitation (NRP)", "Magnesium sulfate administration", "SROM / AROM procedures"] },
                                    { name: "Operating Room (OR) RN", color: "orange", skills: ["Scrub & circulating nurse roles", "Sterile technique & field maintenance", "Instrument count & accountability", "Positioning for open & laparoscopic cases", "Electrosurgical unit operation", "Blood & fluid management", "Surgical specialties: ortho, neuro, cardiac, general", "Post-anesthesia awareness protocols"] },
                                    { name: "NICU / Pediatric RN", color: "teal", skills: ["Neonatal gestational age assessment", "Phototherapy & bili-blanket management", "Gavage & NG/OG tube feeding", "Umbilical line care (UAC, UVC)", "TPN & lipid administration", "High-frequency ventilator management", "Developmental care & kangaroo care", "Family-centered care & parental education"] },
                                ].map((spec, i) => (
                                    <div key={i} className={`bg-${spec.color}-50 rounded-xl p-5 border border-${spec.color}-100`}>
                                        <h4 className="font-bold text-gray-900 mb-3">{spec.name}</h4>
                                        <ul className="space-y-1.5">
                                            {spec.skills.map((skill, j) => (
                                                <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Professional Summary Examples */}
                        <div className="bg-teal-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary Examples by Experience Level</h3>
                            <div className="space-y-5">
                                {[
                                    { label: "New Graduate RN", summary: "Motivated and compassionate new graduate RN (BSN) eager to apply clinical training in a fast-paced acute care setting. Completed 500+ clinical hours across medical-surgical, pediatric, and ICU rotations. BLS and ACLS certified with foundational skills in IV therapy, medication administration, patient assessment, and care plan development. Committed to evidence-based practice and delivering patient-centered, culturally competent care." },
                                    { label: "Mid-Level RN (3–7 years)", summary: "Dedicated Emergency Department RN with 5 years of experience in a Level II Trauma Center managing high-acuity patients across all age groups. CEN-certified with expertise in rapid triage, trauma resuscitation, sepsis protocol administration, and pediatric emergencies. Proficient in Epic EHR. Recognized for composure in high-pressure situations, collaborative interdisciplinary teamwork, and consistent achievement of above-average HCAHPS patient satisfaction scores." },
                                    { label: "Senior / Charge Nurse", summary: "Results-driven Critical Care RN and Charge Nurse with 12+ years of ICU experience at Magnet-designated Level I Trauma Centers. CCRN-certified with deep expertise in ECMO management, hemodynamic monitoring, complex post-surgical care, and rapid response. Experienced preceptor for new graduate nurses and nursing students. Proven track record of improving unit metrics — reduced HAC rate by 18%, achieved top-decile HCAHPS scores, and maintained zero medication error record for 3 consecutive years. Strong clinical leader with excellent physician and interdisciplinary team collaboration." },
                                ].map((ex, i) => (
                                    <div key={i} className="bg-white rounded-lg p-5 border border-teal-100">
                                        <p className="text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">{ex.label}</p>
                                        <p className="text-gray-700 leading-relaxed text-sm italic">"{ex.summary}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Common Mistakes */}
                        <div className="bg-red-50 rounded-xl p-8 border border-red-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">7 Common Nursing Resume Mistakes to Avoid</h3>
                            <div className="space-y-4">
                                {[
                                    { mistake: "Not listing your license number", fix: "Many hospitals verify licensure proactively. Include it — it saves HR a step and signals transparency." },
                                    { mistake: "Using tables or text boxes in your resume", fix: "Most hospital ATS systems (Taleo, Workday, iCIMS) cannot parse tables. They return garbled, unreadable text. Use Hirecta's clean linear templates." },
                                    { mistake: "Omitting patient-to-nurse ratios", fix: "This is the single most critical context metric. '6-patient ICU RN' communicates acuity immediately. Include it for every clinical position." },
                                    { mistake: "Vague, unquantified bullet points", fix: "'Provided excellent patient care' tells the reader nothing. 'Maintained 96th-percentile patient satisfaction scores for 3 consecutive quarters in a 28-bed cardiac ICU' is compelling." },
                                    { mistake: "Listing expired certifications", fix: "An expired ACLS on a critical care resume is an immediate red flag. Renew before job-searching or omit entirely." },
                                    { mistake: "Using a one-size-fits-all resume", fix: "An ICU role requires different keyword emphasis than a school nurse role. Hirecta's Tailor tool customizes your resume for each job description in seconds." },
                                    { mistake: "Inconsistent use of medical abbreviations", fix: "Write 'Registered Nurse (RN)' and 'Intensive Care Unit (ICU)' on first mention. ATS systems search both the abbreviation and full form — using only one means you may miss matches." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-red-100">
                                        <p className="font-semibold text-red-700 mb-1">✗ {item.mistake}</p>
                                        <p className="text-gray-600 text-sm"><strong className="text-green-700">Fix: </strong>{item.fix}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Travel Nursing Tips */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Travel Nurse Resume: Special Formatting Guide</h3>
                            <p className="text-gray-600 mb-5">Travel nurses face a unique challenge: multiple short-term assignments can look like job-hopping to an inexperienced recruiter. Here is how to present travel experience professionally and powerfully.</p>
                            <div className="bg-white rounded-xl border border-gray-200 p-7 space-y-5">
                                {[
                                    { tip: "Group assignments under your agency", detail: "Use 'Travel RN — [Agency Name]' as your employer, then list each hospital assignment as a sub-entry with: facility name, city/state, unit/specialty, dates, patient ratio, and 2–3 achievement bullets. This prevents your resume from looking fragmented." },
                                    { tip: "Emphasize rapid adaptability", detail: "Travel nursing is proof of adaptability. Mention how quickly you became proficient at each facility's EHR system, unit protocols, and team culture. Example: 'Oriented independently within 2 shifts at each new facility; consistently rated as performing at baseline within first week by charge nurses.'" },
                                    { tip: "Highlight geographic diversity strategically", detail: "Facilities in multiple states can signal broad exposure — but frame it as a strength: 'Worked in 4 states across Magnet-designated, community, and critical access hospitals, developing flexible clinical skills across diverse patient populations and EHR platforms.'" },
                                    { tip: "Keep certifications current across all state licenses", detail: "Multi-state Compact License (NLC) is a huge advantage for travel nurses. Note on your resume: 'Multistate RN Compact License — Active in X states' to save agencies and facilities administrative work." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.tip}</p>
                                            <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Salary Table */}
                        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nurse Salary Data by Specialty (2026)</h3>
                            <p className="text-gray-600 mb-5">Understanding your market value helps you target the right roles and negotiate with confidence. Use these figures as a benchmark when reviewing job offers.</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-teal-100">
                                        <tr>
                                            <th className="text-left p-3 font-bold text-gray-900">Specialty</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Avg US Salary</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Top States</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            ["ICU / Critical Care RN", "$90,000 – $115,000", "CA, NY, WA, MA"],
                                            ["Emergency Department RN", "$85,000 – $108,000", "CA, OR, NV, AK"],
                                            ["Operating Room (CNOR)", "$88,000 – $112,000", "CA, WA, CT, MN"],
                                            ["Labor & Delivery RN", "$83,000 – $105,000", "CA, MA, NY, HI"],
                                            ["NICU RN", "$85,000 – $110,000", "CA, NY, WA, IL"],
                                            ["Medical-Surgical RN", "$72,000 – $90,000", "CA, HI, OR, AK"],
                                            ["Travel Nurse (any)", "$100,000 – $135,000*", "CA, FL, TX, NY"],
                                        ].map((row, i) => (
                                            <tr key={i} className="even:bg-gray-50">
                                                <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                                <td className="p-3 text-teal-700 font-semibold">{row[1]}</td>
                                                <td className="p-3 text-gray-500">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-400 mt-2">*Includes tax-free stipends. Source: BLS OEWS 2025–2026.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Full Nursing ATS Keyword List (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Patient Assessment", "Medication Administration", "IV Therapy", "Central Line Care", "PICC Line", "Wound Care", "Wound VAC", "Foley Catheter", "Nasogastric Tube", "Ventilator Management", "Hemodynamic Monitoring", "Vasopressor Titration", "ACLS", "BLS", "PALS", "TNCC", "CCRN", "CEN", "CNOR", "Epic EHR", "Cerner", "Meditech", "PointClickCare", "Critical Care", "ICU", "CCU", "NICU", "PICU", "ED", "OR", "PACU", "Telemetry", "Med-Surg", "Patient Education", "Discharge Planning", "Care Planning", "HIPAA", "Charge Nurse", "Preceptor", "Multidisciplinary Team", "SBAR", "Evidence-Based Practice", "Patient Advocacy", "Fall Prevention", "Sepsis Protocol", "Rapid Response", "Code Blue", "Infection Control", "Contact Precautions", "Pain Management", "PCA Pump", "Case Management", "Social Work Collaboration", "Culture of Safety"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions — Nursing Resumes</h2>
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

            <div className="bg-blue-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/software-engineer" className="text-blue-600 hover:underline font-semibold">Software Engineer Resume</Link>
                        <Link href="/resume-builder/teacher" className="text-blue-600 hover:underline font-semibold">Teacher Resume</Link>
                        <Link href="/resume-builder/data-scientist" className="text-blue-600 hover:underline font-semibold">Data Scientist Resume</Link>
                        <Link href="/resume-builder/product-manager" className="text-blue-600 hover:underline font-semibold">Product Manager Resume</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Nursing Resume Now — Free"
                subtitle="Join thousands of nurses who've landed hospital jobs with Hirecta. ATS-optimized, no watermarks, instant PDF download."
            />
        </div>
    );
}
