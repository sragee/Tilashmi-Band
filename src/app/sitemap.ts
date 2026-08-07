import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/members",
    "/gallery",
    "/music",
    "/events",
    "/news",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const posts = await prisma.newsPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const postRoutes = posts.map((p) => ({
    url: `${baseUrl}/news/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...postRoutes];
}
