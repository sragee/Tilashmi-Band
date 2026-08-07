import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";
import { markMessageRead, deleteMessage } from "@/lib/actions/messages";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader title="Messages" description="Inquiries submitted through the contact form." />
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`rounded-2xl glass p-6 ${!m.read ? "border border-black/20" : ""}`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <p className="font-display text-lg text-black">{m.name}</p>
                <p className="text-sm text-muted">
                  {m.email} {m.phone && `· ${m.phone}`}
                </p>
                {m.subject && <p className="text-xs uppercase tracking-widest text-accent mt-2">{m.subject}</p>}
              </div>
              <p className="text-xs text-black/60 shrink-0">
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(
                  new Date(m.createdAt)
                )}
              </p>
            </div>
            <p className="mt-4 text-sm text-black/80 leading-relaxed whitespace-pre-wrap">{m.message}</p>
            <div className="mt-4 flex items-center gap-2">
              {!m.read && (
                <form action={markMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-black/15 px-3.5 py-2 text-xs text-black/60 hover:text-black hover:border-black/30"
                  >
                    Mark as Read
                  </button>
                </form>
              )}
              <a
                href={`mailto:${m.email}`}
                className="rounded-full border border-black/15 px-3.5 py-2 text-xs text-black/60 hover:text-black hover:border-black/30"
              >
                Reply by Email
              </a>
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={m.id} />
                <DeleteButton confirmText="Delete this message?" />
              </form>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted text-sm">No messages yet.</p>}
      </div>
    </div>
  );
}
