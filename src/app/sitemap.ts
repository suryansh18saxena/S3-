import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/turnkey-construction/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/architectural/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/interior-design/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/renovation/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/structural-engineer/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/construction-cost-calculator/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about-us/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-and-conditions/", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
