import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Integrations - Connect Your Job Search Cloud | ProfResume',
    description: 'Sync your resume with LinkedIn, Google Drive, and more. Our upcoming integrations will streamline your application process across all platforms.',
    alternates: {
        canonical: '/integrations',
    },
    openGraph: {
        title: 'ProfResume Integrations',
        description: 'Connect with your favorite platforms soon.',
        url: '/integrations',
        type: 'website',
    },
};

export default function IntegrationsPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-black text-gray-900 mb-6">Integrations</h1>
                    <p className="text-xl text-gray-600">Connect ProfResume with your favorite platforms (Coming Soon)</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "💼",
                                title: "LinkedIn",
                                description: "Import your LinkedIn profile data automatically"
                            },
                            {
                                icon: "📧",
                                title: "Email",
                                description: "Send resumes directly to employers"
                            },
                            {
                                icon: "☁️",
                                title: "Cloud Storage",
                                description: "Save to Google Drive, Dropbox, and more"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl border-2 border-gray-100 text-center opacity-60 shadow-sm transition-all hover:shadow-md">
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 mb-4">{item.description}</p>
                                <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold">
                                    Coming Soon
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
