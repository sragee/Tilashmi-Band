import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getMembers } from "@/lib/data";
import { deleteMember } from "@/lib/actions/members";

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <div>
      <PageHeader
        title="Band Members"
        description="Manage everyone in TILASHMI."
        action={
          <Link
            href="/admin/members/new"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85"
          >
            <Plus size={16} /> Add Member
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-4 rounded-2xl glass p-5">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
              {m.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-black/20 font-display text-xl">
                  {m.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-black truncate">{m.name}</p>
              <p className="text-xs uppercase tracking-widest text-accent">{m.role}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/members/${m.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-2 text-xs text-black/50 hover:text-black hover:border-black/30"
              >
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteMember}>
                <input type="hidden" name="id" value={m.id} />
                <DeleteButton confirmText={`Remove ${m.name}?`} />
              </form>
            </div>
          </div>
        ))}
      </div>
      {members.length === 0 && <p className="text-muted text-sm">No members added yet.</p>}
    </div>
  );
}
