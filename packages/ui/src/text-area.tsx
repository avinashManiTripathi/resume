import { ChangeEventHandler } from "react";

interface TextAreaProps {
    placeholder?: string;
    value: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    name: string;
    className?: string;
}

export const TextArea = ({ placeholder, value, onChange, name, className }: TextAreaProps) => {

    return <textarea
        className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />;
};

