import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  children,
  variant = "outline",
  icon,
  onClick,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400";

  const primaryStyles =
    "bg-blue-600 text-white hover:bg-blue-700";

  const outlineStyles =
    "border border-blue-500 text-blue-600 hover:bg-blue-50";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : outlineStyles
        } ${className}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
