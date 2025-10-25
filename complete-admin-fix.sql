-- ========================================
-- DIAGNOSTIC ET RÉPARATION COMPLÈTE
-- ========================================

-- 1. Vérifier la structure actuelle de la table profiles
SELECT
    '=== STRUCTURE TABLE PROFILES ===' as info,
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Vérifier les utilisateurs dans auth.users
SELECT
    '=== UTILISATEURS AUTH ===' as info,
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE email = 'admin@anyigbanya.com';

-- 3. Vérifier les profils existants
SELECT
    '=== PROFILS EXISTANTS ===' as info,
    id,
    email,
    full_name,
    role,
    created_at
FROM profiles;

-- ========================================
-- RÉPARATION SI NÉCESSAIRE
-- ========================================

-- Supprimer la table profiles si elle existe et la recréer correctement
DROP TABLE IF EXISTS profiles CASCADE;

-- Créer la table avec la structure complète
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour optimiser
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Recréer le trigger
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
-- CRÉER L'UTILISATEUR ADMIN SI IL N'EXISTE PAS
-- ========================================

-- Note: Vous devez créer l'utilisateur manuellement dans Authentication → Users
-- avec email: admin@anyigbanya.com et password: Admin2024!

-- ========================================
-- PROMOUVOIR EN ADMIN (MÉTHODE SÛRE)
-- ========================================

-- Méthode 1: Si on connaît l'ID utilisateur
-- UPDATE profiles SET role = 'admin' WHERE id = 'user-id-here';

-- Méthode 2: Par email (si la colonne email existe maintenant)
UPDATE profiles
SET role = 'admin',
    full_name = 'Administrateur Principal',
    updated_at = NOW()
WHERE email = 'admin@anyigbanya.com';

-- ========================================
-- DIAGNOSTIC FINAL
-- ========================================

-- Vérifier que tout est correct
SELECT
    '=== VÉRIFICATION FINALE ===' as section,
    'Auth User:' as type,
    email,
    email_confirmed_at
FROM auth.users
WHERE email = 'admin@anyigbanya.com'

UNION ALL

SELECT
    '=== VÉRIFICATION FINALE ===' as section,
    'Profile Admin:' as type,
    email,
    role
FROM profiles
WHERE role = 'admin'

UNION ALL

SELECT
    '=== VÉRIFICATION FINALE ===' as section,
    'Total Admins:' as type,
    COUNT(*)::text,
    'admins found'
FROM profiles
WHERE role = 'admin';

-- ========================================
-- INSTRUCTIONS POUR L'UTILISATEUR
-- ========================================

-- 1. Exécutez ce script dans Supabase SQL Editor
-- 2. Allez dans Authentication → Users
-- 3. Créez l'utilisateur: admin@anyigbanya.com / Admin2024!
-- 4. Revenez ici et réexécutez
-- 5. Vérifiez les résultats
-- 6. Testez la connexion: http://localhost:3000/admin/login

-- ========================================
-- IDENTIFIANTS
-- ========================================

-- Email: admin@anyigbanya.com
-- Password: Admin2024!
-- URL: http://localhost:3000/admin/login
