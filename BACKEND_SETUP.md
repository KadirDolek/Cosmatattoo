# Configuration du Backend - Cosma Tattoo

## Installation complétée ✅

Le backend a été configuré avec succès avec les fonctionnalités suivantes :

### 🔐 Authentification
- **NextAuth.js** pour la gestion des sessions
- **Système de rôles** : USER et ADMIN
- **Pages** : Connexion ([/auth/login](src/app/auth/login/page.js)) et Inscription ([/auth/register](src/app/auth/register/page.js))

### 💾 Base de données
- **Prisma ORM** avec SQLite (fichier : `prisma/dev.db`)
- **Modèles** :
  - `User` : utilisateurs avec rôles
  - `Message` : messages de contact avec statuts (UNREAD, READ, ARCHIVED)
  - `Image` : images du portfolio avec catégories

### 📡 API Routes
- `/api/auth/[...nextauth]` : Authentification NextAuth
- `/api/register` : Inscription des utilisateurs
- `/api/messages` : Gestion des messages de contact (GET, POST, PATCH)
- `/api/images` : Gestion des images portfolio (GET, POST, DELETE)
- `/api/setup` : Création automatique de l'admin

### 🎨 Pages
- **[/dashboard](src/app/dashboard/page.js)** : Espace utilisateur avec informations personnelles
- **[/admin](src/app/admin/page.js)** : Dashboard admin avec gestion des messages
- **[/admin/images](src/app/admin/images/page.js)** : Gestion des images portfolio
- **Formulaire de contact** intégré sur la page d'accueil

## 🚀 Démarrage

### 1. Créer un utilisateur administrateur (AUTOMATIQUE) ⚡

**Méthode simple et rapide** :

1. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

2. Ouvrez votre navigateur et allez sur :
\`\`\`
http://localhost:3000/api/setup
\`\`\`

3. Vous verrez un message JSON confirmant la création :
\`\`\`json
{
  "message": "Administrateur créé avec succès !",
  "credentials": {
    "email": "admin@cosmatattoo.fr",
    "password": "admin123"
  }
}
\`\`\`

C'est tout ! L'admin est créé automatiquement. 🎉

### 2. Lancer l'application

\`\`\`bash
npm run dev
\`\`\`

### 3. Se connecter

#### Compte Admin
- **Email** : `admin@cosmatattoo.fr`
- **Mot de passe** : `admin123`
- **Page** : [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
- **Redirection** : [/admin](http://localhost:3000/admin) (dashboard admin)

#### Créer un compte utilisateur
- **Page** : [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
- **Redirection** : [/dashboard](http://localhost:3000/dashboard) (espace utilisateur)

## 📋 Fonctionnalités

### Pour les utilisateurs (USER)
1. **Inscription/Connexion**
2. **Dashboard personnel** avec informations du profil
3. **Envoi de messages** via le formulaire de contact (stockés en base de données)

### Pour l'administrateur (ADMIN)
1. **Dashboard admin** avec statistiques
2. **Gestion des messages** :
   - Voir tous les messages
   - Filtrer par statut (Non lus, Lus, Archivés)
   - Changer le statut des messages
3. **Vue d'ensemble** : nombre total, non lus, lus, archivés

## 🔧 Configuration

### Variables d'environnement (`.env.local`)
\`\`\`env
NEXTAUTH_SECRET=votre-secret-tres-securise-changez-moi
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./prisma/dev.db"
\`\`\`

⚠️ **Important** : Changez `NEXTAUTH_SECRET` en production avec une valeur aléatoire sécurisée.

## 📁 Structure des fichiers

\`\`\`
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js    # Auth NextAuth
│   │   ├── register/route.js               # Inscription
│   │   └── messages/route.js               # Messages de contact
│   ├── auth/
│   │   ├── login/page.js                   # Page de connexion
│   │   └── register/page.js                # Page d'inscription
│   ├── dashboard/page.js                   # Espace utilisateur
│   ├── admin/page.js                       # Dashboard admin
│   └── page.js                             # Page d'accueil (avec formulaire)
├── components/
│   └── Providers.js                        # Provider NextAuth
├── lib/
│   └── prisma.js                          # Client Prisma
└── prisma/
    ├── schema.prisma                       # Schéma de base de données
    └── dev.db                              # Base de données SQLite
\`\`\`

## 🎯 Prochaines étapes

1. **Créer l'utilisateur admin** (voir instructions ci-dessus)
2. **Tester la connexion**
3. **Envoyer un message de test** depuis le formulaire de contact
4. **Vérifier dans le dashboard admin** que le message apparaît
5. **Personnaliser** les couleurs, textes et images selon vos besoins

## 💡 Astuces

- Les messages envoyés par des utilisateurs connectés sont automatiquement liés à leur compte
- Les messages anonymes (non connectés) sont également enregistrés
- Le dashboard admin permet de trier et filtrer tous les messages
- Chaque message a un statut modifiable (Non lu → Lu → Archivé)

Bonne utilisation ! 🎨✨
