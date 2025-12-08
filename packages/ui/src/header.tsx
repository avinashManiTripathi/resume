"use client";

import { useState } from "react";

interface NavLink {
    text: string;
    href: string;
}

interface HeaderProps {
    logo?: string;
    logoText?: string;
    links?: NavLink[];
    ctaText?: string;
    ctaHref?: string;
    sticky?: boolean;
}

export const Header = ({
    logo,
    logoText = "Resume Builder",
    links = [],
    ctaText,
    ctaHref,
    sticky = true,
}: HeaderProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className={`header ${sticky ? "sticky" : ""}`}>
            <div className="header-container">
                <div className="header-logo">
                    {logo ? (
                        <img src={logo} alt={logoText} className="logo-image" />
                    ) : (
                        <span className="logo-text">{logoText}</span>
                    )}
                </div>

                {links.length > 0 && (
                    <>
                        <nav className={`header-nav ${mobileMenuOpen ? "open" : ""}`}>
                            <ul className="nav-links">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="nav-link">
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <button
                            className="mobile-menu-button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </>
                )}

                {ctaText && ctaHref && (
                    <a href={ctaHref} className="header-cta">
                        {ctaText}
                    </a>
                )}
            </div>

            <style jsx>{`
        .header {
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-primary);
          padding: var(--spacing-md) var(--spacing-md);
          transition: all var(--transition-base);
        }

        .header.sticky {
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-lg);
        }

        .header-logo {
          display: flex;
          align-items: center;
        }

        .logo-image {
          height: 40px;
          width: auto;
        }

        .logo-text {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }

        .header-nav {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: var(--spacing-xl);
          align-items: center;
        }

        .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          transition: color var(--transition-fast);
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-primary);
          transition: width var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .header-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--gradient-primary);
          color: var(--white);
          border-radius: var(--radius-lg);
          text-decoration: none;
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-base);
          transition: all var(--transition-base);
          box-shadow: var(--shadow-sm);
        }

        .header-cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--spacing-sm);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 24px;
        }

        .hamburger span {
          display: block;
          height: 2px;
          background: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block;
          }

          .header-nav {
            position: fixed;
            top: 73px;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            border-bottom: 1px solid var(--border-primary);
            padding: var(--spacing-lg);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-base);
            box-shadow: var(--shadow-lg);
          }

          .header-nav.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-links {
            flex-direction: column;
            gap: var(--spacing-md);
            align-items: flex-start;
          }

          .header-cta {
            display: none;
          }
        }
      `}</style>
        </header>
    );
};
