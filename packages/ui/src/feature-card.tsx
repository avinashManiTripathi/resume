"use client";

import { ReactNode } from "react";

interface FeatureCardProps {
    icon?: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export const FeatureCard = ({
    icon,
    title,
    description,
    className = "",
}: FeatureCardProps) => {
    return (
        <div className={`feature-card ${className}`}>
            {icon && <div className="feature-icon">{icon}</div>}
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>

            <style jsx>{`
        .feature-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          transition: all var(--transition-base);
          box-shadow: var(--shadow-sm);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--color-primary-light);
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          color: var(--white);
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-sm);
          flex-shrink: 0;
        }

        .feature-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin: 0;
        }

        .feature-description {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }

        @media (max-width: 768px) {
          .feature-card {
            padding: var(--spacing-xl);
          }

          .feature-icon {
            width: 56px;
            height: 56px;
            font-size: var(--font-size-2xl);
          }

          .feature-title {
            font-size: var(--font-size-xl);
          }
        }
      `}</style>
        </div>
    );
};
