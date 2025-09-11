import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const buttonStyles = cva(
	[
		"font-semibold",
		"text-lg",
		"h-[60px]",
		"w-fit",
		"whitespace-nowrap",
		"flex",
		"items-center",
		"justify-center",
		"gap-[6px]",
		"py-[12px]",
		"px-3",
		"rounded-[30px]",
		"cursor-pointer"
	],
	{
		variants: {
			intent: {
				primary: [
					"bg-linear-[91.01deg,#D0A23C_1.1%,#7E5730_104.33%]",
					"text-white",
					"disabled:bg-[#C9B37B]",
					"disabled:hover:bg-none",
				],
				outline: ["bg-white", "border", "border-[#7E5730]", "text-black"],
				link: [
					"w-fit",
					"h-fit",
					"text-sm",
					"font-semibold",
					"p-0",
					"rounded-none",
					"no-underline",
					"bg-linear-[91.01deg,#D0A23C_1.1%,#7E5730_104.33%]",
					"bg-clip-text",
					"text-transparent",
				],
			},
		},
		compoundVariants: [
			{
				intent: "primary",
				// size: "medium",
			},
		],
		defaultVariants: {
			intent: "primary",
			// size: "medium",
		},
	}
);


type ButtonProps = {
  className?: string;
  intent?: "primary" | "outline" | "link";
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  href?: string;
  loadingTextClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;


export default function Button({
    className,
	intent,
	// size,
	loading,
	disabled,
	children,
	href,
	loadingTextClassName,
	...props
}: ButtonProps) {
	const isLink = typeof href !== "undefined";

	const ButtonOrLink = isLink ? "span" : "button";

	const content = (
		<ButtonOrLink
			className={cn(
				buttonStyles({
					intent,
					// size,
					className,
				})
			)}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? <LoadingSpinner /> : children}
		</ButtonOrLink>
	);

	if (isLink) return <Link href={href}>{content}</Link>;

	return content;
}
