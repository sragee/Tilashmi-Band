import { TextField, SelectField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";

type Release = {
  id: string;
  title: string;
  type: string;
  coverImageUrl?: string | null;
  releaseDate: Date;
  spotifyUrl?: string | null;
  youtubeUrl?: string | null;
  appleMusicUrl?: string | null;
  status: string;
  order: number;
};

const typeOptions = [
  { value: "single", label: "Single" },
  { value: "album", label: "Album" },
];

const statusOptions = [
  { value: "released", label: "Released" },
  { value: "upcoming", label: "Upcoming" },
];

function toDateInputValue(date?: Date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function ReleaseForm({
  action,
  release,
}: {
  action: (formData: FormData) => void;
  release?: Release;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
      {release && <input type="hidden" name="id" value={release.id} />}
      <ImageUpload name="coverImageUrl" defaultValue={release?.coverImageUrl} label="Cover Art" />
      <TextField label="Title" name="title" defaultValue={release?.title} required />
      <div className="grid gap-6 sm:grid-cols-3">
        <SelectField label="Type" name="type" options={typeOptions} defaultValue={release?.type || "single"} />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue={release?.status || "released"} />
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          defaultValue={toDateInputValue(release?.releaseDate)}
          required
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <TextField label="Spotify URL" name="spotifyUrl" defaultValue={release?.spotifyUrl || ""} />
        <TextField label="YouTube URL" name="youtubeUrl" defaultValue={release?.youtubeUrl || ""} />
        <TextField label="Apple Music URL" name="appleMusicUrl" defaultValue={release?.appleMusicUrl || ""} />
      </div>
      <TextField label="Display Order" name="order" type="number" defaultValue={release?.order ?? 0} />
      <SaveButton label={release ? "Update Release" : "Add Release"} />
    </form>
  );
}
