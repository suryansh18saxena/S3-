import type { CSSProperties, ReactNode } from "react";
import type { MediaKey } from "@/content/media";
import { Picture } from "@/components/ui/Picture";
import { withAccent } from "@/lib/accent";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { KineticTitle } from "./KineticTitle";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  crumbs: Crumb[];
  image?: MediaKey;
  imageAlt?: string;
  imagePosition?: string;
  /** Small caption under the image, e.g. "Representative photography". */
  caption?: string;
  children?: ReactNode;
};

/**
 * Inner-page opening: breadcrumb, oversized headline with a lede beside it,
 * then a wide image that unfolds from a smaller frame as it enters.
 */
export function PageHero({ eyebrow, title, lede, crumbs, image, imageAlt, imagePosition, caption, children }: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-paper pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+5rem)] ${image ? "" : "pb-14 md:pb-20"}`}
    >
      <div className="blueprint-light pointer-events-none absolute inset-x-0 top-0 h-[34rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="shell relative">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="enter eyebrow flex items-center gap-4 text-blue-600">
              <span aria-hidden className="h-px w-10 bg-current opacity-50" />
              {eyebrow}
            </p>
            <h1 className="mt-6 max-w-[15ch] text-h1 text-ink" style={{ "--accent": "var(--color-blue-700)" } as CSSProperties}>
              {typeof title === "string" ? <KineticTitle text={title} delay={0.1} /> : withAccent(title)}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="enter text-lede text-slate-600" style={{ "--d": "0.25s" } as CSSProperties}>
              {lede}
            </p>
            {children && (
              <div className="enter mt-8 flex flex-wrap gap-3" style={{ "--d": "0.35s" } as CSSProperties}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
      {image && (
        <div className="shell relative mt-14 md:mt-20">
          <figure>
            <div className="enter-frame media-frame aspect-[4/3] rounded-[var(--radius-panel)] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Picture
                name={image}
                alt={imageAlt}
                priority
                position={imagePosition}
                sizes="(min-width: 1536px) 1440px, 92vw"
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            {caption && <figcaption className="mt-3 text-[0.78rem] text-slate-500">{caption}</figcaption>}
          </figure>
        </div>
      )}
    </section>
  );
}
