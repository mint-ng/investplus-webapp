"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Image, { StaticImageData } from "next/image";

type DashboardStatCardProps = {
  title: string;
  value: number | undefined;
  icon?: React.ReactNode;
  className?: string;
  coverImage?: StaticImageData; // ✅ new prop
  isDarkImage?: boolean; //
};

export default function DashboardStatCard({
  title,
  value,
  icon,
  className,
  coverImage,
  isDarkImage = false,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-xl  p-6 min-w-[300px] min-h-[170px] overflow-hidden",
        className
      )}
    >
      {/* ✅ Background cover image */}
      {coverImage && (
        <Image
          src={coverImage}
          alt={title}
          fill
          className=" absolute inset-0 rounded-xl"
        />
      )}


      {/* ✅ Foreground content */}
      <div className="relative z-10 flex items-start flex-col gap-4 text-sm font-medium">
        {icon}
        <span className={cn(
          "relative z-10",
          isDarkImage ? "text-white" : "text-black"
        )}>{title}</span>
      </div>
      <p className={cn(
          "relative z-10 text-2xl font-semibold",
          isDarkImage ? "text-white" : "text-black"
        )} >{value}</p>
    </div>
  );
}
