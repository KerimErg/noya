import Link from "next/link";
import { featuredItems, formatPrice, menu } from "@/content/menu";
import { fullAddress, site } from "@/content/site";
import { Embers, HeroArt, HeroMedia } from "@/components/HeroMedia";
import { HoursTable, OpenBadge } from "@/components/Hours";
import { MapEmbed } from "@/components/MapEmbed";
import { Photo } from "@/components/Photo";
import { FoodIcon } from "@/components/FoodIcon";
import { BadgeList } from "@/components/Badges";
import { ArrowIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/Icons";

const kebab = menu[0].items[0];

export default function Home() {
  const featured = featuredItems();
  return (
    <>
      {/* ───────────── Bannière ───────────── */}
      <section className="grain relative flex min-h-[100svh] items-end overflow-hidden pb-28 pt-24 md:items-center md:pb-16" aria-labelledby="hero-title">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_75%_55%,rgba(216,30,26,.35),transparent_70%),radial-gradient(60%_50%_at_80%_80%,rgba(255,122,26,.35),transparent_70%),linear-gradient(180deg,#140b09,#0a0a0a)]" />
        <HeroMedia />
        <Embers />
        <div className="container-x relative grid items-center gap-6 md:grid-cols-[1.15fr_.85fr]">
          <div className="order-2 md:order-1">
            <OpenBadge className="mb-5" />
            <h1 id="hero-title" className="display text-[clamp(3.2rem,13vw,7rem)]">
              Kebab,
              <br />
              tacos
              <br />
              <span className="whitespace-nowrap italic text-mario-bright">&amp; burgers</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-cream/80">
              À Erstein, chez Mario : kebab bœuf ou poulet, yufka, lahmacun, assiettes et grillades.
            </p>
            <div className="mt-8 hidden flex-wrap gap-3 md:flex">
              <Link href="/carte" className="btn btn-red h-14 px-8 text-[15px]">
                Voir la carte <ArrowIcon className="h-4 w-4" />
              </Link>
              <a href={`tel:${site.phone.tel}`} className="btn btn-line h-14 px-8 text-[15px]">
                <PhoneIcon className="h-4 w-4" /> Appeler
              </a>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <HeroArt />
            {kebab.price !== null && (
              <Link
                href="/carte#sandwichs"
                className="absolute right-[6%] top-[4%] grid h-20 w-20 rotate-12 place-items-center rounded-full bg-coin text-center text-coal shadow-[0_0_0_5px_#0a0a0a,0_16px_40px_-8px_rgba(255,199,44,.6)] transition hover:rotate-0 md:h-28 md:w-28"
              >
                <span className="font-display font-black uppercase leading-none">
                  <span className="block text-[11px] tracking-wider">Kebab</span>
                  <span className="block text-2xl md:text-4xl">{kebab.price}€</span>
                </span>
                <span className="sr-only"> — voir la carte</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ───────────── Bandeau ───────────── */}
      <div className="overflow-hidden border-y border-black bg-mario py-3.5" aria-hidden>
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-2xl font-black uppercase italic text-white md:text-3xl">
          {Array.from({ length: 2 }, (_, k) => (
            <span key={k} className="flex gap-8">
              {["Kebab", "Yufka", "Lahmacun", "Assiettes", "Grillades", "Burgers", "Tacos"].map((w) => (
                <span key={w} className="flex items-center gap-8">
                  {w} <StarIcon className="h-5 w-5 text-coin" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── À la une ───────────── */}
      <section className="py-20 md:py-28" aria-labelledby="une-title">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="eyebrow mb-3">À la une</p>
              <h2 id="une-title" className="display text-[clamp(2.6rem,8vw,5rem)]">
                Les <span className="text-mario-bright">classiques</span>
              </h2>
            </div>
            <Link href="/carte" className="btn btn-line">
              Toute la carte <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
            {featured.map((item, i) => (
              <li key={item.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <Link href={`/carte#${item.category.id}`} className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-mario/50">
                  <div className="relative">
                    <Photo name={item.photo} alt={item.name} icon={item.category.icon} sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 78vw" className="aspect-square w-full transition duration-500 group-hover:scale-[1.04]" />
                    <span className="absolute right-3 top-3 rounded-full bg-coin px-3 py-1 font-display text-base font-black text-coal">{formatPrice(item.price)}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <BadgeList badges={item.badges} className="mb-2" />
                    <h3 className="font-display text-xl font-black uppercase leading-tight">{item.name}</h3>
                    <p className="mt-1.5 text-sm text-muted">{item.description ?? item.category.intro ?? item.category.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── La carte par catégories ───────────── */}
      <section className="pb-20 md:pb-28" aria-labelledby="carte-title">
        <div className="container-x">
          <div className="mb-10" data-reveal>
            <p className="eyebrow mb-3">La carte</p>
            <h2 id="carte-title" className="display text-[clamp(2.6rem,8vw,5rem)]">
              Choisis ta <span className="italic text-mario-bright">faim</span>
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {menu.map((c, i) => {
              const prices = c.items.map((it) => it.price).filter((p): p is number => p !== null);
              return (
                <li key={c.id} data-reveal style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                  <Link href={`/carte#${c.id}`} className="group relative flex aspect-[4/3.4] flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-coal-800 p-4 transition duration-300 hover:border-mario/60 hover:bg-coal-700 md:aspect-[4/3] md:p-5">
                    <span aria-hidden className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-mario/0 blur-2xl transition duration-500 group-hover:bg-mario/40" />
                    <FoodIcon name={c.icon} className="relative h-11 w-11 text-mario-bright transition duration-300 group-hover:-rotate-6 group-hover:scale-110 md:h-14 md:w-14" />
                    <span className="relative">
                      <span className="block font-display text-lg font-black uppercase leading-tight md:text-2xl">{c.title}</span>
                      {prices.length > 0 && <span className="mt-1 block text-xs text-muted md:text-sm">dès {formatPrice(Math.min(...prices))}</span>}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────── Savoir-faire ───────────── */}
      <section className="grain relative overflow-hidden border-y border-white/[0.06] bg-black py-20 md:py-32" aria-labelledby="sf-title">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_60%,rgba(255,122,26,.28),transparent_70%),radial-gradient(40%_50%_at_10%_90%,rgba(216,30,26,.35),transparent_70%)]" />
        <Embers />
        <div className="container-x relative grid gap-12 md:grid-cols-2 md:items-center">
          <div data-reveal className="relative">
            <Photo name={null} alt="La broche de kebab de Chez Mario" icon="grill" className="aspect-[4/5] w-full rounded-[2rem] border border-white/10" sizes="(min-width:768px) 50vw, 100vw" />
          </div>
          <div data-reveal>
            <p className="eyebrow mb-3">Le savoir-faire</p>
            <h2 id="sf-title" className="display text-[clamp(3rem,9vw,5.6rem)]">
              Mario
              <br />
              allume
              <br />
              <span className="italic text-flame">le grill</span>
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                { t: "La broche", d: "Kebab bœuf ou poulet, en sandwich, en assiette, en yufka ou en tacos." },
                { t: "Le grill", d: "Köfte, sucuk, steak haché et escalope de poulet." },
                { t: "La touche Mario", d: "Le Berlinois : viande de kebab, crudités, feta, miel et sauce blanche." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4 border-t border-white/10 pt-5">
                  <span className="font-display text-3xl font-black italic text-mario-bright">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-lg font-extrabold uppercase">{s.t}</span>
                    <span className="text-muted">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6"><span className="todo">Texte à valider : votre histoire, votre viande, votre pain…</span></p>
          </div>
        </div>
      </section>

      {/* ───────────── Avis (uniquement ceux fournis) ───────────── */}
      {site.reviews.length > 0 && (
        <section className="py-20 md:py-28" aria-labelledby="avis-title">
          <div className="container-x">
            <p className="eyebrow mb-3" data-reveal>Avis clients</p>
            <h2 id="avis-title" className="display mb-10 text-[clamp(2.6rem,8vw,5rem)]" data-reveal>
              Ils en <span className="italic text-mario-bright">parlent</span>
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {site.reviews.map((r, i) => (
                <li key={i} className="card p-6" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                  <figure>
                    <div className="flex gap-1 text-coin" aria-label={`${r.rating} sur 5`}>
                      {Array.from({ length: 5 }, (_, k) => (
                        <StarIcon key={k} className={`h-4 w-4 ${k < r.rating ? "" : "opacity-20"}`} />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-cream/90">« {r.text} »</blockquote>
                    <figcaption className="mt-4 text-sm font-bold">
                      {r.author}
                      {r.source && <span className="font-normal text-muted"> · {r.source}</span>}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────────── Infos pratiques ───────────── */}
      <section className="py-20 md:py-28" aria-labelledby="infos-title">
        <div className="container-x">
          <div className="mb-10" data-reveal>
            <p className="eyebrow mb-3">Infos pratiques</p>
            <h2 id="infos-title" className="display text-[clamp(2.6rem,8vw,5rem)]">
              On t&apos;<span className="italic text-mario-bright">attend</span>
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid gap-4">
              <div className="card p-6" data-reveal>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-black uppercase">Horaires</h3>
                  <OpenBadge />
                </div>
                <HoursTable />
              </div>
              <div className="card grid gap-5 p-6 sm:grid-cols-2" data-reveal>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-black uppercase text-mario-bright"><PinIcon className="h-4 w-4" /> Adresse</h3>
                  <p>{site.address.street}<br />{site.address.postalCode} {site.address.city}</p>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-black uppercase text-mario-bright"><PhoneIcon className="h-4 w-4" /> Téléphone</h3>
                  <a href={`tel:${site.phone.tel}`} className="text-xl font-bold hover:text-coin">{site.phone.display}</a>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="mb-2 font-display text-sm font-black uppercase text-mario-bright">Accès & stationnement</h3>
                  <p className="text-muted">{site.access.parking ?? <span className="todo">Stationnement à compléter</span>}</p>
                  {site.access.transport && <p className="mt-1 text-muted">{site.access.transport}</p>}
                </div>
              </div>
            </div>
            <MapEmbed className="min-h-[360px] lg:min-h-full" />
          </div>
          <p className="sr-only">{fullAddress()}</p>
        </div>
      </section>
    </>
  );
}
