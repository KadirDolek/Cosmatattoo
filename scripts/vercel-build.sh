#!/bin/bash
set -e

echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "🗄️  Pushing database schema..."
npx prisma db push --accept-data-loss

echo "🏗️  Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
