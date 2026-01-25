"use client";

import { useState, useEffect } from "react";
import {
    PenSquare,
    Save,
    Send,
    Eye,
    Trash2,
    Edit,
    Calendar,
    Tag,
    Image as ImageIcon,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import RichTextEditor from "@/components/RichTextEditor";
import { useAppNetwork, API_ENDPOINTS } from "@/hooks/useAppNetwork";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    category: string;
    status: "draft" | "published";
    publishDate: string;
    author: string;
}

// API_BASE Removed as we use useAppNetwork
// const API_BASE = ENV.API_URL;

export default function BlogPage() {
    const [isCreating, setIsCreating] = useState(false);
    const [editingBlog, setEditingBlog] = useState<string | null>(null);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingLoading, setSavingLoading] = useState(false);
    const [selectedRelatedArticles, setSelectedRelatedArticles] = useState<string[]>([]);
    const network = useAppNetwork();

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        heroBadge: "",
        category: "",
        tags: "",
        content: "",
        featuredImage: "",
        relatedArticles: "",
        publishDate: new Date().toISOString().split("T")[0],
    });

    // Fetch blogs from API
    useEffect(() => {
        fetchBlogs();
    }, [network]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await network.get<BlogPost[]>(API_ENDPOINTS.BLOG.BASE);
            setBlogPosts(data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Auto-generate slug from title
        if (name === "title") {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    const handleContentChange = (content: string) => {
        setFormData((prev) => ({ ...prev, content }));
    };

    const saveBlog = async (status: 'draft' | 'published') => {
        setSavingLoading(true);
        try {
            const url = editingBlog
                ? `${API_ENDPOINTS.BLOG.BASE}/${editingBlog}`
                : API_ENDPOINTS.BLOG.BASE;

            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                relatedArticles: selectedRelatedArticles,
                status,
            };

            let data;
            if (editingBlog) {
                // PUT
                data = await network.put<any>(url, payload);
            } else {
                // POST
                data = await network.post<any>(url, payload);
            }

            alert(`Blog post ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
            setIsCreating(false);
            setEditingBlog(null);
            // Reset form
            setFormData({
                title: "",
                slug: "",
                description: "",
                heroBadge: "",
                category: "",
                tags: "",
                content: "",
                featuredImage: "",
                relatedArticles: "",
                publishDate: new Date().toISOString().split("T")[0],
            });
            // Refresh blog list
            fetchBlogs();

        } catch (error: any) {
            console.error('Error saving blog:', error);
            alert(`Failed to save blog post: ${error.message || 'Unknown error'}`);
        } finally {
            setSavingLoading(false);
        }
    };

    const handleEdit = (blog: BlogPost) => {
        setEditingBlog(blog._id);
        setFormData({
            title: blog.title,
            slug: blog.slug,
            description: (blog as any).description || '',
            heroBadge: (blog as any).heroBadge || '',
            category: blog.category,
            tags: (blog as any).tags?.join(', ') || '',
            content: (blog as any).content || '',
            featuredImage: (blog as any).featuredImage || '',
            relatedArticles: '',
            publishDate: blog.publishDate,
        });
        setSelectedRelatedArticles((blog as any).relatedArticles?.map((item: any) => typeof item === 'string' ? item : item._id || item) || []);
        setIsCreating(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        try {
            await network.del(`${API_ENDPOINTS.BLOG.BASE}/${id}`);
            alert('Blog post deleted successfully!');
            fetchBlogs();
        } catch (error: any) {
            console.error('Error deleting blog:', error);
            alert(`Failed to delete blog post: ${error.message || 'Unknown error'}`);
        }
    };

    const handleSaveDraft = () => saveBlog('draft');
    const handlePublish = () => saveBlog('published');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Publish Blog</h1>
                    <p className="text-lg text-gray-600">
                        Create and manage blog posts for your audience
                    </p>
                </div>
                {!isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <PenSquare className="w-5 h-5" />
                        New Blog Post
                    </button>
                )}
            </div>

            {/* Stats */}
            {!isCreating && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        label="Total Posts"
                        value={blogPosts.length}
                        change="+3"
                        icon={PenSquare}
                        color="blue"
                        trend="up"
                    />
                    <StatCard
                        label="Published"
                        value={blogPosts.filter((p) => p.status === "published").length}
                        change="+2"
                        icon={Send}
                        color="green"
                        trend="up"
                    />
                    <StatCard
                        label="Drafts"
                        value={blogPosts.filter((p) => p.status === "draft").length}
                        change="+1"
                        icon={Edit}
                        color="orange"
                        trend="up"
                    />
                    <StatCard
                        label="Categories"
                        value={3}
                        change="0"
                        icon={Tag}
                        color="purple"
                        trend="neutral"
                    />
                </div>
            )}

            {/* Blog Editor */}
            {isCreating ? (
                <div className="card p-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Create New Blog Post</h2>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter blog post title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="auto-generated-from-title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Brief description of the blog post (shown in previews)"
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                A short summary that will appear in blog listings and search results
                            </p>
                        </div>

                        {/* Hero Badge */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Badge
                            </label>
                            <input
                                type="text"
                                name="heroBadge"
                                value={formData.heroBadge}
                                onChange={handleInputChange}
                                placeholder="e.g., Featured, New, Trending"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Optional badge to display on the blog post (e.g., "Featured", "New")
                            </p>
                        </div>

                        {/* Category and Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="resume-tips">Resume Tips</option>
                                    <option value="interview-prep">Interview Prep</option>
                                    <option value="career-advice">Career Advice</option>
                                    <option value="ats">ATS Systems</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="resume, tips, career (comma-separated)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Tag className="w-4 h-4 inline mr-2" />
                                Related Articles
                            </label>
                            <select
                                multiple
                                value={selectedRelatedArticles}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setSelectedRelatedArticles(selected);
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                size={Math.min(blogPosts.filter(p => p._id !== editingBlog).length, 6)}
                            >
                                {blogPosts.filter(post => post._id !== editingBlog).map(post => (
                                    <option key={post._id} value={post._id}>{post.title}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Hold Ctrl/Cmd to select multiple. Selected: {selectedRelatedArticles.length}
                            </p>
                        </div>

                        {/* Featured Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="featuredImage"
                                    value={formData.featuredImage}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                                    <ImageIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Publish Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Publish Date
                            </label>
                            <input
                                type="date"
                                name="publishDate"
                                value={formData.publishDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Rich Text Content Editor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={handleContentChange}
                                placeholder="Start writing your blog post content here... Use the toolbar to format text, add images, links, and more!"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Use the formatting toolbar to style your content. Click the preview button to see how it will look.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4 border-t">
                            <button
                                onClick={handleSaveDraft}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                Save as Draft
                            </button>
                            <button
                                onClick={handlePublish}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Publish Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Blog List */
                <div className="card p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">All Blog Posts</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Title
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Category
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Date
                                    </th>
                                    <th className="text-right py-4 px-4 font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogPosts.map((post) => (
                                    <tr
                                        key={post._id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{post.title}</p>
                                                <p className="text-sm text-gray-500">/{post.slug}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${post.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                                    }`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">
                                            {new Date(post.publishDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
