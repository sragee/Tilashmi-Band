"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Check } from "lucide-react";

export function SaveButton({ label = "Save Changes" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-black/85 disabled:opacity-60"
    >
      {pending ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
      {label}
    </button>
  );
}
