"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

export async function markMessageRead(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
