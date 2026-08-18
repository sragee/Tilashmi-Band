import { ReactNode } from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { PageTransition } from "@/components/layout/PageTransition";
import { BackgroundAudio } from "@/components/layout/BackgroundAudio";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.siteTitle,
      template: `%s | TILASHMI`,
    },
    description: settings.siteDescription,
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    openGraph: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      siteName: "TILASHMI",
      images: settings.logoUrl ? [settings.logoUrl] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteTitle,
      description: settings.siteDescription,
    },
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar logoUrl={settings.logoUrl} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer
        logoUrl={settings.logoUrl}
        footerText={settings.footerText}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        socials={{
          facebookUrl: settings.facebookUrl,
          instagramUrl: settings.instagramUrl,
          youtubeUrl: settings.youtubeUrl,
          spotifyUrl: settings.spotifyUrl,
          tiktokUrl: settings.tiktokUrl,
        }}
      />
      <BackgroundAudio backgroundMusicUrl={settings.backgroundMusicUrl} />
      <ScrollToTop />
    </>
  );
}
