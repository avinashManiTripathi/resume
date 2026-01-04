"use client";



export default function UseCasesPage() {
  return (
    <main className="page">


      {/* Hero Section */}
      <section className="hero-simple">
        <div className="container">
          <h1>Resume Builder for Everyone</h1>
          <p className="lead">Whether you're a student, professional, or executive, ProfResume has the perfect solution for your career goals.</p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="use-cases">
        <div className="container">
          <div className="use-case-grid">
            {/* Students */}
            <div className="use-case-card">
              <div className="use-case-icon">🎓</div>
              <h2>Students & Recent Graduates</h2>
              <p>Create your first professional resume with templates designed for entry-level positions and internships.</p>
              <ul className="benefits">
                <li>✓ Student-friendly templates</li>
                <li>✓ Highlight education and projects</li>
                <li>✓ Internship-focused layouts</li>
                <li>✓ Free tier perfect for students</li>
              </ul>
              <a href="/editor" className="cta-button">Start Your Resume</a>
            </div>

            {/* Professionals */}
            <div className="use-case-card featured">
              <div className="use-case-icon">💼</div>
              <h2>Working Professionals</h2>
              <p>Showcase your experience and skills with ATS-optimized templates that get past recruiters' systems.</p>
              <ul className="benefits">
                <li>✓ ATS-friendly formats</li>
                <li>✓ Professional templates</li>
                <li>✓ Easy experience tracking</li>
                <li>✓ Multiple resume versions</li>
              </ul>
              <a href="/editor" className="cta-button primary">Create Resume</a>
            </div>

            {/* Career Changers */}
            <div className="use-case-card">
              <div className="use-case-icon">🔄</div>
              <h2>Career Changers</h2>
              <p>Pivot to a new industry with resumes that highlight transferable skills and relevant experience.</p>
              <ul className="benefits">
                <li>✓ Skills-based templates</li>
                <li>✓ Transferable skills focus</li>
                <li>✓ Industry-specific examples</li>
                <li>✓ Career transition guides</li>
              </ul>
              <a href="/editor" className="cta-button">Get Started</a>
            </div>

            {/* Executives */}
            <div className="use-case-card">
              <div className="use-case-icon">👔</div>
              <h2>Executives & Leaders</h2>
              <p>Executive-level resumes that showcase leadership, achievements, and strategic impact.</p>
              <ul className="benefits">
                <li>✓ Executive templates</li>
                <li>✓ Achievement-focused layouts</li>
                <li>✓ Leadership highlights</li>
                <li>✓ Premium support</li>
              </ul>
              <a href="/editor" className="cta-button">Build Executive Resume</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Create Your Perfect Resume?</h2>
          <p>Join thousands of job seekers who've landed their dream jobs with ProfResume</p>
          <a href="/editor" className="cta-button large">Start Building Free →</a>
        </div>
      </section>



      <style jsx>{`
        .page {
          background: #FAFAFA;
          min-height: 100vh;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-simple {
          padding: 6rem 2rem 4rem;
          background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
          text-align: center;
        }

        .hero-simple h1 {
          font-size: 3rem;
          font-weight: 900;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .lead {
          font-size: 1.25rem;
          color: #6B7280;
          max-width: 700px;
          margin: 0 auto;
        }

        .use-cases {
          padding: 4rem 2rem;
        }

        .use-case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .use-case-card {
          background: white;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 2px solid #E5E7EB;
          transition: all 0.3s;
        }

        .use-case-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #3B82F6;
        }

        .use-case-card.featured {
          border-color: #3B82F6;
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
        }

        .use-case-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .use-case-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }

        .use-case-card p {
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }

        .benefits li {
          color: #374151;
          padding: 0.5rem 0;
          font-size: 0.9375rem;
        }

        .cta-button {
          display: inline-block;
          padding: 0.875rem 1.75rem;
          background: white;
          color: #111827;
          border: 2px solid #E5E7EB;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .cta-button:hover {
          border-color: #111827;
          transform: translateY(-2px);
        }

        .cta-button.primary {
          background: #111827;
          color: white;
          border-color: #111827;
        }

        .cta-button.primary:hover {
          background: #1F2937;
        }

        .cta-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          text-align: center;
          color: white;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-button.large {
          padding: 1.25rem 2.5rem;
          font-size: 1.125rem;
          background: white;
          color: #3B82F6;
          border: none;
        }

        .cta-button.large:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .hero-simple h1 {
            font-size: 2rem;
          }

          .use-case-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
