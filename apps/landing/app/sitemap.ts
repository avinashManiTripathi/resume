import { MetadataRoute } from 'next'
import { ENV } from './env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = ENV.BASE_URL
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
        'resume-builder',
        'ats-checker',
        'tailor',
        'cover-letter',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Pillar pages (critical SEO content - highest priority)
    const pillarPages = [
        'free-resume-builder',
        'best-resume-builder',
        'professional-resume-service',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.95,
    }))

    // Resume builder category pages (high priority SEO content)
    const resumeBuilderPages = [
        'software-engineer',
        'fresher',
        'it-professional',
        'manager',
    ].map((slug) => ({
        url: `${baseUrl}/resume-builder/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
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

    // Blog category pages (good for SEO)
    const blogCategoryPages = [
        'tips-tricks',
        'career-advice',
        'ats',
        'career-change',
        'remote-work',
        'linkedin',
        'interview-prep',
        'salary-negotiation',
    ].map((slug) => ({
        url: `${baseUrl}/blog/category/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
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

    // Interview Question Articles (dynamic)
    let interviewPages: any[] = []
    try {
        const path = await import('path')
        const fs = await import('fs/promises')

        const possiblePaths = [
            path.join(process.cwd(), "data/interviews"),
            path.join(process.cwd(), "apps/landing/data/interviews"),
            path.join(process.cwd(), "../../data/interviews"),
        ]

        let interviewsDir = ""
        for (const p of possiblePaths) {
            try {
                await fs.access(p)
                interviewsDir = p
                break
            } catch {
                continue
            }
        }

        if (interviewsDir) {
            const files = await fs.readdir(interviewsDir)
            for (const file of files) {
                if (!file.endsWith(".json")) continue
                const content = await fs.readFile(path.join(interviewsDir, file), "utf-8")
                const data = JSON.parse(content)
                interviewPages.push({
                    url: `${baseUrl}/interviews/${data.slug}`,
                    lastModified: currentDate,
                    changeFrequency: 'weekly' as const,
                    priority: 0.9,
                })
            }

            // Add the main interviews index page
            interviewPages.push({
                url: `${baseUrl}/interviews`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            })
        }
    } catch (e) {
        console.error("Error generating interview sitemap:", e)
    }

    return [
        ...homepage,
        ...pillarPages,
        ...productPages,
        ...resumeBuilderPages,
        ...resourcePages,
        ...blogCategoryPages,
        ...supportPages,
        ...legalPages,
        ...interviewPages,
    ]
}
