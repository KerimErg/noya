/**
 * ═══════════════════════════════════════════════════════════════════
 *  LA CARTE DE CHEZ MARIO — le seul fichier à modifier pour la carte.
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Changer un prix : trouvez le produit et modifiez le nombre après `price:`.
 *    → 8 = 8,00 €   |   9.5 = 9,50 €   (point, pas virgule)
 *  Ajouter une pastille : badges: ["best-seller"] (ou "nouveau", "epice", "signature")
 *  Ajouter une photo : déposez le fichier dans le dossier photos/ (ex. photos/kebab.jpg)
 *    puis écrivez photo: "kebab" sur le produit.
 *
 *  Recopié depuis les panneaux de la carte en magasin (octobre 2026).
 */

export type Badge = "signature" | "best-seller" | "nouveau" | "epice";

export interface MenuItem {
  id: string;
  name: string;
  /** Précision affichée en petit à côté du nom, ex. « avec viande kebab ». */
  detail?: string;
  description?: string;
  /** Prix en euros. null = prix à compléter. */
  price: number | null;
  /** Texte avant le prix, ex. « la pièce ». */
  priceSuffix?: string;
  badges?: Badge[];
  /** Nom du fichier photo (sans extension) déposé dans photos/. */
  photo?: string;
  /** Mis en avant sur l'accueil (« À la une »). */
  featured?: boolean;
}

export interface MenuGroup {
  title: string;
  items: string[];
}

export interface MenuCategory {
  id: string;
  title: string;
  /** Phrase d'accroche sous le titre. */
  intro?: string;
  /** Mention importante affichée en évidence (ex. « En menu + 3 € »). */
  note?: string;
  icon: "kebab" | "wrap" | "plate" | "grill" | "burger" | "tacos" | "kids" | "fries" | "plus" | "drink" | "star" | "menu";
  items: MenuItem[];
  /** Listes de choix (viandes, sauces, crudités…). */
  groups?: MenuGroup[];
}

export const menu: MenuCategory[] = [
  {
    id: "sandwichs",
    title: "Sandwichs",
    intro: "Nos viandes de kebab sont bœuf ou poulet.",
    note: "Sandwich en menu : + 3 €",
    icon: "kebab",
    items: [
      { id: "kebab", name: "Kebab", price: 8, featured: true },
      { id: "maxi-kebab", name: "Maxi Kebab", price: 13 },
      { id: "lahmacun", name: "Lahmacun", detail: "avec viande kebab", price: 8 },
      { id: "yufka", name: "Yufka", price: 8 },
      { id: "yufka-xl", name: "Yufka XL", price: 13 },
      { id: "falafel", name: "Végétarien Falafel", price: 8 },
      { id: "americain", name: "Américain", detail: "avec steak haché et frites", price: 9 },
      { id: "sucuk", name: "Sucuk", detail: "saucisse turque", price: 9 },
      { id: "kofte", name: "Köfte", detail: "boulette de viande hachée", price: 9 },
      { id: "escalope", name: "Escalope de poulet", price: 9 },
    ],
  },
  {
    id: "signatures",
    title: "Signatures Mario",
    intro: "Les recettes de la maison.",
    icon: "star",
    items: [
      {
        id: "berlinois",
        name: "Berlinois",
        description: "Viande de kebab, crudités, feta, miel, sauce blanche.",
        price: 9.5,
        badges: ["signature"],
        featured: true,
      },
    ],
  },
  {
    id: "menus",
    title: "Menus",
    intro: "Sandwich, frites et boisson.",
    icon: "menu",
    items: [
      { id: "menu-kebab", name: "Menu Kebab", description: "Kebab, frites et boisson.", price: 11 },
      { id: "menu-yufka", name: "Menu Yufka", description: "Yufka, frites et boisson.", price: 11 },
    ],
  },
  {
    id: "assiettes",
    title: "Assiettes",
    intro: "Servies avec crudités, frites ou blé.",
    icon: "plate",
    items: [
      { id: "assiette-kebab", name: "Assiette Kebab", description: "Viande, crudités, frites ou blé.", price: 12 },
      { id: "assiette-kofte", name: "Assiette Köfte", description: "Viande, crudités, frites ou blé.", price: 14 },
      { id: "assiette-steak", name: "Assiette Steak haché", description: "Viande, crudités, frites ou blé.", price: 14 },
      { id: "assiette-escalope", name: "Assiette Escalope de poulet", description: "Viande, crudités, frites ou blé.", price: 14 },
      { id: "assiette-cordon-bleu", name: "Assiette Cordon bleu", description: "Viande, crudités, frites ou blé.", price: 14 },
      {
        id: "assiette-royal",
        name: "Assiette Royal",
        detail: "6 viandes",
        description: "Viande de kebab, köfte, escalope de poulet, steak haché, cordon bleu.",
        price: 17,
        featured: true,
      },
      { id: "assiette-falafel", name: "Assiette Falafel", description: "Falafel, crudités, frites ou blé.", price: 12 }, // panneau : « Viande, crudités… » — à confirmer
      { id: "mario-bowl", name: "Mario Bowl", description: "Viande, crudités, frites, sauce et fromage fondu.", price: 11 },
    ],
  },
  {
    id: "grillades",
    title: "Grillades & Box",
    icon: "grill",
    items: [
      { id: "grillade-mixte", name: "Grillade Mixte", description: "Escalope de poulet, köfte, steak haché, crudités, frites ou blé.", price: 15 },
      { id: "box-mario", name: "Box Mario", description: "Viande, crudités, frites, sauce.", price: 8 },
      { id: "assiette-frites", name: "Assiette frites", price: 8 },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    note: "Burger en menu : + 3 €",
    icon: "burger",
    items: [
      { id: "cheeseburger", name: "Cheeseburger", description: "Viande hachée, fromage cheese, crudités, sauces.", price: 8 },
      { id: "double-cheese", name: "Double Cheeseburger", description: "Double viande hachée, double cheese, crudités, sauces.", price: 10 },
      { id: "burger-veggie", name: "Burger Veggie", description: "Falafel, fromage feta, fromage cheese, crudités, sauces.", price: 8 },
      { id: "burger-kebab", name: "Burger Kebab", description: "Viande de kebab, crudités, sauces.", price: 8 },
      { id: "burger-chicken", name: "Burger Chicken", description: "Viande de poulet, fromage cheese, crudités, sauces.", price: 8 },
      { id: "burger-mario", name: "Burger Mario", description: "Viande hachée, viande de kebab, fromage cheese, crudités, sauces.", price: 10 },
      { id: "burger-super-mario", name: "Burger Super Mario", description: "Chicken, steak, fromage cheese, crudités, sauces.", price: 13, featured: true },
    ],
  },
  {
    id: "tacos",
    title: "Tacos",
    intro: "Composez le vôtre : taille, viandes, sauce, crudités.",
    note: "Tacos en menu : + 3 €",
    icon: "tacos",
    items: [
      { id: "tacos-m", name: "Tacos M", description: "Avec 1 viande au choix.", price: 8, featured: true },
      { id: "tacos-l", name: "Tacos L", description: "Avec 2 viandes au choix.", price: 9 },
      { id: "tacos-xl", name: "Tacos XL", description: "Avec 3 viandes au choix.", price: 11 },
    ],
    groups: [
      { title: "Viandes", items: ["Bœuf kebab", "Poulet kebab", "Köfte", "Escalope de poulet", "Steak", "Sucuk", "Nuggets", "Cordon bleu", "Tenders"] },
      {
        title: "Sauces",
        items: ["Ketchup", "Mayonnaise", "Moutarde", "Samouraï", "Brésilienne", "Algérienne", "Sauce blanche et rouge", "Curry", "Andalouse", "Burger", "Tartare", "Harissa", "BBQ"],
      },
      { title: "Crudités", items: ["Salade", "Tomate", "Oignons", "Chou rouge", "Maïs", "Carotte", "Olives"] },
    ],
  },
  {
    id: "enfants",
    title: "Menus enfant",
    icon: "kids",
    items: [
      { id: "box-happy", name: "Box Happy", detail: "avec jouet", description: "Viande de kebab ou nuggets + Capri-Sun + ketchup + mayo + jouet.", price: 8 },
      { id: "demi-kebab", name: "Kebab enfant", detail: "demi kebab", description: "Demi viande de kebab + sauce + frites + boisson 33 cl.", price: 8 },
      { id: "nuggets-enfant", name: "Nuggets", description: "Nuggets + sauce + frites + boisson 33 cl.", price: 8 },
    ],
  },
  {
    id: "barquettes",
    title: "Barquettes",
    icon: "fries",
    items: [
      { id: "barquette-viande", name: "Barquette de viande kebab", price: 5 },
      { id: "barquette-ble", name: "Barquette de blé", price: 4 },
      { id: "barquette-frites", name: "Barquette de frites", price: 2.5 },
      { id: "barquette-piment", name: "Barquette de piment vert", price: 2, badges: ["epice"] },
      { id: "tenders", name: "Tenders", price: 1.5, priceSuffix: "la pièce" },
      { id: "nuggets", name: "Nuggets", price: 0.5, priceSuffix: "la pièce" },
    ],
  },
  {
    id: "supplements",
    title: "Suppléments",
    icon: "plus",
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
  {
    id: "boissons",
    title: "Boissons",
    icon: "drink",
    note: "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    items: [
      { id: "boisson-33", name: "Boisson 33 cl", price: 2 },
      { id: "boisson-50", name: "Boisson 50 cl", price: 3 },
      { id: "ayran", name: "Ayran 25 cl", price: 2 },
      { id: "grande-bouteille", name: "Boisson grande bouteille", price: 5 },
      { id: "vin-quart", name: "¼ Vin", price: 4 },
      { id: "vin-demi", name: "½ Vin", price: 6 },
    ],
  },
  // Desserts : aucun dessert sur la carte actuelle — ajoutez une catégorie ici si besoin.
];

/** Mention allergènes (remplacer par un détail par produit si vous le fournissez). */
export const allergensNote = "Liste des allergènes disponible sur demande au comptoir.";

export const formatPrice = (price: number | null) =>
  price === null ? "À compléter" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);

export const featuredItems = () =>
  menu.flatMap((c) => c.items.filter((i) => i.featured).map((i) => ({ ...i, category: c })));
