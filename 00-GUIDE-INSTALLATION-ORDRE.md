# 🚀 GUIDE D'INSTALLATION - ORDRE D'EXÉCUTION

## ⚠️ IMPORTANT: SUIVRE CET ORDRE EXACT!

---

## 📝 ORDRE D'EXÉCUTION DES SCRIPTS

### **ÉTAPE 1: Créer les Tables** ⭐ OBLIGATOIRE EN PREMIER

**Fichier:** `01-creer-toutes-les-tables.sql`

**Actions:**
1. Ouvrir Supabase.com → Votre projet
2. Cliquer sur **"SQL Editor"** (menu gauche)
3. Cliquer sur **"New query"**
4. **Copier TOUT le contenu** de `01-creer-toutes-les-tables.sql`
5. **Coller** dans l'éditeur
6. Cliquer sur **"Run"** (ou Ctrl + Enter)

**✅ Résultat attendu:**
```
✅ Tables créées avec succès! 
Vous pouvez maintenant exécuter 02-inserer-donnees-exemple.sql
```

**Ce que ce script fait:**
- Crée la table `properties` (propriétés)
- Crée la table `contacts` (messages)
- Crée la table `transactions` 
- Ajoute la colonne `permissions` à `profiles`
- Configure les politiques RLS (sécurité)

---

### **ÉTAPE 2: Insérer les Données**

**Fichier:** `02-inserer-donnees-exemple.sql`

**Actions:**
1. Dans Supabase SQL Editor
2. Cliquer sur **"New query"** (créer nouvelle requête)
3. **Copier TOUT le contenu** de `02-inserer-donnees-exemple.sql`
4. **Coller** dans l'éditeur
5. Cliquer sur **"Run"**

**✅ Résultat attendu:**
```
✅ Données insérées avec succès! 
15 propriétés et 20 messages créés.

Propriétés:
- 7 disponibles
- 3 vendues
- 5 en attente

Contacts:
- 7 non lus
- 4 lus
- 3 répondus
- 3 archivés
- 3 autres
```

---

### **ÉTAPE 3: Devenir Admin** (Si besoin)

Si vous n'êtes pas encore admin, exécuter:

```sql
-- Dans une NOUVELLE query SQL
-- Remplacer par VOTRE email
UPDATE profiles
SET role = 'admin',
    permissions = '{
      "can_view_properties": true,
      "can_edit_properties": true,
      "can_delete_properties": true,
      "can_view_users": true,
      "can_manage_users": true,
      "can_view_contacts": true,
      "can_reply_contacts": true,
      "can_view_transactions": true,
      "can_view_statistics": true,
      "can_manage_settings": true
    }'::jsonb
WHERE email = 'VOTRE_EMAIL@exemple.com';

-- Vérifier
SELECT email, role FROM profiles WHERE email = 'VOTRE_EMAIL@exemple.com';
```

**⚠️ IMPORTANT:** Remplacer `VOTRE_EMAIL@exemple.com` par votre vrai email!

---

### **ÉTAPE 4: Actualiser l'Application**

1. Retourner sur votre application (http://localhost:3000/admin)
2. Appuyer sur **F5** pour actualiser
3. Les données devraient maintenant apparaître!

---

## 🎯 VÉRIFICATION RAPIDE

Après avoir exécuté les scripts, vérifier avec:

```sql
-- Vérifier que tout existe
SELECT 
    'properties' as table_name, 
    COUNT(*) as nb_lignes 
FROM properties
UNION ALL
SELECT 
    'contacts' as table_name, 
    COUNT(*) as nb_lignes 
FROM contacts;
```

**Résultat attendu:**
```
properties  | 15
contacts    | 20
```

---

## ❌ ERREURS COURANTES

### Erreur: "relation properties does not exist"

**Cause:** Vous avez sauté l'ÉTAPE 1

**Solution:** 
1. Exécuter `01-creer-toutes-les-tables.sql` D'ABORD
2. PUIS exécuter `02-inserer-donnees-exemple.sql`

---

### Erreur: "duplicate key value"

**Cause:** Les données existent déjà

**Solution:** 
```sql
-- Supprimer les anciennes données
DELETE FROM contacts;
DELETE FROM properties;

-- Puis ré-exécuter 02-inserer-donnees-exemple.sql
```

---

### Les données ne s'affichent toujours pas

**Solution rapide:**
```sql
-- Désactiver temporairement RLS
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- Actualiser la page (F5)
-- Si ça marche, ré-exécuter 01-creer-toutes-les-tables.sql
```

---

## 📋 CHECKLIST FINALE

Cochez au fur et à mesure:

- [ ] ✅ Script 1 exécuté: `01-creer-toutes-les-tables.sql`
- [ ] ✅ Message: "Tables créées avec succès!"
- [ ] ✅ Script 2 exécuté: `02-inserer-donnees-exemple.sql`
- [ ] ✅ Message: "Données insérées avec succès!"
- [ ] ✅ Je suis connecté avec un compte admin
- [ ] ✅ Mon rôle est `'admin'` dans la table profiles
- [ ] ✅ Page actualisée (F5)
- [ ] ✅ Les données s'affichent dans l'application!

---

## 🎉 RÉSULTAT FINAL

Une fois tout exécuté, vous devriez voir:

### **Dashboard:**
- 📊 15 propriétés
- 💬 20 messages
- 📈 Statistiques mises à jour
- 📉 Graphiques remplis

### **Page Propriétés:**
- 7 propriétés disponibles
- 3 propriétés vendues
- 5 propriétés en attente

### **Page Contacts:**
- 7 messages non lus
- 4 messages lus
- 3 messages répondus
- 6 autres messages

---

## 🆘 BESOIN D'AIDE?

Si ça ne marche toujours pas:

1. Vérifier la console du navigateur (F12)
2. Regarder s'il y a des erreurs
3. Exécuter `diagnostic-donnees.sql` pour vérifier

---

## 📁 FICHIERS DANS L'ORDRE

```
00-GUIDE-INSTALLATION-ORDRE.md     ← Ce guide
01-creer-toutes-les-tables.sql     ← À exécuter EN PREMIER
02-inserer-donnees-exemple.sql     ← À exécuter EN SECOND
diagnostic-donnees.sql             ← Pour vérifier (optionnel)
fix-affichage-donnees.sql          ← Si problème RLS (optionnel)
```

---

**🎯 Suivez cet ordre et tout fonctionnera!** ✅
