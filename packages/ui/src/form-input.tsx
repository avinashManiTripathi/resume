import React from "react";

interface FormInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    required?: boolean;
    className?: string;
}

export const FormInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = false,
    className = "",
}: FormInputProps) => {
    return (
        <div className={`form-input-wrapper ${className}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="form-input"
            />
            <style jsx>{`
        .form-input-wrapper {
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

        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.5rem;
          font-size: 0.9375rem;
          color: #111827;
          background: white;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder {
          color: #9CA3AF;
        }
      `}</style>
        </div>
    );
};
