-- ================================================
-- ÉTAPE 2: INSERTION DES DONNÉES D'EXEMPLE
-- ================================================
-- ⚠️ IMPORTANT: Exécuter 01-creer-toutes-les-tables.sql AVANT ce script
-- Ce script insère 15 propriétés et 20 messages de test

-- ================================================
-- INSÉRER 15 PROPRIÉTÉS D'EXEMPLE
-- ================================================

INSERT INTO properties (id, title, description, price, location, type, status, area, bedrooms, bathrooms, image, views, created_at) VALUES

-- Propriétés Disponibles (7)
(gen_random_uuid(), 'Villa Moderne Lomé Centre', 'Magnifique villa de 4 chambres avec jardin et piscine. Située dans un quartier calme et sécurisé.', '75000000 FCFA', 'Lomé Centre, Togo', 'residential', 'available', '350 m²', 4, 3, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', 156, NOW() - INTERVAL '5 days'),

(gen_random_uuid(), 'Terrain Agricole Kpalimé', 'Grand terrain de 2 hectares idéal pour agriculture. Sol fertile, accès facile.', '12000000 FCFA', 'Kpalimé, Région des Plateaux', 'agricultural', 'available', '20000 m²', 0, 0, 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800', 89, NOW() - INTERVAL '3 days'),

(gen_random_uuid(), 'Appartement 3 Pièces Bè', 'Appartement moderne au 2ème étage, proche de toutes commodités.', '28000000 FCFA', 'Bè, Lomé', 'residential', 'available', '85 m²', 2, 1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 234, NOW() - INTERVAL '7 days'),

(gen_random_uuid(), 'Boutique Commerciale Assiyéyé', 'Local commercial bien situé sur avenue principale. Idéal pour commerce.', '45000000 FCFA', 'Assiyéyé, Lomé', 'commercial', 'available', '120 m²', 0, 1, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 178, NOW() - INTERVAL '2 days'),

(gen_random_uuid(), 'Terrain Résidentiel Aného', 'Terrain viabilisé de 500m² dans zone résidentielle calme.', '8500000 FCFA', 'Aného, Togo', 'residential', 'available', '500 m²', 0, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 67, NOW() - INTERVAL '4 days'),

(gen_random_uuid(), 'Entrepôt Industriel Port de Lomé', 'Grand entrepôt proche du port, accès poids lourds.', '150000000 FCFA', 'Zone Portuaire, Lomé', 'industrial', 'available', '800 m²', 0, 2, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', 145, NOW() - INTERVAL '6 days'),

(gen_random_uuid(), 'Villa de Luxe Baguida', 'Villa exceptionnelle vue mer, piscine, 5 chambres en suite.', '180000000 FCFA', 'Baguida, Lomé', 'residential', 'available', '450 m²', 5, 4, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 312, NOW() - INTERVAL '1 day'),

-- Propriétés Vendues (3)
(gen_random_uuid(), 'Appartement F2 Nyékonakpoè', 'Appartement vendu récemment. 2 chambres, cuisine équipée.', '22000000 FCFA', 'Nyékonakpoè, Lomé', 'residential', 'sold', '75 m²', 2, 1, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 289, NOW() - INTERVAL '15 days'),

(gen_random_uuid(), 'Commerce Hedzranawoé', 'Local commercial vendu. Bien situé sur axe passant.', '35000000 FCFA', 'Hedzranawoé, Lomé', 'commercial', 'sold', '95 m²', 0, 1, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', 198, NOW() - INTERVAL '20 days'),

(gen_random_uuid(), 'Terrain Agricole Atakpamé', 'Terrain agricole vendu, 3 hectares.', '18000000 FCFA', 'Atakpamé, Région des Plateaux', 'agricultural', 'sold', '30000 m²', 0, 0, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 123, NOW() - INTERVAL '25 days'),

-- Propriétés En Attente (5)
(gen_random_uuid(), 'Duplex Moderne Adidogomé', 'Duplex en cours de négociation. 3 chambres, garage.', '62000000 FCFA', 'Adidogomé, Lomé', 'residential', 'pending', '180 m²', 3, 2, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 167, NOW() - INTERVAL '2 days'),

(gen_random_uuid(), 'Bureau Standing Tokoin', 'Espace bureau en attente de validation. Climatisé, parking.', '55000000 FCFA', 'Tokoin, Lomé', 'commercial', 'pending', '150 m²', 0, 2, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800', 134, NOW() - INTERVAL '5 days'),

(gen_random_uuid(), 'Terrain Industriel Kara', 'Terrain en attente. Zone industrielle, 1000m².', '25000000 FCFA', 'Kara, Région de la Kara', 'industrial', 'pending', '1000 m²', 0, 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 98, NOW() - INTERVAL '8 days'),

(gen_random_uuid(), 'Maison Familiale Sokodé', 'Grande maison familiale en attente. 4 chambres, jardin.', '48000000 FCFA', 'Sokodé, Région Centrale', 'residential', 'pending', '220 m²', 4, 2, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 201, NOW() - INTERVAL '3 days'),

(gen_random_uuid(), 'Terrain Résidentiel Tsévié', 'Terrain résidentiel en négociation. 600m², viabilisé.', '9500000 FCFA', 'Tsévié, Togo', 'residential', 'pending', '600 m²', 0, 0, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 76, NOW() - INTERVAL '1 day');

-- ================================================
-- INSÉRER 20 MESSAGES DE CONTACT
-- ================================================

INSERT INTO contacts (id, name, email, phone, message, status, priority, property_id, created_at) VALUES

-- Messages Non Lus - Priorité Haute (3)
(gen_random_uuid(), 'Marie Kokou', 'marie.kokou@email.com', '+228 90 12 34 56', 'Bonjour, je suis très intéressée par la Villa Moderne à Lomé Centre. Pourriez-vous m''envoyer plus d''informations sur les modalités de paiement ? Merci.', 'unread', 'high', (SELECT id FROM properties WHERE title LIKE '%Villa Moderne Lomé%' LIMIT 1), NOW() - INTERVAL '2 hours'),

(gen_random_uuid(), 'Jean-Paul Agbeko', 'jp.agbeko@gmail.com', '+228 91 23 45 67', 'Je souhaiterais visiter l''appartement à Bè cette semaine. Quelles sont vos disponibilités ? Je suis disponible mardi et jeudi après-midi.', 'unread', 'high', (SELECT id FROM properties WHERE title LIKE '%Appartement 3 Pièces Bè%' LIMIT 1), NOW() - INTERVAL '5 hours'),

(gen_random_uuid(), 'Ibrahim Cissé', 'ibrahim.c@email.com', '+228 94 45 67 89', 'Je suis intéressé par plusieurs propriétés. Pouvez-vous me rappeler pour discuter ? Urgent.', 'unread', 'high', NULL, NOW() - INTERVAL '30 minutes'),

-- Messages Non Lus - Priorité Moyenne (4)
(gen_random_uuid(), 'Amina Diallo', 'amina.d@yahoo.fr', '+228 92 34 56 78', 'Bonjour, le prix du terrain agricole à Kpalimé est-il négociable ? Je suis investisseur agricole et j''ai un projet sérieux.', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Terrain Agricole Kpalimé%' LIMIT 1), NOW() - INTERVAL '1 hour'),

(gen_random_uuid(), 'David Mensah', 'david.mensah@outlook.com', '+228 93 45 67 89', 'Est-ce que la boutique commerciale à Assiyéyé dispose d''un parking ? Merci de me tenir informé.', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Boutique Commerciale%' LIMIT 1), NOW() - INTERVAL '3 hours'),

(gen_random_uuid(), 'Sarah Togo', 'sarah.togo@email.com', '+228 94 56 78 90', 'Bonjour, j''aimerais avoir des photos supplémentaires de la Villa de Luxe à Baguida. Le bien est-il toujours disponible ?', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Villa de Luxe Baguida%' LIMIT 1), NOW() - INTERVAL '6 hours'),

(gen_random_uuid(), 'Awa Koné', 'awa.kone@gmail.com', '+228 95 56 78 90', 'Bonjour, y a-t-il des facilités de paiement pour la maison familiale à Sokodé ?', 'unread', 'medium', (SELECT id FROM properties WHERE title LIKE '%Maison Familiale Sokodé%' LIMIT 1), NOW() - INTERVAL '7 hours'),

-- Messages Lus - Priorité Basse (4)
(gen_random_uuid(), 'Pierre Koffi', 'pierre.k@gmail.com', '+228 95 67 89 01', 'Pourriez-vous m''indiquer si le duplex à Adidogomé est proche des écoles et centres commerciaux ? Merci.', 'read', 'low', (SELECT id FROM properties WHERE title LIKE '%Duplex Moderne Adidogomé%' LIMIT 1), NOW() - INTERVAL '4 hours'),

(gen_random_uuid(), 'Fatima Sow', 'fatima.sow@email.com', '+228 96 78 90 12', 'Simple demande d''information sur les terrains disponibles à Aného.', 'read', 'low', (SELECT id FROM properties WHERE title LIKE '%Terrain Résidentiel Aného%' LIMIT 1), NOW() - INTERVAL '1 day'),

(gen_random_uuid(), 'Ahmed Traoré', 'ahmed.traore@yahoo.com', '+228 97 89 01 23', 'Je cherche un entrepôt proche du port. L''entrepôt industriel correspond-il à mes besoins ?', 'read', 'low', (SELECT id FROM properties WHERE title LIKE '%Entrepôt Industriel%' LIMIT 1), NOW() - INTERVAL '1 day'),

(gen_random_uuid(), 'Diane Lawson', 'diane.lawson@email.com', '+228 97 78 90 12', 'Question sur les documents nécessaires pour l''achat d''un terrain.', 'read', 'low', NULL, NOW() - INTERVAL '8 hours'),

-- Messages Répondus (3)
(gen_random_uuid(), 'Sophie Akakpo', 'sophie.akakpo@gmail.com', '+228 98 90 12 34', 'Bonjour, merci pour votre réponse rapide. Je confirme mon intérêt pour l''appartement. Cordialement.', 'replied', 'medium', NULL, NOW() - INTERVAL '2 days'),

(gen_random_uuid(), 'Emmanuel Douti', 'e.douti@outlook.com', '+228 90 01 23 45', 'Merci pour les informations fournies. Je vais réfléchir et vous recontacter bientôt.', 'replied', 'low', NULL, NOW() - INTERVAL '3 days'),

(gen_random_uuid(), 'Charlotte Adjonou', 'charlotte.a@email.com', '+228 91 12 34 56', 'Parfait, je vous remercie pour votre professionnalisme. À bientôt !', 'replied', 'high', NULL, NOW() - INTERVAL '2 days'),

-- Messages Archivés (3)
(gen_random_uuid(), 'Martin Djossou', 'martin.djossou@gmail.com', '+228 92 23 45 67', 'Message ancien concernant une propriété déjà vendue.', 'archived', 'low', NULL, NOW() - INTERVAL '30 days'),

(gen_random_uuid(), 'Nathalie Koudjo', 'nathalie.k@yahoo.fr', '+228 93 34 56 78', 'Ancien message archivé suite à transaction finalisée.', 'archived', 'low', NULL, NOW() - INTERVAL '25 days'),

(gen_random_uuid(), 'Thomas Gnassingbé', 'thomas.g@outlook.com', '+228 96 67 89 01', 'Proposition de partenariat commercial. Pouvons-nous organiser une rencontre ?', 'archived', 'medium', NULL, NOW() - INTERVAL '20 days'),

-- Messages Lus récents (3)
(gen_random_uuid(), 'Kevin Adzaku', 'kevin.adzaku@gmail.com', '+228 98 89 01 23', 'Merci pour l''envoi des photos. Je vais les étudier et vous revenir.', 'read', 'medium', NULL, NOW() - INTERVAL '12 hours'),

(gen_random_uuid(), 'Grace Ahonon', 'grace.ahonon@yahoo.com', '+228 90 90 12 34', 'Demande d''informations sur le processus d''achat immobilier au Togo.', 'read', 'low', NULL, NOW() - INTERVAL '18 hours'),

(gen_random_uuid(), 'Patrick Yovo', 'patrick.yovo@email.com', '+228 91 01 23 45', 'Je cherche activement un bien immobilier à Lomé. Pouvez-vous me contacter ?', 'read', 'high', NULL, NOW() - INTERVAL '10 hours');

-- ================================================
-- VÉRIFICATION DES DONNÉES INSÉRÉES
-- ================================================

-- Compter les propriétés par statut
SELECT 
    'PROPRIÉTÉS' as type,
    status,
    COUNT(*) as nombre
FROM properties
GROUP BY status
ORDER BY status;

-- Compter les contacts par statut
SELECT 
    'CONTACTS' as type,
    status,
    COUNT(*) as nombre
FROM contacts
GROUP BY status
ORDER BY status;

-- Total général
SELECT 
    (SELECT COUNT(*) FROM properties) as total_proprietes,
    (SELECT COUNT(*) FROM contacts) as total_contacts;

-- ================================================
-- MESSAGE DE SUCCÈS
-- ================================================
SELECT '✅ Données insérées avec succès! 15 propriétés et 20 messages créés.' as statut;
