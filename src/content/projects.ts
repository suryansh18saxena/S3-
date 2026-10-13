/**
 * Completed S3 Infrastructure projects (case studies).
 *
 * Intentionally empty. The "portfolio" items on the existing WordPress site
 * (Crown House, Casa El Maqui, Rob Villa…) are demo content shipped with the
 * theme, and the photographs on the current pages are stock, AI-generated or
 * third-party images. None of them can be presented as S3 work.
 *
 * To publish a project, add an entry with real photography (put the files in
 * assets/source, register them in scripts/media.config.mjs and run
 * `npm run images`). The Projects page renders every entry automatically.
 */
import type { MediaKey } from "./media";

export type Project = {
  slug: string;
  name: string;
  typology: "Independent house" | "Villa" | "Duplex house" | "Bungalow" | "Apartment" | "Row house" | "Commercial" | "Interior" | "Renovation";
  city: string;
  year?: number;
  scope: string[];
  summary: string;
  cover: MediaKey;
  gallery?: MediaKey[];
  /** Built-up area in sq.ft, if the client is happy to publish it. */
  area?: number;
};

export const projects: Project[] = [];
