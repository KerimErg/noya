import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { Cloud, Hills } from "@/components/Deco";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-sky to-sky-light pt-24">
      <Cloud className="absolute left-[8%] top-28 w-28" />
      <Cloud className="absolute right-[10%] top-40 w-20" />
      <div className="container-x relative grid flex-1 items-center gap-6 pb-10 md:grid-cols-2">
        <Mascot className="mx-auto w-36 animate-jump md:w-72" title="Mario cherche la page" />
        <div className="text-center md:text-left">
          <p className="display outlined text-[clamp(5.5rem,22vw,11rem)] text-coin">404</p>
          <h1 className="display text-4xl md:text-5xl">Cette page s&apos;est fait la malle</h1>
          <p className="mt-3 font-bold text-ink-soft">La page demandée n&apos;existe pas ou a été déplacée.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link href="/" className="btn btn-red">Retour à l&apos;accueil</Link>
            <Link href="/carte" className="btn btn-white">Voir la carte</Link>
          </div>
        </div>
      </div>
      <Hills className="relative -mb-[3px] block h-[60px] w-full" />
      <div className="ground h-10" aria-hidden />
    </section>
  );
}
