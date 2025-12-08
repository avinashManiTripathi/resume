"use client";

import { Footer } from "@repo/ui/footer";

export default function Home() {
  return (
    <main className="landing-page">
      {/* Mega Menu Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">Resume<span className="logo-accent">Pro</span></div>

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
                    <a href="#features" className="dropdown-item">
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
                        <div className="item-desc">Our mission and story</div>
                      </div>
                    </a>
                    <a href="/contact" className="dropdown-item">
                      <div className="item-icon">✉️</div>
                      <div className="item-text">
                        <div className="item-title">Contact</div>
                        <div className="item-desc">Get in touch with us</div>
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

            <a href="/editor" className="nav-cta">Start Free →</a>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" id="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-section">
            <div className="mobile-section-title">Product</div>
            <a href="#features" className="mobile-link">🎯 Features</a>
            <a href="/templates" className="mobile-link">📄 Templates</a>
            <a href="/pricing" className="mobile-link">💎 Pricing</a>
            <a href="/use-cases" className="mobile-link">👥 Use Cases</a>
            <a href="/examples" className="mobile-link">✨ Examples</a>
            <a href="/integrations" className="mobile-link">🔗 Integrations</a>
          </div>
          <div className="mobile-section">
            <div className="mobile-section-title">Resources</div>
            <a href="/resources/resume-guide" className="mobile-link">📖 Resume Guide</a>
            <a href="/resources/cover-letter-guide" className="mobile-link">✍️ Cover Letter Guide</a>
            <a href="/resources/ats-guide" className="mobile-link">🤖 ATS Guide</a>
            <a href="/blog" className="mobile-link">📝 Blog</a>
            <a href="/resources/career-tips" className="mobile-link">💼 Career Tips</a>
            <a href="/resources/industry-examples" className="mobile-link">🏭 Industry Examples</a>
            <a href="/help" className="mobile-link">❓ Help & FAQ</a>
          </div>
          <div className="mobile-section">
            <div className="mobile-section-title">Company</div>
            <a href="/about" className="mobile-link">🏢 About Us</a>
            <a href="/contact" className="mobile-link">✉️ Contact</a>
            <a href="/reviews" className="mobile-link">⭐ Reviews</a>
            <a href="/success-stories" className="mobile-link">🎉 Success Stories</a>
            <a href="/vs" className="mobile-link">⚖️ Comparison</a>
          </div>
          <a href="/editor" className="mobile-cta">Start Free →</a>
        </div>
      </nav>

      <script dangerouslySetInnerHTML={{
        __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const mobileBtn = document.getElementById('mobile-menu-btn');
          const mobileMenu = document.getElementById('mobile-menu');
          
          if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', function() {
              mobileBtn.classList.toggle('active');
              mobileMenu.classList.toggle('active');
            });
          }
        });
      `}} />

      {/* Split Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <div className="badge">✨ Trusted by 50,000+ professionals</div>
            <h1 className="hero-title">
              Land Your <span className="gradient-text">Dream Job</span> with a Standout Resume
            </h1>
            <p className="hero-description">
              Create ATS-friendly, professional resumes in minutes. No design skills needed. Just your story, beautifully told.
            </p>
            <div className="hero-actions">
              <a href="/editor" className="btn-primary">
                Create Your Resume
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Resumes Created</div>
              </div>
              <div className="stat">
                <div className="stat-value">95%</div>
                <div className="stat-label">Get Interviews</div>
              </div>
              <div className="stat">
                <div className="stat-value">4.9★</div>
                <div className="stat-label">User Rating</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="resume-preview">
              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-avatar">JD</div>
                  <div>
                    <div className="preview-name">John Doe</div>
                    <div className="preview-title">Senior Product Designer</div>
                  </div>
                </div>
                <div className="preview-section">
                  <div className="preview-bar long"></div>
                  <div className="preview-bar medium"></div>
                  <div className="preview-bar short"></div>
                </div>
                <div className="preview-section">
                  <div className="preview-bar medium"></div>
                  <div className="preview-bar long"></div>
                </div>
              </div>
              <div className="floating-badge badge-1">✓ ATS Optimized</div>
              <div className="floating-badge badge-2">⚡ Instant PDF</div>
              <div className="floating-badge badge-3">🎨 Beautiful</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section id="features" className="features">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-subtitle">Powerful features that make resume building effortless</p>
        </div>
        <div className="bento-grid">
          <div className="bento-item large">
            <div className="bento-icon">🎯</div>
            <h3>ATS-Friendly Templates</h3>
            <p>Beat the robots. Our templates are optimized to pass Applicant Tracking Systems used by 99% of companies.</p>
          </div>
          <div className="bento-item">
            <div className="bento-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Create a professional resume in under 10 minutes.</p>
          </div>
          <div className="bento-item">
            <div className="bento-icon">📱</div>
            <h3>Works Everywhere</h3>
            <p>Desktop, tablet, or mobile - build on any device.</p>
          </div>
          <div className="bento-item">
            <div className="bento-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Stand out with modern, professional templates.</p>
          </div>
          <div className="bento-item wide">
            <div className="bento-icon">🔒</div>
            <h3>Your Data is Safe</h3>
            <p>Bank-level encryption. We never share your information. Your privacy is our priority.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">Three Simple Steps</h2>
          <p className="section-subtitle">From blank page to hired in minutes</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Choose a Template</h3>
            <p>Pick from our collection of ATS-friendly, professionally designed templates.</p>
          </div>
          <div className="step">
            <div className="step-number">02</div>
            <h3>Fill in Your Details</h3>
            <p>Add your experience, skills, and education with our intuitive editor.</p>
          </div>
          <div className="step">
            <div className="step-number">03</div>
            <h3>Download & Apply</h3>
            <p>Export as PDF and start applying to your dream jobs immediately.</p>
          </div>
        </div>
      </section>

      {/* Testimonials - Horizontal Scroll */}
      <section className="testimonials-new">
        <div className="section-header">
          <h2 className="section-title">Loved by Job Seekers</h2>
          <p className="section-subtitle">See what our users are saying</p>
        </div>
        <div className="testimonials-scroll">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"Got 3 interviews in the first week! The templates are clean and professional."</p>
            <div className="testimonial-author">
              <div className="author-avatar">SC</div>
              <div>
                <div className="author-name">Sarah Chen</div>
                <div className="author-role">Software Engineer</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"Finally landed my dream job! This tool made my resume stand out from hundreds of applicants."</p>
            <div className="testimonial-author">
              <div className="author-avatar">MJ</div>
              <div>
                <div className="author-name">Michael Johnson</div>
                <div className="author-role">Product Manager</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"As a designer, I'm picky. These templates are actually good. Clean, modern, and effective."</p>
            <div className="testimonial-author">
              <div className="author-avatar">ER</div>
              <div>
                <div className="author-name">Emily Rodriguez</div>
                <div className="author-role">UX Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Minimal Cards */}
      <section id="pricing" className="pricing-new">
        <div className="section-header">
          <h2 className="section-title">Simple Pricing</h2>
          <p className="section-subtitle">Start free, upgrade when you're ready</p>
        </div>
        <div className="pricing-cards">
          <div className="price-card">
            <div className="price-header">
              <h3>Free</h3>
              <div className="price">$0<span>/forever</span></div>
            </div>
            <ul className="price-features">
              <li>✓ 1 Resume</li>
              <li>✓ Basic Templates</li>
              <li>✓ PDF Export</li>
              <li>✓ Email Support</li>
            </ul>
            <a href="/editor" className="price-btn">Start Free</a>
          </div>
          <div className="price-card featured">
            <div className="popular-badge">Most Popular</div>
            <div className="price-header">
              <h3>Pro</h3>
              <div className="price">$9<span>/month</span></div>
            </div>
            <ul className="price-features">
              <li>✓ Unlimited Resumes</li>
              <li>✓ All Premium Templates</li>
              <li>✓ PDF & DOCX Export</li>
              <li>✓ Priority Support</li>
              <li>✓ Cover Letter Builder</li>
              <li>✓ ATS Optimization</li>
            </ul>
            <a href="/pricing" className="price-btn primary">Get Pro</a>
          </div>
          <div className="price-card">
            <div className="price-header">
              <h3>Lifetime</h3>
              <div className="price">$49<span>/one-time</span></div>
            </div>
            <ul className="price-features">
              <li>✓ Everything in Pro</li>
              <li>✓ Lifetime Access</li>
              <li>✓ Future Updates</li>
              <li>✓ Premium Support</li>
            </ul>
            <a href="/pricing" className="price-btn">Buy Lifetime</a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Land Your Dream Job?</h2>
          <p>Join 50,000+ professionals who've transformed their careers</p>
          <a href="/editor" className="btn-primary large">
            Create Your Resume Now
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </section>

      <Footer
        sections={[
          {
            title: "Product",
            links: [
              { text: "Features", href: "#features" },
              { text: "Templates", href: "/templates" },
              { text: "Pricing", href: "#pricing" },
            ],
          },
          {
            title: "Company",
            links: [
              { text: "About", href: "/about" },
              { text: "Blog", href: "/blog" },
              { text: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { text: "Privacy", href: "/privacy" },
              { text: "Terms", href: "/terms" },
            ],
          },
        ]}
        socialLinks={{
          twitter: "https://twitter.com",
          github: "https://github.com",
          linkedin: "https://linkedin.com",
        }}
        companyName="ResumePro"
      />

      <style jsx>{`
        .landing-page {
          background: #FAFAFA;
        }

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
          position: relative;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111827;
          cursor: pointer;
        }

        .logo-accent {
          color: #3B82F6;
        }

        .nav-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        /* Mega Menu Items */
        .nav-item {
          position: relative;
        }

        .nav-trigger {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #6B7280;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: color 0.2s;
          border-radius: 0.5rem;
        }

        .nav-trigger:hover {
          color: #111827;
          background: #F3F4F6;
        }

        .nav-trigger svg {
          transition: transform 0.2s;
        }

        .nav-item:hover .nav-trigger svg {
          transform: rotate(180deg);
        }

        /* Mega Dropdown */
        .mega-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          padding: 0.5rem;
          min-width: 280px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease-in-out;
          pointer-events: none;
          border: 1px solid #E5E7EB;
        }

        .nav-item:hover .mega-dropdown {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        /* Wide Dropdown for 2-column layout */
        .mega-dropdown-wide {
          min-width: 520px;
        }

        /* Dropdown Grid */
        .dropdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .dropdown-column {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .column-header {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.5rem 1rem 0.25rem;
        }

        .dropdown-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          transition: all 0.15s;
          text-decoration: none;
        }

        .dropdown-item:hover {
          background: #F9FAFB;
        }

        .item-icon {
          font-size: 1.75rem;
          flex-shrink: 0;
        }

        .item-text {
          flex: 1;
        }

        .item-title {
          font-weight: 600;
          color: #111827;
          font-size: 0.9375rem;
          margin-bottom: 0.125rem;
        }

        .item-desc {
          font-size: 0.8125rem;
          color: #6B7280;
          line-height: 1.3;
        }

        /* CTA Button */
        .nav-cta {
          background: #111827;
          color: white !important;
          padding: 0.625rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
          text-decoration: none;
          margin-left: 0.5rem;
        }

        .nav-cta:hover {
          background: #1F2937;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-menu-btn span {
          width: 24px;
          height: 2px;
          background: #111827;
          transition: all 0.3s;
          border-radius: 2px;
        }

        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid #E5E7EB;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu.active {
          max-height: calc(100vh - 73px);
          overflow-y: auto;
        }

        .mobile-section {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #F3F4F6;
        }

        .mobile-section-title {
          font-weight: 700;
          color: #111827;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .mobile-link {
          display: block;
          padding: 0.75rem 0;
          color: #6B7280;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .mobile-link:hover {
          color: #111827;
        }

        .mobile-cta {
          display: block;
          margin: 1.5rem 2rem;
          background: #111827;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-menu {
            display: block;
          }
        }

        /* Hero Section */
        .hero {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .badge {
          display: inline-block;
          background: #EEF2FF;
          color: #4F46E5;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #6B7280;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #111827;
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          background: #1F2937;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .btn-primary.large {
          padding: 1.25rem 2.5rem;
          font-size: 1.25rem;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          color: #111827;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          border: 2px solid #E5E7EB;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: #111827;
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6B7280;
          margin-top: 0.25rem;
        }

        .resume-preview {
          position: relative;
          padding: 2rem;
        }

        .preview-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .preview-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .preview-avatar {
          width: 60px;
          height: 60px;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .preview-name {
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .preview-title {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .preview-section {
          margin-bottom: 1.5rem;
        }

        .preview-bar {
          height: 8px;
          background: #E5E7EB;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .preview-bar.long {
          width: 100%;
        }

        .preview-bar.medium {
          width: 70%;
        }

        .preview-bar.short {
          width: 40%;
        }

        .floating-badge {
          position: absolute;
          background: white;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          font-weight: 600;
          font-size: 0.875rem;
          animation: float 4s ease-in-out infinite;
        }

        .badge-1 {
          top: 10%;
          right: 0;
          animation-delay: 0s;
        }

        .badge-2 {
          top: 50%;
          left: -2rem;
          animation-delay: 1s;
        }

        .badge-3 {
          bottom: 10%;
          right: -1rem;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Sections */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #111827;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: #6B7280;
        }

        /* Bento Grid Features */
        .features {
          padding: 6rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .bento-item {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid #E5E7EB;
          transition: all 0.3s;
        }

        .bento-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #3B82F6;
        }

        .bento-item.large {
          grid-column: span 2;
        }

        .bento-item.wide {
          grid-column: span 3;
        }

        .bento-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .bento-item h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .bento-item p {
          color: #6B7280;
          line-height: 1.6;
        }

        /* How It Works */
        .how-it-works {
          padding: 6rem 2rem;
          background: white;
        }

        .steps {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .step {
          text-align: center;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
        }

        .step h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }

        .step p {
          color: #6B7280;
          line-height: 1.6;
        }

        /* Testimonials */
        .testimonials-new {
          padding: 6rem 2rem;
          background: #F9FAFB;
        }

        .testimonials-scroll {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          padding: 1rem 0;
          max-width: 1280px;
          margin: 0 auto;
          scroll-snap-type: x mandatory;
        }

        .testimonial-card {
          min-width: 400px;
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid #E5E7EB;
          scroll-snap-align: start;
        }

        .stars {
          color: #FBBF24;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .testimonial-text {
          color: #111827;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .testimonial-author {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
        }

        .author-name {
          font-weight: 600;
          color: #111827;
        }

        .author-role {
          font-size: 0.875rem;
          color: #6B7280;
        }

        /* Pricing */
        .pricing-new {
          padding: 6rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .price-card {
          background: white;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 2px solid #E5E7EB;
          position: relative;
          transition: all 0.3s;
        }

        .price-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .price-card.featured {
          border-color: #3B82F6;
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.1);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #3B82F6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .price-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }

        .price {
          font-size: 3rem;
          font-weight: 900;
          color: #111827;
          margin-bottom: 2rem;
        }

        .price span {
          font-size: 1rem;
          font-weight: 500;
          color: #6B7280;
        }

        .price-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }

        .price-features li {
          padding: 0.75rem 0;
          color: #6B7280;
          border-bottom: 1px solid #F3F4F6;
        }

        .price-btn {
          display: block;
          text-align: center;
          padding: 1rem;
          border-radius: 0.75rem;
          font-weight: 600;
          background: #F3F4F6;
          color: #111827;
          transition: all 0.2s;
        }

        .price-btn:hover {
          background: #E5E7EB;
        }

        .price-btn.primary {
          background: #111827;
          color: white;
        }

        .price-btn.primary:hover {
          background: #1F2937;
        }

        /* Final CTA */
        .final-cta {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
          text-align: center;
        }

        .cta-content h2 {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.25rem;
          color: #9CA3AF;
          margin-bottom: 2rem;
        }

        .cta-content .btn-primary {
          background: white;
          color: #111827;
        }

        .cta-content .btn-primary:hover {
          background: #F3F4F6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-right {
            order: -1;
          }

          .bento-grid {
            grid-template-columns: 1fr;
          }

          .bento-item.large,
          .bento-item.wide {
            grid-column: span 1;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          .pricing-cards {
            grid-template-columns: 1fr;
          }

          .nav-links {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .testimonial-card {
            min-width: 300px;
          }
        }
      `}</style>
    </main>
  );
}
