import type { CSSProperties } from "react";
import { type MediaKey, media, mediaAlt, mediaUrl } from "@/content/media";

type PictureProps = {
  name: MediaKey;
  /** Responsive `sizes` attribute — always set it to the rendered width. */
  sizes: string;
  alt?: string;
  /** Above-the-fold images: eager load + high fetch priority. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
  /** Show the blurred placeholder behind the image while it loads. */
  placeholder?: boolean;
  style?: CSSProperties;
  /** Phones (≤767px): cap the candidate widths and use their own `sizes`. */
  mobile?: { maxWidth: number; sizes: string };
};

/**
 * Art-directed <picture> for pre-generated AVIF/WebP variants.
 * Width/height are always set so the browser reserves space (no layout shift).
 */
export function Picture({
  name,
  sizes,
  alt,
  priority,
  className,
  imgClassName,
  position,
  placeholder = true,
  style,
  mobile,
}: PictureProps) {
  const info = media[name];
  const srcSet = (format: "avif" | "webp", max = Infinity) =>
    info.widths
      .filter((w) => w <= max)
      .map((w) => `${mediaUrl(name, w, format)} ${w}w`)
      .join(", ");
  const fallbackWidth = info.widths.find((w) => w >= 1080) ?? info.widths.at(-1)!;

  return (
    <picture
      className={className}
      style={{
        ...(placeholder && !info.alpha
          ? { backgroundImage: `url(${info.lqip})`, backgroundSize: "cover", backgroundPosition: position ?? "center" }
          : null),
        ...style,
      }}
    >
      {mobile && (
        <>
          <source media="(max-width: 767px)" type="image/avif" srcSet={srcSet("avif", mobile.maxWidth)} sizes={mobile.sizes} />
          <source media="(max-width: 767px)" type="image/webp" srcSet={srcSet("webp", mobile.maxWidth)} sizes={mobile.sizes} />
        </>
      )}
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={mediaUrl(name, fallbackWidth, "webp")}
        alt={alt ?? mediaAlt[name]}
        width={info.width}
        height={info.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={imgClassName}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
