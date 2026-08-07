"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || `post-${Date.now()}`
  );
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base;
  let counter = 1;
  while (
    await prisma.newsPost.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    slug = `${base}-${counter++}`;
  }
  return slug;
}

export async function createNewsPost(formData: FormData) {
  await requireAuth();
  const title = String(formData.get("title") || "");
  const slug = await uniqueSlug(slugify(title));

  await prisma.newsPost.create({
    data: {
      title,
      slug,
      content: String(formData.get("content") || ""),
      imageUrl: String(formData.get("imageUrl") || "") || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNewsPost(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  const title = String(formData.get("title") || "");
  const existing = await prisma.newsPost.findUniqueOrThrow({ where: { id } });
  const newSlug =
    slugify(title) === existing.slug ? existing.slug : await uniqueSlug(slugify(title), id);

  await prisma.newsPost.update({
    where: { id },
    data: {
      title,
      slug: newSlug,
      content: String(formData.get("content") || ""),
      imageUrl: String(formData.get("imageUrl") || "") || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNewsPost(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  await prisma.newsPost.delete({ where: { id } });
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}

export async function togglePublishNewsPost(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id"));
  const post = await prisma.newsPost.findUniqueOrThrow({ where: { id } });
  await prisma.newsPost.update({ where: { id }, data: { published: !post.published } });
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}
