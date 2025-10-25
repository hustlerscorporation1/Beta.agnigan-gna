-- ================================================
-- SCRIPT DE DIAGNOSTIC - VÉRIFICATION DES DONNÉES
-- ================================================

-- 1. Vérifier si les tables existent
SELECT 
    'Table properties existe' as verification,
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'properties'
    ) as resultat;

SELECT 
    'Table contacts existe' as verification,
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'contacts'
    ) as resultat;

SELECT 
    'Table profiles existe' as verification,
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'profiles'
    ) as resultat;

-- 2. Compter les données dans chaque table
SELECT 'Propriétés' as table_name, COUNT(*) as nombre_lignes FROM properties;
SELECT 'Contacts' as table_name, COUNT(*) as nombre_lignes FROM contacts;
SELECT 'Profiles' as table_name, COUNT(*) as nombre_lignes FROM profiles;

-- 3. Afficher quelques propriétés
SELECT id, title, price, status, created_at 
FROM properties 
ORDER BY created_at DESC 
LIMIT 5;

-- 4. Afficher quelques contacts
SELECT id, name, email, status, created_at 
FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;

-- 5. Vérifier les RLS (Row Level Security)
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('properties', 'contacts', 'profiles');

-- 6. Vérifier les politiques RLS
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN ('properties', 'contacts', 'profiles');

-- ================================================
-- SI LES DONNÉES N'APPARAISSENT PAS:
-- ================================================

-- Solution 1: Désactiver temporairement RLS pour tests
-- ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- Solution 2: Ajouter une politique publique de lecture
-- CREATE POLICY "Public read access" ON properties FOR SELECT USING (true);
-- CREATE POLICY "Public read access" ON contacts FOR SELECT USING (true);

-- Solution 3: Donner accès admin
-- CREATE POLICY "Admin full access" ON properties FOR ALL USING (
--   auth.jwt() ->> 'role' = 'admin'
-- );
