"use client";

import { useState } from 'react';
import { useTemplates } from '@repo/hooks/useTemplate';
import { Sparkles, Search, Crown } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPageClient() {
    const { templates, loading, error, isCached } = useTemplates();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Extract unique categories
    const categories = templates
        ? ['all', ...Array.from(new Set(templates.map(t => t.category).filter(Boolean)))]
        : ['all'];

    // Filter templates
    const filteredTemplates = templates?.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            {isCached ? 'Cached Templates' : 'Fresh from API'}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Professional Resume Templates
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our collection of ATS-friendly resume templates designed by experts
                        </p>
                        {templates && (
                            <p className="text-sm text-gray-500 mt-2">
                                {templates.length} templates available
                            </p>
                        )}
                    </div>

                    {/* Search and Filter */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="md:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {categories.map((cat: string = '') => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat?.charAt(0).toUpperCase() + cat?.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Content Section - 1,800+ words for organic search ranking */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 bg-white">
                <div className="prose prose-lg max-w-none">
                    {/* Introduction */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Free Professional Resume Templates for 2026
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Finding the perfect resume template can be the difference between landing an interview and getting overlooked. Our collection of <strong>50+ free resume templates</strong> is designed by career experts and recruiters to help you create a professional resume that passes Applicant Tracking Systems (ATS) and impresses hiring managers. Whether you're a software engineer, marketing professional, recent graduate, or executive, we have the perfect template for your career level and industry.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            All our resume templates are <strong>100% free to download</strong> with no watermarks, no hidden costs, and no sign-up required. Choose your template, customize it with our AI-powered resume builder, and download as PDF or Word in minutes. Every template is optimized for ATS compatibility, ensuring your resume gets past automated screening systems used by 95% of Fortune 500 companies.
                        </p>
                    </div>

                    {/* What Makes a Good Resume Template */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            What Makes a Good Resume Template?
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Not all resume templates are created equal. A professional resume template should strike the perfect balance between aesthetic appeal and ATS compatibility. Here's what sets our templates apart:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">✅ ATS-Friendly Formatting</h3>
                                <p className="text-gray-700">
                                    Applicant Tracking Systems scan resumes for specific formatting. Our templates use standard fonts (Arial, Calibri, Georgia), clean layouts without tables or columns, and proper heading hierarchy that ATS software can easily parse. This ensures your resume doesn't get rejected before a human ever sees it.
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">🎨 Professional Design</h3>
                                <p className="text-gray-700">
                                    While ATS compatibility is crucial, your resume still needs to impress human recruiters. Our templates feature modern, clean designs with strategic use of white space, professional color schemes, and visual hierarchy that guides the reader's eye to your most important qualifications.
                                </p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">📱 Multiple Format Support</h3>
                                <p className="text-gray-700">
                                    Every template is available for download in both PDF and Microsoft Word (DOCX) formats. PDF preserves your exact formatting across all devices and operating systems, while Word allows for easy editing if you need to make last-minute changes without our builder.
                                </p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">🔄 Fully Customizable</h3>
                                <p className="text-gray-700">
                                    Our resume builder allows you to customize every aspect of your chosen template - change colors, adjust section order, modify fonts, and tailor content to match your personal brand while maintaining ATS compatibility. No design skills required.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How to Choose the Right Template */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            How to Choose the Right Resume Template for Your Industry
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Selecting the perfect resume template depends on your industry, career level, and the job you're applying for. Different industries have different expectations for resume design and content structure. Here's our comprehensive guide to choosing the right template:
                        </p>

                        <div className="space-y-6 mb-6">
                            <div className="border-l-4 border-blue-600 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    For Tech & Engineering Roles
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    <strong>Best choice:</strong> Modern, minimalist templates with clear technical skills sections. Software engineers, data scientists, and IT professionals should opt for templates that prominently feature:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Technical Skills Section:</strong> Organized by category (Languages, Frameworks, Tools, Databases)</li>
                                    <li><strong>Project Portfolio:</strong> Space to showcase 3-5 key projects with technologies used</li>
                                    <li><strong>GitHub/Portfolio Links:</strong> Prominent placement of your code repositories and portfolio website</li>
                                    <li><strong>Clean Code Aesthetic:</strong> Professional but not overly creative - think clean lines and logical structure</li>
                                </ul>
                                <p className="text-gray-700 mt-3">
                                    Avoid overly creative designs or excessive colors. Tech recruiters appreciate straightforward, scannable formats that highlight your technical competencies and project experience.
                                </p>
                            </div>

                            <div className="border-l-4 border-green-600 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    For Creative Professionals
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    <strong>Best choice:</strong> Creative templates with tasteful design elements. Designers, marketers, and content creators can showcase their aesthetic sense while maintaining professionalism:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Visual Interest:</strong> Subtle use of color, modern fonts, and clean icons</li>
                                    <li><strong>Portfolio Integration:</strong> Links to Behance, Dribbble, or personal portfolio</li>
                                    <li><strong>Brand Personality:</strong> Reflect your personal brand through color choices</li>
                                    <li><strong>Still ATS-Safe:</strong> Creative but follows ATS-friendly formatting rules</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    For Traditional Industries (Finance, Law, Healthcare)
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    <strong>Best choice:</strong> Classic, conservative templates. Banking, legal, and medical professionals should choose:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Traditional Layouts:</strong> Reverse-chronological format emphasizing education and credentials</li>
                                    <li><strong>Minimal Color:</strong> Black text on white background with subtle gray accents</li>
                                    <li><strong>Certifications Prominent:</strong> Clear section for licenses, certifications, and professional memberships</li>
                                    <li><strong>Professional Fonts:</strong> Times New Roman, Georgia, or Garamond</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-orange-600 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    For Recent Graduates & Entry-Level
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    <strong>Best choice:</strong> Education-focused templates that highlight potential. Fresher templates should emphasize:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Education First:</strong> Lead with academic achievements, GPA (if 3.5+), and relevant coursework</li>
                                    <li><strong>Projects & Activities:</strong> Showcase university projects, internships, and extracurricular leadership</li>
                                    <li><strong>Skills Front and Center:</strong> Highlight transferable skills and technical competencies</li>
                                    <li><strong>One-Page Format:</strong> Keep it concise - one page is ideal for entry-level roles</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Resume Template Best Practices */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Resume Template Best Practices for 2026
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            The job market evolves, and so do resume expectations. Here are the latest best practices for using resume templates effectively in 2026:
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-6 border-2 border-blue-200">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                ⚡ Length Guidelines by Career Stage
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <p><strong>Entry-Level (0-3 years):</strong> One page maximum. Recruiters spend an average of 6 seconds on initial screening - make every word count.</p>
                                <p><strong>Mid-Career (4-10 years):</strong> 1-2 pages. One page if possible, two pages if you have significant achievements that warrant the space.</p>
                                <p><strong>Senior/Executive (10+ years):</strong> 2 pages maximum. Focus on leadership impact, strategic contributions, and quantifiable business results.</p>
                                <p><strong>Academic/Research:</strong> CV format (2-4 pages acceptable) with publications, grants, and research experience.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">✅ DO Include</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ Clear contact information (email, phone, LinkedIn, portfolio)</li>
                                    <li>✓ Quantifiable achievements with numbers and percentages</li>
                                    <li>✓ Action verbs starting each bullet point (Led, Increased, Developed)</li>
                                    <li>✓ Keywords from the job description (for ATS)</li>
                                    <li>✓ Relevant skills section with 8-12 key competencies</li>
                                    <li>✓ Professional summary (2-3 sentences) if you have 5+ years experience</li>
                                </ul>
                            </div>
                            <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">❌ DON'T Include</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✗ Photo (unless specifically requested in Europe/Asia)</li>
                                    <li>✗ Personal information (age, marital status, religion)</li>
                                    <li>✗ "References available upon request" (it's implied)</li>
                                    <li>✗ Outdated skills (e.g., "Proficient in Microsoft Word")</li>
                                    <li>✗ Irrelevant work experience from 10+ years ago</li>
                                    <li>✗ Fancy fonts, graphics, or complex formatting that breaks ATS</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* ATS Optimization */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why ATS-Friendly Templates Matter
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            <strong>95% of Fortune 500 companies</strong> and 68% of all employers use Applicant Tracking Systems to filter resumes before human review. If your resume isn't ATS-friendly, it might never reach a recruiter - no matter how qualified you are.
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6 rounded-r-lg">
                            <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ Common ATS Deal-Breakers to Avoid</h3>
                            <ul className="space-y-2 text-red-800">
                                <li><strong>Tables and Text Boxes:</strong> ATS can't read content inside tables - use standard text formatting instead</li>
                                <li><strong>Headers and Footers:</strong> Some ATS ignore anything in header/footer sections - keep your content in the main body</li>
                                <li><strong>Columns:</strong> Multi-column layouts confuse ATS parsing - stick to single-column formats</li>
                                <li><strong>Images and Graphics:</strong> ATS can't read text embedded in images - all text should be actual text, not graphics</li>
                                <li><strong>Non-Standard Section Headings:</strong> Use clear headings like "Work Experience" not creative alternatives like "My Journey"</li>
                                <li><strong>Fancy Fonts:</strong> Stick to standard fonts available on all systems (Arial, Calibri, Georgia, Times New Roman)</li>
                            </ul>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            All our templates are specifically designed to avoid these ATS pitfalls while still looking professional and modern. We use clean formatting, standard fonts, and single-column layouts that both ATS systems and human recruiters can easily read. You get the best of both worlds - ATS compatibility AND visual appeal.
                        </p>
                    </div>

                    {/* Final CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Build Your Professional Resume?
                        </h2>
                        <p className="text-xl mb-6 opacity-95">
                            Choose from 50+ free templates below and create your ATS-optimized resume in under 5 minutes.
                        </p>
                        <p className="text-lg opacity-90">
                            <strong>100% Free</strong> • No Watermarks • No Credit Card Required
                        </p>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading templates...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-600 font-medium mb-2">Failed to load templates</p>
                        <p className="text-gray-600 text-sm">Please try again later</p>
                    </div>
                )}

                {!loading && !error && filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium mb-2">No templates found</p>
                        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                    </div>
                )}

                {!loading && !error && filteredTemplates.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredTemplates.map((template) => (
                            <Link
                                key={template._id}
                                href={`https://edit.profresume.com/editor?templateId=${template._id}`}
                                className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
                            >
                                {/* Template Preview */}
                                <div className="p-[16px] bg-white aspect-[8.5/11] bg-gray-100 relative overflow-hidden">
                                    {template.thumbnail ? (
                                        <img
                                            src={"https://api.profresume.com" + template.thumbnail}
                                            alt={template.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {template.isPremium && (
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                            <Crown className="w-3 h-3" />
                                            PREMIUM
                                        </div>
                                    )}
                                </div>

                                {/* Template Info */}
                                <div className="p-4 md:p-6">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {template.name}
                                    </h3>
                                    {template.description && (
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {template.description}
                                        </p>
                                    )}
                                    {template.category && (
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                            {template.category}
                                        </span>
                                    )}
                                    <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                                        Use Template
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Professional Resume Templates",
                        "description": "Browse our collection of ATS-friendly professional resume templates",
                        "url": "https://profresume.com/templates",
                        "mainEntity": {
                            "@type": "ItemList",
                            "numberOfItems": templates?.length || 0,
                            "itemListElement": filteredTemplates.slice(0, 10).map((template, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "item": {
                                    "@type": "CreativeWork",
                                    "name": template.name,
                                    "description": template.description || `Professional ${template.name} resume template`,
                                    "url": `https://profresume.com/editor?templateId=${template._id}`
                                }
                            }))
                        }
                    })
                }}
            />
        </div>
    );
}
