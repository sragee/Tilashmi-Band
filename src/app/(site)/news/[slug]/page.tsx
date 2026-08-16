import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.createdAt));

  return (
    <article className="relative">
      <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16">
        <AmbientGlow />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black mb-8">
            <ArrowLeft size={15} /> Back to News
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">{dateLabel}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-gradient">
            {post.title}
          </h1>
        </div>
      </section>

      {post.imageUrl && (
        <div className="mx-auto max-w-4xl px-6 mb-12">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-surface-2">
              <ResponsiveImage src={post.imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" priority className="object-cover" />
            </div>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-6 pb-28">
        <div className="whitespace-pre-wrap text-base leading-relaxed text-black/80">
          {post.content}
        </div>
      </div>
    </article>
  );
}
