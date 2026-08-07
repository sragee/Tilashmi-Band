"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Users,
  Image as ImageIcon,
  Images,
  Music,
  CalendarDays,
  Newspaper,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Sparkles },
  { href: "/admin/about", label: "About", icon: BookOpen },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/group-photo", label: "Group Photo", icon: ImageIcon },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/music", label: "Music", icon: Music },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-black/8 bg-[#fafaf8]">
      <div className="lg:sticky lg:top-0 lg:h-dvh flex flex-col">
        <div className="px-6 py-6 border-b border-black/8">
          <p className="font-display text-lg tracking-widest text-black">TILASHMI</p>
          <p className="text-xs text-black/60 mt-0.5">Admin Dashboard</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map((l) => {
            const active = pathname === l.href;
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-black/8 text-black" : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
              >
                <Icon size={16} /> {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-black/8 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/60 hover:text-black hover:bg-black/5"
          >
            <ExternalLink size={16} /> View Site
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/60 hover:text-red-500 hover:bg-black/5"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
