import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MemberCard } from "@/components/sections/MemberCard";

type Member = Parameters<typeof MemberCard>[0]["member"];

export function MembersTeaser({ members }: { members: Member[] }) {
  if (members.length === 0) return null;
  return (
    <Section className="bg-surface/40">
      <SectionHeading eyebrow="The Collective" title="Meet the Band" align="center" />
      <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.slice(0, 4).map((m, i) => (
          <MemberCard key={m.id} member={m} delay={i * 0.08} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button href="/members" variant="ghost">
          View All Members
        </Button>
      </div>
    </Section>
  );
}
