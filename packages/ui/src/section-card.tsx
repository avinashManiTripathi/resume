import React, { useState } from "react";

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    onDelete?: () => void;
    className?: string;
}

export const SectionCard = ({
    title,
    children,
    defaultOpen = true,
    onDelete,
    className = "",
}: SectionCardProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`section-card ${className}`}>
            <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="section-title-row">
                    <h3 className="section-title">{title}</h3>
                    {onDelete && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="delete-btn"
                        >
                            Delete
                        </button>
                    )}
                </div>
                <svg
                    className={`chevron ${isOpen ? 'open' : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {isOpen && <div className="section-content">{children}</div>}

            <style jsx>{`
        .section-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          cursor: pointer;
          background: #F9FAFB;
          border-bottom: 1px solid #E5E7EB;
          transition: background 0.2s;
        }

        .section-header:hover {
          background: #F3F4F6;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .delete-btn {
          padding: 0.375rem 0.75rem;
          background: white;
          border: 1px solid #FCA5A5;
          color: #DC2626;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #FEE2E2;
          border-color: #DC2626;
        }

        .chevron {
          color: #6B7280;
          transition: transform 0.2s;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .section-content {
          padding: 1.25rem;
        }
      `}</style>
        </div>
    );
};
