# 🚀 Backend NestJS - Agnigna Gna

Backend API REST complet développé avec NestJS, TypeORM et PostgreSQL pour la plateforme immobilière Agnigna Gna.

---

## 📋 Table des Matières

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Lancement](#lancement)
5. [API Endpoints](#api-endpoints)
6. [Connexion Front-end](#connexion-front-end)
7. [Connexion Admin](#connexion-admin)
8. [Base de Données](#base-de-données)

---

## 🏗️ Architecture

### Structure du Projet

```
backend/
├── src/
│   ├── common/
│   │   └── entities/          # Entités TypeORM
│   │       ├── property.entity.ts
│   │       ├── user.entity.ts
│   │       ├── contact.entity.ts
│   │       ├── transaction.entity.ts
│   │       ├── system-log.entity.ts
│   │       ├── activity.entity.ts
│   │       ├── system-config.entity.ts
│   │       └── data-export.entity.ts
│   ├── modules/
│   │   ├── auth/              # Authentification JWT
│   │   ├── users/             # Gestion utilisateurs
│   │   ├── properties/        # Gestion propriétés
│   │   ├── contacts/          # Messages de contact
│   │   ├── transactions/      # Transactions
│   │   ├── admin/             # Dashboard admin
│   │   ├── system-logs/       # Logs système
│   │   ├── activities/        # Activités
│   │   ├── data-exports/      # Exports de données
│   │   └── system-config/     # Configuration système
│   ├── app.module.ts          # Module principal
│   ├── app.controller.ts      # Controller principal
│   ├── app.service.ts         # Service principal
│   └── main.ts                # Point d'entrée
├── .env.example               # Variables d'environnement (exemple)
├── package.json               # Dépendances
└── tsconfig.json              # Configuration TypeScript
```

### Technologies Utilisées

- **NestJS** - Framework Node.js progressif
- **TypeORM** - ORM pour TypeScript/JavaScript
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification par token
- **Passport** - Middleware d'authentification
- **Swagger** - Documentation API automatique
- **bcrypt** - Hachage de mots de passe
- **class-validator** - Validation des DTOs

---

## 📦 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- npm ou yarn

### Étapes d'Installation

1. **Naviguer vers le dossier backend**
```bash
cd backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Créer le fichier .env**
```bash
cp .env.example .env
```

4. **Configurer les variables d'environnement** (voir section Configuration)

---

## ⚙️ Configuration

### 1. Base de Données PostgreSQL

**Option A: PostgreSQL Local**
```bash
# Installer PostgreSQL
# Windows: Télécharger depuis https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Créer la base de données
createdb agnigna_gna

# Ou via psql
psql -U postgres
CREATE DATABASE agnigna_gna;
\q
```

**Option B: Utiliser Supabase (recommandé)**
- Votre projet utilise déjà Supabase
- URL: `https://xywauwyayfcewlxkgdwe.supabase.co`
- Récupérez les informations de connexion depuis votre dashboard Supabase:
  - Project Settings → Database → Connection string

### 2. Fichier .env

Éditez le fichier `.env` avec vos informations:

```env
# Base de Données (Supabase)
DATABASE_HOST=db.xywauwyayfcewlxkgdwe.supabase.co
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=votre_mot_de_passe_supabase
DATABASE_NAME=postgres

# JWT Configuration
JWT_SECRET=votre_super_secret_jwt_change_me_in_production_123456789
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=votre_refresh_secret_key_change_me
JWT_REFRESH_EXPIRATION=30d

# Application
PORT=3001
NODE_ENV=development
API_PREFIX=api/v1

# CORS (URL du front-end)
CORS_ORIGIN=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Email SMTP (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre_email@gmail.com
SMTP_PASSWORD=votre_app_password
EMAIL_FROM=noreply@agnigbagna.com
```

### 3. Configuration Supabase

Si vous utilisez Supabase (recommandé), vous devez:

1. **Récupérer les informations de connexion**
   - Aller sur https://app.supabase.com
   - Sélectionner votre projet
   - Settings → Database
   - Connection string → URI

2. **Format de connexion**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xywauwyayfcewlxkgdwe.supabase.co:5432/postgres
```

Décomposez cette URL dans votre `.env`:
```env
DATABASE_HOST=db.xywauwyayfcewlxkgdwe.supabase.co
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=[YOUR-PASSWORD]
DATABASE_NAME=postgres
```

---

## 🚀 Lancement

### Mode Développement

```bash
# Démarrer le serveur en mode watch
npm run start:dev
```

Le serveur démarre sur: `http://localhost:3001`
Documentation Swagger: `http://localhost:3001/api/docs`

### Mode Production

```bash
# Build
npm run build

# Lancer en production
npm run start:prod
```

### Vérification

Une fois démarré, vous devriez voir:
```
╔══════════════════════════════════════════════╗
║                                              ║
║   🚀 Agnigna Gna Backend API                ║
║                                              ║
║   📍 Server:  http://localhost:3001        ║
║   📚 Docs:    http://localhost:3001/api/docs ║
║   🌍 Env:     development                    ║
║                                              ║
╚══════════════════════════════════════════════╝
```

---

## 📡 API Endpoints

### Health Check

```http
GET /
GET /health
```

### Authentification (`/api/v1/auth`)

```http
POST   /api/v1/auth/register    # Inscription
POST   /api/v1/auth/login        # Connexion
GET    /api/v1/auth/profile      # Profil utilisateur (protégé)
```

### Propriétés (`/api/v1/properties`)

```http
GET    /api/v1/properties              # Liste des propriétés (avec filtres et pagination)
POST   /api/v1/properties              # Créer une propriété
GET    /api/v1/properties/statistics   # Statistiques
GET    /api/v1/properties/most-viewed  # Plus vues
GET    /api/v1/properties/recent       # Récentes
GET    /api/v1/properties/:id          # Détail d'une propriété
PUT    /api/v1/properties/:id          # Modifier une propriété
DELETE /api/v1/properties/:id          # Supprimer une propriété
```

**Paramètres de requête (Query params):**
```
?page=1                      # Page (défaut: 1)
&limit=10                    # Nombre par page (défaut: 10)
&type=residential            # Filtrer par type
&status=available            # Filtrer par statut
&location=Lomé               # Filtrer par localisation
&search=terrain              # Recherche textuelle
&sortBy=created_at           # Trier par champ
&sortOrder=DESC              # Ordre de tri (ASC/DESC)
```

### Utilisateurs (`/api/v1/users`)

```http
GET    /api/v1/users              # Liste des utilisateurs
GET    /api/v1/users/statistics   # Statistiques
GET    /api/v1/users/:id          # Détail d'un utilisateur
PUT    /api/v1/users/:id          # Modifier un utilisateur
DELETE /api/v1/users/:id          # Supprimer un utilisateur
```

### Contacts (`/api/v1/contacts`)

```http
GET    /api/v1/contacts              # Liste des messages
POST   /api/v1/contacts              # Créer un message
GET    /api/v1/contacts/statistics   # Statistiques
GET    /api/v1/contacts/:id          # Détail d'un message
PUT    /api/v1/contacts/:id          # Modifier un message
DELETE /api/v1/contacts/:id          # Supprimer un message
```

### Transactions (`/api/v1/transactions`)

```http
GET    /api/v1/transactions              # Liste des transactions
POST   /api/v1/transactions              # Créer une transaction
GET    /api/v1/transactions/statistics   # Statistiques
GET    /api/v1/transactions/:id          # Détail d'une transaction
PUT    /api/v1/transactions/:id          # Modifier une transaction
```

### Admin (`/api/v1/admin`)

```http
GET    /api/v1/admin/dashboard     # Dashboard complet
GET    /api/v1/admin/activities    # Activités récentes
```

---

## 🔗 Connexion Front-end React

### 1. Créer un Service API

Créez `src/services/api.js` dans votre front-end React:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

// Instance axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Services pour chaque module

**services/propertiesService.js:**
```javascript
import api from './api';

export const propertiesService = {
  // Récupérer toutes les propriétés
  getAll: async (params = {}) => {
    const response = await api.get('/properties', { params });
    return response.data;
  },

  // Récupérer une propriété
  getById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Créer une propriété
  create: async (data) => {
    const response = await api.post('/properties', data);
    return response.data;
  },

  // Mettre à jour une propriété
  update: async (id, data) => {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  // Supprimer une propriété
  delete: async (id) => {
    await api.delete(`/properties/${id}`);
  },

  // Statistiques
  getStatistics: async () => {
    const response = await api.get('/properties/statistics');
    return response.data;
  },

  // Plus vues
  getMostViewed: async (limit = 5) => {
    const response = await api.get('/properties/most-viewed', { params: { limit } });
    return response.data;
  },

  // Récentes
  getRecent: async (limit = 5) => {
    const response = await api.get('/properties/recent', { params: { limit } });
    return response.data;
  },
};
```

**services/authService.js:**
```javascript
import api from './api';

export const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Connexion
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  // Profil
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Vérifier si connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Obtenir l'utilisateur
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
```

### 3. Utilisation dans les Composants React

```javascript
import React, { useState, useEffect } from 'react';
import { propertiesService } from '../services/propertiesService';

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
    status: 'available',
    location: '',
  });

  useEffect(() => {
    fetchProperties();
  }, [page, filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await propertiesService.getAll({
        page,
        limit: 10,
        ...filters,
      });
      setProperties(data.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Votre UI ici */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          {properties.map(property => (
            <div key={property.id}>{property.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🔐 Connexion Admin Panel

### Modifier vos composants Admin

**src/admin/context/AdminAuthContext.jsx:**

Remplacez Supabase par votre API:

```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../../services/authService';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const profile = await authService.getProfile();
        if (profile.role === 'admin') {
          setUser(profile);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data.user.role === 'admin') {
      setUser(data.user);
      return data;
    } else {
      throw new Error('Accès refusé. Droits admin requis.');
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
```

### Adapter les Pages Admin

Exemple pour **Dashboard/index.jsx**:

```javascript
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <div className="stats-grid">
        <StatCard 
          title="Propriétés" 
          value={stats.properties.total}
          subtitle={`${stats.properties.byStatus.available} disponibles`}
        />
        <StatCard 
          title="Utilisateurs" 
          value={stats.users.total}
          subtitle={`${stats.users.active} actifs`}
        />
        {/* ... autres stats */}
      </div>
    </div>
  );
}
```

---

## 🗄️ Base de Données

### Structure des Tables

Le backend utilise les mêmes tables que vous avez déjà créées dans Supabase:

- **properties** - Propriétés immobilières
- **profiles** (users) - Utilisateurs
- **contacts** - Messages de contact
- **transactions** - Transactions
- **system_logs** - Logs système
- **activities** - Activités
- **system_config** - Configuration
- **data_exports** - Exports de données

### Synchronisation Automatique

TypeORM synchronisera automatiquement les entités avec votre base de données en mode développement (`synchronize: true`).

⚠️ **Important**: En production, désactivez la synchronisation automatique et utilisez des migrations.

### Migrations (Production)

```bash
# Générer une migration
npm run typeorm migration:generate -- -n InitialMigration

# Exécuter les migrations
npm run typeorm migration:run

# Annuler une migration
npm run typeorm migration:revert
```

---

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

---

## 📚 Documentation API

La documentation Swagger est automatiquement générée et accessible sur:

**http://localhost:3001/api/docs**

Vous y trouverez:
- Liste complète des endpoints
- Schémas de requêtes et réponses
- Possibilité de tester directement les endpoints
- Authentification JWT intégrée

---

## 🛠️ Développement

### Commandes Utiles

```bash
# Formater le code
npm run format

# Linter
npm run lint

# Build
npm run build

# Mode debug
npm run start:debug
```

### Ajout d'un Nouveau Module

```bash
# Générer un module complet
nest g resource nom-module

# Générer uniquement
nest g module nom-module
nest g controller nom-module
nest g service nom-module
```

---

## 🔒 Sécurité

### Best Practices Implémentées

- ✅ Authentification JWT
- ✅ Hash des mots de passe avec bcrypt
- ✅ Validation des données (class-validator)
- ✅ Protection CORS
- ✅ Helmet pour les headers sécurisés
- ✅ Rate limiting (à configurer)
- ✅ Variables d'environnement
- ✅ TypeORM pour prévenir les injections SQL

### Recommandations Production

1. **Variables d'environnement**
   - Utilisez des secrets forts pour JWT
   - Ne committez jamais le fichier `.env`

2. **HTTPS**
   - Utilisez toujours HTTPS en production
   - Configurez un certificat SSL

3. **Rate Limiting**
   - Implémentez un rate limiting sur les routes sensibles
   - Protégez contre les attaques par force brute

4. **Logging**
   - Loggez toutes les actions importantes
   - Utilisez un service de monitoring (Sentry, etc.)

---

## 🚢 Déploiement

### Heroku

```bash
# Login
heroku login

# Créer l'app
heroku create agnigna-gna-api

# Ajouter PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Déployer
git push heroku main

# Variables d'environnement
heroku config:set JWT_SECRET=votre_secret
heroku config:set NODE_ENV=production
```

### Render

1. Connecter votre repo GitHub
2. Sélectionner "Web Service"
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`
5. Ajouter les variables d'environnement

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

---

## 📞 Support

Pour toute question ou problème:
- Email: contact@agnigbagna.com
- GitHub Issues: [Lien vers votre repo]

---

## 📝 Licence

Copyright © 2025 Hustlers Corporation. Tous droits réservés.

---

## ✅ Checklist de Démarrage

- [ ] Node.js et PostgreSQL installés
- [ ] Dépendances installées (`npm install`)
- [ ] Fichier `.env` configuré
- [ ] Base de données créée
- [ ] Serveur lancé (`npm run start:dev`)
- [ ] Documentation Swagger accessible
- [ ] Front-end connecté à l'API
- [ ] Admin panel connecté à l'API
- [ ] Tests effectués

---

**Développé avec ❤️ par Hustlers Corporation**
