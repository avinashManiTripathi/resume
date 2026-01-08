"use client";


export default function SuccessStoriesPage() {
    return (
        <main className="page">

            <section className="hero-simple">
                <div className="container">
                    <h1>Success Stories</h1>
                    <p className="lead">Real people, real results. See how ProfResume helped transform careers.</p>
                </div>
            </section>

            <section className="stories">
                <div className="container">
                    {[
                        { name: "Sarah Chen", from: "Junior Developer", to: "Senior Engineer at Google", salary: "+$60k", time: "2 weeks", story: "After struggling to get interviews for months, I rebuilt my resume with ProfResume. The ATS optimization made all the difference - I went from 0 responses to 12 interviews in just 2 weeks. Now I'm at my dream company!" },
                        { name: "Michael Rodriguez", from: "Sales Associate", to: "Account Executive", salary: "+$45k", time: "3 weeks", story: "I was stuck in retail for 5 years. ProfResume helped me highlight my transferable skills and pivot into B2B sales. The career change templates were perfect for my situation." },
                        { name: "Emily Watson", from: "Recent Graduate", to: "Marketing Manager", salary: "$75k", time: "1 month", story: "As a new grad with limited experience, I didn't know how to make my resume stand out. ProfResume's student templates helped me showcase my projects and internships effectively. Landed my first job at a Fortune 500 company!" },
                    ].map((story, i) => (
                        <div key={i} className="story-card">
                            <div className="story-header">
                                <div className="avatar">{story.name.split(" ").map(n => n[0]).join("")}</div>
                                <div>
                                    <h3>{story.name}</h3>
                                    <div className="transition">
                                        <span className="from">{story.from}</span>
                                        <span className="arrow">→</span>
                                        <span className="to">{story.to}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="story-text">"{story.story}"</p>
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-value">{story.salary}</div>
                                    <div className="stat-label">Salary Increase</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-value">{story.time}</div>
                                    <div className="stat-label">Time to Offer</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Write Your Success Story?</h2>
                    <p>Join thousands who've transformed their careers with ProfResume</p>
                    <a href="https://edit.profresume.com/editor" className="cta-button">Start Your Journey →</a>
                </div>
            </section>


            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hero-simple { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; }
        .lead { font-size: 1.25rem; color: #6B7280; max-width: 700px; margin: 0 auto; }
        .stories { padding: 4rem 2rem; }
        .story-card { background: white; padding: 3rem; border-radius: 1.5rem; border: 2px solid #E5E7EB; margin-bottom: 2rem; }
        .story-header { display: flex; gap: 1.5rem; margin-bottom: 2rem; align-items: center; }
        .avatar { width: 64px; height: 64px; border-radius: 1rem; background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.5rem; flex-shrink: 0; }
        .story-header h3 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
        .transition { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
        .from { color: #6B7280; }
        .arrow { color: #3B82F6; font-weight: 700; }
        .to { color: #111827; font-weight: 600; }
        .story-text { color: #374151; font-size: 1.125rem; line-height: 1.7; margin-bottom: 2rem; font-style: italic; }
        .stats { display: flex; gap: 3rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; }
        .stat-value { font-size: 2rem; font-weight: 800; color: #3B82F6; }
        .stat-label { font-size: 0.875rem; color: #6B7280; margin-top: 0.25rem; }
        .cta-section { padding: 6rem 2rem; background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); text-align: center; color: white; }
        .cta-section h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; }
        .cta-section p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        .cta-button { display: inline-block; padding: 1.25rem 2.5rem; background: white; color: #3B82F6; border-radius: 0.75rem; font-weight: 600; text-decoration: none; font-size: 1.125rem; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        @media (max-width: 768px) { .hero-simple h1 { font-size: 2rem; } .stats { flex-direction: column; gap: 1.5rem; } }
      `}</style>
        </main>
    );
}
