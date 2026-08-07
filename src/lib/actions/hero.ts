"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function updateHero(formData: FormData) {
  if (!(await getSession())) throw new Error("Unauthorized");

  const heading = String(formData.get("heading") || "TILASHMI");
  const subtitle = String(formData.get("subtitle") || "");
  const backgroundImageUrl = String(formData.get("backgroundImageUrl") || "") || null;
  const backgroundVideoUrl = String(formData.get("backgroundVideoUrl") || "") || null;
  const backgroundOpacity = Math.min(100, Math.max(0, Number(formData.get("backgroundOpacity") ?? 30)));

  await prisma.heroContent.upsert({
    where: { id: "singleton" },
    update: { heading, subtitle, backgroundImageUrl, backgroundVideoUrl, backgroundOpacity },
    create: { id: "singleton", heading, subtitle, backgroundImageUrl, backgroundVideoUrl, backgroundOpacity },
  });

  revalidatePath("/");
  revalidatePath("/admin/hero");
}
