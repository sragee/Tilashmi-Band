"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function updateGroupPhoto(formData: FormData) {
  if (!(await getSession())) throw new Error("Unauthorized");

  const imageUrl = String(formData.get("imageUrl") || "") || null;
  const caption = String(formData.get("caption") || "") || null;

  await prisma.groupPhoto.upsert({
    where: { id: "singleton" },
    update: { imageUrl, caption },
    create: { id: "singleton", imageUrl, caption },
  });

  revalidatePath("/members");
  revalidatePath("/admin/group-photo");
}
