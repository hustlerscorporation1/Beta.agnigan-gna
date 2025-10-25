-- ================================================
-- FIX: AFFICHAGE DES DONNÉES DANS LE TABLEAU DE BORD
-- ================================================
-- Ce script corrige les problèmes d'affichage des données
-- Exécuter dans Supabase SQL Editor

-- ================================================
-- ÉTAPE 1: SUPPRIMER LES ANCIENNES POLITIQUES
-- ================================================

-- Supprimer toutes les politiques restrictives
DROP POLICY IF EXISTS "Admin full access" ON properties;
DROP POLICY IF EXISTS "Admin can manage properties" ON properties;
DROP POLICY IF EXISTS "Users can view properties" ON properties;
DROP POLICY IF EXISTS "Public can view properties" ON properties;

DROP POLICY IF EXISTS "Admin full access" ON contacts;
DROP POLICY IF EXISTS "Admin can manage contacts" ON contacts;
DROP POLICY IF EXISTS "Public read access" ON contacts;

DROP POLICY IF EXISTS "Admin full access" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- ================================================
-- ÉTAPE 2: ACTIVER RLS SUR LES TABLES
-- ================================================

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ================================================
-- ÉTAPE 3: CRÉER DES POLITIQUES PERMISSIVES
-- ================================================

-- PROPERTIES: Tout le monde peut lire, seuls les admins peuvent modifier
CREATE POLICY "Tout le monde peut voir les propriétés"
ON properties FOR SELECT
USING (true);

CREATE POLICY "Admins peuvent tout faire sur les propriétés"
ON properties FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- CONTACTS: Tout le monde peut lire, seuls les admins peuvent modifier
CREATE POLICY "Tout le monde peut voir les contacts"
ON contacts FOR SELECT
USING (true);

CREATE POLICY "Admins peuvent tout faire sur les contacts"
ON contacts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- PROFILES: Les admins voient tout, les users voient leur profil
CREATE POLICY "Admins peuvent voir tous les profils"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.role = 'admin'
  )
);

CREATE POLICY "Users peuvent voir leur propre profil"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins peuvent tout faire sur les profils"
ON profiles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.role = 'admin'
  )
);

-- ================================================
-- ÉTAPE 4: VÉRIFICATION
-- ================================================

-- Compter les données
SELECT 'Propriétés' as table_name, COUNT(*) as total FROM properties;
SELECT 'Contacts' as table_name, COUNT(*) as total FROM contacts;
SELECT 'Profiles' as table_name, COUNT(*) as total FROM profiles;

-- Afficher les politiques actives
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE tablename IN ('properties', 'contacts', 'profiles')
ORDER BY tablename, policyname;

-- ================================================
-- MESSAGE DE SUCCÈS
-- ================================================
SELECT 'Configuration RLS terminée! Les données devraient maintenant s''afficher. ✅' as statut;

-- ================================================
-- NOTES IMPORTANTES:
-- ================================================
-- Si les données ne s'affichent toujours pas:
--
-- 1. Vérifier que vous êtes connecté avec un compte admin
-- 2. Vérifier que votre profil a role = 'admin' dans la table profiles
-- 3. Si besoin, désactiver temporairement RLS pour tests:
--    ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
--    ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
--    ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
--
-- 4. Actualiser la page du tableau de bord (Ctrl + R)
-- ================================================
