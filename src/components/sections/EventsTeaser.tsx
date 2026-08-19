import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EventRow } from "@/components/sections/EventRow";

type Event = Parameters<typeof EventRow>[0]["event"];

export function EventsTeaser({ events }: { events: Event[] }) {
  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  if (upcoming.length === 0) return null;

  return (
    <Section className="bg-surface/40">
      <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
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
