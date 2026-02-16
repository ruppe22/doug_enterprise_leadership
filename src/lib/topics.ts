export type TopicId =
  | "enterprise-ai-readiness"
  | "track-and-measure"
  | "data-governance"
  | "privacy-and-security"
  | "digital-transformation";

export type TopicTone = "indigo" | "emerald" | "amber" | "rose" | "sky";

export type TopicIcon = "spark" | "chart" | "database" | "shield" | "wand";

export type Topic = {
  id: TopicId;
  label: string;
  description: string;
  tone: TopicTone;
  icon: TopicIcon;
};

export const TOPICS: Topic[] = [
  {
    id: "enterprise-ai-readiness",
    label: "Enterprise AI Readiness",
    description: "Frameworks to evaluate readiness, constraints, and where AI actually delivers value.",
    tone: "indigo",
    icon: "spark",
  },
  {
    id: "track-and-measure",
    label: "Track & Measure",
    description: "Measurement strategy, experimentation, attribution realities, and operational reporting.",
    tone: "emerald",
    icon: "chart",
  },
  {
    id: "data-governance",
    label: "Data Governance",
    description: "Operating models that restore trust in data and enable scale without chaos.",
    tone: "amber",
    icon: "database",
  },
  {
    id: "privacy-and-security",
    label: "Privacy & Security",
    description: "Practical privacy-by-design, consent, and security partnerships that unlock delivery.",
    tone: "rose",
    icon: "shield",
  },
  {
    id: "digital-transformation",
    label: "Digital Transformation",
    description: "Execution patterns for modern platforms, integration strategy, and change management.",
    tone: "sky",
    icon: "wand",
  },
];

export function topicLabel(id: TopicId): string {
  const t = TOPICS.find((x) => x.id === id);
  return t?.label ?? id;
}

export function topicDescription(id: TopicId): string {
  const t = TOPICS.find((x) => x.id === id);
  return t?.description ?? "";
}

export function topicTone(id: TopicId): TopicTone {
  const t = TOPICS.find((x) => x.id === id);
  return t?.tone ?? "indigo";
}

export function topicIcon(id: TopicId): TopicIcon {
  const t = TOPICS.find((x) => x.id === id);
  return t?.icon ?? "spark";
}

export function topicHref(id: TopicId): string {
  return `/thought-leadership/topic/${id}`;
}
