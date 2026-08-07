"use client";

import Link from "next/link";

export function Logo({ logoUrl, size = 40 }: { logoUrl?: string | null; size?: number }) {
  const src = logoUrl || "/logo.png";

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="TILASHMI"
        className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        style={{ height: size }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "inline";
        }}
      />
      <span
        className="hidden font-display text-lg tracking-[0.25em] uppercase text-black"
        style={{ fontSize: size * 0.42 }}
      >
        TILASHMI
      </span>
    </Link>
  );
}
