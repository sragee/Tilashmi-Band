import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles } from "lucide-react";

export function AboutTeaser({
  intro,
  establishedBS,
  establishedAD,
}: {
  intro: string;
  establishedBS: string;
  establishedAD: string;
}) {
  return (
    <Section className="relative">
      <div className="aura w-[400px] h-[400px] -left-40 top-0" />
      <div className="grid gap-12 md:grid-cols-2 md:items-center relative">
        <Reveal>
          <Eyebrow>The Meaning</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-gradient max-w-lg">
            Music blessed with divine energy
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-lg">
            {intro}
          </p>
          <div className="mt-8">
            <Button href="/about" variant="ghost">
              Discover Our Story
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="aura-accent w-[240px] h-[240px] -top-20 -right-20" />
            <Sparkles className="text-accent mb-6" size={28} />
            <p className="text-sm uppercase tracking-[0.3em] text-black/40 mb-2">Established</p>
            <p className="font-display text-4xl md:text-5xl text-black mb-1">{establishedBS}</p>
            <p className="text-sm text-muted">({establishedAD})</p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-black/10 pt-6">
              <div>
                <p className="font-display text-2xl">05+</p>
                <p className="text-xs text-muted mt-1">Members</p>
              </div>
              <div>
                <p className="font-display text-2xl">3</p>
                <p className="text-xs text-muted mt-1">Genres</p>
              </div>
              <div>
                <p className="font-display text-2xl">∞</p>
                <p className="text-xs text-muted mt-1">Energy</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
