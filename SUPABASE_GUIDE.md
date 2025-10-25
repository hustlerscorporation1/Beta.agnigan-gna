# 📋 GUIDE SUPABASE - RÉPARATION TABLE PROFILES

## 🚀 ÉTAPES DÉTAILLÉES DANS SUPABASE

### **1️⃣ Ouvrir Supabase Dashboard**
1. Allez sur [https://supabase.com](https://supabase.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet Anyigbã Nya
4. Cliquez sur **SQL Editor** dans le menu de gauche

---

### **2️⃣ Exécuter le Script de Réparation**

#### **A. Copier le script**
1. Ouvrez le fichier `repair-profiles.sql` dans votre projet
2. Sélectionnez **TOUT le contenu** (Ctrl+A)
3. Copiez (Ctrl+C)

#### **B. Coller dans Supabase**
1. Dans SQL Editor, cliquez dans la zone de texte
2. Collez le contenu (Ctrl+V)
3. Le script devrait apparaître

#### **C. Exécuter le script**
1. Cliquez sur le bouton **RUN** (ou **Execute**)
2. Attendez que l'exécution se termine
3. Vérifiez qu'il n'y a pas d'erreurs en rouge

---

### **3️⃣ Créer l'Utilisateur Admin**

#### **A. Aller dans Authentication**
1. Dans le menu de gauche, cliquez sur **Authentication**
2. Cliquez sur l'onglet **Users**

#### **B. Créer l'utilisateur**
1. Cliquez sur le bouton **Add user** (en haut à droite)
2. Remplissez le formulaire :
   ```
   Email: admin@anyigbanya.com
   Password: Admin2024!
   ```
3. **⚠️ IMPORTANT** : Cochez la case **Auto Confirm User**
4. Cliquez sur **Create user**

#### **C. Vérifier l'utilisateur**
1. Dans la liste des utilisateurs, cherchez `admin@anyigbanya.com`
2. Vérifiez que la colonne **Email Confirmed** est ✅

---

### **4️⃣ Promouvoir en Admin**

#### **A. Retourner dans SQL Editor**
1. Cliquez sur **SQL Editor** dans le menu
2. Dans la zone de texte, tapez cette commande :

```sql
UPDATE profiles
SET role = 'admin',
    full_name = 'Administrateur Principal'
WHERE email = 'admin@anyigbanya.com';
```

#### **B. Exécuter**
1. Cliquez sur **RUN**
2. Vérifiez qu'il n'y a pas d'erreur

---

### **5️⃣ Tester la Connexion**

1. Ouvrez votre navigateur
2. Allez sur : `http://localhost:3000/admin/login`
3. Connectez-vous avec :
   - **Email** : `admin@anyigbanya.com`
   - **Mot de passe** : `Admin2024!`

---

## ✅ VÉRIFICATION

Pour vérifier que tout fonctionne, dans SQL Editor, exécutez :

```sql
-- Vérifier l'utilisateur
SELECT email FROM auth.users WHERE email = 'admin@anyigbanya.com';

-- Vérifier le rôle admin
SELECT email, role, full_name FROM profiles WHERE role = 'admin';
```

**Résultat attendu :**
```
admin@anyigbanya.com | admin | Administrateur Principal
```

---

## 🎯 RÉSUMÉ DES ÉTAPES

1. **SQL Editor** → Coller `repair-profiles.sql` → **RUN**
2. **Authentication** → **Users** → **Add user** → Remplir infos → **Create user**
3. **SQL Editor** → Taper UPDATE → **RUN**
4. **Navigateur** → `http://localhost:3000/admin/login` → Se connecter

---

## ⚠️ POINTS CRITIQUES

- ✅ **Cochez "Auto Confirm User"** lors de la création
- ✅ **L'email doit être exactement** `admin@anyigbanya.com`
- ✅ **Le script doit s'exécuter sans erreur**
- ✅ **Le rôle doit devenir 'admin'**

---

**Suivez ces étapes dans l'ordre et vous pourrez vous connecter !** 🚀

Avez-vous pu exécuter le script dans Supabase ? Quelles étapes avez-vous complétées ?
