export function ProductSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "ProfResume - Free Resume Builder",
        "image": "https://profresume.com/og-image.png",
        "description": "Free online resume builder with AI-powered tools, 50+ ATS-friendly templates, and instant PDF/Word export. No credit card required, no watermarks.",
        "brand": {
            "@type": "Brand",
            "name": "ProfResume"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://profresume.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "12547",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Sarah Johnson"
                },
                "reviewBody": "Best free resume builder I've used. Got my resume ATS-ready in 10 minutes and landed 3 interviews within a week!"
            },
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Michael Chen"
                },
                "reviewBody": "The AI-powered writing suggestions saved me hours. My resume looks professional and passed all ATS checks."
            },
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Emily Rodriguez"
                },
                "reviewBody": "Love that it's truly free with no hidden costs. Templates are modern and the cover letter generator is a game-changer!"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
