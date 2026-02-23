import { MetadataRoute } from 'next'
import { ENV } from './env'
import { API_ENDPOINTS } from '@repo/utils-client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = ENV.BASE_URL
    const currentDate = new Date()

    // Homepage (highest priority)
    const homepage: MetadataRoute.Sitemap = [{
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
    }]

    // Pillar pages (critical SEO content - highest priority)
    const pillarPages: MetadataRoute.Sitemap = [
        'free-resume-builder',
        'ai-resume-builder',
        'ats-resume-builder',
        'best-resume-builder',
        'professional-resume-service',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.95,
    }))

    // Core product pages (high priority)
    const productPages: MetadataRoute.Sitemap = [
        'templates',
        'pricing',
        'examples',
        'resume-builder',
        'ats-checker',
        'ats-checker/check',
        'tailor',
        'cover-letter',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    // Resume builder category pages (high priority SEO content)
    const resumeBuilderPages: MetadataRoute.Sitemap = [
        'software-engineer',
        'fresher',
        'it-professional',
        'manager',
        'nurse',
        'teacher',
        'marketing',
        'data-scientist',
        'product-manager',
        // New high-traffic pages added Feb 2026
        'student',
        'entry-level',
        'executive',
        'accountant',
        'sales',
        'graphic-designer',
        'customer-service',
        'lawyer',
        'hr-manager',
        'finance',
    ].map((slug) => ({
        url: `${baseUrl}/resume-builder/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
    }))

    // High-value resource pages (SEO content)
    const resourcePages: MetadataRoute.Sitemap = [
        `${baseUrl}/resources`,
        `${baseUrl}/resources/targeted-resume`,
        `${baseUrl}/resources/resume-critique`,
        `${baseUrl}/resources/ai-resume-review`,
        `${baseUrl}/resources/resume-booster`,
        `${baseUrl}/resources/resume-keyword-generator`,
        `${baseUrl}/resources/resume-checker`,
        `${baseUrl}/resources/resume-fixer`,
        `${baseUrl}/resources/resume-scanner`,
        `${baseUrl}/resources/for-organizations`,
        `${baseUrl}/resources/resume-guide`,
        `${baseUrl}/resources/ats-guide`,
        `${baseUrl}/resources/cover-letter-guide`,
        `${baseUrl}/resources/career-tips`,
        `${baseUrl}/resources/industry-examples`,
        `${baseUrl}/resources/update-your-resume-io-resume`,
    ].map((url) => ({
        url,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    // Blog category pages (good for SEO)
    const blogCategoryPages: MetadataRoute.Sitemap = [
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
        changeFrequency: 'weekly',
        priority: 0.75,
    }))

    // Supporting pages (medium priority)
    const supportPages: MetadataRoute.Sitemap = [
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
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    // Legal pages (low priority but required)
    const legalPages: MetadataRoute.Sitemap = [
        'privacy',
        'terms',
        'cookies',
        'accessibility',
        'security',
    ].map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
    }))

    // Interview Question Articles (dynamic from API)
    // Note: Interview questions are stored in the Blog model
    let interviewPages: MetadataRoute.Sitemap = []
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

            // Add individual interview pages
            if (interviews.length > 0) {
                interviewPages = interviews.map((interview: any): MetadataRoute.Sitemap[number] => {
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
                        changeFrequency: 'weekly',
                        priority: 0.9,
                    };
                })
            }
        } else {
            console.warn('Failed to fetch blogs for interview sitemap')
        }
    } catch (e) {
        console.error("Error generating interview sitemap:", e)
    }

    // Always include the main interviews index page
    interviewPages.push({
        url: `${baseUrl}/interviews`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.95,
    })

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
