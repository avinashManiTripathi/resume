"use client";


import { useState } from "react";


export default function TemplatesPage() {
    const [selectedFilter, setSelectedFilter] = useState("All");

    const templates = [
        {
            id: 1,
            name: "Modern Professional",
            category: ["ATS-Friendly", "Professional"],
            description: "Clean, minimalist design perfect for tech and corporate roles",
            popular: true,
            image: "modern",
        },
        {
            id: 2,
            name: "Classic Professional",
            category: ["ATS-Friendly", "Professional"],
            description: "Traditional format ideal for conservative industries",
            popular: false,
            image: "classic",
        },
        {
            id: 3,
            name: "Creative Professional",
            category: ["Creative", "Professional"],
            description: "Two-column layout for designers and creative roles",
            popular: false,
            image: "creative",
        },
        {
            id: 4,
            name: "Executive Professional",
            category: ["Professional", "Executive"],
            description: "Premium design for senior leadership positions",
            popular: false,
            image: "executive",
        },
        {
            id: 5,
            name: "Student & Entry-Level",
            category: ["ATS-Friendly", "Student"],
            description: "Perfect for students and recent graduates",
            popular: false,
            image: "student",
        },
        {
            id: 6,
            name: "Technical Professional",
            category: ["ATS-Friendly", "Professional"],
            description: "Optimized for developers and technical roles",
            popular: false,
            image: "technical",
        },
    ];

    const filters = ["All", "ATS-Friendly", "Professional", "Creative", "Student", "Executive"];

    const filteredTemplates = selectedFilter === "All"
        ? templates
        : templates.filter(t => t.category.includes(selectedFilter));

    return (
        <main className="page">

            <section className="hero-simple">
                <div className="container">
                    <h1>Professional Resume Templates</h1>
                    <p className="lead">ATS-friendly templates designed to get you past applicant tracking systems and impress recruiters.</p>
                </div>
            </section>

            {/* Filter Buttons */}
            <section className="filters">
                <div className="container">
                    <div className="filter-buttons">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                                onClick={() => setSelectedFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="templates">
                <div className="container">
                    <div className="template-grid">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="template-card">
                                {template.popular && <div className="template-badge">Most Popular</div>}

                                {/* Template Image with Hover Overlay */}
                                <div className="template-image-wrapper">
                                    <div className={`template-image template-${template.image}`}>
                                        {/* Simulated resume preview */}
                                        <div className="resume-preview">
                                            <div className="preview-header">
                                                <div className="preview-name">Your Name</div>
                                                <div className="preview-title">Your Title</div>
                                                <div className="preview-contact">email@example.com | (123) 456-7890</div>
                                            </div>
                                            <div className="preview-section">
                                                <div className="section-title">EXPERIENCE</div>
                                                <div className="section-content">
                                                    <div className="content-line"></div>
                                                    <div className="content-line"></div>
                                                    <div className="content-line short"></div>
                                                </div>
                                            </div>
                                            <div className="preview-section">
                                                <div className="section-title">EDUCATION</div>
                                                <div className="section-content">
                                                    <div className="content-line"></div>
                                                    <div className="content-line short"></div>
                                                </div>
                                            </div>
                                            <div className="preview-section">
                                                <div className="section-title">SKILLS</div>
                                                <div className="section-content">
                                                    <div className="content-line short"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="template-overlay">
                                        <a href={`/editor?template=${template.image}`} className="use-template-btn">
                                            Use This Template →
                                        </a>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="template-info">
                                    <h3>{template.name}</h3>
                                    <p>{template.description}</p>
                                    <div className="template-tags">
                                        {template.category.map((cat) => (
                                            <span key={cat} className="tag">{cat}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="no-results">
                            <p>No templates found for this category.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <h2>All Templates Include</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🤖</div>
                            <h3>ATS-Optimized</h3>
                            <p>Formatted to pass applicant tracking systems</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📱</div>
                            <h3>Mobile-Friendly</h3>
                            <p>Edit on any device, anywhere</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🎨</div>
                            <h3>Customizable</h3>
                            <p>Adjust colors, fonts, and layout</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📄</div>
                            <h3>Multiple Formats</h3>
                            <p>Download as PDF or DOCX</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Create Your Professional Resume?</h2>
                    <p>Choose a template and start building in minutes</p>
                    <a href="/editor" className="cta-button">Start Building Free →</a>
                </div>
            </section>

            <style jsx>{`
        .page { background: #FAFAFA; min-height: 100vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        
        /* Hero */
        .hero-simple { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); text-align: center; }
        .hero-simple h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; }
        .lead { font-size: 1.25rem; color: #6B7280; max-width: 700px; margin: 0 auto; }
        
        /* Filters */
        .filters { padding: 2rem; background: white; border-bottom: 1px solid #E5E7EB; }
        .filter-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .filter-btn { padding: 0.75rem 1.5rem; border: 2px solid #E5E7EB; background: white; color: #6B7280; border-radius: 2rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .filter-btn:hover { border-color: #3B82F6; color: #3B82F6; }
        .filter-btn.active { background: #3B82F6; color: white; border-color: #3B82F6; }
        
        /* Templates Grid */
        .templates { padding: 4rem 2rem; }
        .template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; }
        
        /* Template Card */
        .template-card { background: white; border-radius: 1.5rem; overflow: hidden; border: 2px solid #E5E7EB; transition: all 0.3s; position: relative; }
        .template-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); border-color: #3B82F6; }
        
        .template-badge { position: absolute; top: 1rem; right: 1rem; background: #3B82F6; color: white; padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.875rem; font-weight: 600; z-index: 10; }
        
        /* Template Image Wrapper */
        .template-image-wrapper { position: relative; height: 400px; overflow: hidden; }
        .template-image { height: 100%; background: #F9FAFB; padding: 2rem; display: flex; align-items: center; justify-content: center; }
        
        /* Resume Preview */
        .resume-preview { width: 100%; height: 100%; background: white; border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; }
        .preview-header { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #E5E7EB; }
        .preview-name { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem; }
        .preview-title { font-size: 0.875rem; color: #6B7280; }
        .preview-contact { font-size: 0.75rem; color: #9CA3AF; margin-top: 0.25rem; }
        
        .preview-section { margin-bottom: 1.25rem; }
        .section-title { font-size: 0.75rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
        .section-content { padding-left: 0.5rem; }
        .content-line { height: 6px; background: #E5E7EB; border-radius: 3px; margin-bottom: 0.4rem; }
        .content-line.short { width: 60%; }
        
        /* Hover Overlay */
        .template-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(59, 130, 246, 0.95); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .template-card:hover .template-overlay { opacity: 1; }
        .use-template-btn { padding: 1rem 2rem; background: white; color: #3B82F6; border-radius: 0.75rem; font-weight: 600; text-decoration: none; font-size: 1.125rem; transition: all 0.2s; }
        .use-template-btn:hover { transform: scale(1.05); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        
        /* Template Info */
        .template-info { padding: 2rem; }
        .template-info h3 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.75rem; }
        .template-info p { color: #6B7280; margin-bottom: 1.5rem; line-height: 1.6; }
        
        .template-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .tag { font-size: 0.875rem; color: #374151; background: #F3F4F6; padding: 0.375rem 0.75rem; border-radius: 0.5rem; }
        
        /* No Results */
        .no-results { text-align: center; padding: 4rem 2rem; color: #6B7280; }
        
        /* Features Section */
        .features-section { padding: 4rem 2rem; background: white; }
        .features-section h2 { font-size: 2.5rem; font-weight: 900; color: #111827; text-align: center; margin-bottom: 3rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; }
        
        .feature-item { text-align: center; }
        .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
        .feature-item h3 { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.75rem; }
        .feature-item p { color: #6B7280; line-height: 1.6; }
        
        /* CTA Section */
        .cta-section { padding: 6rem 2rem; background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); text-align: center; color: white; }
        .cta-section h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; }
        .cta-section p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        .cta-button { display: inline-block; padding: 1.25rem 2.5rem; background: white; color: #3B82F6; border-radius: 0.75rem; font-weight: 600; text-decoration: none; font-size: 1.125rem; transition: all 0.2s; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-simple h1 { font-size: 2rem; }
          .template-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .cta-section h2 { font-size: 2rem; }
          .filter-buttons { gap: 0.5rem; }
          .filter-btn { padding: 0.5rem 1rem; font-size: 0.875rem; }
        }
      `}</style>
        </main>
    );
}
