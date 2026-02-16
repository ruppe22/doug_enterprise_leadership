import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { formatDate } from "@/lib/dates";
import { reader } from "@/lib/keystatic-reader";
import type { TopicId } from "@/lib/topics";
import { TOPICS, topicDescription, topicLabel } from "@/lib/topics";

export const revalidate = 60;

type PageProps = {
  params: { topic: string };
};

export default async function ThoughtLeadershipTopicPage({ params }: PageProps) {
  const topicId = params.topic as TopicId;
  if (!TOPICS.some((t) => t.id === topicId)) notFound();

  const all = await reader.collections.articles.all();
  const posts = all
    .filter(({ entry }) => entry.topics?.includes(topicId))
    .sort((a, b) => {
      const da = a.entry.publishedAt ? new Date(a.entry.publishedAt).getTime() : 0;
      const db = b.entry.publishedAt ? new Date(b.entry.publishedAt).getTime() : 0;
      return db - da;
    });

  return (
    <>
      <PageHero kicker="Thought leadership" title={topicLabel(topicId)} lede={topicDescription(topicId)} />

      <div className="container page page-stack">
        <div className="text-sm text-slate-600">
          <Link href="/thought-leadership" className="hover:underline">
            ← Back to Thought Leadership
          </Link>
        </div>

        <section>
          <div className="section-heading">
            <h2 className="section-heading__title">Articles</h2>
            <p className="section-heading__lede">All posts tagged with this topic.</p>
          </div>

          <div className="list mt-6">
            {posts.map(({ slug, entry }) => (
              <Link key={slug} href={`/thought-leadership/${slug}`} className="list-row no-underline">
                <div className="list-row__top">
                  <div className="list-row__title">{entry.title?.name}</div>
                  <div className="list-row__meta">{entry.publishedAt ? formatDate(entry.publishedAt) : ""}</div>
                </div>
                {entry.summary ? <div className="list-row__desc">{entry.summary}</div> : null}
              </Link>
            ))}

            {!posts.length ? (
              <div className="card p-6 text-sm text-slate-600">No posts yet in this topic.</div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}
