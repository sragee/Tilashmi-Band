import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getReleases } from "@/lib/data";
import { deleteRelease } from "@/lib/actions/music";

export default async function AdminMusicPage() {
  const releases = await getReleases();

  return (
    <div>
      <PageHeader
        title="Music"
        description="Manage albums, singles and upcoming releases."
        action={
          <Link
            href="/admin/music/new"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85"
          >
            <Plus size={16} /> Add Release
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {releases.map((r) => (
          <div key={r.id} className="flex items-center gap-4 rounded-2xl glass p-5">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
              {r.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.coverImageUrl} alt={r.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-black/20 font-display text-xl">
                  {r.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-black truncate">{r.title}</p>
              <p className="text-xs uppercase tracking-widest text-accent">
                {r.type} &middot; {r.status}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/music/${r.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-2 text-xs text-black/60 hover:text-black hover:border-black/30"
              >
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteRelease}>
                <input type="hidden" name="id" value={r.id} />
                <DeleteButton confirmText={`Remove "${r.title}"?`} />
              </form>
            </div>
          </div>
        ))}
      </div>
      {releases.length === 0 && <p className="text-muted text-sm">No releases added yet.</p>}
    </div>
  );
}
