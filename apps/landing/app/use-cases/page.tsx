"use client";

import { IntroSection } from "@/components/IntroSection";

export default function UseCasesPage() {
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
            {/* Students */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-500">
              <div className="text-5xl mb-6">🎓</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Students & Recent Graduates
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Create your first professional resume with templates designed for entry-level
                positions and internships.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-8">
                <li>✓ Student-friendly templates</li>
                <li>✓ Highlight education and projects</li>
                <li>✓ Internship-focused layouts</li>
                <li>✓ Free tier perfect for students</li>
              </ul>
              <a
                href="https://edit.profresume.com/editor"
                className="inline-block px-7 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-900 hover:-translate-y-0.5 transition"
              >
                Start Your Resume
              </a>
            </div>

            {/* Professionals (Featured) */}
            <div className="bg-white border-2 border-blue-500 rounded-3xl p-10 shadow-lg shadow-blue-100 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-5xl mb-6">💼</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Working Professionals
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Showcase your experience and skills with ATS-optimized templates that get past
                recruiters' systems.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-8">
                <li>✓ ATS-friendly formats</li>
                <li>✓ Professional templates</li>
                <li>✓ Easy experience tracking</li>
                <li>✓ Multiple resume versions</li>
              </ul>
              <a
                href="https://edit.profresume.com/editor"
                className="inline-block px-7 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
              >
                Create Resume
              </a>
            </div>

            {/* Career Changers */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-500">
              <div className="text-5xl mb-6">🔄</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Career Changers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pivot to a new industry with resumes that highlight transferable skills and
                relevant experience.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-8">
                <li>✓ Skills-based templates</li>
                <li>✓ Transferable skills focus</li>
                <li>✓ Industry-specific examples</li>
                <li>✓ Career transition guides</li>
              </ul>
              <a
                href="https://edit.profresume.com/editor"
                className="inline-block px-7 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-900 hover:-translate-y-0.5 transition"
              >
                Get Started
              </a>
            </div>

            {/* Executives */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-500">
              <div className="text-5xl mb-6">👔</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Executives & Leaders
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Executive-level resumes that showcase leadership, achievements, and strategic
                impact.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-8">
                <li>✓ Executive templates</li>
                <li>✓ Achievement-focused layouts</li>
                <li>✓ Leadership highlights</li>
                <li>✓ Premium support</li>
              </ul>
              <a
                href="https://edit.profresume.com/editor"
                className="inline-block px-7 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-900 hover:-translate-y-0.5 transition"
              >
                Build Executive Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-center py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Join thousands of job seekers who've landed their dream jobs with ProfResume
          </p>
          <a
            href="https://edit.profresume.com/editor"
            className="inline-block bg-white text-blue-600 font-semibold text-lg px-10 py-5 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            Start Building Free →
          </a>
        </div>
      </section>
    </main>
  );
}
