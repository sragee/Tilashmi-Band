import { PageHeader } from "@/components/admin/PageHeader";
import { NewsForm } from "@/components/admin/NewsForm";
import { createNewsPost } from "@/lib/actions/news";

export default function NewNewsPostPage() {
  return (
    <div>
      <PageHeader title="New Post" />
      <NewsForm action={createNewsPost} />
    </div>
  );
}
