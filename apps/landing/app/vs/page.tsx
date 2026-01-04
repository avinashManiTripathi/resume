"use client";

export default function ComparisonPage() {
    return (
        <main className="page">


            <section className="hero-simple">
                <div className="container">
                    <h1>Why Choose ProfResume?</h1>
                    <p className="lead">See how we compare to other resume builders</p>
                </div>
            </section>

            <section className="comparison">
                <div className="container">
                    <div className="comparison-table">
                        <div className="table-header">
                            <div className="feature-col">Feature</div>
                            <div className="ProfResume-col">ProfResume</div>
                            <div className="competitor-col">Others</div>
                        </div>
                        {[
                            { feature: "ATS Optimization", ProfResume: true, competitor: "Limited" },
                            { feature: "Free Plan", ProfResume: true, competitor: false },
                            { feature: "Unlimited Resumes (Pro)", ProfResume: true, competitor: "Limited" },
                            { feature: "PDF Export", ProfResume: true, competitor: true },
                            { feature: "DOCX Export", ProfResume: true, competitor: "Paid only" },
                            { feature: "Cover Letter Builder", ProfResume: true, competitor: "Extra cost" },
                            { feature: "Real-time Preview", ProfResume: true, competitor: true },
                            { feature: "Mobile Friendly", ProfResume: true, competitor: "Limited" },
                            { feature: "Customer Support", ProfResume: "24/7", competitor: "Business hours" },
                            { feature: "Price (Pro)", ProfResume: "$9/mo", competitor: "$15-30/mo" },
                        ].map((row, i) => (
                            <div key={i} className="table-row">
                                <div className="feature-col">{row.feature}</div>
                                <div className="ProfResume-col">
                                    {typeof row.ProfResume === 'boolean' ? (
                                        row.ProfResume ? <span className="check">✓</span> : <span className="cross">✗</span>
                                    ) : (
                                        <span className="text">{row.ProfResume}</span>
                                    )}
                                </div>
                                <div className="competitor-col">
                                    {typeof row.competitor === 'boolean' ? (
                                        row.competitor ? <span className="check">✓</span> : <span className="cross">✗</span>
                                    ) : (
                                        <span className="text">{row.competitor}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cta-box">
                        <h2>Ready to Experience the Difference?</h2>
                        <a href="/editor" className="cta-button">Try ProfResume Free →</a>
                    </div>
                </div>
            </section>



            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hero-simple { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; }
        .lead { font-size: 1.25rem; color: #6B7280; }
        .comparison { padding: 4rem 2rem; }
        .comparison-table { background: white; border-radius: 1.5rem; overflow: hidden; border: 2px solid #E5E7EB; margin-bottom: 3rem; }
        .table-header, .table-row { display: grid; grid-template-columns: 2fr 1fr 1fr; }
        .table-header { background: #F9FAFB; font-weight: 700; color: #111827; border-bottom: 2px solid #E5E7EB; }
        .table-header > div, .table-row > div { padding: 1.25rem 1.5rem; }
        .table-row { border-bottom: 1px solid #F3F4F6; }
        .table-row:last-child { border-bottom: none; }
        .ProfResume-col { background: #EEF2FF; font-weight: 600; }
        .check { color: #10B981; font-size: 1.5rem; font-weight: 700; }
        .cross { color: #EF4444; font-size: 1.5rem; }
        .text { color: #111827; font-weight: 600; }
        .cta-box { background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 4rem 2rem; border-radius: 2rem; text-align: center; color: white; }
        .cta-box h2 { font-size: 2rem; font-weight: 900; margin-bottom: 2rem; }
        .cta-button { display: inline-block; padding: 1.25rem 2.5rem; background: white; color: #3B82F6; border-radius: 0.75rem; font-weight: 600; text-decoration: none; font-size: 1.125rem; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        @media (max-width: 768px) { .hero-simple h1 { font-size: 2rem; } .table-header, .table-row { grid-template-columns: 1fr; } .ProfResume-col, .competitor-col { background: white; } }
      `}</style>
        </main>
    );
}
