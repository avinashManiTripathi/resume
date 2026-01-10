/**
 * Breadcrumb configurations for all pages
 * Each breadcrumb follows the pattern: Home > Parent > Current Page
 */

import { ENV } from "@/app/env";

interface BreadcrumbItem {
    name: string;
    url: string;
}

const baseUrl = ENV.BASE_URL;

export const BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
    // Resource Pages
    'targeted-resume': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Targeted Resume", url: `${baseUrl}/resources/targeted-resume` }
    ],
    'resume-checker': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Checker", url: `${baseUrl}/resources/resume-checker` }
    ],
    'resume-critique': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Critique", url: `${baseUrl}/resources/resume-critique` }
    ],
    'resume-fixer': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Fixer", url: `${baseUrl}/resources/resume-fixer` }
    ],
    'resume-scanner': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Scanner", url: `${baseUrl}/resources/resume-scanner` }
    ],
    'ai-resume-review': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "AI Resume Review", url: `${baseUrl}/resources/ai-resume-review` }
    ],
    'resume-booster': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Booster", url: `${baseUrl}/resources/resume-booster` }
    ],
    'for-organizations': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "For Organizations", url: `${baseUrl}/resources/for-organizations` }
    ],
    'resume-keyword-generator': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Keyword Generator", url: `${baseUrl}/resources/resume-keyword-generator` }
    ],
    'update-your-resume-io-resume': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Update Resume.io Resume", url: `${baseUrl}/resources/update-your-resume-io-resume` }
    ],
    'ats-guide': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "ATS Guide", url: `${baseUrl}/resources/ats-guide` }
    ],
    'career-tips': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Career Tips", url: `${baseUrl}/resources/career-tips` }
    ],
    'cover-letter-guide': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Cover Letter Guide", url: `${baseUrl}/resources/cover-letter-guide` }
    ],
    'industry-examples': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Industry Examples", url: `${baseUrl}/resources/industry-examples` }
    ],
    'resume-guide': [
        { name: "Home", url: baseUrl },
        { name: "Resources", url: `${baseUrl}/resources` },
        { name: "Resume Guide", url: `${baseUrl}/resources/resume-guide` }
    ],

    // Add more pages as needed
};

/**
 * Helper function to get breadcrumb items by page slug
 * @param slug - The page slug (e.g., 'targeted-resume')
 * @returns Array of breadcrumb items
 */
export function getBreadcrumbs(slug: string): BreadcrumbItem[] {
    return BREADCRUMBS[slug] || [];
}
