# 📘 GUIDE D'UTILISATION - PAGES ADMIN REFAITES

## 🎯 Introduction

Ce guide explique comment utiliser les nouvelles pages d'administration refaites et améliorées pour Agnigban Gna.

---

## 📋 PAGES DISPONIBLES

### ✅ Pages Refaites:
1. **Dashboard** - Vue d'ensemble complète
2. **Propriétés** - Gestion immobilière avancée
3. **Utilisateurs** - Administration des comptes
4. **Contacts** - Messagerie professionnelle

---

## 🏠 PAGE PROPRIÉTÉS

### Accès:
```
URL: /admin/properties
Fichier: src/admin/pages/Properties/PropertiesList.jsx
```

### Fonctionnalités:

#### 1. **Statistiques (Haut de Page)**
4 cartes affichant:
- **Total Propriétés** - Nombre total avec tendance
- **Disponibles** - Propriétés en vente
- **Vendues** - Propriétés vendues
- **Valeur Totale** - Somme des prix en millions FCFA

#### 2. **Barre d'Actions**
- **Actualiser** 🔄 - Recharger les données
- **Exporter** 📥 - Télécharger CSV avec toutes les données
- **Ajouter** ➕ - Créer nouvelle propriété

#### 3. **Filtres**
- **Recherche** 🔍 - Par titre, localisation, description
- **Statut** 🎯 - Disponible, Vendu, En attente
- **Type** 🏠 - Résidentiel, Commercial, Agricole, Industriel
- **Vue** 👁️ - Basculer Grid (cartes) / List (tableau)
- **Tout** ☑️ - Sélectionner toutes les propriétés

#### 4. **Vue Grid (Cartes)**
Chaque carte affiche:
- Image de la propriété
- Badge de statut (coloré)
- Titre et localisation
- Prix et surface
- 3 boutons: Voir, Éditer, Supprimer

**Actions:**
- Cliquer sur l'image → Voir détails
- Checkbox → Sélectionner pour actions en masse
- Bouton Voir → Ouvre modale détails
- Bouton Éditer → Page d'édition
- Bouton Supprimer → Confirmation puis suppression

#### 5. **Vue List (Tableau)**
Colonnes:
- Checkbox de sélection
- Propriété (image miniature + titre)
- Localisation
- Prix + surface
- Type
- Statut
- Actions (3 boutons)

#### 6. **Sélection Multiple**
Quand des propriétés sont sélectionnées:
- Barre bleue apparaît avec compteur
- **Marquer disponible** - Change statut groupé
- **Marquer vendu** - Change statut groupé
- **Supprimer** - Suppression groupée
- **Annuler** - Désélectionner tout

#### 7. **Modale Détails**
S'ouvre en cliquant sur "Voir":
- Image grande taille
- Toutes les informations (titre, prix, localisation, statut, surface, type)
- Description complète
- 2 boutons: **Modifier** et **Supprimer**

#### 8. **Export CSV**
Contient:
- Titre, Localisation, Prix, Statut, Type, Surface, Date
- Toutes les propriétés filtrées
- Nom: `properties-[timestamp].csv`

---

## 👥 PAGE UTILISATEURS

### Accès:
```
URL: /admin/users
Fichier: src/admin/pages/Users/UsersListAdvanced.jsx
```

### Fonctionnalités:

#### 1. **Statistiques**
4 cartes:
- **Total Utilisateurs** - Nombre total
- **Administrateurs** - Nombre d'admins (badge violet)
- **Utilisateurs** - Utilisateurs réguliers
- **Actifs** - Utilisateurs actifs (~70%)

#### 2. **Barre d'Actions**
- **Actualiser** 🔄
- **Exporter** 📥 - CSV avec nom, email, téléphone, rôle, date
- **Ajouter** ➕ - Nouvel utilisateur

#### 3. **Filtres**
- **Recherche** 🔍 - Par nom, email, téléphone
- **Rôle** 👑 - Admin ou Utilisateur
- **Statut** ✅ - Actif ou En attente

#### 4. **Cartes Utilisateurs**
Chaque carte montre:
- **Avatar coloré** - Initiales du nom (violet pour admin, vert pour user)
- **Couronne** 👑 - Si administrateur
- **Nom** - Nom complet ou "Utilisateur"
- **Email** 📧
- **Téléphone** 📱 (si disponible)
- **Badge rôle** - Administrateur (violet) ou Utilisateur (bleu)
- **Date inscription**
- **3 boutons:**
  - **Voir** 👁️ - Détails complets
  - **Promouvoir/Rétrograder** 🛡️ - Changer rôle
  - **Supprimer** 🗑️

#### 5. **Gestion des Rôles**
**Promouvoir en Admin:**
- Cliquer sur "Promouvoir"
- Utilisateur devient admin instantanément
- Avatar passe en violet
- Badge devient "Administrateur"
- Couronne apparaît

**Rétrograder en User:**
- Cliquer sur "Rétrograder"
- Admin devient utilisateur régulier
- Avatar passe en vert
- Badge devient "Utilisateur"
- Couronne disparaît

#### 6. **Modale Détails**
Affiche:
- Avatar grand format
- ID complet de l'utilisateur
- Rôle avec badge
- Email et téléphone
- Dates d'inscription et mise à jour
- 2 boutons: **Changer rôle** et **Supprimer**

---

## 💬 PAGE CONTACTS

### Accès:
```
URL: /admin/contacts
Fichier: src/admin/pages/Contacts/ContactsListAdvanced.jsx
```

### Fonctionnalités:

#### 1. **Statistiques**
4 cartes:
- **Total Messages** - Tous les messages
- **Non lus** - Messages non lus (badge bleu)
- **Répondus** - Messages avec réponse (badge vert)
- **Archivés** - Messages archivés (badge jaune)

#### 2. **Barre d'Actions**
- **Actualiser** 🔄
- **Exporter** 📥 - CSV avec toutes les infos

#### 3. **Filtres**
- **Recherche** 🔍 - Par nom, email, message
- **Statut** 📨 - Non lu, Lu, Répondu, Archivé
- **Priorité** ⭐ - Haute, Moyenne, Basse

#### 4. **Interface 2 Colonnes**

**Colonne Gauche - Liste des Messages:**
Chaque message affiche:
- **Nom** de l'expéditeur
- **Point bleu** 🔵 si non lu
- **Email**
- **Badge statut** (coloré)
- **Extrait du message** (2 lignes)
- **Date** et **Étoile** (priorité)
- **Highlight vert** si sélectionné
- **Fond bleu** si non lu

**Colonne Droite - Détails du Message:**
- **Avatar** avec icône utilisateur
- **Nom et email** de l'expéditeur
- **Badge statut**
- **Informations:** Email, Téléphone, Date, Propriété liée
- **Sujet** (si présent)
- **Message complet** (dans un cadre gris)
- **3 boutons d'action:**
  - **Répondre** ✉️ (vert) - Si pas encore répondu
  - **Archiver** 📦 - Si pas archivé
  - **Supprimer** 🗑️

#### 5. **Système de Lecture**
**Auto-marquage:**
- Cliquer sur un message non lu
- Il est automatiquement marqué comme "Lu"
- Badge passe de bleu à gris
- Point bleu disparaît
- Fond bleu disparaît

#### 6. **Système de Réponse**
**Étapes:**
1. Sélectionner un message
2. Cliquer sur **"Répondre"**
3. Modale s'ouvre avec:
   - Email du destinataire (pré-rempli, non modifiable)
   - Zone de texte pour la réponse
4. Écrire la réponse
5. Cliquer **"Envoyer la réponse"**
6. Message marqué automatiquement "Répondu"
7. Badge devient vert
8. Modale se ferme

#### 7. **Archivage**
- Cliquer sur **"Archiver"**
- Message passe en statut "Archivé"
- Badge devient jaune
- Peut toujours être consulté avec filtre

#### 8. **Priorités**
Étoiles colorées:
- ⭐ **Rouge pleine** - Priorité haute
- ⭐ **Jaune pleine** - Priorité moyenne
- ⭐ **Grise vide** - Priorité basse

---

## 🎨 LÉGENDE DES COULEURS

### Statuts Propriétés:
- 🟢 **Vert** - Disponible
- 🔴 **Rouge** - Vendu
- 🟡 **Jaune** - En attente

### Statuts Utilisateurs:
- 🟣 **Violet** - Administrateur
- 🔵 **Bleu** - Utilisateur
- 🟢 **Vert** - Actif

### Statuts Messages:
- 🔵 **Bleu** - Non lu
- ⚪ **Gris** - Lu
- 🟢 **Vert** - Répondu
- 🟡 **Jaune** - Archivé

---

## 📊 EXPORT DE DONNÉES

### Format CSV:
Toutes les pages permettent d'exporter en CSV.

**Propriétés:**
```csv
Titre,Localisation,Prix,Statut,Type,Surface,Date
Terrain Lomé,Lomé Centre,5000000,available,residential,500m²,25/10/2025
```

**Utilisateurs:**
```csv
Nom,Email,Téléphone,Rôle,Date d'inscription
Jean Kouassi,jean@email.com,+228 XX XX,user,25/10/2025
```

**Contacts:**
```csv
Nom,Email,Téléphone,Message,Statut,Date
Marie Amouzou,marie@email.com,+228 XX XX,Bonjour...,read,25/10/2025
```

---

## ⌨️ RACCOURCIS ET ASTUCES

### Propriétés:
- **Espace** - Sélectionner propriété au survol
- **Échap** - Fermer modale
- **Entrée** - Confirmer suppression
- **Clic image** - Ouvrir détails

### Utilisateurs:
- **Double-clic carte** - Ouvrir détails
- **Clic avatar** - Voir informations
- **Ctrl + Clic** - Sélection multiple (futur)

### Contacts:
- **Clic message** - Ouvrir et marquer lu
- **R** - Répondre (quand message sélectionné)
- **A** - Archiver
- **Suppr** - Supprimer

---

## 🔄 FLUX DE TRAVAIL

### Gérer une Propriété:
1. Aller sur `/admin/properties`
2. Utiliser filtres si nécessaire
3. Cliquer sur propriété pour voir détails
4. **Option A:** Modifier → Éditer les infos
5. **Option B:** Changer statut via sélection multiple
6. **Option C:** Supprimer si nécessaire

### Promouvoir un Utilisateur:
1. Aller sur `/admin/users`
2. Chercher l'utilisateur
3. Cliquer **"Promouvoir"** sur sa carte
4. Vérifier que l'avatar devient violet
5. Vérifier que la couronne apparaît

### Répondre à un Contact:
1. Aller sur `/admin/contacts`
2. Cliquer sur message (marqué lu automatiquement)
3. Lire le message dans le panneau droit
4. Cliquer **"Répondre"**
5. Écrire la réponse dans la modale
6. Cliquer **"Envoyer"**
7. Message marqué "Répondu" automatiquement

---

## 🐛 DÉPANNAGE

### Les statistiques ne s'affichent pas:
- Vérifier la connexion Supabase
- Actualiser la page
- Vérifier les données dans Supabase

### Les filtres ne fonctionnent pas:
- Effacer les filtres
- Recharger la page
- Vérifier la console pour erreurs

### L'export CSV est vide:
- Vérifier qu'il y a des données
- Appliquer des filtres si nécessaire
- Essayer à nouveau

### Les modales ne s'ouvrent pas:
- Vérifier les erreurs console
- Essayer de fermer avec Échap
- Recharger la page

---

## 💡 BONNES PRATIQUES

### Propriétés:
1. ✅ Mettre à jour les statuts régulièrement
2. ✅ Utiliser les filtres pour chercher rapidement
3. ✅ Exporter les données chaque semaine
4. ✅ Vérifier les propriétés "En attente"

### Utilisateurs:
1. ✅ Promouvoir avec prudence
2. ✅ Vérifier les emails avant suppression
3. ✅ Surveiller le nombre d'admins
4. ✅ Exporter la liste régulièrement

### Contacts:
1. ✅ Répondre aux messages rapidement
2. ✅ Marquer comme lu après lecture
3. ✅ Archiver les anciens messages
4. ✅ Utiliser les priorités
5. ✅ Exporter pour suivi

---

## 📱 UTILISATION MOBILE

### Adaptations Mobile:
- Stats sur 1 colonne
- Cartes empilées
- Boutons plus grands
- Modales plein écran
- Scroll optimisé

### Conseils Mobile:
- Utiliser la recherche plutôt que le scroll
- Basculer en vue List pour mieux voir
- Actualiser avec le bouton dédié
- Exporter depuis un ordinateur si possible

---

## 🎯 OBJECTIFS D'UTILISATION

### Quotidien:
- ✅ Vérifier les nouveaux contacts (badge bleu)
- ✅ Répondre aux messages non lus
- ✅ Mettre à jour les statuts des propriétés

### Hebdomadaire:
- ✅ Exporter les données pour backup
- ✅ Vérifier les statistiques
- ✅ Archiver les anciens messages
- ✅ Réviser les utilisateurs actifs

### Mensuel:
- ✅ Analyser les tendances
- ✅ Nettoyer les données archivées
- ✅ Optimiser les descriptions
- ✅ Former nouveaux admins

---

## ✅ CHECKLIST QUOTIDIENNE

### Matin (9h):
- [ ] Ouvrir Dashboard
- [ ] Vérifier les statistiques
- [ ] Consulter les nouveaux messages (badge bleu)
- [ ] Répondre aux contacts urgents

### Midi (12h):
- [ ] Mettre à jour les statuts propriétés
- [ ] Vérifier les nouveaux utilisateurs
- [ ] Archiver messages traités

### Soir (17h):
- [ ] Exporter les données du jour
- [ ] Répondre aux messages restants
- [ ] Préparer actions pour demain

---

## 🎓 FORMATION NOUVEAUX ADMINS

### Étape 1: Découverte (Jour 1)
- Navigation dans les pages
- Comprendre les statistiques
- Utiliser les filtres

### Étape 2: Actions de Base (Jour 2-3)
- Voir détails
- Marquer statuts
- Répondre aux contacts

### Étape 3: Actions Avancées (Jour 4-5)
- Sélection multiple
- Actions en masse
- Export de données
- Gestion des rôles

### Étape 4: Autonomie (Jour 6+)
- Workflow complet
- Décisions indépendantes
- Optimisation des processus

---

## 📞 SUPPORT

### En cas de problème:
1. Consulter ce guide
2. Vérifier la console (F12)
3. Essayer de recharger
4. Contacter l'administrateur principal
5. Vérifier la documentation technique

---

## 🎉 FÉLICITATIONS!

Vous maîtrisez maintenant les **3 pages principales** de l'interface admin:

✅ **Propriétés** - Gestion immobilière complète
✅ **Utilisateurs** - Administration des comptes
✅ **Contacts** - Messagerie professionnelle

### Prochaines Étapes:
- Pratiquer chaque jour
- Explorer toutes les fonctionnalités
- Optimiser votre workflow
- Former d'autres utilisateurs

---

**🚀 INTERFACE ADMIN PROFESSIONNELLE PRÊTE À L'EMPLOI!**
