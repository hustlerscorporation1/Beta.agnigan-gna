# 🔧 Guide d'Intégration du Dashboard

## ✅ Étapes d'Intégration

### 1. Ajouter les Routes dans App.jsx

Ouvrez `src/App.jsx` et ajoutez les routes du dashboard :

```javascript
import Dashboard from './pages/Dashboard';

// Dans votre composant Routes
<Route path="/dashboard/*" element={<Dashboard />} />
```

### 2. Ajouter les Routes dans constants.js

Ouvrez `src/config/constants.js` et ajoutez :

```javascript
export const ROUTES = {
  // ... routes existantes
  DASHBOARD: '/dashboard',
  DASHBOARD_PROPERTIES: '/dashboard/properties',
  DASHBOARD_USERS: '/dashboard/users',
  DASHBOARD_MESSAGES: '/dashboard/messages',
  DASHBOARD_NOTIFICATIONS: '/dashboard/notifications',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_SETTINGS: '/dashboard/settings'
};
```

### 3. Protéger les Routes Dashboard (Optionnel)

Créez un composant `ProtectedRoute` pour sécuriser l'accès :

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Chargement...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

Puis dans `App.jsx` :

```javascript
<Route 
  path="/dashboard/*" 
  element={
    <ProtectedRoute adminOnly>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### 4. Ajouter un Lien vers le Dashboard dans le Header

Dans `src/components/layout/Header.jsx` :

```javascript
// Seulement pour les administrateurs
{user && user.role === 'admin' && (
  <Link 
    to="/dashboard"
    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
  >
    <Cog6ToothIcon className="h-5 w-5" />
    Dashboard Admin
  </Link>
)}
```

### 5. Configuration Supabase pour le Dashboard

#### Créer les tables nécessaires :

```sql
-- Table des utilisateurs étendus
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT DEFAULT 'buyer', -- 'admin', 'seller', 'buyer'
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- 'success', 'warning', 'danger', 'info'
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES auth.users,
  receiver_id UUID REFERENCES auth.users,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des activités
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  type TEXT NOT NULL, -- 'user_created', 'property_added', 'property_sold', etc.
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. Créer les Hooks pour le Dashboard

#### `src/hooks/useDashboardStats.js`

```javascript
import { useState, useEffect } from 'react';
import { supabase } from '../superbase/superbaseClient';

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Charger le nombre de terrains
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      // Charger le nombre d'utilisateurs
      const { count: usersCount } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Charger le total des vues
      const { data: views } = await supabase
        .from('properties')
        .select('views');
      
      const totalViews = views?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;

      setStats({
        totalProperties: propertiesCount || 0,
        totalUsers: usersCount || 0,
        totalRevenue: 0, // À calculer selon votre logique
        totalViews
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refresh: loadStats };
};
```

#### `src/hooks/useProperties.js`

```javascript
import { useState, useEffect } from 'react';
import { supabase } from '../superbase/superbaseClient';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          user_profiles(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Erreur chargement terrains:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadProperties();
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  return { properties, loading, refresh: loadProperties, deleteProperty };
};
```

### 7. Remplacer les Données Mock

Dans chaque page du dashboard, remplacez les données statiques par des hooks :

**Exemple : DashboardHome.jsx**

```javascript
import { useDashboardStats } from '../../hooks/useDashboardStats';

const DashboardHome = () => {
  const { stats, loading } = useDashboardStats();

  if (loading) return <div>Chargement...</div>;

  // Utilisez stats au lieu des valeurs hardcodées
  const statsData = [
    {
      title: 'Total Terrains',
      value: stats.totalProperties,
      // ...
    },
    // ...
  ];

  return (
    // ...
  );
};
```

### 8. Ajouter les Permissions

Dans Supabase, configurez les RLS (Row Level Security) :

```sql
-- Politique pour les admins
CREATE POLICY "Admins can view all properties"
ON properties FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Politique pour les admins (CRUD complet)
CREATE POLICY "Admins can manage all properties"
ON properties FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
```

### 9. Ajouter la Pagination

Pour les grandes listes, ajoutez la pagination :

```javascript
const [page, setPage] = useState(0);
const [pageSize] = useState(10);

const { data, count } = await supabase
  .from('properties')
  .select('*', { count: 'exact' })
  .range(page * pageSize, (page + 1) * pageSize - 1);

const totalPages = Math.ceil(count / pageSize);
```

### 10. Tester le Dashboard

1. Créez un utilisateur admin dans Supabase :
   
```sql
INSERT INTO user_profiles (id, role, first_name, last_name)
VALUES ('UUID_DE_VOTRE_USER', 'admin', 'Admin', 'Principal');
```

2. Connectez-vous avec ce compte
3. Accédez à `/dashboard`
4. Vérifiez toutes les fonctionnalités

## 🎯 Checklist d'Intégration

- [ ] Routes ajoutées dans App.jsx
- [ ] Routes ajoutées dans constants.js
- [ ] Tables Supabase créées
- [ ] Hooks créés (useStats, useProperties, etc.)
- [ ] Données mock remplacées
- [ ] Permissions RLS configurées
- [ ] Lien dashboard dans le header (pour admins)
- [ ] Protection des routes (ProtectedRoute)
- [ ] Tests de toutes les pages
- [ ] Responsive testé sur mobile

## 📊 Fonctionnalités Prioritaires

1. **Phase 1** : Lecture seule
   - Afficher statistiques
   - Lister terrains
   - Lister utilisateurs

2. **Phase 2** : Actions CRUD
   - Modifier terrains
   - Modifier utilisateurs
   - Supprimer éléments

3. **Phase 3** : Fonctions avancées
   - Envoi de notifications
   - Messagerie temps réel
   - Analytics détaillées

## 🚀 Déploiement

Avant de déployer :

1. Vérifiez les permissions Supabase
2. Testez tous les flows utilisateur
3. Optimisez les requêtes (indexes)
4. Configurez les logs d'erreur
5. Activez la surveillance

---

Le dashboard est maintenant **prêt à être intégré** ! 🎉
