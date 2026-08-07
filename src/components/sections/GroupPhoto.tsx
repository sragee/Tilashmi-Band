import { Reveal } from "@/components/ui/Reveal";

export function GroupPhoto({ imageUrl, caption }: { imageUrl?: string | null; caption?: string | null }) {
  return (
    <section className="relative">
      <Reveal>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface-2">
          {imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="TILASHMI band group photo" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#f2f1ee_0%,_#ffffff_80%)]">
              <span className="font-display text-4xl md:text-6xl tracking-widest text-black/10">
                TILASHMI
              </span>
            </div>
          )}
        </div>
      </Reveal>
      {caption && (
        <p className="text-center text-sm text-muted py-6 tracking-wide">{caption}</p>
      )}
    </section>
  );
}
