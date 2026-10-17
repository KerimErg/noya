import type { Metadata } from "next";
import { MENU_CONTENT, allergensNote, formatPrice, menu, type Color, type MenuCategory, type MenuItem } from "@/content/menu";
import { site } from "@/content/site";
import { CategoryNav } from "@/components/CategoryNav";
import { Photo, hasPhoto, isCutout } from "@/components/Photo";
import { FoodIcon } from "@/components/FoodIcon";
import { BadgeList } from "@/components/Badges";
import { Cloud, Coin } from "@/components/Deco";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "La carte — kebab, tacos, burgers",
  description: "La carte de Chez Mario à Erstein : sandwichs kebab et yufka, assiettes, burgers, tacos, menus enfant, à-côtés et boissons, avec les prix.",
  alternates: { canonical: "/carte" },
};

const BG: Record<Color, string> = { red: "bg-mario", green: "bg-luigi", blue: "bg-royal", yellow: "bg-coin" };
const PRICE_COL = "w-[4.6rem] shrink-0 text-right sm:w-24";

function Price({ value, strong = false }: { value: number | null; strong?: boolean }) {
  return <span className={`font-display text-lg tabular-nums sm:text-xl ${strong ? "text-mario-dark" : "text-ink"}`}>{formatPrice(value)}</span>;
}

function ItemRow({ item, category, level }: { item: MenuItem; category: MenuCategory; level: 3 | 4 }) {
  const thumb = hasPhoto(item.photo);
  const H = level === 3 ? "h3" : "h4";
  return (
    <li className="flex items-center gap-3 py-3.5 sm:gap-4">
      {thumb && (
        <Photo
          name={item.photo}
          alt={item.name}
          icon={category.icon}
          sizes="72px"
          className={`h-14 w-14 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem] ${isCutout(item.photo) ? "" : "rounded-2xl border-[3px] border-ink"}`}
        />
      )}
      <div className="min-w-0 flex-1">
        <H className="font-display text-lg uppercase leading-tight sm:text-xl">
          {item.name}
          {item.detail && <span className="ml-1.5 font-sans text-xs font-bold normal-case text-ink-soft">({item.detail})</span>}
        </H>
        {item.description && <p className="mt-0.5 text-sm font-semibold text-ink-soft">{item.description}</p>}
        <BadgeList badges={item.badges} className="mt-1.5" />
      </div>
      <div className={PRICE_COL}>
        <Price value={item.price} />
        {item.priceSuffix && <span className="block text-[11px] font-bold text-ink-soft">{item.priceSuffix}</span>}
      </div>
      {category.menuSupplement !== undefined && (
        <div className={PRICE_COL}>
          <Price value={item.price === null ? null : item.price + category.menuSupplement} strong />
        </div>
      )}
    </li>
  );
}

function CategoryBlock({ c }: { c: MenuCategory }) {
  const light = c.color === "yellow";
  return (
    <section id={c.id} className="scroll-mt-[64px] pt-12 md:pt-16" aria-labelledby={`${c.id}-title`}>
      {/* En-tête de rubrique */}
      <header className={`relative mb-6 flex items-center gap-4 overflow-hidden rounded-[1.75rem] border-[3px] border-ink p-5 shadow-pop md:p-7 ${BG[c.color]}`} data-reveal>
        <div className="min-w-0 flex-1">
          <h2 id={`${c.id}-title`} className={`display outlined text-[clamp(2.3rem,8vw,3.6rem)] ${light ? "text-white" : "text-white"}`}>
            {c.title}
          </h2>
          {c.intro && <p className={`mt-2 font-bold ${light ? "text-ink" : "text-white"}`}>{c.intro}</p>}
          {c.menuSupplement !== undefined && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-3 py-1 text-sm font-extrabold text-ink">
              <Coin className="h-5 w-5" /> En menu : + {c.menuSupplement} € ({MENU_CONTENT})
            </p>
          )}
        </div>
        <div className="w-24 shrink-0 sm:w-32 md:w-40">
          {c.photo ? (
            <Photo name={c.photo} alt="" icon={c.icon} sizes="160px" className="aspect-square w-full rotate-3 rounded-full border-[3px] border-ink" />
          ) : (
            <span className="grid aspect-square w-full rotate-3 place-items-center rounded-full border-[3px] border-ink bg-white">
              <FoodIcon name={c.icon} className="h-1/2 w-1/2 text-ink" />
            </span>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {c.sections.map((s, i) => (
          <div key={s.title ?? i} className={`card p-4 sm:p-6 ${c.sections.length === 1 && !c.steps ? "lg:col-span-2" : ""}`} data-reveal>
            {(s.title || c.menuSupplement !== undefined) && (
              <div className="mb-1 flex items-end gap-3 border-b-[3px] border-dashed border-ink/20 pb-2 sm:gap-4">
                {s.title ? <h3 className="min-w-0 flex-1 font-display text-xl uppercase text-ink-soft sm:text-2xl">{s.title}</h3> : <span className="flex-1" />}
                {c.menuSupplement !== undefined && (
                  <>
                    <span className={`${PRICE_COL} text-xs font-extrabold uppercase tracking-wider text-ink-soft`}>Seul</span>
                    <span className={`${PRICE_COL} text-xs font-extrabold uppercase tracking-wider text-mario-dark`}>Menu</span>
                  </>
                )}
              </div>
            )}
            <ul className="divide-y-2 divide-dashed divide-ink/10">
              {s.items.map((it) => (
                <ItemRow key={it.id} item={it} category={c} level={s.title ? 4 : 3} />
              ))}
            </ul>
          </div>
        ))}

        {c.steps && (
          <div className="card p-4 sm:p-6" data-reveal>
            <div className="grid gap-5">
              {c.steps.map((st) => (
                <div key={st.title}>
                  <h3 className="mb-2 font-display text-xl uppercase text-ink-soft sm:text-2xl">{st.title}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {st.items.map((x) => (
                      <li key={x} className="rounded-full border-2 border-ink bg-sky-light px-3 py-1 text-sm font-bold">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {c.note && <p className="mt-4 text-sm font-semibold text-ink-soft">{c.note}</p>}
    </section>
  );
}

export default function CartePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-ink bg-gradient-to-b from-sky to-sky-light pb-10 pt-28 md:pb-14 md:pt-36">
        <Cloud className="absolute left-[6%] top-24 w-24 md:w-36" />
        <Cloud className="absolute right-[8%] top-32 w-20 md:w-28" />
        <div className="container-x relative">
          <p className="eyebrow mb-4">Chez Mario · Erstein</p>
          <h1 className="display outlined text-[clamp(3.8rem,16vw,8rem)] text-white">
            La <span className="text-coin">carte</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg font-bold text-ink">
            Une question sur un produit ?{" "}
            <a href={`tel:${site.phone.tel}`} className="whitespace-nowrap text-mario-dark underline decoration-[3px] underline-offset-4">
              {site.phone.display}
            </a>
          </p>
        </div>
      </section>

      <CategoryNav items={menu.map((c) => ({ id: c.id, title: c.title, color: c.color }))} />

      <div className="container-x pb-20">
        {menu.map((c) => (
          <CategoryBlock key={c.id} c={c} />
        ))}

        <aside className="card mt-14 flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-ink-soft">
            <strong className="text-ink">Allergènes :</strong> {allergensNote} Prix en euros TTC.
          </p>
          <a href={`tel:${site.phone.tel}`} className="btn btn-red hidden md:inline-flex">
            <PhoneIcon className="h-4 w-4" /> Appeler le restaurant
          </a>
        </aside>
      </div>
    </>
  );
}
