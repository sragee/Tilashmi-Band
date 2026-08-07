import { TextField, TextAreaField, CheckboxField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  published: boolean;
};

export function NewsForm({
  action,
  post,
}: {
  action: (formData: FormData) => void;
  post?: Post;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
      {post && <input type="hidden" name="id" value={post.id} />}
      <ImageUpload name="imageUrl" defaultValue={post?.imageUrl} label="Cover Image" />
      <TextField label="Title" name="title" defaultValue={post?.title} required />
      <TextAreaField label="Content" name="content" defaultValue={post?.content} rows={10} required />
      <CheckboxField label="Publish immediately" name="published" defaultChecked={post?.published ?? true} />
      <SaveButton label={post ? "Update Post" : "Publish Post"} />
    </form>
  );
}
