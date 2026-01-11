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
        name: "ProfResume",
        logo: "/logo.png",
        description:
            "Build professional, ATS-friendly resumes that get you hired. Join 50,000+ job seekers who landed their dream jobs with our AI-powered resume builder.",
        phone: "+91 6393177038",
        location: "Uttar Pradesh, India",
        trustBadges: [
            { label: "SSL Secured", color: "bg-green-600", icon: "✓" },
            { label: "GDPR Compliant", color: "bg-blue-600", icon: "✓" },
            { label: "4.9/5 Rating", color: "bg-purple-600", icon: "★" },
            { label: "50K+ Happy Users", color: "bg-orange-600", icon: "50K+" },
        ],
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
            { label: "Resume Builder", href: "/resume-builder" },
            { label: "Resume Templates", href: "/templates" },
            { label: "AI Resume Tailoring", href: "/tailor" },
            { label: "ATS Checker", href: "/ats-checker" },
            { label: "Cover Letter Builder", href: "/cover-letter" },
            { label: "Resume Examples", href: "/resume-examples" },
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
    },

    bottomLinks: [
        { label: "Sitemap", href: "/sitemap.xml" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Security", href: "/security" },
        { label: "Cookie Policy", href: "/cookies" },
    ],
};