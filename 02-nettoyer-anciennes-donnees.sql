-- ================================================
-- NETTOYAGE: SUPPRIMER LES ANCIENNES DONNÉES
-- ================================================
-- ⚠️ Exécuter ce script si vous avez déjà des données et voulez recommencer

-- ================================================
-- SUPPRIMER LES ANCIENNES DONNÉES
-- ================================================

-- Supprimer d'abord les contacts (foreign key)
DELETE FROM contacts;

-- Puis supprimer les propriétés
DELETE FROM properties;

-- Vérifier que c'est vide
SELECT 'Anciennes données supprimées' as statut;
SELECT COUNT(*) as nb_proprietes FROM properties;
SELECT COUNT(*) as nb_contacts FROM contacts;

-- ================================================
-- MESSAGE DE SUCCÈS
-- ================================================
SELECT '✅ Anciennes données supprimées! Vous pouvez maintenant exécuter 03-inserer-terrains-uniquement.sql' as resultat;
