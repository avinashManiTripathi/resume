"use client";

interface CTASectionProps {
    title: string;
    description: string;
    primaryCta?: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
    variant?: "primary" | "secondary" | "gradient";
}

export const CTASection = ({
    title,
    description,
    primaryCta,
    secondaryCta,
    variant = "gradient",
}: CTASectionProps) => {
    const getBackgroundClass = () => {
        switch (variant) {
            case "primary":
                return "bg-primary";
            case "secondary":
                return "bg-secondary";
            case "gradient":
            default:
                return "bg-gradient";
        }
    };

    return (
        <section className={`cta-section ${getBackgroundClass()}`}>
            <div className="cta-container">
                <h2 className="cta-title">{title}</h2>
                <p className="cta-description">{description}</p>

                {(primaryCta || secondaryCta) && (
                    <div className="cta-buttons">
                        {primaryCta && (
                            <a href={primaryCta.href} className="btn btn-white btn-lg">
                                {primaryCta.text}
                            </a>
                        )}
                        {secondaryCta && (
                            <a href={secondaryCta.href} className="btn btn-outline btn-lg">
                                {secondaryCta.text}
                            </a>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
        .cta-section {
          padding: var(--spacing-4xl) var(--spacing-md);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .bg-gradient {
          background: var(--gradient-hero);
        }

        .bg-primary {
          background: var(--color-primary);
        }

        .bg-secondary {
          background: var(--color-secondary);
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--white);
          margin-bottom: var(--spacing-lg);
          line-height: 1.2;
        }

        .cta-description {
          font-size: var(--font-size-xl);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: var(--spacing-2xl);
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
          cursor: pointer;
          border: 2px solid transparent;
        }

        .btn-lg {
          padding: var(--spacing-lg) var(--spacing-2xl);
          font-size: var(--font-size-lg);
        }

        .btn-white {
          background: var(--white);
          color: var(--color-primary);
          box-shadow: var(--shadow-lg);
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .btn-outline {
          background: transparent;
          color: var(--white);
          border-color: var(--white);
        }

        .btn-outline:hover {
          background: var(--white);
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: var(--spacing-3xl) var(--spacing-md);
          }

          .cta-title {
            font-size: var(--font-size-3xl);
          }

          .cta-description {
            font-size: var(--font-size-lg);
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
        </section>
    );
};
