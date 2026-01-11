"use client";

import { ENV } from '@/app/env';
import { Menu, X, ArrowRight, DockIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { NAVIGATION } from '@/constants/navigation';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[1000]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 no-underline group">
              <Image
                src="/logo.png"
                alt="ProfResume Logo"
                width={158}   // w-15 → 60px
                height={36}  // h-9 → 36px
                className="transition-transform group-hover:scale-105"
                priority
              />
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Mega Menu Items */}
              {NAVIGATION.menuItems.map((menuItem) => (
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
                              <Link
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
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Right: Featured Panel */}
                        <div className="w-80 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-8 flex flex-col">
                          {/* Image */}
                          <div className="mb-8 -mx-8 -mt-8">
                            <Image
                              src={menuItem.megaMenu.featured.image}
                              alt={menuItem.megaMenu.featured.title}
                              width={320}
                              height={180}
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
                                <Link
                                  key={idx}
                                  href={link.href}
                                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors no-underline font-medium group/link"
                                >
                                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                  {link.text}
                                </Link>
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
              <Link
                href={NAVIGATION.coverLetter.href}
                className="px-4 py-2 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors no-underline relative group/cover"
              >
                {NAVIGATION.coverLetter.label}
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold rounded">
                  NEW
                </span>
              </Link>

              {/* CTA Button */}
              <Link
                href={NAVIGATION.cta.href}
                className="ml-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {NAVIGATION.cta.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
        className={`fixed top-0 right-0 h-full w-3/4 bg-white z-[999]
    transform transition-transform duration-300 lg:hidden
    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
  `}
      >
        <div className="h-full overflow-y-auto pt-20 px-6 pb-6">
          {/* Cover Letter - Standalone */}
          <div className="mb-6 font-bold border-b border-gray-200 pb-5 text-gray-900 mb-3 text-sm uppercase tracking-wider">
            <Link
              href={NAVIGATION.coverLetter.href}
              className="px-4 py-2 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors no-underline relative group/cover"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xl flex-shrink-0 group-hover/item:scale-110 transition-transform">
                  <DockIcon />
                </div>

                <div className="relative font-semibold text-gray-900 mb-1 text-[15px] group-hover/item:text-blue-600 transition-colors">
                  {NAVIGATION.coverLetter.label}
                  <span className="absolute top-[-25px] right-[-32px] px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold rounded">
                    NEW
                  </span>
                </div>
              </div>

            </Link>

          </div>
          {
            NAVIGATION.menuItems.map((el, idx) => {
              return <div className="mb-6" key={idx + '_mobile-menu_' + el.id}>
                <div className="font-bold border-b border-gray-200 pb-5 text-gray-900 mb-3 text-sm uppercase tracking-wider">{el.label}</div>
                <div className="space-y-1">
                  {el.megaMenu.items.map((item, index) => (
                    <Link
                      key={idx + 'sub_mobile-menu_' + index}
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
                    </Link>
                  ))}
                </div>
              </div>
            })
          }

          {/* Mobile CTA */}
          <Link
            href={NAVIGATION.cta.href}
            className="block w-full mt-8 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all no-underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            {NAVIGATION.cta.text}
          </Link>
        </div>
      </div>
    </>
  );
}
