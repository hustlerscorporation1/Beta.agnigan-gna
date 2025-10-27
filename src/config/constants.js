// Configuration et constantes de l'application

export const APP_NAME = "Agnigban Gna";
export const APP_DESCRIPTION = "Plateforme d'achat et vente de terrains au Togo";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/agnigbagna",
  twitter: "https://twitter.com/agnigbagna",
  instagram: "https://instagram.com/agnigbagna",
  linkedin: "https://linkedin.com/company/agnigbagna",
  tiktok: "https://tiktok.com/@agnigbagna"
};

export const CONTACT_INFO = {
  phone: "+228 70 14 61 80",
  email: "contact@agnigbagna.com",
  address: "Lomé, Togo"
};

export const ROUTES = {
  HOME: "/",
  PROPERTIES: "/proprietes",
  PROPERTY_DETAIL: "/property", // Base path, add /:id for route definition
  ABOUT: "/a-propos",
  CONTACT: "/contact",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog", // Base path, add /:id for route definition
  LOGIN: "/connexion",
  REGISTER: "/inscription",
  FORGOT_PASSWORD: "/mot-de-passe-oublie",
  PROFILE: "/profil",
  DECLARE_PROPERTY: "/declarer-terrain",
  BUY_PROCESS: "/processus-achat",
  SELL_PROCESS: "/processus-vente",
  LEARN_MORE: "/en-savoir-plus"
};

export const CITIES = [
  { id: 1, name: "Lomé", slug: "lome" },
  { id: 2, name: "Vogan", slug: "vogan" },
  { id: 3, name: "Notsé", slug: "notse" },
  { id: 4, name: "Tsévié", slug: "tsevie" },
  { id: 5, name: "Aného", slug: "aneho" }
];

export const SERVICES = [
  {
    id: 1,
    title: "Vérifier Un Terrain",
    description: "Vérifiez la légalité et la localisation d'un terrain adapté à vos besoins",
    icon: "search",
    link: ROUTES.PROPERTIES
  },
  {
    id: 2,
    title: "Acheter un Terrain",
    description: "Achetez le terrain adapté à votre besoin et votre mode de vie",
    icon: "home",
    link: ROUTES.BUY_PROCESS
  },
  {
    id: 3,
    title: "Vendre un Terrain",
    description: "Décrivez clairement votre terrain pour trouver l'acheteur idéal",
    icon: "sell",
    link: ROUTES.SELL_PROCESS
  }
];
