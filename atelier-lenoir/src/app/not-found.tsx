import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end pb-20 pt-40">
      <p className="label text-stone-dark">Erreur 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,10rem)]">
        Page <span className="serif">introuvable</span>.
      </h1>
      <Link href="/" className="btn btn-dark mt-10 self-start">
        <span>Retour à l&apos;accueil</span>
      </Link>
    </section>
  );
}
