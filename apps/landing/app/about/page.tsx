import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Sparkles, Users, Target, Award, Heart, Zap } from "lucide-react";
import Image from "next/image";
import { IntroSection } from "@/components/IntroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About Us | Hirecta - Our Mission & Team',
    description: 'Learn about the mission behind Hirecta, the AI-powered resume builder. Meet our team of designers, developers, and career experts dedicated to your success.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Us | Hirecta',
        description: 'Building the world\'s most powerful resume builder to help millions of job seekers.',
        url: '/about',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <IntroSection
                badgeIcon={<Sparkles />}
                label={"About Us"}
                title={"We're on a Mission to Help You"}
                description={"Building the world's most powerful resume builder to help millions of job seekers create professional resumes in minutes."}
                highlightText={"Land Your Dream Job"}
            />

            {/* Stats Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { number: "1M+", label: "Resumes Created" },
                            { number: "500K+", label: "Happy Users" },
                            { number: "95%", label: "Success Rate" },
                            { number: "50+", label: "Templates" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-5xl text-gray-900 font-extrabold mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
                    <div className="prose prose-lg mx-auto text-gray-600">
                        <p className="text-lg leading-relaxed mb-4">
                            We started with a simple idea: creating a resume shouldn't be complicated or expensive.
                            After seeing countless talented individuals struggle with outdated resume builders and
                            expensive design tools, we knew there had to be a better way.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                            In 2024, we launched our platform with a mission to democratize professional resume creation.
                            Today, we're proud to help over 500,000 job seekers worldwide create resumes that get results.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our team of designers, developers, and career experts work tirelessly to ensure every feature
                            we build helps you stand out in your job search.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users size={32} />,
                                title: "User-First",
                                description: "Every decision we make starts with our users. Your success is our success."
                            },
                            {
                                icon: <Target size={32} />,
                                title: "Innovation",
                                description: "We constantly push boundaries to bring you the latest in resume technology."
                            },
                            {
                                icon: <Award size={32} />,
                                title: "Excellence",
                                description: "We're committed to delivering the highest quality product and support."
                            },
                            {
                                icon: <Heart size={32} />,
                                title: "Accessibility",
                                description: "Professional resume creation should be available to everyone, everywhere."
                            },
                            {
                                icon: <Zap size={32} />,
                                title: "Speed",
                                description: "We value your time. Create a professional resume in minutes, not hours."
                            },
                            {
                                icon: <Sparkles size={32} />,
                                title: "Quality",
                                description: "Beautiful, ATS-friendly templates designed by professionals."
                            },
                        ].map((value, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="text-blue-600 mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        A passionate group of designers, developers, and career experts dedicated to your success.
                    </p>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: "Avinash Mani Tripathi", role: "CEO & Founder", image: "https://storage.googleapis.com/definable-beta-public/photo_studio/5df49dfc-eee0-462b-b70e-3f5e93719597/1766398354_2798b31d_0.png" },
                            { name: "Saurabh Mani Tripathi", role: "CTO", image: "https://media.licdn.com/dms/image/v2/D5603AQGij0Uxmve3NQ/profile-displayphoto-crop_800_800/B56Zhzf3iCG4AQ-/0/1754284397400?e=1768435200&v=beta&t=yB_zkS8I5x35N3GJqL2ZGm1nIad965ouK0qV6d2Po1o" },
                            { name: "Devender Mani Tripathi", role: "Vice President", image: "https://media.licdn.com/dms/image/v2/C4D03AQEaP1KdUYW8SQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1633620066670?e=1768435200&v=beta&t=cEPRNM2zfMoi81cz653PCiRoc6sST7Q5CZADx20WBdE" },
                            { name: "Prateek Singh", role: "Head of Design", image: "https://storage.googleapis.com/definable-beta-public/photo_studio/5df49dfc-eee0-462b-b70e-3f5e93719597/1766399854_3b6229c8_0.png" },
                            { name: "Shubham Shukla", role: "Advisory Board Member", image: "https://res.cloudinary.com/diiwanjlg/image/upload/v1766997125/1560776005723_j2wm0z.jpg" },
                            { name: "Rajat Shukla", role: "Advisory Board Member", image: "https://res.cloudinary.com/diiwanjlg/image/upload/v1766996315/image_orvsj5.webp" }
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                <Image src={member.image} alt={member.name} width={100} height={100} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" ></Image>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-gray-600 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to Create Your Perfect Resume?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join over 500,000 job seekers who trust us with their career success.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Get Started Free
                    </button>
                </div>
            </section>
        </div>
    );
}
