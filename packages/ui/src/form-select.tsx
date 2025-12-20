import React from "react";

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    options: { value: string; label: string }[];
    required?: boolean;
    className?: string;
}

export const FormSelect = ({
    label,
    value,
    onChange,
    name,
    options,
    required = false,
    className = "",
}: FormSelectProps) => {
    return (
        <div className={`form-select-wrapper ${className}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="form-select"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <style jsx>{`
        .form-select-wrapper {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .required {
          color: #EF4444;
          margin-left: 0.25rem;
        }

        .form-select {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.5rem;
          font-size: 0.9375rem;
          color: #111827;
          background: white;
          transition: all 0.2s;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.875rem center;
          padding-right: 2.5rem;
        }

        .form-select:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
        </div>
    );
};
