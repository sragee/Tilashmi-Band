import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, FacebookIcon, YoutubeIcon, SpotifyIcon } from "@/components/ui/SocialIcons";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/gallery", label: "Gallery" },
  { href: "/music", label: "Music" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Footer({
  logoUrl,
  footerText,
  contactEmail,
  contactPhone,
  socials,
}: {
  logoUrl?: string | null;
  footerText: string;
  contactEmail: string;
  contactPhone: string;
  socials: {
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    youtubeUrl?: string | null;
    spotifyUrl?: string | null;
    tiktokUrl?: string | null;
  };
}) {
  return (
    <footer className="relative border-t border-black/8 bg-[#fafaf8]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aura w-[500px] h-[300px] -bottom-40 left-1/4" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <Logo logoUrl={logoUrl} size={40} />
          <p className="mt-5 text-sm text-muted leading-relaxed max-w-xs">
            Music blessed with divine energy. Alternative rock, pop &amp; fusion rock from
            Nepal — est. 2081 B.S. (2024 A.D.).
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-black/45 mb-5">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-black transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-black/45 mb-5">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Mail size={15} /> <a href={`mailto:${contactEmail}`} className="hover:text-black">{contactEmail}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} /> <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="hover:text-black">{contactPhone}</a>
            </li>
          </ul>
          <div className="flex items-center gap-4 mt-6">
            {socials.instagramUrl && (
              <a href={socials.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-black/50 hover:text-black transition-colors">
                <InstagramIcon size={19} />
              </a>
            )}
            {socials.facebookUrl && (
              <a href={socials.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-black/50 hover:text-black transition-colors">
                <FacebookIcon size={19} />
              </a>
            )}
            {socials.youtubeUrl && (
              <a href={socials.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-black/50 hover:text-black transition-colors">
                <YoutubeIcon size={19} />
              </a>
            )}
            {socials.spotifyUrl && (
              <a href={socials.spotifyUrl} target="_blank" rel="noreferrer" aria-label="Spotify" className="text-black/50 hover:text-black transition-colors">
                <SpotifyIcon size={19} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative border-t border-black/8 py-6">
        <p className="text-center text-xs text-black/35 tracking-wide">{footerText}</p>
      </div>
    </footer>
  );
}
