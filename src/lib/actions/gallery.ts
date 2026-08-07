"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

export async function createGalleryImage(formData: FormData) {
  await requireAuth();
  const imageUrl = String(formData.get("imageUrl") || "");
  if (!imageUrl) throw new Error("Image is required");

  await prisma.galleryImage.create({
    data: {
      imageUrl,
      category: String(formData.get("category") || "concerts"),
      caption: String(formData.get("caption") || "") || null,
      order: Number(formData.get("order") || 0),
    },
  });

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
