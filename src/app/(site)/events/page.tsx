import type { Metadata } from "next";
import { Eyebrow, SectionHeading, Section } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { EventRow } from "@/components/sections/EventRow";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past shows from TILASHMI — dates, venues and cities.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now).reverse();

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>On Stage</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            Events
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Catch TILASHMI live — concerts, festivals, college events and private shows.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Don't Miss" title="Upcoming Shows" />
        <div className="mt-10 space-y-4">
          {upcoming.length === 0 && (
            <p className="text-muted">No upcoming shows announced yet — check back soon.</p>
          )}
          {upcoming.map((e, i) => (
            <EventRow key={e.id} event={e} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      {past.length > 0 && (
        <Section className="bg-surface/40">
          <SectionHeading eyebrow="The Archive" title="Past Shows" />
          <div className="mt-10 space-y-4">
            {past.map((e, i) => (
              <EventRow key={e.id} event={e} delay={i * 0.04} past />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
