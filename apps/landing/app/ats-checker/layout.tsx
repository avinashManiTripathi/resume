import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Free ATS Resume Checker | Test Your Resume for ATS Compatibility | Hirecta",
    description: "Free AI-powered ATS checker tool. Upload your resume and get instant feedback on ATS compatibility, formatting, keywords, and optimization suggestions. Improve your chances of getting past Applicant Tracking Systems.",
    keywords: [
        "free ats checker",
        "ats resume checker",
        "applicant tracking system checker",
        "resume ats test",
        "ats compatibility check",
        "ats score checker",
        "resume scanner",
        "ats resume test free",
        "check resume for ats",
        "ats optimization tool"
    ],
    authors: [{ name: "Hirecta Team" }],
    creator: "Hirecta",
    publisher: "Hirecta",
    alternates: {
        canonical: `/ats-checker`,
    },
    openGraph: {
        title: "Free ATS Resume Checker - Test Your Resume Instantly",
        description: "Upload your resume and get instant AI-powered feedback on ATS compatibility Free AI analysis to help you pass Applicant Tracking Systems.",
        url: `/ats-checker`,
        siteName: "Hirecta",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: `/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Hirecta ATS Checker Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free ATS Resume Checker | Hirecta",
        description: "Test your resume's ATS compatibility with our free AI-powered tool. Get instant feedback and optimization suggestions.",
        images: [`/og-image.png`],
        creator: "@hirecta",
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

export default function ATSCheckerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
