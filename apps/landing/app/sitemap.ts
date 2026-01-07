import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://profresume.com'
    const currentDate = new Date()

    // Homepage (highest priority)
    const homepage = [{
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }]

    // Core product pages (high priority)
    const productPages = [
        'templates',
        'pricing',
        'examples',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // High-value resource pages (SEO content)
    const resourcePages = [
        'targeted-resume',
        'resume-critique',
        'ai-resume-review',
        'resume-booster',
        'resume-keyword-generator',
        'resume-checker',
        'resume-fixer',
        'resume-scanner',
        'for-organizations',
        'resume-guide',
        'ats-guide',
        'cover-letter-guide',
        'career-tips',
        'industry-examples',
        'update-your-resume-io-resume',
    ].map((slug) => ({
        url: `${baseUrl}/resources/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Supporting pages (medium priority)
    const supportPages = [
        'about',
        'contact',
        'help',
        'success-stories',
        'reviews',
        'blog',
        'integrations',
        'use-cases',
        'vs',
        'ats-checker',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Legal pages (low priority but required)
    const legalPages = [
        'privacy',
        'terms',
        'cookies',
        'accessibility',
        'security',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    }))

    return [
        ...homepage,
        ...productPages,
        ...resourcePages,
        ...supportPages,
        ...legalPages,
    ]
}
