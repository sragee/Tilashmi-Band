"use client";

import { motion } from "framer-motion";
import { PlayCircle, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { Particles } from "@/components/ui/Particles";

export function Hero({
  heading,
  subtitle,
  backgroundImageUrl,
  backgroundVideoUrl,
  backgroundOpacity = 30,
}: {
  heading: string;
  subtitle: string;
  backgroundImageUrl?: string | null;
  backgroundVideoUrl?: string | null;
  backgroundOpacity?: number;
}) {
  const mediaOpacity = Math.min(100, Math.max(0, backgroundOpacity)) / 100;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        {backgroundVideoUrl ? (
          <video
            className="h-full w-full object-cover"
            style={{ opacity: mediaOpacity }}
            src={backgroundVideoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : backgroundImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={backgroundImageUrl}
            alt="TILASHMI band"
            className="h-full w-full object-cover"
            style={{ opacity: mediaOpacity }}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_#f2f1ee_0%,_#ffffff_75%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-background" />
      </div>

      <AmbientGlow variant="hero" />
      <Particles count={70} />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-accent/90"
        >
          Alternative Rock &middot; Pop &middot; Fusion Rock
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label={heading}
          className="animate-float w-[78vw] max-w-[240px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[680px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-auto w-full object-contain" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-black/60 font-light"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button href="/music" variant="primary">
            <PlayCircle size={18} /> Listen Now
          </Button>
          <Button href="/contact" variant="secondary">
            <CalendarCheck size={18} /> Book the Band
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-black/40 to-transparent" />
      </motion.div>
    </section>
  );
}
