import { Reveal } from "@/components/ui/Reveal";

type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) return null;
  return (
    <div className="relative mt-10">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-black/25 via-black/10 to-transparent md:left-1/2" />
      <div className="space-y-10 md:space-y-14">
        {events.map((e, i) => {
          const leftSide = i % 2 === 0;
          return (
            <div
              key={e.id}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                leftSide ? "" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 h-3 w-3 rounded-full bg-black shadow-[0_0_14px_rgba(0,0,0,0.35)]`}
              />
              <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${leftSide ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
                <Reveal delay={i * 0.05}>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{e.year}</p>
                  <h3 className="font-display text-xl md:text-2xl text-black">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed max-w-md md:ml-auto">
                    {e.description}
                  </p>
                </Reveal>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
