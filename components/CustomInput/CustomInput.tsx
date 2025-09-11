"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useState } from "react";
import Flag from "@/public/flag.png"
import Image from "next/image";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  inputClass?: string;
  error?: string;
  phone?: boolean;
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
  phone = false,
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

      {phone ? (
         <div className="flex w-full gap-2">
    <div className="flex items-center h-[52px] px-4 rounded-[15px] bg-[#EBECEF] border border-[#E4E5E73D]">
              <Image src={Flag} alt="Flag" width={29} height={29}/>
      <span className="ml-2 font-normal text-[#0A0D14]">+234</span>
    </div>

    <input
      type="tel"
      name={name}
      maxLength={10}
      id={props.id ? props.id : name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      className={cn(
        "flex-1 h-[52px] px-4 rounded-[15px] bg-[#EBECEF] border border-[#E4E5E73D]",
        "text-sm text-[#111827] placeholder-gray-400",
        "focus:outline-none focus:ring-0 focus:border-[#7E5730]",
        error ? "border-red" : "border-[#E4E5E73D]"
      )}
      {...props}
    />
  </div>
      ) : (
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
            `block h-[52px] py-[12px] text-sm w-full rounded-[15px] bg-[#EBECEF] border px-4 
             focus:outline-none focus:ring-0 focus:border-[#7E5730] 
             ${error ? "border-red" : "border-[#E4E5E73D]"}`,
            inputClass
          )}
          {...props}
        />
      )}

      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
    </div>
  );
}
