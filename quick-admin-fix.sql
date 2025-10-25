-- ========================================
-- RÉPARATION EXPRESS - ADMIN LOGIN
-- ========================================

-- 1. Supprimer et recréer la table profiles
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Index
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- 3. Trigger
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
-- MESSAGE IMPORTANT
-- ========================================

-- APRÈS AVOIR EXÉCUTÉ CE SCRIPT :
-- 1. Allez dans Authentication → Users
-- 2. Créez l'utilisateur: admin@anyigbanya.com
-- 3. Password: Admin2024!
-- 4. Cochez "Auto Confirm User"
-- 5. Cliquez "Create user"
-- 6. Revenez dans SQL Editor
-- 7. Exécutez cette commande:

-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@anyigbanya.com';

-- ========================================
-- TEST RAPIDE
-- ========================================

SELECT 'Script exécuté avec succès!' as status;

SELECT
    'Structure créée:' as info,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;
