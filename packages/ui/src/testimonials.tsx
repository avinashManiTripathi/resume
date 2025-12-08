"use client";

interface Testimonial {
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
    rating?: number;
}

interface TestimonialsProps {
    title?: string;
    subtitle?: string;
    testimonials: Testimonial[];
}

export const Testimonials = ({
    title = "What Our Users Say",
    subtitle = "Join thousands of satisfied job seekers",
    testimonials,
}: TestimonialsProps) => {
    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">{title}</h2>
                    <p className="testimonials-subtitle">{subtitle}</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            {testimonial.rating && (
                                <div className="rating">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <span key={i} className="star">⭐</span>
                                    ))}
                                </div>
                            )}
                            <p className="testimonial-content">"{testimonial.content}"</p>
                            <div className="testimonial-author">
                                {testimonial.avatar && (
                                    <div className="avatar">{testimonial.avatar}</div>
                                )}
                                <div className="author-info">
                                    <p className="author-name">{testimonial.name}</p>
                                    <p className="author-role">{testimonial.role} at {testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .testimonials-section {
          padding: var(--spacing-4xl) var(--spacing-md);
          background: var(--bg-primary);
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .testimonials-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
        }

        .testimonials-subtitle {
          font-size: var(--font-size-xl);
          color: var(--text-secondary);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--spacing-xl);
        }

        .testimonial-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.3s; }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary-light);
        }

        .rating {
          display: flex;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-md);
        }

        .star {
          font-size: var(--font-size-lg);
        }

        .testimonial-content {
          font-size: var(--font-size-lg);
          color: var(--text-primary);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-xl);
          flex-shrink: 0;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-xs);
        }

        .author-role {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: var(--spacing-3xl) var(--spacing-md);
          }

          .testimonials-title {
            font-size: var(--font-size-3xl);
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
};
