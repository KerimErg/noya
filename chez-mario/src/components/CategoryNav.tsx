"use client";

import { useEffect, useRef, useState } from "react";

/** Barre de catégories collante, qui suit la section affichée. */
const ACTIVE: Record<string, string> = { red: "bg-mario text-white", green: "bg-luigi-dark text-white", blue: "bg-royal text-white", yellow: "bg-coin text-ink" };

export function CategoryNav({ items }: { items: { id: string; title: string; color: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // Section active = la dernière dont le haut est passé sous la barre collante
      const line = 88 + 64 + 24; // scroll-padding (88) + barre de catégories (64) + marge
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // En bas de page, la dernière catégorie
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items[items.length - 1]?.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  // Garde la pastille active visible dans la barre
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (el && list) list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Catégories de la carte" className="sticky top-[72px] z-30 border-b-[3px] border-ink bg-cream">
      <ul ref={listRef} className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3 pr-6">
        {items.map((i) => (
          <li key={i.id} data-id={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              data-color={i.color}
              aria-current={active === i.id ? "true" : undefined}
              className={`inline-flex h-10 items-center rounded-full border-[3px] border-ink px-4 font-display text-[14px] uppercase tracking-wide transition ${active === i.id ? `${ACTIVE[i.color]} shadow-pop-sm` : "bg-white text-ink hover:bg-coin-light"}`}
            >
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
