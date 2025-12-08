"use client";

interface PricingTier {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    ctaText?: string;
    ctaHref?: string;
}

interface PricingProps {
    title?: string;
    subtitle?: string;
    tiers: PricingTier[];
}

export const Pricing = ({
    title = "Simple, Transparent Pricing",
    subtitle = "Choose the plan that works best for you",
    tiers,
}: PricingProps) => {
    return (
        <section id="pricing" className="pricing-section">
            <div className="pricing-container">
                <div className="pricing-header">
                    <h2 className="pricing-title">{title}</h2>
                    <p className="pricing-subtitle">{subtitle}</p>
                </div>

                <div className="pricing-grid">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`pricing-card ${tier.highlighted ? "highlighted" : ""}`}
                        >
                            {tier.highlighted && <div className="badge">Most Popular</div>}
                            <h3 className="tier-name">{tier.name}</h3>
                            <div className="tier-price">
                                <span className="price">{tier.price}</span>
                                {tier.period && <span className="period">/{tier.period}</span>}
                            </div>
                            <p className="tier-description">{tier.description}</p>
                            <ul className="features-list">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="feature-item">
                                        <span className="check-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={tier.ctaHref || "#"}
                                className={`cta-button ${tier.highlighted ? "primary" : "secondary"}`}
                            >
                                {tier.ctaText || "Get Started"}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .pricing-section {
          padding: var(--spacing-4xl) var(--spacing-md);
          background: var(--bg-secondary);
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .pricing-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
        }

        .pricing-subtitle {
          font-size: var(--font-size-xl);
          color: var(--text-secondary);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
          align-items: stretch;
        }

        .pricing-card {
          background: var(--bg-primary);
          border: 2px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-base);
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .pricing-card:nth-child(1) { animation-delay: 0.1s; }
        .pricing-card:nth-child(2) { animation-delay: 0.2s; }
        .pricing-card:nth-child(3) { animation-delay: 0.3s; }

        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .pricing-card.highlighted {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-lg);
          transform: scale(1.05);
        }

        .pricing-card.highlighted:hover {
          transform: scale(1.05) translateY(-8px);
        }

        .badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: var(--white);
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
        }

        .tier-name {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
        }

        .tier-price {
          margin-bottom: var(--spacing-lg);
        }

        .price {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--color-primary);
        }

        .period {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-left: var(--spacing-xs);
        }

        .tier-description {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xl);
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--spacing-xl) 0;
          flex-grow: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) 0;
          font-size: var(--font-size-base);
          color: var(--text-primary);
        }

        .check-icon {
          color: var(--color-success);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-lg);
          flex-shrink: 0;
        }

        .cta-button {
          display: block;
          text-align: center;
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-semibold);
          text-decoration: none;
          transition: all var(--transition-base);
          margin-top: auto;
        }

        .cta-button.primary {
          background: var(--gradient-primary);
          color: var(--white);
          box-shadow: var(--shadow-sm);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .cta-button.secondary {
          background: transparent;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        .cta-button.secondary:hover {
          background: var(--color-primary);
          color: var(--white);
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
          .pricing-section {
            padding: var(--spacing-3xl) var(--spacing-md);
          }

          .pricing-title {
            font-size: var(--font-size-3xl);
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.highlighted {
            transform: scale(1);
          }

          .pricing-card.highlighted:hover {
            transform: translateY(-8px);
          }
        }
      `}</style>
        </section>
    );
};
