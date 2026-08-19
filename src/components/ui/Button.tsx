import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-black/85 shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_40px_rgba(0,0,0,0.25)]",
  secondary:
    "glass text-black hover:bg-black/5 border-black/15",
  ghost: "text-black/75 hover:text-black border border-black/15 hover:border-black/30",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out touch-manipulation active:scale-[0.98] sm:px-7 sm:py-3.5";

export function Button({
  href,
  variant = "primary",
  children,
  className,
  ...rest
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
