"use client";

import { useId, useMemo, useState, type FormEvent } from "react";

export type AskMode = "off" | "preview" | "search" | "rag";

type AskResult = {
  type: "article" | "work";
  title: string;
  href: string;
  summary?: string;
  meta?: string;
};

type AskResponse = {
  mode: AskMode;
  query: string;
  answer?: string;
  results?: AskResult[];
};

export function AskDoug(props: {
  initialMode?: AskMode;
  title?: string;
  badge?: string;
  variant?: "card" | "hero";
}) {
  const {
    initialMode = "preview",
    title = "Ask Doug",
    badge,
    variant = "card",
  } = props;

  const inputId = useId();
  const hintId = `${inputId}-hint`;

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AskResponse | null>(null);

  const disabled = initialMode === "off";
  const isHero = variant === "hero";

  const badgeText = useMemo(() => {
    if (badge !== undefined) return badge;
    if (initialMode === "preview") return "Preview";
    if (initialMode === "search") return "Search";
    if (initialMode === "rag") return "RAG";
    return "";
  }, [badge, initialMode]);

  const examplePrompts = useMemo(
    () => [
      "enterprise AI readiness checklist",
      "measurement strategy for marketing platforms",
      "data governance operating model",
      "privacy & security operating model",
    ],
    []
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);

    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setError("Type a question (at least 3 characters).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok) throw new Error(await res.text());

      const json = (await res.json()) as AskResponse;
      setData(json);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (disabled) return null;

  const shell = isHero
    ? "rounded-3xl bg-white/95 p-7 sm:p-8 shadow-2xl shadow-slate-950/35 ring-1 ring-white/15 backdrop-blur"
    : "rounded-2xl border border-slate-200 bg-slate-50 p-6";

  const headerText = isHero ? "text-slate-900" : "text-slate-900";
  const subText = isHero ? "text-slate-600" : "text-slate-600";

  return (
    <section className={shell}>
      {/*
        Hero variant matches the homepage mock: no internal title/description.
        (Those live above the module in the hero section.)
      */}
      {isHero ? (
        <h2 className="sr-only">{title}</h2>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className={`text-lg font-semibold ${headerText}`}>{title}</h2>
            {badgeText ? (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700">
                {badgeText}
              </span>
            ) : null}
          </div>

          <p className={`mt-1 text-sm ${subText}`}>
            Grounded answers from my writing and case studies. This becomes RAG +
            citations once the knowledge base is indexed.
          </p>
        </>
      )}

      {/* Rocket-style prompt box */}
      <form onSubmit={onSubmit} className={isHero ? "relative" : "relative mt-4"}>
        <label htmlFor={inputId} className="sr-only">
          Ask Doug a question
        </label>
        <span id={hintId} className="sr-only">
          Ask a question about Doug's work, leadership approach, or frameworks.
        </span>
        <textarea
          id={inputId}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 pr-28 text-sm leading-6 text-slate-900 outline-none focus:border-slate-300"
          style={{ minHeight: isHero ? 140 : 110 }}
          placeholder='What should I know about your work in enterprise AI readiness, measurement, or governance?'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          aria-describedby={hintId}
        />

        <button
          type="submit"
          className="absolute bottom-3 right-3 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "…" : "Ask"}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="text-slate-500">Try:</span>
        {examplePrompts.map((p) => (
          <button
            key={p}
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 hover:bg-slate-50"
            onClick={() => setQuery(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {data?.answer ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800">
          {data.answer}
        </div>
      ) : null}

      {data?.results?.length ? (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium text-slate-900">
            Suggested links
          </div>
          <ul className="space-y-2">
            {data.results.map((r) => (
              <li
                key={r.href}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <a
                    className="font-semibold text-slate-900 hover:underline"
                    href={r.href}
                  >
                    {r.title}
                  </a>
                  <span className="text-xs text-slate-500">
                    {r.type.toUpperCase()}
                    {r.meta ? ` • ${r.meta}` : ""}
                  </span>
                </div>
                {r.summary ? (
                  <p className="mt-1 text-sm text-slate-700">{r.summary}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!loading && data && !data.answer && !data.results?.length ? (
        <div className="mt-4 text-sm text-slate-600">
          No matches yet. Publish more writing and case studies, then try again.
        </div>
      ) : null}
    </section>
  );
}
