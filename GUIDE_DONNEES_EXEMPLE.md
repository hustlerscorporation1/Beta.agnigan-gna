# 📊 Guide d'Utilisation des Données d'Exemple

## 🚀 Installation Rapide

### Étape 1: Accéder à Supabase

1. Connectez-vous à votre tableau de bord Supabase
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**

### Étape 2: Exécuter les Données d'Exemple

1. Ouvrez le fichier `src/admin/data/exemples_donnees.sql`
2. Copiez tout le contenu
3. Collez dans le SQL Editor de Supabase
4. Cliquez sur **RUN** pour exécuter

### Étape 3: Créer un Compte Admin

Dans le SQL Editor, exécutez:

```sql
-- Créer un utilisateur admin dans Supabase Auth
-- Puis ajoutez son profil
INSERT INTO profiles (id, email, full_name, role, phone)
VALUES (
  'VOTRE_USER_ID_SUPABASE',
  'admin@agnigna-gna.tg',
  'Administrateur Principal',
  'admin',
  '+228 90 00 00 00'
);
```

**OU** utilisez l'interface admin après avoir créé un premier admin manuellement:
- Email: `admin@agnigna-gna.tg`
- Password: `Admin@2025` (changez-le après première connexion)

---

## 📦 Ce Qui Est Inclus

### Propriétés (13 au total)

#### 🛒 Terrains Achetés (3)
- Terrain Résidentiel - Lomé Centre (500m² - 25M FCFA)
- Grand Terrain Commercial - Kara (1200m² - 45M FCFA)
- Terrain Agricole - Sokodé (5 hectares - 35M FCFA)

#### ✅ Terrains Vendus (4)
- Villa Moderne - Bè (600m² - 85M FCFA)
- Terrain Lotissement - Aného (400m² - 18M FCFA)
- Espace Commercial - Tokoin (800m² - 95M FCFA)
- Terrain Industriel - Zone Portuaire (2000m² - 120M FCFA)

#### 🔄 Terrains En Processus (3)
- Domaine Résidentiel - Adidogomé (1500m² - 75M FCFA)
- Complexe Commercial - Hédzranawoé (3000m² - 150M FCFA)
- Terrain Mixte - Kpalimé (2500m² - 55M FCFA)

#### 🟢 Terrains Disponibles (3)
- Terrain de Rêve - Bord de Mer (800m² - 125M FCFA)
- Lot Résidentiel - Agbalépédogan (450m² - 22M FCFA)
- Terrain Agricole Premium - Atakpamé (10 hectares - 65M FCFA)

### Contacts (4)
Exemples de messages clients avec différents niveaux d'intérêt

---

## 🎯 Visualiser les Données

### Dans l'Admin Dashboard

1. **Connectez-vous** à `/admin/login` avec vos identifiants admin
2. **Propriétés** → Sous-menu pour voir chaque catégorie:
   - Terrains achetés (3)
   - Terrains vendus (4)
   - Terrains en processus (3)
3. **Statistiques** → Visualisez les graphiques avec données réelles

### Statistiques Générées

```
Total Propriétés: 13
├── Achetées: 3 (23%)
├── Vendues: 4 (31%)
├── En Processus: 3 (23%)
└── Disponibles: 3 (23%)

Revenus Totaux: 318M FCFA
Taux de Conversion: ~31%
Total Contacts: 4
```

---

## ⚡ Connexion Admin Optimisée

### Fonctionnalités de Performance

✅ **Cache localStorage** - Session stockée localement
✅ **Chargement instantané** - Vérification rapide au démarrage
✅ **Feedback visuel** - Animations fluides
✅ **Auto-redirection** - Si déjà connecté

### Première Connexion

1. Allez sur `/admin/login`
2. Entrez vos identifiants
3. Le système:
   - Vérifie les credentials (Supabase Auth)
   - Vérifie le rôle admin (table profiles)
   - Met en cache la session
   - Redirige vers le dashboard

### Reconnexions Suivantes

- ⚡ **Ultra-rapide** grâce au cache
- Pas de re-vérification lourde
- Validation en arrière-plan

---

## 🔒 Sécurité

### Protection des Routes

- ✅ Vérification du rôle `admin` obligatoire
- ✅ Session sécurisée via Supabase
- ✅ Déconnexion automatique si non-admin
- ✅ Cache nettoyé à la déconnexion

### Permissions

Configurez les permissions utilisateur via:
1. **Utilisateurs** → Cliquez sur l'icône bouclier
2. Cochez/décochez selon les besoins
3. Sauvegarde instantanée

---

## 🎨 Personnalisation

### Modifier les Données

**Pour ajouter d'autres terrains:**

```sql
INSERT INTO properties (title, description, price, location, area, type, status, image, features)
VALUES (
  'Votre Titre',
  'Description...',
  'Prix FCFA',
  'Localisation',
  'Surface',
  'Type',
  'status', -- 'available', 'sold', 'purchased', 'in_process'
  'URL_image',
  '{"key": "value"}'::jsonb
);
```

**Types de statuts:**
- `available` - Disponible
- `sold` - Vendu
- `purchased` - Acheté
- `in_process` ou `processing` - En processus

---

## 📱 Navigation dans l'Admin

### Menu Principal

```
📊 Dashboard
  └── Vue d'ensemble

🏘️ Propriétés
  ├── Toutes les propriétés
  ├── Terrains achetés
  ├── Terrains vendus
  └── Terrains en processus

👥 Utilisateurs
  └── Gestion et permissions

💬 Contacts
  └── Messages clients

💰 Transactions
  └── Historique

📈 Statistiques
  └── Analyses détaillées
```

---

## 🐛 Dépannage

### Les données ne s'affichent pas?

1. **Vérifiez la connexion** à Supabase
2. **Assurez-vous** que les données sont insérées
3. **Rafraîchissez** la page (F5)
4. **Vérifiez** les filtres de statut

### Problème de connexion?

1. **Vérifiez** que l'utilisateur existe dans `profiles`
2. **Le rôle** doit être `'admin'`
3. **Nettoyez** le cache navigateur si nécessaire
4. **Videz** localStorage: `localStorage.clear()`

### Statistiques incorrectes?

- Les stats sont calculées en temps réel
- Vérifiez que les statuts sont corrects
- Rechargez la page statistiques

---

## 💡 Conseils d'Utilisation

### Pour une Démo

1. ✅ Utilisez toutes les données d'exemple
2. ✅ Créez 1-2 utilisateurs non-admin
3. ✅ Testez les permissions
4. ✅ Exportez les données CSV

### Pour la Production

1. 🔄 Remplacez par de vraies données
2. 🔒 Changez les mots de passe admin
3. 📧 Utilisez de vrais emails
4. 🖼️ Uploadez de vraies images

---

## 📊 Structure des Tables

### Table `properties`
```
- id (uuid)
- title (text)
- description (text)
- price (text)
- location (text)
- area (text)
- type (text)
- status (text) ← Important pour les catégories
- image (text)
- features (jsonb)
- created_at (timestamp)
```

### Table `profiles`
```
- id (uuid) ← Lié à Supabase Auth
- email (text)
- full_name (text)
- phone (text)
- role (text) ← 'admin' ou 'user'
- permissions (jsonb)
- created_at (timestamp)
```

### Table `contacts`
```
- id (uuid)
- name (text)
- email (text)
- phone (text)
- message (text)
- property_id (uuid) ← Référence properties
- created_at (timestamp)
```

---

## 🎓 Ressources

- **Documentation Supabase**: https://supabase.com/docs
- **Documentation React**: https://react.dev
- **TailwindCSS**: https://tailwindcss.com

---

**Date:** 29 Octobre 2025  
**Version:** 2.0.0  
**Statut:** ✅ Prêt pour utilisation
