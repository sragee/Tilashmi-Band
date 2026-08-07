import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@tilashmi.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Tilashmi@2081";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  await prisma.heroContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      intro:
        "TILASHMI is a Gen Z Nepali band channeling divine energy into modern sound — alternative rock, pop, and fusion rock built for a generation searching for light.",
      vision:
        "To create music that feels like a spark of hope — songs that carry listeners from darkness into brightness, one chord at a time.",
      passion:
        "Every member of TILASHMI brings a different fire: raw guitar energy, soulful vocals, driving rhythm, and melodies that linger long after the last note fades.",
      journey:
        "What began as late-night jam sessions among friends in Kathmandu grew into a movement — a sound that blends Nepali roots with global alternative and pop influences.",
      meaning:
        "Tilashmi represents god-gifted divine power, spiritual energy, brightness, light, positivity, hope, and inner strength — the invisible force behind every song we write.",
      positiveMessage:
        "We don't preach — we vibrate. Our music is a reminder that positive energy is always within reach, no matter how loud the noise around you gets.",
    },
  });

  await prisma.groupPhoto.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", caption: "TILASHMI — one energy, one sound." },
  });

  const timelineCount = await prisma.timelineEvent.count();
  if (timelineCount === 0) {
    await prisma.timelineEvent.createMany({
      data: [
        { year: "2081 B.S.", title: "The Spark", description: "TILASHMI is formed in Kathmandu by a group of friends chasing one sound.", order: 1 },
        { year: "2024", title: "First Rehearsal", description: "The band's first jam session becomes the seed of their signature fusion sound.", order: 2 },
        { year: "2024", title: "Debut Single", description: "TILASHMI releases its first single, introducing their alternative-rock-meets-pop identity.", order: 3 },
        { year: "2025", title: "First Live Show", description: "TILASHMI takes the stage for the first time, igniting a growing fanbase.", order: 4 },
        { year: "2026", title: "Rising Momentum", description: "New music, new stages, and a growing community bound by positive energy.", order: 5 },
      ],
    });
  }

  const memberCount = await prisma.member.count();
  if (memberCount === 0) {
    await prisma.member.createMany({
      data: [
        { name: "Member Name", role: "Vocalist", bio: "Voice and energy of TILASHMI, carrying every lyric with raw emotion.", order: 1 },
        { name: "Member Name", role: "Guitarist", bio: "Crafts the riffs and textures that define the band's alternative-rock edge.", order: 2 },
        { name: "Member Name", role: "Bassist", bio: "The pulse beneath every track, holding the groove together.", order: 3 },
        { name: "Member Name", role: "Drummer", bio: "Drives the rhythm and energy behind every live performance.", order: 4 },
        { name: "Member Name", role: "Keyboardist", bio: "Adds atmosphere and melody, blending fusion tones into the mix.", order: 5 },
      ],
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${adminEmail} / password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
