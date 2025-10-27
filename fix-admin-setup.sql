-- ========================================
-- RÉPARATION COMPTE ADMINISTRATEUR
-- Agnigban Gna - Fix Admin Access
-- ========================================

-- 1. S'assurer que la table profiles existe
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Index pour optimiser
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 3. Supprimer le trigger existant s'il existe et recréer
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
-- VÉRIFIER L'UTILISATEUR EXISTANT
-- ========================================

-- 1. Vérifier dans auth.users
SELECT
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'admin@anyigbanya.com';

-- 2. Vérifier dans profiles
SELECT
  id,
  email,
  full_name,
  role,
  created_at
FROM profiles
WHERE email = 'admin@anyigbanya.com';

-- ========================================
-- CRÉER L'UTILISATEUR SI IL N'EXISTE PAS
-- ========================================

-- Option 1: Si l'utilisateur n'existe pas dans auth.users
-- Vous devez le créer manuellement dans Supabase Dashboard

-- Option 2: Promouvoir l'utilisateur existant en admin
UPDATE profiles
SET role = 'admin',
    full_name = 'Administrateur Principal',
    updated_at = NOW()
WHERE email = 'admin@anyigbanya.com';

-- ========================================
-- CRÉER L'UTILISATEUR DIRECTEMENT (Alternative)
-- ========================================

-- Si vous voulez créer l'utilisateur directement en SQL:
-- Note: Vous devrez définir le mot de passe manuellement après

-- Insérer l'utilisateur (remplacez 'votre-uuid' par un UUID valide)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES (
--   'votre-uuid-ici',
--   'admin@anyigbanya.com',
--   crypt('Admin2024!', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW()
-- );

-- Puis créer le profil
-- INSERT INTO profiles (id, email, role, full_name)
-- VALUES ('votre-uuid-ici', 'admin@anyigbanya.com', 'admin', 'Administrateur Principal');

-- ========================================
-- VÉRIFICATION FINALE
-- ========================================

-- Vérifier que tout est correct
SELECT
  '=== UTILISATEUR AUTH ===' as section,
  u.email,
  u.email_confirmed_at,
  u.created_at
FROM auth.users u
WHERE u.email = 'admin@anyigbanya.com'

UNION ALL

SELECT
  '=== PROFIL ADMIN ===' as section,
  p.email,
  p.role,
  p.created_at
FROM profiles p
WHERE p.email = 'admin@anyigbanya.com' AND p.role = 'admin';

-- ========================================
-- DIAGNOSTIC COMPLET
-- ========================================

-- Compter les utilisateurs admin
SELECT COUNT(*) as total_admins FROM profiles WHERE role = 'admin';

-- Lister tous les utilisateurs
SELECT
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
-- 2. Vérifiez que l'utilisateur existe dans Authentication → Users
-- 3. Si pas d'utilisateur, créez-le manuellement avec:
--    Email: admin@anyigbanya.com
--    Password: Admin2024!
--    Auto Confirm: OUI
-- 4. Revenez ici et exécutez à nouveau
-- 5. Vérifiez les résultats
-- 6. Connectez-vous sur /admin/login

-- ========================================
-- IDENTIFIANTS DE CONNEXION
-- ========================================

-- Email: admin@anyigbanya.com
-- Mot de passe: Admin2024!
-- URL: http://localhost:3000/admin/login
