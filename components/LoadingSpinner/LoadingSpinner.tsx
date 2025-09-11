import { cn } from "@/lib/utils";
import React from "react";
import { CgSpinner } from "react-icons/cg";

type SpinnerProp= {
    spinnerColor?: string;
    className?: string
}

export default function LoadingSpinner({ spinnerColor, className }:SpinnerProp) {
	return <CgSpinner className={cn("w-6 h-6 animate-spin", className)} color={spinnerColor ?? "#0A0D14"} />;
}
