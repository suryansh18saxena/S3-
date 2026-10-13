import type { Metadata } from "next";
import { mapsUrl, site } from "@/content/site";
import { expertise } from "@/content/services";

export const OG_IMAGE = { url: "/og/s3-infrastructure.jpg", width: 1200, height: 630, alt: "S3 Infrastructure — architecture, interiors and turnkey construction in Chennai" };

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is (no "| S3 Infrastructure" suffix). */
  absoluteTitle?: boolean;
};

export function pageMeta({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: absoluteTitle ? title : `${title} | ${site.name}`, description, images: [OG_IMAGE.url] },
  };
}

const abs = (path: string) => new URL(path, site.url).toString();

/** LocalBusiness-style organisation data. No ratings or reviews: none are verified. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "ProfessionalService"],
    "@id": abs("/#organization"),
    name: site.name,
    alternateName: site.shortName,
    description:
      "Chennai-based architecture, interior design and construction company offering architectural design, interior design, turnkey residential construction, structural design and renovation.",
    url: site.url,
    logo: abs("/brand/s3-logo.png"),
    image: abs(OG_IMAGE.url),
    telephone: site.phones.map((p) => p.display.replace(/\s/g, "")),
    email: site.email,
    hasMap: mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })),
    employee: {
      "@type": "Person",
      name: site.director.name,
      jobTitle: site.director.role,
    },
    knowsAbout: expertise.map((e) => e.title),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: abs(path),
    serviceType: name,
    provider: { "@id": abs("/#organization") },
    areaServed: site.serviceAreas.map((city) => ({ "@type": "City", name: city })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
