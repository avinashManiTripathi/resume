"use client";




export default function IntegrationsPage() {
    return (
        <main className="page">


            <section className="hero-simple">
                <div className="container">
                    <h1>Integrations</h1>
                    <p className="lead">Connect ProfResume with your favorite platforms (Coming Soon)</p>
                </div>
            </section>

            <section className="integrations">
                <div className="container">
                    <div className="integration-grid">
                        <div className="integration-card coming-soon">
                            <div className="integration-icon">💼</div>
                            <h3>LinkedIn</h3>
                            <p>Import your LinkedIn profile data automatically</p>
                            <span className="badge">Coming Soon</span>
                        </div>
                        <div className="integration-card coming-soon">
                            <div className="integration-icon">📧</div>
                            <h3>Email</h3>
                            <p>Send resumes directly to employers</p>
                            <span className="badge">Coming Soon</span>
                        </div>
                        <div className="integration-card coming-soon">
                            <div className="integration-icon">☁️</div>
                            <h3>Cloud Storage</h3>
                            <p>Save to Google Drive, Dropbox, and more</p>
                            <span className="badge">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </section>


            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hero-simple { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; }
        .lead { font-size: 1.25rem; color: #6B7280; }
        .integrations { padding: 4rem 2rem; }
        .integration-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .integration-card { background: white; padding: 2.5rem; border-radius: 1.5rem; border: 2px solid #E5E7EB; text-align: center; }
        .integration-card.coming-soon { opacity: 0.6; }
        .integration-icon { font-size: 3rem; margin-bottom: 1rem; }
        .integration-card h3 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
        .integration-card p { color: #6B7280; margin-bottom: 1rem; }
        .badge { display: inline-block; background: #FEF3C7; color: #92400E; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem; font-weight: 600; }
      `}</style>
        </main>
    );
}
