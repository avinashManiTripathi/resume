"use client";

import { ENV } from '@/app/env';
import { Menu, X, ArrowRight, DockIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


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
                                src="/logo.avif"
                                alt="Hirecta Logo"
                                width={120}   // w-15 → 60px
                                height={30}  // h-9 → 36px
                                className="transition-transform object-contain"
                                priority
                                unoptimized
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
                                    {/* Mega Dropdown - Grona Style Layout */}
                                    <div className={`fixed left-0 right-0 top-[72px]
                                        ${activeMenu === menuItem.id ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}
                                        transition-all duration-300 ease-out z-50`}>
                                        <div className="max-w-7xl mx-auto px-8">
                                            {/* White Container */}
                                            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                                                <div className="flex min-h-[420px]">
                                                    {/* Left Section - Content (65%) */}
                                                    <div className="flex-1 p-8 flex flex-col justify-between">
                                                        <div>
                                                            {/* Header */}
                                                            <div className="mb-6">
                                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                                    {menuItem.megaMenu.title}
                                                                </h3>
                                                                <p className="text-sm text-gray-600 max-w-lg">
                                                                    {menuItem.megaMenu.description}
                                                                </p>
                                                            </div>

                                                            {/* 3-Column Grid */}
                                                            <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                                                                {menuItem.megaMenu.items.slice(0, 6).map((item, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        href={item.href}
                                                                        onClick={() => setActiveMenu(null)}
                                                                        className="group p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors block no-underline"
                                                                    >
                                                                        {/* Icon + Title */}
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <div className="text-gray-700 text-lg group-hover:scale-110 transition-transform duration-300">
                                                                                {item.icon}
                                                                            </div>
                                                                            <h4 className="font-bold text-gray-900 text-sm">
                                                                                {item.title}
                                                                            </h4>
                                                                        </div>

                                                                        {/* Description */}
                                                                        <p className="text-xs text-gray-500 mb-1 leading-tight line-clamp-2">
                                                                            {item.description}
                                                                        </p>

                                                                        {/* Fake Link Visual */}
                                                                        <span
                                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-500 group-hover:text-blue-600 uppercase tracking-wide group-hover:gap-2 transition-all mt-1"
                                                                        >
                                                                            Learn More
                                                                            <ArrowRight className="w-3 h-3" />
                                                                        </span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Bottom CTA Button */}
                                                        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                                                            <Link
                                                                href={URLS.EDITOR}
                                                                target="_blank"
                                                                onClick={() => setActiveMenu(null)}
                                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-all no-underline hover:gap-3"
                                                            >
                                                                Explore Our Resume Builder
                                                                <ArrowRight className="w-4 h-4" />
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Right Section - Promotional Card (35%) */}
                                                    <div className="w-[360px] bg-slate-50 p-6 flex flex-col justify-center">
                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col group/card hover:shadow-md transition-all duration-300">
                                                            {/* Image Area */}
                                                            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                                                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover/card:scale-105" />

                                                                {/* Overlay Content */}
                                                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                                                                        <Sparkles className="w-3 h-3" />
                                                                        Pro Tip
                                                                    </div>
                                                                    <h3 className="text-white font-bold text-xl leading-tight">
                                                                        Stand Out from the Crowd
                                                                    </h3>
                                                                </div>
                                                            </div>

                                                            {/* Content Area */}
                                                            <div className="p-6 flex-1 flex flex-col">
                                                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                                                    Use our AI-powered editor to tailor your resume for every job application. Increase your chances of getting hired by 3x.
                                                                </p>

                                                                <div className="mt-auto">
                                                                    <Link
                                                                        href={URLS.EDITOR}
                                                                        className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors gap-2"
                                                                    >
                                                                        Try It Free
                                                                        <ArrowRight className="w-4 h-4" />
                                                                    </Link>
                                                                </div>
                                                            </div>
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
