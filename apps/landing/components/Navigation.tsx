"use client";

import { ENV } from '@/app/env';
import { useEffect, useState } from 'react';

interface NavItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface NavColumn {
  header?: string;
  items: NavItem[];
}

interface MenuItem {
  id: string;
  label: string;
  type: string;
  columns: NavColumn[];
}

interface MobileSection {
  title: string;
  links: Array<{ text: string; href: string }>;
}

interface NavigationData {
  logo: { text: string; accent: string };
  menuItems: MenuItem[];
  cta: { text: string; href: string };
  mobileMenu: {
    sections: MobileSection[];
    cta: { text: string; href: string };
  };
}

const navigation: NavigationData = {
  logo: {
    text: "Prof",
    accent: "Resume"
  },
  menuItems: [
    {
      id: "product",
      label: "Product",
      type: "mega-dropdown",
      columns: [
        {
          items: [
            {
              icon: "🎯",
              title: "Features",
              description: "Powerful resume building tools",
              href: "/#features"
            },
            {
              icon: "📄",
              title: "Templates",
              description: "ATS-friendly designs",
              href: "/templates"
            },
            {
              icon: "💎",
              title: "Pricing",
              description: "Simple, transparent pricing",
              href: "/pricing"
            }
          ]
        },
        {
          items: [
            {
              icon: "👥",
              title: "Use Cases",
              description: "For students, professionals & more",
              href: "/use-cases"
            },
            {
              icon: "✨",
              title: "Examples",
              description: "Real resume showcases",
              href: "/examples"
            },
            {
              icon: "🔗",
              title: "Integrations",
              description: "Connect with LinkedIn & more",
              href: "/integrations"
            }
          ]
        }
      ]
    },
    {
      id: "resources",
      label: "Resources",
      type: "mega-dropdown",
      columns: [
        {
          header: "Guides",
          items: [
            {
              icon: "📖",
              title: "Resume Writing Guide",
              description: "Complete guide to writing resumes",
              href: "/resources/resume-guide"
            },
            {
              icon: "✍️",
              title: "Cover Letter Guide",
              description: "Write compelling cover letters",
              href: "/resources/cover-letter-guide"
            },
            {
              icon: "🤖",
              title: "ATS Guide",
              description: "Beat applicant tracking systems",
              href: "/resources/ats-guide"
            }
          ]
        },
        {
          header: "Learn",
          items: [
            {
              icon: "📝",
              title: "Blog",
              description: "Career tips and insights",
              href: "/blog"
            },
            {
              icon: "💼",
              title: "Career Tips",
              description: "Job search strategies",
              href: "/resources/career-tips"
            },
            {
              icon: "🏭",
              title: "Industry Examples",
              description: "Resumes by industry",
              href: "/resources/industry-examples"
            },
            {
              icon: "❓",
              title: "Help & FAQ",
              description: "Get answers quickly",
              href: "/help"
            }
          ]
        }
      ]
    },
    {
      id: "company",
      label: "Company",
      type: "mega-dropdown",
      columns: [
        {
          header: "About",
          items: [
            {
              icon: "🏢",
              title: "About Us",
              description: "Our mission and team",
              href: "/about"
            },
            {
              icon: "✉️",
              title: "Contact",
              description: "Get in touch",
              href: "/contact"
            }
          ]
        },
        {
          header: "Trust",
          items: [
            {
              icon: "⭐",
              title: "Reviews",
              description: "What our users say",
              href: "/reviews"
            },
            {
              icon: "🎉",
              title: "Success Stories",
              description: "Real career transformations",
              href: "/success-stories"
            },
            {
              icon: "⚖️",
              title: "Comparison",
              description: "Why choose ProfResume",
              href: "/vs"
            }
          ]
        }
      ]
    }
  ],
  cta: {
    text: "Start Free →",
    href: ENV.EDITOR_URL
  },
  mobileMenu: {
    sections: [
      {
        title: "Product",
        links: [
          { text: "Features", href: "/#features" },
          { text: "Templates", href: "/templates" },
          { text: "Pricing", href: "/pricing" },
          { text: "Use Cases", href: "/use-cases" },
          { text: "Examples", href: "/examples" },
          { text: "Integrations", href: "/integrations" }
        ]
      },
      {
        title: "Resources",
        links: [
          { text: "Resume Writing Guide", href: "/resources/resume-guide" },
          { text: "Cover Letter Guide", href: "/resources/cover-letter-guide" },
          { text: "ATS Guide", href: "/resources/ats-guide" },
          { text: "Blog", href: "/blog" },
          { text: "Career Tips", href: "/resources/career-tips" },
          { text: "Industry Examples", href: "/resources/industry-examples" },
          { text: "Help & FAQ", href: "/help" }
        ]
      },
      {
        title: "Company",
        links: [
          { text: "About Us", href: "/about" },
          { text: "Contact", href: "/contact" },
          { text: "Reviews", href: "/reviews" },
          { text: "Success Stories", href: "/success-stories" },
          { text: "Comparison", href: "/vs" }
        ]
      }
    ],
    cta: {
      text: "Start Free →",
      href: "/editor"
    }
  }
}

export function Navigation() {
  const [navData, setNavData] = useState<NavigationData | null>(navigation);


  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-accent"> {navData?.logo.text}</span>{navData?.logo.accent}
          </a>

          <div className="nav-links">
            {/* Render Menu Items */}
            {navData?.menuItems.map((menuItem) => (
              <div key={menuItem.id} className="nav-item">
                <button className="nav-trigger">
                  {menuItem.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="mega-dropdown mega-dropdown-wide">
                  <div className="dropdown-grid">
                    {menuItem.columns.map((column, colIdx) => (
                      <div key={colIdx} className="dropdown-column">
                        {column.header && (
                          <div className="column-header">{column.header}</div>
                        )}
                        {column.items.map((item, itemIdx) => (
                          <a key={itemIdx} href={item.href} className="dropdown-item">
                            <div className="item-icon">{item.icon}</div>
                            <div className="item-text">
                              <div className="item-title">{item.title}</div>
                              <div className="item-desc">{item.description}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <a href={navData?.cta.href} className="nav-cta" target="_blank" rel="noopener noreferrer">
              {navData?.cta.text}
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
          {navData?.mobileMenu.sections.map((section, idx) => (
            <div key={idx} className="mobile-menu-section">
              <div className="mobile-section-title">{section.title}</div>
              {section.links.map((link, linkIdx) => (
                <a key={linkIdx} href={link.href}>{link.text}</a>
              ))}
            </div>
          ))}
          <a href={navData?.mobileMenu.cta.href} className="mobile-cta">
            {navData?.mobileMenu.cta.text}
          </a>
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
