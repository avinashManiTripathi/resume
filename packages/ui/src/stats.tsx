"use client";

interface Stat {
    value: string;
    label: string;
    icon?: string;
}

interface StatsProps {
    title?: string;
    subtitle?: string;
    stats: Stat[];
    variant?: "light" | "dark" | "gradient";
}

export const Stats = ({
    title,
    subtitle,
    stats,
    variant = "gradient",
}: StatsProps) => {
    return (
        <section className={`stats-section variant-${variant}`}>
            <div className="stats-container">
                {(title || subtitle) && (
                    <div className="stats-header">
                        {title && <h2 className="stats-title">{title}</h2>}
                        {subtitle && <p className="stats-subtitle">{subtitle}</p>}
                    </div>
                )}

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .stats-section {
          padding: var(--spacing-4xl) var(--spacing-md);
        }

        .variant-light {
          background: var(--bg-primary);
        }

        .variant-dark {
          background: var(--bg-dark);
        }

        .variant-gradient {
          background: var(--gradient-hero);
          position: relative;
          overflow: hidden;
        }

        .variant-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stats-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .stats-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          margin-bottom: var(--spacing-md);
        }

        .variant-light .stats-title {
          color: var(--text-primary);
        }

        .variant-dark .stats-title,
        .variant-gradient .stats-title {
          color: var(--white);
        }

        .stats-subtitle {
          font-size: var(--font-size-xl);
        }

        .variant-light .stats-subtitle {
          color: var(--text-secondary);
        }

        .variant-dark .stats-subtitle,
        .variant-gradient .stats-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-2xl);
        }

        .stat-card {
          text-align: center;
          padding: var(--spacing-xl);
          animation: fadeInScale 0.6s ease-out backwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }

        .stat-icon {
          font-size: var(--font-size-5xl);
          margin-bottom: var(--spacing-md);
          animation: float 3s ease-in-out infinite;
        }

        .stat-card:nth-child(2) .stat-icon {
          animation-delay: 0.5s;
        }

        .stat-card:nth-child(3) .stat-icon {
          animation-delay: 1s;
        }

        .stat-card:nth-child(4) .stat-icon {
          animation-delay: 1.5s;
        }

        .stat-value {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-extrabold);
          margin-bottom: var(--spacing-sm);
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .variant-dark .stat-value,
        .variant-gradient .stat-value {
          background: linear-gradient(135deg, var(--white) 0%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-medium);
        }

        .variant-light .stat-label {
          color: var(--text-secondary);
        }

        .variant-dark .stat-label,
        .variant-gradient .stat-label {
          color: rgba(255, 255, 255, 0.9);
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 768px) {
          .stats-section {
            padding: var(--spacing-3xl) var(--spacing-md);
          }

          .stats-title {
            font-size: var(--font-size-3xl);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-lg);
          }

          .stat-value {
            font-size: var(--font-size-4xl);
          }
        }
      `}</style>
        </section>
    );
};
