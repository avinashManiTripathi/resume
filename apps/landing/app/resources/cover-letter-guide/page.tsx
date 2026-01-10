import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { Mail, CheckCircle, FileText, Lightbulb, Target, Award } from "lucide-react";
import Link from "next/link";
import { ENV } from "@/app/env";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cover Letter Writing Guide 2026 - Templates & Examples | ProfResume',
    description: 'Learn how to write compelling cover letters that get noticed. Templates, examples, and proven strategies for success in every job application.',
    alternates: {
        canonical: '/resources/cover-letter-guide',
    },
    openGraph: {
        title: 'Cover Letter Writing Guide - Templates & Examples',
        description: 'Learn how to write compelling cover letters that get noticed with our comprehensive guide.',
        url: '/resources/cover-letter-guide',
    },
};

export default function CoverLetterGuidePage() {
    const faqs = [
        { question: "Do I always need a cover letter?", answer: "While not always required, including a tailored cover letter increases your chances by 40%. Always include one unless explicitly stated not to." },
        { question: "How long should a cover letter be?", answer: "One page maximum, typically 3-4 paragraphs (250-400 words). Be concise and impactful." },
        { question: "Should I repeat my resume?", answer: "No, complement your resume by explaining context, motivations, and personality. Tell the story behind your achievements." },
        { question: "How do I address unknown hiring managers?", answer: "Try to find the name via LinkedIn or company website. If impossible, use 'Dear Hiring Manager' or 'Dear [Department] Team'." },
        { question: "Can I use the same cover letter for multiple jobs?", answer: "Never. Each letter should be customized for the specific role and company. Generic letters are immediately obvious to recruiters." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <ArticleSchema
                title="Cover Letter Writing Guide - Templates & Examples"
                description="Learn how to write compelling cover letters that get noticed. Templates, examples, and proven strategies for success."
                url={`${ENV.BASE_URL}/resources/cover-letter-guide`}
            />
            <FAQSchema faqs={faqs} />


            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                        <Mail className="w-4 h-4" />
                        Cover Letter Guide
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        How to Write a Winning Cover Letter
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Master the art of writing compelling cover letters that complement your resume and get you noticed by hiring managers.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* What is a Cover Letter */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">What is a Cover Letter?</h2>
                        </div>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 leading-relaxed mb-4">
                                A cover letter is a one-page document that accompanies your resume when applying for a job. It provides an opportunity to introduce yourself, explain your interest in the position, and highlight your most relevant qualifications.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                While your resume lists your skills and experience, your cover letter tells your story and shows your personality, making a compelling case for why you're the perfect fit for the role.
                            </p>
                        </div>
                    </div>

                    {/* Structure */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Cover Letter Structure</h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "1. Header",
                                    content: "Include your contact information, date, and the employer's contact information at the top of the letter."
                                },
                                {
                                    title: "2. Salutation",
                                    content: "Address the hiring manager by name if possible. Use 'Dear Hiring Manager' if you can't find a specific name."
                                },
                                {
                                    title: "3. Opening Paragraph",
                                    content: "State the position you're applying for and briefly explain why you're interested. Grab their attention with a strong opening."
                                },
                                {
                                    title: "4. Body Paragraphs (1-2)",
                                    content: "Highlight your most relevant skills, experiences, and achievements. Explain how you can add value to the company."
                                },
                                {
                                    title: "5. Closing Paragraph",
                                    content: "Reiterate your interest, thank them for their consideration, and include a call to action (e.g., requesting an interview)."
                                },
                                {
                                    title: "6. Sign-off",
                                    content: "Use a professional closing like 'Sincerely' or 'Best regards,' followed by your name."
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Writing Tips */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Writing Tips</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Be Specific", description: "Tailor each cover letter to the specific job and company" },
                                { title: "Show Enthusiasm", description: "Demonstrate genuine interest in the role and organization" },
                                { title: "Use Keywords", description: "Include relevant keywords from the job description" },
                                { title: "Keep it Concise", description: "Limit your cover letter to one page (3-4 paragraphs)" },
                                { title: "Proofread Carefully", description: "Check for typos, grammar errors, and formatting issues" },
                                { title: "Use Active Voice", description: "Write in active voice to sound more confident and direct" }
                            ].map((tip, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                                    <p className="text-gray-600">{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Mistakes */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Using a generic template without customization",
                                "Repeating your resume word-for-word",
                                "Making it all about you instead of the employer's needs",
                                "Being too formal or too casual",
                                "Forgetting to include a call to action",
                                "Exceeding one page in length",
                                "Not addressing the hiring manager by name",
                                "Including salary requirements unless specifically requested"
                            ].map((mistake, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-sm font-bold">✕</span>
                                    </div>
                                    <p className="text-gray-700">{mistake}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-6">
                        Ready to Create Your Resume?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Build a professional resume that pairs perfectly with your cover letter.
                    </p>
                    <Link
                        href={`${ENV.EDITOR_URL}/editor`}
                        className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                    >
                        <Award className="w-5 h-5" />
                        Create Resume Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
