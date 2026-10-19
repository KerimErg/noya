import Link from "next/link";
import { MENU_CONTENT, featuredItems, formatPrice, menu, minPrice, type Color } from "@/content/menu";
import { fullAddress, site } from "@/content/site";
import { HeroMedia } from "@/components/HeroMedia";
import { HoursTable, OpenBadge } from "@/components/Hours";
import { MapEmbed } from "@/components/MapEmbed";
import { Photo, hasPhoto } from "@/components/Photo";
import { FoodIcon } from "@/components/FoodIcon";
import { BadgeList } from "@/components/Badges";
import { Mascot } from "@/components/Mascot";
import { Cloud, Coin, DriftingClouds, Hills, Sparkle } from "@/components/Deco";
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
  const featured = featuredItems();
  const kebab = menu[0].sections[0].items[0];
  const withMenu = menu.filter((c) => c.menuSupplement);
  return (
    <>
      {/* ───────────── Bannière : ciel, nuages, mascotte qui saute ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky to-sky-light pt-[84px]" aria-labelledby="hero-title">
        <DriftingClouds />
        <HeroMedia />
        {site.heroBanner && hasPhoto(site.heroBanner) ? (
          <div className="relative z-10">
            {/* Bannière pleine largeur : sur ordinateur, sa hauteur laisse le titre et les boutons dans le premier écran */}
            <div className="relative border-y-4 border-ink">
              <Photo
                name={site.heroBanner}
                alt="Chez Mario : Mario savoure un kebab dans un monde de champignons et de collines"
                priority
                sizes="100vw"
                className="aspect-[8/5] w-full md:aspect-auto md:h-[clamp(420px,calc(100svh-84px-170px),50.9vw)]"
                imgClassName="object-[50%_35%]"
              />
              {kebab.price !== null && (
                <span className="absolute bottom-3 right-3 z-20 rotate-[-6deg] rounded-2xl border-[3px] border-ink bg-coin px-3 py-1.5 font-display text-lg uppercase leading-none text-ink shadow-pop md:bottom-6 md:right-8 md:px-5 md:py-2.5 md:text-3xl">
                  Kebab <span className="text-mario">{kebab.price} €</span>
                </span>
              )}
            </div>
            <div className="container-x grid items-center gap-5 py-6 md:grid-cols-[1fr_auto] md:py-5">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <OpenBadge />
                  <p className="hidden font-bold text-ink md:block">À Erstein · kebab, yufka, assiettes, burgers et tacos</p>
                </div>
                <h1 id="hero-title" className="display outlined text-[clamp(2.7rem,10.5vw,4.4rem)] leading-[0.95] text-white">
                  <span className="sr-only">Kebab, tacos et burgers à Erstein</span>
                  <JumpWord text="Kebab," /> <JumpWord text="tacos" start={6} className="text-coin" />
                  <br className="md:hidden" /> <JumpWord text="& burgers" start={11} className="text-mario" />
                </h1>
                <p className="mt-3 text-lg font-bold text-ink md:hidden">À Erstein, chez Mario : kebab bœuf ou poulet, yufka, assiettes, burgers et tacos.</p>
              </div>
              <div className="hidden gap-4 md:flex">
                <Link href="/carte" className="btn btn-red h-14 px-8 text-lg">
                  Voir la carte <ArrowIcon className="h-5 w-5" />
                </Link>
                <a href={`tel:${site.phone.tel}`} className="btn btn-coin h-14 px-8 text-lg">
                  <PhoneIcon className="h-5 w-5" /> Appeler
                </a>
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
        <Hills className="relative -mb-[3px] block h-[60px] w-full md:h-[110px]" />
        <div className="ground h-10 border-b-[3px] border-ink" aria-hidden />
      </section>

      {/* ───────────── Les classiques ───────────── */}
      <section className="py-16 md:py-24" aria-labelledby="une-title">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="eyebrow mb-4"><StarIcon className="h-3.5 w-3.5 text-coin-dark" /> À la une</p>
              <h2 id="une-title" className="display text-[clamp(2.6rem,9vw,4.6rem)]">
                Les <span className="text-mario">classiques</span>
              </h2>
            </div>
            <Link href="/carte" className="btn btn-white">
              Toute la carte <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
            {featured.map((item, i) => (
              <li key={item.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <Link href={`/carte#${item.category.id}`} className="card group flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1.5 hover:rotate-[-1deg] hover:shadow-pop-lg">
                  <div className={`relative border-b-[3px] border-ink ${BG[item.category.color]} p-3`}>
                    <Photo name={item.photo} alt={item.name} icon={item.category.icon} sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 68vw" className="aspect-square w-full rounded-2xl border-[3px] border-ink transition duration-300 group-hover:scale-[1.03]" />
                    <span className="absolute -bottom-5 right-3 grid h-14 w-14 rotate-[-8deg] place-items-center rounded-full border-[3px] border-ink bg-coin font-display text-lg leading-none text-ink shadow-pop-sm transition duration-500 group-hover:rotate-[352deg]">
                      {item.price !== null ? `${String(item.price).replace(".", ",")}€` : "?"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-6">
                    <BadgeList badges={item.badges} className="mb-2" />
                    <h3 className="font-display text-2xl uppercase leading-tight">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-ink-soft">{item.description ?? item.category.intro}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Rubriques de la carte ───────────── */}
      <section className="relative border-y-[3px] border-ink bg-sky-light py-16 md:py-24" aria-labelledby="carte-title">
        <Cloud className="absolute left-[4%] top-6 w-24 opacity-90 md:w-36" />
        <Cloud className="absolute right-[6%] top-16 w-20 opacity-90 md:w-28" />
        <div className="container-x relative">
          <div className="mb-10 text-center" data-reveal>
            <p className="eyebrow mb-4">La carte</p>
            <h2 id="carte-title" className="display text-[clamp(2.6rem,9vw,4.6rem)]">
              Choisis ta <span className="text-royal">faim</span>
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {menu.map((c, i) => {
              const from = minPrice(c);
              return (
                <li key={c.id} data-reveal style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}>
                  <Link href={`/carte#${c.id}`} className={`group relative flex aspect-[1/1.05] flex-col justify-end overflow-hidden rounded-[1.75rem] border-[3px] border-ink p-4 shadow-pop transition duration-200 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-pop-lg md:aspect-[4/3.6] md:p-5 ${BG[c.color]}`}>
                    <div className="absolute right-3 top-3 w-[52%] transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      {c.photo ? (
                        <Photo name={c.photo} alt="" icon={c.icon} sizes="200px" className="aspect-square w-full rounded-full border-[3px] border-ink" />
                      ) : (
                        <span className="grid aspect-square w-full place-items-center rounded-full border-[3px] border-ink bg-white">
                          <FoodIcon name={c.icon} className="h-1/2 w-1/2 text-ink" />
                        </span>
                      )}
                    </div>
                    <span className="relative">
                      <span className="display outlined block text-[1.55rem] leading-[1] text-white md:text-3xl">{c.title}</span>
                      {from !== null && <span className="mt-2 inline-block rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-xs font-extrabold text-ink">dès {formatPrice(from)}</span>}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li data-reveal>
              <Link href="/carte" className="group flex aspect-[1/1.05] flex-col items-center justify-center gap-3 rounded-[1.75rem] border-[3px] border-dashed border-ink bg-white p-4 text-center transition hover:bg-coin md:aspect-[4/3.6]">
                <ArrowIcon className="h-10 w-10 transition group-hover:translate-x-1" />
                <span className="font-display text-xl uppercase leading-tight">Toute la carte</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ───────────── Formule menu ───────────── */}
      <section className="bg-coin py-14 md:py-20" aria-labelledby="menu-title">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow mb-4">La formule</p>
            <h2 id="menu-title" className="display text-[clamp(2.6rem,9vw,4.6rem)]">
              Passe en menu <span className="outlined whitespace-nowrap text-white">+ 3 €</span>
            </h2>
            <p className="mt-4 max-w-md text-lg font-bold text-ink">Ajoute {MENU_CONTENT} à ton sandwich, ton burger ou ton tacos.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {withMenu.map((c) => (
                <li key={c.id}>
                  <Link href={`/carte#${c.id}`} className="inline-flex rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display uppercase shadow-pop-sm transition hover:-translate-y-0.5 hover:bg-cream">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-[88%] max-w-[440px]" data-reveal>
            <Photo name="menu-kebab" alt="Menu kebab : kebab, frites et boisson" sizes="(min-width:768px) 440px, 88vw" className="aspect-square w-full rotate-2 rounded-[2rem] border-4 border-ink shadow-pop-lg" />
            <span className="absolute -left-3 -top-4 rotate-[-10deg] rounded-2xl border-[3px] border-ink bg-mario px-4 py-2 font-display text-xl uppercase text-white shadow-pop md:text-2xl">Menu kebab 11 €</span>
            <Coin className="absolute -right-3 bottom-8 h-14 w-14" />
          </div>
        </div>
      </section>

      {/* ───────────── Savoir-faire ───────────── */}
      <section className="relative overflow-hidden border-y-[3px] border-ink bg-royal py-16 text-white md:py-24" aria-labelledby="sf-title">
        <Cloud className="absolute -left-6 top-10 w-32 opacity-25 md:w-48" />
        <Cloud className="absolute bottom-10 right-4 w-28 opacity-25 md:w-40" />
        <div className="container-x relative grid items-center gap-10 md:grid-cols-[.9fr_1.1fr]">
          <div className="relative mx-auto w-[80%] max-w-[420px]" data-reveal>
            <Photo name="burger" alt="Burger de Chez Mario" sizes="(min-width:768px) 420px, 80vw" className="aspect-square w-full -rotate-3 rounded-[2rem] border-4 border-ink shadow-pop-lg" />
            <Sparkle className="absolute -right-4 -top-4 h-12 w-12 animate-float" />
          </div>
          <div data-reveal>
            <p className="eyebrow mb-4">Le savoir-faire</p>
            <h2 id="sf-title" className="display outlined text-[clamp(2.8rem,9vw,5rem)]">
              Mario allume <span className="text-coin">le grill</span>
            </h2>
            <ul className="mt-8 grid gap-4">
              {[
                { t: "La broche", d: "Kebab bœuf ou poulet, en sandwich, en assiette, en yufka ou en tacos.", icon: "kebab" as const, c: "bg-mario" },
                { t: "Le grill", d: "Köfte, sucuk, steak haché et escalope de poulet.", icon: "grill" as const, c: "bg-luigi" },
                { t: "La touche Mario", d: "Le Berlinois : viande de kebab, crudités, feta, miel et sauce blanche.", icon: "star" as const, c: "bg-coin" },
              ].map((s) => (
                <li key={s.t} className="flex items-center gap-4 rounded-2xl border-[3px] border-ink bg-white p-4 text-ink shadow-pop">
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl border-[3px] border-ink ${s.c}`}>
                    <FoodIcon name={s.icon} className="h-9 w-9 text-ink" />
                  </span>
                  <span>
                    <span className="block font-display text-xl uppercase">{s.t}</span>
                    <span className="text-sm font-semibold text-ink-soft">{s.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
                <div className="sm:col-span-2">
                  <h3 className="mb-2 font-display text-lg uppercase text-mario-dark">Accès & stationnement</h3>
                  <p className="font-semibold text-ink-soft">{site.access.parking ?? <span className="todo">Stationnement à compléter</span>}</p>
                  {site.access.transport && <p className="mt-1 font-semibold text-ink-soft">{site.access.transport}</p>}
                </div>
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
