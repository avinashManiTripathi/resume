import { notFound } from "next/navigation";
import { ENV } from "../../env";

interface InterviewData {
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

async function getInterview(slug: string): Promise<InterviewData | null> {
    try {
        // Interview questions are stored in the Blog model with category "Interview"
        const response = await fetch(`${ENV.API_URL}/api/blog/slug/${slug}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching interview:', error);
        return null;
    }
}

// Extract questions from HTML content for FAQ schema
function extractQuestionsForSchema(content: string): Array<{ question: string; answer: string }> {
    // Split content by h2 tags and process each section
    const sections = content.split(/<h2[^>]*>/gi);
    const questions: Array<{ question: string; answer: string }> = [];

    for (let i = 1; i < sections.length; i++) {
        const parts = sections[i].split(/<\/h2>/i);
        if (parts.length >= 2) {
            const question = parts[0].replace(/<[^>]*>/g, '').trim();
            const answer = parts[1].replace(/<[^>]*>/g, '').trim().substring(0, 500); // Limit answer length

            if (question && answer) {
                questions.push({ question, answer });
            }
        }
    }

    return questions.slice(0, 10); // Limit to first 10 for schema
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const interview = await getInterview(slug);

    if (!interview) return {
        title: "Interview Questions Not Found | ProfResume",
        description: "The requested interview questions page could not be found.",
        metadataBase: new URL(ENV.BASE_URL),
    };

    // Ensure description is never empty
    const description = interview.description || `Comprehensive guide to ${interview.title}. Prepare for your next interview with expert-curated questions and answers.`;

    return {
        metadataBase: new URL(ENV.BASE_URL),
        title: `${interview.title} | ProfResume Interview Prep`,
        description: description,
        keywords: [interview.category, ...interview.tags, 'interview questions', 'interview prep', 'job interview'].join(', '),
        authors: [{ name: interview.author.name }],
        creator: "ProfResume",
        publisher: "ProfResume",
        alternates: {
            canonical: `${ENV.BASE_URL}/interviews/${slug}`,
        },
        openGraph: {
            title: interview.title,
            description: description,
            url: `${ENV.BASE_URL}/interviews/${slug}`,
            siteName: "ProfResume",
            locale: "en_US",
            type: "article",
            publishedTime: interview.publishDate,
            authors: [interview.author.name],
            tags: interview.tags,
            images: interview.featuredImage ? [
                {
                    url: interview.featuredImage,
                    width: 1200,
                    height: 630,
                    alt: interview.title,
                }
            ] : [{
                url: `${ENV.BASE_URL}/og-interview.png`,
                width: 1200,
                height: 630,
                alt: interview.title,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: interview.title,
            description: description,
            images: interview.featuredImage ? [interview.featuredImage] : [`${ENV.BASE_URL}/og-interview.png`],
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

export default async function InterviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const interview = await getInterview(slug);

    if (!interview) {
        notFound();
    }

    const questions = extractQuestionsForSchema(interview.content);

    // JSON-LD Structured Data Schemas
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": ENV.BASE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Interview Questions",
                "item": `${ENV.BASE_URL}/interviews`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": interview.title,
                "item": `${ENV.BASE_URL}/interviews/${slug}`
            }
        ]
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": interview.title,
        "description": interview.description,
        "image": interview.featuredImage || `${ENV.BASE_URL}/og-interview.png`,
        "datePublished": interview.publishDate,
        "dateModified": interview.publishDate,
        "author": {
            "@type": "Person",
            "name": interview.author.name,
            "email": interview.author.email
        },
        "publisher": {
            "@type": "Organization",
            "name": "ProfResume",
            "logo": {
                "@type": "ImageObject",
                "url": `${ENV.BASE_URL}/favicon.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${ENV.BASE_URL}/interviews/${slug}`
        },
        "keywords": interview.tags.join(', '),
        "articleSection": interview.category,
        "inLanguage": "en-US"
    };

    const faqSchema = questions.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(qa => ({
            "@type": "Question",
            "name": qa.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": qa.answer
            }
        }))
    } : null;

    const qaPageSchema = {
        "@context": "https://schema.org",
        "@type": "QAPage",
        "name": interview.title,
        "description": interview.description,
        "about": {
            "@type": "Thing",
            "name": interview.category
        },
        "mainEntity": questions.length > 0 ? {
            "@type": "Question",
            "name": questions[0].question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": questions[0].answer
            }
        } : undefined
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageSchema) }}
            />

            <article className="min-h-screen bg-white" itemScope itemType="https://schema.org/Article">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-100 py-3">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <ol className="flex items-center gap-2 text-sm text-slate-600">
                            <li><a href="/" className="hover:text-blue-600">Home</a></li>
                            <li>/</li>
                            <li><a href="/interviews" className="hover:text-blue-600">Interview Questions</a></li>
                            <li>/</li>
                            <li className="text-slate-900 font-medium">{interview.category}</li>
                        </ol>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="bg-slate-50 border-b border-slate-100 py-4">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {interview.heroBadge && (
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                    {interview.heroBadge}
                                </span>
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" itemProp="headline">
                            {interview.title}
                        </h1>
                        <p className="text-xl text-slate-600 mb-6" itemProp="description">
                            {interview.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span itemProp="author" itemScope itemType="https://schema.org/Person">
                                <span itemProp="name">{interview.author.name}</span>
                            </span>
                            <span>•</span>
                            <time itemProp="datePublished" dateTime={interview.publishDate}>
                                {new Date(interview.publishDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <span>•</span>
                            <span className="text-blue-600" itemProp="articleSection">{interview.category}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content with 2-column layout */}
                <div className="container mx-auto px-4 max-w-7xl mt-12 md:mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
                        {/* Content Column */}
                        <div className="max-w-3xl lg:max-w-none pb-24">
                            {interview.featuredImage && (
                                <div className="mb-12 rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
                                    <img
                                        src={interview.featuredImage}
                                        alt={interview.title}
                                        className="w-full h-auto object-cover max-h-[500px]"
                                        itemProp="image"
                                    />
                                </div>
                            )}

                            <div
                                className="prose prose-slate prose-lg max-w-none
                                    prose-headings:text-slate-900 prose-headings:font-bold
                                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:scroll-mt-24
                                    prose-p:text-slate-700 prose-p:leading-8
                                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-slate-900 prose-strong:font-semibold
                                    prose-ul:list-disc prose-ul:pl-6
                                    prose-ol:list-decimal prose-ol:pl-6
                                    prose-li:text-slate-700 prose-li:my-2
                                    prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                    prose-pre:bg-slate-900 prose-pre:text-slate-100
                                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic"
                                dangerouslySetInnerHTML={{ __html: interview.content }}
                                itemProp="articleBody"
                            />

                            {/* Tags */}
                            {interview.tags && interview.tags.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-slate-200">
                                    <div className="flex flex-wrap gap-2" itemProp="keywords">
                                        {interview.tags.map((tag, index) => (
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
                            <div className="mt-24 mb-20 text-center">
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
                                        Similar Questions
                                    </h2>
                                    <div className="space-y-3">
                                        {/* Dynamic related articles based on slug patterns */}
                                        {[
                                            {
                                                condition: slug.includes('react') && slug.includes('senior'),
                                                href: '/interviews/react-junior-interview-questions',
                                                title: 'React Junior Interview Questions'
                                            },
                                            {
                                                condition: slug.includes('react') && slug.includes('junior'),
                                                href: '/interviews/react-senior-interview-questions',
                                                title: 'React Senior Interview Questions'
                                            },
                                            {
                                                condition: slug.includes('react') && !slug.includes('senior') && !slug.includes('junior'),
                                                href: '/interviews/react-hooks-interview-questions',
                                                title: 'React Hooks Interview Questions'
                                            },
                                            {
                                                condition: slug.includes('angular'),
                                                href: '/interviews/angular-interview-questions',
                                                title: 'Angular Interview Questions'
                                            },
                                            {
                                                condition: slug.includes('node'),
                                                href: '/interviews/nodejs-interview-questions',
                                                title: 'Node.js Interview Questions'
                                            },
                                            {
                                                condition: slug.includes('python'),
                                                href: '/interviews/python-interview-questions',
                                                title: 'Python Interview Questions'
                                            },
                                            {
                                                condition: true, // Always show
                                                href: '/interviews/common-interview-questions',
                                                title: 'Common Interview Questions'
                                            },
                                            {
                                                condition: true, // Always show
                                                href: `${ENV.INTERVIEW_URL || 'https://interview.profresume.com'}`,
                                                title: 'Practice Mock Interview'
                                            },
                                        ]
                                            .filter(item => item.condition)
                                            .slice(0, 4)
                                            .map((item, index) => (
                                                <a
                                                    key={index}
                                                    href={item.href}
                                                    className="block group py-2"
                                                >
                                                    <h3 className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-start gap-2">
                                                        <span className="text-blue-600 mt-0.5">→</span>
                                                        {item.title}
                                                    </h3>
                                                </a>
                                            ))}
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
        </>
    );
}
