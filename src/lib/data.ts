import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (settings) return settings;
  return prisma.siteSettings.create({ data: { id: "singleton" } });
}

export async function getHero() {
  const hero = await prisma.heroContent.findUnique({ where: { id: "singleton" } });
  if (hero) return hero;
  return prisma.heroContent.create({ data: { id: "singleton" } });
}

export async function getAbout() {
  const about = await prisma.aboutContent.findUnique({ where: { id: "singleton" } });
  if (about) return about;
  return prisma.aboutContent.create({ data: { id: "singleton" } });
}

export async function getTimeline() {
  return prisma.timelineEvent.findMany({ orderBy: { order: "asc" } });
}

export async function getMembers() {
  return prisma.member.findMany({ orderBy: { order: "asc" } });
}

export async function getGroupPhoto() {
  const photo = await prisma.groupPhoto.findUnique({ where: { id: "singleton" } });
  if (photo) return photo;
  return prisma.groupPhoto.create({ data: { id: "singleton" } });
}

export async function getGallery() {
  return prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
}

export async function getReleases() {
  return prisma.release.findMany({ orderBy: { releaseDate: "desc" } });
}

export async function getEvents() {
  return prisma.event.findMany({ orderBy: { date: "asc" } });
}

export async function getPublishedNews() {
  return prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}
