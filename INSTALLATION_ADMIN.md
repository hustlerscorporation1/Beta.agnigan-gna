# 🚀 Installation Rapide - Compte Administrateur

## Étapes de Configuration

### 1️⃣ Ouvrir Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Cliquez sur **SQL Editor** dans le menu de gauche

### 2️⃣ Exécuter le Script SQL

1. Ouvrez le fichier `setup-admin.sql` de votre projet
2. Copiez tout le contenu du fichier
3. Collez-le dans l'éditeur SQL de Supabase
4. Cliquez sur **RUN** pour exécuter le script

### 3️⃣ Créer l'Utilisateur Admin

1. Dans Supabase, allez dans **Authentication** → **Users**
2. Cliquez sur le bouton **Add user** (ou **Invite**)
3. Remplissez les informations :
   - **Email** : `admin@anyigbanya.com`
   - **Password** : `Admin2024!`
   - **Auto Confirm User** : ✅ (cochez cette case)
4. Cliquez sur **Create user**

### 4️⃣ Promouvoir en Admin

Retournez dans **SQL Editor** et exécutez :

```sql
UPDATE profiles 
SET role = 'admin', 
    full_name = 'Administrateur Principal'
WHERE email = 'admin@anyigbanya.com';
```

### 5️⃣ Se Connecter

1. Ouvrez votre application : `http://localhost:3000/admin/login`
2. Connectez-vous avec :
   - **Email** : `admin@anyigbanya.com`
   - **Mot de passe** : `Admin2024!`

---

## ✅ Vérification

Pour vérifier que tout fonctionne, exécutez dans SQL Editor :

```sql
SELECT 
  p.email,
  p.full_name,
  p.role,
  p.created_at
FROM profiles p
WHERE p.role = 'admin';
```

Vous devriez voir votre compte admin dans les résultats.

---

## 🔐 Identifiants par Défaut

**Email** : `admin@anyigbanya.com`  
**Mot de passe** : `Admin2024!`  
**URL** : `http://localhost:3000/admin/login`

---

## ⚠️ Sécurité

1. **Changez le mot de passe** après votre première connexion
2. Utilisez un **email réel** si vous voulez recevoir des notifications
3. Ne partagez jamais vos identifiants admin

---

## 🆘 En cas de problème

### Erreur "Accès non autorisé"
- Vérifiez que le rôle est bien 'admin' dans la table profiles
- Exécutez à nouveau la commande UPDATE

### Impossible de se connecter
- Vérifiez que l'utilisateur existe dans Authentication → Users
- Vérifiez que l'email est correct
- Essayez de réinitialiser le mot de passe

### Tables non créées
- Réexécutez le script `setup-admin.sql` complet
- Vérifiez les erreurs dans la console SQL

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes, vérifiez :
1. Que Supabase est bien configuré dans `.env`
2. Que les tables sont créées (voir Database → Tables)
3. Que l'utilisateur existe (voir Authentication → Users)
4. Que le rôle est 'admin' (voir profiles dans Database)
