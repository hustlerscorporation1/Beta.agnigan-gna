-- ============================================
-- EXEMPLES DE DONNÉES POUR L'ESPACE ADMIN
-- ============================================

-- 1. TERRAINS ACHETÉS (Status: purchased)
-- ============================================

INSERT INTO properties (title, description, price, location, area, type, status, image, features, created_at)
VALUES 
(
  'Terrain Résidentiel - Lomé Centre',
  'Magnifique terrain de 500m² situé au cœur de Lomé, idéal pour construction résidentielle. Zone calme et sécurisée avec tous les services à proximité.',
  '25000000 FCFA',
  'Lomé, Quartier Administratif',
  '500',
  'Résidentiel',
  'purchased',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
  '{"proximity": ["Écoles", "Marchés", "Transports"], "utilities": ["Eau", "Électricité", "Internet"]}',
  NOW() - INTERVAL '15 days'
),
(
  'Grand Terrain Commercial - Kara',
  'Terrain commercial de 1200m² avec excellente visibilité sur axe principal. Parfait pour centre commercial ou bureaux.',
  '45000000 FCFA',
  'Kara, Avenue Principale',
  '1200',
  'Commercial',
  'purchased',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  '{"proximity": ["Banques", "Restaurants", "Parkings"], "utilities": ["Eau", "Électricité", "Fibre optique"]}',
  NOW() - INTERVAL '8 days'
),
(
  'Terrain Agricole - Sokodé',
  'Vaste terrain agricole de 5 hectares avec accès à l''eau. Sol fertile, idéal pour cultures maraîchères.',
  '35000000 FCFA',
  'Sokodé, Zone Rurale',
  '50000',
  'Agricole',
  'purchased',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
  '{"proximity": ["Source d''eau", "Routes", "Villages"], "utilities": ["Puits"]}',
  NOW() - INTERVAL '22 days'
);

-- 2. TERRAINS VENDUS (Status: sold)
-- ============================================

INSERT INTO properties (title, description, price, location, area, type, status, image, features, created_at)
VALUES 
(
  'Villa Moderne - Bè',
  'Terrain de 600m² avec villa moderne de 4 chambres. Finitions haut de gamme, piscine et jardin.',
  '85000000 FCFA',
  'Lomé, Bè',
  '600',
  'Résidentiel',
  'sold',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  '{"rooms": 4, "bathrooms": 3, "parking": true, "pool": true, "garden": true}',
  NOW() - INTERVAL '5 days'
),
(
  'Terrain Lotissement - Aného',
  'Lot de 400m² dans nouveau lotissement sécurisé. Toutes commodités disponibles.',
  '18000000 FCFA',
  'Aného, Nouveau Quartier',
  '400',
  'Résidentiel',
  'sold',
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
  '{"proximity": ["Écoles", "Commerces"], "utilities": ["Eau", "Électricité", "Internet"], "security": true}',
  NOW() - INTERVAL '12 days'
),
(
  'Espace Commercial - Tokoin',
  'Local commercial de 800m² en plein centre d''activité. Forte affluence garantie.',
  '95000000 FCFA',
  'Lomé, Tokoin',
  '800',
  'Commercial',
  'sold',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  '{"proximity": ["Centre-ville", "Parking", "Transport"], "utilities": ["Eau", "Électricité", "Climatisation"]}',
  NOW() - INTERVAL '3 days'
),
(
  'Terrain Industriel - Zone Portuaire',
  'Grand terrain de 2000m² en zone industrielle. Idéal pour entrepôt ou usine.',
  '120000000 FCFA',
  'Lomé, Zone Portuaire',
  '2000',
  'Industriel',
  'sold',
  'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800',
  '{"proximity": ["Port", "Douane", "Routes"], "utilities": ["Eau", "Électricité haute tension"]}',
  NOW() - INTERVAL '18 days'
);

-- 3. TERRAINS EN PROCESSUS D'ACHAT (Status: in_process / processing)
-- ============================================

INSERT INTO properties (title, description, price, location, area, type, status, image, features, created_at)
VALUES 
(
  'Domaine Résidentiel - Adidogomé',
  'Grand domaine de 1500m² avec projet de construction de résidence de luxe. Documents en cours de validation.',
  '75000000 FCFA',
  'Lomé, Adidogomé',
  '1500',
  'Résidentiel',
  'in_process',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  '{"proximity": ["École internationale", "Golf"], "utilities": ["Tous réseaux"], "security": true}',
  NOW() - INTERVAL '10 days'
),
(
  'Complexe Commercial - Hédzranawoé',
  'Terrain de 3000m² destiné à un complexe commercial. Permis de construire en attente.',
  '150000000 FCFA',
  'Lomé, Hédzranawoé',
  '3000',
  'Commercial',
  'processing',
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
  '{"proximity": ["Autoroute", "Centre commercial"], "utilities": ["Infrastructure complète"]}',
  NOW() - INTERVAL '7 days'
),
(
  'Terrain Mixte - Kpalimé',
  'Propriété de 2500m² usage mixte (résidentiel/commercial). Transfert de titre en cours.',
  '55000000 FCFA',
  'Kpalimé, Centre-ville',
  '2500',
  'Résidentiel',
  'in_process',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  '{"proximity": ["Montagnes", "Centre-ville"], "utilities": ["Eau", "Électricité"]}',
  NOW() - INTERVAL '14 days'
);

-- 4. TERRAINS DISPONIBLES (Status: available)
-- ============================================

INSERT INTO properties (title, description, price, location, area, type, status, image, features, created_at)
VALUES 
(
  'Terrain de Rêve - Bord de Mer',
  'Exceptionnel terrain de 800m² face à la mer. Vue panoramique imprenable. Opportunité rare !',
  '125000000 FCFA',
  'Lomé, Bord de Mer',
  '800',
  'Résidentiel',
  'available',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
  '{"proximity": ["Plage", "Restaurants"], "utilities": ["Eau", "Électricité"], "view": "Ocean"}',
  NOW() - INTERVAL '2 days'
),
(
  'Lot Résidentiel - Agbalépédogan',
  'Terrain de 450m² dans quartier résidentiel calme. Titre foncier disponible.',
  '22000000 FCFA',
  'Lomé, Agbalépédogan',
  '450',
  'Résidentiel',
  'available',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
  '{"proximity": ["Écoles", "Pharmacie"], "utilities": ["Eau", "Électricité"], "security": true}',
  NOW() - INTERVAL '1 day'
),
(
  'Terrain Agricole Premium - Atakpamé',
  'Terre fertile de 10 hectares avec irrigation. Idéal pour agriculture moderne.',
  '65000000 FCFA',
  'Atakpamé, Zone Agricole',
  '100000',
  'Agricole',
  'available',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
  '{"proximity": ["Routes", "Coopératives"], "utilities": ["Irrigation", "Eau"], "soil": "Fertile"}',
  NOW() - INTERVAL '4 days'
);

-- 5. CONTACTS D'EXEMPLE
-- ============================================

INSERT INTO contacts (name, email, phone, message, property_id, created_at)
VALUES 
(
  'Jean-Baptiste AKOUETE',
  'jb.akouete@email.tg',
  '+228 90 12 34 56',
  'Je suis très intéressé par le terrain à Lomé Centre. Pouvons-nous organiser une visite cette semaine ?',
  1,
  NOW() - INTERVAL '2 hours'
),
(
  'Marie ADIKOU',
  'marie.adikou@email.tg',
  '+228 91 23 45 67',
  'Bonjour, je voudrais des informations complémentaires sur les modalités de paiement pour le terrain commercial à Kara.',
  2,
  NOW() - INTERVAL '5 hours'
),
(
  'Kossi MENSAH',
  'k.mensah@email.tg',
  '+228 92 34 56 78',
  'Terrain agricole très intéressant ! Est-il possible de négocier le prix ?',
  3,
  NOW() - INTERVAL '1 day'
),
(
  'Afi KOFFI',
  'afi.koffi@email.tg',
  '+228 93 45 67 89',
  'Je recherche un terrain pour projet commercial. Le lot à Hédzranawoé correspond parfaitement à mes besoins.',
  8,
  NOW() - INTERVAL '3 hours'
);

-- 6. UTILISATEURS ADMIN D'EXEMPLE
-- ============================================
-- Note: Les mots de passe doivent être hashés par Supabase Auth
-- Utilisez la fonction de création d'utilisateur dans l'interface admin

-- Pour créer un admin de test, utilisez:
-- Email: admin@agnigna-gna.tg
-- Password: Admin@2025
-- Role: admin

-- Pour créer un utilisateur de test, utilisez:
-- Email: agent@agnigna-gna.tg
-- Password: Agent@2025
-- Role: user

-- ============================================
-- STATISTIQUES GÉNÉRÉES
-- ============================================
-- Total Propriétés: 13
-- - Achetées: 3
-- - Vendues: 4
-- - En Processus: 3
-- - Disponibles: 3
--
-- Total Contacts: 4
-- Taux de conversion: ~31% (4 vendues sur 13)
-- Revenus générés: 318M FCFA
-- ============================================
