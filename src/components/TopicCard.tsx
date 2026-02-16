import Link from "next/link";

import { Icon } from "@/components/Icon";
import type { TopicId } from "@/lib/topics";
import { topicDescription, topicHref, topicIcon, topicLabel, topicTone } from "@/lib/topics";

export function TopicCard({
  topic,
  count,
}: {
  topic: TopicId;
  count?: number;
}) {
  const tone = topicTone(topic);
  const icon = topicIcon(topic);
  const countLabel =
    typeof count === "number" ? `${count} post${count === 1 ? "" : "s"}` : null;

  return (
    <Link
      href={topicHref(topic)}
      className={`topic-card topic-card--${tone} no-underline`}
    >
      <div className={`topic-card__icon topic-card__icon--${tone}`} aria-hidden>
        <Icon name={icon} className="h-5 w-5 text-slate-800" />
      </div>

      <div className="topic-card__title">{topicLabel(topic)}</div>
      <div className="topic-card__desc">{topicDescription(topic)}</div>

      {countLabel ? <div className="topic-card__meta">{countLabel}</div> : null}

      <div className="topic-card__cta">
        <span className="topic-card__ctaBtn" aria-hidden>
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
