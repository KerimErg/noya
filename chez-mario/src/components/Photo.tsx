import manifest from "@/content/images.generated.json";
import type { MenuCategory } from "@/content/menu";
import { FoodIcon } from "./FoodIcon";

type Variant = { ratio: number; widths: number[] };
type Entry = { kind: "product" | "hero"; variants: Record<string, Variant> };
const images = manifest as Record<string, Entry>;

export const hasPhoto = (name?: string | null) => !!name && name in images;

/**
 * Photo optimisée (AVIF + WebP, tailles adaptées à l'écran).
 * Sans photo : visuel de remplacement sombre avec le pictogramme de la catégorie.
 */
export function Photo({
  name,
  alt,
  icon = "kebab",
  sizes = "(min-width: 1024px) 33vw, 80vw",
  priority = false,
  className = "",
}: {
  name?: string | null;
  alt: string;
  icon?: MenuCategory["icon"];
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const entry = name ? images[name] : undefined;
  if (!entry) {
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-[radial-gradient(70%_60%_at_50%_60%,rgba(255,122,26,.28),transparent_70%),linear-gradient(160deg,#1d1d1d,#0f0f0f)] ${className}`} role="img" aria-label={alt}>
        <FoodIcon name={icon} className="h-1/3 w-1/3 text-cream/25" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-coin">Photo à venir</span>
      </div>
    );
  }
  const main = entry.variants.default;
  const mobile = entry.variants["-m"];
  const srcset = (suffix: string, v: Variant, fmt: string) => v.widths.map((w) => `/img/${name}${suffix}-${w}.${fmt} ${w}w`).join(", ");
  return (
    <picture className={`block overflow-hidden ${className}`}>
      {mobile && <source media="(max-width: 767px)" type="image/avif" srcSet={srcset("-m", mobile, "avif")} sizes="100vw" />}
      {mobile && <source media="(max-width: 767px)" type="image/webp" srcSet={srcset("-m", mobile, "webp")} sizes="100vw" />}
      <source type="image/avif" srcSet={srcset("", main, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("", main, "webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${main.widths[main.widths.length - 1]}.webp`}
        alt={alt}
        width={main.widths[main.widths.length - 1]}
        height={Math.round(main.widths[main.widths.length - 1] / main.ratio)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </picture>
  );
}
