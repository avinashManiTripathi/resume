import { Metadata } from "next";
import HelpClient from "./HelpClient";

export const metadata: Metadata = {
    title: 'Help Center - Hirecta | FAQs & Support',
    description: 'Find answers to common questions about building resumes, templates, billing, and technical support at Hirecta.',
    alternates: {
        canonical: '/help',
    },
    openGraph: {
        title: 'Hirecta Help Center',
        description: 'How can we help you today?',
        url: '/help',
        type: 'website',
    },
};

export default function HelpPage() {
    return <HelpClient />;
}
