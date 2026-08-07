import { MapPin, Ticket } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Event = {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: Date;
  ticketUrl?: string | null;
  description?: string | null;
};

export function EventRow({ event, delay = 0, past = false }: { event: Event; delay?: number; past?: boolean }) {
  const d = new Date(event.date);
  const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(d);

  return (
    <Reveal delay={delay}>
      <div
        className={`group flex flex-col sm:flex-row sm:items-center gap-6 rounded-2xl glass p-6 transition-colors duration-300 hover:bg-black/[0.04] ${
          past ? "opacity-60" : ""
        }`}
      >
        <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-black/10 bg-black/5 px-5 py-3 text-center">
          <span className="font-display text-2xl leading-none text-black">{day}</span>
          <span className="mt-1 text-[11px] uppercase tracking-widest text-muted">{month} {year}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl text-black">{event.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} /> {event.venue}, {event.city}
          </p>
        </div>
        {!past && event.ticketUrl && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2.5 text-sm text-black transition-colors hover:bg-black hover:text-white"
          >
            <Ticket size={15} /> Book Tickets
          </a>
        )}
      </div>
    </Reveal>
  );
}
