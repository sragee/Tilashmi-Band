"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

export function ImageUpload({
  name,
  defaultValue,
  label = "Image",
  accept = "image/*",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
  accept?: string;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed");
      setUrl(body.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-black/45">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/12 bg-black/[0.02]">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="text-black/20" size={22} />
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Loader2 className="animate-spin text-white" size={18} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border border-black/15 px-4 py-2 text-xs text-black/70 hover:text-black hover:border-black/30"
          >
            {url ? "Replace" : "Upload"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="inline-flex items-center gap-1 text-xs text-black/40 hover:text-red-400"
            >
              <X size={12} /> Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
