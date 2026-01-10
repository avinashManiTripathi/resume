/**
 * ArticleSchema and FAQSchema configurations for resource pages
 * Centralized data for easier maintenance
 */

import { ENV } from "@/app/env";

const baseUrl = ENV.BASE_URL;

export const ARTICLE_SCHEMAS = {
    'targeted-resume': {
        title: 'Targeted Resume Guide 2026 - Tailor Your Resume for Every Job',
        description: 'Master the art of creating targeted resumes that beat ATS systems and impress recruiters. Proven strategies to increase interview callbacks by 300%.',
        url: `${baseUrl}/resources/targeted-resume`
    },
    'resume-checker': {
        title: 'Free Resume Checker - Instant ATS & Quality Analysis',
        description: 'Get instant feedback on your resume with our professional resume checker. ATS compatibility, formatting, content quality, and improvement suggestions.',
        url: `${baseUrl}/resources/resume-checker`
    },
    'resume-critique': {
        title: 'Professional Resume Critique Service - Expert Review',
        description: 'Get detailed resume critique from industry experts. Comprehensive analysis of formatting, content, keywords, and ATS optimization.',
        url: `${baseUrl}/resources/resume-critique`
    },
    'resume-fixer': {
        title: 'Resume Fixer - Fix Common Resume Mistakes Instantly',
        description: 'Identify and fix common resume mistakes automatically. Improve formatting, fix typos, optimize keywords, and boost ATS compatibility.',
        url: `${baseUrl}/resources/resume-fixer`
    },
    'resume-scanner': {
        title: 'Free ATS Resume Scanner - Test Your Resume Score',
        description: 'Scan your resume like an ATS would. Get instant compatibility score, keyword analysis, and detailed optimization recommendations.',
        url: `${baseUrl}/resources/resume-scanner`
    },
    'ai-resume-review': {
        title: 'AI Resume Review - Instant Professional Feedback',
        description: 'Get AI-powered resume review with actionable suggestions. Instant analysis of content, keywords, formatting, and ATS optimization.',
        url: `${baseUrl}/resources/ai-resume-review`
    },
    'resume-booster': {
        title: 'Resume Booster - Amplify Your Resume Impact',
        description: 'Boost your resume effectiveness with proven strategies. Enhance achievements, optimize keywords, and stand out to recruiters.',
        url: `${baseUrl}/resources/resume-booster`
    },
    'for-organizations': {
        title: 'Resume Tools for Organizations - Enterprise Solutions',
        description: 'Professional resume tools for universities, career centers, and HR departments. Bulk licensing, white-label options, and dedicated support.',
        url: `${baseUrl}/resources/for-organizations`
    },
    'resume-keyword-generator': {
        title: 'Resume Keyword Generator - ATS Optimization Tool',
        description: 'Generate optimized keywords for your resume based on job descriptions. Improve ATS compatibility and recruiter visibility.',
        url: `${baseUrl}/resources/resume-keyword-generator`
    },
    'update-your-resume-io-resume': {
        title: 'Update Your Resume.io Resume - Migration Guide',
        description: 'Comprehensive guide to updating and migrating your Resume.io resume. Tips, best practices, and professional alternatives.',
        url: `${baseUrl}/resources/update-your-resume-io-resume`
    },
    'ats-guide': {
        title: 'Complete ATS Guide - Beat Applicant Tracking Systems',
        description: 'Master ATS optimization with our complete guide. Learn how ATS works, formatting best practices, and keyword strategies.',
        url: `${baseUrl}/resources/ats-guide`
    },
    'career-tips': {
        title: 'Career Tips & Job Search Strategies',
        description: 'Expert career tips and job search strategies. Interview prep, networking, salary negotiation, and career development advice.',
        url: `${baseUrl}/resources/career-tips`
    },
    'cover-letter-guide': {
        title: 'Cover Letter Writing Guide - Templates & Examples',
        description: 'Learn how to write compelling cover letters that get noticed. Templates, examples, and proven strategies for success.',
        url: `${baseUrl}/resources/cover-letter-guide`
    },
    'industry-examples': {
        title: 'Resume Examples by Industry - Professional Templates',
        description: 'Browse industry-specific resume examples and templates. Tailored formats for tech, healthcare, finance, and more.',
        url: `${baseUrl}/resources/industry-examples`
    },
    'resume-guide': {
        title: 'Complete Resume Writing Guide 2026',
        description: 'Comprehensive resume writing guide covering formatting, content, ATS optimization, and modern best practices.',
        url: `${baseUrl}/resources/resume-guide`
    }
};
