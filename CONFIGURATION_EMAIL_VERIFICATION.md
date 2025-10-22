# Configuration de la Vérification d'Email - Agnigban Gna

## 📧 Configuration Supabase Requise

Pour que la vérification d'email fonctionne correctement, vous devez configurer Supabase :

### 1. Activer la Vérification d'Email

1. Allez sur votre tableau de bord Supabase : https://app.supabase.com
2. Sélectionnez votre projet
3. Allez dans **Authentication** > **Settings**
4. Trouvez la section **Email Auth**
5. Activez l'option **"Enable email confirmations"**
6. Sauvegardez les modifications

### 2. Configuration des Templates d'Email (Optionnel)

Vous pouvez personnaliser l'email de vérification :

1. Allez dans **Authentication** > **Email Templates**
2. Sélectionnez **Confirm signup**
3. Personnalisez le template selon vos besoins
4. Utilisez les variables disponibles : `{{ .ConfirmationURL }}`, `{{ .SiteURL }}`, etc.

### 3. Configuration du Redirect URL

1. Allez dans **Authentication** > **URL Configuration**
2. Ajoutez vos URLs autorisées dans **Redirect URLs** :
   - `http://localhost:3000/auth/callback` (pour développement)
   - `https://votredomaine.com/auth/callback` (pour production)

## ✅ Fonctionnalités Implémentées

### Page d'Inscription (Register.jsx)
- ✅ Envoi automatique d'email de vérification lors de l'inscription
- ✅ Message détaillé informant l'utilisateur de vérifier son email
- ✅ Instructions claires avec rappel de vérifier les spams
- ✅ Redirection vers la page de connexion après 5 secondes

### Page de Connexion (Login.jsx)
- ✅ Vérification que l'email est confirmé avant la connexion
- ✅ Message d'erreur si l'email n'est pas vérifié
- ✅ Bouton pour renvoyer l'email de vérification
- ✅ Déconnexion automatique si email non vérifié
- ✅ Réinitialisation du formulaire lors de la saisie

## 🔄 Flux d'Utilisation

1. **Inscription** :
   - L'utilisateur remplit le formulaire
   - Un email de vérification est envoyé
   - Message de succès affiché avec instructions
   - Redirection vers la page de connexion

2. **Vérification Email** :
   - L'utilisateur ouvre l'email
   - Clique sur le lien de vérification
   - Supabase confirme l'email
   - L'utilisateur peut maintenant se connecter

3. **Connexion** :
   - L'utilisateur entre ses identifiants
   - Le système vérifie si l'email est confirmé
   - Si OUI : Connexion réussie ✅
   - Si NON : Message d'erreur + bouton pour renvoyer l'email ❌

## 🚨 Messages d'Erreur

### Email Non Vérifié
```
Veuillez vérifier votre adresse email avant de vous connecter. 
Un email de vérification vous a été envoyé lors de votre inscription. 
Pensez à vérifier vos spams.

[📧 Renvoyer l'email de vérification]
```

### Email de Vérification Renvoyé
```
Email de vérification renvoyé ! 
Veuillez vérifier votre boîte de réception.
```

## 🔧 Configuration SMTP (Recommandé pour Production)

Par défaut, Supabase utilise son propre serveur SMTP avec des limitations.
Pour la production, configurez votre propre SMTP :

1. Allez dans **Project Settings** > **Auth**
2. Activez **"Enable Custom SMTP"**
3. Configurez vos paramètres SMTP :
   - Host (ex: smtp.gmail.com)
   - Port (ex: 587)
   - Username
   - Password
   - Sender email
   - Sender name

### Exemples de Providers SMTP
- **Gmail** : smtp.gmail.com:587
- **SendGrid** : smtp.sendgrid.net:587
- **Mailgun** : smtp.mailgun.org:587
- **Amazon SES** : email-smtp.region.amazonaws.com:587

## 📝 Notes Importantes

1. **Développement** : Les emails peuvent prendre quelques minutes à arriver
2. **Spams** : Conseillez toujours aux utilisateurs de vérifier leurs spams
3. **Expiration** : Par défaut, les liens de vérification expirent après 24h
4. **Sécurité** : Ne jamais partager vos clés API Supabase

## 🎯 Test de la Fonctionnalité

1. Créez un compte avec un vrai email
2. Vérifiez que vous recevez l'email
3. Tentez de vous connecter AVANT de cliquer sur le lien
   - Vous devriez voir le message d'erreur
4. Testez le bouton "Renvoyer l'email"
5. Cliquez sur le lien de vérification
6. Connectez-vous à nouveau
   - Vous devriez être redirigé vers votre profil

## 🐛 Dépannage

### L'email ne s'envoie pas
- Vérifiez que l'email confirmation est activé dans Supabase
- Vérifiez les logs dans **Authentication** > **Logs**
- Vérifiez que l'adresse email est valide

### Le lien de vérification ne fonctionne pas
- Vérifiez que le Redirect URL est correctement configuré
- Vérifiez que le lien n'a pas expiré
- Essayez de renvoyer l'email

### L'utilisateur peut se connecter sans vérifier
- Assurez-vous que "Enable email confirmations" est activé
- Vérifiez le code dans Login.jsx (ligne 48-55)
