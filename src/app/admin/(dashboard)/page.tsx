import Link from "next/link";
import { Users, Images, Music, CalendarDays, Newspaper, Mail } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [members, gallery, releases, events, news, messages] = await Promise.all([
    prisma.member.count(),
    prisma.galleryImage.count(),
    prisma.release.count(),
    prisma.event.count(),
    prisma.newsPost.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Members", value: members, href: "/admin/members", icon: Users },
    { label: "Gallery Images", value: gallery, href: "/admin/gallery", icon: Images },
    { label: "Releases", value: releases, href: "/admin/music", icon: Music },
    { label: "Events", value: events, href: "/admin/events", icon: CalendarDays },
    { label: "News Posts", value: news, href: "/admin/news", icon: Newspaper },
    { label: "Unread Messages", value: messages, href: "/admin/messages", icon: Mail },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="Manage every part of the TILASHMI website." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl glass p-6 transition-colors hover:bg-black/[0.04]"
          >
            <s.icon className="text-accent mb-4" size={22} />
            <p className="font-display text-3xl text-black">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
