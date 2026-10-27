import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <div className="container-x grid gap-10 border-t border-ink-line pt-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="label text-stone">Atelier</p>
          <p className="mt-4 max-w-sm text-stone-light">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
          <p className="mt-2 text-sm text-stone">{site.area}</p>
        </div>
        <div>
          <p className="label text-stone">Contact</p>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={`tel:${site.phoneHref}`} className="link-line">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>
            </li>
            <li className="text-sm text-stone">{site.hours}</li>
          </ul>
        </div>
        <div>
          <p className="label text-stone">Suivre</p>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line">
                Instagram
              </a>
            </li>
            <li>
              <Link href="/mentions-legales" className="link-line">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p data-reveal aria-hidden className="display mt-16 select-none whitespace-nowrap text-center text-[31vw] leading-[0.78] tracking-[-0.06em]">
        {site.shortName}
      </p>
      <div className="container-x flex flex-wrap justify-between gap-2 py-6 text-xs text-stone">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          {site.tagline} depuis {site.since}
        </span>
      </div>
    </footer>
  );
}
