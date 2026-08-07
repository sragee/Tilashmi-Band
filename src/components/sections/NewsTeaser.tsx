import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/sections/NewsCard";

type Post = Parameters<typeof NewsCard>[0]["post"];

export function NewsTeaser({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <Section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
        <SectionHeading eyebrow="Stay in the Loop" title="News & Updates" />
        <Button href="/news" variant="ghost">
          All Updates
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <NewsCard key={p.id} post={p} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  );
}
