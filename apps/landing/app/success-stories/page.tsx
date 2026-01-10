"use client";

import { IntroSection } from "@/components/IntroSection";

export default function SuccessStoriesPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <IntroSection
                sectionClassName="text-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-8 pb-16"
                title="Success Stories"
                description="Real people, real results. See how ProfResume helped transform careers."
            />



            {/* Stories */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto space-y-8">
                    {[
                        {
                            name: "Sarah Chen",
                            from: "Junior Developer",
                            to: "Senior Engineer at Google",
                            salary: "+$60k",
                            time: "2 weeks",
                            story:
                                "After struggling to get interviews for months, I rebuilt my resume with ProfResume. The ATS optimization made all the difference - I went from 0 responses to 12 interviews in just 2 weeks. Now I'm at my dream company!",
                        },
                        {
                            name: "Michael Rodriguez",
                            from: "Sales Associate",
                            to: "Account Executive",
                            salary: "+$45k",
                            time: "3 weeks",
                            story:
                                "I was stuck in retail for 5 years. ProfResume helped me highlight my transferable skills and pivot into B2B sales. The career change templates were perfect for my situation.",
                        },
                        {
                            name: "Emily Watson",
                            from: "Recent Graduate",
                            to: "Marketing Manager",
                            salary: "$75k",
                            time: "1 month",
                            story:
                                "As a new grad with limited experience, I didn't know how to make my resume stand out. ProfResume's student templates helped me showcase my projects and internships effectively. Landed my first job at a Fortune 500 company!",
                        },
                    ].map((story, i) => (
                        <div
                            key={i}
                            className="bg-white border-2 border-gray-200 rounded-3xl p-10"
                        >
                            {/* Header */}
                            <div className="flex gap-6 items-center mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                                    {story.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {story.name}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <span className="text-gray-500">{story.from}</span>
                                        <span className="text-blue-500 font-bold">→</span>
                                        <span className="text-gray-900 font-semibold">
                                            {story.to}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Story */}
                            <p className="text-gray-700 text-lg leading-relaxed italic mb-10">
                                “{story.story}”
                            </p>

                            {/* Stats */}
                            <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-gray-200">
                                <div>
                                    <div className="text-3xl font-extrabold text-blue-500">
                                        {story.salary}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Salary Increase
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-extrabold text-blue-500">
                                        {story.time}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Time to Offer
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-center py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Ready to Write Your Success Story?
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 mb-10">
                        Join thousands who've transformed their careers with ProfResume
                    </p>
                    <a
                        href="https://edit.profresume.com/editor"
                        className="inline-block bg-white text-blue-600 font-semibold text-lg px-10 py-5 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all"
                    >
                        Start Your Journey →
                    </a>
                </div>
            </section>
        </main>
    );
}
