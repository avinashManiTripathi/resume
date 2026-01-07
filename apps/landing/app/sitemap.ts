import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://profresume.com'

    const coreRoutes = [
        '',
        '/about',
        '/ats-checker',
        '/blog',
        '/contact',
        '/examples',
        '/help',
        '/integrations',
        '/pricing',
        '/privacy',
        '/reviews',
        '/success-stories',
        '/templates',
        '/terms',
        '/use-cases',
    ]

    const existingResources = [
        '/resources/ats-guide',
        '/resources/career-tips',
        '/resources/cover-letter-guide',
        '/resources/industry-examples',
        '/resources/resume-guide',
    ]

    const newResources = [
        '/resources/resume-checker',
        '/resources/ai-resume-review',
        '/resources/for-organizations',
        '/resources/resume-booster',
        '/resources/resume-critique',
        '/resources/targeted-resume',
        '/resources/resume-fixer',
        '/resources/resume-grammar-checker',
        '/resources/resume-keyword-generator',
        '/resources/update-your-resume-io-resume',
        '/resources/resume-scanner',
    ]

    const coreSitemap = coreRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' ? 'daily' : 'weekly') as any,
        priority: route === '' ? 1 : 0.8,
    }))

    const existingResourceSitemap = existingResources.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as any,
        priority: 0.8,
    }))

    const newResourceSitemap = newResources.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as any,
        priority: 0.4,
    }))

    return [...coreSitemap, ...existingResourceSitemap, ...newResourceSitemap]
}
