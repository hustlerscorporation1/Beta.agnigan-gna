// Données réelles des terrains au Togo
// Utilisation des chemins publics pour les images (compatibilité production)
// Chemin absolu simple pour compatibilité maximale avec tous les hébergeurs
const heroImage = '/images/hero-image.jpg';

export const properties = [
  {
    id: 1,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Adjonou Kokouvi",
    price: "Titre Foncier : Privé",
    priceValue: null,
    status: "private",
    acteur: "Kara – Kara",
    location: "Kara",
    region: "Kara",
    coordinates: [9.386519, 1.001796],
    surface: "500 m²",
    description: "Magnifique terrain de 500 m² situé à Kara dans la région de Kara. Ce terrain offre une excellente opportunité d'investissement dans une zone en plein développement avec titre foncier privé. Emplacement stratégique avec accès facile aux principales voies de communication.",
    documents: [
      { name: "Titre Foncier", description: "Document officiel du titre foncier" },
      { name: "Plan de bornage", description: "Plan détaillé du terrain" }
    ]
  },
  {
    id: 2,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Sogan Kokouvi",
    price: "Titre Foncier : En cours",
    priceValue: null,
    status: "pending",
    acteur: "Mango – Savanes",
    location: "Mango",
    region: "Savanes",
    coordinates: [10.619586, 0.562733],
    surface: "750 m²",
    description: "Terrain de 750 m² à Mango dans la région des Savanes. Titre foncier en cours de finalisation. Excellent emplacement pour projet résidentiel ou commercial.",
    documents: [
      { name: "Demande de titre foncier", description: "Document de demande en cours de traitement" },
      { name: "Plan de situation", description: "Plan de localisation du terrain" },
      { name: "Relevé topographique", description: "Document technique du terrain" }
    ]
  },
  {
    id: 3,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Tchalla Sama",
    price: "73 000 000 Fcfa",
    priceValue: 73000000,
    status: "available",
    acteur: "Atakpamé – Plateaux",
    location: "Atakpamé",
    region: "Plateaux",
    coordinates: [7.016072, 1.002543],
    surface: "800 m²",
    description: "Superbe terrain de 800 m² disponible à Atakpamé dans la région des Plateaux. Idéal pour construction résidentielle ou commerciale. Tous les documents sont en règle et le terrain est prêt pour démarrage immédiat de projet. Zone calme avec toutes commodités à proximité.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan cadastral", description: "Plan cadastral du terrain" },
      { name: "Autorisation de construire", description: "Pré-autorisation de construction" }
    ]
  },
  {
    id: 4,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Komlan Yendouma",
    price: "Titre Foncier : Privé",
    priceValue: null,
    status: "private",
    acteur: "Kara – Kara",
    location: "Kara",
    region: "Kara",
    coordinates: [9.587885, 1.035059],
    surface: "600 m²",
    description: "Terrain privé de 600 m² situé à Kara. Titre foncier établi et sécurisé. Idéal pour construction personnelle.",
    documents: [
      { name: "Titre Foncier", description: "Document officiel du titre foncier privé" },
      { name: "Plan cadastral", description: "Plan cadastral certifié" },
      { name: "Certificat de propriété", description: "Attestation de propriété" }
    ]
  },
  {
    id: 5,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Komlan Amegah",
    price: "153 000 000 Fcfa",
    priceValue: 153000000,
    status: "available",
    acteur: "Badou – Plateaux",
    location: "Badou",
    region: "Plateaux",
    coordinates: [6.87456, 0.8787],
    surface: "1200 m²",
    description: "Grand terrain de 1200 m² disponible à Badou. Zone résidentielle calme avec tous les services à proximité. Documents complets et prêts pour transaction.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan de bornage", description: "Plan délimitant le terrain" },
      { name: "Attestation de non-litige", description: "Confirmation d'absence de contentieux" },
      { name: "Plan cadastral", description: "Plan cadastral du terrain" }
    ]
  },
  {
    id: 6,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Komlan Adjo",
    price: "107 000 000 Fcfa",
    priceValue: 107000000,
    status: "available",
    acteur: "Badou – Plateaux",
    location: "Badou",
    region: "Plateaux",
    coordinates: [6.968875, 1.026543],
    surface: "900 m²",
    description: "Terrain de 900 m² à Badou, région des Plateaux. Bien situé avec accès facile. Tous les documents disponibles pour transaction immédiate.",
    documents: [
      { name: "Titre de propriété", description: "Document officiel de propriété" },
      { name: "Plan de situation", description: "Plan de localisation" },
      { name: "Relevé topographique", description: "Document technique" },
      { name: "Certificat de conformité", description: "Attestation de conformité" }
    ]
  },
  {
    id: 7,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Tchalla Atayi",
    price: "71 000 000 Fcfa",
    priceValue: 71000000,
    status: "available",
    acteur: "Atakpamé – Plateaux",
    location: "Atakpamé",
    region: "Plateaux",
    coordinates: [7.654419, 0.962045],
    surface: "650 m²",
    description: "Terrain de 650 m² à Atakpamé. Quartier en plein essor avec infrastructure développée. Documentation complète disponible.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan cadastral", description: "Plan cadastral officiel" },
      { name: "Autorisation de construire", description: "Pré-autorisation de construction" }
    ]
  },
  {
    id: 8,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Ayité Mawuli",
    price: "36 000 000 Fcfa",
    priceValue: 36000000,
    status: "available",
    acteur: "Mango – Savanes",
    location: "Mango",
    region: "Savanes",
    coordinates: [10.850239, 0.18265],
    surface: "450 m²",
    description: "Terrain compact de 450 m² à Mango. Parfait pour petite construction. Prix attractif avec documentation en règle.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan de bornage", description: "Plan détaillé du terrain" },
      { name: "Attestation de viabilité", description: "Confirmation des accès aux réseaux" }
    ]
  },
  {
    id: 9,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Agbossou Kokouvi",
    price: "Titre Foncier : Privé",
    priceValue: null,
    status: "private",
    acteur: "Tsévié – Maritime",
    location: "Tsévié",
    region: "Maritime",
    coordinates: [6.134202, 1.164078],
    surface: "550 m²",
    description: "Terrain privé de 550 m² à Tsévié, région Maritime. Titre foncier sécurisé. Proche de toutes commodités.",
    documents: [
      { name: "Titre Foncier", description: "Document officiel du titre foncier privé" },
      { name: "Plan cadastral", description: "Plan cadastral certifié" },
      { name: "Certificat de propriété", description: "Attestation de propriété" }
    ]
  },
  {
    id: 10,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Kokouvi Vincent",
    price: "Titre Foncier : En cours",
    priceValue: null,
    status: "pending",
    acteur: "Bafilo – Kara",
    location: "Bafilo",
    region: "Kara",
    coordinates: [9.867747, 1.109543],
    surface: "700 m²",
    description: "Terrain de 700 m² à Bafilo. Titre foncier en cours de finalisation. Bon potentiel d'investissement.",
    documents: [
      { name: "Demande de titre foncier", description: "Document de demande en traitement" },
      { name: "Plan de situation", description: "Plan de localisation du terrain" },
      { name: "Relevé topographique", description: "Document technique du terrain" }
    ]
  },
  {
    id: 11,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Kokouvi Amegah",
    price: "Titre Foncier : En cours",
    priceValue: null,
    status: "pending",
    acteur: "Blitta – Centrale",
    location: "Blitta",
    region: "Centrale",
    coordinates: [8.902283, 1.511016],
    surface: "600 m²",
    description: "Terrain de 600 m² à Blitta, région Centrale. Procédure de titre foncier en cours. Emplacement stratégique.",
    documents: [
      { name: "Demande de titre foncier", description: "Dossier de demande en cours" },
      { name: "Plan de situation", description: "Localisation du terrain" },
      { name: "Attestation de possession", description: "Document provisoire de possession" }
    ]
  },
  {
    id: 12,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Sosougan Sama",
    price: "77 000 000 Fcfa",
    priceValue: 77000000,
    status: "available",
    acteur: "Sokodé – Centrale",
    location: "Sokodé",
    region: "Centrale",
    coordinates: [8.992611, 0.939704],
    surface: "850 m²",
    description: "Terrain de 850 m² à Sokodé. Zone commerciale en développement. Documentation complète pour transaction rapide.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan cadastral", description: "Plan cadastral du terrain" },
      { name: "Autorisation de construire", description: "Pré-autorisation disponible" },
      { name: "Attestation de viabilité", description: "Accès aux réseaux confirmé" }
    ]
  },
  {
    id: 13,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Adjonou Yaovi",
    price: "180 000 000 Fcfa",
    priceValue: 180000000,
    status: "available",
    acteur: "Atakpamé – Plateaux",
    location: "Atakpamé",
    region: "Plateaux",
    coordinates: [6.893691, 1.091363],
    surface: "1500 m²",
    description: "Grand terrain de 1500 m² à Atakpamé. Idéal pour grand projet immobilier. Tous documents disponibles.",
    documents: [
      { name: "Titre de propriété", description: "Document officiel de propriété" },
      { name: "Plan cadastral", description: "Plan cadastral certifié" },
      { name: "Plan de bornage", description: "Délimitation précise du terrain" },
      { name: "Autorisation de construire", description: "Pré-autorisation de construction" },
      { name: "Certificat de conformité", description: "Attestation de conformité urbaine" }
    ]
  },
  {
    id: 14,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Tchalla Atayi",
    price: "135 000 000 Fcfa",
    priceValue: 135000000,
    status: "available",
    acteur: "Sokodé – Centrale",
    location: "Sokodé",
    region: "Centrale",
    coordinates: [8.710915, 1.025952],
    surface: "1100 m²",
    description: "Terrain spacieux de 1100 m² à Sokodé. Quartier calme et sécurisé. Documentation complète.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan cadastral", description: "Plan cadastral officiel" },
      { name: "Plan de bornage", description: "Délimitation du terrain" },
      { name: "Attestation de non-litige", description: "Absence de contentieux" }
    ]
  },
  {
    id: 15,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Tchalla Komlan",
    price: "140 000 000 Fcfa",
    priceValue: 140000000,
    status: "available",
    acteur: "Lomé – Maritime",
    location: "Lomé",
    region: "Maritime",
    coordinates: [6.424712, 0.921836],
    surface: "1000 m²",
    description: "Terrain de 1000 m² à Lomé, capitale du Togo. Emplacement premium pour projet résidentiel ou commercial. Documentation complète.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan cadastral", description: "Plan cadastral certifié" },
      { name: "Autorisation de construire", description: "Pré-autorisation de construction" },
      { name: "Plan de bornage", description: "Délimitation précise" },
      { name: "Attestation de viabilité", description: "Accès à tous les réseaux" }
    ]
  },
  {
    id: 16,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Sogan Kokouvi",
    price: "47 000 000 Fcfa",
    priceValue: 47000000,
    status: "available",
    acteur: "Blitta – Centrale",
    location: "Blitta",
    region: "Centrale",
    coordinates: [8.691007, 1.004937],
    surface: "500 m²",
    description: "Terrain de 500 m² à Blitta. Prix compétitif pour cette zone. Documentation disponible pour transaction rapide.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan de situation", description: "Plan de localisation" },
      { name: "Relevé topographique", description: "Document technique" }
    ]
  },
  {
    id: 17,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Vincent Komlan",
    price: "39 000 000 Fcfa",
    priceValue: 39000000,
    status: "available",
    acteur: "Badou – Plateaux",
    location: "Badou",
    region: "Plateaux",
    coordinates: [7.675154, 1.20691],
    surface: "450 m²",
    description: "Terrain de 450 m² à Badou. Terrain compact idéal pour petite résidence. Documents en règle.",
    documents: [
      { name: "Certificat de propriété", description: "Document certifiant la propriété" },
      { name: "Plan cadastral", description: "Plan cadastral du terrain" },
      { name: "Plan de bornage", description: "Délimitation du terrain" }
    ]
  },
  {
    id: 18,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Adjonou Yendouma",
    price: "Titre Foncier : Privé",
    priceValue: null,
    status: "private",
    acteur: "Kpalimé – Plateaux",
    location: "Kpalimé",
    region: "Plateaux",
    coordinates: [7.172321, 0.891784],
    surface: "600 m²",
    description: "Terrain privé de 600 m² à Kpalimé. Ville touristique avec cadre verdoyant. Titre foncier sécurisé.",
    documents: [
      { name: "Titre Foncier", description: "Document officiel du titre foncier privé" },
      { name: "Plan cadastral", description: "Plan cadastral certifié" },
      { name: "Certificat de propriété", description: "Attestation de propriété" },
      { name: "Plan de bornage", description: "Délimitation du terrain" }
    ]
  },
  {
    id: 19,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Komlan Gnassingbé",
    price: "Titre Foncier : Privé",
    priceValue: null,
    status: "private",
    acteur: "Mango – Savanes",
    location: "Mango",
    region: "Savanes",
    coordinates: [10.829896, 0.494578],
    surface: "700 m²",
    description: "Terrain privé de 700 m² à Mango, région des Savanes. Titre foncier établi. Bon emplacement.",
    documents: [
      { name: "Titre Foncier", description: "Document officiel du titre foncier privé" },
      { name: "Plan cadastral", description: "Plan cadastral officiel" },
      { name: "Certificat de propriété", description: "Attestation de propriété" }
    ]
  },
  {
    id: 20,
    image: heroImage,
    images: [heroImage, heroImage, heroImage, heroImage],
    title: "Ayité Djidjoho",
    price: "Titre Foncier : En cours",
    priceValue: null,
    status: "pending",
    acteur: "Aného – Maritime",
    location: "Aného",
    region: "Maritime",
    coordinates: [6.303018, 1.157843],
    surface: "550 m²",
    description: "Terrain de 550 m² à Aného. Titre foncier en cours de finalisation. Ville côtière avec potentiel touristique.",
    documents: [
      { name: "Demande de titre foncier", description: "Document de demande en cours de traitement" },
      { name: "Plan de situation", description: "Plan de localisation du terrain" },
      { name: "Relevé topographique", description: "Document technique" },
      { name: "Attestation de possession", description: "Document provisoire" }
    ]
  },
];

export const getPropertyById = (id) => {
  return properties.find(p => p.id === parseInt(id));
};

export const getPropertiesByRegion = (region) => {
  if (!region || region === 'all') return properties;
  return properties.filter(p => p.region === region);
};

export const getPropertiesByStatus = (status) => {
  if (!status || status === 'all') return properties;
  return properties.filter(p => p.status === status);
};

export const getPropertiesByPriceRange = (min, max) => {
  return properties.filter(p => {
    if (!p.priceValue) return false;
    return p.priceValue >= min && p.priceValue <= max;
  });
};
