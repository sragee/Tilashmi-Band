import { PageHeader } from "@/components/admin/PageHeader";
import { ReleaseForm } from "@/components/admin/ReleaseForm";
import { createRelease } from "@/lib/actions/music";

export default function NewReleasePage() {
  return (
    <div>
      <PageHeader title="Add Release" />
      <ReleaseForm action={createRelease} />
    </div>
  );
}
