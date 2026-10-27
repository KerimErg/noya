import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { site } from "@/content/site";
import { businessJsonLd, seoDescription, seoTitle } from "@/lib/seo";
import "lenis/dist/lenis.css";
import "./globals.css";

// Polices auto-hébergées (aucun appel à Google Fonts).
const sans = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
const serif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seoTitle, template: `%s · ${site.name}` },
  description: seoDescription,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_FR", url: "/", siteName: site.name, title: seoTitle, description: seoDescription },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#0B0B0B", width: "device-width", initialScale: 1 };

// Active les états initiaux des animations ; filet de sécurité : si le JS n'a pas démarré en 4 s, on affiche tout.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion'))d.classList.remove('js')},4000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }} />
      </head>
      <body>
        <a href="#contenu" className="sr-only z-[70] bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <div data-cursor aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] -ml-1.5 -mt-1.5 hidden h-3 w-3 rounded-full bg-white opacity-0 mix-blend-difference lg:block" />
        <Motion />
      </body>
    </html>
  );
}
