

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
}

export const Input = ({ type, placeholder, value, onChange, name, className }: InputProps) => {

  return <input
    className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0"
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />;
};
