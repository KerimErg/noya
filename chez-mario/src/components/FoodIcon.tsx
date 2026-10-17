export type IconName = "kebab" | "wrap" | "plate" | "grill" | "burger" | "tacos" | "kids" | "fries" | "plus" | "drink" | "star" | "menu";

/** Pictogrammes au trait pour les catégories (utilisés tant qu'il n'y a pas de photo). */
export function FoodIcon({ name, className }: { name: IconName; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    kebab: (
      <>
        <path {...p} d="M8 30c2-10 10-16 24-16s22 6 24 16c-4 12-12 20-24 20S12 42 8 30z" />
        <path {...p} d="M12 30c6 3 12 4 20 4s14-1 20-4" />
        <path {...p} d="M18 26l4-4M28 24l2-5M38 24l-1-5M46 26l-3-4" />
      </>
    ),
    wrap: <path {...p} d="M16 50l22-36c3-4 9-3 11 1l3 6c2 4 0 8-3 10L22 54zM24 40l12 6M30 30l12 6" />,
    plate: (
      <>
        <ellipse {...p} cx="32" cy="38" rx="24" ry="12" />
        <path {...p} d="M18 34c4-8 10-10 14-10s10 2 14 10M24 32l4-4M36 30l4 3" />
      </>
    ),
    grill: (
      <>
        <path {...p} d="M10 26h44l-4 10H14zM18 36l-4 16M46 36l4 16M32 36v16" />
        <path {...p} d="M22 20c0-4 4-4 4-8M32 20c0-4 4-4 4-8M42 20c0-4 4-4 4-8" />
      </>
    ),
    burger: (
      <>
        <path {...p} d="M12 28c0-9 9-16 20-16s20 7 20 16z" />
        <path {...p} d="M10 34h44M12 40c6 3 12-3 20 0s14 3 20 0M14 46h36c0 4-3 6-6 6H20c-3 0-6-2-6-6z" />
      </>
    ),
    tacos: (
      <>
        <rect {...p} x="10" y="18" width="44" height="28" rx="8" />
        <path {...p} d="M18 18l10 28M30 18l10 28M42 18l8 22" />
      </>
    ),
    kids: (
      <>
        <path {...p} d="M14 26h36l-4 26H18z" />
        <path {...p} d="M24 26v-6a8 8 0 0116 0v6M26 38h12" />
      </>
    ),
    fries: (
      <>
        <path {...p} d="M18 30h28l-4 22H22z" />
        <path {...p} d="M22 30l-2-16M28 30l-1-18M34 30v-17M40 30l2-16M45 30l3-12" />
      </>
    ),
    plus: (
      <>
        <circle {...p} cx="32" cy="32" r="20" />
        <path {...p} d="M32 22v20M22 32h20" />
      </>
    ),
    drink: (
      <>
        <path {...p} d="M20 20h24l-3 34H23z" />
        <path {...p} d="M34 20l4-10h6M21 30h22" />
      </>
    ),
    star: <path {...p} d="M32 10l6.5 14 15.5 2-11.5 10.5L45.5 52 32 44l-13.5 8 3-15.5L10 26l15.5-2z" />,
    menu: (
      <>
        <path {...p} d="M8 34c1-7 7-11 16-11s15 4 16 11c-3 8-8 13-16 13S11 42 8 34z" />
        <path {...p} d="M44 26h12l-2 24h-8zM48 26l2-8" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
