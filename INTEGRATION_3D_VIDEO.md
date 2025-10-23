# 🎬 Intégration 3D et Vidéo - Guide Complet

## ✅ Fonctionnalités Ajoutées

### **1. Bouton "Voir en 3D"**
- Icône: Cube 3D
- Couleur: Dégradé bleu-violet
- Action: Ouvre une modal avec la visite virtuelle 3D

### **2. Bouton "Voir la vidéo"**
- Icône: Caméra vidéo
- Couleur: Dégradé rouge-rose
- Action: Ouvre une modal avec la vidéo du terrain

### **3. Modales Interactives**
- Animations d'ouverture/fermeture (Framer Motion)
- Fond flou (backdrop-blur)
- Fermeture en cliquant à l'extérieur
- Design responsive

## 📍 Emplacement des Boutons

Les boutons sont situés dans la page de détails du terrain (`PropertyDetail/index.jsx`), juste après les thumbnails d'images et avant la carte.

```
┌─────────────────────────────┐
│   Image Principale          │
└─────────────────────────────┘
┌────────┬────────┬────────┬──┐
│ Thumb  │ Thumb  │ Thumb  │T.│
└────────┴────────┴────────┴──┘
┌───────────────┬──────────────┐
│ 🔷 Voir en 3D │ 📹 Voir vidéo│  ← NOUVEAUX BOUTONS
└───────────────┴──────────────┘
┌─────────────────────────────┐
│   Carte Interactive         │
└─────────────────────────────┘
```

## 🎯 Comment Intégrer une Vraie Vue 3D

### Option 1: Matterport (Recommandé)

Matterport est la solution professionnelle pour créer des visites virtuelles 3D immersives.

1. **Créez un compte sur** [Matterport](https://matterport.com)
2. **Capturez votre terrain** avec une caméra compatible
3. **Obtenez le lien d'intégration** (embed)
4. **Dans le code**, décommentez et modifiez:

```javascript
// Dans PropertyDetail/index.jsx, ligne ~651
<iframe
  src="https://my.matterport.com/show/?m=VOTRE_ID_MATTERPORT"
  className="w-full h-full rounded-lg"
  frameBorder="0"
  allowFullScreen
></iframe>
```

### Option 2: Kuula

Alternative gratuite pour les visites 360°.

1. **Inscrivez-vous sur** [Kuula](https://kuula.co)
2. **Uploadez vos photos 360°**
3. **Copiez le code d'intégration**
4. **Dans le code**:

```javascript
<iframe
  src="https://kuula.co/share/VOTRE_ID?logo=1&info=1&fs=1&vr=0"
  className="w-full h-full rounded-lg"
  frameBorder="0"
  allowFullScreen
></iframe>
```

### Option 3: Google Street View (Gratuit)

Pour des terrains avec couverture Street View.

```javascript
<iframe
  src="https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sVOTRE_PANO_ID!2m2!1d-6.1256!2d1.2345!3f0!4f0!5f0.7820865974627469"
  className="w-full h-full rounded-lg"
  frameBorder="0"
  allowFullScreen
></iframe>
```

### Option 4: Three.js (Personnalisé)

Pour une solution 100% personnalisée.

1. **Installez Three.js**:
```bash
npm install three
```

2. **Créez un composant 3D viewer**
3. **Intégrez-le dans la modal**

## 🎥 Comment Intégrer une Vraie Vidéo

### Option 1: YouTube (Recommandé)

1. **Uploadez votre vidéo** sur YouTube
2. **Cliquez sur "Partager" → "Intégrer"**
3. **Copiez l'ID de la vidéo** (après `v=`)
4. **Dans le code**, décommentez et modifiez:

```javascript
// Dans PropertyDetail/index.jsx, ligne ~711
<iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/VOTRE_VIDEO_ID"
  title="Vidéo du terrain"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

**Exemple complet**:
```javascript
<iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
  title="Vidéo du terrain"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

### Option 2: Vimeo

1. **Uploadez sur Vimeo**
2. **Obtenez le lien d'intégration**

```javascript
<iframe
  className="w-full h-full"
  src="https://player.vimeo.com/video/VOTRE_VIDEO_ID"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
></iframe>
```

### Option 3: Vidéo Locale

Si vous hébergez la vidéo sur votre serveur:

1. **Placez la vidéo** dans `/public/videos/`
2. **Dans le code**, décommentez:

```javascript
// Dans PropertyDetail/index.jsx, ligne ~722
<video
  className="w-full h-full"
  controls
  autoPlay
  src="/videos/terrain-1-video.mp4"
>
  Votre navigateur ne supporte pas la vidéo.
</video>
```

### Option 4: Cloudinary (Hébergement Cloud)

1. **Créez un compte** [Cloudinary](https://cloudinary.com)
2. **Uploadez votre vidéo**
3. **Utilisez le player Cloudinary**:

```javascript
<video
  className="w-full h-full"
  controls
  src="https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v123456789/terrain-video.mp4"
>
  Votre navigateur ne supporte pas la vidéo.
</video>
```

## 🔧 Configuration Dynamique par Terrain

Pour avoir des vidéos et vues 3D différentes pour chaque terrain:

### 1. Modifiez le fichier `properties.js`

```javascript
export const properties = [
  {
    id: 1,
    title: "Terrain Tchalla Sama",
    // ... autres propriétés
    video3d: "https://my.matterport.com/show/?m=ABC123",
    videoUrl: "https://www.youtube.com/embed/XYZ789"
  },
  // ...
];
```

### 2. Dans PropertyDetail/index.jsx

Remplacez le contenu des modales par:

**Pour la vue 3D**:
```javascript
{property.video3d ? (
  <iframe
    src={property.video3d}
    className="w-full h-full rounded-lg"
    frameBorder="0"
    allowFullScreen
  ></iframe>
) : (
  <div>Vue 3D non disponible pour ce terrain</div>
)}
```

**Pour la vidéo**:
```javascript
{property.videoUrl ? (
  <iframe
    className="w-full h-full"
    src={property.videoUrl}
    title="Vidéo du terrain"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
) : (
  <div>Vidéo non disponible pour ce terrain</div>
)}
```

## 📱 Responsive Design

Les modales sont déjà responsive:
- **Mobile**: Plein écran avec padding réduit
- **Tablet**: 80% de largeur
- **Desktop**: Max-width avec centrage

## 🎨 Personnalisation

### Changer les Couleurs des Boutons

**Bouton 3D**:
```javascript
className="bg-gradient-to-r from-blue-500 to-purple-600"
// Changez en:
className="bg-gradient-to-r from-green-500 to-teal-600"
```

**Bouton Vidéo**:
```javascript
className="bg-gradient-to-r from-red-500 to-pink-600"
// Changez en:
className="bg-gradient-to-r from-orange-500 to-red-600"
```

### Changer les Icônes

Remplacez `CubeIcon` et `VideoCameraIcon` par d'autres icônes Heroicons.

## 📊 Statistiques et Analytics

Pour tracker les vues 3D et vidéos:

```javascript
const handleOpen3DView = () => {
  setShow3DView(true);
  // Analytics
  gtag('event', 'view_3d', {
    property_id: property.id,
    property_name: property.title
  });
};

const handleOpenVideo = () => {
  setShowVideoModal(true);
  // Analytics
  gtag('event', 'view_video', {
    property_id: property.id,
    property_name: property.title
  });
};
```

## 🚀 Services Recommandés

### Pour les Visites 3D
1. **Matterport** - Professionnel, €€€
2. **Kuula** - Accessible, €€
3. **Pano2VR** - Puissant, €€
4. **Google Tour Creator** - Gratuit, limité

### Pour l'Hébergement Vidéo
1. **YouTube** - Gratuit, illimité
2. **Vimeo** - Professionnel, €€
3. **Cloudinary** - Cloud, €
4. **AWS S3** - Scalable, €€

### Pour les Drones (Vidéos Aériennes)
1. **DJI Mavic** - Standard
2. **DJI Phantom** - Professionnel
3. **Parrot Anafi** - Léger

## 💡 Conseils

1. **Qualité Vidéo**: Minimum 1080p, idéal 4K
2. **Durée**: 1-3 minutes maximum
3. **Musique**: Utilisez des musiques libres de droits
4. **Sous-titres**: Ajoutez des infos importantes
5. **Compression**: Optimisez pour le web (H.264)
6. **Format**: MP4 pour la compatibilité
7. **Miniature**: Créez une belle thumbnail

## 🔒 Sécurité

Pour des visites 3D privées:
- Utilisez des URLs avec tokens d'accès
- Configurez les permissions sur Matterport/Kuula
- Limitez l'accès aux utilisateurs connectés

## 📝 Exemple Complet

Voir le fichier `PropertyDetail/index.jsx` lignes 594-744 pour l'implémentation complète des modales.

---

✅ **Les boutons 3D et Vidéo sont maintenant prêts à être utilisés avec de vraies intégrations !**
