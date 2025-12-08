"use client";

import { Footer } from "@repo/ui/footer";
import { Navigation } from "../../components/Navigation";

export default function PrivacyPage() {
    return (
        <main className="page">
            <Navigation />

            <section className="hero-simple">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p className="lead">Last updated: December 8, 2025</p>
                </div>
            </section>

            <section className="content">
                <div className="container">
                    <div className="content-box">
                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, build a resume, or contact us for support.</p>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including to create and store your resumes.</p>

                        <h2>3. Information Sharing</h2>
                        <p>We do not sell, trade, or rent your personal information to third parties. Your resume data is yours and yours alone.</p>

                        <h2>4. Data Security</h2>
                        <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.</p>

                        <h2>5. Your Rights</h2>
                        <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>

                        <h2>6. Cookies</h2>
                        <p>We use cookies to improve your experience on our website. You can control cookie settings through your browser.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at privacy@resumepro.com</p>
                    </div>
                </div>
            </section>

            <Footer
                sections={[{ title: "Legal", links: [{ text: "Privacy Policy", href: "/privacy" }, { text: "Terms of Service", href: "/terms" }] }]}
                socialLinks={{ twitter: "https://twitter.com" }}
                companyName="ResumePro"
            />

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
