# 📋 Annuaire Téléphonique GROUPE 2 Angular  - Cahier des Charges

Ce projet a été réalisé par un groupe de 4 étudiants de CRYPTO.

## Membres de l'équipe

| Nom et prénom                     | Matricule    |
|------------------------------------|--------------|
| ALI ABBA                           | 22ENSPM0456  |
| CIHELA KAMTO DORVALE ESTHER        | 22ENSPM0463  |
| LEMDJOU MANIGUE VIANI MARIE-MAR    | 24ENSPM328   |
| NJIKI NGUEWO JULES KEVIN           | 24ENSPM452   |

## 🎯 Objectif Principal
Développer une application web complète permettant aux utilisateurs d'organiser, stocker et gérer leurs contacts personnels et professionnels.

## 🏗️ Architecture Technique
- **Frontend**: Angular 19 (standalone components)
- **Backend**: Node.js + Express.js
- **Base de données**: MongoDB + Mongoose
- **Style**: CSS personnalisé moderne et responsive

## 📱 Fonctionnalités Principales

### 1. Gestion des Contacts
✅ **Création** avec champs :
  - Nom (obligatoire)
  - Téléphone international (obligatoire)
  - Email (optionnel, validé)
  - Adresse/Entreprise/Notes (optionnels)
  - Catégorie (personnel, pro, famille, amis, autre)
  - Statut favori

✅ Modification en temps réel  
✅ Suppression avec confirmation  
✅ Visualisation détaillée  

### 2. 🔍 Recherche et Navigation
- Recherche temps réel par : nom, téléphone, email
- Suggestions automatiques
- Accès rapide aux détails depuis résultats

### 3. 🗂 Organisation et Filtrage
- Filtrage par catégorie
- Tri personnalisable : nom, date création/modification
- Ordre croissant/décroissant
- Affichage exclusif des favoris

### 4. ⭐ Système de Favoris
- Marquage/démarquage
- Section dédiée sur l'accueil
- Indicateurs visuels (étoiles)

### 5. 💻 Interface Utilisateur
**Pages** :
- 🏠 Accueil (favoris + contacts récents)
- 📋 Liste des contacts (grille + filtres)
- 👤 Détails contact + actions rapides
- ✏️ Formulaire création/modification
- ❌ Page 404

**Composants** :
- 🔍 Barre de recherche (header)
- 🧭 Navigation avec liens actifs
- 🦶 Pied de page (infos légales)

### 6. ⚡ Actions Rapides
- 📞 Appel direct (`tel:`)
- ✉️ Email (`mailto:`)
- 💬 SMS (`sms:`)

### 7. 🔐 Validation et Sécurité
- Validation téléphone international
- Validation format email
- Confirmation suppression
- Gestion d'erreurs détaillée

## 🎨 Design et Ergonomie
**Charte graphique** :
- Couleurs : `#3B82F6` (bleu), `#10B981` (vert), `#EF4444` (rouge)
- Police : Roboto
- Icônes : Material Symbols Outlined
- Boutons arrondis

**Responsive** :
- 📱 Mobile
- 💻 Tablette
- 🖥 Desktop

**Animations** :
- Transitions fluides (0.3s)
- Effets survol cartes/boutons
- Animations apparition (fade-in, slide-in)
- Feedback visuel actions


## 🚀 Installation et Démarrage

### Prérequis
- Node.js v18+
- MongoDB v6+
- Angular CLI v19+
- npm v9+

###. Installation des dépendances
# Clonez le dépôt
git clone https://github.com/Julesnjiki237/Annuaire_t-l-phonique.git
cd Annuaire_t-l-phonique

# Installez les dépendances du backend et du frontend
cd backend
npm install

# Démarrer MongoDB (dans un nouveau terminal)
mongod

# Démarrer le frontend 
ng serve ou npm run dev

## 🔧 API REST Backend
**Endpoints** :
```http
GET    /api/contacts
GET    /api/contacts/:id
POST   /api/contacts
PUT    /api/contacts/:id
DELETE /api/contacts/:id
GET    /api/contacts/search?q=terme
GET    /api/contacts/favorites
PATCH  /api/contacts/:id/favorite


