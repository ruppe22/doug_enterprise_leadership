import Link from "next/link";

import { reader } from "@/lib/keystatic-reader";
import {
  TOPICS,
  topicDescription,
  topicHref,
  topicIcon,
  topicLabel,
} from "@/lib/topics";
import { ArrowRight, BarChart3, Lock, Sparkles, Workflow } from "lucide-react";

function TopicIcon({ name }: { name: string }) {
  const props = { className: "h-5 w-5" };
  switch (name) {
    case "sparkles":
      return <Sparkles {...props} />;
    case "bar-chart-3":
      return <BarChart3 {...props} />;
    case "shield":
      return <Lock {...props} />;
    case "workflow":
      return <Workflow {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

export default async function ThoughtLeadershipPage() {
  const entries = await reader.collections.articles.all();

  const latest = [...entries].sort((a, b) => {
    const aDate = a.entry.publishedAt ? new Date(a.entry.publishedAt).getTime() : 0;
    const bDate = b.entry.publishedAt ? new Date(b.entry.publishedAt).getTime() : 0;
    return bDate - aDate;
  })[0];

  const topicCounts: Record<string, number> = {};
  for (const { entry } of entries) {
    for (const t of entry.topics ?? []) {
      topicCounts[t] = (topicCounts[t] ?? 0) + 1;
    }
  }

  const tones = ["sky", "violet", "emerald", "amber", "rose"] as const;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <p className="page-hero__kicker">Thought leadership</p>
          <h1 className="page-hero__title">Thought leadership</h1>
          <p className="page-hero__lede">
            Long-form writing. Canonical home for posts that LinkedIn links back to.
          </p>

          {latest && (
            <div className="mt-4 text-sm text-slate-600">
              Start here:{" "}
              <Link
                className="underline underline-offset-4"
                href={`/thought-leadership/${latest.slug}`}
              >
                {latest.entry.title?.name ?? latest.slug}
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="surface-gradient">
        <div className="surface-gradient__inner">
          <div className="surface-gradient__content">
            <div className="section-heading section-heading--dark">
              <h2 className="section-heading__title">Browse by topic</h2>
              <p className="section-heading__lede">
                Pick a lane — then browse all posts. Topic pages are indexable and
                shareable.
              </p>
            </div>

            <div className="topic-tiles mt-10">
              {TOPICS.map((topic, idx) => {
                const tone = tones[idx % tones.length];
                const count = topicCounts[topic.slug] ?? 0;

                return (
                  <Link
                    key={topic.slug}
                    href={topicHref(topic.slug)}
                    className={`topic-tile topic-tile--${tone}`}
                    aria-label={`${topicLabel(topic.slug)} topic`}
                  >
                    <div className="topic-tile__icon" aria-hidden="true">
                      <TopicIcon name={topicIcon(topic.slug)} />
                    </div>

                    <div>
                      <div className="topic-tile__title">
                        {topicLabel(topic.slug)}
                      </div>
                      <p className="topic-tile__desc">
                        {topicDescription(topic.slug)}
                      </p>
                    </div>

                    <div className="topic-tile__meta">
                      {count} post{count === 1 ? "" : "s"}
                    </div>

                    <div className="topic-tile__arrow" aria-hidden="true">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}