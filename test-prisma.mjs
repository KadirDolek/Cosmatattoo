import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function main() {
  try {
    console.log('🔍 Test de connexion Prisma...');

    // Tester la connexion
    const users = await prisma.user.findMany();
    console.log('✅ Connexion réussie !');
    console.log(`📊 Nombre d'utilisateurs: ${users.length}`);

    if (users.length > 0) {
      console.log('👤 Premier utilisateur:', users[0].email);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
