import { ENV } from "@/app/env";
import Script from "next/script";

export function ProductSchema() {
    const baseUrl = ENV.BASE_URL;

    // Organization Schema for Brand Recognition
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hirecta",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "description": "Free AI-powered resume builder helping job seekers create professional, ATS-friendly resumes in minutes.",
        "foundingDate": "2024",
        "email": "support@hirecta.com",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "support@hirecta.com"
        },
        "sameAs": [
            "https://twitter.com/hirecta",
            "https://linkedin.com/company/hirecta",
            "https://github.com/hirecta"
        ]
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Hirecta - Free Resume Builder",
        "image": `${baseUrl}/og-image.png`,
        "description": "Free online resume builder with AI-powered tools, 50+ ATS-friendly templates, and instant PDF/Word export. No credit card required, no watermarks.",
        "brand": {
            "@type": "Brand",
            "name": "Hirecta"
        },
        "sku": "PR-FREE-V1",
        "mpn": "PR-FREE-V1",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": baseUrl,
            "priceValidUntil": "2026-12-31",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "US"
                },
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "USD"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 0,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 0,
                        "unitCode": "DAY"
                    }
                }
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
                "applicableCountry": "US",
                "merchantReturnDays": "0"
            }
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
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </>
    );
}
