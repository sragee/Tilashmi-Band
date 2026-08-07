import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { NewsForm } from "@/components/admin/NewsForm";
import { prisma } from "@/lib/prisma";
import { updateNewsPost } from "@/lib/actions/news";

export default async function EditNewsPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <PageHeader title={`Edit Post`} />
      <NewsForm action={updateNewsPost} post={post} />
    </div>
  );
}
