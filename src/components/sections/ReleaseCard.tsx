import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { Play, Music } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SpotifyIcon, YoutubeIcon, AppleMusicIcon } from "@/components/ui/SocialIcons";

type Release = {
  id: string;
  title: string;
  type: string;
  coverImageUrl?: string | null;
  releaseDate: Date;
  spotifyUrl?: string | null;
  youtubeUrl?: string | null;
  appleMusicUrl?: string | null;
  status: string;
};

export function ReleaseCard({ release, delay = 0 }: { release: Release; delay?: number }) {
  const primaryLink = release.spotifyUrl || release.youtubeUrl || release.appleMusicUrl;
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(release.releaseDate));

  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-3xl glass">
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          {release.coverImageUrl ? (
            <ResponsiveImage
              src={release.coverImageUrl}
              alt={release.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle,_#1a1a1a,_#000)]">
              <Music className="text-white/15" size={48} />
            </div>
          )}
          {release.status === "upcoming" && (
            <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-accent">
              Upcoming
            </span>
          )}
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Play ${release.title}`}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <Play size={22} fill="currentColor" />
              </span>
            </a>
          )}
        </div>
        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-black/60">{release.type}</p>
          <h3 className="mt-1 font-display text-lg text-black truncate">{release.title}</h3>
          <p className="mt-1 text-xs text-muted">{dateLabel}</p>
          <div className="mt-4 flex items-center gap-3">
            {release.spotifyUrl && (
              <a href={release.spotifyUrl} target="_blank" rel="noreferrer" className="text-black/60 hover:text-black" aria-label="Listen on Spotify">
                <SpotifyIcon size={16} />
              </a>
            )}
            {release.youtubeUrl && (
              <a href={release.youtubeUrl} target="_blank" rel="noreferrer" className="text-black/60 hover:text-black" aria-label="Watch on YouTube">
                <YoutubeIcon size={16} />
              </a>
            )}
            {release.appleMusicUrl && (
              <a href={release.appleMusicUrl} target="_blank" rel="noreferrer" className="text-black/60 hover:text-black" aria-label="Listen on Apple Music">
                <AppleMusicIcon size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
