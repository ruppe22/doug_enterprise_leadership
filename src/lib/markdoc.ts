import Markdoc, { type Config } from "@markdoc/markdoc";
import React from "react";

/**
 * Minimal Markdoc renderer for Keystatic `fields.markdoc` content.
 *
 * Keystatic's reader returns the configured `contentField` as a function.
 * Example: `const { node } = await entry.body();`
 *
 * We accept either:
 *  - the function (preferred)
 *  - the resolved `{ node }` object
 *  - a raw Markdoc AST node
 */
export type KeystaticMarkdocSource =
  | (() => Promise<{ node: unknown }>)
  | { node: unknown }
  | unknown;

const config: Config = {
  // Add custom tags/nodes later when you introduce callouts, cards, etc.
  tags: {},
  nodes: {},
};

export async function renderMarkdoc(source: KeystaticMarkdocSource) {
  const resolved =
    typeof source === "function" ? await (source as any)() : (source as any);

  const rawNode =
    resolved && typeof resolved === "object" && "node" in resolved
      ? (resolved as any).node
      : resolved;

  // Support plain strings (e.g., if you ever pass raw markdown in)
  const node = typeof rawNode === "string" ? Markdoc.parse(rawNode) : rawNode;

  if (!node) return null;

  // Optional: validate (keeps errors actionable)
  const errors = Markdoc.validate(node as any, config);
  if (errors.length) {
    console.error("Invalid Markdoc:", errors);
  }

  const content = Markdoc.transform(node as any, config);

  return Markdoc.renderers.react(content, React, {
    components: {},
  });
}
