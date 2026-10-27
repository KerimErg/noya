"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { lenisRef, scrollToId } from "./Motion";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) lenisRef.current?.stop();
    else lenisRef.current?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Sur l'accueil, les ancres défilent en douceur ; ailleurs, elles ramènent à l'accueil.
  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname !== "/") return;
    e.preventDefault();
    scrollToId(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* mix-blend-difference : le texte blanc devient noir sur fond clair, blanc sur fond noir. */}
      <header data-header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference transition-transform duration-700 ease-silk [&.is-hidden]:-translate-y-full">
        <div className="container-x flex items-center justify-between py-5 md:py-7">
          <Link href="/" className="text-[13px] font-semibold uppercase tracking-[0.35em]" aria-label={`${site.name} — accueil`}>
            {site.shortName}
            <span className="serif ml-1 normal-case tracking-normal text-[15px]">atelier</span>
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-10 text-[13px] md:flex">
            {nav.map((item) => (
              <a key={item.id} href={`/#${item.id}`} onClick={go(item.id)} className="link-line">
                {item.label}
              </a>
            ))}
          </nav>
          <a href={`tel:${site.phoneHref}`} className="link-line hidden text-[13px] md:inline">
            {site.phone}
          </a>
          <button type="button" onClick={() => setOpen(true)} className="label md:hidden" aria-expanded={open} aria-controls="menu-mobile">
            Menu
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`fixed inset-0 z-[60] flex flex-col bg-ink text-paper transition-[clip-path] duration-700 ease-silk md:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="container-x flex items-center justify-between py-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.35em]">{site.shortName}</span>
          <button type="button" onClick={() => setOpen(false)} className="label">
            Fermer
          </button>
        </div>
        <nav aria-label="Navigation mobile" className="container-x mt-auto flex flex-col gap-2 pb-10">
          {nav.map((item, i) => (
            <a key={item.id} href={`/#${item.id}`} onClick={go(item.id)} className="display flex items-baseline gap-4 border-b border-white/10 py-3 text-5xl">
              <span className="label text-stone">0{i + 1}</span>
              {item.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-1 text-stone-light">
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </nav>
      </div>
    </>
  );
}
