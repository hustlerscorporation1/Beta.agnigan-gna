// Configuration et constantes de l'application

export const APP_NAME = "Anyigba Nya";
export const APP_DESCRIPTION = "Plateforme d'achat et vente de terrains au Togo";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/anyigbanya",
  twitter: "https://twitter.com/anyigbanya",
  instagram: "https://instagram.com/anyigbanya",
  linkedin: "https://linkedin.com/company/anyigbanya",
  tiktok: "https://tiktok.com/@anyigbanya"
};

export const CONTACT_INFO = {
  phone: "+228 XX XX XX XX",
  email: "contact@anyigbanya.com",
  address: "Lomé, Togo"
};

export const ROUTES = {
  HOME: "/",
  PROPERTIES: "/proprietes",
  PROPERTY_DETAIL: "/propriete/:id",
  ABOUT: "/a-propos",
  CONTACT: "/contact",
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
