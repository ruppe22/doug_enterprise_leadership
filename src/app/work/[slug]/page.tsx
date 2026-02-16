import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailHero } from "@/components/DetailHero";
import { NextPrevNav } from "@/components/NextPrevNav";
import { reader } from "@/lib/keystatic-reader";
import { renderMarkdoc } from "@/lib/markdoc";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await reader.collections.work.list();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const entry = await reader.collections.work.read(params.slug);
  if (!entry) return {};

  const title = entry.seo?.title || entry.title?.name || "Work";
  const description = entry.seo?.description || entry.summary || undefined;

  return {
    title,
    description,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const entry = await reader.collections.work.read(params.slug);
  if (!entry) notFound();

  const all = await reader.collections.work.all();
  const ordered = [...all].sort((a, b) => (b.entry.year ?? 0) - (a.entry.year ?? 0));
  const index = ordered.findIndex((x) => x.slug === params.slug);
  const previous = index > 0 ? ordered[index - 1] : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

	const tagSet = new Set(entry.tags || []);
	const related = all
	  .filter((x) => x.slug !== params.slug)
	  .filter((x) => (tagSet.size ? (x.entry.tags || []).some((t) => tagSet.has(t)) : true))
	  .sort((a, b) => (b.entry.year ?? 0) - (a.entry.year ?? 0))
	  .slice(0, 3);

  const content = await renderMarkdoc(entry.body);

  return (
    <>
	  <DetailHero
	    kicker={entry.client || "Work"}
        title={entry.title?.name ?? "Work"}
        lede={entry.summary ?? undefined}
	    imageSrc={entry.cover ?? null}
      />

      <div className="container page">
        <div className="text-sm text-slate-600">
          <Link href="/work" className="hover:underline">
            ← Back to Work
          </Link>
        </div>

        <div className="detail-layout">
          <aside className="detail-aside">
            {entry.year ? (
              <div>
                <div className="detail-aside__label">Year</div>
                <div>{entry.year}</div>
              </div>
            ) : null}

            {entry.tags?.length ? (
              <div>
                <div className="detail-aside__label">Tags</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.tags.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {(entry.links?.live || entry.links?.repo) ? (
              <div>
                <div className="detail-aside__label">Links</div>
                <div className="mt-2 flex flex-col gap-2">
                  {entry.links?.live ? (
                    <a className="btn btn-outline" href={entry.links.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : null}
                  {entry.links?.repo ? (
                    <a className="btn btn-outline" href={entry.links.repo} target="_blank" rel="noreferrer">
                      Repo
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </aside>

          <article className="detail-content">{content}</article>
        </div>

        <NextPrevNav
          newer={
            previous
              ? {
                  href: `/work/${previous.slug}`,
                  label: "Previous",
                  title: previous.entry.title?.name ?? "Untitled",
                  meta: previous.entry.year ? String(previous.entry.year) : undefined,
                }
              : null
          }
          older={
            next
              ? {
                  href: `/work/${next.slug}`,
                  label: "Next",
                  title: next.entry.title?.name ?? "Untitled",
                  meta: next.entry.year ? String(next.entry.year) : undefined,
                }
              : null
          }
          className="mt-14"
        />

        {related.length ? (
          <section className="mt-16">
            <div className="section-heading">
              <h2 className="section-heading__title">Related work</h2>
              <p className="section-heading__lede">Other projects and case studies.</p>
            </div>

            <div className="related-grid">
              {related.map(({ slug, entry: r }) => (
                <Link key={slug} href={`/work/${slug}`} className="related-card no-underline">
                  <div className="related-card__title">{r.title?.name}</div>
                  {r.year ? <div className="related-card__meta">{r.year}</div> : null}
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
