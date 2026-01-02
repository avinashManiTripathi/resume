"use client";



export default function TermsPage() {
    return (
        <main className="page">


            <section className="hero-simple">
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p className="lead">Last updated: December 8, 2025</p>
                </div>
            </section>

            <section className="content">
                <div className="container">
                    <div className="content-box">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using ResumePro, you accept and agree to be bound by the terms and provision of this agreement.</p>

                        <h2>2. Use License</h2>
                        <p>Permission is granted to use ResumePro for personal, non-commercial purposes to create and download resumes.</p>

                        <h2>3. User Account</h2>
                        <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

                        <h2>4. Content Ownership</h2>
                        <p>You retain all rights to the content you create using ResumePro. We do not claim ownership of your resumes or personal information.</p>

                        <h2>5. Prohibited Uses</h2>
                        <p>You may not use ResumePro for any illegal purposes or to violate any laws in your jurisdiction.</p>

                        <h2>6. Limitation of Liability</h2>
                        <p>ResumePro shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.</p>

                        <h2>7. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. We will notify users of any material changes.</p>

                        <h2>8. Contact</h2>
                        <p>For questions about these Terms, contact us at legal@resumepro.com</p>
                    </div>
                </div>
            </section>



            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hero-simple { padding: 6rem 2rem 2rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1rem; }
        .lead { font-size: 1.125rem; color: #6B7280; }
        .content { padding: 4rem 2rem; }
        .content-box { background: white; padding: 3rem; border-radius: 1.5rem; max-width: 800px; margin: 0 auto; }
        .content-box h2 { font-size: 1.5rem; font-weight: 700; color: #111827; margin: 2rem 0 1rem; }
        .content-box h2:first-child { margin-top: 0; }
        .content-box p { color: #6B7280; line-height: 1.7; margin-bottom: 1rem; }
        @media (max-width: 768px) { .hero-simple h1 { font-size: 2rem; } .content-box { padding: 2rem; } }
      `}</style>
        </main>
    );
}
