# 📝 Todo List Senior — React Native (Expo)

> Application mobile de gestion de tâches développée avec **React Native** et **Expo SDK 54**.
> Compatible **Android** et **iOS**.

---

## 🚀 Fonctionnalités

| Fonctionnalité              | Description                                      |
| --------------------------- | ------------------------------------------------ |
| ➕ Ajouter une tâche        | Création dynamique avec champ de saisie          |
| 🗑️ Supprimer une tâche      | Suppression par ID avec animation fade-out       |
| ✅ Modifier le statut       | Basculer entre terminée / non terminée           |
| 🔍 Recherche instantanée    | Filtrage en temps réel par titre                 |
| 🏷️ Filtres                  | Toutes / Actives / Terminées                     |
| 🔢 Compteur intelligent     | Nombre de tâches restantes affiché en temps réel |
| 💾 Persistance des données  | Sauvegarde locale via AsyncStorage               |
| 🎬 Animations légères       | Fade-in, scale, bounce — feedback utilisateur    |
| 📱 Design responsive        | Compatible Android et iOS                        |

---

## 🛠️ Technologies utilisées

- **React Native** `0.81.5`
- **Expo SDK** `54`
- **AsyncStorage** `2.2.0` — Persistance locale
- **JavaScript (ES6+)**

---

## 📁 Structure du projet

```
todo-app/
├── App.js                        # Point d'entrée
├── app.json                      # Configuration Expo
├── package.json                  # Dépendances
└── src/
    ├── screens/
    │   └── HomeScreen.js         # Écran principal (logique + UI)
    ├── components/
    │   ├── Header.js             # En-tête avec titre et compteur
    │   ├── SearchBar.js          # Barre de recherche
    │   ├── FilterButtons.js      # Boutons de filtrage
    │   └── TaskItem.js           # Composant d'une tâche
    ├── context/
    │   └── TaskContext.js        # Context API (state global)
    ├── store/
    │   └── taskStore.js          # Store Zustand (alternative)
    ├── services/
    │   └── storageService.js     # Service AsyncStorage centralisé
    └── utils/
        └── helpers.js            # Fonctions utilitaires
```

---

## ⚡ Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/go) installé sur votre téléphone
- npm ou yarn

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Sam-s-dev/todo-list-senoir.git

# 2. Aller dans le dossier du projet
cd todo-list-senoir/todo-app

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npx expo start
```

> 📱 Scannez le **QR code** affiché dans le terminal avec l'application **Expo Go** sur votre téléphone.

---

## 🎨 Aperçu de l'interface

- **Thème clair** avec fond `#F4F6F8`
- **Cartes blanches** avec ombres subtiles
- **Boutons bleus** (`#0066FF`) pour les actions
- **Icônes visuelles** : ✅ (terminée) / ⬜ (active)
- **Animations** : fade-in à l'ajout, fade-out à la suppression, bounce au toggle

---

## 📄 Licence

Ce projet est à usage éducatif.

---

## 👤 Auteur

Développé par **Sam-s-dev**
