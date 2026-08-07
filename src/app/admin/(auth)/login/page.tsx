"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-background px-6 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aura w-[500px] h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      </div>
      <div className="relative w-full max-w-sm glass rounded-3xl p-8 md:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/15 bg-black/[0.02] mb-4">
            <Lock size={22} className="text-black" />
          </span>
          <h1 className="font-display text-2xl text-black">TILASHMI Admin</h1>
          <p className="text-sm text-muted mt-1">Sign in to manage the site</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              inputMode="email"
              className="w-full rounded-xl border border-black/12 bg-black/[0.02] px-4 py-3 text-base text-black outline-none focus:border-black/30"
              placeholder="admin@tilashmi.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-black/12 bg-black/[0.02] px-4 py-3 text-base text-black outline-none focus:border-black/30"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-black/85 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
