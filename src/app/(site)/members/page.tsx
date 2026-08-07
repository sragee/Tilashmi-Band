import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { MemberCard } from "@/components/sections/MemberCard";
import { GroupPhoto } from "@/components/sections/GroupPhoto";
import { getMembers, getGroupPhoto } from "@/lib/data";

export const metadata: Metadata = {
  title: "Band Members",
  description: "Meet the members of TILASHMI — vocalist, guitarist, bassist, drummer, and keyboardist.",
};

export default async function MembersPage() {
  const [members, groupPhoto] = await Promise.all([getMembers(), getGroupPhoto()]);

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>The Collective</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            Band Members
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Five voices, one energy. Every member of TILASHMI brings a distinct fire to a shared
            sound.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <MemberCard key={m.id} member={m} delay={i * 0.06} />
          ))}
        </div>
        {members.length === 0 && (
          <p className="text-center text-muted py-20">Band members will appear here soon.</p>
        )}
      </div>

      <GroupPhoto imageUrl={groupPhoto.imageUrl} caption={groupPhoto.caption} />
    </>
  );
}
