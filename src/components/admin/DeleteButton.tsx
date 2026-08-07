"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ confirmText = "Delete this item permanently?" }: { confirmText?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-2 text-xs text-black/50 hover:text-red-500 hover:border-red-400/40"
    >
      <Trash2 size={13} /> Delete
    </button>
  );
}
