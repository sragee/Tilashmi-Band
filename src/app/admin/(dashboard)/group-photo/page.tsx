import { PageHeader } from "@/components/admin/PageHeader";
import { TextField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";
import { getGroupPhoto } from "@/lib/data";
import { updateGroupPhoto } from "@/lib/actions/groupPhoto";

export default async function AdminGroupPhotoPage() {
  const photo = await getGroupPhoto();

  return (
    <div>
      <PageHeader title="Group Photo" description="The full-width band photo shown on the Members page." />
      <form action={updateGroupPhoto} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
        <ImageUpload name="imageUrl" defaultValue={photo.imageUrl} label="Group Photo" />
        <TextField label="Caption (optional)" name="caption" defaultValue={photo.caption || ""} />
        <SaveButton />
      </form>
    </div>
  );
}
