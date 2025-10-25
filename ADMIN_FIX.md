# 🔧 RÉPARATION ADMIN - Guide Rapide

## 🚨 Problème : "Accès non autorisé"

Cela signifie que l'utilisateur existe mais n'est pas admin.

---

## ✅ SOLUTION IMMÉDIATE

### **Étape 1 : Vérifier l'utilisateur**
1. Allez dans Supabase → **Authentication** → **Users**
2. Cherchez `admin@anyigbanya.com`
3. **S'il n'existe pas** : Créez-le maintenant avec :
   - Email : `admin@anyigbanya.com`
   - Password : `Admin2024!`
   - ✅ **Auto Confirm User**

### **Étape 2 : Exécuter la réparation**
1. Dans Supabase → **SQL Editor**
2. Copiez le contenu de `fix-admin-setup.sql`
3. Cliquez sur **RUN**

### **Étape 3 : Promouvoir en admin**
Dans **SQL Editor**, exécutez cette commande :

```sql
UPDATE profiles
SET role = 'admin',
    full_name = 'Administrateur Principal'
WHERE email = 'admin@anyigbanya.com';
```

### **Étape 4 : Vérifier**
Exécutez cette commande pour confirmer :

```sql
SELECT email, role, full_name
FROM profiles
WHERE email = 'admin@anyigbanya.com';
```

**Résultat attendu :**
```
email              | role  | full_name
admin@anyigbanya.com | admin | Administrateur Principal
```

---

## 🔍 DIAGNOSTIC

Si ça ne marche toujours pas, exécutez dans SQL Editor :

```sql
-- Vérifier l'utilisateur dans auth
SELECT email FROM auth.users WHERE email = 'admin@anyigbanya.com';

-- Vérifier le profil admin
SELECT email, role FROM profiles WHERE role = 'admin';
```

---

## 🎯 SE CONNECTER

**URL** : `http://localhost:3000/admin/login`  
**Email** : `admin@anyigbanya.com`  
**Password** : `Admin2024!`

---

## ⚠️ Points critiques

1. **L'utilisateur DOIT exister** dans Authentication → Users
2. **Le rôle DOIT être 'admin'** dans la table profiles
3. **L'email DOIT être confirmé** (colonne Email Confirmed = ✅)
4. **Les tables DOIVENT exister** (profiles, contacts, activities)

---

## 🆘 Si toujours bloqué

1. **Supprimez** l'utilisateur dans Authentication → Users
2. **Recréez-le** avec les bonnes infos
3. **Réexécutez** le script de réparation
4. **Testez** la connexion

---

**Le problème principal est que l'utilisateur n'est pas admin dans la base de données.** Le script de réparation va corriger ça !
