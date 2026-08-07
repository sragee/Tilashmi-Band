import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { GalleryMasonry } from "@/components/sections/GalleryMasonry";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Concerts, rehearsals, behind-the-scenes and studio sessions from TILASHMI.",
};

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Captured Moments</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            Gallery
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Concerts, rehearsals, behind-the-scenes and studio sessions — glimpses into the world
            of TILASHMI.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <GalleryMasonry images={images} />
      </div>
    </>
  );
}
