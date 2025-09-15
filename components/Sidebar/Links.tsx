import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  icon?: React.ElementType;
  title: string;
  href: string;
  className?: string;
  isActiveProps?: boolean;
};

export default function Links({ icon, title, href, className, isActiveProps }: Props) {
  const pathname = usePathname();
  const isActive = href === pathname || isActiveProps;
  const Icon = icon ? icon : null;

  return (
    <Link
      href={href}
      className={cn(
        `flex items-center gap-4 [@media(min-width:1440px)]:gap-6 px-3 pb-[7px] font-medium text-base lg:text-lg text-white group ${isActive ? "rounded-[8px] bg-[rgba(255,255,255,0.2)]" : "rounded-none bg-transparent"}`,
        className,
      )}
    >
      {Icon ? (
        <span className="w-[22px] h-[22px] flex items-center justify-center">
          <Icon className="w-[22px] h-[22px] flex-shrink-0" />
        </span>
      ) : (
        <span className="w-[22px] h-[22px]"></span>
      )}
      <span className="shrink-0 text-[#7E5730]">{title}</span>{" "}

    </Link>
  );
}
