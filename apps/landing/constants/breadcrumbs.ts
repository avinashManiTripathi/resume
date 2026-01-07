/**
 * Breadcrumb configurations for all pages
 * Each breadcrumb follows the pattern: Home > Parent > Current Page
 */

interface BreadcrumbItem {
    name: string;
    url: string;
}

export const BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
    // Resource Pages
    'targeted-resume': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Targeted Resume", url: "https://profresume.com/resources/targeted-resume" }
    ],
    'resume-checker': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Checker", url: "https://profresume.com/resources/resume-checker" }
    ],
    'resume-critique': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Critique", url: "https://profresume.com/resources/resume-critique" }
    ],
    'resume-fixer': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Fixer", url: "https://profresume.com/resources/resume-fixer" }
    ],
    'resume-scanner': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Scanner", url: "https://profresume.com/resources/resume-scanner" }
    ],
    'ai-resume-review': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "AI Resume Review", url: "https://profresume.com/resources/ai-resume-review" }
    ],
    'resume-booster': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Booster", url: "https://profresume.com/resources/resume-booster" }
    ],
    'for-organizations': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "For Organizations", url: "https://profresume.com/resources/for-organizations" }
    ],
    'resume-keyword-generator': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Keyword Generator", url: "https://profresume.com/resources/resume-keyword-generator" }
    ],
    'update-your-resume-io-resume': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Update Resume.io Resume", url: "https://profresume.com/resources/update-your-resume-io-resume" }
    ],
    'ats-guide': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "ATS Guide", url: "https://profresume.com/resources/ats-guide" }
    ],
    'career-tips': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Career Tips", url: "https://profresume.com/resources/career-tips" }
    ],
    'cover-letter-guide': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Cover Letter Guide", url: "https://profresume.com/resources/cover-letter-guide" }
    ],
    'industry-examples': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Industry Examples", url: "https://profresume.com/resources/industry-examples" }
    ],
    'resume-guide': [
        { name: "Home", url: "https://profresume.com" },
        { name: "Resources", url: "https://profresume.com/resources" },
        { name: "Resume Guide", url: "https://profresume.com/resources/resume-guide" }
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
