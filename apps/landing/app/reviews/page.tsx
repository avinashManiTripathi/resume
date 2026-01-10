import { Metadata } from 'next';
import { ENV } from "@/app/env";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'User Reviews - What Professionals Say About ProfResume',
    description: 'Read reviews from over 50,000 professionals who trust ProfResume to build their careers. See why we are rated 4.9/5 stars.',
    alternates: {
        canonical: '/reviews',
    },
    openGraph: {
        title: 'ProfResume Reviews - Trusted by 50,000+ Professionals',
        description: 'See why professionals across all industries trust ProfResume for their job search. Real stories, real results.',
        url: '/reviews',
        type: 'website',
    },
};

export default function ReviewsPage() {
    const reviews = [
        { name: "Sarah Chen", role: "Software Engineer", text: "Got 3 interviews in the first week! The templates are clean and professional.", rating: 5 },
        { name: "Michael Johnson", role: "Product Manager", text: "Finally landed my dream job! This tool made my resume stand out from hundreds of applicants.", rating: 5 },
        { name: "Emily Rodriguez", role: "UX Designer", text: "As a designer, I'm picky. These templates are actually good. Clean, modern, and effective.", rating: 5 },
        { name: "Prateek Singh", role: "Marketing Manager", text: "The ATS optimization really works. I started getting more callbacks immediately.", rating: 5 },
        { name: "Jessica Taylor", role: "Data Analyst", text: "Super easy to use. Created my resume in under 15 minutes and it looks amazing.", rating: 5 },
        { name: "Alex Martinez", role: "Sales Director", text: "Best resume builder I've used. The pro features are worth every penny.", rating: 5 },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">What Our Users Say</h1>
                    <p className="text-xl text-gray-600 mb-8">Join 50,000+ professionals who trust ProfResume</p>
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-yellow-400 text-3xl">★★★★★</div>
                        <div className="text-gray-500 font-medium text-lg">4.9 out of 5 based on 12,453 reviews</div>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {reviews.map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all">
                                <div className="text-yellow-400 text-xl mb-4">{"★".repeat(review.rating)}</div>
                                <p className="text-gray-900 text-lg leading-relaxed italic mb-8">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                                        {review.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{review.name}</div>
                                        <div className="text-sm text-gray-500">{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] p-16 text-center text-white shadow-2xl">
                        <h2 className="text-4xl font-extrabold mb-4">Ready to Join Them?</h2>
                        <p className="text-xl opacity-90 mb-10">Start creating your professional resume today</p>
                        <Link
                            href={ENV.EDITOR_URL}
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Create Your Resume Free →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
