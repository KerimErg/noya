"use client";

/** Flèches ← → qui font défiler un carrousel horizontal (en plus du glisser au doigt). */
export function CarouselArrows({ target, className = "" }: { target: string; className?: string }) {
  const go = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 12 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const btn = "btn btn-white h-11 w-11 shrink-0 rounded-full px-0 text-xl";
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button type="button" onClick={() => go(-1)} className={btn} aria-label="Photo précédente" aria-controls={target}>
        ←
      </button>
      <span className="text-sm font-bold text-white/85">Fais glisser ou appuie</span>
      <button type="button" onClick={() => go(1)} className={btn} aria-label="Photo suivante" aria-controls={target}>
        →
      </button>
    </div>
  );
}
