"use client";

import { ENV } from '@/app/env';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const navigation = {
  logo: { text: "Prof", accent: "Resume" },
  menuItems: [
    {
      id: "product",
      label: "Product",
      type: "mega-dropdown",
      megaMenu: {
        title: "Products",
        description: "Automate and easily manage the pre and post purchase experience of your clients.",
        items: [
          {
            icon: "✏️",
            title: "Resume Builder",
            description: "Create professional resumes in minutes",
            href: "/resume-builder"
          },
          {
            icon: "🔍",
            title: "ATS Checker",
            description: "Test your resume compatibility",
            href: "/ats-checker"
          },
          {
            icon: "🎯",
            title: "AI Resume Tailor",
            description: "Customize for each job",
            href: "/tailor"
          },
          {
            icon: "�",
            title: "Templates",
            description: "200+ professional designs",
            href: "/templates"
          },
          {
            icon: "📊",
            title: "Resume Score",
            description: "Get instant feedback",
            href: "/resources/resume-checker"
          },
          {
            icon: "✨",
            title: "Examples",
            description: "Real resume showcases",
            href: "/examples"
          }
        ],
        featured: {
          title: "For Professionals",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop",
          links: [
            { text: "Enterprise Solutions", href: "/resources/for-organizations" },
            { text: "Success Stories", href: "/success-stories" }
          ]
        }
      }
    },
    {
      id: "resources",
      label: "Resources",
      type: "mega-dropdown",
      megaMenu: {
        title: "Resources",
        description: "Learn everything you need to create the perfect resume and land your dream job.",
        items: [
          {
            icon: "📖",
            title: "Resume Writing Guide",
            description: "Complete resume tutorial",
            href: "/resources/resume-guide"
          },
          {
            icon: "✍️",
            title: "Cover Letter Guide",
            description: "Write compelling letters",
            href: "/resources/cover-letter-guide"
          },
          {
            icon: "🤖",
            title: "ATS Guide",
            description: "Beat tracking systems",
            href: "/resources/ats-guide"
          },
          {
            icon: "",
            title: "Keyword Generator",
            description: "Find the right keywords",
            href: "/resources/resume-keyword-generator"
          },
          {
            icon: "�",
            title: "Career Tips",
            description: "Job search strategies",
            href: "/resources/career-tips"
          },
          {
            icon: "📝",
            title: "Blog",
            description: "Career insights & tips",
            href: "/blog"
          }
        ],
        featured: {
          title: "Learning Center",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
          links: [
            { text: "All Guides", href: "/resources" },
            { text: "Help Center", href: "/help" }
          ]
        }
      }
    },
    {
      id: "company",
      label: "Company",
      type: "mega-dropdown",
      megaMenu: {
        title: "Company",
        description: "Learn more about our mission to help job seekers land their dream careers.",
        items: [
          {
            icon: "🏢",
            title: "About Us",
            description: "Our mission and vision",
            href: "/about"
          },
          {
            icon: "⭐",
            title: "Reviews",
            description: "What our users say",
            href: "/reviews"
          },
          {
            icon: "🎉",
            title: "Success Stories",
            description: "Real transformations",
            href: "/success-stories"
          },
          {
            icon: "✉️",
            title: "Contact",
            description: "Get in touch with us",
            href: "/contact"
          },
          {
            icon: "🔒",
            title: "Privacy Policy",
            description: "How we protect data",
            href: "/privacy"
          },
          {
            icon: "️",
            title: "Security",
            description: "Your data is safe",
            href: "/security"
          }
        ],
        featured: {
          title: "Join Our Team",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
          links: [
            { text: "Careers", href: "/about#careers" },
            { text: "Culture", href: "/about#culture" }
          ]
        }
      }
    }
  ],
  coverLetter: {
    label: "Cover Letter",
    href: "/cover-letter"
  },
  cta: {
    text: "Start Free",
    href: "https://edit.profresume.com"
  }
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[1000]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 no-underline group">
              <img
                src="/icon.png"
                alt="ProfResume Logo"
                className="w-9 h-9 transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-bold text-gray-900">
                <span className="text-blue-600">{navigation.logo.text}</span>
                {navigation.logo.accent}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Mega Menu Items */}
              {navigation.menuItems.map((menuItem) => (
                <div key={menuItem.id} className="relative group">
                  <button className="px-4 py-2 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors flex items-center gap-1.5">
                    {menuItem.label}
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Distbit-Style Mega Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-[920px]">
                      <div className="flex">
                        {/* Left: Products Grid */}
                        <div className="flex-1 p-10">
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {menuItem.megaMenu.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                              {menuItem.megaMenu.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {menuItem.megaMenu.items.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.href}
                                className="group/item p-4 rounded-xl hover:bg-gray-50 transition-all no-underline border border-transparent hover:border-gray-200"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xl flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 mb-1 text-[15px] group-hover/item:text-blue-600 transition-colors">
                                      {item.title}
                                    </div>
                                    <div className="text-xs text-gray-500 leading-snug">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Right: Featured Panel */}
                        <div className="w-80 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-8 flex flex-col">
                          {/* Image */}
                          <div className="mb-8 -mx-8 -mt-8">
                            <img
                              src={menuItem.megaMenu.featured.image}
                              alt={menuItem.megaMenu.featured.title}
                              className="w-full h-56 object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            {/* Featured Title */}
                            <h4 className="text-xl font-bold text-gray-900 mb-4">
                              {menuItem.megaMenu.featured.title}
                            </h4>

                            {/* Links */}
                            <div className="space-y-3">
                              {menuItem.megaMenu.featured.links.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.href}
                                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors no-underline font-medium group/link"
                                >
                                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                  {link.text}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cover Letter - Standalone */}
              <a
                href={navigation.coverLetter.href}
                className="px-4 py-2 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors no-underline relative group/cover"
              >
                {navigation.coverLetter.label}
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold rounded">
                  NEW
                </span>
              </a>

              {/* CTA Button */}
              <a
                href={navigation.cta.href}
                className="ml-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {navigation.cta.text}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-[999] transform transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-full overflow-y-auto pt-20 px-6 pb-6">
          {/* Product */}
          <div className="mb-6">
            <div className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Product</div>
            <div className="space-y-1">
              <a href="/resume-builder" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Resume Builder</a>
              <a href="/cover-letter" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline relative inline-flex items-center" onClick={() => setMobileMenuOpen(false)}>
                Cover Letter
                <span className="ml-2 px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">NEW</span>
              </a>
              <a href="/tailor" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>AI Tailor</a>
              <a href="/ats-checker" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>ATS Checker</a>
              <a href="/templates" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Templates</a>
              <a href="/examples" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Examples</a>
            </div>
          </div>

          {/* Resources */}
          <div className="mb-6">
            <div className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Resources</div>
            <div className="space-y-1">
              <a href="/resources/resume-guide" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Resume Guide</a>
              <a href="/resources/cover-letter-guide" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Cover Letter Guide</a>
              <a href="/blog" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Blog</a>
              <a href="/help" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Help Center</a>
            </div>
          </div>

          {/* Company */}
          <div className="mb-6">
            <div className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Company</div>
            <div className="space-y-1">
              <a href="/about" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>About Us</a>
              <a href="/contact" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href="/reviews" className="block py-2.5 text-gray-700 hover:text-gray-900 no-underline" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            </div>
          </div>

          {/* Mobile CTA */}
          <a
            href={navigation.cta.href}
            className="block w-full mt-8 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all no-underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navigation.cta.text}
          </a>
        </div>
      </div>
    </>
  );
}
