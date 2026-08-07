import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EventRow } from "@/components/sections/EventRow";

type Event = Parameters<typeof EventRow>[0]["event"];

export function EventsTeaser({ events }: { events: Event[] }) {
  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  if (upcoming.length === 0) return null;

  return (
    <Section className="bg-surface/40">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
        <SectionHeading eyebrow="Live" title="Upcoming Shows" />
        <Button href="/events" variant="ghost">
          All Events
        </Button>
      </div>
      <div className="space-y-4">
        {upcoming.slice(0, 3).map((e, i) => (
          <EventRow key={e.id} event={e} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  );
}
