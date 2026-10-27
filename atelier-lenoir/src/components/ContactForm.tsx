"use client";

import { useState } from "react";
import { projectTypes, site } from "@/content/site";

/** Site statique sans serveur : le formulaire prépare un e-mail dans la messagerie du visiteur. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const subject = `Demande de devis — ${get("type") || "Projet"}`;
    const body = [`Nom : ${get("name")}`, `E-mail : ${get("email")}`, `Téléphone : ${get("phone")}`, `Projet : ${get("type")}`, "", get("message")].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className="label text-stone-dark">Nom</span>
        <input name="name" required autoComplete="name" className="field" placeholder="Votre nom" />
      </label>
      <label className="block">
        <span className="label text-stone-dark">E-mail</span>
        <input name="email" type="email" required autoComplete="email" className="field" placeholder="vous@exemple.fr" />
      </label>
      <label className="block">
        <span className="label text-stone-dark">Téléphone</span>
        <input name="phone" type="tel" autoComplete="tel" className="field" placeholder="06 00 00 00 00" />
      </label>
      <label className="block">
        <span className="label text-stone-dark">Type de projet</span>
        <select name="type" className="field appearance-none" defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="label text-stone-dark">Votre projet</span>
        <textarea name="message" required rows={4} className="field resize-none" placeholder="Pièces, surfaces, délais souhaités…" />
      </label>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" className="btn btn-dark">
          <span>Envoyer la demande</span>
          <span aria-hidden>→</span>
        </button>
        <p className="text-sm text-stone-dark" aria-live="polite">
          {sent ? "Votre messagerie s'ouvre avec la demande pré-remplie." : "Réponse sous 48 h ouvrées. Devis gratuit."}
        </p>
      </div>
    </form>
  );
}
