import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import { IntroSection } from "@/components/IntroSection";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { ENV } from "../env";
import { ArrowRight, BookOpen, Star, Users, BookOpenCheck, Code2 } from "lucide-react";
import type { Metadata } from "next";

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
        return articles.sort((a, b) => a.title.localeCompare(b.title));
    } catch (e) {
        console.error("Error reading articles:", e);
        return [];
    }
}

export const metadata: Metadata = {
    title: "Interview Questions & Answers 2026 — Technical Interview Prep Guides | Hirecta",
    description: "Master your technical interview with 500+ curated questions and expert answers. Comprehensive guides for React, Angular, Node.js, Python, JavaScript, System Design, and more. Free interview prep by Hirecta.",
    keywords: "interview questions, technical interview questions, coding interview prep, React interview questions, Node.js interview questions, Python interview questions, JavaScript interview questions, Angular interview questions, system design interview, behavioral interview questions, software engineer interview, mock interview practice, interview preparation guide 2026",
    alternates: {
        canonical: "/interviews",
    },
    openGraph: {
        title: "500+ Technical Interview Questions & Expert Answers | Hirecta",
        description: "Free technical interview prep guides for React, Node.js, Python, Angular & more. Curated questions with detailed answers from expert engineers. Start practicing now.",
        url: "/interviews",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Hirecta Technical Interview Preparation Guides" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "500+ Technical Interview Questions | Free Interview Prep | Hirecta",
        description: "Ace your next tech interview. Expert guides for React, Python, Node.js, System Design & more. Free on Hirecta.",
        images: ["/og-image.png"],
        creator: "@hirecta",
    },
};

const interviewFaqs = [
    {
        question: "How do I prepare for a technical interview in 2026?",
        answer: "Start with data structures and algorithms (arrays, linked lists, trees, graphs), practice on LeetCode/HackerRank, study system design for senior roles, review company-specific technologies, and do at least 5 mock interviews. Hirecta's interview guides cover the most frequently asked questions per technology."
    },
    {
        question: "What are the most common React interview questions?",
        answer: "Common React interview questions include: What is the Virtual DOM? Explain React hooks (useState, useEffect, useContext). What is the difference between class and functional components? How does React reconciliation work? What are controlled vs uncontrolled components? When would you use Redux vs Context API? Hirecta's React guide covers 100+ such questions with detailed answers."
    },
    {
        question: "How many rounds are in a typical software engineering interview?",
        answer: "Most tech companies have 4-6 rounds: (1) HR Screening call (15-30 min), (2) Technical Phone Screen with 1-2 coding questions, (3) 2-4 rounds of onsite/virtual interviews covering coding, system design, and behavioral questions, and (4) a final hiring committee review. FAANG companies typically run 5-7 rounds."
    },
    {
        question: "What is the STAR method for behavioral interviews?",
        answer: "STAR stands for Situation, Task, Action, Result. Structure every behavioral answer by: describing the Situation/context, explaining the Task you were responsible for, detailing the specific Actions you took, and quantifying the Results you achieved. Example: 'Our deployment pipeline was failing 30% of builds (S). I was asked to fix it (T). I refactored the CI/CD pipeline with parallel test execution (A), reducing failures to under 2% and cutting build time by 45% (R).'"
    },
    {
        question: "What system design questions should I expect at FAANG?",
        answer: "Common system design questions: Design Twitter/URL Shortener/Parking Lot, Design a ride-sharing system, Design YouTube/Netflix, Design a distributed cache, Design a messaging system like WhatsApp. You'll be expected to cover: capacity estimation, API design, database schema, data flow, and trade-offs. Hirecta's guides cover all major system design patterns."
    },
    {
        question: "What Python topics are covered in data science interviews?",
        answer: "Python data science interviews cover: pandas DataFrame operations, NumPy array manipulation, SQL joins and window functions, machine learning fundamentals (overfitting, bias-variance tradeoff), model evaluation metrics (F1, AUC-ROC), feature engineering techniques, and building ML pipelines with scikit-learn. Statistics (probability, distributions, hypothesis testing) is also heavily tested."
    },
    {
        question: "How do I answer 'Tell me about yourself' in an interview?",
        answer: "Use the Present-Past-Future formula: Start with your current role and key achievements (30%), briefly mention your background and how you got here (30%), then pivot to why this role excites you and where you're headed (40%). Keep it under 2 minutes. Always tie back to the specific company/role. Avoid personal information unrelated to work."
    },
    {
        question: "What is the difference between JavaScript and TypeScript in interviews?",
        answer: "Interviewers typically ask: TypeScript adds static typing, interfaces, and generics on top of JavaScript. Key TypeScript concepts: type annotation, union types, generics, decorators, utility types (Partial, Required, Pick), and strict null checks. Most modern React/Node.js roles now expect TypeScript proficiency."
    },
    {
        question: "How should I negotiate salary after an interview offer?",
        answer: "Research market rates on Glassdoor/Levels.fyi first. Always let the employer name the number first. Counter 15-25% higher than what you want. Use competing offers as leverage. Negotiate the entire package: base salary, equity/stock, signing bonus, remote flexibility, and learning budget — not just base salary. Hirecta's career guides cover detailed salary negotiation scripts."
    },
    {
        question: "Can I use Hirecta to practice mock interviews?",
        answer: "Yes! Hirecta's AI Mock Interview feature lets you practice with an AI interviewer that asks real questions, evaluates your answers, and provides detailed feedback. Access it from the editor dashboard. Practice behavioral, technical, and system design rounds to build confidence before the real interview."
    }
];

export default async function ArticlesListPage() {
    const articles = await getAllArticles();

    const collectionLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Expert Technical Interview Question Guides 2026",
        "description": "Master your next technical interview with 500+ curated questions and expert answers for React, Node.js, Python, Angular, and System Design.",
        "url": `${ENV.BASE_URL}/interviews`,
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": articles.length,
            "itemListElement": articles.map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${ENV.BASE_URL}/interviews/${article.slug}`,
                "name": article.title
            }))
        }
    };

    const aggregateRatingLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Technical Interview Preparation — Complete Guide",
        "description": "Comprehensive technical interview preparation guides covering React, Node.js, Python, Angular, System Design and more.",
        "provider": {
            "@type": "Organization",
            "name": "Hirecta",
            "sameAs": ENV.BASE_URL
        },
        "url": `${ENV.BASE_URL}/interviews`,
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "instructor": {
                "@type": "Organization",
                "name": "Hirecta Career Experts"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "3241",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const stats = [
        { icon: <BookOpenCheck className="w-6 h-6" />, value: `${articles.length}+`, label: "Interview Guides" },
        { icon: <Code2 className="w-6 h-6" />, value: "500+", label: "Questions Covered" },
        { icon: <Users className="w-6 h-6" />, value: "50K+", label: "Job Seekers Helped" },
        { icon: <Star className="w-6 h-6" />, value: "4.8/5", label: "Average Rating" },
    ];

    return (
        <div className="pb-20">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }}
            />
            <FAQSchema faqs={interviewFaqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: ENV.BASE_URL },
                    { name: "Interview Guides", url: `${ENV.BASE_URL}/interviews` },
                ]}
            />

            <IntroSection
                label="Interview Preparation 2026"
                title="Expert Technical Interview Question Guides"
                description="Master your next technical interview with 500+ curated questions and detailed expert answers. Comprehensive guides for React, Node.js, Python, Angular, System Design, and more — completely free."
            />

            {/* Stats Bar */}
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 text-center flex flex-col items-center gap-2">
                            <div className="text-blue-600">{stat.icon}</div>
                            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                            <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Article Grid */}
            <div className="container mx-auto px-4 mt-4 max-w-7xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Browse Interview Guides by Technology</h2>
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

                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                    {article.title}
                                </h3>

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

            {/* FAQ Section */}
            <div className="container mx-auto px-4 mt-24 max-w-4xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Interview Prep Questions</h2>
                <div className="space-y-4">
                    {interviewFaqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Explore More Section */}
            <div className="container mx-auto px-4 mt-24">
                <div className="bg-blue-50 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Land the Interview First</h2>
                    <p className="text-slate-600 mb-6 text-lg">
                        A great resume gets you to the interview. Our AI-powered builder creates ATS-friendly resumes that hiring managers notice.
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-slate-700 font-semibold">4.9/5 from 12,500+ reviews</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`${ENV.EDITOR_URL}`}
                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200"
                        >
                            Build My Resume — Free
                        </a>
                        <Link
                            href="/free-resume-builder"
                            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
