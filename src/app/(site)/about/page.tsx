import type { Metadata } from "next";
import { Sparkles, Heart, Compass, Sun } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/sections/Timeline";
import { getAbout, getTimeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "The story, vision, and meaning behind TILASHMI — a Nepali band built on divine energy and modern sound.",
};

export default async function AboutPage() {
  const [about, timeline] = await Promise.all([getAbout(), getTimeline()]);

  const pillars = [
    { icon: Compass, label: "Vision", text: about.vision },
    { icon: Heart, label: "Passion", text: about.passion },
    { icon: Sun, label: "Journey", text: about.journey },
    { icon: Sparkles, label: "Positive Message", text: about.positiveMessage },
  ].filter((p) => p.text);

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-24">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            The Meaning Behind TILASHMI
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            {about.intro}
          </p>
        </div>
      </section>

      <Section>
        <div className="glass rounded-3xl p-8 md:p-14 relative overflow-hidden text-center">
          <div className="aura w-[400px] h-[400px] left-1/2 top-0 -translate-x-1/2" />
          <p className="text-xs uppercase tracking-[0.35em] text-accent mb-4">Tilashmi Means</p>
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-black max-w-3xl mx-auto">
            {about.meaning}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.25em] text-black/45">
            {["Divine Power", "Spiritual Energy", "Brightness", "Light", "Positivity", "Hope", "Inner Strength"].map((w) => (
              <span key={w} className="rounded-full border border-black/10 px-4 py-2">
                {w}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {pillars.length > 0 && (
        <Section className="bg-surface/40">
          <SectionHeading eyebrow="What Drives Us" title="Vision & Passion" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div className="glass rounded-3xl p-8 h-full">
                  <p.icon className="text-accent mb-5" size={26} />
                  <h3 className="font-display text-xl text-black mb-3">{p.label}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading eyebrow="Since" title="Our Journey" align="center" />
        <div className="mt-2 text-center">
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            Established <span className="text-black font-medium">{about.establishedBS}</span>
            <span className="text-black/30">/</span>
            <span className="text-black font-medium">{about.establishedAD}</span>
          </span>
        </div>
        <Timeline events={timeline} />
      </Section>
    </>
  );
}
