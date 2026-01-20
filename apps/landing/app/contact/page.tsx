import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: 'Contact Us | Hirecta - Get in Touch',
    description: 'Have questions or need help? Contact the Hirecta team for support, feedback, or partnership inquiries.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Hirecta',
        description: 'We\'re here to help you build the perfect resume.',
        url: '/contact',
        type: 'website',
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
