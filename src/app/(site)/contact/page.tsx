import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book TILASHMI for live performances, concerts, collaborations, festivals, private and college events.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappHref = `https://wa.me/${settings.contactWhatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20">
        <AmbientGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Let&apos;s Connect</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-gradient">
            Contact Us
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Contact us for live performances, concerts, collaborations, festivals, private
            events, college events, and bookings.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-10 pb-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-4 rounded-2xl glass p-6 transition-colors hover:bg-black/[0.04]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/8">
                <Mail size={19} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-black/60">Email</p>
                <p className="text-sm text-black mt-0.5">{settings.contactEmail}</p>
              </div>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl glass p-6 transition-colors hover:bg-black/[0.04]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/8">
                <WhatsappIcon size={19} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-black/60">WhatsApp</p>
                <p className="text-sm text-black mt-0.5">{settings.contactWhatsapp}</p>
              </div>
            </a>

            <a
              href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-2xl glass p-6 transition-colors hover:bg-black/[0.04]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/8">
                <Phone size={19} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-black/60">Call</p>
                <p className="text-sm text-black mt-0.5">{settings.contactPhone}</p>
              </div>
            </a>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
