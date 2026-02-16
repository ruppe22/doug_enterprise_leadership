import Link from "next/link";

import { AskDoug } from "@/components/AskDoug";
import { site } from "@/lib/site";

type AskMode = "off" | "preview" | "search" | "rag";

const rawAskMode = (process.env.ASK_DOUG_MODE ?? "preview").toLowerCase();
const askMode: AskMode =
  rawAskMode === "off"
    ? "off"
    : rawAskMode === "preview"
      ? "preview"
      : rawAskMode === "search"
        ? "search"
        : rawAskMode === "rag"
          ? "rag"
          : "preview";

const modeLabel = askMode === "search" ? "Search" : askMode === "rag" ? "RAG" : "Preview";

export default function HomePage() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Full-bleed background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_30%_20%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_circle_at_70%_30%,rgba(168,85,247,0.16),transparent_55%),radial-gradient(900px_circle_at_60%_80%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/60 to-slate-950" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-6xl px-6 pb-40 pt-12 sm:pt-14">
        {/* Top row (aligned to the same grid as the 3-column meta blocks) */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 space-y-1 md:col-span-4">
            <div className="text-sm font-semibold">{site.name}</div>
            <div className="text-sm text-white/70">{site.profile.statusLine}</div>
          </div>

          <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-8 md:justify-end">
            <a
              className="btn btn-light"
              href={site.ctas.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>

            <a
              className="btn btn-ghost"
              href={site.ctas.resume}
              target="_blank"
              rel="noreferrer"
            >
              Download CV
            </a>

            <Link
              className="btn btn-ghost"
              href={site.ctas.work}
            >
              View work
            </Link>

            <Link
              className="btn btn-ghost"
              href={site.ctas.thoughtLeadership}
            >
              Read thought leadership
            </Link>

            <Link
              className="btn btn-ghost"
              href={site.ctas.contact}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Meta blocks (FOCUS / INDUSTRY EXPERIENCE / ROLES EXPLORING) */}
        <div className="mt-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 border-t border-white/10 pt-4 md:col-span-4">
            <div className="text-xs font-semibold tracking-widest text-white/60">FOCUS</div>
            <div className="mt-2 text-sm text-white/80">{site.profile.focus.join(" · ")}</div>
          </div>

          <div className="col-span-12 border-t border-white/10 pt-4 md:col-span-4">
            <div className="text-xs font-semibold tracking-widest text-white/60">INDUSTRY EXPERIENCE</div>
            <div className="mt-2 text-sm text-white/80">{site.profile.industries.join(" · ")}</div>
          </div>

          <div className="col-span-12 border-t border-white/10 pt-4 md:col-span-4">
            <div className="text-xs font-semibold tracking-widest text-white/60">ROLES EXPLORING</div>
            <div className="mt-2 text-sm text-white/80">{site.profile.rolesExploring.join(" · ")}</div>
          </div>
        </div>

        {/* Center badge */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/75">
            <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-white/85">
              {modeLabel}
            </span>
            <span>Ask Doug is live (RAG + citations next)</span>
          </div>
        </div>

        {/* Center hero */}
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Ask Doug</h1>
          <p className="mt-4 text-base text-white/75 sm:text-lg">
            Grounded answers from my writing and case studies.
          </p>
        </div>

        {/* Ask Doug module */}
        <div className="mx-auto mt-10 max-w-4xl">
          <AskDoug initialMode={askMode} variant="hero" />
        </div>

        <p className="mt-8 text-center text-xs text-white/55">
          Tip: set{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">ASK_DOUG_MODE=search</code> in{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code> for grounded keyword search (RAG later).
        </p>
      </div>
    </section>
  );
}
