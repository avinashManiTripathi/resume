"use client";

export function Navigation() {
  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <a href="/" className="logo">Resume<span className="logo-accent">Pro</span></a>

          <div className="nav-links">
            {/* Product Dropdown */}
            <div className="nav-item">
              <button className="nav-trigger">
                Product
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="mega-dropdown mega-dropdown-wide">
                <div className="dropdown-grid">
                  <div className="dropdown-column">
                    <a href="/#features" className="dropdown-item">
                      <div className="item-icon">🎯</div>
                      <div className="item-text">
                        <div className="item-title">Features</div>
                        <div className="item-desc">Powerful resume building tools</div>
                      </div>
                    </a>
                    <a href="/templates" className="dropdown-item">
                      <div className="item-icon">📄</div>
                      <div className="item-text">
                        <div className="item-title">Templates</div>
                        <div className="item-desc">ATS-friendly designs</div>
                      </div>
                    </a>
                    <a href="/pricing" className="dropdown-item">
                      <div className="item-icon">💎</div>
                      <div className="item-text">
                        <div className="item-title">Pricing</div>
                        <div className="item-desc">Simple, transparent pricing</div>
                      </div>
                    </a>
                  </div>
                  <div className="dropdown-column">
                    <a href="/use-cases" className="dropdown-item">
                      <div className="item-icon">👥</div>
                      <div className="item-text">
                        <div className="item-title">Use Cases</div>
                        <div className="item-desc">For students, professionals & more</div>
                      </div>
                    </a>
                    <a href="/examples" className="dropdown-item">
                      <div className="item-icon">✨</div>
                      <div className="item-text">
                        <div className="item-title">Examples</div>
                        <div className="item-desc">Real resume showcases</div>
                      </div>
                    </a>
                    <a href="/integrations" className="dropdown-item">
                      <div className="item-icon">🔗</div>
                      <div className="item-text">
                        <div className="item-title">Integrations</div>
                        <div className="item-desc">Connect with LinkedIn & more</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="nav-item">
              <button className="nav-trigger">
                Resources
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="mega-dropdown mega-dropdown-wide">
                <div className="dropdown-grid">
                  <div className="dropdown-column">
                    <div className="column-header">Guides</div>
                    <a href="/resources/resume-guide" className="dropdown-item">
                      <div className="item-icon">📖</div>
                      <div className="item-text">
                        <div className="item-title">Resume Writing Guide</div>
                        <div className="item-desc">Complete guide to writing resumes</div>
                      </div>
                    </a>
                    <a href="/resources/cover-letter-guide" className="dropdown-item">
                      <div className="item-icon">✍️</div>
                      <div className="item-text">
                        <div className="item-title">Cover Letter Guide</div>
                        <div className="item-desc">Write compelling cover letters</div>
                      </div>
                    </a>
                    <a href="/resources/ats-guide" className="dropdown-item">
                      <div className="item-icon">🤖</div>
                      <div className="item-text">
                        <div className="item-title">ATS Guide</div>
                        <div className="item-desc">Beat applicant tracking systems</div>
                      </div>
                    </a>
                  </div>
                  <div className="dropdown-column">
                    <div className="column-header">Learn</div>
                    <a href="/blog" className="dropdown-item">
                      <div className="item-icon">📝</div>
                      <div className="item-text">
                        <div className="item-title">Blog</div>
                        <div className="item-desc">Career tips and insights</div>
                      </div>
                    </a>
                    <a href="/resources/career-tips" className="dropdown-item">
                      <div className="item-icon">💼</div>
                      <div className="item-text">
                        <div className="item-title">Career Tips</div>
                        <div className="item-desc">Job search strategies</div>
                      </div>
                    </a>
                    <a href="/resources/industry-examples" className="dropdown-item">
                      <div className="item-icon">🏭</div>
                      <div className="item-text">
                        <div className="item-title">Industry Examples</div>
                        <div className="item-desc">Resumes by industry</div>
                      </div>
                    </a>
                    <a href="/help" className="dropdown-item">
                      <div className="item-icon">❓</div>
                      <div className="item-text">
                        <div className="item-title">Help & FAQ</div>
                        <div className="item-desc">Get answers quickly</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="nav-item">
              <button className="nav-trigger">
                Company
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="mega-dropdown mega-dropdown-wide">
                <div className="dropdown-grid">
                  <div className="dropdown-column">
                    <div className="column-header">About</div>
                    <a href="/about" className="dropdown-item">
                      <div className="item-icon">🏢</div>
                      <div className="item-text">
                        <div className="item-title">About Us</div>
                        <div className="item-desc">Our mission and team</div>
                      </div>
                    </a>
                    <a href="/contact" className="dropdown-item">
                      <div className="item-icon">✉️</div>
                      <div className="item-text">
                        <div className="item-title">Contact</div>
                        <div className="item-desc">Get in touch</div>
                      </div>
                    </a>
                  </div>
                  <div className="dropdown-column">
                    <div className="column-header">Trust</div>
                    <a href="/reviews" className="dropdown-item">
                      <div className="item-icon">⭐</div>
                      <div className="item-text">
                        <div className="item-title">Reviews</div>
                        <div className="item-desc">What our users say</div>
                      </div>
                    </a>
                    <a href="/success-stories" className="dropdown-item">
                      <div className="item-icon">🎉</div>
                      <div className="item-text">
                        <div className="item-title">Success Stories</div>
                        <div className="item-desc">Real career transformations</div>
                      </div>
                    </a>
                    <a href="/vs" className="dropdown-item">
                      <div className="item-icon">⚖️</div>
                      <div className="item-text">
                        <div className="item-title">Comparison</div>
                        <div className="item-desc">Why choose ResumePro</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a href="http://localhost:3002" className="nav-cta" target="_blank" rel="noopener noreferrer">
              Start Free →
            </a>

          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" id="mobile-menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobile-menu">
        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <div className="mobile-section-title">Product</div>
            <a href="/#features">Features</a>
            <a href="/templates">Templates</a>
            <a href="/pricing">Pricing</a>
            <a href="/use-cases">Use Cases</a>
            <a href="/examples">Examples</a>
            <a href="/integrations">Integrations</a>
          </div>
          <div className="mobile-menu-section">
            <div className="mobile-section-title">Resources</div>
            <a href="/resources/resume-guide">Resume Writing Guide</a>
            <a href="/resources/cover-letter-guide">Cover Letter Guide</a>
            <a href="/resources/ats-guide">ATS Guide</a>
            <a href="/blog">Blog</a>
            <a href="/resources/career-tips">Career Tips</a>
            <a href="/resources/industry-examples">Industry Examples</a>
            <a href="/help">Help & FAQ</a>
          </div>
          <div className="mobile-menu-section">
            <div className="mobile-section-title">Company</div>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/reviews">Reviews</a>
            <a href="/success-stories">Success Stories</a>
            <a href="/vs">Comparison</a>
          </div>
          <a href="/editor" className="mobile-cta">Start Free →</a>
        </div>
      </div>

      <style jsx>{`
        /* Navigation */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #E5E7EB;
          z-index: 1000;
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111827;
          text-decoration: none;
        }

        .logo-accent {
          color: #3B82F6;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-trigger {
          background: none;
          border: none;
          color: #6B7280;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0;
          transition: color 0.2s;
        }

        .nav-trigger:hover {
          color: #111827;
        }

        .nav-trigger svg {
          transition: transform 0.2s;
        }

        .nav-item:hover .nav-trigger svg {
          transform: rotate(180deg);
        }

        .mega-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          padding: 1.5rem;
          min-width: 320px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s;
          margin-top: 0.5rem;
        }

        .mega-dropdown-wide {
          min-width: 520px;
        }

        .nav-item:hover .mega-dropdown {
          opacity: 1;
          visibility: visible;
        }

        .dropdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .dropdown-column {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .column-header {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.5rem 1rem;
        }

        .dropdown-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: background 0.2s;
          text-decoration: none;
          color: inherit;
        }

        .dropdown-item:hover {
          background: #F9FAFB;
        }

        .item-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .item-text {
          flex: 1;
        }

        .item-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .item-desc {
          font-size: 0.875rem;
          color: #6B7280;
        }

        .nav-cta {
          background: #111827;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-cta:hover {
          background: #1F2937;
          transform: translateY(-1px);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #111827;
          cursor: pointer;
          padding: 0.5rem;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.3s;
          overflow-y: auto;
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .mobile-menu-content {
          padding: 5rem 2rem 2rem;
        }

        .mobile-menu-section {
          margin-bottom: 2rem;
        }

        .mobile-section-title {
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .mobile-menu-section a {
          display: block;
          padding: 0.75rem 0;
          color: #6B7280;
          text-decoration: none;
          transition: color 0.2s;
        }

        .mobile-menu-section a:hover {
          color: #111827;
        }

        .mobile-cta {
          display: block;
          background: #111827;
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{
        __html: `
          if (typeof window !== 'undefined') {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuBtn && mobileMenu) {
              mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
              });
              
              mobileMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                  mobileMenu.classList.remove('active');
                }
              });
            }
          }
        `
      }} />
    </>
  );
}
