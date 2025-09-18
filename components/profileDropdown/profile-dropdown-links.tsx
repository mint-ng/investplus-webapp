import { profileDropdownLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  links: typeof profileDropdownLinks;
  onLogout: () => void;
};

export default function ProfileDropdownLinks({ className, onClick, links, onLogout }: Props) {
  return links.map((link, index) => {
    if (!link.path)
      return (
        <button
          key={index}
          className={cn(
            "text-primary font-medium whitespace-nowrap w-full text-sm [@media(min-width:1440px)]:text-base block text-left cursor-pointer",
            className,
          )}
          onClick={() => {
            onClick?.();
            onLogout();
          }}
        >
          {link.title}
        </button>
      );

    return (
      <Link
        key={index}
        href={link.path}
        onClick={onClick}
        className={cn(
          "text-primary font-medium whitespace-nowrap w-full text-sm [@media(min-width:1440px)]:text-base block",
          className,
        )}
      >
        {link.title}
      </Link>
    );
  });
}
