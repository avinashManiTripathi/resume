import { Palette, Zap, Layout, Sparkles, Download, Eye, Edit3, Share2 } from "lucide-react";
import { Navigation } from "../components/Navigation";

const editors = [
    {
        name: "Classic Editor",
        description: "Traditional resume builder with drag-and-drop functionality",
        icon: <Edit3 size={48} />,
        features: [
            "Drag-and-drop sections",
            "Real-time preview",
            "Auto-save",
            "Multiple templates"
        ],
        image: "📝",
        color: "blue"
    },
    {
        name: "AI-Powered Editor",
        description: "Smart suggestions and content optimization powered by AI",
        icon: <Sparkles size={48} />,
        features: [
            "AI content suggestions",
            "Grammar checking",
            "Keyword optimization",
            "ATS scoring"
        ],
        image: "🤖",
        color: "purple"
    },
    {
        name: "Visual Editor",
        description: "Design-focused editor with advanced customization options",
        icon: <Palette size={48} />,
        features: [
            "Custom colors & fonts",
            "Advanced layouts",
            "Visual spacing controls",
            "Brand customization"
        ],
        image: "🎨",
        color: "pink"
    },
    {
        name: "Quick Editor",
        description: "Fast and simple editor for creating resumes in minutes",
        icon: <Zap size={48} />,
        features: [
            "Pre-filled templates",
            "One-click formatting",
            "Quick export",
            "Mobile-friendly"
        ],
        image: "⚡",
        color: "yellow"
    }
];

const features = [
    {
        icon: <Layout size={32} />,
        title: "50+ Professional Templates",
        description: "Choose from a wide variety of ATS-friendly templates designed by experts."
    },
    {
        icon: <Eye size={32} />,
        title: "Real-Time Preview",
        description: "See your changes instantly as you edit your resume."
    },
    {
        icon: <Download size={32} />,
        title: "Multiple Export Formats",
        description: "Download your resume as PDF or Word document."
    },
    {
        icon: <Share2 size={32} />,
        title: "Easy Sharing",
        description: "Generate shareable links or download to share with employers."
    }
];

export default function EditorsPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <Sparkles size={16} />
                            Powerful Resume Editors
                        </div>
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
                            Choose Your Perfect
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Resume Editor</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From classic drag-and-drop to AI-powered suggestions, we have the right editor for every job seeker.
                        </p>
                    </div>
                </section>

                {/* Editors Grid */}
                <section className="pb-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                        {editors.map((editor, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                            >
                                {/* Icon & Emoji */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`text-${editor.color}-600 group-hover:scale-110 transition-transform`}>
                                        {editor.icon}
                                    </div>
                                    <div className="text-6xl">{editor.image}</div>
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                    {editor.name}
                                </h3>
                                <p className="text-gray-600 mb-6 text-lg">
                                    {editor.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {editor.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full bg-${editor.color}-500`} />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-${editor.color}-600 to-purple-600 text-white hover:shadow-xl`}>
                                    Try {editor.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Powerful Features in Every Editor
                            </h2>
                            <p className="text-xl text-gray-600">
                                All our editors come packed with features to help you succeed
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                            Compare Editors
                        </h2>
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-bold">Feature</th>
                                        <th className="text-center py-4 px-4 font-bold">Classic</th>
                                        <th className="text-center py-4 px-4 font-bold">AI-Powered</th>
                                        <th className="text-center py-4 px-4 font-bold">Visual</th>
                                        <th className="text-center py-4 px-4 font-bold">Quick</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Drag & Drop", "✓", "✓", "✓", "✗"],
                                        ["AI Suggestions", "✗", "✓", "✗", "✗"],
                                        ["Custom Design", "Limited", "Limited", "Full", "Limited"],
                                        ["Speed", "Medium", "Medium", "Slow", "Fast"],
                                        ["Best For", "Beginners", "Professionals", "Designers", "Quick Jobs"],
                                    ].map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6 font-semibold text-gray-900">{row[0]}</td>
                                            <td className="py-4 px-4 text-center text-gray-600">{row[1]}</td>
                                            <td className="py-4 px-4 text-center text-gray-600">{row[2]}</td>
                                            <td className="py-4 px-4 text-center text-gray-600">{row[3]}</td>
                                            <td className="py-4 px-4 text-center text-gray-600">{row[4]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
                            How It Works
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { step: "1", title: "Choose Editor", desc: "Select the editor that fits your needs" },
                                { step: "2", title: "Pick Template", desc: "Choose from 50+ professional templates" },
                                { step: "3", title: "Fill Details", desc: "Add your information with guided prompts" },
                                { step: "4", title: "Download", desc: "Export as PDF or Word document" },
                            ].map((item, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-5xl font-bold mb-6">
                            Ready to Build Your Perfect Resume?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Start with any editor and switch anytime. All your data syncs automatically.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105">
                                Start Building Now
                            </button>
                            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                                View Templates
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
