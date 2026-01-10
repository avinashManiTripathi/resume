import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: 'Contact Us | ProfResume - Get in Touch',
    description: 'Have questions or need help? Contact the ProfResume team for support, feedback, or partnership inquiries.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact ProfResume',
        description: 'We\'re here to help you build the perfect resume.',
        url: '/contact',
        type: 'website',
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
