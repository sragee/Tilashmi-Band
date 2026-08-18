"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [muted, setMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoId = useMemo(() => getYoutubeVideoId(backgroundMusicUrl), [backgroundMusicUrl]);

  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`,
    [muted, videoId],
  );

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    const tryPlay = () => {
      if (!frame.contentWindow) return;
      frame.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*",
      );
    };

    const timer = window.setTimeout(tryPlay, 1500);
    return () => window.clearTimeout(timer);
  }, [embedUrl]);

  const handleIframeLoad = () => {
    const frame = iframeRef.current;
    if (!frame || !frame.contentWindow) return;

    frame.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*",
    );
  };

  return (
    <div className="fixed bottom-3 right-3 z-50 flex items-center gap-2 sm:bottom-5 sm:right-5">
      <div className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="Background track"
          onLoad={handleIframeLoad}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
        />
      </div>

      <button
        type="button"
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        onClick={() => setMuted((value) => !value)}
        className="glass-strong flex items-center justify-center gap-1.5 rounded-full px-2.5 py-2.5 text-black shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:gap-2 sm:px-3.5 sm:text-sm touch-manipulation"
      >
        {muted ? <VolumeX size={16} className="sm:h-[18px] sm:w-[18px]" /> : <Volume2 size={16} className="sm:h-[18px] sm:w-[18px]" />}
        <span className="hidden text-[11px] font-medium sm:inline sm:text-sm">{muted ? "Mute" : "Unmute"}</span>
      </button>
    </div>
  );
}
