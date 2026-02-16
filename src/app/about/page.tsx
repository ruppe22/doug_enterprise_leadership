import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="About Doug"
        lede="Enterprise technology, MarTech, measurement, and governed operating models."
      />

      <div className="container-narrow page page-stack">
        <section className="detail-content">
          <p>
            {site.name} is an enterprise technology leader focused on acquisition and lifecycle ecosystems,
            measurement, and governed operating models that restore trust in data.
          </p>

          <p>
            This site is intentionally lightweight: publish case studies and long-form writing, then upgrade
            “Ask Doug” into retrieval with citations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Quick links</h2>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-outline" href="/work">
              View work
            </Link>
            <Link className="btn btn-outline" href="/thought-leadership">
              Read thought leadership
            </Link>
            <Link className="btn btn-primary" href="/contact">
              Contact
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
