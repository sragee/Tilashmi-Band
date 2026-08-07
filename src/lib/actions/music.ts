"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

function releaseData(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    type: String(formData.get("type") || "single"),
    coverImageUrl: String(formData.get("coverImageUrl") || "") || null,
    releaseDate: new Date(String(formData.get("releaseDate") || new Date().toISOString())),
    spotifyUrl: String(formData.get("spotifyUrl") || "") || null,
    youtubeUrl: String(formData.get("youtubeUrl") || "") || null,
    appleMusicUrl: String(formData.get("appleMusicUrl") || "") || null,
    status: String(formData.get("status") || "released"),
    order: Number(formData.get("order") || 0),
  };
}

export async function createRelease(formData: FormData) {
  await requireAuth();
  await prisma.release.create({ data: releaseData(formData) });
  revalidatePath("/music");
  revalidatePath("/");
  revalidatePath("/admin/music");
  redirect("/admin/music");
}

export async function updateRelease(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.release.update({ where: { id }, data: releaseData(formData) });
  revalidatePath("/music");
  revalidatePath("/");
  revalidatePath("/admin/music");
  redirect("/admin/music");
}

export async function deleteRelease(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.release.delete({ where: { id } });
  revalidatePath("/music");
  revalidatePath("/");
  revalidatePath("/admin/music");
}
