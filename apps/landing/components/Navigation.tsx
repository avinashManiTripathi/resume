"use client";

import { ENV } from '@/app/env';
import { Menu, X, ArrowRight, DockIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/assets/logo.png';

import { NAVIGATION } from '@/constants/navigation';
import { URLS } from '@/constants/urls';
import { Button } from '@repo/ui/button';

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        if (activeMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [activeMenu]);

    return (
        <>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[1000]">
                <div className="px-6 lg:px-0 max-w-7xl mx-auto">
                    <div className="flex justify-between items-center h-[72px]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 no-underline group">
                            <Image
                                src={logo}
                                alt="ProfResume Logo"
                                width={158}   // w-15 → 60px
                                height={36}  // h-9 → 36px
                                className="transition-transform group-hover:scale-105"
                                priority
                                placeholder="blur"
                            />
                        </Link>
                        {/* Desktop Navigation */}
                        <div ref={menuRef} className="hidden lg:flex items-center gap-2">
                            {/* Mega Menu Items */}
                            {NAVIGATION.menuItems.map((menuItem) => (
                                <div
                                    key={menuItem.id}
                                    className="relative group"
                                    onMouseEnter={() => setActiveMenu(menuItem.id)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === menuItem.id ? null : menuItem.id)}
                                        className="px-4 py-5 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors flex items-center gap-1.5"
                                    >
                                        {menuItem.label}
                                        <svg className={`w-4 h-4 transition-transform duration-300 ${activeMenu === menuItem.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Mega Dropdown - Clean 3-Column Layout */}
                                    <div className={`fixed left-0 right-0 top-[72px] pt-0 
                                        ${activeMenu === menuItem.id ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}
                                        transition-all duration-200 ease-out z-50`}>
                                        {/* Full-width container */}
                                        <div className="bg-white shadow border-b border-gray-200">
                                            <div className="max-w-7xl mx-auto px-16 py-10">
                                                <div className="grid grid-cols-3 gap-16">
                                                    {/* Left Column - WHY SEAMLESS */}
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                                                            {menuItem.megaMenu.title}
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {menuItem.megaMenu.items.slice(0, 4).map((item, idx) => (
                                                                <Link
                                                                    key={idx}
                                                                    href={item.href}
                                                                    onClick={() => setActiveMenu(null)}
                                                                    className="group/item block no-underline p-3 rounded-lg hover:bg-purple-50/30 transition-colors"
                                                                >
                                                                    <div className="flex items-start gap-4">
                                                                        <div className="text-gray-600 text-xl mt-0.5 flex-shrink-0">
                                                                            {item.icon}
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-semibold text-gray-900 text-sm mb-1.5 group-hover/item:text-purple-600">
                                                                                {item.title}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 leading-relaxed">
                                                                                {item.description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Middle Column - RESOURCES */}
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                                                            RESOURCES
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {menuItem.megaMenu.items.slice(4).map((item, idx) => (
                                                                <Link
                                                                    key={idx}
                                                                    href={item.href}
                                                                    onClick={() => setActiveMenu(null)}
                                                                    className="group/item block no-underline p-3 rounded-lg hover:bg-purple-50/30 transition-colors"
                                                                >
                                                                    <div className="flex items-start gap-4">
                                                                        <div className="text-gray-600 text-xl mt-0.5 flex-shrink-0">
                                                                            {item.icon}
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-semibold text-gray-900 text-sm mb-1.5 group-hover/item:text-purple-600">
                                                                                {item.title}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 leading-relaxed">
                                                                                {item.description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Right Column - EXPLORE */}
                                                    <div className="bg-purple-50/30 rounded-2xl p-8">
                                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                                                            EXPLORE
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {menuItem.megaMenu.featured.links.slice(0, 2).map((link, idx) => (
                                                                <Link
                                                                    key={idx}
                                                                    href={link.href}
                                                                    onClick={() => setActiveMenu(null)}
                                                                    className="group/link block no-underline p-3 rounded-lg hover:bg-purple-50/30 transition-colors"
                                                                >
                                                                    <div className="flex items-start gap-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-sm font-semibold text-gray-400">0{idx + 1}</span>
                                                                            <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                                                <DockIcon className="w-5 h-5 text-gray-400" />
                                                                            </div>
                                                                            <span className="text-sm font-semibold text-gray-400">0{idx + 2}</span>
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className="font-semibold text-gray-900 text-sm mb-2 group-hover/link:text-purple-600">
                                                                                {link.text}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 leading-relaxed">
                                                                                Learn about our latest features and updates to help you succeed.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>

                                                        {/* See All Link */}
                                                        <Link
                                                            href="#"
                                                            onClick={() => setActiveMenu(null)}
                                                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-6 no-underline group/all"
                                                        >
                                                            See All Product News
                                                            <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom CTA Bar - Full Width Border */}
                                            <div className="border-t border-gray-200">
                                                <div className="max-w-7xl mx-auto px-16 py-6">
                                                    <div className="flex w-full items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                                                <Sparkles className="w-5 h-5 text-white" />
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-semibold text-gray-900">Want Free Leads?</span>
                                                                <span className="text-sm text-gray-500 ml-2">Take Seamless.AI for a Test Drive</span>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={URLS.EDITOR}
                                                            target="_blank"
                                                            onClick={() => setActiveMenu(null)}
                                                            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors no-underline"
                                                        >
                                                            Get Started
                                                        </Link>
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
                                <span className="absolute -top-[10px] -right-1 px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold rounded">
                                    NEW
                                </span>
                            </Link>

                            {/* AI Interview - Standalone */}
                            <Link
                                href={NAVIGATION.aiInterview.href}
                                className="px-4 py-2 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors no-underline relative group/ai"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {NAVIGATION.aiInterview.label}
                                <span className="absolute -top-[10px] -right-1 px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded">
                                    AI
                                </span>
                            </Link>

                            {/* CTA Button */}


                            <div className='border border-gray-200 rounded-md w-[1px] h-[40px] ml-[10px] mr-[10px]' />
                            <Button className='h-[40px]' onClick={() => router.push(NAVIGATION.cta.href)}>
                                {NAVIGATION.cta.text}
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        < button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav >

            {/* Mobile Menu */}
            < div
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

                    {/* AI Interview - Standalone */}
                    <div className="mb-6 font-bold border-b border-gray-200 pb-5 text-gray-900 mb-3 text-sm uppercase tracking-wider">
                        <Link
                            href={NAVIGATION.aiInterview.href}
                            className="px-4 py-2 text-gray-700 font-medium text-[15px] hover:text-gray-900 transition-colors no-underline relative group/ai"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                    🤖
                                </div>

                                <div className="relative font-semibold text-gray-900 mb-1 text-[15px] group-hover/item:text-purple-600 transition-colors">
                                    {NAVIGATION.aiInterview.label}
                                    <span className="absolute top-[-25px] right-[-32px] px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded">
                                        AI
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
            </div >
        </>
    );
}
