import { NextResponse } from "next/server";

import { reader } from "@/lib/keystatic-reader";
import { topicLabel } from "@/lib/topics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AskMode = "off" | "preview" | "search" | "rag";

type AskResult = {
  type: "article" | "work";
  title: string;
  href: string;
  summary?: string;
  meta?: string;
  score: number;
};

function getMode(): AskMode {
  const raw = (process.env.ASK_DOUG_MODE || "preview").toLowerCase();
  if (raw === "off" || raw === "preview" || raw === "search" || raw === "rag") return raw;
  return "preview";
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);
}

function scoreText(tokens: string[], text?: string | null): number {
  if (!text) return 0;
  const hay = text.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (hay.includes(t)) score += 1;
  }
  return score;
}

export async function POST(req: Request) {
  const mode = getMode();

  if (mode === "off") {
    return NextResponse.json(
      { mode, query: "", answer: "Ask Doug is disabled." },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => null);
  const query = String(body?.query ?? "").trim();

  if (query.length < 3) {
    return NextResponse.json(
      { mode, query, answer: "Query too short." },
      { status: 400 }
    );
  }

  // Preview mode: visible feature, no fake AI.
  if (mode === "preview") {
    return NextResponse.json({
      mode,
      query,
      answer:
        "Preview mode: RAG + citations isn’t enabled yet. Publish more writing and case studies—then we’ll index them and turn this into real retrieval with citations.",
      results: [],
    });
  }

  // Search mode: grounded keyword search over your published content metadata.
  if (mode === "search") {
    const tokens = tokenize(query);
    const results: AskResult[] = [];

    const articles = await reader.collections.articles.all();
    for (const { slug, entry } of articles) {
      const title = entry.title?.name ?? slug;
      const summary = entry.summary ?? "";
      const topics = (entry.topics ?? []).map(topicLabel).join(" ");

      const score =
        scoreText(tokens, title) * 6 +
        scoreText(tokens, topics) * 3 +
        scoreText(tokens, summary) * 2;

      if (score <= 0) continue;

      results.push({
        type: "article",
        title,
        href: `/thought-leadership/${slug}`,
        summary: summary || undefined,
        meta: entry.publishedAt ?? undefined,
        score,
      });
    }

    const workItems = await reader.collections.work.all();
    for (const { slug, entry } of workItems) {
      const title = entry.title?.name ?? slug;
      const summary = entry.summary ?? "";
      const tags = (entry.tags ?? []).join(" ");

      const score =
        scoreText(tokens, title) * 6 +
        scoreText(tokens, tags) * 3 +
        scoreText(tokens, summary) * 2;

      if (score <= 0) continue;

      results.push({
        type: "work",
        title,
        href: `/work/${slug}`,
        summary: summary || undefined,
        meta: entry.year ? String(entry.year) : undefined,
        score,
      });
    }

    results.sort((a, b) => b.score - a.score);
    const top = results.slice(0, 6).map(({ score, ...rest }) => rest);

    const answer =
      top.length > 0
        ? "Here are the most relevant links from my portfolio content."
        : "No strong matches yet—try different keywords or publish more content.";

    return NextResponse.json({ mode, query, answer, results: top });
  }

  // rag mode placeholder (we will wire later)
  return NextResponse.json({
    mode,
    query,
    answer:
      "RAG mode isn’t wired yet. For now, set ASK_DOUG_MODE=search to get grounded keyword results.",
    results: [],
  });
}
