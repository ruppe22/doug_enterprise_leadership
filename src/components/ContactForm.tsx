"use client";

import { useState, type FormEvent } from "react";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: message.trim(),
    };

    if (!payload.name || !payload.email || payload.message.length < 10) {
      setState({
        status: "error",
        message: "Please include your name, email, and a message (10+ chars).",
      });
      return;
    }

    setState({ status: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; message: string }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || ("ok" in data && data.ok === false)) {
        throw new Error(data && "error" in data ? data.error : "Send failed");
      }

      setState({ status: "success", message: data.message });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (err: any) {
      setState({
        status: "error",
        message:
          err?.message ??
          "Something went wrong. Please try again in a minute.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <div className="text-sm font-medium text-slate-900">Name</div>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm font-medium text-slate-900">Email</div>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label className="space-y-1">
        <div className="text-sm font-medium text-slate-900">
          Company (optional)
        </div>
        <input
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="organization"
        />
      </label>

      <label className="space-y-1">
        <div className="text-sm font-medium text-slate-900">Message</div>
        <textarea
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          disabled={state.status === "sending"}
        >
          {state.status === "sending" ? "Sending…" : "Send"}
        </button>

        {state.status === "success" ? (
          <div className="text-sm text-emerald-700">{state.message}</div>
        ) : null}

        {state.status === "error" ? (
          <div className="text-sm text-red-700">{state.message}</div>
        ) : null}
      </div>

      <p className="text-xs text-slate-500">
        This form sends directly from the site (no mailto links).
      </p>
    </form>
  );
}
