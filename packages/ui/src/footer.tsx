"use client";

interface FooterLink {
    text: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface FooterProps {
    sections?: FooterSection[];
    socialLinks?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
    copyright?: string;
    companyName?: string;
}

export const Footer = ({
    sections = [],
    socialLinks,
    copyright,
    companyName = "Resume Builder",
}: FooterProps) => {
    const currentYear = new Date().getFullYear();
    const copyrightText = copyright || `© ${currentYear} ${companyName}. All rights reserved.`;

    return (
        <footer className="footer">
            <div className="footer-container">
                {sections.length > 0 && (
                    <div className="footer-sections">
                        {sections.map((section, index) => (
                            <div key={index} className="footer-section">
                                <h3 className="footer-section-title">{section.title}</h3>
                                <ul className="footer-links">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.href} className="footer-link">
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <div className="footer-bottom">
                    <p className="footer-copyright">{copyrightText}</p>

                    {socialLinks && (
                        <div className="footer-social">
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} className="social-link" aria-label="Twitter">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            )}
                            {socialLinks.github && (
                                <a href={socialLinks.github} className="social-link" aria-label="GitHub">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} className="social-link" aria-label="LinkedIn">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .footer {
          background: var(--bg-dark);
          color: var(--text-on-dark);
          padding: var(--spacing-3xl) var(--spacing-md) var(--spacing-xl);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
          padding-bottom: var(--spacing-2xl);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-section-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-md);
          color: var(--white);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: var(--font-size-base);
          transition: color var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--white);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .footer-copyright {
          color: rgba(255, 255, 255, 0.6);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .footer-social {
          display: flex;
          gap: var(--spacing-md);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.1);
          color: var(--white);
          transition: all var(--transition-fast);
        }

        .social-link:hover {
          background: var(--color-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .footer {
            padding: var(--spacing-2xl) var(--spacing-md);
          }

          .footer-sections {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
        </footer>
    );
};
