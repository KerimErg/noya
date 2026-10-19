"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";
import { CallLink } from "@/components/CallLink";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "La carte" },
  { href: "/contact", label: "Infos & contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Accueil avec bannière, en haut de page, sur mobile : le logo est déjà sur l'image
  const overBanner = pathname === "/" && !!site.heroBanner && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${scrolled || open ? "border-b-[3px] border-ink bg-white" : "border-b-[3px] border-transparent bg-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Chez Mario — accueil" className={`relative z-10 -mb-2 self-start rounded-xl pt-1.5 ${overBanner ? "max-md:invisible" : ""}`}>
          <Logo className={`transition-[height] duration-300 ${scrolled || open ? "h-[60px]" : "h-[78px] md:h-[112px]"}`} />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-3 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 font-display text-[15px] uppercase tracking-wide transition hover:bg-coin ${pathname === l.href ? "bg-white text-mario shadow-pop-sm ring-2 ring-ink" : "text-ink"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/carte" className="btn btn-white hidden h-11 lg:inline-flex">
            Voir la carte
          </Link>
          <CallLink className="btn btn-red hidden h-11 md:inline-flex">
            <PhoneIcon className="h-4 w-4" /> {site.phone.display}
          </CallLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border-[3px] border-ink bg-white shadow-pop-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Menu mobile" className="h-[calc(100dvh-72px)] overflow-y-auto bg-sky-light px-5 pb-32 pt-6 md:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined} className={`display block py-3 text-5xl ${pathname === l.href ? "text-mario" : "text-ink"}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-semibold text-ink-soft">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </p>
        </nav>
      )}
    </header>
  );
}
