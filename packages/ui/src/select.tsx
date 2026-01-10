import React, { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    label?: string;
    error?: string;
    icon?: ReactNode;
    containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, label, error, icon, className = "", containerClassName = "", required, id, ...props }, ref) => {
        const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

        return (
            <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="text-sm font-medium text-gray-700"
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <select
                        id={selectId}
                        ref={ref}
                        required={required}
                        className={`
                            block w-full appearance-none
                            bg-white border text-gray-900 text-sm rounded-lg
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            transition-all duration-200 outline-none
                            cursor-pointer disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                            ${icon ? "pl-10" : "pl-3"}
                            pr-10 py-2.5
                            ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
                            ${className}
                        `}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-blue-500 transition-colors">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";
