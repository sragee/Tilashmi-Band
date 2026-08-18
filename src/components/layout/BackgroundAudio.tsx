"use client";

import { useMemo, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

function getYoutubeVideoId(url?: string | null) {
  if (!url) return "civuoU_NE38";

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.replace("/", "") || "civuoU_NE38";
    if (parsed.hostname.includes("youtube.com")) {
      const video = parsed.searchParams.get("v");
      if (video) return video;
      const short = parsed.pathname.match(/\/shorts\/(.+)/)?.[1];
      if (short) return short;
      const embed = parsed.pathname.match(/\/embed\/(.+)/)?.[1];
      if (embed) return embed;
    }
  } catch {
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/) || url.match(/\/embed\/([^?&]+)/);
    if (match?.[1]) return match[1];
  }

  return "civuoU_NE38";
}

export function BackgroundAudio({ backgroundMusicUrl }: { backgroundMusicUrl?: string | null }) {
  const [muted, setMuted] = useState(true);
  const videoId = useMemo(() => getYoutubeVideoId(backgroundMusicUrl), [backgroundMusicUrl]);

  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`,
    [muted, videoId],
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <div className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <iframe
          src={embedUrl}
          title="Background track"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
        />
      </div>

      <button
        type="button"
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        onClick={() => setMuted((value) => !value)}
        className="glass-strong flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-medium text-black shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-[1.02]"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        <span className="hidden sm:inline">{muted ? "Muted" : "Music on"}</span>
      </button>
    </div>
  );
}
