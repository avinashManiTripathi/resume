import { ENV } from "@/app/env";

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
                        icon: "✏️",
                        title: "Resume Builder",
                        description: "Create professional resumes in minutes",
                        href: "/resume-builder"
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
                        description: "Customize for each job",
                        href: "/tailor"
                    },
                    {
                        icon: "📄",
                        title: "Templates",
                        description: "200+ professional designs",
                        href: "/templates"
                    },
                    {
                        icon: "📊",
                        title: "Resume Score",
                        description: "Get instant feedback",
                        href: "/resources/resume-checker"
                    },
                    {
                        icon: "✨",
                        title: "Examples",
                        description: "Real resume showcases",
                        href: "/examples"
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
        {
            id: "company",
            label: "Company",
            type: "mega-dropdown",
            megaMenu: {
                title: "Company",
                description: "Learn more about our mission to help job seekers land their dream careers.",
                items: [
                    {
                        icon: "🏢",
                        title: "About Us",
                        description: "Our mission and vision",
                        href: "/about"
                    },
                    {
                        icon: "⭐",
                        title: "Reviews",
                        description: "What our users say",
                        href: "/reviews"
                    },
                    {
                        icon: "🎉",
                        title: "Success Stories",
                        description: "Real transformations",
                        href: "/success-stories"
                    },
                    {
                        icon: "✉️",
                        title: "Contact",
                        description: "Get in touch with us",
                        href: "/contact"
                    },
                    {
                        icon: "🔒",
                        title: "Privacy Policy",
                        description: "How we protect data",
                        href: "/privacy"
                    },
                    {
                        icon: "🛡️",
                        title: "Security",
                        description: "Your data is safe",
                        href: "/security"
                    }
                ],
                featured: {
                    title: "Join Our Team",
                    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
                    links: [
                        { text: "Careers", href: "/about#careers" },
                        { text: "Culture", href: "/about#culture" }
                    ]
                }
            }
        }
    ],
    coverLetter: {
        label: "Cover Letter",
        href: "/cover-letter"
    },
    cta: {
        text: "Start Free",
        href: ENV.EDITOR_URL
    }
};