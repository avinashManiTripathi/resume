import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import { IntroSection } from "@/components/IntroSection";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ENV } from "../env";
import { ArrowRight, BookOpen } from "lucide-react";

interface ArticleData {
    slug: string;
    title: string;
    description: string;
    heroBadge: string;
}

async function getAllArticles(): Promise<ArticleData[]> {
    const possiblePaths = [
        path.join(process.cwd(), "data/interviews"),
        path.join(process.cwd(), "apps/landing/data/interviews"),
        path.join(process.cwd(), "../../data/interviews"),
    ];

    let articlesDir = "";
    for (const p of possiblePaths) {
        try {
            await fs.access(p);
            articlesDir = p;
            break;
        } catch {
            continue;
        }
    }

    if (!articlesDir) {
        console.error("Could not find articles directory");
        return [];
    }

    try {
        const files = await fs.readdir(articlesDir);
        const articles = await Promise.all(
            files
                .filter(file => file.endsWith(".json"))
                .map(async (file) => {
                    const content = await fs.readFile(path.join(articlesDir, file), "utf-8");
                    const data = JSON.parse(content);
                    return {
                        slug: data.slug,
                        title: data.title,
                        description: data.description,
                        heroBadge: data.heroBadge,
                    };
                })
        );
        // Sort articles to have a consistent order
        return articles.sort((a, b) => a.title.localeCompare(b.title));
    } catch (e) {
        console.error("Error reading articles:", e);
        return [];
    }
}

export const metadata = {
    title: "Interview Question Guides | Expert Career Advice",
    description: "Explore our comprehensive library of interview question guides for React, Angular, Python, Node.js, and more. Master your next tech interview.",
    keywords: "interview questions, technical interview, coding interview, interview preparation, software engineer interview, React interview questions, Node.js interview questions, Python interview questions, Angular interview questions, career advice, tech jobs",
    alternates: {
        canonical: "/interviews",
    },
};

export default async function ArticlesListPage() {
    const articles = await getAllArticles();

    const collectionLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Expert Technical Interview Question Guides",
        "description": "Master your next technical interview with our comprehensive guides for React, Node.js, Python, and Angular.",
        "url": `${ENV.BASE_URL}/interviews`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": articles.map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${ENV.BASE_URL}/interviews/${article.slug}`,
                "name": article.title
            }))
        }
    };

    return (
        <div className="pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: ENV.BASE_URL },
                    { name: "Interviews", url: `${ENV.BASE_URL}/interviews` },
                ]}
            />

            <IntroSection
                label="Interview Preparation"
                title="Expert Interview Question Guides"
                description="Master your next technical interview with our comprehensive guides. Curated questions and detailed answers for developers of all levels."
            />

            <div className="container mx-auto px-4 mt-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/interviews/${article.slug}`}
                            className="group flex flex-col p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 p-6 text-slate-50 group-hover:text-blue-50 transition-colors duration-300 -z-0">
                                <BookOpen size={80} strokeWidth={1} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6 w-fit">
                                    {article.heroBadge}
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                    {article.title}
                                </h2>

                                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {article.description}
                                </p>

                                <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm">
                                    <span className="group-hover:mr-2 transition-all duration-300">Read Full Guide</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Explore More Section */}
            <div className="container mx-auto px-4 mt-24">
                <div className="bg-blue-50 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Need a professional resume?</h2>
                    <p className="text-slate-600 mb-10 text-lg">
                        Our AI-powered builder helps you create a high-quality resume that matches these interview standards.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`${ENV.EDITOR_URL}`}
                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200"
                        >
                            Start Building for Free
                        </a>
                        <Link
                            href="/templates"
                            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Browse Templates
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
