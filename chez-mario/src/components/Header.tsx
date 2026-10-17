"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "La carte" },
  { href: "/contact", label: "Infos & contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-white/[0.06] bg-coal/90 backdrop-blur-md" : "bg-gradient-to-b from-black/70 to-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Chez Mario — accueil" className="rounded-full">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`font-display text-[13px] font-bold uppercase tracking-wider transition hover:text-mario-bright ${pathname === l.href ? "text-mario-bright" : "text-cream/85"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/carte" className="btn btn-line hidden h-11 lg:inline-flex">
            Voir la carte
          </Link>
          <a href={`tel:${site.phone.tel}`} className="btn btn-red hidden h-11 md:inline-flex">
            <PhoneIcon className="h-4 w-4" /> {site.phone.display}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Menu mobile" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/[0.06] bg-coal px-5 pb-32 pt-6 md:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined} className={`display block py-3 text-5xl ${pathname === l.href ? "text-mario-bright" : ""}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-muted">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </p>
        </nav>
      )}
    </header>
  );
}
