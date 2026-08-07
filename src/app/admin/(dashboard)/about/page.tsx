import { PageHeader } from "@/components/admin/PageHeader";
import { TextField, TextAreaField } from "@/components/admin/Field";
import { SaveButton } from "@/components/admin/SaveButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAbout, getTimeline } from "@/lib/data";
import {
  updateAbout,
  createTimelineEvent,
  deleteTimelineEvent,
} from "@/lib/actions/about";

export default async function AdminAboutPage() {
  const [about, timeline] = await Promise.all([getAbout(), getTimeline()]);

  return (
    <div className="space-y-10">
      <div>
        <PageHeader title="About Page" description="Tell the TILASHMI story." />
        <form action={updateAbout} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
          <TextAreaField label="Intro" name="intro" defaultValue={about.intro} rows={3} />
          <TextAreaField label="Vision" name="vision" defaultValue={about.vision} rows={3} />
          <TextAreaField label="Passion" name="passion" defaultValue={about.passion} rows={3} />
          <TextAreaField label="Journey" name="journey" defaultValue={about.journey} rows={3} />
          <TextAreaField label="Meaning of Tilashmi" name="meaning" defaultValue={about.meaning} rows={3} />
          <TextAreaField
            label="Positive Message"
            name="positiveMessage"
            defaultValue={about.positiveMessage}
            rows={3}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Established (B.S.)" name="establishedBS" defaultValue={about.establishedBS} />
            <TextField label="Established (A.D.)" name="establishedAD" defaultValue={about.establishedAD} />
          </div>
          <SaveButton />
        </form>
      </div>

      <div>
        <PageHeader title="Timeline" description="The band's journey over time." />
        <div className="max-w-2xl space-y-3 mb-8">
          {timeline.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-4 rounded-2xl glass p-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent">{t.year}</p>
                <p className="font-display text-lg text-black mt-1">{t.title}</p>
                <p className="text-sm text-muted mt-1">{t.description}</p>
              </div>
              <form action={deleteTimelineEvent}>
                <input type="hidden" name="id" value={t.id} />
                <DeleteButton confirmText="Remove this timeline entry?" />
              </form>
            </div>
          ))}
          {timeline.length === 0 && <p className="text-muted text-sm">No timeline entries yet.</p>}
        </div>

        <form action={createTimelineEvent} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
          <p className="text-sm text-black/65 font-medium">Add Timeline Entry</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Year" name="year" placeholder="2081 B.S." required />
            <TextField label="Order" name="order" type="number" defaultValue={timeline.length + 1} />
          </div>
          <TextField label="Title" name="title" required />
          <TextAreaField label="Description" name="description" rows={3} required />
          <SaveButton label="Add Entry" />
        </form>
      </div>
    </div>
  );
}
