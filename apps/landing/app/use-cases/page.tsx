import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { IntroSection } from "@/components/IntroSection";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resume Solutions for Every Career Stage | ProfResume',
  description: 'Whether you are a student, professional, executive, or career changer, ProfResume provides ATS-optimized templates and AI tools to help you succeed.',
  alternates: {
    canonical: '/use-cases',
  },
  openGraph: {
    title: 'ProfResume Use Cases - Specialized Career Solutions',
    description: 'Discover how ProfResume helps job seekers at all levels land their dream jobs with specialized features and templates.',
    url: '/use-cases',
    type: 'website',
  },
};

export default function UseCasesPage() {
  const cases = [
    {
      icon: "🎓",
      title: "Students & Recent Graduates",
      desc: "Create your first professional resume with templates designed for entry-level positions and internships.",
      bullets: [
        "Student-friendly templates",
        "Highlight education and projects",
        "Internship-focused layouts",
        "Free tier perfect for students"
      ],
      cta: "Start Your Resume",
      featured: false
    },
    {
      icon: "💼",
      title: "Working Professionals",
      desc: "Showcase your experience and skills with ATS-optimized templates that get past recruiters' systems.",
      bullets: [
        "ATS-friendly formats",
        "Professional templates",
        "Easy experience tracking",
        "Multiple resume versions"
      ],
      cta: "Create Resume",
      featured: true
    },
    {
      icon: "🔄",
      title: "Career Changers",
      desc: "Pivot to a new industry with resumes that highlight transferable skills and relevant experience.",
      bullets: [
        "Skills-based templates",
        "Transferable skills focus",
        "Industry-specific examples",
        "Career transition guides"
      ],
      cta: "Get Started",
      featured: false
    },
    {
      icon: "👔",
      title: "Executives & Leaders",
      desc: "Executive-level resumes that showcase leadership, achievements, and strategic impact.",
      bullets: [
        "Executive templates",
        "Achievement-focused layouts",
        "Leadership highlights",
        "Premium support"
      ],
      cta: "Build Executive Resume",
      featured: false
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <IntroSection
        sectionClassName="text-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-8 pb-16"
        title="Resume Builder for Everyone"
        description="Whether you're a student, professional, or executive, ProfResume has the perfect solution for your career goals."
      />

      {/* Use Cases Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {cases.map((item, i) => (
              <div
                key={i}
                className={`bg-white border-2 rounded-[2.5rem] p-10 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full ${item.featured ? 'border-blue-500 shadow-xl shadow-blue-100' : 'border-gray-200 hover:border-blue-500'
                  }`}
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  {item.desc}
                </p>
                <ul className="space-y-3 text-sm text-gray-700 mb-8">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>✓ {bullet}</li>
                  ))}
                </ul>
                <Link
                  href={ENV.EDITOR_URL}
                  className={`inline-block px-7 py-4 rounded-xl font-bold text-center transition ${item.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-2 border-gray-200 text-gray-900 hover:border-blue-500'
                    }`}
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center py-24 px-6 mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Join thousands of job seekers who've landed their dream jobs with ProfResume
          </p>
          <Link
            href={ENV.EDITOR_URL}
            className="inline-block bg-white text-blue-600 font-bold text-lg px-10 py-5 rounded-xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
          >
            Start Building Free →
          </Link>
        </div>
      </section>
    </main>
  );
}
