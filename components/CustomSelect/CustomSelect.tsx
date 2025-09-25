"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ChevronDown from "@/public/chevron-down.svg"; // icon for dropdown

type Option = {
  label: string;
  value: string;
  key: string;
};

type Props = {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
};

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  required,
  className,
}: Props) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 text-base font-medium w-fit block text-[#111827]">
          {label}{" "} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Container */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "block w-full h-[52px] appearance-none px-4 pr-10 text-sm rounded-[15px] bg-[#EBECEF] border",
            "text-[#111827] placeholder-gray-400",
            "focus:outline-none focus:ring-0 focus:border-[#7E5730] cursor-pointer",
            error ? "border-red" : "border-[#E4E5E73D]"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.key} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>

      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
    </div>
  );
}
