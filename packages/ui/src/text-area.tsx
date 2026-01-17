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
        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 min-h-[120px]"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />;
};

