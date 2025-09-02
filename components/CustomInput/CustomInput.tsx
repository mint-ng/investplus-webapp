"use client"
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { useState } from "react";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  inputClass?: string;
  error?: string;
};

export default function CustomInput({
  className,
    label,
    name,
    onChange,
    value,
    placeholder,
    inputClass,
    error,
    onBlur,
    ...props
}: CustomInputProps) {
  const [_, setIsFocused] = useState(false);
  return (
      <div className={cn("w-full", className)}>
        {label && (
                <label
                    htmlFor={props.id ? props.id : name}
                    className="mb-1 text-base font-medium w-fit block text-[#111827]"
                >
                    {label}
                </label>
      )}
      
                  <input
                    name={name}
                    placeholder={placeholder}
                    id={props.id ? props.id : name}
                    onChange={onChange}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur?.(e);
                    }}
                    className={cn(
            `block h-[52px] py-[12px] text-sm w-full rounded-[15px] bg-[#EBECEF] border px-4 focus:outline-none focus:ring-0 focus:border-[#7E5730] 
             ${error ? "border-red" : "border-[#E4E5E73D]"}`,
                        inputClass
                    )}
                    {...props}
      />
      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
      </div>
  )
}
