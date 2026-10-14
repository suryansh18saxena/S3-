import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { OG_IMAGE, organizationJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PointerEffects } from "@/components/motion/PointerEffects";
import { InlineScript } from "@/components/ui/InlineScript";
import { JsonLd } from "@/components/ui/JsonLd";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Italic accent face for a few words per headline — one small file.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
  // Accent only: never let it compete with the hero photograph for bandwidth.
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "S3 Infrastructure — Architects, Interior Designers & Builders in Chennai",
    template: `%s | ${site.name}`,
  },
  description:
    "S3 Infrastructure designs and builds homes in Chennai, Hosur and Bengaluru: architectural design, interior design, turnkey construction, structural engineering and renovation under one roof.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#071a2b",
  colorScheme: "light",
};

/**
 * Before first paint: flag JS, decide whether the homepage intro has already
 * played this session, show the loading screen on the first page load of a
 * session (not with reduced motion), and arm a fallback that reveals content
 * if the motion system never boots. `__s3LoaderEnd` lets client timers wait
 * for the curtain (see loaderDelay in lib/motion.ts).
 */
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('s3:intro')){d.classList.add('intro-seen')}if(!sessionStorage.getItem('s3:loaded')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('s3:loaded','1');d.classList.add('show-loader');window.__s3LoaderEnd=performance.now()+2200;setTimeout(function(){d.classList.add('loader-done')},2200);setTimeout(function(){d.classList.add('loader-gone')},3200)}}catch(e){}setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.add('reveal-fallback')}},6500)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${manrope.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={boot} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[200] -translate-y-24 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteLoader />
        <SiteHeader />
        <MotionProvider />
        <main id="main">{children}</main>
        <SiteFooter />
        <PointerEffects />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
