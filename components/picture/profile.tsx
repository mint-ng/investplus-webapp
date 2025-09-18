import { cn } from "@/lib/utils";
// import { convertBase64ToImage, getUserInitials } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
  name: string;
  imageUrl?: string;
  imageClassName?: string;
  imageSize?: number;
  initialsClassName?: string;
};

export default function ProfilePicture({
  className,
  name,
  imageUrl,
  imageClassName,
  imageSize = 200,
  initialsClassName,
}: Props) {
  return (
    <div className={cn("w-[54px] h-[54px] shrink-0", className)}>
      {imageUrl ? (
        <Image
          alt={name}
          width={imageSize}
          height={imageSize}
          src={imageUrl}
          className={cn("w-full h-full rounded-[50%]", imageClassName)}
        />
      ) : (
        <span
          className={cn(
            "w-full h-full shrink-0 flex items-center justify-center rounded-[50%] bg-orange text-xl font-semibold capitalize text-white",
            initialsClassName,
          )}
        >
          {(name.split(" ")[0], name.split(" ")[1])}
        </span>
      )}
    </div>
  );
}
