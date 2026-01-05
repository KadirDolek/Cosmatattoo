# Guide de Déploiement sur Vercel - Cosma Tattoo

## Prérequis

- Un compte Vercel (gratuit sur [vercel.com](https://vercel.com))
- Un compte GitHub (pour connecter votre projet)
- Une base de données PostgreSQL (Vercel Postgres recommandé)

## Étapes de Déploiement

### 1. Préparer votre Repository GitHub

```bash
# Assurez-vous d'être dans le dossier cosmatattoo
cd cosmatattoo

# Ajoutez tous vos fichiers
git add .

# Créez un commit
git commit -m "Prêt pour le déploiement sur Vercel"

# Si vous n'avez pas encore de repo GitHub, créez-en un sur github.com
# Puis ajoutez l'origine et poussez
git remote add origin https://github.com/VOTRE-USERNAME/cosma-tattoo.git
git branch -M main
git push -u origin main
```

### 2. Importer le Projet sur Vercel

1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub
4. Vercel détectera automatiquement Next.js

### 3. Configurer la Base de Données

#### Option A: Vercel Postgres (Recommandé)

1. Dans votre projet Vercel, allez dans l'onglet "Storage"
2. Cliquez sur "Create Database"
3. Sélectionnez "Postgres"
4. Suivez les instructions pour créer la base de données
5. Vercel ajoutera automatiquement `DATABASE_URL` à vos variables d'environnement

#### Option B: Base de données PostgreSQL externe

1. Créez une base de données PostgreSQL sur un service comme:
   - [Supabase](https://supabase.com) (gratuit)
   - [Railway](https://railway.app) (gratuit)
   - [Neon](https://neon.tech) (gratuit)
2. Récupérez l'URL de connexion PostgreSQL

### 4. Configurer les Variables d'Environnement

Dans votre projet Vercel, allez dans "Settings" > "Environment Variables" et ajoutez:

```
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_URL=https://votre-app.vercel.app
NEXTAUTH_SECRET=généré-avec-openssl-rand-base64-32
```

**Pour générer NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Déployer

1. Cliquez sur "Deploy"
2. Vercel va:
   - Installer les dépendances
   - Générer le client Prisma
   - Exécuter les migrations
   - Builder l'application Next.js
   - Déployer

### 6. Exécuter les Migrations Prisma

Après le premier déploiement, vous devrez peut-être créer les migrations:

```bash
# En local, avec la DATABASE_URL de production
npx prisma migrate dev --name init

# Ou depuis le terminal Vercel
npx prisma migrate deploy
```

### 7. Créer un Utilisateur Admin

Vous pouvez créer un utilisateur admin via l'API ou en utilisant Prisma Studio:

```bash
# En local, connecté à la base de données de production
DATABASE_URL="votre-url-prod" npx prisma studio
```

## Configuration Post-Déploiement

### Domaine Personnalisé (Optionnel)

1. Allez dans "Settings" > "Domains"
2. Ajoutez votre domaine personnalisé
3. Mettez à jour `NEXTAUTH_URL` avec votre nouveau domaine

### Monitoring

- Les logs sont disponibles dans l'onglet "Deployments"
- Les erreurs s'affichent dans "Runtime Logs"

## Développement Local avec PostgreSQL

Si vous voulez développer en local avec PostgreSQL au lieu de SQLite:

```bash
# Modifiez votre .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/cosmatattoo"

# Créez les migrations
npx prisma migrate dev

# Générez le client
npx prisma generate
```

## Rollback en cas de Problème

Si un déploiement échoue:

1. Allez dans "Deployments"
2. Trouvez le dernier déploiement qui fonctionnait
3. Cliquez sur les 3 points > "Promote to Production"

## Support

- Documentation Vercel: https://vercel.com/docs
- Documentation Prisma: https://www.prisma.io/docs
- Documentation Next.js: https://nextjs.org/docs

## Notes Importantes

- **Base de données**: SQLite ne fonctionne pas sur Vercel. Utilisez PostgreSQL.
- **Variables d'environnement**: Ne commitez JAMAIS vos fichiers `.env` sur GitHub
- **Migrations**: Toujours tester les migrations en local avant de les déployer
- **Images**: Pour le stockage d'images, considérez Cloudinary ou Vercel Blob Storage
