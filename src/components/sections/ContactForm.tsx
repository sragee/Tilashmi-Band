"use client";

import { FormEvent, useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-black/12 bg-black/[0.02] px-4 py-3 text-base text-black placeholder:text-black/30 outline-none transition-colors focus:border-black/30 focus:bg-black/[0.04]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl glass p-12 text-center">
        <CheckCircle2 className="text-black" size={40} />
        <h3 className="font-display text-xl text-black">Message Sent</h3>
        <p className="text-sm text-muted max-w-sm">
          Thank you for reaching out — TILASHMI will get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-black/55 hover:text-black underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl glass p-8 md:p-10 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="Optional"
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
            Subject
          </label>
          <input id="subject" name="subject" className={inputClass} placeholder="Booking, collaboration..." />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-black/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us about your event or idea..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-black/85 disabled:opacity-60 shadow-[0_0_30px_rgba(0,0,0,0.15)]"
      >
        {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
        Send Message
      </button>
    </form>
  );
}
