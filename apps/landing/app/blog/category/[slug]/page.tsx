import { Calendar, Clock, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ENV } from "@/app/env";

// Blog posts database (in a real app, this would come from a CMS or database)
const allBlogPosts = [
    { id: 1, title: "10 Resume Tips That Will Get You Hired in 2024", excerpt: "Learn the latest strategies to make your resume stand out in today's competitive job market.", author: "Avinash Mani Tripathi", date: "Dec 15, 2024", readTime: "5 min read", category: "Tips & Tricks", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop", datePublished: "2024-12-15" },
    { id: 2, title: "How to Write a Cover Letter That Gets Noticed", excerpt: "Master the art of writing compelling cover letters that complement your resume perfectly.", author: "Priya Sharma", date: "Dec 12, 2024", readTime: "4 min read", category: "Career Advice", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop", datePublished: "2024-12-12" },
    { id: 3, title: "ATS Optimization: Getting Past the Bots", excerpt: "Understand how Applicant Tracking Systems work and optimize your resume to pass their filters.", author: "Rajesh Kumar", date: "Dec 10, 2024", readTime: "6 min read", category: "ATS", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop", datePublished: "2024-12-10" },
    { id: 4, title: "Career Change? Here's How to Pivot Your Resume", excerpt: "Strategic tips for showcasing transferable skills when switching industries or roles.", author: "Sneha Patel", date: "Dec 8, 2024", readTime: "5 min read", category: "Career Change", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop", datePublished: "2024-12-08" },
    { id: 5, title: "Remote Work Resume: What Recruiters Look For", excerpt: "Highlight your remote work skills and experience to land your next work-from-home opportunity.", author: "Amit Singh", date: "Dec 5, 2024", readTime: "4 min read", category: "Remote Work", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop", datePublished: "2024-12-05" },
    { id: 6, title: "LinkedIn Profile vs Resume: Key Differences", excerpt: "Learn how to optimize both your LinkedIn profile and resume for maximum impact.", author: "Neha Gupta", date: "Dec 3, 2024", readTime: "5 min read", category: "LinkedIn", image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&auto=format&fit=crop", datePublished: "2024-12-03" },
    { id: 7, title: "Ace Your Next Interview: Top 10 Questions", excerpt: "Prepare for common interview questions and impress hiring managers with confident answers.", author: "Rahul Verma", date: "Dec 1, 2024", readTime: "7 min read", category: "Interview Prep", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop", datePublished: "2024-12-01" },
    { id: 8, title: "Salary Negotiation Strategies That Actually Work", excerpt: "Learn proven techniques to negotiate better compensation packages and maximize your worth.", author: "Kavita Reddy", date: "Nov 28, 2024", readTime: "6 min read", category: "Salary Negotiation", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop", datePublished: "2024-11-28" },
    { id: 9, title: "5 Resume Formatting Tricks to Beat ATS", excerpt: "Format your resume correctly to ensure it passes through automated screening systems.", author: "Vikram Joshi", date: "Nov 25, 2024", readTime: "5 min read", category: "Tips & Tricks", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop", datePublished: "2024-11-25" },
    { id: 10, title: "Career Growth: How to Ask for a Promotion", excerpt: "Strategic advice on timing, preparation, and communication for successful promotion requests.", author: "Anjali Mehta", date: "Nov 22, 2024", readTime: "5 min read", category: "Career Advice", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop", datePublished: "2024-11-22" },
];

const categories = [
    { slug: "tips-tricks", name: "Tips & Tricks", description: "Practical resume tips and formatting tricks to make your application stand out", keywords: "resume tips, formatting tricks, resume advice, job application tips" },
    { slug: "career-advice", name: "Career Advice", description: "Expert guidance for navigating your career path and making smart professional decisions", keywords: "career advice, career development, professional growth, career planning" },
    { slug: "ats", name: "ATS", description: "Master Applicant Tracking Systems to ensure your resume gets seen by human recruiters", keywords: "ATS resume, applicant tracking system, ATS optimization, resume scanner" },
    { slug: "career-change", name: "Career Change", description: "Strategies for successfully transitioning to a new industry or role", keywords: "career change, career transition, switching careers, career pivot" },
    { slug: "remote-work", name: "Remote Work", description: "Tips for landing and thriving in remote work opportunities", keywords: "remote work, work from home, remote jobs, remote career" },
    { slug: "linkedin", name: "LinkedIn", description: "Optimize your LinkedIn profile to attract recruiters and networking opportunities", keywords: "LinkedIn, LinkedIn profile, professional networking, LinkedIn optimization" },
    { slug: "interview-prep", name: "Interview Prep", description: "Prepare effectively for interviews and ace common questions", keywords: "interview preparation, interview questions, interview tips, job interview" },
    { slug: "salary-negotiation", name: "Salary Negotiation", description: "Learn how to negotiate better compensation and benefits packages", keywords: "salary negotiation, compensation, salary tips, negotiate salary" },
];

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = categories.find(cat => cat.slug === slug);

    if (!category) {
        return {
            title: "Category Not Found | ProfResume Blog",
        };
    }

    const baseUrl = ENV.BASE_URL;
    const categoryUrl = `${baseUrl}/blog/category/${slug}`;

    const categoryPosts = allBlogPosts.filter(post =>
        post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === slug.replace(/&/g, '')
    );

    return {
        title: `${category.name} - Resume & Career Advice | ProfResume Blog`,
        description: `${category.description}. Browse ${categoryPosts.length} expert articles on ${category.name.toLowerCase()} to advance your career.`,
        keywords: category.keywords,
        authors: [{ name: "ProfResume Team" }],
        creator: "ProfResume",
        publisher: "ProfResume",
        alternates: {
            canonical: `/blog/category/${slug}`,
        },
        openGraph: {
            title: `${category.name} Articles | ProfResume Blog`,
            description: category.description,
            url: `/blog/category/${slug}`,
            siteName: "ProfResume",
            locale: "en_US",
            type: "website",
            images: [
                {
                    url: `/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `ProfResume ${category.name} Blog`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${category.name} - Resume & Career Advice`,
            description: category.description,
            images: [`/og-image.png`],
            creator: "@profresume",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// Generate static params for all categories
export async function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    // Find category
    const category = categories.find(cat => cat.slug === slug);

    if (!category) {
        notFound();
    }

    // Filter posts by category
    const categoryPosts = allBlogPosts.filter(post =>
        post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === slug.replace(/&/g, '')
    );

    const baseUrl = ENV.BASE_URL;
    const categoryUrl = `${baseUrl}/blog/category/${slug}`;

    // JSON-LD Structured Data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${baseUrl}/blog`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": category.name,
                "item": categoryUrl
            }
        ]
    };

    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${category.name} Articles`,
        "description": category.description,
        "url": categoryUrl,
        "inLanguage": "en-US",
        "isPartOf": {
            "@type": "WebSite",
            "name": "ProfResume",
            "url": baseUrl
        },
        "about": {
            "@type": "Thing",
            "name": category.name,
            "description": category.description
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": categoryPosts.length,
            "itemListElement": categoryPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${baseUrl}/blog/${post.id}`,
                "name": post.title
            }))
        }
    };

    const articlesSchema = categoryPosts.map(post => ({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.datePublished,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "ProfResume",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/favicon.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${post.id}`
        }
    }));

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
            />
            {articlesSchema.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            {/* Header */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            {category.name}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            {category.description}
                        </p>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={`Search ${category.name} articles...`}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-500"
                                aria-label={`Search ${category.name} articles`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {categoryPosts.length} {categoryPosts.length === 1 ? 'Article' : 'Articles'}
                        </h2>
                    </div>

                    {categoryPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600">No articles found in this category yet.</p>
                            <p className="text-gray-500 mt-2">Check back soon for new content!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-xl"
                                    itemScope
                                    itemType="https://schema.org/Article"
                                >
                                    <Link href={`/blog/${post.id}`}>
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                                                itemProp="image"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3
                                                className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                                                itemProp="headline"
                                            >
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2" itemProp="description">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <time dateTime={post.datePublished} itemProp="datePublished">
                                                        {post.date}
                                                    </time>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                                    {post.author.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700" itemProp="name">
                                                    {post.author}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Other Categories */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Other Categories</h2>

                    <nav className="grid md:grid-cols-3 lg:grid-cols-4 gap-4" aria-label="Blog categories">
                        {categories.filter(cat => cat.slug !== slug).map((cat, index) => (
                            <Link
                                key={index}
                                href={`/blog/category/${cat.slug}`}
                                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                            >
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {cat.name}
                                </h3>
                            </Link>
                        ))}
                    </nav>
                </div>
            </section>
        </>
    );
}
