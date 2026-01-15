import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import { IntroSection } from "@/components/IntroSection";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ENV } from "../../env";
import { ArticleSchema } from "@/components/ArticleSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { Title } from "@repo/ui/title";
import { Description } from "@repo/ui/description";

interface Section {
    title: string;
    content: string;
    image?: string;
}

interface ArticleData {
    slug: string;
    title: string;
    description: string;
    heroBadge: string;
    sections: Section[];
}

/**
 * Simple parser to convert **bold** text into JSX elements.
 */
function renderContent(content: string) {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={i} className="text-slate-900 font-bold bg-blue-50/50 px-1 rounded mx-0.5">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

async function getArticle(slug: string): Promise<ArticleData | null> {
    // Try to find the interviews directory in common locations
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
        console.error("Could not find articles directory in any of:", possiblePaths);
        return null;
    }

    try {
        const files = await fs.readdir(articlesDir);
        for (const file of files) {
            if (!file.endsWith(".json")) continue;
            const content = await fs.readFile(path.join(articlesDir, file), "utf-8");
            const data: ArticleData = JSON.parse(content);
            if (data.slug === slug) {
                return data;
            }
        }
        console.warn(`Article with slug "${slug}" not found in ${articlesDir}`);
        return null;
    } catch (error) {
        console.error(`Error reading articles from ${articlesDir}:`, error);
        return null;
    }
}

export async function generateStaticParams() {
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

    if (!articlesDir) return [];

    try {
        const files = await fs.readdir(articlesDir);
        const slugs = await Promise.all(
            files
                .filter(file => file.endsWith(".json"))
                .map(async (file) => {
                    const content = await fs.readFile(path.join(articlesDir, file), "utf-8");
                    const data = JSON.parse(content);
                    return { slug: data.slug };
                })
        );
        return slugs;
    } catch (e) {
        console.error("Error generating static params:", e);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return {};

    // Determine tech for OG image
    let tech = "react";
    if (slug.includes("node")) tech = "node";
    if (slug.includes("python")) tech = "python";
    if (slug.includes("angular")) tech = "angular";

    const ogImage = `${ENV.BASE_URL}/images/interviews/${tech}-main.png`;

    // Determine tech and level for keywords
    const isSenior = slug.includes("senior");
    const isJunior = slug.includes("junior");
    const isFresher = slug.includes("fresher");
    const level = isSenior ? "Senior" : isJunior ? "Junior" : isFresher ? "Fresher" : "";

    const keywords = [
        `${tech} interview questions`,
        `${tech} ${level} interview questions`,
        `${level} ${tech} developer questions`,
        `${tech} technical interview`,
        "coding interview prep",
        "software engineering interview",
        `${tech} interview q&a 2026`,
        `${tech} interview questions for ${level.toLowerCase() === 'fresher' ? 'freshers' : level.toLowerCase() + (level ? ' developers' : 'developers')}`,
        `${tech} technical questions and answers`,
        `top 50 ${tech} interview questions`,
        "coding questions",
        "technical interview",
        "ProfResume"
    ].filter(Boolean).join(", ");

    return {
        title: article.title,
        description: article.description,
        keywords: keywords,
        alternates: {
            canonical: `${ENV.BASE_URL}/interviews/${slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.description,
            url: `${ENV.BASE_URL}/interviews/${slug}`,
            type: "article",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
            images: [ogImage],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    const tech = slug.includes("react") ? "React" : slug.includes("node") ? "Node.js" : slug.includes("python") ? "Python" : "Angular";
    const ogImage = `${ENV.BASE_URL}/images/interviews/${tech.toLowerCase().replace('.', '')}-main.png`;

    const isSenior = slug.includes("senior");
    const isJunior = slug.includes("junior");
    const isFresher = slug.includes("fresher");
    const level = isSenior ? "Senior" : isJunior ? "Junior" : isFresher ? "Fresher" : "";

    const keywords = [
        `${tech} interview questions`,
        `${tech} ${level} interview questions`,
        `${level} ${tech} developer questions`,
        `${tech} technical interview`,
        "coding interview prep",
        "software engineering interview",
        `${tech} interview q&a 2026`,
        "coding questions",
        "ProfResume"
    ].filter(Boolean).join(", ");
    // Generate FAQ Schema from ALL sections
    const allQuestions: any[] = [];
    article.sections.forEach(section => {
        // Regex to find all **QN: Question**\nAnswer patterns
        const qaRegex = /\*\*Q\d+:\s*(.*?)\*\*\n([\s\S]*?)(?=\n\n\*\*Q|$)/g;
        let match;
        while ((match = qaRegex.exec(section.content)) !== null) {
            allQuestions.push({
                "@type": "Question",
                "name": match[1].trim(),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": match[2].trim().replace(/\*\*/g, '')
                }
            });
        }
    });

    return (
        <article className="min-h-screen bg-white">
            {/* Structured Data */}
            <ArticleSchema
                title={article.title}
                description={article.description}
                url={`${ENV.BASE_URL}/interviews/${slug}`}
                datePublished="2026-01-11"
                dateModified={new Date().toISOString().split('T')[0]}
                author="ProfResume Team"
                image={ogImage}
            />
            <FAQSchema
                faqs={allQuestions.length > 0 ? allQuestions.map(q => ({
                    question: q.name,
                    answer: q.acceptedAnswer.text
                })) : article.sections.map(section => ({
                    question: section.title,
                    answer: section.content.replace(/\*\*/g, '')
                }))}
            />

            <BreadcrumbSchema
                items={[
                    { name: "Home", url: ENV.BASE_URL },
                    { name: "Interviews", url: `${ENV.BASE_URL}/interviews` },
                    { name: article.title, url: `${ENV.BASE_URL}/interviews/${slug}` },
                ]}
            />


            <IntroSection
                title={article.title}
                description={article.description}
                label={article.heroBadge}
                sectionClassName="bg-slate-50 border-b border-slate-100 py-16 md:py-24"
            />


            <div className="container mx-auto px-4 max-w-7xl mt-12 md:mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-4">
                    {/* Left Sidebar - Table of Contents */}
                    <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
                        <div className="space-y-10 pb-4">
                            <div>
                                <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                                    Table of Contents
                                </h2>
                                <nav className="space-y-1">
                                    {article.sections.map((section, index) => (
                                        <a
                                            key={index}
                                            href={`#section-${index}`}
                                            className="group flex items-start py-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            <span className="mr-3 text-slate-400 group-hover:text-blue-400 text-[10px] mt-1 transition-colors">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                            <span className="leading-snug font-medium">{section.title}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <a
                                    href="/interviews"
                                    className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
                                >
                                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to all interviews
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Content Column */}
                    <div className="max-w-3xl lg:max-w-none pb-24">
                        <div className="prose prose-slate prose-lg max-w-none">
                            {article.sections.map((section, index) => (
                                <section
                                    key={index}
                                    id={`section-${index}`}
                                    className="mb-20 scroll-mt-24"
                                >
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 flex items-start gap-4 group">
                                        <span className="text-blue-600/10 group-hover:text-blue-600/30 transition-colors text-xl mt-0.5">
                                            #
                                        </span>
                                        {section.title}
                                    </h2>

                                    <div className="pl-0 md:pl-8">
                                        <div className="text-slate-900 leading-[1.8] whitespace-pre-wrap mb-10 [word-spacing:0.025em] text-md text-gray-600">
                                            {renderContent(section.content)}
                                        </div>

                                        {section.image && (
                                            <div className="my-12 rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]">
                                                <img
                                                    src={section.image}
                                                    alt={section.title}
                                                    className="w-full h-auto object-cover max-h-[500px]"
                                                />
                                            </div>
                                        )}

                                        {/* Subtle section divider */}
                                        {index < article.sections.length - 1 && (
                                            <div className="mt-20 h-px bg-slate-100 w-24"></div>
                                        )}
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Explore More & Navigation */}
                        <div className="container mx-auto px-4 mt-24 mb-20 text-center">
                            <div className="flex justify-center gap-6 mb-16">
                                <a
                                    href="/interviews"
                                    className="text-blue-600 font-semibold flex items-center gap-2 hover:underline"
                                >
                                    ← Back to All Interview Guides
                                </a>
                            </div>

                            <div className="bg-blue-50 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Want to Ace Your {tech} Interview?</h2>
                                <p className="text-slate-600 mb-10 text-lg">
                                    Our AI-powered resume builder helps you create a high-quality resume that matches these professional {tech} standards and passes all ATS checks.
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
