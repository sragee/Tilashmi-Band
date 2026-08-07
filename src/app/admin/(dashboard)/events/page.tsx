import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getEvents } from "@/lib/data";
import { deleteEvent } from "@/lib/actions/events";

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <PageHeader
        title="Events"
        description="Upcoming and past shows."
        action={
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85"
          >
            <Plus size={16} /> Add Event
          </Link>
        }
      />

      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-4 rounded-2xl glass p-5">
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-black truncate">{e.title}</p>
              <p className="text-sm text-muted mt-0.5">
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(e.date))} &middot;{" "}
                {e.venue}, {e.city}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/events/${e.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-2 text-xs text-black/60 hover:text-black hover:border-black/30"
              >
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={e.id} />
                <DeleteButton confirmText={`Remove "${e.title}"?`} />
              </form>
            </div>
          </div>
        ))}
      </div>
      {events.length === 0 && <p className="text-muted text-sm">No events added yet.</p>}
    </div>
  );
}
