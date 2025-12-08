"use client";

import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: ReactNode;
}

export const Hero = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  children,
}: HeroProps) => {
  return (
    <section className="hero-section">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="float-circle circle-1"></div>
        <div className="float-circle circle-2"></div>
        <div className="float-circle circle-3"></div>
        <div className="float-square square-1"></div>
        <div className="float-square square-2"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          <h1 className="hero-title">
            {title.split(' ').map((word, index) => (
              <span key={index} className="word" style={{ animationDelay: `${index * 0.1}s` }}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="hero-description">{description}</p>

          {(primaryCta || secondaryCta) && (
            <div className="hero-cta-group">
              {primaryCta && (
                <a href={primaryCta.href} className="btn btn-primary btn-lg">
                  {primaryCta.text}
                  <span className="btn-arrow">→</span>
                </a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn btn-secondary btn-lg">
                  {secondaryCta.text}
                </a>
              )}
            </div>
          )}

          {children}
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-hero);
          overflow: hidden;
          padding: var(--spacing-4xl) var(--spacing-md);
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
          animation: pulse 4s ease-in-out infinite;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .float-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation: float 20s ease-in-out infinite;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 15%;
          animation: float 15s ease-in-out infinite reverse;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 20%;
          animation: float 18s ease-in-out infinite;
          animation-delay: 2s;
        }

        .float-square {
          position: absolute;
          background: rgba(255, 208, 83, 0.1);
          backdrop-filter: blur(10px);
          transform: rotate(45deg);
        }

        .square-1 {
          width: 100px;
          height: 100px;
          top: 30%;
          right: 20%;
          animation: rotate-float 25s linear infinite;
        }

        .square-2 {
          width: 80px;
          height: 80px;
          bottom: 30%;
          right: 40%;
          animation: rotate-float 20s linear infinite reverse;
        }

        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-subtitle {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-accent);
          margin-bottom: var(--spacing-md);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          animation: fadeInDown 0.6s ease-out;
        }

        .hero-title {
          font-size: var(--font-size-6xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--text-on-dark);
          margin-bottom: var(--spacing-lg);
          line-height: 1.1;
        }

        .word {
          display: inline-block;
          animation: fadeInUp 0.6s ease-out backwards;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: var(--font-size-xl);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: var(--spacing-2xl);
          line-height: 1.7;
          animation: fadeInUp 0.6s ease-out 0.3s backwards;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta-group {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
          cursor: pointer;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-lg {
          padding: var(--spacing-lg) var(--spacing-2xl);
          font-size: var(--font-size-lg);
        }

        .btn-primary {
          background: var(--white);
          color: var(--color-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--white);
          border-color: var(--white);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: var(--white);
          color: var(--color-primary);
          transform: translateY(-4px);
        }

        .btn-arrow {
          display: inline-block;
          transition: transform var(--transition-base);
        }

        .btn:hover .btn-arrow {
          transform: translateX(5px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(20px);
          }
          50% {
            transform: translateY(-15px) translateX(-20px);
          }
          75% {
            transform: translateY(-40px) translateX(10px);
          }
        }

        @keyframes rotate-float {
          0% {
            transform: rotate(0deg) translateY(0);
          }
          50% {
            transform: rotate(180deg) translateY(-30px);
          }
          100% {
            transform: rotate(360deg) translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 85vh;
            padding: var(--spacing-2xl) var(--spacing-md);
          }

          .hero-title {
            font-size: var(--font-size-4xl);
          }

          .hero-description {
            font-size: var(--font-size-lg);
          }

          .hero-cta-group {
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            width: 100%;
          }

          .float-circle {
            opacity: 0.5;
          }

          .circle-1 {
            width: 200px;
            height: 200px;
          }

          .circle-2 {
            width: 150px;
            height: 150px;
          }

          .circle-3 {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </section>
  );
};
