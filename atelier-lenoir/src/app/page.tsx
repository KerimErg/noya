import { ContactForm } from "@/components/ContactForm";
import { Plate } from "@/components/Plate";
import { projects, services, site, stats, steps, testimonials } from "@/content/site";

const marqueeWords = ["Peinture intérieure", "Enduits à la chaux", "Béton ciré", "Façades", "Laques", "Papiers peints", "Conseil couleur"];

export default function Home() {
  return (
    <>
      {/* ——— Héros ——— */}
      <section className="container-x flex min-h-[100svh] flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="mb-10 flex items-center justify-between gap-6 md:mb-14">
          <p data-reveal="intro" data-delay="0.6" className="label text-stone-dark">
            {site.tagline} — {site.city}
          </p>
          <p data-reveal="intro" data-delay="0.7" className="label hidden text-stone-dark sm:block">
            Depuis {site.since}
          </p>
        </div>
        <h1 data-split="intro" className="display text-[clamp(3.4rem,12.4vw,13.5rem)]">
          L&apos;art de la <span className="serif">surface</span> juste.
        </h1>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <p data-reveal="intro" data-delay="0.9" className="max-w-md text-lg leading-relaxed text-stone-dark md:col-span-5 md:text-xl">
            Peinture, enduits et finitions décoratives pour les intérieurs et façades qui méritent un travail d&apos;exception.
          </p>
          <div data-reveal="intro" data-delay="1" className="flex items-end gap-4 md:col-span-7 md:justify-end">
            <a href="#contact" className="btn btn-dark">
              <span>Demander un devis</span>
              <span aria-hidden>→</span>
            </a>
            <a href="#realisations" className="btn btn-dark hidden sm:inline-flex">
              <span>Réalisations</span>
            </a>
          </div>
        </div>
      </section>

      <div className="px-0">
        <div data-hero-media className="relative h-[70svh] overflow-hidden md:h-[110vh]">
          <div data-parallax="10" className="absolute inset-[-16%_0]">
            <Plate variant="arche" alt="Intérieur aux murs fraîchement peints, arche ouverte sur une pièce sombre" className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* ——— Bandeau ——— */}
      <div className="overflow-hidden border-b border-ink/10 py-8 md:py-10" aria-hidden>
        <div data-marquee className="flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeWords.map((word) => (
                <span key={word} className="display flex items-center whitespace-nowrap text-4xl md:text-6xl">
                  {word}
                  <span className="serif mx-8 text-3xl text-stone md:mx-12 md:text-5xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ——— Manifeste ——— */}
      <section className="bg-ink py-32 text-paper md:py-48">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <p className="label text-stone md:col-span-3">(01) — Manifeste</p>
          <div className="md:col-span-9">
            <p data-words className="display text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.05] tracking-[-0.035em]">
              Une belle peinture ne se remarque pas : elle se ressent. Nous préparons chaque support comme un architecte prépare ses fondations, choisissons la matière juste et posons chaque couche avec la patience de l&apos;artisan.
            </p>
            <div className="mt-16 grid gap-10 sm:grid-cols-2 md:mt-24">
              <div data-reveal>
                <div data-line className="h-px bg-white/20" />
                <p className="mt-5 text-stone-light">Des produits sélectionnés pour leur tenue et leur rendu : peintures minérales, chaux naturelles, laques à faible émission.</p>
              </div>
              <div data-reveal data-delay="0.1">
                <div data-line className="h-px bg-white/20" />
                <p className="mt-5 text-stone-light">Un interlocuteur unique, des équipes salariées et formées, et un chantier protégé comme s&apos;il était le nôtre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Savoir-faire ——— */}
      <section id="savoir-faire" className="relative scroll-mt-0 py-28 md:py-40">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12">
            <p className="label text-stone-dark md:col-span-3">(02) — Savoir-faire</p>
            <h2 data-split className="display text-[clamp(2.6rem,7vw,7.5rem)] md:col-span-9">
              Six métiers, <span className="serif">une</span> exigence.
            </h2>
          </div>
          <ul className="mt-16 md:mt-24">
            {services.map((service, i) => (
              <li key={service.title} data-preview-item={i} data-reveal className="group relative border-t border-ink/15 last:border-b">
                <div className="grid gap-4 py-8 transition-[padding] duration-700 ease-silk md:grid-cols-12 md:items-baseline md:py-10 lg:group-hover:py-14">
                  <span className="label text-stone md:col-span-1">0{i + 1}</span>
                  <h3 className="display text-3xl transition-transform duration-700 ease-silk md:col-span-6 md:text-5xl lg:group-hover:translate-x-4">{service.title}</h3>
                  <p className="text-stone-dark md:col-span-5">{service.text}</p>
                </div>
                <Plate variant={service.plate} className="mb-8 aspect-[4/3] w-full lg:hidden" />
              </li>
            ))}
          </ul>
        </div>
        {/* Aperçu qui suit la souris au survol des prestations (ordinateur) */}
        <div data-preview aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[340px] w-[270px] -translate-x-1/2 -translate-y-1/2 scale-75 overflow-hidden opacity-0 lg:block">
          {services.map((service) => (
            <div key={service.title} data-preview-slide className="absolute inset-0 opacity-0">
              <Plate variant={service.plate} className="h-full w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ——— Réalisations (défilement horizontal) ——— */}
      <section id="realisations" data-hscroll className="relative overflow-hidden bg-ink text-paper">
        <div className="flex min-h-[100svh] flex-col justify-center py-24 md:py-0">
          <div className="container-x mb-12 flex items-end justify-between gap-6 md:mb-14">
            <div>
              <p className="label text-stone">(03) — Réalisations</p>
              <h2 data-split className="display mt-6 text-[clamp(2.6rem,6vw,6.5rem)]">
                Chantiers <span className="serif">récents</span>
              </h2>
            </div>
            <p className="hidden max-w-xs text-stone-light md:block">Appartements, maisons, commerces et façades : une sélection de nos chantiers en Alsace.</p>
          </div>
          <div data-hscroll-track className="flex flex-col gap-14 px-5 md:w-max md:flex-row md:gap-10 md:px-10 xl:px-16">
            {projects.map((project, i) => (
              <article key={project.title} className="w-full md:w-[38vw] lg:w-[30vw]" data-reveal>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div data-hscroll-inner className="absolute inset-y-0 -inset-x-[10%]">
                    <Plate variant={project.plate} image={project.image} alt={`${project.title} — ${project.scope}`} className="h-full w-full" />
                  </div>
                  <span className="label absolute left-4 top-4 text-ink mix-blend-difference invert">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 border-t border-white/15 pt-4">
                  <div>
                    <h3 className="text-xl font-medium tracking-tight md:text-2xl">{project.title}</h3>
                    <p className="mt-1 text-sm text-stone">{project.scope}</p>
                  </div>
                  <div className="text-right text-sm text-stone">
                    <p>{project.place}</p>
                    <p>{project.year}</p>
                  </div>
                </div>
              </article>
            ))}
            <div className="hidden w-[30vw] shrink-0 flex-col justify-center md:flex">
              <p className="display text-5xl">
                Votre projet <span className="serif">ici</span> ?
              </p>
              <a href="#contact" className="btn btn-light mt-8 self-start">
                <span>Nous écrire</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <div className="container-x mt-12 hidden md:block">
            <div className="h-px w-full bg-white/15">
              <div data-hscroll-bar className="h-px w-full origin-left bg-paper" />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Chiffres ——— */}
      <section className="container-x py-28 md:py-40">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} data-reveal data-delay={i * 0.08}>
              <div data-line className="h-px bg-ink/20" />
              <p className="display mt-6 text-[clamp(3.2rem,7vw,6.5rem)]">
                <span data-count={stat.value}>{stat.value.toLocaleString("fr-FR")}</span>
                {stat.suffix}
              </p>
              <p className="mt-2 text-stone-dark">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Méthode ——— */}
      <section id="methode" className="bg-paper-dim py-28 md:py-40">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <p className="label text-stone-dark">(04) — Méthode</p>
              <h2 data-split className="display mt-6 text-[clamp(2.6rem,5.5vw,5.5rem)]">
                Du premier <span className="serif">échantillon</span> à la réception.
              </h2>
              <div className="mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden md:block" data-clip>
                <Plate variant="nuancier" alt="Éventail de nuances de gris" className="h-full w-full" />
              </div>
            </div>
          </div>
          <ol className="relative md:col-span-6 md:col-start-7">
            <div className="absolute bottom-0 left-[11px] top-0 w-px bg-ink/15" aria-hidden>
              <div data-progress className="h-full w-px bg-ink" />
            </div>
            {steps.map((step, i) => (
              <li key={step.title} data-reveal className="relative pb-16 pl-14 last:pb-0 md:pb-24">
                <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-ink bg-paper-dim text-[10px] font-medium">{i + 1}</span>
                <h3 className="display text-3xl md:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-stone-dark">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Matière (image pleine largeur en parallaxe) ——— */}
      <section aria-label="Matières" className="relative h-[80svh] overflow-hidden bg-ink md:h-screen">
        <div data-parallax="12" className="absolute inset-[-19%_0]">
          <Plate variant="beton" alt="Enduit à la chaux lissé à la taloche" className="h-full w-full" />
        </div>
        <div className="container-x relative flex h-full items-end pb-12 md:pb-16">
          <p data-split className="display max-w-4xl text-[clamp(2.4rem,6vw,6rem)] text-ink">
            La matière <span className="serif">avant</span> la couleur.
          </p>
        </div>
      </section>

      {/* ——— Avis ——— */}
      <section className="bg-ink py-28 text-paper md:py-40">
        <div className="container-x">
          <p className="label text-stone">(05) — Ils nous ont confié leurs murs</p>
          <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-3 lg:gap-10">
            {testimonials.map((t, i) => (
              <figure key={t.author} data-reveal data-delay={i * 0.1} className="flex flex-col">
                <span className="serif text-7xl leading-none text-stone">“</span>
                <blockquote className="mt-2 text-2xl leading-snug tracking-tight md:text-[1.7rem]">{t.quote}</blockquote>
                <figcaption className="mt-8 border-t border-white/15 pt-4 text-sm text-stone">
                  {t.author} — {t.place}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Contact ——— */}
      <section id="contact" className="py-28 md:py-40">
        <div className="container-x">
          <p className="label text-stone-dark">(06) — Contact</p>
          <h2 data-split className="display mt-6 text-[clamp(3rem,10vw,11rem)]">
            Parlons de <span className="serif">vos</span> murs.
          </h2>
          <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-4" data-reveal>
              <div>
                <p className="label text-stone-dark">Téléphone</p>
                <a href={`tel:${site.phoneHref}`} className="link-line mt-3 inline-block text-2xl">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="label text-stone-dark">E-mail</p>
                <a href={`mailto:${site.email}`} className="link-line mt-3 inline-block text-2xl">
                  {site.email}
                </a>
              </div>
              <div>
                <p className="label text-stone-dark">Zone d&apos;intervention</p>
                <p className="mt-3 text-lg">{site.area}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6" data-reveal data-delay="0.1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
