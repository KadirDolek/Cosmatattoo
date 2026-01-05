# Fix pour le premier déploiement Vercel

Si le déploiement échoue avec une erreur de migration Prisma, suivez ces étapes :

## Solution 1 : Créer les migrations localement puis déployer

```bash
# 1. Dans votre terminal local, avec la DATABASE_URL de Neon/Supabase
export DATABASE_URL="postgresql://username:password@host/dbname"

# 2. Créez les migrations
npx prisma migrate dev --name init

# 3. Commitez et poussez
git add .
git commit -m "Add Prisma migrations"
git push
```

Vercel redéploiera automatiquement avec les migrations.

## Solution 2 : Modifier temporairement le script de build

Si la solution 1 ne fonctionne pas, modifiez temporairement package.json :

```json
"scripts": {
  "vercel-build": "prisma generate && next build"
}
```

Puis après le premier déploiement réussi :
1. Connectez-vous à votre base de données
2. Exécutez manuellement : `npx prisma db push`
3. Remettez le script original : `"vercel-build": "prisma generate && prisma migrate deploy && next build"`

## Solution 3 : Utiliser db push au lieu de migrate

Modifiez package.json :

```json
"scripts": {
  "vercel-build": "prisma generate && prisma db push && next build"
}
```

Cette méthode synchronise directement le schema sans utiliser les fichiers de migration.
