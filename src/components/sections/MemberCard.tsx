import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
};

export function MemberCard({ member, delay = 0 }: { member: Member; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-3xl glass">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
          {member.photoUrl ? (
            <ResponsiveImage
              src={member.photoUrl}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-6xl text-black/10">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-1">{member.role}</p>
            <h3 className="font-display text-2xl text-white">{member.name}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted leading-relaxed line-clamp-3">{member.bio}</p>
          <div className="mt-4 flex items-center gap-4">
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noreferrer" className="text-black/60 hover:text-black transition-colors" aria-label={`${member.name} on Instagram`}>
                <InstagramIcon size={17} />
              </a>
            )}
            {member.facebook && (
              <a href={member.facebook} target="_blank" rel="noreferrer" className="text-black/60 hover:text-black transition-colors" aria-label={`${member.name} on Facebook`}>
                <FacebookIcon size={17} />
              </a>
            )}
            {member.youtube && (
              <a href={member.youtube} target="_blank" rel="noreferrer" className="text-black/60 hover:text-black transition-colors" aria-label={`${member.name} on YouTube`}>
                <YoutubeIcon size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
