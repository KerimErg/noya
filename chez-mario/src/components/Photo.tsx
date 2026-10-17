import manifest from "@/content/images.generated.json";
import { FoodIcon, type IconName } from "./FoodIcon";

type Variant = { ratio: number; widths: number[]; alpha?: boolean };
type Entry = { kind: "product" | "hero"; alpha?: boolean; variants: Record<string, Variant> };
const images = manifest as Record<string, Entry>;

export const hasPhoto = (name?: string | null) => !!name && name in images;
export const isCutout = (name?: string | null) => !!name && !!images[name]?.alpha;

/**
 * Photo optimisée (AVIF + WebP, tailles adaptées à l'écran).
 * Sans photo : visuel de remplacement avec le pictogramme de la catégorie.
 */
export function Photo({
  name,
  alt,
  icon = "kebab",
  sizes = "(min-width: 1024px) 25vw, 60vw",
  priority = false,
  className = "",
  imgClassName = "",
}: {
  name?: string | null;
  alt: string;
  icon?: IconName;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const entry = name ? images[name] : undefined;
  if (!entry) {
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-cream-dark ${className}`} role="img" aria-label={alt}>
        <FoodIcon name={icon} className="h-1/3 w-1/3 text-ink/30" />
        <span className="absolute bottom-2 left-2 rounded-full border-2 border-ink bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">Photo à venir</span>
      </div>
    );
  }
  const main = entry.variants.default;
  const mobile = entry.variants["-m"];
  const srcset = (suffix: string, v: Variant, fmt: string) => v.widths.map((w) => `/img/${name}${suffix}-${w}.${fmt} ${w}w`).join(", ");
  const big = main.widths[main.widths.length - 1];
  return (
    <picture className={`block overflow-hidden ${entry.alpha ? "" : "bg-tile"} ${className}`}>
      {mobile && <source media="(max-width: 767px)" type="image/avif" srcSet={srcset("-m", mobile, "avif")} sizes="100vw" />}
      {mobile && <source media="(max-width: 767px)" type="image/webp" srcSet={srcset("-m", mobile, "webp")} sizes="100vw" />}
      <source type="image/avif" srcSet={srcset("", main, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("", main, "webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${big}.webp`}
        alt={alt}
        width={big}
        height={Math.round(big / main.ratio)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full ${entry.alpha ? "object-contain" : "object-cover"} ${imgClassName}`}
      />
    </picture>
  );
}
