import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { reader } from "@/lib/keystatic-reader";
import { formatDate } from "@/lib/dates";
import { ArrowRight, Layers, Workflow } from "lucide-react";

export default async function WorkPage() {
  const items = await reader.collections.work.all();

  const sorted = [...items].sort((a, b) => {
    const aYear = a.entry.year ?? 0;
    const bYear = b.entry.year ?? 0;
    return bYear - aYear;
  });

  const tones = ["amber", "sky", "emerald", "violet"] as const;

  return (
    <>
      <PageHero
        kicker="Work"
        title="Work"
        lede="Selected projects and case studies."
      />

      <section className="surface-gradient">
        <div className="surface-gradient__inner">
          <div className="surface-gradient__content">
            <div className="section-heading section-heading--dark">
              <h2 className="section-heading__title">From discovery to delivery</h2>
              <p className="section-heading__lede">
                Case studies framed as problem → constraints → approach → outcome.
                Built for product leaders who care about measurable impact.
              </p>
            </div>

            {sorted.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
                No work items yet. Add entries in Keystatic under <strong>Work</strong>.
              </div>
            ) : (
              <div className="work-tiles mt-10">
                {sorted.map((w, idx) => {
                  const tone = tones[idx % tones.length];
                  const isFeatured = idx === 0;

                  return (
                    <Link
                      key={w.slug}
                      href={`/work/${w.slug}`}
                      className={`work-tile work-tile--${tone} ${
                        isFeatured ? "work-tile--featured" : ""
                      }`}
                      aria-label={`View case study: ${w.entry.title}`}
                    >
                      <div className="work-tile__icon" aria-hidden="true">
                        {isFeatured ? (
                          <Workflow className="h-5 w-5" />
                        ) : (
                          <Layers className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <div className="work-tile__title">{w.entry.title}</div>
                        {w.entry.summary ? (
                          <p className="work-tile__summary">{w.entry.summary}</p>
                        ) : (
                          <p className="work-tile__summary">
                            A structured case study covering the decision context, constraints,
                            delivery approach, and measurable outcomes.
                          </p>
                        )}
                      </div>

                      <div className="work-tile__meta">
                        {typeof w.entry.year === "number" ? w.entry.year : null}
                        {w.entry.publishedAt ? (
                          <>
                            {w.entry.year ? " • " : ""}
                            {formatDate(w.entry.publishedAt)}
                          </>
                        ) : null}
                      </div>

                      <div className="work-tile__arrow" aria-hidden="true">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
