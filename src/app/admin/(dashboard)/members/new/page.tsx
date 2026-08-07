import { PageHeader } from "@/components/admin/PageHeader";
import { MemberForm } from "@/components/admin/MemberForm";
import { createMember } from "@/lib/actions/members";

export default function NewMemberPage() {
  return (
    <div>
      <PageHeader title="Add Member" />
      <MemberForm action={createMember} />
    </div>
  );
}
