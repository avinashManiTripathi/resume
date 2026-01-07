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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 z-[1000] py-4">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-extrabold text-gray-900 no-underline">
            <span className="text-blue-500">{navData?.logo.text}</span>{navData?.logo.accent}
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            {/* Render Menu Items */}
            {navData?.menuItems.map((menuItem, menuIdx) => (
              <div key={menuItem.id} className="relative group">
                <button className="bg-transparent border-none text-gray-500 font-medium text-base cursor-pointer flex items-center gap-1 py-2 transition-colors duration-200 hover:text-gray-900">
                  {menuItem.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-200 group-hover:rotate-180"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Mega Dropdown - Right aligned for last item to prevent overflow */}
                <div className={`absolute top-full ${menuIdx === navData.menuItems.length - 1 ? 'right-0' : 'left-0'} transform bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[520px] opacity-0 invisible transition-all duration-200 mt-2 z-50 group-hover:opacity-100 group-hover:visible`}>
                  <div className="grid grid-cols-2 gap-4">
                    {menuItem.columns.map((column, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-2">
                        {column.header && (
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-2">
                            {column.header}
                          </div>
                        )}
                        {column.items.map((item, itemIdx) => (
                          <a
                            key={itemIdx}
                            href={item.href}
                            className="flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-200 no-underline hover:bg-gray-50"
                          >
                            <div className="text-2xl leading-none">{item.icon}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.description}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <a
              href={navData?.cta.href}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold no-underline transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              {navData?.cta.text}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-transparent border-none text-gray-900 cursor-pointer p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-white z-[999] overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="pt-20 px-8 pb-8">
          {navData?.mobileMenu.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <div className="font-bold text-gray-900 mb-4 text-lg">
                {section.title}
              </div>
              {section.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href={link.href}
                  className="block py-3 text-gray-500 no-underline transition-colors duration-200 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}
          <a
            href={navData?.mobileMenu.cta.href}
            className="block bg-gray-900 text-white px-4 py-4 rounded-lg font-semibold text-center no-underline mt-8"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navData?.mobileMenu.cta.text}
          </a>
        </div>
      </div>
    </>
  );
}
