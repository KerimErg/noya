import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActions } from "@/components/StickyActions";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content/site";
import { restaurantJsonLd, seoDescription } from "@/lib/seo";
import "./globals.css";

// Polices auto-hébergées (aucun appel à Google Fonts).
const display = localFont({
  src: [
    { path: "../fonts/montserrat-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/montserrat-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});
const sans = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 800",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Chez Mario — Kebab, tacos & burgers à Erstein", template: "%s · Chez Mario Erstein" },
  description: seoDescription,
  keywords: ["kebab Erstein", "tacos Erstein", "burger Erstein", "yufka Erstein", "lahmacun Erstein", "restaurant Erstein", "Chez Mario Erstein"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Chez Mario",
    title: "Chez Mario — Kebab, tacos & burgers à Erstein",
    description: seoDescription,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Avant l'affichage : active les animations (classe .js) et remet la page en haut au rechargement.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if('scrollRestoration' in history)history.scrollRestoration='manual';var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){window.scrollTo(0,0);addEventListener('load',function(){window.scrollTo(0,0)})}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }} />
      </head>
      <body>
        <a href="#contenu" className="sr-only z-[60] rounded-full bg-coin px-4 py-2 font-bold text-coal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <StickyActions />
        <RevealObserver />
      </body>
    </html>
  );
}
