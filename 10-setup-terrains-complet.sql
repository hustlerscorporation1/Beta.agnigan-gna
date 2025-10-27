-- ================================================
-- SETUP COMPLET - TERRAINS UNIQUEMENT
-- ================================================
-- Ce script fait TOUT en une seule fois:
-- 1. Crée les tables
-- 2. Configure RLS
-- 3. Insère 15 terrains
-- 4. Insère 20 messages

-- ================================================
-- ÉTAPE 1: CRÉATION DES TABLES
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

CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_created ON properties(created_at DESC);

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

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_priority ON contacts(priority);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_property ON contacts(property_id);

-- Ajouter permissions à profiles si pas déjà fait
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
-- ÉTAPE 2: CONFIGURATION RLS
-- ================================================

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Tout le monde peut voir les propriétés" ON properties;
DROP POLICY IF EXISTS "Admins peuvent tout faire sur les propriétés" ON properties;
DROP POLICY IF EXISTS "Tout le monde peut voir les contacts" ON contacts;
DROP POLICY IF EXISTS "Admins peuvent tout faire sur les contacts" ON contacts;

-- Créer les nouvelles politiques permissives
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

-- ================================================
-- ÉTAPE 3: INSÉRER 15 TERRAINS UNIQUEMENT
-- ================================================

INSERT INTO properties (id, title, description, price, location, type, status, area, bedrooms, bathrooms, image, views, created_at) VALUES

-- TERRAINS DISPONIBLES (7)
(gen_random_uuid(), 'Terrain Agricole Kpalimé', 'Grand terrain de 2 hectares idéal pour agriculture. Sol fertile, accès facile.', '12000000 FCFA', 'Kpalimé, Région des Plateaux', 'agricultural', 'available', '20000 m²', 0, 0, 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800', 89, NOW() - INTERVAL '3 days'),

(gen_random_uuid(), 'Terrain Résidentiel Aného', 'Terrain viabilisé de 500m² dans zone résidentielle calme.', '8500000 FCFA', 'Aného, Togo', 'residential', 'available', '500 m²', 0, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 67, NOW() - INTERVAL '4 days'),

(gen_random_uuid(), 'Terrain Industriel Port de Lomé', 'Grand terrain proche du port, accès poids lourds.', '150000000 FCFA', 'Zone Portuaire, Lomé', 'industrial', 'available', '800 m²', 0, 2, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', 145, NOW() - INTERVAL '6 days'),

(gen_random_uuid(), 'Terrain Commercial Adidogomé', 'Terrain commercial 300m² sur axe passant. Viabilisé.', '65000000 FCFA', 'Adidogomé, Lomé', 'commercial', 'available', '300 m²', 0, 0, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 156, NOW() - INTERVAL '2 days'),

(gen_random_uuid(), 'Terrain Agricole Kara', 'Vaste terrain de 5 hectares pour exploitation agricole. Eau disponible.', '25000000 FCFA', 'Kara, Région de la Kara', 'agricultural', 'available', '50000 m²', 0, 0, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 98, NOW() - INTERVAL '1 day'),

(gen_random_uuid(), 'Terrain Résidentiel Tokoin', 'Terrain résidentiel 800m² dans quartier calme. Parfait pour villa.', '45000000 FCFA', 'Tokoin, Lomé', 'residential', 'available', '800 m²', 0, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 134, NOW() - INTERVAL '5 days'),

(gen_random_uuid(), 'Terrain Commercial Bè', 'Terrain commercial 200m² en bordure de route principale.', '35000000 FCFA', 'Bè, Lomé', 'commercial', 'available', '200 m²', 0, 0, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', 178, NOW() - INTERVAL '7 days'),

-- TERRAINS VENDUS (3)
(gen_random_uuid(), 'Terrain Agricole Atakpamé', 'Terrain agricole vendu, 3 hectares.', '18000000 FCFA', 'Atakpamé, Région des Plateaux', 'agricultural', 'sold', '30000 m²', 0, 0, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 123, NOW() - INTERVAL '25 days'),

(gen_random_uuid(), 'Terrain Industriel Kara', 'Terrain industriel vendu. 1000m² zone franche.', '25000000 FCFA', 'Kara, Région de la Kara', 'industrial', 'sold', '1000 m²', 0, 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 98, NOW() - INTERVAL '30 days'),

(gen_random_uuid(), 'Terrain Résidentiel Tsévié', 'Terrain résidentiel vendu. 600m², viabilisé.', '9500000 FCFA', 'Tsévié, Togo', 'residential', 'sold', '600 m²', 0, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 76, NOW() - INTERVAL '20 days'),

-- TERRAINS EN ATTENTE (5)
(gen_random_uuid(), 'Terrain Commercial Hedzranawoé', 'Terrain commercial en négociation. 95m² sur axe passant.', '35000000 FCFA', 'Hedzranawoé, Lomé', 'commercial', 'pending', '95 m²', 0, 1, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', 198, NOW() - INTERVAL '8 days'),

(gen_random_uuid(), 'Terrain Agricole Sokodé', 'Terrain agricole en attente. 4 hectares, source d''eau.', '22000000 FCFA', 'Sokodé, Région Centrale', 'agricultural', 'pending', '40000 m²', 0, 0, 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800', 201, NOW() - INTERVAL '3 days'),

(gen_random_uuid(), 'Terrain Industriel Blitta', 'Terrain industriel en négociation. 2000m² zone franche.', '75000000 FCFA', 'Blitta, Togo', 'industrial', 'pending', '2000 m²', 0, 0, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', 167, NOW() - INTERVAL '6 days'),

(gen_random_uuid(), 'Terrain Résidentiel Nyékonakpoè', 'Magnifique terrain résidentiel 1200m² vue mer.', '85000000 FCFA', 'Nyékonakpoè, Lomé', 'residential', 'pending', '1200 m²', 0, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 289, NOW() - INTERVAL '4 days'),

(gen_random_uuid(), 'Terrain Commercial Assiyéyé', 'Terrain commercial 400m² angle rue, fort passage.', '55000000 FCFA', 'Assiyéyé, Lomé', 'commercial', 'pending', '400 m²', 0, 0, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 234, NOW() - INTERVAL '2 days');

-- ================================================
-- ÉTAPE 4: INSÉRER 20 MESSAGES ADAPTÉS AUX TERRAINS
-- ================================================

INSERT INTO contacts (id, name, email, phone, message, status, priority, property_id, created_at) VALUES

-- Messages Non Lus - Priorité Haute (3)
(gen_random_uuid(), 'Marie Kokou', 'marie.kokou@email.com', '+228 90 12 34 56', 'Bonjour, je suis très intéressée par le terrain agricole à Kpalimé. Pourriez-vous m''envoyer plus d''informations sur les conditions du sol et l''accès ? Merci.', 'unread', 'high', (SELECT id FROM properties WHERE title LIKE '%Terrain Agricole Kpalimé%' LIMIT 1), NOW() - INTERVAL '2 hours'),

(gen_random_uuid(), 'Jean-Paul Agbeko', 'jp.agbeko@gmail.com', '+228 91 23 45 67', 'Je souhaiterais visiter le terrain résidentiel à Aného cette semaine. Quelles sont vos disponibilités ? Je suis disponible mardi et jeudi après-midi.', 'unread', 'high', (SELECT id FROM properties WHERE title LIKE '%Terrain Résidentiel Aného%' LIMIT 1), NOW() - INTERVAL '5 hours'),

(gen_random_uuid(), 'Ibrahim Cissé', 'ibrahim.c@email.com', '+228 94 45 67 89', 'Je suis intéressé par plusieurs terrains à Lomé. Pouvez-vous me rappeler pour discuter des opportunités d''investissement ?', 'unread', 'high', NULL, NOW() - INTERVAL '30 minutes'),

-- Messages Non Lus - Priorité Moyenne (4)
(gen_random_uuid(), 'Amina Diallo', 'amina.d@yahoo.fr', '+228 92 34 56 78', 'Bonjour, le prix du terrain agricole à Kara est-il négociable ? Je suis investisseur agricole et j''ai un projet de plantation.', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Terrain Agricole Kara%' LIMIT 1), NOW() - INTERVAL '1 hour'),

(gen_random_uuid(), 'David Mensah', 'david.mensah@outlook.com', '+228 93 45 67 89', 'Est-ce que le terrain commercial à Bè dispose d''un raccordement électrique ? Merci de me tenir informé.', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Terrain Commercial Bè%' LIMIT 1), NOW() - INTERVAL '3 hours'),

(gen_random_uuid(), 'Sarah Togo', 'sarah.togo@email.com', '+228 94 56 78 90', 'Bonjour, j''aimerais avoir des photos supplémentaires du terrain résidentiel à Tokoin. Le terrain est-il borné ?', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Terrain Résidentiel Tokoin%' LIMIT 1), NOW() - INTERVAL '6 hours'),

(gen_random_uuid(), 'Awa Koné', 'awa.kone@gmail.com', '+228 95 56 78 90', 'Bonjour, y a-t-il des facilités de paiement pour le terrain à Sokodé ? Je souhaite construire une maison familiale.', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Terrain Agricole Sokodé%' LIMIT 1), NOW() - INTERVAL '7 hours'),

-- Messages Lus - Priorité Basse (4)
(gen_random_uuid(), 'Pierre Koffi', 'pierre.k@gmail.com', '+228 95 67 89 01', 'Pourriez-vous m''indiquer si le terrain industriel au port de Lomé est dans une zone franche ? Merci.', 'read', 'low', (SELECT id FROM properties WHERE title LIKE '%Terrain Industriel Port%' LIMIT 1), NOW() - INTERVAL '4 hours'),

(gen_random_uuid(), 'Fatima Sow', 'fatima.sow@email.com', '+228 96 78 90 12', 'Simple demande d''information sur les terrains disponibles à Aného.', 'read', 'low', (SELECT id FROM properties WHERE title LIKE '%Terrain Résidentiel Aného%' LIMIT 1), NOW() - INTERVAL '1 day'),

(gen_random_uuid(), 'Ahmed Traoré', 'ahmed.traore@yahoo.com', '+228 97 89 01 23', 'Je cherche un terrain industriel proche du port. Le terrain correspond-il à mes besoins pour entreposage ?', 'read', 'low', (SELECT id FROM properties WHERE title LIKE '%Terrain Industriel Port%' LIMIT 1), NOW() - INTERVAL '1 day'),

(gen_random_uuid(), 'Diane Lawson', 'diane.lawson@email.com', '+228 97 78 90 12', 'Question sur les documents nécessaires pour l''achat d''un terrain au Togo.', 'read', 'low', NULL, NOW() - INTERVAL '8 hours'),

-- Messages Répondus (3)
(gen_random_uuid(), 'Sophie Akakpo', 'sophie.akakpo@gmail.com', '+228 98 90 12 34', 'Bonjour, merci pour votre réponse rapide. Je confirme mon intérêt pour le terrain. Cordialement.', 'replied', 'medium', NULL, NOW() - INTERVAL '2 days'),

(gen_random_uuid(), 'Emmanuel Douti', 'e.douti@outlook.com', '+228 90 01 23 45', 'Merci pour les informations fournies. Je vais réfléchir et vous recontacter bientôt.', 'replied', 'low', NULL, NOW() - INTERVAL '3 days'),

(gen_random_uuid(), 'Charlotte Adjonou', 'charlotte.a@email.com', '+228 91 12 34 56', 'Parfait, je vous remercie pour votre professionnalisme. À bientôt !', 'replied', 'high', NULL, NOW() - INTERVAL '2 days'),

-- Messages Archivés (3)
(gen_random_uuid(), 'Martin Djossou', 'martin.djossou@gmail.com', '+228 92 23 45 67', 'Message ancien concernant un terrain déjà vendu.', 'archived', 'low', NULL, NOW() - INTERVAL '30 days'),

(gen_random_uuid(), 'Nathalie Koudjo', 'nathalie.k@yahoo.fr', '+228 93 34 56 78', 'Ancien message archivé suite à transaction finalisée.', 'archived', 'low', NULL, NOW() - INTERVAL '25 days'),

(gen_random_uuid(), 'Thomas Gnassingbé', 'thomas.g@outlook.com', '+228 96 67 89 01', 'Proposition de partenariat commercial. Pouvons-nous organiser une rencontre ?', 'archived', 'medium', NULL, NOW() - INTERVAL '20 days'),

-- Messages Lus récents (3)
(gen_random_uuid(), 'Kevin Adzaku', 'kevin.adzaku@gmail.com', '+228 98 89 01 23', 'Merci pour l''envoi des documents. Je vais les étudier et vous revenir.', 'read', 'medium', NULL, NOW() - INTERVAL '12 hours'),

(gen_random_uuid(), 'Grace Ahonon', 'grace.ahonon@yahoo.com', '+228 90 90 12 34', 'Demande d''informations sur le processus d''achat de terrain au Togo.', 'read', 'low', NULL, NOW() - INTERVAL '18 hours'),

(gen_random_uuid(), 'Patrick Yovo', 'patrick.yovo@email.com', '+228 91 01 23 45', 'Je cherche activement un terrain à Lomé. Pouvez-vous me contacter pour les meilleures offres ?', 'read', 'high', NULL, NOW() - INTERVAL '10 hours');

-- ================================================
-- VÉRIFICATION FINALE
-- ================================================

-- Compter les terrains par statut
SELECT
    'TERRAINS' as type,
    status,
    COUNT(*) as nombre
FROM properties
GROUP BY status
ORDER BY status;

-- Compter les contacts par statut
SELECT
    'MESSAGES' as type,
    status,
    COUNT(*) as nombre
FROM contacts
GROUP BY status
ORDER BY status;

-- Répartition par type de terrain
SELECT
    'TYPES DE TERRAINS' as info,
    type,
    COUNT(*) as nombre,
    ROUND((COUNT(*)::decimal / (SELECT COUNT(*) FROM properties)) * 100, 1) as pourcentage
FROM properties
GROUP BY type
ORDER BY nombre DESC;

-- ================================================
-- MESSAGE DE SUCCÈS
-- ================================================
SELECT '✅ SETUP COMPLET! 15 terrains et 20 messages créés avec succès.' as resultat;
