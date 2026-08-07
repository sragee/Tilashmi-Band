"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

function memberData(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    bio: String(formData.get("bio") || ""),
    photoUrl: String(formData.get("photoUrl") || "") || null,
    instagram: String(formData.get("instagram") || "") || null,
    facebook: String(formData.get("facebook") || "") || null,
    youtube: String(formData.get("youtube") || "") || null,
    tiktok: String(formData.get("tiktok") || "") || null,
    order: Number(formData.get("order") || 0),
  };
}

export async function createMember(formData: FormData) {
  await requireAuth();
  await prisma.member.create({ data: memberData(formData) });
  revalidatePath("/members");
  revalidatePath("/");
  revalidatePath("/admin/members");
  redirect("/admin/members");
}

export async function updateMember(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.member.update({ where: { id }, data: memberData(formData) });
  revalidatePath("/members");
  revalidatePath("/");
  revalidatePath("/admin/members");
  redirect("/admin/members");
}

export async function deleteMember(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.member.delete({ where: { id } });
  revalidatePath("/members");
  revalidatePath("/");
  revalidatePath("/admin/members");
}
