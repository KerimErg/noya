/**
 * Tout le contenu du site est ici : textes, coordonnées, prestations, réalisations, avis.
 * Les valeurs marquées « À REMPLACER » sont des exemples : mettez les vraies informations de l'agence.
 */
import type { PlateVariant } from "@/components/Plate";

export const site = {
  name: "Atelier Lenoir",
  shortName: "Lenoir",
  tagline: "Peintres-décorateurs",
  url: "https://atelier-lenoir.fr", // À REMPLACER
  city: "Strasbourg",
  since: 2009,
  phone: "03 88 00 00 00", // À REMPLACER
  phoneHref: "+33388000000", // À REMPLACER
  email: "contact@atelier-lenoir.fr", // À REMPLACER
  address: { street: "12 rue des Artisans", zip: "67000", city: "Strasbourg" }, // À REMPLACER
  area: "Strasbourg, Eurométropole & toute l'Alsace",
  hours: "Du lundi au vendredi, 8 h – 18 h",
  instagram: "https://www.instagram.com/", // À REMPLACER
  legal: {
    company: "Atelier Lenoir SAS", // À REMPLACER
    siret: "000 000 000 00000", // À REMPLACER
    director: "Prénom Nom", // À REMPLACER
    insurance: "Assurance décennale n° 000000 — Assureur", // À REMPLACER
    host: "Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis",
  },
};

export const nav = [
  { id: "savoir-faire", label: "Savoir-faire" },
  { id: "realisations", label: "Réalisations" },
  { id: "methode", label: "Méthode" },
  { id: "contact", label: "Contact" },
];

export const services: { title: string; text: string; plate: PlateVariant }[] = [
  {
    title: "Peinture intérieure",
    text: "Murs, plafonds et boiseries préparés dans les règles : rebouchage, ponçage, sous-couche. Une finition tendue, sans reprise visible.",
    plate: "moulures",
  },
  {
    title: "Enduits & béton ciré",
    text: "Chaux, tadelakt, stucco, béton ciré : des matières minérales posées à la main, pour des surfaces vivantes et durables.",
    plate: "beton",
  },
  {
    title: "Façades & ravalement",
    text: "Diagnostic, nettoyage, traitement des fissures et peinture de façade. Un chantier propre, sécurisé et suivi de bout en bout.",
    plate: "facade",
  },
  {
    title: "Laques & boiseries",
    text: "Portes, menuiseries, escaliers et mobilier laqués au pistolet ou à la brosse, en mat profond comme en brillant miroir.",
    plate: "escalier",
  },
  {
    title: "Revêtements muraux",
    text: "Papiers peints panoramiques, toiles de verre, intissés et revêtements textiles, posés au raccord près.",
    plate: "arche",
  },
  {
    title: "Conseil couleur",
    text: "Étude de la lumière, échantillons grand format et harmonie des teintes pièce par pièce, avant le premier coup de rouleau.",
    plate: "nuancier",
  },
];

/** Réalisations. Pour mettre une vraie photo : déposez-la dans public/img/ puis ajoutez image: "/img/nom.jpg". */
export const projects: { title: string; place: string; scope: string; year: number; plate: PlateVariant; image?: string }[] = [
  { title: "Appartement haussmannien", place: "Strasbourg — Neustadt", scope: "Peinture intérieure & laques", year: 2025, plate: "moulures" },
  { title: "Villa contemporaine", place: "Obernai", scope: "Béton ciré & enduits à la chaux", year: 2025, plate: "beton" },
  { title: "Immeuble de rapport", place: "Strasbourg — Krutenau", scope: "Ravalement de façade", year: 2024, plate: "facade" },
  { title: "Boutique de créateur", place: "Colmar", scope: "Conception couleur & peinture", year: 2024, plate: "arche" },
  { title: "Maison de maître", place: "Sélestat", scope: "Cage d'escalier & boiseries", year: 2023, plate: "escalier" },
  { title: "Bureaux d'architectes", place: "Strasbourg — Robertsau", scope: "Conseil couleur", year: 2023, plate: "nuancier" },
];

export const stats = [
  { value: 17, suffix: "", label: "années de métier" }, // À REMPLACER
  { value: 640, suffix: "+", label: "chantiers livrés" }, // À REMPLACER
  { value: 14, suffix: "", label: "artisans qualifiés" }, // À REMPLACER
  { value: 10, suffix: " ans", label: "de garantie décennale" },
];

export const steps = [
  { title: "Visite & écoute", text: "Nous venons sur place, mesurons, observons la lumière et parlons de vos envies comme de vos contraintes." },
  { title: "Devis détaillé", text: "Sous 72 heures, un devis poste par poste : supports, produits, nombre de couches, délais. Aucune surprise." },
  { title: "Chantier soigné", text: "Protection intégrale, préparation minutieuse, un chef de chantier unique et un point d'étape chaque semaine." },
  { title: "Réception", text: "Nous faisons le tour des pièces avec vous, à la lumière du jour, et ne partons qu'une fois chaque détail validé." },
];

/** Avis clients — À REMPLACER par de vrais avis (Google, clients avec leur accord). */
export const testimonials = [
  { quote: "Une équipe d'une rigueur rare. Les murs n'ont jamais été aussi beaux, et le chantier était plus propre à leur départ qu'à leur arrivée.", author: "Claire M.", place: "Strasbourg" },
  { quote: "Le conseil couleur a tout changé : chaque pièce a désormais sa propre lumière. Un vrai travail d'artisans.", author: "Thomas & Léa", place: "Obernai" },
  { quote: "Ravalement livré dans les délais annoncés, au centime près du devis. Je les recommande les yeux fermés.", author: "Syndic Krutenau", place: "Strasbourg" },
];

export const projectTypes = ["Peinture intérieure", "Enduits / béton ciré", "Façade / ravalement", "Laques & boiseries", "Revêtements muraux", "Conseil couleur", "Autre"];
