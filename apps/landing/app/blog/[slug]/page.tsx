import { notFound } from "next/navigation";
import { ENV } from "../../env";
import RelatedArticles from "./RelatedArticles";

interface BlogData {
    _id: string;
    slug: string;
    title: string;
    description: string;
    heroBadge: string;
    category: string;
    tags: string[];
    content: string;
    featuredImage?: string;
    publishDate: string;
    relatedArticles?: Array<{ _id: string; slug: string; title: string; heroBadge: string }>;
    author: {
        name: string;
        email: string;
    };
}

interface TOCItem {
    id: string;
    title: string;
}

async function getBlog(slug: string): Promise<BlogData | null> {
    try {
        const response = await fetch(`${ENV.API_URL}/api/blog/slug/${slug}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

// Extract H2 headings from HTML content
function extractTableOfContents(content: string): TOCItem[] {
    const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const headings: TOCItem[] = [];
    let match;
    let index = 0;

    while ((match = headingRegex.exec(content)) !== null) {
        const title = match[1].replace(/<[^>]*>/g, '').trim(); // Strip HTML tags
        headings.push({
            id: `section-${index}`,
            title
        });
        index++;
    }

    return headings;
}

// Add IDs and scroll-margin to H2 tags
function addSectionIds(content: string): string {
    let index = 0;
    return content.replace(/<h2([^>]*)>/gi, (match, attributes) => {
        const result = `<h2${attributes} id="section-${index}" class="scroll-mt-24">`;
        index++;
        return result;
    });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) return {};

    return {
        title: blog.title,
        description: blog.description,
        keywords: [blog.category, ...blog.tags].join(', '),
        alternates: {
            canonical: `${ENV.BASE_URL}/blog/${slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.description,
            url: `${ENV.BASE_URL}/blog/${slug}`,
            type: "article",
            images: blog.featuredImage ? [
                {
                    url: blog.featuredImage,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                }
            ] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.description,
            images: blog.featuredImage ? [blog.featuredImage] : [],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const tableOfContents = extractTableOfContents(blog.content);
    console.log({ tableOfContents })
    const contentWithIds = addSectionIds(blog.content);

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-slate-50 border-b border-slate-100 py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    {blog.heroBadge && (
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {blog.heroBadge}
                            </span>
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {blog.title}
                    </h1>
                    <p className="text-xl text-slate-600 mb-6">
                        {blog.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>{blog.author.name}</span>
                        <span>•</span>
                        <time>{new Date(blog.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</time>
                        <span>•</span>
                        <span className="text-blue-600">{blog.category}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with 3-column layout */}
            <div className="container mx-auto px-4 max-w-7xl mt-12 md:mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4">
                    {/* Content Column */}
                    <div className="max-w-3xl lg:max-w-none pb-24">
                        {blog.featuredImage && (
                            <div className="mb-12 rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-auto object-cover max-h-[500px]"
                                />
                            </div>
                        )}

                        <div
                            className="prose prose-slate prose-lg max-w-none
                                prose-headings:text-slate-900 prose-headings:font-bold
                                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-6 prose-h2:mt-12
                                prose-p:text-slate-700 prose-p:leading-8
                                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-900 prose-strong:font-semibold
                                prose-ul:list-disc prose-ul:pl-6
                                prose-ol:list-decimal prose-ol:pl-6
                                prose-li:text-slate-700 prose-li:my-2
                                prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-slate-900 prose-pre:text-slate-100
                                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic"
                            dangerouslySetInnerHTML={{ __html: contentWithIds }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-slate-200">
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="container mx-auto px-4 mt-24 mb-20 text-center">
                            <div className="bg-blue-50 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Build Your Resume?</h2>
                                <p className="text-slate-600 mb-10 text-lg">
                                    Create a professional resume that stands out to recruiters with our AI-powered builder.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href={`${ENV.EDITOR_URL}`}
                                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200"
                                    >
                                        Start Building for Free
                                    </a>
                                    <a
                                        href="/templates"
                                        className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        Browse Templates
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Similar Articles */}
                    <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
                        <div className="space-y-6 pb-4">
                            <div>
                                <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                                    Similar Articles
                                </h2>
                                <div className="space-y-3">
                                    {/* Article 1 */}
                                    <a
                                        href={slug.includes('react') && slug.includes('senior') ? '/interviews/react-junior-interview-questions' :
                                            slug.includes('react') && slug.includes('junior') ? '/interviews/react-senior-interview-questions' :
                                                slug.includes('react') ? '/interviews/react-junior-interview-questions' :
                                                    slug.includes('angular') && slug.includes('senior') ? '/interviews/angular-junior-interview-questions' :
                                                        slug.includes('angular') && slug.includes('junior') ? '/interviews/angular-senior-interview-questions' :
                                                            slug.includes('angular') ? '/interviews/angular-junior-interview-questions' :
                                                                slug.includes('node') && slug.includes('senior') ? '/interviews/node-junior-interview-questions' :
                                                                    slug.includes('node') && slug.includes('junior') ? '/interviews/node-senior-interview-questions' :
                                                                        slug.includes('node') ? '/interviews/node-junior-interview-questions' :
                                                                            slug.includes('python') && slug.includes('senior') ? '/interviews/python-junior-interview-questions' :
                                                                                slug.includes('python') && slug.includes('junior') ? '/interviews/python-senior-interview-questions' :
                                                                                    '/interviews/react-interview-questions-for-freshers'}
                                        className="block group py-2"
                                    >
                                        <h3 className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">→</span>
                                            {slug.includes('react') && slug.includes('senior') ? 'React Junior Interview Questions' :
                                                slug.includes('react') && slug.includes('junior') ? 'React Senior Interview Questions' :
                                                    slug.includes('react') ? 'React Junior Interview Questions' :
                                                        slug.includes('angular') && slug.includes('senior') ? 'Angular Junior Interview Questions' :
                                                            slug.includes('angular') && slug.includes('junior') ? 'Angular Senior Interview Questions' :
                                                                slug.includes('angular') ? 'Angular Junior Interview Questions' :
                                                                    slug.includes('node') && slug.includes('senior') ? 'Node.js Junior Interview Questions' :
                                                                        slug.includes('node') && slug.includes('junior') ? 'Node.js Senior Interview Questions' :
                                                                            slug.includes('node') ? 'Node.js Junior Interview Questions' :
                                                                                slug.includes('python') && slug.includes('senior') ? 'Python Junior Interview Questions' :
                                                                                    slug.includes('python') && slug.includes('junior') ? 'Python Senior Interview Questions' :
                                                                                        'React Interview Questions for Freshers'}
                                        </h3>
                                    </a>

                                    {/* Article 2 */}
                                    <a
                                        href={slug.includes('react') ? '/interviews/react-hooks-interview-questions-for-freshers' :
                                            slug.includes('angular') ? '/interviews/angular-interview-question-for-fresher' :
                                                slug.includes('node') ? '/interviews/node-interview-questions-for-freshers' :
                                                    slug.includes('python') ? '/interviews/python-interview-questions-for-freshers' :
                                                        '/interviews/technical-interview-questions'}
                                        className="block group py-2"
                                    >
                                        <h3 className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">→</span>
                                            {slug.includes('react') ? 'React Hooks Interview Questions' :
                                                slug.includes('angular') ? 'Angular Fresher Interview Questions' :
                                                    slug.includes('node') ? 'Node.js Fresher Interview Questions' :
                                                        slug.includes('python') ? 'Python Fresher Interview Questions' :
                                                            'Technical Interview Questions'}
                                        </h3>
                                    </a>

                                    {/* Article 3 */}
                                    <a
                                        href="/interviews/common-interview-questions"
                                        className="block group py-2"
                                    >
                                        <h3 className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">→</span>
                                            Common Interview Questions
                                        </h3>
                                    </a>

                                    {/* Article 4 - Mock Interview Practice */}
                                    <a
                                        href="/interviews/mock-interview-practice"
                                        className="block group py-2"
                                    >
                                        <h3 className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">→</span>
                                            Mock Interview Practice
                                        </h3>
                                    </a>
                                </div>
                            </div>

                            {/* CTA Box */}
                            <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white">
                                <h3 className="font-bold text-lg mb-3">Ready to Build Your Resume?</h3>
                                <p className="text-sm text-blue-100 mb-4">
                                    Create a professional resume that stands out to recruiters.
                                </p>
                                <a
                                    href={ENV.EDITOR_URL}
                                    className="block w-full py-3 bg-white text-blue-600 font-bold text-sm rounded-lg hover:bg-blue-50 transition-colors text-center"
                                >
                                    Start for Free →
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
