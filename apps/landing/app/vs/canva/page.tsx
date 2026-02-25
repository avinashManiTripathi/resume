import { CompetitorPage, type CompetitorData, type ComparisonFeature, type FAQItem } from '@/components/CompetitorPage';

export default function CanvaComparisonPage() {
    const canvaData: CompetitorData = {
        name: "Canva",
        description: "A popular graphic design tool that offers visually striking resume templates, but often creates PDFs that fail Applicant Tracking Systems.",
        rating: "4.7",
        price: "Free tier with premium elements ($14.99/mo)",
        pros: [
            "Beautiful, highly creative designs",
            "Extensive graphic elements and fonts",
            "Easy drag-and-drop interface"
        ],
        cons: [
            "Notoriously bad for ATS parsing (uses text boxes and images)",
            "No AI resume writing or career guidance",
            "Easy to make a resume look unprofessional or cluttered",
            "No job description keyword matching"
        ]
    };

    const features: ComparisonFeature[] = [
        { name: "ATS Compatibility", hirecta: "100% Parsable (Plain Text Behind PDF)", hirectaHighlight: true, competitor: "Poor (Often Reads as Images)" },
        { name: "AI Content Generation", hirecta: "Advanced (GPT-4 based)", hirectaHighlight: true, competitor: "None (Visual Only)" },
        { name: "Design Focus", hirecta: "Professional & Recruiter Approved", competitor: "Highly Creative & Graphic" },
        { name: "Voice-to-Resume Input", hirecta: true, hirectaHighlight: true, competitor: false },
        { name: "Smart Content Tailoring", hirecta: true, hirectaHighlight: true, competitor: false },
        { name: "Export Formats", hirecta: "PDF optimized for ATS", competitor: "PDF, PNG, JPG" },
        { name: "Price", hirecta: "100% Free Core Features", competitor: "Free with Paid Premium Assets" }
    ];

    const faqs: FAQItem[] = [
        {
            question: "Why do Canva resumes fail Applicant Tracking Systems (ATS)?",
            answer: "Canva is a graphic design tool, not a text editor. When it exports a PDF, the text is often grouped in floating boxes or rendered as vector images. Modern Applicant Tracking Systems (like Workday or Greenhouse) scan for structured text (Header 1 -> Paragraph). If they cannot read the text sequentially, your resume is instantly rejected."
        },
        {
            question: "When should I use Canva vs Hirecta?",
            answer: "You should use Canva if you are applying physically in-person to a highly creative role (like Graphic Design or Illustration) where layout software proficiency is the primary skill. For 95% of online applications where an ATS is filtering resumes, you must use a dedicated resume builder like Hirecta."
        },
        {
            question: "Does Hirecta have visually appealing templates?",
            answer: "Yes! Hirecta offers over 20+ templates that merge modern, beautiful aesthetics with strict ATS compliance. We offer 'Creative' and 'Modern' options that look fantastic but are programmed specifically to pass the robot screeners."
        }
    ];

    const CanvaArticle = () => (
        <>
            <h3>The Graphic Design Trap: Why Beautiful Resumes Often Fail in 2026</h3>
            <p>Canva has revolutionized the way people approach graphic design. From Instagram posts to wedding invitations to corporate pitch decks, its intuitive drag-and-drop interface has democratized visual design for millions. It is unsurprising, therefore, that thousands of job seekers instinctively turn to Canva to design their resumes. They see visually striking, highly creative, multi-color templates that look like modern works of art. However, a beautiful resume is only effective if a human being actually sees it. In the highly competitive, algorithmic hiring landscape of 2026, forcing a graphic design tool to function as a professional text editor is a critical error that can instantly derail your job search.</p>
            <p>The core issue lies in the fundamental difference between how graphic design software and word processing software construct and export Data. When you type a sentence into a standard word processor—or a dedicated text-based builder like Hirecta—the underlying file format (even when exported as a PDF) retains a linear, hierarchical structure. The software knows that a Header (H1) is followed by a Paragraph (P). It understands margins organically and reads elements left-to-right, top-to-bottom. Canva, on the other hand, treats text as isolated visual objects scattered across a canvas. A text box containing your job title is entirely divorced from the text box containing your company name.</p>

            <h3>Understanding the Mechanics of Applicant Tracking Systems (ATS)</h3>
            <p>To understand why this object-based formatting is disastrous, we must pull back the curtain on Applicant Tracking Systems (ATS). Over 99% of Fortune 500 companies and nearly 85% of medium-sized businesses now utilize an ATS to filter incoming applications. These software suites (such as Workday, Taleo, Greenhouse, Lever, and iCIMS) act as digital gatekeepers. They are designed to ingest thousands of PDF resumes daily, extract the raw text, categorize that text into a standardized database profile, and ultimately score the candidate against the semantic keyword requirements of the job description.</p>
            <p>When an ATS scans a standard Hirecta resume, it executes Optical Character Recognition (OCR) and PDF parsing flawlessly because the underlying code is structured sequentially. However, when an ATS scans a Canva resume, it encounters chaos. Because Canva exports floating visual text boxes, the parsing bot does not know the sequential order. It might read your name, jump to a random skill in a side-column, jump back to your graduation year, and then read half of a job description. The resulting extracted profile in the recruiter's dashboard looks like a scrambled, incoherent mess. When an ATS cannot parse your dates, titles, and skills correctly, it assumes your profile is incomplete and automatically assigns you a 0% match score.</p>

            <h3>The Danger of Multi-Column Layouts and Graphics</h3>
            <p>One of the hallmark features of a Canva resume is the two-column or three-column layout, often adorned with slider bars, pie charts, or star ratings to indicate proficiency in a skill (e.g., giving yourself "4 out of 5 stars" in JavaScript). These visual elements are actively harmful to your application for two distinct reasons.</p>
            <p>First, as discussed, ATS parsing logic is built to read standard Western text: left-to-right, line-by-line. When it encounters a strict vertical column layout generated by visual software, it often reads straight across the gap. It will read line one of column A, immediately followed by line one of column B, completely destroying the context of your sentence. Second, applicant tracking bots cannot "read" a star icon or a slider bar. If a system requires a candidate to have "Advanced" proficiency in Python, and you represent your Python skill with a 5-star graphic, the bot simply registers a blank space. You lose the keyword entirely.</p>

            <h3>Why Recruiter Psychology Rejects "Over-Designed" Resumes</h3>
            <p>Moving beyond the automated filtration systems, we must consider the psychology of human recruiters. In 2026, a corporate recruiter working at a mid-to-high-tier technology, finance, healthcare, or corporate firm spends an average of 6.5 seconds scanning a resume before making an initial "keep" or "discard" decision. They are aggressively looking for specific data points: current job title, recent companies, total years of experience, educational pedigree, and core technical skills.</p>
            <p>When a recruiter is presented with a heavily colored, heavily formatted Canva resume featuring non-standard fonts, headshots, and complex icon grids, their cognitive load increases exponentially. Instead of their eyes naturally tracking down the page to find the necessary data, they have to actively search the canvas to decipher the candidate's history. This friction is subconscious, but it often leads to frustration. In traditional, high-paying industries (such as investment banking, corporate law, enterprise software engineering, and healthcare administration), an over-designed resume is frequently viewed as a red flag—a gimmick attempting to mask a lack of substantive experience.</p>

            <h3>The Absence of Contextual AI and Career Guidance</h3>
            <p>Furthermore, Canva provides zero assistance regarding the actual *content* of your resume. It is an empty visual shell. In the modern job market, what you say matters infinitely more than the hex code of your header font. Legacy resume builders have historically offered pre-written phrases, but the landscape has evolved drastically with the integration of Large Language Models (LLMs).</p>
            <p>Hirecta represents the vanguard of this new era. While Canva helps you draw a rectangle, Hirecta actively helps you write a compelling, metric-driven narrative. Our platform features an integrated, contextual AI engine that analyzes your target job description and seamlessly suggests high-impact, ATS-optimized bullet points based on your raw input. If you struggle to articulate your daily duties, you can dictate them organically using our Voice-to-Resume feature. The AI instantly processes your speech, restructures the grammar into the professional "implied first person," injects relevant semantic keywords, and quantifies your achievements according to the XYZ formula famously championed by top tech recruiters.</p>

            <h3>File Size, Compression, and Email Deliverability</h3>
            <p>Another frequently overlooked technical constraint when using graphic design software is file export bloat. Because Canva handles fonts and elements as complex vector paths or high-resolution rasters, exporting a simple one-page resume can easily result in a PDF file exceeding 5 or even 10 Megabytes (MB). Many corporate email servers and online application portals impose strict 2MB or 5MB file size upload limits. If you manage to bypass those limits, massive attachments are frequently flagged by aggressive spam filters.</p>
            <p>Conversely, a dedicated platform like Hirecta generates ultra-lean, text-based PDF documents. A two-page Hirecta resume rarely exceeds 150 Kilobytes (KB). This guarantees instantaneous upload speeds across any applicant portal, perfect rendering across mobile devices, and zero risk of hitting an arbitrary server size cap.</p>

            <h3>The Legal and Compliance Risks of Resume Headshots</h3>
            <p>It is worth noting that hundreds of Canva's most popular resume templates feature prominent circular cut-outs for candidate headshots. While including a photograph on a CV is standard practice in several European and Asian employment markets, it is a catastrophic mistake if you are applying for corporate roles in the United States, Canada, or the United Kingdom.</p>
            <p>Due to strict Equal Employment Opportunity (EEO) laws and rigorous corporate diversity and inclusion mandates, exposing a recruiter to your age, race, gender, or physical appearance prior to an interview opens the company up to unconscious bias and potential discrimination lawsuits. As a defensive HR protocol, many Fortune 500 companies have instituted policies mandating the immediate rejection and deletion of any resume containing a photograph. By defaulting to Canva's headshot templates, you guarantee you will not be hired by these organizations.</p>

            <h3>The Strategic Advantage of Dedicated Typography</h3>
            <p>Typography is a subtle science that heavily influences how authoritative and professional your document feels. Canva overwhelms users with thousands of decorative, cursive, and display fonts that are entirely inappropriate for professional documentation. Using a heavily stylized serif font might look cool on a coffee shop poster, but it significantly reduces the legibility of an 11-point font bullet point detailing a quarterly revenue increase.</p>
            <p>Hirecta curates a specific, highly restrained selection of professional fonts optimized for digital and print readability. We prioritize clean sans-serif typefaces (like Inter, Roboto, and system UI fonts) and highly legible traditional serifs (like Garamond and Times New Roman). We manage the line-height (leading) and character spacing (tracking) automatically, ensuring your document maintains perfect typographic rhythm without you having to manually adjust text boxes.</p>

            <h3>Conclusion: Form Should Follow Function</h3>
            <p>The allure of a radically unique, beautifully colored resume is understandable. You want to execute every possible strategy to stand out in a stack of hundreds of applicants. However, the harsh reality of the 2026 hiring gauntlet is that standing out for the wrong reasons—by breaking systemic formatting rules and failing digital keyword filters—is worse than blending in.</p>
            <p>A successful resume is a structured data document. Its primary objective is the rapid, frictionless transfer of professional qualifications from your career history into a recruiter's matrix. Making an employer work harder to evaluate you is a losing strategy. Canva is a brilliant tool for visual communication, but it is the wrong tool for career advancement.</p>
            <p>Hirecta was engineered specifically to solve the problems that graphic design software creates. We provide templates that are visually immaculate, deeply professional, and guaranteed to pass Applicant Tracking Systems. We provide cutting-edge AI tools to elevate your narrative, ensuring that your content is as robust as your layout. Do not jeopardize your career trajectory on a flyer-making tool. Switch to a dedicated, ATS-first platform that respects the rigorous technical demands of the modern employment landscape. Create your pristine, free PDF with Hirecta today.</p>
        </>
    );

    return (
        <CompetitorPage
            competitor={canvaData}
            features={features}
            faqs={faqs}
            slug="canva"
            metadataTitle="Canva Resume Alternative 2026: Why Canva Resumes Fail ATS"
            metadataDescription="Using Canva for your resume? Learn why beautiful designs fail ATS bots and why Hirecta is the best free alternative for professional, job-winning formats."
            heroTitle={
                <>
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ATS-Friendly Alternative</span> to Canva
                </>
            }
            heroSubtitle="Don't let a beautiful design ruin your chances. Stop using graphic design tools for resumes and switch to Hirecta for ATS-optimized templates that actually land interviews."
            verdictTitle="Hirecta is the intelligent choice for online applications."
            verdictText={
                <>
                    <p>
                        Canva is an incredible tool for making flyers and Instagram posts. But forcing it to make a resume is a massive mistake for online job applications. <strong>Canva files routinely fail Applicant Tracking Systems</strong> because bots cannot read text trapped in floating graphic boxes.
                    </p>
                    <p>
                        <strong>Hirecta gives you the best of both worlds.</strong> Our templates are designed by professionals to be beautiful and modern, but they are built on a strict, HTML-based coding structure that guarantees 100% readability by every major ATS. Stop risking your dream job on a graphic design tool.
                    </p>
                </>
            }
            articleContent={<CanvaArticle />}
        />
    );
}
