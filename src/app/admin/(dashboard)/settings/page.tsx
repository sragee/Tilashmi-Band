import { PageHeader } from "@/components/admin/PageHeader";
import { TextField, TextAreaField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";
import { getSiteSettings } from "@/lib/data";
import { updateSettings } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHeader title="Website Settings" description="Branding, contact details, SEO and social links." />
      <form action={updateSettings} className="max-w-2xl space-y-10">
        <div className="space-y-6 rounded-3xl glass p-8">
          <p className="text-sm text-black/65 font-medium">Branding</p>
          <ImageUpload name="logoUrl" defaultValue={settings.logoUrl} label="Logo" />
          <ImageUpload name="faviconUrl" defaultValue={settings.faviconUrl} label="Favicon" />
        </div>

        <div className="space-y-6 rounded-3xl glass p-8">
          <p className="text-sm text-black/65 font-medium">SEO Metadata</p>
          <TextField label="Site Title" name="siteTitle" defaultValue={settings.siteTitle} />
          <TextAreaField label="Site Description" name="siteDescription" defaultValue={settings.siteDescription} rows={3} />
        </div>

        <div className="space-y-6 rounded-3xl glass p-8">
          <p className="text-sm text-black/65 font-medium">Contact Details</p>
          <TextField label="Contact Email" name="contactEmail" defaultValue={settings.contactEmail} />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Phone" name="contactPhone" defaultValue={settings.contactPhone} />
            <TextField label="WhatsApp" name="contactWhatsapp" defaultValue={settings.contactWhatsapp} />
          </div>
        </div>

        <div className="space-y-6 rounded-3xl glass p-8">
          <p className="text-sm text-black/65 font-medium">Social Links</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Instagram" name="instagramUrl" defaultValue={settings.instagramUrl || ""} />
            <TextField label="Facebook" name="facebookUrl" defaultValue={settings.facebookUrl || ""} />
            <TextField label="YouTube" name="youtubeUrl" defaultValue={settings.youtubeUrl || ""} />
            <TextField label="Spotify" name="spotifyUrl" defaultValue={settings.spotifyUrl || ""} />
            <TextField label="TikTok" name="tiktokUrl" defaultValue={settings.tiktokUrl || ""} />
            <TextField label="Apple Music" name="appleMusicUrl" defaultValue={settings.appleMusicUrl || ""} />
          </div>
        </div>

        <div className="space-y-6 rounded-3xl glass p-8">
          <p className="text-sm text-black/65 font-medium">Footer</p>
          <TextField label="Footer Text" name="footerText" defaultValue={settings.footerText} />
        </div>

        <SaveButton />
      </form>
    </div>
  );
}
