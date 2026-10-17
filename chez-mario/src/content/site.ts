/**
 * Informations du restaurant. Tout ce qui vaut null ou "À COMPLÉTER" est masqué
 * ou signalé sur le site tant qu'il n'est pas renseigné.
 */

export const TODO = "À COMPLÉTER";

export type Day = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";
/** Plages "HH:MM". Une fermeture après minuit s'écrit par ex. { open: "18:00", close: "01:00" }. */
export type Hours = Record<Day, { open: string; close: string }[]>;

export const site = {
  name: "Chez Mario",
  tagline: "Kebab · Yufka · Burgers · Tacos",
  /** Nom de domaine définitif (sans / à la fin). À COMPLÉTER une fois le domaine acheté. */
  url: "https://chezmario-erstein.fr",

  address: {
    street: "42 rue du Général de Gaulle", // à confirmer
    postalCode: "67150",
    city: "Erstein",
    region: "Bas-Rhin",
    country: "FR",
  },
  /** Coordonnées GPS (copiez-les depuis votre fiche Google). null = non affichées. */
  geo: null as { lat: number; lng: number } | null,

  phone: { display: "03 88 98 69 94", tel: "+33388986994" }, // à confirmer

  /**
   * Horaires. [] = fermé. Une fermeture après minuit s'écrit { open: "18:00", close: "01:00" }.
   * Mettez `hours: null` pour masquer les horaires.
   */
  hours: {
    lundi: [{ open: "11:30", close: "14:00" }, { open: "17:30", close: "22:00" }],
    mardi: [],
    mercredi: [{ open: "11:30", close: "14:00" }, { open: "17:30", close: "22:00" }],
    jeudi: [{ open: "11:30", close: "14:00" }, { open: "17:30", close: "22:00" }],
    vendredi: [{ open: "11:30", close: "14:00" }, { open: "17:30", close: "22:00" }],
    samedi: [{ open: "11:30", close: "14:00" }, { open: "17:30", close: "22:00" }],
    dimanche: [{ open: "11:30", close: "14:00" }, { open: "17:30", close: "22:00" }],
  } as Hours | null,

  /** Liens réseaux sociaux : null = pas affiché. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },
  /** Liens de livraison : null = pas affiché. */
  delivery: {
    uberEats: null as string | null,
    deliveroo: null as string | null,
  },

  /** Lien vers votre fiche Google (bouton « Itinéraire » et avis). */
  googleMapsUrl: null as string | null,

  /**
   * Avis clients : uniquement ceux fournis par le restaurant.
   * La section « Avis » est masquée tant que la liste est vide.
   * Exemple : { author: "Julie M.", rating: 5, text: "…", source: "Google" }
   */
  reviews: [] as { author: string; rating: number; text: string; source?: string }[],

  /** Stationnement et accès (texte libre). */
  access: {
    parking: null as string | null,
    transport: null as string | null,
  },

  /** Vidéo d'accueil (fichiers dans public/video/). null = photo/visuel à la place. */
  heroVideo: null as { mp4: string; webm?: string; poster: string } | null,
  /** Photo d'accueil (nom du fichier dans photos/, sans extension). */
  heroPhoto: null as string | null,

  legal: {
    company: TODO, // raison sociale
    legalForm: TODO, // ex. SAS, SARL, EI
    capital: TODO,
    siret: TODO,
    rcs: TODO,
    vat: TODO,
    publisher: TODO, // directeur de la publication
    email: TODO,
  },
};

export const fullAddress = () => `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const mapsLink = () =>
  site.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Chez Mario ${fullAddress()}`)}`;

export const mapsEmbed = () => `https://www.google.com/maps?q=${encodeURIComponent(`Chez Mario, ${fullAddress()}`)}&output=embed`;
