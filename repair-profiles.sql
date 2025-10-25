-- ========================================
-- RÉPARATION URGENTE - TABLE PROFILES
-- ========================================

-- 1. Supprimer la table profiles si elle existe et la recréer correctement
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Créer la table avec la bonne structure
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Index pour optimiser les requêtes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- 4. Recréer le trigger pour la création automatique des profils
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- VÉRIFIER ET CRÉER L'UTILISATEUR ADMIN
-- ========================================

-- 1. Vérifier si l'utilisateur existe dans auth.users
SELECT
  '=== VÉRIFICATION UTILISATEUR ===' as info,
  email,
  email_confirmed_at
FROM auth.users
WHERE email = 'admin@anyigbanya.com';

-- 2. Si l'utilisateur n'existe pas, vous devez le créer manuellement
-- Allez dans Authentication → Users → Add user
-- Email: admin@anyigbanya.com
-- Password: Admin2024!
-- Auto Confirm: OUI

-- 3. Une fois l'utilisateur créé, promouvoir en admin
UPDATE profiles
SET role = 'admin',
    full_name = 'Administrateur Principal',
    updated_at = NOW()
WHERE email = 'admin@anyigbanya.com';

-- ========================================
-- DIAGNOSTIC COMPLET
-- ========================================

-- Vérifier la structure de la table
SELECT
  '=== STRUCTURE TABLE PROFILES ===' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- Compter les utilisateurs et admins
SELECT
  '=== COMPTEURS ===' as info,
  COUNT(*) as total_users
FROM auth.users
WHERE email = 'admin@anyigbanya.com';

SELECT
  '=== COMPTEURS ===' as info,
  COUNT(*) as total_admins
FROM profiles
WHERE role = 'admin';

-- Afficher les données finales
SELECT
  '=== DONNÉES FINALES ===' as info,
  u.email,
  p.role,
  p.full_name,
  u.email_confirmed_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'admin@anyigbanya.com';

-- ========================================
-- INSTRUCTIONS
-- ========================================

-- 1. Exécutez ce script dans Supabase SQL Editor
-- 2. Allez dans Authentication → Users
-- 3. Créez l'utilisateur admin@anyigbanya.com
-- 4. Revenez ici et réexécutez
-- 5. Testez la connexion sur /admin/login

-- ========================================
-- IDENTIFIANTS
-- ========================================

-- Email: admin@anyigbanya.com
-- Password: Admin2024!
-- URL: http://localhost:3000/admin/login
