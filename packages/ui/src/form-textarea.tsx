import React from "react";

interface FormTextareaProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
    rows?: number;
    required?: boolean;
    className?: string;
    showToolbar?: boolean;
}

export const FormTextarea = ({
    label,
    placeholder,
    value,
    onChange,
    name,
    rows = 4,
    required = false,
    className = "",
    showToolbar = false,
}: FormTextareaProps) => {
    const handleFormat = (command: string) => {
        document.execCommand(command, false);
    };

    return (
        <div className={`form-textarea-wrapper ${className}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>

            {showToolbar && (
                <div className="toolbar">
                    <button type="button" onClick={() => handleFormat('bold')} className="toolbar-btn" title="Bold">
                        <strong>B</strong>
                    </button>
                    <button type="button" onClick={() => handleFormat('italic')} className="toolbar-btn" title="Italic">
                        <em>I</em>
                    </button>
                    <button type="button" onClick={() => handleFormat('underline')} className="toolbar-btn" title="Underline">
                        <u>U</u>
                    </button>
                    <button type="button" onClick={() => handleFormat('strikeThrough')} className="toolbar-btn" title="Strikethrough">
                        <s>S</s>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button type="button" onClick={() => handleFormat('insertUnorderedList')} className="toolbar-btn" title="Bullet List">
                        ≡
                    </button>
                    <button type="button" onClick={() => handleFormat('insertOrderedList')} className="toolbar-btn" title="Numbered List">
                        #
                    </button>
                    <button type="button" onClick={() => handleFormat('createLink')} className="toolbar-btn" title="Link">
                        🔗
                    </button>
                </div>
            )}

            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                required={required}
                className="form-textarea"
            />

            <style jsx>{`
        .form-textarea-wrapper {
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

        .toolbar {
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem;
          background: #F9FAFB;
          border: 1px solid #D1D5DB;
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
          align-items: center;
        }

        .toolbar-btn {
          padding: 0.375rem 0.625rem;
          background: white;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .toolbar-btn:hover {
          background: #F3F4F6;
          border-color: #9CA3AF;
        }

        .toolbar-divider {
          width: 1px;
          height: 1.5rem;
          background: #D1D5DB;
          margin: 0 0.25rem;
        }

        .form-textarea {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #D1D5DB;
          border-radius: ${showToolbar ? '0 0 0.5rem 0.5rem' : '0.5rem'};
          font-size: 0.9375rem;
          color: #111827;
          background: white;
          transition: all 0.2s;
          font-family: inherit;
          resize: vertical;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea::placeholder {
          color: #9CA3AF;
        }
      `}</style>
        </div>
    );
};
