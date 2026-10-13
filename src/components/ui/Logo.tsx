/**
 * The supplied S3 Infrastructure logo, used as-is. `onDark` swaps in a
 * pixel-level recolour (grey → near-white, brand blue untouched) generated from
 * the original file, so the artwork itself is never redrawn.
 * Sized variants (160/320/500w) keep the header logo around 11 KB.
 */
export function Logo({
  onDark = false,
  className = "",
  priority = false,
  sizes = "70px",
}: {
  onDark?: boolean;
  className?: string;
  priority?: boolean;
  /** Rendered width, e.g. "150px" in the footer. */
  sizes?: string;
}) {
  const base = onDark ? "/brand/s3-logo-on-dark" : "/brand/s3-logo";
  return (
    // Pre-sized static asset in a static export; next/image would add nothing here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-160.webp`}
      srcSet={`${base}-160.webp 160w, ${base}-320.webp 320w, ${base}.webp 500w`}
      sizes={sizes}
      alt="S3 Infrastructure — Architects & Interior Designers"
      width={500}
      height={314}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      className={`h-auto ${className}`}
    />
  );
}
