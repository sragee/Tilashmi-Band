import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReleaseCard } from "@/components/sections/ReleaseCard";

type Release = Parameters<typeof ReleaseCard>[0]["release"];

export function MusicTeaser({ releases }: { releases: Release[] }) {
  if (releases.length === 0) return null;
  return (
    <Section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
        <SectionHeading eyebrow="Latest Sound" title="Music" />
        <Button href="/music" variant="ghost">
          Explore Discography
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {releases.slice(0, 4).map((r, i) => (
          <ReleaseCard key={r.id} release={r} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  );
}
