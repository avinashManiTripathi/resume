"use client";


export default function ReviewsPage() {
    return (
        <main className="page">


            <section className="hero-simple">
                <div className="container">
                    <h1>What Our Users Say</h1>
                    <p className="lead">Join 50,000+ professionals who trust ResumePro</p>
                    <div className="rating">
                        <div className="stars">★★★★★</div>
                        <div className="rating-text">4.9 out of 5 based on 12,453 reviews</div>
                    </div>
                </div>
            </section>

            <section className="reviews">
                <div className="container">
                    <div className="review-grid">
                        {[
                            { name: "Sarah Chen", role: "Software Engineer", text: "Got 3 interviews in the first week! The templates are clean and professional.", rating: 5 },
                            { name: "Michael Johnson", role: "Product Manager", text: "Finally landed my dream job! This tool made my resume stand out from hundreds of applicants.", rating: 5 },
                            { name: "Emily Rodriguez", role: "UX Designer", text: "As a designer, I'm picky. These templates are actually good. Clean, modern, and effective.", rating: 5 },
                            { name: "Prateek Singh", role: "Marketing Manager", text: "The ATS optimization really works. I started getting more callbacks immediately.", rating: 5 },
                            { name: "Jessica Taylor", role: "Data Analyst", text: "Super easy to use. Created my resume in under 15 minutes and it looks amazing.", rating: 5 },
                            { name: "Alex Martinez", role: "Sales Director", text: "Best resume builder I've used. The pro features are worth every penny.", rating: 5 },
                        ].map((review, i) => (
                            <div key={i} className="review-card">
                                <div className="stars">{"★".repeat(review.rating)}</div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="reviewer">
                                    <div className="avatar">{review.name.split(" ").map(n => n[0]).join("")}</div>
                                    <div>
                                        <div className="reviewer-name">{review.name}</div>
                                        <div className="reviewer-role">{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Join Them?</h2>
                    <p>Start creating your professional resume today</p>
                    <a href="/editor" className="cta-button">Create Your Resume Free →</a>
                </div>
            </section>



            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hero-simple { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; }
        .lead { font-size: 1.25rem; color: #6B7280; margin-bottom: 2rem; }
        .rating { margin-top: 2rem; }
        .stars { color: #FBBF24; font-size: 2rem; margin-bottom: 0.5rem; }
        .rating-text { color: #6B7280; font-size: 1.125rem; }
        .reviews { padding: 4rem 2rem; }
        .review-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; }
        .review-card { background: white; padding: 2rem; border-radius: 1.5rem; border: 1px solid #E5E7EB; }
        .review-card .stars { color: #FBBF24; font-size: 1.25rem; margin-bottom: 1rem; }
        .review-text { color: #111827; font-size: 1.125rem; line-height: 1.6; margin-bottom: 1.5rem; }
        .reviewer { display: flex; gap: 1rem; align-items: center; }
        .avatar { width: 48px; height: 48px; border-radius: 0.5rem; background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }
        .reviewer-name { font-weight: 600; color: #111827; }
        .reviewer-role { font-size: 0.875rem; color: #6B7280; }
        .cta-section { padding: 6rem 2rem; background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); text-align: center; color: white; }
        .cta-section h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; }
        .cta-section p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        .cta-button { display: inline-block; padding: 1.25rem 2.5rem; background: white; color: #3B82F6; border-radius: 0.75rem; font-weight: 600; text-decoration: none; font-size: 1.125rem; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        @media (max-width: 768px) { .hero-simple h1 { font-size: 2rem; } .review-grid { grid-template-columns: 1fr; } }
      `}</style>
        </main>
    );
}
