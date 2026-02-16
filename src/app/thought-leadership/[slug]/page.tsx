import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailHero } from "@/components/DetailHero";
import { NextPrevNav } from "@/components/NextPrevNav";
import { formatDate } from "@/lib/dates";
import { reader } from "@/lib/keystatic-reader";
import { renderMarkdoc } from "@/lib/markdoc";
import { topicHref, topicLabel } from "@/lib/topics";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await reader.collections.articles.list();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const entry = await reader.collections.articles.read(params.slug);
  if (!entry) return {};

  const title = entry.seo?.title || entry.title?.name || "Article";
  const description = entry.seo?.description || entry.summary || undefined;

  return {
    title: `${title}`,
    description,
  };
}

export default async function ThoughtLeadershipDetailPage({ params }: PageProps) {
  const entry = await reader.collections.articles.read(params.slug);
  if (!entry) notFound();

  const all = await reader.collections.articles.all();

  const ordered = [...all].sort((a, b) => {
    const da = a.entry.publishedAt ? new Date(a.entry.publishedAt).getTime() : 0;
    const db = b.entry.publishedAt ? new Date(b.entry.publishedAt).getTime() : 0;
    return db - da;
  });

  const index = ordered.findIndex((x) => x.slug === params.slug);
  const newer = index > 0 ? ordered[index - 1] : null;
  const older = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

  const primaryTopic = entry.topics?.[0];
  const related = primaryTopic
    ? all
        .filter((x) => x.slug !== params.slug)
        .filter((x) => x.entry.topics?.includes(primaryTopic))
        .sort((a, b) => {
          const da = a.entry.publishedAt ? new Date(a.entry.publishedAt).getTime() : 0;
          const db = b.entry.publishedAt ? new Date(b.entry.publishedAt).getTime() : 0;
          return db - da;
        })
        .slice(0, 3)
    : [];

  const content = await renderMarkdoc(entry.body);

  return (
    <>
      <DetailHero
        kicker="Thought leadership"
        title={entry.title?.name ?? "Article"}
        lede={entry.summary ?? undefined}
        imageSrc={entry.heroImage ?? null}
      />

      <div className="container page">
        <div className="text-sm text-slate-600">
          <Link href="/thought-leadership" className="hover:underline">
            ← Back to Thought leadership
          </Link>
        </div>

        <div className="detail-layout">
          <aside className="detail-aside">
            <div>
              <div className="detail-aside__label">Published</div>
              <div>{entry.publishedAt ? formatDate(entry.publishedAt) : "—"}</div>
            </div>

            {entry.topics?.length ? (
              <div>
                <div className="detail-aside__label">Topics</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.topics.map((t) => (
                    <Link key={t} href={topicHref(t)} className="pill-link">
                      {topicLabel(t)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <article className="detail-content">{content}</article>
        </div>

        <NextPrevNav
          newer={
            newer
              ? {
                  href: `/thought-leadership/${newer.slug}`,
                  label: "Newer",
                  title: newer.entry.title?.name ?? "Untitled",
                  meta: newer.entry.publishedAt ? formatDate(newer.entry.publishedAt) : undefined,
                }
              : null
          }
          older={
            older
              ? {
                  href: `/thought-leadership/${older.slug}`,
                  label: "Older",
                  title: older.entry.title?.name ?? "Untitled",
                  meta: older.entry.publishedAt ? formatDate(older.entry.publishedAt) : undefined,
                }
              : null
          }
          className="mt-14"
        />

        {related.length ? (
          <section className="mt-16">
            <div className="section-heading">
              <h2 className="section-heading__title">More in {topicLabel(primaryTopic!)}</h2>
              <p className="section-heading__lede">Related posts in the same topic.</p>
            </div>

            <div className="related-grid">
              {related.map(({ slug, entry: r }) => (
                <Link key={slug} href={`/thought-leadership/${slug}`} className="related-card no-underline">
                  <div className="related-card__title">{r.title?.name}</div>
                  {r.publishedAt ? <div className="related-card__meta">{formatDate(r.publishedAt)}</div> : null}
                  {r.summary ? <div className="related-card__desc">{r.summary}</div> : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
