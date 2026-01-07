import Script from 'next/script'

export function GlobalSchema() {
    const baseUrl = 'https://profresume.com'

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ProfResume",
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
        "name": "ProfResume",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "description": "Professional resume building platform trusted by 50,000+ job seekers worldwide",
        "foundingDate": "2024",
        "sameAs": [
            "https://twitter.com/profresume",
            "https://linkedin.com/company/profresume",
            "https://facebook.com/profresume"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@profresume.com",
            "contactType": "Customer Service",
            "availableLanguage": "English"
        }
    }

    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ProfResume Resume Builder",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "Create professional, ATS-friendly resumes with AI assistance"
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
