import { ENV } from "@/app/env";
import { URLS } from "./urls";


export const NAVIGATION = {
    logo: { text: "Prof", accent: "Resume" },
    menuItems: [
        {
            id: "product",
            label: "Product",
            type: "mega-dropdown",
            megaMenu: {
                title: "Products",
                description: "Automate and easily manage the pre and post purchase experience of your clients.",
                items: [
                    {
                        icon: "🚀",
                        title: "Free Resume Builder",
                        description: "100% free, no credit card required",
                        href: "/free-resume-builder"
                    },
                    {
                        icon: "🤖",
                        title: "AI Resume Builder",
                        description: "Smart AI-powered resume writing",
                        href: "/ai-resume-builder"
                    },
                    {
                        icon: "🛡️",
                        title: "ATS Resume Builder",
                        description: "Guaranteed ATS-friendly layouts",
                        href: "/ats-resume-builder"
                    },
                    {
                        icon: "🔍",
                        title: "ATS Checker",
                        description: "Test your resume compatibility",
                        href: "/ats-checker"
                    },
                    {
                        icon: "🎯",
                        title: "AI Resume Tailor",
                        description: "Customize for each job description",
                        href: "/tailor"
                    },
                    {
                        icon: "📄",
                        title: "Resume Templates",
                        description: "Browse 50+ professional designs",
                        href: "/templates"
                    }
                ],
                featured: {
                    title: "For Professionals",
                    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop",
                    links: [
                        { text: "Enterprise Solutions", href: "/resources/for-organizations" },
                        { text: "Success Stories", href: "/success-stories" }
                    ]
                }
            }
        },
        {
            id: "resources",
            label: "Resources",
            type: "mega-dropdown",
            megaMenu: {
                title: "Resources",
                description: "Learn everything you need to create the perfect resume and land your dream job.",
                items: [
                    {
                        icon: "📖",
                        title: "Resume Writing Guide",
                        description: "Complete resume tutorial",
                        href: "/resources/resume-guide"
                    },
                    {
                        icon: "✍️",
                        title: "Cover Letter Guide",
                        description: "Write compelling letters",
                        href: "/resources/cover-letter-guide"
                    },
                    {
                        icon: "🤖",
                        title: "ATS Guide",
                        description: "Beat tracking systems",
                        href: "/resources/ats-guide"
                    },
                    {
                        icon: "🔑",
                        title: "Keyword Generator",
                        description: "Find the right keywords",
                        href: "/resources/resume-keyword-generator"
                    },
                    {
                        icon: "💡",
                        title: "Career Tips",
                        description: "Job search strategies",
                        href: "/resources/career-tips"
                    },
                    {
                        icon: "📝",
                        title: "Blog",
                        description: "Career insights & tips",
                        href: "/blog"
                    }
                ],
                featured: {
                    title: "Learning Center",
                    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
                    links: [
                        { text: "All Guides", href: "/resources" },
                        { text: "Help Center", href: "/help" }
                    ]
                }
            }
        },
        {
            id: "interviews",
            label: "Interviews",
            type: "mega-dropdown",
            megaMenu: {
                title: "Interview Masterclass",
                description: "Master your technical interviews with our expert-curated guides.",
                items: [
                    {
                        icon: "⚛️",
                        title: "React.js Guide",
                        description: "Fresher to Senior questions",
                        href: "/interviews/react-junior-interview-questions"
                    },
                    {
                        icon: "🟢",
                        title: "Node.js Guide",
                        description: "Scalability and testing",
                        href: "/interviews/node-junior-interview-questions"
                    },
                    {
                        icon: "🐍",
                        title: "Python Guide",
                        description: "Data science and backend",
                        href: "/interviews/python-junior-interview-questions"
                    },
                    {
                        icon: "🅰️",
                        title: "Angular Guide",
                        description: "Enterprise patterns",
                        href: "/interviews/angular-junior-interview-questions"
                    },
                    {
                        icon: "📚",
                        title: "All Guides",
                        description: "Browse 12+ guides",
                        href: "/interviews"
                    }
                ],
                featured: {
                    title: "Interview Success",
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
                    links: [
                        { text: "System Design Guide", href: "/interviews" },
                        { text: "Interview Checklist", href: "/interviews" }
                    ]
                }
            }
        },

    ],
    coverLetter: {
        label: "Cover Letter",
        href: "/cover-letter"
    },
    aiInterview: {
        label: "AI Interview",
        href: URLS.AI_INTERVIEW,
        isExternal: true
    },
    cta: {
        text: "Get Started",
        href: URLS.EDITOR_DASHBOARD
    }
};