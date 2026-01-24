

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
}

export const Input = ({ type, placeholder, value, onChange, name, className = '' }: InputProps) => {

  return <input
    className={"w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" + " " + className}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />;
};
