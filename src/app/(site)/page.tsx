import { Hero } from "@/components/sections/Hero";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { MembersTeaser } from "@/components/sections/MembersTeaser";
import { GroupPhoto } from "@/components/sections/GroupPhoto";
import { MusicTeaser } from "@/components/sections/MusicTeaser";
import { EventsTeaser } from "@/components/sections/EventsTeaser";
import { NewsTeaser } from "@/components/sections/NewsTeaser";
import {
  getHero,
  getAbout,
  getMembers,
  getGroupPhoto,
  getReleases,
  getEvents,
  getPublishedNews,
} from "@/lib/data";

export default async function HomePage() {
  const [hero, about, members, groupPhoto, releases, events, news] = await Promise.all([
    getHero(),
    getAbout(),
    getMembers(),
    getGroupPhoto(),
    getReleases(),
    getEvents(),
    getPublishedNews(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "TILASHMI",
    genre: ["Alternative Rock", "Pop", "Fusion Rock"],
    foundingDate: "2024",
    description:
      "TILASHMI is a Nepali alternative rock, pop and fusion rock band, established 2081 B.S. (2024 A.D.).",
    member: members.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        heading={hero.heading}
        subtitle={hero.subtitle}
        backgroundImageUrl={hero.backgroundImageUrl}
        backgroundVideoUrl={hero.backgroundVideoUrl}
        backgroundOpacity={hero.backgroundOpacity}
      />
      <AboutTeaser
        intro={about.intro}
        establishedBS={about.establishedBS}
        establishedAD={about.establishedAD}
      />
      <MembersTeaser members={members} />
      <GroupPhoto imageUrl={groupPhoto.imageUrl} caption={groupPhoto.caption} />
      <MusicTeaser releases={releases} />
      <EventsTeaser events={events} />
      <NewsTeaser posts={news} />
    </>
  );
}
