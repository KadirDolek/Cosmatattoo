# 🚀 Démarrage Rapide - Cosma Tattoo

## Installation en 3 étapes

### 1️⃣ Installer les dépendances
\`\`\`bash
npm install
npx prisma generate
\`\`\`

### 2️⃣ Lancer le serveur
\`\`\`bash
npm run dev
\`\`\`

### 3️⃣ Créer l'admin
Ouvrez votre navigateur : [http://localhost:3000/api/setup](http://localhost:3000/api/setup)

---

## 🔐 Connexion Admin

1. Allez sur [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. **Email** : `admin@cosmatattoo.fr`
3. **Mot de passe** : `admin123`
4. Accès au dashboard admin : [/admin](http://localhost:3000/admin)

---

## 🖼️ Ajouter des Images

1. Connectez-vous en tant qu'admin
2. Allez sur [http://localhost:3000/admin/images](http://localhost:3000/admin/images)
3. Uploadez vos images de tatouages
4. Elles apparaîtront automatiquement dans le portfolio

---

## 📚 Documentation Complète

- **[README.md](README.md)** - Vue d'ensemble du projet
- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Configuration backend détaillée
- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** - Guide complet administrateur

---

## 🎯 Fonctionnalités Principales

### Pour les Visiteurs
- ✅ Page d'accueil avec animations
- ✅ Portfolio filtrable par catégorie
- ✅ Formulaire de contact fonctionnel
- ✅ Dark mode
- ✅ Design responsive

### Pour les Utilisateurs Connectés
- ✅ Dashboard personnel
- ✅ Historique des messages envoyés
- ✅ Gestion du profil

### Pour l'Admin
- ✅ Gestion des messages de contact
- ✅ Upload et gestion des images portfolio
- ✅ Statistiques en temps réel
- ✅ Filtres et recherche

---

## 🛠️ Stack Technique

- **Framework** : Next.js 15
- **UI** : React 19 + Tailwind CSS
- **Auth** : NextAuth.js
- **BDD** : Prisma + SQLite
- **Upload** : Système de fichiers local

---

## ❓ Problème ?

### L'admin ne peut pas se connecter
\`\`\`bash
# Visitez cette URL pour créer/vérifier l'admin
http://localhost:3000/api/setup
\`\`\`

### Erreur Prisma
\`\`\`bash
npx prisma generate
npx prisma migrate dev
\`\`\`

### Port 3000 déjà utilisé
\`\`\`bash
# Utilisez un autre port
PORT=3001 npm run dev
\`\`\`

---

## 🎨 Personnalisation

### Changer les couleurs
Éditez `src/app/globals.css` :
\`\`\`css
:root {
  --navy: #0a1128;      /* Bleu marine */
  --hover: #d4af37;      /* Or */
  --accent: #1e3a5f;     /* Accent */
}
\`\`\`

### Ajouter des catégories
Éditez les catégories dans :
- `src/app/admin/images/page.js`
- `src/app/portfolio/page.js`

---

## 📞 Support

Besoin d'aide ? Consultez :
1. Les logs du serveur terminal
2. La console navigateur (F12)
3. Les fichiers de documentation

Bon développement ! 🎉
