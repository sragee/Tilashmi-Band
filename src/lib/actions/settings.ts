"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function updateSettings(formData: FormData) {
  if (!(await getSession())) throw new Error("Unauthorized");

  const data = {
    logoUrl: String(formData.get("logoUrl") || "") || null,
    faviconUrl: String(formData.get("faviconUrl") || "") || null,
    siteTitle: String(formData.get("siteTitle") || "TILASHMI"),
    siteDescription: String(formData.get("siteDescription") || ""),
    facebookUrl: String(formData.get("facebookUrl") || "") || null,
    instagramUrl: String(formData.get("instagramUrl") || "") || null,
    youtubeUrl: String(formData.get("youtubeUrl") || "") || null,
    spotifyUrl: String(formData.get("spotifyUrl") || "") || null,
    tiktokUrl: String(formData.get("tiktokUrl") || "") || null,
    appleMusicUrl: String(formData.get("appleMusicUrl") || "") || null,
    contactEmail: String(formData.get("contactEmail") || ""),
    contactPhone: String(formData.get("contactPhone") || ""),
    contactWhatsapp: String(formData.get("contactWhatsapp") || ""),
    footerText: String(formData.get("footerText") || "TILASHMI © All Rights Reserved."),
    backgroundMusicUrl: String(formData.get("backgroundMusicUrl") || "https://youtu.be/civuoU_NE38?list=RDcivuoU_NE38") || null,
  };

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
