"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <>
      <button className={`btn btn-${variant} btn-${size} ${className}`} {...props}>
        {children}
      </button>

      <style jsx>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-weight-semibold);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
          cursor: pointer;
          border: 2px solid transparent;
          font-family: inherit;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Sizes */
        .btn-sm {
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: var(--font-size-sm);
        }

        .btn-md {
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: var(--font-size-base);
        }

        .btn-lg {
          padding: var(--spacing-lg) var(--spacing-xl);
          font-size: var(--font-size-lg);
        }

        /* Variants */
        .btn-primary {
          background: var(--gradient-primary);
          color: var(--text-on-primary);
          box-shadow: var(--shadow-sm);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          background: var(--gradient-secondary);
          color: var(--text-on-primary);
          box-shadow: var(--shadow-sm);
        }

        .btn-secondary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-outline {
          background: transparent;
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .btn-outline:hover:not(:disabled) {
          background: var(--color-primary);
          color: var(--text-on-primary);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-primary);
        }

        .btn-ghost:hover:not(:disabled) {
          background: var(--bg-secondary);
        }
      `}</style>
    </>
  );
};
