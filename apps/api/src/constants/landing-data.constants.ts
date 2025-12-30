export const LANDING_PAGE_DATA = {
    navigation: {
        logo: {
            text: "Resume",
            accent: "Pro"
        },
        menuItems: [
            {
                id: "product",
                label: "Product",
                type: "mega-dropdown",
                columns: [
                    {
                        items: [
                            {
                                icon: "🎯",
                                title: "Features",
                                description: "Powerful resume building tools",
                                href: "/#features"
                            },
                            {
                                icon: "📄",
                                title: "Templates",
                                description: "ATS-friendly designs",
                                href: "/templates"
                            },
                            {
                                icon: "💎",
                                title: "Pricing",
                                description: "Simple, transparent pricing",
                                href: "/pricing"
                            }
                        ]
                    },
                    {
                        items: [
                            {
                                icon: "👥",
                                title: "Use Cases",
                                description: "For students, professionals & more",
                                href: "/use-cases"
                            },
                            {
                                icon: "✨",
                                title: "Examples",
                                description: "Real resume showcases",
                                href: "/examples"
                            },
                            {
                                icon: "🔗",
                                title: "Integrations",
                                description: "Connect with LinkedIn & more",
                                href: "/integrations"
                            }
                        ]
                    }
                ]
            },
            {
                id: "resources",
                label: "Resources",
                type: "mega-dropdown",
                columns: [
                    {
                        header: "Guides",
                        items: [
                            {
                                icon: "📖",
                                title: "Resume Writing Guide",
                                description: "Complete guide to writing resumes",
                                href: "/resources/resume-guide"
                            },
                            {
                                icon: "✍️",
                                title: "Cover Letter Guide",
                                description: "Write compelling cover letters",
                                href: "/resources/cover-letter-guide"
                            },
                            {
                                icon: "🤖",
                                title: "ATS Guide",
                                description: "Beat applicant tracking systems",
                                href: "/resources/ats-guide"
                            }
                        ]
                    },
                    {
                        header: "Learn",
                        items: [
                            {
                                icon: "📝",
                                title: "Blog",
                                description: "Career tips and insights",
                                href: "/blog"
                            },
                            {
                                icon: "💼",
                                title: "Career Tips",
                                description: "Job search strategies",
                                href: "/resources/career-tips"
                            },
                            {
                                icon: "🏭",
                                title: "Industry Examples",
                                description: "Resumes by industry",
                                href: "/resources/industry-examples"
                            },
                            {
                                icon: "❓",
                                title: "Help & FAQ",
                                description: "Get answers quickly",
                                href: "/help"
                            }
                        ]
                    }
                ]
            },
            {
                id: "company",
                label: "Company",
                type: "mega-dropdown",
                columns: [
                    {
                        header: "About",
                        items: [
                            {
                                icon: "🏢",
                                title: "About Us",
                                description: "Our mission and team",
                                href: "/about"
                            },
                            {
                                icon: "✉️",
                                title: "Contact",
                                description: "Get in touch",
                                href: "/contact"
                            }
                        ]
                    },
                    {
                        header: "Trust",
                        items: [
                            {
                                icon: "⭐",
                                title: "Reviews",
                                description: "What our users say",
                                href: "/reviews"
                            },
                            {
                                icon: "🎉",
                                title: "Success Stories",
                                description: "Real career transformations",
                                href: "/success-stories"
                            },
                            {
                                icon: "⚖️",
                                title: "Comparison",
                                description: "Why choose ResumePro",
                                href: "/vs"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            text: "Start Free →",
            href: "http://localhost:3002"
        },
        mobileMenu: {
            sections: [
                {
                    title: "Product",
                    links: [
                        { text: "Features", href: "/#features" },
                        { text: "Templates", href: "/templates" },
                        { text: "Pricing", href: "/pricing" },
                        { text: "Use Cases", href: "/use-cases" },
                        { text: "Examples", href: "/examples" },
                        { text: "Integrations", href: "/integrations" }
                    ]
                },
                {
                    title: "Resources",
                    links: [
                        { text: "Resume Writing Guide", href: "/resources/resume-guide" },
                        { text: "Cover Letter Guide", href: "/resources/cover-letter-guide" },
                        { text: "ATS Guide", href: "/resources/ats-guide" },
                        { text: "Blog", href: "/blog" },
                        { text: "Career Tips", href: "/resources/career-tips" },
                        { text: "Industry Examples", href: "/resources/industry-examples" },
                        { text: "Help & FAQ", href: "/help" }
                    ]
                },
                {
                    title: "Company",
                    links: [
                        { text: "About Us", href: "/about" },
                        { text: "Contact", href: "/contact" },
                        { text: "Reviews", href: "/reviews" },
                        { text: "Success Stories", href: "/success-stories" },
                        { text: "Comparison", href: "/vs" }
                    ]
                }
            ],
            cta: {
                text: "Start Free →",
                href: "/editor"
            }
        }
    },
    footer: {
        brand: {
            icon: "FileText",
            logo: "ResumePro",
            description: "Create professional resumes that get you hired."
        },
        sections: [
            {
                title: "Product",
                links: [
                    { text: "Features", href: "#features" },
                    { text: "Templates", href: "/templates" },
                    { text: "Pricing", href: "#pricing" }
                ]
            },
            {
                title: "Company",
                links: [
                    { text: "About", href: "/about" },
                    { text: "Blog", href: "/blog" },
                    { text: "Contact", href: "/contact" }
                ]
            },
            {
                title: "Legal",
                links: [
                    { text: "Privacy", href: "/privacy" },
                    { text: "Terms", href: "/terms" }
                ]
            }
        ],
        copyright: "© 2025 ResumePro. All rights reserved."
    }
};
