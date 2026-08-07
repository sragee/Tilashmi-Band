"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
  id: string;
  imageUrl: string;
  category: string;
  caption?: string | null;
};

const categories = [
  { value: "all", label: "All" },
  { value: "concerts", label: "Concerts" },
  { value: "rehearsals", label: "Rehearsals" },
  { value: "bts", label: "Behind the Scenes" },
  { value: "studio", label: "Studio Sessions" },
];

export function GalleryMasonry({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.category === filter)),
    [images, filter]
  );

  const closeLightbox = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, filtered.length]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            aria-pressed={filter === c.value}
            className={`min-h-11 rounded-full px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-300 ${
              filter === c.value
                ? "bg-black text-white"
                : "border border-black/15 text-black/55 hover:text-black hover:border-black/30"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted py-20">No images in this category yet.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className="mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl glass group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.imageUrl}
                alt={img.caption || "TILASHMI gallery photo"}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {activeIndex !== null && filtered[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 backdrop-blur-md p-4 safe-top safe-bottom"
            onClick={closeLightbox}
          >
            <button
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center text-white/70 hover:text-white"
            >
              <X size={26} />
            </button>
            <button
              aria-label="Previous image"
              disabled={filtered.length < 2}
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-1 sm:left-4 md:left-8 flex h-12 w-12 items-center justify-center text-white/60 hover:text-white disabled:opacity-0"
            >
              <ChevronLeft size={30} />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl max-h-[85dvh] flex flex-col items-center px-10 sm:px-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[activeIndex].imageUrl}
                alt={filtered[activeIndex].caption || "TILASHMI gallery photo"}
                className="max-h-[70dvh] w-auto rounded-xl object-contain"
              />
              {filtered[activeIndex].caption && (
                <p className="mt-4 text-sm text-white/60 text-center">{filtered[activeIndex].caption}</p>
              )}
            </motion.div>
            <button
              aria-label="Next image"
              disabled={filtered.length < 2}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-1 sm:right-4 md:right-8 flex h-12 w-12 items-center justify-center text-white/60 hover:text-white disabled:opacity-0"
            >
              <ChevronRight size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
