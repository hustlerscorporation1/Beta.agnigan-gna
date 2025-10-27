-- ========================================
-- CONFIGURATION COMPTE ADMINISTRATEUR
-- Agnigban Gna - Tableau de Bord Admin
-- ========================================

-- 1. Créer la table profiles si elle n'existe pas
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Créer un index sur le rôle pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 3. Créer un trigger pour créer automatiquement un profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Supprimer l'ancien trigger s'il existe et créer le nouveau
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Créer la table contacts pour les messages
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- 5. Créer la table activities pour les logs
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);

-- ========================================
-- IMPORTANT: CRÉER VOTRE COMPTE ADMIN
-- ========================================

-- Après avoir exécuté ce script, allez dans:
-- Authentication → Users → Add user

-- Créez un utilisateur avec ces informations:
-- Email: admin@anyigbanya.com
-- Password: Admin2024!

-- Puis exécutez cette commande pour le promouvoir en admin:

UPDATE profiles 
SET role = 'admin', 
    full_name = 'Administrateur Principal'
WHERE email = 'admin@anyigbanya.com';

-- ========================================
-- VÉRIFICATION
-- ========================================

-- Vérifier que l'admin a été créé correctement
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.role,
  p.created_at
FROM profiles p
WHERE p.role = 'admin';

-- ========================================
-- IDENTIFIANTS DE CONNEXION
-- ========================================

-- Email: admin@anyigbanya.com
-- Mot de passe: Admin2024!
-- URL: http://localhost:3000/admin/login

-- ========================================
-- NOTES IMPORTANTES
-- ========================================

-- 1. Changez le mot de passe après la première connexion
-- 2. Vous pouvez créer d'autres admins en répétant le processus
-- 3. Pour créer un admin depuis un utilisateur existant:
--    UPDATE profiles SET role = 'admin' WHERE email = 'user@example.com';
