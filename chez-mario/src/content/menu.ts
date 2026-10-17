/**
 * ═══════════════════════════════════════════════════════════════════
 *  LA CARTE DE CHEZ MARIO — le seul fichier à modifier pour la carte.
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Changer un prix : trouvez le produit et modifiez le nombre après `price:`.
 *    → 8 = 8,00 €   |   9.5 = 9,50 €   (point, pas virgule)
 *  Prix « en menu » : calculé tout seul (prix + `menuSupplement` de la rubrique).
 *  Ajouter une pastille : badges: ["best-seller"] (ou "nouveau", "epice", "signature")
 *  Ajouter une photo : déposez le fichier dans photos/ (ex. photos/sucuk.jpg)
 *    puis écrivez photo: "sucuk" sur le produit.
 *
 *  Recopié depuis les panneaux de la carte en magasin (octobre 2026).
 */

export type Badge = "signature" | "best-seller" | "nouveau" | "epice";
export type Color = "red" | "green" | "blue" | "yellow";

export interface MenuItem {
  id: string;
  name: string;
  /** Précision affichée à côté du nom, ex. « avec viande kebab ». */
  detail?: string;
  description?: string;
  /** Prix en euros. null = prix à compléter. */
  price: number | null;
  /** Texte après le prix, ex. « la pièce ». */
  priceSuffix?: string;
  badges?: Badge[];
  /** Nom du fichier photo (sans extension) dans photos/. */
  photo?: string;
  /** Mis en avant sur l'accueil (« Les classiques »). */
  featured?: boolean;
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  title: string;
  intro?: string;
  color: Color;
  icon: "kebab" | "plate" | "burger" | "tacos" | "kids" | "fries" | "drink";
  /** Photo de la rubrique (accueil + en-tête de rubrique). */
  photo?: string;
  /** Supplément pour passer en menu (frites + boisson). Affiche une colonne « Menu ». */
  menuSupplement?: number;
  /** Photo illustrant la formule menu. */
  menuPhoto?: string;
  sections: MenuSection[];
  /** Étapes de composition (tacos). */
  steps?: { title: string; items: string[] }[];
  /** Mention en bas de rubrique. */
  note?: string;
}

export const MENU_CONTENT = "frites + boisson";

export const menu: MenuCategory[] = [
  {
    id: "sandwichs",
    title: "Sandwichs",
    intro: "Nos viandes de kebab sont bœuf ou poulet.",
    color: "red",
    icon: "kebab",
    photo: "kebab",
    menuSupplement: 3,
    menuPhoto: "menu-kebab",
    sections: [
      {
        title: "Kebab & yufka",
        items: [
          { id: "kebab", name: "Kebab", price: 8, photo: "kebab", featured: true },
          { id: "maxi-kebab", name: "Maxi Kebab", price: 13 },
          { id: "yufka", name: "Yufka", price: 8, photo: "yufka" },
          { id: "yufka-xl", name: "Yufka XL", price: 13 },
          { id: "lahmacun", name: "Lahmacun", detail: "avec viande kebab", price: 8 },
          { id: "berlinois", name: "Berlinois", description: "Viande de kebab, crudités, feta, miel, sauce blanche.", price: 9.5, badges: ["signature"] },
        ],
      },
      {
        title: "Au grill",
        items: [
          { id: "americain", name: "Américain", detail: "steak haché et frites", price: 9 },
          { id: "sucuk", name: "Sucuk", detail: "saucisse turque", price: 9 },
          { id: "kofte", name: "Köfte", detail: "boulettes de viande hachée", price: 9 },
          { id: "escalope", name: "Escalope de poulet", price: 9 },
        ],
      },
      {
        title: "Végétarien",
        items: [{ id: "falafel", name: "Falafel", price: 8, photo: "falafel" }],
      },
    ],
  },
  {
    id: "assiettes",
    title: "Assiettes",
    intro: "Servies avec crudités, frites ou blé.",
    color: "green",
    icon: "plate",
    photo: "assiette-royal",
    sections: [
      {
        title: "Les assiettes",
        items: [
          { id: "assiette-kebab", name: "Assiette Kebab", price: 12, photo: "assiette-kebab" },
          { id: "assiette-kofte", name: "Assiette Köfte", price: 14, photo: "assiette-kofte" },
          { id: "assiette-steak", name: "Assiette Steak haché", price: 14, photo: "assiette-steak" },
          { id: "assiette-escalope", name: "Assiette Escalope de poulet", price: 14, photo: "assiette-escalope" },
          { id: "assiette-cordon-bleu", name: "Assiette Cordon bleu", price: 14, photo: "assiette-cordon-bleu" },
          { id: "assiette-falafel", name: "Assiette Falafel", price: 12, photo: "assiette-falafel" },
        ],
      },
      {
        title: "Grandes faims",
        items: [
          {
            id: "assiette-royal",
            name: "Assiette Royal",
            detail: "6 viandes",
            description: "Viande de kebab, köfte, escalope de poulet, steak haché, cordon bleu.",
            price: 17,
            photo: "assiette-royal",
            featured: true,
          },
          { id: "grillade-mixte", name: "Grillade Mixte", description: "Escalope de poulet, köfte, steak haché, crudités, frites ou blé.", price: 15 },
        ],
      },
      {
        title: "Bowl & box",
        items: [
          { id: "mario-bowl", name: "Mario Bowl", description: "Viande, crudités, frites, sauce et fromage fondu.", price: 11, photo: "mario-bowl", featured: true },
          { id: "box-mario", name: "Box Mario", description: "Viande, crudités, frites, sauce.", price: 8 },
          { id: "assiette-frites", name: "Assiette frites", price: 8 },
        ],
      },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    intro: "Tous servis avec crudités et sauces.",
    color: "yellow",
    icon: "burger",
    photo: "burger",
    menuSupplement: 3,
    sections: [
      {
        items: [
          { id: "cheeseburger", name: "Cheeseburger", description: "Viande hachée, fromage cheese.", price: 8 },
          { id: "double-cheese", name: "Double Cheeseburger", description: "Double viande hachée, double cheese.", price: 10 },
          { id: "burger-chicken", name: "Burger Chicken", description: "Viande de poulet, fromage cheese.", price: 8 },
          { id: "burger-kebab", name: "Burger Kebab", description: "Viande de kebab.", price: 8 },
          { id: "burger-veggie", name: "Burger Veggie", description: "Falafel, fromage feta, fromage cheese.", price: 8 },
          { id: "burger-mario", name: "Burger Mario", description: "Viande hachée, viande de kebab, fromage cheese.", price: 10 },
          { id: "burger-super-mario", name: "Burger Super Mario", description: "Chicken, steak, fromage cheese.", price: 13, photo: "burger", featured: true },
        ],
      },
    ],
  },
  {
    id: "tacos",
    title: "Tacos",
    intro: "Compose le tien en 4 étapes.",
    color: "blue",
    icon: "tacos",
    photo: "tacos",
    menuSupplement: 3,
    sections: [
      {
        title: "1. Choisis ta taille",
        items: [
          { id: "tacos-m", name: "Tacos M", description: "1 viande au choix.", price: 8, photo: "tacos", featured: true },
          { id: "tacos-l", name: "Tacos L", description: "2 viandes au choix.", price: 9 },
          { id: "tacos-xl", name: "Tacos XL", description: "3 viandes au choix.", price: 11 },
        ],
      },
    ],
    steps: [
      { title: "2. Tes viandes", items: ["Bœuf kebab", "Poulet kebab", "Köfte", "Escalope de poulet", "Steak", "Sucuk", "Nuggets", "Cordon bleu", "Tenders"] },
      {
        title: "3. Ta sauce",
        items: ["Ketchup", "Mayonnaise", "Moutarde", "Samouraï", "Brésilienne", "Algérienne", "Blanche", "Rouge", "Curry", "Andalouse", "Burger", "Tartare", "Harissa", "BBQ"],
      },
      { title: "4. Tes crudités", items: ["Salade", "Tomate", "Oignons", "Chou rouge", "Maïs", "Carotte", "Olives"] },
    ],
  },
  {
    id: "enfants",
    title: "Menus enfant",
    color: "yellow",
    icon: "kids",
    sections: [
      {
        items: [
          { id: "box-happy", name: "Box Happy", detail: "avec jouet", description: "Viande de kebab ou nuggets, Capri-Sun, ketchup, mayo et un jouet.", price: 8 },
          { id: "demi-kebab", name: "Kebab enfant", detail: "demi kebab", description: "Demi viande de kebab, sauce, frites et boisson 33 cl.", price: 8 },
          { id: "nuggets-enfant", name: "Nuggets enfant", description: "Nuggets, sauce, frites et boisson 33 cl.", price: 8, photo: "nuggets" },
        ],
      },
    ],
  },
  {
    id: "a-cote",
    title: "À côté & suppléments",
    color: "green",
    icon: "fries",
    photo: "nuggets",
    sections: [
      {
        title: "Barquettes",
        items: [
          { id: "barquette-frites", name: "Frites", price: 2.5 },
          { id: "barquette-ble", name: "Blé", price: 4 },
          { id: "barquette-viande", name: "Viande kebab", price: 5 },
          { id: "barquette-piment", name: "Piment vert", price: 2, badges: ["epice"] },
          { id: "tenders", name: "Tenders", price: 1.5, priceSuffix: "la pièce" },
          { id: "nuggets", name: "Nuggets", price: 0.5, priceSuffix: "la pièce" },
        ],
      },
      {
        title: "Suppléments",
        items: [
          { id: "sup-cheese", name: "Cheese", price: 1 },
          { id: "sup-gruyere", name: "Gruyère", price: 1 },
          { id: "sup-feta", name: "Feta", price: 1 },
          { id: "sup-miel", name: "Miel", price: 1 },
          { id: "sup-frites", name: "Frites", price: 1 },
          { id: "sup-sauce", name: "Sauce", price: 1 },
          { id: "sup-viande", name: "Viande", price: 2 },
        ],
      },
    ],
  },
  {
    id: "boissons",
    title: "Boissons",
    color: "blue",
    icon: "drink",
    sections: [
      {
        title: "Softs",
        items: [
          { id: "boisson-33", name: "Boisson 33 cl", price: 2 },
          { id: "boisson-50", name: "Boisson 50 cl", price: 3 },
          { id: "ayran", name: "Ayran 25 cl", price: 2 },
          { id: "grande-bouteille", name: "Grande bouteille", price: 5 },
        ],
      },
      {
        title: "Vin",
        items: [
          { id: "vin-quart", name: "¼ de vin", price: 4 },
          { id: "vin-demi", name: "½ de vin", price: 6 },
        ],
      },
    ],
    note: "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
  },
  // Desserts : aucun dessert sur la carte actuelle — ajoutez une rubrique ici si besoin.
];

/** Mention allergènes (remplacer par un détail par produit si vous le fournissez). */
export const allergensNote = "Liste des allergènes disponible sur demande au comptoir.";

export const formatPrice = (price: number | null) =>
  price === null ? "À compléter" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);

export const allItems = (c: MenuCategory) => c.sections.flatMap((s) => s.items);

export const featuredItems = () => menu.flatMap((c) => allItems(c).filter((i) => i.featured).map((i) => ({ ...i, category: c })));

export const minPrice = (c: MenuCategory) => {
  const prices = allItems(c).map((i) => i.price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
};
