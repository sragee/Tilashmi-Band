import Link from "next/link";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
};

export function NewsCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.createdAt));

  const excerpt = post.content.replace(/\s+/g, " ").slice(0, 120);

  return (
    <Reveal delay={delay}>
      <Link href={`/news/${post.slug}`} className="group block overflow-hidden rounded-3xl glass">
        <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
          {post.imageUrl ? (
            <ResponsiveImage
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle,#1a1a1a,#000)]">
              <span className="font-display text-3xl text-white/10">TILASHMI</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-xs text-muted">{dateLabel}</p>
          <h3 className="mt-2 font-display text-lg sm:text-xl text-black flex items-start justify-between gap-2">
            {post.title}
            <ArrowUpRight size={18} className="mt-1 shrink-0 text-black/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black" />
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed line-clamp-2">{excerpt}&hellip;</p>
        </div>
      </Link>
    </Reveal>
  );
}
