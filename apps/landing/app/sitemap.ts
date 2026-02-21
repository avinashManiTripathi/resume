import { MetadataRoute } from 'next'
import { ENV } from './env'
import { API_ENDPOINTS } from '@repo/utils-client'

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

    // Tool sub-pages (high priority SEO entry points)
    const toolSubPages = [
        { url: `${baseUrl}/ats-checker/check`, priority: 0.85 },
    ].map((page) => ({
        ...page,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
    }))

    // Pillar pages (critical SEO content - highest priority)
    const pillarPages = [
        'free-resume-builder',
        'ai-resume-builder',
        'ats-resume-builder',
        'best-resume-builder',
        'professional-resume-service',
        'interviews',
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
        'nurse',
        'teacher',
        'marketing',
        'data-scientist',
        'product-manager',
    ].map((slug) => ({
        url: `${baseUrl}/resume-builder/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    // High-value resource pages (SEO content)
    const resourcePages = [
        '',                              // /resources (index)
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
        url: slug ? `${baseUrl}/resources/${slug}` : `${baseUrl}/resources`,
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
        'delete-account',
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

    // Interview Question Articles (dynamic from API)
    // Note: Interview questions are stored in the Blog model
    let interviewPages: any[] = []
    try {
        // Fetch interview articles from Blog API (filter by category if needed)
        const response = await fetch(`${ENV.API_URL}${API_ENDPOINTS.BLOG.BASE}?limit=100`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (response.ok) {
            const allBlogs = await response.json()

            // Filter for interview-related content (by category or slug pattern)
            const interviews = allBlogs.filter((blog: any) =>
                blog.slug && (
                    blog.slug.includes('interview') ||
                    blog.category?.toLowerCase().includes('interview') ||
                    blog.tags?.some((tag: string) => tag.toLowerCase().includes('interview'))
                )
            )

            console.log({ interviews })
            // Add individual interview pages
            if (interviews.length > 0) {
                interviewPages = interviews.map((interview: any) => {
                    let parsedDate = currentDate;
                    if (interview.updatedAt) {
                        const d = new Date(interview.updatedAt);
                        if (!isNaN(d.getTime())) {
                            parsedDate = d;
                        }
                    }
                    return {
                        url: `${baseUrl}/interviews/${interview.slug}`,
                        lastModified: parsedDate,
                        changeFrequency: 'weekly' as const,
                        priority: 0.9,
                    };
                })
            }

            // Add the main interviews index page
            interviewPages.push({
                url: `${baseUrl}/interviews`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            })
        } else {
            console.warn('Failed to fetch blogs for interview sitemap')

            // Fallback: Add at least the main interviews page
            interviewPages.push({
                url: `${baseUrl}/interviews`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            })
        }
    } catch (e) {
        console.error("Error generating interview sitemap:", e)

        // Fallback: Add at least the main interviews page
        interviewPages.push({
            url: `${baseUrl}/interviews`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        })
    }

    return [
        ...homepage,
        ...pillarPages,
        ...productPages,
        ...toolSubPages,
        ...resumeBuilderPages,
        ...resourcePages,
        ...blogCategoryPages,
        ...supportPages,
        ...legalPages,
        ...interviewPages,
    ]
}
