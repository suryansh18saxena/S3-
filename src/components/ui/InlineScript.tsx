/**
 * Runs synchronously while the HTML is parsed (before first paint). On the
 * client the type flips to text/plain so React never re-executes or warns.
 * Pattern from Next.js' "Preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
