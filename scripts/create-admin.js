const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@cosmatattoo.fr',
        name: 'Administrateur',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin créé avec succès !');
    console.log('📧 Email: admin@cosmatattoo.fr');
    console.log('🔑 Mot de passe: admin123');
    console.log('🆔 ID:', admin.id);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Un admin avec cet email existe déjà');
    } else {
      console.error('❌ Erreur:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
