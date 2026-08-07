"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

export async function updateAbout(formData: FormData) {
  await requireAuth();

  const data = {
    intro: String(formData.get("intro") || ""),
    vision: String(formData.get("vision") || ""),
    passion: String(formData.get("passion") || ""),
    journey: String(formData.get("journey") || ""),
    meaning: String(formData.get("meaning") || ""),
    positiveMessage: String(formData.get("positiveMessage") || ""),
    establishedBS: String(formData.get("establishedBS") || "2081 B.S."),
    establishedAD: String(formData.get("establishedAD") || "2024 A.D."),
  };

  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/about");
  revalidatePath("/");
  revalidatePath("/admin/about");
}

export async function createTimelineEvent(formData: FormData) {
  await requireAuth();
  await prisma.timelineEvent.create({
    data: {
      year: String(formData.get("year") || ""),
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      order: Number(formData.get("order") || 0),
    },
  });
  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function updateTimelineEvent(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.timelineEvent.update({
    where: { id },
    data: {
      year: String(formData.get("year") || ""),
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      order: Number(formData.get("order") || 0),
    },
  });
  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function deleteTimelineEvent(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.timelineEvent.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/admin/about");
}
