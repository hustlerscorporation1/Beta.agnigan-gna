# Agnigban Gna - Plateforme Immobilière au Togo

Plateforme moderne d'achat et de vente de terrains au Togo. Interface élégante, responsive et professionnelle construite avec React, TailwindCSS et Supabase.

---

## Fonctionnalités

- **Catalogue de terrains** - Parcourez des centaines de terrains disponibles
- **Recherche avancée** - Filtrez par ville, prix, superficie
- **Authentification** - Connexion sécurisée avec Supabase (Email + Google OAuth)
- **Design Responsive** - Interface optimisée pour mobile, tablette et desktop
- **ChatBot intelligent** - Assistant virtuel pour vous guider
- **Carte interactive** - Visualisation des terrains avec Leaflet
- **Animations fluides** - Expérience utilisateur moderne avec Framer Motion

---

## Installation

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- Compte Supabase (pour l'authentification)

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/agnigban_gna.git
cd agnigban_gna

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créez un fichier .env à la racine avec :
# REACT_APP_SUPABASE_URL=votre_url_supabase
# REACT_APP_SUPABASE_ANON_KEY=votre_cle_anonyme

# Lancer en développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

---

## Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **React Router v7** - Navigation
- **TailwindCSS** - Styling moderne
- **Framer Motion** - Animations
- **Lucide React / Heroicons** - Icônes

### Backend & Services
- **Supabase** - Authentification, Base de données
- **Leaflet** - Cartes interactives
- **OpenAI API** - ChatBot intelligent

### UI/UX
- **Design System** personnalisé
- **Composants réutilisables** (Button, Card, Input, etc.)
- **Responsive** - Mobile-first approach
- **Animations** - Transitions fluides

---

## Structure du Projet

```bash
agnigban_gna/
├── public/               # Fichiers statiques
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── ui/          # Composants UI (Button, Card, Input, etc.)
│   │   ├── layout/      # Layout (Header, Footer, Layout)
│   │   └── ChatBot/     # ChatBot intelligent
│   ├── pages/           # Pages de l'application
│   │   ├── Home/        # Page d'accueil (Hero, Services, etc.)
│   │   ├── Properties/  # Catalogue de propriétés
│   │   ├── About/       # À propos
│   │   ├── Contact/     # Contact
│   │   └── Auth/        # Authentification (Login, Register, Profile)
│   ├── config/          # Configuration
│   │   ├── constants.js # Constantes globales
│   │   └── theme.js     # Thème de l'application
│   ├── superbase/       # Configuration Supabase
│   ├── App.jsx          # Composant principal
│   ├── index.js         # Point d'entrée
│   └── index.css        # Styles globaux
├── tailwind.config.js   # Configuration Tailwind
└── package.json         # Dépendances
```

---

## 🎨 Design System

### Couleurs
- **Primary** : Green (#43a55d - Couleur principale de la marque)
- **Secondary** : Green (#43a55d)
- **Accent** : Orange (#f97316)
- **Neutral** : Gray scale

### Typographie
- **Headings** : Poppins (Bold, SemiBold)
- **Body** : Inter (Regular, Medium, SemiBold)

### Composants UI
Tous les composants sont modulaires et réutilisables :
- `Button` - Variantes: primary, secondary, outline, ghost
- `Card` - Conteneur avec shadow et hover effects
- `Input` - Input avec label, icône et validation
- `Badge` - Tags de statut
- `Container` - Wrapper responsive

---

## Pages Principales

### 1. Page d'Accueil
- Hero section avec Typed.js
- Services (Vérifier, Acheter, Vendre)
- Terrains en vedette
- Témoignages clients
- Call-to-action

### 2. Propriétés
- Catalogue complet avec filtres
- Recherche par ville, prix
- Cartes de propriétés interactives

### 3. À Propos
- Mission & Vision
- Valeurs de l'entreprise
- Statistiques
- Équipe

### 4. Contact
- Formulaire de contact
- Coordonnées
- Carte interactive
- FAQ

### 5. Authentification
- Connexion (Email + Google OAuth)
- Inscription
- Récupération de mot de passe
- Profil utilisateur

---

## Déploiement

### Build de production

```bash
npm run build
```

Le build sera généré dans le dossier `build/`

### Déploiement sur Netlify/Vercel

1. Connectez votre repo GitHub
2. Configurez les variables d'environnement
3. Commande de build : `npm run build`
4. Dossier de publication : `build`

---

## Équipe

- **Développement** - Hustlers Corporation
- **Design** - Interface moderne et professionnelle
- **Backend** - Intégration Supabase

---

## Licence

Ce projet est sous licence privée. Tous droits réservés.

---

## Historique des Versions

### Version 2.0 (Novembre 2024)
- Refonte complète du design
- Architecture modulaire et professionnelle
- Nouveau design system avec Tailwind
- Composants UI réutilisables
- Animations avec Framer Motion
- ChatBot amélioré
- Responsive sur tous les écrans

### Version 1.0
- Version initiale

---

## Support

Pour toute question ou assistance :
- Email : contact@agnigbagna.com
- Téléphone : +228 XX XX XX XX
