/** Décors de l'univers « jeu de plateforme » (originaux, en SVG). */

export function Cloud({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 100" className={className} style={style} aria-hidden>
      <path
        d="M40 88c-20 0-32-12-32-26 0-15 13-26 28-25 4-18 20-30 38-28 10-14 34-16 46 0 16-4 34 6 36 24 16 0 30 10 30 27 0 16-12 28-30 28z"
        fill="#fff"
        stroke="#1F1A17"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M60 74c10 6 26 6 36 0M118 70c8 6 20 6 28 0" stroke="#C9EEFF" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Pièce d'or qui tourne sur elle-même. */
export function Coin({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span className={`inline-block [perspective:300px] ${className}`} aria-hidden>
      <span className="block h-full w-full animate-spin3d" style={{ animationDelay: `${delay}s` }}>
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle cx="20" cy="20" r="17" fill="#FFC81F" stroke="#1F1A17" strokeWidth="3" />
          <circle cx="20" cy="20" r="11" fill="none" stroke="#E9A800" strokeWidth="3" />
          <rect x="17.5" y="11" width="5" height="18" rx="2.5" fill="#FFF3B8" />
        </svg>
      </span>
    </span>
  );
}

export function Hills({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 160V96c80-60 200-70 300-20s180 40 260-10 200-60 300 0 160 50 260 10 200-50 320 10v74z" fill="#7DDC8F" stroke="#1F1A17" strokeWidth="5" />
      <path d="M0 160v-30c120-50 260-40 380 0s260 30 400-10 300-30 420 10 180 30 240 0v30z" fill="#2DA84B" stroke="#1F1A17" strokeWidth="5" />
    </svg>
  );
}

/** Étincelle / étoile à 4 branches. */
export function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      <path d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" fill="#FFC81F" stroke="#1F1A17" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

const CLOUDS = [
  { top: "10%", w: 150, dur: 46, delay: -8 },
  { top: "26%", w: 100, dur: 60, delay: -32 },
  { top: "6%", w: 120, dur: 54, delay: -44 },
  { top: "40%", w: 80, dur: 70, delay: -18 },
];

/** Nuages qui traversent le ciel. */
export function DriftingClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CLOUDS.map((c, i) => (
        <Cloud
          key={i}
          className="absolute left-0 motion-reduce:hidden"
          style={{ top: c.top, width: c.w, animation: `drift ${c.dur}s linear ${c.delay}s infinite` }}
        />
      ))}
      {/* Nuages fixes si les animations sont réduites */}
      <Cloud className="absolute left-[8%] top-[12%] hidden w-32 motion-reduce:block" />
      <Cloud className="absolute right-[10%] top-[24%] hidden w-24 motion-reduce:block" />
    </div>
  );
}

/**
 * Transition ondulée entre deux sections : `top` = couleur de la section du dessus,
 * `bottom` = couleur de celle du dessous (classes Tailwind bg-* / fill-*).
 */
export function Wave({ top, bottom, flip = false }: { top: string; bottom: string; flip?: boolean }) {
  const d = flip ? "M0 30 C 240 70 480 70 720 30 S 1200 -10 1440 30" : "M0 30 C 240 -10 480 -10 720 30 S 1200 70 1440 30";
  return (
    <div aria-hidden className={`${top} -mb-px leading-[0]`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full md:h-16">
        <path d={`${d} V80 H0 Z`} className={bottom} />
        <path d={d} fill="none" stroke="#1F1A17" strokeWidth="4" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
