"use client";

import { Footer } from "@repo/ui/footer";
import { Navigation } from "../../components/Navigation";

export default function ExamplesPage() {
    return (
        <main className="page">
            <Navigation />

            <section className="hero-simple">
                <div className="container">
                    <h1>Resume Examples That Get Results</h1>
                    <p className="lead">Real resumes created with ResumePro that helped professionals land their dream jobs.</p>
                </div>
            </section>

            <section className="examples">
                <div className="container">
                    <div className="example-grid">
                        <div className="example-card">
                            <div className="example-badge">Software Engineer</div>
                            <div className="example-preview">
                                <div className="preview-placeholder">Resume Preview</div>
                            </div>
                            <h3>Senior Software Engineer</h3>
                            <p>Landed position at FAANG company with 40% salary increase</p>
                            <div className="stats">
                                <span>⏱️ Created in 15 min</span>
                                <span>📧 12 interviews</span>
                            </div>
                        </div>

                        <div className="example-card">
                            <div className="example-badge">Marketing</div>
                            <div className="example-preview">
                                <div className="preview-placeholder">Resume Preview</div>
                            </div>
                            <h3>Marketing Manager</h3>
                            <p>Transitioned from coordinator to manager role</p>
                            <div className="stats">
                                <span>⏱️ Created in 20 min</span>
                                <span>📧 8 interviews</span>
                            </div>
                        </div>

                        <div className="example-card">
                            <div className="example-badge">Design</div>
                            <div className="example-preview">
                                <div className="preview-placeholder">Resume Preview</div>
                            </div>
                            <h3>UX Designer</h3>
                            <p>Career change from graphic design to UX</p>
                            <div className="stats">
                                <span>⏱️ Created in 18 min</span>
                                <span>📧 10 interviews</span>
                            </div>
                        </div>

                        <div className="example-card">
                            <div className="example-badge">Finance</div>
                            <div className="example-preview">
                                <div className="preview-placeholder">Resume Preview</div>
                            </div>
                            <h3>Financial Analyst</h3>
                            <p>Recent graduate landed first job at top firm</p>
                            <div className="stats">
                                <span>⏱️ Created in 12 min</span>
                                <span>📧 6 interviews</span>
                            </div>
                        </div>
                    </div>

                    <div className="cta-box">
                        <h2>Ready to Create Your Success Story?</h2>
                        <a href="/editor" className="cta-button">Start Building Your Resume →</a>
                    </div>
                </div>
            </section>

            <Footer
                sections={[
                    { title: "Product", links: [{ text: "Features", href: "#features" }, { text: "Templates", href: "/templates" }, { text: "Pricing", href: "/pricing" }] },
                    { title: "Company", links: [{ text: "About", href: "/about" }, { text: "Blog", href: "/blog" }, { text: "Contact", href: "/contact" }] },
                ]}
                socialLinks={{ twitter: "https://twitter.com", github: "https://github.com", linkedin: "https://linkedin.com" }}
                companyName="ResumePro"
            />

            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hero-simple { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; }
        .lead { font-size: 1.25rem; color: #6B7280; max-width: 700px; margin: 0 auto; }
        .examples { padding: 4rem 2rem; }
        .example-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem; }
        .example-card { background: white; border-radius: 1.5rem; overflow: hidden; border: 2px solid #E5E7EB; transition: all 0.3s; }
        .example-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border-color: #3B82F6; }
        .example-badge { background: #3B82F6; color: white; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600; text-align: center; }
        .example-preview { height: 300px; background: #F3F4F6; display: flex; align-items: center; justify-content: center; }
        .preview-placeholder { color: #9CA3AF; font-weight: 600; }
        .example-card h3 { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 1.5rem 1.5rem 0.5rem; }
        .example-card p { color: #6B7280; margin: 0 1.5rem 1rem; }
        .stats { display: flex; gap: 1rem; padding: 1rem 1.5rem; border-top: 1px solid #F3F4F6; font-size: 0.875rem; color: #6B7280; }
        .cta-box { background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 4rem 2rem; border-radius: 2rem; text-align: center; color: white; }
        .cta-box h2 { font-size: 2rem; font-weight: 900; margin-bottom: 2rem; }
        .cta-button { display: inline-block; padding: 1rem 2rem; background: white; color: #3B82F6; border-radius: 0.75rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        @media (max-width: 768px) { .hero-simple h1 { font-size: 2rem; } .example-grid { grid-template-columns: 1fr; } }
      `}</style>
        </main>
    );
}
