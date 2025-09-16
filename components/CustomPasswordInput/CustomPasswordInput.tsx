"use client"
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { useState } from "react";
import EyeIcon from "@/public/eye.svg"
import EyeSlashIcon from "@/public/eye-slash.svg"

type CustomPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  inputClass?: string;
  error?: string;
};

export default function CustomPasswordInput({
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
}: CustomPasswordProps) {
	const [_, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
  return (
      <div className={cn("w-full", className)}>
      	{label && (
				<label
					htmlFor={props.id ? props.id : name}
					className="my-1 text-base font-medium w-fit block text-[#111827]"
				>
					{label}
				</label>
      )}
      
       <div className="relative w-full">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
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
            `block h-[52px] py-[12px] text-sm w-full rounded-[15px] bg-[#EBECEF] border px-4 pr-10 
             focus:outline-none focus:ring-0 focus:border-[#7E5730] 
             ${error ? "border-red" : "border-[#E4E5E73D]"}`,
            inputClass
          )}
          {...props}
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
			  >
				  {showPassword ? <EyeSlashIcon /> : <EyeIcon/>}
        </button>
      </div>

      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
      </div>
  )
}
