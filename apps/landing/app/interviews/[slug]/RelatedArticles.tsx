"use client";

interface RelatedArticle {
    _id: string;
    slug: string;
    title: string;
    heroBadge: string;
}

export default function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
    if (!articles || articles.length === 0) {
        return (
            <div className="space-y-3">
                <a href="/blog" className="block group py-2">
                    <h3 className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">→</span>
                        View All Blog Posts
                    </h3>
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <a
                    key={article._id}
                    href={`/blog/${article.slug}`}
                    className="block group py-2 hover:bg-slate-50 rounded-lg px-3 -mx-3 transition-colors"
                >
                    {article.heroBadge && (
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold mb-1">
                            {article.heroBadge}
                        </span>
                    )}
                    <h3 className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                </a>
            ))}
        </div>
    );
}
