

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className: string;
}

export const Input = ({ type, placeholder, value, onChange, name, className }: InputProps) => {
  const defaultClassName = "border border-[var(--input-border)] rounded h-[52px] w-full bg-[var(--input-bg)] text-[var(--input-text)]";
  return <input
    className={`${defaultClassName} ${className}`}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />;
};
