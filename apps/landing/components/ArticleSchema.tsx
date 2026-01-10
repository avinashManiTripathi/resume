import Script from 'next/script'
import { ENV } from '@/app/env'

interface ArticleSchemaProps {
    title: string
    description: string
    url: string
    datePublished?: string
    dateModified?: string
    author?: string
    image?: string
}

export function ArticleSchema({
    title,
    description,
    url,
    datePublished = '2024-01-01',
    dateModified = new Date().toISOString(),
    author = 'ProfResume Team',
    image = `${ENV.BASE_URL}/og-image.png`
}: ArticleSchemaProps) {
    const baseUrl = ENV.BASE_URL
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": url,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Organization",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "ProfResume",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        },
        "image": image,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    }

    return (
        <Script
            id="article-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
