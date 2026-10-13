import type { ReactNode } from "react";

/**
 * Headline accents: wrap words in asterisks — "Homes we design *and build.*" —
 * to set them in the italic serif. Non-string titles pass through untouched.
 */
export function withAccent(node: ReactNode): ReactNode {
  if (typeof node !== "string" || !node.includes("*")) return node;
  return node.split(/(\*[^*]+\*)/).map((part, i) =>
    part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}

/** Plain-text version of an accented title (for aria-labels and metadata). */
export function stripAccent(text: string) {
  return text.replace(/\*/g, "");
}
