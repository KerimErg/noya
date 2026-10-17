import Link from "next/link";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_60%,rgba(216,30,26,.3),transparent_70%)]" />
      <div className="container-x relative grid items-center gap-8 md:grid-cols-2">
        <Mascot className="mx-auto w-36 md:w-80" title="Mario cherche la page" />
        <div className="text-center md:text-left">
          <p className="display text-[clamp(6rem,24vw,12rem)] text-mario-bright">404</p>
          <h1 className="display text-4xl md:text-5xl">Cette page s&apos;est fait la malle</h1>
          <p className="mt-4 text-muted">La page demandée n&apos;existe pas ou a été déplacée.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href="/" className="btn btn-red">Retour à l&apos;accueil</Link>
            <Link href="/carte" className="btn btn-line">Voir la carte</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
