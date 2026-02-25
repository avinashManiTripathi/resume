import { CompetitorPage, type CompetitorData, type ComparisonFeature, type FAQItem } from '@/components/CompetitorPage';

export default function MyPerfectResumeComparisonPage() {
    const myPerfectResumeData: CompetitorData = {
        name: "MyPerfectResume",
        description: "A veteran resume builder that offers extensive pre-written phrases but is frequently criticized for its hidden subscription fees and difficult cancellation process.",
        rating: "3.9",
        price: "$23.95/month (after $2.95 14-day trial)",
        pros: [
            "Large database of pre-written industry phrases",
            "Built-in cover letter generator",
            "Easy section-by-section setup process"
        ],
        cons: [
            "Notorious for hidden subscription costs",
            "Requires payment just to download a basic PDF",
            "Templates are incredibly dated and rigid",
            "Customer service cancellation hurdles"
        ]
    };

    const features: ComparisonFeature[] = [
        { name: "Cost to Download", hirecta: "100% Free", hirectaHighlight: true, competitor: "Requires Paid Subscription" },
        { name: "Pricing Transparency", hirecta: "No Hidden Fees", hirectaHighlight: true, competitor: "Opaque (Upsells at End)" },
        { name: "AI Technology", hirecta: "Advanced Contextual AI", hirectaHighlight: true, competitor: "Basic Phrase Scraping" },
        { name: "Template Modernity", hirecta: "2026 Industry Standards", competitor: "Legacy Formatting" },
        { name: "Voice Input", hirecta: true, hirectaHighlight: true, competitor: false },
        { name: "Data Privacy", hirecta: "Strict Privacy Controls", competitor: "Data Sharing Flags" },
        { name: "Cancellation Policy", hirecta: "Not Required (No CC Needed)", hirectaHighlight: true, competitor: "Known to be Difficult" }
    ];

    const faqs: FAQItem[] = [
        {
            question: "Why does MyPerfectResume charge $2.95?",
            answer: "MyPerfectResume typically lures users in with a '$2.95 for 14-days' trial just as they are trying to download the resume they spent an hour building. What many users miss in the fine print is that this trial auto-renews into a monthly subscription of around $23.95 if not explicitly canceled."
        },
        {
            question: "Is Hirecta actually free, unlike MyPerfectResume?",
            answer: "Yes, Hirecta is completely transparent. You can build your resume, use our AI tools, and download an unlimited number of ATS-optimized PDFs without ever providing a credit card. No trials, no hidden subscriptions, no paywalls at checkout."
        },
        {
            question: "How do Hirecta's templates compare to MyPerfectResume?",
            answer: "MyPerfectResume relies on legacy templates that often look outdated to modern recruiters. Hirecta's templates are designed for 2026, balancing clean, modern aesthetics with rigorous Applicant Tracking System (ATS) parsing requirements."
        }
    ];

    const MyPerfectResumeArticle = () => (
        <>
            <h3>The Sunk Cost Fallacy: Weaponizing the Job Search in 2026</h3>
            <p>For over a decade, MyPerfectResume has been a dominant force in the online resume building market. However, their market dominance is increasingly built on an aging business model designed to exploit the psychological vulnerability of active job seekers. When you sign up for MyPerfectResume, the interface implies a free service. You are encouraged to invest upwards of an hour entering your career history, meticulously selecting pre-written bullet points, and adjusting the margins of your selected template. You feel a sense of accomplishment right up until the final moment: clicking "Download." It is only at this precipice that the paywall descends. You cannot export your hard work without submitting a credit card for a "14-day trial." This is the textbook definition of the sunk cost fallacy—because you have already invested so much time compiling the document, you feel compelled to pay the toll rather than start over elsewhere.</p>

            <h3>The Truth About "14-Day Trials" and Auto-Renewals</h3>
            <p>The upfront cost presented to a user desperate to submit a job application is usually a seemingly harmless $2.95. However, this is rarely a one-time fee. Buried in the complex terms and conditions is a clause stipulating that if you do not actively navigate a convoluted cancellation process within exactly 336 hours, your credit card will be automatically charged a recurring monthly subscription fee that frequently hovers around $23.95. For a job seeker who is, by definition, likely trying to secure a stabilizing income, an unexpected $24 charge a month later can cause serious financial friction.</p>
            <p>Furthermore, review platforms are saturated with complaints regarding the difficulty of the cancellation process itself. Tactics such as requiring users to call a customer service representative during specific business hours, navigating intentionally confusing cancellation interfaces ("dark patterns"), or outright ignoring emailed cancellation requests have been well-documented hallmarks of legacy subscription builders. Hirecta was engineered specifically to destroy this paradigm. We believe that your professional narrative is your property. Hirecta requires zero credit card information to download a pristine, ATS-optimized PDF. Our platform is 100% transparent: the core resume builder is, and always will be, free.</p>

            <h3>The Illusion of Pre-Written Phrases vs. Contextual Generative AI</h3>
            <p>One of MyPerfectResume’s historically lauded features is its vast database of pre-written industry phrases. If you are a Marketing Manager, you can click a button and select from hundreds of generic bullet points like "Managed execution of marketing campaigns." Ten years ago, this was a helpful feature. In 2026, it is a liability. Because millions of users have been selecting from the exact same database of phrases for a decade, recruiters and Applicant Tracking Systems immediately recognize boilerplate text. It signals laziness and a lack of specific, quantifiable impact.</p>
            <p>Hirecta does not rely on a static database of clichés. We utilize state-of-the-art Large Language Models customized explicitly for career advising. Instead of making you choose a generic phrase, Hirecta's AI actively analyzes the semantic requirements of the specific job you are applying for. You provide the raw input—e.g., "I ran social media for a year and got us 10k followers"—and Hirecta instantly rewrites it into a metric-driven powerhouse statement: "Directed comprehensive social media strategy, achieving a 10,000+ net follower acquisition within 12 months." Unlike MyPerfectResume, Hirecta ensures your application is entirely unique and deeply optimized for modern algorithms.</p>

            <h3>Template Modernity: Why Standing Still is Falling Behind</h3>
            <p>The aesthetic architecture of a resume signals your professional currency. Many of MyPerfectResume’s most popular templates were designed over a decade ago. They frequently feature heavy borders, complex table structures, and typography choices that feel aggressively dated (such as reliance on Times New Roman paired with thick horizontal lines). In the modern corporate landscape—particularly in technology, finance, startups, and creative sectors—a dated resume format subconsciously telegraphs that the candidate themselves may be technically obsolete or out of touch with modern business communication standards.</p>
            <p>Hirecta's design library is aggressively maintained and constantly updated to reflect 2026 industry standards. We collaborate directly with hiring managers and lead tech recruiters to ensure our templates strike the perfect balance between modern, clean aesthetics and rigorous ATS parsing compliance. Every Hirecta template utilizes sophisticated whitespace management, highly legible modern typefaces (like Inter and Roboto), and subtle typographic hierarchies to guide the reader's eye intuitively to your most impressive metrics.</p>

            <h3>The Voice-to-Resume Advantage</h3>
            <p>Job searching is inherently stressful, and the staring-at-a-blank-screen phase of resume writing is often where candidates experience the most friction. Both builders offer traditional text inputs, but Hirecta pioneers a significantly more accessible approach with our proprietary Voice-to-Resume technology. Users can simply activate their microphone and speak their professional history as if they were talking to a career coach. The Hirecta AI processes the audio, extracts the core competencies and metrics, restructures the grammar into strictly professional "implied first person" syntax, and instantly formats the output onto the page. This dramatically accelerates the writing process and helps candidates who struggle with traditional typing or structuring articulate their true value.</p>

            <h3>Data Portability and Security</h3>
            <p>When you utilize an online resume service, you are centralizing incredibly sensitive personal data: your home address, your email, your phone number, and your entire employment history. Historically, legacy builders have utilized aggressive data monetization strategies, selling anonymized (and sometimes deanonymized) user data to third-party marketing firms or aggressive recruiting agencies once you provide your email address. You may start receiving spam job alerts for roles entirely outside your expertise.</p>
            <p>Hirecta is built on a foundation of cryptographic trust. We employ AES-256 encryption at rest, and we have fundamentally rejected the data brokering business model. We do not sell your personal information. Furthermore, Hirecta provides complete data portability. You can delete your account with a single click in your settings dashboard, instantaneously and permanently purging all of your data from our AWS servers. The ability to control your own information should be a right, not a premium feature.</p>

            <h3>Applicant Tracking Systems: The "Plain Text" Test</h3>
            <p>The final, and perhaps most critical, area where Hirecta outperforms legacy services is in strict Applicant Tracking System (ATS) compliance. Many older builders rely on complex HTML-to-PDF rendering protocols that use nested tables to achieve dual-column visual layouts. While it may look acceptable on a computer screen, when an ATS (like Taleo or Lever) attempts to parse the document using Optical Character Recognition (OCR), the data structure collapses. The bots cannot decipher the nested tables, leading to jumbled data and automatic rejection.</p>
            <p>Hirecta’s entire architecture is "ATS-First." Regardless of how visually complex your chosen template appears, the underlying HTML structure is generated utilizing strict semantic hierarchies (H1 &gt; H2 &gt; P). When you download a PDF from Hirecta, you can guarantee that if an enterprise scanning bot reads it, it will perfectly extract every keyword, date, and job title sequentially, maximizing your keyword match score and ensuring human eyes actually review your application.</p>

            <h3>Conclusion: Upgrade Your Career Toolkit</h3>
            <p>For years, job seekers have accepted the frustration of predatory subscription models and outdated technology because they believed they had no alternative. Hirecta was created to be that alternative. Your time and financial security are valuable. You should not have to navigate a maze of customer service phone numbers just to avoid a $24 monthly fee for a single PDF. You should not have to rely on generic, recycled phrases to describe your unique career impact.</p>
            <p>We invite you to experience the difference of a platform engineered with transparency, modern AI, and robust engineering. Switch to Hirecta today. Build a better resume, leverage advanced context-aware AI, verify your ATS compatibility, and download your pristine PDF—all completely free, with zero hidden catches.</p>
        </>
    );

    return (
        <CompetitorPage
            competitor={myPerfectResumeData}
            features={features}
            faqs={faqs}
            slug="myperfectresume"
            metadataTitle="MyPerfectResume Alternative 2026: Avoid Hidden Subscription Fees"
            metadataDescription="Tired of hidden fees and auto-renewing subscriptions? See why Hirecta is the top-rated free alternative to MyPerfectResume with modern AI and free downloads."
            heroTitle={
                <>
                    The Honest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MyPerfectResume Alternative</span>
                </>
            }
            heroSubtitle="Build and download your modern, ATS-optimized resume without entering a credit card. Hirecta provides superior AI tools with absolute pricing transparency."
            verdictTitle="Stop paying for what should be free."
            verdictText={
                <>
                    <p>
                        MyPerfectResume operates on an outdated, predatory business model. They let you spend hours building a resume only to hit you with a paywall right when you need to download it. Worse, that "$2.95 trial" often turns into a <strong>$23.95/month auto-renewing subscription</strong> that is notoriously difficult to cancel.
                    </p>
                    <p>
                        <strong>Hirecta respects your time and your wallet.</strong> We provide superior, modern templates and advanced AI writing assistance without the trap. You will never need a credit card to download your PDF on Hirecta.
                    </p>
                </>
            }
            articleContent={<MyPerfectResumeArticle />}
        />
    );
}
