import type { Metadata } from "next";
import { Eyebrow, SectionHeading, Section } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { ReleaseCard } from "@/components/sections/ReleaseCard";
import { getReleases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Music",
  description: "Listen to albums, singles and upcoming releases from TILASHMI on Spotify, YouTube and Apple Music.",
};

export default async function MusicPage() {
  const releases = await getReleases();
  const albums = releases.filter((r) => r.type === "album");
  const singles = releases.filter((r) => r.type === "single");
  const upcoming = releases.filter((r) => r.status === "upcoming");

  const groups = [
    { title: "Upcoming Releases", eyebrow: "Coming Soon", items: upcoming },
    { title: "Albums", eyebrow: "Full Length", items: albums },
    { title: "Singles", eyebrow: "Tracks", items: singles },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Sound of Light</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            Music
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Alternative rock, pop and fusion rock — stream TILASHMI wherever you listen.
          </p>
        </div>
      </section>

      {releases.length === 0 && (
        <Section>
          <p className="text-center text-muted py-16">New music is on the way. Stay tuned.</p>
        </Section>
      )}

      {groups.map(
        (g) =>
          g.items.length > 0 && (
            <Section key={g.title}>
              <SectionHeading eyebrow={g.eyebrow} title={g.title} />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map((r, i) => (
                  <ReleaseCard key={r.id} release={r} delay={i * 0.06} />
                ))}
              </div>
            </Section>
          )
      )}
    </>
  );
}
