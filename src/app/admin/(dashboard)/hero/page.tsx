import { PageHeader } from "@/components/admin/PageHeader";
import { TextField, TextAreaField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { OpacitySlider } from "@/components/admin/OpacitySlider";
import { SaveButton } from "@/components/admin/SaveButton";
import { getHero } from "@/lib/data";
import { updateHero } from "@/lib/actions/hero";

export default async function AdminHeroPage() {
  const hero = await getHero();

  return (
    <div>
      <PageHeader title="Hero Section" description="The first thing every visitor sees." />
      <form action={updateHero} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
        <TextField label="Heading" name="heading" defaultValue={hero.heading} required />
        <TextAreaField label="Subtitle" name="subtitle" defaultValue={hero.subtitle} rows={2} />
        <ImageUpload
          name="backgroundImageUrl"
          defaultValue={hero.backgroundImageUrl}
          label="Banner Photo (band group photo shown behind the logo)"
        />
        <OpacitySlider name="backgroundOpacity" defaultValue={hero.backgroundOpacity} />
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-black/45">
            Background Video URL (optional, overrides image)
          </label>
          <input
            type="text"
            name="backgroundVideoUrl"
            defaultValue={hero.backgroundVideoUrl || ""}
            placeholder="/uploads/hero.mp4 or external URL"
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black outline-none focus:border-black/30"
          />
        </div>
        <SaveButton />
      </form>
    </div>
  );
}
