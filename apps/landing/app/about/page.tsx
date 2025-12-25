import { Navigation } from "@/components/Navigation";
import { Sparkles, Users, Target, Award, Heart, Zap } from "lucide-react";


export default function AboutPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <Sparkles size={16} />
                            About Us
                        </div>
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                            We're on a Mission to Help You
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Land Your Dream Job</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Building the world's most powerful resume builder to help millions of job seekers create professional resumes in minutes.
                        </p>
                    </div>
                </section>

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
                                    <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
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
                                { name: "Sarah Johnson", role: "CEO & Founder", image: "👩‍💼" },
                                { name: "Michael Chen", role: "CTO", image: "👨‍💻" },
                                { name: "Emily Davis", role: "Head of Design", image: "👩‍🎨" },
                                { name: "David Kim", role: "Lead Developer", image: "👨‍🔧" },
                            ].map((member, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-6xl mb-4">{member.image}</div>
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
        </>
    );
}
