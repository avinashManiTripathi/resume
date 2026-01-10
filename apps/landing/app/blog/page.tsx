import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Career Blog - Resume Tips & Job Search Advice | ProfResume',
    description: 'Expert advice on resume writing, career growth, and job search strategies. Read our latest articles to land your dream job.',
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'ProfResume Career Blog',
        description: 'Stay ahead in your career with expert tips.',
        url: '/blog',
        type: 'website',
    },
};

const blogPosts = [
    { id: 1, title: "10 Resume Tips That Will Get You Hired in 2024", excerpt: "Learn the latest strategies to make your resume stand out in today's competitive job market.", author: "Avinash Mani Tripathi", date: "Dec 15, 2024", readTime: "5 min read", category: "Tips & Tricks", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop" },
    { id: 2, title: "How to Write a Cover Letter That Gets Noticed", excerpt: "Master the art of writing compelling cover letters that complement your resume perfectly.", author: "Priya Sharma", date: "Dec 12, 2024", readTime: "4 min read", category: "Career Advice", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop" },
    { id: 3, title: "ATS Optimization: Getting Past the Bots", excerpt: "Understand how Applicant Tracking Systems work and optimize your resume to pass their filters.", author: "Rajesh Kumar", date: "Dec 10, 2024", readTime: "6 min read", category: "ATS", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop" },
    { id: 4, title: "Career Change? Here's How to Pivot Your Resume", excerpt: "Strategic tips for showcasing transferable skills when switching industries or roles.", author: "Sneha Patel", date: "Dec 8, 2024", readTime: "5 min read", category: "Career Change", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop" },
    { id: 5, title: "Remote Work Resume: What Recruiters Look For", excerpt: "Highlight your remote work skills and experience to land your next work-from-home opportunity.", author: "Amit Singh", date: "Dec 5, 2024", readTime: "4 min read", category: "Remote Work", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop" },
    { id: 6, title: "LinkedIn Profile vs Resume: Key Differences", excerpt: "Learn how to optimize both your LinkedIn profile and resume for maximum impact.", author: "Neha Gupta", date: "Dec 3, 2024", readTime: "5 min read", category: "LinkedIn", image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&auto=format&fit=crop" },
];

export default function BlogPage() {
    return <BlogContent />;
}

function BlogContent() {
    const featuredPost = blogPosts[0];
    const recentPosts = blogPosts.slice(1);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        Career Insights & Resume Tips
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Expert advice to help you land your dream job
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            Featured Post
                        </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl overflow-hidden border-2 border-gray-200">
                        <div className="relative h-96 lg:h-full">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                                    {featuredPost.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 lg:p-12">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                                {featuredPost.title}
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center gap-4 mb-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{featuredPost.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">{featuredPost.readTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {featuredPost.author.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{featuredPost.author}</div>
                                    <div className="text-sm text-gray-600">Author</div>
                                </div>
                            </div>

                            <Link
                                href={`/blog/${featuredPost.id}`}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                            >
                                Read Full Article
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Posts Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Recent Articles</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-xl"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                            {post.author.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{post.author}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {["Tips & Tricks", "Career Advice", "ATS", "Career Change", "Remote Work", "LinkedIn", "Interview Prep", "Salary Negotiation"].map((category, index) => (
                            <Link
                                key={index}
                                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                            >
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {category}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                        Get Career Tips in Your Inbox
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Subscribe to our newsletter for weekly resume tips and job search advice
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

