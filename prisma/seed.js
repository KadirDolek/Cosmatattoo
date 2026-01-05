const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cosmatattoo.fr' },
    update: {},
    create: {
      email: 'admin@cosmatattoo.fr',
      name: 'Administrateur',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Admin créé:', admin);

  // Créer un utilisateur normal de test
  const userPassword = await bcrypt.hash('user123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Utilisateur Test',
      password: userPassword,
      phone: '+33 6 12 34 56 78',
      role: 'USER'
    }
  });

  console.log('Utilisateur test créé:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
