"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

function eventData(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    venue: String(formData.get("venue") || ""),
    city: String(formData.get("city") || ""),
    date: new Date(String(formData.get("date") || new Date().toISOString())),
    description: String(formData.get("description") || "") || null,
    ticketUrl: String(formData.get("ticketUrl") || "") || null,
    posterUrl: String(formData.get("posterUrl") || "") || null,
  };
}

export async function createEvent(formData: FormData) {
  await requireAuth();
  await prisma.event.create({ data: eventData(formData) });
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.event.update({ where: { id }, data: eventData(formData) });
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.event.delete({ where: { id } });
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
}
