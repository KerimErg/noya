import { Fragment } from "react";
import Link from "next/link";
import { MENU_CONTENT, menu, minPrice, type Color } from "@/content/menu";
import { fullAddress, site } from "@/content/site";
import { HeroMedia } from "@/components/HeroMedia";
import { HoursTable, OpenBadge } from "@/components/Hours";
import { MapEmbed } from "@/components/MapEmbed";
import { Photo, hasPhoto } from "@/components/Photo";
import { Mascot } from "@/components/Mascot";
import { Cloud, Coin, DriftingClouds, Hills, Sparkle, Wave } from "@/components/Deco";
import { ArrowIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/Icons";

const BG: Record<Color, string> = { red: "bg-mario", green: "bg-luigi", blue: "bg-royal", yellow: "bg-coin" };

/** Découpe un mot en lettres qui sautent une à une. */
function JumpWord({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  return (
    <span className={`jump-letters inline-block whitespace-nowrap ${className}`} aria-hidden>
      {[...text].map((ch, i) => (
        <span key={i} style={{ "--i": start + i } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function Sticker({ name, className = "", r = 0, delay = 0 }: { name: string; className?: string; r?: number; delay?: number }) {
  return (
    <div className={`absolute animate-float ${className}`} style={{ "--r": `${r}deg`, animationDelay: `${delay}s` } as React.CSSProperties}>
      <Photo name={name} alt="" priority sizes="(min-width:768px) 200px, 120px" className="aspect-square w-full rounded-full border-4 border-ink shadow-pop" />
    </div>
  );
}

export default function Home() {
  const kebab = menu[0].sections[0].items[0];
  const withMenu = menu.filter((c) => c.menuSupplement);
  const banner = !!site.heroBanner && hasPhoto(site.heroBanner);
  const sandwichs = menu.find((c) => c.id === "sandwichs");
  const menuKebab = kebab.price !== null && sandwichs?.menuSupplement ? kebab.price + sandwichs.menuSupplement : null;
  const priceOf = (id: string) => {
    const it = menu.flatMap((c) => c.sections.flatMap((s) => s.items)).find((i) => i.id === id);
    return it?.price != null ? `${String(it.price).replace(".", ",")} €` : null;
  };
  const from = (id: string) => {
    const c = menu.find((x) => x.id === id);
    const p = c ? minPrice(c) : null;
    return p !== null ? `dès ${String(p).replace(".", ",")} €` : null;
  };
  // Mosaïque : 4 colonnes × 3 rangées sur ordinateur (kebab en grand, assiette en hauteur)
  const gallery = [
    { photo: "kebab", label: "Kebab", price: priceOf("kebab"), cat: "sandwichs", span: "col-span-2 md:row-span-2" },
    { photo: "burger", label: "Cheeseburger", price: priceOf("cheeseburger"), cat: "burgers", span: "" },
    { photo: "assiette-kebab", label: "Assiette kebab", price: priceOf("assiette-kebab"), cat: "assiettes", span: "md:row-span-2" },
    { photo: "tacos", label: "Tacos", price: from("tacos"), cat: "tacos", span: "" },
    { photo: "mario-bowl", label: "Mario Bowl", price: priceOf("mario-bowl"), cat: "assiettes", span: "" },
    { photo: "barquettes", label: "Barquettes", price: from("a-cote"), cat: "a-cote", span: "" },
    { photo: "menu-enfant", label: "Menu enfant", price: priceOf("box-happy"), cat: "enfants", span: "" },
    { photo: "boissons", label: "Boissons", price: from("boissons"), cat: "boissons", span: "col-span-2 md:col-span-1" },
  ].filter((g) => hasPhoto(g.photo));
  return (
    <>
      {/* ───────────── Bannière : ciel, nuages, mascotte qui saute ───────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-b from-sky to-sky-light ${banner ? "pt-[72px]" : "pt-[84px]"}`} aria-labelledby="hero-title">
        {!banner && <DriftingClouds />}
        <HeroMedia />
        {banner ? (
          <div className="relative z-10">
            {/* Bannière pleine largeur, affichée en entier (jamais recadrée) */}
            <h1 id="hero-title" className="sr-only">Chez Mario — kebab, tacos et burgers à Erstein</h1>
            <div className="relative border-y-4 border-ink">
              <Photo
                name={site.heroBanner}
                alt="Chez Mario : Mario savoure un kebab dans un monde de champignons et de collines"
                priority
                sizes="100vw"
                className="h-[min(50.87vw,calc(100svh-104px))] w-full"
                imgClassName="object-[50%_35%]"
              />
              {/* Actions posées sous le titre de l'image (ordinateur/tablette ; sur mobile : barre collante) */}
              <div className="absolute left-[53%] right-[3%] top-[50%] hidden flex-col items-center gap-3 md:flex lg:gap-4">
                <div className="animate-pop" style={{ animationDelay: "250ms" }}>
                  <OpenBadge />
                </div>
                <p className="animate-pop rounded-full border-[3px] border-ink bg-white/95 px-5 py-1.5 text-center font-display text-lg uppercase tracking-wide text-ink shadow-pop-sm lg:text-xl" style={{ animationDelay: "400ms" }}>
                  Kebab · Tacos · Burgers
                  {kebab.price !== null && <span className="text-mario"> — dès {kebab.price} €</span>}
                </p>
                <div className="flex animate-pop flex-wrap justify-center gap-3 lg:gap-4" style={{ animationDelay: "550ms" }}>
                  <Link href="/carte" className="btn btn-red h-12 px-6 lg:h-14 lg:px-8 lg:text-lg">
                    Voir la carte <ArrowIcon className="h-5 w-5" />
                  </Link>
                  <a href={`tel:${site.phone.tel}`} className="btn btn-coin h-12 px-6 lg:h-14 lg:px-8 lg:text-lg">
                    <PhoneIcon className="h-5 w-5" /> Appeler
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
        <div className="container-x relative z-10 grid items-center gap-2 md:grid-cols-[1.05fr_.95fr] md:gap-8 md:py-6">
            <div className="order-2 pb-4 md:order-1">
              <OpenBadge className="mb-4" />
              <h1 id="hero-title" className="display outlined text-[clamp(3.3rem,14.5vw,7.4rem)] leading-[0.92] text-white">
                <span className="sr-only">Kebab, tacos et burgers à Erstein</span>
                <JumpWord text="Kebab," />
                <br />
                <JumpWord text="tacos" start={6} className="text-coin" />
                <br />
                <JumpWord text="& burgers" start={11} className="text-mario" />
              </h1>
              <p className="mt-4 max-w-md text-lg font-bold text-ink">
                À Erstein, chez Mario : kebab bœuf ou poulet, yufka, assiettes, burgers et tacos.
              </p>
              <div className="mt-7 hidden flex-wrap gap-4 md:flex">
                <Link href="/carte" className="btn btn-red h-14 px-8 text-lg">
                  Voir la carte <ArrowIcon className="h-5 w-5" />
                </Link>
                <a href={`tel:${site.phone.tel}`} className="btn btn-coin h-14 px-8 text-lg">
                  <PhoneIcon className="h-5 w-5" /> Appeler
                </a>
              </div>
            </div>
  
            {/* Scène : photos en autocollants, pièces, mascotte */}
            <div className="relative order-1 mx-auto aspect-[1/0.78] w-full max-w-[560px] md:order-2 md:aspect-square" aria-hidden>
              <Sticker name="burger" className="left-[2%] top-[4%] w-[30%]" r={-8} />
              <Sticker name="tacos" className="right-[0%] top-[14%] w-[27%]" r={9} delay={0.8} />
              <Sticker name="menu-kebab" className="bottom-[10%] left-[0%] w-[26%]" r={6} delay={1.6} />
              <Coin className="absolute left-[38%] top-[2%] h-9 w-9 md:h-12 md:w-12" />
              <Coin className="absolute left-[48%] top-[10%] h-9 w-9 md:h-12 md:w-12" delay={0.3} />
              <Coin className="absolute left-[58%] top-[2%] h-9 w-9 md:h-12 md:w-12" delay={0.6} />
              <Sparkle className="absolute bottom-[30%] right-[6%] h-6 w-6 animate-float md:h-9 md:w-9" />
              <div className="absolute bottom-0 left-1/2 w-[48%] -translate-x-1/2">
                <Mascot className="relative z-10 w-full origin-bottom animate-jump" />
                <span className="absolute -bottom-1 left-1/2 h-3 w-2/3 -translate-x-1/2 rounded-[50%] bg-ink/20 blur-[2px]" />
              </div>
              {kebab.price !== null && (
                <span className="absolute bottom-[8%] right-[3%] z-20 rotate-6 rounded-2xl border-[3px] border-ink bg-white px-3 py-1.5 font-display text-lg uppercase leading-none text-ink shadow-pop md:text-2xl">
                  Kebab <span className="text-mario">{kebab.price} €</span>
                </span>
              )}
            </div>
          </div>
        )}
        {!banner && <Hills className="relative -mb-[3px] block h-[60px] w-full md:h-[110px]" />}
        <div className={`ground border-b-[3px] border-ink ${banner ? "h-[21px]" : "h-10"}`} aria-hidden />
      </section>

      {/* ───────────── Mosaïque photo : la carte en un coup d'œil ───────────── */}
      <section className="relative overflow-hidden bg-royal pb-14 pt-12 md:pb-20 md:pt-16" aria-labelledby="faim-title">
        <Cloud className="absolute -left-6 top-10 w-32 opacity-25 md:w-48" />
        <Cloud className="absolute bottom-24 right-4 w-28 opacity-25 md:w-40" />
        <div className="container-x relative">
          <div className="mb-8 text-center" data-reveal>
            <h2 id="faim-title" className="display outlined text-[clamp(2.8rem,9vw,5rem)] text-white">
              Ça donne <span className="text-coin">faim ?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-lg font-bold text-white">Kebab, assiettes, burgers, tacos… choisis ta rubrique.</p>
          </div>
          {/* Accès rapide aux rubriques */}
          <ul className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0" data-reveal>
            {menu.map((c) => (
              <li key={c.id} className="shrink-0">
                <Link href={`/carte#${c.id}`} className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display uppercase text-ink shadow-pop-sm transition hover:-translate-y-0.5 hover:bg-coin">
                  <span aria-hidden className={`h-3 w-3 rounded-full border-2 border-ink ${BG[c.color]}`} />
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 gap-3 md:h-[680px] md:grid-cols-4 md:grid-rows-3 md:gap-4">
            {gallery.map((g, i) => (
              <li key={g.photo} className={`${g.span} relative`} data-reveal style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}>
                <Link href={`/carte#${g.cat}`} className="group relative block h-full overflow-hidden rounded-[1.5rem] border-[3px] border-ink bg-tile shadow-pop transition duration-200 hover:-translate-y-1 hover:shadow-pop-lg">
                  <Photo name={g.photo} alt={g.label} sizes={i === 0 ? "(min-width:768px) 600px, 100vw" : "(min-width:768px) 300px, 50vw"} className={`w-full md:absolute md:inset-0 md:h-full ${i === 0 ? "aspect-[4/3]" : g.span.includes("col-span-2") ? "aspect-[2/1]" : "aspect-square"} md:aspect-auto`} imgClassName="transition duration-500 group-hover:scale-110" />
                  <span className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-1.5 md:bottom-3 md:left-3">
                    <span className="rounded-full border-[3px] border-ink bg-white px-2.5 py-1 font-display text-xs uppercase leading-none text-ink sm:text-sm md:px-3 md:text-lg">{g.label}</span>
                    {g.price && <span className="rounded-full border-[3px] border-ink bg-coin px-2 py-1 font-display text-xs leading-none text-ink sm:text-sm md:px-2.5 md:text-lg">{g.price}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center" data-reveal>
            <Link href="/carte" className="btn btn-coin h-14 px-8 text-lg">
              Voir toute la carte <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </div>
      </section>
      <Wave top="bg-royal" bottom="fill-coin" />

      {/* ───────────── Formule menu : sandwich + frites + boisson ───────────── */}
      <section className="bg-coin pb-14 pt-8 md:pb-20 md:pt-10" aria-labelledby="menu-title">
        <div className="container-x">
          <div className="text-center" data-reveal>
            <p className="eyebrow mb-4">La formule</p>
            <h2 id="menu-title" className="display text-[clamp(2.6rem,9vw,4.8rem)]">
              Passe en menu <span className="outlined whitespace-nowrap text-white">+ 3 €</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg font-bold text-ink">Ajoute {MENU_CONTENT} à ton sandwich, ton burger ou ton tacos.</p>
          </div>
          {/* L'équation, en grand : chaque élément arrive l'un après l'autre */}
          <div className="mx-auto mt-10 flex max-w-5xl items-start justify-center gap-1.5 sm:gap-4 md:gap-6">
            {[
              { name: "kebab", label: "Ton kebab", r: -4 },
              { name: "frites", label: "Frites", r: 3 },
              { name: "boissons", label: "Boisson", r: -2 },
            ].map((x, i) => (
              <Fragment key={x.name}>
                {i > 0 && (
                  <span data-reveal style={{ "--d": `${i * 260 - 130}ms` } as React.CSSProperties} aria-hidden className="mt-[11%] grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-white font-display text-2xl leading-none shadow-pop-sm sm:h-14 sm:w-14 sm:text-4xl">
                    +
                  </span>
                )}
                <figure data-reveal className="w-[30%] max-w-[280px]" style={{ "--d": `${i * 260}ms` } as React.CSSProperties}>
                  <div className="animate-float" style={{ "--r": `${x.r}deg`, animationDelay: `${i * 0.5}s` } as React.CSSProperties}>
                    <Photo name={x.name} alt={x.label} sizes="(min-width:768px) 280px, 30vw" className="aspect-square w-full rounded-full border-4 border-ink shadow-pop-lg" />
                  </div>
                  <figcaption className="mt-3 text-center font-display text-base uppercase sm:text-2xl">{x.label}</figcaption>
                </figure>
              </Fragment>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-5" data-reveal style={{ "--d": "700ms" } as React.CSSProperties}>
            {menuKebab !== null && (
              <span className="rotate-[-3deg] rounded-2xl border-[3px] border-ink bg-mario px-6 py-2.5 font-display text-2xl uppercase text-white shadow-pop md:text-4xl">
                = Menu kebab {menuKebab} €
              </span>
            )}
            <ul className="flex flex-wrap justify-center gap-2">
              {withMenu.map((c) => (
                <li key={c.id}>
                  <Link href={`/carte#${c.id}`} className="inline-flex rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display uppercase shadow-pop-sm transition hover:-translate-y-0.5 hover:bg-cream">
                    {c.title} en menu
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Wave top="bg-coin" bottom="fill-cream" flip />

      {/* ───────────── Avis (uniquement ceux fournis) ───────────── */}
      {site.reviews.length > 0 && (
        <section className="py-16 md:py-24" aria-labelledby="avis-title">
          <div className="container-x">
            <p className="eyebrow mb-4" data-reveal>Avis clients</p>
            <h2 id="avis-title" className="display mb-10 text-[clamp(2.6rem,9vw,4.6rem)]" data-reveal>
              Ils en <span className="text-luigi-dark">parlent</span>
            </h2>
            <ul className="grid gap-5 md:grid-cols-3">
              {site.reviews.map((r, i) => (
                <li key={i} className="card p-6" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                  <figure>
                    <div className="flex gap-1 text-coin-dark" aria-label={`${r.rating} sur 5`}>
                      {Array.from({ length: 5 }, (_, k) => (
                        <StarIcon key={k} className={`h-5 w-5 ${k < r.rating ? "" : "opacity-20"}`} />
                      ))}
                    </div>
                    <blockquote className="mt-4 font-semibold">« {r.text} »</blockquote>
                    <figcaption className="mt-4 text-sm font-extrabold">
                      {r.author}
                      {r.source && <span className="font-semibold text-ink-soft"> · {r.source}</span>}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────────── Infos pratiques ───────────── */}
      <section className="py-16 md:py-24" aria-labelledby="infos-title">
        <div className="container-x">
          <div className="mb-10" data-reveal>
            <p className="eyebrow mb-4"><PinIcon className="h-3.5 w-3.5 text-mario" /> Infos pratiques</p>
            <h2 id="infos-title" className="display text-[clamp(2.6rem,9vw,4.6rem)]">
              On t&apos;<span className="text-mario">attend !</span>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-6">
              <div className="card p-5 md:p-6" data-reveal>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-2xl uppercase">Horaires</h3>
                  <OpenBadge />
                </div>
                <HoursTable />
              </div>
              <div className="card grid gap-5 p-5 sm:grid-cols-2 md:p-6" data-reveal>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-display text-lg uppercase text-mario-dark"><PinIcon className="h-5 w-5" /> Adresse</h3>
                  <p className="font-semibold">{site.address.street}<br />{site.address.postalCode} {site.address.city}</p>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-display text-lg uppercase text-mario-dark"><PhoneIcon className="h-5 w-5" /> Téléphone</h3>
                  <a href={`tel:${site.phone.tel}`} className="font-display text-2xl hover:text-royal">{site.phone.display}</a>
                </div>
                {(site.access.parking || site.access.transport) && (
                  <div className="sm:col-span-2">
                    <h3 className="mb-2 font-display text-lg uppercase text-mario-dark">Accès & stationnement</h3>
                    {site.access.parking && <p className="font-semibold text-ink-soft">{site.access.parking}</p>}
                    {site.access.transport && <p className="mt-1 font-semibold text-ink-soft">{site.access.transport}</p>}
                  </div>
                )}
              </div>
            </div>
            <MapEmbed className="min-h-[380px] lg:min-h-full" />
          </div>
          <p className="sr-only">{fullAddress()}</p>
        </div>
      </section>
    </>
  );
}
