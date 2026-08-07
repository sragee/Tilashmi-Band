import { TextField, TextAreaField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";

type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  order: number;
};

export function MemberForm({
  action,
  member,
}: {
  action: (formData: FormData) => void;
  member?: Member;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
      {member && <input type="hidden" name="id" value={member.id} />}
      <ImageUpload name="photoUrl" defaultValue={member?.photoUrl} label="Photo" />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Name" name="name" defaultValue={member?.name} required />
        <TextField
          label="Role"
          name="role"
          defaultValue={member?.role}
          placeholder="Vocalist, Guitarist..."
          required
        />
      </div>
      <TextAreaField label="Short Description" name="bio" defaultValue={member?.bio} rows={3} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Instagram URL" name="instagram" defaultValue={member?.instagram || ""} />
        <TextField label="Facebook URL" name="facebook" defaultValue={member?.facebook || ""} />
        <TextField label="YouTube URL" name="youtube" defaultValue={member?.youtube || ""} />
        <TextField label="TikTok URL" name="tiktok" defaultValue={member?.tiktok || ""} />
      </div>
      <TextField label="Display Order" name="order" type="number" defaultValue={member?.order ?? 0} />
      <SaveButton label={member ? "Update Member" : "Add Member"} />
    </form>
  );
}
