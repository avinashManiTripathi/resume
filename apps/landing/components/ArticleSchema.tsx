import Script from 'next/script'

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
    image = 'https://profresume.com/og-image.png'
}: ArticleSchemaProps) {
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
                "url": "https://profresume.com/logo.png"
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
