import { InputHTMLAttributes, ChangeEventHandler } from "react";
type CustomTextProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  inputClass?: string;
    error?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

    export default function CustomTextArea({
    label,
    placeholder,
    value,
    name,
    error,
    className,
    onChange
}: CustomTextProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-[120px] px-3 py-2 border rounded-[15px] bg-[#EBECEF] border-[#E4E5E73D]"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};