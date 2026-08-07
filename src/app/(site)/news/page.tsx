import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { NewsCard } from "@/components/sections/NewsCard";
import { getPublishedNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Announcements, photos and updates from TILASHMI.",
};

export default async function NewsPage() {
  const posts = await getPublishedNews();

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Stay in the Loop</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            News & Updates
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Announcements, photos and everything happening around TILASHMI.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-muted py-16">No updates published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <NewsCard key={p.id} post={p} delay={i * 0.06} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
