# Tableau de Bord Administrateur - Agnigban Gna

## 📋 Vue d'ensemble

Tableau de bord administrateur complet pour gérer tous les flux de la plateforme immobilière Agnigban Gna. Interface moderne et intuitive construite avec React et TailwindCSS.

---

## 🚀 Fonctionnalités

### Dashboard Principal
- **Statistiques en temps réel** : Propriétés, utilisateurs, messages, revenus
- **Graphiques** : Visualisation des données
- **Activités récentes** : Suivi des dernières actions
- **Propriétés récentes** : Liste des derniers ajouts

### Gestion des Propriétés
- ✅ Liste complète des propriétés
- ✅ Recherche et filtres avancés
- ✅ Ajout/Modification/Suppression
- ✅ Gestion des statuts (Disponible, Vendu, En attente)
- ✅ Prévisualisation rapide

### Gestion des Utilisateurs
- ✅ Liste de tous les utilisateurs
- ✅ Informations détaillées (email, téléphone, rôle)
- ✅ Filtrage par rôle (Admin, Utilisateur)
- ✅ Modification et suppression

### Gestion des Messages
- ✅ Boîte de réception complète
- ✅ Marquage lu/non lu
- ✅ Vue détaillée des messages
- ✅ Filtrage et recherche
- ✅ Suppression de messages

### Authentification Sécurisée
- ✅ Connexion réservée aux admins
- ✅ Vérification du rôle dans Supabase
- ✅ Routes protégées
- ✅ Gestion de session

---

## 📁 Structure des Fichiers

```
src/admin/
├── config/
│   └── adminRoutes.js          # Configuration des routes admin
├── context/
│   └── AdminAuthContext.jsx    # Contexte d'authentification admin
├── components/
│   ├── Layout/
│   │   └── AdminLayout.jsx     # Layout principal avec sidebar
│   └── ProtectedRoute.jsx      # HOC pour routes protégées
├── pages/
│   ├── Dashboard/
│   │   ├── index.jsx           # Page principale du dashboard
│   │   ├── DashboardStats.jsx  # Composant des statistiques
│   │   └── RecentActivities.jsx # Activités récentes
│   ├── Properties/
│   │   └── PropertiesList.jsx  # Gestion des propriétés
│   ├── Users/
│   │   └── UsersList.jsx       # Gestion des utilisateurs
│   ├── Contacts/
│   │   └── ContactsList.jsx    # Gestion des messages
│   └── Login/
│       └── AdminLogin.jsx      # Page de connexion admin
└── AdminApp.jsx                # Point d'entrée admin
```

---

## 🔐 Configuration Supabase

### 1. Créer la table `profiles` (si elle n'existe pas)

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Ajouter un index sur le rôle
CREATE INDEX idx_profiles_role ON profiles(role);

-- Trigger pour créer automatiquement un profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 2. Créer la table `contacts`

```sql
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
```

### 3. Créer la table `properties` (si elle n'existe pas)

```sql
CREATE TABLE properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  status TEXT DEFAULT 'available',
  coordinates JSONB,
  description TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_properties_status ON properties(status);
```

### 4. Créer la table `activities`

```sql
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_activities_created_at ON activities(created_at DESC);
```

### 5. Créer un utilisateur administrateur

```sql
-- Après création d'un compte utilisateur normal, mettez à jour son rôle
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@example.com';
```

---

## 🌐 Routes Admin

| Route | Description |
|-------|-------------|
| `/admin/login` | Page de connexion admin |
| `/admin/dashboard` | Tableau de bord principal |
| `/admin/properties` | Gestion des propriétés |
| `/admin/users` | Gestion des utilisateurs |
| `/admin/contacts` | Gestion des messages |
| `/admin/transactions` | Transactions (à venir) |
| `/admin/analytics` | Statistiques détaillées (à venir) |
| `/admin/settings` | Paramètres (à venir) |

---

## 🎨 Design System

### Couleurs
- **Primary** : Green (#16a34a - green-600)
- **Success** : Green (#22c55e)
- **Warning** : Yellow (#eab308)
- **Danger** : Red (#ef4444)
- **Info** : Blue (#3b82f6)

### Composants
- **Sidebar** : Navigation principale avec icônes
- **Header** : Barre de recherche et profil
- **Cards** : Conteneurs pour statistiques
- **Tables** : Listes avec actions
- **Modals** : Formulaires et confirmations

---

## 🔒 Sécurité

1. **Authentification** : Vérification du rôle admin avant accès
2. **Routes protégées** : Redirection automatique si non authentifié
3. **Tokens** : Gestion des tokens Supabase
4. **RLS** : Row Level Security sur Supabase (recommandé)

### Configuration RLS recommandée

```sql
-- Pour les profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by admins" 
ON profiles FOR SELECT 
USING (auth.role() = 'authenticated');

-- Pour les properties
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties" 
ON properties FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert properties" 
ON properties FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);
```

---

## 📊 Utilisation

### Accéder au tableau de bord

1. Créez un compte utilisateur sur le site
2. Mettez à jour le rôle en admin dans Supabase
3. Allez sur `/admin/login`
4. Connectez-vous avec vos identifiants
5. Accédez au dashboard

### Gérer les propriétés

1. Cliquez sur "Propriétés" dans le menu
2. Utilisez la barre de recherche pour filtrer
3. Cliquez sur les boutons d'action (Voir, Modifier, Supprimer)
4. Ajoutez une nouvelle propriété avec le bouton "+"

### Gérer les messages

1. Cliquez sur "Messages" dans le menu
2. Sélectionnez un message dans la liste
3. Marquez comme lu ou supprimez
4. Répondez directement (à implémenter)

---

## 🚀 Prochaines Fonctionnalités

- [ ] Gestion des transactions
- [ ] Statistiques avancées avec graphiques
- [ ] Export de données (CSV, PDF)
- [ ] Notifications push
- [ ] Système de messagerie interne
- [ ] Gestion des médias (images)
- [ ] Logs d'activité détaillés
- [ ] Paramètres de configuration
- [ ] Multi-langue

---

## 🐛 Dépannage

### Problème de connexion
- Vérifiez que le rôle est bien "admin" dans la table profiles
- Vérifiez les credentials Supabase
- Vérifiez la console pour les erreurs

### Données ne s'affichent pas
- Vérifiez les tables Supabase
- Vérifiez les politiques RLS
- Vérifiez la connexion réseau

### Erreur de route
- Vérifiez que le chemin commence par `/admin`
- Vérifiez que vous êtes authentifié

---

## 📞 Support

Pour toute question ou assistance :
- Email : support@anyigbanya.com
- Documentation : Voir README principal

---

## ✨ Développé par

**Hustlers Corporation**

Avec ❤️ pour Anyigbã Nya
