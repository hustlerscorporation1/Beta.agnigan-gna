-- ================================================
-- ÉTAPE 1: CRÉATION DE TOUTES LES TABLES
-- ================================================
-- Exécuter ce script EN PREMIER dans Supabase SQL Editor

-- ================================================
-- 1. TABLE PROPERTIES (Propriétés)
-- ================================================

CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT CHECK (type IN ('residential', 'commercial', 'agricultural', 'industrial')),
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  area TEXT,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  image TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_created ON properties(created_at DESC);

-- ================================================
-- 2. TABLE CONTACTS (Messages)
-- ================================================

CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  subject TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_priority ON contacts(priority);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_property ON contacts(property_id);

-- ================================================
-- 3. TABLE PROFILES (Utilisateurs) - Si elle n'existe pas
-- ================================================

-- Vérifier si la colonne permissions existe, sinon l'ajouter
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'permissions'
  ) THEN
    ALTER TABLE profiles ADD COLUMN permissions JSONB DEFAULT '{
      "can_view_properties": true,
      "can_edit_properties": false,
      "can_delete_properties": false,
      "can_view_users": false,
      "can_manage_users": false,
      "can_view_contacts": true,
      "can_reply_contacts": false,
      "can_view_transactions": false,
      "can_view_statistics": false,
      "can_manage_settings": false
    }'::jsonb;
  END IF;
END $$;

-- ================================================
-- 4. TABLE TRANSACTIONS
-- ================================================

CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  amount BIGINT NOT NULL,
  type TEXT CHECK (type IN ('purchase', 'deposit', 'withdrawal', 'commission')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('completed', 'pending', 'failed')),
  payment_method TEXT CHECK (payment_method IN ('card', 'mobile_money', 'bank_transfer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);

-- ================================================
-- 5. ACTIVER ROW LEVEL SECURITY (RLS)
-- ================================================

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- ================================================
-- 6. CRÉER LES POLITIQUES RLS (PERMISSIVES)
-- ================================================

-- PROPERTIES: Lecture publique, modification admin
DROP POLICY IF EXISTS "Tout le monde peut voir les propriétés" ON properties;
CREATE POLICY "Tout le monde peut voir les propriétés"
ON properties FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins peuvent tout faire sur les propriétés" ON properties;
CREATE POLICY "Admins peuvent tout faire sur les propriétés"
ON properties FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- CONTACTS: Lecture publique, modification admin
DROP POLICY IF EXISTS "Tout le monde peut voir les contacts" ON contacts;
CREATE POLICY "Tout le monde peut voir les contacts"
ON contacts FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins peuvent tout faire sur les contacts" ON contacts;
CREATE POLICY "Admins peuvent tout faire sur les contacts"
ON contacts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- TRANSACTIONS: Lecture publique, modification admin
DROP POLICY IF EXISTS "Tout le monde peut voir les transactions" ON transactions;
CREATE POLICY "Tout le monde peut voir les transactions"
ON transactions FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins peuvent tout faire sur les transactions" ON transactions;
CREATE POLICY "Admins peuvent tout faire sur les transactions"
ON transactions FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ================================================
-- 7. VÉRIFICATION
-- ================================================

-- Vérifier que les tables existent
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as nb_colonnes
FROM information_schema.tables t
WHERE table_name IN ('properties', 'contacts', 'profiles', 'transactions')
AND table_schema = 'public'
ORDER BY table_name;

-- Afficher les politiques RLS
SELECT 
    tablename,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE tablename IN ('properties', 'contacts', 'transactions')
ORDER BY tablename, policyname;

-- ================================================
-- MESSAGE DE SUCCÈS
-- ================================================
SELECT '✅ Tables créées avec succès! Vous pouvez maintenant exécuter 02-inserer-donnees-exemple.sql' as statut;
