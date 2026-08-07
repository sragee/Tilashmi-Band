import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { MemberForm } from "@/components/admin/MemberForm";
import { prisma } from "@/lib/prisma";
import { updateMember } from "@/lib/actions/members";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <PageHeader title={`Edit ${member.name}`} />
      <MemberForm action={updateMember} member={member} />
    </div>
  );
}
