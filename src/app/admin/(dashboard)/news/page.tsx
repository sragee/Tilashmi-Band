import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";
import { deleteNewsPost, togglePublishNewsPost } from "@/lib/actions/news";

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader
        title="News & Updates"
        description="Publish announcements and updates."
        action={
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85"
          >
            <Plus size={16} /> New Post
          </Link>
        }
      />

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl glass p-5">
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-black truncate">{p.title}</p>
              <p className="text-sm text-muted mt-0.5">
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(p.createdAt))}
              </p>
            </div>
            <form action={togglePublishNewsPost}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                className={`rounded-full px-3.5 py-2 text-xs uppercase tracking-widest transition-colors ${
                  p.published
                    ? "bg-black/8 text-black border border-black/20"
                    : "border border-black/10 text-black/60"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </button>
            </form>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/news/${p.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-2 text-xs text-black/60 hover:text-black hover:border-black/30"
              >
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteNewsPost}>
                <input type="hidden" name="id" value={p.id} />
                <DeleteButton confirmText={`Delete "${p.title}"?`} />
              </form>
            </div>
          </div>
        ))}
      </div>
      {posts.length === 0 && <p className="text-muted text-sm">No posts yet.</p>}
    </div>
  );
}
