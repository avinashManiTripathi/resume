import { MetadataRoute } from 'next'
import { ENV } from './env'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = ENV.BASE_URL.replace(/^http:\/\//, 'https://')

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/_next/', '/static/'],
            },
            {
                userAgent: 'GPTBot',
                disallow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
