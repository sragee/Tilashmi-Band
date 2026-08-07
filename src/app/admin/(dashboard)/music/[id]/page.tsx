import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ReleaseForm } from "@/components/admin/ReleaseForm";
import { prisma } from "@/lib/prisma";
import { updateRelease } from "@/lib/actions/music";

export default async function EditReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const release = await prisma.release.findUnique({ where: { id } });
  if (!release) notFound();

  return (
    <div>
      <PageHeader title={`Edit ${release.title}`} />
      <ReleaseForm action={updateRelease} release={release} />
    </div>
  );
}
