import { ENV } from "@/app/env";
import Script from "next/script";

export function GlobalSchema() {
    const baseUrl = ENV.BASE_URL

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Hirecta",
        "alternateName": "Professional Resume Builder",
        "url": baseUrl,
        "description": "Build beautiful, ATS-friendly resumes with AI-powered tools. Trusted by 50,000+ professionals.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    }

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hirecta",
        "url": baseUrl,
        "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/android-chrome-512x512.png`,
            "width": 512,
            "height": 512
        },
        "description": "Professional resume building platform trusted by 50,000+ job seekers worldwide",
        "slogan": "Build Your Career with Confidence",
        "foundingDate": "2024",
        "sameAs": [
            "https://twitter.com/hirecta",
            "https://linkedin.com/company/hirecta",
            "https://facebook.com/hirecta",
            "https://instagram.com/hirecta",
            "https://github.com/hirecta"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": ENV.SUPPORT_EMAIL,
            "contactType": "Customer Service",
            "availableLanguage": "English"
        },
        "brand": {
            "@type": "Brand",
            "name": "Hirecta",
            "logo": `${baseUrl}/logo.avif`
        }
    }

    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Hirecta Resume Builder",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Resume Builder, Career Development",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "Create professional, ATS-friendly resumes with AI assistance",
        "featureList": [
            "AI-powered resume writing",
            "ATS-friendly templates",
            "Instant PDF/Word export",
            "AI cover letter generator",
            "ATS score checker"
        ],
        "screenshot": `${baseUrl}/og-image.png`,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": baseUrl
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "12547",
            "bestRating": "5",
            "worstRating": "1"
        }
    }

    return (
        <>
            <Script
                id="website-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="organization-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="software-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
        </>
    )
}
