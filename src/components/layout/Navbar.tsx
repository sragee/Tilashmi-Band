"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/gallery", label: "Gallery" },
  { href: "/music", label: "Music" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ logoUrl }: { logoUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "glass-strong pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
          : "bg-transparent pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between">
        <Logo logoUrl={logoUrl} size={scrolled ? 34 : 40} />

        <ul className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm tracking-wide transition-colors duration-300 relative py-1 ${
                  pathname === l.href ? "text-black" : "text-black/55 hover:text-black"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-black/70" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="/music" variant="secondary" className="!py-2.5 !px-5 text-xs">
            Listen Now
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center text-black"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`lg:hidden fixed inset-x-0 top-[100%] origin-top overflow-hidden transition-all duration-400 ease-out glass-strong ${
          open ? "max-h-[80dvh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col overflow-y-auto px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] gap-1 max-h-[80dvh]">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block py-3.5 text-lg border-b border-black/5 min-h-11 ${
                  pathname === l.href ? "text-black" : "text-black/55"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Button href="/music" className="w-full">
              Listen Now
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
