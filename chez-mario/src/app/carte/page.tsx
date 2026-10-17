import type { Metadata } from "next";
import { allergensNote, formatPrice, menu, type MenuCategory, type MenuItem } from "@/content/menu";
import { site } from "@/content/site";
import { CategoryNav } from "@/components/CategoryNav";
import { Photo, hasPhoto } from "@/components/Photo";
import { FoodIcon } from "@/components/FoodIcon";
import { BadgeList } from "@/components/Badges";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "La carte — kebab, tacos, burgers",
  description: "La carte de Chez Mario à Erstein : kebab, yufka, lahmacun, assiettes, grillades, burgers, tacos, menus enfant et boissons, avec les prix.",
  alternates: { canonical: "/carte" },
};

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-[17px] font-extrabold uppercase leading-snug md:text-lg">
          {item.name}
          {item.detail && <span className="ml-2 font-sans text-xs font-medium normal-case text-muted">({item.detail})</span>}
        </h3>
        <span aria-hidden className="min-w-6 flex-1 translate-y-[-4px] border-b-2 border-dotted border-white/15" />
        <span className="shrink-0 font-display text-lg font-black tabular-nums text-coin">
          {item.priceSuffix && <span className="mr-1 font-sans text-xs font-medium text-muted">{item.priceSuffix}</span>}
          {formatPrice(item.price)}
        </span>
      </div>
      {(item.description || item.badges?.length) && (
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <BadgeList badges={item.badges} />
          {item.description && <p className="text-sm text-muted">{item.description}</p>}
        </div>
      )}
    </li>
  );
}

function ItemCard({ item, category }: { item: MenuItem; category: MenuCategory }) {
  return (
    <li className="card overflow-hidden">
      <div className="relative">
        <Photo name={item.photo} alt={item.name} icon={category.icon} className="aspect-square w-full" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
        <span className="absolute right-3 top-3 rounded-full bg-coin px-3 py-1 font-display text-base font-black text-coal">{formatPrice(item.price)}</span>
      </div>
      <div className="p-5">
        <BadgeList badges={item.badges} className="mb-2" />
        <h3 className="font-display text-xl font-black uppercase">
          {item.name}
          {item.detail && <span className="ml-2 font-sans text-xs font-medium normal-case text-muted">({item.detail})</span>}
        </h3>
        {item.description && <p className="mt-1 text-sm text-muted">{item.description}</p>}
      </div>
    </li>
  );
}

export default function CartePage() {
  return (
    <>
      <section className="grain relative overflow-hidden pb-10 pt-32 md:pb-14 md:pt-40">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(216,30,26,.35),transparent_70%),radial-gradient(40%_60%_at_95%_90%,rgba(255,122,26,.25),transparent_70%)]" />
        <div className="container-x relative">
          <p className="eyebrow mb-3">Chez Mario · Erstein</p>
          <h1 className="display text-[clamp(3.6rem,15vw,8rem)]">
            La <span className="italic text-mario-bright">carte</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-cream/80">
            Une question sur un produit ? <a href={`tel:${site.phone.tel}`} className="font-bold text-coin underline-offset-4 hover:underline">{site.phone.display}</a>
          </p>
        </div>
      </section>

      <CategoryNav items={menu.map((c) => ({ id: c.id, title: c.title }))} />

      <div className="container-x pb-24 pt-6">
        {menu.map((c) => {
          const withPhoto = c.items.filter((i) => hasPhoto(i.photo));
          const rows = c.items.filter((i) => !hasPhoto(i.photo));
          return (
            <section key={c.id} id={c.id} className="scroll-mt-[64px] border-b border-white/[0.06] py-12 md:py-16" aria-labelledby={`${c.id}-title`}>
              <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
                <header data-reveal>
                  <FoodIcon name={c.icon} className="mb-4 h-12 w-12 text-mario-bright" />
                  <h2 id={`${c.id}-title`} className="display text-[clamp(2.4rem,7vw,3.6rem)]">{c.title}</h2>
                  {c.intro && <p className="mt-3 text-muted">{c.intro}</p>}
                  {c.note && (
                    <p className={`mt-4 inline-block rounded-2xl px-4 py-2 font-display text-sm font-extrabold uppercase ${c.id === "boissons" ? "border border-white/15 font-sans text-xs font-medium normal-case text-muted" : "bg-mario text-white"}`}>
                      {c.note}
                    </p>
                  )}
                </header>
                <div data-reveal>
                  {withPhoto.length > 0 && (
                    <ul className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {withPhoto.map((i) => (
                        <ItemCard key={i.id} item={i} category={c} />
                      ))}
                    </ul>
                  )}
                  {rows.length > 0 && <ul className="divide-y divide-white/[0.06] rounded-3xl border border-white/[0.07] bg-coal-800 px-5 md:px-7">{rows.map((i) => <ItemRow key={i.id} item={i} />)}</ul>}
                  {c.groups && (
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      {c.groups.map((g) => (
                        <div key={g.title} className="rounded-3xl border border-white/[0.07] bg-coal-800 p-5">
                          <h3 className="mb-3 font-display text-sm font-black uppercase tracking-wider text-coin">{g.title}</h3>
                          <ul className="flex flex-wrap gap-1.5">
                            {g.items.map((x) => (
                              <li key={x} className="rounded-full border border-white/10 px-3 py-1 text-sm">{x}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        <aside className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-white/[0.07] bg-coal-800 p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">
            <strong className="text-cream">Allergènes :</strong> {allergensNote} Prix en euros TTC.
          </p>
          <a href={`tel:${site.phone.tel}`} className="btn btn-red hidden md:inline-flex">
            <PhoneIcon className="h-4 w-4" /> Appeler le restaurant
          </a>
        </aside>
      </div>
    </>
  );
}
