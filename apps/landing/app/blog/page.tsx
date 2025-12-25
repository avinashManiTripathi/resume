import { Navigation } from "@/components/Navigation";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";


const blogPosts = [
    {
        id: 1,
        title: "10 Resume Tips That Will Get You Hired in 2024",
        excerpt: "Learn the latest strategies to make your resume stand out in today's competitive job market.",
        author: "Avinash Mani Tripathi",
        date: "Dec 20, 2024",
        category: "Career Tips",
        image: "📝",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "How to Write an ATS-Friendly Resume",
        excerpt: "Discover the secrets to creating a resume that passes Applicant Tracking Systems.",
        author: "Saurabh Mani Tripathi",
        date: "Dec 18, 2024",
        category: "Resume Writing",
        image: "🤖",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "The Ultimate Guide to Cover Letters",
        excerpt: "Master the art of writing compelling cover letters that complement your resume.",
        author: "Devender Mani Tripathi",
        date: "Dec 15, 2024",
        category: "Cover Letters",
        image: "✉️",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Top Resume Mistakes to Avoid",
        excerpt: "Common pitfalls that could be costing you job interviews and how to fix them.",
        author: "Prateek Singh",
        date: "Dec 12, 2024",
        category: "Career Tips",
        image: "⚠️",
        readTime: "4 min read"
    },
    {
        id: 5,
        title: "How to Tailor Your Resume for Each Job",
        excerpt: "Learn how to customize your resume for specific positions to increase your chances.",
        author: "Avinash Mani Tripathi",
        date: "Dec 10, 2024",
        category: "Resume Writing",
        image: "🎯",
        readTime: "8 min read"
    },
    {
        id: 6,
        title: "The Power of Action Verbs in Resumes",
        excerpt: "Transform your resume with powerful action verbs that showcase your achievements.",
        author: "Devender Mani Tripathi",
        date: "Dec 8, 2024",
        category: "Writing Tips",
        image: "⚡",
        readTime: "5 min read"
    },
];

const categories = ["All", "Career Tips", "Resume Writing", "Cover Letters", "Writing Tips", "Interview Prep"];

export default function BlogPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                            Career Insights &
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Resume Tips</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Expert advice, industry insights, and actionable tips to help you land your dream job.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full px-6 py-4 pl-14 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="pb-12 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category, idx) => (
                                <button
                                    key={idx}
                                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${idx === 0
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                <section className="pb-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
                            <div className="relative z-10 max-w-2xl">
                                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">
                                    Featured Post
                                </div>
                                <h2 className="text-4xl font-bold mb-4">
                                    {blogPosts[0].title}
                                </h2>
                                <p className="text-lg mb-6 opacity-90">
                                    {blogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>{blogPosts[0].author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>{blogPosts[0].date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag size={16} />
                                        <span>{blogPosts[0].readTime}</span>
                                    </div>
                                </div>
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2">
                                    Read Article
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                            <div className="absolute right-0 top-0 text-9xl opacity-10">
                                {blogPosts[0].image}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="pb-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.slice(1).map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                                >
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-7xl">
                                        {post.image}
                                    </div>
                                    <div className="p-6">
                                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                                            {post.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User size={14} />
                                                <span>{post.author}</span>
                                            </div>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <button className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                            Read More
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                                Load More Articles
                            </button>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Get Career Tips Delivered to Your Inbox
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join 50,000+ subscribers who receive weekly career advice and resume tips.
                        </p>
                        <div className="flex gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            />
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
