import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined
  name?: string
};

export const Button = ({
  children,
  variant = "outline",
  icon,
  type = 'button',
  onClick,
  className = "",
  disabled = false,
  name = ""
}: ButtonProps) => {
  const baseStyles =
    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";

  const primaryStyles =
    "bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600";


  const dangerStyles =
    "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600";


  const outlineStyles =
    "border border-blue-500 text-blue-600 hover:bg-blue-50 disabled:hover:bg-transparent";

  return (
    <button
      type={type}
      name={name}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : variant === 'danger' ? dangerStyles : outlineStyles
        } ${className}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
