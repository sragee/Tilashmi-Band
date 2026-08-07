import type { Metadata } from "next";
import { ReactNode } from "react";
import { display, sans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TILASHMI | Where Divine Energy Meets Modern Sound",
    template: "%s | TILASHMI",
  },
  description:
    "TILASHMI — a Nepali alternative rock, pop & fusion rock band, established 2081 B.S. (2024 A.D.). Music blessed with positive energy.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
