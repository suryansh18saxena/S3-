/**
 * Client testimonials.
 *
 * Intentionally empty. The four quotes on the existing site cannot be treated as
 * authentic: the same quotes are attributed to different people on different
 * pages (e.g. the quote credited to "Hariharan" on the homepage is credited to
 * "Sujit Satpute" on the About page). Fabricated or unverifiable reviews must
 * not be published.
 *
 * To add a testimonial, S3 needs: the client's written consent, their name as
 * they want it shown, the project type and city, and ideally a link to the
 * public source (for example a Google review). The homepage section and the
 * structured data appear automatically once this list has entries.
 */

export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  city: string;
  /** Public URL of the original review, if one exists. */
  sourceUrl?: string;
  /** ISO date the client approved publication. */
  consentDate: string;
};

export const testimonials: Testimonial[] = [];
