import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

export const FOOTER = {
    newsletter: {
        title: "Get Career Tips & Resume Advice",
        description:
            "Join 50,000+ subscribers getting weekly career tips, resume templates, and job search strategies.",
        placeholder: "Enter your email address",
        buttonText: "Subscribe",
        successText: "✓ Subscribed",
    },

    brand: {
        name: "Hirecta",
        logo: "/logo.avif",
        description:
            "Build professional, ATS-friendly resumes that get you hired. Join 50,000+ job seekers who landed their dream jobs with our AI-powered resume builder.",
        phone: "+91 6393177038",
        location: "Uttar Pradesh, India",
        trustBadges: [],
    },

    socials: [
        { name: "Twitter", url: "https://twitter.com", icon: Twitter },
        { name: "Linkedin", url: "https://linkedin.com", icon: Linkedin },
        { name: "Github", url: "https://github.com", icon: Github },
        { name: "Facebook", url: "https://facebook.com", icon: Facebook },
        { name: "Instagram", url: "https://instagram.com", icon: Instagram },
    ],

    links: {
        product: [
            { label: "Free Resume Builder", href: "/free-resume-builder" },
            { label: "AI Resume Builder", href: "/ai-resume-builder" },
            { label: "ATS Resume Builder", href: "/ats-resume-builder" },
            { label: "Resume Templates", href: "/templates" },
            { label: "AI Resume Tailoring", href: "/tailor" },
            { label: "ATS Checker", href: "/ats-checker" },
            { label: "Cover Letter Builder", href: "/cover-letter" },
        ],
        resources: [
            { label: "Resume Writing Guide", href: "/resources/resume-guide" },
            { label: "Cover Letter Guide", href: "/resources/cover-letter-guide" },
            { label: "ATS Guide", href: "/resources/ats-guide" },
            { label: "Career Tips", href: "/resources/career-tips" },
            { label: "Blog", href: "/blog" },
        ],
        company: [
            { label: "About Us", href: "/about" },
            { label: "Pricing", href: "/pricing" },
            { label: "Contact", href: "/contact" },
            { label: "Help Center", href: "/help" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
        interviews: [
            { label: "React Freshers Q&A", href: "/interviews/react-interview-questions-with-answers-for-freshers" },
            { label: "React Mid-Level Guide", href: "/interviews/react-mid-level-interview-questions" },
            { label: "React Senior Architect", href: "/interviews/react-senior-level-interview-questions" },
            { label: "React Hooks Guide", href: "/interviews/react-hooks-interview-questions-for-freshers" },
            { label: "View All Guides", href: "/interviews" },
        ],
    },

    bottomLinks: [
        { label: "Sitemap", href: "/sitemap.xml" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Security", href: "/security" },
        { label: "Cookie Policy", href: "/cookies" },
    ],
};